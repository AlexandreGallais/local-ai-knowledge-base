---
title: "openApi"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-9/includes/openApi.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# openApi

### Built-in support for OpenAPI document generation

The OpenAPI specification is a standard for describing HTTP APIs. The standard allows developers to define the shape of APIs that can be plugged into client generators, server generators, testing tools, documentation, and more. In .NET 9, ASP.NET Core provides built-in support for generating OpenAPI documents representing controller-based or Minimal APIs via the Microsoft.AspNetCore.OpenApi package.

The following highlighted code calls:

* `AddOpenApi` to register the required dependencies into the app's DI container.
* `MapOpenApi` to register the required OpenAPI endpoints in the app's routes.

```csharp
var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

app.MapOpenApi();

app.MapGet("/hello/{name}", (string name) => $"Hello {name}"!);

app.Run();
```
Install the `Microsoft.AspNetCore.OpenApi` package in the project using the following command:

```dotnetcli
dotnet add package Microsoft.AspNetCore.OpenApi
```

Run the app and navigate to `openapi/v1.json` to view the generated OpenAPI document:

OpenAPI documents can also be generated at build-time by adding the `Microsoft.Extensions.ApiDescription.Server` package:

```dotnetcli
dotnet add package Microsoft.Extensions.ApiDescription.Server
```

To modify the location of the emitted OpenAPI documents, set the target path in the OpenApiDocumentsDirectory property in the app's project file:

```xml
<PropertyGroup>
  <OpenApiDocumentsDirectory>$(MSBuildProjectDirectory)</OpenApiDocumentsDirectory>
</PropertyGroup>
```
Run `dotnet build` and inspect the generated JSON file in the project directory.

ASP.NET Core's built-in OpenAPI document generation provides support for various customizations and options. It provides document, operation, and schema transformers and has the ability to manage multiple OpenAPI documents for the same application.

To learn more about ASP.NET Core's new OpenAPI document capabilities, see the new Microsoft.AspNetCore.OpenApi docs.
