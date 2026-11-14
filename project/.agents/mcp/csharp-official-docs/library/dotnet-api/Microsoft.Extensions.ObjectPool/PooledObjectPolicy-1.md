---
title: "PooledObjectPolicy<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/PooledObjectPolicy`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PooledObjectPolicy<T> class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public abstract class PooledObjectPolicy<T> : Microsoft.Extensions.ObjectPool.IPooledObjectPolicy<T>
```

A base type for `IPooledObjectPolicy<T>`.

Parameters:

- `T`: The type of object which is being pooled.

To be added.

## PooledObjectPolicy<T>.PooledObjectPolicy() constructor

```csharp
protected PooledObjectPolicy ();
```

To be added.

To be added.

## PooledObjectPolicy<T>.Create() method

```csharp
public abstract T Create ();
```

Creates a `T`.

Returns: The `T` that was created.

To be added.

## PooledObjectPolicy<T>.Return(T) method

```csharp
public abstract bool Return (T obj);
```

Runs some processing when an object is returned to the pool. Can be used to reset the state of an object and indicate if the object should be returned to the pool.

Parameters:

- `obj`: The object to return to the pool.

Returns: `true` if the object should be returned to the pool. `false` if it's not possible or desirable for the pool to keep the object.

To be added.
