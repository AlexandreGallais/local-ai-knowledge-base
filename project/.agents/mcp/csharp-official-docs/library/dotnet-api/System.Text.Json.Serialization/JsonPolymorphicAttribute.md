---
title: "JsonPolymorphicAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonPolymorphicAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonPolymorphicAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonPolymorphicAttribute : System.Text.Json.Serialization.JsonAttribute
```

When placed on a type, indicates that the type should be serialized polymorphically.

To be added.

## JsonPolymorphicAttribute.JsonPolymorphicAttribute() constructor

```csharp
public JsonPolymorphicAttribute ();
```

Creates a new `JsonPolymorphicAttribute` instance.

To be added.

## JsonPolymorphicAttribute.IgnoreUnrecognizedTypeDiscriminators property

```csharp
public bool IgnoreUnrecognizedTypeDiscriminators { get; set; }
```

Gets or sets a value that indicates whether the deserializer should ignore any unrecognized type discriminator IDs and revert to the contract of the base type.

Returns: `true` to instruct the deserializer to ignore any unrecognized type discriminator IDs and revert to the contract of the base type; `false` to fail the deserialization for unrecognized type discriminator IDs.

To be added.

## JsonPolymorphicAttribute.InferClosedTypePolymorphism property

```csharp
public bool InferClosedTypePolymorphism { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonPolymorphicAttribute.TypeClassifier property

```csharp
public Type? TypeClassifier { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonPolymorphicAttribute.TypeDiscriminatorPropertyName property

```csharp
public string? TypeDiscriminatorPropertyName { get; set; }
```

Gets or sets a custom type discriminator property name for the polymorphic type.
Uses the default '$type' property name if left unset.

Returns: To be added.

To be added.

## JsonPolymorphicAttribute.UnknownDerivedTypeHandling property

```csharp
public System.Text.Json.Serialization.JsonUnknownDerivedTypeHandling UnknownDerivedTypeHandling { get; set; }
```

Gets or sets the behavior when serializing an undeclared derived runtime type.

Returns: To be added.

To be added.
