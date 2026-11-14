---
title: "dotnet-dump diagnostic tool - .NET CLI (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/dotnet-dump.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-dump diagnostic tool - .NET CLI (part 2 of 2)

## dotnet-dump ps

 Lists the dotnet processes that dumps can be collected from.
 `dotnet-dump` version 6.0.320703 and later versions also display the command-line arguments that each process was started with, if available.

### Synopsis

```console
dotnet-dump ps [-h|--help]
```

### Example

Suppose you start a long-running app using the command ```dotnet run --configuration Release```. In another window, you run the ```dotnet-dump ps``` command. The output you'll see is as follows. The command-line arguments, if any, are shown in `dotnet-dump` version 6.0.320703 and later.

```console
> dotnet-dump ps

  21932 dotnet     C:\Program Files\dotnet\dotnet.exe   run --configuration Release
  36656 dotnet     C:\Program Files\dotnet\dotnet.exe
```

## Using `dotnet-dump`

The first step is to collect a dump. This step can be skipped if a core dump has already been generated. The operating system or the .NET Core runtime's built-in dump generation feature can each create core dumps.

```console
$ dotnet-dump collect --process-id 1902
Writing minidump to file ./core_20190226_135837
Written 98983936 bytes (24166 pages) to core file
Complete
```

Now analyze the core dump with the `analyze` command:

```console
$ dotnet-dump analyze ./core_20190226_135850
Loading core dump: ./core_20190226_135850
Ready to process analysis commands. Type 'help' to list available commands or 'help [command]' to get detailed help on a command.
Type 'quit' or 'exit' to exit the session.
>
```

This action brings up an interactive session that accepts commands like:

```console
> clrstack
OS Thread Id: 0x573d (0)
    Child SP               IP Call Site
00007FFD28B42C58 00007fb22c1a8ed9 [HelperMethodFrame_PROTECTOBJ: 00007ffd28b42c58] System.RuntimeMethodHandle.InvokeMethod(System.Object, System.Object[], System.Signature, Boolean, Boolean)
00007FFD28B42DD0 00007FB1B1334F67 System.Reflection.RuntimeMethodInfo.Invoke(System.Object, System.Reflection.BindingFlags, System.Reflection.Binder, System.Object[], System.Globalization.CultureInfo) [/root/coreclr/src/mscorlib/src/System/Reflection/RuntimeMethodInfo.cs @ 472]
00007FFD28B42E20 00007FB1B18D33ED SymbolTestApp.Program.Foo4(System.String) [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 54]
00007FFD28B42ED0 00007FB1B18D2FC4 SymbolTestApp.Program.Foo2(Int32, System.String) [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 29]
00007FFD28B42F00 00007FB1B18D2F5A SymbolTestApp.Program.Foo1(Int32, System.String) [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 24]
00007FFD28B42F30 00007FB1B18D168E SymbolTestApp.Program.Main(System.String[]) [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 19]
00007FFD28B43210 00007fb22aa9cedf [GCFrame: 00007ffd28b43210]
00007FFD28B43610 00007fb22aa9cedf [GCFrame: 00007ffd28b43610]
```

To see an unhandled exception that killed your app:

```console
> pe -lines
Exception object: 00007fb18c038590
Exception type:   System.Reflection.TargetInvocationException
Message:          Exception has been thrown by the target of an invocation.
InnerException:   System.Exception, Use !PrintException 00007FB18C038368 to see more.
StackTrace (generated):
SP               IP               Function
00007FFD28B42DD0 <example-card-number> System.Private.CoreLib.dll!System.RuntimeMethodHandle.InvokeMethod(System.Object, System.Object[], System.Signature, Boolean, Boolean)
00007FFD28B42DD0 00007FB1B1334F67 System.Private.CoreLib.dll!System.Reflection.RuntimeMethodInfo.Invoke(System.Object, System.Reflection.BindingFlags, System.Reflection.Binder, System.Object[], System.Globalization.CultureInfo)+0xa7 [/root/coreclr/src/mscorlib/src/System/Reflection/RuntimeMethodInfo.cs @ 472]
00007FFD28B42E20 00007FB1B18D33ED SymbolTestApp.dll!SymbolTestApp.Program.Foo4(System.String)+0x15d [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 54]
00007FFD28B42ED0 00007FB1B18D2FC4 SymbolTestApp.dll!SymbolTestApp.Program.Foo2(Int32, System.String)+0x34 [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 29]
00007FFD28B42F00 00007FB1B18D2F5A SymbolTestApp.dll!SymbolTestApp.Program.Foo1(Int32, System.String)+0x3a [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 24]
00007FFD28B42F30 00007FB1B18D168E SymbolTestApp.dll!SymbolTestApp.Program.Main(System.String[])+0x6e [/home/mikem/builds/SymbolTestApp/SymbolTestApp/SymbolTestApp.cs @ 19]

StackTraceString: <none>
HResult: 80131604
```

