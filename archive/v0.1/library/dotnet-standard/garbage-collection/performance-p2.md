---
title: "Garbage Collection and Performance (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/performance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Garbage Collection and Performance (part 2 of 3)

## Performance check procedures

This section describes the following procedures to isolate the cause of your performance issue:

- Determine whether the problem is caused by garbage collection.
- Determine whether the out-of-memory exception is managed.
- Determine how much virtual memory can be reserved.
- Determine whether there is enough physical memory.
- Determine how much memory the managed heap is committing.
- Determine how much memory the managed heap reserves.
- Determine large objects in generation 2.
- Determine references to objects.
- Determine whether a finalizer has been run.
- Determine whether there are objects waiting to be finalized.
- Determine the amount of free space in the managed heap.
- Determine the number of pinned objects.
- Determine the length of time in a garbage collection.
- Determine what triggered a garbage collection.
- Determine whether high CPU usage is caused by garbage collection.

### To determine whether the problem is caused by garbage collection

- Examine the following two memory performance counters:

  - **% Time in GC**. Displays the percentage of elapsed time that was spent performing a garbage collection after the last garbage collection cycle. Use this counter to determine whether the garbage collector is spending too much time to make managed heap space available. If the time spent in garbage collection is relatively low, that could indicate a resource problem outside the managed heap. This counter may not be accurate when concurrent or background garbage collection is involved.

  - **# Total committed Bytes**. Displays the amount of virtual memory currently committed by the garbage collector. Use this counter to determine whether the memory consumed by the garbage collector is an excessive portion of the memory that your application uses.

  Most of the memory performance counters are updated at the end of each garbage collection. Therefore, they may not reflect the current conditions that you want information about.

### To determine whether the out-of-memory exception is managed

1. In the WinDbg or Visual Studio debugger with the SOS debugger extension loaded, enter the print exception (`pe`) command:

    `!pe`

    If the exception is managed, `System.OutOfMemoryException` is displayed as the exception type, as shown in the following example.

    ```console
    Exception object: 39594518
    Exception type: System.OutOfMemoryException
    Message: <none>
    InnerException: <none>
    StackTrace (generated):
    ```

2. If the output does not specify an exception, you have to determine which thread the out-of-memory exception is from. Enter the following command in the debugger to show all the threads with their call stacks:

    `~\*kb`

    The thread with the stack that has exception calls is indicated by the `RaiseTheException` argument. This is the managed exception object.

    ```console
    28adfb44 7923918f 5b61f2b4 00000000 5b61f2b4 mscorwks!RaiseTheException+0xa0
    ```

3. You can use the following command to dump nested exceptions.

    `!pe -nested`

    If you do not find any exceptions, the out-of-memory exception originated from unmanaged code.

### To determine how much virtual memory can be reserved

- In WinDbg with the SOS debugger extension loaded, enter the following command to get the largest free region:

  `!address -summary`

  The largest free region is displayed as shown in the following output.

  ```console
  Largest free region: Base 54000000 - Size 0003A980
  ```

  In this example, the size of the largest free region is approximately 24000 KB (3A980 in hexadecimal). This region is much smaller than what the garbage collector needs for a segment.

  **-or-**

- Use the `vmstat` command:

  `!vmstat`

  The largest free region is the largest value in the MAXIMUM column, as shown in the following output.

  ```console
  TYPE        MINIMUM   MAXIMUM     AVERAGE   BLK COUNT   TOTAL
  ~~~~        ~~~~~~~   ~~~~~~~     ~~~~~~~   ~~~~~~~~~~  ~~~~
  Free:
  Small       8K        64K         46K       36          1,671K
  Medium      80K       864K        349K      3           1,047K
  Large       1,384K    1,278,848K  151,834K  12          1,822,015K
  Summary     8K        1,278,848K  35,779K   51          1,824,735K
  ```

### To determine whether there is enough physical memory

1. Start Windows Task Manager.
2. On the `Performance` tab, look at the committed value. (In Windows 7, look at `Commit (KB)` in the `System group`.)

    If the `Total` is close to the `Limit`, you are running low on physical memory.

### To determine how much memory the managed heap is committing

- Use the `# Total committed bytes` memory performance counter to get the number of bytes that the managed heap is committing. The garbage collector commits chunks on a segment as needed, not all at the same time.

  > **Note:**
  > Do not use the `# Bytes in all Heaps` performance counter, because it does not represent actual memory usage by the managed heap. The size of a generation is included in this value and is actually its threshold size, that is, the size that induces a garbage collection if the generation is filled with objects. Therefore, this value is usually zero.

