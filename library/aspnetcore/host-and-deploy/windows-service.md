---
title: "Host ASP.NET Core in a Windows Service (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/windows-service.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Host ASP.NET Core in a Windows Service

-->
-->

An ASP.NET Core app can be hosted on Windows as a Windows Service without using IIS. When hosted as a Windows Service, the app automatically starts after server reboots.

## Prerequisites

* ASP.NET Core SDK 7.0 or later
* PowerShell 6.2 or later

## Worker Service template

The ASP.NET Core Worker Service template provides a starting point for writing long running service apps. To use the template as a basis for a Windows Service app:

1. Create a Worker Service app from the .NET template.
1. Install the NuGet package Microsoft.Extensions.Hosting.WindowsServices.
1. Follow the guidance in the App configuration section to update the Worker Service app so that it can run as a Windows Service.

# Visual Studio

1. Create a new project.
1. Select **Worker Service**. Select **Next**.
1. Provide a project name in the **Project name** field or accept the default project name. Select **Create**.
1. In the **Create a new Worker service** dialog, select **Create**.

# .NET CLI

Use the Worker Service (`worker`) template with the dotnet new command from a command shell. In the following example, a Worker Service app is created named `ContosoWorker`. A folder for the `ContosoWorker` app is created automatically when the command is executed.

```dotnetcli
dotnet new worker -o ContosoWorker
```

---

## App configuration

Update Program.cs to call AddWindowsService. When the app is running as a Windows Service, `AddWindowsService`:

* Sets the host lifetime to `WindowsServiceLifetime`.
* Sets the content root to AppContext.BaseDirectory. For more information, see the Current directory and content root section.
* Enables logging to the event log:
  * The application name is used as the default source name.
  * The default log level is *Warning* or higher for an app based on an ASP.NET Core template that calls `CreateDefaultBuilder` to build the host.
  * Override the default log level with the `Logging:EventLog:LogLevel:Default` key in `appsettings.json`/`appsettings.{Environment}.json` or other configuration provider.
  * Only administrators can create new event sources. When an event source can't be created using the application name, a warning is logged to the *Application* source and event logs are disabled.

Consider the following `ServiceA` class:

```csharp
namespace SampleApp.Services;

public class ServiceA : BackgroundService
{
    public ServiceA(ILoggerFactory loggerFactory)
    {
        Logger = loggerFactory.CreateLogger<ServiceA>();
    }

    public ILogger Logger { get; }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Logger.LogInformation("ServiceA is starting.");

        stoppingToken.Register(() => Logger.LogInformation("ServiceA is stopping."));

        while (!stoppingToken.IsCancellationRequested)
        {
            Logger.LogInformation("ServiceA is doing background work.");

            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }

        Logger.LogInformation("ServiceA has stopped.");
    }
}
```
The following `Program.cs` calls `AddHostedService` to register `ServiceA`:

```csharp
using SampleApp.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddWindowsService();
builder.Services.AddHostedService<ServiceA>();

var app = builder.Build();

app.MapRazorPages();

app.Run();
```
The following sample apps accompany this article:

* Background Worker Service Sample: A non-web app sample based on the Worker Service template that uses hosted services for background tasks.
* Web App Service Sample: A Razor Pages web app sample that runs as a Windows Service with hosted services for background tasks.

For MVC guidance, see the articles under Overview of ASP.NET Core MVC and Migrate from ASP.NET Core 2.2 to 3.0.

## Deployment type

For information and advice on deployment scenarios, see .NET application deployment.

### SDK

For a web app-based service that uses the Razor Pages or MVC frameworks, specify the Web SDK in the project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
```

If the service only executes background tasks (for example, hosted services), specify the Worker SDK in the project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">
```

### Framework-dependent deployment (FDD)

Framework-dependent deployment (FDD) relies on the presence of a shared system-wide version of .NET on the target system. When the FDD scenario is adopted following the guidance in this article, the SDK produces an executable (*.exe*), called a *framework-dependent executable*.

If using the Web SDK, a *web.config* file, which is normally produced when publishing an ASP.NET Core app, is unnecessary for a Windows Services app. To disable the creation of the *web.config* file, add the `<IsTransformWebConfigDisabled>` property set to `true`.

```xml
<PropertyGroup>
  <TargetFramework>net7.0</TargetFramework>
  <IsTransformWebConfigDisabled>true</IsTransformWebConfigDisabled>
</PropertyGroup>
```

### Self-contained deployment (SCD)

Self-contained deployment (SCD) doesn't rely on the presence of a shared framework on the host system. The runtime and the app's dependencies are deployed with the app.

A Windows Runtime Identifier (RID) is included in the `<PropertyGroup>` that contains the target framework:

```xml
<RuntimeIdentifier>win-x64</RuntimeIdentifier>
```

To publish for multiple RIDs:

* Provide the RIDs in a semicolon-delimited list.
* Use the property name \<RuntimeIdentifiers> (plural).

For more information, see .NET RID Catalog.

## Service user account

To create a user account for a service, use the New-LocalUser cmdlet from an administrative PowerShell 6 command shell.

On Windows 10 October 2018 Update (version 1809/build 10.0.17763) or later:

```powershell
New-LocalUser -Name {SERVICE NAME}
```

On Windows OS earlier than the Windows 10 October 2018 Update (version 1809/build 10.0.17763):

```console
powershell -Command "New-LocalUser -Name {SERVICE NAME}"
```

Provide a strong password when prompted.

Unless the `-AccountExpires` parameter is supplied to the New-LocalUser cmdlet with an expiration `System.DateTime`, the account doesn't expire.

