---
title: "String class (part 15 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 15 of 26)

## String.Join(String, String>) method

```csharp
public static string Join (string? separator, System.Collections.Generic.IEnumerable<string?> values);
```

Concatenates the members of a constructed `IEnumerable<T>` collection of type `String`, using the specified separator between each member.

Parameters:

- `separator`: The string to use as a separator.`separator` is included in the returned string only if `values` has more than one element.
- `values`: A collection that contains the strings to concatenate.

Returns: A string that consists of the elements of `values` delimited by the `separator` string.

-or-

`String.Empty` if `values` has zero elements.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

#### Remarks
If `separator` is `null`, an empty string (`Empty`) is used instead. If any member of `values` is `null`, an empty string is used instead.

`Join` is a convenience method that lets you concatenate each element in an `IEnumerable(Of String)` collection without first converting the elements to a string array. It is particularly useful with Language-Integrated Query (LINQ) query expressions. The following example passes a `List(Of String)` object that contains either the uppercase or lowercase letters of the alphabet to a lambda expression that selects letters that are equal to or greater than a particular letter (which, in the example, is "M"). The `IEnumerable(Of String)` collection returned by the `Enumerable.Where` method is passed to the `Join` method to display the result as a single string.

_Code sample not included: ~/snippets/csharp/System/String/Join/join4.cs._

#### Examples
The following example uses the Sieve of Eratosthenes algorithm to calculate the prime numbers that are less than or equal to 100. It assigns the result to a `List<T>` object of type `String`, which it then passes to the `Join` method.

_Code sample not included: ~/snippets/csharp/System/String/Join/join3.cs._

## String.Join(String, Object[]) method

```csharp
public static string Join (string? separator, params object?[] values);
```

Concatenates the elements of an object array, using the specified separator between each element.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the returned string only if `values` has more than one element.
- `values`: An array that contains the elements to concatenate.

Returns: A string that consists of the elements of `values` delimited by the `separator` string, or `String.Empty` if `values` has zero elements.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

#### Remarks
If `separator` is `null` or if any element of `values` other than the first element is `null`, an empty string (`Empty`) is used instead. See the Notes for Callers section if the first element of `values` is `null`.

`Join` is a convenience method that lets you concatenate each element in an object array without explicitly converting its elements to strings. The string representation of each object in the array is derived by calling that object's `ToString` method.

#### Examples

The following example uses the Sieve of Eratosthenes algorithm to calculate the prime numbers that are less than or equal to 100. It assigns the result to an integer array, which it then passes to the `Join` method.

_Code sample not included: ~/snippets/csharp/System/String/Join/join1.cs._

## String.Join(String, Object>) method

```csharp
public static string Join (string? separator, scoped ReadOnlySpan<object?> values);
```

Concatenates the string representations of a span of objects, using the specified separator between each member.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the returned string only if `values` has more than one element.
- `values`: A span of objects whose string representations will be concatenated.

Returns: A string that consists of the elements of `values` delimited by the `separator` string.
-or- `String.Empty` if `values` has zero elements.

To be added.

## String.Join(String, String>) method

```csharp
public static string Join (string? separator, scoped ReadOnlySpan<string?> value);
```

Concatenates a span of strings, using the specified separator between each member.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the returned string only if `value` has more than one element.
- `value`: A span that contains the elements to concatenate.

Returns: A string that consists of the elements of `value` delimited by the `separator` string.
-or- `String.Empty` if `value` has zero elements.

To be added.

## String.Join(String, String[]) method

```csharp
public static string Join (string? separator, params string?[] value);
```

Concatenates all the elements of a string array, using the specified separator between each element.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the returned string only if `value` has more than one element.
- `value`: An array that contains the elements to concatenate.

Returns: A string that consists of the elements in `value` delimited by the `separator` string.

-or-

`String.Empty` if `value` has zero elements.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

#### Remarks
For example, if `separator` is ", " and the elements of `value` are "apple", "orange", "grape", and "pear", `Join(separator, value)` returns "apple, orange, grape, pear".

If `separator` is `null`, an empty string (`Empty`) is used instead. If any element in `value` is `null`, an empty string is used instead.

#### Examples
The following example demonstrates the `String.Join` method.

_Code sample not included: ~/snippets/csharp/System/String/Join/stringjoin.cs._

## String.Join(Char, String[], Int32, Int32) method

```csharp
public static string Join (char separator, string?[] value, int startIndex, int count);
```

Concatenates an array of strings, using the specified separator between each member, starting with the element in `value` located at the `startIndex` position, and concatenating up to `count` elements.

Parameters:

- `separator`: Concatenates an array of strings, using the specified separator between each member, starting with the element located at the specified index and including a specified number of elements.
- `value`: An array of strings to concatenate.
- `startIndex`: The first item in `value` to concatenate.
- `count`: The number of elements from `value` to concatenate, starting with the element in the `startIndex` position.

Returns: A string that consists of `count` elements of `value` starting at `startIndex` delimited by the `separator` character.

-or-

`String.Empty` if `count` is zero.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` or `count` are negative.

-or-

`startIndex` is greater than the length of `value`  - `count`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

To be added.

## String.Join(String, String[], Int32, Int32) method

```csharp
public static string Join (string? separator, string?[] value, int startIndex, int count);
```

Concatenates the specified elements of a string array, using the specified separator between each element.

Parameters:

- `separator`: The string to use as a separator. `separator` is included in the returned string only if `value` has more than one element.
- `value`: An array that contains the elements to concatenate.
- `startIndex`: The first element in `value` to use.
- `count`: The number of elements of `value` to use.

Returns: A string that consists of `count` elements of `value` starting at `startIndex` delimited by the `separator` character.

-or-

`String.Empty` if `count` is zero.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` or `count` is less than 0.

-or-

`startIndex` plus `count` is greater than the number of elements in `value`.
- `OutOfMemoryException`: Out of memory.

#### Remarks
For example, if `separator` is ", " and the elements of `value` are "apple", "orange", "grape", and "pear", `Join(separator, value, 1, 2)` returns "orange, grape".

If `separator` is `null`, an empty string (`Empty`) is used instead. If any element in `value` is `null`, an empty string is used instead.

#### Examples
The following example concatenates two elements from an array of names of fruit.

_Code sample not included: ~/snippets/csharp/System/String/Join/join2.cs._

## String.Join<T>(Char, IEnumerable<T>) method

```csharp
public static string Join<T> (char separator, System.Collections.Generic.IEnumerable<T> values);
```

Concatenates the members of a collection, using the specified separator between each member.

Parameters:

- `T`: The type of the members of `values`.
- `separator`: The character to use as a separator. `separator` is included in the returned string only if `values` has more than one element.
- `values`: A collection that contains the objects to concatenate.

Returns: A string that consists of the members of `values` delimited by the `separator` character.

-or-

`String.Empty` if `values` has no elements.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

To be added.

## String.Join<T>(String, IEnumerable<T>) method

```csharp
public static string Join<T> (string? separator, System.Collections.Generic.IEnumerable<T> values);
```

Concatenates the members of a collection, using the specified separator between each member.

Parameters:

- `T`: The type of the members of `values`.
- `separator`: The string to use as a separator. `separator` is included in the returned string only if `values` has more than one element.
- `values`: A collection that contains the objects to concatenate.

Returns: A string that consists of the elements of `values` delimited by the `separator` string.

-or-

`String.Empty` if `values` has no elements.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `OutOfMemoryException`: The length of the resulting string overflows the maximum allowed length (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

#### Remarks
If `separator` is `null`, an empty string (`Empty`) is used instead. If any member of `values` is `null`, an empty string is used instead.

`Join<T>` is a convenience method that lets you concatenate each member of an `IEnumerable<T>` collection without first converting them to strings. The string representation of each object in the `IEnumerable<T>` collection is derived by calling that object's `ToString` method.

This method is particular useful with Language-Integrated Query (LINQ) query expressions. For example, the following code defines a very simple `Animal` class that contains the name of an animal and the order to which it belongs. It then defines a `List<T>` object that contains a number of `Animal` objects. The `Enumerable.Where` extension method is called to extract the `Animal` objects whose `Order` property equals "Rodent". The result is passed to the `Join<T>` method.

_Code sample not included: ~/snippets/csharp/System/String/Join/join5.cs._

#### Examples
The following example uses the Sieve of Eratosthenes algorithm to calculate the prime numbers that are less than or equal to 100. It assigns the result to a `List<T>` object of type integer, which it then passes to the `Join<T>` method.

_Code sample not included: ~/snippets/csharp/System/String/Join/join6.cs._

## String.LastIndexOf(Char) method

```csharp
public int LastIndexOf (char value);
```

Reports the zero-based index position of the last occurrence of a specified Unicode character within this instance.

Parameters:

- `value`: The Unicode character to seek.

Returns: The zero-based index position of `value` if that character is found, or -1 if it is not.

#### Remarks
Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

This method begins searching at the last character position of this instance and proceeds backward toward the beginning until either `value` is found or the first character position has been examined. The search is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.LastIndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example defines an `ExtractFilename` method that uses the `LastIndexOf` method to find the last directory separator character in a string and to extract the string's file name. If the file exists, the method returns the file name without its path.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/LastIndexOf_Example.cs._
