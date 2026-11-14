---
title: "ImmutableArrayExtensions class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ImmutableArrayExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArrayExtensions class

Namespace: `System.Linq`

```csharp
public static class ImmutableArrayExtensions
```

Provides LINQ extension method overrides that are more efficient for `ImmutableArray<T>` instances than the standard LINQ methods.

To be added.

## ImmutableArrayExtensions.Aggregate<T>(ImmutableArray<T>, Func<T,T,T>) method

```csharp
public static T? Aggregate<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,T,T> func);
```

Applies a function to a sequence of elements in a cumulative way.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The collection to apply the function to.
- `func`: A function to be invoked on each element, in a cumulative way.

Returns: The final value after the cumulative function has been applied to all elements.

#### Remarks
`ImmutableArrayExtensions.Aggregate` method makes it simple to perform a calculation over a sequence of values. This method works by calling `func` one time for each element in source. Each time `func` is called, `ImmutableArrayExtensions.Aggregate` passes both the element from the sequence and an aggregated value (as the first argument to func). The value of the `seed` parameter is used as the initial aggregate value. The result of `func` replaces the previous aggregated value. `ImmutableArrayExtensions.Aggregate` returns the final result of `func`.

## ImmutableArrayExtensions.Aggregate<TAccumulate,T>(ImmutableArray<T>, TAccumulate, Func<TAccumulate,T,TAccumulate>) method

```csharp
public static TAccumulate Aggregate<TAccumulate,T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, TAccumulate seed, Func<TAccumulate,T,TAccumulate> func);
```

Applies a function to a sequence of elements in a cumulative way.

Parameters:

- `TAccumulate`: The type of the accumulated value.
- `T`: The type of element contained by the collection.
- `immutableArray`: The collection to apply the function to.
- `seed`: The initial accumulator value.
- `func`: A function to be invoked on each element, in a cumulative way.

Returns: The final accumulator value.

#### Remarks
`ImmutableArrayExtensions.Aggregate` method makes it simple to perform a calculation over a sequence of values. This method works by calling `func` one time for each element in source. Each time `func` is called, `ImmutableArrayExtensions.Aggregate` passes both the element from the sequence and an aggregated value (as the first argument to func). The value of the `seed` parameter is used as the initial aggregate value. The result of `func` replaces the previous aggregated value. `ImmutableArrayExtensions.Aggregate` returns the final result of `func`.

## ImmutableArrayExtensions.Aggregate<TAccumulate,TResult,T>(ImmutableArray<T>, TAccumulate, Func<TAccumulate,T,TAccumulate>, Func<TAccumulate,TResult>) method

```csharp
public static TResult Aggregate<TAccumulate,TResult,T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, TAccumulate seed, Func<TAccumulate,T,TAccumulate> func, Func<TAccumulate,TResult> resultSelector);
```

Applies a function to a sequence of elements in a cumulative way.

Parameters:

- `TAccumulate`: The type of the accumulated value.
- `TResult`: The type of result returned by the result selector.
- `T`: The type of element contained by the collection.
- `immutableArray`: The collection to apply the function to.
- `seed`: The initial accumulator value.
- `func`: A function to be invoked on each element, in a cumulative way.
- `resultSelector`: A function to transform the final accumulator value into the result type.

Returns: The final accumulator value.

#### Remarks
`ImmutableArrayExtensions.Aggregate` method makes it simple to perform a calculation over a sequence of values. This method works by calling `func` one time for each element in source. Each time `func` is called, `ImmutableArrayExtensions.Aggregate` passes both the element from the sequence and an aggregated value (as the first argument to func). The value of the `seed` parameter is used as the initial aggregate value. The result of `func` replaces the previous aggregated value. `ImmutableArrayExtensions.Aggregate` returns the final result of `func`.

## ImmutableArrayExtensions.All<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static bool All<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Gets a value indicating whether all elements in this array match a given condition.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to check for matches.
- `predicate`: The predicate.

Returns: `true` if every element of the source sequence passes the test in the specified predicate; otherwise, `false`.

To be added.

## ImmutableArrayExtensions.Any<T>(ImmutableArray<T>) method

```csharp
public static bool Any<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Gets a value indicating whether the array contains any elements.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to check for elements.

Returns: `true` if the array contains an elements; otherwise, `false`.

To be added.

## ImmutableArrayExtensions.Any<T>(ImmutableArray<T>+Builder) method

```csharp
public static bool Any<T> (this System.Collections.Immutable.ImmutableArray<T>.Builder builder);
```

Returns a value indicating whether this collection contains any elements.

Parameters:

- `T`: The type of elements in the array.
- `builder`: The builder to check for matches.

Returns: `true` if the array builder contains any elements; otherwise, `false`.

To be added.

## ImmutableArrayExtensions.Any<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static bool Any<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Gets a value indicating whether the array contains any elements that match a specified condition.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to check for elements.
- `predicate`: The delegate that defines the condition to match to an element.

Returns: `true` if an element matches the specified condition; otherwise, `false`.

To be added.

## ImmutableArrayExtensions.ElementAt<T>(ImmutableArray<T>, Int32) method

```csharp
public static T ElementAt<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, int index);
```

Returns the element at a specified index in the array.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to find an element in.
- `index`: The index for the element to retrieve.

Returns: The item at the specified index.

To be added.

## ImmutableArrayExtensions.ElementAtOrDefault<T>(ImmutableArray<T>, Int32) method

```csharp
public static T? ElementAtOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, int index);
```

Returns the element at a specified index in a sequence or a default value if the index is out of range.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to find an element in.
- `index`: The index for the element to retrieve.

Returns: The item at the specified index, or the default value if the index is not found.

To be added.

## ImmutableArrayExtensions.First<T>(ImmutableArray<T>) method

```csharp
public static T First<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Returns the first element in an array.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to get an item from.

