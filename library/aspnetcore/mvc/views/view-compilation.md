---
title: "Razor file compilation in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/view-compilation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Razor file compilation in ASP.NET Core

Razor files with a `.cshtml` extension are compiled at both build and publish time using the Razor SDK. Runtime compilation may be optionally enabled by configuring the project.

> **Note:**
> Runtime compilation:
> * Was obsoleted starting in .NET 10.
> * Isn't supported for Razor components of Blazor apps.
> * Doesn't support global using directives.
> * Doesn't support implicit using directives.
> * Disables .NET Hot Reload.
> * Isn't recommended for production scenarios.
>
> For production scenarios, use the default build-time compilation. For development scenarios, use Hot Reload. For more information, see Razor runtime compilation is obsolete.

## Razor compilation

Build-time and publish-time compilation of Razor files is enabled by default by the Razor SDK. When enabled, runtime compilation complements build-time compilation, allowing Razor files to be updated if they're edited while the app is running.

Updating Razor views and Razor Pages during development while the app is running is also supported using .NET Hot Reload.

> **Note:**
> Razor runtime compilation was obsoleted starting in .NET 10. When enabled, runtime compilation disables .NET Hot Reload. We recommend using Hot Reload instead for development scenarios. For more information, see Razor runtime compilation is obsolete.

## Enable runtime compilation for all environments

To enable runtime compilation for all environments:

1. Install the Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation NuGet package.
1. Call `Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation*` in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages()
    .AddRazorRuntimeCompilation();
```
## Enable runtime compilation conditionally

Runtime compilation can be enabled conditionally, which ensures that the published output:

* Uses compiled views.
* Doesn't enable file watchers in production.

To enable runtime compilation only for the `Development` environment:

1. Install the Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation NuGet package.
1. Call `Microsoft.Extensions.DependencyInjection.RazorRuntimeCompilationMvcBuilderExtensions.AddRazorRuntimeCompilation*` in `Program.cs` when the current environment is set to Development:

```csharp
var builder = WebApplication.CreateBuilder(args);

var mvcBuilder = builder.Services.AddRazorPages();

if (builder.Environment.IsDevelopment())
{
    mvcBuilder.AddRazorRuntimeCompilation();
}
```
Runtime compilation can also be enabled with a hosting startup assembly. To enable runtime compilation in the `Development` environment for specific launch profiles:

1. Install the Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation NuGet package.
1. Modify the launch profile's `environmentVariables` section in `launchSettings.json`:
   * Verify that `ASPNETCORE_ENVIRONMENT` is set to `"Development"`.
   * Set `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES` to `"Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation"`. For example, the following `launchSettings.json` enables runtime compilation for the `ViewCompilationSample` and `IIS Express` launch profiles:

```json
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:7098",
      "sslPort": 44332
    }
  },
  "profiles": {
    "ViewCompilationSample": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7173;http://localhost:5251",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation"
      }
    }
  }
}
```
With this approach, no code changes are needed in `Program.cs`. At runtime, ASP.NET Core searches for an assembly-level HostingStartup attribute in `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation`. The `HostingStartup` attribute specifies the app startup code to execute and that startup code enables runtime compilation.

## Enable runtime compilation for a Razor class library

Consider a scenario in which a Razor Pages project references a Razor class library (RCL) named *MyClassLib*. The RCL contains a `_Layout.cshtml` file consumed by MVC and Razor Pages projects. To enable runtime compilation for the `_Layout.cshtml` file in that RCL, make the following changes in the Razor Pages project:

1. Enable runtime compilation with the instructions at Enable runtime compilation conditionally.
1. Configure `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation.MvcRazorRuntimeCompilationOptions` in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.Configure<MvcRazorRuntimeCompilationOptions>(options =>
{
    var libraryPath = Path.GetFullPath(
        Path.Combine(builder.Environment.ContentRootPath, "..", "MyClassLib"));

    options.FileProviders.Add(new PhysicalFileProvider(libraryPath));
});
```
    The preceding code builds an absolute path to the *MyClassLib* RCL. The PhysicalFileProvider API is used to locate directories and files at that absolute path. Finally, the `PhysicalFileProvider` instance is added to a file providers collection, which allows access to the RCL's `.cshtml` files.

## Additional resources

* RazorCompileOnBuild and RazorCompileOnPublish properties
* Razor Pages architecture and concepts in ASP.NET Core
* Views in ASP.NET Core MVC
* ASP.NET Core Razor SDK
