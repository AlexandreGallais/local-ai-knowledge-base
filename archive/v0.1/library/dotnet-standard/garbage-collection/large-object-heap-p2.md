---
title: "Large object heap (LOH) on Windows (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/large-object-heap.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Large object heap (LOH) on Windows (part 2 of 2)

## Collect performance data for the LOH

Before you collect performance data for a specific area, you should already have done the following:

1. Found evidence that you should be looking at this area.
2. Exhausted other areas that you know of without finding anything that could explain the performance problem you saw.

For more information on the fundamentals of memory and the CPU, see the blog Understand the problem before you try to find a solution.

You can use the following tools to collect data on LOH performance:

- .NET CLR memory performance counters
- ETW events
- A debugger

### .NET CLR Memory performance counters

.NET CLR Memory performance counters are usually a good first step in investigating performance issues (although we recommend that you use ETW events). A common way to look at performance counters is with Performance Monitor (perfmon.exe). Select **Add** (`Ctrl` + `A`) to add the interesting counters for processes that you care about. You can save the performance counter data to a log file.

The following two counters in the **.NET CLR Memory** category are relevant for the LOH:

- **# Gen 2 Collections**

   Displays the number of times generation 2 GCs have occurred since the process started. The counter is incremented at the end of a generation 2 collection (also called a full garbage collection). This counter displays the last observed value.

- **Large Object Heap size**

   Displays the current size, in bytes, including free space, of the LOH. This counter is updated at the end of a garbage collection, not at each allocation.

You can also query performance counters programmatically using the `System.Diagnostics.PerformanceCounter` class. For the LOH, specify ".NET CLR Memory" as the `System.Diagnostics.PerformanceCounter.CategoryName` and "Large Object Heap size" as the `System.Diagnostics.PerformanceCounter.CounterName`.

```csharp
PerformanceCounter performanceCounter = new()
{
    CategoryName = ".NET CLR Memory",
    CounterName = "Large Object Heap size",
    InstanceName = "<instance_name>"
};

Console.WriteLine(performanceCounter.NextValue());
```

It's common to collect counters programmatically as part of a routine testing process. When you spot counters with values that are out of the ordinary, use other means to get more detailed data to help with the investigation.

> **Note:**
> We recommend that you use ETW events instead of performance counters, because ETW provides much richer information.

### ETW events

The garbage collector provides a rich set of ETW events to help you understand what the heap is doing and why. The following blog posts show how to collect and understand GC events with ETW:

- GC ETW Events - 1
- GC ETW Events - 2
- GC ETW Events - 3
- GC ETW Events - 4

To identify excessive generation 2 GCs caused by temporary LOH allocations, look at the Trigger Reason column for GCs. For a simple test that only allocates temporary large objects, you can collect information on ETW events with the following PerfView command:

```console
perfview /GCCollectOnly /AcceptEULA /nogui collect
```

The result is something like this:

As you can see, all GCs are generation 2 GCs, and they are all triggered by AllocLarge, which means that allocating a large object triggered this GC. We know that these allocations are temporary because the **LOH Survival Rate %** column says 1%.

You can collect additional ETW events that tell you who allocated these large objects. The following command line:

```console
perfview /GCOnly /AcceptEULA /nogui collect
```

collects an AllocationTick event, which is fired approximately every 100k worth of allocations. In other words, an event is fired each time a large object is allocated. You can then look at one of the GC Heap Alloc views, which show you the callstacks that allocated large objects:

As you can see, this is a very simple test that just allocates large objects from its `Main` method.

### A debugger

If all you have is a memory dump and you need to look at what objects are actually on the LOH, you can use the SoS debugger extension provided by .NET.

> **Note:**
> The debugging commands mentioned in this section are applicable to the Windows debuggers.

The following shows sample output from analyzing the LOH:

```console
0:003> .loadby sos mscorwks
0:003> !eeheap -gc
Number of GC Heaps: 1
generation 0 starts at 0x013e35ec
sdgeneration 1 starts at 0x013e1b6c
generation 2 starts at 0x013e1000
ephemeral segment allocation context: none
segment   begin allocated     size
0018f2d0 790d5588 790f4b38 0x0001f5b0(128432)
013e0000 013e1000 013e35f8 0x000025f8(9720)
Large object heap starts at 0x023e1000
segment   begin allocated     size
023e0000 023e1000 033db630 0x00ffa630(16754224)
033e0000 033e1000 043cdf98 0x00fecf98(16699288)
043e0000 043e1000 05368b58 0x00f87b58(16284504)
Total Size 0x2f90cc8(49876168)
------------------------------
GC Heap Size 0x2f90cc8(49876168)
0:003> !dumpheap -stat 023e1000 033db630
total 133 objects
Statistics:
MT   Count   TotalSize Class Name
001521d0       66     2081792     Free
7912273c       63     6663696 System.Byte[]
7912254c       4     8008736 System.Object[]
Total 133 objects
```

