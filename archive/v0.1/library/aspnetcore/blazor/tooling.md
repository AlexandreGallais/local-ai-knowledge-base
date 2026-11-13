---
title: "Tooling for ASP.NET Core Blazor"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/tooling.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Tooling for ASP.NET Core Blazor

-->
-->

This article describes tools for building Blazor apps using several tools:

* Visual Studio (VS): The most comprehensive integrated development environment (IDE) for .NET developers on Windows. Includes an array of tools and features to elevate and enhance every stage of software development.
* Visual Studio Code (VS Code) is an open source, cross-platform code editor that can be used to develop Blazor apps.
* .NET CLI: The .NET command-line interface (CLI) is a cross-platform toolchain for developing, building, running, and publishing .NET applications. The .NET CLI is included with the .NET SDK and runs on any platform supported by the SDK.

Select the pivot of this article that matches your tooling choice.

**vs:**

To create a Blazor app with Visual Studio, use the following guidance:

* Install the latest version of Visual Studio with the **ASP.NET and web development** workload.

* Create a new project using one of the available Blazor templates:

  * **Blazor Web App**: Creates an app that supports interactive server-side rendering (interactive SSR) and client-side rendering (CSR). The Blazor Web App template is recommended for getting started with Blazor to learn about server-side and client-side Blazor features.
  * **Blazor WebAssembly Standalone App**: Creates a standalone client web app that can be deployed as a static site.

Select **Next**.

* Provide a **Project name** and confirm that the **Location** is correct.

* For more information on the options in the **Additional information** dialog, see the Blazor project templates and template options section.

* Select **Create**.

**vsc:**

Visual Studio Code is an open source, cross-platform Integrated Development Environment (IDE) that can be used to develop Blazor apps.

Install the latest version of Visual Studio Code for your platform.

Install the C# Dev Kit for Visual Studio Code. For more information, see Debug ASP.NET Core Blazor apps.

If you're new to VS Code, see the VS Code documentation. If you're new to the .NET SDK, see What is the .NET SDK? and the associated articles in the .NET SDK documentation.

Create a new project:

* Open VS Code.

* Go to the **Explorer** view and select the **Create .NET Project** button. Alternatively, you can bring up the **Command Palette** using `Ctrl`+`Shift`+`P`, and then type "`.NET`" and find and select the **.NET: New Project** command.

* Select the Blazor project template from the list.

* In the **Project Location** dialog, create or select a folder for the project.

* In the **Command Palette**, provide a name for the project or accept the default name.

* Select **Create project** to create the project or adjust the project's options by selecting **Show all template options**. For more information on the templates and options, see the Blazor project templates and template options section.

* Press `F5` on the keyboard to run the app with the debugger or `Ctrl`+`F5` to run the app without the debugger.

  The **Command Palette** asks you to select a debugger. Select **C#** from the list.

  Next, select the **https** launch configuration.

* To stop the app, press `Shift`+`F5` on the keyboard.

The Visual Studio Code (VS Code) instructions for ASP.NET Core development in some parts of the Blazor documentation use the .NET CLI, which is part of the .NET SDK. .NET CLI commands are issued in VS Code's integrated **Terminal**, which defaults to a PowerShell command shell. The **Terminal** is opened by selecting **New Terminal** from the **Terminal** menu in the menu bar.

For more information on Visual Studio Code configuration and use, see the Visual Studio Code documentation.

**cli:**

The .NET SDK is a set of libraries and tools that developers use to create .NET applications and libraries.

Install the .NET SDK. Commands are issued in a command shell using the .NET CLI.

If you previously installed one or more .NET SDKs and want to see your active version, execute the following command in a command shell:

```dotnetcli
dotnet --version
```

If you're new to the .NET SDK, see What is the .NET SDK? and the associated articles in the .NET SDK documentation.

Create a new project:

* Change to the directory using the `cd` command to where you want to create the project folder (for example, `cd c:/users/Bernie_Kopell/Documents`).

