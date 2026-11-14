---
title: "dotnet-counters diagnostic tool - .NET CLI (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/dotnet-counters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-counters diagnostic tool - .NET CLI (part 2 of 2)

## dotnet-counters monitor

Displays periodically refreshing values of selected counters.

### Synopsis

```dotnetcli
dotnet-counters monitor [-h|--help] [-p|--process-id] [-n|--name] [--diagnostic-port] [--refresh-interval] [--counters] [-- <command>]
```

### Options

- **`-p|--process-id <PID>`**

  The ID of the process to be monitored.

- **`-n|--name <name>`**

  The name of the process to be monitored.

- **`--diagnostic-port`**

  The name of the diagnostic port to create. See using diagnostic port for how to use this option to start monitoring counters from app startup.

- **`--refresh-interval <SECONDS>`**

  The number of seconds to delay between updating the displayed counters

- **`--counters <COUNTERS>`**

  A comma-separated list of counters. Counters can be specified `provider_name[:counter_name]`. If the `provider_name` is used without a qualifying list of counters, then all counters from the provider are shown. To discover provider and counter names, see built-in metrics. For EventCounters, `provider_name` is the name of the EventSource and for Meters, `provider_name` is the name of the Meter.

- **`--dsrouter {ios|ios-sim|android|android-emu}`**

  (Available in `dotnet-counters` 9.0.652701 and later versions.) Starts dotnet-dsrouter and connects to it. Requires dotnet-dsrouter to be installed. Run `dotnet-dsrouter -h` for more information.

- **`-- <command>`**

  After the collection configuration parameters, you can append `--` followed by a command to start a .NET application. `dotnet-counters` will launch a process with the provided command and monitor the requested metrics. This is often useful to collect metrics for the application's startup path and can be used to diagnose or monitor issues that happen early before or shortly after the main entry point.

  > **Note:**
  > Using this option monitors the first .NET process that communicates back to the tool, which means if your command launches multiple .NET applications, it will only collect the first app. Therefore, it's recommended you use this option on self-contained applications, or using the `dotnet exec <app.dll>` option.

  > **Note:**
  > Launching a .NET executable via `dotnet-counters` will redirect its input/output and you won't be able to interact with its stdin/stdout. You can exit the tool via `Ctrl+C` or SIGTERM to safely end both the tool and the child process. If the child process exits before the tool, the tool will exit as well. If you need to use stdin/stdout, you can use the `--diagnostic-port` option. For more information, see Using diagnostic port.

> **Note:**
> On Linux and macOS, this command expects the target application and `dotnet-counters` to share the same `TMPDIR` environment variable.

> **Note:**
> To monitor metrics using `dotnet-counters`, it needs to be run as the same user as the user running target process or as root.

> **Note:**
> If you see an error message similar to the following one: `[ERROR] System.ComponentModel.Win32Exception (299): A 32 bit processes cannot access modules of a 64 bit process.`, you're trying to use `dotnet-counters` that has mismatched bitness against the target process. Make sure to download the correct bitness of the tool in the install link.

### Examples

- Monitor all counters from `System.Runtime` at a refresh interval of 3 seconds:

  ```dotnetcli
  > dotnet-counters monitor --process-id 1902  --refresh-interval 3 --counters System.Runtime
  Press p to pause, r to resume, q to quit.
      Status: Running
  Name                                              Current Value
  [System.Runtime]
      dotnet.assembly.count ({assembly})                               115
      dotnet.gc.collections ({collection})
          gc.heap.generation
          ------------------
          gen0                                                           5
          gen1                                                           1
          gen2                                                           1
      dotnet.gc.heap.total_allocated (By)                       1.6947e+08
      dotnet.gc.last_collection.heap.fragmentation.size (By)
          gc.heap.generation
          ------------------
          gen0                                                           0
          gen1                                                     348,248
          gen2                                                           0
          loh                                                           32
          poh                                                            0
      dotnet.gc.last_collection.heap.size (By)
          gc.heap.generation
          ------------------
          gen0                                                           0
          gen1                                                  18,010,920
          gen2                                                   5,065,600
          loh                                                       98,384
          poh                                                    3,407,048
      dotnet.gc.last_collection.memory.committed_size (By)      66,842,624
      dotnet.gc.pause.time (s)                                           0.05
      dotnet.jit.compilation.time (s)                                    1.317
      dotnet.jit.compiled_il.size (By)                             574,886
      dotnet.jit.compiled_methods ({method})                         6,008
      dotnet.monitor.lock_contentions ({contention})                   194
      dotnet.process.cpu.count ({cpu})                                  16
      dotnet.process.cpu.time (s)
          cpu.mode
          --------
          system                                                         4.953
          user                                                           6.266
      dotnet.process.memory.working_set (By)                             1.3217e+08
      dotnet.thread_pool.queue.length ({work_item})                      0
      dotnet.thread_pool.thread.count ({thread})                       133
      dotnet.thread_pool.work_item.count ({work_item})              71,188
      dotnet.timer.count ({timer})                                     124
  ```

  > **Note:**
  > If the app uses .NET version 8 or lower, the System.Runtime Meter doesn't exist in those versions and `dotnet-counters` will fall back to display the older System.Runtime EventCounters instead. The UI looks slightly different, as shown here.

  ```output
  [System.Runtime]
        % Time in GC since last GC (%)                                 0
        Allocation Rate (B / 1 sec)                                5,376
        CPU Usage (%)                                                  0
        Exception Count (Count / 1 sec)                                0
        GC Fragmentation (%)                                          48.467
        GC Heap Size (MB)                                              0
        Gen 0 GC Count (Count / 1 sec)                                 1
        Gen 0 Size (B)                                                24
        Gen 1 GC Count (Count / 1 sec)                                 1
        Gen 1 Size (B)                                                24
        Gen 2 GC Count (Count / 1 sec)                                 1
        Gen 2 Size (B)                                           272,000
        IL Bytes Jitted (B)                                       19,449
        LOH Size (B)                                              19,640
        Monitor Lock Contention Count (Count / 1 sec)                  0
        Number of Active Timers                                        0
        Number of Assemblies Loaded                                    7
        Number of Methods Jitted                                     166
        POH (Pinned Object Heap) Size (B)                             24
        ThreadPool Completed Work Item Count (Count / 1 sec)           0
        ThreadPool Queue Length                                        0
        ThreadPool Thread Count                                        2
        Working Set (MB)                                              19
  ```

