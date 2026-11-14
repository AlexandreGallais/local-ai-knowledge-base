---
title: "String class (part 10 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 10 of 26)

## String.Equals(String) method

```csharp
public bool Equals (string? value);
```

Determines whether this instance and another specified `String` object have the same value.

Parameters:

- `value`: The string to compare to this instance.

Returns: `true` if the value of the `value` parameter is the same as the value of this instance; otherwise, `false`. If `value` is `null`, the method returns `false`.

#### Remarks
This method performs an ordinal (case-sensitive and culture-insensitive) comparison.

#### Examples
The following example demonstrates the `String.Equals` method. It compares the title-cased word "File" with an equivalent word, its lowercase equivalent, its uppercase equivalent, and a word that contains LATIN SMALL LETTER DOTLESS I (U+0131) instead of LATIN SMALL LETTER I (U+0069). Because the `Equals` method performs an ordinal comparison, only the comparison with an identical word returns `true`.

_Code sample not included: ~/snippets/csharp/System/String/Equals/equalsex1.cs._

## String.Equals(String, String) method

```csharp
public static bool Equals (string? a, string? b);
```

Determines whether two specified `String` objects have the same value.

Parameters:

- `a`: The first string to compare, or `null`.
- `b`: The second string to compare, or `null`.

Returns: `true` if the value of `a` is the same as the value of `b`; otherwise, `false`. If both `a` and `b` are `null`, the method returns `true`.

#### Remarks
This method performs an ordinal (case-sensitive and culture-insensitive) comparison.

#### Examples
The following example demonstrates the `String.Equals` method.

_Code sample not included: ~/snippets/csharp/System/String/Equals/equals.cs._

## String.Equals(String, StringComparison) method

```csharp
public bool Equals (string? value, StringComparison comparisonType);
```

Determines whether this string and a specified `String` object have the same value. A parameter specifies the culture, case, and sort rules used in the comparison.

Parameters:

- `value`: The string to compare to this instance.
- `comparisonType`: One of the enumeration values that specifies how the strings will be compared.

Returns: `true` if the value of the `value` parameter is the same as this string; otherwise, `false`.

Exceptions:

- `ArgumentException`: `comparisonType` is not a `StringComparison` value.

#### Remarks
The `comparisonType` parameter indicates whether the comparison should use the current or invariant culture, honor or ignore the case of the two strings being compared, or use word or ordinal sort rules.

#### Examples
The following example creates a string array that consists of an uppercase "I", a lowercase "i", and a dotless "ı". It then calls the `Equals` method to compare them by using each possible `StringComparison` enumeration value.

_Code sample not included: ~/snippets/csharp/System/String/Equals/eqcmp.cs._

## String.Equals(String, String, StringComparison) method

```csharp
public static bool Equals (string? a, string? b, StringComparison comparisonType);
```

Determines whether two specified `String` objects have the same value. A parameter specifies the culture, case, and sort rules used in the comparison.

Parameters:

- `a`: The first string to compare, or `null`.
- `b`: The second string to compare, or `null`.
- `comparisonType`: One of the enumeration values that specifies the rules for the comparison.

Returns: `true` if the value of the `a` parameter is equal to the value of the `b` parameter; otherwise, `false`.

Exceptions:

- `ArgumentException`: `comparisonType` is not a `StringComparison` value.

#### Remarks
The `comparisonType` parameter indicates whether the comparison should use the current or invariant culture, honor or ignore the case of the two strings being compared, or use word or ordinal sort rules.

#### Examples
The following example compares three sets of strings by using each member of the `StringComparison` enumeration. The comparisons use the conventions of the English (United States), Thai (Thailand) and Turkish (Turkey) cultures. Note that the strings "a" and "a-" are considered equivalent in the "th-TH" culture but not in the others, while "i" and "İ" are considered equivalent in the "tr-TR" culture when case is ignored but not in the other cultures.

_Code sample not included: ~/snippets/csharp/System/String/Equals/equals_ex3.cs._

## String.Format(String, Object) method

```csharp
public static string Format (string format, object? arg0);
```

Replaces one or more format items in a string with the string representation of a specified object.

Parameters:

- `format`: A composite format string.
- `arg0`: The object to format.

Returns: A copy of `format` in which any format items are replaced by the string representation of `arg0`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The format item in `format` is invalid.

-or-

The index of a format item is not zero.

#### Remarks

This method uses the composite formatting feature to convert the value of an expression to its string representation and to embed that representation in a string.

#### Example: Formatting a single argument

The following example uses the `Format` method to embed an individual's age in the middle of a string.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/format7.cs._

## String.Format(String, Object[]) method

```csharp
public static string Format (string format, params object?[] args);
```

Replaces the format item in a specified string with the string representation of a corresponding object in a specified array.

Parameters:

- `format`: A composite format string.
- `args`: An object array that contains zero or more objects to format.

Returns: A copy of `format` in which the format items have been replaced by the string representation of the corresponding objects in `args`.

Exceptions:

