---
title: "Model Binding in ASP.NET Core (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/models/model-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Model Binding in ASP.NET Core

-->
-->

This article explains what model binding is, how it works, and how to customize its behavior.

## What is Model binding

Controllers and Razor pages work with data that comes from HTTP requests. For example, route data may provide a record key, and posted form fields may provide values for the properties of the model. Writing code to retrieve each of these values and convert them from strings to .NET types would be tedious and error-prone. Model binding automates this process. The model binding system:

* Retrieves data from various sources such as route data, form fields, and query strings.
* Provides the data to controllers and Razor pages in method parameters and `public` properties.
* Converts string data to .NET types.
* Updates properties of complex types.

## Example

Suppose you have the following action method:

```csharp
[HttpGet("{id}")]
public ActionResult<Pet> GetById(int id, bool dogsOnly)
```
And the app receives a request with this URL:

```http
https://contoso.com/api/pets/2?DogsOnly=true
```

Model binding goes through the following steps after the routing system selects the action method:

* Finds the first parameter of `GetById`, an integer named `id`.
* Looks through the available sources in the HTTP request and finds `id` = "2" in route data.
* Converts the string "2" into integer 2.
* Finds the next parameter of `GetById`, a boolean named `dogsOnly`.
* Looks through the sources and finds "DogsOnly=true" in the query string. Name matching is not case-sensitive.
* Converts the string "true" into boolean `true`.

The framework then calls the `GetById` method, passing in 2 for the `id` parameter, and `true` for the `dogsOnly` parameter.

In the preceding example, the model binding targets are method parameters that are Simple types. Targets can also be the properties of a complex type. After each property is successfully bound, model validation occurs for that property. The record of what data is bound to the model, and any binding or validation errors, is stored in ControllerBase.ModelState or PageModel.ModelState. To find out if this process was successful, the app checks the ModelState.IsValid flag.

## Targets

Model binding tries to find values for the following kinds of targets:

* Parameters of the controller action method that a request is routed to.
* Parameters of the Razor Pages handler method that a request is routed to.
* Public (`public`) properties of a controller or `PageModel` class, if specified by attributes.

### [BindProperty] attribute

Can be applied to a `public` property of a controller or `PageModel` class to cause model binding to target that property:

```csharp
public class EditModel : PageModel
{
    [BindProperty]
    public Instructor? Instructor { get; set; }

    // ...
}
```
### [BindProperties] attribute

Can be applied to a controller or `PageModel` class to tell model binding to target all `public` properties of the class:

```csharp
[BindProperties]
public class CreateModel : PageModel
{
    public Instructor? Instructor { get; set; }

    // ...
}
```
### Model binding for HTTP GET requests

By default, properties are not bound for HTTP GET requests. Typically, all you need for a GET request is a record ID parameter. The record ID is used to look up the item in the database. Therefore, there is no need to bind a property that holds an instance of the model. In scenarios where you do want properties bound to data from GET requests, set the `SupportsGet` property to `true`:

```csharp
[BindProperty(Name = "ai_user", SupportsGet = true)]
public string? ApplicationInsightsCookie { get; set; }
```

## Model binding simple and complex types

Model binding uses specific definitions for the types it operates on. A *simple type* is converted from a single string using `System.ComponentModel.TypeConverter` or a `TryParse` method. A *complex type* is converted from multiple input values. The framework determines the difference based on the existence of a `TypeConverter` or `TryParse`. We recommend creating a type converter or using `TryParse` for a `string` to `SomeType` conversion that doesn't require external resources or multiple inputs.

## Sources

By default, model binding gets data in the form of key-value pairs from the following sources in an HTTP request:

1. Form fields
1. The request body (For controllers that have the [ApiController] attribute.)
1. Route data
1. Query string parameters
1. Uploaded files

For each target parameter or property, the sources are scanned in the order indicated in the preceding list. There are a few exceptions:

* Route data and query string values are used only for simple types.
* Uploaded files are bound only to target types that implement `IFormFile` or `IEnumerable<IFormFile>`.

> **Note:**
> For form fields, model binding matches form data keys against model properties or action parameters. In HTML forms, input data is submitted using the `name` attribute of each form control; an element with only an `id` attribute is not included in the HTTP form submission. When using Tag Helpers for form model binding, the rendered HTML element includes `name` and `id` attributes automatically. Their values can differ for nested properties; only `name` determines the submitted form data key.

If the default source is not correct, use one of the following attributes to specify the source:

* `[FromQuery]` - Gets values from the query string.
* `[FromRoute]` - Gets values from route data.
* `[FromForm]` - Gets values from posted form fields.
* `[FromBody]` - Gets values from the request body.
* `[FromHeader]` - Gets values from HTTP headers.