## Analyze memory leaks and allocations

Memory leaks occur when your app holds references to objects that are no longer needed, preventing the garbage collector from reclaiming memory. Use `dotnet-dump` to identify memory leaks, find the largest objects, and understand where memory is being consumed.

For a complete walkthrough of debugging a memory leak, see Debug a memory leak in .NET.

### Identify the largest objects

Use the `dumpheap` command with the `-stat` option to see a summary of objects on the heap, sorted by total size:

```console
> dumpheap -stat

Statistics:
              MT    Count    TotalSize Class Name
00007f6c1eeefba8      576        59904 System.Reflection.RuntimeMethodInfo
00007f6c1dc021c8     1749        95696 System.SByte[]
00000000008c9db0     3847       116080      Free
00007f6c1e784a18      175       128640 System.Char[]
00007f6c1dbf5510      217       133504 System.Object[]
00007f6c1dc014c0      467       416464 System.Byte[]
00007f6c21625038        6      4063376 testwebapi.Controllers.Customer[]
00007f6c20a67498   200000      4800000 testwebapi.Controllers.Customer
00007f6c1dc00f90   206770     19494060 System.String
Total 428516 objects
```

This output shows you which types consume the most memory. In this example, `System.String` objects consume about 19 MB, and `Customer` objects consume about 4.8 MB.

### Identify objects by namespace or assembly

To find which modules or namespaces are consuming memory, use the `-type` option with a partial type name to filter results:

```console
> dumpheap -type MyCompany.Data -stat

Statistics:
              MT    Count    TotalSize Class Name
00007f6c21625038    15000      3600000 MyCompany.Data.CustomerRecord
00007f6c21625040     8000      2560000 MyCompany.Data.OrderHistory
00007f6c21625048     2000       960000 MyCompany.Data.ProductCache
Total 25000 objects, 7120000 bytes
```

This approach helps you identify which parts of your codebase are responsible for memory consumption.

### Find the highest number of instantiations

To see which types have the most instances, regardless of total size, look at the **Count** column in the `dumpheap -stat` output. Objects with high instance counts might indicate inefficient object creation or caching issues:

```console
> dumpheap -stat

Statistics:
              MT    Count    TotalSize Class Name
00007f6c1dc00f90   206770     19494060 System.String
00007f6c20a67498   200000      4800000 testwebapi.Controllers.Customer
00007f6c1dc021c8     1749        95696 System.SByte[]
```

This example shows 206,770 `String` instances and 200,000 `Customer` instances.

### Analyze object references with gcroot

After identifying large or numerous objects, use `gcroot` to find out why an object isn't being garbage collected. The `gcroot` command shows the reference chain from GC roots to a specific object:

```console
> dumpheap -mt 00007f6c20a67498
         Address               MT     Size
00007f6ad09421f8 00007f6c20a67498       24
...

> gcroot 00007f6ad09421f8

Thread 3f68:
    00007F6795BB58A0 00007F6C1D7D0745 testwebapi.Controllers.CustomerCache.GetAll()
        rbx:  (interior)
            ->  00007F6BDFFFF038 System.Object[]
            ->  00007F69D0033570 testwebapi.Controllers.Processor
            ->  00007F69D0033588 testwebapi.Controllers.CustomerCache
            ->  00007F69D00335A0 System.Collections.Generic.List`1[[testwebapi.Controllers.Customer]]
            ->  00007F6C000148A0 testwebapi.Controllers.Customer[]
            ->  00007F6AD0942258 testwebapi.Controllers.Customer

