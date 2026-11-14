---
title: "MetadataUpdateOriginalTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/MetadataUpdateOriginalTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MetadataUpdateOriginalTypeAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public class MetadataUpdateOriginalTypeAttribute : Attribute
```

Emitted by the compiler when a type that's marked with `CreateNewOnMetadataUpdateAttribute` is updated during a hot reload session.

This attribute is emitted by Roslyn when a type that's marked with (or derives from a type that's marked with) `CreateNewOnMetadataUpdateAttribute` is updated during a hot reload session. `MetadataUpdateOriginalTypeAttribute.OriginalType` points to the original version of the updated type. The next update of the type will have the same `MetadataUpdateOriginalTypeAttribute.OriginalType`. Frameworks that provide support for hot reload by implementing a `MetadataUpdateHandlerAttribute` can use this attribute to relate an updated type to its original version.

## MetadataUpdateOriginalTypeAttribute.MetadataUpdateOriginalTypeAttribute(Type) constructor

```csharp
public MetadataUpdateOriginalTypeAttribute (Type originalType);
```

Initializes a new instance of the `MetadataUpdateOriginalTypeAttribute` class.

Parameters:

- `originalType`: The original type that was updated.

To be added.

## MetadataUpdateOriginalTypeAttribute.OriginalType property

```csharp
public Type OriginalType { get; }
```

Gets the original version of the type that this attribtue is attached to.

Returns: To be added.

To be added.
