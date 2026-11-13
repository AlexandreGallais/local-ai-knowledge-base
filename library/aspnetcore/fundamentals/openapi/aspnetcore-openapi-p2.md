---
title: "Generate OpenAPI documents (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/openapi/aspnetcore-openapi.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Generate OpenAPI documents (part 2 of 2)

## Generate OpenAPI documents at build time

> **Note:**
> Starting with .NET 9, ASP.NET Core includes built-in OpenAPI support. The `Microsoft.AspNetCore.OpenApi` package provides OpenAPI document generation at runtime, and adding the `Microsoft.Extensions.ApiDescription.Server`  package enables build-time document generation.
>
>ASP.NET Core generates OpenAPI documents only. Interactive UIs such as **Swagger UI** or **Scalar** are not included by default and must be added separately. For guidance on using these UI options, see Use the generated OpenAPI documents.

In typical web apps, OpenAPI documents are generated at runtime and served via an HTTP request to the app server.

In some scenarios, it's helpful to generate the OpenAPI document during the app's build step. These scenarios include generating OpenAPI documentation that is:

* Committed into source control.
* Used for spec-based integration testing.
* Served statically from the web server.

To add support for generating OpenAPI documents at build time, install the `Microsoft.Extensions.ApiDescription.Server` package:

# Visual Studio

Run the following command from the **Package Manager Console**:

```powershell
Install-Package Microsoft.Extensions.ApiDescription.Server
```

# .NET CLI

Run the following command in a command shell opened to the directory that contains the app's project file:

```dotnetcli
dotnet add package Microsoft.Extensions.ApiDescription.Server
```

---

Upon installation, this package:

* Automatically generates the Open API documents associated with the app during build.
* Populates the Open API documents in the app's output directory.

If multiple documents are registered ***and*** the document name is ***not*** `v1`, the project name is post-fixed with the document name. Example: `{ProjectName}_{DocumentName}.json`. The `{ProjectName}` placeholder is the project name, and the `{DocumentName}` placeholder is the document name.

# Visual Studio Code

```powershell
dotnet build
type obj\{ProjectName}.json
```

# .NET CLI

```cli
dotnet build
cat obj/{ProjectName}.json
```

---

### View build-time OpenAPI logs (Terminal Logger)

When `Microsoft.Extensions.ApiDescription.Server` runs the **:::no-loc text="GetDocument":::** step during `dotnet build`, progress messages aren't visible with the .NET Terminal Logger at default verbosity in .NET 8 or later. To surface these messages while building, use either of the following options with the `dotnet build` command.

Set the Terminal Logger's verbosity with the `-tlp` option set to `v=d` (verbosity = detailed):

```dotnetcli
dotnet build -tlp:v=d
```

Disable the Terminal Logger and use legacy-style logs with the `--tl` option set to `off`:

```dotnetcli
dotnet build --tl:off
```

### Customize build-time document generation

#### Modify the output directory of the generated Open API file

By default, the generated OpenAPI document is emitted to the app's output directory. To modify the location of the emitted file, set the target path in the `OpenApiDocumentsDirectory` property:

```xml
<PropertyGroup>
  <OpenApiDocumentsDirectory>.</OpenApiDocumentsDirectory>
</PropertyGroup>
```

The value of `OpenApiDocumentsDirectory` is resolved relative to the project file. Using the `.` value, as seen in the preceding example, emits the OpenAPI document in the same directory as the project file.

#### Modify the output file name

By default, the generated OpenAPI document has the same name as the app's project file. To modify the name of the emitted file, set the `--file-name` argument in the `OpenApiGenerateDocumentsOptions` property:

```xml
<PropertyGroup>
  <OpenApiGenerateDocumentsOptions>--file-name my-open-api</OpenApiGenerateDocumentsOptions>
</PropertyGroup>
```

#### Select the OpenAPI document to generate

Some apps may be configured to emit multiple OpenAPI documents. Multiple OpenAPI documents may be generated for different versions of an API or to distinguish between public and internal APIs. By default, the build-time document generator emits files for all documents that are configured in an app. To only emit for a single document name, set the `--document-name` argument in the `OpenApiGenerateDocumentsOptions` property:

```xml
<PropertyGroup>
  <OpenApiGenerateDocumentsOptions>--document-name v2</OpenApiGenerateDocumentsOptions>
</PropertyGroup>
```

#### Select the app environment

Starting in .NET 11, set the `OpenApiGenerationEnvironment` property to select the app environment used during build-time OpenAPI document generation. The property sets the host's environment for the generation process, equivalent to setting the `ASPNETCORE_ENVIRONMENT` or `DOTNET_ENVIRONMENT` environment variable:

```xml
<PropertyGroup>
  <OpenApiGenerationEnvironment>Development</OpenApiGenerationEnvironment>
</PropertyGroup>
```

Selecting the environment enables environment-specific configuration, such as settings from `appsettings.Development.json`, and environment-dependent document transformations to affect the generated document. The property doesn't change the environment used when the app runs normally.

### Customize runtime behavior during build-time document generation

Build-time OpenAPI document generation functions by launching the apps entrypoint with a mock server implementation. A mock server is required to produce accurate OpenAPI documents because all information in the OpenAPI document can't be statically analyzed. Because the apps entrypoint is invoked, any logic in the apps startup is invoked. This includes code that injects services into the DI container or reads from configuration. In some scenarios, it's necessary to restrict the code paths when the app's entry point is invoked from build-time document generation. These scenarios include:

* Not reading from certain configuration strings.
* Not registering database-related services.

In order to restrict invoking these code paths by the build-time generation pipeline, they can be conditioned behind a check of the entry assembly:

```csharp
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

if (Assembly.GetEntryAssembly()?.GetName().Name != "GetDocument.Insider")
{
    builder.AddServiceDefaults();
}

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

var myKeyValue = app.Configuration["MyKey"];

app.MapGet("/", () => {
    return Results.Ok($"The value of MyKey is: {myKeyValue}");
})
.WithName("TestKey");

app.Run();
```
`AddServiceDefaults` adds common Aspire services such as service discovery, resilience, health checks, and OpenTelemetry.

## Trimming and Native AOT

OpenAPI in ASP.NET Core supports trimming and native AOT. The following steps create and publish an OpenAPI app with trimming and native AOT.

Create a new ASP.NET Core Web API (Native AOT) project:

```console
dotnet new webapiaot
```

Publish the app:

```console
dotnet publish
```
