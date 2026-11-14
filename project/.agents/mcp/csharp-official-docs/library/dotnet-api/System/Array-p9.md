---
title: "Array class (part 9 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 9 of 18)

## Array.FindLast<T>(T[], Predicate<T>) method

```csharp
public static T? FindLast<T> (T[] array, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the last occurrence within the entire `Array`.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `match`: The `Predicate<T>` that defines the conditions of the element to search for.

Returns: The last element that matches the conditions defined by the specified predicate, if found; otherwise, the default value for type `T`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`, moving backward in the `Array`, starting with the last element and ending with the first element.  Processing is stopped when a match is found.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following code example demonstrates the `Array.Find`, `Array.FindLast`, and `Array.FindAll` generic methods. An array of strings is created, containing 8 dinosaur names, two of which (at positions 1 and 5) end with "saurus". The code example also defines a search predicate method named `EndsWithSaurus`, which accepts a string parameter and returns a Boolean value indicating whether the input string ends in "saurus".

The `Array.Find` generic method traverses the array from the beginning, passing each element in turn to the `EndsWithSaurus` method. The search stops when the `EndsWithSaurus` method returns `true` for the element "Amargasaurus".

> **Note:**
> In C# and Visual Basic, it is not necessary to create the`Predicate<string>` delegate (`Predicate(Of String)` in Visual Basic) explicitly. These languages infer the correct delegate from context and create it automatically.

The `Array.FindLast` generic method is used to search the array backward from the end. It finds the element "Dilophosaurus" at position 5. The `Array.FindAll` generic method is used to return an array containing all the elements that end in "saurus". The elements are displayed.

The code example also demonstrates the `Array.Exists` and `Array.TrueForAll` generic methods.

_Code sample not included: ~/snippets/csharp/System/Array/FindAllT/source.cs._

## Array.FindLastIndex<T>(T[], Predicate<T>) method

