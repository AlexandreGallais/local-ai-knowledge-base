---
title: "IsExplicitlyDereferenced class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IsExplicitlyDereferenced.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IsExplicitlyDereferenced class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class IsExplicitlyDereferenced
```

Indicates that a managed pointer represents a pointer parameter within a method signature. This class cannot be inherited.

#### Remarks
In C++, managed pointers and managed references are emitted into metadata as pointers.  To distinguish between the two types in metadata, the Microsoft  C++ compiler applies this modifier to managed pointers.  It emits no modifier on managed reference types.  Compilers need to know the correct calling syntax when importing a method from metadata scope.  The `IsExplicitlyDereferenced` class and its partner, the `IsImplicitlyDereferenced` class, disambiguate reference parameters from pointer parameters.

Compilers emit custom modifiers within metadata to change the way that the just-in-time (JIT) compiler handles values when the default behavior is not appropriate.  When the JIT compiler encounters a custom modifier, it handles the value in the way that the modifier specifies.  Compilers can apply custom modifiers to methods, parameters, and return values.  The JIT compiler must respond to required modifiers but can ignore optional modifiers.

You can emit custom modifiers into metadata using one of the following techniques:

- Using methods in the `TypeBuilder` class such as `TypeBuilder.DefineMethod`, `TypeBuilder.DefineField`, `TypeBuilder.DefineConstructor`, and `TypeBuilder.DefineProperty`.

- Generating a Microsoft intermediate language (MSIL) instruction file that contains calls to `modopt` and `modreq`, and assembling the file with the Ilasm.exe (IL Assembler).

- Using the unmanaged reflection API.

#### Examples
The following example demonstrates how to emit an `IsExplicitlyDereferenced` object into an assembly using reflection.
