---
title: "AsyncEnumerable class (part 16 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 16 of 16)

## AsyncEnumerable.Where<TSource>(IAsyncEnumerable<TSource>, Boolean>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Where<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate);
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

## AsyncEnumerable.Zip<TFirst,TSecond>(IAsyncEnumerable<TFirst>, IAsyncEnumerable<TSecond>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TFirst First, TSecond Second)> Zip<TFirst,TSecond> (this System.Collections.Generic.IAsyncEnumerable<TFirst> first, System.Collections.Generic.IAsyncEnumerable<TSecond> second);
```

Produces a sequence of tuples with elements from the two specified sequences.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `first`: The first sequence to merge.
- `second`: The second sequence to merge.

Returns: A sequence of tuples with elements taken from the first and second sequences, in that order.

Exceptions:

- `ArgumentNullException`: `second` is `null`.

To be added.

## AsyncEnumerable.Zip<TFirst,TSecond,TResult>(IAsyncEnumerable<TFirst>, IAsyncEnumerable<TSecond>, ValueTask<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Zip<TFirst,TSecond,TResult> (this System.Collections.Generic.IAsyncEnumerable<TFirst> first, System.Collections.Generic.IAsyncEnumerable<TSecond> second, Func<TFirst,TSecond,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector);
```

Applies a specified function to the corresponding elements of two sequences,
producing a sequence of the results.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `TResult`: The type of the elements of the result sequence.
- `first`: The first sequence to merge.
- `second`: The second sequence to merge.
- `resultSelector`: A function that specifies how to merge the elements from the two sequences.

Returns: An `IAsyncEnumerable<T>` that contains merged elements of two input sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.Zip<TFirst,TSecond,TResult>(IAsyncEnumerable<TFirst>, IAsyncEnumerable<TSecond>, Func<TFirst,TSecond,TResult>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Zip<TFirst,TSecond,TResult> (this System.Collections.Generic.IAsyncEnumerable<TFirst> first, System.Collections.Generic.IAsyncEnumerable<TSecond> second, Func<TFirst,TSecond,TResult> resultSelector);
```

Applies a specified function to the corresponding elements of two sequences,
producing a sequence of the results.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `TResult`: The type of the elements of the result sequence.
- `first`: The first sequence to merge.
- `second`: The second sequence to merge.
- `resultSelector`: A function that specifies how to merge the elements from the two sequences.

Returns: An `IAsyncEnumerable<T>` that contains merged elements of two input sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.Zip<TFirst,TSecond,TThird>(IAsyncEnumerable<TFirst>, IAsyncEnumerable<TSecond>, IAsyncEnumerable<TThird>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TFirst First, TSecond Second, TThird Third)> Zip<TFirst,TSecond,TThird> (this System.Collections.Generic.IAsyncEnumerable<TFirst> first, System.Collections.Generic.IAsyncEnumerable<TSecond> second, System.Collections.Generic.IAsyncEnumerable<TThird> third);
```

Produces a sequence of tuples with elements from the three specified sequences.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `TThird`: The type of the elements of the third input sequence.
- `first`: The first sequence to merge.
- `second`: The second sequence to merge.
- `third`: The third sequence to merge.

Returns: A sequence of tuples with elements taken from the first, second, and third sequences, in that order.

Exceptions:

- `ArgumentNullException`: `third` is `null`.

To be added.
