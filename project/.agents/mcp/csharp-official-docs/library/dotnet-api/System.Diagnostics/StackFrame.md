---
title: "StackFrame class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/StackFrame.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StackFrame class

Namespace: `System.Diagnostics`

```csharp
public class StackFrame
```

Provides information about a `StackFrame`, which represents a function call on the call stack for the current thread.

#### Remarks
A `StackFrame` is created and pushed on the call stack for every function call made during the execution of a thread. The stack frame always includes `MethodBase` information, and optionally includes file name, line number, and column number information.

`StackFrame` information will be most informative with Debug build configurations. By default, Debug builds include debug symbols, while Release builds do not. The debug symbols contain most of the file, method name, line number, and column information used in constructing `StackFrame` objects.

#### Examples
The following example demonstrates the use of the `StackFrame` class to provide the stack frame information for a stack trace.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/program.cs._

The following example demonstrates the use of  the members of the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.StackFrame() constructor

```csharp
public StackFrame ();
```

Initializes a new instance of the `StackFrame` class.

To be added.

## StackFrame.StackFrame(Boolean) constructor

```csharp
public StackFrame (bool needFileInfo);
```

Initializes a new instance of the `StackFrame` class, optionally capturing source information.

Parameters:

- `needFileInfo`: To be added.

#### Examples
The following example demonstrates the use of the `%23ctor` constructor. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.StackFrame(Int32) constructor

```csharp
public StackFrame (int skipFrames);
```

Initializes a new instance of the `StackFrame` class that corresponds to a frame above the current stack frame.

Parameters:

- `skipFrames`: The number of frames up the stack to skip.

#### Examples
The following example demonstrates the use of the `%23ctor` constructor. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.StackFrame(Int32, Boolean) constructor

```csharp
public StackFrame (int skipFrames, bool needFileInfo);
```

Initializes a new instance of the `StackFrame` class that corresponds to a frame above the current stack frame, optionally capturing source information.

Parameters:

- `skipFrames`: The number of frames up the stack to skip.
- `needFileInfo`: To be added.

#### Examples
The following example demonstrates the use of the `%23ctor` constructor. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.StackFrame(String, Int32) constructor

```csharp
public StackFrame (string? fileName, int lineNumber);
```

Initializes a new instance of the `StackFrame` class that contains only the given file name and line number.

Parameters:

- `fileName`: The file name.
- `lineNumber`: The line number in the specified file.

#### Remarks
Use this constructor when you do not want to use the debugger's line mapping logic.

#### Examples
The following example demonstrates the use of the `%23ctor` constructor. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.StackFrame(String, Int32, Int32) constructor

```csharp
public StackFrame (string? fileName, int lineNumber, int colNumber);
```

Initializes a new instance of the `StackFrame` class that contains only the given file name, line number, and column number.

Parameters:

- `fileName`: The file name.
- `lineNumber`: The line number in the specified file.
- `colNumber`: The column number in the specified file.

#### Remarks
Use this constructor when you do not want to use the debugger's line mapping logic.

#### Examples
The following example demonstrates the use of the `StackFrame.%23ctor` constructor. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.GetFileColumnNumber() method

```csharp
public virtual int GetFileColumnNumber ();
```

Gets the column number in the file that contains the code that is executing. This information is typically extracted from the debugging symbols for the executable.

Returns: The file column number, or 0 (zero) if the file column number cannot be determined.

#### Examples
The following example demonstrates the use of the `StackFrame.GetFileColumnNumber` method. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.GetFileLineNumber() method

```csharp
public virtual int GetFileLineNumber ();
```

Gets the line number in the file that contains the code that is executing. This information is typically extracted from the debugging symbols for the executable.

Returns: The file line number, or 0 (zero) if the file line number cannot be determined.

#### Examples
The following example demonstrates the use of the `StackFrame.GetFileLineNumber` method. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.GetFileName() method

```csharp
public virtual string? GetFileName ();
```

Gets the file name that contains the code that is executing. This information is typically extracted from the debugging symbols for the executable.

Returns: The file name, or `null` if the file name cannot be determined.

#### Examples
The following example demonstrates the use of the `StackFrame.GetFileName` method. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.GetILOffset() method

```csharp
public virtual int GetILOffset ();
```

Gets the offset from the start of the Microsoft intermediate language (MSIL) code for the method that is executing. This offset might be an approximation depending on whether or not the just-in-time (JIT) compiler is generating debugging code. The generation of this debugging information is controlled by the `DebuggableAttribute`.

Returns: The offset from the start of the MSIL code for the method that is executing.

#### Examples
The following example demonstrates the use of the `StackFrame.GetILOffset` method. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.GetMethod() method

```csharp
public virtual System.Reflection.MethodBase? GetMethod ();
```

Gets the method in which the frame is executing.

Returns: The method in which the frame is executing.

#### Remarks
The method that is currently executing may be inherited from a base class, although it is called in a derived class. In this case, the `ReflectedType` property of the `MethodBase` object that is returned by `StackFrame.GetMethod` identifies the base class, not the derived class.

#### Examples
The following example demonstrates the use of the `StackFrame.GetMethod` method. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/GetMethod/stacktracesample3.cs._

## StackFrame.GetNativeOffset() method

```csharp
public virtual int GetNativeOffset ();
```

Gets the offset from the start of the native just-in-time (JIT)-compiled code for the method that is being executed. The generation of this debugging information is controlled by the `DebuggableAttribute` class.

Returns: The offset from the start of the JIT-compiled code for the method that is being executed.

#### Examples
The following example demonstrates the use of the `StackFrame.GetNativeOffset` method. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.ToString() method

```csharp
public override string ToString ();
```

Builds a readable representation of the stack trace.

Returns: A readable representation of the stack trace.

#### Examples
The following example demonstrates the use of the `StackFrame.ToString` method. This code example is part of a larger example provided for the `StackFrame` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/StackFrame/Overview/source.cs._

## StackFrame.OFFSET_UNKNOWN field

```csharp
public const int OFFSET_UNKNOWN = -1;
```

Defines the value that is returned from the `StackFrame.GetNativeOffset` or `StackFrame.GetILOffset` method when the native or Microsoft intermediate language (MSIL) offset is unknown. This field is constant.

#### Remarks
The value of this constant is -1.
