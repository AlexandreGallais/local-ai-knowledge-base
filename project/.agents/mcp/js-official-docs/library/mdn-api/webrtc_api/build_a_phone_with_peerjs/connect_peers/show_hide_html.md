---
title: "Showing and hiding HTML"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/build_a_phone_with_peerjs/connect_peers/show_hide_html/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Showing and hiding HTML

Alright, so you've got the microphone permissions set up. The next step is to make sure each user knows what their peer ID is so that they can make connections. The peerJS framework gives us a bunch of event listeners we can call on the peer we created earlier on.

1. Let's use the `open` event to create a listener that displays the peer's ID when it is open. Add the following code to the bottom of `script.js`:

   ```js
   peer.on("open", () => {
     document.getElementById("cast-status").textContent =
       `Your device ID is: ${peer.id}`;
   });
   ```

2. Try reloading the app in your browser. Instead of `connecting...`, you should see `Your device ID is: <peer ID>`.

3. While you're here, you may as well create some functions to display and hide various content, which you'll use later. There are two functions you should create, `showCallContent()` and `showConnectedContent()`. These functions will be responsible for showing the call button and showing the hang up button and audio elements when appropriate.

   ```js
   const audioContainer = document.querySelector(".call-container");

   // Displays the call button and peer ID
   function showCallContent() {
     document.getElementById("cast-status").textContent =
       `Your device ID is: ${peer.id}`;
     callBtn.hidden = false;
     audioContainer.hidden = true;
   }

   // Displays the audio controls and correct copy
   function showConnectedContent() {
     document.getElementById("cast-status").textContent = "You're connected";
     callBtn.hidden = true;
     audioContainer.hidden = false;
   }
   ```
