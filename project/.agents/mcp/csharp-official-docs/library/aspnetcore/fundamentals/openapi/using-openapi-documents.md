---
title: "Use the generated OpenAPI documents"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/openapi/using-openapi-documents.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use openAPI documents

## Use Swagger UI for local ad-hoc testing

By default, the `Microsoft.AspNetCore.OpenApi` package doesn't ship with built-in support for visualizing or interacting with the OpenAPI document. Popular tools for visualizing or interacting with the OpenAPI document include Swagger UI and ReDoc. Swagger UI and ReDoc can be integrated in an app in several ways. Editors such as Visual Studio and Visual Studio Code offer extensions and built-in experiences for testing against an OpenAPI document.

The `Swashbuckle.AspNetCore.SwaggerUi` package provides a bundle of Swagger UI's web assets for use in apps. This package can be used to render a UI for the generated document. To configure this:

* Install the `Swashbuckle.AspNetCore.SwaggerUi` package.
* Enable the swagger-ui middleware with a reference to the OpenAPI route registered earlier.

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });

}

app.MapGet("/", () => "Hello world!");

app.Run();
```

As a security best practice on limiting information disclosure, ***OpenAPI user interfaces (Swagger UI, ReDoc, Scalar) should only be enabled in development environments.*** For example, see Swagger OAuth 2.0 configuration.

Launch the app and navigate to `https://localhost:<port>/swagger` to view the Swagger UI.

To automatically launch the app at the Swagger UI URL using the `https` profile of `Properties/launchSettings.json`:

* Confirm that `launchBrowser` is enabled (`true`).
* Set the `launchUrl` to `swagger`.

```json
"launchBrowser": true,
"launchUrl": "swagger",
```

## Use Scalar for interactive API documentation

Scalar is an open-source interactive document UI for OpenAPI. Scalar can integrate with the OpenAPI endpoint provided by ASP.NET Core. To configure Scalar, install the `Scalar.AspNetCore` package.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

Launch the app and navigate to `https://localhost:<port>/scalar` to view the Scalar UI.

To automatically launch the app at the Scalar UI URL using the `https` profile of `Properties/launchSettings.json`:

* Confirm that `launchBrowser` is enabled (`true`).
* Set the `launchUrl` to `scalar`.

```json
"launchBrowser": true,
"launchUrl": "scalar",
```

## Lint generated OpenAPI documents with Spectral

Spectral is an open-source OpenAPI document linter. Spectral can be incorporated into an app build to verify the quality of generated OpenAPI documents. Install Spectral according to the package installation directions.

To take advantage of Spectral for linting OpenAPI documents at build time, first install the `Microsoft.Extensions.ApiDescription.Server` package to enable build-time OpenAPI document generation.

Enable document generation at build time by setting the following properties in the app's `.csproj` file":

```xml
<PropertyGroup>
  <OpenApiDocumentsDirectory>$(MSBuildProjectDirectory)</OpenApiDocumentsDirectory>
  <OpenApiGenerateDocumentsOnBuild>true</OpenApiGenerateDocumentsOnBuild>
</PropertyGroup>
```

Run `dotnet build` to generate the document.

```dotnetcli
dotnet build
```

Create a `.spectral.yml` file with the following contents.

```text
extends: ["spectral:oas"]
```

Run `spectral lint` on the generated file.

```dotnetcli
spectral lint WebMinOpenApi.json
...

The output shows any issues with the OpenAPI document. For example:

```output
1:1  warning  oas3-api-servers       OpenAPI "servers" must be present and non-empty array.
3:10  warning  info-contact           Info object must have "contact" object.                        info
3:10  warning  info-description       Info "description" must be present and non-empty string.       info
9:13  warning  operation-description  Operation "description" must be present and non-empty string.  paths./.get
9:13  warning  operation-operationId  Operation must have "operationId".                             paths./.get

✖ 5 problems (0 errors, 5 warnings, 0 infos, 0 hints)
```

## Support for injecting `IOpenApiDocumentProvider`

Inject `Microsoft.AspNetCore.OpenApi.IOpenApiDocumentProvider` into services to access OpenAPI documents programmatically, even outside HTTP request contexts. The following example customizes version 2 ("`v2`") of the document with title, version, and description information:

```csharp
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

public class CustomDocumentService(
    [FromKeyedServices("v2")] IOpenApiDocumentProvider documentProvider)
{
    public async Task<OpenApiDocument> GetApiDocumentAsync(
            CancellationToken <example-value> = default)
    {
        var document = 
            await documentProvider.GetOpenApiDocumentAsync(cancellationToken);

        document.Info = new OpenApiInfo
        {
            Title = "Custom API Title",
            Version = "v2",
            Description = "This is a custom API description for version 2."
        };

        return document;
    }
}
```

Register the service in your DI container. Note that the service key <example-value> match the document name passed to `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*`:

```csharp
builder.Services.AddOpenApi(); // Adds "v1" by default
builder.Services.AddOpenApi("v2");
builder.Services.AddScoped<CustomDocumentService>();
```

This enables scenarios such as generating client SDKs, validating API contracts in background processes, or exporting documents to external systems.

Support for injecting `IOpenApiDocumentProvider` was introduced in ASP.NET Core in .NET 10. For more information, see dotnet/aspnetcore #61463.
