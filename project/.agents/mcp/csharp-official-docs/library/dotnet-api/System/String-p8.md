---
title: "String class (part 8 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 8 of 26)

## String.CompareTo(String) method

```csharp
public int CompareTo (string? strB);
```

Compares this instance with a specified `String` object and indicates whether this instance precedes, follows, or appears in the same position in the sort order as the specified string.

Parameters:

- `strB`: The string to compare with this instance.

Returns: A 32-bit signed integer that indicates whether this instance precedes, follows, or appears in the same position in the sort order as the `strB` parameter.

-  Less than zero

:  This instance precedes `strB`.

-  Zero

:  This instance has the same position in the sort order as `strB`.

-  Greater than zero

:  This instance follows `strB`.

-or-

`strB` is `null`.

#### Remarks
This method performs a word (case-sensitive and culture-sensitive) comparison using the current culture. For more information about word, string, and ordinal sorts, see `CompareOptions`.

> **Caution:**
> The `String.CompareTo` method was designed primarily for use in sorting or alphabetizing operations. It should not be used when the primary purpose of the method call is to determine whether two strings are equivalent. To determine whether two strings are equivalent, call the `String.Equals` method.

For more information about the behavior of this method, see the Remarks section of the `Compare` method.

This method implements the `IComparable<T>` interface and performs slightly better than the `CompareTo` method, because it does not have to determine whether the `strB` argument is a mutable value type that must be boxed, and it does not have to cast its parameter from an `Object` to a `String`.

#### Examples
The following example uses the `String.CompareTo` method to compare the current string instance with another string.

_Code sample not included: ~/snippets/csharp/System/String/CompareTo/stringcompareto.cs._

The following example demonstrates generic and non-generic versions of the CompareTo method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## String.Concat(String>) method

```csharp
public static string Concat (System.Collections.Generic.IEnumerable<string?> values);
```

Concatenates the members of a constructed `IEnumerable<T>` collection of type `String`.

Parameters:

- `values`: A collection object that implements `IEnumerable<T>` and whose generic type argument is `String`.

Returns: The concatenated strings in `values`, or `String.Empty` if `values` is an empty `IEnumerable(Of String)`.

Exceptions:

- `ArgumentNullException`: `values` is `null`.

#### Remarks
The method concatenates each object in `values`; it does not add any delimiters. To specify a delimiter between each member of `values`, call the `Join` method.

An `Empty` string is used in place of any null element in `values`.

If `values` is an empty `IEnumerable(Of String)`, the method returns `Empty`. If `values` is `null`, the method throws an `ArgumentNullException` exception.

`Concat` is a convenience method that lets you concatenate each element in an `IEnumerable(Of String)` collection without first converting the elements to a string array. It is particularly useful with Language-Integrated Query (LINQ) query expressions. The following example passes a `List(Of String)` object that contains either the uppercase or lowercase letters of the alphabet to a lambda expression that selects letters that are equal to or greater than a particular letter (which, in the example, is "M"). The `IEnumerable(Of String)` collection that is returned by the `Enumerable.Where` method is passed to the `Concat` method to display the result as a single string.

_Code sample not included: ~/snippets/csharp/System/String/Concat/concat2.cs._

#### Examples
The following example uses the Sieve of Eratosthenes algorithm to calculate the prime numbers that are less than or equal to 100. It assigns the result to a `List<T>` object of type `String`, which it then passes to the `Concat` method.

_Code sample not included: ~/snippets/csharp/System/String/Concat/concat1.cs._

## String.Concat(Object) method

```csharp
public static string Concat (object? arg0);
```

Creates the string  representation of a specified object.

Parameters:

- `arg0`: The object to represent, or `null`.

Returns: The string representation of the value of `arg0`, or `String.Empty` if `arg0` is `null`.

#### Remarks
The `Concat` method represents `arg0` as a string by calling its parameterless `ToString` method.

#### Examples
The following example demonstrates the `String.Concat` method.

_Code sample not included: ~/snippets/csharp/System/String/Concat/string.concat5.cs._

## String.Concat(Object[]) method

```csharp
public static string Concat (params object?[] args);
```

Concatenates the string representations of the elements in a specified `Object` array.

Parameters:

- `args`: An object array that contains the elements to concatenate.

