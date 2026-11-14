---
title: "ILookup<TKey,TElement> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ILookup`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ILookup<TKey,TElement> interface

Namespace: `System.Linq`

```csharp
public interface ILookup<TKey,TElement> : System.Collections.Generic.IEnumerable<System.Linq.IGrouping<TKey,TElement>>
```

Defines an indexer, size property, and Boolean search method for data structures that map keys to `IEnumerable<T>` sequences of values.

Parameters:

- `TKey`: The type of the keys in the `ILookup<T1,T2>`.
- `TElement`: The type of the elements in the `IEnumerable<T>` sequences that make up the values in the `ILookup<T1,T2>`.

#### Remarks
The type `Lookup<T1,T2>` implements the `ILookup<T1,T2>` interface.

The extension method `Enumerable.ToLookup`, which can be appended to the end of a LINQ query, returns an object of type `ILookup<T1,T2>`.

#### Examples
The following code example creates an `ILookup<T1,T2>` object and iterates through its contents.

_Code sample not included: ~/snippets/csharp/System.Linq/ILookupTKey,TElement/Overview/ILookup.cs._

## ILookup<TKey,TElement>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value collection pairs in the `ILookup<T1,T2>`.

Returns: The number of key/value collection pairs in the `ILookup<T1,T2>`.

To be added.

## ILookup<TKey,TElement>.Item property

```csharp
public System.Collections.Generic.IEnumerable<TElement> this[TKey key] { get; }
```

Gets the `IEnumerable<T>` sequence of values indexed by a specified key.

Parameters:

- `key`: The key of the desired sequence of values.

Returns: The `IEnumerable<T>` sequence of values indexed by the specified key.

To be added.

## ILookup<TKey,TElement>.Contains(TKey) method

```csharp
public bool Contains (TKey key);
```

Determines whether a specified key <example-value> in the `ILookup<T1,T2>`.

Parameters:

- `key`: The key to search for in the `ILookup<T1,T2>`.

Returns: `true` if `key` is in the `ILookup<T1,T2>`; otherwise, `false`.

To be added.
