---
title: "Create responses in Minimal API applications (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis/responses.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Create responses in Minimal API applications (part 5 of 5)

## Configure JSON serialization options

By default, Minimal API apps use `Web defaults` options during JSON serialization and deserialization.

### Configure JSON serialization options globally

Options can be configured globally for an app by invoking `Microsoft.Extensions.DependencyInjection.HttpJsonServiceExtensions.ConfigureHttpJsonOptions*`. The following example includes public fields and formats JSON output.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options => {
    options.SerializerOptions.WriteIndented = true;
    options.SerializerOptions.IncludeFields = true;
});

var app = builder.Build();

app.MapPost("/", (Todo todo) => {
    if (todo is not null) {
        todo.Name = todo.NameField;
    }
    return todo;
});

app.Run();

class Todo {
    public string? Name { get; set; }
    public string? NameField;
    public bool IsComplete { get; set; }
}
// If the request body contains the following JSON:
//
// {"nameField":"Walk dog", "isComplete":false}
//
// The endpoint returns the following JSON:
//
// {
//    "name":"Walk dog",
//    "nameField":"Walk dog",
//    "isComplete":false
// }
```
Since fields are included, the preceding code reads `NameField` and includes it in the output JSON.

### Configure JSON serialization options for an endpoint

To configure serialization options for an endpoint, invoke `Microsoft.AspNetCore.Http.Results.Json*` and pass to it a `System.Text.Json.JsonSerializerOptions` object, as shown in the following example:

```csharp
using System.Text.Json;

var app = WebApplication.Create();

var options = new JsonSerializerOptions(JsonSerializerDefaults.Web)
    { WriteIndented = true };

app.MapGet("/", () => 
    Results.Json(new Todo { Name = "Walk dog", IsComplete = false }, options));

app.Run();

class Todo
{
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
// The endpoint returns the following JSON:
//
// {
//   "name":"Walk dog",
//   "isComplete":false
// }
```
As an alternative, use an overload of `Microsoft.AspNetCore.Http.HttpResponseJsonExtensions.WriteAsJsonAsync*` that accepts a `System.Text.Json.JsonSerializerOptions` object. The following example uses this overload to format the output JSON:

```csharp
using System.Text.Json;

var app = WebApplication.Create();

var options = new JsonSerializerOptions(JsonSerializerDefaults.Web) {
    WriteIndented = true };

app.MapGet("/", (HttpContext context) =>
    context.Response.WriteAsJsonAsync<Todo>(
        new Todo { Name = "Walk dog", IsComplete = false }, options));

app.Run();

class Todo
{
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
// The endpoint returns the following JSON:
//
// {
//   "name":"Walk dog",
//   "isComplete":false
// }
```
## Related content

* Authentication and authorization in Minimal APIs
