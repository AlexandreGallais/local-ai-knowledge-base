---
title: "JsonPolymorphismOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonPolymorphismOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonPolymorphismOptions class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public class JsonPolymorphismOptions
```

Defines polymorphic configuration for a specified base type.

To be added.

## JsonPolymorphismOptions.JsonPolymorphismOptions() constructor

```csharp
public JsonPolymorphismOptions ();
```

Creates an empty `JsonPolymorphismOptions` instance.

To be added.

## JsonPolymorphismOptions.DerivedTypes property

```csharp
public System.Collections.Generic.IList<System.Text.Json.Serialization.Metadata.JsonDerivedType> DerivedTypes { get; }
```

Gets the list of derived types supported in the current polymorphic type configuration.

Returns: To be added.

To be added.

## JsonPolymorphismOptions.IgnoreUnrecognizedTypeDiscriminators property

```csharp
public bool IgnoreUnrecognizedTypeDiscriminators { get; set; }
```

Gets or sets a value that indicates whether the serializer should ignore any unrecognized type discriminator IDs and revert to the contract of the base type.

Returns: `true` if the serializer should ignore any unrecognized type discriminator IDs and revert to the contract of the base type; `false` if the deserialization should fail when an unrecognized type discriminator ID is encountered.

Exceptions:

- `InvalidOperationException`: The parent `JsonTypeInfo` instance has been locked for further modification.

To be added.

## JsonPolymorphismOptions.TypeDiscriminatorPropertyName property

```csharp
public string TypeDiscriminatorPropertyName { get; set; }
```

Gets or sets a custom type discriminator property name for the polymorphic type.
Uses the default '$type' property name if left unset.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The parent `JsonTypeInfo` instance has been locked for further modification.

To be added.

## JsonPolymorphismOptions.UnknownDerivedTypeHandling property

```csharp
public System.Text.Json.Serialization.JsonUnknownDerivedTypeHandling UnknownDerivedTypeHandling { get; set; }
```

Gets or sets the behavior when serializing an undeclared derived runtime type.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The parent `JsonTypeInfo` instance has been locked for further modification.

To be added.