For more information, see Microsoft.PowerShell.LocalAccounts and Service User Accounts.

An alternative approach to managing users when using Active Directory is to use Managed Service Accounts. For more information, see Group Managed Service Accounts Overview.

## Log on as a service rights

To establish *Log on as a service* rights for a service user account:

1. Open the Local Security Policy editor by running *secpol.msc*.
1. Expand the **Local Policies** node and select **User Rights Assignment**.
1. Open the **Log on as a service** policy.
1. Select **Add User or Group**.
1. Provide the object name (user account) using either of the following approaches:
   1. Type the user account (`{DOMAIN OR COMPUTER NAME\USER}`) in the object name field and select **OK** to add the user to the policy.
   1. Select **Advanced**. Select **Find Now**. Select the user account from the list. Select **OK**. Select **OK** again to add the user to the policy.
1. Select **OK** or **Apply** to accept the changes.

## Create and manage the Windows Service

### Create a service

Use PowerShell commands to register a service. From an administrative PowerShell 6 command shell, execute the following commands:

```powershell
$acl = Get-Acl "{EXE PATH}"
$aclRuleArgs = "{DOMAIN OR COMPUTER NAME\USER}", "Read,Write,ReadAndExecute", "ContainerInherit,ObjectInherit", "None", "Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($aclRuleArgs)
$acl.SetAccessRule($accessRule)
$acl | Set-Acl "{EXE PATH}"

New-Service -Name {SERVICE NAME} -BinaryPathName "{EXE FILE PATH} --contentRoot {EXE FOLDER PATH}" -Credential "{DOMAIN OR COMPUTER NAME\USER}" -Description "{DESCRIPTION}" -DisplayName "{DISPLAY NAME}" -StartupType Automatic
```

* `{EXE PATH}`: Path of the app's executable on the host (for example, `d:\myservice`). Don't include the app's executable file name in the path. A trailing slash isn't required.
* `{DOMAIN OR COMPUTER NAME\USER}`: Service user account (for example, `Contoso\ServiceUser`).
* `{SERVICE NAME}`: Service name (for example, `MyService`).
* `{EXE FILE PATH}`: The app's full executable path (for example, `d:\myservice\myservice.exe`). Include the executable's file name with extension.
* `{EXE FOLDER PATH}`: The app's full executable folder path (for example `d:\myservice`).
* `{DESCRIPTION}`: Service description (for example, `My sample service`).
* `{DISPLAY NAME}`: Service display name (for example, `My Service`).

### Start a service

Start a service with the following PowerShell 6 command:

```powershell
Start-Service -Name {SERVICE NAME}
```

The command takes a few seconds to start the service.

### Determine a service's status

To check the status of a service, use the following PowerShell 6 command:

```powershell
Get-Service -Name {SERVICE NAME}
```

The status is reported as one of the following values:

* `Starting`
* `Running`
* `Stopping`
* `Stopped`

### Stop a service

Stop a service with the following PowerShell 6 command:

```powershell
Stop-Service -Name {SERVICE NAME}
```

### Remove a service

After a short delay to stop a service, remove a service with the following PowerShell 6 command:

```powershell
Remove-Service -Name {SERVICE NAME}
```

## Proxy server and load balancer scenarios

Services that interact with requests from the Internet or a corporate network and are behind a proxy or load balancer might require additional configuration. For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.

## Configure endpoints

By default, ASP.NET Core binds to `http://localhost:5000`. Configure the URL and port by setting the `ASPNETCORE_URLS` environment variable.

For additional URL and port configuration approaches, see the relevant server article:

* Configure endpoints for Kestrel web server
* HTTP.sys web server implementation in ASP.NET Core

The preceding guidance covers support for HTTPS endpoints. For example, configure the app for HTTPS when authentication is used with a Windows Service.

> **Note:**
> Use of the ASP.NET Core HTTPS development certificate to secure a service endpoint isn't supported.

## Current directory and content root

The current working directory returned by calling `System.IO.Directory.GetCurrentDirectory*` for a Windows Service is the *C:\\WINDOWS\\system32* folder. The *system32* folder isn't a suitable location to store a service's files (for example, settings files). Use one of the following approaches to maintain and access a service's assets and settings files.

### Use ContentRootPath or ContentRootFileProvider

Use IHostEnvironment.ContentRootPath or `Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootFileProvider` to locate an app's resources.

When the app runs as a service, `Microsoft.Extensions.Hosting.WindowsServiceLifetimeHostBuilderExtensions.UseWindowsService*` sets the `Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath` to AppContext.BaseDirectory.

The app's default settings files, `appsettings.json` and `appsettings.{Environment}.json`, are loaded from the app's content root by calling CreateDefaultBuilder during host construction.

For other settings files loaded by developer code in `Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration*`, there's no need to call `Microsoft.Extensions.Configuration.FileConfigurationExtensions.SetBasePath*`. In the following example, the `custom_settings.json` file exists in the app's content root and is loaded without explicitly setting a base path:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseWindowsService()
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config.AddJsonFile("custom_settings.json");
            })
            .ConfigureServices((hostContext, services) =>
            {
                services.AddHostedService<Worker>();
            });
}
```
Don't attempt to use `System.IO.Directory.GetCurrentDirectory*` to obtain a resource path because a Windows Service app returns the *C:\\WINDOWS\\system32* folder as its current directory.

### Store a service's files in a suitable location on disk

Specify an absolute path with `Microsoft.Extensions.Configuration.FileConfigurationExtensions.SetBasePath*` when using an `Microsoft.Extensions.Configuration.IConfigurationBuilder` to the folder containing the files.
