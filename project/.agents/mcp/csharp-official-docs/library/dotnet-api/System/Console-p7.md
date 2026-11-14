---
title: "Console class (part 7 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 7 of 10)

## Console.SetWindowPosition(Int32, Int32) method

```csharp
public static void SetWindowPosition (int left, int top);
```

Sets the position of the console window relative to the screen buffer.

Parameters:

- `left`: The column position of the upper left  corner of the console window.
- `top`: The row position of the upper left corner of the console window.

Exceptions:

- `ArgumentOutOfRangeException`: `left` or `top` is less than zero.

-or-

`left` + `Console.WindowWidth` is greater than `Console.BufferWidth`.

-or-

`top` + `Console.WindowHeight` is greater than `Console.BufferHeight`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The current operating system is not Windows.

#### Remarks
The operating system window displays the console window, and the console window displays a portion of the screen buffer. The `Console.SetWindowPosition` method affects the position of the console window relative to the screen buffer, but does not affect the position of the operating system window relative to the desktop.

The console and operating system windows generally do not affect each other. However, if the screen buffer cannot be displayed in the current boundaries of the console window, the operating system automatically appends scroll bars to the operating system window. In that case, moving the operating system window scroll bars affects the position of the console window, and moving the console window with the `Console.SetWindowPosition` method affects the position of the operating system window scroll bars.

#### Examples
The following example demonstrates the `Console.WindowLeft`, `Console.WindowTop`, `Console.WindowWidth`, `Console.WindowHeight`, `Console.BufferWidth`, `Console.BufferHeight`, and `Console.CursorVisible` properties; and the `Console.SetWindowPosition`, `Console.SetBufferSize`, and `Console.ReadKey` methods. The example draws a grid pattern in the screen buffer based on the screen buffer width. Then the example moves the console window in response to which of the UP ARROW, DOWN ARROW, LEFT ARROW, or RIGHT ARROW console keys is pressed. The grid pattern helps you see the movement of the console window relative to the screen buffer.

_Code sample not included: ~/snippets/csharp/System/Console/SetBufferSize/wlt.cs._

## Console.SetWindowSize(Int32, Int32) method

```csharp
public static void SetWindowSize (int width, int height);
```

Sets the height and width of the console window to the specified values.

Parameters:

- `width`: The width of the console window measured in columns.
- `height`: The height of the console window measured in rows.

Exceptions:

- `ArgumentOutOfRangeException`: `width` or `height` is less than or equal to zero.

-or-

`width` plus `Console.WindowLeft` or `height` plus `Console.WindowTop` is greater than or equal to <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

-or-

`width` or `height` is greater than the largest possible window width or height for the current screen resolution and console font.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The current operating system is not Windows.

#### Examples
This example demonstrates the `Console.SetWindowSize` method, and the `Console.WindowWidth` and `Console.WindowHeight` properties. You must run the example to see the full effect of changing the console window size.

The example reports the dimensions of a console window set to 85 columns and 43 rows, then waits for a key to be pressed. When any key is pressed, the dimensions of the console window are halved, the new dimensions are reported, and the example waits for another key press. Finally, when any key is pressed, the console window is restored to its original dimensions and the example terminates.

_Code sample not included: ~/snippets/csharp/System/Console/SetWindowSize/sws.cs._

## Console.Write(Boolean) method

```csharp
public static void Write (bool value);
```

Writes the text representation of the specified Boolean value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling `Boolean.ToString`, which outputs either `TrueString` or `FalseString`.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(Char) method

```csharp
public static void Write (char value);
```

Writes the specified Unicode character value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(Char[]) method

```csharp
public static void Write (char[]? buffer);
```

Writes the specified array of Unicode characters to the standard output stream.

Parameters:

- `buffer`: A Unicode character array.

Exceptions:

- `IOException`: An I/O error occurred.

To be added.

## Console.Write(Decimal) method

```csharp
public static void Write (decimal value);
```

Writes the text representation of the specified `Decimal` value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling `Decimal.ToString`.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(Double) method

```csharp
public static void Write (double value);
```

Writes the text representation of the specified double-precision floating-point value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Double.ToString` method.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(Int32) method

```csharp
public static void Write (int value);
```

Writes the text representation of the specified 32-bit signed integer value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Int32.ToString` method.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(Int64) method

```csharp
public static void Write (long value);
```

Writes the text representation of the specified 64-bit signed integer value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Int64.ToString` method.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(Object) method

```csharp
public static void Write (object? value);
```

Writes the text representation of the specified object to the standard output stream.

Parameters:

- `value`: The value to write, or `null`.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
If `value` is `null`, nothing is written and no exception is thrown. Otherwise, the `ToString` method of `value` is called to produce its string representation, and the resulting string is written to the standard output stream.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(Char>) method

```csharp
public static void Write (ReadOnlySpan<char> value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.

## Console.Write(Single) method

```csharp
public static void Write (float value);
```

Writes the text representation of the specified single-precision floating-point value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `Single.ToString` method.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(String) method

```csharp
public static void Write (string? value);
```

Writes the specified string value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
If value is `null`, nothing is written to the standard output stream.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(UInt32) method

```csharp
public static void Write (uint value);
```

Writes the text representation of the specified 32-bit unsigned integer value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `UInt32.ToString` method.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(UInt64) method

```csharp
public static void Write (ulong value);
```

Writes the text representation of the specified 64-bit unsigned integer value to the standard output stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The text representation of `value` is produced by calling the `UInt64.ToString` method.

#### Examples
The following example illustrates the use of the `Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._

## Console.Write(String, Object) method

```csharp
public static void Write (string format, object? arg0);
```

Writes the text representation of the specified object to the standard output stream using the specified format information.

Parameters:

- `format`: A composite format string.
- `arg0`: An object to write using `format`.

Exceptions:

- `IOException`: An I/O error occurred.
- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The format specification in `format` is invalid.

#### Remarks
This method uses the composite formatting feature of the .NET to convert the value of an object to its text representation and embed that representation in a string. The resulting string is written to the output stream.

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

The following example illustrates the use of the `Console.Write` method.

_Code sample not included: ~/snippets/csharp/System/Console/Write/reformat.cs._
