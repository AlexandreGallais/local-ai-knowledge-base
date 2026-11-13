---
title: "ASP.NET Core support for Native AOT (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/native-aot.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core support for Native AOT

By Mitch Denny

-->
-->

-->

Publishing and deploying Native ahead-of-time (AOT) applications in ASP.NET Core offers several benefits:

- **Minimized disk footprint**. When you publish an app by using Native AOT, the process produces a single executable file. The executable contains only the code from the external dependencies required to support the app. The reduced executable size can lead to:
  * Smaller container images, for example in containerized deployment scenarios.
  * Reduced deployment time from smaller images.

- **Reduced startup time**. Native AOT apps can require less startup time, which enables:
  * The app to service requests quicker.
  * Improved deployment, where the container orchestrators manage the transition from one app version to another.

- **Reduced memory demand**. Native AOT apps can require less memory, depending on the work done by the app. Reduced memory consumption can lead to greater deployment density and improved scalability.

The following chart shows the results of a benchmarking test on the various template apps. The benchmark compares performance for an AOT published app (orange bar), a trimmed runtime app (green bar), and an untrimmed runtime app (yellow bar). The test revealed that the Native AOT app demonstrates lower app size, memory usage, and startup time.

:::image type="content" source="~/fundamentals/aot/_static/aot-runtime-trimmed-perf-chart.png" border="false" alt-text="Chart showing a comparison of app size, memory use, and startup time metrics. The chart compares a published Native AOT app, a trimmed runtime app, and an untrimmed runtime app."

This article describes support for Native AOT apps in ASP.NET Core, including an overview of publishing and deployment.

For ASP.NET Core Blazor WebAssembly Native AOT guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation.

## Review ASP.NET Core and Native AOT compatibility

Not all features in ASP.NET Core are currently compatible with Native AOT.

The following table summarizes ASP.NET Core feature compatibility with Native AOT.

| Feature | Supported | Partial support | Not supported |
|---|:---:|:---:|:---:|
| Blazor Server        |  |  | ❌ |
| CORS                 | ✔️ |  |  |
| gRPC                 | ✔️ |  |  |
| HealthChecks         | ✔️ |  |  |
| HttpLogging          | ✔️ |  |  |
| JWT Authentication   | ✔️ |  |  |
| Localization         | ✔️ |  |  |
| Minimal APIs         |  | ✔️ |  |
| MVC                  |  |  | ❌ |
| OData                |  |  | ❌ |
| Other Authentication |  |  | ❌ |
| OutputCaching        | ✔️ |  |  |
| RateLimiting         | ✔️ |  |  |
| RequestDecompression | ✔️ |  |  |
| ResponseCaching      | ✔️ |  |  |
| ResponseCompression  | ✔️ |  |  |
| Rewrite              | ✔️ |  |  |
| Session              |  |  | ❌ |
| SignalR              |  | ✔️ |  |
| Spa                  |  |  | ❌ |
| StaticFiles          | ✔️ |  |  |
| WebSockets           | ✔️ |  |  |

For more information on limitations, see:

* Limitations of Native AOT deployment
* AOT warnings
* Known trimming incompatibilities
* Fix trimming warnings

### Verify app on the Native AOT deployment model

It's important to test an app thoroughly when you move to a Native AOT deployment model. Test the AOT deployed app and confirm the functionality is unchanged from the untrimmed and just-in-time (JIT) compiled app.

When you build the app, review and correct any AOT warnings. An app that issues AOT warnings during publishing might not work correctly. If no AOT warnings are issued at publish time, you can expect the published AOT app to work the same as the untrimmed and JIT-compiled app.

## Publish a Native AOT app (PublishAot)

