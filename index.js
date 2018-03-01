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
    this.numVotes = 0;
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
      socket.emit('welcome', rooms[roomID].songlist)
      console.log("Joined successfully");
      cb(true);
    } else {
      // If the room does not exist
      // TODO: Do something
      console.log("Room doesn't exist")
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
    cb(roomID); // maybe make a room init function, and add functions like getTopSong()
  });

  socket.on("addsong", (song, roomID) => {
    rooms[roomID].songlist.push(new Song(song));
    io.to(roomID).emit('song added', rooms[roomID].songlist);
  });

  // Upvoting/Downvoting currently will likely not work, we will need to test it.
  socket.on("upvote", (song) => {
    song.upvote() // TODO: I don't believe this actually changes the vote in the server song list
  });

  socket.on("downvote", (song) => {
    song.downvote()
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