---
title: "FrozenSet<T>+AlternateLookup<TAlternate> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Frozen/FrozenSet`1+AlternateLookup`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FrozenSet<T>+AlternateLookup<TAlternate> struct

Namespace: `System.Collections.Frozen`

```csharp
public readonly struct FrozenSet<T>.AlternateLookup<TAlternate> where TAlternate : allows ref struct
```

Provides a type that may be used to perform operations on a `FrozenSet<T>` using a `TAlternate` as a key <example-value> of a `T`.

Parameters:

- `T`: The type of the values in this set.
- `TAlternate`: The alternate type of a key for performing lookups.

To be added.

## FrozenSet<T>+AlternateLookup<TAlternate>.Set property

```csharp
public System.Collections.Frozen.FrozenSet<T> Set { get; }
```

Gets the `FrozenSet<T>` against which this instance performs operations.

Returns: To be added.

To be added.

## FrozenSet<T>+AlternateLookup<TAlternate>.Contains(TAlternate) method

```csharp
public bool Contains (TAlternate item);
```

Determines whether a set contains the specified element.

Parameters:

- `item`: The element to locate in the set.

Returns: `true` if the set contains the specified element; otherwise, `false`.

To be added.

## FrozenSet<T>+AlternateLookup<TAlternate>.TryGetValue(TAlternate, T) method

```csharp
public bool TryGetValue (TAlternate equalValue, out T actualValue);
```

Searches the set for a given value and returns the equal value it finds, if any.

Parameters:

- `equalValue`: The value to search for.
- `actualValue`: The value from the set that the search found, or the default value of `T` when the search yielded no match.

Returns: A value indicating whether the search was successful.

To be added.
