---
title: "TextWriter class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/TextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextWriter class (part 2 of 6)

## TextWriter.Write(Decimal) method

```csharp
public virtual void Write (decimal value);
```

Writes the text representation of a decimal value to the text stream.

Parameters:

- `value`: The decimal value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

## TextWriter.Write(Double) method

```csharp
public virtual void Write (double value);
```

Writes the text representation of an 8-byte floating-point value to the text stream.

Parameters:

- `value`: The 8-byte floating-point value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Double.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Int32) method

```csharp
public virtual void Write (int value);
```

Writes the text representation of a 4-byte signed integer to the text stream.

Parameters:

- `value`: The 4-byte signed integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Int32.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Int64) method

```csharp
public virtual void Write (long value);
```

Writes the text representation of an 8-byte signed integer to the text stream.

Parameters:

- `value`: The 8-byte signed integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Int64.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

For a list of common I/O tasks, see Common I/O Tasks.

How to: Write Text to a File

## TextWriter.Write(Object) method

```csharp
public virtual void Write (object? value);
```

Writes the text representation of an object to the text stream by calling the `ToString` method on that object.

Parameters:

- `value`: The object to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
This overload is equivalent to the `Write` overload.

If the specified object is `null`, no action is taken and no exception is thrown. Otherwise, the object's `ToString` method is called to produce the string representation, and the resulting string is then written to the output stream. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Char>) method

```csharp
public virtual void Write (ReadOnlySpan<char> buffer);
```

Writes a character span to the text stream.

Parameters:

- `buffer`: The character span to write.

#### Remarks

The text representation of the specified value is produced by calling the ReadOnlySpan\<Char>.ToString method.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Single) method

```csharp
public virtual void Write (float value);
```

Writes the text representation of a 4-byte floating-point value to the text stream.

Parameters:

- `value`: The 4-byte floating-point value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Single.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(String) method

```csharp
public virtual void Write (string? value);
```

Writes a string to the text stream.

Parameters:

- `value`: The string to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
This overload is equivalent to the `Write` overload.

This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

If `value` is `null`, nothing is written to the text stream.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Rune) method

```csharp
public virtual void Write (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## TextWriter.Write(StringBuilder) method

```csharp
public virtual void Write (System.Text.StringBuilder? value);
```

Writes a string builder to the text stream.

Parameters:

- `value`: The string, as a string builder, to write to the text stream.

#### Remarks

This method is equivalent to `Write(stringBuilder.ToString())`, but it uses the `StringBuilder.GetChunks` method to avoid creating the intermediate string.

## TextWriter.Write(UInt32) method

```csharp
public virtual void Write (uint value);
```

Writes the text representation of a 4-byte unsigned integer to the text stream.

Parameters:

- `value`: The 4-byte unsigned integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `UInt32.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(UInt64) method

```csharp
public virtual void Write (ulong value);
```

Writes the text representation of an 8-byte unsigned integer to the text stream.

Parameters:

- `value`: The 8-byte unsigned integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `UInt64.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(String, Object) method

```csharp
public virtual void Write (string format, object? arg0);
```

Writes a formatted string to the text stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg0`: The object to format and write.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.
- `FormatException`: `format` is not a valid composite format string.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to the number of objects to be formatted (which, for this method overload, is one).

#### Remarks
This method uses composite formatting to convert the value of an object to its string representation and to embed that representation in a string. .NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about the composite formatting feature, see Composite Formatting.

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about date and time format specifiers, see Standard Date and Time Format Strings and Custom Date and Time Format Strings.

- For more information about enumeration format specifiers, see Enumeration Format Strings.

- For more information about formatting, see Formatting Types.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items, that correspond to an object in the parameter list of this method. The formatting process replaces each format item with the string representation of the value of the corresponding object.

The syntax of a format item is as follows:

{*index*,*length*}

Elements in square brackets are optional. The following table describes each element. For more information about the composite formatting feature, including the syntax of a format item, see Composite Formatting.

|Element|Description|
|-------------|-----------------|
|index|The zero-based position in the parameter list of the object to be formatted. If the object specified by *index* is `null`, the format item is replaced by `Empty`. Because this overload has only a single object in its parameter list, the value of *index* must always be 0. If there is no parameter in the *index* position, a `FormatException` is thrown.|
|,*length*|The minimum number of characters in the string representation of the parameter. If positive, the parameter is right-aligned; if negative, it is left-aligned.|
|:*formatString*|A standard or custom format string that is supported by the object to be formatted. Possible values for *formatString* are the same as the values supported by the object's `ToString(string format)` method. If *formatString* is not specified and the object to be formatted implements the `IFormattable` interface, `null` is passed as the value of the `format` parameter that is used as the `IFormattable.ToString` format string.|

The leading and trailing brace characters, "{" and "}", are required. To specify a single literal brace character in `format`, specify two leading or trailing brace characters; that is, "{{" or "}}".

This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

If a specified object is not referenced in the format string, it is ignored.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(String, Object[]) method

```csharp
public virtual void Write (string format, params object?[] arg);
```

Writes a formatted string to the text stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg`: An object array that contains zero or more objects to format and write.

Exceptions:

- `ArgumentNullException`: `format` or `arg` is `null`.
- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.
- `FormatException`: `format` is not a valid composite format string.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to the length of the `arg` array.

#### Remarks
This method uses composite formatting to convert the value of an object to its string representation and to embed that representation in a string. .NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about the composite formatting feature, see Composite Formatting.

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about date and time format specifiers, see Standard Date and Time Format Strings and Custom Date and Time Format Strings.

- For more information about enumeration format specifiers, see Enumeration Format Strings.

- For more information about formatting, see Formatting Types.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items, that correspond to an object in the parameter list of this method. The formatting process replaces each format item with the string representation of the value of the corresponding object.

The syntax of a format item is as follows:

{*index*,*length*}

Elements in square brackets are optional. The following table describes each element. For more information about the composite formatting feature, including the syntax of a format item, see Composite Formatting.

|Element|Description|
|-------------|-----------------|
|index|The zero-based position in the parameter list of the object to be formatted. If the object specified by *index* is `null`, the format item is replaced by `Empty`. Because this overload has an array in its parameter list, the value of *index* must always be less than the length of the array. If there is no parameter in the *index* position, a `FormatException` is thrown.|
|,*length*|The minimum number of characters in the string representation of the parameter. If positive, the parameter is right-aligned; if negative, it is left-aligned.|
|:*formatString*|A standard or custom format string that is supported by the object to be formatted. Possible values for *formatString* are the same as the values supported by the object's `ToString(string format)` method. If *formatString* is not specified and the object to be formatted implements the `IFormattable` interface, `null` is passed as the value of the `format` parameter that is used as the `IFormattable.ToString` format string.|

The leading and trailing brace characters, "{" and "}", are required. To specify a single literal brace character in `format`, specify two leading or trailing brace characters; that is, "{{" or "}}".

This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

If a specified object is not referenced in the format string, it is ignored.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(String, Object>) method

```csharp
public virtual void Write (string format, scoped ReadOnlySpan<object?> arg);
```

Writes a formatted string to the text stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg`: An object span that contains zero or more objects to format and write.

To be added.
