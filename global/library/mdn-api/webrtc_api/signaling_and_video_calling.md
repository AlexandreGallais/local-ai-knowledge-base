---
title: "Signaling and video calling (part 1 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webrtc_api/signaling_and_video_calling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Signaling and video calling

WebRTC allows real-time, peer-to-peer, media exchange between two devices. A connection is established through a discovery and negotiation process called **signaling**. This tutorial will guide you through building a two-way video-call.

WebRTC is a fully peer-to-peer technology for the real-time exchange of audio, video, and data, with one central caveat. A form of discovery and media format negotiation must take place, as discussed elsewhere, in order for two devices on different networks to locate one another. This process is called **signaling** and involves both devices connecting to a third, mutually agreed-upon server. Through this third server, the two devices can locate one another, and exchange negotiation messages.

In this article, we will further enhance the to support opening a two-way video call between users. You can try out this example on Render to experiment with it as well.
You can also look at the full project on GitHub.

## The signaling server

Establishing a WebRTC connection between two devices requires the use of a **signaling server** to resolve how to connect them over the internet. A signaling server's job is to serve as an intermediary to let two peers find and establish a connection while minimizing exposure of potentially private information as much as possible. How do we create this server and how does the signaling process actually work?

First we need the signaling server itself. WebRTC doesn't specify a transport mechanism for the signaling information. You can use anything you like, from WebSocket to `fetch()` to carrier pigeons to exchange the signaling information between the two peers.

It's important to note that the server doesn't need to understand or interpret the signaling data content. Although it's SDP, even this doesn't matter so much: the content of the message going through the signaling server is, in effect, a black box. What does matter is when the ICE subsystem instructs you to send signaling data to the other peer, you do so, and the other peer knows how to receive this information and deliver it to its own ICE subsystem. All you have to do is channel the information back and forth. The contents don't matter at all to the signaling server.

### Readying the chat server for signaling

Our chat server uses the WebSocket API to send information as JSON strings between each client and the server. The server supports several message types to handle tasks, such as registering new users, setting usernames, and sending public chat messages.

To allow the server to support signaling and ICE negotiation, we need to update the code. We'll have to allow directing messages to one specific user instead of broadcasting to all connected users, and ensure unrecognized message types are passed through and delivered, without the server needing to know what they are. This lets us send signaling messages using this same server, instead of needing a separate server.

Let's take a look at changes we need to make to the chat server to support WebRTC signaling. This is in the file `chatserver.js`.

First up is the addition of the function `sendToOneUser()`. As the name suggests, this sends a stringified JSON message to a particular username.

```js
function sendToOneUser(target, msgString) {
  connectionArray.find((conn) => conn.username === target).send(msgString);
}
```

This function iterates over the list of connected users until it finds one matching the specified username, then sends the message to that user. The parameter `msgString` is a stringified JSON object. We could have made it receive our original message object, but in this example it's more efficient this way. Since the message has already been stringified, we can send it with no further processing. Each entry in `connectionArray` is a `WebSocket` object, so we can just call its `send()` method directly.

Our original chat demo didn't support sending messages to a specific user. The next task is to update the main WebSocket message handler to support doing so. This involves a change near the end of the `"connection"` message handler:

```js
if (sendToClients) {
  const msgString = JSON.stringify(msg);

  if (msg.target && msg.target.length !== 0) {
    sendToOneUser(msg.target, msgString);
  } else {
    for (const connection of connectionArray) {
      connection.send(msgString);
    }
  }
}
```

This code now looks at the pending message to see if it has a `target` property. If that property is present, it specifies the username of the client to which the message is to be sent, and we call `sendToOneUser()` to send the message to them. Otherwise, the message is broadcast to all users by iterating over the connection list, sending the message to each user.

As the existing code allows the sending of arbitrary message types, no additional changes are required. Our clients can now send messages of unknown types to any specific user, letting them send signaling messages back and forth as desired.

That's all we need to change on the server side of the equation. Now let's consider the signaling protocol we will implement.

### Designing the signaling protocol

Now that we've built a mechanism for exchanging messages, we need a protocol defining how those messages will look. This can be done in a number of ways; what's demonstrated here is just one possible way to structure signaling messages.

This example's server uses stringified JSON objects to communicate with its clients. This means our signaling messages will be in JSON format, with contents which specify what kind of messages they are as well as any additional information needed in order to handle the messages properly.

#### Exchanging session descriptions

When starting the signaling process, an **offer** is created by the user initiating the call. This offer includes a session description, in SDP format, and needs to be delivered to the receiving user, which we'll call the **callee**. The callee responds to the offer with an **answer** message, also containing an SDP description. Our signaling server will use WebSocket to transmit offer messages with the type `"video-offer"`, and answer messages with the type `"video-answer"`. These messages have the following fields:

