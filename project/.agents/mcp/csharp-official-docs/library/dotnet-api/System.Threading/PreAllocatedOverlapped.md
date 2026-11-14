---
title: "PreAllocatedOverlapped class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/PreAllocatedOverlapped.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PreAllocatedOverlapped class

Namespace: `System.Threading`

```csharp
public sealed class PreAllocatedOverlapped : IDisposable
```

Represents pre-allocated state for native overlapped I/O operations.

To be added.

## PreAllocatedOverlapped.PreAllocatedOverlapped(IOCompletionCallback, Object, Object) constructor

```csharp
public PreAllocatedOverlapped (System.Threading.IOCompletionCallback callback, object? state, object? pinData);
```

Initializes a new instance of the `PreAllocatedOverlapped` class and specifies a delegate to invoke when each asynchronous I/O operation is complete, a user-provided object that provides context, and managed objects that serve as buffers.

Parameters:

- `callback`: A delegate that represents the callback method to invoke when each asynchronous I/O operation completes.
- `state`: A user-supplied object that distinguishes the `NativeOverlapped` instance produced from this object from other `NativeOverlapped` instances. Its value can be `null`.
- `pinData`: An object or array of objects that represent the input or output buffer for the operations. Each object represents a buffer, such as an array of bytes. Its value can be `null`.

Exceptions:

- `ArgumentNullException`: `callback` is `null`.
- `ObjectDisposedException`: This method was called after the `ThreadPoolBoundHandle` was disposed.

#### Remarks
The new `PreAllocatedOverlapped` instance can be passed to the `ThreadPoolBoundHandle.AllocateNativeOverlapped` method to produce a `NativeOverlapped` instance that can be passed to the operating system in overlapped I/O operations.  A single `PreAllocatedOverlapped` instance can only be used for a single native I/O operation at a time.  However, the state stored in the `PreAllocatedOverlapped` instance can be reused for subsequent native operations.

> **Note:**
>  The buffers specified in `pinData` are pinned until the `PreAllocatedOverlapped.Dispose` method is called.

## PreAllocatedOverlapped.Dispose() method

```csharp
public void Dispose ();
```

Frees the resources associated with this `PreAllocatedOverlapped` instance.

To be added.

## PreAllocatedOverlapped.Finalize() method

```csharp
~PreAllocatedOverlapped ();
```

Frees unmanaged resources before the current instance is reclaimed by garbage collection.

To be added.

## PreAllocatedOverlapped.UnsafeCreate(IOCompletionCallback, Object, Object) method

```csharp
public static System.Threading.PreAllocatedOverlapped UnsafeCreate (System.Threading.IOCompletionCallback callback, object? state, object? pinData);
```

Initializes a new instance of the `PreAllocatedOverlapped` class, specifying a delegate that is invoked when each asynchronous I/O operation is complete, a user-provided object providing context, and managed objects that serve as buffers.

Parameters:

- `callback`: An `IOCompletionCallback` delegate that represents the callback method invoked when each asynchronous I/O operation completes.
- `state`: A user-provided object that distinguishes `NativeOverlapped` instance produced from this object from other `NativeOverlapped` instances. Can be `null`.
- `pinData`: An object or array of objects representing the input or output buffer for the operations. Each object represents a buffer, for example an array of bytes.  Can be `null`.

Returns: The new `PreAllocatedOverlapped` instance.

Exceptions:

- `ArgumentNullException`: `callback` is `null`.
- `ObjectDisposedException`: This method was called after the `ThreadPoolBoundHandle` was disposed.

#### Remarks

The new `PreAllocatedOverlapped` instance can be passed to
`AllocateNativeOverlapped`, to produce
a `NativeOverlapped` instance that can be passed to the operating system in overlapped
I/O operations.  A single `PreAllocatedOverlapped` instance can only be used for
a single native I/O operation at a time.  However, the state stored in the `PreAllocatedOverlapped`
instance can be reused for subsequent native operations. ExecutionContext is not flowed to the invocation
of the callback.

> **Note:**
> The buffers specified in `pinData` are pinned until `Dispose` is called.
