---
title: "TypeLibVarAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibVarAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibVarAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeLibVarAttribute : Attribute
```

Contains the `VARFLAGS` that were originally imported for this field from the COM type library.

#### Remarks
The Tlbimp.exe (Type Library Importer) applies this attribute to fields.

This attribute is applied when a type library is imported and should never be changed. It is only applied when the method's `VARFLAGS` evaluate to non-zero. The attribute is designed to be used by tools that need to know how the original `VARFLAGS` were set. The common language runtime does not use this attribute.

#### Examples
The following example demonstrates how to get the `TypeLibVarAttribute` value of a field.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/TypeLibVarAttribute/Overview/codefile6.cs._

## TypeLibVarAttribute.TypeLibVarAttribute(Int16) constructor

```csharp
public TypeLibVarAttribute (short flags);
```

Initializes a new instance of the `TypeLibVarAttribute` class with the specified `TypeLibVarFlags` value.

Parameters:

- `flags`: The `TypeLibVarFlags` value for the attributed field as found in the type library it was imported from.

To be added.

## TypeLibVarAttribute.TypeLibVarAttribute(TypeLibVarFlags) constructor

```csharp
public TypeLibVarAttribute (System.Runtime.InteropServices.TypeLibVarFlags flags);
```

Initializes a new instance of the `TypeLibVarAttribute` class with the specified `TypeLibVarFlags` value.

Parameters:

- `flags`: The `TypeLibVarFlags` value for the attributed field as found in the type library it was imported from.

To be added.

## TypeLibVarAttribute.Value property

```csharp
public System.Runtime.InteropServices.TypeLibVarFlags Value { get; }
```

Gets the `TypeLibVarFlags` value for this field.

Returns: The `TypeLibVarFlags` value for this field.

To be added.
