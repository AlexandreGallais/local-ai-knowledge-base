---
title: ".NET runtime metrics (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/built-in-metrics-runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET runtime metrics (part 2 of 2)

## `System.Runtime`

The `System.Runtime` Meter reports measurements from the GC, JIT, AssemblyLoader, Threadpool, and exception handling portions of the .NET runtime as well as some CPU and memory metrics from the OS. These metrics are available automatically for all .NET apps.

##### Metric: `dotnet.process.cpu.time`

| Name                      | Instrument Type                             | Unit (UCUM) | Description                   |
|---------------------------|---------------------------------------------|-------------|-------------------------------|
| `dotnet.process.cpu.time` | `System.Diagnostics.Metrics.Counter`1` | `s`         | CPU time used by the process. |

| Attribute  | Type     | Description          | Examples         | Presence |
|------------|----------|----------------------|------------------|----------|
| `cpu.mode` | `string` | The mode of the CPU. | `user`; `system` | Always   |

This metric reports the same values as accessing the processor time properties on `System.Diagnostics.Process` for the current process. The `system` mode corresponds to `System.Diagnostics.Process.PrivilegedProcessorTime` and `user` mode corresponds to `System.Diagnostics.Process.UserProcessorTime`

Available starting in: .NET 9.

##### Metric: `dotnet.process.memory.working_set`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.process.memory.working_set` | `System.Diagnostics.Metrics.UpDownCounter`1` | `By` | The number of bytes of physical memory mapped to the process context. |

This metric reports the same values as calling `System.Environment.WorkingSet` property.

Available starting in: .NET 9.

##### Metric: `dotnet.gc.collections`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.gc.collections` | `System.Diagnostics.Metrics.Counter`1` | `{collection}` | The number of garbage collections that have occurred since the process has started. |

| Attribute | Type | Description | Examples | Presence |
|---|---|---|---|---|
| `gc.heap.generation` | `string` | Name of the maximum managed heap generation being collected. | `gen0`; `gen1`; `gen2` | Always |

The .NET GC is a generational garbage collector. Each time the garbage collector runs, it uses heuristics to select a maximum generation and then collects objects in all generations up to the selected maximum. For example, a `gen1` collection collects all objects in generations 0 and 1. A `gen2` collection collects all objects in generations 0, 1, and 2. For more information about the .NET GC and generational garbage collection, see the .NET garbage collection guide.

Available starting in: .NET 9.

##### Metric: `dotnet.gc.heap.total_allocated`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.gc.heap.total_allocated` | `System.Diagnostics.Metrics.Counter`1` | `By` | The *approximate* number of bytes allocated on the managed GC heap since the process started. The returned value does not include any native allocations. |

This metric reports the same values as calling `System.GC.GetTotalAllocatedBytes*`. For more information about the .NET GC, see the .NET garbage collection guide.

Available starting in: .NET 9.

##### Metric: `dotnet.gc.last_collection.memory.committed_size`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.gc.last_collection.memory.committed_size` | `System.Diagnostics.Metrics.UpDownCounter`1` | `By` | The amount of committed virtual memory in use by the .NET GC, as observed during the latest garbage collection. |

This metric reports the same values as calling `System.GCMemoryInfo.TotalCommittedBytes`. Committed virtual memory may be larger than the heap size because it includes both memory for storing existing objects (the heap size) and some extra memory that is ready to handle newly allocated objects in the future. For more information about the .NET GC, see the .NET garbage collection guide.

Available starting in: .NET 9.

##### Metric: `dotnet.gc.last_collection.heap.size`

| Name | Instrument Type | Unit (UCUM) | Description |
| ---- | --------------- | ----------- | ----------- |
| `dotnet.gc.last_collection.heap.size` | `System.Diagnostics.Metrics.UpDownCounter`1` | `By` | The managed GC heap size (including fragmentation), as observed during the latest garbage collection. |

