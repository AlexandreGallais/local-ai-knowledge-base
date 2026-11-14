---
title: "openapi-3-2-default"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/openapi-3-2-default.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# openapi-3-2-default

### OpenAPI 3.2 by default

Generated OpenAPI documents now target OpenAPI 3.2 by default. Documents continue to generate as before. Set the document version explicitly if you need to target an earlier version for tooling that doesn't yet support OpenAPI 3.2.

To target an earlier version, specify it when calling `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*`:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
});
```
