---
title: "Overview of Single Page Apps (SPAs) - ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/client-side/spa/intro.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Overview of Single Page Apps (SPAs) in ASP.NET Core

Visual Studio provides project templates for creating single-page apps (SPAs) based on JavaScript technologies, such as Angular, React, and Vue that have an ASP.NET Core backend. These templates:

* Create a Visual Studio solution with a frontend project and a backend project.
* Use the Visual Studio project type for JavaScript and TypeScript (*.esproj*) for the frontend.
* Use an ASP.NET Core project for the backend.

Projects created by using the Visual Studio templates can be run from the command line on Windows, Linux, and macOS. To run the app, use `dotnet run --launch-profile https` to run the server project. Running the server project automatically starts the frontend JavaScript development server. The `https` launch profile is currently required.

## Visual Studio tutorials

To get started, follow one of the tutorials in the Visual Studio documentation:

* Create an ASP.NET Core app with Angular
* Create an ASP.NET Core app with React
* Create an ASP.NET Core app with Vue

For more information, see JavaScript and TypeScript in Visual Studio

## ASP.NET Core SPA templates

Visual Studio includes templates for building ASP.NET Core apps with a JavaScript or TypeScript frontend. These templates are available in Visual Studio 2022 version 17.8 or later with the **ASP.NET and web development** workload installed.

The Visual Studio templates for building ASP.NET Core apps with a JavaScript or TypeScript frontend offer the following benefits:

* Clean project separation for the frontend and backend.
* Stay up-to-date with the latest frontend framework versions.
* Integrate with the latest frontend framework command-line tooling, such as Vite.
* Templates for both JavaScript and TypeScript (only TypeScript for Angular).
* Rich JavaScript and TypeScript code editing experience.
* Integrate JavaScript build tools with the .NET build.
* npm dependency management UI.
* Compatible with Visual Studio Code debugging and launch configuration.
* Run frontend unit tests in Test Explorer by using JavaScript test frameworks.

## Development-server forwarding

Apps that use `Microsoft.AspNetCore.Builder.SpaProxyingExtensions.UseProxyToSpaDevelopmentServer*` from the `Microsoft.AspNetCore.SpaServices.Extensions` package forward HTTP and WebSocket requests that reach this middleware to a configured SPA development server. The target server isn't restricted to localhost. This middleware is intended only for development, not production.

This method differs from the `Microsoft.AspNetCore.SpaProxy` launch-and-redirect mechanism. `UseProxyToSpaDevelopmentServer` makes the outbound connections from the ASP.NET Core app instead of redirecting the browser to the development server.

> **Warning:**
> Forwarded requests use the ASP.NET Core application's network access, not the connecting client's. User- or process-specific VPN, routing, or firewall policies can allow the application to reach an upstream server that the client can't reach directly. Examples include Windows Filtering Platform rules using `FWPM_CONDITION_ALE_USER_ID` and Linux UID-based routing.
>
> For example, an app running as user A can have VPN access that user B doesn't have. If user B can connect to the app and their requests reach this middleware, the app can forward those requests to the configured upstream using its VPN access. Binding the app to localhost doesn't by itself restrict connections to user A. Upstream authentication and authorization requirements still apply.
