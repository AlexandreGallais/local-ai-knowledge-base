---
title: "Console class (part 9 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 9 of 10)

## Console.WriteLine(Int32) method

```csharp
public static void WriteLine (int value);
```

Writes the text representation of the specified 32-bit signed integer value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Int32.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(Int64) method

```csharp
public static void WriteLine (long value);
```

Writes the text representation of the specified 64-bit signed integer value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Int64.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(Object) method

```csharp
public static void WriteLine (object? value);
```

Writes the text representation of the specified object, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
If `value` is `null`, only the line terminator is written. Otherwise, the `ToString` method of `value` is called to produce its string representation, and the resulting string is written to the standard output stream.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example uses the `WriteLine` method to display each value in an object array to the console.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/writeline_obj1.cs._

## Console.WriteLine(Char>) method

```csharp
public static void WriteLine (ReadOnlySpan<char> value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## Console.WriteLine(Single) method

```csharp
public static void WriteLine (float value);
```

Writes the text representation of the specified single-precision floating-point value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Single.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(String) method

```csharp
public static void WriteLine (string? value);
```

Writes the specified string value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
If value is `null`, only the line terminator is written to the standard output stream.

For more information about the line terminator, see the Remarks section of the `WriteLine` method.

#### Examples
The example changes the line terminator from its default value of "\r\n" or `vbCrLf` to "\r\n\r\n" or `vbCrLf` + `vbCrLf`. It then calls the `WriteLine` and `WriteLine` methods to display output to the console.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/newline1.cs._

## Console.WriteLine(UInt32) method

```csharp
public static void WriteLine (uint value);
```

Writes the text representation of the specified 32-bit unsigned integer value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `UInt32.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(UInt64) method

```csharp
public static void WriteLine (ulong value);
```

Writes the text representation of the specified 64-bit unsigned integer value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `UInt64.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(String, Object) method

```csharp
public static void WriteLine (string format, object? arg0);
```

Writes the text representation of the specified object, followed by the current line terminator, to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg0`: An object to write using `format`.

Exceptions:

- `IOException`: An I/O error occurred.
- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The format specification in `format` is invalid.

#### Remarks
This method uses the composite formatting feature of .NET to convert the value of an object to its text representation and embed that representation in a string. The resulting string is written to the output stream.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items, that correspond to an object in the parameter list of this method. The formatting process replaces each format item with the text representation of the value of the corresponding object.

The syntax of a format item is `{`*index*`,`*alignment*`}`, which specifies a mandatory index, the optional length and alignment of the formatted text, and an optional string of format specifier characters that govern how the value of the corresponding object is formatted.

.NET provides extensive formatting support, which is described in greater detail in the following formatting articles:

- For more information about the composite formatting feature supported by methods such as `String.Format`, `StringBuilder.AppendFormat`, and some overloads of `Console.WriteLine`, see Composite Formatting.
- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.
- For more information about date and time format specifiers, see Standard Date and Time Format Strings and Custom Date and Time Format Strings.
- For more information about enumeration format specifiers, see Enumeration Format Strings.
- For more information about formatting, see Formatting Types.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example calls the `WriteLine` method to display five randomly generated `Boolean` values.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/WriteLine6.cs._

The following example calls the `WriteLine` method to display the current date.   Note that the format item in the `format` argument uses the "D" standard date and time format string to display the date in the long date format of the current culture.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/WriteLine7.cs._

## Console.WriteLine(String, Object[]) method

```csharp
public static void WriteLine (string format, params object?[]? arg);
```

Writes the text representation of the specified array of objects, followed by the current line terminator, to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg`: An array of objects to write using `format`.

Exceptions:

- `IOException`: An I/O error occurred.
- `ArgumentNullException`: `format` or `arg` is `null`.
- `FormatException`: The format specification in `format` is invalid.

#### Remarks
This method uses the  composite formatting feature of .NET to convert the value of an object to its text representation and embed that representation in a string. The resulting string is written to the output stream.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items, that correspond to an object in the parameter list of this method. The formatting process replaces each format item with the text representation of the value of the corresponding object.

The syntax of a format item is `{`*index*`,`*alignment*`}`, which specifies a mandatory index, the optional length and alignment of the formatted text, and an optional string of format specifier characters that govern how the value of the corresponding object is formatted.

.NET provides extensive formatting support, which is described in greater detail in the following formatting articles:

- For more information about the composite formatting feature supported by methods such as `String.Format`, `StringBuilder.AppendFormat`, and some overloads of `Console.WriteLine`, see Composite Formatting.
- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.
- For more information about date and time format specifiers, see Standard Date and Time Format Strings and Custom Date and Time Format Strings.
- For more information about enumeration format specifiers, see Enumeration Format Strings.
- For more information about formatting, see Formatting Types.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example demonstrates the standard formatting specifiers for numbers, dates, and enumerations.

_Code sample not included: ~/snippets/csharp/System/Console/Write/wl.cs._

The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(String, Object>) method

```csharp
public static void WriteLine (string format, scoped ReadOnlySpan<object?> arg);
```

Writes the text representation of the specified span of objects, followed by the current line terminator, to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg`: A span of objects to write using format.

To be added.

## Console.WriteLine(Char[], Int32, Int32) method

```csharp
public static void WriteLine (char[] buffer, int index, int count);
```

Writes the specified subarray of Unicode characters, followed by the current line terminator, to the standard output stream.

Parameters:

- `buffer`: An array of Unicode characters.
- `index`: The starting position in `buffer`.
- `count`: The number of characters to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.
- `ArgumentException`: `index` plus `count` specify a position that is not within `buffer`.
- `IOException`: An I/O error occurred.

#### Remarks
This method writes `count` characters starting at position `index` of `buffer` to the standard output stream.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.