> **Note:**
> C# union types are supported only with `[FromBody]`. The other binding sources—`[FromQuery]`, `[FromRoute]`, `[FromForm]`, and `[FromHeader]`—bind string values without JSON parsing, so they can't dispatch to a union case.

These attributes:

* Are added to model properties individually and not to the model class, as in the following example:

```csharp
public class Instructor
{
    public int Id { get; set; }

    [FromQuery(Name = "Note")]
    public string? NoteFromQueryString { get; set; }

    // ...
}
```
* Optionally accept a model name value in the constructor. This option is provided in case the property name doesn't match the value in the request. For instance, the value in the request might be a header with a hyphen in its name, as in the following example:

```csharp
public void OnGet([FromHeader(Name = "Accept-Language")] string language)
```
### [FromBody] attribute

Apply the `[FromBody]` attribute to a parameter to populate its properties from the body of an HTTP request. The ASP.NET Core runtime delegates the responsibility of reading the body to an input formatter. Input formatters are explained later in this article.

When `[FromBody]` is applied to a complex type parameter, any binding source attributes applied to its properties are ignored. For example, the following `Create` action specifies that its `pet` parameter is populated from the body:

```csharp
public ActionResult<Pet> Create([FromBody] Pet pet)
```
The `Pet` class specifies that its `Breed` property is populated from a query string parameter:

```csharp
public class Pet
{
    public string Name { get; set; } = null!;

    [FromQuery] // Attribute is ignored.
    public string Breed { get; set; } = null!;
}
```
In the preceding example:

* The `[FromQuery]` attribute is ignored.
* The `Breed` property is not populated from a query string parameter.

Input formatters read only the body and don't understand binding source attributes. If a suitable value is found in the body, that value is used to populate the `Breed` property.

Don't apply `[FromBody]` to more than one parameter per action method. Once the request stream is read by an input formatter, it's no longer available to be read again for binding other `[FromBody]` parameters.

### Additional sources

Source data is provided to the model binding system by *value providers*. You can write and register custom value providers that get data for model binding from other sources. For example, you might want data from cookies or session state. To get data from a new source:

* Create a class that implements `IValueProvider`.
* Create a class that implements `IValueProviderFactory`.
* Register the factory class in `Program.cs`.

The sample includes a value provider and factory example that gets values from cookies. Register custom value provider factories in `Program.cs`:

```csharp
builder.Services.AddControllers(options =>
{
    options.ValueProviderFactories.Add(new CookieValueProviderFactory());
});
```
The preceding code puts the custom value provider after all built-in value providers. To make it the first in the list, call `Insert(0, new CookieValueProviderFactory())` instead of `Add`.

## No source for a model property

By default, a model state error isn't created if no value is found for a model property. The property is set to null or a default value:

* Nullable simple types are set to `null`.
* Non-nullable value types are set to `default(T)`. For example, a parameter `int id` is set to 0.
* For complex Types, model binding creates an instance by using the default constructor, without setting properties.
* Arrays are set to `Array.Empty<T>()`, except that `byte[]` arrays are set to `null`.

If model state should be invalidated when nothing is found in form fields for a model property, use the `[BindRequired]` attribute.

Note that this `[BindRequired]` behavior applies to model binding from posted form data, not from JSON or XML data in a request body. Request body data is handled by input formatters.

## Type conversion errors

If a source is found but can't be converted into the target type, model state is flagged as invalid. The target parameter or property is set to null or a default value, as noted in the previous section.

In an API controller that has the `[ApiController]` attribute, invalid model state results in an automatic HTTP 400 response.

In a Razor page, redisplay the page with an error message:

```csharp
public IActionResult OnPost()
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    // ...

    return RedirectToPage("./Index");
}
```
When the page is redisplayed by the preceding code, the invalid input isn't shown in the form field. This is because the model property has been set to null or a default value. The invalid input does appear in an error message. If you want to redisplay the bad data in the form field, consider making the model property a string and doing the data conversion manually.

The same strategy is recommended if you don't want type conversion errors to result in model state errors. In that case, make the model property a string.

## Simple types

For an explanation of simple and complex types, see Model binding simple and complex types.

The simple types that the model binder can convert source strings into include the following:

* Boolean
* Byte, SByte
* Char
* DateOnly
* DateTime
* DateTimeOffset
* Decimal
* Double
* Enum
* Guid
* Int16, Int32, Int64
* Single
* TimeOnly
* TimeSpan
* UInt16, UInt32, UInt64
* Uri
* Version
