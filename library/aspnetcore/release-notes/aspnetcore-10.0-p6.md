---
title: "What's new in ASP.NET Core in .NET 10 (part 6 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 10 (part 6 of 9)

## OpenAPI

This section describes new features for OpenAPI.

### OpenAPI 3.1 support

ASP.NET Core has added support for generating [OpenAPI version 3.1] documents in .NET 10.
Despite the minor version bump, OpenAPI 3.1 is a significant update to the OpenAPI specification,
in particular with full support for [JSON Schema draft 2020-12].

Some of the changes you will see in the generated OpenAPI document include:

* Nullable types no longer have the `nullable: true` property in the schema.
* Instead of a `nullable: true` property, they have a `type` keyword whose value is an array that includes `null` as one of the types.
* Properties or parameters defined as a C# `int` or `long` now appear in the generated OpenAPI document without the `type: integer` field
and have a `pattern` field limiting the value to digits.
This happens when the `System.Text.Json.JsonSerializerOptions.NumberHandling` property in the `System.Text.Json.JsonSerializerOptions` is set to `AllowReadingFromString`, the default for ASP.NET Core Web apps. To enable C# `int` and `long` to be represented in the OpenAPI document as `type: integer`, set the `System.Text.Json.JsonSerializerOptions.NumberHandling` property to `Strict`.

With this feature, the default OpenAPI version for generated documents is`3.1`. The version can be changed by explicitly setting the OpenApiVersion property of the OpenApiOptions in the `configureOptions` delegate parameter of AddOpenApi:

```csharp
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_1;
});
```
When generating the OpenAPI document at build time, the OpenAPI version can be selected by setting the `--openapi-version` in the `OpenApiGenerateDocumentsOptions` MSBuild item:

```xml
<PropertyGroup>
	<TargetFramework>net10.0</TargetFramework>
	<Nullable>enable</Nullable>
	<ImplicitUsings>enable</ImplicitUsings>
	<OpenApiGenerateDocumentsOnBuild>true</OpenApiGenerateDocumentsOnBuild>
	<!-- Configure build-time OpenAPI generation to produce an OpenAPI 3.1 document. -->
	<OpenApiGenerateDocumentsOptions>--openapi-version OpenApi3_1</OpenApiGenerateDocumentsOptions>
</PropertyGroup>
```
OpenAPI 3.1 support was primarily added in the following PR.

### OpenAPI 3.1 breaking changes

Support for OpenAPI 3.1 requires an update to the underlying OpenAPI.NET library to a new major version, 2.0. This new version has some breaking changes from the previous version. The breaking changes may impact apps if they have any document, operation, or schema transformers.
Breaking changes in this iteration include the following:

* Entities within the OpenAPI document, like operations and parameters, are typed as interfaces. Concrete implementations exist for the inlined and referenced variants of an entity. For example, an `IOpenApiSchema` can either be an inlined `OpenApiSchema` or an `OpenApiSchemaReference` that points to a schema defined elsewhere in the document.
* The `Nullable` property has been removed from the `OpenApiSchema` type. To determine if a type is nullable, evaluate if the `OpenApiSchema.Type` property sets `JsonSchemaType.Null`.

One of the most significant changes is that the `OpenApiAny` class has been dropped in favor of using `JsonNode` directly. Transformers that use `OpenApiAny` need to be updated to use `JsonNode`. The following diff shows the changes in schema transformer from .NET 9 to .NET 10:

```diff
options.AddSchemaTransformer((schema, context, cancellationToken) =>
{
    if (context.JsonTypeInfo.Type == typeof(WeatherForecast))
    {
-       schema.Example = new OpenApiObject
+       schema.Example = new JsonObject
        {
-           ["date"] = new OpenApiString(DateTime.Now.AddDays(1).ToString("yyyy-MM-dd")),
+           ["date"] = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd"),
-           ["temperatureC"] = new OpenApiInteger(0),
+           ["temperatureC"] = 0,
-           ["temperatureF"] = new OpenApiInteger(32),
+           ["temperatureF"] = 32,
-           ["summary"] = new OpenApiString("Bracing"),
+           ["summary"] = "Bracing",
        };
    }
    return Task.CompletedTask;
});
```
Note that these changes are necessary even when only configuring the OpenAPI version to 3.0.

