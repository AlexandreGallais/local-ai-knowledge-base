---
title: "Garbage Collection and Performance (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/garbage-collection/performance.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Garbage Collection and Performance (part 3 of 3)

### To determine the length of time in a garbage collection

- Examine the `% Time in GC` memory performance counter.

  The value is calculated by using a sample interval time. Because the counters are updated at the end of each garbage collection, the current sample will have the same value as the previous sample if no collections occurred during the interval.

  Collection time is obtained by multiplying the sample interval time with the percentage value.

  The following data shows four sampling intervals of two seconds, for an 8-second study. The `Gen0`, `Gen1`, and `Gen2` columns show the total number of garbage collections that have completed by the end of the interval for that generation.

  ```console
  Interval    Gen0    Gen1    Gen2    % Time in GC
          1       9       3       1              10
          2      10       3       1               1
          3      11       3       1               3
          4      11       3       1               3
  ```

  This information does not show when the garbage collection occurred, but you can determine the number of garbage collections that occurred in an interval of time. Assuming the worst case, the tenth generation 0 garbage collection finished at the start of the second interval, and the eleventh generation 0 garbage collection finished at the end of the third interval. The time between the end of the tenth and the end of the eleventh garbage collection is about 2 seconds, and the performance counter shows 3%, so the duration of the eleventh generation 0 garbage collection was (2 seconds * 3% = 60ms).

  In the next example, there are five intervals.

  ```console
  Interval    Gen0    Gen1    Gen2     % Time in GC
          1       9       3       1                3
          2      10       3       1                1
          3      11       4       1                1
          4      11       4       1                1
          5      11       4       2               20
  ```

  The second generation 2 garbage collection started during the fourth interval and finished at the fifth interval. Assuming the worst case, the last garbage collection was for a generation 0 collection that finished at the start of the third interval, and the generation 2 garbage collection finished at the end of the fifth interval. Therefore, the time between the end of the generation 0 garbage collection and the end of the generation 2 garbage collection is 4 seconds. Because the `% Time in GC` counter is 20%, the maximum amount of time the generation 2 garbage collection could have taken is (4 seconds * 20% = 800ms).

- Alternatively, you can determine the length of a garbage collection by using garbage collection ETW events, and analyze the information to determine the duration of garbage collection.

  For example, the following data shows an event sequence that occurred during a non-concurrent garbage collection.

  ```console
  Timestamp    Event name
  513052        GCSuspendEEBegin_V1
  513078        GCSuspendEEEnd
  513090        GCStart_V1
  517890        GCEnd_V1
  517894        GCHeapStats
  517897        GCRestartEEBegin
  517918        GCRestartEEEnd
  ```

  Suspending the managed thread took 26us (`GCSuspendEEEnd` – `GCSuspendEEBegin_V1`).

  The actual garbage collection took 4.8ms (`GCEnd_V1` – `GCStart_V1`).

  Resuming the managed threads took 21us (`GCRestartEEEnd` – `GCRestartEEBegin`).

  The following output provides an example for background garbage collection, and includes the process, thread, and event fields. (Not all data is shown.)

  ```console
  timestamp(us)    event name            process    thread    event field
  42504385        GCSuspendEEBegin_V1    Test.exe    4372             1
  42504648        GCSuspendEEEnd         Test.exe    4372
  42504816        GCStart_V1             Test.exe    4372        102019
  42504907        GCStart_V1             Test.exe    4372        102020
  42514170        GCEnd_V1               Test.exe    4372
  42514204        GCHeapStats            Test.exe    4372        102020
  42832052        GCRestartEEBegin       Test.exe    4372
  42832136        GCRestartEEEnd         Test.exe    4372
  63685394        GCSuspendEEBegin_V1    Test.exe    4744             6
  63686347        GCSuspendEEEnd         Test.exe    4744
  63784294        GCRestartEEBegin       Test.exe    4744
  63784407        GCRestartEEEnd         Test.exe    4744
  89931423        GCEnd_V1               Test.exe    4372        102019
  89931464        GCHeapStats            Test.exe    4372
  ```

  The `GCStart_V1` event at 42504816 indicates that this is a background garbage collection, because the last field is `1`. This becomes garbage collection No. 102019.

  The `GCStart` event occurs because there is a need for an ephemeral garbage collection before you start a background garbage collection. This becomes garbage collection No. 102020.

  At 42514170, garbage collection No. 102020 finishes. The managed threads are restarted at this point. This is completed on thread 4372, which triggered this background garbage collection.

  On thread 4744, a suspension occurs. This is the only time at which the background garbage collection has to suspend managed threads. This duration is approximately 99ms ((63784407-63685394)/1000).

  The `GCEnd` event for the background garbage collection is at 89931423. This means that the background garbage collection lasted for about 47seconds ((89931423-42504816)/1000).

  While the managed threads are running, you can see any number of ephemeral garbage collections occurring.

