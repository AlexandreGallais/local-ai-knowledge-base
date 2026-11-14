---
title: "dotnet-counters diagnostic tool - .NET CLI (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/dotnet-counters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Investigate performance counters (dotnet-counters)

**This article applies to:** ✔️ `dotnet-counters` version 9.0.652701 and later versions.

Counters can be read from applications running .NET 5 or later.

## Install

There are three ways to download and use `dotnet-counters`:

- **One-shot execution (recommended):**

  Starting with .NET 10.0.100, you can run `dotnet-counters` without permanent installation using `dnx`:

  ```dotnetcli
  dnx dotnet-counters [options]
  ```

  For example:

  ```dotnetcli
  dnx dotnet-counters monitor --process-id 1234
  ```

  This approach automatically downloads and runs the latest version without permanently modifying your system.

- **dotnet global tool:**

  To install the latest release version of the `dotnet-counters` NuGet package for frequent use, use the dotnet tool install command:

  ```dotnetcli
  dotnet tool install --global dotnet-counters
  ```

  This command installs a `dotnet-counters` binary to your .NET SDK Tools path, which
you can add to your PATH to easily invoke globally-installed tools.

- **Direct download:**

  Download the tool executable that matches your platform:

  | OS  | Platform |
  | --- | -------- |
  | Windows | x86 \| x64 \| Arm \| Arm-x64 |
  | Linux   | x64 \| Arm \| Arm64 \| musl-x64 \| musl-Arm64 |

> **Note:**
> To use `dotnet-counters` on an x86 app, you need a corresponding x86 version of the tool.

## Synopsis

```dotnetcli
dotnet-counters [-h|--help] [--version] <command>
```

## Description

`dotnet-counters` is a performance monitoring tool for ad-hoc health monitoring and first-level performance investigation. It can observe performance counter values that are published via the `System.Diagnostics.Tracing.EventCounter` API or the `System.Diagnostics.Metrics.Meter` API. For example, you can quickly monitor things like the CPU usage or the rate of exceptions being thrown in your .NET Core application to see if there's anything suspicious before diving into more serious performance investigation using `PerfView` or `dotnet-trace`.

## Options

- **`--version`**

  Displays the version of the `dotnet-counters` utility.

- **`-h|--help`**

  Shows command-line help.

## Commands

| Command                                             |
|-----------------------------------------------------|
| dotnet-counters collect |
| dotnet-counters monitor |
| dotnet-counters ps           |

## dotnet-counters collect

Periodically collect selected counter values and export them into a specified file format for post-processing.

### Synopsis

```dotnetcli
dotnet-counters collect [-h|--help] [-p|--process-id] [-n|--name] [--diagnostic-port] [--refresh-interval] [--counters <COUNTERS>] [--format] [-o|--output] [--dsrouter <ios|ios-sim|android|android-emu>] [-- <command>]
```

### Options

- **`-p|--process-id <PID>`**

  The ID of the process to collect counter data from.

  > **Note:**
  > On Linux and macOS, using this option requires the target application and `dotnet-counters` to share the same `TMPDIR` environment variable. Otherwise, the command will time out.

- **`-n|--name <name>`**

  The name of the process to collect counter data from.

  > **Note:**
  > On Linux and macOS, using this option requires the target application and `dotnet-counters` to share the same `TMPDIR` environment variable. Otherwise, the command will time out.

- **`--diagnostic-port <port-address[,(listen|connect)]>`**

  Sets the diagnostic port used to communicate with the process to be monitored. `dotnet-counters` and the .NET runtime inside the target process must agree on the port-address, with one listening and the other connecting. `dotnet-counters` automatically determines the correct port when attaching using the `--process-id` or `--name` options, or when launching a process using the `-- <command>` option. It's usually only necessary to specify the port explicitly when waiting for a process that will start in the future or communicating to a process that's running inside a container that isn't part of the current process namespace.

  The `port-address` differs by OS:

  - Linux and macOS - a path to a Unix domain socket such as `/foo/tool1.socket`.
  - Windows - a path to a named pipe such as `\\.\pipe\my_diag_port1`.
  - Android, iOS, and tvOS - an IP:port such as `127.0.0.1:9000`.

  By default, `dotnet-counters` listens at the specified address. You can request `dotnet-counters` to connect instead by appending `,connect` after the address. For example, `--diagnostic-port /foo/tool1.socket,connect` will connect to a .NET runtime process that's listening to the `/foo/tool1.socket` Unix domain socket.

  For information about how to use this option to start monitoring counters from app startup, see using diagnostic port.

- **`--refresh-interval <SECONDS>`**

  The number of seconds to delay between updating the displayed counters

- **`--counters <COUNTERS>`**

  A comma-separated list of counters. Counters can be specified `provider_name[:counter_name]`. If the `provider_name` is used without a qualifying list of counters, then all counters from the provider are shown. To discover provider and counter names, see built-in metrics. For EventCounters, `provider_name` is the name of the EventSource and for Meters, `provider_name` is the name of the Meter.

- **`--format <csv|json>`**

  The format to be exported. Currently available: csv, json.

- **`-o|--output <output>`**

  The name of the output file.

- **`-- <command>`**

  After the collection configuration parameters, the user can append `--` followed by a command to start a .NET application. `dotnet-counters` launches a process with the provided command and collect the requested metrics. This is often useful to collect metrics for the application's startup path and can be used to diagnose or monitor issues that happen early before or shortly after the main entry point.

  > **Note:**
  > Using this option monitors the first .NET process that communicates back to the tool, which means if your command launches multiple .NET applications, it will only collect the first app. Therefore, it's recommended you use this option on self-contained applications, or using the `dotnet exec <app.dll>` option.

  > **Note:**
  > If you launch a .NET executable via `dotnet-counters`, its input/output will be redirected and you won't be able to interact with its stdin/stdout. You can exit the tool via `Ctrl+C` or SIGTERM to safely end both the tool and the child process. If the child process exits before the tool, the tool will exit as well. If you need to use stdin/stdout, you can use the `--diagnostic-port` option. For more information, see Using diagnostic port.

> **Note:**
> To collect metrics using `dotnet-counters`, it needs to be run as the same user as the user running target process or as root. Otherwise, the tool will fail to establish a connection with the target process.

### Examples

- Collect all counters at a refresh interval of 3 seconds and generate a csv as output:

  ```dotnetcli
  > dotnet-counters collect --process-id 1902 --refresh-interval 3 --format csv

  --counters is unspecified. Monitoring System.Runtime counters by default.
  Starting a counter session. Press Q to quit.
  ```

- Start `dotnet mvc.dll` as a child process and start collecting runtime counters and ASP.NET Core Hosting counters from startup and save it as a JSON output:

  ```dotnetcli
  > dotnet-counters collect --format json --counters System.Runtime,Microsoft.AspNetCore.Hosting -- dotnet mvc.dll
  Starting a counter session. Press Q to quit.
  File saved to counter.json
  ```
