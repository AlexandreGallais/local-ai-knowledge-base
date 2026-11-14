---
title: "ASP.NET Core Best Practices (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/best-practices.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Best Practices (part 3 of 3)

## Use In-process hosting with IIS

Using in-process hosting, an ASP.NET Core app runs in the same process as its IIS worker process. In-process hosting provides improved performance over out-of-process hosting because requests aren't proxied over the loopback adapter. The loopback adapter is a network interface that returns outgoing network traffic back to the same machine. IIS handles process management with the Windows Process Activation Service (WAS).

Projects default to the in-process hosting model in ASP.NET Core 3.0 or later.

For more information, see Host ASP.NET Core on Windows with IIS

## Don't assume that HttpRequest.ContentLength is not null

`HttpRequest.ContentLength` is null if the `Content-Length` header is not received. Null in that case means the length of the request body is not known; it doesn't mean the length is zero. Because all comparisons with null (except `==`) return false, the comparison `Request.ContentLength > 1024`, for example, might return `false` when the request body size is more than 1024. Not knowing this can lead to security holes in apps. You might think you're protecting against too-large requests when you aren't.

For more information, see this StackOverflow answer.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see Enterprise web app patterns. A complete production-quality sample web app that implements the patterns is available.
