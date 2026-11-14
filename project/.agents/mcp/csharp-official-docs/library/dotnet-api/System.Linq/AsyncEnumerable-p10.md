---
title: "AsyncEnumerable class (part 10 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 10 of 16)

## AsyncEnumerable.Repeat<TResult>(TResult, Int32) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Repeat<TResult> (TResult element, int count);
```

Generates a sequence that contains one repeated value.

Parameters:

- `TResult`: The type of the value to be repeated in the result sequence.
- `element`: The value to be repeated.
- `count`: The number of times to repeat the value in the generated sequence.

Returns: An `IAsyncEnumerable<T>` that contains a repeated value.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than 0.

To be added.

## AsyncEnumerable.Reverse<TSource>(IAsyncEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Reverse<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source);
```

Inverts the order of the elements in a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence of values to reverse.

Returns: A sequence whose elements correspond to those of the input sequence in reverse order.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.RightJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter? Outer, TInner Inner)> RightJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter? Outer, TInner Inner)` that are obtained by performing a right outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.RightJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter? Outer, TInner Inner)> RightJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter? Outer, TInner Inner)` that are obtained by performing a right outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.RightJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, ValueTask<TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> RightJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, Func<TOuter?,TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `TResult` that are obtained by performing a right outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.RightJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> RightJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter?,TInner,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `TResult` that are obtained by performing a right outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.Select<TSource,TResult>(IAsyncEnumerable<TSource>, ValueTask<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Select<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> selector);
```

Projects each element of a sequence into a new form by incorporating the element's index.

Parameters:

- `TSource`: The type of the elements of source.
- `TResult`: The type of the value returned by selector.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each element; the second parameter of
the function represents the index of the source element.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the transform function on each element of source.

Exceptions:

- `ArgumentNullException`: `selector` is `null`.

To be added.

## AsyncEnumerable.Select<TSource,TResult>(IAsyncEnumerable<TSource>, Int32,TResult>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Select<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,TResult> selector);
```

Projects each element of a sequence into a new form by incorporating the element's index.

Parameters:

- `TSource`: The type of the elements of source.
- `TResult`: The type of the value returned by selector.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each element; the second parameter of
the function represents the index of the source element.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the transform function on each element of source.

Exceptions:

- `ArgumentNullException`: `selector` is `null`.

To be added.

## AsyncEnumerable.Select<TSource,TResult>(IAsyncEnumerable<TSource>, ValueTask<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Select<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> selector);
```

Projects each element of a sequence into a new form.

Parameters:

- `TSource`: The type of the elements of source.
- `TResult`: The type of the value returned by selector.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each element.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the transform function on each element of source.

Exceptions:

- `ArgumentNullException`: `selector` is `null`.

To be added.

## AsyncEnumerable.Select<TSource,TResult>(IAsyncEnumerable<TSource>, Func<TSource,TResult>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Select<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TResult> selector);
```

Projects each element of a sequence into a new form.

Parameters:

- `TSource`: The type of the elements of source.
- `TResult`: The type of the value returned by selector.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each element.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the transform function on each element of source.

Exceptions:

- `ArgumentNullException`: `selector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TResult>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Collections.Generic.IAsyncEnumerable<TResult>> selector);
```

Projects each element of a sequence to an `IAsyncEnumerable<T>` and
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `TResult`: The type of the elements of the sequence returned by selector.
- `source`: A sequence of values to project.
- `selector`: A transform function to apply to each element.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `selector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Collections.Generic.IEnumerable<TResult>> selector);
```

Projects each element of a sequence to an `IEnumerable<T>` and
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `TResult`: The type of the elements of the sequence returned by selector.
- `source`: A sequence of values to project.
- `selector`: A transform function to apply to each element.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `selector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TResult>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Collections.Generic.IAsyncEnumerable<TResult>> selector);
```

Projects each element of a sequence to an `IAsyncEnumerable<T>` and
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence.
The index of each source element is used in the projected form of that element.

Parameters:

- `TSource`: The type of the elements of source.
- `TResult`: The type of the elements of the sequence returned by selector.
- `source`: A sequence of values to project.
- `selector`: A transform function to apply to each element.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `selector` is `null`.

To be added.
