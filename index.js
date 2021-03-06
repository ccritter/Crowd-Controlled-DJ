const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require("socket.io")(server);
require('dotenv').config();

const rooms = io.sockets.adapter.rooms;

class Song {
  constructor(song) {
    this.id = song.id;
    this.title = song.title;
    this.thumbnail = song.thumbnail;
    this.channelName = song.channelName;
    this.numVotes = 0;
    this.whoDownVoted = [];
    this.whoUpVoted = [];
  }

  upvote() {
    this.numVotes += 1;
    return this.numVotes;
  }

  downvote() {
    this.numVotes -= 1;
    return this.numVotes;
  }
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connection', socket => {
  console.log("New client connected");

  // Handle user disconnecting. TODO: Add a timeout so they don't lose their room
  socket.on("disconnect", () => console.log("Client disconnected"));
  // TODO: Figure out what happens when the DJ disconnects.

  // Handle user room join requests
  socket.on("joinroom", (roomID, cb) => {
    console.log("Joining room " + roomID);
    const room = rooms[roomID];
    if(room) {
      // If the room exists
      socket.join(roomID);
      socket.emit('receive songlist', rooms[roomID].songlist);
      console.log("Joined successfully");
      cb(true);
    } else {
      // If the room does not exist
      socket.emit('nonexistent room');
      console.log("Room doesn't exist");
      cb(false);
    }
  });

  // Handle user host room requests
  socket.on("hostroom", (cb) => {
    // Statistically should only need to run once. Ensures no duplicate rooms.
    let foundRoom = false;
    let roomID;
    while (!foundRoom) {
      roomID = Math.random().toString(36).substring(2, 7);
      let room = rooms[roomID];
      if (!room) foundRoom = true; // If no room with that ID exists, create it.
    }
    console.log("Hosting room " + roomID);
    socket.join(roomID);
    rooms[roomID].djID = socket.id;
    rooms[roomID].songlist = [];
    cb(roomID);
  });

  // Handle user add song requests
  socket.on("addsong", (song, roomID, cb) => {
    if (rooms[roomID].songlist.find((s) => s.id === song.id)) {
      socket.emit('dupesong');
    } else {
      if (rooms[roomID].songlist.length === 0) {
        rooms[roomID].songlist.push(new Song(song));
      } else {
        for (i = rooms[roomID].songlist.length - 1; i >= 0; i--) {
          if (rooms[roomID].songlist[i].numVotes > 0) {
            rooms[roomID].songlist.splice(i + 1, 0, new Song(song));
            break;
          } else if (i === 0) {
            rooms[roomID].songlist.splice(0, 0, new Song(song));
          }
        }
      }

      cb(true);
      io.to(roomID).emit('receive songlist', rooms[roomID].songlist);
    }
  });

  // Handle user upvote requests
  socket.on("upvote", (song, roomID) => {
    let sl = rooms[roomID].songlist;
    let idx = sl.findIndex((s) => s.id === song.id);
    let s = sl[idx];
    let socketUpVoted = s.whoUpVoted.findIndex((id) => id === socket.id);
    let socketDownVoted = s.whoDownVoted.findIndex((id) => id === socket.id);
    if (socketUpVoted === -1) {
      s.upvote();
      if (socketDownVoted !== -1) {
        s.upvote();
        s.whoDownVoted.splice(socketDownVoted, 1);
      }
      s.whoUpVoted.push(socket.id)
    } else {
      s.downvote();
      s.whoUpVoted.splice(socketUpVoted, 1);
    }

    for (i = idx; i >= 0; i--) {
      if (sl[i].numVotes > s.numVotes) {
        sl.splice(idx, 1);
        sl.splice(i + 1, 0, s);
        break;
      } else if (i === 0) {
        sl.splice(idx, 1);
        sl.splice(0, 0, s);
      }
    }
    io.to(roomID).emit('receive songlist', sl);
  });

  // Handle user downvote requests
  socket.on("downvote", (song, roomID) => {
    let sl = rooms[roomID].songlist;
    let idx = sl.findIndex((s) => s.id === song.id);
    let s = sl[idx];
    let socketUpVoted = s.whoUpVoted.findIndex((id) => id === socket.id);
    let socketDownVoted = s.whoDownVoted.findIndex((id) => id === socket.id);
    if (socketDownVoted === -1) {
      s.downvote();
      if (socketUpVoted !== -1) {
        s.downvote();
        s.whoUpVoted.splice(socketUpVoted, 1);
      }
      s.whoDownVoted.push(socket.id)
    } else {
      s.upvote();
      s.whoDownVoted.splice(socketDownVoted, 1);
    }

    // TODO: Base the downvote threshold on the number of people in room. maybe if 25% vote down?
    if (s.numVotes < -5) {
      sl.splice(idx, 1);
    } else {
      for (i = idx; i < sl.length; i++) {
        if (sl[i].numVotes < s.numVotes) {
          sl.splice(idx, 1);
          sl.splice(i - 1, 0, s);
          break;
        } else if (i === sl.length - 1) {
          sl.splice(idx, 1);
          sl.splice(sl.length, 0, s);
        }
      }
    }
    io.to(roomID).emit('receive songlist', sl);
  });

  // Handle user remove song requests
  socket.on("removesong", (song, roomID) => {
    let sl = rooms[roomID].songlist;
    let idx = sl.findIndex((s) => s.id === song.id);
    sl.splice(idx, 1);

    io.to(roomID).emit('receive songlist', sl);
  });

  // Handle user send to deck 1 requests
  socket.on("sendtodeck1", (song, roomID) => {
    let sl = rooms[roomID].songlist;
    let idx = sl.findIndex((s) => s.id === song.id);
    let s = sl[idx];
    sl.splice(idx, 1);

    io.to(roomID).emit('receive songlist', sl);
    io.to(roomID).emit('play song deck 1', s);
  });

  // Handle user send to deck 2 requests
  socket.on("sendtodeck2", (song, roomID) => {
    let sl = rooms[roomID].songlist;
    let idx = sl.findIndex((s) => s.id === song.id);
    let s = sl[idx];
    sl.splice(idx, 1);

    io.to(roomID).emit('receive songlist', sl);
    io.to(roomID).emit('play song deck 2', s);
  });

  socket.on("next", (roomID, side) => {
    let sl = rooms[roomID].songlist;
    let s = null
    if (sl.length !== 0) {
      s = sl[0];
      sl.splice(0, 1);

      io.to(roomID).emit('receive songlist', sl);
    }
    if (side === "Left") {
      io.to(roomID).emit('play song deck 1', s);
    } else {
      io.to(roomID).emit('play song deck 2', s);
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({name: 'Chris'});
});

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
server.listen(port);

console.log(`Server listening on ${port}`);