---
title: "CallConvStdcall class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CallConvStdcall.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallConvStdcall class

Namespace: `System.Runtime.CompilerServices`

```csharp
public class CallConvStdcall
```

Indicates that a method should use the `StdCall` calling convention.

#### Remarks
The callee cleans the stack. This is the default convention for calling unmanaged functions from managed code.

The classes in `CompilerServices` are for compiler writers' use only.

Compilers emit custom modifiers within metadata to change the way that the just-in-time (JIT) compiler handles values when the default behavior is not appropriate.  When the JIT compiler encounters a custom modifier, it handles the value in the way that the modifier specifies.  Compilers can apply custom modifiers to methods, parameters, and return values.  The JIT compiler must respond to required modifiers but can ignore optional modifiers.  A C++ compiler could emit a custom modifier to describe how a byte should be treated in cases where the JIT compiler treats bytes in a manner that is not compatible with C++ by default.

You can emit custom modifiers into metadata using one of the following techniques:

- Using methods in the `TypeBuilder` class such as `TypeBuilder.DefineMethod`, `TypeBuilder.DefineField`, `TypeBuilder.DefineConstructor`, and `TypeBuilder.DefineProperty`.

- Generating a Microsoft intermediate language (MSIL) instruction file that contains calls to `modopt` and `modreq`, and assembling the file with the Ilasm.exe (IL Assembler).

- Using the unmanaged reflection API.

## CallConvStdcall.CallConvStdcall() constructor

```csharp
public CallConvStdcall ();
```

Initializes a new instance of the `CallConvStdcall` class.

#### Remarks
The classes in `CompilerServices` are for compiler writers' use only.
