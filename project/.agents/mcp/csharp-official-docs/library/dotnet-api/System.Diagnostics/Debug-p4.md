---
title: "Debug class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Debug.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Debug class (part 4 of 4)

## Debug.WriteLine(String, String) method

```csharp
public static void WriteLine (string? message, string? category);
```

Writes a category name and message to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `message`: A message to write.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message and the `category` on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLine/source2.cs._

## Debug.WriteLineIf(Boolean, Debug+WriteIfInterpolatedStringHandler) method

```csharp
public static void WriteLineIf (bool condition, ref System.Diagnostics.Debug.WriteIfInterpolatedStringHandler message);
```

Writes a message to the trace listeners in the `Debug.Listeners` collection if a specified condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the message is written to the trace listeners in the collection.
- `message`: The message to write.

#### Remarks

This overload has better performance than the overloads that take a `String` parameter. This overload only evaluates any interpolated string formatting items if the message is required.

By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.WriteLine` method of the trace listener.

## Debug.WriteLineIf(Boolean, Object) method

```csharp
public static void WriteLineIf (bool condition, object? value);
```

Writes the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the value is written to the trace listeners in the collection.
- `value`: An object whose name is sent to the `Debug.Listeners`.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the name of the object on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLineIf/source1.cs._

## Debug.WriteLineIf(Boolean, String) method

```csharp
public static void WriteLineIf (bool condition, string? message);
```

Writes a message to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the message is written to the trace listeners in the collection.
- `message`: The message to write.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information about adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLineIf/source.cs._

## Debug.WriteLineIf(Boolean, Debug+WriteIfInterpolatedStringHandler, String) method

```csharp
public static void WriteLineIf (bool condition, ref System.Diagnostics.Debug.WriteIfInterpolatedStringHandler message, string? category);
```

Writes a category name and message to the trace listeners in the `Debug.Listeners` collection if a specified condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the message and category name are written to the trace listeners in the collection.
- `message`: The message to write.
- `category`: A category name used to organize the output.

#### Remarks

This overload has better performance than the overloads that take a `String` parameter. This overload only evaluates any interpolated string formatting items if the message is required.

By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.WriteLine` method of the trace listener.

## Debug.WriteLineIf(Boolean, Object, String) method

```csharp
public static void WriteLineIf (bool condition, object? value, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the category name and value are written to the trace listeners in the collection.
- `value`: An object whose name is sent to the `Debug.Listeners`.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLineIf/source3.cs._

## Debug.WriteLineIf(Boolean, String, String) method

```csharp
public static void WriteLineIf (bool condition, string? message, string? category);
```

Writes a category name and message to the trace listeners in the `Debug.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the message and cateogry name are written to the trace listeners in the collection.
- `message`: The message to write.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message and the `category` on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/WriteLineIf/source2.cs._
