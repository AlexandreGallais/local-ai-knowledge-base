---
title: "List<T> class (part 5 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 5 of 9)

## List<T>.FindIndex(Predicate<T>) method

```csharp
public int FindIndex (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the entire `List<T>`.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `List<T>` is searched forward starting at the first element and ending at the last element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate. The delegate has the signature:

```csharp
public bool methodName(T obj)
```

```vb
Public Function methodName(obj As T) As Boolean
```

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples
The following example defines an `Employee` class with two fields, `Name` and `Id`. It also defines an `EmployeeSearch` class with a single method, `StartsWith`, that indicates whether the `Employee.Name` field starts with a specified substring that is supplied to the `EmployeeSearch` class constructor. Note  the signature of this method

```csharp
public bool StartsWith(Employee e)
```

```vb
Public Function StartsWith(e As Employee) As Boolean
```

corresponds to the signature of the delegate that can be passed to the `List<T>.FindIndex` method. The example instantiates a `List<Employee>` object, adds a number of `Employee` objects to it, and then calls the `FindIndex` method twice to search the entire collection, the first time for the first `Employee` object whose `Name` field begins with "J", and the second time for the first `Employee` object whose `Name` field begins with "Ju".

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/FindIndex/FindIndex2.cs._

## List<T>.FindIndex(Int32, Predicate<T>) method

```csharp
public int FindIndex (int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the `List<T>` that extends from the specified index to the last element.

Parameters:

- `startIndex`: The zero-based starting index of the search.
- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `List<T>`.

#### Remarks
The `List<T>` is searched forward starting at `startIndex` and ending at the last element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate. The delegate has the signature:

```csharp
public bool methodName(T obj)
```

```vb
Public Function methodName(obj As T) As Boolean
```

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is the number of elements from `startIndex` to the end of the `List<T>`.

#### Examples
The following example defines an `Employee` class with two fields, `Name` and `Id`. It also defines an `EmployeeSearch` class with a single method, `StartsWith`, that indicates whether the `Employee.Name` field starts with a specified substring that is supplied to the `EmployeeSearch` class constructor. Note  the signature of this method

```csharp
public bool StartsWith(Employee e)
```

```vb
Public Function StartsWith(e As Employee) As Boolean
```

corresponds to the signature of the delegate that can be passed to the `List<T>.FindIndex` method. The example instantiates a `List<Employee>` object, adds a number of `Employee` objects to it, and then calls the `FindIndex` method twice to search the collection starting with its fifth member (that is, the member at index 4). The first time, it searches for the first `Employee` object whose `Name` field begins with "J"; the second time, it searches for the first `Employee` object whose `Name` field begins with "Ju".

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/FindIndex/FindIndex3.cs._

## List<T>.FindIndex(Int32, Int32, Predicate<T>) method

```csharp
public int FindIndex (int startIndex, int count, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the `List<T>` that starts at the specified index and contains the specified number of elements.

Parameters:

- `startIndex`: The zero-based starting index of the search.
- `count`: The number of elements in the section to search.
- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `List<T>`.

-or-

`count` is less than 0.

-or-

`startIndex` and `count` do not specify a valid section in the `List<T>`.

#### Remarks
The `List<T>` is searched forward starting at `startIndex` and ending at `startIndex` plus `count` minus 1, if `count` is greater than 0.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate. The delegate has the signature:

```csharp
public bool methodName(T obj)
```

```vb
Public Function methodName(obj As T) As Boolean
```

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is `count`.

#### Examples
The following example defines an `Employee` class with two fields, `Name` and `Id`. It also defines an `EmployeeSearch` class with a single method, `StartsWith`, that indicates whether the `Employee.Name` field starts with a specified substring that is supplied to the `EmployeeSearch` class constructor. Note  the signature of this method

```csharp
public bool StartsWith(Employee e)
```

```vb
Public Function StartsWith(e As Employee) As Boolean
```

corresponds to the signature of the delegate that can be passed to the `List<T>.FindIndex` method. The example instantiates a `List<Employee>` object, adds a number of `Employee` objects to it, and then calls the `FindIndex` method twice to search the entire collection (that is, the members from index 0 to index `List<T>.Count` - 1). The first time, it searches for the first `Employee` object whose `Name` field begins with "J"; the second time, it searches for the first `Employee` object whose `Name` field begins with "Ju".

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/FindIndex/FindIndex1.cs._

## List<T>.FindLast(Predicate<T>) method

```csharp
public T? FindLast (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the last occurrence within the entire `List<T>`.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The last element that matches the conditions defined by the specified predicate, if found; otherwise, the default value for type `T`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate, moving backward in the `List<T>`, starting with the last element and ending with the first element.  Processing is stopped when a match is found.

> **Important:**
> When searching a list containing value types, make sure the default value for the type does not satisfy the search predicate. Otherwise, there is no way to distinguish between a default value indicating that no match was found and a list element that happens to have the default value for the type. If the default value satisfies the search predicate, use the `List<T>.FindLastIndex` method instead.

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

## List<T>.FindLastIndex(Predicate<T>) method

```csharp
public int FindLastIndex (Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire `List<T>`.

Parameters:

- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
The `List<T>` is searched backward starting at the last element and ending at the first element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate.

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

## List<T>.FindLastIndex(Int32, Predicate<T>) method

```csharp
public int FindLastIndex (int startIndex, Predicate<T> match);
```

Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `List<T>` that extends from the first element to the specified index.

Parameters:

- `startIndex`: The zero-based starting index of the backward search.
- `match`: The `Predicate<T>` delegate that defines the conditions of the element to search for.

Returns: The zero-based index of the last occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `match` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is outside the range of valid indexes for the `List<T>`.

#### Remarks
The `List<T>` is searched backward starting at `startIndex` and ending at the first element.

The `Predicate<T>` is a delegate to a method that returns `true` if the object passed to it matches the conditions defined in the delegate.  The elements of the current `List<T>` are individually passed to the `Predicate<T>` delegate.

This method performs a linear search; therefore, this method is an O(*n*) operation, where *n* is the number of elements from the beginning of the `List<T>` to `startIndex`.
