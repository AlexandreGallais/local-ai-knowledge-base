---
title: "Memory management and patterns in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/memory.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Memory management and garbage collection in ASP.NET Core

By Sébastien Ros and Rick Anderson

Memory management is complex, even in a managed framework like .NET. Analyzing and resolving memory issues can be challenging. Memory leaks and garbage collection (GC) issues are commonly due to a lack of understanding about how memory consumption works in .NET, or not understanding the process for measuring usage.

This article demonstrates common memory use patterns that can be problematic, and suggests alternate approaches.

## Explore garbage collection (GC) in .NET

The GC process allocates heap segments where each segment is a contiguous range of memory. Objects placed in the heap are categorized into one of three generations: 0, 1, or 2. The generation determines the frequency of the GC attempts to release memory on managed objects that the app no longer references.  The GC addresses the lower-numbered generations more frequently.

Objects are moved from one generation to another based on their lifetime. As objects live longer, they're moved into a higher generation. As mentioned previously, GC runs less often on higher generations. Short-lived objects always remain in Gen 0. For example, objects that are referenced during the life of a web request are short lived. Application level singletons generally migrate to Gen 2.

When an ASP.NET Core app starts, the GC process:

* Reserves some memory for the initial heap segments.
* Commits a small portion of memory when the runtime loads.

The preceding memory allocations are done for performance reasons. The performance benefit comes from heap segments in contiguous memory.

### Review caveats when using GC.Collect

In general, ASP.NET Core apps in production should **not** use the GC.Collect method explicitly. Inducing garbage collections at suboptimal times can decrease performance significantly.

`GC.Collect` is useful when investigating memory leaks. Calling `GC.Collect()` triggers a blocking garbage collection cycle that tries to reclaim all objects inaccessible from managed code. It's a useful way to understand the size of the reachable live objects in the heap, and track growth of memory size over time.

## Analyze the memory usage of an app

Dedicated tools can help analyze memory usage, including:

* Counting object references.
* Measuring how much effect the GC has on CPU usage.
* Measuring memory space used for each generation.

Use the following tools to analyze memory usage:

* dotnet-trace utility (can use on production machines)
* Analyze memory usage without the Visual Studio debugger
* Measure memory usage in Visual Studio

### Detect memory issues

Task Manager can be used to get an idea of how much memory an ASP.NET app is using. The Task Manager memory value:

* Represents the amount of memory used by the ASP.NET process.
* Includes the app's living objects and other memory consumers such as native memory usage.

If the Task Manager memory value increases indefinitely and never flattens out, the app has a memory leak. The following sections demonstrate and explain several memory usage patterns.
