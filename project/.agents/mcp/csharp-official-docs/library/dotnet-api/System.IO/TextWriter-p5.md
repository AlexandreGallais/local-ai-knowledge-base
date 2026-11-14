---
title: "TextWriter class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/TextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextWriter class (part 5 of 6)

## TextWriter.WriteLine(String, Object[]) method

```csharp
public virtual void WriteLine (string format, params object?[] arg);
```

Writes out a formatted string and a new line to the text stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg`: An object array that contains zero or more objects to format and write.

Exceptions:

- `ArgumentNullException`: A string or object is passed in as `null`.
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

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(String, Object>) method

```csharp
public virtual void WriteLine (string format, scoped ReadOnlySpan<object?> arg);
```

Writes out a formatted string and a new line to the text stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg`: An object span that contains zero or more objects to format and write.

To be added.

## TextWriter.WriteLine(Char[], Int32, Int32) method

```csharp
public virtual void WriteLine (char[] buffer, int index, int count);
```

Writes a subarray of characters to the text stream, followed by a line terminator.

Parameters:

- `buffer`: The character array from which data is read.
- `index`: The character position in `buffer` at which to start reading data.
- `count`: The maximum number of characters to write.

Exceptions:

- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentNullException`: The `buffer` parameter is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
This method will write `count` characters of data into this `TextWriter` from the `buffer` character array starting at position `index`.

This overload is equivalent to calling the `Write` method followed by `TextWriter.WriteLine` for each character in `buffer` between `index` and (`index` + `count`).

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(String, Object, Object) method

```csharp
public virtual void WriteLine (string format, object? arg0, object? arg1);
```

Writes a formatted string and a new line to the text stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format and write.
- `arg1`: The second object to format and write.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.
- `FormatException`: `format` is not a valid composite format string.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to the number of objects to be formatted (which, for this method overload, is two).

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
|index|The zero-based position in the parameter list of the object to be formatted. If the object specified by *index* is `null`, the format item is replaced by `Empty`. Because this overload has two objects in its parameter list, the value of *index* must always be 0 or 1. If there is no parameter in the *index* position, a `FormatException` is thrown.|
|,*length*|The minimum number of characters in the string representation of the parameter. If positive, the parameter is right-aligned; if negative, it is left-aligned.|
|:*formatString*|A standard or custom format string that is supported by the object to be formatted. Possible values for *formatString* are the same as the values supported by the object's `ToString(string format)` method. If *formatString* is not specified and the object to be formatted implements the `IFormattable` interface, `null` is passed as the value of the `format` parameter that is used as the `IFormattable.ToString` format string.|

The leading and trailing brace characters, "{" and "}", are required. To specify a single literal brace character in `format`, specify two leading or trailing brace characters; that is, "{{" or "}}".

This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

If a specified object is not referenced in the format string, it is ignored.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLine(String, Object, Object, Object) method

```csharp
public virtual void WriteLine (string format, object? arg0, object? arg1, object? arg2);
```

Writes out a formatted string and a new line to the text stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format and write.
- `arg1`: The second object to format and write.
- `arg2`: The third object to format and write.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.
- `FormatException`: `format` is not a valid composite format string.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to the number of objects to be formatted (which, for this method overload, is three).

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
|index|The zero-based position in the parameter list of the object to be formatted. If the object specified by *index* is `null`, the format item is replaced by `Empty`. Because this overload has three objects in its parameter list, the value of *index* must always be 0, 1, or 2. If there is no parameter in the *index* position, a `FormatException` is thrown.|
|,*length*|The minimum number of characters in the string representation of the parameter. If positive, the parameter is right-aligned; if negative, it is left-aligned.|
|:*formatString*|A standard or custom format string that is supported by the object to be formatted. Possible values for *formatString* are the same as the values supported by the object's `ToString(string format)` method. If *formatString* is not specified and the object to be formatted implements the `IFormattable` interface, `null` is passed as the value of the `format` parameter that is used as the `IFormattable.ToString` format string.|

The leading and trailing brace characters, "{" and "}", are required. To specify a single literal brace character in `format`, specify two leading or trailing brace characters; that is, "{{" or "}}".

This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

If a specified object is not referenced in the format string, it is ignored.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.WriteLineAsync() method

```csharp
public virtual System.Threading.Tasks.Task WriteLineAsync ();
```

Asynchronously writes a line terminator to the text stream.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The text writer is currently in use by a previous write operation.

#### Remarks

The line terminator is defined by the `CoreNewLine` field.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteLine`.

## TextWriter.WriteLineAsync(Char) method

```csharp
public virtual System.Threading.Tasks.Task WriteLineAsync (char value);
```

Asynchronously writes a character to the text stream, followed by a line terminator.

Parameters:

- `value`: The character to write to the text stream.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The text writer is currently in use by a previous write operation.

#### Remarks
The line terminator is defined by the `CoreNewLine` field.

The `TextWriter` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextWriter.WriteLineAsync` method, see the `StreamWriter.WriteLineAsync` method.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteLine`.
