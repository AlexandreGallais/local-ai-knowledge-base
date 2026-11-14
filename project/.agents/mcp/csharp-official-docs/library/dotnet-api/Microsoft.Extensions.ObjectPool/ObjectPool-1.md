---
title: "ObjectPool<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/ObjectPool`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObjectPool<T> class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public abstract class ObjectPool<T> where T : class
```

A pool of objects.

Parameters:

- `T`: The type of objects to pool.

To be added.

## ObjectPool<T>.ObjectPool() constructor

```csharp
protected ObjectPool ();
```

To be added.

To be added.

## ObjectPool<T>.Get() method

```csharp
public abstract T Get ();
```

Gets an object from the pool if one is available, otherwise creates one.

Returns: A `T`.

To be added.

## ObjectPool<T>.Return(T) method

```csharp
public abstract void Return (T obj);
```

Return an object to the pool.

Parameters:

- `obj`: The object to add to the pool.

To be added.
