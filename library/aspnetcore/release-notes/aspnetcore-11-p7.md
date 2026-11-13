---
title: "What's new in ASP.NET Core in .NET 11 (part 7 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 11 (part 7 of 9)

## OpenAPI

This section describes new features for OpenAPI.

### Describe binary file responses

ASP.NET Core 11 introduces support for generating OpenAPI descriptions for operations that return binary file responses. This support maps the `FileContentResult` result type to an OpenAPI schema with `type: string` and `format: binary`.

#### Minimal APIs

Use the `Produces<T>` extension method with `T` of `FileContentResult` to specify the response type and content type:

```csharp
app.MapPost("/filecontentresult", () =>
{
    var content = "This endpoint returns a FileContentResult!"u8.ToArray();
    return TypedResults.File(content);
})
.Produces<FileContentResult>(contentType: MediaTypeNames.Application.Octet);
```

#### Controllers

Use the `ProducesResponseType<T>` attribute with `T` of `FileContentResult` to specify the response type and content type:

```csharp
[HttpPost("filecontentresult")]
[ProducesResponseType<FileContentResult>(StatusCodes.Status200OK, MediaTypeNames.Application.Octet)]
public IActionResult PostFileContentResult()
{
    var content = "This endpoint returns a FileContentResult!"u8.ToArray();
    return new FileContentResult(content, MediaTypeNames.Application.Octet);
}
```

---

The generated OpenAPI document describes the endpoint response as:

```yaml
responses:
  '200':
    description: OK
    content:
      application/octet-stream:
        schema:
          $ref: '#/components/schemas/FileContentResult'
```

The `FileContentResult` is defined in `components/schemas` as:

```yaml
components:
  schemas:
    FileContentResult:
      type: string
      format: binary
```

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

### HTTP QUERY in generated OpenAPI documents

OpenAPI document generation now recognizes HTTP QUERY as a known operation type. QUERY is a proposed safe, idempotent method that lets clients send a request body when describing a search, useful when a query is too large or too structured to fit in a URL. Routing already accepts arbitrary verb strings via `MapMethods`, and OpenAPI 3.2 adds a `query` field to the Path Item Object so this can be described in the OpenAPI document.

Note that `query` is only valid in an OpenAPI 3.2 document, so set the `OpenApiVersion` in the `OpenApiOptions`. In earlier OpenAPI versions, the `query` operation is generated within an `x-oai-additionalOperations` specification extension in the Path Item Object.

```csharp
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_2;
});

var app = builder.Build();

app.MapOpenApi();

app.MapMethods("/search", ["QUERY"], (SearchRequest request) =>
    SearchService.Run(request));

app.Run();
```

In an OpenAPI 3.2 document, the QUERY operation is described inline as a sibling of `get`, `post`, and other standard operations:

```json
"paths": {
  "/search": {
    "query": {
      "requestBody": { ... },
      "responses": { "200": { ... } }
    }
  }
}
```

In OpenAPI 3.0 and 3.1 documents, the same operation is represented under the `x-oai-additionalOperations` extension on the Path Item:

```json
"paths": {
  "/search": {
    "x-oai-additionalOperations": {
      "QUERY": {
        "requestBody": { ... },
        "responses": { "200": { ... } }
      }
    }
  }
}
```

Thank you @kilifu for this contribution!

### File stream result types appear in OpenAPI documents

`FileStreamResult`, `FileContentHttpResult`, and `FileStreamHttpResult` are now described as binary string schemas in generated OpenAPI documents, so clients see accurate response shapes for endpoints that stream files. Annotate the endpoint with `.Produces<FileContentHttpResult>(contentType: "application/pdf")` (or the equivalent `FileStreamHttpResult`/`FileStreamResult` type) so OpenAPI sees the result type and emits the binary schema.

Thank you @marcominerva for this contribution!

### OpenAPI schemas better match ASP.NET Core behavior

OpenAPI generation now handles several schema cases more accurately. Non-body enum parameters keep the original C# enum member names even when HTTP JSON options configure a `System.Text.Json.Serialization.JsonStringEnumConverter` naming policy, because query, route, header, and form binding use `Enum.TryParse` rather than JSON serialization. Array schema reference IDs now use valid component names such as `stringArray` and `TodoArray` instead of names with array syntax.

```csharp
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter(JsonNamingPolicy.KebabCaseLower));
});

app.MapGet("/orders", (OrderStatus status) => Results.Ok(status));
```

With this configuration, a body schema can still describe `OrderStatus.PendingReview` as `pending-review`, while the query parameter schema describes the accepted value as `PendingReview`.

Minimal API endpoints can support multiple `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*` extension method calls for the same status code—for example, to specify that a 200 response may arrive as `application/json` or `text/plain` with different schemas. The same support applies to MVC controllers via multiple `[ProducesResponseType]` attributes.

