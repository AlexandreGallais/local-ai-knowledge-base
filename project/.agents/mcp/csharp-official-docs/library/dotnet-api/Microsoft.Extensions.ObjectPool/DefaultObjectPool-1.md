---
title: "DefaultObjectPool<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/DefaultObjectPool`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultObjectPool<T> class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public class DefaultObjectPool<T> : Microsoft.Extensions.ObjectPool.ObjectPool<T> where T : class
```

Default implementation of `ObjectPool<T>`.

Parameters:

- `T`: The type to pool objects for.

This implementation keeps a cache of retained objects. This means that if objects are returned when the pool has already reached "maximumRetained" objects they will be available to be Garbage Collected.

## DefaultObjectPool<T>.DefaultObjectPool(IPooledObjectPolicy<T>) constructor

```csharp
public DefaultObjectPool (Microsoft.Extensions.ObjectPool.IPooledObjectPolicy<T> policy);
```

Creates an instance of `DefaultObjectPool<T>`.

Parameters:

- `policy`: The pooling policy to use.

To be added.

## DefaultObjectPool<T>.DefaultObjectPool(IPooledObjectPolicy<T>, Int32) constructor

```csharp
public DefaultObjectPool (Microsoft.Extensions.ObjectPool.IPooledObjectPolicy<T> policy, int maximumRetained);
```

Creates an instance of `DefaultObjectPool<T>`.

Parameters:

- `policy`: The pooling policy to use.
- `maximumRetained`: The maximum number of objects to retain in the pool.

To be added.

## DefaultObjectPool<T>.Get() method

```csharp
public override T Get ();
```

To be added.

Returns: To be added.

To be added.

## DefaultObjectPool<T>.Return(T) method

```csharp
public override void Return (T obj);
```

To be added.

Parameters:

- `obj`: To be added.

To be added.
