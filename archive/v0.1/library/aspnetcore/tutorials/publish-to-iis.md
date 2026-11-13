---
title: "Publish an ASP.NET Core app to IIS"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/publish-to-iis.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Publish an ASP.NET Core app to IIS

Internet Information Services (IIS) is a flexible, general-purpose web server that runs on Windows and can host ASP.NET Core apps. IIS is a good choice when you need to run ASP.NET Core apps on Windows Server in an on-premises or hybrid environment, need Windows Authentication, or require integration with other IIS features such as URL Rewrite, Application Request Routing, or centralized certificate management.

This tutorial covers the following subjects:

> * Install the .NET Hosting Bundle on Windows Server.
> * Create an IIS site in IIS Manager.
> * Deploy an ASP.NET Core app.

## Prerequisites

* .NET SDK installed on the development machine.
* Windows Server configured with the **Web Server (IIS)** server role. If your server isn't configured to host websites with IIS, follow the guidance in the *IIS configuration* section of the Host ASP.NET Core on Windows with IIS article and then return to this tutorial.

> **Warning:**
> **IIS configuration and website security involve concepts that aren't covered by this tutorial.** Consult the IIS guidance in the Microsoft IIS documentation and the ASP.NET Core article on hosting with IIS before hosting production apps on IIS.
>
> Important scenarios for IIS hosting not covered by this tutorial include:
>
> * Creation of a registry hive for ASP.NET Core Data Protection
> * Configuration of the app pool's Access Control List (ACL)
> * To focus on IIS deployment concepts, this tutorial deploys an app without HTTPS security configured in IIS. For more information on hosting an app enabled for HTTPS protocol, see the security topics in the Related content section of this article. Further guidance for hosting ASP.NET Core apps is provided in the Host ASP.NET Core on Windows with IIS article.

## Install the .NET Hosting Bundle

Install the *.NET Hosting Bundle* on the IIS server. The bundle installs the .NET Runtime, .NET Library, and the ASP.NET Core Module. The module allows ASP.NET Core apps to run behind IIS.

ASP.NET Core apps hosted in IIS use the *in-process hosting model* by default (since ASP.NET Core 3.0). In-process hosting runs the app in the same process as the IIS worker process (`w3wp.exe`), which provides better performance than out-of-process hosting. For more information, see Host ASP.NET Core on Windows with IIS.

Download the installer using the following link:

Current .NET Hosting Bundle installer (direct download)

1. Run the installer on the IIS server.

1. Restart the server or execute `net stop was /y` followed by `net start w3svc` in a command shell.

## Create the IIS site

1. On the IIS server, create a folder to contain the app's published folders and files. In a following step, the folder's path is provided to IIS as the physical path to the app. For more information on an app's deployment folder and file layout, see ASP.NET Core directory structure.

1. In IIS Manager, open the server's node in the **Connections** panel. Right-click the **Sites** folder. Select **Add Website** from the contextual menu.

1. Provide a **Site name** and set the **Physical path** to the app's deployment folder that you created. Provide the **Binding** configuration and create the website by selecting **OK**.

   > **Warning:**
   > Top-level wildcard bindings (`http://*:80/` and `http://+:80`) should **not** be used. Top-level wildcard bindings can open up your app to security vulnerabilities. This applies to both strong and weak wildcards. Use explicit host names rather than wildcards. Subdomain wildcard binding (for example, `*.mysub.com`) doesn't have this security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). See RFC 9110: HTTP Semantics (Section 7.2. Host and :authority) for more information.

1. Confirm the process model identity has the proper permissions.

   If the default identity of the app pool (**Process Model** > **Identity**) is changed from `ApplicationPoolIdentity` to another identity, verify that the new identity has the required permissions to access the app's folder, database, and other required resources. For example, the app pool requires read and write access to folders where the app reads and writes files.

## Create an ASP.NET Core app

Create any type of ASP.NET Core server-based app.

