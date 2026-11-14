---
title: "IHttpContextAccessor/HttpContext in ASP.NET Core SignalR"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/httpcontext.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# `IHttpContextAccessor`/`HttpContext` in ASP.NET Core SignalR

`Microsoft.AspNetCore.Http.IHttpContextAccessor`/`Microsoft.AspNetCore.Http.HttpContext` generally should be avoided with SignalR because a valid `Microsoft.AspNetCore.Http.HttpContext` isn't always available. In most cases, the context doesn't exist (`null`).

Even when an `Microsoft.AspNetCore.Http.HttpContext` instance is available, the context is dependent on the transport:

* WebSockets receives a single context as the result of the initial handshake.
* Long polling receives a new context per client "poll" request.
* A SignalR service receives a mocked/faked/shim context.

When working within a SignalR hub, you can access the `Microsoft.AspNetCore.Http.HttpContext` directly using the `Microsoft.AspNetCore.SignalR.GetHttpContextExtensions.GetHttpContext*` method. This method returns the `Microsoft.AspNetCore.Http.HttpContext` for the current connection or `null` if the connection isn't associated with an HTTP request. This is particularly useful for retrieving HTTP connection information, such as headers and query strings, directly within the hub. We recommend calling this method over `Microsoft.AspNetCore.Http.IHttpContextAccessor` for accessing `Microsoft.AspNetCore.Http.HttpContext` in the hub. For more information, see Use hubs in ASP.NET Core SignalR.

For guidance on `Microsoft.AspNetCore.Http.IHttpContextAccessor`/`Microsoft.AspNetCore.Http.HttpContext` in ASP.NET Core Blazor apps, see IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps.
