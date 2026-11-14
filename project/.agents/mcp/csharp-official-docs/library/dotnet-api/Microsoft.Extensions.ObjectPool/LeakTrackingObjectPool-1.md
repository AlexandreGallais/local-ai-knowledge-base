---
title: "LeakTrackingObjectPool<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/LeakTrackingObjectPool`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LeakTrackingObjectPool<T> class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public class LeakTrackingObjectPool<T> : Microsoft.Extensions.ObjectPool.ObjectPool<T> where T : class
```

An `ObjectPool<T>` implementation that detects leaks in the use of the object pool.

A leak is produced if an object is leased from the pool but not returned before it is finalized.
An error is only produced in `Debug` builds.
This type is only recommended to be used for diagnostic builds.

Parameters:

- `T`: The type of object which is being pooled.

To be added.

## LeakTrackingObjectPool<T>.LeakTrackingObjectPool(ObjectPool<T>) constructor

```csharp
public LeakTrackingObjectPool (Microsoft.Extensions.ObjectPool.ObjectPool<T> inner);
```

Initializes a new instance of `LeakTrackingObjectPool<T>`.

Parameters:

- `inner`: The `ObjectPool<T>` instance to track leaks in.

To be added.

## LeakTrackingObjectPool<T>.Get() method

```csharp
public override T Get ();
```

To be added.

Returns: To be added.

To be added.

## LeakTrackingObjectPool<T>.Return(T) method

```csharp
public override void Return (T obj);
```

To be added.

Parameters:

- `obj`: To be added.

To be added.
