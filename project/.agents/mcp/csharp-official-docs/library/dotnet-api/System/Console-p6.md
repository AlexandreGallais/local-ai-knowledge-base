---
title: "Console class (part 6 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 6 of 10)

## Console.ReadLine() method

```csharp
public static string? ReadLine ();
```

Reads the next line of characters from the standard input stream.

Returns: The next line of characters from the input stream, or `null` if no more lines are available.

Exceptions:

- `IOException`: An I/O error occurred.
- `OutOfMemoryException`: There is insufficient memory to allocate a buffer for the returned string.
- `ArgumentOutOfRangeException`: The number of characters in the next line of characters is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `Console.ReadLine` method reads a line from the standard input stream. (For the definition of a line, see the paragraph after the following list.) This means that:

- If the standard input device is the keyboard, the `Console.ReadLine` method blocks until the user presses the **Enter** key.

One of the most common uses of the `Console.ReadLine` method is to pause program execution before clearing the console and displaying new information to it, or to prompt the user to press the Enter key <example-value> terminating the application. The following example illustrates this.

_Code sample not included: ~/snippets/csharp/System/Console/ReadLine/ReadLineSimple.cs._

- If standard input is redirected to a file, the `Console.ReadLine` method reads a line of text from a file. For example, the following is a text file named ReadLine1.txt:

```
    This is the first line.
    This is the second line.
    This is the third line.
    This is the fourth line.
```

The following example uses the `Console.ReadLine` method to read input that is redirected from a file. The read operation terminates when the method returns `null`, which indicates that no lines remain to be read.

_Code sample not included: ~/snippets/csharp/System/Console/ReadLine/ReadLine3.cs._

After compiling the example to an executable named ReadLine1.exe, you can run it from the command line to read the contents of the file and display them to the console. The syntax is:

```
    ReadLine1 < ReadLine1.txt
```

A line is defined as a sequence of characters followed by a carriage return (hexadecimal 0x000d), a line feed (hexadecimal 0x000a), or the value of the `NewLine` property. The returned string does not contain the terminating character(s). By default, the method reads input from a 256-character input buffer. Because this includes the `Environment.NewLine` character(s), the method can read lines that contain up to 254 characters. To read longer lines, call the `OpenStandardInput` method.

The `Console.ReadLine` method executes synchronously. That is, it blocks until a line is read or the `Ctrl+Z` keyboard combination (followed by `Enter` on Windows), is pressed. The `In` property returns a `TextReader` object that represents the standard input stream and that has both a synchronous `TextReader.ReadLine` method and an asynchronous `TextReader.ReadLineAsync` method. However, when used as the console's standard input stream, the `TextReader.ReadLineAsync` executes synchronously rather than asynchronously and returns a `Task<String>` only after the read operation has completed.

If this method throws an `OutOfMemoryException` exception, the reader's position in the underlying `Stream` object is advanced by the number of characters the method was able to read, but the characters already read into the internal `Console.ReadLine` buffer are discarded. Since the position of the reader in the stream cannot be changed, the characters already read are unrecoverable, and can be accessed only by reinitializing the `TextReader`. If the initial position within the stream is unknown or the stream does not support seeking, the underlying `Stream` also needs to be reinitialized. To avoid such a situation and to produce robust code, you should use the `KeyAvailable` property and `Console.ReadKey` method and store the read characters in a pre-allocated buffer.

If the `Ctrl+Z` key <example-value> (followed by `Enter` on Windows) is pressed when the method is reading input from the console, the method returns `null`. This enables the user to prevent further keyboard input when the `Console.ReadLine` method is called in a loop. The following example illustrates this scenario.

_Code sample not included: ~/snippets/csharp/System/Console/ReadLine/ReadLine2.cs._

#### Examples
The following example requires two command line arguments: the name of an existing text file, and the name of a file to write the output to. It opens the existing text file and redirects the standard input from the keyboard to that file. It also redirects the standard output from the console to the output file. It then uses the `Console.ReadLine` method to read each line in the file, replaces every sequence of four spaces with a tab character, and uses the `Console.WriteLine` method to write the result to the output file.

_Code sample not included: ~/snippets/csharp/System/Console/OpenStandardOutput/inserttabs.cs._

## Console.ResetColor() method

```csharp
public static void ResetColor ();
```

Sets the foreground and background console colors to their defaults.

Exceptions:

- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.

#### Remarks
The foreground and background colors are restored to the colors that existed when the current process began. For more information, see the `Console.ForegroundColor` and `Console.BackgroundColor` properties.

