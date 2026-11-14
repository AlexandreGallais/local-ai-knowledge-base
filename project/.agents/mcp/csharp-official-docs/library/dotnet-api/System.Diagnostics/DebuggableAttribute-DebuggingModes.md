---
title: "DebuggableAttribute+DebuggingModes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DebuggableAttribute+DebuggingModes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebuggableAttribute+DebuggingModes enum

Namespace: `System.Diagnostics`

```csharp
public enum DebuggableAttribute.DebuggingModes
```

Specifies the debugging mode for the just-in-time (JIT) compiler.

#### Remarks
The `DebuggingModes` enumeration specifies how the runtime is to track information important to the debugger during code generation. This information helps the debugger provide a rich debugging experience. You can't turn off tracking by the just-in-time (JIT) compiler. JIT tracking is always enabled for debuggable files. The enumeration values have the following effects:

| Debugging mode                        | Result                                  |
|---------------------------------------|-----------------------------------------|
| `None`                                | Tracking on, JIT optimizations enabled  |
| `Default`                             | Tracking on, JIT optimizations enabled  |
| `DisableOptimizations`                | Tracking on, JIT optimizations enabled  |
| `Default | DisableOptimizations` | Tracking on, JIT optimizations disabled |

Sequence points are used to indicate locations in the Microsoft intermediate language (MSIL) code that a debugger user expects to be able to refer to uniquely, such as for setting a breakpoint. The JIT compiler ensures it does not compile the MSIL at two different sequence points into a single native instruction. By default, the JIT compiler examines the symbol store in the program database (PDB) file for a list of additional sequence points. However, loading the PDB file requires that the file be available and has a negative performance impact. Starting with version 2.0, compilers can emit "implicit sequence points" in the MSIL code stream through the use of MSIL "`nop"` instructions. Such compilers should set the `IgnoreSymbolStoreSequencePoints` flag to notify the common language runtime to not load the PDB file.

> **Note:**
> This enumeration is primarily used by language developers. It is generally not used in application development. Development environments use `DebuggingModes` based on compiler parameters such as **/debug** and **/optimize**.

## DebuggableAttribute+DebuggingModes.Default field

```csharp
Default
```

Instructs the just-in-time (JIT) compiler to use its default behavior, which includes enabling optimizations, disabling Edit and Continue support, and using symbol store sequence points if present. JIT tracking information is always generated.

## DebuggableAttribute+DebuggingModes.DisableOptimizations field

```csharp
DisableOptimizations
```

Disable optimizations performed by the compiler to make your output file smaller, faster, and more efficient. Optimizations result in code rearrangement in the output file, which can make debugging difficult. Typically optimization should be disabled while debugging. In versions 2.0 or later, combine this value with Default (Default | DisableOptimizations) to enable JIT tracking and disable optimizations.

## DebuggableAttribute+DebuggingModes.EnableEditAndContinue field

```csharp
EnableEditAndContinue
```

Enable edit and continue. Edit and continue enables you to make changes to your source code while your program is in break mode. The ability to edit and continue is compiler dependent.

## DebuggableAttribute+DebuggingModes.IgnoreSymbolStoreSequencePoints field

```csharp
IgnoreSymbolStoreSequencePoints
```

Use the implicit MSIL sequence points, not the program database (PDB) sequence points. The symbolic information normally includes at least one Microsoft intermediate language (MSIL) offset for each source line. When the just-in-time (JIT) compiler is about to compile a method, it asks the profiling services for a list of MSIL offsets that should be preserved. These MSIL offsets are called sequence points.

## DebuggableAttribute+DebuggingModes.None field

```csharp
None
```

JIT tracking information is always generated, so this flag has the same effect as `DebuggingModes.Default`, except that it sets the `DebuggableAttribute.IsJITTrackingEnabled` property to `false`. However, because JIT tracking is always enabled, the property value is ignored.

Unlike the `DebuggingModes.DisableOptimizations` flag, the `DebuggingModes.None` flag cannot be used to disable JIT optimizations.
