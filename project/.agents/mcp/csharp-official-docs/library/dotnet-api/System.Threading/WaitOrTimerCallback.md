---
title: "WaitOrTimerCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitOrTimerCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitOrTimerCallback delegate

Namespace: `System.Threading`

```csharp
public delegate void WaitOrTimerCallback(object? state, bool timedOut);
```

Represents a method to be called when a `WaitHandle` is signaled or times out.

Parameters:

- `state`: An object containing information to be used by the callback method each time it executes.
- `timedOut`: `true` if the `WaitHandle` timed out; `false` if it was signaled.

#### Remarks
`WaitOrTimerCallback` represents a callback method that you want to execute when a registered wait handle times out or is signaled. Create the delegate by passing your callback method to the `WaitOrTimerCallback` constructor. Your method must have the signature shown here.

Create the registered wait handle by passing the `WaitOrTimerCallback` delegate and a `WaitHandle` to `ThreadPool.RegisterWaitForSingleObject`. Your callback method executes each time the `WaitHandle` times out or is signaled.

> **Note:**
>  Visual Basic users can omit the `WaitOrTimerCallback` constructor, and simply use the `AddressOf` operator when passing the callback method to `ThreadPool.RegisterWaitForSingleObject`. Visual Basic <example-value> calls the correct delegate constructor.

If you want to pass <example-value> to your callback method, create an object that contains the necessary information and pass it to `ThreadPool.RegisterWaitForSingleObject` when you create the registered wait handle. Each time your callback method executes, the `state` parameter contains this object.

For more information about using callback methods to synchronize thread pool threads, see The managed thread pool.

#### Examples
The following example shows how to use the `WaitOrTimerCallback` delegate to represent a callback method that is executed when a wait handle is signaled.

The example also shows how to use the `ThreadPool.RegisterWaitForSingleObject` method to execute a specified callback method when a specified wait handle is signaled. In this example, the callback method is `WaitProc` and the wait handle is an `AutoResetEvent`.

The example defines a `TaskInfo` class to hold the information that is passed to the callback when it executes. The example creates a `TaskInfo` object and assigns it some string data. The `RegisteredWaitHandle` that is returned by the `ThreadPool.RegisterWaitForSingleObject` method is assigned to the `Handle` field of the `TaskInfo` object, so that the callback method has access to the `RegisteredWaitHandle`.

In addition to the `TaskInfo` object, the call to the `ThreadPool.RegisterWaitForSingleObject` method specifies the `AutoResetEvent` the task waits on, a `WaitOrTimerCallback` delegate that represents the `WaitProc` callback method, a one-second timeout interval, and multiple callbacks.

When the main thread signals the `AutoResetEvent` by calling its `EventWaitHandle.Set` method, the `WaitOrTimerCallback` delegate is invoked. The `WaitProc` method tests `RegisteredWaitHandle` to determine whether a timeout occurred. If the callback was invoked because the wait handle was signaled, the `WaitProc` method unregisters the `RegisteredWaitHandle`, stopping further callbacks. In the case of a timeout, the task continues waiting. The `WaitProc` method ends by printing a message to the console.

_Code sample not included: ~/snippets/csharp/System.Threading/RegisteredWaitHandle/Overview/source.cs._
