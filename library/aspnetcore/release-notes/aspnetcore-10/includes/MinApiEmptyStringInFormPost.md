---
title: "MinApiEmptyStringInFormPost"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/MinApiEmptyStringInFormPost.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# MinApiEmptyStringInFormPost

### Treating empty string in form post as null for nullable value types

When using the `[FromForm]` attribute with a complex object in Minimal APIs, empty string values in a form post are now converted to `null` rather than causing a parse failure. This behavior matches the processing logic for form posts not associated with complex objects in Minimal APIs.

```csharp
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapPost("/todo", ([FromForm] Todo todo) => TypedResults.Ok(todo));

app.Run();

public class Todo
{
  public int Id { get; set; }
  public DateOnly? DueDate { get; set; } // Empty strings map to `null`
  public string Title { get; set; }
  public bool IsCompleted { get; set; }
}
```

Thanks to @nvmkpk for contributing this change!
