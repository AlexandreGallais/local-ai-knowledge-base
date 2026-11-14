---
title: "What's new in ASP.NET Core in .NET 8 (part 4 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-8.0.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 8 (part 4 of 6)

## Minimal APIs

This section describes new features for Minimal APIs. See also the section on Native AOT for more information relevant to Minimal APIs.

### User override culture

Starting in .NET 8, the RequestLocalizationOptions.CultureInfoUseUserOverride property allows the application to decide whether or not to use nondefault Windows settings for the `System.Globalization.CultureInfo` `System.Globalization.CultureInfo.DateTimeFormat` and `System.Globalization.CultureInfo.NumberFormat` properties. This has no impact on Linux. This directly corresponds to `System.Globalization.CultureInfo.UseUserOverride`.

```csharp
    app.UseRequestLocalization(options =>
    {
        options.CultureInfoUseUserOverride = false;
    });
```

### Binding to forms

Explicit binding to form values using the [FromForm] attribute is now supported. Parameters bound to the request with `[FromForm]` include an antiforgery token. The antiforgery token is validated when the request is processed.

Inferred binding to forms using the `Microsoft.AspNetCore.Http.IFormCollection`, `Microsoft.AspNetCore.Http.IFormFile`, and `Microsoft.AspNetCore.Http.IFormFileCollection` types is also supported. OpenAPI metadata is inferred for form parameters to support integration with Swagger UI.

For more information, see:

* Explicit binding from form values.
* Binding to forms with IFormCollection, IFormFile, and IFormFileCollection.
* Form binding in Minimal APIs

Binding from forms is now supported for:

* Collections, for example List and Dictionary
* Complex types, for example, `Todo` or `Project`

For more information, see Bind to collections and complex types from forms.

### Antiforgery with Minimal APIs

This release adds a middleware for validating antiforgery tokens, which are used to mitigate cross-site request forgery attacks. Call AddAntiforgery to register antiforgery services in DI. `WebApplicationBuilder` automatically adds the middleware when the antiforgery services have been registered in the DI container. Antiforgery tokens are used to mitigate cross-site request forgery attacks.

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/minimal-apis/samples/MyAntiForgery/Program.cs._
The antiforgery middleware:

* Does ***not*** short-circuit the execution of the rest of the request pipeline.
* Sets the  IAntiforgeryValidationFeature in the HttpContext.Features of the current request.

The antiforgery token is only validated if:

* The endpoint contains metadata implementing  IAntiforgeryMetadata where `RequiresValidation=true`.
* The HTTP method associated with the endpoint is a relevant HTTP method. The relevant methods are all HTTP methods except for TRACE, OPTIONS, HEAD, and GET.
* The request is associated with a valid endpoint.

For more information, see Antiforgery with Minimal APIs.

### New `IResettable` interface in `ObjectPool`

Microsoft.Extensions.ObjectPool provides support for pooling object instances in memory. Apps can use an object pool if the values are expensive to allocate or initialize.

In this release, we've made the object pool easier to use by adding the `Microsoft.Extensions.ObjectPool.IResettable` interface. Reusable types often need to be reset back to a default state between uses. `IResettable` types are automatically reset when returned to an object pool.

For more information, see the ObjectPool sample.

## Native AOT

Support for .NET native ahead-of-time (AOT) has been added. Apps that are published using AOT can have substantially better performance: smaller app size, less memory usage, and faster startup time. Native AOT is currently supported by gRPC, Minimal API, and worker service apps. For more information, see ASP.NET Core support for Native AOT and Tutorial: Publish an ASP.NET Core app using Native AOT. For information about known issues with ASP.NET Core and Native AOT compatibility, see GitHub issue dotnet/core #8288.

### Use libraries with Native AOT

Many popular libraries used in ASP.NET Core projects currently have some compatibility issues when they're incorporated into projects that target Native AOT, such as:

* Using reflection to inspect and discover types
* Loading libraries conditionally at runtime
* Generating code on the fly to implement functionality

Libraries that use these dynamic features require updates to work with Native AOT. Various tools are available for applying the necessary updates, such as Roslyn source generators.

Library authors hoping to support Native AOT are encouraged to review the following articles:

* Native AOT deployment
* Prepare .NET libraries for trimming

### New project template

The new **ASP.NET Core Web API (Native AOT)** project template (short name `webapiaot`) creates a project with AOT publish enabled. For more information, see The Web API (Native AOT) template.

### New `CreateSlimBuilder` method

The `Microsoft.AspNetCore.Builder.WebApplication.CreateSlimBuilder` method used in the Web API (Native AOT) template initializes the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` with the minimum ASP.NET Core features necessary to run an app. The `CreateSlimBuilder` method includes the following features that are typically needed for an efficient development experience:

* JSON file configuration for `appsettings.json` and `appsettings.{EnvironmentName}.json`.
* User secrets configuration.
* Console logging.
* Logging configuration.

For more information, see The `CreateSlimBuilder` method.

### New `CreateEmptyBuilder` method

There's another new `Microsoft.AspNetCore.Builder.WebApplicationBuilder` factory method for building small apps that only contain necessary features: `WebApplication.CreateEmptyBuilder(WebApplicationOptions options)`. This `WebApplicationBuilder` is created with no built-in behavior. The app it builds contains only the services and middleware that are explicitly configured.

Here's an example of using this API to create a small web application:

```csharp
var builder = WebApplication.CreateEmptyBuilder(new WebApplicationOptions());
builder.WebHost.UseKestrelCore();

