---
title: "ASP.NET Core support for Native AOT (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/native-aot.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core support for Native AOT (part 2 of 2)

## Work with Minimal APIs and JSON payloads

The Minimal API framework is optimized for receiving and returning JSON payloads by using the `System.Text.Json`.

* The namespace imposes compatibility requirements for JSON and Native AOT.
* It requires the use of the System.Text.Json source generator.

All types transmitted as part of the HTTP body or returned from request delegates in Minimal APIs apps must be configured on a `System.Text.Json.Serialization.JsonSerializerContext` instance. The instance must be registered with ASP.NET Core dependency injection:

```csharp
using System.Text.Json.Serialization;
using MyFirstAotWebApi;

var builder = WebApplication.CreateSlimBuilder(args);
builder.Logging.AddConsole();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

var sampleTodos = TodoGenerator.GenerateTodos().ToArray();

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.Run();

[JsonSerializable(typeof(Todo[]))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
}
```
* The JSON serializer context is registered with the DI container. For more information, see Combine source generators and the `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain`.

* The custom `JsonSerializerContext` is annotated with the JsonSerializable attribute, which enables source generated JSON serializer code for the `ToDo` type.

A parameter on the delegate that isn't bound to the body **doesn't** need to be serializable. For example, a query string parameter can be a rich object type that implements `IParsable<T>`.

```csharp
public class Todo
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public DateOnly? DueBy { get; set; }
    public bool IsComplete { get; set; }
}

static class TodoGenerator
{
    private static readonly (string[] Prefixes, string[] Suffixes)[] _parts = new[]
        {
            (new[] { "Walk the", "Feed the" }, new[] { "dog", "cat", "goat" }),
            (new[] { "Do the", "Put away the" }, new[] { "groceries", "dishes", "laundry" }),
            (new[] { "Clean the" }, new[] { "bathroom", "pool", "blinds", "car" })
        };
    // Remaining code omitted for brevity.
```
## Review known issues

To report or review issues with Native AOT support in ASP.NET Core, see GitHub /dotnet/core/issues #8288).

## Related content

* Publish an ASP.NET Core app with Native AOT
* Native AOT deployment
* Optimize AOT deployments
