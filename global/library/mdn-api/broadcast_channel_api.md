---
title: "Broadcast Channel API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/broadcast_channel_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Broadcast Channel API

The **Broadcast Channel API** allows basic <example-value> between browsing contexts (that is, _windows_, _tabs_, _frames_, or _iframes_) and workers on the same origin.

> **Note:**
> To be exact, communication is allowed between browsing contexts using the same storage partition. Storage is first partitioned according to top-level sites—so for example, if you have one opened page at `a.com` that embeds an iframe from `b.com`, and another page opened to `b.com`, then the iframe cannot communicate with the second page despite them being technically same-origin. However, if the first page is also on `b.com`, then the iframe can communicate with the second page.

By creating a `BroadcastChannel` object, you can receive any messages that are posted to it. You don't have to maintain a reference to the frames or workers you wish to communicate with: they can "subscribe" to a particular channel by constructing their own `BroadcastChannel` with the same name, and have bi-directional communication between all of them.

## Broadcast Channel interface

### Creating or joining a channel

A client joins a broadcast channel by creating a `BroadcastChannel` object. Its constructor takes one single parameter: the _name_ of the channel. If it is the first to connect to that broadcast channel name, the underlying channel is created.

```js
// Connection to a broadcast channel
const bc = new BroadcastChannel("test_channel");
```

### Sending a message

It is enough to call the `postMessage()` method on the created `BroadcastChannel` object, which takes any object as an argument. An example string message:

```js
// Example of sending of a very simple message
bc.postMessage("This is a test message.");
```

Data sent to the channel is serialized using the structured clone algorithm. That means you can send a broad variety of data objects safely without having to serialize them yourself.

The API doesn't associate any semantics to messages, so it is up to the code to know what kind of messages to expect and what to do with them.

### Receiving a message

When a message is posted, a `message` event is dispatched to each `BroadcastChannel` object connected to this channel. A function can be run for this event using the `onmessage` event handler:

```js
// A handler that only logs the event to the console:
bc.onmessage = (event) => {
  console.log(event);
};
```

### Disconnecting a channel

To leave a channel, call the `close()` method on the object. This disconnects the object from the underlying channel, allowing garbage collection.

```js
// Disconnect the channel
bc.close();
```

## Conclusion

The Broadcast Channel API's self-contained interface allows cross-context communication. It can be used to detect user actions in other tabs within a same origin, like when the user logs in or out.

The messaging protocol is not defined and the different browsing contexts need to implement it themselves; there is no negotiation nor requirement from the specification.

## Interfaces

- `BroadcastChannel`
    Represents a named channel that any browsing context of a given origin can subscribe to.

## See also

- `BroadcastChannel`, the interface implementing it.
