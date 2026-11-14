---
title: "PinnedGCHandle<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/PinnedGCHandle`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PinnedGCHandle<T> struct

Namespace: `System.Runtime.InteropServices`

```csharp
public struct PinnedGCHandle<T> : IDisposable, IEquatable<System.Runtime.InteropServices.PinnedGCHandle<T>> where T : class
```

Represents a strongly typed GC handle to a managed object.

Parameters:

- `T`: The type of the object this `PinnedGCHandle<T>` tracks to.

The object is pinned at a fixed location in the GC heap and allows its address to be taken.

This type corresponds to `GCHandleType.Pinned`.

This type is unsafe if used incorrectly. Incorrect usage like mismanagement of lifetime, providing invalid handle value or concurrent disposal can result in hard to diagnose crashes or data corruptions.

## PinnedGCHandle<T>.PinnedGCHandle(T) constructor

```csharp
public PinnedGCHandle (T target);
```

Allocates a handle for the specified object.

Parameters:

- `target`: The object that uses the `PinnedGCHandle<T>`.

To be added.

## PinnedGCHandle<T>.IsAllocated property

```csharp
public bool IsAllocated { get; }
```

Gets a value that indicates whether this handle has been allocated or not.

Returns: To be added.

To be added.

## PinnedGCHandle<T>.Target property

```csharp
public T Target { get; set; }
```

Gets or sets the object this handle represents.

Returns: To be added.

Exceptions:

- `NullReferenceException`: The handle is not initialized or is already disposed.

To be added.

## PinnedGCHandle<T>.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

This method is not thread safe.

## PinnedGCHandle<T>.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

To be added.

Parameters:

- `obj`: To be added.

Returns: To be added.

To be added.

## PinnedGCHandle<T>.Equals(PinnedGCHandle<T>) method

```csharp
public readonly bool Equals (System.Runtime.InteropServices.PinnedGCHandle<T> other);
```

To be added.

Parameters:

- `other`: To be added.

Returns: To be added.

To be added.

## PinnedGCHandle<T>.FromIntPtr(IntPtr) method

```csharp
public static System.Runtime.InteropServices.PinnedGCHandle<T> FromIntPtr (IntPtr value);
```

Returns a new `PinnedGCHandle<T>` object created from a handle to a managed object.

Parameters:

- `value`: An `IntPtr` handle to a managed object to create a `PinnedGCHandle<T>` object from.

Returns: A new `PinnedGCHandle<T>` object that corresponds to the value parameter.

This method doesn't validate the provided handle value. The caller must ensure the validity of the handle.

The `IntPtr` representation of `PinnedGCHandle<T>` is not interchangable with `GCHandle`.

## PinnedGCHandle<T>.GetAddressOfObjectData() method

```csharp
public readonly void* GetAddressOfObjectData ();
```

Retrieves the address of object data in a `PinnedGCHandle<T>`.

Returns: The address of first instance field of the pinned object, or `null` if the handle doesn't point to any object.

Exceptions:

- `NullReferenceException`: The handle is not initialized or is already disposed.

This method is intended to be used with types other than array or `String`.

For array or `String`, use `GCHandleExtensions.GetAddressOfArrayData<T>` or `GCHandleExtensions.GetAddressOfStringData` instead.

This method should only be used for blittable types.

## PinnedGCHandle<T>.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: A hash code for the current instance.

To be added.

## PinnedGCHandle<T>.ToIntPtr(PinnedGCHandle<T>) method

```csharp
public static IntPtr ToIntPtr (System.Runtime.InteropServices.PinnedGCHandle<T> value);
```

Returns the internal integer representation of a `PinnedGCHandle<T>` object.

Parameters:

- `value`: A `PinnedGCHandle<T>` object to retrieve an internal integer representation from.

Returns: An `IntPtr` object that represents a `PinnedGCHandle<T>` object.

The `IntPtr` representation of `PinnedGCHandle<T>` is not interchangable with `GCHandle`.
