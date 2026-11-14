---
title: "Debug class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Debug.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Debug class (part 3 of 4)

## Debug.Write(Object, String) method

```csharp
public static void Write (object? value, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `value`: An object whose name is sent to the `Debug.Listeners`.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

Use the `category` parameter to group output messages.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Write/source.cs._

## Debug.Write(String, String) method

```csharp
public static void Write (string? message, string? category);
```

Writes a category name and message to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `message`: A message to write.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

Use the `category` parameter to group output messages.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Write/source.cs._

## Debug.WriteIf(Boolean, Debug+WriteIfInterpolatedStringHandler) method

```csharp
public static void WriteIf (bool condition, ref System.Diagnostics.Debug.WriteIfInterpolatedStringHandler message);
```

If `condition` is `true`, writes a category name and message to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the value is written to the trace listeners in the collection.
- `message`: The message to write if `condition` is `true`.

#### Remarks

This overload has better performance than the overloads that take a `String` parameter. This overload only evaluates any interpolated string formatting items if the message is required.

By default, the output is written to an instance of `DefaultTraceListener`.

Use the `category` parameter to group output messages.

This method calls the `TraceListener.Write` method of the trace listener.

## Debug.WriteIf(Boolean, Object) method

```csharp
public static void WriteIf (bool condition, object? value);
```

Writes the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the value is written to the trace listeners in the collection.
- `value`: An object whose name is sent to the `Debug.Listeners`.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first name of the value parameter to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs a message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteIf/source1.cs._

## Debug.WriteIf(Boolean, String) method

```csharp
public static void WriteIf (bool condition, string? message);
```

Writes a message to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the message is written to the trace listeners in the collection.
- `message`: A message to write.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information about adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteIf/source.cs._

## Debug.WriteIf(Boolean, Debug+WriteIfInterpolatedStringHandler, String) method

```csharp
public static void WriteIf (bool condition, ref System.Diagnostics.Debug.WriteIfInterpolatedStringHandler message, string? category);
```

Writes a category name and message to the trace listeners in the `Debug.Listeners` collection if a specified condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the message is written to the trace listeners in the collection.
- `message`: The message to write.
- `category`: A category name used to organize the output.

#### Remarks

This overload has better performance than the overloads that take a `String` parameter. This overload only evaluates any interpolated string formatting items if the message is required.

By default, the output is written to an instance of `DefaultTraceListener`.

Use the `category` parameter to group output messages.

This method calls the `TraceListener.Write` method of the trace listener.

## Debug.WriteIf(Boolean, Object, String) method

```csharp
public static void WriteIf (bool condition, object? value, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the category name and value are written to the trace listeners in the collection.
- `value`: An object whose name is sent to the `Debug.Listeners`.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Verbose`, the example outputs the name of the `myObject` and the `category` to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Error` or higher, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteIf/source3.cs._

## Debug.WriteIf(Boolean, String, String) method

```csharp
public static void WriteIf (bool condition, string? message, string? category);
```

Writes a category name and message to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the category name and message are written to the trace listeners in the collection.
- `message`: A message to write.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Verbose`, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Error` or higher, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteIf/source2.cs._

## Debug.WriteLine(Object) method

```csharp
public static void WriteLine (object? value);
```

Writes the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `value`: An object whose name is sent to the `Debug.Listeners`.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the name of the object on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLine/source1.cs._

## Debug.WriteLine(String) method

```csharp
public static void WriteLine (string? message);
```

Writes a message followed by a line terminator to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `message`: A message to write.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLine/source.cs._

## Debug.WriteLine(Object, String) method

```csharp
public static void WriteLine (object? value, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `value`: An object whose name is sent to the `Debug.Listeners`.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. The second message is followed by a line terminator.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLine/source3.cs._

## Debug.WriteLine(String, Object[]) method

```csharp
public static void WriteLine (string format, params object?[] args);
```

Writes a formatted message followed by a line terminator to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `format`: A composite format string that contains text intermixed with zero or more format items, which correspond to objects in the `args` array.
- `args`: An object array that contains zero or more objects to format.

#### Remarks
This method uses the .NET composite formatting feature to convert the value of an object to its text representation and embed that representation in a string.

The params (in C#) or ParamArray (in Visual Basic) keyword in the syntax for this method implies that the object array can be a single value. The exception to this is the `String` object. Explicit overloads take precedence, so an `arg` value of a single string will default to the `WriteLine` overload.

By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.WriteLine` method of the trace listener.
