---
title: "ASP.NET Core SignalR supported platforms"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/supported-platforms.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR supported platforms

## Server system requirements

SignalR for ASP.NET Core supports any server platform that ASP.NET Core supports.

## JavaScript client

The JavaScript client runs on the current Node.js long-term support (LTS) release and the following browsers:

| Browser                          | Version         |
| -------------------------------- | --------------- |
| Apple Safari, including iOS      | Current&dagger; |
| Google Chrome, including Android | Current&dagger; |
| Microsoft Edge                   | Current&dagger; |
| Mozilla Firefox                  | Current&dagger; |

&dagger;*Current* refers to the latest version of the browser.

The JavaScript client doesn't support Internet Explorer and other older browsers. The client might have unexpected behavior and errors on unsupported browsers.

## .NET client

The .NET client runs on any platform supported by ASP.NET Core. For example, .NET Multi-platform App UI (.NET MAUI) developers can use SignalR for building Android and iOS apps.

If the server runs IIS, the WebSockets transport requires IIS 8.0 or later on Windows Server 2012 or later. Other transports are supported on all platforms.

## Java client

The Java client supports Java 8 or later versions.

## Swift client

The Swift client supports Swift >= 5.10

## Unsupported clients

The following client is available for experimentation only, isn't currently supported, and may never be supported:

* C++ client

## Browsers that don't support ECMAScript 6 (ES6)

SignalR targets ES6. For browsers that don't support ES6, transpile the library to ES5. For more information, see Getting Started with ES6 – Transpiling ES6 to ES5 with Traceur and Babel.