- Monitor just garbage collections and garbage collection heap allocation from `System.Runtime`:

  ```dotnetcli
  > dotnet-counters monitor --process-id 1902 --counters System.Runtime[dotnet.gc.collections,dotnet.gc.heap.total_allocated]

  Press p to pause, r to resume, q to quit.
  Status: Running

  Name                                  Current Value
  [System.Runtime]
      dotnet.gc.collections ({collection})
          gc.heap.generation
          ------------------
          gen0                                0
          gen1                                0
          gen2                                0
      dotnet.gc.heap.total_allocated (By)     9,943,384

  ```

- Monitor `EventCounter` values from user-defined `EventSource`. For more information, see Tutorial: Measure performance using EventCounters in .NET Core.

  ```dotnetcli
  > dotnet-counters monitor --process-id 1902 --counters Samples-EventCounterDemos-Minimal

  Press p to pause, r to resume, q to quit.
      request                                      100
  ```

- Launch `my-aspnet-server.exe` and monitor the # of assemblies loaded from its startup:

  ```dotnetcli
  > dotnet-counters monitor --counters System.Runtime[dotnet.assembly.count] -- my-aspnet-server.exe
  Press p to pause, r to resume, q to quit.
  Status: Running

  Name                               Current Value
  [System.Runtime]
  dotnet.assembly.count ({assembly})      11
  ```

- Launch `my-aspnet-server.exe` with `arg1` and `arg2` as command-line arguments and monitor its working set and GC heap size from its startup:

  ```dotnetcli
  > dotnet-counters monitor --counters System.Runtime[dotnet.process.memory.working_set,dotnet.gc.last_collection.heap.size] -- my-aspnet-server.exe arg1 arg2
  ```

  ```output
  Name                                             Current Value
  [System.Runtime]
      dotnet.gc.last_collection.heap.size (By)
          gc.heap.generation
          ------------------
          gen0                                          560
          gen1                                      462,720
          gen2                                            0
          loh                                             0
          poh                                         8,184
      dotnet.process.memory.working_set (By)     48,431,104

  ```

## dotnet-counters ps

Lists the dotnet processes that can be monitored by `dotnet-counters`.
`dotnet-counters` version 6.0.320703 and later also displays the command-line arguments that each process was started with, if available.

### Synopsis

```dotnetcli
dotnet-counters ps [-h|--help]
```

### Example

Suppose you start a long-running app using the command ```dotnet run --configuration Release```. In another window, you run the ```dotnet-counters ps``` command. The output you see is as follows. The command-line arguments, if any, are shown in `dotnet-counters` version 6.0.320703 and later.

```dotnetcli
> dotnet-counters ps

  21932 dotnet     C:\Program Files\dotnet\dotnet.exe   run --configuration Release
  36656 dotnet     C:\Program Files\dotnet\dotnet.exe
```

## Using diagnostic port

Diagnostic port is a runtime feature that allows you to start monitoring or collecting counters from app startup. To do this using `dotnet-counters`, you can either use `dotnet-counters <collect|monitor> -- <command>` as described in the previous examples, or use the `--diagnostic-port` option.

Using `dotnet-counters <collect|monitor> -- <command>` to launch the application as a child process is the simplest way to quickly monitor it from its startup.

However, when you want to gain a finer control over the lifetime of the app being monitored (for example, monitor the app for the first 10 minutes only and continue executing) or if you need to interact with the app using the CLI, using `--diagnostic-port` option allows you to control both the target app being monitored and `dotnet-counters`.

1. The following command makes `dotnet-counters` create a diagnostics socket named `myport.sock` and wait for a connection.

    > ```dotnetcli
    > dotnet-counters collect --diagnostic-port myport.sock
    > ```

    Output:

    > ```output
    > Waiting for connection on myport.sock
    > Start an application with the following environment variable: DOTNET_DiagnosticPorts=/home/user/myport.sock
    > ```

2. In a separate console, launch the target application with the environment variable `DOTNET_DiagnosticPorts` set to the value in the `dotnet-counters` output.

    > ```console
    > export DOTNET_DiagnosticPorts=/home/user/myport.sock
    > ./my-dotnet-app arg1 arg2
    > ```

    This enables `dotnet-counters` to start collecting counters on `my-dotnet-app`:

    > ```output
    > Waiting for connection on myport.sock
    > Start an application with the following environment variable: DOTNET_DiagnosticPorts=myport.sock
    > Starting a counter session. Press Q to quit.
    > ```

    > **Important:**
    > Launching your app with `dotnet run` can be problematic because the dotnet CLI might spawn many child processes that aren't your app and they can connect to `dotnet-counters` before your app, leaving your app to be suspended at runtime. It's recommended you directly use a self-contained version of the app or use `dotnet exec` to launch the application.
