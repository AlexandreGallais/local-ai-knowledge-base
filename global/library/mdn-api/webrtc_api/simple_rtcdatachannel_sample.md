---
title: "A simple RTCDataChannel sample (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/simple_rtcdatachannel_sample/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# A simple RTCDataChannel sample

The `RTCDataChannel` interface is a feature of the WebRTC API which lets you open a channel between two peers over which you may send and receive arbitrary data. The API is intentionally similar to the WebSocket API, so that the same programming model can be used for each.

In this example, we will open an `RTCDataChannel` connection linking two elements on the same page. While that's obviously a contrived scenario, it's useful for demonstrating the flow of connecting two peers. We'll cover the mechanics of accomplishing the connection and transmitting and receiving data, but we will save the bits about locating and linking to a remote computer for another example.

## The HTML

First, let's take a quick look at the HTML that's needed. There's nothing incredibly complicated here. First, we have a couple of buttons for establishing and closing the connection:

```html
<button id="connectButton" name="connectButton" class="buttonleft">
  Connect
</button>
<button
  id="disconnectButton"
  name="disconnectButton"
  class="buttonright"
  disabled>
  Disconnect
</button>
```

Then there's a box which contains the text input box into which the user can type a message to transmit, with a button to send the entered text. This `` will be the first peer in the channel.

```html
<div class="messagebox">
  <label for="message"
    >Enter a message:
    <input
      type="text"
      name="message"
      id="message"
      placeholder="Message text"
      inputmode="latin"
      size="60"
      maxlength="120"
      disabled />
  </label>
  <button id="sendButton" name="sendButton" class="buttonright" disabled>
    Send
  </button>
</div>
```

Finally, there's the little box into which we'll insert the messages. This `` block will be the second peer.

```html
<div class="messagebox" id="receive-box">
  <p>Messages received:</p>
</div>
```

```css
body {
  font-family: sans-serif;
}

.messagebox {
  margin-block: 1rem;
}

input {
  box-sizing: border-box;
  max-width: 100%;
}

#receive-box {
  border: 1px solid gray;
  padding: 0.5rem;
  height: 8rem;
  overflow: auto;
  overflow-wrap: anywhere;
}
```
