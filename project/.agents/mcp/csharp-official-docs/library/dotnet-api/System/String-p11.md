---
title: "String class (part 11 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 11 of 26)

## String.Format(IFormatProvider, String, Object, Object) method

```csharp
public static string Format (IFormatProvider? provider, string format, object? arg0, object? arg1);
```

Replaces the format items in a string with the string representation of two specified objects. A parameter supplies culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A composite format string.
- `arg0`: The first object to format.
- `arg1`: The second object to format.

Returns: A copy of `format` in which format items are replaced by the string representations of `arg0` and `arg1`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is not zero or one.

#### Remarks

This method uses the composite formatting feature to convert two expressions to their string representations and to embed those representations in a string. In performing the conversion, the method uses culture-sensitive formatting or a custom formatter. The method converts each `Object` argument to its string representation by calling its **ToString(IFormatProvider)** method or, if the object's corresponding format item includes a format string, by calling its **ToString(String,IFormatProvider)** method. If these methods don't exist, it calls the object's parameterless **ToString** method.

## String.Format(String, Object, Object, Object) method

```csharp
public static string Format (string format, object? arg0, object? arg1, object? arg2);
```

Replaces the format items in a string with the string representation of three specified objects.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format.
- `arg1`: The second object to format.
- `arg2`: The third object to format.

Returns: A copy of `format` in which the format items have been replaced by the string representations of `arg0`, `arg1`, and `arg2`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than zero, or greater than two.

#### Remarks

This method uses the composite formatting feature to convert the value of three expressions to their string representations and to embed those representations in a string.

#### Example: Format three arguments

This example uses the `Format` method to create a string that illustrates the result of a Boolean `And` operation with two integer values. Note that the format string includes six format items, but the method has only three items in its parameter list, because each item is formatted in two different ways.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/format4.cs._

## String.Format(IFormatProvider, String, Object, Object, Object) method

```csharp
public static string Format (IFormatProvider? provider, string format, object? arg0, object? arg1, object? arg2);
```

Replaces the format items in a string with the string representation of three specified objects. A parameter supplies culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A composite format string.
- `arg0`: The first object to format.
- `arg1`: The second object to format.
- `arg2`: The third object to format.

Returns: A copy of `format` in which the format items have been replaced by the string representations of `arg0`, `arg1`, and `arg2`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than zero, or greater than two.

#### Remarks

This method uses the composite formatting feature to convert three expressions to their string representations and to embed those representations in a string. In performing the conversion, the method uses culture-sensitive formatting or a custom formatter. The method converts each `Object` argument to its string representation by calling its **ToString(IFormatProvider)** method or, if the object's corresponding format item includes a format string, by calling its **ToString(String,IFormatProvider)** method. If these methods don't exist, it calls the object's parameterless **ToString** method.

## String.Format<TArg0>(IFormatProvider, CompositeFormat, TArg0) method

```csharp
public static string Format<TArg0> (IFormatProvider? provider, System.Text.CompositeFormat format, TArg0 arg0);
```

Replaces the format item or items in a `CompositeFormat` with the string representation of the corresponding objects in the specified format.

Parameters:

- `TArg0`: The type of the first object to format.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `arg0`: The first object to format.

Returns: The formatted string.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## String.Format<TArg0,TArg1>(IFormatProvider, CompositeFormat, TArg0, TArg1) method

```csharp
public static string Format<TArg0,TArg1> (IFormatProvider? provider, System.Text.CompositeFormat format, TArg0 arg0, TArg1 arg1);
```

Replaces the format item or items in a `CompositeFormat` with the string representation of the corresponding objects in the specified format.

Parameters:

- `TArg0`: The type of the first object to format.
- `TArg1`: The type of the second object to format.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `arg0`: The first object to format.
- `arg1`: The second object to format.

Returns: The formatted string.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## String.Format<TArg0,TArg1,TArg2>(IFormatProvider, CompositeFormat, TArg0, TArg1, TArg2) method

```csharp
public static string Format<TArg0,TArg1,TArg2> (IFormatProvider? provider, System.Text.CompositeFormat format, TArg0 arg0, TArg1 arg1, TArg2 arg2);
```

Replaces the format item or items in a `CompositeFormat` with the string representation of the corresponding objects in the specified format.

Parameters:

- `TArg0`: The type of the first object to format.
- `TArg1`: The type of the second object to format.
- `TArg2`: The type of the third object to format.
- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `arg0`: The first object to format.
- `arg1`: The second object to format.
- `arg2`: The third object to format.

Returns: The formatted string.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## String.GetEnumerator() method

```csharp
public CharEnumerator GetEnumerator ();
```

