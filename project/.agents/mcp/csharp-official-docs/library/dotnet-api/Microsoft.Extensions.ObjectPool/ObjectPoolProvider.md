---
title: "ObjectPoolProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/ObjectPoolProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObjectPoolProvider class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public abstract class ObjectPoolProvider
```

A provider of `ObjectPool<T>` instances.

To be added.

## ObjectPoolProvider.ObjectPoolProvider() constructor

```csharp
protected ObjectPoolProvider ();
```

To be added.

To be added.

## ObjectPoolProvider.Create<T>() method

```csharp
public Microsoft.Extensions.ObjectPool.ObjectPool<T> Create<T> () where T : class, new();
```

Creates an `ObjectPool`.

Parameters:

- `T`: The type to create a pool for.

Returns: To be added.

To be added.

## ObjectPoolProvider.Create<T>(IPooledObjectPolicy<T>) method

```csharp
public abstract Microsoft.Extensions.ObjectPool.ObjectPool<T> Create<T> (Microsoft.Extensions.ObjectPool.IPooledObjectPolicy<T> policy) where T : class;
```

Creates an `ObjectPool` with the given `IPooledObjectPolicy<T>`.

Parameters:

- `T`: The type to create a pool for.
- `policy`: To be added.

Returns: To be added.

To be added.
