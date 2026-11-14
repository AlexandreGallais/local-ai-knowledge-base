---
title: "Console class (part 10 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Console.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Console class (part 10 of 10)

## Console.WriteLine(String, Object, Object) method

```csharp
public static void WriteLine (string format, object? arg0, object? arg1);
```

Writes the text representation of the specified objects, followed by the current line terminator, to the standard output stream using the specified format information.

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

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example demonstrates the standard formatting specifiers for numbers, dates, and enumerations.

_Code sample not included: ~/snippets/csharp/System/Console/Write/wl.cs._

The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.WriteLine(String, Object, Object, Object) method

```csharp
public static void WriteLine (string format, object? arg0, object? arg1, object? arg2);
```

Writes the text representation of the specified objects, followed by the current line terminator, to the standard output stream using the specified format information.

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

For more information about the line terminator, see the Remarks section of the `Console.WriteLine` method that takes no parameters.

#### Examples
The following example demonstrates the standard formatting specifiers for numbers, dates, and enumerations.

_Code sample not included: ~/snippets/csharp/System/Console/Write/wl.cs._

The following example is a tip calculator that calculates an 18% tip and uses the `Console.WriteLine` method to display the amount of the original charge, the amount of the tip, and the total amount. The example is a console application that requires the user to supply the amount of the original charge as a command-line parameter.

_Code sample not included: ~/snippets/csharp/System/Console/WriteLine/tipcalc.cs._

## Console.CancelKeyPress event

```csharp
public static event ConsoleCancelEventHandler? CancelKeyPress;
```

Occurs when the `ConsoleModifiers.Control` modifier key (Ctrl) and either the `ConsoleKey.C` console key (C) or the Break key are pressed simultaneously (Ctrl+C or Ctrl+Break).

#### Remarks
This event is used in conjunction with `ConsoleCancelEventHandler` and `ConsoleCancelEventArgs`. The `CancelKeyPress` event enables a console application to intercept the Ctrl+C signal so the event handler can decide whether to continue executing or terminate. For more information about handling events, see Handling and Raising Events.

When the user presses either Ctrl+C or Ctrl+Break, the `CancelKeyPress` event is fired and the application's `ConsoleCancelEventHandler` event handler is executed. The event handler is passed a `ConsoleCancelEventArgs` object that has two useful properties:

-   `ConsoleCancelEventArgs.SpecialKey`, which allows you to determine whether the handler was invoked as a result of the user pressing Ctrl+C (the property value is `ControlC`) or Ctrl+Break (the property value is `ControlBreak`).
-   `ConsoleCancelEventArgs.Cancel`, which allows you to determine how your application should respond to the user pressing Ctrl+C or Ctrl+Break. By default, the `Cancel` property is `false`, which causes program execution to terminate when the event handler exits. Changing its property to `true` specifies that the application should continue to execute.

> **Tip:**
>  If your application has simple requirements, you can use the `TreatControlCAsInput` property instead of this event. By setting this property to `false`, you can ensure that your application always exits if the user presses Ctrl+C. By setting it to `true`, you can ensure that pressing Ctrl+C will not terminate the application.

The event handler for this event is executed on a thread pool thread.

#### Examples
The following example demonstrates how the `CancelKeyPress` event is used. When you press Ctrl+C, the read operation is interrupted and the `myHandler` event handler is invoked. Upon entry to the event handler, the `Cancel` property is `false`, which means that the current process will terminate when the event handler terminates. However, the event handler sets the `Cancel` property to `true`, which means that the process will not terminate and the read operation will resume.

_Code sample not included: ~/snippets/csharp/System/Console/CancelKeyPress/ckp.cs._