Retrieves an object that can iterate through the individual characters in this string.

Returns: An enumerator object.

#### Remarks

> **Tip:**
> Rather than calling the `String.GetEnumerator` method to retrieve a `CharEnumerator` object that you then use to enumerate a string, you should instead use your language's iteration construct. Examples include foreach in C#, for..in in F#, and For Each in Visual Basic).

This method enables you to iterate the individual characters in a string. For example, the Visual Basic `For Each`, the F# `for..in` expression, and C# `foreach` statements invoke this method to return a `CharEnumerator` object that can provide read-only access to the characters in this string instance.

#### Examples
The following example iterates the characters in several strings and displays information about their individual characters. It uses the language iteration construct rather than a call to the `String.GetEnumerator` method.

_Code sample not included: ~/snippets/csharp/System/String/GetEnumerator/getenumerator.cs._

## String.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this string.

Returns: A 32-bit signed integer hash code.

#### Remarks
The behavior of `String.GetHashCode` is dependent on its implementation, which might change from one version of the common language runtime to another. A reason why this might happen is to improve the performance of `String.GetHashCode`.

> **Important:**
> If two string objects are equal, the `String.GetHashCode` method returns identical values. However, there is not a unique hash code value for each unique string value. Different strings can return the same hash code.
>
> The hash code itself is not guaranteed to be stable. Hash codes for identical strings can differ across .NET implementations, across .NET versions, and across .NET platforms (such as 32-bit and 64-bit) for a single version of .NET. This implies that two subsequent runs of the same program may return different hash codes.
>
> As a result, hash codes should never be used as key <example-value> in a collection, and they should never be persisted.
>
> Finally, don't use the hash code instead of a value returned by a cryptographic hashing function if you need a cryptographically strong hash. For cryptographic hashes, use a class derived from the `HashAlgorithm` or `KeyedHashAlgorithm` class.
>
> For more information about hash codes, see `Object.GetHashCode`.

> **Important:**
> Hash codes are used to insert and retrieve keyed objects from hash tables efficiently. However, hash codes don't uniquely identify strings. Identical strings have equal hash codes, but the common language runtime can also assign the same hash code to different strings. In addition, hash codes can vary by version of .NET, and by platform within a single version. Because of this, you should not serialize or persist hash code values, and you shouldn't use them as keys in a hash table or dictionary.

For additional information about the use of hash codes and the `GetHashCode` method, see `Object.GetHashCode`.

#### Examples
The following example demonstrates the `String.GetHashCode` method using various input strings.

_Code sample not included: ~/snippets/csharp/System/String/GetHashCode/gethashcode.cs._

## String.GetHashCode(Char>) method

```csharp
public static int GetHashCode (ReadOnlySpan<char> value);
```

Returns the hash code for the provided read-only character span.

Parameters:

- `value`: A read-only character span.

Returns: A 32-bit signed integer hash code.

To be added.

## String.GetHashCode(StringComparison) method

```csharp
public int GetHashCode (StringComparison comparisonType);
```

Returns the hash code for this string using the specified rules.

Parameters:

- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: A 32-bit signed integer hash code.

To be added.

## String.GetHashCode(Char>, StringComparison) method

```csharp
public static int GetHashCode (ReadOnlySpan<char> value, StringComparison comparisonType);
```

Returns the hash code for the provided read-only character span using the specified rules.

Parameters:

- `value`: A read-only character span.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: A 32-bit signed integer hash code.

To be added.

## String.GetPinnableReference() method

```csharp
public ref readonly char GetPinnableReference ();
```

Returns a reference to the element of the string at index zero.

This method is intended to support .NET compilers and is not intended to be called by user code.

Returns: A reference to the first character in the string, or a reference to the string's null terminator if the string is empty.

Exceptions:

- `NullReferenceException`: The string is null.

#### Remarks

The `GetPinnableReference` method returns a character that can be used for pinning a `String` in memory. It is required to support the use of a `String` within a fixed statement.

## String.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for the `String` class.

Returns: The enumerated constant, `TypeCode.String`.

#### Examples
The following example displays the `TypeCode` enumerated constant for the `String` type.

_Code sample not included: ~/snippets/csharp/System/String/GetTypeCode/gtc.cs._

## String.IndexOf(Char) method

```csharp
public int IndexOf (char value);
```

Reports the zero-based index of the first occurrence of the specified Unicode character in this string.

Parameters:

- `value`: A Unicode character to seek.

Returns: The zero-based index position of `value` if that character is found, or -1 if it is not.

#### Remarks
Index numbering starts from zero.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.IndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example demonstrates how you can search a `String` for a character using the `String.IndexOf` method.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/indexof_c.cs._
