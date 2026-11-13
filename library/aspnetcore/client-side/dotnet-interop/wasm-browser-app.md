---
title: "JavaScript `[JSImport]`/`[JSExport]` interop with a WebAssembly Browser App project"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/client-side/dotnet-interop/wasm-browser-app.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# JavaScript `[JSImport]`/`[JSExport]` interop with a WebAssembly Browser App project

-->
-->

This article explains how to setup a WebAssembly Browser App project to run .NET from JavaScript (JS) using JS `[JSImport]`/`[JSExport]` interop. For additional information and examples, see JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop in .NET WebAssembly.

For additional guidance, see the Configuring and hosting .NET WebAssembly applications guidance in the .NET Runtime (`dotnet/runtime`) GitHub repository.

Existing JS apps can use the expanded client-side WebAssembly support to reuse .NET libraries from JS or to build novel .NET-based apps and frameworks.

> **Note:**
> This article focuses on running .NET from JS apps without any dependency on Blazor. For guidance on using `[JSImport]`/`[JSExport]` interop in Blazor WebAssembly apps, see JavaScript JSImport/JSExport interop with ASP.NET Core Blazor.

These approaches are appropriate when you only expect the Blazor app to run on WebAssembly (:::no-loc text="WASM":::). Libraries can make a runtime check to determine if the app is running on :::no-loc text="WASM"::: by calling `System.OperatingSystem.IsBrowser*`.

## Prerequisites

.NET SDK (latest version)

Install the `wasm-tools` workload in an administrative command shell, which brings in the related MSBuild targets:

```dotnetcli
dotnet workload install wasm-tools
```

The tools can also be installed via Visual Studio's installer under the **ASP.NET and web development** workload in the Visual Studio installer. Select the **.NET WebAssembly build tools** option from the list of optional components.

Optionally, install the `wasm-experimental` workload, which adds the following experimental project templates:

* *WebAssembly Browser App* for getting started with .NET on WebAssembly in a browser app.
* *WebAssembly Console App* for getting started in a Node.js-based console app.

After installing the workload, these new templates can be selected when creating a new project. This workload isn't required if you plan to integrate JS `[JSImport]`/`[JSExport]` interop into an existing JS app.

```dotnetcli
dotnet workload install wasm-experimental
```

The templates can also be installed from the `Microsoft.NET.Runtime.WebAssembly.Templates` NuGet package with the following command:

```dotnetcli
dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates
```

For more information, see the Experimental workload and project templates section.

## Namespace

The JS interop API described in this article is controlled by attributes in the `System.Runtime.InteropServices.JavaScript` namespace.

## Project configuration

To configure a project (`.csproj`) to enable JS interop:

* Set the target framework moniker (`{TARGET FRAMEWORK}` placeholder):

  ```xml
  <TargetFramework>{TARGET FRAMEWORK}</TargetFramework>
  ```

  .NET 7 (`net7.0`) or later is supported.

* Enable the `Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks` property, which permits the code generator in the Roslyn compiler to use pointers for JS interop:

  ```xml
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  ```

  > **Warning:**
  > The JS interop API requires enabling `Microsoft.Build.Tasks.Csc.AllowUnsafeBlocks`. Be careful when implementing your own unsafe code in .NET apps, which can introduce security and stability risks. For more information, see Unsafe code, pointer types, and function pointers.

The following is an example project file (`.csproj`) after configuration. The `{TARGET FRAMEWORK}` placeholder is the target framework:

```xml
<Project Sdk="Microsoft.NET.Sdk.WebAssembly">

  <PropertyGroup>
    <TargetFramework>{TARGET FRAMEWORK}</TargetFramework>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  </PropertyGroup>

</Project>
```

> **Note:**
> In .NET 10 and later, the `WasmEnableHotReload` MSBuild property controls whether Hot Reload infrastructure is included in the build output. The property is set to `true` by default for the `Debug` configuration. Set the property to `false` to produce bundler-compatible build output, for example for use with webpack or Vite, without Hot Reload dependencies when building the app with `dotnet build`:
>
> ```xml
> <PropertyGroup>
>   <WasmEnableHotReload>false</WasmEnableHotReload>
> </PropertyGroup>
> ```

