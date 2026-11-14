---
title: "ModuleInitializerAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ModuleInitializerAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ModuleInitializerAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class ModuleInitializerAttribute : Attribute
```

Used to indicate to the compiler that a method should be called in its containing module's initializer.

#### Remarks

When one or more valid methods with this attribute are found in a compilation, the compiler will emit a module initializer that calls each of the attributed methods.

Certain requirements are imposed on any method targeted with this attribute:

- The method must be `static`.
- The method must be an ordinary member method, as opposed to a property accessor, constructor, local function, and so on.
- The method must be parameterless.
- The method must return `void`.
- The method must not be generic or be contained in a generic type.
- The method's effective accessibility must be `internal` or `public`.

For more information, see the specification for module initializers.

## ModuleInitializerAttribute.ModuleInitializerAttribute() constructor

```csharp
public ModuleInitializerAttribute ();
```

Initializes a new instance of the `ModuleInitializerAttribute` class.

#### Remarks

The `ModuleInitializerAttribute` attribute provides additional runtime guarantees to methods. For example, the marked methods are guaranteed to run before any other method is invoked or any field is accessed in the whole module.