#### Examples
The following example saves the values of the `ConsoleColor` enumeration to an array and stores the current values of the `Console.BackgroundColor` and `Console.ForegroundColor` properties to variables. It then changes the foreground color to each color in the `ConsoleColor` enumeration except to the color that matches the current background, and it changes the background color to each color in the `ConsoleColor` enumeration except to the color that matches the current foreground. (If the foreground color is the same as the background color, the text isn't visible.) Finally, it calls the `Console.ResetColor` method to restore the original console colors.

_Code sample not included: ~/snippets/csharp/System/Console/BackgroundColor/foregroundcolor3.cs._

## Console.SetBufferSize(Int32, Int32) method

```csharp
public static void SetBufferSize (int width, int height);
```

Sets the height and width of the screen buffer area to the specified values.

Parameters:

- `width`: The width of the buffer area measured in columns.
- `height`: The height of the buffer area measured in rows.

Exceptions:

- `ArgumentOutOfRangeException`: `height` or `width` is less than or equal to zero.

-or-

`height` or `width` is greater than or equal to <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>.

-or-

`width` is less than `Console.WindowLeft` + `Console.WindowWidth`.

-or-

`height` is less than `Console.WindowTop` + `Console.WindowHeight`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.
- `PlatformNotSupportedException`: The current operating system is not Windows.

#### Examples
The following example demonstrates the `Console.WindowLeft`, `Console.WindowTop`, `Console.WindowWidth`, `Console.WindowHeight`, `Console.BufferWidth`, `Console.BufferHeight`, and `Console.CursorVisible` properties; and the `Console.SetWindowPosition`, `Console.SetBufferSize`, and `Console.ReadKey` methods. The example draws a grid pattern in the screen buffer based on the screen buffer width. Then the example moves the console window in response to which of the UP ARROW, DOWN ARROW, LEFT ARROW, or RIGHT ARROW console keys is pressed. The grid pattern helps you see the movement of the console window relative to the screen buffer.

_Code sample not included: ~/snippets/csharp/System/Console/SetBufferSize/wlt.cs._

## Console.SetCursorPosition(Int32, Int32) method

```csharp
public static void SetCursorPosition (int left, int top);
```

Sets the position of the cursor.

Parameters:

- `left`: The column position of the cursor. Columns are numbered from left to right starting at 0.
- `top`: The row position of the cursor. Rows are numbered from top to bottom starting at 0.

Exceptions:

- `ArgumentOutOfRangeException`: `left` or `top` is less than zero.

-or-

`left` is greater than or equal to `Console.BufferWidth`.

-or-

`top` is greater than or equal to `Console.BufferHeight`.
- `SecurityException`: The user does not have permission to perform this action.
- `IOException`: An I/O error occurred.

#### Remarks
Use the `Console.SetCursorPosition` method to specify where the next write operation in the console window is to begin. If the specified cursor position is outside the area that is currently visible in the console window, the window origin changes automatically to make the cursor visible.

The cursor automatically moves to the next character position each time a character is written to the console window. If the cursor is at the bottom right character position of the console window, the next write operation causes the console window to scroll so the cursor remains visible. If you want to write a character to the bottom right character position without causing the console window to scroll, use the `Console.MoveBufferArea` method to move a character to that position.

#### Examples
This example demonstrates the `Console.CursorLeft` and `Console.CursorTop` properties, and the `Console.SetCursorPosition` and `Console.Clear` methods. The example positions the cursor, which determines where the next write will occur, to draw a 5 character by 5 character rectangle using a combination of "+", "|", and "-" strings. Note that the rectangle could be drawn with fewer steps using a combination of other strings.

_Code sample not included: ~/snippets/csharp/System/Console/Clear/lts.cs._

## Console.SetError(TextWriter) method

```csharp
public static void SetError (System.IO.TextWriter newError);
```

Sets the `Console.Error` property to the specified `TextWriter` object.

Parameters:

- `newError`: A stream that is the new standard error output.

Exceptions:

- `ArgumentNullException`: `newError` is `null`.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
By default, the `Error` property is set to the standard error output stream.

A `StreamWriter` that encapsulates a `FileStream` can be used to send error messages to a file.

#### Examples
The following example shows how to redirect the standard error stream to a file.

_Code sample not included: ~/snippets/csharp/System/Console/SetError/SetError1.cs._

## Console.SetIn(TextReader) method

```csharp
public static void SetIn (System.IO.TextReader newIn);
```

Sets the `Console.In` property to the specified `TextReader` object.

Parameters:

- `newIn`: A stream that is the new standard input.

Exceptions:

- `ArgumentNullException`: `newIn` is `null`.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
By default, the `In` property is set to the standard input stream.

A `StreamReader` that encapsulates a `FileStream` can be used to receive input from a file.

#### Examples
The following example illustrates the use of the `Console.SetIn` method. It replaces four consecutive space characters in a string with a tab character. To run it, you must supply two command line arguments. The first is the name of an existing text file to redirect the standard input stream to. The second is the name of a file to redirect the standard output stream to. This file need not exist. If it does, its contents will be overwritten.

_Code sample not included: ~/snippets/csharp/System/Console/OpenStandardOutput/inserttabs.cs._

## Console.SetOut(TextWriter) method

```csharp
public static void SetOut (System.IO.TextWriter newOut);
```

Sets the `Console.Out` property to target the `TextWriter` object.

Parameters:

- `newOut`: A text writer to be used as the new standard output.

Exceptions:

- `ArgumentNullException`: `newOut` is `null`.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
By default, the `Out` property is set to the standard output stream.

A `StreamWriter` that encapsulates a `FileStream` can be used to send output to a file. For example:

_Code sample not included: ~/snippets/csharp/System/Console/SetOut/source.cs._

The actual object returned by `Console.Out` may be a synchronized wrapper around the provided text writer.

#### Examples
The following example illustrates the use of the `Console.SetOut` method. It replaces four consecutive space characters in a string with a tab character. To run it, you must supply two command line arguments. The first is the name of an existing text file to redirect the standard input stream to. The second is the name of a file to redirect the standard output stream to. This file need not exist. If it does, its contents will be overwritten.

_Code sample not included: ~/snippets/csharp/System/Console/OpenStandardOutput/inserttabs.cs._
