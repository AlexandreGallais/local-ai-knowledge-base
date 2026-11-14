---
title: ".NET Upgrade Assistant Overview"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/porting/upgrade-assistant-overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What is .NET Upgrade Assistant?

.NET Upgrade Assistant helps upgrade projects to newer versions of .NET and analyzes your code to spot and fix potential incompatibilities. One focus of the tool is to help upgrade a project from .NET Framework, .NET Core, or .NET, to the latest version of .NET. You use .NET Upgrade Assistant to upgrade entire .NET projects, or some aspect of the project, such as upgrading a configuration file from an older type to a newer type.

.NET Upgrade Assistant is built into Visual Studio and can be installed as a command-line interface (CLI) tool.

> **Important:**
> .NET Upgrade Assistant is officially deprecated. Use the GitHub Copilot modernization chat agent instead, which is included with Visual Studio 2026 and Visual Studio 2022 17.14.16 or later. This agent analyzes your projects and dependencies, produces a step-by-step migration plan with targeted recommendations and automated code fixes, and commits each change so you can validate or roll back. It automates common porting tasks—updating project files, replacing deprecated APIs, and resolving build issues—so you can modernize faster with less manual effort.

## Analyze and upgrade

.NET Upgrade Assistant includes an analysis engine that scans your projects and their dependencies. After the scan is complete, a report is generated with detailed information about performing an upgrade. You can use this information to upgrade either the entire project or specific parts of the project.

## Supported project types

.NET Upgrade Assistant supports upgrading projects coded in either C# or Visual Basic. The following types of projects are supported:

- ASP.NET
- Azure Functions
- Windows Presentation Foundation
- Windows Forms
- Class libraries
- Console apps
- Xamarin Forms
- .NET MAUI
- .NET Native UWP

Some products provide guidance on how to use .NET Upgrade Assistant.

- ASP.NET
- Windows Presentation Foundation
- Windows Forms
- Universal Windows Platform

## Upgrade paths

The following upgrade paths are supported:

- .NET Framework to .NET
- .NET Core to .NET
- Azure Functions v1-v3 to v4 isolated (targeting net6.0+)
- UWP to WinUI 3
- Previous .NET version to the latest .NET version
- Xamarin Forms to .NET MAUI
  - XAML file transformations only support upgrading namespaces. For more comprehensive transformations, use Visual Studio 2022 or later.

## Upgrade details and options

When an upgrade is started, a wizard walks you through configuring some of the options before the upgrade is initiated. Based on the type of project you're upgrading, the wizard presents different options. For an example of upgrading a project, see Upgrade projects with .NET Upgrade Assistant.

### How the upgrade should be performed

Based on the type of project you're upgrading, you might be able to change how the upgrade is performed. The type of project affects which options are available, and one or more of the following items might be missing:

- In-place project upgrade

  This option upgrades your project without making a copy.

- Side-by-side project upgrade

  Copies your project and upgrades the copy, leaving your original project alone.

- Side-by-side incremental

  This is a good choice for complicated web apps. Upgrading from ASP.NET to ASP.NET Core requires quite a bit of work and at times manual refactoring. This mode puts a .NET project next to the existing .NET Framework project. Endpoints are routed through the .NET project, while all other calls are sent to .NET Framework application.

  This mode lets you slowly upgrade your ASP.NET or library app piece-by-piece.

### Upgrade results

Once the upgrade is finished, a status screen is displayed which shows all of the artifacts associated with the upgrade. Each upgrade artifact can be expanded to read more information about the status. The following list describes the status icons:

- **Unfilled green checkmark**: The tool didn't find anything about the artifact to upgrade.
- **Filled green checkmark**: The artifact was upgraded and completed successfully.
- **Yellow warning sign**: The artifact was upgraded, but there's important information you should consider.
- **Red _X_**: The artifact upgrade was unsuccessful.

Additionally, the actions the performed during the upgrade are logged to the **Output** window under the **Upgrade Assistant** source, as shown in the following image:

After upgrading your project, test it thoroughly!

## Related content

- What is code analysis with .NET Upgrade Assistant?
- Install .NET Upgrade Assistant
- Analyze projects with .NET Upgrade Assistant
- Upgrade projects with .NET Upgrade Assistant