Enable Native AOT for your application by using the `PublishAot` MSBuild property. The following example shows how to enable Native AOT in a project file:

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
</PropertyGroup>
```

The `PublishAot` property enables Native AOT compilation during the publish process, and enables dynamic code usage analysis during build and editing. A project that uses Native AOT publishing implements JIT compilation when it runs locally.

An AOT app has the following differences from a JIT-compiled app:

* Features that aren't compatible with Native AOT are disabled and throw exceptions at run time.
* A source analyzer is enabled to highlight code that isn't compatible with Native AOT. At publish time, the entire app, including NuGet packages, are analyzed for compatibility again.

Native AOT analysis includes all of the application code and the libraries the app depends on. Review Native AOT warnings and take corrective steps. It's a good idea to publish apps frequently to discover issues early in the development lifecycle.

In .NET 8 and later, the following ASP.NET Core app types support Native AOT:

* **Minimal APIs** - For more information, see Review the Web API (Native AOT) template later in this article.
* **gRPC** - For more information, see gRPC and Native AOT.
* **Worker services** - For more information, see Background tasks with hosted services in ASP.NET Core > Native AOT.

## Review the Web API (Native AOT) template

The ASP.NET Core **Web API (Native AOT)** template (short name `webapiaot`) creates a project with AOT enabled. The template differs from a standard **Web API** project template in the following ways:

* Uses Minimal APIs only, as MVC isn't yet compatible with Native AOT.
* Uses the `Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder` API to ensure only the essential features are enabled by default, which minimizes the app's deployed size.
* Is configured to listen on HTTP only. HTTPS traffic is commonly handled by an ingress service in cloud-native deployments.
* Doesn't include a launch profile for running under IIS or IIS Express.
* Creates an .http file configured with sample HTTP requests that can be sent to the app's endpoints.
* Includes a sample `Todo` API instead of the weather forecast sample.
* Adds the `PublishAot` property to the project file, as described earlier.
* Enables the JSON serializer source generators. The source generator is used to generate serialization code at build time, which is required for Native AOT compilation.

### Code updates for JSON serialization (Program.cs)

The code in the _Program.cs_ file is modified to provide support for JSON serialization source generation.

The following snippet shows the changes to the code:

```diff
using MyFirstAotWebApi;
+using System.Text.Json.Serialization;

-var builder = WebApplication.CreateBuilder();
+var builder = WebApplication.CreateSlimBuilder(args);

+builder.Services.ConfigureHttpJsonOptions(options =>
+{
+  options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
+});

var app = builder.Build();

var sampleTodos = TodoGenerator.GenerateTodos().ToArray();

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.Run();

+[JsonSerializable(typeof(Todo[]))]
+internal partial class AppJsonSerializerContext : JsonSerializerContext
+{
+
+}
```

If you don't modify the code, `System.Text.Json` uses reflection to serialize and deserialize JSON. Reflection isn't supported in Native AOT.

For more information, see:

* Combine source generators
* `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain`

### Code changes for launch profile (launchSettings.json)

The **Web API (Native AOT)** template creates a _launchSettings.json_ file. In contrast to a standard launch file, the generated file doesn't include the `iisSettings` section or the `IIS Express` profile.

The following snippet shows the excluded sections (colored red):

```diff
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
-  "iisSettings": {
-     "windowsAuthentication": false,
-     "anonymousAuthentication": true,
-     "iisExpress": {
-       "applicationUrl": "http://localhost:11152",
-       "sslPort": 0
-     }
-   },
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "todos",
      "applicationUrl": "http://localhost:5102",
        "environmentVariables": {
          "ASPNETCORE_ENVIRONMENT": "Development"
        }
      },
-     "IIS Express": {
-       "commandName": "IISExpress",
-       "launchBrowser": true,
-       "launchUrl": "todos",
-      "environmentVariables": {
-       "ASPNETCORE_ENVIRONMENT": "Development"
-      }
-    }
  }
}
```

### CreateSlimBuilder() called for minimal app defaults

The **Web API (Native AOT)** template uses the `Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder` method instead of the `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder` method.

```csharp
using System.Text.Json.Serialization;
using MyFirstAotWebApi;

