---
title: "Format response data in ASP.NET Core Web API (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/advanced/formatting.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Format response data in ASP.NET Core Web API

ASP.NET Core MVC supports formatting response data, using specified formats or in response to a client's request.

## Format-specific Action Results

Some action result types are specific to a particular format, such as `Microsoft.AspNetCore.Mvc.JsonResult` and `Microsoft.AspNetCore.Mvc.ContentResult`. Actions can return results that always use a specified format, ignoring a client's request for a different format. For example, returning `JsonResult` returns JSON-formatted data and returning `ContentResult` returns plain-text-formatted string data.

An action isn't required to return any specific type. ASP.NET Core supports any object return value. Results from actions that return objects that aren't `Microsoft.AspNetCore.Mvc.IActionResult` types are serialized using the appropriate `Microsoft.AspNetCore.Mvc.Formatters.IOutputFormatter` implementation. For more information, see Controller action return types in ASP.NET Core web API.

By default, the built-in helper method `Microsoft.AspNetCore.Mvc.ControllerBase.Ok*` returns JSON-formatted data:

```csharp
[HttpGet]
public IActionResult Get()
    => Ok(_todoItemStore.GetList());
```
The sample code returns a list of todo items. Using the F12 browser developer tools or http-repl with the previous code displays:

* The response header containing **content-type:** `application/json; charset=utf-8`.
* The request headers. For example, the `Accept` header. The `Accept` header is ignored by the preceding code.

To return plain text formatted data, use `Microsoft.AspNetCore.Mvc.ContentResult` and the `Microsoft.AspNetCore.Mvc.ControllerBase.Content*` helper:

```csharp
[HttpGet("Version")]
public ContentResult GetVersion()
    => Content("v1.0.0");
```
In the preceding code, the `Content-Type` returned is `text/plain`.

For actions with multiple return types, return `IActionResult`. For example, when returning different HTTP status codes based on the result of the operation.

## Content negotiation

Content negotiation occurs when the client specifies an Accept header. The default format used by ASP.NET Core is JSON. Content negotiation is:

* Implemented by `Microsoft.AspNetCore.Mvc.ObjectResult`.
* Built into the status code-specific action results returned from the helper methods. The action results helper methods are based on `ObjectResult`.

When a model type is returned, the return type is `ObjectResult`.

The following action method uses the `Ok` and `NotFound` helper methods:

```csharp
[HttpGet("{id:long}")]
public IActionResult GetById(long id)
{
    var todo = _todoItemStore.GetById(id);

    if (todo is null)
    {
        return NotFound();
    }

    return Ok(todo);
}
```
By default, ASP.NET Core supports the following media types:

* `application/json`
* `text/json`
* `text/plain`

Tools such as Fiddler or http-repl can set the `Accept` request header to specify the return format. When the `Accept` header contains a type the server supports, that type is returned. The next section shows how to add additional formatters.

Controller actions can return POCOs (Plain Old CLR Objects). When a POCO is returned, the runtime automatically creates an `ObjectResult` that wraps the object. The client gets the formatted serialized object. If the object being returned is `null`, a `204 No Content` response is returned.

The following example returns an object type:

```csharp
[HttpGet("{id:long}")]
public TodoItem? GetById(long id)
    => _todoItemStore.GetById(id);
```
In the preceding code, a request for a valid todo item returns a `200 OK` response. A request for an invalid todo item returns a `204 No Content` response.

### The Accept header

Content *negotiation* takes place when an `Accept` header appears in the request. When a request contains an accept header, ASP.NET Core:

* Enumerates the media types in the accept header in preference order.
* Tries to find a formatter that can produce a response in one of the formats specified.

If no formatter is found that can satisfy the client's request, ASP.NET Core:

* Returns `406 Not Acceptable` if `Microsoft.AspNetCore.Mvc.MvcOptions.ReturnHttpNotAcceptable` is set to `true`, or -
* Tries to find the first formatter that can produce a response.

If no formatter is configured for the requested format, the first formatter that can format the object is used. If no `Accept` header appears in the request:

* The first formatter that can handle the object is used to serialize the response.
* There isn't any negotiation taking place. The server is determining what format to return.