* For a Blazor Web App experience with default interactive server-side rendering (interactive SSR), execute the following command:

  ```dotnetcli
  dotnet new blazor -o BlazorApp
  ```

* For a standalone Blazor WebAssembly experience, execute the following command in a command shell that uses the `blazorwasm` template:

  ```dotnetcli
  dotnet new blazorwasm -o BlazorApp
  ```

For more information on the templates and options, see the Blazor project templates and template options section.

## Run the app

> **Important:**
> When executing a Blazor Web App, run the app from the solution's server project, which is the project with a name that doesn't end in `.Client`.

**vs:**

Press `Ctrl`+`F5` on the keyboard to run the app without the debugger.

Visual Studio displays the following dialog when a project isn't configured to use SSL:

Select **Yes** if you trust the ASP.NET Core SSL certificate.

The following dialog is displayed:

Select **Yes** to acknowledge the risk and install the certificate.

Visual Studio:

* Compiles and runs the app.
* Launches the default browser at `https://localhost:{PORT}`, which displays the app's UI. The `{PORT}` placeholder is the random port assigned at app creation. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

**vsc:**

In VS Code, press `Ctrl`+`F5` to run the app without debugging.

At the **Select debugger** prompt in the **Command Palette** at the top of the VS Code UI, select **C#**. At the next prompt, select the HTTPS profile (`[https]`).

The default browser is launched at `https://localhost:{PORT}`, which displays the app's UI. The `{PORT}` placeholder is the random port assigned at app creation. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

**cli:**

In a command shell opened to the project's root folder, execute the `dotnet watch` command to compile and start the app:

```dotnetcli
dotnet watch
```

The default browser is launched at `https://localhost:{PORT}`, which displays the app's UI. The `{PORT}` placeholder is the random port assigned at app creation. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

One approach for running the app with SSL/HTTPS is to pass the `-lp`|`--launch-profile` option with the `https` profile name to the `dotnet watch` command:

```dotnetcli
dotnet watch -lp https
```

An alternative approach is to move the `https` profile above the `http` profile in the `Properties/launchSettings.json` file and save the change. After changing the profile order in the file, the `dotnet watch` command always uses the `https` profile by default.

## Stop the app

**vs:**

Stop the app using either of the following approaches:

* Close the browser window.
* In Visual Studio, either:
  * Use the Stop button in Visual Studio's menu bar:

  * Press `Shift`+`F5` on the keyboard.

**vsc:**

Stop the app using the following approach:

1. Close the browser window.
1. In VS Code, either:
   * From the **Run** menu, select **Stop Debugging**.
   * Press `Shift`+`F5` on the keyboard.

**cli:**

Stop the app using the following approach:

1. Close the browser window.
2. In the command shell, press `Ctrl`+`C`.

## Visual Studio solution file (`.sln`)

A *solution* is a container to organize one or more related code projects. Solution files use a unique format and aren't intended to be edited directly.

Visual Studio and Visual Studio Code (VS Code) use a solution file (`.sln`) to store settings for a solution. The .NET CLI doesn't organize projects using a solution file, but it can create solution files and list/modify the projects in solution files via the `dotnet sln` command. Other .NET CLI commands use the path of the solution file for various publishing, testing, and packaging commands.

For more information, see the following resources:

* Introduction to projects and solutions (Visual Studio documentation)
* What are solutions and projects in Visual Studio? (Visual Studio documentation)
* Project management (VS Code documentation)

## Blazor project templates and template options

* Blazor Web App project template: `blazor`
* Standalone Blazor WebAssembly app project template: `blazorwasm`
* Service defaults library for Blazor WebAssembly apps: `blazor-wasm-servicedefaults`

> **Note:**
> The "Hosted" Blazor WebAssembly project template option isn't available in .NET 8 or later. To create a hosted Blazor WebAssembly app, a **Framework** option earlier than .NET 8 must be selected with the **ASP.NET Core Hosted** checkbox. However, we recommend a Blazor Web App for all new Blazor development in .NET 8 or later. For more information, see the following resources:
>
> * ASP.NET Core Blazor
> * What's new in ASP.NET Core in .NET 8
> * ASP.NET Core Blazor project structure
> * Migrate from ASP.NET Core in .NET 7 to .NET 8

