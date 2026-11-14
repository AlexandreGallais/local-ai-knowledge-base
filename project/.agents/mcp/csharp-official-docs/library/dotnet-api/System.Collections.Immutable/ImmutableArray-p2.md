---
title: "ImmutableArray class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray class (part 2 of 2)

## ImmutableArray.CreateRange<TSource,TArg,TResult>(ImmutableArray<TSource>, Int32, Int32, Func<TSource,TArg,TResult>, TArg) method

```csharp
public static System.Collections.Immutable.ImmutableArray<TResult> CreateRange<TSource,TArg,TResult> (System.Collections.Immutable.ImmutableArray<TSource> items, int start, int length, Func<TSource,TArg,TResult> selector, TArg arg) where TArg : allows ref struct;
```

Initializes a new instance of the `ImmutableArray<T>` struct.

Parameters:

- `TSource`: The type of element stored in the source array.
- `TArg`: The type of argument to be passed to the selector mapping function.
- `TResult`: The type of element to be stored in the target array.
- `items`: The source array to initialize the resulting array with.
- `start`: The index of the first element in the source array to include in the resulting array.
- `length`: The number of elements from the source array to include in the resulting array.
- `selector`: The function to apply to each element from the source array included in the resulting array.
- `arg`: An argument to be passed to the selector mapping function.

Returns: An immutable array that contains the specified items.

#### Remarks
This overload allows efficient creation of an `ImmutableArray<T>` based on a slice of an existing             `ImmutableArray<T>`, where a mapping function needs to be applied to each element from the source array             included in the resulting array.

## ImmutableArray.ToImmutableArray<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> ToImmutableArray<T> (this ReadOnlySpan<T> items);
```

Produce an immutable array of contents from specified elements.

Parameters:

- `T`: The type of element in the list.
- `items`: The elements to store in the array.

Returns: An immutable array containing the items in the span.

To be added.

## ImmutableArray.ToImmutableArray<T>(Span<T>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<T> ToImmutableArray<T> (this Span<T> items);
```

Converts the span to an immutable array.

Parameters:

- `T`: The type of element in the list.
- `items`: The elements to store in the array.

Returns: An immutable array containing the items in the span.

To be added.

## ImmutableArray.ToImmutableArray<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Immutable.ImmutableArray<TSource> ToImmutableArray<TSource> (this System.Collections.Generic.IEnumerable<TSource> items);
```

Creates an immutable array from the specified collection.

Parameters:

- `TSource`: The type of elements contained in `items`.
- `items`: The collection of objects to copy to the immutable array.

Returns: An immutable array that contains the specified collection of objects.

To be added.

## ImmutableArray.ToImmutableArray<TSource>(ImmutableArray<TSource>+Builder) method

```csharp
public static System.Collections.Immutable.ImmutableArray<TSource> ToImmutableArray<TSource> (this System.Collections.Immutable.ImmutableArray<TSource>.Builder builder);
```

Creates an immutable array from the current contents of the builder's array.

Parameters:

- `TSource`: The type of elements contained in the immutable array.
- `builder`: The builder to create the immutable array from.

Returns: An immutable array that contains the current contents of the builder's array.

To be added.
