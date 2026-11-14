---
title: "TypeAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TypeAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeAttributes enum

Namespace: `System.Reflection`

```csharp
public enum TypeAttributes
```

Specifies type attributes.

#### Remarks
Some of the members of the `TypeAttributes` enumeration are masks that represent a set of mutually exclusive attributes. For example, the `VisibilityMask` member includes the `NotPublic`, `Public`, `NestedPublic`, `NestedPrivate`, `NestedFamily`, `NestedAssembly`, `NestedFamANDAssem`, and `NestedFamORAssem` members. Because each attribute set includes a member whose underlying value is zero, you should first `And` the value of the mask with the specific `TypeAttributes` value retrieved from a property such as `Type.Attributes`. The following table lists the masks and the individual members that they include:

|Mask|Includes|
|----------|--------------|
|VisibilityMask|NotPublic  Public  NestedPublic  NestedPrivate  NestedFamily  NestedAssembly  NestedFamANDAssem  NestedFamORAssem|
|LayoutMask|AutoLayout  SequentialLayout  ExplicitLayout|
|ClassSemanticsMask|Class  Interface|
|StringFormatMask|AnsiClass  UnicodeClass  AutoClass  CustomFormatClass|
|CustomFormatMask|No members.|

The members of this enumerator class match the CorTypeAttr enumerator as defined in the corhdr.h file.

#### Examples
The following example retrieves the value of the `Attributes` property for `Type` objects that represent a number of different types, and then determines whether individual attribute flags have been set.

_Code sample not included: ~/snippets/csharp/System/Type/Attributes/attributes1.cs._

## TypeAttributes.Abstract field

```csharp
Abstract
```

Specifies that the type is abstract.

## TypeAttributes.AnsiClass field

```csharp
AnsiClass
```

LPTSTR is interpreted as ANSI.

## TypeAttributes.AutoClass field

```csharp
AutoClass
```

LPTSTR is interpreted automatically.

## TypeAttributes.AutoLayout field

```csharp
AutoLayout
```

Specifies that class fields are automatically laid out by the common language runtime.

## TypeAttributes.BeforeFieldInit field

```csharp
BeforeFieldInit
```

Specifies that calling static methods of the type does not force the system to initialize the type.

## TypeAttributes.Class field

```csharp
Class
```

Specifies that the type is a class.

## TypeAttributes.ClassSemanticsMask field

```csharp
ClassSemanticsMask
```

Specifies class semantics information; the current class is contextful (else agile).

## TypeAttributes.CustomFormatClass field

```csharp
CustomFormatClass
```

LPSTR is interpreted by some implementation-specific means, which includes the possibility of throwing a `NotSupportedException`. Not used in the Microsoft implementation of .NET.

## TypeAttributes.CustomFormatMask field

```csharp
CustomFormatMask
```

Used to retrieve non-standard encoding information for native interop. The meaning of the values of these 2 bits is unspecified. Not used in the Microsoft implementation of .NET.

## TypeAttributes.ExplicitLayout field

```csharp
ExplicitLayout
```

Specifies that class fields are laid out at the specified offsets.

## TypeAttributes.ExtendedLayout field

```csharp
ExtendedLayout
```

To be added.

## TypeAttributes.HasSecurity field

```csharp
HasSecurity
```

Type has security associate with it.

## TypeAttributes.Import field

```csharp
Import
```

Specifies that the class or interface is imported from another module.

## TypeAttributes.Interface field

```csharp
Interface
```

Specifies that the type is an interface.

## TypeAttributes.LayoutMask field

```csharp
LayoutMask
```

Specifies class layout information.

## TypeAttributes.NestedAssembly field

```csharp
NestedAssembly
```

Specifies that the class is nested with assembly visibility, and is thus accessible only by methods within its assembly.

## TypeAttributes.NestedFamANDAssem field

```csharp
NestedFamANDAssem
```

Specifies that the class is nested with assembly and family visibility, and is thus accessible only by methods lying in the intersection of its family and assembly.

## TypeAttributes.NestedFamily field

```csharp
NestedFamily
```

Specifies that the class is nested with family visibility, and is thus accessible only by methods within its own type and any derived types.

## TypeAttributes.NestedFamORAssem field

```csharp
NestedFamORAssem
```

Specifies that the class is nested with family or assembly visibility, and is thus accessible only by methods lying in the union of its family and assembly.

## TypeAttributes.NestedPrivate field

```csharp
NestedPrivate
```

Specifies that the class is nested with private visibility.

## TypeAttributes.NestedPublic field

```csharp
NestedPublic
```

Specifies that the class is nested with public visibility.

## TypeAttributes.NotPublic field

```csharp
NotPublic
```

Specifies that the class is not public.

## TypeAttributes.Public field

```csharp
Public
```

Specifies that the class is public.

## TypeAttributes.ReservedMask field

```csharp
ReservedMask
```

Attributes reserved for runtime use.

## TypeAttributes.RTSpecialName field

```csharp
RTSpecialName
```

Runtime should check name encoding.

## TypeAttributes.Sealed field

```csharp
Sealed
```

Specifies that the class is concrete and cannot be extended.

## TypeAttributes.SequentialLayout field

```csharp
SequentialLayout
```

Specifies that class fields are laid out sequentially, in the order that the fields were emitted to the metadata.

## TypeAttributes.Serializable field

```csharp
Serializable
```

Specifies that the class can be serialized.

## TypeAttributes.SpecialName field

```csharp
SpecialName
```

Specifies that the class is special in a way denoted by the name.

## TypeAttributes.StringFormatMask field

```csharp
StringFormatMask
```

Used to retrieve string information for native interoperability.

## TypeAttributes.UnicodeClass field

```csharp
UnicodeClass
```

LPTSTR is interpreted as UNICODE.

## TypeAttributes.VisibilityMask field

```csharp
VisibilityMask
```

Specifies type visibility information.

## TypeAttributes.WindowsRuntime field

```csharp
WindowsRuntime
```

Specifies a Windows Runtime type.
