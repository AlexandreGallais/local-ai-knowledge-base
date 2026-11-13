---
title: "Writing WebSocket servers (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websockets_api/writing_websocket_servers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Writing WebSocket servers

A WebSocket server is nothing more than an application listening on any port of a TCP server that follows a specific protocol. Creating a custom server can seem overwhelming if you have never done it before. It can actually be quite straightforward to implement a basic <example-value> server on your platform of choice, though.

A WebSocket server can be written in any server-side programming language that is capable of Berkeley sockets, such as C(++), Python, PHP, or server-side JavaScript. This is not a tutorial in any specific language, but serves as a guide to facilitate writing your own server.

This article assumes you're already familiar with how HTTP works, and that you have a moderate level of programming experience. Depending on language support, knowledge of TCP sockets may be required. The scope of this guide is to present the minimum knowledge you need to write a WebSocket server.

> **Note:**
> Read the latest official WebSockets specification, RFC 6455. Sections 1 and 4-7 are especially interesting to server implementors. Section 10 discusses security and you should definitely peruse it before exposing your server.

A WebSocket server is explained on a very low level here. WebSocket servers are often separate and specialized servers (for load-balancing or other practical reasons), so you will often use a reverse proxy (such as a regular HTTP server) to detect WebSocket handshakes, pre-process them, and send those clients to a real WebSocket server. This means that you don't have to bloat your server code with cookie and authentication handlers (for example).

## The WebSocket handshake

First, the server must listen for incoming socket connections using a standard TCP socket. Depending on your platform, this may be handled for you automatically. For example, let's assume that your server is listening on `example.com`, port 8000, and your socket server responds to `GET` requests at `example.com/chat`.

> **Warning:**
> The server may listen on any port it chooses, but if it chooses any port other than 80 or 443, it may have problems with firewalls and/or proxies. Browsers generally require a secure connection for WebSockets, although they may offer an exception for local devices.

The handshake is the "Web" in WebSockets. It's the bridge from HTTP to WebSockets. In the handshake, details of the connection are negotiated, and either party can back out before completion if the terms are unfavorable. The server must be careful to understand everything the client asks for, otherwise security issues can occur.

> **Note:**
> The request-uri (`/chat` here) has no defined meaning in the spec. So, many people use it to let one server handle multiple WebSocket applications. For example, `example.com/chat` could invoke a multiuser chat app, while `/game` on the same server might invoke a multiplayer game.

### Client handshake request

Even though you're building a server, a client still has to start the WebSocket handshake process by contacting the server and requesting a WebSocket connection. So, you must know how to interpret the client's request. The **client** will send a pretty standard HTTP request with headers that looks like this (the HTTP version **must** be 1.1 or greater, and the method **must** be `GET`):

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <example-value>
Sec-WebSocket-Version: 13
```

The client can solicit extensions and/or subprotocols here; see Miscellaneous for details. Also, common headers like `User-Agent`, `Referer`, `Cookie`, or authentication headers might be there as well. Do whatever you want with those; they don't directly pertain to the WebSocket. It's also safe to ignore them. In many common setups, a reverse proxy has already dealt with them.

> **Note:**
> All **browsers** send an `Origin` header. You can use this header for security (checking for same origin, automatically allowing or denying, etc.) and send a 403 Forbidden if you don't like what you see. This is effective against Cross Site WebSocket Hijacking (CSWH). However, be warned that non-browser agents can send a faked `Origin`. Most applications reject requests without this header.

If any header is not understood or has an incorrect value, the server should send a `400` ("Bad Request") response and immediately close the socket. As usual, it may also give the reason why the handshake failed in the HTTP response body, but the message may never be displayed (browsers do not display it). If the server doesn't understand that version of WebSockets, it should send a `Sec-WebSocket-Version` header back that contains the version(s) it does understand. In the example above, it indicates version 13 of the WebSocket protocol.

The most interesting header here is `Sec-WebSocket-Key`. Let's look at that next.

> **Note:**
> Regular HTTP status codes can be used only before the handshake. After the handshake succeeds, you have to use a different set of codes (defined in section 7.4 of the spec).

### Server handshake response

When the **server** receives the handshake request, it should send back a special response that indicates that the protocol will be changing from HTTP to WebSocket. That header looks something like the following (remember each header line ends with `\r\n` and put an extra `\r\n` after the last one to indicate the end of the header):

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: <example-value>
```

Additionally, the server can decide on extension/subprotocol requests here; see Miscellaneous for details. The `Sec-WebSocket-Accept` header is important in that the server must derive it from the `Sec-WebSocket-Key` that the client sent to it. To get it, concatenate the client's `Sec-WebSocket-Key` and the string `"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"` together (it's a "magic string"), take the SHA-1 hash of the result, and return the base64 encoding of that hash.

> **Note:**
> This seemingly overcomplicated process exists so that it's obvious to the client whether the server supports WebSockets. This is important because security issues might arise if the server accepts a WebSockets connection but interprets the data as an HTTP request.

So if the Key was `"dGhlIHNhbXBsZSBub25jZQ=="`, the `Sec-WebSocket-Accept` header's value is `"s3pPLMBiTxaQ9kYGzzhZRbK+xOo="`. Once the server sends these headers, the handshake is complete and you can start swapping data!

> **Note:**
> The server can send other headers like `Set-Cookie`, or ask for authentication or redirects via other status codes, before sending the reply handshake.

### Keeping track of clients

This doesn't directly relate to the WebSocket protocol, but it's worth mentioning here: your server must keep track of clients' sockets so you don't keep handshaking again with clients who have already completed the handshake. The same client IP address can try to connect multiple times. However, the server can deny them if they attempt too many connections in order to save itself from Denial-of-Service attacks.

For example, you might keep a table of usernames or ID numbers along with the corresponding `WebSocket` and other data that you need to associate with that connection.