The Blazor framework provides project templates for creating new apps. The templates are used to create new Blazor projects and solutions regardless of the tooling that you select for Blazor development (Visual Studio, Visual Studio Code, or the .NET command-line interface (CLI)):

For more information on Blazor project templates, see ASP.NET Core Blazor project structure.

Rendering terms and concepts used in the following subsections are introduced in the following sections of the *Fundamentals* overview article:

* Client and server rendering concepts
* Static and interactive rendering concepts
* Render modes

Detailed guidance on render modes is provided by the ASP.NET Core Blazor render modes article.

### Interactive render mode

* Interactive server-side rendering (interactive SSR) is enabled with the **Server** option.
* To only enable interactivity with client-side rendering (CSR), use the **WebAssembly** option.
* To enable both interactive rendering modes and the ability to automatically switch between them at runtime, use the **Auto (Server and WebAssembly)** (automatic) render mode option.
* If interactivity is set to `None`, the generated app has no interactivity. The app is only configured for static server-side rendering.

The Interactive Auto render mode initially uses interactive SSR while the .NET app bundle and runtime are downloaded to the browser. After the .NET WebAssembly runtime is activated, the render mode switches to Interactive WebAssembly rendering.

The Blazor Web App template enables both static and interactive SSR using a single project. If you also enable CSR, the project includes an additional client project (`.Client`) for your WebAssembly-based components. The built output from the client project is downloaded to the browser and executed on the client. Any components using the WebAssembly or automatic render modes must be built from the client project.

> **Important:**
> When using a Blazor Web App, most of the Blazor documentation example components ***require*** interactivity to function and demonstrate the concepts covered by the articles. When you test an example component provided by an article, make sure that either the app adopts global interactivity or the component adopts an interactive render mode.

### Interactivity location

Interactivity location options:

* **Per page/component**: The default sets up interactivity per page or per component.
* **Global**: Using this option sets up interactivity globally for the entire app.

Interactivity location can only be set if **Interactive render mode** isn't `None` and authentication isn't enabled.

### Sample pages

To include sample pages and a layout based on Bootstrap styling, use the **Include sample pages** option. Disable this option for project without sample pages and Bootstrap styling.

### Additional guidance on template options

* ASP.NET Core Blazor render modes
* The *.NET default templates for dotnet new* article in the .NET documentation:
  * `blazor`
  * `blazorwasm`
* Passing the help option (`-h` or `--help`) to the `dotnet new` CLI command in a command shell:
  * `dotnet new blazor -h`
  * `dotnet new blazorwasm -h`

## Service defaults library for Blazor WebAssembly apps

The `blazor-wasm-servicedefaults` project template creates a service defaults library for Blazor WebAssembly apps with Aspire integration.

The template features:

* OpenTelemetry (OTEL) (OpenTelemetry .NET) support: Logging, metrics, and tracing with standard OTEL Protocol (OTLP) exporter.
* Service discovery integration via the `Microsoft.Extensions.ServiceDiscovery` NuGet package.
* HTTP resilience using the standard resilience handler via the `Microsoft.Extensions.Http.Resilience` NuGet package.

Example template usage with an output name of `BlazorSample.ServiceDefaults`:

```dotnetcli
dotnet new blazor-wasm-servicedefaults -o BlazorSample.ServiceDefaults
```

Reference the library from the Blazor WebAssembly client and make the following call in the app's `Program` file:

```csharp
builder.AddBlazorClientServiceDefaults();
```

## Related content

* Visual Studio
* Visual Studio Code
* ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation
* .NET command-line interface (CLI)
* .NET SDK
* ASP.NET Core Blazor hosting models
* .NET Hot Reload support for ASP.NET Core
* ASP.NET Core Blazor project structure
* ASP.NET Core Blazor Hybrid tutorials
