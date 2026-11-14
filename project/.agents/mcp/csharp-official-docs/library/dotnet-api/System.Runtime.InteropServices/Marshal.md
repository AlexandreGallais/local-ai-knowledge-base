---
title: "Marshal class (part 1 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class Marshal
```

Provides a collection of methods for allocating unmanaged memory, copying unmanaged memory blocks, and converting managed to unmanaged types, as well as other miscellaneous methods used when interacting with unmanaged code.

#### Remarks
The `static` methods defined on the `Marshal` class are essential to working with unmanaged code. Most methods defined in this class are typically used by developers who want to provide a bridge between the managed and unmanaged programming models. For example, the `Marshal.StringToHGlobalAnsi` method copies ANSI characters from a specified string (in the managed heap) to a buffer in the unmanaged heap. It also allocates the target heap of the right size.

The common language runtime provides specific marshaling capabilities. For details on marshaling behavior, see Interop Marshaling.

The `Read` and `Write` methods in the `Marshal` class support both aligned and unaligned access.

#### Examples
The following example shows how to use various methods defined by the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Overview/Marshal.cs._

## Marshal.AddRef(IntPtr) method

```csharp
public static int AddRef (IntPtr pUnk);
```

Increments the reference count on the specified interface.

Parameters:

- `pUnk`: The interface reference count to increment.

Returns: The new value of the reference count on the `pUnk` parameter.

#### Remarks
The common language runtime manages the reference count of a COM object for you, making it unnecessary to use this method directly. In rare cases, such as testing a custom marshaler, you might find it necessary to manipulate an object's lifetime manually. After calling `Marshal.AddRef`, you must decrement the reference count by using a method such as `Marshal.Release`. Do not rely on the return value of `Marshal.AddRef`, as it can sometimes be unstable.

You can call `Marshal.GetComInterfaceForObject`, `Marshal.GetIUnknownForObject`, or `Marshal.GetIDispatchForObject` to obtain an `IntPtr` value that represents an IUnknown interface pointer. You can also use these methods and the `Marshal.AddRef` method on managed objects to obtain the COM interfaces represented by the managed object's COM callable wrapper. If you are not familiar with the details of this wrapper type, see COM Callable Wrapper.

## Marshal.AllocCoTaskMem(Int32) method

```csharp
public static IntPtr AllocCoTaskMem (int cb);
```

Allocates a block of memory of specified size from the COM task memory allocator.

Parameters:

- `cb`: The size of the block of memory to be allocated.

Returns: An integer representing the address of the block of memory allocated. This memory must be released with `Marshal.FreeCoTaskMem`.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to satisfy the request.

#### Remarks
`Marshal.AllocCoTaskMem` is one of two memory allocation API methods in the `Marshal` class. (`Marshal.AllocHGlobal` is the other.) The initial memory content returned is undefined, and the allocated memory can be larger than the requested number of bytes. This method exposes the COM CoTaskMemAlloc function, which is referred to as the COM task memory allocator.

## Marshal.AllocHGlobal(Int32) method

```csharp
public static IntPtr AllocHGlobal (int cb);
```

Allocates memory from the unmanaged memory of the process by using the specified number of bytes.

Parameters:

- `cb`: The required number of bytes in memory.

Returns: A pointer to the newly allocated memory. This memory must be released using the `Marshal.FreeHGlobal` method.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to satisfy the request.

#### Remarks
> **Important:**
> This native memory allocator is a legacy API that should be used exclusively when called for by specific Win32 APIs on the Windows platform. Use the `NativeMemory` class on all platforms to allocate native memory.

`Marshal.AllocHGlobal` is one of two memory allocation methods in the `Marshal` class. (`Marshal.AllocCoTaskMem` is the other.) This method exposes the Win32 LocalAlloc function from Kernel32.dll.

When `Marshal.AllocHGlobal` calls `LocalAlloc`, it passes a `LMEM_FIXED` flag, which causes the allocated memory to be locked in place. Also, the allocated memory is not zero-filled.

#### Examples
The following example demonstrates calling the `Marshal.AllocHGlobal` method. This code example is part of a larger example provided for the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Overview/Marshal.cs._

## Marshal.AllocHGlobal(IntPtr) method

```csharp
public static IntPtr AllocHGlobal (IntPtr cb);
```

Allocates memory from the unmanaged memory of the process by using the pointer to the specified number of bytes.

Parameters:

- `cb`: The required number of bytes in memory.

Returns: A pointer to the newly allocated memory. This memory must be released using the `Marshal.FreeHGlobal` method.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to satisfy the request.

#### Remarks
> **Important:**
> This native memory allocator is a legacy API that should be used exclusively when called for by specific Win32 APIs on the Windows platform. Use the `NativeMemory` class on all platforms to allocate native memory.

`Marshal.AllocHGlobal` is one of two memory allocation methods in the `Marshal` class. (`Marshal.AllocCoTaskMem` is the other.) This method exposes the Win32 LocalAlloc function from Kernel32.dll.

When `Marshal.AllocHGlobal` calls `LocalAlloc`, it passes a `LMEM_FIXED` flag, which causes the allocated memory to be locked in place. Also, the allocated memory is not zero-filled.

For example code, see `Marshal` and `Marshal.AllocHGlobal`.

## Marshal.AreComObjectsAvailableForCleanup() method

```csharp
public static bool AreComObjectsAvailableForCleanup ();
```

Indicates whether runtime callable wrappers (RCWs) from any context are available for cleanup.

Returns: `true` if there are any RCWs available for cleanup; otherwise, `false`.

#### Remarks
If there are a lot of references between managed and native code with deep dependency graphs it can take a long time for all the objects to clean up. Each time a GC runs it will free up some number of RCWs, which will in turn release the underlying COM objects. Those COM objects will then release their managed references and make more objects available for cleanup the next time a GC runs, which starts the process over again.

The `Marshal.AreComObjectsAvailableForCleanup` method provides a way for the application to determine how many cycles of GC.Collect and GC.WaitForPendingFinalizers need to happen in order to clean everything up.

## Marshal.BindToMoniker(String) method

```csharp
public static object BindToMoniker (string monikerName);
```

Gets an interface pointer identified by the specified moniker.

Parameters:

- `monikerName`: The moniker corresponding to the desired interface pointer.

Returns: An object containing a reference to the interface pointer identified by the `monikerName` parameter. A moniker is a name, and in this case, the moniker is defined by an interface.

Exceptions:

- `COMException`: An unrecognized HRESULT was returned by the unmanaged `BindToMoniker` method.

#### Remarks
`Marshal.BindToMoniker` exposes the COM `BindToMoniker` method, which produces an object that you can cast to any COM interface you require. This method provides the same functionality as the `GetObject` method in Visual Basic 6.0 and Visual Basic 2005.

## Marshal.ChangeWrapperHandleStrength(Object, Boolean) method

```csharp
public static void ChangeWrapperHandleStrength (object otp, bool fIsWeak);
```

Changes the strength of an object's COM Callable Wrapper (CCW) handle.

Parameters:

- `otp`: The object whose CCW holds a reference counted handle. The handle is strong if the reference count on the CCW is greater than zero; otherwise, it is weak.
- `fIsWeak`: `true` to change the strength of the handle on the `otp` parameter to weak, regardless of its reference count; `false` to reset the handle strength on `otp` to be reference counted.

#### Remarks
`Marshal.ChangeWrapperHandleStrength` is used for object pooling functionality and should never be called by user code directly.

## Marshal.CleanupUnusedObjectsInCurrentContext() method

```csharp
public static void CleanupUnusedObjectsInCurrentContext ();
```

Notifies the runtime to clean up all Runtime Callable Wrappers (RCWs) allocated in the current context.

#### Remarks
The interop system pumps messages while it attempts to clean up RCWs. This ensures that cleanup for single-threaded apartment (STA) RCWs happens in all applications, including applications that do not pump often enough. However, some applications that do pump appropriately are very sensitive to where pumping occurs. When the interop system pumps messages in these applications, in places that are unexpected, , the application can encounter reentrancy issues that are difficult to diagnose. Therefore, applications need to be able to control their own pumping for a particular STA and to control the clean-up of RCWs.

However, developers often only control a subset of the threads in their application and thus cannot ensure that all threads are pumping appropriately.

To solve this problem:

1. Use the `Thread.DisableComObjectEagerCleanup` method to turn off automatic cleanup of RCWs, and the message pumping that occurs, on a per-thread basis. This allows developers to opt out of automatic clean-up, and the corresponding message pumping.

2. Use the `Marshal.CleanupUnusedObjectsInCurrentContext` method to notify the runtime to clean up all RCWs that are allocated in the current context. This companion method allows developers to precisely control when the runtime performs cleanup in the current context.

## Marshal.Copy(Byte[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (byte[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed 8-bit unsigned integer array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` and `length` are not valid.
- `ArgumentNullException`: `source`, `startIndex`, `destination`, or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed array to an unmanaged C-style array.

#### Examples
The following example copies an array to unmanaged memory by using the `Copy` overload, and then copies the unmanaged array back to managed memory by using the `Copy` overload.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample.cs._

## Marshal.Copy(Char[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (char[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed character array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` and `length` are not valid.
- `ArgumentNullException`: `startIndex`, `destination`, or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed array to an unmanaged C-style array.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample1.cs._

## Marshal.Copy(Double[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (double[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed double-precision floating-point number array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` and `length` are not valid.
- `ArgumentNullException`: `source`, `startIndex`, `destination`, or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed array to an unmanaged C-style array.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample2.cs._

## Marshal.Copy(Int16[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (short[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed 16-bit signed integer array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` and `length` are not valid.
- `ArgumentNullException`: `source`, `startIndex`, `destination`, or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed array to an unmanaged C-style array.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample4.cs._