> **Note:**
> This tutorial is based on hosting a server-side ASP.NET Core app with IIS, including a Blazor Web App. For guidance on hosting and deploying a *standalone Blazor WebAssembly app* with IIS, see Host and deploy ASP.NET Core Blazor WebAssembly with IIS.

## Publish and deploy the app

*Publish an app* means to produce a compiled app that can be hosted by a server. *Deploy an app* means to move the published app to a hosting system. The publish step is handled by the .NET SDK, while the deployment step can be handled by a variety of approaches. This tutorial adopts the *folder* deployment approach, where:

* The app is published to a folder.
* The folder's contents are moved to the IIS site's folder (the **Physical path** to the site in IIS Manager).

ASP.NET Core apps can be published as *framework-dependent* (the server must have .NET installed) or *self-contained* (includes the .NET runtime in the published output). For most IIS deployments, the framework-dependent approach is recommended because the .NET Hosting Bundle provides the required runtime on the server. For more information, see .NET application deployment.

A `web.config` file is generated automatically when the app is published. IIS uses this file to configure the ASP.NET Core Module for the app. Don't remove or manually edit the `web.config` file unless you're making advanced configuration changes.

# Visual Studio

1. Right-click on the project in **Solution Explorer** and select **Publish**.
1. In the **Publish** dialog, select **Folder** as the publish target and select **Next**.
1. Set the **Folder location** path.
   * If you created a folder for the IIS site that's available on the development machine as a network share, provide the path to the share. The current user must have write access to publish to the share.
   * If you're unable to deploy directly to the IIS site folder on the IIS server, publish to a folder on removable media and physically move the published app to the IIS site folder on the server, which is the site's **Physical path** in IIS Manager. Move the contents of the `bin/Release/{TARGET FRAMEWORK}/publish` folder (where `{TARGET FRAMEWORK}` is the target framework moniker, for example `net10.0`) to the IIS site folder on the server, which is the site's **Physical path** in IIS Manager.
1. Select **Finish** and then select **Publish**.

# .NET CLI

1. In a command shell, publish the app in Release configuration with the dotnet publish command:

   ```dotnetcli
   dotnet publish --configuration Release
   ```

1. Move the contents of the `bin/Release/{TARGET FRAMEWORK}/publish` folder (where `{TARGET FRAMEWORK}` is the target framework moniker, for example `net10.0`) to the IIS site folder on the server, which is the site's **Physical path** in IIS Manager.

---

## Browse the website

The app is accessible in a browser after it receives the first request. Make a request to the app at the endpoint binding that you established in IIS Manager for the site.

## Next steps

In this tutorial, you learned how to:

> * Install the .NET Hosting Bundle on Windows Server.
> * Create an IIS site in IIS Manager.
> * Deploy an ASP.NET Core app.

To learn more about hosting ASP.NET Core apps on IIS, see the IIS Overview article:

> Host ASP.NET Core on Windows with IIS

## Related content

### Articles in the ASP.NET Core documentation set

* ASP.NET Core Module (ANCM) for IIS
* ASP.NET Core directory structure
* Troubleshoot ASP.NET Core on Azure App Service and IIS
* Enforce HTTPS in ASP.NET Core
* WebSockets on IIS

### Articles pertaining to ASP.NET Core app deployment

* Publish an ASP.NET Core app to Azure with Visual Studio
* Publish an ASP.NET Core app to Azure with Visual Studio Code
* Visual Studio publish profiles (.pubxml) for ASP.NET Core app deployment

### Articles on IIS HTTPS configuration

* Configuring SSL in IIS Manager
* How to Set Up SSL on IIS

### Articles on IIS and Windows Server

* The Official Microsoft IIS Site
* Windows Server technical content library

### Deployment resources for IIS administrators

* IIS documentation
* Getting Started with the IIS Manager in IIS
* .NET application deployment
* IIS modules with ASP.NET Core
* Common error troubleshooting for Azure App Service and IIS with ASP.NET Core
* Sticky sessions with Application Request Routing
