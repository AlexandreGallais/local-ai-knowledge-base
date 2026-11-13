---
title: "dotnet-trace diagnostic tool - .NET CLI (part 4 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/dotnet-trace.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet-trace diagnostic tool - .NET CLI (part 4 of 5)

## dotnet-trace collect-linux

Collects diagnostic traces using perf_events, a Linux OS technology. `collect-linux` enables the following additional features over `collect`.

| Feature                                  | `collect` | `collect-linux`                   |
|------------------------------------------|-----------|-----------------------------------|
| Supported OS                             | Any       | Linux only, kernel version >= 6.4 |
| Requires Admin/Root privilege            | No        | Yes                               |
| Trace all processes simultaneously       | No        | Supported                         |
| Capture native library and kernel events | No        | Supported                         |
| Event callstacks include native frames   | No        | Yes                               |

### Prerequisites

- Linux kernel with `CONFIG_USER_EVENTS=y` support (kernel 6.4+)
- tracefs mounted (defaults to `/sys/kernel/tracing`)
- Root permissions
- .NET 10+

> **Note:**
> The `collect-linux` verb only runs on Linux x64 and Linux Arm64 environments that have glibc version 2.27 or later.
> All of the .NET 10 officially supported Linux distros support this requirement except Alpine 3.22.
> A quick way to check the version of a system's libc is with the command `ldd --version` or by executing the libc library directly.

> **Tip:**
> To check if your kernel has `user_events` support, run `zgrep CONFIG_USER_EVENTS /proc/config.gz`. You can also look for `user_events_data` under your tracefs mount (defaults to `/sys/kernel/tracing/user_events_data`).

### Synopsis

```dotnetcli
dotnet-trace collect-linux
    [-h|--help]

    # Provider/Event Specification
    [--providers <list-of-comma-separated-providers>]
    [--clreventlevel <clreventlevel>]
    [--clrevents <clrevents>]
    [--perf-events <list-of-perf-events>]
    [--profile <list-of-comma-separated-profile-names>]

    # Trace Collection
    [-o|--output <trace-file-path>]
    [--duration dd:hh:mm:ss]

    # .NET Process Target (Optional)
    [-n, --name <name>]
    [-p|--process-id <pid>]

    # Probe mode
    [--probe]
```

### Default collection behavior

When `--providers`, `--profile`, `--clrevents`, and `--perf-events` aren’t specified, `collect-linux` enables these profiles by default:

- `dotnet-common` — lightweight .NET runtime diagnostics.
- `cpu-sampling` — kernel CPU sampling.

By default, all processes on the machine are traced. To trace only one process, use `-n, --name <name>` or `-p|--process-id <PID>`.

### Options

#### Provider/Event Specification Options

- **`--providers <list-of-comma-separated-providers>`**

  A comma-separated list of `EventPipe` providers to be enabled. These providers supplement any providers implied by `--profile <list-of-comma-separated-profile-names>`. If there's any inconsistency for a particular provider, this configuration takes precedence over the implicit configuration from `--profile` and `--clrevents`.

  This list of providers is in the form `Provider[,Provider]`:

  - `Provider` is in the form: `KnownProviderName[:Flags[:Level[:KeyValueArgs]]]`
  - `KeyValueArgs` is in the form: `key1=value1`

  To learn more about some of the well-known providers in .NET, see Well-known Event Providers.

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

    A list of CLR runtime provider keywords to enable separated by `+` signs. This is a simple mapping that lets you specify event keywords via string aliases rather than their hex values. For example, `dotnet-trace collect-linux --providers Microsoft-Windows-DotNETRuntime:3:4` requests the same set of events as `dotnet-trace collect-linux --clrevents gc+gchandle --clreventlevel informational`. If the CLR runtime provider `Microsoft-Windows-DotNETRuntime` is also enabled through `--providers` or `--profile`, this option is ignored. The following table shows the list of available keywords:

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

- **`--perf-events <list-of-perf-events>`**

  A comma-separated list of perf events to include in the trace. Available events can be found under tracefs, which is typically mounted at `/sys/kernel/tracing`, through `available_events` for all available events or through the `events/` subdirectory for categorized events.

  Example: `--perf-events syscalls:sys_enter_execve,sched:sched_switch,sched:sched_wakeup`

- **`--profile <list-of-comma-separated-profile-names>`**

  A profile is a predefined set of provider configurations for common tracing scenarios. Multiple profiles can be specified at a time, delimited by commas. Providers configured through `--providers` override the profile's configuration. Similarly, if any profile configures the CLR runtime provider, it will override any configurations prescribed through `--clrevents`.

  When `--profile`, `--providers`, `--clrevents`, and `--perf-events` are all omitted, `dotnet-trace collect-linux` enables profiles `dotnet-common` and `cpu-sampling` by default.

  Available profiles:

  | Profile      | Description                                              |
  |--------------|----------------------------------------------------------|
  | `dotnet-common` | Lightweight .NET runtime diagnostics designed to stay low overhead.Includes GC, AssemblyLoader, Loader, JIT, Exceptions, Threading, JittedMethodILToNativeMap, and Compilation eventsEquivalent to `--providers "Microsoft-Windows-DotNETRuntime:0x100003801D:4"`. |
  | `cpu-sampling` | Kernel CPU sampling (perf-based), emitted as `Universal.Events/cpu`, for precise on-CPU attribution. |
  | `thread-time` | Kernel thread context switches, emitted as `Universal.Events/cswitch`, for on/off-CPU and scheduler analysis. |
  | `gc-verbose` | Tracks GC collections and samples object allocations.    |
  | `gc-collect` | Tracks GC collections only at very low overhead.         |
  | `database`   | Captures ADO.NET and Entity Framework database commands. |

