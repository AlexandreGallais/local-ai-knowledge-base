---
title: "dotnet-trace diagnostic tool - .NET CLI (part 3 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/dotnet-trace.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-trace diagnostic tool - .NET CLI (part 3 of 5)

### Options

- **`--buffering-mode <Drop|Block>`**

  Available in `dotnet-trace` version 10.0.750501 and later.

  Sets how the runtime buffers events. Accepts `Drop` or `Block` (case-insensitive), and defaults to `Drop`.

  - `Drop` (default): Events are dropped when the buffer overflows.
  - `Block`: Threads emitting events wait until there is room in the buffer to store them. Events may still be dropped under uncommon error conditions such as memory exhaustion. `Block` requires a .NET 11+ target runtime and can make the traced application slower because event-emitting threads pause while the buffer stays full.

- **`--buffersize <size>`**

  Sets the size of the in-memory buffer, in megabytes. Default 256 MB.

  > **Note:**
  > If the target process emits events faster than they can be written to disk, this buffer may overflow and some events will be dropped. You can mitigate this problem by increasing the buffer size or reducing the number of events being recorded.

- **`--clreventlevel <clreventlevel>`**

  Verbosity of CLR events to be emitted. This option only applies when `--clrevents` is specified and not overridden by `--profile` or `--providers`.
  The following table shows the available event levels.

  | String value    | Numeric value |
  | --------------- | :-----------: |
  | `logalways`     |      `0`      |
  | `critical`      |      `1`      |
  | `error`         |      `2`      |
  | `warning`       |      `3`      |
  | `informational` |      `4`      |
  | `verbose`       |      `5`      |

- **`--clrevents <clrevents>`**

  A list of CLR runtime provider keywords to enable separated by `+` signs. This is a simple mapping that lets you specify event keywords via string aliases rather than their hex values. For example, `dotnet-trace collect --providers Microsoft-Windows-DotNETRuntime:3:4` requests the same set of events as `dotnet-trace collect --clrevents gc+gchandle --clreventlevel informational`. If the CLR runtime provider `Microsoft-Windows-DotNETRuntime` is also enabled through `--providers` or `--profile`, this option is ignored. The following table shows the list of available keywords:

  | Keyword string alias            | Keyword hex value |
  |---------------------------------|-------------------|
  | `gc`                            | `0x1`             |
  | `gchandle`                      | `0x2`             |
  | `assemblyloader`                | `0x4`             |
  | `loader`                        | `0x8`             |
  | `jit`                           | `0x10`            |
  | `ngen`                          | `0x20`            |
  | `startenumeration`              | `0x40`            |
  | `endenumeration`                | `0x80`            |
  | `security`                      | `0x400`           |
  | `appdomainresourcemanagement`   | `0x800`           |
  | `jittracing`                    | `0x1000`          |
  | `interop`                       | `0x2000`          |
  | `contention`                    | `0x4000`          |
  | `exception`                     | `0x8000`          |
  | `threading`                     | `0x10000`         |
  | `jittedmethodiltonativemap`     | `0x20000`         |
  | `overrideandsuppressngenevents` | `0x40000`         |
  | `type`                          | `0x80000`         |
  | `gcheapdump`                    | `0x100000`        |
  | `gcsampledobjectallocationhigh` | `0x200000`        |
  | `gcheapsurvivalandmovement`     | `0x400000`        |
  | `managedheapcollect`            | `0x800000`        |
  | `gcheapandtypenames`            | `0x1000000`       |
  | `gcsampledobjectallocationlow`  | `0x2000000`       |
  | `perftrack`                     | `0x20000000`      |
  | `stack`                         | `0x40000000`      |
  | `threadtransfer`                | `0x80000000`      |
  | `debugger`                      | `0x100000000`     |
  | `monitoring`                    | `0x200000000`     |
  | `codesymbols`                   | `0x400000000`     |
  | `eventsource`                   | `0x800000000`     |
  | `compilation`                   | `0x1000000000`    |
  | `compilationdiagnostic`         | `0x2000000000`    |
  | `methoddiagnostic`              | `0x4000000000`    |
  | `typediagnostic`                | `0x8000000000`    |
  | `jitinstrumentationdata`        | `0x10000000000`   |
  | `profiler`                      | `0x20000000000`   |
  | `waithandle`                    | `0x40000000000`   |
  | `allocationsampling`            | `0x80000000000`   |

  You can read about the CLR provider in more detail on the .NET runtime provider reference documentation.