var app = builder.Build();

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Hello, World!");
    await next(context);
});

Console.WriteLine("Running...");
app.Run();
```
Publishing this code with Native AOT using .NET 8 Preview 7 on a linux-x64 machine results in a self-contained native executable of about 8.5 MB.

### Reduced app size with configurable HTTPS support

We've further reduced Native AOT binary size for apps that don't need HTTPS or HTTP/3 support. Not using HTTPS or HTTP/3 is common for apps that run behind a TLS termination proxy (for example, hosted on Azure). The new `WebApplication.CreateSlimBuilder` method omits this functionality by default. It can be added by calling `builder.WebHost.UseKestrelHttpsConfiguration()` for HTTPS or `builder.WebHost.UseQuic()` for HTTP/3. For more information, see The `CreateSlimBuilder` method.

### JSON serialization of compiler-generated `IAsyncEnumerable<T>` types

New features were added to `System.Text.Json` to better support Native AOT. These new features add capabilities for the source generation mode of `System.Text.Json`, because reflection isn't supported by AOT.

One of the new features is support for JSON serialization of `System.Collections.Generic.IAsyncEnumerable`1` implementations implemented by the C# compiler. This support opens up their use in ASP.NET Core projects configured to publish Native AOT.

This API is useful in scenarios where a route handler uses `yield return` to asynchronously return an enumeration. For example, to materialize rows from a database query. For more information, see Unspeakable type support in the .NET 8 Preview 4 announcement.

For information abut other improvements in `System.Text.Json` source generation, see Serialization improvements in .NET 8.

### Top-level APIs annotated for trim warnings

The main entry points to subsystems that don't work reliably with Native AOT are now annotated. When these methods are called from an application with Native AOT enabled, a warning is provided. For example, the following code produces a warning at the invocation of `AddControllers` because this API isn't trim-safe and isn't supported by Native AOT.

### Request delegate generator

In order to make Minimal APIs compatible with Native AOT, we're introducing the Request Delegate Generator (RDG). The RDG is a source generator that does what the `Microsoft.AspNetCore.Http.RequestDelegateFactory` (RDF) does. That is, it turns the various `MapGet()`, `MapPost()`, and calls like them into `Microsoft.AspNetCore.Http.RequestDelegate` instances associated with the specified routes. But rather than doing it in-memory in an application when it starts, the RDG does it at compile time and generates C# code directly into the project. The RDG:

* Removes the runtime generation of this code.
* Ensures that the types used in APIs are statically analyzable by the Native AOT tool-chain.
* Ensures that required code isn't trimmed away.

We're working to ensure that as many as possible of the Minimal API features are supported by the RDG and thus compatible with Native AOT.

The RDG is enabled automatically in a project when publishing with Native AOT is enabled. RDG can be manually enabled even when not using Native AOT by setting `<EnableRequestDelegateGenerator>true</EnableRequestDelegateGenerator>` in the project file. This can be useful when initially evaluating a project's readiness for Native AOT, or to reduce the startup time of an app.

### Improved performance using Interceptors

The Request Delegate Generator uses the new C# 12 interceptors compiler feature to support intercepting calls to Minimal API Map methods with statically generated variants at runtime. The use of interceptors results in increased startup performance for apps compiled with `PublishAot`.

### Logging and exception handling in compile-time generated Minimal APIs

Minimal APIs generated at run time support automatically logging (or throwing exceptions in `Development` environments) when parameter binding fails. .NET 8 introduces the same support for APIs generated at compile time via the Request Delegate Generator (RDG). For more information, see Logging and exception handling in compile-time generated Minimal APIs.

### AOT and System.Text.Json

Minimal APIs are optimized for receiving and returning JSON payloads using `System.Text.Json`, so the compatibility requirements for JSON and Native AOT apply too. Native AOT compatibility requires the use of the `System.Text.Json` source generator. All types accepted as parameters to or returned from request delegates in Minimal APIs must be configured on a `JsonSerializerContext` that is registered via ASP.NET Core's dependency injection, for example:

```csharp
// Register the JSON serializer context with DI
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

...

// Add types used in the Minimal API app to source generated JSON serializer content
[JsonSerializable(typeof(Todo[]))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
```

For more information about the `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain` API, see the following resources:

* JsonSerializerOptions.TypeInfoResolverChain
* Chain source generators
* Changes to support source generation

### Libraries and Native AOT

Many of the common libraries available for ASP.NET Core projects today have some compatibility issues if used in a project targeting Native AOT. Popular libraries often rely on the dynamic capabilities of .NET reflection to inspect and discover types, conditionally load libraries at runtime, and generate code on the fly to implement their functionality. These libraries need to be updated in order to work with Native AOT by using tools like Roslyn source generators.

Library authors wishing to learn more about preparing their libraries for Native AOT are encouraged to start by preparing their library for trimming and learning more about the Native AOT compatibility requirements.
