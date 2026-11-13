---
title: "ASP.NET Core SignalR clients"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/client-features.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR clients

## Versioning, support, and compatibility

The SignalR clients ship alongside the server components and are versioned to match. Any supported client can safely connect to any supported server, and any compatibility issues would be considered bugs to be fixed. SignalR clients are supported in the same support lifecycle as the rest of .NET. See the .NET and .NET Core Support Policy for details.

Many features require a compatible client **and** server. See below for a table showing the minimum versions for various features.

The 1.x versions of SignalR map to the 2.1 and 2.2 .NET Core releases and have the same lifetime. For version 3.x and above, the SignalR version exactly matches the rest of .NET and has the same support lifecycle.

| SignalR version | .NET Core version | Support level | End of support |
| - | - | - | - |
| 1.0.x | 2.1.x | Long Term Support | August 21, 2021 |
| 1.1.x | 2.2.x | End Of Life | December 23, 2019 |
| 3.x or higher | *same as SignalR version* | See the .NET and .NET Core Support Policy |

**NOTE:** In ASP.NET Core 3.0, the JavaScript client *moved* to the `@microsoft/signalr` npm package.

## Feature distribution

The table below shows the features and support for the clients that offer real-time support. For each feature, the *minimum* version supporting this feature is listed. If no version is listed, the feature isn't supported.

| Feature | Server | .NET client | JavaScript client | Java client | Swift client |
| ---- | :-: | :-: | :-: | :-: | :-: |
| Azure SignalR Service Support |2.1.0|1.0.0|1.0.0|1.0.0|1.0.0-preview.1|
| Server-to-client Streaming          |2.1.0|1.0.0|1.0.0|1.0.0|1.0.0-preview.1|
| Client-to-server Streaming          |3.0.0|3.0.0|3.0.0|3.0.0|❌|
| Automatic Reconnection (.NET, JavaScript)          |3.0.0|3.0.0|3.0.0|❌|1.0.0-preview.1|
| WebSockets Transport |2.1.0|1.0.0|1.0.0|1.0.0|1.0.0-preview.1|
| Server-Sent Events Transport |2.1.0|1.0.0|1.0.0|❌|1.0.0-preview.1|
| Long Polling Transport |2.1.0|1.0.0|1.0.0|3.0.0|1.0.0-preview.1|
| JSON Hub Protocol |2.1.0|1.0.0|1.0.0|1.0.0|1.0.0-preview.1|
| MessagePack Hub Protocol |2.1.0|1.0.0|1.0.0|5.0.0|1.0.0-preview.1|
| Client Results |7.0.0|7.0.0|7.0.0|7.0.0|1.0.0-preview.1|
| Authentication Refresh |11.0.0|11.0.0|11.0.0|❌|❌|
| Cancel a non-streaming invocation |11.0.0|11.0.0|❌|❌|❌|

Support for enabling additional client features is tracked in our issue tracker.

## Browsers that don't support ECMAScript 6 (ES6)

SignalR targets ES6. For browsers that don't support ES6, transpile the library to ES5. For more information, see Getting Started with ES6 – Transpiling ES6 to ES5 with Traceur and Babel.

## Related content

* Get started with SignalR for ASP.NET Core
* Supported platforms
* Hubs
* JavaScript client
