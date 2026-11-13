---
title: ".NET environment variables (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-environment-variables.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET environment variables

This article lists the environment variables used by .NET. Some environment variables are used by the .NET runtime, while others are only used by the .NET SDK and .NET CLI. Some environment variables are used by all three components.

## .NET runtime environment variables

This section defines the following environment variables:

- `DOTNET_SYSTEM_NET_HTTP_*`
- `DOTNET_SYSTEM_GLOBALIZATION_*`
- `DOTNET_SYSTEM_GLOBALIZATION_USENLS`
- `DOTNET_SYSTEM_NET_SOCKETS_*`
- `DOTNET_SYSTEM_NET_DISABLEIPV6`
- `DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER`
- `DOTNET_RUNNING_IN_CONTAINER` and `DOTNET_RUNNING_IN_CONTAINERS`
- `DOTNET_SYSTEM_CONSOLE_ALLOW_ANSI_COLOR_REDIRECTION`
- `DOTNET_SYSTEM_DIAGNOSTICS` and related variables
- `DOTNET_DiagnosticPorts`
- `DOTNET_DefaultDiagnosticPortSuspend`
- `DOTNET_EnableDiagnostics`
- `DOTNET_EnableDiagnostics_IPC`
- `DOTNET_EnableDiagnostics_Debugger`
- `DOTNET_EnableDiagnostics_Profiler`
- EventPipe variables

For more information about configuring the .NET runtime, see .NET runtime configuration settings.

### `DOTNET_SYSTEM_NET_HTTP_*`

There are several global HTTP environment variable settings:

- `DOTNET_SYSTEM_NET_HTTP_ENABLEACTIVITYPROPAGATION`
  - Indicates whether or not to enable activity propagation of the diagnostic handler for global HTTP settings.
- `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP2SUPPORT`
  - When set to `false` or `0`, disables HTTP/2 support, which is enabled by default.
- `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP3SUPPORT`
  - When set to `false` or `0`, disables HTTP/3 support, which is enabled by default.
- `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP2FLOWCONTROL_DISABLEDYNAMICWINDOWSIZING`
  - When set to `false` or `0`, overrides the default and disables the HTTP/2 dynamic window scaling algorithm.
- `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_FLOWCONTROL_MAXSTREAMWINDOWSIZE`
  - Defaults to 16 MB. When overridden, the maximum size of the HTTP/2 stream receive window cannot be less than 65,535.
- `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_FLOWCONTROL_STREAMWINDOWSCALETHRESHOLDMULTIPLIER`
  - Defaults to 1.0. When overridden, higher values result in a shorter window but slower downloads. Can't be less than 0.

### `DOTNET_SYSTEM_GLOBALIZATION_*`

- `DOTNET_SYSTEM_GLOBALIZATION_INVARIANT`: See set invariant mode.
- `DOTNET_SYSTEM_GLOBALIZATION_PREDEFINED_CULTURES_ONLY`: Specifies whether to load only predefined cultures.
- `DOTNET_SYSTEM_GLOBALIZATION_APPLOCALICU`: Indicates whether to use the app-local International Components of Unicode (ICU). For more information, see App-local ICU.

#### Set invariant mode

Applications can enable the invariant mode in any of the following ways:

1. In the project file:

    ```xml
    <PropertyGroup>
        <InvariantGlobalization>true</InvariantGlobalization>
    </PropertyGroup>
    ```

1. In the _runtimeconfig.json_ file:

    ```json
    {
        "runtimeOptions": {
            "configProperties": {
                "System.Globalization.Invariant": true
            }
        }
    }
    ```

1. By setting environment variable value `DOTNET_SYSTEM_GLOBALIZATION_INVARIANT` to `true` or `1`.

> **Important:**
> In .NET 9 and later versions, environment variables have a higher priority than values set in the project file or _runtimeconfig.json_.

For more information, see .NET Globalization Invariant Mode.

### `DOTNET_SYSTEM_GLOBALIZATION_USENLS`

This applies to Windows only. For globalization to use National Language Support (NLS), set `DOTNET_SYSTEM_GLOBALIZATION_USENLS` to either `true` or `1`. To not use it, set `DOTNET_SYSTEM_GLOBALIZATION_USENLS` to either `false` or `0`.

### `DOTNET_SYSTEM_NET_SOCKETS_*`

This section focuses on two `System.Net.Sockets` environment variables:

- `DOTNET_SYSTEM_NET_SOCKETS_INLINE_COMPLETIONS`
- `DOTNET_SYSTEM_NET_SOCKETS_THREAD_COUNT`

Socket continuations are dispatched to the `System.Threading.ThreadPool` from the event thread. This avoids continuations blocking the event handling. To allow continuations to run directly on the event thread, set `DOTNET_SYSTEM_NET_SOCKETS_INLINE_COMPLETIONS` to `1`. It's disabled by default.

