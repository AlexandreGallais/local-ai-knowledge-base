---
title: "JsonDerivedTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonDerivedTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonDerivedTypeAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public class JsonDerivedTypeAttribute : System.Text.Json.Serialization.JsonAttribute
```

When placed on a type declaration, indicates that the specified subtype should be opted into polymorphic serialization.

To be added.

## JsonDerivedTypeAttribute.JsonDerivedTypeAttribute(Type) constructor

```csharp
public JsonDerivedTypeAttribute (Type derivedType);
```

Initializes a new attribute with specified parameters.

Parameters:

- `derivedType`: A derived type that should be supported in polymorphic serialization of the declared based type.

To be added.

## JsonDerivedTypeAttribute.JsonDerivedTypeAttribute(Type, Int32) constructor

```csharp
public JsonDerivedTypeAttribute (Type derivedType, int typeDiscriminator);
```

Initializes a new attribute with specified parameters.

Parameters:

- `derivedType`: A derived type that should be supported in polymorphic serialization of the declared base type.
- `typeDiscriminator`: The type discriminator identifier to be used for the serialization of the subtype.

To be added.

## JsonDerivedTypeAttribute.JsonDerivedTypeAttribute(Type, String) constructor

```csharp
public JsonDerivedTypeAttribute (Type derivedType, string typeDiscriminator);
```

Initializes a new attribute with specified parameters.

Parameters:

- `derivedType`: A derived type that should be supported in polymorphic serialization of the declared base type.
- `typeDiscriminator`: The type discriminator identifier to be used for the serialization of the subtype.

To be added.

## JsonDerivedTypeAttribute.DerivedType property

```csharp
public Type DerivedType { get; }
```

A derived type that should be supported in polymorphic serialization of the declared base type.

Returns: To be added.

To be added.

## JsonDerivedTypeAttribute.TypeDiscriminator property

```csharp
public object? TypeDiscriminator { get; }
```

The type discriminator identifier to be used for the serialization of the subtype.

Returns: To be added.

To be added.
