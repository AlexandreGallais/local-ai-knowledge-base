---
title: "ThreadPool class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadPool.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadPool class (part 4 of 4)

## ThreadPool.UnsafeRegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, Int32, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle UnsafeRegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, int millisecondsTimeOutInterval, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, using a 32-bit signed integer for the time-out in milliseconds. This method does not propagate the calling stack to the worker thread.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The delegate to call when the `waitObject` parameter is signaled.
- `state`: The object that is passed to the delegate.
- `millisecondsTimeOutInterval`: The time-out in milliseconds. If the `millisecondsTimeOutInterval` parameter is 0 (zero), the function tests the object's state and returns immediately. If `millisecondsTimeOutInterval` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` object that can be used to cancel the registered wait operation.

Exceptions:

- `ArgumentOutOfRangeException`: The `millisecondsTimeOutInterval` parameter is less than -1.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Unlike the `ThreadPool.RegisterWaitForSingleObject` method, `ThreadPool.UnsafeRegisterWaitForSingleObject` does not propagate the calling stack to the worker thread. This allows code to lose the calling stack and thereby to elevate its security privileges.

Using a `Mutex` for `waitObject` does not provide mutual exclusion for the callbacks because the underlying Windows API uses the default `WT_EXECUTEDEFAULT` flag, so each callback is dispatched on a separate thread pool thread.

When you are finished using the `RegisteredWaitHandle` that is returned by this method, call its `RegisteredWaitHandle.Unregister` method to release references to the wait handle. We recommend that you always call the `RegisteredWaitHandle.Unregister` method, even if you specify `true` for `executeOnlyOnce`. Garbage collection works more efficiently if you call the `RegisteredWaitHandle.Unregister` method instead of depending on the registered wait handle's finalizer.

## ThreadPool.UnsafeRegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, Int64, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle UnsafeRegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, long millisecondsTimeOutInterval, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, specifying a 64-bit signed integer for the time-out in milliseconds. This method does not propagate the calling stack to the worker thread.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The delegate to call when the `waitObject` parameter is signaled.
- `state`: The object that is passed to the delegate.
- `millisecondsTimeOutInterval`: The time-out in milliseconds. If the `millisecondsTimeOutInterval` parameter is 0 (zero), the function tests the object's state and returns immediately. If `millisecondsTimeOutInterval` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` object that can be used to cancel the registered wait operation.

Exceptions:

- `ArgumentOutOfRangeException`: The `millisecondsTimeOutInterval` parameter is less than -1.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Unlike the `ThreadPool.RegisterWaitForSingleObject` method, `ThreadPool.UnsafeRegisterWaitForSingleObject` does not propagate the calling stack to the worker thread. This allows code to lose the calling stack and thereby to elevate its security privileges.

Using a `Mutex` for `waitObject` does not provide mutual exclusion for the callbacks because the underlying Windows API uses the default `WT_EXECUTEDEFAULT` flag, so each callback is dispatched on a separate thread pool thread.

When you are finished using the `RegisteredWaitHandle` that is returned by this method, call its `RegisteredWaitHandle.Unregister` method to release references to the wait handle. We recommend that you always call the `RegisteredWaitHandle.Unregister` method, even if you specify `true` for `executeOnlyOnce`. Garbage collection works more efficiently if you call the `RegisteredWaitHandle.Unregister` method instead of depending on the registered wait handle's finalizer.

## ThreadPool.UnsafeRegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, TimeSpan, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle UnsafeRegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, TimeSpan timeout, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, specifying a `TimeSpan` value for the time-out. This method does not propagate the calling stack to the worker thread.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The delegate to call when the `waitObject` parameter is signaled.
- `state`: The object that is passed to the delegate.
- `timeout`: The time-out represented by a `TimeSpan`. If `timeout` is 0 (zero), the function tests the object's state and returns immediately. If `timeout` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` object that can be used to cancel the registered wait operation.

Exceptions:

- `ArgumentOutOfRangeException`: The `timeout` parameter is less than -1.
- `NotSupportedException`: The `timeout` parameter is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Unlike the `ThreadPool.RegisterWaitForSingleObject` method, `ThreadPool.UnsafeRegisterWaitForSingleObject` does not propagate the calling stack to the worker thread. This allows code to lose the calling stack and thereby to elevate its security privileges.

Using a `Mutex` for `waitObject` does not provide mutual exclusion for the callbacks because the underlying Windows API uses the default `WT_EXECUTEDEFAULT` flag, so each callback is dispatched on a separate thread pool thread.

When you are finished using the `RegisteredWaitHandle` that is returned by this method, call its `RegisteredWaitHandle.Unregister` method to release references to the wait handle. We recommend that you always call the `RegisteredWaitHandle.Unregister` method, even if you specify `true` for `executeOnlyOnce`. Garbage collection works more efficiently if you call the `RegisteredWaitHandle.Unregister` method instead of depending on the registered wait handle's finalizer.

## ThreadPool.UnsafeRegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, UInt32, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle UnsafeRegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, uint millisecondsTimeOutInterval, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, specifying a 32-bit unsigned integer for the time-out in milliseconds. This method does not propagate the calling stack to the worker thread.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The delegate to call when the `waitObject` parameter is signaled.
- `state`: The object that is passed to the delegate.
- `millisecondsTimeOutInterval`: The time-out in milliseconds. If the `millisecondsTimeOutInterval` parameter is 0 (zero), the function tests the object's state and returns immediately. If `millisecondsTimeOutInterval` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` object that can be used to cancel the registered wait operation.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

#### Remarks
Unlike the `ThreadPool.RegisterWaitForSingleObject` method, `ThreadPool.UnsafeRegisterWaitForSingleObject` does not propagate the calling stack to the worker thread. This allows code to lose the calling stack and thereby to elevate its security privileges.

Using a `Mutex` for `waitObject` does not provide mutual exclusion for the callbacks because the underlying Windows API uses the default `WT_EXECUTEDEFAULT` flag, so each callback is dispatched on a separate thread pool thread.

When you are finished using the `RegisteredWaitHandle` that is returned by this method, call its `RegisteredWaitHandle.Unregister` method to release references to the wait handle. We recommend that you always call the `RegisteredWaitHandle.Unregister` method, even if you specify `true` for `executeOnlyOnce`. Garbage collection works more efficiently if you call the `RegisteredWaitHandle.Unregister` method instead of depending on the registered wait handle's finalizer.
