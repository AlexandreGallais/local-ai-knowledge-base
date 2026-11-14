---
title: "AssociatedMetadataTypeTypeDescriptionProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/AssociatedMetadataTypeTypeDescriptionProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssociatedMetadataTypeTypeDescriptionProvider class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class AssociatedMetadataTypeTypeDescriptionProvider : System.ComponentModel.TypeDescriptionProvider
```

Extends the metadata information for a class by adding attributes and property information that is defined in an associated class.

#### Remarks
The `AssociatedMetadataTypeTypeDescriptionProvider` class dynamically extends the type information associated with a type or object by adding, modifying, or hiding characteristics such as attributes, properties, and events. For more information, see `TypeDescriptor`.

## AssociatedMetadataTypeTypeDescriptionProvider.AssociatedMetadataTypeTypeDescriptionProvider(Type) constructor

```csharp
public AssociatedMetadataTypeTypeDescriptionProvider (Type type);
```

Initializes a new instance of the `AssociatedMetadataTypeTypeDescriptionProvider` class by using the specified type.

Parameters:

- `type`: The type for which the metadata provider is created.

To be added.

## AssociatedMetadataTypeTypeDescriptionProvider.AssociatedMetadataTypeTypeDescriptionProvider(Type, Type) constructor

```csharp
public AssociatedMetadataTypeTypeDescriptionProvider (Type type, Type associatedMetadataType);
```

Initializes a new instance of the `AssociatedMetadataTypeTypeDescriptionProvider` class by using the specified metadata provider type and associated type.

Parameters:

- `type`: The type for which the metadata provider is created.
- `associatedMetadataType`: The associated type that contains the metadata.

Exceptions:

- `ArgumentNullException`: The value of `associatedMetadataType` is `null`.

To be added.

## AssociatedMetadataTypeTypeDescriptionProvider.GetTypeDescriptor(Type, Object) method

```csharp
public override System.ComponentModel.ICustomTypeDescriptor GetTypeDescriptor (Type objectType, object? instance);
```

Gets a type descriptor for the specified type and object.

Parameters:

- `objectType`: The type of object to retrieve the type descriptor for.
- `instance`: An instance of the type.

Returns: The descriptor that provides metadata for the type.

To be added.
