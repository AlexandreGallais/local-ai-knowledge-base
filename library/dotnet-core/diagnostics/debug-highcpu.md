---
title: "Debug high CPU usage - .NET Core"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/debug-highcpu.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Debug high CPU usage in .NET Core

**This article applies to: ✔️** .NET Core 3.1 SDK and later versions

In this tutorial, you'll learn how to debug an excessive CPU usage scenario. Using the provided example ASP.NET Core web app source code repository, you can cause a deadlock intentionally. The endpoint will stop responding and experience thread accumulation. You'll learn how you can use various tools to diagnose this scenario with several key <example-value> of diagnostics data.

In this tutorial, you will:

>
> - Investigate high CPU usage
> - Determine CPU usage with dotnet-counters
> - Use dotnet-trace for trace generation
> - Profile performance in PerfView
> - Diagnose and solve excessive CPU usage

## Prerequisites

The tutorial uses:

- .NET Core 3.1 SDK or a later version.
- Sample debug target to trigger the scenario.
- dotnet-trace to list processes and generate a profile.
- dotnet-counters to monitor cpu usage.

## CPU counters

Before attempting this tutorial, please install the latest version of dotnet-counters:

  ```dotnetcli
  dotnet tool install --global dotnet-counters
  ```

If your app is running a version of .NET older than .NET 9, the output UI of dotnet-counters will look slightly different; see dotnet-counters for details.

Before attempting to collect diagnostics data, you need to observe a high CPU condition. Run the sample application using the following command from the project root directory.

```dotnetcli
dotnet run
```

To check the current CPU usage, use the dotnet-counters tool command:

```dotnetcli
dotnet-counters monitor -n DiagnosticScenarios --showDeltas
```

The output should be similar to the following:

```console
Press p to pause, r to resume, q to quit.
    Status: Running

Name                                                            Current Value      Last Delta
[System.Runtime]
    dotnet.assembly.count ({assembly})                               111               0
    dotnet.gc.collections ({collection})
        gc.heap.generation
        ------------------
        gen0                                                           8               0
        gen1                                                           1               0
        gen2                                                           0               0
    dotnet.gc.heap.total_allocated (By)                        4,042,656          24,512
    dotnet.gc.last_collection.heap.fragmentation.size (By)
        gc.heap.generation
        ------------------
        gen0                                                     801,728               0
        gen1                                                       6,048               0
        gen2                                                           0               0
        loh                                                            0               0
        poh                                                            0               0
    dotnet.gc.last_collection.heap.size (By)
        gc.heap.generation
        ------------------
        gen0                                                     811,512               0
        gen1                                                     562,024               0
        gen2                                                   1,095,056               0
        loh                                                       98,384               0
        poh                                                       24,528               0
    dotnet.gc.last_collection.memory.committed_size (By)       5,623,808               0
    dotnet.gc.pause.time (s)                                           0.019           0
    dotnet.jit.compilation.time (s)                                    0.582           0
    dotnet.jit.compiled_il.size (By)                             138,895               0
    dotnet.jit.compiled_methods ({method})                         1,470               0
    dotnet.monitor.lock_contentions ({contention})                     4               0
    dotnet.process.cpu.count ({cpu})                                  22               0
    dotnet.process.cpu.time (s)
        cpu.mode
        --------
        system                                                         0.109           0
        user                                                           0.453           0
    dotnet.process.memory.working_set (By)                    65,515,520               0
    dotnet.thread_pool.queue.length ({work_item})                      0               0
    dotnet.thread_pool.thread.count ({thread})                         0               0
    dotnet.thread_pool.work_item.count ({work_item})                   6               0
    dotnet.timer.count ({timer})                                       0               0
```

Focusing in on the ```Last Delta``` values of ```dotnet.process.cpu.time```, these tell us how many seconds within the refresh period (currently set to the default of 1 s) the CPU has been active. With the web app running, immediately after startup, the CPU isn't being consumed at all and these deltas are both `0`. Navigate to the `api/diagscenario/highcpu` route with `60000` as the route parameter:

`https://localhost:5001/api/diagscenario/highcpu/60000`

Now, rerun the dotnet-counters command.

```dotnetcli
dotnet-counters monitor -n DiagnosticScenarios --showDeltas
```

You should see an increase in CPU usage as shown below (depending on the host machine, expect varying CPU usage):

```console
Press p to pause, r to resume, q to quit.
    Status: Running

Name                                                            Current Value      Last Delta
[System.Runtime]
    dotnet.assembly.count ({assembly})                               111               0
    dotnet.gc.collections ({collection})
        gc.heap.generation
        ------------------
        gen0                                                           8               0
        gen1                                                           1               0
        gen2                                                           0               0
    dotnet.gc.heap.total_allocated (By)                        4,042,656          24,512
    dotnet.gc.last_collection.heap.fragmentation.size (By)
        gc.heap.generation
        ------------------
        gen0                                                     801,728               0
        gen1                                                       6,048               0
        gen2                                                           0               0
        loh                                                            0               0
        poh                                                            0               0
    dotnet.gc.last_collection.heap.size (By)
        gc.heap.generation
        ------------------
        gen0                                                     811,512               0
        gen1                                                     562,024               0
        gen2                                                   1,095,056               0
        loh                                                       98,384               0
        poh                                                       24,528               0
    dotnet.gc.last_collection.memory.committed_size (By)       5,623,808               0
    dotnet.gc.pause.time (s)                                           0.019           0
    dotnet.jit.compilation.time (s)                                    0.582           0
    dotnet.jit.compiled_il.size (By)                             138,895               0
    dotnet.jit.compiled_methods ({method})                         1,470               0
    dotnet.monitor.lock_contentions ({contention})                     4               0
    dotnet.process.cpu.count ({cpu})                                  22               0
    dotnet.process.cpu.time (s)
        cpu.mode
        --------
        system                                                         0.344           0.013
        user                                                          14.203           0.963
    dotnet.process.memory.working_set (By)                    65,515,520               0
    dotnet.thread_pool.queue.length ({work_item})                      0               0
    dotnet.thread_pool.thread.count ({thread})                         0               0
    dotnet.thread_pool.work_item.count ({work_item})                   6               0
    dotnet.timer.count ({timer})                                       0               0
```

