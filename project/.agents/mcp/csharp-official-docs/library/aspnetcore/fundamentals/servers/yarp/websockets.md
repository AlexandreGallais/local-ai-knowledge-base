---
title: "YARP Proxying WebSockets and SPDY"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/yarp/websockets.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# YARP Proxying WebSockets and SPDY

## Introduction

YARP enables proxying WebSocket and SPDY connections by default. This support works with both the direct forwarding and full pipeline approaches.

WebSockets is a bidirectional streaming protocol built on HTTP/1.1 or later adapted to HTTP/2.

SPDY is the precursor to HTTP/2 and is commonly used in Kubernetes environments.

## HTTP/1.1 Upgrades

WebSockets and SPDY are built on top of HTTP/1.1 using a feature called connection upgrades. YARP proxies the initial request, and if the destination server responds with `101 Switching Protocols`, upgrades the connection to an opaque, bidirectional stream using the new protocol. YARP does not support upgrading to other protocols like HTTP/2 this way.

## HTTP/2

YARP supports WebSockets over HTTP/2 starting in .NET 7 and YARP 2.0. Kestrel is the only available AspNetCore server that will accept incoming HTTP/2 WebSocket requests and that support is automatically enabled. Browsers can detect this support advertised by the server and automatically switch to HTTP/2.

The incoming and outgoing protocol versions do not need to match. The incoming WebSocket request can be HTTP/1.1 or 2. There is no configuration specific to WebSockets for outgoing requests, YARP will use the ForwarderRequestConfig's Version and VersionPolicy to determine the outbound version to use. These default to HTTP/2 and RequestVersionOrLower.

WebSockets require different HTTP headers for HTTP/2 so YARP will add and remove these headers as needed when adapting between the different versions.

After the initial handshake WebSockets function the same way over both HTTP versions.

## Timeout

Http Request Timeouts (.NET 8+) can apply timeouts to all requests by default or by policy. These timeouts will be disabled after a WebSocket handshake. They will still apply to gRPC requests. For additional configuration see Timeouts.

The cluster's `ActivityTimeout` (100 seconds by default) still applies after the handshake. If no data or WebSocket keep-alive frames are sent in either direction for that duration, YARP closes the connection. To keep idle connections open, use *either* of the following approaches:

* Send WebSocket keep-alives at an interval shorter than `ActivityTimeout` from the client or the destination server.
* Increase the `ActivityTimeout` for the cluster.

Browser clients don't send keep-alives on their own, so they depend on the destination server's interval. In ASP.NET Core, `Microsoft.AspNetCore.Builder.WebSocketOptions.KeepAliveInterval` defaults to two minutes, which is longer than the default `ActivityTimeout`. For more information, see YARP Request Timeouts.