If the Accept header contains `*/*`, the Header is ignored unless `RespectBrowserAcceptHeader` is set to true on `Microsoft.AspNetCore.Mvc.MvcOptions`.

### Browsers and content negotiation

Unlike typical API clients, web browsers supply `Accept` headers. Web browsers specify many formats, including wildcards. By default, when the framework detects that the request is coming from a browser:

* The `Accept` header is ignored.
* The content is returned using the first registered output formatter that can handle the response type, unless otherwise configured.

This approach provides a more consistent experience across browsers when consuming APIs.

To configure an app to respect browser accept headers, set the `Microsoft.AspNetCore.Mvc.MvcOptions.RespectBrowserAcceptHeader` property to `true`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.RespectBrowserAcceptHeader = true;
});
```
## Configure formatters

Apps that need to support extra formats can add the appropriate NuGet packages and configure support. There are separate formatters for input and output. Input formatters are used by Model Binding. Output formatters are used to format responses. For information on creating a custom formatter, see Custom Formatters.

### Add XML format support

To configure XML formatters implemented using `System.Xml.Serialization.XmlSerializer`, call `Microsoft.Extensions.DependencyInjection.MvcXmlMvcBuilderExtensions.AddXmlSerializerFormatters*`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddXmlSerializerFormatters();
```
When using the preceding code, controller methods return the appropriate format based on the request's `Accept` header.

### Configure `System.Text.Json`-based formatters

To configure features for the `System.Text.Json`-based formatters, use `Microsoft.AspNetCore.Mvc.JsonOptions.JsonSerializerOptions`. The following highlighted code configures PascalCase formatting instead of the default camelCase formatting:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });
```
To configure output serialization options for specific actions, use `Microsoft.AspNetCore.Mvc.JsonResult`. For example:

```csharp
[HttpGet]
public IActionResult Get() 
    => new JsonResult(
        _todoItemStore.GetList(),
        new JsonSerializerOptions { PropertyNamingPolicy = null });
```
### Add `Newtonsoft.Json`-based JSON format support

The default JSON formatters use `System.Text.Json`. To use the `Newtonsoft.Json`-based formatters, install the `Microsoft.AspNetCore.Mvc.NewtonsoftJson` NuGet package and configure it in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddNewtonsoftJson();
```
In the preceding code, the call to `AddNewtonsoftJson` configures the following Web API, MVC, and Razor Pages features to use `Newtonsoft.Json`:

* Input and output formatters that read and write JSON
* `Microsoft.AspNetCore.Mvc.JsonResult`
* JSON Patch
* `Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper`
* TempData

Some features may not work well with `System.Text.Json`-based formatters and require a reference to the `Newtonsoft.Json`-based formatters. Continue using the `Newtonsoft.Json`-based formatters when the app:

* Uses `Newtonsoft.Json` attributes. For example, `[JsonProperty]` or `[JsonIgnore]`.
* Customizes the serialization settings.
* Relies on features that `Newtonsoft.Json` provides.

To configure features for the `Newtonsoft.Json`-based formatters, use `Microsoft.AspNetCore.Mvc.MvcNewtonsoftJsonOptions.SerializerSettings`:

```csharp
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver = new DefaultContractResolver();
    });
```
To configure output serialization options for specific actions, use `JsonResult`. For example:

```csharp
[HttpGet]
public IActionResult GetNewtonsoftJson()
    => new JsonResult(
        _todoItemStore.GetList(),
        new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
```
### Format `ProblemDetails` and `ValidationProblemDetails` responses

The following action method calls `Microsoft.AspNetCore.Mvc.ControllerBase.Problem*` to create a `Microsoft.AspNetCore.Mvc.ProblemDetails` response:

```csharp
[HttpGet("Error")]
public IActionResult GetError()
    => Problem("Something went wrong.");
```
A `ProblemDetails` response is always camelCase, even when the app sets the format to PascalCase. `ProblemDetails` follows RFC 7807, which specifies lowercase.

When the `[ApiController]` attribute is applied to a controller class, the controller creates a `Microsoft.AspNetCore.Mvc.ValidationProblemDetails` response when Model Validation fails. This response includes a dictionary that uses the model's property names as error keys, unchanged. For example, the following model includes a single property that requires validation:

