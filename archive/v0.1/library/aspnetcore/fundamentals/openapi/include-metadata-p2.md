---
title: "Include OpenAPI metadata in an ASP.NET Core app (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/include-metadata.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Include OpenAPI metadata in an ASP.NET Core app (part 2 of 6)

## Include OpenAPI metadata for endpoints

ASP.NET collects metadata from the web app's endpoints and uses it to generate an OpenAPI document.

In controller-based apps, metadata is collected from attributes such as `[EndpointDescription]`, `[HttpPost]`,
and `[Produces]` when the controller has the `[ApiController]` attribute.

In Minimal APIs, metadata can be collected from attributes but may also be set by using extension methods and other strategies, such as returning `Microsoft.AspNetCore.Http.TypedResults` from route handlers.

The following table provides an overview of the metadata collected and the strategies for setting it.

| Metadata | Attribute | Extension method | Other strategies |
| --- | --- | --- |
| summary | `[EndpointSummary]` | `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithSummary*` | |
| description | `[EndpointDescription]` | `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithDescription*` | |
| tags | `[Tags]` | `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithTags*` | |
| operationId | `[EndpointName]` | `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithName*` | |
| parameters | `[FromQuery]`, `[FromRoute]`, `[FromHeader]`, `[FromForm]` | |
| parameter description | `[Description]` | | |
| requestBody | `[FromBody]` | `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Accepts*` | |
| responses | `[Produces]` | `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Produces*`, `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ProducesProblem*` | `Microsoft.AspNetCore.Http.TypedResults` |
| Excluding endpoints | `[ExcludeFromDescription]`, `[ApiExplorerSettings]` | `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.ExcludeFromDescription*` | |

ASP.NET Core can also collect metadata from XML doc comments. For more information, see ASP.NET Core OpenAPI XML documentation comment support in ASP.NET Core for more details.

The following sections demonstrate how to include metadata in an app to customize the generated OpenAPI document.

### Summary and description

The endpoint summary and description can be set using the `[EndpointSummary]` and `[EndpointDescription]` attributes,
or in Minimal APIs, using the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithSummary*` and `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithDescription*` extension methods.

#### Minimal APIs

The following sample demonstrates the different strategies for setting summaries and descriptions.

Note that the attributes are placed on the delegate method and not on the app.MapGet method.

```csharp
app.MapGet("/extension-methods", () => "Hello world!")
    .WithSummary("This is a summary.")
    .WithDescription("This is a description.");

app.MapGet("/attributes",
    [EndpointSummary("This is a summary.")]
    [EndpointDescription("This is a description.")]
    () => "Hello world!");
```

#### Controllers

The following sample demonstrates how to set summaries and descriptions.

```csharp
[EndpointSummary("This is a summary.")]
[EndpointDescription("This is a description.")]
[HttpGet("attributes")]
public IResult Attributes()
{
    return Results.Ok("Hello world!");
}
```

---

### tags

OpenAPI supports specifying tags on each endpoint as a form of categorization.

#### Minimal APIs

In Minimal APIs, tags can be set using either the `[Tags]` attribute or the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.WithTags*` extension method.

The following sample demonstrates the different strategies for setting tags.

```csharp
app.MapGet("/extension-methods", () => "Hello world!")
    .WithTags("todos", "projects");

app.MapGet("/attributes",
    [Tags("todos", "projects")]
    () => "Hello world!");
```

#### Controllers

In controller-based apps, the controller name is automatically added as a tag on each of its endpoints, but this can be overridden using the `[Tags]` attribute.

The following sample demonstrates how to set tags.

```csharp
[Tags(["todos", "projects"])]
[HttpGet("attributes")]
public IResult Attributes()
{
    return Results.Ok("Hello world!");
}
```

---

### operationId

OpenAPI supports an operationId on each endpoint as a unique identifier or name for the operation.

#### Minimal APIs

In Minimal APIs, the operationId can be set using either the `[EndpointName]` attribute or the `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithName*` extension method.

The following sample demonstrates the different strategies for setting the operationId.

```csharp
app.MapGet("/extension-methods", () => "Hello world!")
    .WithName("FromExtensionMethods");

app.MapGet("/attributes",
    [EndpointName("FromAttributes")]
    () => "Hello world!");
```

#### Controllers

In controller-based apps, the operationId can be set using the `[EndpointName]` attribute.

The following sample demonstrates how to set the operationId.

```csharp
[EndpointName("FromAttributes")]
[HttpGet("attributes")]
public IResult Attributes()
{
    return Results.Ok("Hello world!");
}
```

---

### parameters

OpenAPI supports annotating path, query string, header, and cookie parameters that are consumed by an API.

The framework infers the types for request parameters automatically based on the signature of the route handler.

The `[Description]` attribute can be used to provide a description for a parameter.

#### Minimal APIs

The follow sample demonstrates how to set a description for a parameter.

```csharp
app.MapGet("/attributes",
    ([Description("This is a description.")] string name) => "Hello world!");
```

#### Controllers

The following sample demonstrates how to set a description for a parameter.

```csharp
[HttpGet("attributes")]
public IResult Attributes(
    [Description("This is a description.")] string name)
{
    return Results.Ok("Hello world!");
}
```

---

### Describe the request body

The `requestBody` field in OpenAPI describes the body of a request that an API client can send to the server, including the content types supported and the schema for the body content.

When the endpoint handler method accepts parameters that are bound from the request body, ASP.NET Core generates a corresponding `requestBody` for the operation in the OpenAPI document. Metadata for the request body can also be specified using attributes or extension methods. Additional metadata can be set with a document transformer or operation transformer.

