---
title: "DebuggableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggableAttribute class

Namespace: `System.Diagnostics`

```csharp
public sealed class DebuggableAttribute : Attribute
```

Modifies code generation for runtime just-in-time (JIT) debugging. This class cannot be inherited.

#### Remarks
The `DebuggableAttribute` controls how the runtime treats code within the module. The runtime might track extra information about generated code, and it might disable certain optimizations based on the values contained within this attribute.

A debugger might choose to ignore the `DebuggableAttribute` settings when loading an assembly. However, attaching a debugger to a running program may prevent the debugger from changing the settings because they have already been applied.

To use the `DebuggableAttribute` with dynamic assemblies using the Reflection Emit `AssemblyBuilder.DefineDynamicModule` methods, emit the `DebuggableAttribute` before calling the `AssemblyBuilder.DefineDynamicModule` methods to ensure that the settings are applied to the entire assembly.

For more information about using attributes, see Attributes.

## DebuggableAttribute.DebuggableAttribute(DebuggableAttribute+DebuggingModes) constructor

```csharp
public DebuggableAttribute (System.Diagnostics.DebuggableAttribute.DebuggingModes modes);
```

Initializes a new instance of the `DebuggableAttribute` class, using the specified debugging modes for the just-in-time (JIT) compiler.

Parameters:

- `modes`: A bitwise combination of the `DebuggingModes` values specifying the debugging mode for the JIT compiler.

#### Remarks
Calling the `%23ctor` constructor with a `modes` parameter value of `Default` is equivalent to calling the `%23ctor` constructor with an `isJITTrackingEnabled` parameter value of `true`.

## DebuggableAttribute.DebuggableAttribute(Boolean, Boolean) constructor

```csharp
public DebuggableAttribute (bool isJITTrackingEnabled, bool isJITOptimizerDisabled);
```

Initializes a new instance of the `DebuggableAttribute` class, using the specified tracking and optimization options for the just-in-time (JIT) compiler.

Parameters:

- `isJITTrackingEnabled`: `true` to enable debugging; otherwise, `false`.
- `isJITOptimizerDisabled`: `true` to disable the optimizer for execution; otherwise, `false`.

#### Remarks
This constructor sets the properties `DebuggableAttribute.IsJITTrackingEnabled` and `DebuggableAttribute.IsJITOptimizerDisabled`.

The `isJITTrackingEnabled` parameter has no effect. JIT tracking information, that is, the Microsoft intermediate language (MSIL) offset to the native-code offset within a method, is always generated.

An `isJITOptimizerDisabled` parameter value of `true` optimizes for debugging; a value of `false` optimizes for execution.

## DebuggableAttribute.DebuggingFlags property

```csharp
public System.Diagnostics.DebuggableAttribute.DebuggingModes DebuggingFlags { get; }
```

Gets the debugging modes for the attribute.

Returns: A bitwise combination of the `DebuggingModes` values describing the debugging mode for the just-in-time (JIT) compiler. The default is `DebuggingModes.Default`.

#### Remarks
The `DebuggingFlags` property controls how the runtime tracks information important to the debugger during code generation. This information helps the debugger provide a rich debugging experience.

## DebuggableAttribute.IsJITOptimizerDisabled property

```csharp
public bool IsJITOptimizerDisabled { get; }
```

Gets a value that indicates whether the runtime optimizer is disabled.

Returns: `true` if the runtime optimizer is disabled; otherwise, `false`.

#### Remarks
A value of `true` enhances performance for runtime debugging, which can cause a decline in execution performance. A value of `false` enhances performance for execution. When `DebuggableAttribute.IsJITOptimizerDisabled` is set to `false`, stepping through code might result in a different behavior than when set to `true` because the compiler might reorder instructions or insert jumps to common code.

## DebuggableAttribute.IsJITTrackingEnabled property

```csharp
public bool IsJITTrackingEnabled { get; }
```

Gets a value that indicates whether the runtime will track information during code generation for the debugger.

Returns: `true` if the runtime will track information during code generation for the debugger; otherwise, `false`.

JIT tracking information is always enabled during debugging, and this property value is ignored.
