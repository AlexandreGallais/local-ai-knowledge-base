---
title: "Garbage Collection and Performance (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/garbage-collection/performance.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Garbage collection and performance

This article describes issues related to garbage collection and memory usage. It addresses issues that pertain to the managed heap and explains how to minimize the effect of garbage collection on your applications. Each issue has links to procedures that you can use to investigate problems.

## Performance analysis tools

The following sections describe the tools that are available for investigating memory usage and garbage collection issues. The procedures provided later in this article refer to these tools.

### Memory Performance Counters

You can use performance counters to gather performance data. For instructions, see Runtime Profiling. The .NET CLR Memory category of performance counters, as described in Performance Counters in .NET, provides information about the garbage collector.

### Debugging with SOS

You can use the Windows Debugger (WinDbg) to inspect objects on the managed heap.

To install WinDbg, install Debugging Tools for Windows from the Download Debugging Tools for Windows page.

### Garbage Collection ETW Events

Event tracing for Windows (ETW) is a tracing system that supplements the profiling and debugging support provided by .NET. Garbage collection ETW events capture useful information for analyzing the managed heap from a statistical point of view. For example, the `GCStart_V1` event, which is raised when a garbage collection is about to occur, provides the following information:

- Which generation of objects is being collected.
- What triggered the garbage collection.
- Type of garbage collection (concurrent or not concurrent).

ETW event logging is efficient and will not mask any performance problems associated with garbage collection. A process can provide its own events in conjunction with ETW events. When logged, both the application's events and the garbage collection events can be correlated to determine how and when heap problems occur. For example, a server application could provide events at the start and end of a client request.

### The Profiling API

The common language runtime (CLR) profiling interfaces provide detailed information about the objects that were affected during garbage collection. A profiler can be notified when a garbage collection starts and ends. It can provide reports about the objects on the managed heap, including an identification of objects in each generation. For more information, see Profiling Overview.

Profilers can provide comprehensive information. However, complex profilers can potentially modify an application's behavior.

### Application Domain Resource Monitoring

Application domain resource monitoring (ARM) enables hosts to monitor CPU and memory usage by application domain. For more information, see Application Domain Resource Monitoring.

## Troubleshoot performance issues

The first step is to determine whether the issue is actually garbage collection. If you determine that it is, select from the following list to troubleshoot the problem.

- An out-of-memory exception is thrown
- The process uses too much memory
- The garbage collector does not reclaim objects fast enough
- The managed heap is too fragmented
- Garbage collection pauses are too long
- Generation 0 is too big
- CPU usage during a garbage collection is too high

### Issue: An Out-of-Memory Exception Is Thrown

There are two legitimate cases for a managed `System.OutOfMemoryException` to be thrown:

- Running out of virtual memory.

  The garbage collector allocates memory from the system in segments of a pre-determined size. If an allocation requires an additional segment, but there is no contiguous free block left in the process's virtual memory space, the allocation for the managed heap will fail.

- Not having enough physical memory to allocate.

|Performance checks|
|------------------------|
|Determine whether the out-of-memory exception is managed.Determine how much virtual memory can be reserved.Determine whether there is enough physical memory.|

If you determine that the exception is not legitimate, contact Microsoft Customer Service and Support with the following information:

- The stack with the managed out-of-memory exception.
- Full memory dump.
- Data that proves that it is not a legitimate out-of-memory exception, including data that shows that virtual or physical memory is not an issue.

### Issue: The Process Uses Too Much Memory

A common assumption is that the memory usage display on the **Performance** tab of Windows Task Manager can indicate when too much memory is being used. However, that display pertains to the working set; it does not provide information about virtual memory usage.

If you determine that the issue is caused by the managed heap, you must measure the managed heap over time to determine any patterns.

If you determine that the problem is not caused by the managed heap, you must use native debugging.

|Performance checks|
|------------------------|
|Determine how much virtual memory can be reserved.Determine how much memory the managed heap is committing.Determine how much memory the managed heap reserves.Determine large objects in generation 2.Determine references to objects.|

### Issue: The Garbage Collector Does Not Reclaim Objects Fast Enough

When it appears as if objects are not being reclaimed as expected for garbage collection, you must determine if there are any strong references to those objects.

You may also encounter this issue if there has been no garbage collection for the generation that contains a dead object, which indicates that the finalizer for the dead object has not been run. For example, this is possible when you are running a single-threaded apartment (STA) application and the thread that services the finalizer queue cannot call into it.

|Performance checks|
|------------------------|
|Check references to objects.Determine whether a finalizer has been run.Determine whether there are objects waiting to be finalized.|

### Issue: The Managed Heap Is Too fragmented

The fragmentation level is calculated as the ratio of free space over the total allocated memory for the generation. For generation 2, an acceptable level of fragmentation is no more than 20%. Because generation 2 can get very big, the ratio of fragmentation is more important than the absolute value.

Having lots of free space in generation 0 is not a problem because this is the generation where new objects are allocated.

Fragmentation always occurs in the large object heap because it is not compacted. Free objects that are adjacent are naturally collapsed into a single space to satisfy large object allocation requests.

Fragmentation can become a problem in generation 1 and generation 2. If these generations have a large amount of free space after a garbage collection, an application's object usage may need modification, and you should consider re-evaluating the lifetime of long-term objects.