In prior releases, the framework collapsed each status code to a single response type and silently dropped the rest, making it impossible to describe endpoints that serve multiple content types. `Microsoft.AspNetCore.Mvc.ApiExplorer` now preserves every declared response type with deterministic ordering, and the generated OpenAPI document emits separate content entries per media type—or an `anyOf` schema when multiple types share the same content type.

Thank you @marcominerva for the array schema reference contribution!

### OpenAPI 3.2 by default

Generated OpenAPI documents now target OpenAPI 3.2 by default. Documents continue to generate as before. Set the document version explicitly if you need to target an earlier version for tooling that doesn't yet support OpenAPI 3.2.

To target an earlier version, specify it when calling `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*`:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
});
```

### Server-Sent Events support in OpenAPI 3.2

Endpoints that return `SseItem<T>` are described in the generated OpenAPI document with the OpenAPI 3.2 `itemSchema` shape for `text/event-stream` responses. The `itemSchema` describes a stream's per-event payload shape instead of falling back to a plain `string` schema.

```csharp
app.MapGet("/todos/stream", (CancellationToken ct) =>
    TypedResults.ServerSentEvents(GetTodosAsync(ct)))
   .WithName("StreamTodos");

static async IAsyncEnumerable<SseItem<Todo>> GetTodosAsync(
    [EnumeratorCancellation] CancellationToken ct = default)
{
    foreach (var todo in Todos.All)
    {
        yield return new SseItem<Todo>(todo) { EventId = todo.Id.ToString() };
        await Task.Delay(1000, ct);
    }
}
```

Return the stream through `TypedResults.ServerSentEvents`. A handler that returns `IAsyncEnumerable<SseItem<T>>` directly is serialized as JSON instead of SSE. Use the dedicated `SseItem<T>` overload without `eventType`. To use one event name for the whole stream, pass a plain `IAsyncEnumerable<T>` with `eventType`.

The generated 3.2 document describes the event payload with `itemSchema` referencing `#/components/schemas/Todo`, plus the standard SSE `event` and `id` string fields:

```yaml
responses:
  '200':
    description: OK
    content:
      text/event-stream:
        itemSchema:
          type: object
          required: [data]
          properties:
            data:
              $ref: '#/components/schemas/Todo'
            event: { type: string }
            id: { type: string }
```

If the event payload is a discriminated union (a preview C# 14 feature), OpenAPI also emits the union's case names as an `enum` on the `event` field.

### Select an environment for build-time OpenAPI document generation

Build-time OpenAPI document generation supports selecting the app environment with the `OpenApiGenerationEnvironment` MSBuild property. The property sets the host's environment for the generation process, equivalent to setting the `ASPNETCORE_ENVIRONMENT` or `DOTNET_ENVIRONMENT` environment variable. Environment-specific configuration and document transformations can therefore affect the generated OpenAPI document without requiring the environment variable to be set before running `dotnet build`.

Set the property in the project file:

```xml
<PropertyGroup>
  <OpenApiGenerationEnvironment>Development</OpenApiGenerationEnvironment>
</PropertyGroup>
```

For more information, see Generate OpenAPI documents.

Thank you @ldsenow for this contribution!

### OpenAPI reflects obsolete APIs

ASP.NET Core OpenAPI generation maps `[Obsolete]` to `deprecated: true` automatically for operations, schema types, and schema properties. API clients and documentation tools can therefore surface the same deprecation information as .NET callers without a custom OpenAPI transformer.

```csharp
app.MapGet("/catalog/{id}", GetCatalogItem);

#pragma warning disable CS0618 // This example intentionally declares and maps obsolete APIs.
app.MapGet("/catalog/legacy/{id}", GetLegacyCatalogItem);

[Obsolete("Use /catalog/{id}.")]
static LegacyCatalogItem GetLegacyCatalogItem(int id) =>
    new(id, $"Product {id}", $"SKU-{id:D4}");

static CatalogItem GetCatalogItem(int id) =>
    new(id, $"Product {id}", $"SKU-{id:D4}");

public sealed record CatalogItem(
    int Id,
    string Name,
    string StockKeepingUnit);

[Obsolete("Use CatalogItem.")]
public sealed record LegacyCatalogItem(
    int Id,
    string Name,
    [property: Obsolete("Use StockKeepingUnit.")] string Sku);

#pragma warning restore CS0618
```

The generated document marks the legacy operation, its response schema, and the `Sku` property as deprecated:

```json
{
  "paths": {
    "/catalog/legacy/{id}": {
      "get": {
        "deprecated": true
      }
    }
  },
  "components": {
    "schemas": {
      "LegacyCatalogItem": {
        "deprecated": true,
        "properties": {
          "sku": {
            "deprecated": true
          }
        }
      }
    }
  }
}
```

An `Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer` or `Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer` can override the generated value for a specific API.

Thank you @fickleEfrit for this contribution!
