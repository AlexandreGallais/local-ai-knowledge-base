---
title: "Ending a call"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/build_a_phone_with_peerjs/connect_peers/end_a_call/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Ending a call

The last thing you want to do is ensure your callers have a way of ending a call.
The most graceful way of doing this is to close the connection using the `close()` function, which you can do in an event listener for the hang up button.

1. Add the following to the bottom of your `script.js` file:

   ```js
   const hangUpBtn = document.querySelector(".hangup-btn");
   hangUpBtn.addEventListener("click", () => {
     conn.close();
     showCallContent();
   });
   ```

2. When the connection has been closed, you also want to display the correct HTML content so you can just call your `showCallContent()` function. Within the `call` event, you also want to ensure the remote browser is updated. To achieve this, add another event listener within the `peer.on('call', (stream) => { }` event listener, within the conditional block.

   ```js
   conn.on("close", () => {
     showCallContent();
   });
   ```

   This way, if the person who initiated the call clicks "Hang up" first, both browsers are still updated with the new state.

3. Test out your app again, and try closing a call.

> **Note:**
> The `on('close')` event that is called on the `conn` variable isn't available in Firefox yet; this just means that in Firefox each caller will have to hang up individually.

> **Warning:**
> The way we've currently coded things means that when a connection is closed, both browsers will be updated **only** if the person who started the call presses "Hang up" first. If the person who answered the call clicks "Hang up" first, the other caller will also have to click "Hang up" to see the correct HTML.

Now we're finished with the project!
Next, you could deploy it to a hosting provider that supports Node.js projects.

## See also

- PeerJS
- WebRTC
- PeerJS Server
- A similar video tutorial with video
- The code tutorial
