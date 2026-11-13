---
title: ".NET debugger extensions (part 5 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/debugger-extensions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET debugger extensions (part 5 of 5)

### LLDB Debugger

For instructions on configuring the .NET debugger extensions for LLDB, see dotnet-debugger-extensions. The commands can be used on live processes or dumps.

By default you can reach all the commands by entering: `sos [command_name]`. However, the common commands have been aliased so that you don't need the `sos` prefix:

| Command                               | Function |
| ------------------------------------- | ------------------------------------------------------------------------------------------- |
|    `analyzeoom`                       | Displays the info of the last OOM that occurred on an allocation request to the GC heap. |
|    `bpmd`                             | Creates a breakpoint at the specified managed method in the specified module. |
|    `clrmodules`                       | Lists the managed modules in the process. |
|    `clrstack`                         | Provides a stack trace of managed code only. |
|    `clrthreads`                       | Lists the managed threads that are running. |
|    `clru`                             | Displays an annotated disassembly of a managed method. |
|    `dbgout`                           | Enables/disables (`-off`) internal SOS logging. |
|    `dso`                              | Displays all managed objects found within the bounds of the current stack. |
|    `dumpalc`                          | Displays details about a collectible AssemblyLoadContext to which the specified object is loaded. |
|    `dumparray`                        | Displays details about a managed array. |
|    `dumpasync`                        | Displays info about async state machines on the garbage-collected heap. |
|    `dumpassembly`                     | Displays details about an assembly. |
|    `dumpclass`                        | Displays information about the `EEClass` structure at the specified address. |
|    `dumpconcurrentdictionary`         | Displays concurrent dictionary content. |
|    `dumpconcurrentqueue`              | Displays concurrent queue content. |
|    `dumpdelegate`                     | Displays information about a delegate. |
|    `dumpdomain`                       | Displays information about the all assemblies within all the AppDomains or the specified one. |
|    `dumpgcdata`                       | Displays information about the GC data. |
|    `dumpgen`                          | Displays heap content for the specified generation. |
|    `dumpheap`                         | Displays info about the garbage-collected heap and collection statistics about objects. |
|    `dumpil`                           | Displays the common intermediate language (CIL) that's associated with a managed method. |
|    `dumplock`                         | Displays information about System.Threading.Lock objects, such as those being held by threads (default), or those being waited upon by threads. This command is available in .NET debugger extensions only. |
|    `dumplog`                          | Writes the contents of an in-memory stress log to the specified file. |
|    `dumpmd`                           | Displays information about the `MethodDesc` structure at the specified address. |
|    `dumpmodule`                       | Displays information about the module at the specified address. |
|    `dumpmt`                           | Displays information about the method table at the specified address. |
|    `dumpobj`                          | Displays info the object at the specified address. |
|    `dumpruntimetypes`                 | Finds all System.RuntimeType objects in the GC heap and prints the type name and MethodTable they refer too. |
|    `dumpsig`                          | Dumps the signature of a method or field specified by `<sigaddr> <moduleaddr>`. |
|    `dumpsigelem`                      | Dumps a single element of a signature object. |
|    `dumpstack`                        | Displays a native and managed stack trace. |
|    `dumpstackobjects`                 | Displays all managed objects found within the bounds of the current stack. |
|    `dumpvc`                           | Displays info about the fields of a value class. |
|    `eeheap`                           | Displays info about process memory consumed by internal runtime data structures. |
|    `eestack`                          | Runs `dumpstack` on all threads in the process. |
|    `eeversion`                        | Displays information about the runtime and SOS versions. |
|    `ehinfo`                           | Displays the exception handling blocks in a JIT-ed method. |
|    `finalizequeue`                    | Displays all objects registered for finalization. |
|    `findappdomain`                    | Attempts to resolve the AppDomain of a GC object. |
|    `findroots`                        | Finds and displays object roots across GC collections. |
|    `gchandles`                        | Displays statistics about garbage collector handles in the process. |
|    `gcheapstat`                       | Displays statistics about garbage collector. |
|    `gcinfo`                           | Displays the JIT GC encoding for a method. |
|    `gcroot`                           | Displays info about references (or roots) to the object at the specified address. |
|    `gcwhere`                          | Displays the location in the GC heap of the specified address. |
|    `histclear`                        | Releases any resources used by the family of Hist commands. |
|    `histinit`                         | Initializes the SOS structures from the stress log saved in the debuggee. |
|    `histobj`                          | Examines all stress log relocation records and displays the chain of garbage collection relocations that may have led to the address passed in as an argument. |
|    `histobjfind`                      | Displays all the log entries that reference the object at the specified address. |
|    `histroot`                         | Displays information related to both promotions and relocations of the specified root. |
|    `histstats`                        | Displays stress log stats. |
|    `ip2md`                            | Displays the `MethodDesc` structure at the specified address in code that has been JIT-compiled. |
|    `listnearobj`                      | Displays the object preceding and succeeding the specified address. |
|    `loadsymbols`                      | Loads the .NET native module symbols. |
|    `logging`                          | Enables/disables internal SOS logging. |
|    `name2ee`                          | Displays the `MethodTable` and `EEClass` structures for the specified type or method in the specified module. |
|    `objsize`                          | Displays the size of the specified object. |
|    `parallelstacks`                   | Displays the merged threads stack similarly to the Visual Studio 'Parallel Stacks' panel. |
|    `pathto`                           | Displays the GC path from `<root>` to `<target>`. |
|    `pe`                               | Displays and formats fields of any object derived from the `System.Exception` class at the specified address. |
|    `printexception`                   | Displays and formats fields of any object derived from the `System.Exception` class at the specified address. |
|    `runtimes`                         | Lists the runtimes in the target or change the default runtime. |
|    `stoponcatch`                      | Target process will break the next time a managed exception is caught during execution. |
|    `setclrpath`                       | Sets the path to load coreclr dac/dbi files. `setclrpath `. |
|    `sethostruntime`                   | Sets or displays the .NET runtime directory to use to run managed code in SOS. |
|    `setsymbolserver`                  | Enables the symbol server support. |
|    `setsostid`                        | Sets the current OS tid/thread index instead of using the one LLDB provides. `setsostid <tid> <index>`. |
|    `sos`                              | Executes various coreclr debugging commands. Use the syntax `sos <command-name> <args>`. For more information, see 'soshelp'. |
|    `soshelp`                          | Displays all available commands when no parameter is specified, or displays detailed help information about the specified command: `soshelp <command>`. |
|    `syncblk`                          | Displays the SyncBlock holder info. |
|    `taskstate`                        | Displays a Task state in a human readable format. |
|    `threadpool`                       | Displays info about the runtime thread pool. |
|    `threadpoolqueue`                  | Displays queued thread pool work items. |
|    `threadstate`                      | Pretty prints the meaning of a threads state. |
|    `timerinfo`                        | Displays information about running timers. |
|    `token2ee`                         | Displays the MethodTable structure and MethodDesc structure for the specified token and module. |
|    `traverseheap`                     | Writes out heap information to a file in a format understood by the CLR Profiler. |
|    `verifyheap`                       | Checks the GC heap for signs of corruption. |
|    `verifyobj`                        | Checks the object that is passed as an argument for signs of corruption. |

