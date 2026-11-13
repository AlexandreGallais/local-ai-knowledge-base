---
title: "kestrel-trailer-header-timeouts"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/kestrel-trailer-header-timeouts.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# kestrel-trailer-header-timeouts

### Kestrel applies trailer header timeouts

Kestrel now applies `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerLimits.RequestHeadersTimeout` to fragmented HTTP/2 and HTTP/3 trailer headers that don't finish sending the header block. The same timeout that protects initial request headers now also prevents connections from staying open indefinitely while Kestrel waits for trailer `HEADERS` frames to complete.

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(10);
});
```
