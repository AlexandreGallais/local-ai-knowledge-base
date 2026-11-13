---
title: ".NET OpenAPI tool command reference and installation"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/openapi-tools.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# .NET OpenAPI tool command reference and installation

Microsoft.dotnet-openapi is a .NET Global Tool that adds and manages `<OpenApiReference />` entries in a project file. These references let a project generate a strongly typed client from an existing OpenAPI document so the app can call the described API.

This tool addresses the *consumer* side of OpenAPI. For guidance on generating and using an OpenAPI document for your own ASP.NET Core API, see the following articles:

* Overview of OpenAPI support in ASP.NET Core API apps
* Generate OpenAPI documents
* Use the generated OpenAPI documents

## Installation

To install `Microsoft.dotnet-openapi`, run the following command:

```dotnetcli
dotnet tool install -g Microsoft.dotnet-openapi
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

## Add

Adding an OpenAPI reference using any of the commands on this page adds an `<OpenApiReference />` element similar to the following to the `.csproj` file:

```xml
<OpenApiReference Include="openapi.json" />
```

The preceding reference is required for the app to call the generated client code.

### Add File

#### Options

| Short option| Long option| Description | Example |
|-------|------|-------|---------|
| -p|--updateProject | The project to operate on. |dotnet openapi add file *--updateProject .\Ref.csproj* .\OpenAPI.json |
| -c|--code-generator| The code generator to apply to the reference. Options are `NSwagCSharp` and `NSwagTypeScript`. If `--code-generator` is not specified the tooling defaults to `NSwagCSharp`.|dotnet openapi add file .\OpenApi.json --code-generator
| -h|--help|Show help information|dotnet openapi add file --help|

#### Arguments

|  Argument  | Description | Example |
|-------------|-------------|---------|
| source-file | The source to create a reference from. Must be an OpenAPI file. |dotnet openapi add file *.\OpenAPI.json* |

### Add URL

#### Options

| Short option| Long option| Description | Example |
|-------|------|-------------|---------|
| -p|--updateProject | The project to operate on. |dotnet openapi add url *--updateProject .\Ref.csproj* `https://contoso.com/openapi.json` |
| -o|--output-file | Where to place the local copy of the OpenAPI file. |dotnet openapi add url `https://contoso.com/openapi.json` *--output-file myclient.json* |
| -c|--code-generator| The code generator to apply to the reference. Options are `NSwagCSharp` and `NSwagTypeScript`. |dotnet openapi add url `https://contoso.com/openapi.json` --code-generator
| -h|--help|Show help information|dotnet openapi add url --help|

#### Arguments

|  Argument  | Description | Example |
|-------------|-------------|---------|
| source-URL | The source to create a reference from. Must be a URL. |dotnet openapi add url `https://contoso.com/openapi.json` |

## Remove

Removes the OpenAPI reference matching the given filename from the `.csproj` file. When the OpenAPI reference is removed, clients won't be generated. Local `.json` and `.yaml` files are deleted.

### Options

| Short option| Long option| Description| Example |
|-------|------|------------|---------|
| -p|--updateProject | The project to operate on. |dotnet openapi remove *--updateProject .\Ref.csproj* .\OpenAPI.json |
| -h|--help|Show help information|dotnet openapi remove --help|

### Arguments

| Argument    | Description                            | Example                                |
|-------------|----------------------------------------|----------------------------------------|
| source-file | The source to remove the reference to. | dotnet openapi remove *.\OpenAPI.json* |

## Refresh

Refreshes the local version of a file that was downloaded using the latest content from the download URL.

### Options

| Short option| Long option| Description | Example |
|-------|------|-------------|---------|
| -p|--updateProject | The project to operate on. | dotnet openapi refresh *--updateProject .\Ref.csproj* `https://contoso.com/openapi.json` |
| -h|--help|Show help information|dotnet openapi refresh --help|

### Arguments

|  Argument  | Description | Example |
| ------------|-------------|---------|
| source-URL | The URL to refresh the reference from. | dotnet openapi refresh `https://contoso.com/openapi.json` |

## Next steps

After adding an OpenAPI reference and generating a client, see the following resources to generate code, test pages, and UIs that consume an API described by an OpenAPI document:

* Use the generated OpenAPI documents
* Get started with NSwag and ASP.NET Core
* Tutorial: Create a controller-based web API with ASP.NET Core
* Tutorial: Create a Minimal API with ASP.NET Core

When you generate an OpenAPI document, avoid exposing it in production, because it reveals details of the API that you might not want to make public. The preceding articles show how to make the OpenAPI document and related UI available only in the development environment.
