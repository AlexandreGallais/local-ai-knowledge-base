---
title: "Console class (part 4 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 4 of 10)

## Console.WindowTop property

```csharp
public static int WindowTop { get; set; }
```

Gets or sets the top position of the console window area relative to the screen buffer.

Returns: The uppermost console window position measured in rows.

Exceptions:

- `ArgumentOutOfRangeException`: In a set operation, the value to be assigned is less than zero.

-or-

As a result of the assignment, `Console.WindowTop` plus `Console.WindowHeight` would exceed `Console.BufferHeight`.
- `IOException`: Error reading or writing information.
- `PlatformNotSupportedException`: The set operation is invoked on an operating system other than Windows.

#### Remarks
The console represents a rectangular window into a larger rectangular buffer area. Both the window and the buffer are measured vertically by their number of rows and horizontally by their number of columns. The dimensions of the buffer area are defined by the `Console.BufferHeight` and `Console.BufferWidth` properties. The dimensions of the console area are defined by the `Console.WindowHeight` and `Console.WindowWidth` properties. The `WindowTop` property determines which row of the buffer area is displayed in the first column of the console window. The value of the `WindowTop` property can range from 0 to `Console.BufferHeight` - `Console.WindowHeight`. Attempting to set it to a value outside that range throws an `ArgumentOutOfRangeException`.

Attempting to set the value of the `WindowTop` property when output is redirected throws an `IOException` exception. To prevent the exception, you can set the value of this property only if the `IsOutputRedirected` property returns `false`.

#### Examples
The following example demonstrates the `Console.WindowLeft`, `Console.WindowTop`, `Console.WindowWidth`, `Console.WindowHeight`, `Console.BufferWidth`, `Console.BufferHeight`, and `Console.CursorVisible` properties; and the `Console.SetWindowPosition`, `Console.SetBufferSize`, and `Console.ReadKey` methods. The example draws a grid pattern in the screen buffer based on the screen buffer width. Then the example moves the console window in response to which of the UP ARROW, DOWN ARROW, LEFT ARROW, or RIGHT ARROW console keys is pressed. The grid pattern helps you see the movement of the console window relative to the screen buffer.

_Code sample not included: ~/snippets/csharp/System/Console/SetBufferSize/wlt.cs._

## Console.WindowWidth property

```csharp
public static int WindowWidth { get; set; }
```

Gets or sets the width of the console window.

Returns: The width of the console window measured in columns.

Exceptions:

- `ArgumentOutOfRangeException`: The value of the `Console.WindowWidth` property or the value of the `Console.WindowHeight` property is less than or equal to 0.

-or-

The value of the `Console.WindowHeight` property plus the value of the `Console.WindowTop` property is greater than or equal to <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

-or-

The value of the `Console.WindowWidth` property or the value of the `Console.WindowHeight` property is greater than the largest possible window width or height for the current screen resolution and console font.
- `IOException`: Error reading or writing information.
- `PlatformNotSupportedException`: The set operation is invoked on an operating system other than Windows.

#### Remarks
Attempting to set the value of the `WindowWidth` property when output is redirected throws either an `ArgumentOutOfRangeException` or an `IOException` exception. To prevent an exception, you can set the value of this property only if the `IsOutputRedirected` property returns `false`.

#### Examples
This example demonstrates the `Console.SetWindowSize` method, and the `Console.WindowWidth` and `Console.WindowHeight` properties. You must run the example to see the full effect of changing the console window size.

The example reports the dimensions of a console window set to 85 columns and 43 rows, then waits for a key press. When any key is pressed, the dimensions of the console window are halved, the new dimensions are reported, and the example waits for another key press. Finally, when any key is pressed the console window is restored to its original dimensions and the example terminates.

_Code sample not included: ~/snippets/csharp/System/Console/SetWindowSize/sws.cs._

## Console.Beep() method

```csharp
public static void Beep ();
```

Plays the sound of a beep through the console speaker.

Exceptions:

- `HostProtectionException`: This method was executed on a server, such as SQL Server, that does not permit access to a user interface.

#### Remarks
By default, the beep plays at a frequency of 800 hertz for a duration of 200 milliseconds.

