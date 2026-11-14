---
title: "HashSet<T>+AlternateLookup<TAlternate> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/HashSet`1+AlternateLookup`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashSet<T>+AlternateLookup<TAlternate> struct

Namespace: `System.Collections.Generic`

```csharp
public readonly struct HashSet<T>.AlternateLookup<TAlternate> where TAlternate : allows ref struct
```

Provides a type that can be used to perform operations on a `HashSet<T>` using a `TAlternate` instead of a `T`.

Parameters:

- `T`: The type of elements in the hash set.
- `TAlternate`: The alternate type of instance for performing lookups.

To be added.

## HashSet<T>+AlternateLookup<TAlternate>.Set property

```csharp
public System.Collections.Generic.HashSet<T> Set { get; }
```

Gets the `HashSet<T>` against which this instance performs operations.

Returns: To be added.

To be added.

## HashSet<T>+AlternateLookup<TAlternate>.Add(TAlternate) method

```csharp
public bool Add (TAlternate item);
```

Adds the specified element to a set.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if the element is added to the set; `false` if the element is already present.

To be added.

## HashSet<T>+AlternateLookup<TAlternate>.Contains(TAlternate) method

```csharp
public bool Contains (TAlternate item);
```

Determines whether a set contains the specified element.

Parameters:

- `item`: The element to locate in the set.

Returns: `true` if the set contains the specified element; otherwise, `false`.

To be added.

## HashSet<T>+AlternateLookup<TAlternate>.Remove(TAlternate) method

```csharp
public bool Remove (TAlternate item);
```

Removes the specified element from a set.

Parameters:

- `item`: The element to remove.

Returns: `true` if the element is successfully found and removed; otherwise, `false`.

To be added.

## HashSet<T>+AlternateLookup<TAlternate>.TryGetValue(TAlternate, T) method

```csharp
public bool TryGetValue (TAlternate equalValue, out T actualValue);
```

Searches the set for a given value and returns the equal value it finds, if any.

Parameters:

- `equalValue`: The value to search for.
- `actualValue`: When this method returns, contains the value from the set that the search found, or the default value of `T` if the search yielded no match.

Returns: `true` if the search was successful; otherwise, `false`.

To be added.
