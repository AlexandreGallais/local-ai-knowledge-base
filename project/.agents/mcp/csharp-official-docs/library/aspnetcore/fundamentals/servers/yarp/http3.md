---
title: "YARP HTTP/3"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/yarp/http3.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# YARP HTTP/3

## Introduction
YARP 1.1 supports HTTP/3 for inbound and outbound connections using the HTTP/3 support in .NET 7. To enable the HTTP/3 protocol in YARP you need to:

* Configure inbound connections in Kestrel
* Configure outbound connections in HttpClient

## Set up HTTP/3 on Kestrel

Protocols are required in the listener options:
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(kestrel =>
{
    kestrel.ListenAnyIP(443, portOptions =>
    {
        portOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
        portOptions.UseHttps();
    });
});
```

## HttpClient

The default version of HttpRequest should be replaced by "3", find more details about HttpRequest configuration.
