---
title: "Deploy ASP.NET Core apps to Azure App Service (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/azure-apps/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Deploy ASP.NET Core apps to Azure App Service

Azure App Service is a Microsoft cloud computing platform service for hosting web apps, including ASP.NET Core.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see Enterprise web app patterns. A complete production-quality sample web app that implements the patterns is available.

## Useful resources

App Service Documentation is the home for Azure Apps documentation, tutorials, samples, how-to guides, and other resources. Two notable tutorials that pertain to hosting ASP.NET Core apps are:

Create an ASP.NET Core web app in Azure
Use Visual Studio to create and deploy an ASP.NET Core web app to Azure App Service on Windows.

Create an ASP.NET Core app in App Service on Linux
Use the command line to create and deploy an ASP.NET Core web app to Azure App Service on Linux.

Subscribe to the App Service Announcements repository and monitor the issues. The App Service team regularly posts announcements and scenarios arriving in App Service.

The following articles are available in ASP.NET Core documentation:

Publish an ASP.NET Core app to Azure with Visual Studio
Learn how to publish an ASP.NET Core app to Azure App Service using Visual Studio.

Create your first pipeline
Set up a CI build for an ASP.NET Core app, then create a continuous deployment release to Azure App Service.

Azure Web App sandbox
Discover Azure App Service runtime execution limitations enforced by the Azure Apps platform.

Troubleshoot and debug ASP.NET Core projects
Understand and troubleshoot warnings and errors with ASP.NET Core projects.

## Application configuration

### Platform

The platform architecture (x86/x64) of an App Services app is set in the app's settings in the Azure portal for apps that are hosted on an A-series compute (Basic) or higher hosting tier. Confirm that the app's publish settings (for example, in the Visual Studio publish profile (.pubxml)) match the setting in the app's service configuration in the Azure portal.

ASP.NET Core apps can be published framework-dependent because the runtimes for 64-bit (x64) and 32-bit (x86) apps are present on Azure App Service. The .NET Core SDK available on App Service is 32-bit, but you can deploy 64-bit apps built locally using the Kudu console or the publish process in Visual Studio. For more information, see the Publish and deploy the app section.

For more information on .NET Core framework components and distribution methods, such as information on the .NET Core runtime and the .NET Core SDK, see About .NET Core: Composition.

### Packages

Include the following NuGet packages to provide automatic logging features for apps deployed to Azure App Service:

* Microsoft.AspNetCore.AzureAppServices.HostingStartup uses IHostingStartup to provide ASP.NET Core logging integration with Azure App Service. The added logging features are provided by the `Microsoft.AspNetCore.AzureAppServicesIntegration` package.
* Microsoft.AspNetCore.AzureAppServicesIntegration executes `Microsoft.Extensions.Logging.AzureAppServicesLoggerFactoryExtensions.AddAzureWebAppDiagnostics*` to add Azure App Service diagnostics logging providers in the `Microsoft.Extensions.Logging.AzureAppServices` package.
* Microsoft.Extensions.Logging.AzureAppServices provides logger implementations to support Azure App Service diagnostics logs and log streaming features.

The preceding packages must be explicitly referenced in the app's project file.

## Override app configuration using the Azure portal

App settings in the Azure portal permit you to set environment variables for the app. For more information, see the following resources:

* Configure an App Service app (Azure documentation)
* Configuration in ASP.NET Core

## Proxy server and load balancer scenarios

The IIS integration middleware, which configures forwarded headers middleware when hosting out-of-process, and the ASP.NET Core Module are configured to forward the scheme (HTTP/HTTPS) and the remote IP address where the request originated. Additional configuration might be required for apps hosted behind additional proxy servers and load balancers. For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.

## Monitoring and logging

ASP.NET Core apps deployed to App Service automatically receive an App Service extension, **ASP.NET Core Logging Integration**. The extension enables logging integration for ASP.NET Core apps on Azure App Service.

For monitoring, logging, and troubleshooting information, see the following articles:

Monitor apps in Azure App Service
Learn how to review quotas and metrics for apps and App Service plans.

Enable diagnostics logging for apps in Azure App Service
Discover how to enable and access diagnostic logging for HTTP status codes, failed requests, and web server activity.

Handle errors in ASP.NET Core
Understand common approaches to handling errors in ASP.NET Core apps.

Troubleshoot ASP.NET Core on Azure App Service and IIS
Learn how to diagnose issues with Azure App Service deployments with ASP.NET Core apps.

Common error troubleshooting for Azure App Service and IIS with ASP.NET Core
See the common deployment configuration errors for apps hosted by Azure App Service/IIS with troubleshooting advice.

## Data Protection key ring and deployment slots

ASP.NET Core Data Protection keys are persisted to the *%HOME%\ASP.NET\DataProtection-Keys* folder. This folder is backed by network storage and is synchronized across all machines hosting the app. Keys aren't protected at rest. This folder supplies the key ring to all instances of an app in a single deployment slot. Separate deployment slots, such as Staging and Production, don't share a key ring.

When swapping between deployment slots, any system using data protection won't be able to decrypt stored data using the key ring inside the previous slot. ASP.NET cookie middleware uses data protection to protect its cookies. This leads to users being signed out of an app that uses the standard ASP.NET cookie middleware. For a slot-independent key ring solution, use an external key ring provider, such as:

* Azure Blob Storage
* Azure Key Vault
* SQL store
* Redis cache

For more information, see Key <example-value> providers in ASP.NET Core.

## Deploy an ASP.NET Core app that uses a .NET Core preview

To deploy an app that uses a preview release of .NET Core, see the following resources. These approaches are also used when the runtime is available but the SDK hasn't been installed on Azure App Service.

* Specify the .NET Core SDK Version using Azure Pipelines
* Deploy a self-contained preview app
* Use Docker with Web Apps for containers
* Install the preview site extension

See Select the .NET Core version to use for information on selecting the version of the .NET SDK for self-contained deployments.

### Specify the .NET Core SDK Version using Azure Pipelines

Use Azure App Service CI/CD scenarios to set up a continuous integration build with Azure DevOps. After the Azure DevOps build is created, optionally configure the build to use a specific SDK version.

#### Specify the .NET Core SDK version

When using the App Service deployment center to create an Azure DevOps build, the default build pipeline includes steps for `Restore`, `Build`, `Test`, and `Publish`. To specify the SDK version, select the **Add (+)** button in the Agent job list to add a new step. Search for **.NET Core SDK** in the search bar.

Move the step into the first position in the build so that the steps following it use the specified version of the .NET Core SDK. Specify the version of the .NET Core SDK. In this example, the SDK is set to `3.0.100`.

To publish a self-contained deployment (SCD), configure SCD in the `Publish` step and provide the Runtime Identifier (RID).

### Deploy a self-contained preview app

A self-contained deployment (SCD) that targets a preview runtime carries the preview runtime in the deployment.

When deploying a self-contained app:

* The site in Azure App Service doesn't require the preview site extension.
* The app must be published following a different approach than when publishing for a framework-dependent deployment (FDD).

Follow the guidance in the Deploy the app self-contained section.

### Use Docker with Web Apps for containers

The Docker Hub at `https://hub.docker.com/_/microsoft-dotnet` contains the latest preview Docker images. The images can be used as a base image. Use the image and deploy to Web Apps for Containers normally.

### Install the preview site extension

If a problem occurs using the preview site extension, open an dotnet/AspNetCore issue.

1. From the Azure portal, navigate to the App Service.
1. Select the web app.
1. Type "ex" in the search box to filter for "Extensions" or scroll down the list of management tools.
1. Select **Extensions**.
1. Select **Add**.
1. Select the **ASP.NET Core {X.Y} ({x64|x86}) Runtime** extension from the list, where `{X.Y}` is the ASP.NET Core preview version and `{x64|x86}` specifies the platform.
1. Select **OK** to accept the legal terms.
1. Select **OK** to install the extension.

When the operation completes, the latest .NET Core preview is installed. Verify the installation:

1. Select **Advanced Tools**.
1. Select **Go** in **Advanced Tools**.
1. Select the **Debug console** > **PowerShell** menu item.
1. At the PowerShell prompt, execute the following command. Substitute the ASP.NET Core runtime version for `{X.Y}` and the platform for `{PLATFORM}` in the command:

   ```powershell
   Test-Path D:\home\SiteExtensions\AspNetCoreRuntime.{X.Y}.{PLATFORM}\
   ```

   The command returns `True` when the x64 preview runtime is installed.

> **Note:**
> The platform architecture (x86/x64) of an App Services app is set in the app's settings in the Azure portal for apps that are hosted on an A-series compute (Basic) or higher hosting tier. Confirm that the app's publish settings (for example, in the Visual Studio publish profile (.pubxml)) match the setting in the app's service configuration in the Azure portal.
>
> If the app is run in in-process mode and the platform architecture is configured for 64-bit (x64), the ASP.NET Core Module uses the 64-bit preview runtime, if present. Install the **ASP.NET Core {X.Y} (x64) Runtime** extension using the Azure portal.
>
> After installing the x64 preview runtime, run the following command in the Azure Kudu PowerShell command window to verify the installation. Substitute the ASP.NET Core runtime version for `{X.Y}` in the following command:
>
> ```powershell
> Test-Path D:\home\SiteExtensions\AspNetCoreRuntime.{X.Y}.x64\
> ```
>
> The command returns `True` when the x64 preview runtime is installed.

**Use the preview site extension with an ARM template**

If an ARM template is used to create and deploy apps, the `Microsoft.Web/sites/siteextensions` resource type can be used to add the site extension to a web app. In the following example, the .NET 5 (x64) Runtime site extension (`AspNetCoreRuntime.5.0.x64`) is added to the app:

```json
{
    ...
    "parameters": {
        "site_name": {
            "defaultValue": "{SITE NAME}",
            "type": "String"
        },
        ...
    },       
    ...
    "resources": [
        ...
        {
            "type": "Microsoft.Web/sites/siteextensions",
            "apiVersion": "2018-11-01",
            "name": "[concat(parameters('site_name'), '/AspNetCoreRuntime.5.0.x64')]",
            "location": "[resourceGroup().location]",
            "dependsOn": [
                "[resourceId('Microsoft.Web/sites', parameters('site_name'))]"
            ]
        }
    ]
}
    
```

For the placeholder `{SITE NAME}`, use the app's name in Azure App Service (for example, `contoso`).