var builder = WebApplication.CreateSlimBuilder(args);
builder.Logging.AddConsole();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

var sampleTodos = TodoGenerator.GenerateTodos().ToArray();

var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

app.Run();

[JsonSerializable(typeof(Todo[]))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
}
```
The `CreateSlimBuilder` method initializes the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` with the minimum ASP.NET Core features necessary to run an app.

As described earlier, the `CreateSlimBuilder` method doesn't include support for HTTPS or HTTP/3. These protocols typically aren't required for apps that run behind a TLS termination proxy. For example, see TLS termination and end to end TLS with Application Gateway. You can enable HTTPS by calling the
builder.WebHost.UseKestrelHttpsConfiguration method, or enable HTTP/3 by calling the builder.WebHost.UseQuic.

## Compare CreateSlimBuilder() and CreateBuilder()

The `CreateSlimBuilder` method provides access to a portion of the application features available with the `CreateBuilder` method. As described earlier, the **Web API (Native AOT)** template calls `CreateSlimBuilder` to initialize `Microsoft.AspNetCore.Builder.WebApplicationBuilder`, so the builder uses the minimum ASP.NET Core features necessary to run the app.

Both methods provide the necessary features for an efficient development experience:

* Configuration for the _appsettings.json_ and _appsettings.{EnvironmentName}.json_ files
* User secrets configuration
* Console logging
* Logging configuration

Including minimal features has benefits for trimming as well as AOT. For more information, see Trim self-contained deployments and executables.

If you prefer to use a builder that omits all features, see the WebApplication.CreateEmptyBuilder method.

### Unavailable features in CreateSlimBuilder

The `CreateSlimBuilder` method **doesn't** provide the following features, which are available in `CreateBuilder`:

* Hosting startup assemblies
* UseStartup method
* Logging providers:
    * Windows EventLog
    * Debug
    * EventSource
* Web hosting features:
    * UseStaticWebAssets method
    * IIS integration
* Kestrel configuration:
    * HTTPS endpoints
    * QUIC (HTTP/3)
* Regex and alpha constraints used in routing (GitHub /dotnet/aspnetcore/issues #46142)

For more detailed information, see Comparing WebApplication.CreateBuilder to CreateSlimBuilder

## Use source generators and avoid reflection

During the publishing process for Native AOT, any unused code is trimmed. As a result, an app can't use unbounded reflection at runtime. You can use source generators that produce code that avoids the need for reflection. In some cases, source generators output code optimized for AOT even when a generator isn't required.

- To view the generated source code, add the EmitCompilerGeneratedFiles property to the application project (_.csproj_) file:

   ```xml
   <Project Sdk="Microsoft.NET.Sdk.Web">

     <PropertyGroup>
       <!-- Other properties omitted for brevity -->
       <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
     </PropertyGroup>

   </Project>
   ```

- To see the generated code, run the `dotnet build` command. The command compiles the source files and generates the intermediate files needed to run the app in a development environment. The output includes an _obj/Debug/<.NET version>/generated/_ directory that contains all the generated files for the project.

- To prepare the app for deployment, run the `dotnet publish` command. The command compiles the source files and generates all files required to deploy the app. It passes the generated assemblies to a native IL compiler, which produces the native executable. The native executable contains the native machine code.

### Use libraries with Native AOT

Many popular libraries used in ASP.NET Core projects currently have some compatibility issues when they're incorporated into projects that target Native AOT, such as:

* Using reflection to inspect and discover types
* Loading libraries conditionally at runtime
* Generating code on the fly to implement functionality

Libraries that use these dynamic features require updates to work with Native AOT. Various tools are available for applying the necessary updates, such as Roslyn source generators.

Library authors hoping to support Native AOT are encouraged to review the following articles:

* Native AOT deployment
* Prepare .NET libraries for trimming
