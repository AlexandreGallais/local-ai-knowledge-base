---
title: "Console class (part 3 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 3 of 10)

## Console.InputEncoding property

```csharp
public static System.Text.Encoding InputEncoding { get; set; }
```

Gets or sets the encoding the console uses to read input.

Returns: The encoding used to read console input.

Exceptions:

- `ArgumentNullException`: The property value in a set operation is `null`.
- `IOException`: An error occurred during the execution of this operation.
- `SecurityException`: Your application does not have permission to perform this operation.

#### Remarks
The console uses the input encoding to translate keyboard input into a corresponding character. The input encoding incorporates a code page that maps 256 keyboard character codes to individual characters. Different code pages include different special characters, typically customized for a language or a group of languages.

A property get operation might return a cached value instead of the console's current input encoding. This can occur if the value of the `InputEncoding` property is modified by some means other than an assignment to the `InputEncoding` property, such as calling the Windows `SetConsoleCP` function or using the `chcp` command from a PowerShell script.

## Console.IsErrorRedirected property

```csharp
public static bool IsErrorRedirected { get; }
```

Gets a value that indicates whether the error output stream has been redirected from the standard error stream.

Returns: `true` if error output is redirected; otherwise, `false`.

To be added.

## Console.IsInputRedirected property

```csharp
public static bool IsInputRedirected { get; }
```

Gets a value that indicates whether input has been redirected from the standard input stream.

Returns: `true` if input is redirected; otherwise, `false`.

To be added.

## Console.IsOutputRedirected property

```csharp
public static bool IsOutputRedirected { get; }
```

Gets a value that indicates whether output has been redirected from the standard output stream.

Returns: `true` if output is redirected; otherwise, `false`.

To be added.

## Console.KeyAvailable property

```csharp
public static bool KeyAvailable { get; }
```

Gets a value indicating whether a key press is available in the input stream.

Returns: `true` if a key press is available; otherwise, `false`.

Exceptions:

- `IOException`: An I/O error occurred.
- `InvalidOperationException`: Standard input is redirected to a file instead of the keyboard.

#### Remarks
The property value is returned immediately; that is, the `KeyAvailable` property does not block input until a key press is available.

Use the `KeyAvailable` property in conjunction with only the `Console.ReadKey` method, not the `Console.Read` or `Console.ReadLine` methods.

#### Examples
The following example demonstrates how to use the `KeyAvailable` property to create a loop that runs until a key is pressed.

_Code sample not included: ~/snippets/csharp/System/Console/KeyAvailable/ka.cs._

## Console.LargestWindowHeight property

```csharp
public static int LargestWindowHeight { get; }
```

Gets the largest possible number of console window rows, based on the current font and screen resolution.

Returns: The height of the largest possible console window measured in rows.

To be added.

## Console.LargestWindowWidth property

```csharp
public static int LargestWindowWidth { get; }
```

Gets the largest possible number of console window columns, based on the current font and screen resolution.

Returns: The width of the largest possible console window measured in columns.

To be added.

## Console.NumberLock property

```csharp
public static bool NumberLock { get; }
```

Gets a value indicating whether the NUM LOCK keyboard toggle is turned on or turned off.

Returns: `true` if NUM LOCK is turned on; `false` if NUM LOCK is turned off.

Exceptions:

- `PlatformNotSupportedException`: The get operation is invoked on an operating system other than Windows.

To be added.

## Console.Out property

```csharp
public static System.IO.TextWriter Out { get; }
```

Gets the standard output stream.

Returns: A `TextWriter` that represents the standard output stream.

#### Remarks
This property is set to the standard output stream by default. This property can be set to another stream with the `Console.SetOut` method.

Note that calls to `Console.Out.WriteLine` methods are equivalent to calls to the corresponding `Console.WriteLine` methods.

#### Examples
The following example uses the `Out` property to display an array containing the names of files in the application's current directory to the standard output device. It then sets the standard output to a file named Files.txt and lists the array elements to the file. Finally, it sets the output to the standard output stream and again displays the array elements to the standard output device.

_Code sample not included: ~/snippets/csharp/System/Console/Out/out1.cs._

## Console.OutputEncoding property

```csharp
public static System.Text.Encoding OutputEncoding { get; set; }
```

Gets or sets the encoding the console uses to write output.

Returns: The encoding used to write console output.

Exceptions:

- `ArgumentNullException`: The property value in a set operation is `null`.
- `IOException`: An error occurred during the execution of this operation.
- `SecurityException`: Your application does not have permission to perform this operation.

#### Remarks
The console uses the output encoding to translate characters written by an application into corresponding console display characters. The default code page that the console uses is determined by the system locale.

A property get operation might return a cached value instead of the console's current output encoding. This can occur if the value of the `OutputEncoding` property is modified by some means other than an assignment to the `OutputEncoding` property, such as calling the Windows `SetConsoleOutputCP` function.

## Console.Title property

```csharp
public static string Title { get; set; }
```

Gets or sets the title to display in the console title bar.

Returns: The string to be displayed in the title bar of the console. The maximum length of the title string is 24500 characters.

Exceptions:

- `InvalidOperationException`: In a get operation, the retrieved title is longer than 24500 characters.
- `ArgumentOutOfRangeException`: In a set operation, the specified title is longer than 24500 characters.
- `ArgumentNullException`: In a set operation, the specified title is `null`.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The get operation is invoked on an operating system other than Windows.

