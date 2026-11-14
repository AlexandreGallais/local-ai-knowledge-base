---
title: "IsSignUnspecifiedByte class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IsSignUnspecifiedByte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IsSignUnspecifiedByte class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class IsSignUnspecifiedByte
```

Indicates that a modifier is neither signed nor unsigned. This class cannot be inherited.

#### Remarks
Some programming languages, such as C++, recognize three distinct `char` values: `signed char`, `unsigned char`, and `char`. To distinguish the unmodified `char` type from the others, the Microsoft C++ compiler adds the `IsSignUnspecifiedByte` modifier to each `char` type emitted to an assembly.

Compilers emit custom modifiers within metadata to change the way that the just-in-time (JIT) compiler handles values when the default behavior is not appropriate. When the JIT compiler encounters a custom modifier, it handles the value in the way that the modifier specifies. Compilers can apply custom modifiers to methods, parameters, and return values. The JIT compiler must respond to required modifiers but can ignore optional modifiers.

You can emit custom modifiers into metadata using one of the following techniques:

- Using methods in the `TypeBuilder` class such as `TypeBuilder.DefineMethod`, `TypeBuilder.DefineField`, `TypeBuilder.DefineConstructor`, and `TypeBuilder.DefineProperty`.

- Generating a Microsoft intermediate language (MSIL) instruction file that contains calls to `modopt` and `modreq`, and assembling the file with the Ilasm.exe (IL Assembler).

- Using the unmanaged reflection API.

#### Examples
The following code example creates an assembly using classes in the `Emit` namespace and emits the `IsSignUnspecifiedByte` modifier into that assembly.
