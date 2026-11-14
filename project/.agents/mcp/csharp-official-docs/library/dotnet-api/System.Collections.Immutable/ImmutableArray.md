---
title: "ImmutableArray class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableArray
```

Provides methods for creating an array that is immutable, meaning it can't be changed once it's created.

To be added.

## ImmutableArray.BinarySearch<T>(ImmutableArray<T>, T) method

```csharp
public static int BinarySearch<T> (this System.Collections.Immutable.ImmutableArray<T> array, T value);
```

Searches the sorted immutable array for a specified element using the default comparer and returns the zero-based index of the element, if it's found.

Parameters:

- `T`: The type of element stored in the array.
- `array`: The sorted array to search.
- `value`: The object to search for.

Returns: The zero-based index of the item in the array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ICollection<T>.Count`.

Exceptions:

- `InvalidOperationException`: `value` does not implement `IComparable` or the search encounters an element that does not implement `IComparable`.

To be added.

## ImmutableArray.BinarySearch<T>(ImmutableArray<T>, T, IComparer<T>) method

```csharp
public static int BinarySearch<T> (this System.Collections.Immutable.ImmutableArray<T> array, T value, System.Collections.Generic.IComparer<T>? comparer);
```

Searches a sorted immutable array for a specified element and returns the zero-based index of the element, if it's found.

Parameters:

- `T`: The type of element stored in the array.
- `array`: The sorted array to search.
- `value`: The object to search for.
- `comparer`: The comparer implementation to use when comparing elements, or null to use the default comparer.

Returns: The zero-based index of the item in the array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ICollection<T>.Count`.

Exceptions:

- `InvalidOperationException`: `comparer` is null and `value` does not implement `IComparable` or the search encounters an element that does not implement `IComparable`.

To be added.

## ImmutableArray.BinarySearch<T>(ImmutableArray<T>, Int32, Int32, T) method

```csharp
public static int BinarySearch<T> (this System.Collections.Immutable.ImmutableArray<T> array, int index, int length, T value);
```

Searches a sorted immutable array for a specified element and returns the zero-based index of the element, if it's found.

Parameters:

- `T`: The type of element stored in the array.
- `array`: The sorted array to search.
- `index`: The starting index of the range to search.
- `length`: The length of the range to search.
- `value`: The object to search for.

Returns: The zero-based index of the item in the array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ICollection<T>.Count`.

Exceptions:

- `InvalidOperationException`: `value` does not implement `IComparable` or the search encounters an element that does not implement `IComparable`.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.

To be added.

## ImmutableArray.BinarySearch<T>(ImmutableArray<T>, Int32, Int32, T, IComparer<T>) method

```csharp
public static int BinarySearch<T> (this System.Collections.Immutable.ImmutableArray<T> array, int index, int length, T value, System.Collections.Generic.IComparer<T>? comparer);
```

Searches a sorted immutable array for a specified element and returns the zero-based index of the element.

Parameters:

- `T`: The type of element stored in the array.
- `array`: The sorted array to search.
- `index`: The starting index of the range to search.
- `length`: The length of the range to search.
- `value`: The object to search for.
- `comparer`: The comparer to use when comparing elements for equality or `null` to use the default comparer.

Returns: The zero-based index of the item in the array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than `value` or, if there is no larger element, the bitwise complement of `ICollection<T>.Count`.

Exceptions:

- `InvalidOperationException`: `comparer` is null and `value` does not implement `IComparable` or the search encounters an element that does not implement `IComparable`.
- `ArgumentException`: `index` and `length` do not specify a valid range in `array`.

-or-

`comparer` is `null`, and `value` is of a type that is not compatible with the elements of `array`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.

-or-

`length` is less than zero.

To be added.

## ImmutableArray.Create<T>() method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> ();
```

Creates an empty immutable array.

Parameters:

- `T`: The type of elements stored in the array.

Returns: An empty immutable array.

To be added.

## ImmutableArray.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (scoped ReadOnlySpan<T> items);
```

Creates an `ImmutableArray<T>` with the specified elements.

Parameters:

- `T`: The type of element stored in the array.
- `items`: The elements to store in the array.

Returns: An immutable array containing the specified items.

To be added.

## ImmutableArray.Create<T>(Span<T>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (Span<T> items);
```

Creates an `ImmutableArray<T>` with the specified elements.

Parameters:

- `T`: The type of element stored in the array.
- `items`: The elements to store in the array.

Returns: An immutable array containing the specified items.

To be added.

## ImmutableArray.Create<T>(T) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (T item);
```

Creates an immutable array that contains the specified object.

Parameters:

- `T`: The type of elements stored in the array.
- `item`: The object to store in the array.

Returns: An immutable array that contains the specified object.

To be added.

## ImmutableArray.Create<T>(T[]) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (params T[]? items);
```

Creates an immutable array from the specified array of objects.

Parameters:

- `T`: The type of elements stored in the array.
- `items`: The array of objects to populate the array with.

Returns: An immutable array that contains the array of items.

To be added.

## ImmutableArray.Create<T>(T, T) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (T item1, T item2);
```

Creates an immutable array that contains the specified objects.

Parameters:

- `T`: The type of elements stored in the array.
- `item1`: The first object to store in the array.
- `item2`: The second object to store in the array.

Returns: An immutable array that contains the specified objects.

To be added.

