---
title: "DefaultPooledObjectPolicy<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/DefaultPooledObjectPolicy`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultPooledObjectPolicy<T> class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public class DefaultPooledObjectPolicy<T> : Microsoft.Extensions.ObjectPool.PooledObjectPolicy<T> where T : class, new()
```

Default implementation for `PooledObjectPolicy<T>`.

Parameters:

- `T`: The type of object which is being pooled.

To be added.

## DefaultPooledObjectPolicy<T>.DefaultPooledObjectPolicy() constructor

```csharp
public DefaultPooledObjectPolicy ();
```

To be added.

To be added.

## DefaultPooledObjectPolicy<T>.Create() method

```csharp
public override T Create ();
```

Creates a `T`.

Returns: The `T` that was created.

To be added.

## DefaultPooledObjectPolicy<T>.Return(T) method

```csharp
public override bool Return (T obj);
```

Runs some processing when an object is returned to the pool. Can be used to reset the state of an object and indicate if the object should be returned to the pool.

Parameters:

- `obj`: The object to return to the pool.

Returns: `true` if the object should be returned to the pool. `false` if it's not possible or desirable for the pool to keep the object.

To be added.
