---
title: "Enumerable class (part 17 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 17 of 24)

## Enumerable.Select<TSource,TResult>(IEnumerable<TSource>, Func<TSource,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Select<TSource,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TResult> selector);
```

Projects each element of a sequence into a new form.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by `selector`.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each element.

Returns: An `IEnumerable<T>` whose elements are the result of invoking the transform function on each element of `source`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

This projection method requires the transform function, `selector`, to produce one value for each value in the source sequence, `source`. If `selector` returns a value that is itself a collection, it is up to the consumer to traverse the subsequences manually. In such a situation, it might be better for your query to return a single coalesced sequence of values. To achieve this, use the `Enumerable.SelectMany` method instead of `Enumerable.Select`. Although `SelectMany` works similarly to `Select`, it differs in that the transform function returns a collection that is then expanded by `SelectMany` before it is returned.

In query expression syntax, a `select` (C#) or `Select` (Visual Basic) clause translates to an invocation of `Enumerable.Select`.

#### Examples
The following code example demonstrates how to use `Select<T1,T2>` to project over a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SelectMany<TSource,TResult>(IEnumerable<TSource>, IEnumerable<TResult>>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,System.Collections.Generic.IEnumerable<TResult>> selector);
```

Projects each element of a sequence to an `IEnumerable<T>` and flattens the resulting sequences into one sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the elements of the sequence returned by `selector`.
- `source`: A sequence of values to project.
- `selector`: A transform function to apply to each element.

Returns: An `IEnumerable<T>` whose elements are the result of invoking the one-to-many transform function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `SelectMany<T1,T2>` method enumerates the input sequence, uses a transform function to map each element to an `IEnumerable<T>`, and then enumerates and yields the elements of each such `IEnumerable<T>` object. That is, for each element of `source`, `selector` is invoked and a sequence of values is returned. `SelectMany<T1,T2>` then flattens this two-dimensional collection of collections into a one-dimensional `IEnumerable<T>` and returns it. For example, if a query uses `SelectMany<T1,T2>` to obtain the orders (of type `Order`) for each customer in a database, the result is of type `IEnumerable<Order>` in C# or `IEnumerable(Of Order)` in Visual Basic. If instead the query uses `Enumerable.Select` to obtain the orders, the collection of collections of orders is not combined and the result is of type `IEnumerable<List<Order>>` in C# or `IEnumerable(Of List(Of Order))` in Visual Basic.

