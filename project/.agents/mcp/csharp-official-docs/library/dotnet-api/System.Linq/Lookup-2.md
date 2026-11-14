---
title: "Lookup<TKey,TElement> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Lookup`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Lookup<TKey,TElement> class

Namespace: `System.Linq`

```csharp
public class Lookup<TKey,TElement> : System.Collections.Generic.IEnumerable<System.Linq.IGrouping<TKey,TElement>>, System.Linq.ILookup<TKey,TElement>
```

Represents a collection of keys each mapped to one or more values.

Parameters:

- `TKey`: The type of the keys in the `Lookup<T1,T2>`.
- `TElement`: The type of the elements of each `IEnumerable<T>` value in the `Lookup<T1,T2>`.

#### Remarks
A `Lookup<T1,T2>` resembles a `Dictionary<T1,T2>`. The difference is that a `Dictionary<T1,T2>` maps keys to single values, whereas a `Lookup<T1,T2>` maps keys to collections of values.

You can create an instance of a `Lookup<T1,T2>` by calling `Enumerable.ToLookup` on an object that implements `IEnumerable<T>`.

> **Note:**
>  There is no public constructor to create a new instance of a `Lookup<T1,T2>`. Additionally, `Lookup<T1,T2>` objects are immutable, that is, you cannot add or remove elements or keys from a `Lookup<T1,T2>` object after it has been created.

#### Examples
The following example creates a `Lookup<T1,T2>` from a collection of objects. It then enumerates the `Lookup<T1,T2>` and outputs each key and each value in the key's associated collection of values. It also demonstrates how to use the properties `Lookup<T1,T2>.Count` and `Lookup<T1,T2>.Item` and the methods `Lookup<T1,T2>.Contains` and `Lookup<T1,T2>.GetEnumerator`.

_Code sample not included: ~/snippets/csharp/System.Linq/LookupTKey,TElement/Overview/lookup.cs._

## Lookup<TKey,TElement>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value collection pairs in the `Lookup<T1,T2>`.

Returns: The number of key/value collection pairs in the `Lookup<T1,T2>`.

#### Remarks
The value of the `Count` property does not change because items cannot be added to or removed from a `Lookup<T1,T2>` object after it has been created.

#### Examples
The following example demonstrates how to use `Lookup<T1,T2>.Count` to determine the number of key/value collection pairs in a `Lookup<T1,T2>`. This code example is part of a larger example provided for the `Lookup<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Linq/LookupTKey,TElement/Overview/lookup.cs._

## Lookup<TKey,TElement>.Item property

```csharp
public System.Collections.Generic.IEnumerable<TElement> this[TKey key] { get; }
```

Gets the collection of values indexed by the specified key.

Parameters:

- `key`: The key of the desired collection of values.

Returns: The collection of values indexed by the specified key.

#### Remarks
This indexed property provides the ability to index a specific collection of values in the `Lookup<T1,T2>` by using the following syntax: `myLookup[key]` in Visual C# or `myLookup(key)` in Visual Basic. If the `key` is not found in the collection, an empty sequence is returned.

#### Examples
The following example demonstrates how to use `Lookup<T1,T2>.Item` to index directly into a `Lookup<T1,T2>`. This code example is part of a larger example provided for the `Lookup<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Linq/LookupTKey,TElement/Overview/lookup.cs._

## Lookup<TKey,TElement>.ApplyResultSelector<TResult>(IEnumerable<TElement>,TResult>) method

```csharp
public System.Collections.Generic.IEnumerable<TResult> ApplyResultSelector<TResult> (Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult> resultSelector);
```

Applies a transform function to each key and its associated values and returns the results.

Parameters:

- `TResult`: The type of the result values produced by `resultSelector`.
- `resultSelector`: A function to project a result value from each key and its associated values.

Returns: A collection that contains one value for each key/value collection pair in the `Lookup<T1,T2>`.

To be added.

## Lookup<TKey,TElement>.Contains(TKey) method

```csharp
public bool Contains (TKey key);
```

Determines whether a specified key is in the `Lookup<T1,T2>`.

Parameters:

- `key`: The key to find in the `Lookup<T1,T2>`.

Returns: `true` if `key` is in the `Lookup<T1,T2>`; otherwise, `false`.

#### Examples
The following example demonstrates how to use `Lookup<T1,T2>.Contains` to determine whether a `Lookup<T1,T2>` contains a specified key. This code example is part of a larger example provided for the `Lookup<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Linq/LookupTKey,TElement/Overview/lookup.cs._

## Lookup<TKey,TElement>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Linq.IGrouping<TKey,TElement>> GetEnumerator ();
```

Returns a generic enumerator that iterates through the `Lookup<T1,T2>`.

Returns: An enumerator for the `Lookup<T1,T2>`.

#### Examples
The following example demonstrates how to use `Lookup<T1,T2>.GetEnumerator` to iterate through the keys and values of a `Lookup<T1,T2>`. This code example is part of a larger example provided for the `Lookup<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Linq/LookupTKey,TElement/Overview/lookup.cs._

## Lookup<TKey,TElement>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `Lookup<T1,T2>`. This class cannot be inherited.

Returns: An enumerator for the `Lookup<T1,T2>`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Lookup<T1,T2>` instance is cast to an `IEnumerable` interface.
