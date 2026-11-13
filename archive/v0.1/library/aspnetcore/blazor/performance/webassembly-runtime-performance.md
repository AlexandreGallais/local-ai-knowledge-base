---
title: "ASP.NET Core Blazor WebAssembly runtime performance"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/performance/webassembly-runtime-performance.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly runtime performance

-->
-->

This article provides guidance on Blazor WebAssembly runtime performance.

## Potentially reduced performance with Microsoft Edge enhanced security

The Microsoft Edge browser's WebAssembly (Wasm) interpreter running in enhanced security mode might not yield the same performance as when Blazor is running without enhanced security. If enhanced security mode is enabled and an app's performance is degraded, we recommend adding the site as an exception to opt out of enhanced security mode.

## Trim .NET IL after ahead-of-time (AOT) compilation

The `WasmStripILAfterAOT` MSBuild option enables removing the .NET Intermediate Language (IL) for compiled methods after performing AOT compilation to WebAssembly, which reduces the size of the `_framework` folder.

In the app's project file:

```xml
<PropertyGroup>
  <RunAOTCompilation>true</RunAOTCompilation>
  <WasmStripILAfterAOT>true</WasmStripILAfterAOT>
</PropertyGroup>
```

This setting trims away the IL code for most compiled methods, including methods from libraries and methods in the app. Not all compiled methods can be trimmed, as some are still required by the .NET interpreter at runtime.

To report a problem with the trimming option, open an issue on the `dotnet/runtime` GitHub repository.

Disable the trimming property if it prevents your app from running normally:

```xml
<WasmStripILAfterAOT>false</WasmStripILAfterAOT>
```

## Heap size for some mobile device browsers

When building a Blazor app that runs on the client and targets mobile device browsers, especially Safari on iOS, decreasing the maximum memory for the app with the MSBuild property `EmccMaximumHeapSize` may be required. For more information, see Host and deploy ASP.NET Core Blazor WebAssembly.

## Runtime relinking

One of the largest parts of a Blazor WebAssembly app is the WebAssembly-based .NET runtime (`dotnet.wasm`) that the browser must download when the app is first accessed by a user's browser. Relinking the .NET WebAssembly runtime trims unused runtime code and thus improves download speed.

Runtime relinking requires installation of the .NET WebAssembly build tools. For more information, see ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation.

With the .NET WebAssembly build tools installed, runtime relinking is performed automatically when an app is **published** in the `Release` configuration. The size reduction is particularly dramatic when disabling globalization. For more information, see ASP.NET Core Blazor globalization and localization.

> **Important:**
> Runtime relinking trims class instance JavaScript-invokable .NET methods unless they're protected. For more information, see Call .NET methods from JavaScript functions in ASP.NET Core Blazor.

## Single Instruction, Multiple Data (SIMD)

Blazor uses WebAssembly Single Instruction, Multiple Data (SIMD) to improve the throughput of vectorized computations by performing an operation on multiple pieces of data in parallel using a single instruction.

To disable SIMD, for example when targeting old browsers or browsers on mobile devices that don't support SIMD, set the `<WasmEnableSIMD>` property to `false` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <WasmEnableSIMD>false</WasmEnableSIMD>
</PropertyGroup>
```

For more information, see Configuring and hosting .NET WebAssembly applications: SIMD - Single instruction, multiple data and note that the guidance isn't versioned and applies to the latest public release.

## Related content

* ASP.NET Core Blazor WebAssembly browser developer tools diagnostics
* ASP.NET Core Blazor WebAssembly Event Pipe diagnostics
* What diagnostic tools are available in .NET Core?
* .NET diagnostic tools
