---
title: "ASP.NET Core runtime environments (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/environments.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core runtime environments

-->
-->

ASP.NET Core configures app behavior based on the runtime *environment*, which usually reflects where the app is running.

Apps usually run in the *Development* environment during local development and testing on a developer's machine with one set of configured behaviors. In contrast, they run in the *Production* environment when deployed to a server with a different set of configured behaviors. Any number of additional environments can be used, such as the *Staging* environment provided by the framework for staging an app prior to live deployment or other environments that developers create.

This article describes app runtime environments, how to use the environment to control app behavior, and how to set the environment.

For Blazor environments guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor environments.

## Environments

Although the environment can be any string value, the following environment values are provided by the framework:

* `Microsoft.Extensions.Hosting.Environments.Development`
* `Microsoft.Extensions.Hosting.Environments.Staging`
* `Microsoft.Extensions.Hosting.Environments.Production`

The `Production` environment is configured to maximize security, performance, and app reliability. Common developer settings and configuration that differ from the `Development` environment include:

* Enabling caching.
* Bundling and minifying client-side resources, along with potentially serving them from a CDN.
* Disabling diagnostic error pages and enabling friendly error pages.
* Enabling production logging and monitoring. For example, logging is enabled for Azure Application Insights.

The last environment setting read by the app determines the app's environment. The app's environment can't be changed while the app is running.

## Logging

Output in the command shell of a running app at startup indicates the app's environment. In the following example, the app is running in the `Staging` environment:

```dotnetcli
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Staging
```

## Environment variables that determine the runtime environment

To determine the runtime environment, ASP.NET Core reads from the following environment variables:

* `DOTNET_ENVIRONMENT`
* `ASPNETCORE_ENVIRONMENT`

| App type | Recommended variable | Behavior and precedence |
| --- | --- | --- |
| ASP.NET Core web apps | `ASPNETCORE_ENVIRONMENT` | `DOTNET_ENVIRONMENT`, if present, is read during initial bootstrap and takes precedence over `ASPNETCORE_ENVIRONMENT`. Generally, set `ASPNETCORE_ENVIRONMENT` and don't set `DOTNET_ENVIRONMENT` for web apps that call `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*`. When using `Microsoft.AspNetCore.WebHost` (obsolete as of .NET 10), `ASPNETCORE_ENVIRONMENT` takes precedence. |
| Worker services and console apps (non-web apps) | `DOTNET_ENVIRONMENT` | `ASPNETCORE_ENVIRONMENT` is ignored because web-specific host builders aren't initialized. |

For containerized apps and CI/CD pipelines, which environment variable to set depends on the app's host builder. Deployment doesn't change variable support or precedence for web apps. You can set both environment variables to the same value in your pipeline or container configuration to ensure stable environment behavior.

If the `DOTNET_ENVIRONMENT` and `ASPNETCORE_ENVIRONMENT` environment variables aren't set, the `Production` environment is the default environment.

On Windows and macOS, environment variable names aren't case-sensitive. Linux environment variables are case-sensitive.

## Control code execution by environment

Use `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Environment` or `Microsoft.AspNetCore.Builder.WebApplication.Environment` to conditionally add services or middleware depending on the current environment.

The following code in the app's `Program` file:

* Uses `Microsoft.AspNetCore.Builder.WebApplication.Environment` to distinguish the environment.
* Calls `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`, which adds exception handler middleware to the request processing pipeline to handle exceptions.
* Calls `Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts*`, which adds HSTS middleware to apply the `Strict-Transport-Security` header.

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
```

The preceding example checks the current environment for the request processing pipeline. To check the current environment while configuring services, use `builder.Environment` instead of `app.Environment`.

Within the app, the `Microsoft.Extensions.Hosting.IHostEnvironment` provides general information about the app's hosting environment, and the `Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName` property indicates the app's current environment.

## Control rendered content

Inject `Microsoft.Extensions.Hosting.IHostEnvironment` into a server-rendered Razor component and use the service's extension methods and `Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName` property to determine the environment for rendering content:

```razor
@inject IHostEnvironment Env