In query expression syntax, each `from` clause (C#) or `From` clause (Visual Basic) after the initial one translates to an invocation of `Enumerable.SelectMany`.

#### Examples
The following code example demonstrates how to use `SelectMany<T1,T2>` to perform a one-to-many projection over an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SelectMany<TSource,TResult>(IEnumerable<TSource>, IEnumerable<TResult>>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> SelectMany<TSource,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int,System.Collections.Generic.IEnumerable<TResult>> selector);
```

Projects each element of a sequence to an `IEnumerable<T>`, and flattens the resulting sequences into one sequence. The index of each source element is used in the projected form of that element.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the elements of the sequence returned by `selector`.
- `source`: A sequence of values to project.
- `selector`: A transform function to apply to each source element; the second parameter of the function represents the index of the source element.

Returns: An `IEnumerable<T>` whose elements are the result of invoking the one-to-many transform function on each element of an input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `SelectMany<T1,T2>` method enumerates the input sequence, uses a transform function to map each element to an `IEnumerable<T>`, and then enumerates and yields the elements of each such `IEnumerable<T>` object. That is, for each element of `source`, `selector` is invoked and a sequence of values is returned. `SelectMany<T1,T2>` then flattens this two-dimensional collection of collections into a one-dimensional `IEnumerable<T>` and returns it. For example, if a query uses `SelectMany<T1,T2>` to obtain the orders (of type `Order`) for each customer in a database, the result is of type `IEnumerable<Order>` in C# or `IEnumerable(Of Order)` in Visual Basic. If instead the query uses `Enumerable.Select` to obtain the orders, the collection of collections of orders is not combined and the result is of type `IEnumerable<List<Order>>` in C# or `IEnumerable(Of List(Of Order))` in Visual Basic.

The first argument to `selector` represents the element to process. The second argument to `selector` represents the zero-based index of that element in the source sequence. This can be useful if the elements are in a known order and you want to do something with an element at a particular index, for example. It can also be useful if you want to retrieve the index of one or more elements.

#### Examples
The following code example demonstrates how to use `SelectMany<T1,T2>` to perform a one-to-many projection over an array and use the index of each outer element.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SelectMany<TSource,TCollection,TResult>(IEnumerable<TSource>, IEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,System.Collections.Generic.IEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IEnumerable<T>` whose elements are the result of invoking the one-to-many transform function `collectionSelector` on each element of `source` and then mapping each of those sequence elements and their corresponding source element to a result element.

Exceptions:

- `ArgumentNullException`: `source` or `collectionSelector` or `resultSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `SelectMany<T1,T2,T3>` method is useful when you have to keep the elements of `source` in scope for query logic that occurs after the call to `SelectMany<T1,T2,T3>`. See the Example section for a code example. If there is a bidirectional relationship between objects of type `TSource` and objects of type `TCollection`, that is, if an object of type `TCollection` provides a property to retrieve the `TSource` object that produced it, you do not need this overload of `SelectMany<T1,T2,T3>`. Instead, you can use `SelectMany<T1,T2>` and navigate back to the `TSource` object through the `TCollection` object.

In query expression syntax, each `from` clause (C#) or `From` clause (Visual Basic) after the initial one translates to an invocation of `Enumerable.SelectMany`.

#### Examples
The following code example demonstrates how to use `SelectMany<T1,T2,T3>` to perform a one-to-many projection over an array and use a result selector function to keep each corresponding element from the source sequence in scope for the final call to `Select`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SelectMany<TSource,TCollection,TResult>(IEnumerable<TSource>, IEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int,System.Collections.Generic.IEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein. The index of each source element is used in the intermediate projected form of that element.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IEnumerable<T>` whose elements are the result of invoking the one-to-many transform function `collectionSelector` on each element of `source` and then mapping each of those sequence elements and their corresponding source element to a result element.

Exceptions:

- `ArgumentNullException`: `source` or `collectionSelector` or `resultSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `SelectMany<T1,T2,T3>` method is useful when you have to keep the elements of `source` in scope for query logic that occurs after the call to `SelectMany<T1,T2,T3>`. See the Example section for a code example. If there is a bidirectional relationship between objects of type `TSource` and objects of type `TCollection`, that is, if an object of type `TCollection` provides a property to retrieve the `TSource` object that produced it, you do not need this overload of `SelectMany<T1,T2,T3>`. Instead, you can use `SelectMany<T1,T2>` and navigate back to the `TSource` object through the `TCollection` object.

## Enumerable.Sequence<T>(T, T, T) method

```csharp
public static System.Collections.Generic.IEnumerable<T> Sequence<T> (T start, T endInclusive, T step) where T : System.Numerics.INumber<T>;
```

Generates a sequence that begins with `start` and yields additional values each incremented by `step` until `endInclusive` is reached.

Parameters:

- `T`: The type of the value to be yielded in the result sequence.
- `start`: The starting value. This value will always be included in the resulting sequence.
- `endInclusive`: The ending bound beyond which values will not be included in the sequence.
- `step`: The amount by which the next value in the sequence should be incremented from the previous value.

Returns: An `IEnumerable<T>` that contains the sequence.

Exceptions:

- `ArgumentNullException`: `start` is `null`.
- `ArgumentNullException`: `endInclusive` is `null`.
- `ArgumentNullException`: `step` is `null`.
- `ArgumentOutOfRangeException`: `start` is NaN.
- `ArgumentOutOfRangeException`: `endInclusive` is NaN.
- `ArgumentOutOfRangeException`: `step` is NaN.
- `ArgumentOutOfRangeException`: `step` is greater than zero but `endInclusive` is less than `start`.
- `ArgumentOutOfRangeException`: `step` is less than zero but `endInclusive` is greater than `start`.
- `ArgumentOutOfRangeException`: `step` is zero and `endInclusive` does not equal `start`.

To be added.
