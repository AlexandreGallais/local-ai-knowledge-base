---
title: "Generate OpenAPI documents (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Generate OpenAPI documents

The `Microsoft.AspNetCore.OpenApi` package provides built-in support for OpenAPI document generation in ASP.NET Core. The package provides the following features:

* Support for generating OpenAPI version 3.1 documents starting with .NET 10, and OpenAPI version 3.2 documents starting with .NET 11.
* Support for JSON Schema draft 2020-12.
* Support for generating OpenAPI documents at run time and accessing them via an endpoint on the app.
* Support for "transformer" APIs that allow modifying the generated document.
* Support for generating multiple OpenAPI documents from a single app.
* Takes advantage of JSON schema support provided by `System.Text.Json`.
* Compatible with native AoT.

Starting in .NET 11, the default OpenAPI version for generated documents is 3.2. In .NET 10, the default is 3.1. To change the version, explicitly set the `Microsoft.AspNetCore.OpenApi.OpenApiOptions.OpenApiVersion` property of the `Microsoft.AspNetCore.OpenApi.OpenApiOptions` in the `configureOptions` delegate parameter of `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*`:

```csharp
builder.Services.AddOpenApi(options =>
{
    // Specify the OpenAPI version to use
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0;
});
```

When generating the OpenAPI document at build time, the OpenAPI version can be selected by setting the `--openapi-version` in the `OpenApiGenerateDocumentsOptions` MSBuild item.

```xml
<!-- Configure build-time OpenAPI generation to produce an OpenAPI 3.1 document -->
<OpenApiGenerateDocumentsOptions>--openapi-version OpenApi3_1</OpenApiGenerateDocumentsOptions>
```

## Package installation

Install the `Microsoft.AspNetCore.OpenApi` package:

# Visual Studio

Run the following command from the **Package Manager Console**:

```powershell
Install-Package Microsoft.AspNetCore.OpenApi
```

# .NET CLI

Run the following command in a command shell opened to the directory that contains the app's project file:

```dotnetcli
dotnet add package Microsoft.AspNetCore.OpenApi
```

---

## Configure OpenAPI document generation

The following code:

* Adds OpenAPI services using the `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*` extension method on the app builder's service collection.
* Maps an endpoint for viewing the OpenAPI document in JSON format with the `Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi*` extension method on the app.

```csharp
var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

Launch the app and navigate to `https://localhost:{PORT}/openapi/v1.json` to view the generated OpenAPI document, where the `{PORT}` placeholder is the port.

OpenAPI document generation applies the following behaviors:

* The `QUERY` method and app-defined custom HTTP methods are described in the generated document. For more information, see Operations for HTTP QUERY and custom HTTP methods.
* Endpoints whose HTTP method is missing or isn't a syntactically valid HTTP method token are excluded from the generated document.
* Numbers and dates are formatted using the invariant culture, so the generated document is consistent regardless of the server's culture settings.

### Operations for HTTP QUERY and custom HTTP methods

Routing accepts arbitrary HTTP method strings through `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapMethods*`. OpenAPI document generation describes those operations instead of omitting them.

HTTP QUERY is a proposed safe, idempotent method that lets a client send a request body when describing a search. It's useful when a query is too large or too structured to fit in a URL. OpenAPI 3.2 defines a `query` field on the Path Item Object for exactly this case.

The following endpoint uses `MapMethods` to handle `QUERY` requests:

```csharp
app.MapMethods("/search", ["QUERY"], (SearchRequest request) =>
    SearchService.Run(request));
```

In an OpenAPI 3.2 document, the operation appears inline as a sibling of `get`, `post`, and the other standard operations:

```json
"paths": {
  "/search": {
    "query": {
      "requestBody": { },
      "responses": { "200": { } }
    }
  }
}
```

An HTTP method other than `QUERY` that the OpenAPI specification doesn't define as a fixed field appears under the Path Item's `additionalOperations` field, keyed by the uppercased method name:

```json
"paths": {
  "/purge": {
    "additionalOperations": {
      "PURGE": {
        "responses": { "200": { } }
      }
    }
  }
}
```

In an OpenAPI 3.0 or 3.1 document, neither field exists, so both `QUERY` and other custom methods are emitted under the `x-oai-additionalOperations` specification extension instead:

```json
"paths": {
  "/search": {
    "x-oai-additionalOperations": {
      "QUERY": {
        "requestBody": { },
        "responses": { "200": { } }
      }
    }
  }
}
```

To generate a 3.0 or 3.1 document, set `Microsoft.AspNetCore.OpenApi.OpenApiOptions.OpenApiVersion`. For more information, see Customize the OpenAPI version of a generated document.

> **Note:**
> An endpoint is described only when its HTTP method is a syntactically valid HTTP method token. An endpoint registered with a missing or malformed method string is skipped, and the rest of the document is generated normally.

## Options to Customize OpenAPI document generation

The following sections demonstrate how to customize OpenAPI document generation.

### Generate OpenAPI document in YAML format

The OpenAPI document can be generated in either JSON or YAML format. By default, the OpenAPI document is generated in JSON format. To generate the OpenAPI document in YAML format, specify the endpoint in the `Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi*` call with a "`.yaml`" or "`.yml`" suffix, as shown in the following example, where the `{documentName}` placeholder is the document name:

```csharp
app.MapOpenApi("/openapi/{documentName}.yaml");
```

Generating OpenAPI documents in YAML format at build time isn't supported but planned for a future preview.

### Customize the OpenAPI document name

Each OpenAPI document in an app has a unique name. The default document name that is registered is `v1`:

```csharp
builder.Services.AddOpenApi(); // Document name is v1
```

The document name can be modified by passing the name as a parameter to the `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*` call:

```csharp
builder.Services.AddOpenApi("internal"); // Document name is internal
```

The document name surfaces in several places in the OpenAPI implementation.

When fetching the generated OpenAPI document, the document name is provided as the `documentName` parameter argument in the request. The following requests resolve the `v1` and `internal` documents.

```bash
GET http://localhost:5000/openapi/v1.json
GET http://localhost:5000/openapi/internal.json
```

### Customize the OpenAPI version of a generated document

By default, OpenAPI document generation creates an OpenAPI 3.2 document. Target an earlier version when downstream tooling doesn't yet handle OpenAPI 3.2. The following code generates an OpenAPI 3.1 document:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_1;
});
```

For more information, see OpenApiVersion defaults to OpenApi3_2.

### Customize the OpenAPI endpoint route

By default, the OpenAPI endpoint registered via a call to `Microsoft.AspNetCore.Builder.OpenApiEndpointRouteBuilderExtensions.MapOpenApi*` exposes the document at the `/openapi/{documentName}.json` endpoint. The following code demonstrates how to customize the route at which the OpenAPI document is registered:

```csharp
app.MapOpenApi("/openapi/{documentName}/openapi.json");
```

It's possible, but not recommended, to remove the `documentName` route parameter from the endpoint route. When the `documentName` route parameter is removed from the endpoint route, the framework attempts to resolve the document name from the query parameter. Not providing the `documentName` in either the route or query can result in unexpected behavior.

### Customize the OpenAPI endpoint

Because the OpenAPI document is served via a route handler endpoint, any customization that is available to standard minimal endpoints is available to the OpenAPI endpoint.

#### Limit OpenAPI document access to authorized users

The OpenAPI endpoint doesn't enable authorization checks by default. However, authorization checks can be applied to the OpenAPI document. In the following code, access to the OpenAPI document is limited to users with the `tester` role:

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder();

builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization(o =>
{
    o.AddPolicy("ApiTesterPolicy", b => b.RequireRole("tester"));
});
builder.Services.AddOpenApi();

var app = builder.Build();

app.MapOpenApi()
    .RequireAuthorization("ApiTesterPolicy");

app.MapGet("/", () => "Hello world!");

app.Run();
```

#### Cache generated OpenAPI document

The OpenAPI document is regenerated every time a request to the OpenAPI endpoint is sent. Regeneration enables transformers to incorporate dynamic app state into their operation. For example, regenerating a request with details of the HTTP context. When applicable, the OpenAPI document can be cached to avoid executing the document generation pipeline on each HTTP request.

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder();

builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(policy => policy.Expire(TimeSpan.FromMinutes(10)));
});
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseOutputCache();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi()
        .CacheOutput();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

## Generate multiple OpenAPI documents

In some scenarios, it's helpful to generate multiple OpenAPI documents with different content from a single ASP.NET Core API app. These scenarios include generating OpenAPI documentation for different:

* Audiences, such as public and internal APIs.
* Versions of an API.
* Parts of an app, such as a frontend and backend API.

To generate multiple OpenAPI documents, call the `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*` extension method once for each document, specifying a different document name in the first parameter each time.

```csharp
builder.Services.AddOpenApi("v1");
builder.Services.AddOpenApi("v2");
```

Each invocation of `Microsoft.Extensions.DependencyInjection.OpenApiServiceCollectionExtensions.AddOpenApi*` can specify its own set of options, so you can choose to use the same or different customizations for each OpenAPI document.

The framework uses the `Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude` delegate method of `Microsoft.AspNetCore.OpenApi.OpenApiOptions` to determine which endpoints to include in each document.

For each document, the `Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude` delegate method is called for each endpoint in the app, passing the `Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription` object for the endpoint. The method returns a boolean value indicating whether the endpoint should be included in the document. The `Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription` object:

* Contains information about the endpoint, such as the HTTP method, route, and response types.
* Metadata attached to the endpoint via attributes or extension methods.

The default implementation of this delegate uses the `Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription.GroupName` field of `Microsoft.AspNetCore.Mvc.ApiExplorer.ApiDescription`. The delegate is set on an endpoint using either the `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.WithGroupName*` extension method or the `Microsoft.AspNetCore.Routing.EndpointGroupNameAttribute` attribute. `WithGroupName` or the `EndpointGroupName` attribute determines which endpoints to include in the document. Any endpoint that hasn't been assigned a group name is included in all OpenAPI documents.

```csharp
// Include endpoints without a group name or with a group name
// that matches the document name
ShouldInclude = (description) => description.GroupName == null || 
    description.GroupName == DocumentName;    
```

You can customize the `Microsoft.AspNetCore.OpenApi.OpenApiOptions.ShouldInclude` delegate method to include or exclude endpoints based on any criteria.