@if (Env.IsDevelopment())
{
    <div>The environment is Development.</div>
}

@if (!Env.IsDevelopment())
{
    <div>The environment isn't Development.</div>
}

@if (Env.IsStaging() || Env.EnvironmentName == "Testing")
{
    <div>The environment is either Staging or Testing.</div>
}
```

For Blazor Web Apps that require the environment to control client-side rendering, see Prerender ASP.NET Core Razor components.

## Set the environment in a command shell when the app is run (`dotnet run`)

Use the `-e|--environment` option to set the environment. In the following example, the `ASPNETCORE_ENVIRONMENT` environment variable is set to `Staging`:

```dotnetcli
dotnet run -e ASPNETCORE_ENVIRONMENT=Staging
```

The `-e|--environment` option requires .NET SDK 9.0.200 or later.

## Set the environment with the launch settings file (`launchSettings.json`)

The environment for local development can be set in the `Properties\launchSettings.json` file of the project. Environment values set in `launchSettings.json` override values set by the system environment.

The `launchSettings.json` file:

* Is only used on the local development machine.
* Isn't deployed when the app is published.
* May contain multiple profiles, each configuring a different environment.

The following example sets the `Staging` environment for the `https` launch profile using the `ASPNETCORE_ENVIRONMENT` environment variable:

```json
"https": {
  "commandName": "Project",
  "dotnetRunMessages": true,
  "launchBrowser": true,
  "applicationUrl": "https://localhost:7205",
  "environmentVariables": {
    "ASPNETCORE_ENVIRONMENT": "Staging"
  }
}
```

In Visual Studio, there are two approaches for setting the environment via launch profiles:

* Press `Alt`+`Enter` or select **Properties** after right-clicking the project in **Solution Explorer**. Select **Debug** > **General**, followed by selecting the **Open debug launch profiles UI** link.

* With the project selected in **Solution Explorer**, select **{PROJECT NAME} Debug Properties** from the **Debug** menu, where the `{PROJECT NAME}` placeholder is a project name.

The preceding approaches open the **Launch Profiles** dialog where you can edit the environment variable settings in the `launchSettings.json` file. Changes made to project profiles may not take effect until the web server is restarted. Kestrel must be restarted before it can detect changes made to its environment.

Profiles can be selected in the Visual Studio UI next to the Start button (►).

When a solution contains multiple projects, only set the environment for the startup project.

Alternatively, use the `dotnet watch` or `dotnet run` command with the `-lp|--launch-profile` option set to the profile's name. *This approach only supports launch profiles based on the `Project` command.*

```dotnetcli
dotnet run -lp "https"
```

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

When using Visual Studio Code with the C# Dev Kit for Visual Studio Code (Getting Started with C# in VS Code), launch profiles are picked up from the app's `launchSettings.json` file.

If the C# Dev Kit isn't used, set the `ASPNETCORE_ENVIRONMENT` environment variable in the `.vscode/launch.json` in the `env` section, along with any other environment variables set in the section:

```json
"env": {
    "ASPNETCORE_ENVIRONMENT": "Staging",
    ...
},
```

The `.vscode/launch.json` file is only used by Visual Studio Code.

## Set the environment with an environment variable

It's often useful to set a specific environment for testing with an environment variable or platform setting. If the environment isn't set, it defaults to the `Production` environment, which disables most debugging features. The method for setting the environment depends on the operating system.

### Azure App Service

Apps deployed to Azure App Service adopt the `Production` environment by default.

To set the `ASPNETCORE_ENVIRONMENT` environment variable, see the following resources in the Azure documentation:

* Configure an App Service app
* Set up staging environments in Azure App Service

Azure App Service automatically restarts the app after an app setting is added, changed, or deleted.

### Set environment variable for a process

To set the `ASPNETCORE_ENVIRONMENT` environment variable for the current session (command shell) when the app is started using `dotnet run`, use the following commands. After the environment variable is set, the app is started without a launch profile using the `--no-launch-profile` option.

1. In the command shell, set the environment variable using the appropriate approach for your operating system.

1. Execute the `dotnet run` command without using a launch profile:

   ```dotnetcli
   dotnet run --no-launch-profile
   ```

When using PowerShell, the preceding steps can be combined in the following two commands. The following example sets the `Staging` environment:

```powershell
$Env:ASPNETCORE_ENVIRONMENT = "Staging"
dotnet run --no-launch-profile
```

### Set environment variable globally

Use the appropriate guidance for your operating system to set the `ASPNETCORE_ENVIRONMENT` environment variable.

When the `ASPNETCORE_ENVIRONMENT` environment variable is set globally, it takes effect for the `dotnet run` command in any command shell opened after the value is set. Environment values set by launch profiles in the `launchSettings.json` file override values set for the system environment.

### Set the environment for apps deployed to IIS

To set the `ASPNETCORE_ENVIRONMENT` environment variable with the `web.config` file, see web.config file.

To set the environment variable on deployment to IIS, include the `<EnvironmentName>` property in the publish profile (.pubxml) or project file. The following example sets the environment in `web.config` to the `Staging` environment when the project is published:

```xml
<PropertyGroup>
  <EnvironmentName>Staging</EnvironmentName>
