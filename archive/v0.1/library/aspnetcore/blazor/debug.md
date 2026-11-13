---
title: "Debug ASP.NET Core Blazor apps (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/debug.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Debug ASP.NET Core apps

-->
-->

This article describes how to debug Blazor apps, including debugging Blazor WebAssembly apps with browser developer tools or an integrated development environment (IDE).

Blazor Web Apps can be debugged in Visual Studio or Visual Studio Code.

Blazor WebAssembly apps can be debugged:

* In Visual Studio or Visual Studio Code.
* Using browser developer tools in Chromium-based browsers, including Microsoft Edge, Google Chrome, and Firefox.

Available scenarios for Blazor WebAssembly debugging include:

* Set and remove breakpoints.
* Run the app with debugging support in IDEs.
* Single-step through the code.
* Resume code execution with a keyboard shortcut in IDEs.
* In the *Locals* window, observe the values of local variables.
* See the call stack, including call chains between JavaScript and .NET.
* Use a symbol server for debugging, configured by Visual Studio preferences.

Unsupported scenarios include:

* Debug in non-local scenarios (for example, Windows Subsystem for Linux (WSL) or Visual Studio Codespaces).
* Debug in Firefox from Visual Studio or Visual Studio Code.

## Blazor WebAssembly Gateway

`Microsoft.AspNetCore.Components.Gateway` is a lightweight ASP.NET Core host for serving standalone Blazor WebAssembly apps during development and production.

The Gateway is a full ASP.NET Core host, not merely a static-file dev tool, so standalone Blazor WebAssembly apps feature:

* Built-in SPA fallback routing: Requests that don't match a static asset fall back to `index.html`, so client-side routes such as `/orders/42` work on browser refresh and direct navigation without a custom MSBuild target.
* Multiple Blazor WebAssembly clients per host: A single Gateway instance can serve more than one Blazor WebAssembly client under different path prefixes, configured through its `ClientApps` section. This is the integration point .NET Aspire uses to host Blazor WebAssembly clients alongside backend services in a single AppHost run.
* Built-in YARP reverse-proxy infrastructure: YARP is bundled with the Gateway, providing the foundation for forwarding backend traffic alongside the WebAssembly client and enabling the Aspire multi-client scenarios.

To adopt the Gateway in an existing standalone Blazor WebAssembly app that targets .NET 11 or later, reference the `Microsoft.AspNetCore.Components.Gateway` package in the app's project file.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Custom routing code and middleware aren't required by the app. Fallback endpoints come from the static web assets manifest the SDK emits when the `StaticWebAssetSpaFallbackEnabled` property is set in the app's project file, which is present by default in standalone Blazor WebAssembly apps created from the project template:

```xml
<StaticWebAssetSpaFallbackEnabled>true</StaticWebAssetSpaFallbackEnabled>
```

## Prerequisites

This section explains the prerequisites for debugging.

### Browser prerequisites

The latest version of the following browsers:

* Google Chrome
* Microsoft Edge
* Firefox (browser developer tools only)

Ensure that firewalls or proxies don't block communication with the debug proxy (`NodeJS` process). For more information, see the Firewall configuration section.

> **Note:**
> Apple Safari on macOS isn't currently supported.

### IDE prerequisites

The latest version of Visual Studio or Visual Studio Code is required.

### Visual Studio Code prerequisites

Visual Studio Code requires the C# Dev Kit for Visual Studio Code (Getting Started with C# in VS Code). In the Visual Studio Code Extensions Marketplace, filter the extension list with "`c# dev kit`" to locate the extension:

Installing the C# Dev Kit automatically installs the following additional extensions:

* .NET Install Tool
* C#
* IntelliCode for C# Dev Kit

If you encounter warnings or errors, you can open an issue (`microsoft/vscode-dotnettools` GitHub repository) describing the problem.

## Packages

Blazor Web Apps: `Microsoft.AspNetCore.Components.WebAssembly.Server`: References an internal package (`Microsoft.NETCore.BrowserDebugHost.Transport`) for assemblies that share the browser debug host.

