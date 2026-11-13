---
title: "Debug ThreadPool Starvation (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/debug-threadpool-starvation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Debug ThreadPool starvation

**This article applies to: ✔️** .NET 9.0 and later versions

In this tutorial, you'll learn how to debug a ThreadPool starvation scenario. ThreadPool starvation occurs when the pool has no available threads to process new work items and it often causes applications to respond slowly. Using the provided example ASP.NET Core web app, you can cause ThreadPool starvation intentionally and learn how to diagnose it.

In this tutorial, you will:

>
> - Investigate an app that is responding to requests slowly
> - Use the dotnet-counters tool to identify ThreadPool starvation is likely occurring
> - Use the dotnet-stack and dotnet-trace tools to determine what work is keeping the ThreadPool threads busy

## Prerequisites

The tutorial uses:

- .NET 9 SDK to build and run the sample app
- Sample web app to demonstrate ThreadPool starvation behavior
- Bombardier to generate load for the sample web app
- dotnet-counters to observe performance counters
- dotnet-stack to examine thread stacks
- dotnet-trace to collect wait events
- Optional: PerfView to analyze the wait events

## Run the sample app

Download the code for the sample app and run it using the .NET SDK:

```dotnetcli
E:\demo\DiagnosticScenarios>dotnet run
Using launch settings from E:\demo\DiagnosticScenarios\Properties\launchSettings.json...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: E:\demo\DiagnosticScenarios
```

If you use a web browser and send requests to `https://localhost:5001/api/diagscenario/taskwait`, you should see the response `success:taskwait` returned after about 500 ms. This shows that the web server is serving traffic as expected.

## Observe slow performance

The demo web server has several endpoints which mock doing a database request and then returning a response to the user. Each of these endpoints has a delay of approximately 500 ms when serving requests one at a time but the performance is much worse when the web server is subjected to some load. Download the Bombardier load testing tool and observe the difference in latency when 125 concurrent requests are sent to each endpoint.

```dotnetcli
bombardier-windows-amd64.exe https://localhost:5001/api/diagscenario/taskwait
Bombarding https://localhost:5001/api/diagscenario/taskwait for 10s using 125 connection(s)
[=============================================================================================] 10s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec        33.06     234.67    3313.54
  Latency         3.48s      1.39s     10.79s
  HTTP codes:
    1xx - 0, 2xx - 454, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    75.37KB/s
```

This second endpoint uses a code pattern that performs even worse:

```dotnetcli
bombardier-windows-amd64.exe https://localhost:5001/api/diagscenario/tasksleepwait
Bombarding https://localhost:5001/api/diagscenario/tasksleepwait for 10s using 125 connection(s)
[=============================================================================================] 10s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec         1.61      35.25     788.91
  Latency        15.42s      2.18s     18.30s
  HTTP codes:
    1xx - 0, 2xx - 140, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:    36.57KB/s
```

Both of these endpoints show dramatically more than the 500-ms average latency when load is high (3.48 s and 15.42 s respectively). If you run this example on an older version of .NET Core, you're likely to see both examples perform equally badly. .NET 6 has updated ThreadPool heuristics that reduce the performance impact of the bad coding pattern used in the first example.

## Detect ThreadPool starvation

If you observed the behavior above on a real world service, you would know it's responding slowly under load but you wouldn't know the cause. dotnet-counters is a tool that can show live performance counters. These counters can provide clues about certain problems and are often easy to get. In production environments, you might have similar counters provided by remote monitoring tools and web dashboards. Install dotnet-counters and begin monitoring the web service:

```dotnetcli
dotnet-counters monitor -n DiagnosticScenarios
Press p to pause, r to resume, q to quit.
    Status: Running

Name                                                            Current Value
[System.Runtime]
    dotnet.assembly.count ({assembly})                               115
    dotnet.gc.collections ({collection})
        gc.heap.generation
        ------------------
        gen0                                                           2
        gen1                                                           1
        gen2                                                           1
    dotnet.gc.heap.total_allocated (By)                       64,329,632
    dotnet.gc.last_collection.heap.fragmentation.size (By)
        gc.heap.generation
        ------------------
        gen0                                                     199,920
        gen1                                                      29,208
        gen2                                                           0
        loh                                                           32
        poh                                                            0
    dotnet.gc.last_collection.heap.size (By)
        gc.heap.generation
        ------------------
        gen0                                                     208,712
        gen1                                                   3,456,000
        gen2                                                   5,065,600
        loh                                                       98,384
        poh                                                    3,147,488
    dotnet.gc.last_collection.memory.committed_size (By)      31,096,832
    dotnet.gc.pause.time (s)                                           0.024
    dotnet.jit.compilation.time (s)                                    1.285
    dotnet.jit.compiled_il.size (By)                             565,249
    dotnet.jit.compiled_methods ({method})                         5,831
    dotnet.monitor.lock_contentions ({contention})                   148
    dotnet.process.cpu.count ({cpu})                                  16
    dotnet.process.cpu.time (s)
        cpu.mode
        --------
        system                                                         2.156
        user                                                           2.734
    dotnet.process.memory.working_set (By)                             1.3217e+08
    dotnet.thread_pool.queue.length ({work_item})                      0
    dotnet.thread_pool.thread.count ({thread})                         0
    dotnet.thread_pool.work_item.count ({work_item})              32,267
    dotnet.timer.count ({timer})                                       0
```

If your app is running a version of .NET older than .NET 9, the output UI of dotnet-counters will look slightly different; see dotnet-counters for details.

The preceding counters are an example while the web server wasn't serving any requests. Run Bombardier again with the `api/diagscenario/tasksleepwait` endpoint and sustained load for 2 minutes so there's plenty of time to observe what happens to the performance counters.

```dotnetcli
bombardier-windows-amd64.exe https://localhost:5001/api/diagscenario/tasksleepwait -d 120s
```

ThreadPool starvation occurs when there are no free threads to handle the queued work items and the runtime responds by increasing the number of ThreadPool threads. The `dotnet.thread_pool.thread.count` value increases rapidly to 2-3x the number of processor cores on your machine, and then further threads are added 1-2 per second until stabilizing somewhere above 125. The key signals that ThreadPool starvation is currently a performance bottleneck are the slow and steady increase of ThreadPool threads and CPU Usage much less than 100%. The thread count increase will continue until either the pool hits the maximum number of threads, enough threads have been created to satisfy all the incoming work items, or the CPU has been saturated. Often, but not always, ThreadPool starvation will also show large values for `dotnet.thread_pool.queue.length` and low values for `dotnet.thread_pool.work_item.count`, meaning that there's a large amount of pending work and little work being completed. Here's an example of the counters while the thread count is still rising:

```dotnetcli
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

Once the count of ThreadPool threads stabilizes, the pool is no longer starving. But if it stabilizes at a high value (more than about three times the number of processor cores), that usually indicates the application code is blocking some ThreadPool threads and the ThreadPool is compensating by running with more threads. Running steady at high thread counts won't necessarily have large impacts on request latency, but if load varies dramatically over time or the app will be periodically restarted, then each time the ThreadPool is likely to enter a period of starvation where it's slowly increasing threads and delivering poor request latency. Each thread also consumes memory, so reducing the total number of threads needed provides another benefit.

Starting in .NET 6, ThreadPool heuristics were modified to scale up the number of ThreadPool threads much faster in response to certain blocking Task APIs. ThreadPool starvation can still occur with these APIs, but the duration is much briefer than it was with older .NET versions because the runtime responds more quickly. Run Bombardier again with the `api/diagscenario/taskwait` endpoint:

```dotnetcli
bombardier-windows-amd64.exe https://localhost:5001/api/diagscenario/taskwait -d 120s
```

On .NET 6 you should observe the pool increase the thread count more quickly than before and then stabilize at a high number of threads. ThreadPool starvation is occurring while the thread count is climbing.