| Attribute | Type | Description | Examples | Presence |
|---|---|---|---|---|
| `gc.heap.generation` | `string` | Name of the garbage collector managed heap generation. | `gen0`; `gen1`; `gen2`; `loh`; `poh` | Always |

The .NET GC divides the heap into generations. In addition to the standard numbered generations, the GC also puts some objects into two special generations:

- Large object heap (LOH) stores .NET objects that are very large compared to typical objects.
- Pinned object heap (POH) stores objects allocated using the `System.GC.AllocateArray*` API when the `pinned` parameter is true.

Both of these special generations are collected during `gen2` GC collections. For more information about the .NET GC, see the .NET Garbage collection guide.

Available starting in: .NET 9.

##### Metric: `dotnet.gc.last_collection.heap.fragmentation.size`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.gc.last_collection.heap.fragmentation.size` | `System.Diagnostics.Metrics.UpDownCounter`1` | `By` | The heap fragmentation, as observed during the latest garbage collection. |

| Attribute            | Type     | Description | Examples                             | Presence |
|----------------------|----------|-------------|--------------------------------------|----------|
| `gc.heap.generation` | `string` | Name of the garbage collector managed heap generation. | `gen0`; `gen1`; `gen2`; `loh`; `poh` | Always |

This metric reports the same values as calling `System.GCGenerationInfo.FragmentationAfterBytes`.

When .NET objects are allocated, initially they tend to be laid out contiguously in memory. However, if some of those objects are later collected by the GC, this creates gaps of unused memory between the live objects that remain. These gaps represent the portion of the GC heap that's not currently being used to store objects, often called "fragmentation."  The GC can reuse the fragmentation bytes in the future for new object allocations if the object size is small enough to fit in one of the gaps. The GC can also perform a special compacting garbage collection that moves remaining live objects next to each other as long as the objects haven't been pinned in place.

For more information about how the .NET GC works, analyzing GC performance, and what role fragmentation plays, see .NET memory performance analysis.

Available starting in: .NET 9.

##### Metric: `dotnet.gc.pause.time`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.gc.pause.time` | `System.Diagnostics.Metrics.Counter`1` | `s` | The total amount of time paused in GC since the process started. |

This metric reports the same values as calling `System.GC.GetTotalPauseDuration`.

Each time the .NET GC does a collection it needs to briefly pause all threads running managed code to determine which objects are still referenced. This metric reports the sum of all these pause times since the process began. You can use this metric to determine what fraction of time threads spend paused for GC versus the time they're able to run managed code.

Available starting in: .NET 9.

##### Metric: `dotnet.jit.compiled_il.size`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.jit.compiled_il.size` | `System.Diagnostics.Metrics.Counter`1` | `By` | Count of bytes of intermediate language that have been compiled since the process started. |

This metric reports the same values as calling `System.Runtime.JitInfo.GetCompiledILBytes*`.

When you build a .NET app, managed code is initially compiled from a high-level language like C#, VB, or F# into Intermediate language (IL). Then when the program is run, the .NET just-in-time (JIT) compiler converts the IL into machine code.

Since JIT compilation occurs the first time a method runs, most JIT compilation tends to occur during application startup. Reducing the amount of IL that is JIT compiled can improve application startup time.

Available starting in: .NET 9.

##### Metric: `dotnet.jit.compiled_methods`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.jit.compiled_methods` | `System.Diagnostics.Metrics.Counter`1` | `{method}` | The number of times the JIT compiler (re)compiled methods since the process started. |

This metric reports the same values as calling `System.Runtime.JitInfo.GetCompiledMethodCount*`.

When you build a .NET app, managed code is initially compiled from a high-level language like C#, VB, or F# into Intermediate language (IL). Then when the program is run, the .NET just-in-time (JIT) compiler converts the IL into machine code.

Since JIT compilation occurs the first time a method runs, most JIT compilation tends to occur during application startup. Reducing the number of methods that need to be JIT compiled can improve application startup time.

Available starting in: .NET 9.

