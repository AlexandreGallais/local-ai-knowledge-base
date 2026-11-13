---
title: "ASP.NET Core Request Delegate Generator (RDG) for Native AOT"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/aot/request-delegate-generator/rdg.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Turn Map methods into request delegates with the ASP.NET Core Request Delegate Generator

-->
-->

-->

The ASP.NET Core Request Delegate Generator (RDG) is a compile-time source generator that compiles route handlers provided to a Minimal API to request delegates that can be processed by ASP.NET Core's routing infrastructure. The RDG is implicitly enabled when applications are published with AoT enabled or when trimming is enabled. The RDG generates trim and native AoT-friendly code.

> **Note:**
> * The Native AOT feature is currently in preview.
> * In .NET 8, not all ASP.NET Core features are compatible with Native AOT.

The RDG:

* Is a source generator.
* Turns each `Map` method into a `Microsoft.AspNetCore.Http.RequestDelegate` associated with the specific route. `Map` methods include the methods in the `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions`, such as `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGet*`, `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapPost*`, `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapPatch*`, `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapPut*`, and `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapDelete*`.

When publishing and Native AOT is ***not*** enabled:

* `Map` methods associated with a specific route are compiled in memory into a request delegate when the app starts, not when the app is built.
* The request delegates are generated at runtime.

When publishing with Native AOT enabled:

* `Map` methods associated with a specific route are compiled when the app is built. The RDG creates the request delegate for the route and the request delegate is compiled into the app's native image.
* Eliminates the need to generate the request delegate at runtime.
* Ensures:
  * The types used in the app's APIs are rooted in the app code in a way that is statically analyzable by the Native AOT tool-chain.
  * The required code isn't trimmed away.

The RDG:

* Is enabled automatically in projects when publishing with Native AOT is enabled or when trimming is enabled.
* Can be manually enabled even when not using Native AOT by setting `<EnableRequestDelegateGenerator>true</EnableRequestDelegateGenerator>` in the project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
	<EnableRequestDelegateGenerator>true</EnableRequestDelegateGenerator>
  </PropertyGroup>
	
</Project>
```
Manually enabling RDG can be useful for:

* Evaluating a project's compatibility with Native AOT.
* Reducing the app's startup time by pregenerating the request delegates.

Minimal APIs are optimized for using `System.Text.Json`, which requires using the System.Text.Json source generator. All types accepted as parameters to or returned from request delegates in Minimal APIs must be configured on a `System.Text.Json.Serialization.JsonSerializerContext` that's registered via ASP.NET Core's dependency injection:

```csharp
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(
                         0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

Todo[] sampleTodos =
[
    new(1, "Walk the dog"),
    new(2, "Do the dishes", DateOnly.FromDateTime(DateTime.Now)),
    new(3, "Do the laundry", DateOnly.FromDateTime(DateTime.Now.AddDays(1))),
    new(4, "Clean the bathroom"),
    new(5, "Clean the car", DateOnly.FromDateTime(DateTime.Now.AddDays(2)))
];

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.Run();

public record Todo(int Id, string? Title, DateOnly? DueBy = null, bool IsComplete = false);

[JsonSerializable(typeof(Todo[]))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
}
```
## Diagnostics for unsupported RDG scenarios

When the app is built, the RDG emits diagnostics for scenarios that aren't supported by Native AOT. The diagnostics are emitted as warnings and don't prevent the app from building. For the list of diagnostics, see ASP.NET Core Request Delegate Generator diagnostics.
