---
title: Crowd Controlled DJ
---

# [P1]() | [P2](p2) | [P3](p3) | [P4](p4) | [P5](p5)

Elijah Foreman: foreman.e@husky.neu.edu

Chris Ritter: ritter.c@husky.neu.edu

Ryan Harrigan: harrigan.r@husky.neu.edu

Alexander Melagrano: melagrano.a@husky.neu.edu

Steve Krueger: SteveKrueger52@gmail.com

## Problem
If you’re the one playing music while hanging out with friends or for a party, you want to be sure to play music that your audience will enjoy. If you rely solely on your own playlists, you may find that your music selection doesn’t quite include the genres that your friends want to hear, or that one particular song may be too hard to find among your collection. How then, do you keep the groove going while finding and playing what everyone wants to hear?
With our app, we hope to create a DJ companion app that takes song suggestions from the crowd, and allows them to vote on which song to play next. A list of the top songs that were voted for - and their associated YouTube sources - will appear for the designated DJ, allowing them to mix and play the current song into the next from the desktop app, or just use the crowd’s selection as a suggestion, so they can use their own equipment instead. If your group doesn’t have a DJ, that’s fine. The app will support autoplaying the songs together when one ends, until the suggestions run out.

## Target Users
Our proposed application targets several distinct classes of users. The app is useful for professional DJs looking to get input from their audiences during a set, as well as ameteur or rising DJs who are interested in honing their craft with a simpler toolset than most current DJ software.
However, the app is useful for more than those in the profession of live musical performances. People at more private parties who just want to play music and enjoy spending time with their friends. Even if they don’t want to spend their free time tending to the suggested playlists, they can let the app autoplay from the voted selections and keep the party going. 
And finally, the crowd itself. This is a voting platform at its core, and party-goers who want to get in on the action can use the app to get a say in the music selection, voicing the songs they want to hear and the experience they want to have. 

## Solution
The main interfaces of the web app include a mobile view, and a desktop view. The desktop view will be utilized by the user who created the room, who is designated as the party’s DJ. With this interface, the DJ has a set of tools at their disposal to either ensure smooth transitions between songs or mix two songs together. Some features we hope to implement in this respect include volume/crossfading, variable playback control for beatmatching, and marking places for where one song should end and the other should begin. This interface will resemble a traditional turntable deck, and all the planned features will have designated buttons and sliders. However, the DJ can also see the upcoming list of songs. For retrieving and playing songs, we will be using YouTube’s APIs so that we will have access to streaming of almost every song a listener could want. We also hope to implement a system where if left unattended, the app automatically creates smooth transitions between songs, but this may not be implementable within scope.
The mobile view of the site will be available to the partygoers, who can go onto the website, be presented with a screen to enter a party ID code, and then have instant access to the party’s playlist. From this interface, the user can enter a search query for a song, and be presented with a list of results from YouTube. Picking one of these results will add it to the playback queue. Other users connected to the party ID will see the selection pop up, and if they want to hear that song next they can submit a vote for it. The highest voted song will appear on the DJ’s screen, who will then set all the necessary parameters to make it successfully blend with the current song.

