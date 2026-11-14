---
title: "TextWriter class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/TextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextWriter class (part 4 of 6)

## TextWriter.WriteAsync(Char[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task WriteAsync (char[] buffer, int index, int count);
```

Writes a subarray of characters to the text stream asynchronously.

Parameters:

- `buffer`: The character array to write data from.
- `index`: The character position in the buffer at which to start retrieving data.
- `count`: The number of characters to write.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The `index` plus `count` is greater than the buffer length.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The text writer is currently in use by a previous write operation.

#### Remarks
The `TextWriter` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextWriter.WriteAsync` method, see the `StreamWriter.WriteAsync` method.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## TextWriter.WriteLine() method

```csharp
public virtual void WriteLine ();
```

Writes a line terminator to the text stream.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Boolean) method

```csharp
public virtual void WriteLine (bool value);
```

Writes the text representation of a `Boolean` value to the text stream, followed by a line terminator.

Parameters:

- `value`: The `Boolean` value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Boolean.ToString` method.

This method outputs either `TrueString` or `FalseString`.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Char) method

```csharp
public virtual void WriteLine (char value);
```

Writes a character to the text stream, followed by a line terminator.

Parameters:

- `value`: The character to write to the text stream.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
This overload is equivalent to `Write` followed by `WriteLine` .

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Char[]) method

```csharp
public virtual void WriteLine (char[]? buffer);
```

Writes an array of characters to the text stream, followed by a line terminator.

Parameters:

- `buffer`: The character array from which data is read.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
All the characters in `buffer` are written to the underlying stream. If the character array is `null`, only the line terminator is written.

This overload is equivalent to `Write` followed by `WriteLine` .

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Decimal) method

```csharp
public virtual void WriteLine (decimal value);
```

Writes the text representation of a decimal value to the text stream, followed by a line terminator.

Parameters:

- `value`: The decimal value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The `FormatProvider` property, if not `null`, specifies the culture-specific formatting. For a list of common I/O tasks, see Common I/O Tasks.

The line terminator is defined by the `CoreNewLine` field.

## TextWriter.WriteLine(Double) method

```csharp
public virtual void WriteLine (double value);
```

Writes the text representation of a 8-byte floating-point value to the text stream, followed by a line terminator.

Parameters:

- `value`: The 8-byte floating-point value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The `FormatProvider` property, if not `null`, specifies the culture-specific formatting. For a list of common I/O tasks, see Common I/O Tasks.

The line terminator is defined by the `CoreNewLine` field.

## TextWriter.WriteLine(Int32) method

```csharp
public virtual void WriteLine (int value);
```

Writes the text representation of a 4-byte signed integer to the text stream, followed by a line terminator.

Parameters:

- `value`: The 4-byte signed integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Int32.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Int64) method

```csharp
public virtual void WriteLine (long value);
```

Writes the text representation of an 8-byte signed integer to the text stream, followed by a line terminator.

Parameters:

- `value`: The 8-byte signed integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Int64.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Object) method

```csharp
public virtual void WriteLine (object? value);
```

Writes the text representation of an object to the text stream, by calling the `ToString` method on that object, followed by a line terminator.

Parameters:

- `value`: The object to write. If `value` is `null`, only the line terminator is written.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks

This overload is equivalent to the `Write` overload. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Char>) method

```csharp
public virtual void WriteLine (ReadOnlySpan<char> buffer);
```

Writes the text representation of a character span to the text stream, followed by a line terminator.

Parameters:

- `buffer`: The char span value to write to the text stream.

#### Remarks

The text representation of the specified value is produced by calling the ReadOnlySpan\<Char>.ToString method.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Single) method

```csharp
public virtual void WriteLine (float value);
```

Writes the text representation of a 4-byte floating-point value to the text stream, followed by a line terminator.

Parameters:

- `value`: The 4-byte floating-point value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks

The `FormatProvider` property, if not `null`, specifies the culture-specific formatting. For a list of common I/O tasks, see Common I/O Tasks.

The line terminator is defined by the `CoreNewLine` field.

## TextWriter.WriteLine(String) method

```csharp
public virtual void WriteLine (string? value);
```

Writes a string to the text stream, followed by a line terminator.

Parameters:

- `value`: The string to write. If `value` is `null`, only the line terminator is written.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks

This overload is equivalent to the `Write` overload.

The line terminator is defined by the `CoreNewLine` field.

This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(Rune) method

```csharp
public virtual void WriteLine (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## TextWriter.WriteLine(StringBuilder) method

```csharp
public virtual void WriteLine (System.Text.StringBuilder? value);
```

Writes the text representation of a string builder to the text stream, followed by a line terminator.

Parameters:

- `value`: The string, as a string builder, to write to the text stream.

#### Remarks

The text representation of the specified value is produced by calling the `StringBuilder.ToString` method.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(UInt32) method

```csharp
public virtual void WriteLine (uint value);
```

Writes the text representation of a 4-byte unsigned integer to the text stream, followed by a line terminator.

Parameters:

- `value`: The 4-byte unsigned integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `UInt32.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(UInt64) method

```csharp
public virtual void WriteLine (ulong value);
```

Writes the text representation of an 8-byte unsigned integer to the text stream, followed by a line terminator.

Parameters:

- `value`: The 8-byte unsigned integer to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `UInt64.ToString` method. The `FormatProvider` property, if not `null`, specifies the culture-specific formatting.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(String, Object) method

```csharp
public virtual void WriteLine (string format, object? arg0);
```

Writes a formatted string and a new line to the text stream, using the same semantics as the `String.Format` method.

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

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.