Standalone Blazor WebAssembly: `Microsoft.AspNetCore.Components.Gateway`: A lightweight ASP.NET Core host for serving standalone Blazor WebAssembly apps during development and production.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

# Visual Studio

The example in this section assumes that you've created a Blazor Web App with an interactive render mode of Auto (Server and WebAssembly) and per-component interactivity location.

1. Open the app.
1. Set a breakpoint on the `currentCount++;` line in the `Counter` component (`Pages/Counter.razor`) of the client project (`.Client`).
1. With the server project selected in **Solution Explorer**, press `F5` to run the app in the debugger.
1. In the browser, navigate to `Counter` page at `/counter`. Wait a few seconds for the debug proxy to load and run. Select the **Click me** button to hit the breakpoint.
1. In Visual Studio, inspect the value of the `currentCount` field in the **Locals** window.
1. Press `F5` to continue execution.

Breakpoints can also be hit in the server project in statically-rendered and interactively-rendered server-side components.

1. Stop the debugger.
1. In the server app, open the statically-rendered `Weather` component (`Components/Pages/Weather.razor`) and set a breakpoint anywhere in the `OnInitializedAsync` method.
1. Press `F5` to run the app in the debugger.
1. In the browser, navigate to the `Weather` page at `/weather`. Wait a few seconds for the debug proxy to load and run. Application execution stops at the breakpoint.
1. Press `F5` to continue execution.

Breakpoints are **not** hit during app startup before the debug proxy is running. This includes breakpoints in the `Program` file and breakpoints in the `OnInitialized{Async}` lifecycle methods of components that are loaded by the first page requested from the app.

# Visual Studio Code

The example in this section assumes that you've created a Blazor Web App with an interactive Auto (Server and WebAssembly) render mode and per-component interactivity location.

1. Open the app in Visual Studio Code by opening the solution folder, which is the folder that contains the server and `.Client` project folders.
1. Set a breakpoint on the `currentCount++;` line in the `Counter` component (`Pages/Counter.razor`) of the client project (`.Client`).
1. Open the **Run and Debug** pane and select the **Run and Debug** button. Alternatively, press `F5` (**Start Debugging**). Select the `C#` debugger in the command palette at the top of the UI. Select the default profile **for the server project** (for example, `C#:BlazorSample [Default Configuration]`).
1. In the browser, navigate to `Counter` page at `/counter`. Wait a few seconds for the debug proxy to load and run. Select the **Click me** button to hit the breakpoint.
1. Select the **Continue** button in the UI or press `F5` (**Continue**) to continue execution.

Breakpoints can also be hit in the server project.

1. Stop debugging by selecting the **Stop** button or press `Shift`+`F5` on the keyboard.
1. In the server app, open the statically-rendered `Weather` component (`Components/Pages/Weather.razor`) and set a breakpoint anywhere in the `OnInitializedAsync` method.
1. Select the **Start Debugging** button in the UI or press `F5` (**Start Debugging**) to run the app in the debugger.
1. In the browser, navigate to the `Weather` page at `/weather`. Wait a few seconds for the debug proxy to load and run. Application execution stops at the breakpoint.
1. Select the **Continue** button in the UI or press `F5` (**Continue**) to continue execution.

Breakpoints are **not** hit during app startup before the debug proxy is running. This includes breakpoints in the `Program` file and breakpoints in the `OnInitialized{Async}` lifecycle methods of components that are loaded by the first page requested from the app.

---

# Visual Studio

1. Open the app.
1. Set a breakpoint on the `currentCount++;` line in the `Counter` component (`Pages/Counter.razor`).
1. Press `F5` to run the app in the debugger.
1. In the browser, navigate to `Counter` page at `/counter`. Wait a few seconds for the debug proxy to load and run. Select the **Click me** button to hit the breakpoint.
1. In Visual Studio, inspect the value of the `currentCount` field in the **Locals** window.
1. Press `F5` to continue execution.

Breakpoints are **not** hit during app startup before the debug proxy is running. This includes breakpoints in the `Program` file and breakpoints in the `OnInitialized{Async}` lifecycle methods of components that are loaded by the first page requested from the app.

# Visual Studio Code

