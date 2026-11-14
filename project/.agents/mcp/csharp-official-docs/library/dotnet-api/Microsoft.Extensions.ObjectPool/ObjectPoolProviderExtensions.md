---
title: "ObjectPoolProviderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/ObjectPoolProviderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObjectPoolProviderExtensions class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public static class ObjectPoolProviderExtensions
```

Extension methods for `ObjectPoolProvider`.

To be added.

## ObjectPoolProviderExtensions.CreateStringBuilderPool(ObjectPoolProvider) method

```csharp
public static Microsoft.Extensions.ObjectPool.ObjectPool<System.Text.StringBuilder> CreateStringBuilderPool (this Microsoft.Extensions.ObjectPool.ObjectPoolProvider provider);
```

Creates an `ObjectPool<T>` that pools `StringBuilder` instances.

Parameters:

- `provider`: The `ObjectPoolProvider`.

Returns: The `ObjectPool<T>`.

To be added.

## ObjectPoolProviderExtensions.CreateStringBuilderPool(ObjectPoolProvider, Int32, Int32) method

```csharp
public static Microsoft.Extensions.ObjectPool.ObjectPool<System.Text.StringBuilder> CreateStringBuilderPool (this Microsoft.Extensions.ObjectPool.ObjectPoolProvider provider, int initialCapacity, int maximumRetainedCapacity);
```

Creates an `ObjectPool<T>` that pools `StringBuilder` instances.

Parameters:

- `provider`: The `ObjectPoolProvider`.
- `initialCapacity`: The initial capacity to initialize `StringBuilder` instances with.
- `maximumRetainedCapacity`: The maximum value for `StringBuilder.Capacity` that is allowed to be
retained, when an instance is returned.

Returns: The `ObjectPool<T>`.

To be added.