If the endpoint doesn't define any parameters bound to the request body, but instead consumes the request body from the `Microsoft.AspNetCore.Http.HttpContext` directly, ASP.NET Core provides mechanisms to specify request body metadata. This is a common scenario for endpoints that process the request body as a stream.

Some request body metadata can be determined from the `FromBody` or `FromForm` parameters of the route handler method.

A description for the request body can be set with a `[Description]` attribute on the parameter with `FromBody` or `FromForm`.

If the `FromBody` parameter is non-nullable and `Microsoft.AspNetCore.Mvc.FromBodyAttribute.EmptyBodyBehavior` is not set to `Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow` in the `FromBody` attribute, the request body is required and the `required` field of the `requestBody` is set to `true` in the generated OpenAPI document.
Form bodies are always required and have `required` set to `true`.

Use a document transformer or an operation transformer to set the `example`, `examples`, or `encoding` fields, or to add specification extensions for the request body in the generated OpenAPI document.

Other mechanisms for setting request body metadata depend on the type of app being developed and are described in the following sections.

#### Minimal APIs

The content types for the request body in the generated OpenAPI document are determined from the type of the parameter that is bound to the request body or specified with the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Accepts*` extension method.
By default, the content type of a `FromBody` parameter is `application/json` and the content type for `FromForm` parameters is `multipart/form-data` or `application/x-www-form-urlencoded`.

Support for these default content types is built in to Minimal APIs, and other content types can be handled by using custom binding.
See the Custom binding topic of the Minimal APIs documentation for more information.

There are several ways to specify a different content type for the request body.
If the type of the `FromBody` parameter implements `Microsoft.AspNetCore.Http.Metadata.IEndpointParameterMetadataProvider`, ASP.NET Core uses this interface to determine the content types in the request body.
The framework uses the `Microsoft.AspNetCore.Http.Metadata.IEndpointMetadataProvider.PopulateMetadata*` method of this interface to set the content types and type of the body content of the request body. For example, a `Todo` class that accepts either `application/xml` or `text/xml` content-type can use `Microsoft.AspNetCore.Http.Metadata.IEndpointParameterMetadataProvider` to provide this information to the framework.

```csharp
public class Todo : IEndpointParameterMetadataProvider
{
    public static void PopulateMetadata(
        ParameterInfo parameter,
        EndpointBuilder builder)
    {
        builder.Metadata.Add(
            new AcceptsMetadata(
                ["application/xml", "text/xml"], 
                typeof(Todo)
            )
        );
    }
}
```

The `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Accepts*` extension method can also be used to specify the content type of the request body.
In the following example, the endpoint accepts a `Todo` object in the request body with an expected content-type of `application/xml`.

```csharp
app.MapPut("/todos/{id}", (int id, Todo todo) => ...)
    .Accepts<Todo>("application/xml");
```

Since `application/xml` is not a built-in content type, the `Todo` class must implement the `Microsoft.AspNetCore.Http.IBindableFromHttpContext`1` interface to provide a custom binding for the request body. For example:

```csharp
public class Todo : IBindableFromHttpContext<Todo>
{
    public static async ValueTask<Todo?> BindAsync(
        HttpContext context, 
        ParameterInfo parameter)
    {
        var xmlDoc = await XDocument.LoadAsync(context.Request.Body, LoadOptions.None, context.RequestAborted);
        var serializer = new XmlSerializer(typeof(Todo));
        return (Todo?)serializer.Deserialize(xmlDoc.CreateReader());
    }
}
```

If the endpoint doesn't define any parameters bound to the request body, use the `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Accepts*` extension method to specify the content type that the endpoint accepts.

If you specify `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions.Accepts*` multiple times, only metadata from the last one is used -- they aren't combined.

#### Controllers

In controller-based apps, the content types for the request body in the generated OpenAPI document are determined from the type of the parameter that is bound to the request body, the `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter` types configured in the application, or by a `[Consumes]` attribute on the route handler method.

ASP.NET Core uses an `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter` to deserialize a `FromBody` request body.
InputFormatters are configured in the `Microsoft.AspNetCore.Mvc.MvcOptions` passed to the `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers*` extension method for the app's service collection.
Each input formatter declares the content types it can handle, in its `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.SupportedMediaTypes` property, and the types of body content it can handle, with its `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType*` method.

ASP.NET Core MVC includes built-in input formatters for JSON and XML, though only the JSON input formatter is enabled by default.
The built-in JSON input formatter supports the `application/json`, `text/json`, and `application/*+json` content types, and the built-in XML input formatter supports the `application/xml`, `text/xml`, and `application/*+xml` content types.

By default, the content type of a `FromBody` request body may be any content type accepted by an `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter` for the `FromBody` parameter type. For a request body with `FromForm` parameters the default content types are `multipart/form-data` or `application/x-www-form-urlencoded`.These content types will be included in the generated OpenAPI document if the `[Consumes]` attribute is not specified on the route handler method.

The content types accepted by a route handler can be restricted using a filter on the endpoint (action scope).
The `[Consumes]` attribute adds an action scope filter to the endpoint that restricts the content types that a route handler will accept.
In this case, the requestBody in the generated OpenAPI document will include only the content types specified in the `[Consumes]` attribute.

A `[Consumes]` attribute can't add support for a content type that doesn't have an associated input formatter, and the generated OpenAPI document doesn't include any content types that don't have an associated input formatter.

For content types other than JSON or XML, you need to create a custom input formatter.
For more information and examples, see Custom formatters in ASP.NET Core Web API.

If the route handler doesn't have a `FromBody` or `FromForm` parameter, the route handler might read the request body directly from the `Request.Body` stream and might use the `[Consumes]` attribute to restrict the content types allowed, but no requestBody is generated in the OpenAPI document.

---
