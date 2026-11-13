---
title: "Breaking change: Deprecation of WithOpenApi extension method"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/10/withopenapi-deprecated.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Deprecation of WithOpenApi extension method

The `Microsoft.AspNetCore.Builder.OpenApiEndpointConventionBuilderExtensions.WithOpenApi*` methods have been deprecated in .NET 10. Invoking these methods now produces the compile-time diagnostic `ASPDEPR002` and a standard `Obsolete` warning that states:

> WithOpenApi is deprecated and will be removed in a future release. For more information, visit <https://aka.ms/aspnet/deprecate/002>.

## Version introduced

.NET 10 Preview 7

## Previous behavior

Previously, you could use the `WithOpenApi` extension method without any warnings:

```csharp
app.MapGet("/weather", () => ...)
   .WithOpenApi();   // No warnings.
```

## New behavior

Starting in .NET 10, using the `WithOpenApi` extension method produces a compiler warning:

```csharp
app.MapGet("/weather", () => ...)
   .WithOpenApi();   // Warning ASPDEPR002: WithOpenApi is deprecated...
```

However, the call still compiles and executes.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

`Microsoft.AspNetCore.Builder.OpenApiEndpointConventionBuilderExtensions.WithOpenApi*` duplicated functionality now provided by the built-in OpenAPI document generation pipeline. Deprecating it simplifies the API surface and prepares for its eventual removal.

## Recommended action

Remove `.WithOpenApi()` calls from your code.

- If you used `Microsoft.AspNetCore.OpenApi` for document generation, use the `Microsoft.AspNetCore.Builder.OpenApiEndpointConventionBuilderExtensions.AddOpenApiOperationTransformer``1(``0,System.Func{Microsoft.OpenApi.OpenApiOperation,Microsoft.AspNetCore.OpenApi.OpenApiOperationTransformerContext,System.Threading.CancellationToken,System.Threading.Tasks.Task})` extension method.

  Before:

  ```csharp
  using Microsoft.AspNetCore.OpenApi;

  var builder = WebApplication.CreateBuilder();
  var app = builder.Build();

  app.MapGet("/weather", () => ...)
     .WithOpenApi(operation =>
     {
         // Per-endpoint tweaks
         operation.Summary     = "Gets the current weather report.";
         operation.Description = "Returns a short description and emoji.";
         return operation;
     });

  app.Run();
  ```

  After:

  ```csharp
  using Microsoft.AspNetCore.OpenApi;

  var builder = WebApplication.CreateBuilder();
  var app = builder.Build();

  app.MapGet("/weather", () => ...)
     .AddOpenApiOperationTransformer((operation, context, ct) =>
     {
         // Per-endpoint tweaks
         operation.Summary     = "Gets the current weather report.";
         operation.Description = "Returns a short description and emoji.";
         return Task.CompletedTask;
     });

  app.Run();
  ```

- If you used `Swashbuckle` for document generation, use the `IOperationFilter` API.
- If you used `NSwag` for document generation, use the `IOperationProcessor` API.

## Affected APIs

- `Microsoft.AspNetCore.Builder.OpenApiEndpointConventionBuilderExtensions.WithOpenApi*`
