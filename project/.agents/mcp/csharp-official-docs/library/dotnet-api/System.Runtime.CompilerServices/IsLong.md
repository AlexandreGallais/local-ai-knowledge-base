---
title: "IsLong class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IsLong.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IsLong class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class IsLong
```

Indicates that a modified integer is a standard C++ `long` value. This class cannot be inherited.

#### Remarks
The C++ standard indicates that a `long` value and an integer value are distinct types.  However, they are both represented using `ELEMENT_TYPE_I4` in an assembly.  To distinguish a `long` from an integer in C++, the Microsoft C++ compiler adds the `IsLong` modifier to any instance of a `long` when the instance is emited.  This process is critically important for maintaining language-level type safety.

Compilers emit custom modifiers within metadata to change the way that the just-in-time (JIT) compiler handles values when the default behavior is not appropriate.  When the JIT compiler encounters a custom modifier, it handles the value in the way that the modifier specifies.  Compilers can apply custom modifiers to methods, parameters, and return values.  The JIT compiler must respond to required modifiers but can ignore optional modifiers.

You can emit custom modifiers into metadata using one of the following techniques:

- Using methods in the `TypeBuilder` class such as `TypeBuilder.DefineMethod`, `TypeBuilder.DefineField`, `TypeBuilder.DefineConstructor`, and `TypeBuilder.DefineProperty`.

- Generating a Microsoft intermediate language (MSIL) instruction file that contains calls to `modopt` and `modreq`, and assembling the file with the Ilasm.exe (IL Assembler).

- Using the unmanaged reflection API.

#### Examples
The following example demonstrates how to emit an `IsLong` object into an assembly using reflection.
