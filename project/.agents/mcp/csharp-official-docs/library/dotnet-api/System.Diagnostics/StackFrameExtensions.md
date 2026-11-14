---
title: "StackFrameExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/StackFrameExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StackFrameExtensions class

Namespace: `System.Diagnostics`

```csharp
public static class StackFrameExtensions
```

Provides extension methods for the `StackFrame` class, which represents a function call on the call stack for the current thread.

To be added.

## StackFrameExtensions.GetNativeImageBase(StackFrame) method

```csharp
public static IntPtr GetNativeImageBase (this System.Diagnostics.StackFrame stackFrame);
```

Returns a pointer to the base address of the native image that this stack frame is executing.

Parameters:

- `stackFrame`: A stack frame.

Returns: A pointer to the base address of the native image (or `IntPtr.Zero` if you're targeting .NET Framework).

To be added.

## StackFrameExtensions.GetNativeIP(StackFrame) method

```csharp
public static IntPtr GetNativeIP (this System.Diagnostics.StackFrame stackFrame);
```

Gets an interface pointer to the start of the native code for the method that is being executed.

Parameters:

- `stackFrame`: A stack frame.

Returns: An interface pointer to the start of the native code for the method that is being executed (or `IntPtr.Zero` if you're targeting .NET Framework).

To be added.

## StackFrameExtensions.HasILOffset(StackFrame) method

```csharp
public static bool HasILOffset (this System.Diagnostics.StackFrame stackFrame);
```

Indicates whether an offset from the start of the IL code for the method that is executing is available.

Parameters:

- `stackFrame`: A stack frame.

Returns: `true` if the offset is available; otherwise, `false`.

To be added.

## StackFrameExtensions.HasMethod(StackFrame) method

```csharp
public static bool HasMethod (this System.Diagnostics.StackFrame stackFrame);
```

Indicates whether information about the method in which the specified frame is executing is available.

Parameters:

- `stackFrame`: A stack frame.

Returns: `true` if information about the method in which the current frame is executing is available; otherwise, `false`.

To be added.

## StackFrameExtensions.HasNativeImage(StackFrame) method

```csharp
public static bool HasNativeImage (this System.Diagnostics.StackFrame stackFrame);
```

Indicates whether the native image is available for the specified stack frame.

Parameters:

- `stackFrame`: A stack frame.

Returns: `true` if a native image is available for this stack frame; otherwise, `false`.

To be added.

## StackFrameExtensions.HasSource(StackFrame) method

```csharp
public static bool HasSource (this System.Diagnostics.StackFrame stackFrame);
```

Indicates whether the file that contains the code that the specified stack frame is executing is available.

Parameters:

- `stackFrame`: A stack frame.

Returns: `true` if the code that the specified stack frame is executing is available; otherwise, `false`.

To be added.