</PropertyGroup>
```

To set the `ASPNETCORE_ENVIRONMENT` environment variable for an app running in an isolated Application Pool (supported on IIS 10.0 or later), see Environment Variables <environmentVariables>. When the `ASPNETCORE_ENVIRONMENT` environment variable is set for an Application Pool, its value overrides a setting at the system level.

When hosting an app in IIS and adding or changing the `ASPNETCORE_ENVIRONMENT` environment variable, use ***either*** of the following approaches to have the new value take effect for running apps:

* Execute `net stop was /y` followed by `net start w3svc` in a command shell.
* Restart the server.

### Docker

Set the app's environment using any of the approaches in this section.

#### Use a Dockerfile

Set the `ASPNETCORE_ENVIRONMENT` environment variable within the Dockerfile using the `ENV` instruction:

```
ENV ASPNETCORE_ENVIRONMENT=Staging
```

#### Use Docker Compose

For multi-service apps managed with Docker Compose, define `ASPNETCORE_ENVIRONMENT` environment variables within the `docker-compose.yml` file:

```
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
    environment:
      - ASPNETCORE_ENVIRONMENT=Staging
      - API_KEY=...
```

An environment set at runtime with Docker Compose overrides an environment set by the Dockerfile.

#### Use the `docker run` command

When running the Docker container with the `docker run` command, Set the `ASPNETCORE_ENVIRONMENT` environment variable with the `-e|--env` option:

```console
docker run -e ASPNETCORE_ENVIRONMENT=Staging aspnet_core_image
```

An environment set at runtime with `docker run` overrides an environment set by the Dockerfile.

#### Docker environment file

Set the `ASPNETCORE_ENVIRONMENT` environment variable using a Docker environment file (`.env`).

`env_variables.env`:

```
ASPNETCORE_ENVIRONMENT=Staging
```

Load the file with the `--env-file` option when executing the `docker run` command:

```shell
docker run --env-file ./env_variables.env aspnet_core_image
```

An environment set at runtime with `docker run` overrides an environment set by the Dockerfile.

## Set the environment in the app's startup code

To set the environment in code, use `Microsoft.AspNetCore.Builder.WebApplicationOptions.EnvironmentName` when creating `Microsoft.AspNetCore.Builder.WebApplicationBuilder`, as shown in the following example:

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    EnvironmentName = Environments.Staging
}); 
```

## Load configuration by environment

To load configuration by environment, see Configuration in ASP.NET Core.
