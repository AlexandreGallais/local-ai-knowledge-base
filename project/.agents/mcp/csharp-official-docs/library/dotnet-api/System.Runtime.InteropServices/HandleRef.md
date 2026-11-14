---
title: "HandleRef struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/HandleRef.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HandleRef struct

Namespace: `System.Runtime.InteropServices`

```csharp
public readonly struct HandleRef
```

Wraps a managed object holding a handle to a resource that is passed to unmanaged code using platform invoke.

#### Remarks

> **Important:**
> The functionality of the `HandleRef` class has been replaced by the `SafeHandle` class and its derived classes, as well as by the `CriticalHandle` class.

If you use platform invoke to call a managed object, and the object is not referenced elsewhere after the platform invoke call, it is possible for the garbage collector to finalize the managed object. This action releases the resource and invalidates the handle, causing the platform invoke call to fail. Wrapping a handle with `HandleRef` guarantees that the managed object is not garbage collected until the platform invoke call completes. For a description of platform invoke services, see Consuming Unmanaged DLL Functions.

The `HandleRef` value type, like `GCHandle`, is a special type recognized by the interop marshaler. A normal, nonpinned `GCHandle` also prevents untimely garbage collection, yet `HandleRef` provides better performance. Although using `HandleRef` to keep an object alive for the duration of a platform invoke call is preferred, you can also use the `GC.KeepAlive` method for the same purpose.

The `HandleRef` constructor takes two parameters: an `Object` representing the wrapper, and an `IntPtr` representing the unmanaged handle. The interop marshaler passes only the handle to unmanaged code, and guarantees that the wrapper (passed as the first parameter to the constructor of the `HandleRef`) remains alive for the duration of the call.

## HandleRef.HandleRef(Object, IntPtr) constructor

```csharp
public HandleRef (object? wrapper, IntPtr handle);
```

Initializes a new instance of the `HandleRef` class with the object to wrap and a handle to the resource used by unmanaged code.

Parameters:

- `wrapper`: A managed object that should not be finalized until the platform invoke call returns.
- `handle`: An `IntPtr` that indicates a handle to a resource.

To be added.

## HandleRef.Handle property

```csharp
public IntPtr Handle { get; }
```

Gets the handle to a resource.

Returns: The handle to a resource.

To be added.

## HandleRef.Wrapper property

```csharp
public object? Wrapper { get; }
```

Gets the object holding the handle to a resource.

Returns: The object holding the handle to a resource.

To be added.

## HandleRef.op_Explicit(HandleRef) method

```csharp
public static explicit operator IntPtr (System.Runtime.InteropServices.HandleRef value);
```

Returns the handle to a resource of the specified `HandleRef` object.

Parameters:

- `value`: The object that needs a handle.

Returns: The handle to a resource of the specified `HandleRef` object.

The equivalent method for this operator is `Handle`

## HandleRef.ToIntPtr(HandleRef) method

```csharp
public static IntPtr ToIntPtr (System.Runtime.InteropServices.HandleRef value);
```

Returns the internal integer representation of a `HandleRef` object.

Parameters:

- `value`: A `HandleRef` object to retrieve an internal integer representation from.

Returns: An `IntPtr` object that represents a `HandleRef` object.

To be added.
