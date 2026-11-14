---
title: "StringBuilderPooledObjectPolicy class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ObjectPool/StringBuilderPooledObjectPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilderPooledObjectPolicy class

Namespace: `Microsoft.Extensions.ObjectPool`

```csharp
public class StringBuilderPooledObjectPolicy : Microsoft.Extensions.ObjectPool.PooledObjectPolicy<System.Text.StringBuilder>
```

A policy for pooling `StringBuilder` instances.

To be added.

## StringBuilderPooledObjectPolicy.StringBuilderPooledObjectPolicy() constructor

```csharp
public StringBuilderPooledObjectPolicy ();
```

To be added.

To be added.

## StringBuilderPooledObjectPolicy.InitialCapacity property

```csharp
public int InitialCapacity { get; set; }
```

Gets or sets the initial capacity of pooled `StringBuilder` instances.

Returns: Defaults to `100`.

To be added.

## StringBuilderPooledObjectPolicy.MaximumRetainedCapacity property

```csharp
public int MaximumRetainedCapacity { get; set; }
```

Gets or sets the maximum value for `StringBuilder.Capacity` that is allowed to be
retained, when `StringBuilderPooledObjectPolicy.Return` is invoked.

Returns: Defaults to `4096`.

To be added.

## StringBuilderPooledObjectPolicy.Create() method

```csharp
public override System.Text.StringBuilder Create ();
```

Creates a `T`.

Returns: The `T` that was created.

To be added.

## StringBuilderPooledObjectPolicy.Return(StringBuilder) method

```csharp
public override bool Return (System.Text.StringBuilder obj);
```

Runs some processing when an object is returned to the pool. Can be used to reset the state of an object and indicate if the object should be returned to the pool.

Parameters:

- `obj`: The object to return to the pool.

Returns: `true` if the object should be returned to the pool. `false` if it's not possible or desirable for the pool to keep the object.

To be added.
