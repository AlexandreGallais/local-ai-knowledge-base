---
title: "Explore C# string interpolation handlers (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/advanced-topics/performance/interpolated-string-handler.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Explore C# string interpolation handlers (part 2 of 2)

## Add more capabilities to the handler

The preceding version of the interpolated string handler implements the pattern. To avoid processing every placeholder expression, you need more information in the handler. In this section, you improve your handler so that it does less work when the constructed string isn't written to the log. You use `System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute` to specify a mapping between parameters to a public API and parameters to a handler's constructor. That mapping provides the handler with the information needed to determine if the interpolated string should be evaluated.

Start with changes to the handler. First, add a field to track if the handler is enabled. Add two parameters to the constructor: one to specify the log level for this message, and the other a reference to the log object:

```csharp
private readonly bool enabled;

public LogInterpolatedStringHandler(int literalLength, int formattedCount, Logger logger, LogLevel logLevel)
{
    enabled = logger.EnabledLevel >= logLevel;
    builder = new StringBuilder(literalLength);
    Console.WriteLine($"\tliteral length: {literalLength}, formattedCount: {formattedCount}");
}
```
Next, use the field so that your handler only appends literals or formatted objects when the final string is used:

```csharp
public void AppendLiteral(string s)
{
    Console.WriteLine($"\tAppendLiteral called: {{{s}}}");
    if (!enabled) return;

    builder.Append(s);
    Console.WriteLine($"\tAppended the literal string");
}

public void AppendFormatted<T>(T t)
{
    Console.WriteLine($"\tAppendFormatted called: {{{t}}} is of type {typeof(T)}");
    if (!enabled) return;

    builder.Append(t?.ToString());
    Console.WriteLine($"\tAppended the formatted object");
}
```
Next, update the `LogMessage` declaration so that the compiler passes the additional parameters to the handler's constructor. Handle this step by using the `System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute` on the handler argument:

```csharp
public void LogMessage(LogLevel level, [InterpolatedStringHandlerArgument("", "level")] LogInterpolatedStringHandler builder)
{
    if (EnabledLevel < level) return;
    Console.WriteLine(builder.ToString());
}
```
This attribute specifies the list of arguments to `LogMessage` that map to the parameters that follow the required `literalLength` and `formattedCount` parameters. The empty string (`""`), specifies the receiver. The compiler substitutes the value of the `Logger` object represented by `this` for the next argument to the handler's constructor. The compiler substitutes the value of `level` for the following argument. You can provide any number of arguments for any handler you write. The arguments that you add are string arguments.

> **Note:**
> If the `System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute` constructor argument list is empty, the behavior is the same as if the attribute was omitted entirely.