### To determine what triggered a garbage collection

- In the WinDbg or Visual Studio debugger with the SOS debugger extension loaded, enter the following command to show all the threads with their call stacks:

  **~\*kb**

  This command displays output similar to the following.

  ```console
  0012f3b0 79ff0bf8 mscorwks!WKS::GCHeap::GarbageCollect
  0012f454 30002894 mscorwks!GCInterface::CollectGeneration+0xa4
  0012f490 79fa22bd fragment_ni!request.Main(System.String[])+0x48
  ```

  If the garbage collection was caused by a low memory notification from the operating system, the call stack is similar, except that the thread is the finalizer thread. The finalizer thread gets an asynchronous low memory notification and induces the garbage collection.

  If the garbage collection was caused by memory allocation, the stack appears as follows:

  ```console
  0012f230 7a07c551 mscorwks!WKS::GCHeap::GarbageCollectGeneration
  0012f2b8 7a07cba8 mscorwks!WKS::gc_heap::try_allocate_more_space+0x1a1
  0012f2d4 7a07cefb mscorwks!WKS::gc_heap::allocate_more_space+0x18
  0012f2f4 7a02a51b mscorwks!WKS::GCHeap::Alloc+0x4b
  0012f310 7a02ae4c mscorwks!Alloc+0x60
  0012f364 7a030e46 mscorwks!FastAllocatePrimitiveArray+0xbd
  0012f424 300027f4 mscorwks!JIT_NewArr1+0x148
  000af70f 3000299f fragment_ni!request..ctor(Int32, Single)+0x20c
  0000002a 79fa22bd fragment_ni!request.Main(System.String[])+0x153
  ```

  A just-in-time helper (`JIT_New*`) eventually calls `GCHeap::GarbageCollectGeneration`. If you determine that generation 2 garbage collections are caused by allocations, you must determine which objects are collected by a generation 2 garbage collection and how to avoid them. That is, you want to determine the difference between the start and the end of a generation 2 garbage collection, and the objects that caused the generation 2 collection.

  For example, enter the following command in the debugger to show the beginning of a generation 2 collection:

  `!dumpheap –stat`

  Example output (abridged to show the objects that use the most space):

  ```console
  79124228    31857      9862328 System.Object[]
  035f0384    25668     11601936 Toolkit.TlkPosition
  00155f80    21248     12256296      Free
  79103b6c   297003     13068132 System.Threading.ReaderWriterLock
  7a747ad4   708732     14174640 System.Collections.Specialized.HybridDictionary
  7a747c78   786498     15729960 System.Collections.Specialized.ListDictionary+DictionaryNode
  7a747bac   700298     19608344 System.Collections.Specialized.ListDictionary
  035f0ee4    89192     38887712 Toolkit.TlkOrder
  00fcae40     6193     44911636 WaveBasedStrategy.Tick_Snap[]
  7912c444    91616     71887080 System.Double[]
  791242ec    32451     82462728 System.Collections.Hashtable+bucket[]
  790fa3e0  2459154    112128436 System.String
  Total 6471774 objects
  ```

  Repeat the command at the end of generation 2:

  `!dumpheap –stat`

  Example output (abridged to show the objects that use the most space):

  ```console
  79124228    26648      9314256 System.Object[]
  035f0384    25668     11601936 Toolkit.TlkPosition
  79103b6c   296770     13057880 System.Threading.ReaderWriterLock
  7a747ad4   708730     14174600 System.Collections.Specialized.HybridDictionary
  7a747c78   786497     15729940 System.Collections.Specialized.ListDictionary+DictionaryNode
  7a747bac   700298     19608344 System.Collections.Specialized.ListDictionary
  00155f80    13806     34007212      Free
  035f0ee4    89187     38885532 Toolkit.TlkOrder
  00fcae40     6193     44911636 WaveBasedStrategy.Tick_Snap[]
  791242ec    32370     82359768 System.Collections.Hashtable+bucket[]
  790fa3e0  2440020    111341808 System.String
  Total 6417525 objects
  ```

  The `double[]` objects disappeared from the end of the output, which means that they were collected. These objects account for approximately 70 MB. The remaining objects did not change much. Therefore, these `double[]` objects were the reason why this generation 2 garbage collection occurred. Your next step is to determine why the `double[]` objects are there and why they died. You can ask the code developer where these objects came from, or you can use the `gcroot` command.

### To determine whether high CPU usage is caused by garbage collection

- Correlate the `% Time in GC` memory performance counter value with the process time.

  If the `% Time in GC` value spikes at the same time as process time, garbage collection is causing a high CPU usage. Otherwise, profile the application to find where the high usage is occurring.

## See also

- Garbage Collection
