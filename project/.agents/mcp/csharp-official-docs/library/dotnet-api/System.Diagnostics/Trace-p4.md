---
title: "Trace class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Trace.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Trace class (part 4 of 4)

## Trace.WriteLineIf(Boolean, Object, String) method

```csharp
public static void WriteLineIf (bool condition, object? value, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the trace listeners in the `Trace.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: `true` to cause a message to be written; otherwise, `false`.
- `value`: An `Object` whose name is sent to the `Trace.Listeners`.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples
The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Trace.Listeners`. For information on adding a listener to the `Trace.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. The second message is followed by a line terminator.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/WriteLineIf/source2.cs._

## Trace.WriteLineIf(Boolean, String, String) method

```csharp
public static void WriteLineIf (bool condition, string? message, string? category);
```

Writes a category name and message to the trace listeners in the `Trace.Listeners` collection if a condition is `true`.

Parameters:

- `condition`: `true` to cause a message to be written; otherwise, `false`.
- `message`: A message to write.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.WriteLine` method of the trace listener.

#### Examples
The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Trace.Listeners`. For information on adding a listener to the `Trace.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message and the `category` on the same line as the first message. The second message is followed by a line terminator.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/WriteLineIf/source1.cs._

## Trace.Refreshing event

```csharp
public static event EventHandler? Refreshing;
```

Occurs when a `TraceSource` needs to be refreshed from configuration.

To be added.