### To determine how much memory the managed heap reserves

- Use the `# Total reserved bytes` memory performance counter.

  The garbage collector reserves memory in segments, and you can determine where a segment starts by using the `eeheap` command.

  > **Important:**
  > Although you can determine the amount of memory the garbage collector allocates for each segment, segment size is implementation-specific and is subject to change at any time, including in periodic updates. Your app should never make assumptions about or depend on a particular segment size, nor should it attempt to configure the amount of memory available for segment allocations.

- In the WinDbg or Visual Studio debugger with the SOS debugger extension loaded, enter the following command:

  `!eeheap -gc`

  The result is as follows.

  ```console
  Number of GC Heaps: 2
  ------------------------------
  Heap 0 (002db550)
  generation 0 starts at 0x02abe29c
  generation 1 starts at 0x02abdd08
  generation 2 starts at 0x02ab0038
  ephemeral segment allocation context: none
    segment    begin allocated     size
  02ab0000 02ab0038  02aceff4 0x0001efbc(126908)
  Large object heap starts at 0x0aab0038
    segment    begin allocated     size
  0aab0000 0aab0038  0aab2278 0x00002240(8768)
  Heap Size   0x211fc(135676)
  ------------------------------
  Heap 1 (002dc958)
  generation 0 starts at 0x06ab1bd8
  generation 1 starts at 0x06ab1bcc
  generation 2 starts at 0x06ab0038
  ephemeral segment allocation context: none
    segment    begin allocated     size
  06ab0000 06ab0038  06ab3be4 0x00003bac(15276)
  Large object heap starts at 0x0cab0038
    segment    begin allocated     size
  0cab0000 0cab0038  0cab0048 0x00000010(16)
  Heap Size    0x3bbc(15292)
  ------------------------------
  GC Heap Size   0x24db8(150968)
  ```

  The addresses indicated by "segment" are the starting addresses of the segments.

### To determine large objects in generation 2

- In the WinDbg or Visual Studio debugger with the SOS debugger extension loaded, enter the following command:

  `!dumpheap –stat`

  If the managed heap is big, `dumpheap` may take a while to finish.

  You can start analyzing from the last few lines of the output, because they list the objects that use the most space. For example:

  ```console
  2c6108d4   173712     14591808 DevExpress.XtraGrid.Views.Grid.ViewInfo.GridCellInfo
  00155f80      533     15216804      Free
  7a747c78   791070     15821400 System.Collections.Specialized.ListDictionary+DictionaryNode
  7a747bac   700930     19626040 System.Collections.Specialized.ListDictionary
  2c64e36c    78644     20762016 DevExpress.XtraEditors.ViewInfo.TextEditViewInfo
  79124228   121143     29064120 System.Object[]
  035f0ee4    81626     35588936 Toolkit.TlkOrder
  00fcae40     6193     44911636 WaveBasedStrategy.Tick_Snap[]
  791242ec    40182     90664128 System.Collections.Hashtable+bucket[]
  790fa3e0  3154024    137881448 System.String
  Total 8454945 objects
  ```

  The last object listed is a string and occupies the most space. You can examine your application to see how your string objects can be optimized. To see strings that are between 150 and 200 bytes, enter the following:

  `!dumpheap -type System.String -min 150 -max 200`

  An example of the results is as follows.

  ```console
  Address  MT           Size  Gen
  1875d2c0 790fa3e0      152    2 System.String HighlightNullStyle_Blotter_PendingOrder-11_Blotter_PendingOrder-11
  …
  ```

  Using an integer instead of a string for an ID can be more efficient. If the same string is being repeated thousands of times, consider string interning. For more information about string interning, see the reference topic for the `System.String.Intern*` method.

### To determine references to objects

- In WinDbg with the SOS debugger extension loaded, enter the following command to list references to objects:

  `!gcroot`

  **-or-**

