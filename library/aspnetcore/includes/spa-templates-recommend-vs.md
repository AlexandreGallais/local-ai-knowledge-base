---
title: "spa-templates-recommend-vs"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/spa-templates-recommend-vs.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# spa-templates-recommend-vs

Visual Studio provides project templates for creating single-page apps (SPAs) based on JavaScript technologies, such as Angular, React, and Vue that have an ASP.NET Core backend. These templates:

* Create a Visual Studio solution with a frontend project and a backend project.
* Use the Visual Studio project type for JavaScript and TypeScript (*.esproj*) for the frontend.
* Use an ASP.NET Core project for the backend.

Projects created by using the Visual Studio templates can be run from the command line on Windows, Linux, and macOS. To run the app, use `dotnet run --launch-profile https` to run the server project. Running the server project automatically starts the frontend JavaScript development server. The `https` launch profile is currently required.
