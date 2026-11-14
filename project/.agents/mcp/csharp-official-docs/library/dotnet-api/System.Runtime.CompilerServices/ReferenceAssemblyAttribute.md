---
title: "ReferenceAssemblyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ReferenceAssemblyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReferenceAssemblyAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class ReferenceAssemblyAttribute : Attribute
```

Identifies an assembly as a reference assembly, which contains metadata but no executable code.

#### Remarks
A reference assembly contains public surface area but no usable implementation. Reference assemblies can be loaded for introspection, but not for execution.

## ReferenceAssemblyAttribute.ReferenceAssemblyAttribute() constructor

```csharp
public ReferenceAssemblyAttribute ();
```

Initializes a new instance of the `ReferenceAssemblyAttribute` class.

To be added.

## ReferenceAssemblyAttribute.ReferenceAssemblyAttribute(String) constructor

```csharp
public ReferenceAssemblyAttribute (string? description);
```

Initializes a new instance of the `ReferenceAssemblyAttribute` class by using the specified description.

Parameters:

- `description`: The description of the reference assembly.

To be added.

## ReferenceAssemblyAttribute.Description property

```csharp
public string? Description { get; }
```

Gets the description of the reference assembly.

Returns: The description of the reference assembly.

To be added.