Excessive pinning of objects can increase fragmentation. If fragmentation is high, too many objects could have been pinned.

If fragmentation of virtual memory is preventing the garbage collector from adding segments, the causes could be one of the following:

- Frequent loading and unloading of many small assemblies.
- Holding too many references to COM objects when interoperating with unmanaged code.
- Creation of large transient objects, which causes the large object heap to allocate and free heap segments frequently.

  When hosting the CLR, an application can request that the garbage collector retain its segments. This reduces the frequency of segment allocations. This is accomplished by using the STARTUP_HOARD_GC_VM flag in the STARTUP_FLAGS Enumeration.

|Performance checks|
|------------------------|
|Determine the amount of free space in the managed heap.Determine the number of pinned objects.|

If you think that there is no legitimate cause for the fragmentation, contact Microsoft Customer Service and Support.

### Issue: Garbage Collection Pauses Are Too Long

Garbage collection operates in soft real time, so an application must be able to tolerate some pauses. A criterion for soft real time is that 95% of the operations must finish on time.

In concurrent garbage collection, managed threads are allowed to run during a collection, which means that pauses are very minimal.

Ephemeral garbage collections (generations 0 and 1) last only a few milliseconds, so decreasing pauses is usually not feasible. However, you can decrease the pauses in generation 2 collections by changing the pattern of allocation requests by an application.

Another, more accurate, method is to use garbage collection ETW events. You can find the timings for collections by adding the time stamp differences for a sequence of events. The whole collection sequence includes suspension of the execution engine, the garbage collection itself, and the resumption of the execution engine.

You can use Garbage Collection Notifications to determine whether a server is about to have a generation 2 collection, and whether rerouting requests to another server could ease any problems with pauses.

|Performance checks|
|------------------------|
|Determine the length of time in a garbage collection.Determine what caused a garbage collection.|

### Issue: Generation 0 Is Too Big

Generation 0 is likely to have a larger number of objects on a 64-bit system, especially when you use server garbage collection instead of workstation garbage collection. This is because the threshold to trigger a generation 0 garbage collection is higher in these environments, and generation 0 collections can get much bigger. Performance is improved when an application allocates more memory before a garbage collection is triggered.

### Issue: CPU Usage During a Garbage Collection Is Too High

CPU usage will be high during a garbage collection. If a significant amount of process time is spent in a garbage collection, the number of collections is too frequent or the collection is lasting too long. An increased allocation rate of objects on the managed heap causes garbage collection to occur more frequently. Decreasing the allocation rate reduces the frequency of garbage collections.

You can monitor allocation rates by using the `Allocated Bytes/second` performance counter. For more information, see Performance Counters in .NET.

The duration of a collection is primarily a factor of the number of objects that survive after allocation. The garbage collector must go through a large amount of memory if many objects remain to be collected. The work to compact the survivors is time-consuming. To determine how many objects were handled during a collection, set a breakpoint in the debugger at the end of a garbage collection for a specified generation.

|Performance checks|
|------------------------|
|Determine if high CPU usage is caused by garbage collection.Set a breakpoint at the end of garbage collection.|

## Troubleshooting guidelines

This section describes guidelines that you should consider as you begin your investigations.

### Workstation or Server Garbage Collection

Determine if you are using the correct type of garbage collection. If your application uses multiple threads and object instances, use server garbage collection instead of workstation garbage collection. Server garbage collection operates on multiple threads, whereas workstation garbage collection requires multiple instances of an application to run their own garbage collection threads and compete for CPU time.

An application that has a low load and that performs tasks infrequently in the background, such as a service, could use workstation garbage collection with concurrent garbage collection disabled.

### When to Measure the Managed Heap Size

Unless you are using a profiler, you will have to establish a consistent measuring pattern to effectively diagnose performance issues. Consider the following points to establish a schedule:

- If you measure after a generation 2 garbage collection, the entire managed heap will be free of garbage (dead objects).
- If you measure immediately after a generation 0 garbage collection, the objects in generations 1 and 2 will not be collected yet.
- If you measure immediately before a garbage collection, you will measure as much allocation as possible before the garbage collection starts.
- Measuring during a garbage collection is problematic, because the garbage collector data structures are not in a valid state for traversal and may not be able to give you the complete results. This is by design.
- When you are using workstation garbage collection with concurrent garbage collection, the reclaimed objects are not compacted, so the heap size can be the same or larger (fragmentation can make it appear to be larger).
- Concurrent garbage collection on generation 2 is delayed when the physical memory load is too high.

The following procedure describes how to set a breakpoint so that you can measure the managed heap.

#### To set a breakpoint at the end of garbage collection

- In WinDbg with the SOS debugger extension loaded, enter the following command:

  `bp mscorwks!WKS::GCHeap::RestartEE "j (dwo(mscorwks!WKS::GCHeap::GcCondemnedGeneration)==2) 'kb';'g'"`

  Set `GcCondemnedGeneration` to the desired generation. This command requires private symbols.

  This command forces a break if `RestartEE` is executed after generation 2 objects have been reclaimed for garbage collection.

  In server garbage collection, only one thread calls `RestartEE`, so the breakpoint will occur only once during a generation 2 garbage collection.
