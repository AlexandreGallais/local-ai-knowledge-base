---
title: "Format response data in ASP.NET Core Web API (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/web-api/advanced/formatting.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Format response data in ASP.NET Core Web API (part 2 of 2)

## Response format URL mappings

Clients can request a particular format as part of the URL, for example:

* In the query string or part of the path.
* By using a format-specific file extension such as .xml or .json.

The mapping from request path should be specified in the route the API is using. For example:

```csharp
[ApiController]
[Route("api/[controller]")]
[FormatFilter]
public class TodoItemsController : ControllerBase
{
    private readonly TodoItemStore _todoItemStore;

    public TodoItemsController(TodoItemStore todoItemStore)
        => _todoItemStore = todoItemStore;

    [HttpGet("{id:long}.{format?}")]
    public TodoItem? GetById(long id)
        => _todoItemStore.GetById(id);
```
The preceding route allows the requested format to be specified using an optional file extension. The `[FormatFilter]` attribute checks for the existence of the format value in the `RouteData` and maps the response format to the appropriate formatter when the response is created.

| Route                   | Formatter                          |
|-------------------------|------------------------------------|
| `/api/todoitems/5`      | The default output formatter       |
| `/api/todoitems/5.json` | The JSON formatter (if configured) |
| `/api/todoitems/5.xml`  | The XML formatter (if configured)  |

## Polymorphic deserialization

Built-in features provide a limited range of polymorphic serialization but no support for deserialization at all. Deserialization requires a custom converter. See Polymorphic deserialization for a complete sample of polymorphic deserialization.

## Additional resources

* View or download sample code (how to download)
