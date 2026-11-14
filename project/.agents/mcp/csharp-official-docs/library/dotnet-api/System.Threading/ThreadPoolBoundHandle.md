---
title: "ThreadPoolBoundHandle class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadPoolBoundHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadPoolBoundHandle class

Namespace: `System.Threading`

```csharp
public sealed class ThreadPoolBoundHandle : IDisposable
```

Represents an I/O handle that is bound to the system thread pool and enables low-level components to receive notifications for asynchronous I/O operations.

To be added.

## ThreadPoolBoundHandle.Handle property

```csharp
public System.Runtime.InteropServices.SafeHandle Handle { get; }
```

Gets the bound operating system handle.

Returns: An object that holds the bound operating system handle.

To be added.

## ThreadPoolBoundHandle.AllocateNativeOverlapped(PreAllocatedOverlapped) method

```csharp
public System.Threading.NativeOverlapped* AllocateNativeOverlapped (System.Threading.PreAllocatedOverlapped preAllocated);
```

Returns an unmanaged pointer to a `NativeOverlapped` structure using the callback state and buffers associated with the specified `PreAllocatedOverlapped` object.

Parameters:

- `preAllocated`: An object from which to create the `NativeOverlapped` pointer.

Returns: An unmanaged pointer to a `NativeOverlapped` structure.

Exceptions:

- `ArgumentNullException`: `preAllocated` is `null`.
- `ArgumentException`: `preAllocated` is currently in use for another I/O operation.
- `ObjectDisposedException`: This method was called after the `ThreadPoolBoundHandle` was disposed.

-or-

This method was called after `preAllocated` was disposed.

#### Remarks
The unmanaged pointer returned by this method can be passed to the operating system in overlapped I/O operations. The  `NativeOverlapped` structure is fixed in physical memory until the `ThreadPoolBoundHandle.FreeNativeOverlapped` method is called.

## ThreadPoolBoundHandle.AllocateNativeOverlapped(IOCompletionCallback, Object, Object) method

```csharp
public System.Threading.NativeOverlapped* AllocateNativeOverlapped (System.Threading.IOCompletionCallback callback, object? state, object? pinData);
```

Returns an unmanaged pointer to a `NativeOverlapped` structure, specifying a delegate that is invoked when the asynchronous I/O operation is complete, a user-provided object that supplies context, and managed objects that serve as buffers.

Parameters:

- `callback`: A delegate that represents the callback method to invoke when the asynchronous I/O operation completes.
- `state`: A user-provided object that distinguishes this `NativeOverlapped` instance from other `NativeOverlapped` instances.
- `pinData`: An object or array of objects that represent the input or output buffer for the operation, or `null`. Each object represents a buffer, such an array of bytes.

Returns: An unmanaged pointer to a `NativeOverlapped` structure.

Exceptions:

- `ArgumentNullException`: `callback` is `null`.
- `ObjectDisposedException`: This method was called after the `ThreadPoolBoundHandle` object was disposed.

The unmanaged pointer returned by this method can be passed to the operating system in overlapped I/O operations. The `NativeOverlapped` structure is fixed in physical memory until `ThreadPoolBoundHandle.FreeNativeOverlapped` is called.

> **Note:**
> The buffers specified in `pinData` are pinned for the duration of the I/O operation.

The buffer or buffers specified in `pinData` must be the same as those passed to the unmanaged operating system function that performs the asynchronous I/O.

## ThreadPoolBoundHandle.BindHandle(SafeHandle) method

```csharp
public static System.Threading.ThreadPoolBoundHandle BindHandle (System.Runtime.InteropServices.SafeHandle handle);
```

Returns a `ThreadPoolBoundHandle` for the specified handle, which is bound to the system thread pool.

Parameters:

- `handle`: An object that holds the operating system handle. The handle must have been opened for overlapped I/O in unmanaged code.

