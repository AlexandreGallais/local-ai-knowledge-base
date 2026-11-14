---
title: "GCHandle struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/GCHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCHandle struct

Namespace: `System.Runtime.InteropServices`

```csharp
public struct GCHandle : IEquatable<System.Runtime.InteropServices.GCHandle>
```

Provides a way to access a managed object from unmanaged memory.

#### Remarks
The `GCHandle` structure is used with the `GCHandleType` enumeration to create a handle corresponding to any managed object. This handle can be one of four types: `Weak`, `WeakTrackResurrection`, `Normal`, or `Pinned`. When the handle has been allocated, you can use it to prevent the managed object from being collected by the garbage collector when an unmanaged client holds the only reference. Without such a handle, the object can be collected by the garbage collector before completing its work on behalf of the unmanaged client.

You can also use `GCHandle` to create a pinned object that returns a memory address to prevent the garbage collector from moving the object in memory.

When the handle goes out of scope you must explicitly release it by calling the `GCHandle.Free` method; otherwise, memory leaks may occur. When you free a pinned handle, the associated object will be unpinned and will become eligible for garbage collection, if there are no other references to it.

#### Examples
The following example shows an `App` class that creates a handle to a managed object using the `GCHandle.Alloc` method, which prevents the managed object from being collected. A call to the `EnumWindows` method passes a delegate and a managed object (both declared as managed types, but not shown), and casts the handle to an `IntPtr`. The unmanaged function passes the type back to the caller as a parameter of the callback function.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/GCHandle/Overview/sample.cs._

## GCHandle.IsAllocated property

```csharp
public bool IsAllocated { get; }
```

Gets a value indicating whether the handle is allocated.

Returns: `true` if the handle is allocated; otherwise, `false`.

#### Remarks
If `Free` was called on this `GCHandle`, or if this `GCHandle` is not initialized, the handle is not allocated and this property returns `false`.

## GCHandle.Target property

```csharp
public object? Target { get; set; }
```

Gets or sets the object this handle represents.

Returns: The object this handle represents.

Exceptions:

- `InvalidOperationException`: The handle was freed, or never initialized.

#### Examples
The following example shows an `App` class that creates a handle to a managed object using the `GCHandle.Alloc` method, which prevents the managed object from being collected. A call to the `EnumWindows` method passes a delegate and a managed object (both declared as managed types, but not shown), and casts the handle to an `IntPtr`. The unmanaged function passes the type back to the caller as a parameter of the callback function.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/GCHandle/Overview/sample.cs._

## GCHandle.AddrOfPinnedObject() method

```csharp
public readonly IntPtr AddrOfPinnedObject ();
```

Retrieves the address of object data in a `GCHandleType.Pinned` handle.

Returns: The address of the pinned data object.

Exceptions:

- `InvalidOperationException`: The handle is any type other than `GCHandleType.Pinned`.

#### Remarks
This method is used to get a stable pointer to the object data. For arrays, this method returns the address of the first element. For strings, this method returns the address of the first character.

Pinning an object prevents the garbage collector from moving it around in memory, thereby reducing the efficiency of the garbage collector.

## GCHandle.Alloc(Object) method

```csharp
public static System.Runtime.InteropServices.GCHandle Alloc (object? value);
```

Allocates a `GCHandleType.Normal` handle for the specified object.

Parameters:

- `value`: The object that uses the `GCHandle`.

Returns: A new `GCHandle` that protects the object from garbage collection. This `GCHandle` must be released with `GCHandle.Free` when it is no longer needed.

#### Remarks
`Normal` handles are opaque, which means that you cannot resolve the address of the object it contains through the handle.

#### Examples
The following example shows an `App` class that creates a handle to a managed object using the `GCHandle.Alloc` method, which prevents the managed object from being collected. A call to the `EnumWindows` method passes a delegate and a managed object (both declared as managed types, but not shown), and casts the handle to an `IntPtr`. The unmanaged function passes the type back to the caller as a parameter of the callback function.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/GCHandle/Overview/sample.cs._

## GCHandle.Alloc(Object, GCHandleType) method

```csharp
public static System.Runtime.InteropServices.GCHandle Alloc (object? value, System.Runtime.InteropServices.GCHandleType type);
```

Allocates a handle of the specified type for the specified object.

Parameters:

- `value`: The object that uses the `GCHandle`.
- `type`: One of the `GCHandleType` values, indicating the type of `GCHandle` to create.

Returns: A new `GCHandle` of the specified type. This `GCHandle` must be released with `GCHandle.Free` when it is no longer needed.

Exceptions:

- `ArgumentException`: An instance with nonprimitive (non-blittable) members cannot be pinned.

To be added.

## GCHandle.Equals(Object) method

```csharp
public override readonly bool Equals (object? o);
```

Determines whether the specified `GCHandle` object is equal to the current `GCHandle` object.

Parameters:

- `o`: The `GCHandle` object to compare with the current `GCHandle` object.

Returns: `true` if the specified `GCHandle` object is equal to the current `GCHandle` object; otherwise, `false`.