> **Note:**
> This setting can make performance worse if there is expensive work that will end up holding onto the IO thread for longer than needed. Test to make sure this setting helps performance.

Using TechEmpower benchmarks that generate a lot of small socket reads and writes under a very high load, a single socket engine is capable of keeping busy up to thirty x64 and eight Arm64 CPU cores. The vast majority of real-life scenarios will never generate such a huge load (hundreds of thousands of requests per second),
and having a single producer is almost always enough. However, to be sure that extreme loads can be handled, you can use `DOTNET_SYSTEM_NET_SOCKETS_THREAD_COUNT` to override the calculated value. When not overridden, the following value is used:

- When `DOTNET_SYSTEM_NET_SOCKETS_INLINE_COMPLETIONS` is `1`, the `System.Environment.ProcessorCount` value is used.
- When `DOTNET_SYSTEM_NET_SOCKETS_INLINE_COMPLETIONS` is not `1`, `System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture` is evaluated:
  - When Arm or Arm64 the cores per engine value is set to `8`, otherwise `30`.
- Using the determined cores per engine, the maximum value of either `1` or `System.Environment.ProcessorCount` over the cores per engine.

### `DOTNET_SYSTEM_NET_DISABLEIPV6`

Helps determine whether or not Internet Protocol version 6 (IPv6) is disabled. When set to either `true` or `1`, IPv6 is disabled unless otherwise specified in the `System.AppContext`.

### `DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER`

You can use one of the following mechanisms to configure a process to use the older `HttpClientHandler`:

From code, use the `AppContext` class:

```csharp
AppContext.SetSwitch("System.Net.Http.UseSocketsHttpHandler", false);
```

The `AppContext` switch can also be set by a config file. For more information configuring switches, see AppContext for library consumers.

The same can be achieved via the environment variable `DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER`. To opt-out, set the value to either `false` or `0`.

> **Note:**
> Starting in .NET 5, this setting to use `System.Net.Http.HttpClientHandler` is no longer available.

### `DOTNET_RUNNING_IN_CONTAINER` and `DOTNET_RUNNING_IN_CONTAINERS`

The official .NET images (Windows and Linux) set the well-known environment variables:

- `DOTNET_RUNNING_IN_CONTAINER`
- `DOTNET_RUNNING_IN_CONTAINERS`

These values are used to determine when your ASP.NET Core workloads are running in the context of a container.

### `DOTNET_SYSTEM_CONSOLE_ALLOW_ANSI_COLOR_REDIRECTION`

When `System.Console.IsOutputRedirected` is `true`, you can emit ANSI color code by setting `DOTNET_SYSTEM_CONSOLE_ALLOW_ANSI_COLOR_REDIRECTION` to either `1` or `true`.

### `DOTNET_SYSTEM_DIAGNOSTICS` and related variables

- `DOTNET_SYSTEM_DIAGNOSTICS_DEFAULTACTIVITYIDFORMATISHIERARCHIAL`: When `1` or `true`, the default _Activity Id_ format is hierarchical.
- `DOTNET_SYSTEM_RUNTIME_CACHING_TRACING`: When running as Debug, tracing can be enabled when this is `true`.

### `DOTNET_DiagnosticPorts`

Configures alternate endpoints where diagnostic tools can communicate with the .NET runtime. See the Diagnostic Port documentation for more information.

### `DOTNET_DefaultDiagnosticPortSuspend`

Configures the runtime to pause during startup and wait for the _Diagnostics IPC ResumeStartup_ command from the specified diagnostic port when set to 1. Defaults to 0. See the Diagnostic Port documentation for more information.

### `DOTNET_EnableDiagnostics`

When set to `0`, disables debugging, profiling, and other diagnostics via the Diagnostic Port and can't be overridden by other diagnostics settings. Defaults to `1`.

### `DOTNET_EnableDiagnostics_IPC`

Starting with .NET 8, when set to `0`, disables the Diagnostic Port and can't be overridden by other diagnostics settings. Defaults to `1`.

### `DOTNET_EnableDiagnostics_Debugger`

Starting with .NET 8, when set to `0`, disables debugging and can't be overridden by other diagnostics settings. Defaults to `1`.

### `DOTNET_EnableDiagnostics_Profiler`

Starting with .NET 8, when set to `0`, disables profiling and can't be overridden by other diagnostics settings. Defaults to `1`.

### EventPipe variables

See EventPipe environment variables for more information.

- `DOTNET_EnableEventPipe`: When set to `1`, enables tracing via EventPipe.
- `DOTNET_EventPipeOutputPath`: The output path where the trace will be written.
- `DOTNET_EventPipeOutputStreaming`: When set to `1`, enables streaming to the output file while the app is running. By default trace information is accumulated in a circular buffer and the contents are written at app shutdown.