Throughout the duration of the request, the CPU usage will hover around the increased value.

> **Tip:**
> To visualize an even higher CPU usage, you can exercise this endpoint in multiple browser tabs simultaneously.

At this point, you can safely say the CPU is running higher than you expect. Identifying the effects of a problem is key to finding the cause. We will use the effect of high CPU consumption in addition to diagnostic tools to find the cause of the problem.

## Analyze High CPU with Profiler

When analyzing an app with high CPU usage, use a profiler to understand what the code is doing. `dotnet-trace collect` works on all operating systems, but safe-point bias and managed-only callstacks limit it to more general information than a kernel-aware profiler like ETW for Windows or `perf` for Linux. Depending on your operating system and .NET version, improved profiling capabilities might be available—see the platform-specific tabs that follow for detailed guidance.

### Linux

#### Use `dotnet-trace collect-linux` (.NET 10+)

On .NET 10 and later, `dotnet-trace collect-linux` is the recommended profiling approach on Linux. It combines EventPipe with OS-level perf_events to produce a single unified trace that includes both managed and native callstacks, all without requiring a process restart. This requires root permissions and Linux kernel 6.4+ with `CONFIG_USER_EVENTS=y`. See collect-linux prerequisites for full requirements.

Ensure the sample debug target is configured to target .NET 10 or later, then run it and exercise the high CPU endpoint (`https://localhost:5001/api/diagscenario/highcpu/60000`) again. While it's running within the 1-minute request, run `dotnet-trace collect-linux` to capture a machine-wide trace:

```dotnetcli
sudo dotnet-trace collect-linux
```

Let it run for about 20-30 seconds, then press `Ctrl+C` or `Enter` to stop the collection. The result is a `.nettrace` file that includes both managed and native callstacks.

Open the `.nettrace` with `PerfView` and use the **CPU Stacks** view to identify the methods consuming the most CPU time.

For information about resolving native runtime symbols in the trace, see Get symbols for native runtime frames.

#### Use `perf`

The `perf` tool can also be used to generate .NET Core app profiles. Exit the previous instance of the sample debug target.

Set the `DOTNET_PerfMapEnabled` environment variable to cause the .NET app to create a `map` file in the `/tmp` directory. This `map` file is used by `perf` to map CPU addresses to JIT-generated functions by name. For more information, see Export perf maps and jit dumps.

Run the sample debug target in the same terminal session.

```dotnetcli
export DOTNET_PerfMapEnabled=1
dotnet run
```

Exercise the high CPU API endpoint (`https://localhost:5001/api/diagscenario/highcpu/60000`) again. While it's running within the 1-minute request, run the `perf` command with your process ID:

```bash
sudo perf record -p 2266 -g
```

The `perf` command starts the performance collection process. Let it run for about 20-30 seconds, then press `Ctrl+C` to exit the collection process. You can use the same `perf` command to see the output of the trace.

```bash
sudo perf report -f
```

You can also generate a _flame-graph_ by using the following commands:

```bash
git clone --depth=1 https://github.com/BrendanGregg/FlameGraph
sudo perf script | FlameGraph/stackcollapse-perf.pl | FlameGraph/flamegraph.pl > flamegraph.svg
```

This command generates a `flamegraph.svg` that you can view in the browser to investigate the performance problem:

[](media/flamegraph.jpg#lightbox)

### Windows

On Windows, you can use the dotnet-trace tool as a profiler. Using the previous sample debug target, exercise the high CPU endpoint (`https://localhost:5001/api/diagscenario/highcpu/60000`) again. While it's running within the 1-minute request, use the `collect` command, with the `providers` option to specify the provider we want: Microsoft-DotNetCore-SampleProfiler, to collect a trace of the app as follows:

```dotnetcli
dotnet-trace collect -p 22884 --providers Microsoft-DotNETCore-SampleProfiler
```

Let dotnet-trace run for about 20-30 seconds, and then press the `Enter` to exit the collection. The result is a `nettrace` file located in the same folder. The `nettrace` files are a great way to use existing analysis tools on Windows.

Open the `nettrace` with `PerfView` by navigating to samples/core/diagnostics/DiagnosticScenarios/ and clicking on the arrow by the `nettrace` file. Open the 'Thread Time (with StartStop Activities) Stacks' and choose the 'CallTree' tab near the top. After checking the box to the left of one of the threads, your file should look similar to the one pictured below.

[](media/perfview.jpg#lightbox)

---

## Analyzing High CPU Data with Visual Studio

All \*.nettrace files can be analyzed in Visual Studio. To analyze a Linux \*.nettrace file in Visual Studio, transfer the \*.nettrace file, in addition to the other necessary documents, to a Windows machine, and then open the \*.nettrace file in Visual Studio. For more information, see Analyze CPU Usage Data.

## See also

- dotnet-trace to list processes
- dotnet-counters to check managed memory usage
- dotnet-dump to collect and analyze a dump file
- dotnet/diagnostics

## Next steps

> Debug a deadlock in .NET Core