Returns: The first item in the array.

Exceptions:

- `InvalidOperationException`: If the array is empty.

To be added.

## ImmutableArrayExtensions.First<T>(ImmutableArray<T>+Builder) method

```csharp
public static T First<T> (this System.Collections.Immutable.ImmutableArray<T>.Builder builder);
```

Returns the first element in the collection.

Parameters:

- `T`: The type of items in the array.
- `builder`: The builder to retrieve an item from.

Returns: The first item in the list.

Exceptions:

- `InvalidOperationException`: If the array is empty.

To be added.

## ImmutableArrayExtensions.First<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static T First<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Returns the first element in a sequence that satisfies a specified condition.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to get an item from.
- `predicate`: The delegate that defines the conditions of the element to search for.

Returns: The first item in the list if it meets the condition specified by `predicate`.

Exceptions:

- `InvalidOperationException`: If the array is empty.

To be added.

## ImmutableArrayExtensions.FirstOrDefault<T>(ImmutableArray<T>) method

```csharp
public static T? FirstOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Returns the first element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to retrieve items from.

Returns: The first item in the list, if found; otherwise the default value for the item type.

To be added.

## ImmutableArrayExtensions.FirstOrDefault<T>(ImmutableArray<T>+Builder) method

```csharp
public static T? FirstOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T>.Builder builder);
```

Returns the first element in the collection, or the default value if the collection is empty.

Parameters:

- `T`: The type of item in the builder.
- `builder`: The builder to retrieve an element from.

Returns: The first item in the list, if found; otherwise the default value for the item type.

To be added.

## ImmutableArrayExtensions.FirstOrDefault<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static T? FirstOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to retrieve elements from.
- `predicate`: The delegate that defines the conditions of the element to search for.

Returns: The first item in the list, if found; otherwise the default value for the item type.

To be added.

## ImmutableArrayExtensions.Last<T>(ImmutableArray<T>) method

```csharp
public static T Last<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Returns the last element of the array.

Parameters:

- `T`: The type of element contained by the array.
- `immutableArray`: The array to retrieve items from.

Returns: The last element in the array.

Exceptions:

- `InvalidOperationException`: The collection is empty.

To be added.

## ImmutableArrayExtensions.Last<T>(ImmutableArray<T>+Builder) method

```csharp
public static T Last<T> (this System.Collections.Immutable.ImmutableArray<T>.Builder builder);
```

Returns the last element in the collection.

Parameters:

- `T`: The type of item in the builder.
- `builder`: The builder to retrieve elements from.

Returns: The last element in the builder.

Exceptions:

- `InvalidOperationException`: The collection is empty.

To be added.

## ImmutableArrayExtensions.Last<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static T Last<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Returns the last element of a sequence that satisfies a specified condition.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to retrieve elements from.
- `predicate`: The delegate that defines the conditions of the element to retrieve.

Returns: The last element of the array that satisfies the `predicate` condition.

Exceptions:

- `InvalidOperationException`: The collection is empty.

To be added.

## ImmutableArrayExtensions.LastOrDefault<T>(ImmutableArray<T>) method

```csharp
public static T? LastOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Returns the last element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to retrieve items from.

Returns: The last element of a sequence, or a default value if the sequence contains no elements.

To be added.

## ImmutableArrayExtensions.LastOrDefault<T>(ImmutableArray<T>+Builder) method

```csharp
public static T? LastOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T>.Builder builder);
```

Returns the last element in the collection, or the default value if the collection is empty.

Parameters:

- `T`: The type of item in the builder.
- `builder`: The builder to retrieve an element from.

Returns: The last element of a sequence, or a default value if the sequence contains no elements.

To be added.

## ImmutableArrayExtensions.LastOrDefault<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static T? LastOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to retrieve an element from.
- `predicate`: The delegate that defines the conditions of the element to search for.

Returns: The last element of a sequence, or a default value if the sequence contains no elements.

To be added.

## ImmutableArrayExtensions.Select<T,TResult>(ImmutableArray<T>, Func<T,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Select<T,TResult> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,TResult> selector);
```

Projects each element of a sequence into a new form.

Parameters:

- `T`: The type of element contained by the collection.
- `TResult`: The type of the result element.
- `immutableArray`: The immutable array to select items from.
- `selector`: A transform function to apply to each element.

Returns: An `IEnumerable<T>` whose elements are the result of invoking the transform function on each element of source.

To be added.
