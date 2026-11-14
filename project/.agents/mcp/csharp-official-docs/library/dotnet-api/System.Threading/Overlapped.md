---
title: "Overlapped class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Overlapped.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Overlapped class

Namespace: `System.Threading`

```csharp
public class Overlapped
```

Provides a managed representation of a Win32 `OVERLAPPED` structure, including methods to transfer information from an `Overlapped` instance to a `NativeOverlapped` structure.

#### Remarks
The `Overlapped.Pack` and `Overlapped.UnsafePack` methods transfer information from an `Overlapped` object to a `NativeOverlapped` structure that can be passed to Windows API functions for asynchronous file I/O. The `Overlapped.Unpack` method transfers information from a `NativeOverlapped` structure to an instance of the `Overlapped` class.

Changes to the properties of an `Overlapped` object affect its associated `NativeOverlapped` structure, and vice versa.

## Overlapped.Overlapped() constructor

```csharp
public Overlapped ();
```

Initializes a new, empty instance of the `Overlapped` class.

To be added.

## Overlapped.Overlapped(Int32, Int32, Int32, IAsyncResult) constructor

```csharp
public Overlapped (int offsetLo, int offsetHi, int hEvent, IAsyncResult? ar);
```

Initializes a new instance of the `Overlapped` class with the specified file position, the 32-bit integer handle to an event that is signaled when the I/O operation is complete, and an interface through which to return the results of the operation.

Parameters:

- `offsetLo`: The low word of the file position at which to start the transfer.
- `offsetHi`: The high word of the file position at which to start the transfer.
- `hEvent`: The handle to an event that is signaled when the I/O operation is complete.
- `ar`: An object that implements the `IAsyncResult` interface and provides status information on the I/O operation.

To be added.

## Overlapped.Overlapped(Int32, Int32, IntPtr, IAsyncResult) constructor

```csharp
public Overlapped (int offsetLo, int offsetHi, IntPtr hEvent, IAsyncResult? ar);
```

Initializes a new instance of the `Overlapped` class with the specified file position, the handle to an event that is signaled when the I/O operation is complete, and an interface through which to return the results of the operation.

Parameters:

- `offsetLo`: The low word of the file position at which to start the transfer.
- `offsetHi`: The high word of the file position at which to start the transfer.
- `hEvent`: The handle to an event that is signaled when the I/O operation is complete.
- `ar`: An object that implements the `IAsyncResult` interface and provides status information on the I/O operation.

#### Remarks
To get the handle of a managed synchronization object that derives from the `WaitHandle` class, use the `SafeWaitHandle` property to get a `SafeWaitHandle` object, and then call the `SafeHandle.DangerousGetHandle` method.

Your implementation of `IAsyncResult` provides status information on the I/O operation. Pass it to the constructor in the `ar` parameter, and retrieve it later with the `AsyncResult` property. If a callback method is specified for the `Overlapped.Pack` or `Overlapped.UnsafePack` method, the callback can retrieve your `IAsyncResult` by unpacking the `NativeOverlapped` structure it receives.

## Overlapped.AsyncResult property

```csharp
public IAsyncResult? AsyncResult { get; set; }
```

Gets or sets the object that provides status information on the I/O operation.

Returns: An object that implements the `IAsyncResult` interface.

To be added.

## Overlapped.EventHandle property

```csharp
public int EventHandle { get; set; }
```

Gets or sets the 32-bit integer handle to a synchronization event that is signaled when the I/O operation is complete.

Returns: An `Int32` value representing the handle of the synchronization event.

To be added.

## Overlapped.EventHandleIntPtr property

```csharp
public IntPtr EventHandleIntPtr { get; set; }
```

Gets or sets the handle to the synchronization event that is signaled when the I/O operation is complete.

Returns: An `IntPtr` representing the handle of the event.

#### Remarks
To get the handle of a managed synchronization object that derives from the `WaitHandle` class, use the `SafeWaitHandle` property to get a `SafeWaitHandle` object, and then call the `SafeHandle.DangerousGetHandle` method.

## Overlapped.OffsetHigh property

```csharp
public int OffsetHigh { get; set; }
```

Gets or sets the high-order word of the file position at which to start the transfer. The file position is a byte offset from the start of the file.

Returns: An `Int32` value representing the high word of the file position.

To be added.

## Overlapped.OffsetLow property

```csharp
public int OffsetLow { get; set; }
```

Gets or sets the low-order word of the file position at which to start the transfer. The file position is a byte offset from the start of the file.

Returns: An `Int32` value representing the low word of the file position.

To be added.

## Overlapped.Free(NativeOverlapped*) method

```csharp
public static void Free (System.Threading.NativeOverlapped* nativeOverlappedPtr);
```

Frees the unmanaged memory associated with a native overlapped structure allocated by the `Pack` method.

Parameters:

- `nativeOverlappedPtr`: A pointer to the `NativeOverlapped` structure to be freed.

Exceptions:

