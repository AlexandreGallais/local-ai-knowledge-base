---
title: "AutoResetEvent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/AutoResetEvent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AutoResetEvent class

Namespace: `System.Threading`

```csharp
public sealed class AutoResetEvent : System.Threading.EventWaitHandle
```

Represents a thread synchronization event that, when signaled, releases one single waiting thread and then resets automatically. This class cannot be inherited.

#### Remarks

You use `AutoResetEvent`, `ManualResetEvent`, and `EventWaitHandle` for thread interaction (or thread signaling). For more information, see Thread interaction.

A thread waits for a signal by calling AutoResetEvent.WaitOne. If the `AutoResetEvent` is in the non-signaled state, the thread blocks until AutoResetEvent.Set is called. Calling `Set` signals `AutoResetEvent` to release a waiting thread. `AutoResetEvent` remains signaled until `Reset` is called or a single waiting thread is released, at which time it automatically returns to the non-signaled state.

If no threads are waiting when the `AutoResetEvent` goes into a signaled state, the state remains signaled until a thread observes the signal (by calling `WaitHandle.WaitOne`). That thread does not block: the `AutoResetEvent` releases the thread immediately and returns to the non-signaled state.

> **Important:**
> There's no guarantee that every call to the `EventWaitHandle.Set` method will release a thread. If two calls are too close together, so that the second call occurs before a thread has been released, only one thread is released. It's as if the second call did not happen. Also, if `EventWaitHandle.Set` is called when there are no threads waiting and the `AutoResetEvent` is already signaled, the call has no effect.

You can control the initial state of an `AutoResetEvent` by passing a Boolean value to the constructor: `true` if the initial state is signaled and `false` otherwise.

`AutoResetEvent` can also be used with the `static` `WaitHandle.WaitAll` and `WaitHandle.WaitAny` methods.

`AutoResetEvent` derives from the `EventWaitHandle` class. An `AutoResetEvent` is functionally equivalent to an `EventWaitHandle` created with `AutoReset`.

> **Note:**
> Unlike the `AutoResetEvent` class, the `EventWaitHandle` class provides access to named system synchronization events.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples

The following example shows how to use `AutoResetEvent` to release one thread at a time, by calling the `EventWaitHandle.Set` method (on the base class) each time the user presses the **Enter** key. The example starts three threads, which wait on an `AutoResetEvent` that was created in the signaled state. The first thread is released immediately, because the `AutoResetEvent` is already in the signaled state. This resets the `AutoResetEvent` to the non-signaled state, so that subsequent threads block. The blocked threads are not released until the user releases them one at a time by pressing the **Enter** key.

After the threads are released from the first `AutoResetEvent`, they wait on another `AutoResetEvent` that was created in the non-signaled state. All three threads block, so the `EventWaitHandle.Set` method must be called three times to release them all.

_Code sample not included: ~/snippets/csharp/System.Threading/AutoResetEvent/Overview/simplerisbetter.cs._

## AutoResetEvent.AutoResetEvent(Boolean) constructor

```csharp
public AutoResetEvent (bool initialState);
```

Initializes a new instance of the `AutoResetEvent` class with a Boolean value indicating whether to set the initial state to signaled.

Parameters:

- `initialState`: `true` to set the initial state to signaled; `false` to set the initial state to non-signaled.

#### Examples
The following example uses an `AutoResetEvent` to synchronize the activities of two threads. The first thread, which is the application thread, executes `Main`. It writes values to the protected resource, which is a `static` (`Shared` in Visual Basic) field named `number`. The second thread executes the static `ThreadProc` method, which reads the values written by `Main`.

The `ThreadProc` method waits for the `AutoResetEvent`. When `Main` calls the `EventWaitHandle.Set` method on the `AutoResetEvent`, the `ThreadProc` method reads one value. The `AutoResetEvent` immediately resets, so the `ThreadProc` method waits again.

The program logic guarantees that the `ThreadProc` method will never read the same value two times. It does not guarantee that the `ThreadProc` method will read every value written by `Main`. That guarantee would require a second `AutoResetEvent` lock.

After each write operation, `Main` yields by calling the `Thread.Sleep` method, to give the second thread a chance to execute. Otherwise, on a single-processor computer `Main` would write many values between any two read operations.

_Code sample not included: ~/snippets/csharp/System.Threading/AutoResetEvent/Overview/class1.cs._