## ImmutableArray.Create<T>(ImmutableArray<T>, Int32, Int32) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (System.Collections.Immutable.ImmutableArray<T> items, int start, int length);
```

Creates an immutable array with the specified objects from another immutable array.

Parameters:

- `T`: The type of elements stored in the array.
- `items`: The source array of objects.
- `start`: The index of the first element to copy from `items`.
- `length`: The number of elements from `items` to include in this immutable array.

Returns: An immutable array that contains the specified objects from the source array.

This overload allows helper methods or custom builder classes to efficiently avoid paying a redundant tax for copying an array when the new array is a segment of an existing array.

## ImmutableArray.Create<T>(T, T, T) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (T item1, T item2, T item3);
```

Creates an immutable array that contains the specified objects.

Parameters:

- `T`: The type of elements stored in the array.
- `item1`: The first object to store in the array.
- `item2`: The second object to store in the array.
- `item3`: The third object to store in the array.

Returns: An immutable array that contains the specified objects.

To be added.

## ImmutableArray.Create<T>(T[], Int32, Int32) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (T[] items, int start, int length);
```

Creates an immutable array with specified objects from another array.

Parameters:

- `T`: The type of elements stored in the array.
- `items`: The source array of objects.
- `start`: The index of the first element to copy from `items`.
- `length`: The number of elements from `items` to include in this immutable array.

Returns: An immutable array that contains the specified objects from the source array.

This overload allows helper methods or custom builder classes to efficiently avoid paying a redundant tax for copying an array when the new array is a segment of an existing array.

## ImmutableArray.Create<T>(T, T, T, T) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> Create<T> (T item1, T item2, T item3, T item4);
```

Creates an immutable array that contains the specified objects.

Parameters:

- `T`: The type of elements stored in the array.
- `item1`: The first object to store in the array.
- `item2`: The second object to store in the array.
- `item3`: The third object to store in the array.
- `item4`: The fourth object to store in the array.

Returns: An immutable array that contains the specified objects.

To be added.

## ImmutableArray.CreateBuilder<T>() method

```csharp
public static System.Collections.Immutable.ImmutableArray<T>.Builder CreateBuilder<T> ();
```

Creates a mutable array that can be converted to an `ImmutableArray` without allocating new memory.

Parameters:

- `T`: The type of elements stored in the builder.

Returns: A mutable array of the specified type that can be efficiently converted to an immutable array.

To be added.

## ImmutableArray.CreateBuilder<T>(Int32) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T>.Builder CreateBuilder<T> (int initialCapacity);
```

Creates a mutable array that can be converted to an `ImmutableArray` without allocating new memory.

Parameters:

- `T`: The type of elements stored in the builder.
- `initialCapacity`: The initial capacity of the builder.

Returns: A mutable array of the specified type that can be efficiently converted to an immutable array.

To be added.

## ImmutableArray.CreateRange<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> CreateRange<T> (System.Collections.Generic.IEnumerable<T> items);
```

Creates a new `ImmutableArray<T>` populated with the specified items.

Parameters:

- `T`: The type of element stored in the array.
- `items`: The elements to add to the array.

Returns: An immutable array that contains the specified items.

To be added.

## ImmutableArray.CreateRange<TSource,TResult>(ImmutableArray<TSource>, Func<TSource,TResult>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<TResult> CreateRange<TSource,TResult> (System.Collections.Immutable.ImmutableArray<TSource> items, Func<TSource,TResult> selector);
```

Initializes a new instance of the `ImmutableArray<T>` struct.

Parameters:

- `TSource`: The type of element stored in the source array.
- `TResult`: The type of element to store in the target array.
- `items`: The source array to initialize the resulting array with.
- `selector`: The function to apply to each element from the source array.

Returns: An immutable array that contains the specified items.

#### Remarks
This overload allows efficient creation of an `ImmutableArray<T>` based on an existing             `ImmutableArray<T>`, where a mapping function needs to be applied to each element from             the source array.

## ImmutableArray.CreateRange<TSource,TResult>(ImmutableArray<TSource>, Int32, Int32, Func<TSource,TResult>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<TResult> CreateRange<TSource,TResult> (System.Collections.Immutable.ImmutableArray<TSource> items, int start, int length, Func<TSource,TResult> selector);
```

Initializes a new instance of the `ImmutableArray<T>` struct.

Parameters:

- `TSource`: The type of element stored in the source array.
- `TResult`: The type of element to store in the target array.
- `items`: The source array to initialize the resulting array with.
- `start`: The index of the first element in the source array to include in the resulting array.
- `length`: The number of elements from the source array to include in the resulting array.
- `selector`: The function to apply to each element from the source array included in the resulting array.

Returns: An immutable array that contains the specified items.

#### Remarks
This overload allows efficient creation of an `ImmutableArray<T>` based on a slice of an existing             `ImmutableArray<T>`, where a mapping function needs to be applied to each element from the source array             included in the resulting array.

## ImmutableArray.CreateRange<TSource,TArg,TResult>(ImmutableArray<TSource>, Func<TSource,TArg,TResult>, TArg) method

```csharp
public static System.Collections.Immutable.ImmutableArray<TResult> CreateRange<TSource,TArg,TResult> (System.Collections.Immutable.ImmutableArray<TSource> items, Func<TSource,TArg,TResult> selector, TArg arg) where TArg : allows ref struct;
```

Initializes a new instance of the `ImmutableArray<T>` struct.

Parameters:

- `TSource`: The type of element stored in the source array.
- `TArg`: The type of argument to pass to the selector mapping function.
- `TResult`: The type of element to store in the target array.
- `items`: The source array to initialize the resulting array with.
- `selector`: The function to apply to each element from the source array.
- `arg`: An argument to be passed to the selector mapping function.

Returns: An immutable array that contains the specified items.

#### Remarks
This overload allows efficient creation of an `ImmutableArray<T>` based on an existing             `ImmutableArray<T>`, where a mapping function needs to be applied to each element from             the source array.
