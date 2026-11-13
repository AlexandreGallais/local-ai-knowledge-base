---
title: "What's new in ASP.NET Core in .NET 5 (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-5.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 5

This article highlights the most significant changes in ASP.NET Core in .NET 5 with links to relevant documentation.

## ASP.NET Core MVC and Razor improvements

### Model binding DateTime as UTC

Model binding now supports binding UTC time strings to `DateTime`. If the request contains a UTC time string, model binding binds it to a UTC `DateTime`. For example, the following time string is bound the UTC `DateTime`: `https://example.com/mycontroller/myaction?time=2019-06-14T02%3A30%3A04.0576719Z`

### Model binding and validation with C# 9 record types

C# 9 record types can be used with model binding in an MVC controller or a Razor Page. Record types are a good way to model data being transmitted over the network.

For example, the following `PersonController` uses the `Person` record type with model binding and form validation:

```csharp
public record Person([Required] string Name, [Range(0, 150)] int Age);

public class PersonController
{
   public IActionResult Index() => View();

   [HttpPost]
   public IActionResult Index(Person person)
   {
          // ...
   }
}
```

The `Person/Index.cshtml` file:

```cshtml
@model Person

<label>Name: <input asp-for="Model.Name" /></label>
<span asp-validation-for="Model.Name" />

<label>Age: <input asp-for="Model.Age" /></label>
<span asp-validation-for="Model.Age" />
```

### Improvements to DynamicRouteValueTransformer

ASP.NET Core 3.1 introduced `Microsoft.AspNetCore.Mvc.Routing.DynamicRouteValueTransformer` as a way to use custom endpoint to dynamically select an MVC controller action or a Razor page. .NET 5 apps can pass state to a `DynamicRouteValueTransformer` and filter the set of endpoints chosen.

### Miscellaneous

* The [Compare] attribute can be applied to properties on a Razor Page model.
* Parameters and properties bound from the body are considered required by default.

## Web API

### OpenAPI Specification on by default

OpenAPI Specification is an industry standard for describing HTTP APIs and integrating them into complex business processes or with third parties. OpenAPI is widely supported by all cloud providers and many API registries. Apps that emit OpenAPI documents from web APIs have a variety of new opportunities in which those APIs can be used. In partnership with the maintainers of the open-source project Swashbuckle.AspNetCore, the ASP.NET Core API template contains a NuGet dependency on Swashbuckle. Swashbuckle is a popular open-source NuGet package that emits OpenAPI documents dynamically. Swashbuckle does this by introspecting over the API controllers and generating the OpenAPI document at run-time, or at build time using the Swashbuckle CLI.

In .NET 5, the web API templates enable the OpenAPI support by default. To disable OpenAPI:

* From the command line:

	```dotnetcli
	dotnet new webapi --no-openapi true
	```
* From Visual Studio: Uncheck **Enable OpenAPI support**.

All `.csproj` files created for web API projects contain the Swashbuckle.AspNetCore NuGet package reference.

```xml
<ItemGroup>
    <PackageReference Include="Swashbuckle.AspNetCore" Version="5.5.1" />
</ItemGroup>
```

The template generated code contains code in `Startup.ConfigureServices` that activates OpenAPI document generation:

```csharp
public void ConfigureServices(IServiceCollection services)
{

    services.AddControllers();
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebApp1", Version = "v1" });
    });
}
```

The `Startup.Configure` method adds the Swashbuckle middleware, which enables the:

* Document generation process.
* Swagger UI page by default in development mode.

The template generated code won't accidentally expose the API's description when publishing to production.

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();  // UseSwaggerUI Protected by if (env.IsDevelopment())
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json",
                         "WebApp1 v1"));
    }

    app.UseHttpsRedirection();

    app.UseRouting();

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

#### Azure API Management Import

When ASP.NET Core API projects enable OpenAPI, the Visual Studio 2019 version 16.8 or later publishing automatically offer an additional step in the publishing flow. Developers who use Azure API Management have an opportunity to automatically import the APIs into Azure API Management during the publish flow:

### Better launch experience for web API projects

With OpenAPI enabled by default, the app launching experience (F5) for web API developers significantly improves. With .NET 5, the web API template comes pre-configured to load up the Swagger UI page. The Swagger UI page provides both the documentation added for the published API, and enables testing the APIs with a single click.

## Blazor

### Performance improvements

For .NET 5, we made significant improvements to .NET WebAssembly runtime performance with a specific focus on complex UI rendering and JSON serialization. In our performance tests, Blazor WebAssembly in .NET 5 is two to three times faster for most scenarios. For more information, see ASP.NET Blog: ASP.NET Core updates in .NET 5 Release Candidate 1.

### CSS isolation

Blazor now supports defining CSS styles that are scoped to a given component. Component-specific CSS styles make it easier to reason about the styles in an app and to avoid unintentional side effects of global styles. For more information, see ASP.NET Core Blazor CSS isolation.

### New `InputFile` component

