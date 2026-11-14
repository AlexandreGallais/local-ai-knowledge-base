---
title: "Console class (part 5 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 5 of 10)

## Console.OpenStandardErrorHandle() method

```csharp
public static Microsoft.Win32.SafeHandles.SafeFileHandle OpenStandardErrorHandle ();
```

Gets the standard error handle.

Returns: A `SafeFileHandle` representing the standard error handle.

Exceptions:

- `PlatformNotSupportedException`: The current platform doesn't support accessing the standard error handle.

The returned handle doesn't own the underlying resource, so disposing it doesn't close the standard error handle.

## Console.OpenStandardInput() method

```csharp
public static System.IO.Stream OpenStandardInput ();
```

Acquires the standard input stream.

Returns: The standard input stream.

#### Remarks

This method can be used to reacquire the standard input stream after it has been changed by the `Console.SetIn` method.

#### Examples

The following example illustrates the use of the `OpenStandardInput` method.

_Code sample not included: ~/snippets/csharp/System/Console/OpenStandardInput/decode.cs._

## Console.OpenStandardInput(Int32) method

```csharp
public static System.IO.Stream OpenStandardInput (int bufferSize);
```

Acquires the standard input stream, which is set to a specified buffer size.

Parameters:

- `bufferSize`: This parameter has no effect, but its value must be greater than or equal to zero.

Returns: The standard input stream.

Exceptions:

- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero.

#### Remarks

This method can be used to reacquire the standard output stream after it has been changed by the `Console.SetIn` method.

## Console.OpenStandardInputHandle() method

```csharp
public static Microsoft.Win32.SafeHandles.SafeFileHandle OpenStandardInputHandle ();
```

Gets the standard input handle.

Returns: A `SafeFileHandle` representing the standard input handle.

Exceptions:

- `PlatformNotSupportedException`: The current platform doesn't support accessing the standard input handle.

The returned handle doesn't own the underlying resource, so disposing it doesn't close the standard input handle.

## Console.OpenStandardOutput() method

```csharp
public static System.IO.Stream OpenStandardOutput ();
```

Acquires the standard output stream.

Returns: The standard output stream.

#### Remarks
This method can be used to reacquire the standard output stream after it has been changed by the `Console.SetOut` method.

#### Examples
The following example illustrates the use of the `Console.OpenStandardOutput` method. It replaces four consecutive space characters in a string with a tab character. To run it, you must supply two command-line arguments. The first is the name of an existing text file to redirect the standard input stream to. The second is the name of a file to redirect the standard output stream to. This file need not exist. If it does, its contents will be overwritten.

_Code sample not included: ~/snippets/csharp/System/Console/OpenStandardOutput/inserttabs.cs._

## Console.OpenStandardOutput(Int32) method

```csharp
public static System.IO.Stream OpenStandardOutput (int bufferSize);
```

Acquires the standard output stream, which is set to a specified buffer size.

Parameters:

- `bufferSize`: This parameter has no effect, but its value must be greater than or equal to zero.

Returns: The standard output stream.

Exceptions:

- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero.

#### Remarks
This method can be used to reacquire the standard output stream after it has been changed by the `Console.SetOut` method.

#### Examples
The following example illustrates the use of the `Console.OpenStandardOutput` method. It replaces four consecutive space characters in a string with a tab character. To run it, you must supply two command line arguments. The first is the name of an existing text file to redirect the standard input stream to. The second is the name of a file to redirect the standard output stream to. This file need not exist. If it does, its contents will be overwritten.

_Code sample not included: ~/snippets/csharp/System/Console/OpenStandardOutput/inserttabs.cs._

## Console.OpenStandardOutputHandle() method

```csharp
public static Microsoft.Win32.SafeHandles.SafeFileHandle OpenStandardOutputHandle ();
```

Gets the standard output handle.

Returns: A `SafeFileHandle` representing the standard output handle.

Exceptions:

- `PlatformNotSupportedException`: The current platform doesn't support accessing the standard output handle.

The returned handle doesn't own the underlying resource, so disposing it doesn't close the standard output handle.

## Console.Read() method

```csharp
public static int Read ();
```

Reads the next character from the standard input stream.

Returns: The next character from the input stream, or negative one (-1) if there are currently no more characters to be read.

Exceptions:

- `IOException`: An I/O error occurred.

