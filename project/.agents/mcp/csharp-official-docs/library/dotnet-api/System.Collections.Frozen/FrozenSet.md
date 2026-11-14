---
title: "FrozenSet class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Frozen/FrozenSet.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FrozenSet class

Namespace: `System.Collections.Frozen`

```csharp
public static class FrozenSet
```

Provides a set of initialization methods for instances of the `FrozenSet<T>` class.

To be added.

## FrozenSet.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Frozen.FrozenSet<T> Create<T> (scoped ReadOnlySpan<T> source);
```

Creates a `FrozenSet<T>` with the specified values.

Parameters:

- `T`: The type of the values in the set.
- `source`: The values to use to populate the set.

Returns: A frozen set.

To be added.

## FrozenSet.Create<T>(IEqualityComparer<T>, ReadOnlySpan<T>) method

```csharp
public static System.Collections.Frozen.FrozenSet<T> Create<T> (System.Collections.Generic.IEqualityComparer<T>? equalityComparer, scoped ReadOnlySpan<T> source);
```

Creates a `FrozenSet<T>` with the specified values.

Parameters:

- `T`: The type of the values in the set.
- `equalityComparer`: The comparer implementation to use to compare values for equality. If `null`, `EqualityComparer<T>.Default` is used.
- `source`: The values to use to populate the set.

Returns: A frozen set.

To be added.

## FrozenSet.ToFrozenSet<T>(IEnumerable<T>, IEqualityComparer<T>) method

```csharp
public static System.Collections.Frozen.FrozenSet<T> ToFrozenSet<T> (this System.Collections.Generic.IEnumerable<T> source, System.Collections.Generic.IEqualityComparer<T>? comparer = default);
```

Creates a `FrozenSet<T>` with the specified values.

Parameters:

- `T`: The type of the values in the set.
- `source`: The values to use to populate the set.
- `comparer`: The comparer implementation to use to compare values for equality. If `null`, `EqualityComparer<T>.Default` is used.

Returns: A frozen set.

To be added.
