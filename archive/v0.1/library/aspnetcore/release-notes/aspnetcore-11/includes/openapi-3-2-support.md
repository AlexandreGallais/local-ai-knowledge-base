---
title: "openapi-3-2-support"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/openapi-3-2-support.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# openapi-3-2-support

### OpenAPI 3.2.0 support (Breaking Change)

`Microsoft.AspNetCore.OpenApi` now supports OpenAPI 3.2.0 through an updated dependency on `Microsoft.OpenApi` 3.3.1. This update includes breaking changes from the underlying library. For more information, see the Microsoft.OpenApi upgrade guide.

To generate an OpenAPI 3.2.0 document, specify the version when calling `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*`:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_2;
});
```

Subsequent updates take advantage of new capabilities in the 3.2.0 specification, such as item schema support for streaming events.

Thank you @baywet for this contribution!
