---
title: "Understanding different metric APIs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/compare-metric-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Metric APIs comparison

When adding new metric instrumentation to a .NET app or library, there are various different APIs to choose from. This article
will help you understand the options.

## .NET APIs

### System.Diagnostics.Metrics

System.Diagnostics.Metrics APIs are the newest cross-platform APIs, and were designed in close collaboration with the
OpenTelemetry project. If you don't have a specific reason to use one of the older APIs covered below, System.Diagnostics.Metrics is
a good default choice for new work. It's available by targeting .NET 6+, or in older .NET Core and .NET Framework apps by adding a reference to the .NET
System.Diagnostics.DiagnosticsSource 6.0+ NuGet package. In addition to
aiming at broad compatibility, this API adds support for many things that were lacking from earlier APIs, such as:

- Histograms and percentiles
- Multi-dimensional metrics
- Strongly typed high-performance listener API
- Multiple simultaneous listeners
- Listener access to unaggregated measurements

Although this API was designed to work well with OpenTelemetry and its growing ecosystem of pluggable vendor integration libraries, applications also have the option to use the .NET built-in listener APIs directly. With this option, you can create custom metric tooling without taking any external library dependencies.

### PerformanceCounter

`System.Diagnostics.PerformanceCounter` APIs are the oldest .NET metric APIs. They're only supported on Windows and provide
a managed wrapper for Windows OS Performance Counter technology. They are available in all supported versions of .NET.

These APIs are provided primarily for compatibility; the .NET team
considers this a stable area that's unlikely to receive further improvement aside from bug fixes. These APIs are not suggested
for new development projects unless the project is Windows-only and you have a desire to use Windows Performance Counter tools.

For more information, see Performance counters in .NET Framework.

### EventCounters

The EventCounters were the first .NET APIs to support a cross-platform metrics experience. The APIs are available by targeting .NET Core 3.1+, and a small subset is available on .NET Framework 4.7.1
and later. These APIs are fully supported and still used by key .NET libraries, but they
have less functionality than the newer `System.Diagnostics.Metrics` APIs. EventCounters are able to report
rates of change and averages, but do not support histograms and percentiles. There is also no support for multi-dimensional metrics. Custom
tooling is possible via the `System.Diagnostics.Tracing.EventListener` API, though it is not strongly typed, only gives
access to the aggregated values, and has limitations when using more than one listener simultaneously. EventCounters are supported directly by
Visual Studio, Application Insights,
dotnet-counters, and dotnet-monitor. For third-party
tool support, check the vendor or project documentation to see if it's available.

The .NET team doesn't expect to make new investments on this API going forward, but as with `PerformanceCounters`, the API remains supported for all current and future users.

## Third-party APIs

Most application performance monitoring (APM) vendors such as AppDynamics,
Application Insights,
DataDog, DynaTrace, and
NewRelic include metrics APIs as part of their instrumentation libraries.
Prometheus and AppMetrics are also popular .NET OSS projects.
To learn more about these projects, check the various project websites.
