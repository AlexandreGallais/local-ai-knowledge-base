---
title: "Writing WebSocket servers (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websockets_api/writing_websocket_servers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Writing WebSocket servers (part 2 of 2)

## Exchanging data frames

Either the client or the server can choose to send a message at any time — that's the magic of WebSockets. However, extracting information from these so-called "frames" of data is a not-so-magical experience. Although all frames follow the same specific format, data going from the client to the server is masked using XOR encryption (with a 32-bit key). Section 5 of the specification describes this in detail.

### Format

Each data frame (from the client to the server or vice versa) follows this same format:

```plain
Data frame from the client to server (message length 0–125):

 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |          Masking-key          |
|I|S|S|S|  (4)  |A|     (7)     |             (32)              |
|N|V|V|V|       |S|             |                               |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+-------------------------------+
|    Masking-key (continued)    |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+

Data frame from the client to server (16-bit message length):

 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16)              |
|N|V|V|V|       |S|   (== 126)  |                               |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+-------------------------------+
|                          Masking-key                          |
+---------------------------------------------------------------+
:                          Payload Data                         :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+

Data frame from the server to client (64-bit payload length):
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (64)              |
|N|V|V|V|       |S|   (== 127)  |                               |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|               Extended payload length continued               |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |          Masking-key          |
+-------------------------------+-------------------------------+
|    Masking-key (continued)    |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

This means that a frame contains the following bytes:

- First byte:
  - Bit 0 FIN: tells whether this is the last message in a series. If it's 0, then the server keeps listening for more parts of the message; otherwise, the server should consider the message delivered. More on this later.
  - Bit 1–3 RSV1, RSV2, RSV3: can be ignored, they are for extensions.
  - Bits 4-7 OPCODE: defines how to interpret the payload data: `0x0` for continuation, `0x1` for text (which is always encoded in UTF-8), `0x2` for binary, and other so-called "control codes" that will be discussed later. In this version of WebSockets, `0x3` to `0x7` and `0xB` to `0xF` have no meaning.
- Bit 8 MASK: tells whether the message is encoded. Messages from the client must be masked, so your server must expect this to be 1. (In fact, section 5.1 of the spec says that your server must disconnect from a client if that client sends an unmasked message.) Server-to-client message are not masked and have this bit set to 0. We'll explain masking later, in reading and unmasking the data. _Note: You must mask messages even when using a secure socket._
- Bits 9–15: payload length. May also include the following 2 bytes or 8 bytes; see Decoding Payload Length.
- If masking is used (always true for client-to-server messages), the next 4 bytes contain the masking key; see Reading and unmasking the data.
- All subsequent bytes are payload.

### Decoding Payload Length

To read the payload data, you must know when to stop reading. That's why the payload length is important to know. Unfortunately, this is somewhat complicated. To read it, follow these steps:

1. Read bits 9-15 (inclusive) and interpret that as an unsigned integer. If it's 125 or less, then that's the length; you're **done**. If it's 126, go to step 2. If it's 127, go to step 3.
2. Read the next 16 bits and interpret those as an unsigned integer. You're **done**.
3. Read the next 64 bits and interpret those as an unsigned integer. (The most significant bit _must_ be 0.) You're **done**.

### Reading and unmasking the data

If the MASK bit was set (and it should be, for client-to-server messages), read the next 4 octets (32 bits); this is the masking key. Once the payload length and masking key is decoded, you can read that number of bytes from the socket. Let's call the data `ENCODED`, and the key `MASK`. To get `DECODED`, loop through the octets of `ENCODED` and XOR the octet with the (i modulo 4)th octet of `MASK`. Using JavaScript as an example:

```js
// The function receives the frame as a Uint8Array.
// firstIndexAfterPayloadLength is the index of the first byte
// after the payload length, so it can be 2, 4, or 10.
function getPayloadDecoded(frame, firstIndexAfterPayloadLength) {
  const mask = frame.slice(
    firstIndexAfterPayloadLength,
    firstIndexAfterPayloadLength + 4,
  );
  const encodedPayload = frame.slice(firstIndexAfterPayloadLength + 4);
  // XOR each 4-byte sequence in the payload with the bitmask
  const decodedPayload = encodedPayload.map((byte, i) => byte ^ mask[i % 4]);
  return decodedPayload;
}

const frame = Uint8Array.from([
  // FIN=1, RSV1-3=0, opcode=0x1 (text)
  0b10000001,
  // MASK=1, payload length=5
  0b10000101,
  // 4-byte mask
  1, 2, 3, 4,
  // 5-byte payload
  105, 103, 111, 104, 110,
]);