- To determine the references for a specific object, include the address:

  `!gcroot 1c37b2ac`

  Roots found on stacks may be false positives. For more information, use the command `!help gcroot`.

  ```console
  ebx:Root:19011c5c(System.Windows.Forms.Application+ThreadContext)->
  19010b78(DemoApp.FormDemoApp)->
  19011158(System.Windows.Forms.PropertyStore)->
  … [omitted]
  1c3745ec(System.Data.DataTable)->
  1c3747a8(System.Data.DataColumnCollection)->
  1c3747f8(System.Collections.Hashtable)->
  1c376590(System.Collections.Hashtable+bucket[])->
  1c376c98(System.Data.DataColumn)->
  1c37b270(System.Data.Common.DoubleStorage)->
  1c37b2ac(System.Double[])
  Scan Thread 0 OSTHread 99c
  Scan Thread 6 OSTHread 484
  ```

  The `gcroot` command can take a long time to finish. Any object that is not reclaimed by garbage collection is a live object. This means that some root is directly or indirectly holding onto the object, so `gcroot` should return path information to the object. You should examine the graphs returned and see why these objects are still referenced.

### To determine whether a finalizer has been run

- Run a test program that contains the following code:

  ```csharp
  GC.Collect();
  GC.WaitForPendingFinalizers();
  GC.Collect();
  ```

  If the test resolves the problem, this means that the garbage collector was not reclaiming objects, because the finalizers for those objects had been suspended. The `System.GC.WaitForPendingFinalizers*` method enables the finalizers to complete their tasks, and fixes the problem.

### To determine whether there are objects waiting to be finalized

1. In the WinDbg or Visual Studio debugger with the SOS debugger extension loaded, enter the following command:

    `!finalizequeue`

    Look at the number of objects that are ready for finalization. If the number is high, you must examine why these finalizers cannot progress at all or cannot progress fast enough.

2. To get an output of threads, enter the following command:

    `!threads -special`

    This command provides output such as the following.

    ```console
       OSID     Special thread type
    2    cd0    DbgHelper
    3    c18    Finalizer
    4    df0    GC SuspendEE
    ```

    The finalizer thread indicates which finalizer, if any, is currently being run. When a finalizer thread is not running any finalizers, it is waiting for an event to tell it to do its work. Most of the time you will see the finalizer thread in this state because it runs at THREAD_HIGHEST_PRIORITY and is supposed to finish running finalizers, if any, very quickly.

### To determine the amount of free space in the managed heap

- In the WinDbg or Visual Studio debugger with the SOS debugger extension loaded, enter the following command:

  `!dumpheap -type Free -stat`

  This command displays the total size of all the free objects on the managed heap, as shown in the following example.

  ```console
  total 230 objects
  Statistics:
        MT    Count    TotalSize Class Name
  00152b18      230     40958584      Free
  Total 230 objects
  ```

- To determine the free space in generation 0, enter the following command for memory consumption information by generation:

  `!eeheap -gc`

  This command displays output similar to the following. The last line shows the ephemeral segment.

  ```console
  Heap 0 (0015ad08)
  generation 0 starts at 0x49521f8c
  generation 1 starts at 0x494d7f64
  generation 2 starts at 0x007f0038
  ephemeral segment allocation context: none
  segment  begin     allocated  size
  00178250 7a80d84c  7a82f1cc   0x00021980(137600)
  00161918 78c50e40  78c7056c   0x0001f72c(128812)
  007f0000 007f0038  047eed28   0x03ffecf0(67103984)
  3a120000 3a120038  3a3e84f8   0x002c84c0(2917568)
  46120000 46120038  49e05d04   0x03ce5ccc(63855820)
  ```

- Calculate the space used by generation 0:

  `? 49e05d04-0x49521f8c`

  The result is as follows. Generation 0 is approximately 9 MB.

  ```console
  Evaluate expression: 9321848 = 008e3d78
  ```

- The following command dumps the free space within the generation 0 range:

  `!dumpheap -type Free -stat 0x49521f8c 49e05d04`

  The result is as follows.

  ```console
  ------------------------------
  Heap 0
  total 409 objects
  ------------------------------
  Heap 1
  total 0 objects
  ------------------------------
  Heap 2
  total 0 objects
  ------------------------------
  Heap 3
  total 0 objects
  ------------------------------
  total 409 objects
  Statistics:
        MT    Count TotalSize Class Name
  0015a498      409   7296540      Free
  Total 409 objects
  ```

  This output shows that the generation 0 portion of the heap is using 9 MB of space for objects and has 7 MB free. This analysis shows the extent to which generation 0 contributes to fragmentation. This amount of heap usage should be discounted from the total amount as the cause of fragmentation by long-term objects.

### To determine the number of pinned objects

- In the WinDbg or Visual Studio debugger with the SOS debugger extension loaded, enter the following command:

  `!gchandles`

  The statistics displayed includes the number of pinned handles, as the following example shows.

  ```console
  GC Handle Statistics:
  Strong Handles:      29
  Pinned Handles:      10
  ```