- `ArgumentNullException`: `format` or `args` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than zero, or greater than or equal to the length of the `args` array.

#### Remarks

This method uses the composite formatting feature to convert the value of four or more expressions to their string representations and to embed those representations in a string. Since the `args` parameter is marked with the `ParamArrayAttribute` attribute, you can pass the objects to the method as individual arguments or as an `Object` array.

#### Example: Format more than three arguments

This example creates a string that contains data on the high and low temperature on a particular date. The composite format string has five format items in the C# example and six in the Visual Basic example. Two of the format items define the width of their corresponding value's string representation, and the first format item also includes a standard date and time format string.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/format5.cs._

You can also pass the objects to be formatted as an array rather than as an argument list.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/format_paramarray1.cs._

## String.Format(String, Object>) method

```csharp
public static string Format (string format, scoped ReadOnlySpan<object?> args);
```

Replaces the format item in a specified string with the string representation of a corresponding object in a specified span.

Parameters:

- `format`: A composite format string.
- `args`: An object span that contains zero or more objects to format.

Returns: A copy of `format` in which the format items have been replaced by the string representation of the corresponding objects in `args`.

To be added.

## String.Format(IFormatProvider, String, Object) method

```csharp
public static string Format (IFormatProvider? provider, string format, object? arg0);
```

Replaces the format item or items in a specified string with the string representation of the corresponding object. A parameter supplies culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A composite format string.
- `arg0`: The object to format.

Returns: A copy of `format` in which the format item or items have been replaced by the string representation of `arg0`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is not zero.

#### Remarks

This method uses the composite formatting feature to convert the value of an expression to its string representation and to embed that representation in a string. In performing the conversion, the method uses culture-sensitive formatting or a custom formatter. The method converts `arg0` to its string representation by calling its **ToString(IFormatProvider)** method or, if the object's corresponding format item includes a format string, by calling its **ToString(String,IFormatProvider)** method. If these methods don't exist, it calls the object's parameterless **ToString** method.

## String.Format(IFormatProvider, String, Object[]) method

```csharp
public static string Format (IFormatProvider? provider, string format, params object?[] args);
```

Replaces the format items in a string with the string representations of corresponding objects in a specified array. A parameter supplies culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A composite format string.
- `args`: An object array that contains zero or more objects to format.

Returns: A copy of `format` in which the format items have been replaced by the string representation of the corresponding objects in `args`.

Exceptions:

- `ArgumentNullException`: `format` or `args` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than zero, or greater than or equal to the length of the `args` array.

#### Remarks

This method uses the composite formatting feature to convert four or more expressions to their string representations and to embed those representations in a string. In performing the conversion, the method uses culture-sensitive formatting or a custom formatter. The method converts each `Object` argument to its string representation by calling its **ToString(IFormatProvider)** method or, if the object's corresponding format item includes a format string, by calling its **ToString(String,IFormatProvider)** method. If these methods don't exist, it calls the object's parameterless **ToString** method.

#### Example: Culture-sensitive formatting

This example uses the `Format` method to display the string representation of some date and time values and numeric values by using several different cultures.

_Code sample not included: ~/snippets/csharp/System/String/Format/Example2.cs._

## String.Format(IFormatProvider, String, Object>) method

```csharp
public static string Format (IFormatProvider? provider, string format, scoped ReadOnlySpan<object?> args);
```

Replaces the format items in a string with the string representations of corresponding objects in a specified span.
A parameter supplies culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A composite format string.
- `args`: An object span that contains zero or more objects to format.

Returns: A copy of `format` in which the format items have been replaced by the string representation of the corresponding objects in `args`.

To be added.

## String.Format(IFormatProvider, CompositeFormat, Object[]) method

```csharp
public static string Format (IFormatProvider? provider, System.Text.CompositeFormat format, params object?[] args);
```

Replaces the format item or items in a `CompositeFormat` with the string representation of the corresponding objects in the specified format.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `args`: An array of objects to format.

Returns: The formatted string.

Exceptions:

- `ArgumentNullException`: `format` or `args` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## String.Format(IFormatProvider, CompositeFormat, Object>) method

```csharp
public static string Format (IFormatProvider? provider, System.Text.CompositeFormat format, scoped ReadOnlySpan<object?> args);
```

Replaces the format item or items in a `CompositeFormat` with the string representation of the corresponding objects in the specified format.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `args`: A span of objects to format.

Returns: The formatted string.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## String.Format(String, Object, Object) method

```csharp
public static string Format (string format, object? arg0, object? arg1);
```

Replaces the format items in a string with the string representation of two specified objects.

Parameters:

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

This method uses the composite formatting feature to convert the value of two expressions to their string representations and to embed those representations in a string.

#### Example: Format two arguments

This example uses the `Format` method to display time and temperature data stored in a generic `Dictionary<T1,T2>` object. Note that the format string has three format items, although there are only two objects to format. This is because the first object in the list (a date and time value) is used by two format items: The first format item displays the time, and the second displays the date.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/formatexample4.cs._
