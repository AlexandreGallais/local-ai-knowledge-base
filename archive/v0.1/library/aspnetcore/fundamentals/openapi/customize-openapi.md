---
title: "Customize OpenAPI documents (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/customize-openapi.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Customize OpenAPI documents

## OpenAPI document transformers

Transformers provide an API for modifying the OpenAPI document with user-defined customizations. Transformers are useful for scenarios like:

* Adding parameters to all operations in a document.
* Modifying descriptions for parameters or operations.
* Adding top-level information to the OpenAPI document.

Transformers fall into three categories:

* Document transformers have access to the entire OpenAPI document. These can be used to make global modifications to the document.
* Operation transformers apply to each individual operation. Each individual operation is a combination of path and HTTP method. These can be used to modify parameters or responses on endpoints.
* Schema transformers apply to each schema in the document. These can be used to modify the schema of request or response bodies, or any nested schemas.

Transformers can be registered onto the document by calling the `Microsoft.AspNetCore.OpenApi.OpenApiOptions.AddDocumentTransformer*` method on the `Microsoft.AspNetCore.OpenApi.OpenApiOptions` object. The following snippet shows different ways to register transformers onto the document:

* Register a document transformer using a delegate.
* Register a document transformer using an instance of `Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer`.
* Register a document transformer using a DI-activated `Microsoft.AspNetCore.OpenApi.IOpenApiDocumentTransformer`.
* Register an operation transformer using a delegate.
* Register an operation transformer using an instance of `Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer`.
* Register an operation transformer using a DI-activated `Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer`.
* Register a schema transformer using a delegate.
* Register a schema transformer using an instance of `Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer`.
* Register a schema transformer using a DI-activated `Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer`.

```csharp
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken)
                             => Task.CompletedTask);
    options.AddDocumentTransformer(new MyDocumentTransformer());
    options.AddDocumentTransformer<MyDocumentTransformer>();
    options.AddOperationTransformer((operation, context, cancellationToken)
                            => Task.CompletedTask);
    options.AddOperationTransformer(new MyOperationTransformer());
    options.AddOperationTransformer<MyOperationTransformer>();
    options.AddSchemaTransformer((schema, context, cancellationToken)
                            => Task.CompletedTask);
    options.AddSchemaTransformer(new MySchemaTransformer());
    options.AddSchemaTransformer<MySchemaTransformer>();
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

### Execution order for transformers

Transformers execute in the following order:

* Schema transformers execute when a schema is registered to the document. They execute in the order they're added.
All schemas are added to the document before any operation processing occurs, so schema transformers execute before operation transformers.
* Operation transformers execute when an operation is added to the document. They execute in the order they're added.
All operations are added to the document before any document transformers execute.
* Document transformers execute when the document is generated. This is the final pass over the document, and all operations and schemas are added by this point.
* When an app is configured to generate multiple OpenAPI documents, transformers execute for each document independently.

For example, in the following snippet:
* `SchemaTransformer2` is executed and has access to the modifications made by `SchemaTransformer1`.
* Both `OperationTransformer1` and `OperationTransformer2` have access to the modifications made by both schema transformers for the types involved in the operation they're called to process.
* `OperationTransformer2` is executed after `OperationTransformer1`, so it has access to the modifications made by `OperationTransformer1`.
* Both `DocumentTransformer1` and `DocumentTransformer2` are executed after all operations and schemas have been added to the document, so they have access to all modifications made by the operation and schema transformers.
* `DocumentTransformer2` is executed after `DocumentTransformer1`, so it has access to the modifications made by `DocumentTransformer1`.

```csharp
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer<DocumentTransformer1>();
    options.AddSchemaTransformer<SchemaTransformer1>();
    options.AddDocumentTransformer<DocumentTransformer2>();
    options.AddOperationTransformer<OperationTransformer1>();
    options.AddSchemaTransformer<SchemaTransformer2>();
    options.AddOperationTransformer<OperationTransformer2>();
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

## Use document transformers

Document transformers have access to a context object that includes:

* The name of the document being modified.
* The `Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescriptionGroupCollectionProvider.ApiDescriptionGroups` associated with that document.
* The `System.IServiceProvider` used in document generation.

Document transformers can also mutate the OpenAPI document that is generated. The following example demonstrates a document transformer that adds some information about the API to the OpenAPI document.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Info = new()
        {
            Title = "Checkout API",
            Version = "v1",
            Description = "API for processing checkouts from cart."
        };
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

Service-activated document transformers can utilize instances from DI to modify the app. The following sample demonstrates a document transformer that uses the `Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider` service from the authentication layer. It checks if any JWT bearer-related schemes are registered in the app and adds them to the OpenAPI document's top level:

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
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world!");

app.Run();

internal sealed class BearerSecuritySchemeTransformer(IAuthenticationSchemeProvider authenticationSchemeProvider) : IOpenApiDocumentTransformer
{
    public async Task TransformAsync(OpenApiDocument document, OpenApiDocumentTransformerContext context, CancellationToken <example-value>)
    {
        var authenticationSchemes = await authenticationSchemeProvider.GetAllSchemesAsync();
        if (authenticationSchemes.Any(authScheme => authScheme.Name == "Bearer"))
        {
            var securitySchemes = new Dictionary<string, IOpenApiSecurityScheme>
            {
                ["Bearer"] = new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer", // "bearer" <example-value> to the header name here
                    In = ParameterLocation.Header,
                    BearerFormat = "<example-value>"
                }
            };
            document.Components ??= new OpenApiComponents();
            document.Components.SecuritySchemes = securitySchemes;
        }
    }
}
```

Document transformers are unique to the document instance they're associated with. In the following example, a transformer:

* Registers authentication-related requirements to the `internal` document.
* Leaves the `public` document unmodified.

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder();

builder.Services.AddAuthentication().AddJwtBearer();

builder.Services.AddOpenApi("internal", options =>
{
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});
builder.Services.AddOpenApi("public");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/world", () => "Hello world!")
    .WithGroupName("internal");
app.MapGet("/", () => "Hello universe!")
    .WithGroupName("public");

app.Run();

internal sealed class BearerSecuritySchemeTransformer(IAuthenticationSchemeProvider authenticationSchemeProvider) : IOpenApiDocumentTransformer
{
    public async Task TransformAsync(OpenApiDocument document, OpenApiDocumentTransformerContext context, CancellationToken <example-value>)
    {
        var authenticationSchemes = await authenticationSchemeProvider.GetAllSchemesAsync();
        if (authenticationSchemes.Any(authScheme => authScheme.Name == "Bearer"))
        {
            // Add the security scheme at the document level
            var securitySchemes = new Dictionary<string, IOpenApiSecurityScheme>
            {
                ["Bearer"] = new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer", // "bearer" <example-value> to the header name here
                    In = ParameterLocation.Header,
                    BearerFormat = "<example-value>"
                }
            };
            document.Components ??= new OpenApiComponents();
            document.Components.SecuritySchemes = securitySchemes;

            // Apply it as a requirement for all operations
            foreach (var operation in document.Paths.Values.SelectMany(path => path.Operations))
            {
                operation.Value.Security ??= [];
                operation.Value.Security.Add(new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Bearer", document)] = []
                });
            }
        }
    }
}
```
