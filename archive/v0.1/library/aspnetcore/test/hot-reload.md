---
title: ".NET Hot Reload support for ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/test/hot-reload.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# .NET Hot Reload support for ASP.NET Core

.NET Hot Reload applies code changes, including changes to stylesheets, to a running app without restarting the app and without losing app state. Hot Reload is supported for all ASP.NET Core in .NET 6 or later projects.

Generally, updated code is rerun to take effect with the following conditions:

* Some startup logic is only run once:
  * Middleware, unless the code update is to an inline middleware delegate.
  * Configured services.
  * Route creation and configuration, unless the code update is to a route handler delegate (for example, `OnInitialized`).
* In Blazor apps, the framework triggers a Razor component render automatically.
* In MVC and Razor Pages apps, Hot Reload triggers a browser refresh automatically.
* Removing a Razor component parameter attribute doesn't cause the component to rerender. The app must be restarted.

For more information on supported scenarios, see Supported code changes (C# and Visual Basic).

## Blazor WebAssembly

Blazor WebAssembly Hot Reload supports the following code changes:

* New types.
* Nested classes.
* Most changes to method bodies, such as adding, removing, and editing variables, expressions, and statements.
* Changes to the bodies of lambda expressions and local functions.
* Adding static and instance methods to existing types.
* Adding static and instance fields, events, and properties to existing types.
* Adding static lambdas to existing methods.
* Adding lambdas that capture `this` to existing methods that already captured `this` previously.

Note that when an attribute is removed that previously set the value of a component parameter, the component is disposed and re-initialized to set the removed parameter back to its default value.

The following code changes aren't supported for Blazor WebAssembly apps:

* Adding a new `await` operator or `yield` keyword expression.
* Changing the names of method parameters.

## .NET CLI

Hot Reload is activated using the `dotnet watch` command:

```dotnetcli
dotnet watch
```

To force the app to rebuild and restart, use the keyboard combination `Ctrl`+`R` in the command shell.

When an unsupported code edit is made, called a *rude edit*, `dotnet watch` asks you if you want to restart the app:

* **Yes**: Restarts the app.
* **No**: Doesn't restart the app and leaves the app running without the changes applied.
* **Always**: Restarts the app as needed when rude edits occur.
* **Never**: Doesn't restart the app and avoids future prompts.

To disable support for Hot Reload, pass the `--no-hot-reload` option to the `dotnet watch` command:

```dotnetcli
dotnet watch --no-hot-reload
```

## Disable Hot Reload

The following setting in `Properties/launchSettings.json` disables Hot Reload:

```json
"hotReloadEnabled" : false
```

## WebAssembly Hot Reload (`WasmEnableHotReload`)

In .NET 10 and later, the `WasmEnableHotReload` MSBuild property controls whether Hot Reload infrastructure is included in the build output for .NET WebAssembly apps, including both Blazor WebAssembly apps and non-Blazor WebAssembly Browser App (`wasmbrowser` template) projects. The property is set to `true` by default for the `Debug` configuration.

Setting the property to `false` removes Hot Reload dependencies from the `dotnet build` output, which is useful when producing bundler-compatible artifacts, for example, for use with webpack or Vite.

To disable Hot Reload for WebAssembly apps, set the property to `false` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <WasmEnableHotReload>false</WasmEnableHotReload>
</PropertyGroup>
```

To enable Hot Reload for a custom (non-`Debug`) configuration, set the property to `true`:

```xml
<PropertyGroup>
  <WasmEnableHotReload>true</WasmEnableHotReload>
</PropertyGroup>
```

For more information on controlling Hot Reload in Blazor WebAssembly apps, see Debug ASP.NET Core Blazor apps.

## Related content

For more information, see the following resources in the Visual Studio documentation:

* YouTube video .NET 6 Hot Reload in Visual Studio 2022, VS Code, and NOTEPAD?!?
* Introducing the .NET Hot Reload experience for editing code at runtime
* Write and debug running code with Hot Reload in Visual Studio
* Updates for Blazor & Razor editors + Hot Reload for ASP.NET
* Test Execution with Hot Reload
