---
title: "ReadOnlyCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyCollection class

Namespace: `System.Collections.ObjectModel`

```csharp
public static class ReadOnlyCollection
```

Provides static methods for read-only collections.

To be added.

## ReadOnlyCollection.CreateCollection<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.ObjectModel.ReadOnlyCollection<T> CreateCollection<T> (scoped ReadOnlySpan<T> values);
```

Creates a new `ReadOnlyCollection<T>` from the specified span of values.

This method (simplifies collection initialization)[https://learn.microsoft.com/dotnet/csharp/language-reference/operators/collection-expressions] to create a new `ReadOnlyCollection<T>` with the specified values.

Parameters:

- `T`: The type of elements in the collection.
- `values`: The span of values to include in the collection.

Returns: A new `ReadOnlyCollection<T>` containing the specified values.

To be added.

## ReadOnlyCollection.CreateSet<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.ObjectModel.ReadOnlySet<T> CreateSet<T> (scoped ReadOnlySpan<T> values);
```

Creates a new `ReadOnlySet<T>` from the specified span of values.

This method (simplifies collection initialization)[https://learn.microsoft.com/dotnet/csharp/language-reference/operators/collection-expressions] to create a new `ReadOnlySet<T>` with the specified values.

Parameters:

- `T`: The type of elements in the collection.
- `values`: The span of values to include in the collection.

Returns: A new `ReadOnlySet<T>` containing the specified values.

To be added.
