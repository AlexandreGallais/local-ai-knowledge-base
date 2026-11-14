---
title: "Development-time IIS support in Visual Studio for ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/iis/development-time-iis-support.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Development-time IIS support in Visual Studio for ASP.NET Core

By Sourabh Shirhatti

This article describes Visual Studio support for debugging ASP.NET Core apps running with IIS on Windows Server. This topic walks through enabling this scenario and setting up a project.

## Prerequisites

* Visual Studio for Windows
* **ASP.NET and web development** workload
* **.NET Core cross-platform development** workload
* X.509 security certificate (for HTTPS support)

## Enable IIS

1. In Windows, navigate to **Control Panel** > **Programs** > **Programs and Features** > **Turn Windows features on or off** (left side of the screen).
1. Select the **Internet Information Services** checkbox. Select **OK**.

The IIS installation may require a system restart.

## Configure IIS

IIS must have a website configured with the following:

* **Host name**: Typically, the **Default Web Site** is used with a **Host name** of `localhost`. However, any valid IIS website with a unique host name works.
* **Site Binding**
  * For apps that require HTTPS, create a binding to port 443 with a certificate. Typically, the **IIS Express Development Certificate** is used, but any valid certificate works.
  * For apps that use HTTP, confirm the existence of a binding to port 80 or create a binding to port 80 for a new site.
  * Use a single binding for either HTTP or HTTPS. **Binding to both HTTP and HTTPS ports simultaneously isn't supported.**

## Configure the project

### HTTPS redirection

For a new project that requires HTTPS, select the checkbox to **Configure for HTTPS** in the **Create a new ASP.NET Core Web Application** window. Selecting the checkbox adds HTTPS Redirection and HSTS middleware to the app when it's created.

For an existing project that requires HTTPS, use HTTPS Redirection and HSTS middleware in `Startup.Configure`. For more information, see Enforce HTTPS in ASP.NET Core.

For a project that uses HTTP, HTTPS Redirection and HSTS middleware aren't added to the app. No app configuration is required.

### IIS launch profile

Create a new launch profile to add development-time IIS support:

1. Right-click the project in **Solution Explorer**. Select **Properties**. Open the **Debug** tab.
1. For **Profile**, select the **New** button. Name the profile "IIS" in the popup window. Select **OK** to create the profile.
1. For the **Launch** setting, select **IIS** from the list.
1. Select the checkbox for **Launch browser** and provide the endpoint URL.

   When the app requires HTTPS, use an HTTPS endpoint (`https://`). For HTTP, use an HTTP (`http://`) endpoint.

   Provide the same host name and port as the IIS configuration specified earlier uses, typically `localhost`.

   Provide the name of the app at the end of the URL.

   For example, `https://localhost/WebApplication1` (HTTPS) or `http://localhost/WebApplication1` (HTTP) are valid endpoint URLs.
1. In the **Environment variables** section, select the **Add** button. Provide an environment variable with a **Name** of `ASPNETCORE_ENVIRONMENT` and a **Value** of `Development`.
1. In the **Web Server Settings** area, set the **App URL** to the same value used for the **Launch browser** endpoint URL.
1. For the **Hosting Model** setting in Visual Studio 2019 or later, select **Default** to use the hosting model used by the project. If the project sets the `<AspNetCoreHostingModel>` property in its project file, the value of the property (`InProcess` or `OutOfProcess`) is used. If the property isn't present, the default hosting model of the app is used, which is in-process. If the app requires an explicit hosting model setting different from the app's normal hosting model, set the **Hosting Model** to either `In Process` or `Out Of Process` as needed.
1. Save the profile.

When not using Visual Studio, manually add a launch profile to the launchSettings.json file in the *Properties* folder. The following example configures the profile to use the HTTPS protocol:

```json
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iis": {
      "applicationUrl": "https://localhost/WebApplication1",
      "sslPort": 0
    }
  },
  "profiles": {
    "IIS": {
      "commandName": "IIS",
      "launchBrowser": true,
      "launchUrl": "https://localhost/WebApplication1",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

Confirm that the `applicationUrl` and `launchUrl` endpoints match and use the same protocol as the IIS binding configuration, either HTTP or HTTPS.

## Run the project

Run Visual Studio as an administrator:

* Confirm that the build configuration drop-down list is set to **Debug**.
* Set the Start Debugging button to the **IIS** profile and select the button to start the app.

Visual Studio may prompt a restart if not running as an administrator. If prompted, restart Visual Studio.

If an untrusted development certificate is used, the browser may require you to create an exception for the untrusted certificate.

> **Note:**
> Debugging a Release build configuration with Just My Code and compiler optimizations results in a degraded experience. For example, break points aren't hit.

## Additional resources

* Getting Started with the IIS Manager in IIS
* Enforce HTTPS in ASP.NET Core