`Console.Beep` wraps a call to the Windows Beep function. Whether `Console.Beep` produces a sound on versions of Windows before Windows 7 depends on the presence of a 8254 programmable interval timer chip. Starting with Windows 7, it depends on the default sound device.

#### Examples
The following example demonstrates the `Console.Beep` method. The example accepts a number from 1 through 9 as a command line argument, and plays the beep that number of times.

_Code sample not included: ~/snippets/csharp/System/Console/Beep/beep.cs._

## Console.Beep(Int32, Int32) method

```csharp
public static void Beep (int frequency, int duration);
```

Plays the sound of a beep of a specified frequency and duration through the console speaker.

Parameters:

- `frequency`: The frequency of the beep, ranging from 37 to 32767 hertz.
- `duration`: The duration of the beep measured in milliseconds.

Exceptions:

- `ArgumentOutOfRangeException`: `frequency` is less than 37 or more than 32767 hertz.

-or-

`duration` is less than or equal to zero.
- `HostProtectionException`: This method was executed on a server, such as SQL Server, that does not permit access to the console.
- `PlatformNotSupportedException`: The current operating system is not Windows.

#### Remarks
`Console.Beep` wraps a call to the Windows Beep function. Whether `Console.Beep` produces a sound on versions of Windows before Windows 7 depends on the presence of a 8254 programmable interval timer chip. Starting with Windows 7, it depends on the default sound device.

#### Examples
This example demonstrates the `Console.Beep` method by playing the first few notes of a song through the console speaker.

_Code sample not included: ~/snippets/csharp/System/Console/Beep/b2.cs._

## Console.Clear() method

```csharp
public static void Clear ();
```

Clears the console buffer and corresponding console window of display information.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
Using the `Console.Clear` method is equivalent invoking the MS-DOS `cls` command in the command prompt window. When the `Console.Clear` method is called, the cursor automatically scrolls to the top-left corner of the window and the contents of the screen buffer are set to blanks using the current foreground background colors.

> **Note:**
>  Attempting to call the `Console.Clear` method when a console application's output is redirected to a file throws a `IOException`. To prevent this, always wrap a call to the `Console.Clear` method in a `try`…`catch` block.

#### Examples
The following example uses the `Console.Clear` method to clear the console before it executes a loop, prompts the user to select a foreground and background color and to enter a string to display. If the user chooses not to exit the program, the console's original foreground and background colors are restored and the `Console.Clear` method is called again before re-executing the loop.

_Code sample not included: ~/snippets/csharp/System/Console/Clear/clear1.cs._

The example relies on a `GetKeyPress` method to validate the user's selection of a foreground and background color.

This example demonstrates the `Console.CursorLeft` and `Console.CursorTop` properties, and the `Console.SetCursorPosition` and `Console.Clear` methods. The example positions the cursor, which determines where the next write will occur, to draw a 5 character by 5 character rectangle using a combination of "+", "|", and "-" strings. Note that the rectangle could be drawn with fewer steps using a combination of other strings.

_Code sample not included: ~/snippets/csharp/System/Console/Clear/lts.cs._

## Console.GetCursorPosition() method

```csharp
public static (int Left, int Top) GetCursorPosition ();
```

Gets the position of the cursor.

Returns: The column and row position of the cursor.

Columns are numbered from left to right starting at 0. Rows are numbered from top to bottom starting at 0.

