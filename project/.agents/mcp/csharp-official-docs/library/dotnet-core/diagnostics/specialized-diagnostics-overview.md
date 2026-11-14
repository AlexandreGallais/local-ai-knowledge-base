---
title: "Specialized Diagnostics"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/specialized-diagnostics-overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Specialized diagnostics

If debugging or observability is not sufficient, .NET supports additional diagnostic mechanisms.

## Tracing with Event Source

Event Source provides the ability to collect detailed diagnostic information about what's happening inside .NET processes. It includes telemetry information for the runtime, GC, libraries, and application code.

Event Source data can be collected in-process using the `System.Diagnostics.Tracing.EventListener` API or with external diagnostics tools such as Visual Studio, dotnet-monitor, dotnet-trace, PerfView, and the Perfcollect scripts. Using the external tools to collect event source data in traces is commonly used for performance analysis.

### EventPipe

EventPipe is a runtime component that can be used to collect tracing data, similar to ETW or LTTng. The goal of EventPipe is to allow .NET developers to easily trace their .NET applications without having to rely on platform-specific, OS-native components, such as ETW or LTTng.

EventPipe is the mechanism behind many of the diagnostic tools. It can be used for consuming events emitted by the runtime as well as custom events written with EventSource.

## Dumps

A dump is a file that contains a snapshot of the process at the time of dump creation. Dumps can be useful for examining the state of your application for debugging purposes.

## Symbols

Symbols are a mapping between the source code and the binary produced by the compiler. These are commonly used by .NET debuggers and tracing tools to resolve source line numbers, local variable names, and other types of diagnostic information.

## Diagnostic port

The .NET runtime exposes a service endpoint that allows other processes to send diagnostic commands and receive responses over an IPC channel. This endpoint is called a *diagnostic port*. Commands can be sent to the diagnostic port to:

- Capture a memory dump.
- Start an EventPipe trace.
- Request the command line used to launch the app.

## DiagnosticSource & DiagnosticListener

DiagnosticSource is a module that allows code to be instrumented for production-time logging of rich data payloads for consumption within the process that was instrumented. At runtime, consumers can dynamically discover data sources and subscribe to the ones of interest. `System.Diagnostics.DiagnosticSource` was designed to allow in-process tools to access rich data, such as by OpenTelemetry instrumentation libraries. DiagnosticSource data can also be egressed via EventPipe, which enables rich diagnostic data to be collected by dedicated tools.

## Collect diagnostics in containers

The same diagnostics tools that are used in non-containerized Linux environments can also be used to collect diagnostics in containers. There are just a few usage changes needed to make sure the tools work in a Docker container.

## See also

- Debug high CPU usage
- Collect a performance trace in Linux with PerfCollect