#### Examples
This example demonstrates the `Title` property. The example displays the current title of the operating system window, waits for a key press, then displays a new title.

_Code sample not included: ~/snippets/csharp/System/Console/Title/mytitle.cs._

## Console.TreatControlCAsInput property

```csharp
public static bool TreatControlCAsInput { get; set; }
```

Gets or sets a value indicating whether the combination of the `ConsoleModifiers.Control` modifier key and `ConsoleKey.C` console key (Ctrl+C) is treated as ordinary input or as an interruption that is handled by the operating system.

Returns: `true` if Ctrl+C is treated as ordinary input; otherwise, `false`.

Exceptions:

- `IOException`: Unable to get or set the input mode of the console input buffer.

#### Remarks
If the value of the `TreatControlCAsInput` property is `false` and Ctrl+C is pressed, the pressed keys are not stored in the input buffer and the operating system terminates the currently executing process. This is the default value.

> **Caution:**
>  Use this property judiciously because setting it to `true` has such a dramatic effect. Most users expect Ctrl+C to terminate a console application. If you disable the effect of Ctrl+C, the user must remember to use Ctrl+Break to terminate the application, which is a less familiar key combination.

#### Examples
The following example demonstrates the `TreatControlCAsInput` property.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/rk.cs._

## Console.WindowHeight property

```csharp
public static int WindowHeight { get; set; }
```

Gets or sets the height of the console window area.

Returns: The height of the console window measured in rows.

Exceptions:

- `ArgumentOutOfRangeException`: The value of the `Console.WindowWidth` property or the value of the `Console.WindowHeight` property is less than or equal to 0.

-or-

The value of the `Console.WindowHeight` property plus the value of the `Console.WindowTop` property is greater than or equal to <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

-or-

The value of the `Console.WindowWidth` property or the value of the `Console.WindowHeight` property is greater than the largest possible window width or height for the current screen resolution and console font.
- `IOException`: Error reading or writing information.
- `PlatformNotSupportedException`: The set operation is invoked on an operating system other than Windows.

#### Remarks
Attempting to set the value of the `WindowHeight` property when output is redirected throws either an `ArgumentOutOfRangeException` or an `IOException` exception. To prevent an exception, you can set the value of this property only if the `IsOutputRedirected` property returns `false`.

#### Examples
This example demonstrates the `Console.SetWindowSize` method, and the `Console.WindowWidth` and `Console.WindowHeight` properties. You must run the example to see the full effect of changing the console window size.

The example reports the dimensions of a console window set to 85 columns and 43 rows, then waits for a key press. When any key is pressed, the dimensions of the console window are halved, the new dimensions are reported, and the example waits for another key press. Finally, when any key is pressed the console window is restored to its original dimensions and the example terminates.

_Code sample not included: ~/snippets/csharp/System/Console/SetWindowSize/sws.cs._

## Console.WindowLeft property

```csharp
public static int WindowLeft { get; set; }
```

Gets or sets the leftmost position of the console window area relative to the screen buffer.

Returns: The leftmost console window position measured in columns.

Exceptions:

- `ArgumentOutOfRangeException`: In a set operation, the value to be assigned is less than zero.

-or-

As a result of the assignment, `Console.WindowLeft` plus `Console.WindowWidth` would exceed `Console.BufferWidth`.
- `IOException`: Error reading or writing information.
- `PlatformNotSupportedException`: The set operation is invoked on an operating system other than Windows.

#### Remarks
The console represents a rectangular window into a larger rectangular buffer area. Both the window and the buffer are measured vertically by their number of rows and horizontally by their number of columns. The dimensions of the buffer area are defined by the `Console.BufferHeight` and `Console.BufferWidth` properties. The dimensions of the console area are defined by the `Console.WindowHeight` and `Console.WindowWidth` properties. The `WindowLeft` property determines which column of the buffer area is displayed in the first column of the console window. The value of the `WindowLeft` property can range from 0 to `Console.BufferWidth` - `Console.WindowWidth`. Attempting to set it to a value outside that range throws an `ArgumentOutOfRangeException`.

When a console window first opens, the default value of the `WindowLeft` property is zero, which indicates that the first column shown by the console corresponds to the first column (the column at position zero) in the buffer area. The default width of both the console window and the buffer area is 80 columns. This means that the `WindowLeft` property can be modified only if the console window is made narrower or the buffer area is made wider.

Note that if the width of the buffer area exceeds the width of the console window, the value of the `WindowLeft` property is automatically adjusted when the user uses the horizontal scroll bar to define the window's relationship to the buffer area.

Attempting to set the value of the `WindowLeft` property when output is redirected throws an `IOException` exception. To prevent the exception, you can set the value of this property only if the `IsOutputRedirected` property returns `false`.

#### Examples
The following example opens an 80-column console window and defines a buffer area that is 120 columns wide. It displays information on window and buffer size, and then waits for the user to press either the LEFT ARROW key or the RIGHT ARROW key. In the former case, it decrements the value of the `WindowLeft` property by one if the result is a legal value. In the latter case, it increases the value of the `WindowLeft` property by one if the result would be legal. Note that the example does not have to handle an `ArgumentOutOfRangeException`, because it checks that the value to be assigned to the `WindowLeft` property is not negative and does not cause the sum of the `Console.WindowLeft` and `Console.WindowWidth` properties to exceed the `BufferWidth` property value.

_Code sample not included: ~/snippets/csharp/System/Console/WindowLeft/windowleft1.cs._
