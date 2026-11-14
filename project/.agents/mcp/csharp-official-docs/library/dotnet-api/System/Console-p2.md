---
title: "Console class (part 2 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 2 of 10)

## Console.BackgroundColor property

```csharp
public static ConsoleColor BackgroundColor { get; set; }
```

Gets or sets the background color of the console.

Returns: A value that specifies the background color of the console; that is, the color that appears behind each character. The default is black.

Exceptions:

- `ArgumentException`: The color specified in a set operation is not a valid member of `ConsoleColor`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.

#### Remarks
A change to the `BackgroundColor` property affects only output that is written to individual character cells after the background color is changed. To change the background color of the console window as a whole, set the `BackgroundColor` property and call the `Console.Clear` method. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/Console/BackgroundColor/backgroundcolor1.cs._

A get operation for a Windows-based application, in which a console does not exist, returns `Black`.
Unix systems don't provide any general mechanism to fetch the current console colors. Because of that, `Console.BackgroundColor` returns `(ConsoleColor)-1` until it is set in explicit way (using the setter).

#### Examples
The following example saves the values of the `ConsoleColor` enumeration to an array and stores the current values of the `Console.BackgroundColor` and `Console.ForegroundColor` properties to variables. It then changes the foreground color to each color in the `ConsoleColor` enumeration except to the color that matches the current background, and it changes the background color to each color in the `ConsoleColor` enumeration except to the color that matches the current foreground. (If the foreground color is the same as the background color, the text isn't visible.) Finally, it calls the `Console.ResetColor` method to restore the original console colors.

_Code sample not included: ~/snippets/csharp/System/Console/BackgroundColor/foregroundcolor3.cs._

## Console.BufferHeight property

```csharp
public static int BufferHeight { get; set; }
```

Gets or sets the height of the buffer area.

Returns: The current height, in rows, of the buffer area.

Exceptions:

- `ArgumentOutOfRangeException`: The value in a set operation is less than or equal to zero.

-or-

The value in a set operation is greater than or equal to <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

-or-

The value in a set operation is less than `Console.WindowTop` + `Console.WindowHeight`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The set operation is invoked on an operating system other than Windows.

#### Remarks
This property defines the number of rows (or lines) stored in the buffer that is accessed by a console mode window. In contrast, the `WindowHeight` property defines the number of rows that are actually displayed in the console window at any particular time. If the number of rows actually written to the buffer exceeds the number of rows defined by the `WindowHeight` property, the window can be scrolled vertically so that it displays a contiguous number of rows that are equal to the `WindowHeight` property and are located anywhere in the buffer.

If a set operation decreases the value of the `BufferHeight` property, the uppermost lines are removed. For example, if the number of lines is reduced from 300 to 250, lines 0 through 49 are removed, and the existing lines 50 through 299 become lines 0 through 249.

#### Examples
This example demonstrates the `Console.BufferHeight` and `Console.BufferWidth` properties. The example reports the dimensions of an operating system window set to a buffer size of 300 rows and 85 columns.

_Code sample not included: ~/snippets/csharp/System/Console/BufferHeight/hw.cs._

## Console.BufferWidth property

```csharp
public static int BufferWidth { get; set; }
```

Gets or sets the width of the buffer area.

Returns: The current width, in columns, of the buffer area.

Exceptions:

- `ArgumentOutOfRangeException`: The value in a set operation is less than or equal to zero.

-or-

The value in a set operation is greater than or equal to <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

-or-

The value in a set operation is less than `Console.WindowLeft` + `Console.WindowWidth`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The set operation is invoked on an operating system other than Windows.

#### Remarks
If a set operation decreases the value of the `BufferWidth` property, the rightmost columns are removed. For example, if the number of columns is reduced from 80 to 60, columns 60 through 79 of each row are removed.

#### Examples
This example demonstrates the `Console.BufferHeight` and `Console.BufferWidth` properties. The example reports the dimensions of an operating system window set to a buffer size of 300 rows and 85 columns.

_Code sample not included: ~/snippets/csharp/System/Console/BufferHeight/hw.cs._

## Console.CapsLock property

```csharp
public static bool CapsLock { get; }
```

Gets a value indicating whether the CAPS LOCK keyboard toggle is turned on or turned off.

Returns: `true` if CAPS LOCK is turned on; `false` if CAPS LOCK is turned off.

Exceptions:

- `PlatformNotSupportedException`: The get operation is invoked on an operating system other than Windows.

To be added.

## Console.CursorLeft property

```csharp
public static int CursorLeft { get; set; }
```

Gets or sets the column position of the cursor within the buffer area.

Returns: The current position, in columns, of the cursor.

Exceptions:

- `ArgumentOutOfRangeException`: The value in a set operation is less than zero.

-or-

The value in a set operation is greater than or equal to `Console.BufferWidth`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.

#### Examples
This example demonstrates the `Console.CursorLeft` and `Console.CursorTop` properties, and the `Console.SetCursorPosition` and `Console.Clear` methods. The example positions the cursor, which determines where the next write will occur, to draw a 5 character by 5 character rectangle using a combination of "+", "|", and "-" strings. Note that the rectangle could be drawn with fewer steps using a combination of other strings.

_Code sample not included: ~/snippets/csharp/System/Console/Clear/lts.cs._

## Console.CursorSize property

```csharp
public static int CursorSize { get; set; }
```

Gets or sets the height of the cursor within a character cell.

Returns: The size of the cursor expressed as a percentage of the height of a character cell. The property value ranges from 1 to 100.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified in a set operation is less than 1 or greater than 100.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The set operation is invoked on an operating system other than Windows.

#### Remarks
The cursor appearance varies, ranging from a horizontal line at the bottom of the cell when the property value is 1, to completely filling the cell when the property value is 100.

#### Examples
This example demonstrates the `CursorSize` property. The example increases the size of the cursor each time any console key is pressed, then restores the cursor to its original size before terminating.

_Code sample not included: ~/snippets/csharp/System/Console/CursorSize/csize.cs._

## Console.CursorTop property

```csharp
public static int CursorTop { get; set; }
```

Gets or sets the row position of the cursor within the buffer area.

Returns: The current position, in rows, of the cursor.

Exceptions:

- `ArgumentOutOfRangeException`: The value in a set operation is less than zero.

-or-

The value in a set operation is greater than or equal to `Console.BufferHeight`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.

#### Examples
This example demonstrates the `Console.CursorLeft` and `Console.CursorTop` properties, and the `Console.SetCursorPosition` and `Console.Clear` methods. The example positions the cursor, which determines where the next write will occur, to draw a 5 character by 5 character rectangle using a combination of "+", "|", and "-" strings. Note that the rectangle could be drawn with fewer steps using a combination of other strings.

_Code sample not included: ~/snippets/csharp/System/Console/Clear/lts.cs._

## Console.CursorVisible property

```csharp
public static bool CursorVisible { get; set; }
```

Gets or sets a value indicating whether the cursor is visible.

Returns: `true` if the cursor is visible; otherwise, `false`.

Exceptions:

- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The get operation is invoked on an operating system other than Windows.

#### Examples
This example demonstrates the `CursorVisible` property. The example makes the cursor visible if the first column of input is a '+' character or invisible if the input is a '-' character.

_Code sample not included: ~/snippets/csharp/System/Console/CursorVisible/vis.cs._

## Console.Error property

```csharp
public static System.IO.TextWriter Error { get; }
```

Gets the standard error output stream.

Returns: A `TextWriter` that represents the standard error output stream.

#### Remarks
This standard error stream is set to the console by default. It can be set to another stream with the `Console.SetError` method. After the standard error stream is redirected, it can be reacquired by calling the `Console.OpenStandardError` method.

In console applications whose informational output is often redirected to a file, the standard error stream available through the `Error` property can be used to display information to the console even if output is redirected. The following example displays product tables for 10 numbers at a time starting with 1. After every set of 10 numbers, the `Error` property is used to ask the user whether to display the next set. If the standard output is redirected to a file, the user is still asked whether the routine should generate the next set of products.

_Code sample not included: ~/snippets/csharp/System/Console/Error/error1.cs._

#### Examples
The following example is a command line utility named ExpandTabs that replaces tab characters in a text file with four spaces, the value defined by the `tabSize` variable. It redirects the standard input and output streams to files, but uses the `Error` property to write the standard error stream to the console. It can be launched from the command line by supplying the name of the file that contains tab characters and the name of the output file.

_Code sample not included: ~/snippets/csharp/System/Console/Error/expandtabsex.cs._

The following example is a simple text file viewer that displays the contents of one or more text files to the console. If there are no command line arguments, or if any files passed as command line arguments do not exist, the example calls the `Console.SetError` method to redirect error information to a file, calls the `Console.OpenStandardError` method in the process of reacquiring the standard error stream, and indicates that error information was written to a file.

_Code sample not included: ~/snippets/csharp/System/Console/Error/viewtextfile.cs._

Note that the `AutoFlush` property is set to `true` before reacquiring the error stream. This ensures that output will be sent to the console immediately rather than buffered.

## Console.ForegroundColor property

```csharp
public static ConsoleColor ForegroundColor { get; set; }
```

Gets or sets the foreground color of the console.

Returns: A `ConsoleColor` that specifies the foreground color of the console; that is, the color of each character that is displayed. The default is gray.

Exceptions:

- `ArgumentException`: The color specified in a set operation is not a valid member of `ConsoleColor`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.

#### Remarks
A get operation for a Windows-based application, in which a console does not exist, returns `Gray`.
Unix systems don't provide any general mechanism to fetch the current console colors. Because of that, `Console.ForegroundColor` returns `(ConsoleColor)-1` until it is set in explicit way (using the setter).

#### Examples
The following example checks whether the console's background color is black and, if it is, it changes the background color to red and the foreground color to black.

_Code sample not included: ~/snippets/csharp/System/Console/BackgroundColor/Example2.cs._

The following example saves the values of the `ConsoleColor` enumeration to an array and stores the current values of the `Console.BackgroundColor` and `Console.ForegroundColor` properties to variables. It then changes the foreground color to each color in the `ConsoleColor` enumeration except to the color that matches the current background, and it changes the background color to each color in the `ConsoleColor` enumeration except to the color that matches the current foreground. (If the foreground color is the same as the background color, the text isn't visible.) Finally, it calls the `Console.ResetColor` method to restore the original console colors.

_Code sample not included: ~/snippets/csharp/System/Console/BackgroundColor/foregroundcolor3.cs._

## Console.In property

```csharp
public static System.IO.TextReader In { get; }
```

Gets the standard input stream.

Returns: A `TextReader` that represents the standard input stream.

#### Remarks
This property is set to the standard input stream by default. This property can be set to another stream with the `Console.SetIn` method.

Read operations on the standard input stream execute synchronously. That is, they block until the specified read operation has completed. This is true even if an asynchronous method, such as `TextReader.ReadLineAsync`, is called on the `TextReader` object returned by the `In` property.

#### Examples
The following sample illustrates the use of the `In` property.

_Code sample not included: ~/snippets/csharp/System/Console/In/consolein.cs._
