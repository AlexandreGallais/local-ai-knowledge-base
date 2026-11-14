---
title: "GCHandle<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/GCHandle`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCHandle<T> struct

Namespace: `System.Runtime.InteropServices`

```csharp
public struct GCHandle<T> : IDisposable, IEquatable<System.Runtime.InteropServices.GCHandle<T>> where T : class
```

Represents a strongly typed GC handle to a managed object.

Parameters:

- `T`: The type of the object this `GCHandle<T>` tracks to.

A GC handle is used to work with object references in unmanaged code.

This type corresponds to `GCHandleType.Normal`.

This type is unsafe if used incorrectly. Incorrect usage like mismanagement of lifetime, providing invalid handle value, or concurrent disposal can result in hard to diagnose crashes or data corruptions.

## GCHandle<T>.GCHandle(T) constructor

```csharp
public GCHandle (T target);
```

Allocates a handle for the specified object.

Parameters:

- `target`: The object that uses the `GCHandle<T>`.

To be added.

## GCHandle<T>.IsAllocated property

```csharp
public bool IsAllocated { get; }
```

Gets a value that indicates whether this handle has been allocated or not.

Returns: To be added.

To be added.

## GCHandle<T>.Target property

```csharp
public readonly T Target { get; set; }
```

Gets or sets the object this handle represents.

Returns: To be added.

Exceptions:

- `NullReferenceException`: The handle is not initialized or already disposed.

To be added.

## GCHandle<T>.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

This method is not thread safe.

## GCHandle<T>.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

To be added.

Parameters:

- `obj`: To be added.

Returns: To be added.

To be added.

## GCHandle<T>.Equals(GCHandle<T>) method

```csharp
public readonly bool Equals (System.Runtime.InteropServices.GCHandle<T> other);
```

To be added.

Parameters:

- `other`: To be added.

Returns: To be added.

To be added.

## GCHandle<T>.FromIntPtr(IntPtr) method

```csharp
public static System.Runtime.InteropServices.GCHandle<T> FromIntPtr (IntPtr value);
```

Returns a new `GCHandle<T>` object created from a handle to a managed object.

Parameters:

- `value`: An `IntPtr` handle to a managed object to create a `GCHandle<T>` object from.

Returns: A new `GCHandle<T>` object that corresponds to the value parameter.

This method doesn't validate the provided handle value. The caller must ensure the validity of the handle.

The `IntPtr` representation of `GCHandle<T>` is not interchangable with `GCHandle`.

## GCHandle<T>.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: A hash code for the current instance.

To be added.

## GCHandle<T>.ToIntPtr(GCHandle<T>) method

```csharp
public static IntPtr ToIntPtr (System.Runtime.InteropServices.GCHandle<T> value);
```

Returns the internal integer representation of a `GCHandle<T>` object.

Parameters:

- `value`: A `GCHandle<T>` object to retrieve an internal integer representation from.

Returns: An `IntPtr` object that represents a `GCHandle<T>` object.

The `IntPtr` representation of `GCHandle<T>` is not interchangable with `GCHandle`.
