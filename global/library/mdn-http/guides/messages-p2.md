---
title: "HTTP messages (part 2 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/messages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTTP messages (part 2 of 2)

## HTTP/2 messages

HTTP/1.x uses text-based messages that are straightforward to read and construct, but as a result have a few downsides.
You can compress message bodies using `gzip` or other compression algorithms, but not headers.
Headers are often similar or identical in a client-server interaction, but they are repeated in successive messages on a connection.
There are many known methods to compress repetitive text that are very efficient, which leaves a large amount of bandwidth savings unutilized.

HTTP/1.x also has a problem called head-of-line (HOL) blocking, where a client has to wait for a response from the server before sending the next request.
HTTP pipelining tried to work around this, but poor support and complexity means it's rarely used and difficult to get right.
Several connections need to be opened to send requests concurrently; and warm (established and busy) connections are more efficient than cold ones due to TCP slow start.

In HTTP/1.1 if you want to make two requests in parallel, you have to open two connections:

This means that browsers are limited in the number of resources that they can download and render at the same time, which has typically been limited to 6 parallel connections.

HTTP/2 allows you to use a single TCP connection for multiple requests and responses at the same time.
This is done by wrapping messages into a binary frame and sending the requests and responses in a numbered **stream** on a connection.
Data and header frames are handled separately, which allows headers to be compressed via an algorithm called HPACK.
Using the same TCP connection to handle multiple requests at the same time is called _multiplexing_.

Requests are not necessarily sequential: stream 9 doesn't have to wait for stream 7 to finish, for instance.
The data from multiple streams are usually interleaved on the connection, so stream 9 and 7 can be received by the client at the same time.
There's a mechanism for the protocol to set a priority for each stream or resource.
Low-priority resources take up less bandwidth than higher-priority resources when they're being sent over different streams, or they could effectively be sent sequentially on the same connection if there are critical resources that should be handled first.

In general, despite all of the improvements and abstractions added over HTTP/1.x, virtually no changes are needed in the APIs used by developers to make use of HTTP/2 over HTTP/1.x.
When HTTP/2 is available in both the browser and the server, it is switched on and used automatically.

### Pseudo-headers

One notable change to messages in HTTP/2 are the use of pseudo-headers.
Where HTTP/1.x used the message start-line, HTTP/2 uses special pseudo-header fields beginning with `:`.
In requests, there are the following pseudo-headers:

- `:method` - the HTTP method.
- `:scheme` - the scheme portion of the target URI, which is often HTTP(S).
- `:authority` - the authority portion of the target URI.
- `:path` - the path and query parts of the target URI.

In responses, there is only one pseudo-header, and that's the `:status` which provides the code of the response.

We can make an HTTP/2 request using nghttp to fetch `example.com`, which will print out the request in a form that's more readable.
You can make the request using this command where the `-n` option discards the downloaded data and `-v` is for 'verbose' output, showing reception and transmission of frames:

```bash
nghttp -nv https://www.example.com
```

If you look down through the output, you'll see the timing for each frame transmitted and received:

```plain
[  0.123] <send|recv> <frame-type> <frame-details>
```

We don't have to go into too much detail on this output, but look out for the `HEADERS` frame in the format `[  0.123] send HEADERS frame ...`.
In the lines after the header transmission, you will see the following lines:

```http
[  0.447] send HEADERS frame ...
          ...
          :method: GET
          :path: /
          :scheme: https
          :authority: www.example.com
          accept: */*
          accept-encoding: gzip, deflate
          user-agent: nghttp2/1.61.0
```

This should look familiar if you're already comfortable working with HTTP/1.x and the concepts covered in the earlier section of this guide still apply.
This is the binary frame with the `GET` request for `example.com`, converted into a readable form by `nghttp`.
If you look further down the output of the command, you will see the `:status` pseudo-header in one of the streams received from the server:

```http
[  0.433] recv (stream_id=13) :status: 200
[  0.433] recv (stream_id=13) content-encoding: gzip
[  0.433] recv (stream_id=13) age: 112721
[  0.433] recv (stream_id=13) cache-control: max-age=604800
[  0.433] recv (stream_id=13) content-type: text/html; charset=UTF-8
[  0.433] recv (stream_id=13) date: Fri, 13 Sep 2024 12:56:07 GMT
[  0.433] recv (stream_id=13) etag: "3147526947+gzip"
...
```

And if you remove the timing and stream ID from this message, it should be even more familiar:

```http
:status: 200
content-encoding: gzip
age: 112721
```

Digging further into message frames, stream IDs and how the connection is managed is beyond the scope of this guide, but for the purpose of understanding and debugging HTTP/2 messages, you should be well-equipped using the knowledge and tools in this article.

## Conclusion

This guide provides a general overview of the anatomy of HTTP messages, using the HTTP/1.1 format for illustration.
We also explored HTTP/2 message framing, which introduces a layer between the HTTP/1.x syntax and the underlying transport protocol without fundamentally modifying HTTP's semantics.
HTTP/2 was introduced to solve the head-of-line blocking issues present in HTTP/1.x by enabling multiplexing of requests.

One issue that remained in HTTP/2 is that even though head-of-line blocking was fixed in the protocol level, there is still a performance bottleneck due to head-of-line blocking within TCP (at the transport level).
HTTP/3 addresses this limitation by using QUIC, a protocol built on UDP, instead of TCP.
This change improves performance, reduces connection setup time, and enhances stability on degraded or unreliable networks.
HTTP/3 retains the same core HTTP semantics, so features like request methods, status codes, and headers remain consistent across all three major HTTP versions.

If you understand HTTP/1.1's semantics, you already have a solid foundation for grasping HTTP/2 and HTTP/3.
The main difference lies in **how** these semantics are implemented at the transport level.
By following the examples and concepts in this guide, you should now feel equipped to work with HTTP and understand the meaning of messages, and how applications use HTTP to send and receive data.

## See also

- Evolution of HTTP
- Protocol upgrade mechanism
- Glossary terms:
  - HTTP
  - HTTP/2
  - QUIC