## JavaScript interop on :::no-loc text="WASM":::

APIs in the following example are imported from `dotnet.js`. These APIs enable you to set up named modules that can be imported into your C# code and call into methods exposed by your .NET code, including `Program.Main`.

> **Important:**
> "Import" and "export" throughout this article are defined from the perspective of .NET:
>
> * An app imports JS methods so that they can be called from .NET.
> * The app exports .NET methods so that they can be called from JS.

In the following example:

* The `dotnet.js` file is used to create and start the .NET WebAssembly runtime. `dotnet.js` is generated as part of the app's build output.

  > **Important:**
  > To integrate with an existing app, copy the contents of the publish output folder&dagger; to the existing app's deployment assets so that it can be served along with the rest of the app. For production deployments, publish the app with the `dotnet publish -c Release` command in a command shell and deploy the output folder's contents with the app.
  >
  > &dagger;The publish output folder is the target location of your publish profile. The default for a **:::no-loc text="Release":::** profile in .NET 8 or later is `bin/Release/{TARGET FRAMEWORK}/publish`, where the `{TARGET FRAMEWORK}` placeholder is the target framework (for example, `net8.0`).

* `dotnet.create()` sets up the .NET WebAssembly runtime.

* `setModuleImports` associates a name with a module of JS functions for import into .NET. The JS module contains a `dom.setInnerText` function, which accepts and element selector and time to display the current stopwatch time in the UI. The name of the module can be any string (it doesn't need to be a file name), but it must match the name used with the `JSImportAttribute` (explained later in this article). The `dom.setInnerText` function is imported into C# and called by the C# method `SetInnerText`. The `SetInnerText` method is shown later in this section.

* `exports.StopwatchSample.Reset()` calls into .NET (`StopwatchSample.Reset`) from JS. The `Reset` C# method restarts the stopwatch if it's running or resets it if it isn't running. The `Reset` method is shown later in this section.

* `exports.StopwatchSample.Toggle()` calls into .NET (`StopwatchSample.Toggle`) from JS. The `Toggle` C# method starts or stops the stopwatch depending on if it's currently running or not. The `Toggle` method is shown later in this section.

* `runMain()` runs `Program.Main`.

JS module:

```javascript
import { dotnet } from './_framework/dotnet.js'

const { setModuleImports, getAssemblyExports, getConfig, runMain } = await dotnet
  .withApplicationArguments("start")
  .create();

setModuleImports('main.js', {
  dom: {
    setInnerText: (selector, time) =>
      document.querySelector(selector).innerText = time
  }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

document.getElementById('reset').addEventListener('click', e => {
  exports.StopwatchSample.Reset();
  e.preventDefault();
});

const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', e => {
  const isRunning = exports.StopwatchSample.Toggle();
  pauseButton.innerText = isRunning ? 'Pause' : 'Start';
  e.preventDefault();
});

await runMain();
```

To import a JS function so it can be called from C#, use the new `System.Runtime.InteropServices.JavaScript.JSImportAttribute` on a matching method signature. The first parameter to the `System.Runtime.InteropServices.JavaScript.JSImportAttribute` is the name of the JS function to import and the second parameter is the name of the module.

In the following example, the `dom.setInnerText` function is called from the `main.js` module when `SetInnerText` method is called:

```csharp
[JSImport("dom.setInnerText", "main.js")]
internal static partial void SetInnerText(string selector, string content);
```

In the imported method signature, you can use .NET types for parameters and return values, which are marshalled automatically by the runtime. Use `System.Runtime.InteropServices.JavaScript.JSMarshalAsAttribute`1` to control how the imported method parameters are marshalled. For example, you might choose to marshal a `long` as `System.Runtime.InteropServices.JavaScript.JSType.Number` or `System.Runtime.InteropServices.JavaScript.JSType.BigInt`. You can pass `System.Action`/`System.Func`1` callbacks as parameters, which are marshalled as callable JS functions. You can pass both JS and managed object references, and they are marshaled as proxy objects, keeping the object alive across the boundary until the proxy is garbage collected. You can also import and export asynchronous methods with a `System.Threading.Tasks.Task` result, which are marshaled as JS promises. Most of the marshalled types work in both directions, as parameters and as return values, on both imported and exported methods.

For additional type mapping information and examples, see JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop in .NET WebAssembly.

Functions accessible on the global namespace can be imported by using the `globalThis` prefix in the function name and by using the `[JSImport]` attribute without providing a module name. In the following example, `console.log` is prefixed with `globalThis`. The imported function is called by the C# `Log` method, which accepts a C# string message (`message`) and marshalls the C# string to a JS `String` for `console.log`:

```csharp
[JSImport("globalThis.console.log")]
internal static partial void Log([JSMarshalAs<JSType.String>] string message);
```

To export a .NET method so it can be called from JS, use the `System.Runtime.InteropServices.JavaScript.JSExportAttribute`.

In the following example, each method is exported to JS and can be called from JS functions:

* The `Toggle` method starts or stops the stopwatch depending on its running state.
* The `Reset` method restarts the stopwatch if it's running or resets it if it isn't running.
* The `IsRunning` method indicates if the stopwatch is running.

```csharp
[JSExport]
internal static bool Toggle()
{
    if (stopwatch.IsRunning)
    {
        stopwatch.Stop();
        return false;
    }
    else
    {
        stopwatch.Start();
        return true;
    }
}

[JSExport]
internal static void Reset()
{
    if (stopwatch.IsRunning)
        stopwatch.Restart();
    else
        stopwatch.Reset();

    Render();
}

[JSExport]
internal static bool IsRunning() => stopwatch.IsRunning;
```

## Experimental workload and project templates

To demonstrate the JS interop functionality and obtain JS interop project templates, install the `wasm-experimental` workload:

```dotnetcli
dotnet workload install wasm-experimental
```

The `wasm-experimental` workload contains two project templates: `wasmbrowser` and `wasmconsole`. These templates are experimental at this time, which means the developer workflow for the templates is evolving. However, the .NET and JS APIs used in the templates are supported in .NET 8 and provide a foundation for using .NET on :::no-loc text="WASM"::: from JS.

The templates can also be installed from the `Microsoft.NET.Runtime.WebAssembly.Templates` NuGet package with the following command:

```dotnetcli
dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates
```

### Browser app

You can create a browser app with the `wasmbrowser` template from the command line, which creates a web app that demonstrates using .NET and JS together in a browser:

```dotnetcli
dotnet new wasmbrowser
```

Alternatively in Visual Studio, you can create the app using the **:::no-loc text="WebAssembly Browser App":::** project template.

Build the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet build
```

Build and run the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet run
```

Alternatively, install and use the `dotnet serve` command:

```dotnetcli
dotnet serve -d:bin/$(Configuration)/{TARGET FRAMEWORK}/publish
```

In the preceding example, the `{TARGET FRAMEWORK}` placeholder is the target framework moniker.

### Node.js console app

You can create a console app with the `wasmconsole` template, which creates an app that runs under :::no-loc text="WASM"::: as a Node.js or V8 console app:

```dotnetcli
dotnet new wasmconsole
```

Alternatively in Visual Studio, you can create the app using the **:::no-loc text="WebAssembly Console App":::** project template.

Build the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet build
```

Build and run the app from Visual Studio or by using the .NET CLI:

```dotnetcli
dotnet run
```

Alternatively, start any static file server from the publish output directory that contains the `main.mjs` file:

```
node bin/$(Configuration)/{TARGET FRAMEWORK}/{PATH}/main.mjs
```

In the preceding example, the `{TARGET FRAMEWORK}` placeholder is the target framework moniker, and the `{PATH}` placeholder is the path to the `main.mjs` file.

## Related content

* JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop in .NET WebAssembly
* JavaScript JSImport/JSExport interop with ASP.NET Core Blazor
* API documentation
  * `[JSImport]` attribute
  * `[JSExport]` attribute
* In the `dotnet/runtime` GitHub repository:
  * Configuring and hosting .NET WebAssembly applications
  * .NET WebAssembly runtime
  * `dotnet.d.ts` file (.NET WebAssembly runtime configuration)
* Use .NET from any JavaScript app in .NET 7
