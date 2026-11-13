---
title: "zstandard-compression"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/zstandard-compression.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# zstandard-compression

### Zstandard response compression and request decompression

ASP.NET Core now supports Zstandard (zstd) for both response compression and request decompression. This adds zstd support to the existing response-compression and request-decompression middleware and enables zstd by default.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression();
builder.Services.AddRequestDecompression();
builder.Services.Configure<ZstandardCompressionProviderOptions>(options =>
{
    options.CompressionOptions = new ZstandardCompressionOptions
    {
        Quality = 6 // 1-22, higher = better compression, slower
    };
});
```

Thank you @manandre for this contribution!
