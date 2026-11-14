---
title: "TypeLibFuncAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibFuncAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibFuncAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeLibFuncAttribute : Attribute
```

Contains the `FUNCFLAGS` that were originally imported for this method from the COM type library.

#### Remarks
The Tlbimp.exe (Type Library Importer) applies this attribute to methods.

This attribute is applied when a type library is imported and should never be changed. It is only applied when the method's `FUNCFLAGS` evaluate to non zero. The attribute is designed to be used by tools that need to know how the original `FUNCFLAGS` were set. The common language runtime does not use this attribute.

#### Examples
The following example demonstrates how to get the `TypeLibFuncAttribute` value of a method.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComImportAttribute/Overview/codefile5.cs._

## TypeLibFuncAttribute.TypeLibFuncAttribute(Int16) constructor

```csharp
public TypeLibFuncAttribute (short flags);
```

Initializes a new instance of the `TypeLibFuncAttribute` class with the specified `TypeLibFuncFlags` value.

Parameters:

- `flags`: The `TypeLibFuncFlags` value for the attributed method as found in the type library it was imported from.

To be added.

## TypeLibFuncAttribute.TypeLibFuncAttribute(TypeLibFuncFlags) constructor

```csharp
public TypeLibFuncAttribute (System.Runtime.InteropServices.TypeLibFuncFlags flags);
```

Initializes a new instance of the `TypeLibFuncAttribute` class with the specified `TypeLibFuncFlags` value.

Parameters:

- `flags`: The `TypeLibFuncFlags` value for the attributed method as found in the type library it was imported from.

To be added.

## TypeLibFuncAttribute.Value property

```csharp
public System.Runtime.InteropServices.TypeLibFuncFlags Value { get; }
```

Gets the `TypeLibFuncFlags` value for this method.

Returns: The `TypeLibFuncFlags` value for this method.

To be added.
