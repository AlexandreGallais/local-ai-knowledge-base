---
title: "TypeIdentifierAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeIdentifierAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeIdentifierAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeIdentifierAttribute : Attribute
```

Provides support for type equivalence.

#### Remarks
The `TypeIdentifierAttribute` attribute is primarily emitted by compilers. It serves two purposes:

- For all imported types, it indicates that the type is intended to be used for type equivalence.

- For types that don't have GUIDs in their type library, it has a constructor that takes two strings (`scope` and `identifier`). These are combined into a GUID and become the key that is used for type equivalence.

Type equivalence is discussed in the `Type.IsEquivalentTo` topic.

## TypeIdentifierAttribute.TypeIdentifierAttribute() constructor

```csharp
public TypeIdentifierAttribute ();
```

Creates a new instance of the `TypeIdentifierAttribute` class.

#### Remarks
This constructor overload does not accept parameters. Therefore, interfaces that have this attribute use the type's GUID and simple name to establish type equivalence.

## TypeIdentifierAttribute.TypeIdentifierAttribute(String, String) constructor

```csharp
public TypeIdentifierAttribute (string? scope, string? identifier);
```

Creates a new instance of the `TypeIdentifierAttribute` class with the specified scope and identifier.

Parameters:

- `scope`: The first type equivalence string.
- `identifier`: The second type equivalence string.

#### Remarks
The `scope` and `identifier` parameters are used to establish type equivalence. They are combined into a GUID and become the key that is used for type equivalence. This constructor is particularly useful for types that do not have GUIDs in their type library.

The `TypeIdentifierAttribute` class internally maintains the `scope` and `identifier` parameters as private members.

## TypeIdentifierAttribute.Identifier property

```csharp
public string? Identifier { get; }
```

Gets the value of the `identifier` parameter that was passed to the `TypeIdentifierAttribute.#ctor` constructor.

Returns: The value of the constructor's `identifier` parameter.

To be added.

## TypeIdentifierAttribute.Scope property

```csharp
public string? Scope { get; }
```

Gets the value of the `scope` parameter that was passed to the `TypeIdentifierAttribute.#ctor` constructor.

Returns: The value of the constructor's `scope` parameter.

To be added.
