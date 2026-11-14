---
title: "MetadataTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/MetadataTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MetadataTypeAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class MetadataTypeAttribute : Attribute
```

Specifies the metadata class to associate with a data model class.

#### Remarks
The `MetadataTypeAttribute` attribute enables you to associate a class with a data-model partial class. In this associated class you provide additional metadata information that is not in the data model.

For example, in the associated class you can apply the `RequiredAttribute` attribute to a data field. This enforces that a value is provided for the field even if this constraint is not required by the database schema.

You use the `MetadataTypeAttribute` attribute as follows:

- In your application, create a file in which you create the data-model partial class that you want to modify.

- Create the associated metadata class.

- Apply the `MetadataTypeAttribute` attribute to the partial entity class, specifying the associated class.

When you apply this attribute, you must adhere to the following usage constraints:

- The attribute can only be applied to a class.

- The attribute cannot be inherited by derived classes.

- The attribute can be applied only one time.

#### Examples
The following example shows how to use the `MetadataTypeAttribute` to associate a metadata class with an entity partial class. The example applies the `RequiredAttribute` attribute to a data field to show how to provide additional information in the associated metadata class.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.MetadataTypeAttribute/CS/Customer.cs._

## MetadataTypeAttribute.MetadataTypeAttribute(Type) constructor

```csharp
public MetadataTypeAttribute (Type metadataClassType);
```

Initializes a new instance of the `MetadataTypeAttribute` class.

Parameters:

- `metadataClassType`: The metadata class to reference.

Exceptions:

- `ArgumentNullException`: `metadataClassType` is `null`.

#### Examples
The following example shows how to use the `MetadataTypeAttribute` to associate a metadata class with an entity partial class.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.MetadataTypeAttribute/CS/Customer.cs._

## MetadataTypeAttribute.MetadataClassType property

```csharp
public Type MetadataClassType { get; }
```

Gets the metadata class that is associated with a data-model partial class.

Returns: The type value that represents the metadata class.

To be added.
