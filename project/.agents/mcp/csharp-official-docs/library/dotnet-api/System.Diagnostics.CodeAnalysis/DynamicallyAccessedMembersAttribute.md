---
title: "DynamicallyAccessedMembersAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/DynamicallyAccessedMembersAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DynamicallyAccessedMembersAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class DynamicallyAccessedMembersAttribute : Attribute
```

Indicates that certain members on a specified `Type` are accessed dynamically, for example, through `Reflection`.

#### Remarks

This attribute allows tools to understand which members are being accessed during the execution of a program.
This attribute is valid on members whose type is `Type` or `String`.
When this attribute is applied to a location of type `String`, the assumption is that the string represents a fully qualified type name.
If the attribute is applied to a method, it's treated as a special case and it implies that the attribute should be applied to the "this" parameter of the method. The attribute should only be used on instance methods of types that are assignable to `Type` (or `string`, but no methods will use it there).
For more information, see Introduction to trim warnings.

## DynamicallyAccessedMembersAttribute.DynamicallyAccessedMembersAttribute(DynamicallyAccessedMemberTypes) constructor

```csharp
public DynamicallyAccessedMembersAttribute (System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes memberTypes);
```

Initializes a new instance of the `DynamicallyAccessedMembersAttribute` class with the specified member types.

Parameters:

- `memberTypes`: The types of the dynamically accessed members.

To be added.

## DynamicallyAccessedMembersAttribute.MemberTypes property

```csharp
public System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes MemberTypes { get; }
```

Gets the `DynamicallyAccessedMemberTypes` that specifies the type of dynamically accessed members.

Returns: To be added.

To be added.
