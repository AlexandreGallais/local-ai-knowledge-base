---
title: "NativeCppClassAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/NativeCppClassAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NativeCppClassAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class NativeCppClassAttribute : Attribute
```

Applies metadata to an assembly that indicates that a type is an unmanaged type. This class cannot be inherited.

#### Remarks
Compilers use the `NativeCppClassAttribute` attribute when building assemblies to indicate that a type is an unmanaged type defined in C or C++. This attribute is used later to correctly handle the unmanaged type when it is imported during interop.

## NativeCppClassAttribute.NativeCppClassAttribute() constructor

```csharp
public NativeCppClassAttribute ();
```

Initializes a new instance of the `NativeCppClassAttribute` class.

#### Remarks
Compilers use the `NativeCppClassAttribute` attribute when building assemblies to indicate that a type is an unmanaged type defined in C or C++. This attribute is used later to correctly handle the unmanaged type when it is imported during interop.