- **`--dsrouter {ios|ios-sim|android|android-emu}**

  Starts dotnet-dsrouter and connects to it. Requires dotnet-dsrouter to be installed. Run `dotnet-dsrouter -h` for more information.

- **`--format {Chromium|NetTrace|Speedscope}`**

  Sets the output format for the trace file conversion. The default is `NetTrace`.

- **`-n, --name <name>`**

  The name of the process to collect the trace from.

  > **Note:**
  > On Linux and macOS, using this option requires the target application and `dotnet-trace` to share the same `TMPDIR` environment variable. Otherwise, the command will time out.

- **`--diagnostic-port <port-address[,(listen|connect)]>`**

  Sets the diagnostic port used to communicate with the process to be traced. dotnet-trace and the .NET runtime inside the target process must agree on the port-address, with one listening and the other connecting. dotnet-trace automatically determines the correct port when attaching using the `--process-id` or `--name` options, or when launching a process using the `-- <command>` option. It's usually only necessary to specify the port explicitly when waiting for a process that will start in the future or communicating to a process that is running inside a container that isn't part of the current process namespace.

  The `port-address` differs by OS:

  - Linux and macOS - a path to a Unix domain socket such as `/foo/tool1.socket`.
  - Windows - a path to a named pipe such as `\\.\pipe\my_diag_port1`.
  - Android, iOS, and tvOS - an IP:port such as `127.0.0.1:9000`.

  By default, `dotnet-trace` listens at the specified address. You can request `dotnet-trace` to connect instead by appending `,connect` after the address. For example, `--diagnostic-port /foo/tool1.socket,connect` will connect to a .NET runtime process that is listening to the `/foo/tool1.socket` Unix domain socket.

  To learn how to use this option to collect a trace from app startup, see Use diagnostic port to collect a trace from app startup.

- **`--duration <time-to-run>`**

  The time for the trace to run. Use the `dd:hh:mm:ss` format. For example `00:00:00:05` will run it for 5 seconds.

- **`-o|--output <trace-file-path>`**

  The output path for the collected trace data. If not specified it defaults to `<appname>_<yyyyMMdd>_<HHmmss>.nettrace`, for example, `myapp_20210315_111514.nettrace``.

- **`-p|--process-id <PID>`**

  The process ID to collect the trace from.

  > **Note:**
  > On Linux and macOS, using this option requires the target application and `dotnet-trace` to share the same `TMPDIR` environment variable. Otherwise, the command will time out.

- **`--profile <list-of-comma-separated-profile-names>`**

  A profile is a predefined set of provider configurations for common tracing scenarios. Multiple profiles can be specified at a time, delimited by commas. Providers configured through `--providers` override the profile's configuration. Similarly, if any profile configures the CLR runtime provider, it will override any configurations prescribed through `--clrevents`.

  When `--profile`, `--providers`, and `--clrevents` are all omitted, `dotnet-trace collect` enables profiles `dotnet-common` and `dotnet-sampled-thread-time` by default.

  Available profiles:

  | Profile      | Description                                              |
  |--------------|----------------------------------------------------------|
  | `dotnet-common` | Lightweight .NET runtime diagnostics designed to stay low overhead.Includes GC, AssemblyLoader, Loader, JIT, Exceptions, Threading, JittedMethodILToNativeMap, and Compilation eventsEquivalent to `--providers "Microsoft-Windows-DotNETRuntime:0x100003801D:4"`. |
  | `dotnet-sampled-thread-time` | Samples .NET thread stacks at the runtime's default rate (~1000 Hz, every 1 ms in builds with multithreading enabled) to estimate how much wall clock time code is using. |
  | `gc-verbose` | Tracks GC collections and samples object allocations.    |
  | `gc-collect` | Tracks GC collections only at very low overhead.         |
  | `database`   | Captures ADO.NET and Entity Framework database commands. |

  > **Tip:**
  > The sampling rate used by `dotnet-sampled-thread-time` can be changed with the `DOTNET_EventPipeThreadSamplingRate` environment variable (value in milliseconds). This setting is process-global and affects all EventPipe sessions. See Trace using environment variables for details.

  > **Note:**
  > In past versions of the dotnet-trace tool, the collect verb supported a profile called `cpu-sampling`. This profile was removed because the name was misleading. It sampled all threads regardless of their CPU usage. You can achieve a similar result now using `--profile dotnet-sampled-thread-time,dotnet-common`. If you need to match the former `cpu-sampling` behavior exactly, use `--profile dotnet-sampled-thread-time --providers "Microsoft-Windows-DotNETRuntime:0x14C14FCCBD:4"`.