#### Trace collection options

- **`-o|--output <trace-file-path>`**

  The output path for the collected trace data. If not specified, it defaults to `trace_<yyyyMMdd>_<HHmmss>.nettrace` for the default machine-wide trace and to `<appname>_<yyyyMMdd>_<HHmmss>.nettrace` for a process-specific trace (`--name` or `--process-id`)

- **`--duration <time-to-run>`**

  The time for the trace to run. Use the `dd:hh:mm:ss` format. For example `00:00:00:05` will run it for 5 seconds.

#### .NET process target options

See Default collection behavior

- **`-n, --name <name>`**

  The name of the process to collect the trace from.

- **`-p|--process-id <PID>`**

  The process ID to collect the trace from.

#### Probe mode options

- **`--probe [-n|--name] [-p|--process-id] [-o|--output <stdout|output-filename>]`**

  Probe .NET processes for support of the EventPipe UserEvents IPC command used by collect-linux, without collecting a trace. Results list supported processes first. Use '-o stdout' to print CSV (pid,processName,supportsCollectLinux) to the console, or '-o output-filename' to write the CSV. Probe a single process with -n|--name or -p|--process-id.

  As running `collect-linux` in probe mode does not collect a trace, it does not require root permissions to run. It does not provide validation of the prerequisites, and .NET processes running on preview versions of .NET Runtime '10.0.0' are considered unsupported.

> **Note:**
> To collect a trace using `dotnet-trace collect-linux`, it needs to be run with root permissions (`CAP_PERFMON`/`CAP_SYS_ADMIN`). Otherwise, the tool will fail to collect events.

## dotnet-trace convert

Converts `nettrace` traces to alternate formats for use with alternate trace analysis tools.

### Synopsis

```dotnetcli
dotnet-trace convert [<input-filename>] [--format <Chromium|NetTrace|Speedscope>] [-h|--help] [-o|--output <output-filename>]
```

### Arguments

- **``**

  Input trace file to be converted. Defaults to *trace.nettrace*.

### Options

- **`--format <Chromium|NetTrace|Speedscope>`**

  Sets the output format for the trace file conversion.

- **`-o|--output <output-filename>`**

  Output filename. Extension of target format will be added.

> **Note:**
> Converting `nettrace` files to `chromium` or `speedscope` files is irreversible. `speedscope` and `chromium` files don't have all the information necessary to reconstruct `nettrace` files. However, the `convert` command preserves the original `nettrace` file, so don't delete this file if you plan to open it in the future.

## dotnet-trace ps

 Lists the dotnet processes that traces can be collected from.
 `dotnet-trace` 6.0.320703 and later, also display the command-line arguments that each process was started with, if available.

> **Note:**
> To get full information for enumerated 64-bit processes, you need to use a 64-bit version of the `dotnet-trace` tool.

### Synopsis

```dotnetcli
dotnet-trace ps [-h|--help]
```

### Example

Suppose you start a long-running app using the command ```dotnet run --configuration Release```. In another window, you run the ```dotnet-trace ps``` command. The output you'll see is as follows. The command-line arguments, if available, are shown in `dotnet-trace` version 6.0.320703 and later.

```dotnetcli
> dotnet-trace ps

  21932 dotnet     C:\Program Files\dotnet\dotnet.exe   run --configuration Release
  36656 dotnet     C:\Program Files\dotnet\dotnet.exe
```

## dotnet-trace list-profiles

Lists pre-built tracing profiles with a description of what providers and filters are in each profile.

### Synopsis

```dotnetcli
dotnet-trace list-profiles [-h|--help]
```

## dotnet-trace report

Creates a report into stdout from a previously generated trace.

### Synopsis

```dotnetcli
dotnet-trace report [-h|--help] <tracefile> [command]
```

### Arguments

- **`<tracefile>`**

  The file path for the trace being analyzed.

### Commands

#### dotnet-trace report topN

Finds the top N methods that have been on the callstack the longest.

##### Synopsis

```dotnetcli
dotnet-trace report <tracefile> topN [-n|--number <n>] [--inclusive] [-v|--verbose] [-h|--help]
```

##### Options

- **`-n|--number <n>`**

Gives the top N methods on the callstack.

- **`--inclusive`**

Output the top N methods based on inclusive time. If not specified, exclusive time is used by default.

- **`-v|--verbose`**

Output the parameters of each method in full. If not specified, parameters will be truncated.

## Collect a trace with dotnet-trace

To collect traces using `dotnet-trace collect`:

- Get the process identifier (PID) of the .NET application to collect traces from.

  - On Windows, you can use Task Manager or the `tasklist` command, for example.
  - On Linux, for example, the `ps` command.
  - dotnet-trace ps

- Run the following command:

  ```dotnetcli
  dotnet-trace collect --process-id <PID>
  ```

  The preceding command generates output similar to the following:

  ```output
  No profile or providers specified, defaulting to trace profiles 'dotnet-common' + 'dotnet-sampled-thread-time'.

  Provider Name                           Keywords            Level               Enabled By
  Microsoft-Windows-DotNETRuntime         0x000000100003801D  Informational(4)    --profile
  Microsoft-DotNETCore-SampleProfiler     0x0000F00000000000  Informational(4)    --profile

  Process        : <full-path-to-process-being-trace>
  Output File    : <process>_20251007_154557.nettrace
  [00:00:00:02]   Recording trace 178.172  (KB)
  Press <Enter> or <Ctrl+C> to exit...
  Stopping the trace. This may take several minutes depending on the application being traced.

  Trace completed.
  ```

- Stop collection by pressing the `Enter` key. `dotnet-trace` will finish logging events to the `.nettrace` file.
