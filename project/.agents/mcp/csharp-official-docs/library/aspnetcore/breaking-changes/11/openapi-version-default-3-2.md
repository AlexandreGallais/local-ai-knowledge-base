---
title: "Breaking change: OpenApiVersion defaults to OpenApi3_2"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/11/openapi-version-default-3-2.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# OpenApiVersion defaults to OpenApi3_2

The default value of `Microsoft.AspNetCore.OpenApi.OpenApiOptions.OpenApiVersion` has changed from `OpenApiSpecVersion.OpenApi3_1` to `OpenApiSpecVersion.OpenApi3_2`. Apps that depend on OpenAPI 3.1 output without explicitly setting the version now produce OpenAPI 3.2 documents.

## Version introduced

.NET 11 Preview 6

## Previous behavior

Previously, `OpenApiOptions.OpenApiVersion` defaulted to `OpenApiSpecVersion.OpenApi3_1`. Calling `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*` without explicitly setting a version produced an OpenAPI 3.1 document.

## New behavior

Starting in ASP.NET Core 11 Preview 6, `OpenApiOptions.OpenApiVersion` defaults to `OpenApiSpecVersion.OpenApi3_2`. Calling `AddOpenApi` without explicitly setting a version now produces an OpenAPI 3.2 document.

## Type of breaking change

This change is a behavioral change.

## Reason for change

ASP.NET Core's OpenAPI support uses the latest released version of the OpenAPI specification as the default so that apps benefit from new capabilities without additional configuration.

## Recommended action

In most cases, no action is needed. To support downstream tooling that doesn't yet handle OpenAPI 3.2, configure the version explicitly:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
});
```

## Affected APIs

- `Microsoft.AspNetCore.OpenApi.OpenApiOptions.OpenApiVersion`
