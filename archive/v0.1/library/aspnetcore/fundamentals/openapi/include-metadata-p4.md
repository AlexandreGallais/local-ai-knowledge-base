---
title: "Include OpenAPI metadata in an ASP.NET Core app (part 4 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/include-metadata.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Include OpenAPI metadata in an ASP.NET Core app (part 4 of 6)

* The status code for the response defaults to 200.
* The schema for the response body of 2xx responses may be inferred from the return type of the action method, e.g. from `T` in `Microsoft.AspNetCore.Mvc.ActionResult`1`, but otherwise is considered to be not specified.
* The schema for the response body of 4xx responses is inferred to be a problem details object.
* The schema for the response body of 3xx and 5xx responses is considered to be not specified.
* The content-type for the response body can be inferred from the return type of the action method and the set of output formatters.

By default, there are no compile-time checks to ensure that the response metadata specified with a `[ProducesResponseType]` attribute is consistent with the actual behavior of the action method, which may return a different status code or response body type than specified by the metadata. To enable these checks, enable Web API analyzers.

> **Warning:**
> The `IncludeOpenAPIAnalyzers` property and its associated Web API analyzers are deprecated as of .NET 10 and will be removed in a future release. Setting `IncludeOpenAPIAnalyzers` to `true` emits warning `ASPDEPR007`. For more information, see IncludeOpenAPIAnalyzers property and MVC API analyzers are deprecated.

In controller-based apps, ASP.NET responds with a ProblemDetails response type when model validation fails or when the action method returns a result with a 4xx or 5xx HTTP status code. Validation errors typically use the 400 status code, so you can use the `[ProducesResponseType]` attribute to specify the error response for an action, as shown in the following example:

```csharp
[HttpPut("/todos/{id}")]
[ProducesResponseType<Todo>(StatusCodes.Status200OK,
    "application/json")]
[ProducesResponseType<Todo>(StatusCodes.Status201Created,
    "application/json")]
[ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest,
    "application/problem+json")]
public async Task<ActionResult<Todo>> CreateOrReplaceTodo(string id, Todo todo)
```

This example also illustrates how to define multiple response types for an action method, including the content type of the response body.

##### Describe binary file responses

To describe endpoints that return binary file responses, use the `[ProducesResponseType<FileContentResult>]` attribute to specify the response type and content type:

```csharp
[HttpPost("filecontentresult")]
[ProducesResponseType<FileContentResult>(StatusCodes.Status200OK, MediaTypeNames.Application.Octet)]
public IActionResult PostFileContentResult()
{
    var content = "This endpoint returns a FileContentResult!"u8.ToArray();
    return new FileContentResult(content, MediaTypeNames.Application.Octet);
}
```

This operation generates the same OpenAPI description as the Minimal API binary file response example with `FileContentResult` defined as `type: string` and `format: binary`. `Microsoft.AspNetCore.Mvc.FileStreamResult` behaves identically and produces a `FileStreamResult` component schema.

---

### Exclude endpoints from the generated document

By default, all endpoints that are defined in an app are documented in the generated OpenAPI file, but endpoints can be excluded from the document using attributes or extension methods.

The mechanism for specifying an endpoint that should be excluded depends on the type of app being developed.

#### Minimal APIs

Minimal APIs support two strategies for excluding a given endpoint from the OpenAPI document:

* `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ExcludeFromDescription*` extension method
* `[ExcludeFromDescription]` attribute

The following sample demonstrates the different strategies for excluding a given endpoint from the generated OpenAPI document.

```csharp
app.MapGet("/extension-method", () => "Hello world!")
    .ExcludeFromDescription();

app.MapGet("/attributes",
    [ExcludeFromDescription]
    () => "Hello world!");
```

#### Controllers

In controller-based apps, the `[ApiExplorerSettings]` attribute can be used to exclude an endpoint or all endpoints in a controller class from the OpenAPI document.

The following example demonstrates how to exclude an endpoint from the generated OpenAPI document:

```csharp
[HttpGet("/private")]
[ApiExplorerSettings(IgnoreApi = true)]
public IActionResult PrivateEndpoint() {
    return Ok("This is a private endpoint");
}
```

---
