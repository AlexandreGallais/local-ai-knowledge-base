---
title: "IsCopyConstructed class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IsCopyConstructed.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IsCopyConstructed class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class IsCopyConstructed
```

Indicates that any copying of values of this type must use the copy constructor provided by the type. This class cannot be inherited.

#### Remarks
Any type modified by the `IsCopyConstructed` class must implement a method named `MarshalCopy` that calls the native copy constructor.

Any native C++ type that is emitted into metadata with copy constructors needs to have those methods called by the marshaler when copying values across the marshaling boundary. The Microsoft C++ compiler modifies all native C++ types in method parameters and return types that have this modifier to trigger this behavior in the marshaling code.

Compilers emit custom modifiers within metadata to change the way that the just-in-time (JIT) compiler handles values when the default behavior is not appropriate. When the JIT compiler encounters a custom modifier, it handles the value in the way that the modifier specifies. Compilers can apply custom modifiers to methods, parameters, and return values. The JIT compiler must respond to required modifiers but can ignore optional modifiers.

You can emit custom modifiers into metadata using one of the following techniques:

- Using methods in the `TypeBuilder` class such as `TypeBuilder.DefineMethod`, `TypeBuilder.DefineField`, `TypeBuilder.DefineConstructor`, and `TypeBuilder.DefineProperty`.

- Generating a Microsoft intermediate language (MSIL) instruction file that contains calls to `modopt` and `modreq`, and assembling the file with the Ilasm.exe (IL Assembler).

- Using the unmanaged reflection API.
