---
title: "openapi-binary-file-response"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/openapi-binary-file-response.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# openapi-binary-file-response

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
