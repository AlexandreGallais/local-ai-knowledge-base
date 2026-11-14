---
title: "IOrderedEnumerable<TElement> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/IOrderedEnumerable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOrderedEnumerable<TElement> interface

Namespace: `System.Linq`

```csharp
public interface IOrderedEnumerable<out TElement> : System.Collections.Generic.IEnumerable<out TElement>
```

Represents a sorted sequence.

Parameters:

- `TElement`: The type of the elements of the sequence.

#### Remarks
This type is enumerable because it inherits from `IEnumerable<T>`.

The extension methods `Enumerable.ThenBy` and `Enumerable.ThenByDescending` operate on objects of type `IOrderedEnumerable<T>`. An object of type `IOrderedEnumerable<T>` can be obtained by calling one of the primary sort methods, `Enumerable.OrderBy` or `Enumerable.OrderByDescending`, which return an `IOrderedEnumerable<T>`. `Enumerable.ThenBy` and `Enumerable.ThenByDescending`, the subordinate sort methods, in turn also return an object of type `IOrderedEnumerable<T>`. This design allows for any number of consecutive calls to `Enumerable.ThenBy` or `Enumerable.ThenByDescending`, where each call performs a subordinate ordering on the sorted data returned from the previous call.

#### Examples
The following example demonstrates how to perform a primary and secondary ordering on an array of strings. It also demonstrates that the resulting `IOrderedEnumerable<T>` is enumerable.

_Code sample not included: ~/snippets/csharp/System.Linq/IOrderedEnumerableTElement/Overview/IOrderedEnumerable.cs._

## IOrderedEnumerable<TElement>.CreateOrderedEnumerable<TKey>(Func<TElement,TKey>, IComparer<TKey>, Boolean) method

```csharp
public System.Linq.IOrderedEnumerable<out TElement> CreateOrderedEnumerable<TKey> (Func<out TElement,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer, bool descending);
```

Performs a subsequent ordering on the elements of an `IOrderedEnumerable<T>` according to a key.

Parameters:

- `TKey`: The type of the key <example-value> by `keySelector`.
- `keySelector`: The `Func<T1,T2>` used to extract the key for each element.
- `comparer`: The `IComparer<T>` used to compare keys for placement in the returned sequence.
- `descending`: `true` to sort the elements in descending order; `false` to sort the elements in ascending order.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted according to a key.

#### Remarks
The functionality provided by this method is like that provided by `Enumerable.ThenBy` or `Enumerable.ThenByDescending`, depending on whether `descending` is `true` or `false`. They both perform a subordinate ordering of an already sorted sequence of type `IOrderedEnumerable<T>`.

#### Examples
The following code example demonstrates how to use `IOrderedEnumerable<T>.CreateOrderedEnumerable` to perform a secondary ordering on an `IOrderedEnumerable<T>`.

_Code sample not included: ~/snippets/csharp/System.Linq/IOrderedEnumerableTElement/Overview/IOrderedEnumerable.cs._
