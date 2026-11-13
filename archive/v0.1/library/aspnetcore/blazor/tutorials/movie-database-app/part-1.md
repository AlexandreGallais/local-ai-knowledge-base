---
title: "Build a Blazor movie database app (Part 1 - Create a Blazor Web App) (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/tutorials/movie-database-app/part-1.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 1 - Create a Blazor Web App)

-->
-->

This article is the first part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

This part of the tutorial series covers how to create a Blazor Web App that adopts static server-side rendering (static SSR). Static SSR means that content is rendered on the server and sent to the client for display in response to individual requests.

## Prerequisites

**vs:**

Visual Studio (latest release) with the **ASP.NET and web development** workload

**vsc:**

Latest releases of:

* Visual Studio Code
* C# Dev Kit
* .NET SDK

The Visual Studio Code (VS Code) instructions for ASP.NET Core development in this tutorial use the .NET CLI, which is part of the .NET SDK. .NET CLI commands are issued in VS Code's integrated **Terminal**, which defaults to a PowerShell command shell. The **Terminal** is opened by selecting **New Terminal** from the **Terminal** menu in the menu bar.

**cli:**

.NET SDK (latest release)

The .NET CLI is part of the .NET SDK. To issue commands that affect the project, open the command shell to the project's root folder.

## Create a Blazor Web App

**vs:**

In Visual Studio:

* Select **Create a new project** from the **Start Window** or select **File** > **New** > **Project** from the menu bar.

* In the **Create a new project** dialog, select **Blazor Web App** from the list of project templates. Select the **Next** button.

* In the **Configure your new project** dialog, name the project `BlazorWebAppMovies` in the **Project name** field, including matching the capitalization. Using this exact project name is important to ensure that the namespaces match for code that you copy from the tutorial into the app that you're building.

* Confirm that the **Location** for the app is suitable. Set the **Place solution and project in the same directory** checkbox to match your preferred solution file location. Select the **Next** button.

* In the **Additional information** dialog, use the following settings:

  * **Framework**: Confirm that the latest framework is selected. If Visual Studio's **Framework** dropdown list doesn't include the latest available .NET framework, update Visual Studio and restart the tutorial.
  * **Authentication type**: **None**
  * **Configure for HTTPS**: Selected
  * **Interactive render mode**: **Server**
  * **Interactivity location**: **Per page/component**
  * **Include sample pages**: Selected
  * **Do not use top-level statements**: Not selected
  * **Use the .dev.localhost TLD in the application URL**: Not selected
  * Select **Create**.

The Visual Studio instructions in parts of this tutorial series use EF Core commands to add database migrations and update the database. EF Core commands are issued using Visual Studio Connected Services. More information is provided later in this tutorial series.

**vsc:**

This tutorial assumes that you have familiarity with VS Code. If you're new to VS Code, see the VS Code documentation. The videos listed by the Introductory Videos page are designed to give you an overview of VS Code's features.

Confirm that you have the latest C# Dev Kit and .NET SDK installed.

In VS Code:

Create a new project:

* Go to the **Explorer** view and select the **Create .NET Project** button. Alternatively, you can bring up the **Command Palette** using `Ctrl`+`Shift`+`P`, and then type "`.NET`" to find and select the **.NET: New Project** command.

* Select the **Blazor Web App** project template from the list.

* In the **Project Location** dialog, create or select a folder for the project.

* In the **Command Palette**, name the project `BlazorWebAppMovies`, including matching the capitalization. Using this exact project name is important to ensure that the namespaces match for code that you copy from the tutorial into the app that you're building.

* Select **Create project** to create the app.

**cli:**

Confirm that you have the latest .NET SDK installed.

In a command shell:

* Use the `cd` command to change to the directory to where you want to create the project folder (for example, `cd c:/users/Bernie_Kopell/Documents`).
* Use the `dotnet new` command with the `blazor` project template to create a new Blazor Web App project. The `-o|--output` option passed to the command creates the project in a new folder at the current shell directory location. Name the project `BlazorWebAppMovies`, including matching the capitalization, so the namespaces match for code that you copy from the tutorial to the app.

  ```dotnetcli
  dotnet new blazor -o BlazorWebAppMovies
  ```

## Run the app

**vs:**

Press `F5` on the keyboard to run the app.

Visual Studio displays the following dialog when a project isn't configured to use SSL:

Select **Yes** if you trust the ASP.NET Core SSL certificate.

The following dialog is displayed:

Select **Yes** to acknowledge the risk and install the certificate.

Visual Studio:

* Compiles and runs the app.
* Launches the default browser at `https://localhost:{PORT}`, which displays the app's UI. The `{PORT}` placeholder is the random port assigned to the app when the app is created. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

Navigate the pages of the app to confirm that the app is working normally.

**vsc:**

In VS Code, press `F5` to run the app.

At the **Select debugger** prompt in the **Command Palette** at the top of the VS Code UI, select **C#**. At the next prompt, select the default launch configuration (`C#: BlazorWebAppMovies [Default Configuration]`).

The default browser is launched at `http://localhost:{PORT}`, which displays the app's UI. The `{PORT}` placeholder is the random port assigned to the app when the app is created. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

Navigate the pages of the app to confirm that the app is working normally.

**cli:**

In a command shell opened to the project's root folder, execute the `dotnet watch` command to compile and start the app:

```dotnetcli
dotnet watch
```

The app is compiled and run. The app is launched at `http://localhost:{PORT}`, where the `{PORT}` placeholder is the random port assigned to the app when the app is created. If you need to change the port due to a local port conflict, change the port in the project's `Properties/launchSettings.json` file.

Navigate the pages of the app to confirm that the app is working normally.

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

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
