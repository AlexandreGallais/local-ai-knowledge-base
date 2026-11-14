---
title: "ThreadAbortException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadAbortException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadAbortException class

Namespace: `System.Threading`

```csharp
public sealed class ThreadAbortException : SystemException
```

The exception that is thrown when a call is made to the `Thread.Abort` method. This class cannot be inherited.

#### Remarks

> **Note:**
> Since `Thread.Abort` is not supported, the common language runtime won't ever throw `ThreadAbortException`.

> **Note:**
> When the common language runtime (CLR) stops background threads after all foreground threads in a managed executable have ended, it does not use `Thread.Abort`. Therefore, you cannot use `ThreadAbortException` to detect when background threads are being terminated by the CLR.

`ThreadAbortException` uses `HRESULT COR_E_THREADABORTED`, which has the value `0x80131530`.

> **Note:**
> The value of the inherited `Data` property is always `null`.

#### Examples
The following example demonstrates aborting a thread. The thread that receives the `ThreadAbortException` uses the `Thread.ResetAbort` method to cancel the abort request and continue executing.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadAbortException/Overview/threadabex.cs._

This code produces the following output:

```
Thread - working.
Main - aborting my thread.
Thread - caught ThreadAbortException - resetting.
Exception message: Thread was being aborted.
Thread - still alive and working.
Thread - finished working.
Main ending.
```

## ThreadAbortException.ExceptionState property

```csharp
public object? ExceptionState { get; }
```

Gets an object that contains application-specific information related to the thread abort.

Returns: An object containing application-specific information.

#### Remarks
The object returned by this property is specified through the `stateInfo` parameter of the `Thread.Abort` method. The exact content and usage of this object is application defined; it is typically used to convey information that is meaningful to the thread being aborted.

#### Examples
The following code example shows how to pass <example-value> to a thread that is being aborted.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Abort/source.cs._
