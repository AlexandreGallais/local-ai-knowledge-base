---
title: "JsonDerivedType struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonDerivedType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonDerivedType struct

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public readonly struct JsonDerivedType
```

Represents a supported derived type defined in the metadata of a polymorphic type.

To be added.

## JsonDerivedType.JsonDerivedType(Type) constructor

```csharp
public JsonDerivedType (Type derivedType);
```

Initializes a new instance of the `JsonDerivedType` class that represents a supported derived type without a type discriminator.

Parameters:

- `derivedType`: The derived type to be supported by the polymorphic type metadata.

To be added.

## JsonDerivedType.JsonDerivedType(Type, Int32) constructor

```csharp
public JsonDerivedType (Type derivedType, int typeDiscriminator);
```

Initializes a new instance of the `JsonDerivedType` class that represents a supported derived type with an integer type discriminator.

Parameters:

- `derivedType`: The derived type to be supported by the polymorphic type metadata.
- `typeDiscriminator`: The type discriminator to be associated with the derived type.

To be added.

## JsonDerivedType.JsonDerivedType(Type, String) constructor

```csharp
public JsonDerivedType (Type derivedType, string typeDiscriminator);
```

Initializes a new instance of the `JsonDerivedType` class that represents a supported derived type with a string type discriminator.

Parameters:

- `derivedType`: The derived type to be supported by the polymorphic type metadata.
- `typeDiscriminator`: The type discriminator to be associated with the derived type.

To be added.

## JsonDerivedType.DerivedType property

```csharp
public Type DerivedType { get; }
```

Gets a derived type that should be supported in polymorphic serialization of the declared base type.

Returns: To be added.

To be added.

## JsonDerivedType.TypeDiscriminator property

```csharp
public object? TypeDiscriminator { get; }
```

Gets the type discriminator identifier to be used for the serialization of the subtype.

Returns: To be added.

To be added.