### OpenAPI in YAML

ASP.NET now supports serving the generated OpenAPI document in YAML format. YAML can be more concise than JSON, eliminating curly braces and quotation marks when these can be inferred. YAML also supports multi-line strings, which can be useful for long descriptions.

To configure an app to serve the generated OpenAPI document in YAML format, specify the endpoint in the MapOpenApi call with a ".yaml" or ".yml" suffix, as shown in the following example:

```csharp
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi("/openapi/{documentName}.yaml");
}
```
Support for:

* YAML is currently only available for the OpenAPI served from the OpenAPI endpoint.
* Generating OpenAPI documents in YAML format at build time is added in a future preview.

See this PR which added support for serving the generated OpenAPI document in YAML format.

### Response description on `ProducesResponseType` for API controllers

The `Microsoft.AspNetCore.Mvc.ProducesAttribute`, `Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute`, and `Microsoft.AspNetCore.Mvc.ProducesDefaultResponseTypeAttribute` now accept an optional string parameter, `Description`, that sets the description of the response:

```csharp
[HttpGet(Name = "GetWeatherForecast")]
[ProducesResponseType<IEnumerable<WeatherForecast>>(StatusCodes.Status200OK,
    Description = "The weather forecast for the next 5 days.")]
public IEnumerable<WeatherForecast> Get()
{
```

Generated OpenAPI data:

```json
"responses": {
  "200": {
    "description": "The weather forecast for the next 5 days.",
    "content": {
```

This functionality is supported in both API controllers and Minimal APIs. For Minimal APIs, the `Description` property is correctly set even when the attribute's type and the inferred return type aren't an exact match.

