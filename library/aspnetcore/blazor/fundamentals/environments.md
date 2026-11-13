---
title: "ASP.NET Core Blazor environments"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/environments.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor environments

-->
-->

This article explains how to configure and read the environment in a Blazor app.

When running an app locally, the environment defaults to `Development`. When the app is published, the environment defaults to `Production`.

We recommend the following conventions:

* Always use the "`Development`" environment name for local development. This is because the ASP.NET Core framework expects exactly that name when configuring the app and tooling for local development runs of an app.

* For testing, staging, and production environments, always publish and deploy the app. You can use any environment naming scheme that you wish for published apps, but always use app setting file names with casing of the environment segment that exactly matches the environment name. For staging, use "`Staging`" (capital ":::no-loc text="S":::") as the environment name, and name the app settings file to match (`appsettings.Staging.json`). For production, use "`Production`" (capital ":::no-loc text="P":::") as the environment name, and name the app settings file to match (`appsettings.Production.json`).

## Set the environment

The environment is set using any of the following approaches:

* Blazor Web App or Blazor Server: Use any of the approaches described in ASP.NET Core runtime environments for general ASP.NET Core apps.
* Any Blazor app: Blazor start configuration
* Standalone Blazor WebAssembly: `<WasmApplicationEnvironmentName>` property

On the client for a Blazor Web App, the environment is determined from the server via an HTML comment that developers don't interact with:

```html
<!--Blazor-WebAssembly:{"environmentName":"Development", ...}-->
```

For a standalone Blazor WebAssembly app, set the environment with the `<WasmApplicationEnvironmentName>` MSBuild property in the app's project file (`.csproj`). The following example sets the `Staging` environment:

```xml
<WasmApplicationEnvironmentName>Staging</WasmApplicationEnvironmentName>
```

The default environments are `Development` for build and `Production` for publish.

There are several approaches for setting the environment in a standalone Blazor WebAssembly app during build/publish operations and one approach for an app starting or running on the client:

* Set the property value when `dotnet build` or `dotnet publish` is executed. The following example sets the environment to `Staging` when an app is published:

  ```dotnetcli
  dotnet publish -p:WasmApplicationEnvironmentName=Staging
  ```

* Set the property during build or publish based on the app's configuration in Visual Studio. The following property groups can be used in the app's project file or any publish configuration file (`.pubxml`). Add additional property groups for other build configurations in use.

  ```xml
  <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <WasmApplicationEnvironmentName>Development</WasmApplicationEnvironmentName>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)' == 'Release'">
    <WasmApplicationEnvironmentName>Production</WasmApplicationEnvironmentName>
  </PropertyGroup>
  ```

* The environment can be set based on the use of a publish profile. In the following example, the first condition sets the environment to `Development` when no publish profile is used (applies to both build and publish operations without a profile), while the second condition covers setting the environment to `Production` when any publish profile is used:

  ```xml
  <PropertyGroup Condition="'$(PublishProfile)' == ''">
    <WasmApplicationEnvironmentName>Development</WasmApplicationEnvironmentName>
  </PropertyGroup>

  <PropertyGroup Condition="'$(PublishProfile)' != ''">
    <WasmApplicationEnvironmentName>Production</WasmApplicationEnvironmentName>
  </PropertyGroup>
  ```

* Create a custom server-side web API endpoint. The standalone Blazor WebAssembly app requests its environment from the web API either at app startup or on-demand while it's running. The value should be passed to `WebAssemblyStartOptions` or with `withApplicationEnvironment`.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

For app's running locally in development, the app defaults to the `Development` environment. Publishing the app defaults the environment to `Production`.

For general guidance on ASP.NET Core environments, see ASP.NET Core runtime environments. For server-side app configuration to serve static files in environments other than the `Microsoft.Extensions.Hosting.Environments.Development` environment during local development and testing (for example, `Microsoft.Extensions.Hosting.Environments.Staging`), see Serve static files in ASP.NET Core apps.

