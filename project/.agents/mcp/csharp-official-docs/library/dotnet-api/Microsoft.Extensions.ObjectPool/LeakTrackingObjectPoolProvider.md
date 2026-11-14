---
title: "LeakTrackingObjectPoolProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/LeakTrackingObjectPoolProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LeakTrackingObjectPoolProvider class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public class LeakTrackingObjectPoolProvider : Microsoft.Extensions.ObjectPool.ObjectPoolProvider
```

An `ObjectPoolProvider` that produces instances of
`LeakTrackingObjectPool<T>`.

To be added.

## LeakTrackingObjectPoolProvider.LeakTrackingObjectPoolProvider(ObjectPoolProvider) constructor

```csharp
public LeakTrackingObjectPoolProvider (Microsoft.Extensions.ObjectPool.ObjectPoolProvider inner);
```

Initializes a new instance of `LeakTrackingObjectPoolProvider`.

Parameters:

- `inner`: The `ObjectPoolProvider` to wrap.

To be added.

## LeakTrackingObjectPoolProvider.Create<T>(IPooledObjectPolicy<T>) method

```csharp
public override Microsoft.Extensions.ObjectPool.ObjectPool<T> Create<T> (Microsoft.Extensions.ObjectPool.IPooledObjectPolicy<T> policy) where T : class;
```

To be added.

Parameters:

- `T`: To be added.
- `policy`: To be added.

Returns: To be added.

To be added.
