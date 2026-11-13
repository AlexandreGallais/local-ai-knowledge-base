---
title: "Overview of ASP.NET Core SignalR"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/introduction.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Overview of ASP.NET Core SignalR

ASP.NET Core SignalR is an open-source library that simplifies adding real-time web functionality to apps. Real-time web functionality enables server-side code to push content to clients instantly. There are many scenarios where an ASP.NET Core application can benefit from SignalR:

| Scenario | Examples |
|---|---|
| Applications that require high frequency updates from the server | Gaming, Social networks, Voting sites, Auctions, Maps, GPS |
| Dashboards and apps for monitoring | Company dashboards, Instant sales updates, Travel alerts |
| Apps that support collaboration | Whiteboard apps, Team meeting software |
| Apps that require notifications | Social networks, Email, Chat, Games, Travel alerts |

This article provides an introduction to working with SignalR in your ASP.NET Core apps.

## Features and source code

SignalR provides an API for creating server-to-client remote procedure calls (RPC). The RPCs invoke functions on clients from server-side .NET code. There are several supported platforms, each with their respective client SDK. The programming language invoked by the RPC call varies based on the platform.

SignalR for ASP.NET Core provides developers with many features:

* Handle connection management automatically
* Send messages to all connected clients simultaneously (for example, a chat room)
* Send messages to specific clients or groups of clients
* Scale to handle increasing traffic with options like the Azure SignalR Service and Redis backplane
* Support trimming and native ahead-of-time (AOT) compilation for supported scenarios
* Support polymorphic type handling in hub methods
* Support distributed tracing with `ActivitySource` for SignalR hub server and .NET client
* Work with the SignalR Hub Protocol

The source is hosted in the ASP.NET Core SignalR repository on GitHub.

## Transports

SignalR supports the following techniques for handling real-time communication (in order of graceful fallback):

* WebSockets
* Server-sent events
* Long polling

SignalR automatically chooses the best transport method within the capabilities of the server and client. WebSockets is the preferred transport because it generally provides the best performance.

## Hubs

SignalR uses *hubs* to communicate between clients and servers.

A hub is a high-level pipeline that a client and server use to call methods on each other. SignalR automatically handles the dispatching across machine boundaries, so clients can call methods on the server and vice versa. You can pass strongly typed parameters to methods and enable model binding.

SignalR supports two built-in hub protocols:

- A text protocol based on JSON (default)
- A binary protocol based on MessagePack. MessagePack generally creates smaller messages compared to JSON. For more information, see Use MessagePack Hub Protocol in SignalR for ASP.NET Core.

Hubs call client-side code by sending messages that contain the name and parameters of the client-side method. The configured protocol deserializes objects sent as method parameters. The client tries to match the name to a method in the client-side code. When the client finds a match, it calls the method and passes the deserialized parameter data.

## Related content

* Get started with ASP.NET Core SignalR
* ASP.NET Core SignalR supported platforms
* Use hubs in ASP.NET Core SignalR
* Logging and diagnostics in ASP.NET Core SignalR
* ASP.NET Core SignalR production hosting and scaling
* ASP.NET Core SignalR JavaScript client
* ASP.NET Core Blazor SignalR guidance