The `InputFile` component allows reading one or more files selected by a user for upload. For more information, see ASP.NET Core Blazor file uploads.

### New `InputRadio` and `InputRadioGroup` components

Blazor has built-in `InputRadio` and `InputRadioGroup` components that simplify data binding to radio button groups with integrated validation. For more information, see ASP.NET Core Blazor input components.

### Component virtualization

Improve the perceived performance of component rendering using the Blazor framework's built-in virtualization support. For more information, see ASP.NET Core Razor component virtualization.

### `ontoggle` event support

Blazor events now support the `ontoggle` DOM event. For more information, see ASP.NET Core Blazor event handling.

### Set UI focus in Blazor apps

Use the `FocusAsync` convenience method on element references to set the UI focus to that element. For more information, see ASP.NET Core Blazor event handling.

### Custom validation CSS class attributes

Custom validation CSS class attributes are useful when integrating with CSS frameworks, such as Bootstrap. For more information, see ASP.NET Core Blazor forms validation.

### IAsyncDisposable support

Razor components now support the `System.IAsyncDisposable` interface for the asynchronous release of allocated resources.

### JavaScript isolation and object references

Blazor enables JavaScript isolation in standard JavaScript modules. For more information, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

### Form components support display name

The following built-in components support display names with the `DisplayName` parameter:

* `InputDate`
* `InputNumber`
* `InputSelect`

For more information, see ASP.NET Core Blazor forms overview.

### Catch-all route parameters

Catch-all route parameters, which capture paths across multiple folder boundaries, are supported in components. For more information, see ASP.NET Core Blazor routing.

### Debugging improvements

Debugging Blazor WebAssembly apps is improved in .NET 5. Additionally, debugging is now supported on Visual Studio for Mac. For more information, see Debug ASP.NET Core Blazor apps.

### Microsoft Identity v2.0 and MSAL v2.0

Blazor security now uses Microsoft Identity v2.0 (`Microsoft.Identity.Web` and `Microsoft.Identity.Web.UI`) and MSAL v2.0. For more information, see the topics in the Blazor Security and Identity node.

### Protected Browser Storage for Blazor Server

Blazor Server apps can now use built-in support for storing app state in the browser that has been protected from tampering using ASP.NET Core data protection. Data can be stored in either local browser storage or session storage. For more information, see ASP.NET Core Blazor state management overview and ASP.NET Core Blazor server-side state management.

### Blazor WebAssembly prerendering

Component integration is improved across hosting models, and Blazor WebAssembly apps can now prerender output on the server.

### Trimming/linking improvements

Blazor WebAssembly performs Intermediate Language (IL) trimming/linking during a build to trim unnecessary IL from the app's output assemblies. With the release of .NET 5, Blazor WebAssembly performs improved trimming with additional configuration options. For more information, see Configure the Trimmer for ASP.NET Core Blazor and Trimming options.

### Browser compatibility analyzer

Blazor WebAssembly apps target the full .NET API surface area, but not all .NET APIs are supported on WebAssembly due to browser sandbox constraints. Unsupported APIs throw `System.PlatformNotSupportedException` when running on WebAssembly. A platform compatibility analyzer warns the developer when the app uses APIs that aren't supported by the app's target platforms. For more information, see Consume ASP.NET Core Razor components from a Razor class library (RCL).

### Lazy load assemblies

Blazor WebAssembly app startup performance can be improved by deferring the loading of some application assemblies until they're required. For more information, see Lazy load assemblies in ASP.NET Core Blazor WebAssembly.

### Updated globalization support

Globalization support is available for Blazor WebAssembly based on International Components for Unicode (ICU). For more information, see ASP.NET Core Blazor globalization and localization.

## gRPC

Many performance improvements have been made in gRPC. For more information, see gRPC performance improvements in .NET 5.

For more gRPC information, see Overview for gRPC on .NET.

## SignalR

### SignalR Hub filters

SignalR Hub filters, called Hub pipelines in ASP.NET SignalR, is a feature that allows code to run before and after Hub methods are called. Running code before and after Hub methods are called is similar to how middleware has the ability to run code before and after an HTTP request. Common uses include logging, error handling, and argument validation.

For more information, see Use hub filters in ASP.NET Core SignalR.

### SignalR parallel hub invocations

ASP.NET Core SignalR is now capable of handling parallel hub invocations. The default behavior can be changed to allow clients to invoke more than one hub method at a time:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR(options =>
    {
        options.MaximumParallelInvocationsPerClient = 5;
    });
}
```

### Added Messagepack support in SignalR Java client

A new package, com.microsoft.signalr.messagepack, adds MessagePack support to the SignalR Java client. To use the MessagePack hub protocol, add `.withHubProtocol(new MessagePackHubProtocol())` to the connection builder:

```java
HubConnection hubConnection = HubConnectionBuilder.create(
                           "http://localhost:53353/MyHub")
               .withHubProtocol(new MessagePackHubProtocol())
               .build();
```
