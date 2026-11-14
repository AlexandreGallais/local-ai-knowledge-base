---
title: "AsyncEnumerable class (part 15 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 15 of 16)

## AsyncEnumerable.ToDictionaryAsync<TSource,TKey,TElement>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.Dictionary<TKey,TElement>> ToDictionaryAsync<TSource,TKey,TElement> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `Dictionary<T1,T2>` from an `IAsyncEnumerable<T>`"/>
according to specified key <example-value> and element selector functions.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: An `IAsyncEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `Dictionary<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `elementSelector` is `null`.
- `ArgumentException`: `source` contains one or more duplicate keys (via the returned task).

To be added.

## AsyncEnumerable.ToHashSetAsync<TSource>(IAsyncEnumerable<TSource>, IEqualityComparer<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.HashSet<TSource>> ToHashSetAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Collections.Generic.IEqualityComparer<TSource>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `HashSet<T>` from an `IAsyncEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to create a `HashSet<T>` from.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `HashSet<T>` that contains values of type `TSource` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.ToListAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.List<TSource>> ToListAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Creates a list from an `IAsyncEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IEnumerable<T>` to create a list from.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A list that contains the elements from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.ToLookupAsync<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Linq.ILookup<TKey,TSource>> ToLookupAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `ILookup<T1,T2>` from an `IAsyncEnumerable<T>`
according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: The `IAsyncEnumerable<T>` to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `ILookup<T1,T2>` that contains keys and values.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ToLookupAsync<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Linq.ILookup<TKey,TSource>> ToLookupAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `ILookup<T1,T2>` from an `IAsyncEnumerable<T>`
according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: The `IAsyncEnumerable<T>` to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `ILookup<T1,T2>` that contains keys and values.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ToLookupAsync<TSource,TKey,TElement>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, ValueTask<TElement>>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Linq.ILookup<TKey,TElement>> ToLookupAsync<TSource,TKey,TElement> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TElement>> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `ILookup<T1,T2>` from an `IAsyncEnumerable<T>`
according to a specified key <example-value> function and element selector functions.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: The `IAsyncEnumerable<T>` to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `ILookup<T1,T2>` that contains keys and values.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ToLookupAsync<TSource,TKey,TElement>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Linq.ILookup<TKey,TElement>> ToLookupAsync<TSource,TKey,TElement> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `ILookup<T1,T2>` from an `IAsyncEnumerable<T>`
according to a specified key <example-value> function and element selector functions.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: The `IAsyncEnumerable<T>` to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `ILookup<T1,T2>` that contains keys and values.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.Union<TSource>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Union<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer = default);
```

Produces the set union of two sequences.

Parameters:

- `first`: An `IAsyncEnumerable<T>` whose distinct elements form the first set for the union.
- `second`: An `IAsyncEnumerable<T>` whose distinct elements form the second set for the union.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `second` is `null`.

To be added.

## AsyncEnumerable.UnionBy<TSource,TKey>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TSource>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> UnionBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TSource> second, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Produces the set union of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IAsyncEnumerable<T>` whose distinct elements form the first set for the union.
- `second`: An `IAsyncEnumerable<T>` whose distinct elements form the second set for the union.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: An `IAsyncEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `second` is `null`.

To be added.

## AsyncEnumerable.UnionBy<TSource,TKey>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> UnionBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TSource> second, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Produces the set union of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IAsyncEnumerable<T>` whose distinct elements form the first set for the union.
- `second`: An `IAsyncEnumerable<T>` whose distinct elements form the second set for the union.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: An `IAsyncEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `second` is `null`.

To be added.

## AsyncEnumerable.Where<TSource>(IAsyncEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Where<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Filters a sequence of values based on a predicate.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to filter.
- `predicate`: A function to test each element for a condition.

Returns: An `IAsyncEnumerable<T>` that contains elements from the input sequence that satisfy the condition.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.Where<TSource>(IAsyncEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Where<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,bool> predicate);
```

Filters a sequence of values based on a predicate.
Each element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to filter.
- `predicate`: A function to test each element for a condition; the second parameter
of the function represents the index of the source element.

Returns: An `IAsyncEnumerable<T>` that contains elements from the input sequence that satisfy the condition.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.Where<TSource>(IAsyncEnumerable<TSource>, Boolean>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Where<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate);
```

Filters a sequence of values based on a predicate.
Each element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to filter.
- `predicate`: A function to test each element for a condition; the second parameter
of the function represents the index of the source element.

Returns: An `IAsyncEnumerable<T>` that contains elements from the input sequence that satisfy the condition.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.
