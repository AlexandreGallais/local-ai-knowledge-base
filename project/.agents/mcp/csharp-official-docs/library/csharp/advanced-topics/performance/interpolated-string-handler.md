---
title: "Explore C# string interpolation handlers (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/advanced-topics/performance/interpolated-string-handler.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Write a custom string interpolation handler

In this tutorial, you learn how to:

>
> - Implement the string interpolation handler pattern.
> - Interact with the receiver in a string interpolation operation.
> - Add arguments to the string interpolation handler.
> - Understand the new library features for string interpolation.

## Prerequisites

Set up your machine to run .NET. The C# compiler is available through Visual Studio or the .NET SDK.

This tutorial assumes you're familiar with C# and .NET, including either Visual Studio or Visual Studio Code and the C# DevKit.

You can write a custom *interpolated string handler*. An interpolated string handler is a type that processes the placeholder expression in an interpolated string. Without a custom handler, the system processes placeholders similar to `System.String.Format*`. Each placeholder is formatted as text, and then the components are concatenated to form the resulting string.

You can write a handler for any scenario where you use information about the resulting string. Consider questions like: Is it used? What constraints are on the format? Some examples include:

- You might require none of the resulting strings are greater than some limit, such as 80 characters. You can process the interpolated strings to fill a fixed-length buffer, and stop processing once that buffer length is reached.
- You might have a tabular format, and each placeholder must have a fixed length. A custom handler can enforce that constraint, rather than forcing all client code to conform.

In this tutorial, you create a string interpolation handler for one of the core performance scenarios: logging libraries. Depending on the configured log level, the work to construct a log message isn't needed. If logging is off, the work to construct a string from an interpolated string expression isn't needed. The message is never printed, so any string concatenation can be skipped. In addition, any expressions used in the placeholders, including generating stack traces, don't need to be done.

An interpolated string handler can determine if the formatted string is used, and only perform the necessary work if needed.

## Initial implementation

Start with a basic `Logger` class that supports different levels:

```csharp
public enum LogLevel
{
    Off,
    Critical,
    Error,
    Warning,
    Information,
    Trace
}

public class Logger
{
    public LogLevel EnabledLevel { get; init; } = LogLevel.Error;

    public void LogMessage(LogLevel level, string msg)
    {
        if (EnabledLevel < level) return;
        Console.WriteLine(msg);
    }
}
```
This `Logger` supports six different levels. When a message doesn't pass the log level filter, the logger produces no output. The public API for the logger accepts a fully formatted string as the message. The caller does all the work to create the string.

## Implement the handler pattern

In this step, you build an *interpolated string handler* that recreates the current behavior. An interpolated string handler is a type that must have the following characteristics:

- The `System.Runtime.CompilerServices.InterpolatedStringHandlerAttribute` applied to the type.
- A constructor that has two `int` parameters, `literalLength` and `formattedCount`. (More parameters are allowed).
- A public `AppendLiteral` method with the signature: `public void AppendLiteral(string s)`.
- A generic public `AppendFormatted` method with the signature: `public void AppendFormatted<T>(T t)`.

Internally, the builder creates the formatted string and provides a member for a client to retrieve that string. The following code shows a `LogInterpolatedStringHandler` type that meets these requirements:

```csharp
[InterpolatedStringHandler]
public struct LogInterpolatedStringHandler
{
    // Storage for the built-up string
    StringBuilder builder;

    public LogInterpolatedStringHandler(int literalLength, int formattedCount)
    {
        builder = new StringBuilder(literalLength);
        Console.WriteLine($"\tliteral length: {literalLength}, formattedCount: {formattedCount}");
    }

    public void AppendLiteral(string s)
    {
        Console.WriteLine($"\tAppendLiteral called: {{{s}}}");
        
        builder.Append(s);
        Console.WriteLine($"\tAppended the literal string");
    }

    public void AppendFormatted<T>(T t)
    {
        Console.WriteLine($"\tAppendFormatted called: {{{t}}} is of type {typeof(T)}");

        builder.Append(t?.ToString());
        Console.WriteLine($"\tAppended the formatted object");
    }

    public override string ToString() => builder.ToString();
}
```
> **Note:**
> When the interpolated string expression is a compile-time constant (that is, it has no placeholders), the compiler uses the target type `string` instead of invoking a custom interpolated string handler. This behavior means constant interpolated strings bypass <example-value> handlers entirely.

You can now add an overload to `LogMessage` in the `Logger` class to try your new interpolated string handler:

```csharp
public void LogMessage(LogLevel level, LogInterpolatedStringHandler builder)
{
    if (EnabledLevel < level) return;
    Console.WriteLine(builder.ToString());
}
```
You don't need to remove the original `LogMessage` method. When the argument is an interpolated string expression, the compiler prefers a method with an interpolated handler parameter over a method with a `string` parameter.

You can verify that the new handler is invoked by using the following code as the main program:

```csharp
var logger = new Logger() { EnabledLevel = LogLevel.Warning };
var time = DateTime.Now;

logger.LogMessage(LogLevel.Error, $"Error Level. CurrentTime: {time}. This is an error. It will be printed.");
logger.LogMessage(LogLevel.Trace, $"Trace Level. CurrentTime: {time}. This won't be printed.");
logger.LogMessage(LogLevel.Warning, "Warning Level. This warning is a string, not an interpolated string expression.");
```
Running the application produces output similar to the following text:

```powershell
        literal length: 65, formattedCount: 1
        AppendLiteral called: {Error Level. CurrentTime: }
        Appended the literal string
        AppendFormatted called: {10/20/2021 12:19:10 PM} is of type System.DateTime
        Appended the formatted object
        AppendLiteral called: {. This is an error. It will be printed.}
        Appended the literal string
Error Level. CurrentTime: 10/20/2021 12:19:10 PM. This is an error. It will be printed.
        literal length: 50, formattedCount: 1
        AppendLiteral called: {Trace Level. CurrentTime: }
        Appended the literal string
        AppendFormatted called: {10/20/2021 12:19:10 PM} is of type System.DateTime
        Appended the formatted object
        AppendLiteral called: {. This won't be printed.}
        Appended the literal string
Warning Level. This warning is a string, not an interpolated string expression.
```

Tracing through the output, you can see how the compiler adds code to call the handler and build the string:

- The compiler adds a call to construct the handler, passing the total length of the literal text in the format string, and the number of placeholders.
- The compiler adds calls to `AppendLiteral` and `AppendFormatted` for each section of the literal string and for each placeholder.
- The compiler invokes the `LogMessage` method using the `CoreInterpolatedStringHandler` as the argument.

Finally, notice that the last warning doesn't invoke the interpolated string handler. The argument is a `string`, so that call invokes the other overload with a string parameter.

> **Important:**
>
> Use `ref struct` for interpolated string handlers only if absolutely necessary. `ref struct` types have limitations as they must be stored on the stack. For example, they don't work if an interpolated string hole contains an `await` expression because the compiler needs to store the handler in the compiler-generated `IAsyncStateMachine` implementation.
