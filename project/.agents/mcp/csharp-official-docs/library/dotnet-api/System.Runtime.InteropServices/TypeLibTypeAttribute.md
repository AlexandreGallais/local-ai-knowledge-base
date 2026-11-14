---
title: "TypeLibTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibTypeAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeLibTypeAttribute : Attribute
```

Contains the `TYPEFLAGS` that were originally imported for this type from the COM type library.

#### Remarks
The Tlbimp.exe (Type Library Importer) applies this attribute to classes or interfaces.

This attribute is applied when a type library is imported and should never be changed. It is only applied when the method's `TYPEFLAGS` evaluate to non-zero. The attribute is designed to be used by tools that need to know how the original `TYPEFLAGS` were set. The common language runtime does not use this attribute.

#### Examples
The following example demonstrates how to get the `TypeLibTypeAttribute` value of a class or interface.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComImportAttribute/Overview/codefile4.cs._

## TypeLibTypeAttribute.TypeLibTypeAttribute(Int16) constructor

```csharp
public TypeLibTypeAttribute (short flags);
```

Initializes a new instance of the `TypeLibTypeAttribute` class with the specified `TypeLibTypeFlags` value.

Parameters:

- `flags`: The `TypeLibTypeFlags` value for the attributed type as found in the type library it was imported from.

To be added.

## TypeLibTypeAttribute.TypeLibTypeAttribute(TypeLibTypeFlags) constructor

```csharp
public TypeLibTypeAttribute (System.Runtime.InteropServices.TypeLibTypeFlags flags);
```

Initializes a new instance of the `TypeLibTypeAttribute` class with the specified `TypeLibTypeFlags` value.

Parameters:

- `flags`: The `TypeLibTypeFlags` value for the attributed type as found in the type library it was imported from.

To be added.

## TypeLibTypeAttribute.Value property

```csharp
public System.Runtime.InteropServices.TypeLibTypeFlags Value { get; }
```

Gets the `TypeLibTypeFlags` value for this type.

Returns: The `TypeLibTypeFlags` value for this type.

To be added.