Community contribution (`dotnet/aspnetcore` #58193) by Sander ten Brinke.

### Populate XML doc comments into OpenAPI document

ASP.NET Core OpenAPI document generation will now include metadata from XML doc comments on method, class, and member definitions in the OpenAPI document. You must enable XML doc comments in your project file to use this feature. You can do this by adding the following property to your project file:

```xml
  <PropertyGroup>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
  </PropertyGroup>
```

At build-time, the OpenAPI package will leverage a source generator to discover XML comments in the current application assembly and any project references and emit source code to insert them into the document via an OpenAPI document transformer.

Note that the C# build process does not capture XML doc comments placed on lambda expressions, so to use XML doc comments to add metadata to a Minimal API endpoint, you must define the endpoint handler as a method, put the XML doc comments on the method, and then reference that method from the `MapXXX` method. For example, to use XML doc comments to add metadata to a Minimal API endpoint originally defined as a lambda expression:

```csharp
app.MapGet("/hello", (string name) =>$"Hello, {name}!");
```

Change the `MapGet` call to reference a method:

```csharp
app.MapGet("/hello", Hello);
```

Define the `Hello` method with XML doc comments:

```csharp
static partial class Program
{
    /// <summary>
    /// Sends a greeting.
    /// </summary>
    /// <remarks>
    /// Greeting a person by their name.
    /// </remarks>
    /// <param name="name">The name of the person to greet.</param>
    /// <returns>A greeting.</returns>
    public static string Hello(string name)
    {
        return $"Hello, {name}!";
    }
}
```

In the previous example the `Hello` method is added to the `Program` class, but you can add it to any class in your project.

The previous example illustrates the `<summary>`, `<remarks>`, and `<param>` XML doc comments.
For more information about XML doc comments, including all the supported tags, see the C# documentation.

Since the core functionality is provided via a source generator, it can be disabled by adding the following MSBuild to your project file.

```
<ItemGroup>
  <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="10.0.0-preview.2.*" GeneratePathProperty="true" />
</ItemGroup>

<Target Name="DisableCompileTimeOpenApiXmlGenerator" BeforeTargets="CoreCompile">
  <ItemGroup>
    <Analyzer Remove="$(PkgMicrosoft_AspNetCore_OpenApi)/analyzers/dotnet/cs/Microsoft.AspNetCore.OpenApi.SourceGenerators.dll" />
  </ItemGroup>
</Target>
```

The source generator process XML files included in the `AdditionalFiles` property. To add (or remove), sources modify the property as follows:

```
<Target Name="AddXmlSources" BeforeTargets="CoreCompile">
  <ItemGroup>
    <AdditionalFiles Include="$(PkgSome_Package)/lib/net10.0/Some.Package.xml" />
  </ItemGroup>
</Target>
```

### Microsoft.AspNetCore.OpenApi added to the ASP.NET Core web API (Native AOT) template

The **ASP.NET Core Web API (Native AOT)** project template (short name `webapiaot`) now includes support for OpenAPI document generation using the `Microsoft.AspNetCore.OpenApi` package by default. This support is disabled by using the `--no-openapi` flag when creating a new project.

Community contribution (`dotnet/aspnetcore` #60337) by Sander ten Brinke.

### Support for `IOpenApiDocumentProvider` in the DI container

ASP.NET Core in .NET 10 supports `Microsoft.AspNetCore.OpenApi.IOpenApiDocumentProvider` in the dependency injection (DI) container. Inject the interface to access the OpenAPI document. This approach is useful for accessing OpenAPI documents outside the context of HTTP requests, such as in background services or custom middleware.

Previously, running app startup logic without launching an HTTP server could be accomplished using `HostFactoryResolver` with a no-op `Microsoft.AspNetCore.Hosting.Server.IServer` implementation. The new feature simplifies this process.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

For more information, see Add IOpenApiDocumentProvider interface and implementation (`dotnet/aspnetcore` #61463).

### Improvements to the XML comment generator

XML comment generation handles complex types in .NET 10 better than earlier versions of .NET.

* It produces accurate and complete XML comments for a wider range of types.
* It handles more complex scenarios.
* It gracefully bypasses processing for complex types that cause build errors in earlier versions.

These improvements change the failure mode for certain scenarios from build errors to missing metadata.

In addition, XML doc comment processing can now be configured to access XML comments in other assemblies. This is useful for generating documentation for types that are defined outside the current assembly, such as the `ProblemDetails` type in the `Microsoft.AspNetCore.Http` namespace.

This configuration is done with directives in the project build file. The following example shows how to configure the XML comment generator to access XML comments for types in the `Microsoft.AspNetCore.Http` assembly, which includes the `ProblemDetails` class.

```xml
<Target Name="AddOpenApiDependencies" AfterTargets="ResolveReferences">
  <ItemGroup>
  <!-- Include XML documentation from Microsoft.AspNetCore.Http.Abstractions
    to get metadata for ProblemDetails -->
    <AdditionalFiles
          Include="@(ReferencePath->'
            %(RootDir)%(Directory)%(Filename).xml')"
          Condition="'%(ReferencePath.Filename)' ==
           'Microsoft.AspNetCore.Http.Abstractions'"
          KeepMetadata="Identity;HintPath" />
  </ItemGroup>
</Target>
```

We expect to include XML comments from a selected set of assemblies in the shared framework in future previews to avoid the need for this configuration in most cases.

#### Unified handling of documentation IDs in OpenAPI XML comment generator

XML documentation comments from referenced assemblies are correctly merged even when their documentation IDs include return type suffixes. As a result, all valid XML comments are reliably included in generated OpenAPI documentation, improving documentation accuracy and completeness for APIs using referenced assemblies.

### Form data enum parameters use actual enum type in OpenAPI

Form data parameters in MVC controller actions now generate OpenAPI metadata using the actual enum type instead of defaulting to string.

Community contribution: Thanks to @ascott18!

### Support for generating OpenApiSchemas in transformers

Developers can now generate a schema for a C# type using the same logic as ASP.NET Core OpenAPI document generation and add it to the OpenAPI document. The schema can then be referenced from elsewhere in the OpenAPI document.

The context passed to document, operation, and schema transformers includes a new `GetOrCreateSchemaAsync` method that can be used to generate a schema for a type.
This method also has an optional `ApiParameterDescription` parameter to specify additional metadata for the generated schema.

To support adding the schema to the OpenAPI document, a `Document` property has been added to the Operation and Schema transformer contexts. This allows any transformer to add a schema to the OpenAPI document using the document's `AddComponent` method.

#### Example

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