// Assume you got the number 2 from properly decoding the payload length
const decoded = getPayloadDecoded(frame, 2);
```

Now you can figure out what `decoded` means depending on your application. For example, you can decode it as UTF-8 if it's a text message.

```js
console.log(new TextDecoder().decode(decoded)); // "hello"
```

Masking is a security measure to avoid malicious parties from predicting the data that is sent to the server. The client will generate a cryptographically random masking key for each message.

### Message Fragmentation

The FIN and opcode fields work together to send a message split up into separate frames. This is called message fragmentation. Fragmentation is only available on opcodes `0x0` to `0x2`.

Recall that the opcode tells what a frame is meant to do. If it's `0x1`, the payload is text. If it's `0x2`, the payload is binary data. However, if it's `0x0`, the frame is a continuation frame; this means the server should concatenate the frame's payload to the last frame it received from that client. Here is a rough sketch, in which a server reacts to a client sending text messages. The first message is sent in a single frame, while the second message is sent across three frames. FIN and opcode details are shown only for the client:

```plain
Client: FIN=1, opcode=0x1, msg="hello"
Server: (process complete message immediately) Hi.
Client: FIN=0, opcode=0x1, msg="and a"
Server: (listening, new message containing text started)
Client: FIN=0, opcode=0x0, msg="happy new"
Server: (listening, payload concatenated to previous message)
Client: FIN=1, opcode=0x0, msg="year!"
Server: (process complete message) Happy new year to you too!
```

Notice the first frame contains an entire message (has `FIN=1` and `opcode!=0x0`), so the server can process or respond as it sees fit. The second frame sent by the client has a text payload (`opcode=0x1`), but the entire message has not arrived yet (`FIN=0`). All remaining parts of that message are sent with continuation frames (`opcode=0x0`), and the final frame of the message is marked by `FIN=1`. Section 5.4 of the spec describes message fragmentation.

## Pings and Pongs: The Heartbeat of WebSockets

At any point after the handshake, either the client or the server can choose to send a ping to the other party. When the ping is received, the recipient must send back a pong as soon as possible. You can use this to make sure that the client is still connected, for example.

A ping or pong is just a regular frame, but it's a **control frame**. Pings have an opcode of `0x9`, and pongs have an opcode of `0xA`. When you get a ping, send back a pong with the exact same Payload Data as the ping (for pings and pongs, the max payload length is 125). You might also get a pong without ever sending a ping; ignore this if it happens.

> **Note:**
> If you have gotten more than one ping before you get the chance to send a pong, you only send one pong.

## Closing the connection

To close a connection either the client or server can send a control frame with data containing a specified control sequence to begin the closing handshake (detailed in Section 5.5.1). Upon receiving such a frame, the other peer sends a Close frame in response. The first peer then closes the connection. Any further data received after closing of connection is then discarded.

## Miscellaneous

> **Note:**
> WebSocket codes, extensions, subprotocols, etc. are registered at the IANA WebSocket Protocol Registry.

WebSocket extensions and subprotocols are negotiated via headers during the handshake. Sometimes extensions and subprotocols are very similar, but there is a clear distinction. Extensions control the WebSocket _frame_ and _modify_ the payload, while subprotocols structure the WebSocket _payload_ and _never modify_ anything. Extensions are optional and generalized (like compression); subprotocols are mandatory and localized (like ones for chat and for MMORPG games).

### Extensions

Think of an extension as compressing a file before emailing it to someone. Whatever you do, you're sending the _same_ data in different forms. The recipient will eventually be able to get the same data as your local copy, but it is sent differently. That's what an extension does. WebSockets defines a protocol and a simple way to send data, but an extension such as compression could allow sending the same data but in a shorter format.

> **Note:**
> Extensions are explained in sections 5.8, 9, 11.3.2, and 11.4 of the spec.

### Subprotocols

Think of a subprotocol as a custom XML schema or doctype declaration. You're still using XML and its syntax, but you're additionally restricted by a structure you agreed on. WebSocket subprotocols are just like that. They do not introduce anything fancy, they just establish structure. Like a doctype or schema, both parties must agree on the subprotocol; unlike a doctype or schema, the subprotocol is implemented on the server and cannot be externally referred to by the client.

> **Note:**
> Subprotocols are explained in sections 1.9, 4.2, 11.3.4, and 11.5 of the spec.

A client has to ask for a specific subprotocol. To do so, it will send something like this _as part of the original handshake_:

```http
GET /chat HTTP/1.1
...
Sec-WebSocket-Protocol: soap, wamp
```

or, equivalently:

```http
...
Sec-WebSocket-Protocol: soap
Sec-WebSocket-Protocol: wamp
```

Now the server must pick one of the protocols that the client suggested and it supports. If there is more than one, send the first one the client sent. Imagine our server can use both `soap` and `wamp`. Then, in the response handshake, it sends:

```http
Sec-WebSocket-Protocol: soap
```

> **Warning:**
> The server can't send more than one `Sec-WebSocket-Protocol` header.
> If the server doesn't want to use any subprotocol, **_it shouldn't send any `Sec-WebSocket-Protocol` header_**. Sending a blank header is incorrect. The client may close the connection if it doesn't get the subprotocol it wants.

If you want your server to obey certain subprotocols, then naturally you'll need extra code on the server. Let's imagine we're using a subprotocol `json`. In this subprotocol, all data is passed as JSON. If the client solicits this protocol and the server wants to use it, the server needs to have a JSON parser. Practically speaking, this will be part of a library, but the server needs to pass the data around.

> **Note:**
> To avoid name conflict, it's recommended to make your subprotocol name part of a domain string. If you are building a custom chat app that uses a proprietary format exclusive to Example Inc., then you might use this: `Sec-WebSocket-Protocol: chat.example.com`. Note that this isn't required, it's just an optional convention, and you can use any string you wish.

## Related

- Writing WebSocket client applications
- Tutorial: WebSocket server in C#
- Tutorial: WebSocket server in Java
