---
title: "Customize OpenAPI documents (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/customize-openapi.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Customize OpenAPI documents (part 2 of 2)

## Use operation transformers

Operations are unique combinations of HTTP paths and methods in an OpenAPI document. Operation transformers are helpful when a modification:

* Should be made to each endpoint in an app, or
* Conditionally applied to certain routes.

Operation transformers have access to a context object which contains:

* The name of the document the operation belongs to.
* The `Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription` associated with the operation.
* The `System.IServiceProvider` used in document generation.

For example, the following operation transformer adds `500` as a response status code supported by all operations in the document.

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder();

builder.Services.AddAuthentication().AddJwtBearer();

builder.Services.AddOpenApi(options =>
{
    options.AddOperationTransformer((operation, context, cancellationToken) =>
    {
        operation.Responses ??= new OpenApiResponses();
        operation.Responses.Add("500", new OpenApiResponse { Description = "Internal server error" });
        return Task.CompletedTask;
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

Operation transformers can also be added to specific endpoint with the `Microsoft.AspNetCore.Builder.OpenApiEndpointConventionBuilderExtensions.AddOpenApiOperationTransformer*` API, instead of all endpoints in a document. This can be useful to change specific OpenAPI data for a specific endpoint, like adding a security scheme, response description or other OpenAPI operation properties. The following example demonstrates adding an operation transformer to a deprecated endpoint specifically, which marks the endpoint as deprecated in the OpenAPI document.

```csharp
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/old", () => "This endpoint is old and should not be used anymore")
.AddOpenApiOperationTransformer((operation, context, cancellationToken) =>
{
    operation.Deprecated = true;
    return Task.CompletedTask;
});

app.MapGet("/new", () => "This endpoint replaces /old");

app.Run();
```

> **Note:**
> A transformer isn't needed just to mark an API deprecated. Applying `System.ObsoleteAttribute` to an endpoint, a response type, or a property sets `deprecated: true` on the corresponding operation, component schema, or schema property. Applying `[Obsolete]` to an endpoint handler does not propagate to its response schema unless the response type itself is also marked obsolete. Use an operation transformer when the OpenAPI value must differ from what `[Obsolete]` produces. For more information, see Mark APIs as deprecated.

### Conditionally applying security requirements

In some scenarios, developers may want to apply security requirements to all endpoints except those explicitly marked with the `AllowAnonymous` attribute.

Use an operation transformer, which has access to endpoint metadata through the associated `Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription`.

The following example demonstrates how to skip adding a security requirement for endpoints that have the `AllowAnonymousAttribute` applied:

```csharp
internal sealed class AuthOperationTransformer : IOpenApiOperationTransformer
{
    public Task TransformAsync(
        OpenApiOperation operation,
        OpenApiOperationTransformerContext context,
        CancellationToken cancellationToken)
    {
        var hasAllowAnonymous = context.Description.ActionDescriptor.EndpointMetadata
            .OfType<AllowAnonymousAttribute>()
            .Any();

        if (hasAllowAnonymous)
        {
            return Task.CompletedTask;
        }

        operation.Security ??= new List<OpenApiSecurityRequirement>();

        operation.Security.Add(new OpenApiSecurityRequirement
        {
            [new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            }] = Array.Empty<string>()
        });

        return Task.CompletedTask;
    }
}
```

Use this approach instead of document transformers when conditional logic based on endpoint metadata is required. This transformer adds security *requirements* per operation and assumes the security *scheme* is already registered at the document level. For an example of registering the Bearer security scheme, see the `BearerSecuritySchemeTransformer` in the Use document transformers section.

## Use schema transformers

Schemas are the data models that are used in request and response bodies in an OpenAPI document. Schema transformers are useful when a modification:

* Should be made to each schema in the document, or
* Conditionally applied to certain schemas.

Schema transformers have access to a context object which contains:

* The name of the document the schema belongs to.
* The JSON type information associated with the target schema.
* The `System.IServiceProvider` used in document generation.

For example, the following schema transformer sets the `format` of decimal types to `decimal` instead of `double`:

```csharp
using Microsoft.AspNetCore.OpenApi;

var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi(options => {
    // Schema transformer to set the format of decimal to 'decimal'
    options.AddSchemaTransformer((schema, context, cancellationToken) =>
    {
        if (context.JsonTypeInfo.Type == typeof(decimal))
        {
            schema.Format = "decimal";
        }
        return Task.CompletedTask;
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => new Body { Amount = 1.1m });

app.Run();

public class Body {
    public decimal Amount { get; set; }
}
```

## Support for generating OpenApiSchemas in transformers

Developers can generate a schema for a C# type using the same logic as ASP.NET Core OpenAPI document generation and add it to the OpenAPI document. The schema can then be referenced from elsewhere in the OpenAPI document. This capability is available starting with .NET 10.

The context passed to document, operation, and schema transformers includes a new `GetOrCreateSchemaAsync` method that can be used to generate a schema for a type.
This method also has an optional `ApiParameterDescription` parameter to specify additional metadata for the generated schema.

To support adding the schema to the OpenAPI document, a `Document` property has been added to the Operation and Schema transformer contexts. This allows any transformer to add a schema to the OpenAPI document using the document's `AddComponent` method.

### Example

To use this feature in a document, operation, or schema transformer, create the schema using the `GetOrCreateSchemaAsync` method provided in the context and add it to the OpenAPI document using the document's `AddComponent` method.

```csharp
builder.Services.AddOpenApi(options =>
{
    options.AddOperationTransformer(async (operation, context, cancellationToken) =>
    {
        // Generate schema for error responses
        var errorSchema = await context.GetOrCreateSchemaAsync(typeof(ProblemDetails), null, cancellationToken);
        context.Document?.AddComponent("Error", errorSchema);

        operation.Responses ??= new OpenApiResponses();
        // Add a "4XX" response to the operation with the newly created schema
        operation.Responses["4XX"] = new OpenApiResponse
        {
            Description = "Bad Request",
            Content = new Dictionary<string, OpenApiMediaType>
            {
                ["application/problem+json"] = new OpenApiMediaType
                {
                    Schema = new OpenApiSchemaReference("Error", context.Document)
                }
            }
        };
    });
});
```
## Customize schema reuse

After all transformers have been applied, the framework makes a pass over the document to transfer certain schemas
to the `components.schemas` section, replacing them with `$ref` references to the transferred schema.
This reduces the size of the document and makes it easier to read.

The details of this processing are complicated and might change in future versions of .NET, but in general:

* Schemas for class/record/struct types are replaced with a `$ref` to a schema in `components.schemas`
  if they appear more than once in the document.
* Schemas for primitive types and standard collections are left inline.
* Schemas for enum types are always replaced with a `$ref` to a schema in components.schemas.

Typically the name of the schema in `components.schemas` is the name of the class/record/struct type,
but in some circumstances a different name must be used.

Schemas for standalone arrays remain inline by default. When an array type is used as a type argument in an enclosing generic type, a component key in an OpenAPI document must match `^[a-zA-Z0-9._-]+$`, so the C# array syntax can't be used directly. The reference ID segment for an array argument is composed as `ArrayOf` followed by the reference ID of the element type, applied recursively:

C# type | Reference ID segment
--- | ---
`string[]` | `ArrayOfstring`
`Todo[]` | `ArrayOfTodo`
`string[][]` | `ArrayOfArrayOfstring`

For example, generic result types apply this composition to produce schema reference IDs such as `OkOfArrayOfTodo` for `Ok<Todo[]>`.

ASP.NET Core lets you customize which schemas are replaced with a `$ref` to a schema in `components.schemas`
using the `Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId` property of `Microsoft.AspNetCore.OpenApi.OpenApiOptions`.
This property is a delegate that takes a `System.Text.Json.Serialization.Metadata.JsonTypeInfo` object and returns the name of the schema
in `components.schemas` that should be used for that type.
The framework provides a default implementation of this delegate, `Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateDefaultSchemaReferenceId*`
that uses the name of the type, but you can replace it with your own implementation.

As a simple example of this customization, you might choose to always inline enum schemas.
This is done by setting `Microsoft.AspNetCore.OpenApi.OpenApiOptions.CreateSchemaReferenceId` to a delegate
that returns null for enum types, and otherwise returns the value from the default implementation.
The following code demonstrates this:

```csharp
builder.Services.AddOpenApi(options =>
{
    // Always inline enum schemas
    options.CreateSchemaReferenceId = (type) =>
        type.Type.IsEnum ? null : OpenApiOptions.CreateDefaultSchemaReferenceId(type);
});
```

> **Note:**
> Starting with .NET 10, relative JSON schema references (`$ref`) within the root schema document are resolved correctly during OpenAPI document generation.

## Related content

* Microsoft.OpenApi upgraded to 3.x (ASP.NET Core 11.0 breaking change announcement)
* OpenAPI 3.x upgrade migration guidance
* Use the generated OpenAPI documents
* OpenAPI specification
