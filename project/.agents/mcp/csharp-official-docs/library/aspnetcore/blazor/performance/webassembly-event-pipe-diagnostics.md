---
title: "ASP.NET Core Blazor WebAssembly Event Pipe diagnostics"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/performance/webassembly-event-pipe-diagnostics.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly Event Pipe diagnostics

-->

This article describes diagnostic tools and how to use them in Blazor WebAssembly apps.

## Prerequisite for all scenarios

Install the .NET WebAssembly build tools:

```dotnetcli
dotnet workload install wasm-tools
```

## How a WebAssembly app uses memory and how to troubleshoot memory leaks

In the app's project file (`.csproj`), add following properties for the duration of the investigation:

```xml
<PropertyGroup>
  <EnableDiagnostics>true</EnableDiagnostics>
</PropertyGroup>
```

> **Warning:**
> Don't enable diagnostics in production because it has a negative performance impact.

Build your app with the `wasm-tools` workload.

Open the app in a browser and navigate to problematic pages or components.

Take a managed memory dump by calling `collectGcDump` JavaScript API:

```javascript
globalThis.getDotnetRuntime(0).collectGcDump();
```

Call the preceding API from either a browser developer tools console or JavaScript code of the app.

A `.nettrace` file is downloaded from the browser into a local folder, usually the `Downloads` folder on Windows.

Convert the dump to `.gcdump` format using the `dotnet-gcdump` tool. To view the converted `.gcdump` file, use Visual Studio or PrefView.

For more information, see View the GC dump captured from dotnet-gcdump.

## How a WebAssembly app uses CPU and how to find slow or hot methods

In the app's project file (`.csproj`), add following properties for the duration of the investigation:

```xml
<PropertyGroup>
  <EnableDiagnostics>true</EnableDiagnostics>
  <!-- Disable debugger -->
  <WasmDebugLevel>0</WasmDebugLevel>
  <!-- Sampling in all methods, see below for filtering options -->
  <WasmPerformanceInstrumentation>all</WasmPerformanceInstrumentation>
</PropertyGroup>
```

> **Warning:**
> Don't enable diagnostics in production because it has a negative performance impact.

Build the app with the `wasm-tools` workload.

Open the app in a browser and navigate to problematic pages or components.

Start colllecting CPU samples for 60 seconds by calling the `collectCpuSamples` JavaScript API:

```javascript
globalThis.getDotnetRuntime(0).collectCpuSamples({durationSeconds: 60});
```

Call the preceding API from either a browser developer tools console or JavaScript code of the app.

Start using the app to run problematic code.

After the predefined period, the browser downloads a `.nettrace` file into a local folder, usually the `Downloads` folder on Windows. To view the `.nettrace` file, use Visual Studio or PrefView.

For more information, see Use EventPipe to trace your .NET application.

The `Timing-Allow-Origin` HTTP header allows for more precise time measurements.

## How to observe metrics emitted by a WebAssembly app

In the app's project file (`.csproj`), add following properties for the duration of the investigation:

```xml
<PropertyGroup>
  <EnableDiagnostics>true</EnableDiagnostics>
  <MetricsSupport>true</MetricsSupport>
  <EventSourceSupport>true</EventSourceSupport>
</PropertyGroup>
```

> **Warning:**
> Don't enable diagnostics in production because it has a negative performance impact.

Build the app with the `wasm-tools` workload.

Open the app in a browser and navigate to problematic pages or components.

Start colllecting metrics for 60 seconds by calling the `collectMetrics` JavaScript API:

```javascript
globalThis.getDotnetRuntime(0).collectMetrics({durationSeconds: 60});
```

Call the preceding API from either a browser developer tools console or JavaScript code of the app.

After the predefined period, the browser downloads a `.nettrace` file into a local folder, usually the `Downloads` folder on Windows. To view the `.nettrace` file, use Visual Studio or PrefView.

For more information, see Use EventPipe to trace your .NET application.

## MSBuild properties that enable diagnostic integration

Property | Default | Set value to… | Description
--- | :---: | :---: | ---
`<EnableDiagnostics>` | `false` | `true` | Enables support for WebAssembly performance tracing.
`<WasmPerformanceInstrumentation>` | No value | See table&dagger; | Enables instrumentation necessary for the sampling profiler. The property follows the :::no-loc text="callspec"::: syntax. &dagger;For permissible values, see the following table.
`<MetricsSupport>` | `false` | `true` | Enables `System.Diagnostics.Metrics` support. For more information, see the `System.Diagnostics.Metrics` namespace.
`<EventSourceSupport>` | `false`| `true` | Enables `EventPipe` support. For more information, see Diagnostics and instrumentation: Observability and telemetry.

The following table describes permissable `<WasmPerformanceInstrumentation>` values.

`<WasmPerformanceInstrumentation>` value | Description
--- | ---
`all` | All assemblies
`program` | Entry point assembly
`{ASSEMBLY}` | Specifies an assembly (`{ASSEMBLY}`)
`M:Type:{METHOD}` | Specifies a method (`{METHOD}`)
`N:{NAMESPACE}` | Specifies a namespace (`{NAMESPACE}`)
`T:{TYPE}` | Specifies a type (`{TYPE}`)
`+EXPR` | Includes expression
`-EXPR` | Excludes expression

Your code should yield to main browser loop often to allow the trace to be collected. When executing long running loops, the internal diagnostic buffers could overflow.

> **Caution:**
> Enabling profilers and diagnostic tools has negative size and performance impacts, so don't publish an app for production with profilers enabled.

## Related content

* EventPipe is a runtime component used to collect tracing data, similar to ETW and perf_events.
* What diagnostic tools are available in .NET Core?
* .NET diagnostic tools
* `dotnet/diagnostics` GitHub repository
* `Microsoft.Diagnostics.NETCore.Client` NuGet package
