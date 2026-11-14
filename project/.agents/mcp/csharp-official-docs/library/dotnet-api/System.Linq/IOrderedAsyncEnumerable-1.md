---
title: "IOrderedAsyncEnumerable<TElement> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/IOrderedAsyncEnumerable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOrderedAsyncEnumerable<TElement> interface

Namespace: `System.Linq`

```csharp
public interface IOrderedAsyncEnumerable<out TElement> : System.Collections.Generic.IAsyncEnumerable<out TElement>
```

Represents a sorted asynchronous sequence.

Parameters:

- `TElement`: The type of the elements of the sequence.

This interface is not intended to be implemented by user code. It supports the .NET infrastructure.

## IOrderedAsyncEnumerable<TElement>.CreateOrderedAsyncEnumerable<TKey>(ValueTask<TKey>>, IComparer<TKey>, Boolean) method

```csharp
public System.Linq.IOrderedAsyncEnumerable<out TElement> CreateOrderedAsyncEnumerable<TKey> (Func<out TElement,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer, bool descending);
```

Performs a subsequent ordering on the elements of an `IOrderedAsyncEnumerable<T>` according to a key.

Parameters:

- `TKey`: The type of the key <example-value> by `keySelector`.
- `keySelector`: The function used to extract the key for each element.
- `comparer`: The `IComparer<T>` used to compare keys for placement in the returned sequence.
- `descending`: true to sort the elements in descending order; false to sort the elements in ascending order.

Returns: An `IOrderedAsyncEnumerable<T>` whose elements are sorted according to a key.

To be added.

## IOrderedAsyncEnumerable<TElement>.CreateOrderedAsyncEnumerable<TKey>(Func<TElement,TKey>, IComparer<TKey>, Boolean) method

```csharp
public System.Linq.IOrderedAsyncEnumerable<out TElement> CreateOrderedAsyncEnumerable<TKey> (Func<out TElement,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer, bool descending);
```

Performs a subsequent ordering on the elements of an `IOrderedAsyncEnumerable<T>` according to a key.

Parameters:

- `TKey`: The type of the key <example-value> by `keySelector`.
- `keySelector`: The function used to extract the key for each element.
- `comparer`: The `IComparer<T>` used to compare keys for placement in the returned sequence.
- `descending`: true to sort the elements in descending order; false to sort the elements in ascending order.

Returns: An `IOrderedAsyncEnumerable<T>` whose elements are sorted according to a key.

To be added.
