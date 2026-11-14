---
title: "StackTrace class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/StackTrace.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StackTrace class

Namespace: `System.Diagnostics`

```csharp
public class StackTrace
```

Represents a stack trace, which is an ordered collection of one or more stack frames.

#### Remarks
`StackTrace` information will be most informative with Debug build configurations. By default, Debug builds include debug symbols, while Release builds do not. The debug symbols contain most of the file, method name, line number, and column information used in constructing `StackFrame` and `StackTrace` objects.

`StackTrace` might not report as many method calls as expected, due to code transformations that occur during optimization.

#### Examples
The following console application demonstrates how to create a simple `StackTrace` and iterate through its frames to obtain debugging and diagnostic information.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackTrace/Overview/stacktracesample1.cs._

## StackTrace.StackTrace() constructor

```csharp
public StackTrace ();
```

Initializes a new instance of the `StackTrace` class from the caller's frame.

#### Remarks
The `StackTrace` is created with the caller's current thread, and does not contain file name, line number, or column information.

Use this parameterless constructor when you want a complete trace with only summary method information about the call stack.

#### Examples
The following code example displays the first and last function calls in a stack trace.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackTrace.StackTrace(Boolean) constructor

```csharp
public StackTrace (bool fNeedFileInfo);
```

Initializes a new instance of the `StackTrace` class from the caller's frame, optionally capturing source information.

Parameters:

- `fNeedFileInfo`: `true` to capture the file name, line number, and column number; otherwise, `false`.

#### Remarks
The `StackTrace` is created with the caller's current thread.

#### Examples
The following code example demonstrates various `StackTrace` constructor methods.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackTrace.StackTrace(StackFrame>) constructor

```csharp
public StackTrace (System.Collections.Generic.IEnumerable<System.Diagnostics.StackFrame> frames);
```

Constructs a stack trace from a set of `StackFrame` objects.

Parameters:

- `frames`: The set of stack frames that should be present in the stack trace.

To be added.

## StackTrace.StackTrace(StackFrame) constructor

```csharp
public StackTrace (System.Diagnostics.StackFrame frame);
```

Initializes a new instance of the `StackTrace` class that contains a single frame.

Parameters:

- `frame`: The frame that the `StackTrace` object should contain.

#### Remarks
Use this constructor when you do not want the overhead of a full stack trace.

#### Examples
The following code example writes stack trace information to an event log entry.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/GetMethod/stacktracesample3.cs._

## StackTrace.StackTrace(Exception) constructor

```csharp
public StackTrace (Exception e);
```

Initializes a new instance of the `StackTrace` class using the provided exception object.

Parameters:

- `e`: The exception object from which to construct the stack trace.

Exceptions:

- `ArgumentNullException`: The parameter `e` is `null`.

#### Remarks
The `StackTrace` is created with the caller's current thread, and does not contain file name, line number, or column information.

The resulting stack trace describes the stack at the time of the exception.

## StackTrace.StackTrace(Int32) constructor

```csharp
public StackTrace (int skipFrames);
```

Initializes a new instance of the `StackTrace` class from the caller's frame, skipping the specified number of frames.

Parameters:

- `skipFrames`: The number of frames up the stack from which to start the trace.

Exceptions:

- `ArgumentOutOfRangeException`: The `skipFrames` parameter is negative.

#### Remarks
The `StackTrace` is created with the caller's current thread, and does not contain file name, line number, or column information.

If the number of frames to skip is greater than or equal to the total number of frames on the call stack at the time the instance is created, the `StackTrace` will contain no frames.

## StackTrace.StackTrace(Exception, Boolean) constructor

```csharp
public StackTrace (Exception e, bool fNeedFileInfo);
```

Initializes a new instance of the `StackTrace` class, using the provided exception object and optionally capturing source information.

Parameters:

- `e`: The exception object from which to construct the stack trace.
- `fNeedFileInfo`: `true` to capture the file name, line number, and column number; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The parameter `e` is `null`.

#### Remarks
The resulting stack trace describes the stack at the time of the exception.

## StackTrace.StackTrace(Exception, Int32) constructor

```csharp
public StackTrace (Exception e, int skipFrames);
```

Initializes a new instance of the `StackTrace` class using the provided exception object and skipping the specified number of frames.

Parameters:

- `e`: The exception object from which to construct the stack trace.
- `skipFrames`: The number of frames up the stack from which to start the trace.

Exceptions:

- `ArgumentNullException`: The parameter `e` is `null`.
- `ArgumentOutOfRangeException`: The `skipFrames` parameter is negative.

#### Remarks
The `StackTrace` does not contain file name, line number, or column information.

The resulting stack trace describes the stack at the time of the exception.

If the number of frames to skip is greater than or equal to the total number of frames on the call stack at the time the instance is created, the `StackTrace` will contain no frames.

## StackTrace.StackTrace(Int32, Boolean) constructor

```csharp
public StackTrace (int skipFrames, bool fNeedFileInfo);
```

Initializes a new instance of the `StackTrace` class from the caller's frame, skipping the specified number of frames and optionally capturing source information.

Parameters:

- `skipFrames`: The number of frames up the stack from which to start the trace.
- `fNeedFileInfo`: `true` to capture the file name, line number, and column number; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: The `skipFrames` parameter is negative.

#### Remarks
If the number of frames to skip is greater than or equal to the total number of frames on the call stack at the time the instance is created, the `StackTrace` will contain no frames.

#### Examples
The following code example demonstrates various `StackTrace` constructor methods.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackTrace.StackTrace(Exception, Int32, Boolean) constructor

```csharp
public StackTrace (Exception e, int skipFrames, bool fNeedFileInfo);
```

Initializes a new instance of the `StackTrace` class using the provided exception object, skipping the specified number of frames and optionally capturing source information.

Parameters:

- `e`: The exception object from which to construct the stack trace.
- `skipFrames`: The number of frames up the stack from which to start the trace.
- `fNeedFileInfo`: `true` to capture the file name, line number, and column number; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The parameter `e` is `null`.
- `ArgumentOutOfRangeException`: The `skipFrames` parameter is negative.

#### Remarks
The resulting stack trace describes the stack at the time of the exception.

If the number of frames to skip is greater than or equal to the total number of frames on the call stack at the time the instance is created, the `StackTrace` will contain no frames.

## StackTrace.FrameCount property

```csharp
public virtual int FrameCount { get; }
```

Gets the number of frames in the stack trace.

Returns: The number of frames in the stack trace.

#### Examples
The following code example displays the first and last function calls in a stack trace.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackTrace.GetFrame(Int32) method

```csharp
public virtual System.Diagnostics.StackFrame? GetFrame (int index);
```

Gets the specified stack frame.

Parameters:

- `index`: The index of the stack frame requested.

Returns: The specified stack frame.

#### Remarks
Stack frames are numbered starting at 0, which is the last stack frame pushed.

#### Examples
The following code example displays the first and last function calls in a stack trace.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackTrace.GetFrames() method

```csharp
public virtual System.Diagnostics.StackFrame[] GetFrames ();
```

Returns a copy of all stack frames in the current stack trace.

Returns: An array of type `StackFrame` representing the function calls in the stack trace.

#### Remarks
Use the returned `StackFrame` array to enumerate and examine function calls in the `StackTrace`. The length of the returned array is equal to the `FrameCount` property value.

The `StackFrame` array elements are in reverse chronological order. The `StackFrame` at array index 0 represents the most recent function call in the stack trace and the last frame pushed onto the call stack. The `StackFrame` at array index `StackTrace.FrameCount` minus 1 represents the oldest function call in the stack trace and the first frame pushed onto the call stack.

Use the `StackTrace.GetFrames` method to obtain all stack frames in a stack trace; use the `StackTrace.GetFrame` method to obtain a specific stack frame in a stack trace. The `StackFrame` indexes are ordered alike by the two methods. For example, the `StackFrame` at index 0 in the array returned by `StackTrace.GetFrames` is equivalent to the `StackFrame` returned by `StackTrace.GetFrame` with an input index of 0.

#### Examples
The following code example demonstrates enumerating the frames in a `StackTrace`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackTrace/GetFrames/stacktracesample2.cs._

## StackTrace.ToString() method

```csharp
public override string ToString ();
```

Builds a readable representation of the stack trace.

Returns: A readable representation of the stack trace.

#### Examples
The following code example writes stack trace information to an event log entry.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/GetMethod/stacktracesample3.cs._

## StackTrace.METHODS_TO_SKIP field

```csharp
public const int METHODS_TO_SKIP = 0;
```

Defines the default for the number of methods to omit from the stack trace. This field is constant.

#### Remarks
The default value for the number of methods to skip at the beginning of the stack trace. The value of this constant is 0.
