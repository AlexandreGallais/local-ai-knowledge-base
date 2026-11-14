---
title: "Model Binding in ASP.NET Core (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/models/model-binding.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Model Binding in ASP.NET Core (part 4 of 4)

## Manual model binding

Model binding can be invoked manually by using the `Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync*` method. The method is defined on both `ControllerBase` and `PageModel` classes. Method overloads let you specify the prefix and value provider to use. The method returns `false` if model binding fails. Here's an example:

```csharp
if (await TryUpdateModelAsync(
    newInstructor,
    "Instructor",
    x => x.Name, x => x.HireDate!))
{
    _instructorStore.Add(newInstructor);
    return RedirectToPage("./Index");
}

return Page();
```
`Microsoft.AspNetCore.Mvc.ControllerBase.TryUpdateModelAsync*`  uses value providers to get data from the form body, query string, and route data. `TryUpdateModelAsync` is typically:

* Used with Razor Pages and MVC apps using controllers and views to prevent over-posting.
* Not used with a web API unless consumed from form data, query strings, and route data. Web API endpoints that consume JSON use Input formatters to deserialize the request body into an object.

For more information, see TryUpdateModelAsync.

## [FromServices] attribute

This attribute's name follows the pattern of model binding attributes that specify a data source. But it's not about binding data from a value provider. It gets an instance of a type from the dependency injection container. Its purpose is to provide an alternative to constructor injection for when you need a service only if a particular method is called.

If an instance of the type isn't registered in the dependency injection container, the app throws an exception when attempting to bind the parameter. To make the parameter optional, use one of the following approaches:

* Make the parameter nullable.
* Set a default value for the parameter.

For nullable parameters, ensure that the parameter isn't `null` before accessing it.

## Json+PipeReader deserialization in MVC

Starting in .NET 10, the following functional areas of ASP.NET Core use overloads of `System.Text.Json.JsonSerializer.DeserializeAsync*` based on PipeReader instead of Stream:

* Minimal APIs (parameter binding, read request body)
* MVC (input formatters, model)
* The `Microsoft.AspNetCore.Http.HttpRequestJsonExtensions` Extension methods to read the request body as JSON.

For most applications, a transition from Stream to PipeReader provides better performance without requiring changes in application code. But if your application has a custom converter, the converter might not handle `System.Text.Json.Utf8JsonReader.HasValueSequence` correctly. If it doesn't, the result could be errors such as `System.ArgumentOutOfRangeException` or missing data when deserializing. You have the following options for getting your converter to work without PipeReader-related errors.

### Option 1: Temporary workaround

The quick workaround is to go back to using Stream without PipeReader support. To implement this option, set the "Microsoft.AspNetCore.UseStreamBasedJsonParsing" AppContext switch to "true". We recommend that you do this only as a temporary workaround, and update your converter to support `HasValueSequence` as soon as possible. The switch might be removed in .NET 11. Its only purpose was to give developers time to get their converters updated.

### Option 2: A quick fix for `JsonConverter` implementations

For this fix, you allocate an array from the `ReadOnlySequence`. This example shows what the code would look like:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    var span = reader.HasValueSequence ? reader.ValueSequence.ToArray() : reader.ValueSpan;
    // previous code
}
```

### Option 3: A more complicated but better performing fix

This fix involves setting up a separate code path for the `ReadOnlySequence` handling:

```csharp
public override T? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    if (reader.HasValueSequence)
    {
        reader.ValueSequence;
        // ReadOnlySequence optimized path
    }
    else
    {
        reader.ValueSpan;
        // ReadOnlySpan optimized path
    }
}
```

For more information, see
* `System.Text.Json.Serialization.JsonConverter`
* github.com/dotnet/aspnetcore/pull/62895

## Related content

* View or download sample code (how to download)
* Model validation in ASP.NET Core MVC
* Custom Model Binding in ASP.NET Core