```csharp
public static int FindLastIndex<T> (T[] array, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire `Array`.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `match`: The `Predicate<T>` that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.

#### Remarks
The `Array` is searched backward starting at the last element and ending at the first element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

## Array.FindLastIndex<T>(T[], Int32, Predicate<T>) method

```csharp
public static int FindLastIndex<T> (T[] array, int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `Array` that extends from the first element to the specified index.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `startIndex`: The zero-based starting index of the backward search.
- `match`: The `Predicate<T>` that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

#### Remarks
The `Array` is searched backward starting at `startIndex` and ending at the first element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`.

This method is an O(`n`) operation, where `n` is the number of elements from the beginning of `array` to `startIndex`.

## Array.FindLastIndex<T>(T[], Int32, Int32, Predicate<T>) method

```csharp
public static int FindLastIndex<T> (T[] array, int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `Array` that contains the specified number of elements and ends at the specified index.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to search.
- `startIndex`: The zero-based starting index of the backward search.
- `count`: The number of elements in the section to search.
- `match`: The `Predicate<T>` that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for `array`.

-or-

`count` is less than zero.

-or-

`startIndex` and `count` do not specify a valid section in `array`.

#### Remarks
The `Array` is searched backward starting at `startIndex` and ending at `startIndex` minus `count` plus 1, if `count` is greater than 0.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`.

This method is an O(`n`) operation, where `n` is `count`.

## Array.ForEach<T>(T[], Action<T>) method

```csharp
public static void ForEach<T> (T[] array, Action<T> action);
```

Performs the specified action on each element of the specified array.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` on whose elements the action is to be performed.
- `action`: The `Action<T>` to perform on each element of `array`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`action` is `null`.

#### Remarks
The `Action<T>` is a delegate to a method that performs an action on the object passed to it.  The elements of `array` are individually passed to the `Action<T>`.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

In F#, the Array.iter function can be used instead.

#### Examples
The following example shows how to use `Array.ForEach` to display the squares of each element in an integer array.

_Code sample not included: ~/snippets/csharp/System/Array/ForEachT/source.cs._

## Array.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Returns an `IEnumerator` for the `Array`.

Returns: An `IEnumerator` for the `Array`.

#### Remarks

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an O(1) operation.

#### Examples
The following code example shows how to use `Array.GetEnumerator` to list the elements of an array.

_Code sample not included: ~/snippets/csharp/System/Array/GetEnumerator/array_getenumerator.cs._

## Array.GetLength(Int32) method

```csharp
public int GetLength (int dimension);
```

Gets a 32-bit integer that represents the number of elements in the specified dimension of the `Array`.

Parameters:

- `dimension`: A zero-based dimension of the `Array` whose length needs to be determined.

Returns: A 32-bit integer that represents the number of elements in the specified dimension.

Exceptions:

- `IndexOutOfRangeException`: `dimension` is less than zero.

-or-

`dimension` is equal to or greater than `Array.Rank`.

#### Remarks
An example of `Array.GetLength` is `GetLength(0)`, which returns the number of elements in the first dimension of the `Array`.

This method is an O(1) operation.

#### Examples
The following example shows how to use `Array.GetLength` to display the dimensions of two arrays with different ranks.

_Code sample not included: ~/snippets/csharp/System/Array/GetLength/source.cs._

## Array.GetLongLength(Int32) method

```csharp
public long GetLongLength (int dimension);
```

Gets a 64-bit integer that represents the number of elements in the specified dimension of the `Array`.

Parameters:

- `dimension`: A zero-based dimension of the `Array` whose length needs to be determined.

Returns: A 64-bit integer that represents the number of elements in the specified dimension.

Exceptions:

- `IndexOutOfRangeException`: `dimension` is less than zero.

-or-

`dimension` is equal to or greater than `Array.Rank`.

#### Remarks
An example of `Array.GetLongLength` is `GetLongLength(0)`, which returns the number of elements in the first dimension of the `Array`.

This method is an O(1) operation.

## Array.GetLowerBound(Int32) method

```csharp
public int GetLowerBound (int dimension);
```

Gets the index of the first element of the specified dimension in the array.

Parameters:

- `dimension`: A zero-based dimension of the array whose starting index needs to be determined.

Returns: The index of the first element of the specified dimension in the array.

Exceptions:

- `IndexOutOfRangeException`: `dimension` is less than zero.

-or-

`dimension` is equal to or greater than `Array.Rank`.

#### Remarks
`GetLowerBound(0)` returns the starting index of the first dimension of the array, and `GetLowerBound(Rank - 1)` returns the starting index of the last dimension of the array.

The `Array.GetLowerBound` method always returns a value that indicates the index of the lower bound of the array, even if the array is empty.

Note that, although most arrays in .NET are zero-based (that is, the `Array.GetLowerBound` method returns zero for each dimension of an array), .NET does support arrays that are not zero-based. Such arrays can be created with the `CreateInstance` method, and can also be returned from unmanaged code.

This method is an O(1) operation.

#### Examples
The following example uses the `Array.GetLowerBound` and `Array.GetUpperBound` methods to display the bounds of a one-dimensional and two-dimensional array and to display the values of their array elements.

_Code sample not included: ~/snippets/csharp/System/Array/GetLowerBound/source.cs._

## Array.GetUpperBound(Int32) method

```csharp
public int GetUpperBound (int dimension);
```

Gets the index of the last element of the specified dimension in the array.

Parameters:

- `dimension`: A zero-based dimension of the array whose upper bound needs to be determined.

Returns: The index of the last element of the specified dimension in the array, or -1 if the specified dimension is empty.

Exceptions:

- `IndexOutOfRangeException`: `dimension` is less than zero.

-or-

`dimension` is equal to or greater than `Array.Rank`.

#### Remarks
`GetUpperBound(0)` returns the last index in the first dimension of the array, and `GetUpperBound(Rank - 1)` returns the last index of the last dimension of the array.

This method is an O(1) operation.

#### Examples
The following example uses the `Array.GetLowerBound` and `Array.GetUpperBound` methods to display the bounds of a one-dimensional and two-dimensional array and to display the values of their array elements.

_Code sample not included: ~/snippets/csharp/System/Array/GetLowerBound/source.cs._