## Console.MoveBufferArea(Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public static void MoveBufferArea (int sourceLeft, int sourceTop, int sourceWidth, int sourceHeight, int targetLeft, int targetTop);
```

Copies a specified source area of the screen buffer to a specified destination area.

Parameters:

- `sourceLeft`: The leftmost column of the source area.
- `sourceTop`: The topmost row of the source area.
- `sourceWidth`: The number of columns in the source area.
- `sourceHeight`: The number of rows in the source area.
- `targetLeft`: The leftmost column of the destination area.
- `targetTop`: The topmost row of the destination area.

Exceptions:

- `ArgumentOutOfRangeException`: One or more of the parameters is less than zero.

-or-

`sourceLeft` or `targetLeft` is greater than or equal to `Console.BufferWidth`.

-or-

`sourceTop` or `targetTop` is greater than or equal to `Console.BufferHeight`.

-or-

`sourceTop` + `sourceHeight` is greater than or equal to `Console.BufferHeight`.

-or-

`sourceLeft` + `sourceWidth` is greater than or equal to `Console.BufferWidth`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The current operating system is not Windows.

#### Remarks
If the destination and source parameters specify a position located outside the boundaries of the current screen buffer, only the portion of the source area that fits within the destination area is copied. That is, the source area is clipped to fit the current screen buffer.

The `Console.MoveBufferArea` method copies the source area to the destination area. If the destination area does not intersect the source area, the source area is filled with blanks using the current foreground and background colors. Otherwise, the intersected portion of the source area is not filled.

## Console.MoveBufferArea(Int32, Int32, Int32, Int32, Int32, Int32, Char, ConsoleColor, ConsoleColor) method

```csharp
public static void MoveBufferArea (int sourceLeft, int sourceTop, int sourceWidth, int sourceHeight, int targetLeft, int targetTop, char sourceChar, ConsoleColor sourceForeColor, ConsoleColor sourceBackColor);
```

Copies a specified source area of the screen buffer to a specified destination area.

Parameters:

- `sourceLeft`: The leftmost column of the source area.
- `sourceTop`: The topmost row of the source area.
- `sourceWidth`: The number of columns in the source area.
- `sourceHeight`: The number of rows in the source area.
- `targetLeft`: The leftmost column of the destination area.
- `targetTop`: The topmost row of the destination area.
- `sourceChar`: The character used to fill the source area.
- `sourceForeColor`: The foreground color used to fill the source area.
- `sourceBackColor`: The background color used to fill the source area.

Exceptions:

- `ArgumentOutOfRangeException`: One or more of the parameters is less than zero.

-or-

`sourceLeft` or `targetLeft` is greater than or equal to `Console.BufferWidth`.

-or-

`sourceTop` or `targetTop` is greater than or equal to `Console.BufferHeight`.

-or-

`sourceTop` + `sourceHeight` is greater than or equal to `Console.BufferHeight`.

-or-

`sourceLeft` + `sourceWidth` is greater than or equal to `Console.BufferWidth`.
- `ArgumentException`: One or both of the color parameters is not a member of the `ConsoleColor` enumeration.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The current operating system is not Windows.

#### Remarks
If the destination and source parameters specify a position located beyond the boundaries of the current screen buffer, only the portion of the source area that fits within the destination area is copied. That is, the source area is clipped to fit the current screen buffer.

The `Console.MoveBufferArea` method copies the source area to the destination area. If the destination area does not intersect the source area, the source area is filled with the character specified by `sourceChar`, using the colors specified by `sourceForeColor` and `sourceBackColor`. Otherwise, the intersected portion of the source area is not filled.

The `Console.MoveBufferArea` method performs no operation if `sourceWidth` or `sourceHeight` is zero.

## Console.OpenStandardError() method

```csharp
public static System.IO.Stream OpenStandardError ();
```

Acquires the standard error stream.

Returns: The standard error stream.

#### Remarks
This method can be used to reacquire the standard error stream after it has been changed by the `Console.SetError` method.

#### Examples
The following example is a simple text file viewer that displays the contents of one or more text files to the console. If there are no command line arguments, or if any files passed as command line arguments do not exist, the example calls the `Console.SetError` method to redirect error information to a file, calls the `Console.OpenStandardError` method in the process of reacquiring the standard error stream, and indicates that error information was written to a file.

_Code sample not included: ~/snippets/csharp/System/Console/Error/viewtextfile.cs._

Note that the `AutoFlush` property is set to `true` before reacquiring the error stream. This ensures that output will be sent to the console immediately rather than buffered.

## Console.OpenStandardError(Int32) method

```csharp
public static System.IO.Stream OpenStandardError (int bufferSize);
```

Acquires the standard error stream, which is set to a specified buffer size.

Parameters:

- `bufferSize`: This parameter has no effect, but its value must be greater than or equal to zero.

Returns: The standard error stream.

Exceptions:

- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero.

This method can be used to reacquire the standard error stream after it has been changed by the `Console.SetError` method.