Found 1 root.
```

This output shows that the `Customer` object is held by a `CustomerCache` object, which helps you identify the source of the leak in your code.

### Analyze memory by object size

Use the `-min` and `-max` options to filter objects by size:

```console
> dumpheap -min 100000 -stat

Statistics:
              MT    Count    TotalSize Class Name
00007f6c21625038        6      4063376 testwebapi.Controllers.Customer[]
00007f6c1dc014c0       12       416464 System.Byte[]
Total 18 objects
```

This command shows only objects larger than 100,000 bytes, helping you focus on the biggest memory consumers.

## Find deadlocks

Use `dotnet-dump` to diagnose deadlock situations where threads are blocked waiting for resources. For a complete deadlock debugging walkthrough, see Debug a deadlock in .NET.

### List all threads

Use the `threads` command to see all managed threads:

```console
> threads
*0 0x1DBFF (121855)
 1 0x1DC01 (121857)
 2 0x1DC02 (121858)
 ...
```

### Examine thread stacks

Use `clrstack -all` to see the call stacks of all threads:

```console
> clrstack -all
```

Look for patterns where multiple threads are blocked on `Monitor.Enter` or similar synchronization primitives.

### Find lock owners

Use the `syncblk` command to see which threads hold locks and which threads are waiting:

```console
> syncblk
Index         SyncBlock MonitorHeld Recursion Owning Thread Info          SyncBlock Owner
   43 00000246E51268B8          603         1 0000024B713F4E30 5634  28   00000249654b14c0 System.Object
   44 00000246E5126908            3         1 0000024B713F47E0 51d4  29   00000249654b14d8 System.Object
```

The **MonitorHeld** column shows the number of threads waiting for the lock. The **Owning Thread Info** column shows which thread owns the lock.

## Advanced memory analysis scenarios

### Compare multiple dumps

To understand memory growth over time, collect multiple dumps and compare them:

1. Collect a baseline dump: `dotnet-dump collect -p <pid> -o baseline.dmp`
1. Let your app run and consume more memory.
1. Collect a second dump: `dotnet-dump collect -p <pid> -o after.dmp`
1. Analyze both dumps and compare the `dumpheap -stat` results.

Look for types that have significantly more instances or larger total sizes in the second dump.

### Analyze memory for specific object types

To dump all instances of a specific type:

```console
> dumpheap -type Customer
         Address               MT     Size
00007f6ad09421f8 00007f6c20a67498       24
00007f6ad0942210 00007f6c20a67498       24
...
```

Then use `dumpobj` to examine individual objects:

```console
> dumpobj 00007f6ad09421f8
Name:        testwebapi.Controllers.Customer
MethodTable: 00007f6c20a67498
EEClass:     00007f6c21625000
Size:        24(0x18) bytes
File:        /app/testwebapi.dll
Fields:
              MT    Field   Offset                 Type VT     Attr            Value Name
00007f6c1dc00f90  4000001        8        System.String  0 instance 00007f6ad09421f0 Name
00007f6c1dbf4c18  4000002       10         System.Int32  1 instance               42 Id
```

## Collect a dump in a Docker container

`dotnet-dump` requires `ptrace` capabilities in the container. A common way to grant them is to start the container with `--cap-add=SYS_PTRACE`. Depending on your environment, you might also need to adjust the container's seccomp profile. See the Dumps: FAQ for help diagnosing container security configuration issues.

To install `dotnet-dump` in a production image without the .NET SDK, use the direct download links from the Install section, or use a multi-stage Docker build to copy the tool binaries from an SDK image. For complete container diagnostics guidance, see Collect diagnostics in Linux containers.

## Troubleshooting dump collection issues

Dump collection requires the process to be able to call `ptrace`. If you are facing issues collecting dumps, the environment you are running on may be configured to restrict such calls. See our Dumps: FAQ for troubleshooting tips and potential solutions to common issues.

## See also

- Collect diagnostics in Linux containers
- Collecting and analyzing memory dumps blog
- Heap analysis tool (dotnet-gcdump)