#### Remarks
The `Console.Read` method blocks its return while you type input characters; it terminates when you press the `Enter` key. Pressing Enter appends a platform-dependent line termination sequence to your input (for example, Windows appends a carriage return-linefeed sequence). Subsequent calls to the `Console.Read` method retrieve your input one character at a time. After the final character is retrieved, `Console.Read` blocks its return again and the cycle repeats.

> **Important:**
> The `Console.ReadLine` method, or the `KeyAvailable` property and `Console.ReadKey` method are preferable to using the `Console.Read` method.

Note that the method does not return -1 unless you perform one of the following actions:

- Simultaneously press the `Control` modifier key and `Z` console key (Ctrl+Z), which signals the end-of-file condition. If you're on Windows, you must also press the `Enter` console key.
- Press an equivalent key that signals the end-of-file condition, such as the F6 function key in Windows.
- Redirect the input stream to a source, such as a text file, that has an actual end-of-file character.

#### Examples
The following example demonstrates the `Console.Read` method.

_Code sample not included: ~/snippets/csharp/System/Console/Read/read.cs._

## Console.ReadKey() method

```csharp
public static ConsoleKeyInfo ReadKey ();
```

Obtains the next character or function key <example-value> by the user. The pressed key is displayed in the console window.

Returns: An object that describes the `ConsoleKey` constant and Unicode character, if any, that correspond to the pressed console key. The `ConsoleKeyInfo` object also describes, in a bitwise combination of `ConsoleModifiers` values, whether one or more Shift, Alt, or Ctrl modifier keys was pressed simultaneously with the console key.

Exceptions:

- `InvalidOperationException`: The `Console.In` property is redirected from some stream other than the console.

#### Remarks
The `Console.ReadKey` method waits, that is, blocks on the thread issuing the `Console.ReadKey` method, until a character or function key is pressed. A character or function key can be pressed in combination with one or more Alt, Ctrl, or Shift modifier keys. However, pressing a modifier key by itself will not cause the `Console.ReadKey` method to return.

Depending on your application, you might want to use the `Console.ReadKey` method in conjunction with the `KeyAvailable` property.

The `Console.ReadKey` method reads from the keyboard even if the standard input is redirected to a file with the `Console.SetIn` method.

#### Examples
One of the most common uses of the `ReadKey` method is to halt program execution until the user presses a key and the app either terminates or displays an additional window of information. The following example uses the  `ReadKey` method to wait for the user to press the Enter key <example-value> terminating the app.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/ReadKey1.cs._

Note that this overload of the `Console.ReadKey` method by default echoes any displayable keys that the user presses to the console. To suppress them, call the  `Console.ReadKey` method with an `intercept` argument of `true`.

The following example uses the `ReadKey` method to display information about which key the user pressed.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/rk.cs._

## Console.ReadKey(Boolean) method

```csharp
public static ConsoleKeyInfo ReadKey (bool intercept);
```

Obtains the next character or function key <example-value> by the user. The pressed key is optionally displayed in the console window.

Parameters:

- `intercept`: Determines whether to display the pressed key in the console window. `true` to not display the pressed key; otherwise, `false`.

Returns: An object that describes the `ConsoleKey` constant and Unicode character, if any, that correspond to the pressed console key. The `ConsoleKeyInfo` object also describes, in a bitwise combination of `ConsoleModifiers` values, whether one or more Shift, Alt, or Ctrl modifier keys was pressed simultaneously with the console key.

Exceptions:

- `InvalidOperationException`: The `Console.In` property is redirected from some stream other than the console.

#### Remarks
The `Console.ReadKey` method waits, that is, blocks on the thread issuing the `Console.ReadKey` method, until a character or function key is pressed. A character or function key can be pressed in combination with one or more Alt, Ctrl, or Shift modifier keys. However, pressing a modifier key by itself will not cause the `Console.ReadKey` method to return.

If the `intercept` parameter is `true`, the pressed key is intercepted and not displayed in the console window; otherwise, the pressed key is displayed.

Depending on your application, you might want to use the `Console.ReadKey` method in conjunction with the `KeyAvailable` property.

The `Console.ReadKey` method reads from the keyboard even if the standard input is redirected to a file with the `Console.SetIn` method.

#### Examples
One of the most common uses of the `Console.ReadKey` method is to halt program execution until the user presses a key and the app either terminates or displays an additional window of information. The following example uses the  `ReadKey` method to wait for the user to press the Enter key <example-value> terminating the app. Note that, if the user presses any other key, it is not echoed to the console.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/ReadKey2.cs._

The following example uses the `ReadKey` method to display information about the key <example-value> by a user without echoing that key to the console.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/rkbool.cs._
