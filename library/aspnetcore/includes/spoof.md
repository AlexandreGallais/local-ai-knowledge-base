---
title: "spoof"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/spoof.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# spoof

> **Warning:**
  > API that relies on the Host header, such as `Microsoft.AspNetCore.Http.HttpRequest.Host` and `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.RequireHost*`, are subject to potential spoofing by clients.
>
> To prevent host and port spoofing, use one of the following approaches:
>
> * Use `Microsoft.AspNetCore.Http.HttpContext.Connection` (`Microsoft.AspNetCore.Http.ConnectionInfo.LocalPort`) where the ports are checked.
> * Employ Host filtering.
