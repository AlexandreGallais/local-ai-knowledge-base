---
title: "Use React with ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/client-side/spa/react.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use React with ASP.NET Core

Visual Studio provides project templates for creating single-page apps (SPAs) based on JavaScript technologies, such as Angular, React, and Vue that have an ASP.NET Core backend. These templates:

* Create a Visual Studio solution with a frontend project and a backend project.
* Use the Visual Studio project type for JavaScript and TypeScript (*.esproj*) for the frontend.
* Use an ASP.NET Core project for the backend.

Projects created by using the Visual Studio templates can be run from the command line on Windows, Linux, and macOS. To run the app, use `dotnet run --launch-profile https` to run the server project. Running the server project automatically starts the frontend JavaScript development server. The `https` launch profile is currently required.

## Visual Studio tutorial

To get started, follow the Create an ASP.NET Core app with React tutorial in the Visual Studio documentation.

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

## Related content

Use Identity to secure a Web API backend for SPAs
