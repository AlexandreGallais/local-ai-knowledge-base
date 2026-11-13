---
title: "dotnet-debug diagnostic tool - .NET CLI (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/dotnet-debug.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet-debug diagnostic tool - .NET CLI (part 2 of 2)

## Use `dotnet-debug` to attach to a live process

The following example shows how to attach to a running .NET process and investigate a thread pool issue:

```console
$ dotnet-debug attach 1902
Attaching to process: 1902 ...
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
00007FFD28B42DD0 00007FB1B1334F67 System.Reflection.RuntimeMethodInfo.Invoke(System.Object, System.Reflection.BindingFlags, System.Reflection.Binder, System.Object[], System.Globalization.CultureInfo)
00007FFD28B42E20 00007FB1B18D33ED SymbolTestApp.Program.Foo4(System.String)
00007FFD28B42ED0 00007FB1B18D2FC4 SymbolTestApp.Program.Foo2(Int32, System.String)
00007FFD28B42F00 00007FB1B18D2F5A SymbolTestApp.Program.Foo1(Int32, System.String)
00007FFD28B42F30 00007FB1B18D168E SymbolTestApp.Program.Main(System.String[])
```

To see an unhandled exception:

```console
> pe -lines
Exception object: 00007fb18c038590
Exception type:   System.Reflection.TargetInvocationException
Message:          Exception has been thrown by the target of an invocation.
InnerException:   System.Exception, Use !PrintException 00007FB18C038368 to see more.
StackTrace (generated):
SP               IP               Function
00007FFD28B42DD0 0000000000000000 System.Private.CoreLib.dll!System.RuntimeMethodHandle.InvokeMethod(System.Object, System.Object[], System.Signature, Boolean, Boolean)
00007FFD28B42DD0 00007FB1B1334F67 System.Private.CoreLib.dll!System.Reflection.RuntimeMethodInfo.Invoke(System.Object, System.Reflection.BindingFlags, System.Reflection.Binder, System.Object[], System.Globalization.CultureInfo)+0xa7
00007FFD28B42E20 00007FB1B18D33ED SymbolTestApp.dll!SymbolTestApp.Program.Foo4(System.String)+0x15d

StackTraceString: <none>
HResult: 80131604
```

## `dotnet-debug` vs `dotnet-dump`

`dotnet-debug` and `dotnet-dump` share the same SOS debugging commands but serve different primary purposes:

| Feature                    | `dotnet-debug` | `dotnet-dump` |
| -------------------------- | -------------- | ------------- |
| Attach to a live process   | ✔️             | ❌            |
| Collect dumps              | ❌             | ✔️            |
| Analyze dump files         | ✔️             | ✔️            |
| List .NET processes (`ps`) | ❌             | ✔️            |

Use `dotnet-debug` when you need to debug a live process interactively. Use `dotnet-dump` when you need to collect dumps or analyze them offline.

## See also

- Dump collection and analysis utility (dotnet-dump)
- SOS Debugging Extension for .NET
- Heap analysis tool (dotnet-gcdump)