```csharp
public class SampleModel
{
    [Range(1, 10)]
    public int Value { get; set; }
}
```
By default, the `ValidationProblemDetails` response returned when the `Value` property is invalid uses an error key of `Value`, as shown in the following example:

```csharp
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "00-00000000000000000000000000000000-000000000000000-00",
  "errors": {
    "Value": [
      "The field Value must be between 1 and 10."
    ]
  }
}
```
To format the property names used as error keys, add an implementation of `Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.IMetadataDetailsProvider` to the `Microsoft.AspNetCore.Mvc.MvcOptions.ModelMetadataDetailsProviders` collection. The following example adds a `System.Text.Json`-based implementation, `SystemTextJsonValidationMetadataProvider`, which formats property names as camelCase by default:

```csharp
builder.Services.AddControllers();

builder.Services.Configure<MvcOptions>(options =>
{
    options.ModelMetadataDetailsProviders.Add(
        new SystemTextJsonValidationMetadataProvider());
});
```
`SystemTextJsonValidationMetadataProvider` also accepts an implementation of `System.Text.Json.JsonNamingPolicy` in its constructor, which specifies a custom naming policy for formatting property names.

To set a custom name for a property within a model, use the [JsonPropertyName] attribute on the property:

```csharp
public class SampleModel
{
    [Range(1, 10)]
    [JsonPropertyName("sampleValue")]
    public int Value { get; set; }
}
```
The `ValidationProblemDetails` response returned for the preceding model when the `Value` property is invalid uses an error key of `sampleValue`, as shown in the following example:

```csharp
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "00-00000000000000000000000000000000-000000000000000-00",
  "errors": {
    "sampleValue": [
      "The field Value must be between 1 and 10."
    ]
  }
}
```
To format the `ValidationProblemDetails` response using `Newtonsoft.Json`, use `NewtonsoftJsonValidationMetadataProvider`:

```csharp
builder.Services.AddControllers()
    .AddNewtonsoftJson();

builder.Services.Configure<MvcOptions>(options =>
{
    options.ModelMetadataDetailsProviders.Add(
        new NewtonsoftJsonValidationMetadataProvider());
});
```
By default, `NewtonsoftJsonValidationMetadataProvider` formats property names as camelCase. `NewtonsoftJsonValidationMetadataProvider` also accepts an implementation of `NamingPolicy` in its constructor, which specifies a custom naming policy for formatting property names. To set a custom name for a property within a model, use the `[JsonProperty]` attribute.

## Specify a format

To restrict the response formats, apply the `[Produces]` filter. Like most Filters, `[Produces]` can be applied at the action, controller, or global scope:

```csharp
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TodoItemsController : ControllerBase
```
The preceding `[Produces]` filter:

* Forces all actions within the controller to return JSON-formatted responses for POCOs (Plain Old CLR Objects) or `Microsoft.AspNetCore.Mvc.ObjectResult` and its derived types.
* Return JSON-formatted responses even if other formatters are configured and the client specifies a different format.

For more information, see Filters.

## Special case formatters

Some special cases are implemented using built-in formatters. By default, `string` return types are formatted as *text/plain* (*text/html* if requested via the `Accept` header). This behavior can be deleted by removing the `Microsoft.AspNetCore.Mvc.Formatters.StringOutputFormatter`. Formatters are removed in `Program.cs`. Actions that have a model object return type return `204 No Content` when returning `null`. This behavior can be deleted by removing the `Microsoft.AspNetCore.Mvc.Formatters.HttpNoContentOutputFormatter`. The following code removes the `StringOutputFormatter` and `HttpNoContentOutputFormatter`.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    // using Microsoft.AspNetCore.Mvc.Formatters;
    options.OutputFormatters.RemoveType<StringOutputFormatter>();
    options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
});
```
Without the `StringOutputFormatter`, the built-in JSON formatter formats `string` return types. If the built-in JSON formatter is removed and an XML formatter is available, the XML formatter formats `string` return types. Otherwise, `string` return types return `406 Not Acceptable`.

Without the `HttpNoContentOutputFormatter`, null objects are formatted using the configured formatter. For example:

* The JSON formatter returns a response with a body of `null`.
* The XML formatter returns an empty XML element with the attribute `xsi:nil="true"` set.