1. Open the app's folder in Visual Studio Code.
1. Set a breakpoint on the `currentCount++;` line in the `Counter` component (`Pages/Counter.razor`).
1. Open the **Run and Debug** pane and select the **Run and Debug** button. Alternatively, press `F5` (**Start Debugging**). Select the `C#` debugger in the command palette at the top of the UI. Select the default profile (for example, `C#:BlazorSample [Default Configuration]`).
1. Press `F5` to run the app in the debugger.
1. The standalone app is launched, and a debugging browser is opened.
1. In the browser, navigate to `Counter` page at `/counter`. Wait a few seconds for the debug proxy to load and run. Select the **Click me** button to hit the breakpoint.
1. Press `F5` to continue execution.

Breakpoints are **not** hit during app startup before the debug proxy is running. This includes breakpoints in the `Program` file and breakpoints in the `OnInitialized{Async}` lifecycle methods of components that are loaded by the first page requested from the app.

---

## Attach to an existing Visual Studio Code debugging session

To attach to a running Blazor app, open the `.vscode/launch.json` file and replace the `{URL}` placeholder with the URL where the app is running:

```json
{
  "name": "Attach and Debug",
  "type": "blazorwasm",
  "request": "attach",
  "url": "{URL}"
}
```

## Visual Studio Code launch options

The launch configuration options in the following table are supported for the `blazorwasm` debug type (`.vscode/launch.json`).

| Option    | Description |
| --------- | ----------- |
| `browser` | The browser to launch for the debugging session. Set to `edge` or `chrome`. Defaults to `edge`. |
| `cwd`     | The working directory to launch the app under. |
| `request` | Use `launch` to launch and attach a debugging session to a Blazor WebAssembly app or `attach` to attach a debugging session to an already-running app. |
| `timeout` | The number of milliseconds to wait for the debugging session to attach. Defaults to 30,000 milliseconds (30 seconds). |
| `trace`   | Used to generate logs from the JS debugger. Set to `true` to generate logs. |
| `url`     | The URL to open in the browser when debugging. |
| `webRoot` | Specifies the absolute path of the web server. Should be set if an app is served from a sub-route. |

## Debug Blazor WebAssembly with Google Chrome or Microsoft Edge

*The guidance in this section applies debugging Blazor WebAssembly apps in:*

* ***Google Chrome*** *running on Windows or macOS.*
* ***Microsoft Edge*** *running on Windows.*

1. Run the app in a command shell with `dotnet watch` (or `dotnet run`).
1. Launch a browser and navigate to the app's URL.
1. Start remote debugging by pressing:

   * `Shift`+`Alt`+`d` on Windows.
   * `Shift`+`&#8984;`+`d` on macOS.

   The browser must be running with remote debugging enabled, which isn't the default. If remote debugging is disabled, an **Unable to find debuggable browser tab** error page is rendered with instructions for launching the browser with the debugging port open. Follow the instructions for your browser.

   After following the instructions to enable remote debugging, the app opens in a new browser window. Start remote debugging by pressing the HotKey <example-value> in the new browser window:

   * `Shift`+`Alt`+`d` on Windows.
   * `Shift`+`&#8984;`+`d` on macOS.

   A new window developer tools browser tab opens showing a ghosted image of the app.

   > **Note:**
   > If you followed the instructions to open a new browser tab with remote debugging enabled, you can close the original browser window, leaving the second window open with the first tab running the app and the second tab running the debugger.

1. After a moment, the **Sources** tab shows a list of the app's .NET assemblies and pages.
1. Open the `file://` node. In component code (`.razor` files) and C# code files (`.cs`), breakpoints that you set are hit when code executes in the app's browser tab (the initial tab opened after starting remote debugging). After a breakpoint is hit, single-step (`F10`) through the code or resume (`F8`) code execution normally in the debugging tab.

For Chromium-based browser debugging, Blazor provides a debugging proxy that implements the Chrome DevTools Protocol and augments the protocol with .NET-specific information. When debugging keyboard shortcut is pressed, Blazor points the Chrome DevTools at the proxy. The proxy connects to the browser window you're seeking to debug (hence the need to enable remote debugging).