- `type`
    The message type; either `"video-offer"` or `"video-answer"`.
- `name`
    The sender's username.
- `target`
    The username of the person to receive the description (if the caller is sending the message, this specifies the callee, and vice versa).
- `sdp`
    The SDP (Session Description Protocol) string describing the local end of the connection from the perspective of the sender (or the remote end of the connection from the receiver's point of view).

At this point, the two participants know which codecs and codec parameters are to be used for this call. They still don't know how to transmit the media data itself though. This is where Interactive Connectivity Establishment (ICE) comes in.

### Exchanging ICE candidates

Two peers need to exchange ICE candidates to negotiate the actual connection between them. Every ICE candidate describes a method that the sending peer is able to use to communicate. Each peer sends candidates in the order they're discovered, and keeps sending candidates until it runs out of suggestions, even if media has already started streaming.

An `icecandidate` event is sent to the `RTCPeerConnection` to complete the process of adding a local description using `pc.setLocalDescription(offer)`.

Once the two peers agree upon a mutually-compatible candidate, that candidate's SDP is used by each peer to construct and open a connection, through which media then begins to flow. If they later agree on a better (usually higher-performance) candidate, the stream may change formats as needed.

Though not currently supported, a candidate received after media is already flowing could theoretically also be used to downgrade to a lower-bandwidth connection if needed.

Each ICE candidate is sent to the other peer by sending a JSON message of type `"new-ice-candidate"` over the signaling server to the remote peer. Each candidate message include these fields:

- `type`
    The message type: `"new-ice-candidate"`.
- `target`
    The username of the person with whom negotiation is underway; the server will direct the message to this user only.
- `candidate`
    The SDP candidate string, describing the proposed connection method. You typically don't need to look at the contents of this string. All your code needs to do is route it through to the remote peer using the signaling server.

Each ICE message suggests a communication protocol (TCP or UDP), IP address, port number, connection type (for example, whether the specified IP is the peer itself or a relay server), along with other information needed to link the two computers together. This includes NAT or other networking complexity.

> **Note:**
> The important thing to note is this: the only thing your code is responsible for during ICE negotiation is accepting outgoing candidates from the ICE layer and sending them across the signaling connection to the other peer when your `onicecandidate` handler is executed, and receiving ICE candidate messages from the signaling server (when the `"new-ice-candidate"` message is received) and delivering them to your ICE layer by calling `RTCPeerConnection.addIceCandidate()`. That's it.
>
> The contents of the SDP are irrelevant to you in essentially all cases. Avoid the temptation to try to make it more complicated than that until you really know what you're doing. That way lies madness.

All your signaling server now needs to do is send the messages it's asked to. Your workflow may also demand login/authentication functionality, but such details will vary.

> **Note:**
> The `onicecandidate` Event and `createAnswer()` Promise are both async calls which are handled separately. Be sure that your signaling does not change order! For example `addIceCandidate()` with the server's ice candidates must be called after setting the answer with `setRemoteDescription()`.

### Signaling transaction flow

The signaling process involves this exchange of messages between two peers using an intermediary, the signaling server. The exact process will vary, of course, but in general there are a few key <example-value> at which signaling messages get handled:

- Each user's client running within a web browser
- Each user's web browser
- The signaling server
- The web server hosting the chat service

Imagine that Naomi and Priya are engaged in a discussion using the chat software, and Naomi decides to open a video call between the two. Here's the expected sequence of events:

We'll see this detailed more over the course of this article.

### ICE candidate exchange process

When each peer's ICE layer begins to send candidates, it enters into an exchange among the various points in the chain that looks like this:

Each side sends candidates to the other as it receives them from their local ICE layer; there is no taking turns or batching of candidates. As soon as the two peers agree upon one candidate that they can both use to exchange the media, media begins to flow. Each peer continues to send candidates until it runs out of options, even after the media has already begun to flow. This is done in hopes of identifying even better options than the one initially selected.

If conditions change (for example, the network connection deteriorates), one or both peers might suggest switching to a lower-bandwidth media resolution, or to an alternative codec. That triggers a new exchange of candidates, after which another media format and/or codec change may take place. In the guide Codecs used by WebRTC you can learn more about the codecs which WebRTC requires browsers to support, which additional codecs are supported by which browsers, and how to choose the best codecs to use.

Optionally, see Interactive Connectivity Establishment, section 2.3 ("Negotiating Candidate Pairs and Concluding ICE") if you want greater understanding of how this process is completed inside the ICE layer. You should note that candidates are exchanged and media starts to flow as soon as the ICE layer is satisfied. This is all taken care of behind the scenes. Our role is to send the candidates, back and forth, through the signaling server.
