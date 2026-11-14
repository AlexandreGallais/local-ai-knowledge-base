---
title: ".NET 6 breaking change: Default console logger formatting in container images"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/containers/6.0/console-formatter-default.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Default console logger formatting in container images

The default console formatter that's configured in `aspnet` containers has changed.

## Previous behavior

In previous servicing releases of .NET 6, `aspnet` container images were configured with the `Logging__Console__FormatterName` environment variable set to `Json`. This resulted in console output formatted similarly to the following:

```txt
{"EventId":0,"LogLevel":"Information","Category":"Microsoft.Hosting.Lifetime","Message":"Now listening on: http://localhost:7000/","State":{"Message":"Now listening on: http://localhost:7000/","address":"http://localhost:7000/","{OriginalFormat}":"Now listening on: {address}"}}
{"EventId":0,"LogLevel":"Information","Category":"Microsoft.Hosting.Lifetime","Message":"Now listening on: http://localhost:7001/","State":{"Message":"Now listening on: http://localhost:7001/","address":"http://localhost:7001/","{OriginalFormat}":"Now listening on: {address}"}}
{"EventId":0,"LogLevel":"Information","Category":"Microsoft.Hosting.Lifetime","Message":"Now listening on: http://localhost:7002/","State":{"Message":"Now listening on: http://localhost:7002/","address":"http://localhost:7002/","{OriginalFormat}":"Now listening on: {address}"}}
{"EventId":0,"LogLevel":"Information","Category":"Microsoft.Hosting.Lifetime","Message":"Application started. Press Ctrl\u002BC to shut down.","State":{"Message":"Application started. Press Ctrl\u002BC to shut down.","{OriginalFormat}":"Application started. Press Ctrl\u002BC to shut down."}}
{"EventId":0,"LogLevel":"Information","Category":"Microsoft.Hosting.Lifetime","Message":"Hosting environment: Development","State":{"Message":"Hosting environment: Development","envName":"Development","{OriginalFormat}":"Hosting environment: {envName}"}}
{"EventId":0,"LogLevel":"Information","Category":"Microsoft.Hosting.Lifetime","Message":"Content root path: C:\\source\\temp\\web50","State":{"Message":"Content root path: C:\\source\\temp\\web50","contentRoot":"C:\\source\\temp\\web50","{OriginalFormat}":"Content root path: {contentRoot}"}}
```

## New behavior

Starting in .NET 6.0.5, `aspnet` container images have the `Logging__Console__FormatterName` environment variable unset by default. This results in simple, multiline, human-readable console output similar to the following:

```txt
warn: Microsoft.AspNetCore.Server.HttpSys.MessagePump[37]
      Overriding address(es) ''. Binding to endpoints added to UrlPrefixes instead.
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:7000/
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:7001/
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:7002/
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: C:\source\temp\web50
```

## Version introduced

.NET 6.0.5 (May 2022 servicing)

## Type of breaking change

This change can affect source compatibility.

## Reason for change

When the change to use JSON formatting was introduced in the .NET 6 GA release, it broke many scenarios that relied on the original, simple formatting as described in dotnet/dotnet-docker#2725.

## Recommended action

If you want to continue using the JSON formatting, you can configure your container to use it by setting the `Logging__Console__FormatterName` environment variable value to `Json`.

## Affected APIs

None.

## See also

- dotnet/dotnet-docker#3706