##### Metric: `dotnet.jit.compilation.time`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.jit.compilation.time` | `System.Diagnostics.Metrics.Counter`1` | `s` | The amount of time the JIT compiler has spent compiling methods since the process started. |

This metric reports the same values as calling `System.Runtime.JitInfo.GetCompilationTime*`.

When you build a .NET app, managed code is initially compiled from a high-level language like C#, VB, or F# into Intermediate language (IL). Then when the program is run, the .NET just-in-time (JIT) compiler converts the IL into machine code.

Since JIT compilation occurs the first time a method runs, most JIT compilation tends to occur during application startup. Reducing the time spent JIT compiling can improve application startup time.

Available starting in: .NET 9.

##### Metric: `dotnet.thread_pool.thread.count`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.thread_pool.thread.count` | `System.Diagnostics.Metrics.UpDownCounter`1` | `{thread}` | The number of thread pool threads that currently exist. |

This metric reports the same values as calling `System.Threading.ThreadPool.ThreadCount`.

.NET uses a thread pool to schedule work items onto other threads. This metric provides the number of worker threads currently managed by that thread pool.

Available starting in: .NET 9.

##### Metric: `dotnet.thread_pool.work_item.count`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.thread_pool.work_item.count` | `System.Diagnostics.Metrics.Counter`1` | `{work_item}` | The number of work items that the thread pool has completed since the process started. |

This metric reports the same values as calling `System.Threading.ThreadPool.CompletedWorkItemCount`.

.NET uses a thread pool to schedule work items onto other threads. This metric provides the number of work items that have been executed by the thread pool threads.

Available starting in: .NET 9.

##### Metric: `dotnet.thread_pool.queue.length`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.thread_pool.queue.length` | `System.Diagnostics.Metrics.UpDownCounter`1` | `{work_item}` | The number of work items that are currently queued to be processed by the thread pool. |

This metric reports the same values as calling `System.Threading.ThreadPool.PendingWorkItemCount`.

.NET uses a thread pool to schedule work items onto other threads. This metric provides the number of work items that are currently queued to be executed by one of the thread pool threads.

Available starting in: .NET 9.

##### Metric: `dotnet.monitor.lock_contentions`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.monitor.lock_contentions` | `System.Diagnostics.Metrics.Counter`1` | `{contention}` | The number of times there was contention when trying to acquire a monitor lock since the process started. |

This metric reports the same values as calling `System.Threading.Monitor.LockContentionCount`.

.NET supports using any managed object as a lock, either with APIs such as `System.Threading.Monitor.Enter*` or with the lock statement. If one thread already holds a lock while a second thread tries to acquire it, this is called _lock contention_.

Available starting in: .NET 9.

##### Metric: `dotnet.timer.count`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.timer.count` | `System.Diagnostics.Metrics.UpDownCounter`1` | `{timer}` | The number of timer instances that are currently active. |

This metric reports the same values as calling `System.Threading.Timer.ActiveCount`.

Available starting in: .NET 9.

##### Metric: `dotnet.assembly.count`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.assembly.count` | `System.Diagnostics.Metrics.UpDownCounter`1` | `{assembly}` | The number of .NET assemblies that are currently loaded. |

This metric reports the same values as calling `System.AppDomain.GetAssemblies` and then checking the length of the returned array.

Available starting in: .NET 9.

##### Metric: `dotnet.exceptions`

| Name     | Instrument Type | Unit (UCUM) | Description    |
| -------- | --------------- | ----------- | -------------- |
| `dotnet.exceptions` | `System.Diagnostics.Metrics.Counter`1` | `{exception}` | The number of exceptions that have been thrown in managed code. |

| Attribute  | Type | Description  | Examples  | Presence |
|---|---|---|---|---|---|
| `error.type` | `string` | The exception type that was thrown. | `System.OperationCanceledException`; `Contoso.MyException` | `Required` |

This metric reports the same values as counting calls to the `System.AppDomain.FirstChanceException` event.

Available starting in: .NET 9.
