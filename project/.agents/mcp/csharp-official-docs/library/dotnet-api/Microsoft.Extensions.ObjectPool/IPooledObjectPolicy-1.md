---
title: "IPooledObjectPolicy<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/IPooledObjectPolicy`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPooledObjectPolicy<T> interface

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public interface IPooledObjectPolicy<T>
```

Represents a policy for managing pooled objects.

Parameters:

- `T`: The type of object which is being pooled.

To be added.

## IPooledObjectPolicy<T>.Create() method

```csharp
public T Create ();
```

Create a `T`.

Returns: The `T` which was created.

To be added.

## IPooledObjectPolicy<T>.Return(T) method

```csharp
public bool Return (T obj);
```

Runs some processing when an object was returned to the pool. Can be used to reset the state of an object and indicate if the object should be returned to the pool.

Parameters:

- `obj`: The object to return to the pool.

Returns: `true` if the object should be returned to the pool. `false` if it's not possible/desirable for the pool to keep the object.

To be added.