Returns: The concatenated string representations of the values of the elements in `args`.

Exceptions:

- `ArgumentNullException`: `args` is `null`.
- `OutOfMemoryException`: Out of memory.

#### Remarks
The method concatenates each object in `args` by calling the parameterless `ToString` method of that object; it does not add any delimiters.

`Empty` is used in place of any null object in the array.

#### Examples
The following example demonstrates the use of the `String.Concat` method with an `Object` array.

_Code sample not included: ~/snippets/csharp/System/String/Concat/stringconcat1.cs._

## String.Concat(Object>) method

```csharp
public static string Concat (scoped ReadOnlySpan<object?> args);
```

Concatenates the string representations of the elements in a specified span of objects.

Parameters:

- `args`: A span of objects that contains the elements to concatenate.

Returns: The concatenated string representations of the values of the elements in `args`.

To be added.

## String.Concat(String>) method

```csharp
public static string Concat (scoped ReadOnlySpan<string?> values);
```

Concatenates the elements of a specified span of `String`.

Parameters:

- `values`: A span of `String` instances.

Returns: The concatenated elements of `values`.

To be added.

## String.Concat(String[]) method

```csharp
public static string Concat (params string?[] values);
```

Concatenates the elements of a specified `String` array.

Parameters:

- `values`: An array of string instances.

Returns: The concatenated elements of `values`.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `OutOfMemoryException`: Out of memory.

#### Remarks
The method concatenates each object in `values`; it does not add any delimiters.

An `Empty` string is used in place of any null object in the array.

#### Examples
The following example demonstrates the use of the `String.Concat` method with a `String` array.

_Code sample not included: ~/snippets/csharp/System/String/Concat/stringconcat3.cs._

## String.Concat(Object, Object) method

```csharp
public static string Concat (object? arg0, object? arg1);
```

Concatenates the string representations of two specified objects.

Parameters:

- `arg0`: The first object to concatenate.
- `arg1`: The second object to concatenate.

Returns: The concatenated string representations of the values of `arg0` and `arg1`.

#### Remarks
The method concatenates `arg0` and `arg1` by calling the parameterless `ToString` method of `arg0` and `arg1`; it does not add any delimiters.

`Empty` is used in place of any null argument.

If either of the arguments is an array reference, the method concatenates a string representing that array, instead of its members (for example, "System.String[]").

#### Examples
The following example demonstrates the `String.Concat` method.

_Code sample not included: ~/snippets/csharp/System/String/Concat/string.concat5.cs._

## String.Concat(Char>, Char>) method

```csharp
public static string Concat (ReadOnlySpan<char> str0, ReadOnlySpan<char> str1);
```

Concatenates the string representations of two specified read-only character spans.

Parameters:

- `str0`: The first read-only character span to concatenate.
- `str1`: The second read-only character span to concatenate.

Returns: The concatenated string representations of the values of `str0` and `str1`.

To be added.

## String.Concat(String, String) method

```csharp
public static string Concat (string? str0, string? str1);
```

Concatenates two specified instances of `String`.

Parameters:

- `str0`: The first string to concatenate.
- `str1`: The second string to concatenate.

Returns: The concatenation of `str0` and `str1`.

#### Remarks
The method concatenates `str0` and `str1`; it does not add any delimiters.

An `Empty` string is used in place of any null argument.

#### Examples
The following example concatenates a person's first, middle, and last name.

_Code sample not included: ~/snippets/csharp/System/String/Concat/stringconcat4.cs._

## String.Concat(Object, Object, Object) method

```csharp
public static string Concat (object? arg0, object? arg1, object? arg2);
```

Concatenates the string representations of three specified objects.

Parameters:

- `arg0`: The first object to concatenate.
- `arg1`: The second object to concatenate.
- `arg2`: The third object to concatenate.

Returns: The concatenated string representations of the values of `arg0`, `arg1`, and `arg2`.

#### Remarks
The method concatenates `arg0`, `arg1`, and `arg2` by calling the parameterless `ToString` method of each object; it does not add any delimiters.

`Empty` is used in place of any null argument.

#### Examples
The following example demonstrates the `String.Concat` method.

_Code sample not included: ~/snippets/csharp/System/String/Concat/string.concat5.cs._

