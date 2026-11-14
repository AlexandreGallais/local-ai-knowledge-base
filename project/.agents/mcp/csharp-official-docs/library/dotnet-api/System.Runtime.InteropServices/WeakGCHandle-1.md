---
title: "WeakGCHandle<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/WeakGCHandle`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WeakGCHandle<T> struct

Namespace: `System.Runtime.InteropServices`

```csharp
public struct WeakGCHandle<T> : IDisposable, IEquatable<System.Runtime.InteropServices.WeakGCHandle<T>> where T : class
```

Represents a strongly typed GC handle to a managed object.

Parameters:

- `T`: The type of the object this `WeakGCHandle<T>` tracks to.

The object is allowed to be collected. When the object is collected, the handle target is set to `null`.

This type corresponds to `GCHandleType.Weak` or `GCHandleType.WeakTrackResurrection`.

This type is unsafe if used incorrectly. Incorrect usage like mismanagement of lifetime, providing an invalid handle value, or concurrent disposal can result in hard to diagnose crashes or data corruptions.

.

## WeakGCHandle<T>.WeakGCHandle(T, Boolean) constructor

```csharp
public WeakGCHandle (T target, bool trackResurrection = false);
```

Initializes a new instance of `WeakGCHandle<T>`.

Parameters:

- `target`: The object that uses the `WeakGCHandle<T>`.
- `trackResurrection`: `true` to track the object when it's resurrected in the finalizer; otherwise, `false`.

To be added.

## WeakGCHandle<T>.IsAllocated property

```csharp
public bool IsAllocated { get; }
```

Gets a value that indicates whether this handle has been allocated or not.

Returns: To be added.

To be added.

## WeakGCHandle<T>.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

This method is not thread safe.

## WeakGCHandle<T>.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

To be added.

Parameters:

- `obj`: To be added.

Returns: To be added.

To be added.

## WeakGCHandle<T>.Equals(WeakGCHandle<T>) method

```csharp
public readonly bool Equals (System.Runtime.InteropServices.WeakGCHandle<T> other);
```

To be added.

Parameters:

- `other`: To be added.

Returns: To be added.

To be added.

## WeakGCHandle<T>.FromIntPtr(IntPtr) method

```csharp
public static System.Runtime.InteropServices.WeakGCHandle<T> FromIntPtr (IntPtr value);
```

Returns a new `WeakGCHandle<T>` object created from a handle to a managed object.

Parameters:

- `value`: An `IntPtr` handle to a managed object to create a `WeakGCHandle<T>` object from.

Returns: A new `WeakGCHandle<T>` object that corresponds to the value parameter.

This method doesn't validate the provided handle value. The caller must ensure the validity of the handle.

The `IntPtr` representation of `WeakGCHandle<T>` is not interchangable with `GCHandle`.

## WeakGCHandle<T>.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: A hash code for the current instance.

To be added.

## WeakGCHandle<T>.SetTarget(T) method

```csharp
public readonly void SetTarget (T target);
```

Sets the object this handle represents.

Parameters:

- `target`: To be added.

Exceptions:

- `NullReferenceException`: The handle is not initialized or is already disposed.

To be added.

## WeakGCHandle<T>.ToIntPtr(WeakGCHandle<T>) method

```csharp
public static IntPtr ToIntPtr (System.Runtime.InteropServices.WeakGCHandle<T> value);
```

Returns the internal integer representation of a `WeakGCHandle<T>` object.

Parameters:

- `value`: A `WeakGCHandle<T>` object to retrieve an internal integer representation from.

Returns: An `IntPtr` object that represents a `WeakGCHandle<T>` object.

The `IntPtr` representation of `WeakGCHandle<T>` is not interchangable with `GCHandle`.

## WeakGCHandle<T>.TryGetTarget(T) method

```csharp
public readonly bool TryGetTarget (out T? target);
```

Tries to retrieve the target object that is referenced by the current `WeakGCHandle<T>` object.

Parameters:

- `target`: When this method returns, contains the target object, if it is available.

Returns: `true` if the target was retrieved; otherwise, `false`.

Exceptions:

- `NullReferenceException`: The handle is not initialized or is already disposed.

To be added.
