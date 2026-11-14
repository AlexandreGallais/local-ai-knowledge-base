---
title: "List<T> class (part 4 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 4 of 9)

## List<T>.ConvertAll<TOutput>(Converter<T,TOutput>) method

```csharp
public System.Collections.Generic.List<TOutput> ConvertAll<TOutput> (Converter<T,TOutput> converter);
```

Converts the elements in the current `List<T>` to another type, and returns a list containing the converted elements.

Parameters:

- `TOutput`: The type of the elements of the target array.
- `converter`: A `Converter<T1,T2>` delegate that converts each element from one type to another type.

Returns: A `List<T>` of the target type containing the converted elements from the current `List<T>`.

Exceptions:

- `ArgumentNullException`: `converter` is `null`.

#### Remarks
The `Converter<T1,T2>` is a delegate to a method that converts an object to the target type.  The elements of the current `List<T>` are individually passed to the `Converter<T1,T2>` delegate, and the converted elements are saved in the new `List<T>`.

The current `List<T>` remains unchanged.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example defines a method named `PointFToPoint` that converts a `PointF` structure to a `Point` structure. The example then creates a `List<T>` of `PointF` structures, creates a `Converter\<PointF, Point>` delegate (`Converter(Of PointF, Point)` in Visual Basic) to represent the `PointFToPoint` method, and passes the delegate to the `List<T>.ConvertAll` method. The `List<T>.ConvertAll` method passes each element of the input list to the `PointFToPoint` method and puts the converted elements into a new list of `Point` structures. Both lists are displayed.

_Code sample not included: ~/snippets/csharp/System/ConverterTInput,TOutput/Overview/source.cs._

## List<T>.CopyTo(T[]) method

```csharp
public void CopyTo (T[] array);
```

Copies the entire `List<T>` to a compatible one-dimensional array, starting at the beginning of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `List<T>`. The `Array` must have zero-based indexing.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: The number of elements in the source `List<T>` is greater than the number of elements that the destination `array` can contain.

#### Remarks
This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order in which the enumerator iterates through the `List<T>`.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the entire `List<T>` to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `List<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: The number of elements in the source `List<T>` is greater than the available space from `arrayIndex` to the end of the destination `array`.

#### Remarks
This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order in which the enumerator iterates through the `List<T>`.

This method is an O(*n*) operation, where *n* is `List<T>.Count`.

## List<T>.CopyTo(Int32, T[], Int32, Int32) method

```csharp
public void CopyTo (int index, T[] array, int arrayIndex, int count);
```

Copies a range of elements from the `List<T>` to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `index`: The zero-based index in the source `List<T>` at which copying begins.
- `array`: The one-dimensional `Array` that is the destination of the elements copied from `List<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.
- `count`: The number of elements to copy.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`arrayIndex` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `index` is equal to or greater than the `List<T>.Count` of the source `List<T>`.

-or-

The number of elements from `index` to the end of the source `List<T>` is greater than the available space from `arrayIndex` to the end of the destination `array`.

#### Remarks
This method uses `Array.Copy` to copy the elements.

The elements are copied to the `Array` in the same order in which the enumerator iterates through the `List<T>`.

This method is an O(*n*) operation, where *n* is `count`.

## List<T>.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that the capacity of this list is at least the specified `capacity`. If the current capacity is less than `capacity`, it is increased to at least the specified `capacity`.

Parameters:

- `capacity`: The minimum capacity to ensure.

Returns: The new capacity of this list.

#### Remarks

> **Caution:**
> If `capacity` comes from user input, prefer letting the collection resize itself as elements are added instead of calling this method. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

## List<T>.Exists(Predicate<T>) method

```csharp
public bool Exists (Predicate<T> match);
```

Determines whether the `List<T>` contains elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the elements to search for.