- `ArgumentNullException`: `nativeOverlappedPtr` is `null`.

#### Remarks
You must call the `Overlapped.Free` method exactly once on every `NativeOverlapped` pointer you receive from the `Overlapped.Pack` method. If you don't call the `Overlapped.Free` method, you will leak memory. If you call the `Overlapped.Free` method more than once, memory will be corrupted.

## Overlapped.Pack(IOCompletionCallback) method

```csharp
public System.Threading.NativeOverlapped* Pack (System.Threading.IOCompletionCallback? iocb);
```

Packs the current instance into a `NativeOverlapped` structure, specifying the delegate to be invoked when the asynchronous I/O operation is complete.

Parameters:

- `iocb`: An `IOCompletionCallback` delegate that represents the callback method invoked when the asynchronous I/O operation completes.

Returns: An unmanaged pointer to a `NativeOverlapped` structure.

Exceptions:

- `InvalidOperationException`: The current `Overlapped` has already been packed.

To be added.

## Overlapped.Pack(IOCompletionCallback, Object) method

```csharp
public System.Threading.NativeOverlapped* Pack (System.Threading.IOCompletionCallback? iocb, object? userData);
```

Packs the current instance into a `NativeOverlapped` structure, specifying a delegate that is invoked when the asynchronous I/O operation is complete and a managed object that serves as a buffer.

Parameters:

- `iocb`: An `IOCompletionCallback` delegate that represents the callback method invoked when the asynchronous I/O operation completes.
- `userData`: An object or array of objects representing the input or output buffer for the operation. Each object represents a buffer, for example an array of bytes.

Returns: An unmanaged pointer to a `NativeOverlapped` structure.

Exceptions:

- `InvalidOperationException`: The current `Overlapped` has already been packed.

#### Remarks
The unmanaged pointer returned by this method can be passed to the operating system in overlapped I/O operations. The `NativeOverlapped` structure is fixed in physical memory until `Overlapped.Unpack` is called.

The buffer or buffers specified in `userData` must be the same as those passed to the unmanaged operating system function that performs the asynchronous I/O.

> **Note:**
> The runtime pins the buffer or buffers specified in `userData` for the duration of the I/O operation. If the application domain is unloaded, the runtime keeps the memory pinned until the I/O operation completes.

## Overlapped.Unpack(NativeOverlapped*) method

```csharp
public static System.Threading.Overlapped Unpack (System.Threading.NativeOverlapped* nativeOverlappedPtr);
```

Unpacks the specified unmanaged `NativeOverlapped` structure into a managed `Overlapped` object.

Parameters:

- `nativeOverlappedPtr`: An unmanaged pointer to a `NativeOverlapped` structure.

Returns: An `Overlapped` object containing the information unpacked from the native structure.

Exceptions:

- `ArgumentNullException`: `nativeOverlappedPtr` is `null`.

#### Remarks
The `NativeOverlapped` structure is not freed from physical memory until you call the `Overlapped.Free` method.

## Overlapped.UnsafePack(IOCompletionCallback) method

```csharp
public System.Threading.NativeOverlapped* UnsafePack (System.Threading.IOCompletionCallback? iocb);
```

Packs the current instance into a `NativeOverlapped` structure specifying the delegate to invoke when the asynchronous I/O operation is complete. Does not propagate the calling stack.

Parameters:

- `iocb`: An `IOCompletionCallback` delegate that represents the callback method invoked when the asynchronous I/O operation completes.

Returns: An unmanaged pointer to a `NativeOverlapped` structure.

Exceptions:

- `InvalidOperationException`: The current `Overlapped` has already been packed.

To be added.

## Overlapped.UnsafePack(IOCompletionCallback, Object) method

```csharp
public System.Threading.NativeOverlapped* UnsafePack (System.Threading.IOCompletionCallback? iocb, object? userData);
```

Packs the current instance into a `NativeOverlapped` structure, specifying the delegate to invoke when the asynchronous I/O operation is complete and the managed object that serves as a buffer. Does not propagate the calling stack.

Parameters:

- `iocb`: An `IOCompletionCallback` delegate that represents the callback method invoked when the asynchronous I/O operation completes.
- `userData`: An object or array of objects representing the input or output buffer for the operation. Each object represents a buffer, for example an array of bytes.

Returns: An unmanaged pointer to a `NativeOverlapped` structure.

Exceptions:

- `SecurityException`: The caller does not have the required permission.
- `InvalidOperationException`: The current `Overlapped` is already packed.

#### Remarks
The unmanaged pointer returned by this method can be passed to the operating system in overlapped I/O operations. The `NativeOverlapped` structure is fixed in physical memory until `Overlapped.Unpack` is called.

The buffer or buffers specified in `userData` must be the same as those passed to the unmanaged operating system function that performs the asynchronous I/O.

The runtime pins the buffer or buffers specified in`userData` for the duration of the I/O operation. If the application domain is unloaded, the runtime keeps the memory pinned until the I/O operation completes.
