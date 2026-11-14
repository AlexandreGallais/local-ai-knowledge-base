---
title: "WeakReference<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/WeakReference`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WeakReference<T> class

Namespace: `System`

```csharp
public sealed class WeakReference<T> : System.Runtime.Serialization.ISerializable where T : class
```

Represents a typed weak reference, which references an object while still allowing that object to be reclaimed by garbage collection.

Parameters:

- `T`: The type of the object referenced.

#### Remarks
A weak reference enables the garbage collector to collect an object while still allowing an application to access the object. If you need the object, you can obtain a strong reference to it and prevent it from being collected.

## WeakReference<T>.WeakReference(T) constructor

```csharp
public WeakReference (T target);
```

Initializes a new instance of the `WeakReference<T>` class that references the specified object.

Parameters:

- `target`: The object to reference, or `null`.

To be added.

## WeakReference<T>.WeakReference(T, Boolean) constructor

```csharp
public WeakReference (T target, bool trackResurrection);
```

Initializes a new instance of the `WeakReference<T>` class that references the specified object and uses the specified resurrection tracking.

Parameters:

- `target`: The object to reference, or `null`.
- `trackResurrection`: `true` to track the object after finalization; `false` to track the object only until finalization.

To be added.

## WeakReference<T>.Finalize() method

```csharp
~WeakReference ();
```

Discards the reference to the target that is represented by the current `WeakReference<T>` object.

To be added.

## WeakReference<T>.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with all the data necessary to serialize the current `WeakReference<T>` object.

Parameters:

- `info`: An object that holds all the data necessary to serialize or deserialize the current `WeakReference<T>` object.
- `context`: The location where serialized data is stored and retrieved.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## WeakReference<T>.SetTarget(T) method

```csharp
public void SetTarget (T target);
```

Sets the target object that is referenced by this `WeakReference<T>` object.

Parameters:

- `target`: The new target object.

To be added.

## WeakReference<T>.TryGetTarget(T) method

```csharp
public bool TryGetTarget (out T target);
```

Tries to retrieve the target object that is referenced by the current `WeakReference<T>` object.

Parameters:

- `target`: When this method returns, contains the target object, if it is available. This parameter is treated as uninitialized.

Returns: `true` if the target was retrieved; otherwise, `false`.

To be added.
