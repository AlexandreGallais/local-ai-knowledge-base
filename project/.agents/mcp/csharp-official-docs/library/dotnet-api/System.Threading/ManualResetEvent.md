---
title: "ManualResetEvent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ManualResetEvent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ManualResetEvent class

Namespace: `System.Threading`

```csharp
public sealed class ManualResetEvent : System.Threading.EventWaitHandle
```

Represents a thread synchronization event that, when signaled, must be reset manually. This class cannot be inherited.

#### Remarks

You use `ManualResetEvent`, `AutoResetEvent`, and `EventWaitHandle` for thread interaction (or thread signaling). For more information, see the Thread interaction, or signaling section of the Overview of synchronization primitives article.

When a thread begins an activity that must complete before other threads proceed, it calls ManualResetEvent.Reset to put `ManualResetEvent` in the non-signaled state. This thread can be thought of as controlling the `ManualResetEvent`. Threads that call ManualResetEvent.WaitOne block, awaiting the signal. When the controlling thread completes the activity, it calls ManualResetEvent.Set to signal that the waiting threads can proceed. All waiting threads are released.

Once it has been signaled, `ManualResetEvent` remains signaled until it is manually reset by calling the `Reset` method. That is, calls to `WaitHandle.WaitOne` return immediately.

You can control the initial state of a `ManualResetEvent` by passing a Boolean value to the constructor: `true` if the initial state is signaled, and `false` otherwise.

`ManualResetEvent` can also be used with the `static` `WaitHandle.WaitAll` and `WaitHandle.WaitAny` methods.

`ManualResetEvent` derives from the `EventWaitHandle` class. A `ManualResetEvent` is functionally equivalent to an `EventWaitHandle` created with `ManualReset`.

> **Note:**
> Unlike the `ManualResetEvent` class, the `EventWaitHandle` class provides access to named system synchronization events.

The `ManualResetEventSlim` class is a lightweight alternative to `ManualResetEvent`.

#### Examples
The following example demonstrates how `ManualResetEvent` works. The example starts with a `ManualResetEvent` in the unsignaled state (that is, `false` is passed to the constructor). The example creates three threads, each of which blocks on the `ManualResetEvent` by calling its `WaitHandle.WaitOne` method. When the user presses the **Enter** key, the example calls the `EventWaitHandle.Set` method, which releases all three threads. Contrast this with the behavior of the `AutoResetEvent` class, which releases threads one at a time, resetting automatically after each release.

Pressing the **Enter** key again demonstrates that the `ManualResetEvent` remains in the signaled state until its `EventWaitHandle.Reset` method is called: The example starts two more threads. These threads do not block when they call the `WaitHandle.WaitOne` method, but instead run to completion.

Pressing the **Enter** key again causes the example to call the `EventWaitHandle.Reset` method and to start one more thread, which blocks when it calls `WaitHandle.WaitOne`. Pressing the **Enter** key one final time calls `EventWaitHandle.Set` to release the last thread, and the program ends.

_Code sample not included: ~/snippets/csharp/System.Threading/ManualResetEvent/Overview/source.cs._

## ManualResetEvent.ManualResetEvent(Boolean) constructor

```csharp
public ManualResetEvent (bool initialState);
```

Initializes a new instance of the `ManualResetEvent` class with a Boolean value indicating whether to set the initial state to signaled.

Parameters:

- `initialState`: `true` to set the initial state signaled; `false` to set the initial state to nonsignaled.

#### Remarks
If the initial state of a `ManualResetEvent` is signaled (that is, if it is created by passing `true` for `initialState`), threads that wait on the `ManualResetEvent` do not block. If the initial state is nonsignaled, threads block until the `EventWaitHandle.Set` method is called.
