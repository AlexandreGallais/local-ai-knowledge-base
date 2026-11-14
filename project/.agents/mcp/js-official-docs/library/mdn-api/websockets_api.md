---
title: "WebSocket API (WebSockets)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websockets_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket API (WebSockets)

The **WebSocket API** makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive responses without having to poll the server for a reply.

The `WebSocket` interface doesn't support backpressure. As a result, when messages arrive faster than the application can process them, it will either fill up the device's memory by buffering those messages, become unresponsive due to 100% CPU usage, or both. If backpressure is an issue, use the WebTransport API instead: it supports backpressure and many other features not supported by `WebSocket`, such as unidirectional streams, out-of-order delivery, and unreliable data transmission via datagrams. The `WebSocketStream` interface is an earlier attempt to solve the backpressure issue, but it is non-standard and less well-supported than the Web Transport API.

> **Note:**
> If a page has an open WebSocket connection, the browser may not add it to the bfcache. It's therefore good practice to close the connection when the user has finished with the page. See working with the bfcache.

## Guides

- Writing WebSocket client applications
- Writing WebSocket servers
- Writing a WebSocket server in C#
- Writing a WebSocket server in Java
- Writing a WebSocket server in JavaScript (Deno)
- Using WebSocketStream to write a client

## Interfaces

- `WebSocket`
    The primary interface for connecting to a WebSocket server and then sending and receiving data on the connection.
- `WebSocketStream` (non-standard)
    Promise-based interface for connecting to a WebSocket server; uses streams to send and receive data on the connection.
- `CloseEvent`
    The event sent by the WebSocket object when the connection closes.
- `MessageEvent`
    The event sent by the WebSocket object when a message is received from the server.

## Related HTTP headers

The HTTP headers are used in the WebSocket handshake:

- `Sec-WebSocket-Key`
    An HTTP request header that contains a nonce from the client.
    This is used in the WebSocket opening handshake to verify that the client explicitly intends to open a WebSocket.
    It is added automatically by the browser.
- `Sec-WebSocket-Accept`
    An HTTP response header used in the _WebSocket opening handshake_ to indicate that the server is willing to upgrade to a WebSocket connection.
    The value in the directive is calculated from the value of `Sec-WebSocket-Key` in the corresponding request.
- `Sec-WebSocket-Version`
    An HTTP header that in requests indicates the version of the WebSocket protocol understood by the client.
    In responses, it is sent only if the requested protocol version is not supported by the server, and lists the versions that the server supports.
- `Sec-WebSocket-Protocol`
    An HTTP header that in requests indicates the sub-protocols supported by the client in preferred order.
    In responses, it indicates the sub-protocol selected by the server from the client's preferences.
- `Sec-WebSocket-Extensions`
    An HTTP header that in requests indicates the WebSocket extensions supported by the client in preferred order.
    In responses, it indicates the extension selected by the server from the client's preferences.

## Libraries

- AsyncAPI: A specification for describing event-driven architectures based on protocols like WebSocket. You can use it to describe WebSocket-based APIs just as you would describe REST APIs with the OpenAPI specification. Learn why you should consider using AsyncAPI with WebSocket and how to do so.
- µWebSockets: Highly scalable WebSocket server and client implementation for C++11 and Node.js.
- Socket.IO: A long polling/WebSocket based third party transfer protocol for Node.js.
- SocketCluster: A pub/sub WebSocket framework for Node.js with a focus on scalability.
- WebSocket-Node: A WebSocket server API implementation for Node.js.
- Total.js: Web application framework for Node.js (Example: WebSocket chat)
- SignalR: SignalR will use WebSockets under the covers when it's available, and gracefully fallback to other techniques and technologies when it isn't, while your application code stays the same.
- Caddy: A web server capable of proxying arbitrary commands (stdin/stdout) as a websocket.
- ws: a popular WebSocket client & server library for Node.js.
- cowboy: Cowboy is a small, fast and modern HTTP server for Erlang/OTP with WebSocket support.
- ZeroMQ: ZeroMQ is embeddable networking library that carries messages across in-process, IPC, TCP, UDP, TIPC, multicast and WebSocket.
- WebSocket King: A client tool to help develop, test and work with WebSocket servers.
- PHP WebSocket Server: Server written in PHP to handle connections via websockets `wss://` or `ws://` and normal sockets over `ssl://`, `tcp://`
- Django Channels: Django library that adds support for WebSockets (and other protocols that require long-running asynchronous connections).
- (Phoenix) Channels: Scalable real-time communication using WebSocket in Elixir Phoenix framework.
- Phoenix LiveView: Real-time interactive web experiences through WebSocket in Elixir Phoenix framework.
- Flask-SocketIO: gives Flask applications access to low latency bi-directional communications between the clients and the server.
- Gorilla WebSocket: Gorilla WebSocket is a Go implementation of the WebSocket protocol.

## See also

- RFC 6455 — The WebSocket Protocol
- WebSocket API Specification
- Server-Sent Events
