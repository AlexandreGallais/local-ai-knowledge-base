---
title: "CLSCompliantAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/CLSCompliantAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CLSCompliantAttribute class

Namespace: `System`

```csharp
public sealed class CLSCompliantAttribute : Attribute
```

Indicates whether a program element is compliant with the Common Language Specification (CLS). This class cannot be inherited.

#### Remarks
The `CLSCompliantAttribute` attribute is used to indicate whether a particular program element complies with the Common Language Specification (CLS), which defines the features that any language that targets .NET must support. CLS compliance is primarily of concern to library developers who want to ensure that their libraries are accessible in any language that targets .NET. For more information, See Language Independence and Language-Independent Components.

You can apply the `CLSCompliantAttribute` attribute to the following program elements: assembly, module, class, struct, enum, constructor, method, property, field, event, interface, delegate, parameter, and return value. However, the notion of CLS compliance is only meaningful for assemblies, modules, types, and members of types, not parts of a member signature. Consequently, `CLSCompliantAttribute` is ignored when applied to parameter or return value program elements.

If no `CLSCompliantAttribute` is applied to a program element, then by default:

- The assembly is not CLS-compliant.

- The type is CLS-compliant only if its enclosing type or assembly is CLS-compliant.

- The member of a type is CLS-compliant only if the type is CLS-compliant.

If an assembly is marked as CLS-compliant, any publicly exposed type in the assembly that is not CLS-compliant must be marked with `CLSCompliantAttribute` using a `false` argument. Similarly, if a class is marked as CLS-compliant, you must individually mark all members that are not CLS-compliant. All non-compliant members must provide corresponding CLS-compliant alternatives.

Attributes that are applied to assemblies or modules must occur after the C# `using` (`Imports` in Visual Basic) clauses and before the code.

For more information about using attributes, see Attributes.

> **Note:**
>  The current Microsoft Visual Basic <example-value> intentionally does not generate a CLS-compliance warning, however, a future release of the compiler will issue that warning.

#### Examples
The following example applies a `CLSCompliantAttribute` to the entire assembly.

```csharp
using System;
    [assembly: CLSCompliant(true)]
```

The following declaration generates a CLS-compliance warning because the type `UInt32` is not specified in the CLS.

```csharp
public int SetValue(UInt32 value);
```

If the declaration is marked with a `CLSCompliantAttribute`, no compiler warning or error is generated.

```csharp
[CLSCompliant(false)]
 public int SetValue(UInt32 value);
```

## CLSCompliantAttribute.CLSCompliantAttribute(Boolean) constructor

```csharp
public CLSCompliantAttribute (bool isCompliant);
```

Initializes an instance of the `CLSCompliantAttribute` class with a Boolean value indicating whether the indicated program element is CLS-compliant.

Parameters:

- `isCompliant`: `true` if CLS-compliant; otherwise, `false`.

To be added.

## CLSCompliantAttribute.IsCompliant property

```csharp
public bool IsCompliant { get; }
```

Gets the Boolean value indicating whether the indicated program element is CLS-compliant.

Returns: `true` if the program element is CLS-compliant; otherwise, `false`.

To be added.