- **`--providers <list-of-comma-separated-providers>`**

  A comma-separated list of `EventPipe` providers to be enabled. These providers supplement any providers implied by `--profile <list-of-comma-separated-profile-names>`. If there's any inconsistency for a particular provider, this configuration takes precedence over the implicit configuration from `--profile` and `--clrevents`.

  This list of providers is in the form `Provider[,Provider]`:

  - `Provider` is in the form: `KnownProviderName[:Flags[:Level[:KeyValueArgs]]]`
  - `KeyValueArgs` is in the form: `key1=value1`

  To learn more about some of the well-known providers in .NET, refer to Well-known Event Providers.

- **`-- <command>` (for target applications running .NET 5 or later)**

  After the collection configuration parameters, the user can append `--` followed by a command to start a .NET application with at least a 5.0 runtime. This may be helpful when diagnosing issues that happen early in the process, such as startup performance issue or assembly loader and binder errors.

  > **Note:**
  > Using this option monitors the first .NET process that communicates back to the tool, which means if your command launches multiple .NET applications, it will only collect the first app. Therefore, it is recommended you use this option on self-contained applications, or using the `dotnet exec <app.dll>` option.

- **`--show-child-io`**

  Shows the input and output streams of a launched child process in the current console.

- **`--resume-runtime`**

  Resume runtime once session has been initialized, defaults to true. Disable resume of runtime using --resume-runtime:false.

- **`--stopping-event-provider-name`**

  A string, parsed as-is, that will stop the trace upon hitting an event with the matching provider name. For a more specific stopping event, additionally provide `--stopping-event-event-name` and/or `--stopping-event-payload-filter`. for example, `--stopping-event-provider-name Microsoft-Windows-DotNETRuntime` to stop the trace upon hitting the first event emitted by the `Microsoft-Windows-DotNETRuntime` event provider.

- **`--stopping-event-event-name`**

  A string, parsed as-is, that will stop the trace upon hitting an event with the matching event name. Requires `--stopping-event-provider-name` to be set. For a more specific stopping event, additionally provide `--stopping-event-payload-filter`. for example, `--stopping-event-provider-name Microsoft-Windows-DotNETRuntime --stopping-event-event-name Method/JittingStarted` to stop the trace upon hitting the first `Method/JittingStarted` event emitted by the `Microsoft-Windows-DotNETRuntime` event provider.

- **`--stopping-event-payload-filter`**

  A string, parsed as [payload_field_name]:[payload_field_value] pairs separated by commas, that will stop the trace upon hitting an event containing all specified payload pairs. Requires `--stopping-event-provider-name` and `--stopping-event-event-name` to be set. for example, `--stopping-event-provider-name Microsoft-Windows-DotNETRuntime --stopping-event-event-name Method/JittingStarted --stopping-event-payload-filter MethodNameSpace:Program,MethodName:OnButtonClick` to stop the trace upon the first `Method/JittingStarted` event for the method `OnButtonClick` in the `Program` namespace emitted by the `Microsoft-Windows-DotNETRuntime` event provider.

> **Note:**
>
> - Stopping the trace might take a long time (up to minutes) for large applications. The runtime needs to send over the type cache for all managed code that was captured in the trace.
> - To collect a trace using `dotnet-trace`, it needs to be run as the same user as the user running the target process or as root. Otherwise, the tool will fail to establish a connection with the target process.
> - If you experience an unhandled exception while running `dotnet-trace collect`, this results in an incomplete trace. If finding the root cause of the exception is your priority, navigate to Collect dumps on crash. As a result of the unhandled exception, the trace is truncated when the runtime shuts down to prevent other undesired behavior such as a hang or data corruption. Even though the trace is incomplete, you can still open it to see what happened leading up to the failure. However, it will be missing Rundown information (this happens at the end of a trace) so stacks might be unresolved (depending on what providers were turned on). Open the trace by executing PerfView with the `/ContinueOnError` flag at the command line. The logs will also contain the location the exception was fired.
> - When you specify a stopping event through the `--stopping-event-*` options, as the EventStream is being parsed asynchronously, there will be some events that pass <example-value> between the time a trace event matching the specified stopping event options is parsed and the EventPipeSession is stopped.
