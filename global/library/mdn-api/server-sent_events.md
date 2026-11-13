---
title: "Server-sent events"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/server-sent_events/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Server-sent events

Traditionally, a web page has to send a request to the server to receive new data; that is, the page requests data from the server. With server-sent events, it's possible for a server to send new data to a web page at any time, by pushing messages to the web page. These incoming messages can be treated as _Events + data_ inside the web page.

## Concepts and usage

To learn how to use server-sent events, see our article Using server-sent events.

## Interfaces

- `EventSource`
    Defines all the features that handle connecting to a server, receiving events/data, errors, closing a connection, etc.

## Libraries

- Mercure: a real-time communication protocol (publish-subscribe) built on top of SSE
- Transmit: a native opinionated Server-Sent-Event (SSE) module built for AdonisJS
- EventSource polyfill for Node.js
- intercooler.js declarative SSE support

## Examples

- Simple SSE demo using PHP

## See also

- Learn: Making network requests with JavaScript
- JavaScript
- WebSockets
- Creating a wall/feed social application powered by server-sent events and its code on GitHub.
