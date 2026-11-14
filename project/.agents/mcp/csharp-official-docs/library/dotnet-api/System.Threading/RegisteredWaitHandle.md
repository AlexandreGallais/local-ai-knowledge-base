---
title: "RegisteredWaitHandle class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/RegisteredWaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegisteredWaitHandle class

Namespace: `System.Threading`

```csharp
public sealed class RegisteredWaitHandle : MarshalByRefObject
```

Represents a handle that has been registered when calling `ThreadPool.RegisterWaitForSingleObject`. This class cannot be inherited.

#### Examples
The following example shows how to use a `RegisteredWaitHandle` to determine why a callback method is called, and how to unregister a task if the callback occurred because the wait handle was signaled.

The example also shows how to use the `ThreadPool.RegisterWaitForSingleObject` method to execute a specified callback method when a specified wait handle is signaled. In this example, the callback method is `WaitProc`, and the wait handle is an `AutoResetEvent`.

The example defines a `TaskInfo` class to hold the information that is passed to the callback when it executes. The example creates a `TaskInfo` object and assigns it some string data. The `RegisteredWaitHandle` that is returned by the `ThreadPool.RegisterWaitForSingleObject` method is assigned to the `Handle` field of the `TaskInfo` object so that the callback method has access to the `RegisteredWaitHandle`.

In addition to specifying `TaskInfo` as the object to pass to the callback method, the call to the `ThreadPool.RegisterWaitForSingleObject` method specifies the `AutoResetEvent` that the task will wait for, a `WaitOrTimerCallback` delegate that represents the `WaitProc` callback method, a one second time-out interval, and multiple callbacks.

When the main thread signals the `AutoResetEvent` by calling its `EventWaitHandle.Set` method, the `WaitOrTimerCallback` delegate is invoked. The `WaitProc` method tests `RegisteredWaitHandle` to determine whether a time-out occurred. If the callback was invoked because the wait handle was signaled, the `WaitProc` method unregisters the `RegisteredWaitHandle`, stopping additional callbacks. In the case of a time-out, the task continues to wait. The `WaitProc` method ends by printing a message to the console.

_Code sample not included: ~/snippets/csharp/System.Threading/RegisteredWaitHandle/Overview/source.cs._

## RegisteredWaitHandle.Unregister(WaitHandle) method

```csharp
public bool Unregister (System.Threading.WaitHandle? waitObject);
```

Cancels a registered wait operation issued by the `ThreadPool.RegisterWaitForSingleObject` method.

Parameters:

- `waitObject`: The `WaitHandle` to be signaled.

Returns: `true` if the function succeeds; otherwise, `false`.

#### Remarks
If `waitObject` is specified, it is signaled only if the `RegisteredWaitHandle` is successfully unregistered. If a callback method is in progress when `RegisteredWaitHandle.Unregister` executes, `waitObject` is not signaled until the callback method completes. In particular, if a callback method executes `RegisteredWaitHandle.Unregister`, `waitObject` is not signaled until that callback method completes.

#### Examples
The following example shows how to use the `RegisteredWaitHandle.Unregister` method to unregister a task if a callback occurred because the wait handle was signaled.

The example also shows how to use the `ThreadPool.RegisterWaitForSingleObject` method to execute a specified callback method when a specified wait handle is signaled. In this example, the callback method is `WaitProc`, and the wait handle is an `AutoResetEvent`.

The example defines a `TaskInfo` class to hold the information that is passed to the callback when it executes. The example creates a `TaskInfo` object and assigns it some string data. The `RegisteredWaitHandle` that is returned by the `ThreadPool.RegisterWaitForSingleObject` method is assigned to the `Handle` field of the `TaskInfo` object so that the callback method has access to the `RegisteredWaitHandle`.

In addition to specifying `TaskInfo` as the object to pass to the callback method, the call to the `ThreadPool.RegisterWaitForSingleObject` method specifies the `AutoResetEvent` that the task will wait for, a `WaitOrTimerCallback` delegate that represents the `WaitProc` callback method, a one second time-out interval, and multiple callbacks.

When the main thread signals the `AutoResetEvent` by calling its `EventWaitHandle.Set` method, the `WaitOrTimerCallback` delegate is invoked. The `WaitProc` method tests `RegisteredWaitHandle` to determine whether a time-out occurred. If the callback was invoked because the wait handle was signaled, the `WaitProc` method unregisters the `RegisteredWaitHandle`, stopping additional callbacks. In the case of a time-out, the task continues to wait. The `WaitProc` method ends by printing a message to the console.

_Code sample not included: ~/snippets/csharp/System.Threading/RegisteredWaitHandle/Overview/source.cs._
