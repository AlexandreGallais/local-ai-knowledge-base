---
title: "Signaling and video calling (part 2 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/signaling_and_video_calling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Signaling and video calling (part 2 of 5)

## The client application

The core to any signaling process is its message handling. It's not necessary to use WebSockets for signaling, but it is a common solution. You should, of course, select a mechanism for exchanging signaling information that is appropriate for your application.

Let's update the chat client to support video calling.

### Updating the HTML

The HTML for our client needs a location for video to be presented. This requires video elements, and a button to hang up the call:

```html
<div class="flexChild" id="camera-container">
  <div class="camera-box">
    <video id="received_video" autoplay></video>
    <video id="local_video" autoplay muted></video>
    <button id="hangup-button" disabled>Hang Up</button>
  </div>
</div>
```

```js
document.getElementById("hangup-button").addEventListener("click", hangUpCall);
```

The page structure defined here is using `` elements, giving us full control over the page layout by enabling the use of CSS. We'll skip layout detail in this guide, but take a look at the CSS on GitHub to see how we handled it. Take note of the two `` elements, one for your self-view, one for the connection, and the `` element.

The `` element with the `id` `received_video` will present video received from the connected user. We specify the `autoplay` attribute, ensuring once the video starts arriving, it immediately plays. This removes any need to explicitly handle playback in our code. The `local_video` `` element presents a preview of the user's camera; specifying the `muted` attribute, as we don't need to hear local audio in this preview panel.

Finally, the `hangup-button` ``, to disconnect from a call, is defined and configured to start disabled (setting this as our default for when no call is connected) and apply the function `hangUpCall()` on click. This function's role is to close the call, and send a signaling server notification to the other peer, requesting it also close.