## Set the client-side environment via Blazor startup configuration

The following example starts Blazor in the `Staging` environment if the hostname includes `localhost`. Otherwise, the environment is set to its default value.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  if (window.location.hostname.includes("localhost")) {
    Blazor.start({
      webAssembly: {
        environment: "Staging"
      }
    });
  } else {
    Blazor.start();
  }
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

> **Note:**
> For Blazor Web Apps that set the `webAssembly` > `environment` property in `Blazor.start` configuration, it's wise to match the server-side environment to the environment set on the `environment` property. Otherwise, prerendering on the server operates under a different environment than rendering on the client, which results in arbitrary effects. For general guidance on setting the environment for a Blazor Web App, see ASP.NET Core runtime environments.

To log the environment to the console in either a standalone Blazor WebAssembly app (all release versions) or the `.Client` project of a Blazor Web App (.NET 8 or later), place the following C# code in the `Program` file after the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHost` is created with `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault*` and before the line that builds and runs the project (`await builder.Build().RunAsync();`):

```csharp
Console.WriteLine(
    $"Client Hosting Environment: {builder.HostEnvironment.Environment}");
```

For more information on Blazor startup, see ASP.NET Core Blazor startup.

## `EnvironmentView` component

Use the `EnvironmentView` component for conditional rendering based on the hosting environment. This component provides a consistent way to render content based on the current environment across both server-side and client-side hosting models.

The `EnvironmentView` component accepts `Include` and `Exclude` parameters for specifying environment names. The component performs case-insensitive matching.

```razor
@using Microsoft.AspNetCore.Components.Web

<EnvironmentView Include="Development">
    <div class="alert alert-warning">
        Debug mode enabled
    </div>
</EnvironmentView>

<EnvironmentView Include="Development,Staging">
    <p>Pre-production environment</p>
</EnvironmentView>

<EnvironmentView Exclude="Production">
    <p>@DateTime.Now</p>
</EnvironmentView>
```

## Read the environment in a Blazor WebAssembly app

Obtain the app's environment in a component by injecting `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment` and reading the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.Environment` property.

`ReadEnvironment.razor`:

```razor
@page "/read-environment"
@using Microsoft.AspNetCore.Components.WebAssembly.Hosting
@inject IWebAssemblyHostEnvironment Env

<h1>Environment example</h1>

<p>Environment: @Env.Environment</p>
```

## Read the environment client-side in a Blazor Web App

Assuming that prerendering isn't disabled for a component or the app, a component in the `.Client` project is prerendered on the server. Because the server doesn't have a registered `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment` service, it isn't possible to inject the service and use the service implementation's host environment extension methods and properties during server prerendering. Injecting the service into an Interactive WebAssembly or Interactive Auto component results in the following runtime error:

> :::no-loc text="There is no registered service of type 'Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment'.":::

To address this, create a custom service implementation for `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment` on the server. For more information and an example implementation, see the Create a service abstraction section of the *Prerendering* article, which appears later in the Blazor documentation.

## Read the client-side environment during startup

During startup, the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder` exposes the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment` through the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.HostEnvironment` property, which enables environment-specific logic in host builder code.

In the `Program` file:

```csharp
if (builder.HostEnvironment.Environment == "Custom")
{
    ...
};
```

The following convenience extension methods provided through `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions` permit checking the current environment for `Development`, `Production`, `Staging`, and custom environment names:

* `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsDevelopment*`
* `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsProduction*`
* `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsStaging*`
* `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostEnvironmentExtensions.IsEnvironment*`

In the `Program` file:

```csharp
if (builder.HostEnvironment.IsStaging())
{
    ...
};

if (builder.HostEnvironment.IsEnvironment("Custom"))
{
    ...
};
```

The `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress` property can be used during startup when the `Microsoft.AspNetCore.Components.NavigationManager` service isn't available.

## Related content

* ASP.NET Core Blazor startup
* ASP.NET Core runtime environments
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