## String.Concat(Char>, Char>, Char>) method

```csharp
public static string Concat (ReadOnlySpan<char> str0, ReadOnlySpan<char> str1, ReadOnlySpan<char> str2);
```

Concatenates the string representations of three specified read-only character spans.

Parameters:

- `str0`: The first read-only character span to concatenate.
- `str1`: The second read-only character span to concatenate.
- `str2`: The third read-only character span to concatenate.

Returns: The concatenated string representations of the values of `str0`, `str1` and `str2`.

To be added.

## String.Concat(String, String, String) method

```csharp
public static string Concat (string? str0, string? str1, string? str2);
```

Concatenates three specified instances of `String`.

Parameters:

- `str0`: The first string to concatenate.
- `str1`: The second string to concatenate.
- `str2`: The third string to concatenate.

Returns: The concatenation of `str0`, `str1`, and `str2`.

#### Remarks
The method concatenates `str0`, `str1`, and `str2`; it does not add any delimiters.

#### Examples
The following example uses the `String.Concat` method to concatenate three strings and displays the result.

_Code sample not included: ~/snippets/csharp/System/String/Concat/Concat6.cs._

## String.Concat(Char>, Char>, Char>, Char>) method

```csharp
public static string Concat (ReadOnlySpan<char> str0, ReadOnlySpan<char> str1, ReadOnlySpan<char> str2, ReadOnlySpan<char> str3);
```

Concatenates the string representations of four specified read-only character spans.

Parameters:

- `str0`: The first read-only character span to concatenate.
- `str1`: The second read-only character span to concatenate.
- `str2`: The third read-only character span to concatenate.
- `str3`: The fourth read-only character span to concatenate.

Returns: The concatenated string representations of the values of `str0`, `str1`, `str2` and `str3`.

To be added.

## String.Concat(String, String, String, String) method

```csharp
public static string Concat (string? str0, string? str1, string? str2, string? str3);
```

Concatenates four specified instances of `String`.

Parameters:

- `str0`: The first string to concatenate.
- `str1`: The second string to concatenate.
- `str2`: The third string to concatenate.
- `str3`: The fourth string to concatenate.

Returns: The concatenation of `str0`, `str1`, `str2`, and `str3`.

#### Remarks
The method concatenates `str0`, `str1`, `str2`, and `str3`; it does not add any delimiters.

#### Examples
The following example defines an array of four-letter words and stores their individual letters to a string array in order to scramble them. It then calls the `Concat` method to reassemble the scrambled words.

_Code sample not included: ~/snippets/csharp/System/String/Concat/concat4.cs._

## String.Concat<T>(IEnumerable<T>) method

```csharp
public static string Concat<T> (System.Collections.Generic.IEnumerable<T> values);
```

Concatenates the members of an `IEnumerable<T>` implementation.

Parameters:

- `T`: The type of the members of `values`.
- `values`: A collection object that implements the `IEnumerable<T>` interface.

Returns: The concatenated members in `values`.

Exceptions:

- `ArgumentNullException`: `values` is `null`.

#### Remarks
The method concatenates each object in `values`; it does not add any delimiters.

An `Empty` string is used in place of any null argument.

`Concat<T>` is a convenience method that lets you concatenate each element in an `IEnumerable<T>` collection without first converting the elements to strings. It is particularly useful with Language-Integrated Query (LINQ) query expressions, as the example illustrates. The string representation of each object in the `IEnumerable<T>` collection is derived by calling that object's `ToString` method.

#### Examples
The following example defines a very simple `Animal` class that contains the name of an animal and the order to which it belongs. It then defines a `List<T>` object to contain a number of `Animal` objects. The `Enumerable.Where` extension method is called to extract the `Animal` objects whose `Order` property equals "Rodent". The result is passed to the `Concat<T>` method and displayed to the console.

_Code sample not included: ~/snippets/csharp/System/String/Concat/concat3.cs._

## String.Contains(Char) method

```csharp
public bool Contains (char value);
```

Returns a value indicating whether a specified character occurs within this string.

Parameters:

- `value`: The character to seek.

Returns: `true` if the `value` parameter occurs within this string; otherwise, `false`.

#### Remarks
This method performs an ordinal (case-sensitive and culture-insensitive) comparison.