The LOH heap size is (16,754,224 + 16,699,288 + 16,284,504) = 49,738,016 bytes. Between addresses 023e1000 and 033db630, 8,008,736 bytes are occupied by an array of `System.Object` objects, 6,663,696 bytes are occupied by an array of `System.Byte`  objects, and 2,081,792 bytes are occupied by free space.

Sometimes, the debugger shows that the total size of the LOH is less than 85,000 bytes. This happens because the runtime itself uses the LOH to allocate some objects that are smaller than a large object.

Because the LOH is not compacted, sometimes the LOH is thought to be the source of fragmentation. Fragmentation means:

- Fragmentation of the managed heap, which is indicated by the amount of free space between managed objects. In SoS, the `!dumpheap –type Free` command displays the amount of free space between managed objects.

- Fragmentation of the virtual memory (VM) address space, which is the memory marked as `MEM_FREE`. You can get it by using various debugger commands in windbg.

   The following example shows fragmentation in the VM space:

   ```console
   0:000> !address
   00000000 : 00000000 - 00010000
   Type     00000000
   Protect 00000001 PAGE_NOACCESS
   State   00010000 MEM_FREE
   Usage   RegionUsageFree
   00010000 : 00010000 - 00002000
   Type     00020000 MEM_PRIVATE
   Protect 00000004 PAGE_READWRITE
   State   00001000 MEM_COMMIT
   Usage   RegionUsageEnvironmentBlock
   00012000 : 00012000 - 0000e000
   Type     00000000
   Protect 00000001 PAGE_NOACCESS
   State   00010000 MEM_FREE
   Usage   RegionUsageFree
   … [omitted]
   -------------------- Usage SUMMARY --------------------------
   TotSize (     KB)   Pct(Tots) Pct(Busy)   Usage
   701000 (   7172) : 00.34%   20.69%   : RegionUsageIsVAD
   7de15000 ( 2062420) : 98.35%   00.00%   : RegionUsageFree
   1452000 (   20808) : 00.99%   60.02%   : RegionUsageImage
   300000 (   3072) : 00.15%   08.86%   : RegionUsageStack
   3000 (     12) : 00.00%   00.03%   : RegionUsageTeb
   381000 (   3588) : 00.17%   10.35%   : RegionUsageHeap
   0 (       0) : 00.00%   00.00%   : RegionUsagePageHeap
   1000 (       4) : 00.00%   00.01%   : RegionUsagePeb
   1000 (       4) : 00.00%   00.01%   : RegionUsageProcessParametrs
   2000 (       8) : 00.00%   00.02%   : RegionUsageEnvironmentBlock
   Tot: 7fff0000 (2097088 KB) Busy: 021db000 (34668 KB)

   -------------------- Type SUMMARY --------------------------
   TotSize (     KB)   Pct(Tots) Usage
   7de15000 ( 2062420) : 98.35%   : <free>
   1452000 (   20808) : 00.99%   : MEM_IMAGE
   69f000 (   6780) : 00.32%   : MEM_MAPPED
   6ea000 (   7080) : 00.34%   : MEM_PRIVATE

   -------------------- State SUMMARY --------------------------
   TotSize (     KB)   Pct(Tots) Usage
   1a58000 (   26976) : 01.29%   : MEM_COMMIT
   7de15000 ( 2062420) : 98.35%   : MEM_FREE
   783000 (   7692) : 00.37%   : MEM_RESERVE

   Largest free region: Base 01432000 - Size 707ee000 (1843128 KB)
   ```

It's more common to see VM fragmentation caused by temporary large objects that require the garbage collector to frequently acquire new managed heap segments from the OS and to release empty ones back to the OS.

To verify whether the LOH is causing VM fragmentation, you can set a breakpoint on VirtualAlloc and VirtualFree to see who called them. For example, to see who tried to allocate virtual memory chunks larger than 8 MB from the OS, you can set a breakpoint like this:

```console
bp kernel32!virtualalloc "j (dwo(@esp+8)>800000) 'kb';'g'"
```

This command breaks into the debugger and shows the call stack only if VirtualAlloc is called with an allocation size greater than 8 MB (0x800000).

CLR 2.0 added a feature called *VM Hoarding* that can be useful for scenarios where segments (including on the large and small object heaps) are frequently acquired and released. To specify VM Hoarding, you specify a startup flag called `STARTUP_HOARD_GC_VM` via the hosting API. Instead of releasing empty segments back to the OS, the CLR decommits the memory on these segments and puts them on a standby list. (Note that the CLR doesn't do this for segments that are too large.) The CLR later uses those segments to satisfy new segment requests. The next time that your app needs a new segment, the CLR uses one from this standby list if it can find one that's large enough.

VM hoarding is also useful for applications that want to hold onto the segments that they already acquired, such as some server apps that are the dominant apps running on the system, to avoid out-of-memory exceptions.

We strongly recommend that you carefully test your application when you use this feature to ensure your application has fairly stable memory usage.