## Windbg/cdb example usage

| Command  | Description |
| - | - |
| `!dumparray -start 2 -length 5 -details 00ad28d0` | Displays the contents of an array at the address `00ad28d0`. The display starts from the second element and continues for five elements. |
| `!dumpassembly 1ca248` | Displays the contents of an assembly at the address `1ca248`. |
| `!dumpheap` | Displays information about the garbage collector heap. |
| `!DumpLog` | Writes the contents of the in-memory stress log to a (default) file called StressLog.txt in the current directory. |
| `!dumpmd 902f40` | Displays the `MethodDesc` structure at the address `902f40`. |
| `!dumpmodule 1caa50` | Displays information about a module at the address `1caa50`. |
| `!DumpObj a79d40` | Displays information about an object at the address `a79d40`. |
| `!DumpVC 0090320c 00a79d9c` | Displays the fields of a value class at the address `00a79d9c` using the method table at the address `0090320c`. |
| `!eeheap` -gc | Displays the process memory used by the garbage collector. |
| `!finalizequeue` | Displays all objects scheduled for finalization. |
| `!findappdomain 00a79d98` | Determines the application domain of an object at the address `00a79d98`. |
| `!gcinfo 5b68dbb8` | Displays all garbage collector handles in the current process. |
| `!name2ee unittest.exe MainClass.Main` | Displays the `MethodTable` and `EEClass` structures for the `Main` method in the class `MainClass` in the module `unittest.exe`. |
| `!token2ee unittest.exe 02000003` | Displays information about the metadata token at the address `02000003` in the module `unittest.exe`. |

## LLDB example usage

| Command  | Description |
| - | - |
| `dumparray -start 2 -length 5 -details 00ad28d0` | Displays the contents of an array at the address `00ad28d0`. The display starts from the second element and continues for five elements. |
| `dumpassembly 1ca248` | Displays the contents of an assembly at the address `1ca248`. |
| `dumpheap` | Displays information about the garbage collector heap. |
| `dumplog` | Writes the contents of the in-memory stress log to a (default) file called StressLog.txt in the current directory. |
| `dumpmd 902f40` | Displays the `MethodDesc` structure at the address `902f40`. |
| `dumpmodule 1caa50` | Displays information about a module at the address `1caa50`. |
| `dumpobj a79d40` | Displays information about an object at the address `a79d40`. |
| `dumpvc 0090320c 00a79d9c` | Displays the fields of a value class at the address `00a79d9c` using the method table at the address `0090320c`. |
| `eeheap -gc` | Displays the process memory used by the garbage collector. |
| `findappdomain 00a79d98` | Determines the application domain of an object at the address `00a79d98`. |
| `gcinfo 5b68dbb8` | Displays all garbage collector handles in the current process. |
| `name2ee unittest.exe MainClass.Main` | Displays the `MethodTable` and `EEClass` structures for the `Main` method in the class `MainClass` in the module `unittest.exe`. |
| `token2ee unittest.exe 02000003` | Displays information about the metadata token at the address `02000003` in the module `unittest.exe`. |
| `clrthreads` | Displays the managed threads. |

## See also

- An introduction to dumps in .NET
- Learn how to debug a memory leak in .NET
- Collecting and analyzing memory dumps blog
- Dump analysis tool (dotnet-dump)
- .NET debugger extensions installer (dotnet-debugger-extensions)
- Heap analysis tool (dotnet-gcdump)
