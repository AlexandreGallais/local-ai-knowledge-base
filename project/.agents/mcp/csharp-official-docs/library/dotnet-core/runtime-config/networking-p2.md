---
title: "Networking config settings (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-config/networking.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Networking config settings (part 2 of 2)

## HttpListener kernel response buffering (Windows)

When enabled, `System.Net.HttpListener` buffers response data in the kernel via HTTP.sys. Kernel buffering can significantly improve throughput over high-latency connections for applications that use synchronous I/O or asynchronous I/O with at most one outstanding write at a time. Don't enable this setting for applications with multiple concurrent outstanding writes.

> **Note:**
> Enabling kernel response buffering can result in higher CPU and memory usage by HTTP.sys.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.HttpListener.EnableKernelResponseBuffering` | `false` - disabled (default)`true` - enabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.