Returns: `true` if the `List<T>` contains one or more elements that match the conditions defined by the specified predicate; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate, and processing is stopped when a match is found.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.Contains` and `List<T>.Exists` methods on a `List<T>` that contains a simple business object that implements `IEquatable<T>.Equals`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Contains/program1.cs._

The following example demonstrates the `List<T>.Exists` method and several other methods that use the `Predicate<T>` generic delegate.

A `List<T>` of strings is created, containing 8 dinosaur names, two of which (at positions 1 and 5) end with "saurus". The example also defines a search predicate method named `EndsWithSaurus`, which accepts a string parameter and returns a Boolean value indicating whether the input string ends in "saurus".

The `List<T>.Find`, `List<T>.FindLast`, and `List<T>.FindAll` methods are used to search the list with the search predicate method, and then the `List<T>.RemoveAll` method is used to remove all entries ending with "saurus".

Finally, the `List<T>.Exists` method is called. It traverses the list from the beginning, passing each element in turn to the `EndsWithSaurus` method. The search stops and the method returns `true` if the `EndsWithSaurus` method returns `true` for any element. The `List<T>.Exists` method returns `false` because all such elements have been removed.

> **Note:**
> In C# and Visual Basic, it is not necessary to create the `Predicate<string>` delegate (`Predicate(Of String)` in Visual Basic) explicitly. These languages infer the correct delegate from context and create it automatically.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Exists/source.cs._

## List<T>.Find(Predicate<T>) method

```csharp
public T? Find (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire `List<T>`.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The first element that matches the conditions defined by the specified predicate, if found; otherwise, the default value for type `T`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate, moving forward in the `List<T>`, starting with the first element and ending with the last element.  Processing is stopped when a match is found.

> **Important:**
> When searching a list containing value types, make sure the default value for the type does not satisfy the search predicate. Otherwise, there is no way to distinguish between a default value indicating that no match was found and a list element that happens to have the default value for the type. If the default value satisfies the search predicate, use the `List<T>.FindIndex` method instead.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.Find` method on a `List<T>` that contains a simple complex object.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Contains/program1.cs._

The following example demonstrates the find methods for the `List<T>` class. The example for the `List<T>` class contains `book` objects, of class `Book`, using the data from the Sample XML File: Books (LINQ to XML). The `FillList` method in the example uses LINQ to XML to parse the values from the XML to property values of the `book` objects.

The following table describes the examples provided for the find methods.

|Method|Example|
|------------|-------------|
|`Find`|Finds a book by an ID using the `IDToFind` predicate delegate. C# example uses an anonymous delegate.|
|`FindAll`|Find all books that whose `Genre` property is "Computer" using the `FindComputer` predicate delegate.|
|`FindLast`|Finds the last book in the collection that has a publish date before 2001, using the `PubBefore2001` predicate delegate. C# example uses an anonymous delegate.|
|`FindIndex`|Finds the index of first computer book using the `FindComputer` predicate delegate.|
|`FindLastIndex`|Finds the index of the last computer book using the `FindComputer` predicate delegate.|
|`FindIndex`|Finds the index of first computer book in the second half of the collection, using the `FindComputer` predicate delegate.|
|`FindLastIndex`|Finds the index of last computer book in the second half of the collection, using the `FindComputer` predicate delegate.|

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Find/program.cs._

## List<T>.FindAll(Predicate<T>) method

```csharp
public System.Collections.Generic.List<T> FindAll (Predicate<T> match);
```

Retrieves all the elements that match the conditions defined by the specified predicate.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the elements to search for.

Returns: A `List<T>` containing all the elements that match the conditions defined by the specified predicate, if found; otherwise, an empty `List<T>`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate, and the elements that match the conditions are saved in the returned `List<T>`.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example demonstrates the find methods for the `List<T>` class. The example for the `List<T>` class contains `book` objects, of class `Book`, using the data from the Sample XML File: Books (LINQ to XML). The `FillList` method in the example uses LINQ to XML to parse the values from the XML to property values of the `book` objects.

The following table describes the examples provided for the find methods.

|Method|Example|
|------------|-------------|
|`Find`|Finds a book by an ID using the `IDToFind` predicate delegate. C# example uses an anonymous delegate.|
|`FindAll`|Find all books that whose `Genre` property is "Computer" using the `FindComputer` predicate delegate.|
|`FindLast`|Finds the last book in the collection that has a publish date before 2001, using the `PubBefore2001` predicate delegate. C# example uses an anonymous delegate.|
|`FindIndex`|Finds the index of first computer book using the `FindComputer` predicate delegate.|
|`FindLastIndex`|Finds the index of the last computer book using the `FindComputer` predicate delegate.|
|`FindIndex`|Finds the index of first computer book in the second half of the collection, using the `FindComputer` predicate delegate.|
|`FindLastIndex`|Finds the index of last computer book in the second half of the collection, using the `FindComputer` predicate delegate.|

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Find/program.cs._
