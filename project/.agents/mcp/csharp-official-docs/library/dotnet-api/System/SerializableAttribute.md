---
title: "SerializableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SerializableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SerializableAttribute class

Namespace: `System`

```csharp
public sealed class SerializableAttribute : Attribute
```

Indicates that a class can be serialized using binary or XML serialization. This class cannot be inherited.

#### Remarks
Apply the `SerializableAttribute` attribute to a type to indicate that instances of this type can be serialized using binary or XML serialization. The common language runtime throws `SerializationException` if any type in the graph of objects being serialized does not have the `SerializableAttribute` attribute applied.

Apply the `SerializableAttribute` attribute even if the class also implements the `ISerializable` interface to control the binary serialization process.

When you apply the `SerializableAttribute` attribute to a type, all private and public fields are serialized by default. You can control binary serialization more granularly by implementing the `ISerializable` interface to override the serialization process.

Or you can exclude fields from serialization by applying the `NonSerializedAttribute` attribute to the field. If a field of a binary-serializable type contains a pointer, a handle, or some other data structure that is specific to a particular environment, and cannot be meaningfully reconstituted in a different environment, then you might want to apply the `NonSerializedAttribute` attribute to that field.

For more information about using attributes, see Attributes. For more information about binary serialization, see `Serialization`.

> **Note:**
> This attribute does not apply to JSON serialization using `Json`.

## SerializableAttribute.SerializableAttribute() constructor

```csharp
public SerializableAttribute ();
```

Initializes a new instance of the `SerializableAttribute` class.

To be added.
