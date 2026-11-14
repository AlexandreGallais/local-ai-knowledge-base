---
title: "Console class (part 8 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 8 of 10)

## Console.Write(String, Object[]) method

```csharp
public static void Write (string format, params object?[]? arg);
```

Writes the text representation of the specified array of objects to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg`: An array of objects to write using `format`.

Exceptions:

- `IOException`: An I/O error occurred.
- `ArgumentNullException`: `format` or `arg` is `null`.
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

The `arg` parameter is a parameter array. Arguments  can be passed to the method either as an array or as list of five or more items. The examples illustrate both forms of method call.

#### Examples
The following example defines a `Person` class with a number of properties that provide information about a person. Its `GetDescription` method returns an array that contains all of the property values except one. The example then uses the array returned by the  `GetDescription` method  to display the values of the Person object.

_Code sample not included: ~/snippets/csharp/System/Console/Write/WriteParams1.cs._

Note that the example calls the `Write` method rather than the `WriteLine` method because it attempts to display the value of the `Person.Remarks` property on the same line. To do this, it examines the value of the `Console.CursorLeft` and `Console.WindowWidth` properties to determine whether there is enough space for the remark to fit.  If there is, it displays the line. If not, it writes a line, indents three spaces, and displays the remark.

The following example is identical to the first, except that it supplies a five-item list as the `arg` argument instead of a parameter array.

_Code sample not included: ~/snippets/csharp/System/Console/Write/WriteParams2.cs._

## Console.Write(String, Object>) method

```csharp
public static void Write (string format, scoped ReadOnlySpan<object?> arg);
```

Writes the text representation of the specified span of objects to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg`: A span of objects to write using format.

To be added.

## Console.Write(Char[], Int32, Int32) method

```csharp
public static void Write (char[] buffer, int index, int count);
```

Writes the specified subarray of Unicode characters to the standard output stream.

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

## Console.Write(String, Object, Object) method

```csharp
public static void Write (string format, object? arg0, object? arg1);
```

Writes the text representation of the specified objects to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to write using `format`.
- `arg1`: The second object to write using `format`.

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

#### Examples
The following example uses the `WriteLine` method to demonstrate the standard formatting specifiers for numbers, dates, and enumerations.

_Code sample not included: ~/snippets/csharp/System/Console/Write/wl.cs._

The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(String, Object, Object, Object) method

```csharp
public static void Write (string format, object? arg0, object? arg1, object? arg2);
```

Writes the text representation of the specified objects to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to write using `format`.
- `arg1`: The second object to write using `format`.
- `arg2`: The third object to write using `format`.

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

#### Examples
The following example uses the `WriteLine` method to demonstrate the standard formatting specifiers for numbers, dates, and enumerations.

_Code sample not included: ~/snippets/csharp/System/Console/Write/wl.cs._

The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.WriteLine() method

```csharp
public static void WriteLine ();
```

Writes the current line terminator to the standard output stream.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The default line terminator is a string whose value is a carriage return followed by a line feed ("\r\n" in C#, or `vbCrLf` in Visual Basic). You can change the line terminator by setting the `NewLine` property of the `Out` property to another string. The example provides an illustration.

#### Examples
The example changes the line terminator from its default value of "\r\n" or `vbCrLf` to "\r\n\r\n" or `vbCrLf` + `vbCrLf`. It then calls the `WriteLine` and `WriteLine` methods to display output to the console.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/newline1.cs._

## Console.WriteLine(Boolean) method

```csharp
public static void WriteLine (bool value);
```

Writes the text representation of the specified Boolean value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Boolean.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example generates ten random integers and uses the `WriteLine` method to indicate whether they are even.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/writeline_boolean1.cs._

## Console.WriteLine(Char) method

```csharp
public static void WriteLine (char value);
```

Writes the specified Unicode character, followed by the current line terminator, value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(Char[]) method

```csharp
public static void WriteLine (char[]? buffer);
```

Writes the specified array of Unicode characters, followed by the current line terminator, to the standard output stream.

Parameters:

- `buffer`: A Unicode character array.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

## Console.WriteLine(Decimal) method

```csharp
public static void WriteLine (decimal value);
```

Writes the text representation of the specified `Decimal` value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Decimal.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(Double) method

```csharp
public static void WriteLine (double value);
```

Writes the text representation of the specified double-precision floating-point value, followed by the current line terminator, to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Double.ToString` method.

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._
