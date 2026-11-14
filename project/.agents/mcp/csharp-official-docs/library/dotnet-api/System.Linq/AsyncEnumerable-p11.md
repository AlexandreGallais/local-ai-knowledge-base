---
title: "AsyncEnumerable class (part 11 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 11 of 16)

## AsyncEnumerable.SelectMany<TSource,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Collections.Generic.IEnumerable<TResult>> selector);
```

Projects each element of a sequence to an `IEnumerable<T>` and
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

## AsyncEnumerable.SelectMany<TSource,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TResult>>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<System.Collections.Generic.IEnumerable<TResult>>> selector);
```

Projects each element of a sequence to an `IEnumerable<T>` and
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

## AsyncEnumerable.SelectMany<TSource,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TResult>>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<System.Collections.Generic.IEnumerable<TResult>>> selector);
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

## AsyncEnumerable.SelectMany<TSource,TCollection,TResult>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TCollection>>, ValueTask<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Collections.Generic.IAsyncEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector);
```

Projects each element of a sequence to an `IAsyncEnumerable<T>`,
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence,
and invokes a result selector function on each element therein. The index of each source element is used in
the intermediate projected form of that element.

Parameters:

- `TSource`: The type of the elements of source.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function `collectionSelector` on each element
of source and then mapping each of those sequence elements and their corresponding
source element to a result element.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TCollection,TResult>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Collections.Generic.IAsyncEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IAsyncEnumerable<T>`,
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence,
and invokes a result selector function on each element therein. The index of each source element is used in
the intermediate projected form of that element.

Parameters:

- `TSource`: The type of the elements of source.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function `collectionSelector` on each element
of source and then mapping each of those sequence elements and their corresponding
source element to a result element.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TCollection,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Collections.Generic.IEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`,
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence,
and invokes a result selector function on each element therein. The index of each source element is used in
the intermediate projected form of that element.

Parameters:

- `TSource`: The type of the elements of source.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function `collectionSelector` on each element
of source and then mapping each of those sequence elements and their corresponding
source element to a result element.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TCollection,TResult>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TCollection>>, ValueTask<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Collections.Generic.IAsyncEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector);
```

Projects each element of a sequence to an `IAsyncEnumerable<T>`,
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence,
and invokes a result selector function on each element therein.

Parameters:

- `TSource`: The type of the elements of source.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function `collectionSelector` on each element
of source and then mapping each of those sequence elements and their corresponding
source element to a result element.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TCollection,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Collections.Generic.IEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`,
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence,
and invokes a result selector function on each element therein.

Parameters:

- `TSource`: The type of the elements of source.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function `collectionSelector` on each element
of source and then mapping each of those sequence elements and their corresponding
source element to a result element.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TCollection,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TCollection>>>, ValueTask<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<System.Collections.Generic.IEnumerable<TCollection>>> collectionSelector, Func<TSource,TCollection,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`,
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence,
and invokes a result selector function on each element therein.

Parameters:

- `TSource`: The type of the elements of source.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function `collectionSelector` on each element
of source and then mapping each of those sequence elements and their corresponding
source element to a result element.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.SelectMany<TSource,TCollection,TResult>(IAsyncEnumerable<TSource>, IEnumerable<TCollection>>>, ValueTask<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<System.Collections.Generic.IEnumerable<TCollection>>> collectionSelector, Func<TSource,TCollection,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`,
flattens the resulting sequences into one `IAsyncEnumerable<T>` sequence,
and invokes a result selector function on each element therein. The index of each source element is used in
the intermediate projected form of that element.

Parameters:

- `TSource`: The type of the elements of source.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IAsyncEnumerable<T>` whose elements are the result of
invoking the one-to-many transform function `collectionSelector` on each element
of source and then mapping each of those sequence elements and their corresponding
source element to a result element.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.