#### Remarks
Two `GCHandle` objects are equal if they point to the same memory handle.

## GCHandle.Equals(GCHandle) method

```csharp
public readonly bool Equals (System.Runtime.InteropServices.GCHandle other);
```

Indicates whether the current instance is equal to another instance of the same type.

Parameters:

- `other`: An instance to compare with this instance.

Returns: `true` if the current instance is equal to the other instance; otherwise, `false`.

To be added.

## GCHandle.Free() method

```csharp
public void Free ();
```

Releases a `GCHandle`.

Exceptions:

- `InvalidOperationException`: The handle was freed or never initialized.

#### Remarks
The caller must ensure that for a given handle, `GCHandle.Free` is called only once.

#### Examples
The following example shows an `App` class that creates a handle to a managed object using the `GCHandle.Alloc` method, which prevents the managed object from being collected. A call to the `EnumWindows` method passes a delegate and a managed object (both declared as managed types, but not shown), and casts the handle to an `IntPtr`. The unmanaged function passes the type back to the caller as a parameter of the callback function.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/GCHandle/Overview/sample.cs._

## GCHandle.FromIntPtr(IntPtr) method

```csharp
public static System.Runtime.InteropServices.GCHandle FromIntPtr (IntPtr value);
```

Returns a new `GCHandle` object created from a handle to a managed object.

Parameters:

- `value`: An `IntPtr` handle to a managed object to create a `GCHandle` object from.

Returns: A new `GCHandle` object that corresponds to the value parameter.

Exceptions:

- `InvalidOperationException`: The value of the `value` parameter is `IntPtr.Zero`.

#### Examples
The following code example shows an `App` class that creates a handle to a managed object using the `GCHandle.Alloc` method, which prevents the managed object from being collected. A call to the `EnumWindows` method passes a delegate and a managed object (both declared as managed types, but not shown), and casts the handle to an `IntPtr` object. The unmanaged function passes the type back to the caller as a parameter of the callback function.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/GCHandle/Overview/sample.cs._

## GCHandle.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns an identifier for the current `GCHandle` object.

Returns: An identifier for the current `GCHandle` object.

#### Remarks
The `GCHandle.GetHashCode` method returns an integer representation of the internal memory handle encapsulated by the `GCHandle` structure.

## GCHandle.op_Equality(GCHandle, GCHandle) method

```csharp
public static bool operator == (System.Runtime.InteropServices.GCHandle a, System.Runtime.InteropServices.GCHandle b);
```

Returns a value indicating whether two `GCHandle` objects are equal.

Parameters:

- `a`: A `GCHandle` object to compare with the `b` parameter.
- `b`: A `GCHandle` object to compare with the `a` parameter.

Returns: `true` if the `a` and `b` parameters are equal; otherwise, `false`.

The equivalent method for this operator is `GCHandle.Equals`.

## GCHandle.op_Explicit(IntPtr) method

```csharp
public static explicit operator System.Runtime.InteropServices.GCHandle (IntPtr value);
```

A `GCHandle` is stored using an internal integer representation.

Parameters:

- `value`: An `IntPtr` that indicates the handle for which the conversion is required.

Returns: The stored `GCHandle` object using an internal integer representation.

#### Remarks
This method allows you to retrieve a `GCHandle` from an integer value.

## GCHandle.op_Explicit(GCHandle) method

```csharp
public static explicit operator IntPtr (System.Runtime.InteropServices.GCHandle value);
```

A `GCHandle` is stored using an internal integer representation.

Parameters:

- `value`: The `GCHandle` for which the integer is required.

Returns: The integer value.

#### Remarks
This method can be used to retrieve the integer value from a `GCHandle`.

## GCHandle.op_Inequality(GCHandle, GCHandle) method

```csharp
public static bool operator != (System.Runtime.InteropServices.GCHandle a, System.Runtime.InteropServices.GCHandle b);
```

Returns a value indicating whether two `GCHandle` objects are not equal.

Parameters:

- `a`: A `GCHandle` object to compare with the `b` parameter.
- `b`: A `GCHandle` object to compare with the `a` parameter.

Returns: `true` if the `a` and `b` parameters are not equal; otherwise, `false`.

The equivalent method for this operator is `GCHandle.Equals`.

## GCHandle.ToIntPtr(GCHandle) method

```csharp
public static IntPtr ToIntPtr (System.Runtime.InteropServices.GCHandle value);
```

Returns the internal integer representation of a `GCHandle` object.

Parameters:

- `value`: A `GCHandle` object to retrieve an internal integer representation from.

Returns: An `IntPtr` object that represents a `GCHandle` object.

#### Examples
The following code example shows an `App` class that creates a handle to a managed object using the `GCHandle.Alloc` method, which prevents the managed object from being collected. A call to the `EnumWindows` method passes a delegate and a managed object (both declared as managed types, but not shown), and casts the handle to an `IntPtr` object. The unmanaged function passes the type back to the caller as a parameter of the callback function.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/GCHandle/Overview/sample.cs._