Returns: A `ThreadPoolBoundHandle` for `handle`, which is bound to the system thread pool.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` has been disposed.

-or-

`handle` does not refer to a valid I/O handle.

-or-

`handle` refers to a handle that has not been opened for overlapped I/O.

-or-

`handle` refers to a handle that has already been bound.

#### Remarks
This method should be called once per handle.

The `ThreadPoolBoundHandle` object does not take ownership of `handle`; it remains the responsibility of the caller to call `SafeHandle.Dispose`.

## ThreadPoolBoundHandle.Dispose() method

```csharp
public void Dispose ();
```

Releases all unmanaged resources used by the `ThreadPoolBoundHandle` instance.

To be added.

## ThreadPoolBoundHandle.FreeNativeOverlapped(NativeOverlapped*) method

```csharp
public void FreeNativeOverlapped (System.Threading.NativeOverlapped* overlapped);
```

Frees the memory associated with a `NativeOverlapped` structure allocated by the `AllocateNativeOverlapped` method.

Parameters:

- `overlapped`: An unmanaged pointer to the `NativeOverlapped` structure to be freed.

Exceptions:

- `ArgumentNullException`: `overlapped` is `null`.
- `ObjectDisposedException`: This method was called after the `ThreadPoolBoundHandle` object was disposed.

#### Remarks

> **Caution:**
>  You must call the `ThreadPoolBoundHandle.FreeNativeOverlapped` method exactly once on every `NativeOverlapped` unmanaged pointer allocated by using the `ThreadPoolBoundHandle.AllocateNativeOverlapped` method. If you do not call the `ThreadPoolBoundHandle.FreeNativeOverlapped` method, you will leak memory. If you call the `ThreadPoolBoundHandle.FreeNativeOverlapped` method more than once on the same `NativeOverlapped` unmanaged pointer, memory will be corrupted.

## ThreadPoolBoundHandle.GetNativeOverlappedState(NativeOverlapped*) method

```csharp
public static object? GetNativeOverlappedState (System.Threading.NativeOverlapped* overlapped);
```

Returns the user-provided object that was specified when the `NativeOverlapped` instance was allocated by calling the `ThreadPoolBoundHandle.AllocateNativeOverlapped` method.

Parameters:

- `overlapped`: An unmanaged pointer to the `NativeOverlapped` structure from which to return the associated user-provided object.

Returns: A user-provided object that distinguishes this `NativeOverlapped` instance from other `NativeOverlapped` instances, or `null` if one was not specified when the instance was allocated by calling the `AllocateNativeOverlapped` method.

Exceptions:

- `ArgumentNullException`: `overlapped` is `null`.

To be added.

## ThreadPoolBoundHandle.UnsafeAllocateNativeOverlapped(IOCompletionCallback, Object, Object) method

```csharp
public System.Threading.NativeOverlapped* UnsafeAllocateNativeOverlapped (System.Threading.IOCompletionCallback callback, object? state, object? pinData);
```

Returns an unmanaged pointer to a `NativeOverlapped` structure, specifying a delegate that is invoked when the asynchronous I/O operation is complete, a user-provided object providing context, and managed objects that serve as buffers.

Parameters:

- `callback`: An `IOCompletionCallback` delegate that represents the callback method invoked when the asynchronous I/O operation completes.
- `state`: A user-provided object that distinguishes this `NativeOverlapped` from other `NativeOverlapped` instances. Can be `null`.
- `pinData`: An object or array of objects representing the input or output buffer for the operation. Each object represents a buffer, for example an array of bytes.  Can be `null`.

Returns: An unmanaged pointer to a `NativeOverlapped` structure.

Exceptions:

- `ArgumentNullException`: `callback` is `null`.
- `ObjectDisposedException`: This method was called after the `ThreadPoolBoundHandle` was disposed.

The unmanaged pointer returned by this method can be passed to the operating system in overlapped I/O operations. The `NativeOverlapped` structure is fixed in physical memory until `FreeNativeOverlapped` is called.

The buffer or buffers specified in `pinData` must be the same as those passed to the unmanaged operating system function that performs the asynchronous I/O.

`ExecutionContext` is not flowed to the invocation of the callback.

> **Note:**
> The buffers specified in `pinData` are pinned for the duration of the I/O operation.