You can run this version by using the same test code. This time, you see the following results:

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
        AppendFormatted called: {10/20/2021 12:19:10 PM} is of type System.DateTime
        AppendLiteral called: {. This won't be printed.}
Warning Level. This warning is a string, not an interpolated string expression.
```

You see that the `AppendLiteral` and `AppendFormat` methods are called, but they aren't doing any work. The handler determined that the final string isn't needed, so the handler doesn't build it. There are still a couple of improvements to make.

First, you can add an overload of `AppendFormatted` that constrains the argument to a type that implements `System.IFormattable`. This overload enables callers to add format strings in the placeholders. While making this change, also change the return type of the other `AppendFormatted` and `AppendLiteral` methods, from `void` to `bool`. If any of these methods have different return types, you get a compilation error. That change enables *short circuiting*. The methods return `false` to indicate that processing of the interpolated string expression should be stopped. Returning `true` indicates that it should continue. In this example, you're using it to stop processing when the resulting string isn't needed. Short circuiting supports more fine-grained actions. You could stop processing the expression once it reaches a certain length, to support fixed-length buffers. Or some condition could indicate remaining elements aren't needed.

```csharp
public void AppendFormatted<T>(T t, string format) where T : IFormattable
{
    Console.WriteLine($"\tAppendFormatted (IFormattable version) called: {t} with format {{{format}}} is of type {typeof(T)},");

    builder.Append(t?.ToString(format, null));
    Console.WriteLine($"\tAppended the formatted object");
}

public void AppendFormatted<T>(T t, int alignment, string format) where T : IFormattable
{
    Console.WriteLine($"\tAppendFormatted (IFormattable version) called: {t} with alignment {alignment} and format {{{format}}} is of type {typeof(T)},");
    var formatString =$"{alignment}:{format}";
    builder.Append(string.Format($"{{0,{formatString}}}", t));
    Console.WriteLine($"\tAppended the formatted object");
}
```
With that addition, you can specify format strings in your interpolated string expression:

```csharp
var time = DateTime.Now;

logger.LogMessage(LogLevel.Error, $"Error Level. CurrentTime: {time}. The time doesn't use formatting.");
logger.LogMessage(LogLevel.Error, $"Error Level. CurrentTime: {time:t}. This is an error. It will be printed.");
logger.LogMessage(LogLevel.Trace, $"Trace Level. CurrentTime: {time:t}. This won't be printed.");
```
The `:t` on the first message specifies the "short time format" for the current time. The previous example showed one of the overloads to the `AppendFormatted` method that you can create for your handler. You don't need to specify a generic argument for the object being formatted. You might have more efficient ways to convert types you create to string. You can write overloads of `AppendFormatted` that takes those types instead of a generic argument. The compiler picks the best overload. The runtime uses this technique to convert `System.Span`1` to string output. You can add an integer parameter to specify the *alignment* of the output, with or without an `System.IFormattable`. The `System.Runtime.CompilerServices.DefaultInterpolatedStringHandler` that ships with .NET 6 contains nine overloads of `System.Runtime.CompilerServices.DefaultInterpolatedStringHandler.AppendFormatted*` for different uses. You can use it as a reference while building a handler for your purposes.

Run the sample now, and you see that for the `Trace` message, only the first `AppendLiteral` is called:

```powershell
        literal length: 60, formattedCount: 1
        AppendLiteral called: Error Level. CurrentTime:
        Appended the literal string
        AppendFormatted called: 10/20/2021 12:18:29 PM is of type System.DateTime
        Appended the formatted object
        AppendLiteral called: . The time doesn't use formatting.
        Appended the literal string
Error Level. CurrentTime: 10/20/2021 12:18:29 PM. The time doesn't use formatting.
        literal length: 65, formattedCount: 1
        AppendLiteral called: Error Level. CurrentTime:
        Appended the literal string
        AppendFormatted (IFormattable version) called: 10/20/2021 12:18:29 PM with format {t} is of type System.DateTime,
        Appended the formatted object
        AppendLiteral called: . This is an error. It will be printed.
        Appended the literal string
Error Level. CurrentTime: 12:18 PM. This is an error. It will be printed.
        literal length: 50, formattedCount: 1
        AppendLiteral called: Trace Level. CurrentTime:
Warning Level. This warning is a string, not an interpolated string expression.
```

You can make one final update to the handler's constructor that improves efficiency. The handler can add a final `out bool` parameter. Setting that parameter to `false` indicates that the handler shouldn't be called at all to process the interpolated string expression:

```csharp
public LogInterpolatedStringHandler(int literalLength, int formattedCount, Logger logger, LogLevel level, out bool isEnabled)
{
    isEnabled = logger.EnabledLevel >= level;
    Console.WriteLine($"\tliteral length: {literalLength}, formattedCount: {formattedCount}");
    builder = isEnabled ? new StringBuilder(literalLength) : default!;
}
```
That change means you can remove the `enabled` field. Then, you can change the return type of `AppendLiteral` and `AppendFormatted` to `void`.
Now, when you run the sample, you see the following output:

```powershell
        literal length: 60, formattedCount: 1
        AppendLiteral called: Error Level. CurrentTime:
        Appended the literal string
        AppendFormatted called: 10/20/2021 12:19:10 PM is of type System.DateTime
        Appended the formatted object
        AppendLiteral called: . The time doesn't use formatting.
        Appended the literal string
Error Level. CurrentTime: 10/20/2021 12:19:10 PM. The time doesn't use formatting.
        literal length: 65, formattedCount: 1
        AppendLiteral called: Error Level. CurrentTime:
        Appended the literal string
        AppendFormatted (IFormattable version) called: 10/20/2021 12:19:10 PM with format {t} is of type System.DateTime,
        Appended the formatted object
        AppendLiteral called: . This is an error. It will be printed.
        Appended the literal string
Error Level. CurrentTime: 12:19 PM. This is an error. It will be printed.
        literal length: 50, formattedCount: 1
Warning Level. This warning is a string, not an interpolated string expression.
```

The only output when `LogLevel.Trace` was specified is the output from the constructor. The handler indicated that it's not enabled, so none of the `Append` methods are invoked.

This example illustrates an important point for interpolated string handlers, especially when logging libraries are used. Any side-effects in the placeholders might not occur. Add the following code to your main program and see this behavior in action:

```csharp
int index = 0;
int numberOfIncrements = 0;
for (var level = LogLevel.Critical; level <= LogLevel.Trace; level++)
{
    Console.WriteLine(level);
    logger.LogMessage(level, $"{level}: Increment index {index++}");
    numberOfIncrements++;
}
Console.WriteLine($"Value of index {index}, value of numberOfIncrements: {numberOfIncrements}");
```
You can see the `index` variable is incremented each iteration of the loop. Because the placeholders are evaluated only for `Critical`, `Error`, and `Warning` levels, not for `Information`, and `Trace`, the final value of `index` doesn't match the expectation:

```powershell
Critical
Critical: Increment index 0
Error
Error: Increment index 1
Warning
Warning: Increment index 2
Information
Trace
Value of index 3, value of numberOfIncrements: 5
```

Interpolated string handlers provide greater control over how an interpolated string expression is converted to a string. The .NET runtime team used this feature to improve performance in several areas. You can make use of the same capability in your own libraries. To explore further, look at the `System.Runtime.CompilerServices.DefaultInterpolatedStringHandler`. It provides a more complete implementation than you built here. You see many more overloads that are possible for the `Append` methods.
