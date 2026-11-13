---
title: "ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/webassembly-build-tools-and-aot.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation

-->
-->

This article describes the build tools for standalone Blazor WebAssembly apps and how to compile an app ahead of deployment with ahead-of-time (AOT) compilation.

## .NET WebAssembly build tools

The .NET WebAssembly build tools are based on Emscripten, a compiler toolchain for the web platform.

To install the build tools as a .NET workload, use ***either*** of the following approaches:

* For the **ASP.NET and web development** workload in the Visual Studio installer, select the **.NET WebAssembly build tools** option from the list of optional components. The option ensures the following:
  * The workload is installed for the latest .NET SDK.
  * When a new version of Visual Studio is released and it contains a new .NET SDK, the option installs the workload for the new SDK.
* Alternatively, execute the following command in an *administrative command shell* to install the latest workload to the latest .NET SDK available on the system:

  ```dotnetcli
  dotnet workload install wasm-tools
  ```

To target a prior .NET release with a given .NET SDK, install the `wasm-tools-net{MAJOR VERSION}` workload:

* The `{MAJOR VERSION}` placeholder is replaced with the major version number of the .NET release you want to target (for example, `wasm-tools-net8` for .NET 8).
* Workloads are installed per .NET SDK. Installing the `wasm-tools` workload for one SDK doesn't make it available to other SDKs on the system.
* You must install the appropriate workload for each .NET SDK version you intend to use.

The following list shows which workload to install for each .NET SDK, depending on the apps that you plan to target. Although multiple rows may contain the same workload name, the workloads always differ slightly for each particular .NET SDK.

* Using the .NET 10 SDK
  * Targeting .NET 10 requires `wasm-tools`.
  * Targeting .NET 9 requires `wasm-tools-net9`.
  * Targeting .NET 8 requires `wasm-tools-net8`.
* Using the .NET 9 SDK
  * Targeting .NET 9 requires `wasm-tools`.
  * Targeting .NET 8 requires `wasm-tools-net8`.
* Using the .NET 8 SDK: Targeting .NET 8 requires `wasm-tools`.

The Emscripten compiler toolchain depends on Python, which is bundled by default with the .NET WebAssembly build tools workload on Windows and macOS.
Python isn't bundled for Linux users, resulting in "unable to find python in $PATH" errors if Python isn't available. Linux users should install Python through their package manager or download Python for Linux/Unix and manually install it on their system so that it is available in `$PATH`.

## Ahead-of-time (AOT) compilation

Blazor WebAssembly supports ahead-of-time (AOT) compilation, where you can compile your .NET code directly into WebAssembly. AOT compilation results in runtime performance improvements at the expense of a larger app size.

Without enabling AOT compilation, Blazor WebAssembly apps run on the browser using a .NET Intermediate Language (IL) interpreter implemented in WebAssembly with partial just-in-time (JIT) runtime support, informally referred to as the *Jiterpreter*. Because the .NET IL code is interpreted, apps typically run slower than they would on a server-side .NET JIT runtime without any IL interpretation. AOT compilation addresses this performance issue by compiling an app's .NET code directly into WebAssembly for native WebAssembly execution by the browser. The AOT performance improvement can yield dramatic improvements for apps that execute CPU-intensive tasks. The drawback to using AOT compilation is that AOT-compiled apps are generally larger than their IL-interpreted counterparts, so they usually take longer to download to the client when first requested.

For guidance on installing the .NET WebAssembly build tools, see ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation.

To enable WebAssembly AOT compilation, add the `<RunAOTCompilation>` property set to `true` to the Blazor WebAssembly app's project file:

```xml
<PropertyGroup>
  <RunAOTCompilation>true</RunAOTCompilation>
</PropertyGroup>
```

To compile the app to WebAssembly, publish the app. Publishing the `Release` configuration ensures the .NET Intermediate Language (IL) linking is also run to reduce the size of the published app:

```dotnetcli
dotnet publish -c Release
```

WebAssembly AOT compilation is only performed when the project is published. AOT compilation isn't used when the project is run during development (`Development` environment) because AOT compilation usually takes several minutes on small projects and potentially much longer for larger projects. Reducing the build time for AOT compilation is under development for future releases of ASP.NET Core.

The size of an AOT-compiled Blazor WebAssembly app is generally larger than the size of the app if compiled into .NET IL:

* Although the size difference depends on the app, most AOT-compiled apps are about twice the size of their IL-compiled versions. This means that using AOT compilation trades off load-time performance for runtime performance. Whether this tradeoff is worth using AOT compilation depends on your app. Blazor WebAssembly apps that are CPU intensive generally benefit the most from AOT compilation.

* The larger size of an AOT-compiled app is due to two conditions:

  * More code is required to represent high-level .NET IL instructions in native WebAssembly.
  * AOT doesn't trim out managed DLLs when the app is published. Blazor requires the DLLs for reflection metadata and to support certain .NET runtime features. Requiring the DLLs on the client increases the download size but provides a more compatible .NET experience.

> **Note:**
> For Mono/WebAssembly MSBuild properties and targets, see `WasmApp.Common.targets` (`dotnet/runtime` GitHub repository). Official documentation for common MSBuild properties is planned per Document blazor msbuild configuration options (`dotnet/docs` #27395).

## Performance

For performance guidance, see ASP.NET Core Blazor WebAssembly runtime performance:

* Heap size for some mobile device browsers
* Runtime relinking
* Single Instruction, Multiple Data (SIMD)
* Trim .NET IL after ahead-of-time (AOT) compilation (.NET 8 or later)

## Exception handling

Exception handling is enabled by default. To disable exception handling, add the `<WasmEnableExceptionHandling>` property with a value of `false` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <WasmEnableExceptionHandling>false</WasmEnableExceptionHandling>
</PropertyGroup>
```

For more information, see the following resources:

* Configuring and hosting .NET WebAssembly applications: EH - Exception handling
* Exception handling

## Related content

* ASP.NET Core Blazor WebAssembly runtime performance
* ASP.NET Core Blazor WebAssembly native dependencies
* Webcil packaging format for .NET assemblies
