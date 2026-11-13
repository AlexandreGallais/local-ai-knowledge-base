---
title: "Asynchronous Programming Using Delegates"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/asynchronous-programming-using-delegates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Asynchronous Programming Using Delegates

Delegates enable you to call a synchronous method in an asynchronous manner. When you call a delegate synchronously, the `Invoke` method calls the target method directly on the current thread. If the `BeginInvoke` method is called, the common language runtime (CLR) queues the request and returns immediately to the caller. The target method is called asynchronously on a thread from the thread pool. The original thread, which submitted the request, is free to continue executing in parallel with the target method. If a callback method has been specified in the call to the `BeginInvoke` method, the callback method is called when the target method ends. In the callback method, the `EndInvoke` method obtains the return value and any input/output or output-only parameters. If no callback method is specified when calling `BeginInvoke`, `EndInvoke` can be called from the thread that called `BeginInvoke`.

> **Important:**
> Compilers should emit delegate classes with `Invoke`, `BeginInvoke`, and `EndInvoke` methods using the delegate signature specified by the user. The `BeginInvoke` and `EndInvoke` methods should be decorated as native. Because these methods are marked as native, the CLR automatically provides the implementation at class load time. The loader ensures that they are not overridden.

## In This Section

 Calling Synchronous Methods Asynchronously
 Discusses the use of delegates to make asynchronous calls to ordinary methods, and provides simple code examples that show the four ways to wait for an asynchronous call to return.

## Related Sections

 Event-based Asynchronous Pattern (EAP)
 Describes asynchronous programming in .NET.

## See also

- `System.Delegate`
