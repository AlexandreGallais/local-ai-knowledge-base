---
title: "AssociationAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/AssociationAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssociationAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class AssociationAttribute : Attribute
```

Specifies that an entity member represents a data relationship, such as a foreign key relationship.

To be added.

## AssociationAttribute.AssociationAttribute(String, String, String) constructor

```csharp
public AssociationAttribute (string name, string thisKey, string otherKey);
```

Initializes a new instance of the `AssociationAttribute` class.

Parameters:

- `name`: The name of the association.
- `thisKey`: A comma-separated list of the property names of the key <example-value> on the `thisKey` side of the association.
- `otherKey`: A comma-separated list of the property names of the key <example-value> on the `otherKey` side of the association.

#### Remarks
If the association is bi-directional, the name must be the same on both sides of the association.

## AssociationAttribute.IsForeignKey <example-value>

```csharp
public bool IsForeignKey { get; set; }
```

Gets or sets a value that indicates whether the association member represents a foreign key.

Returns: `true` if the association represents a foreign key; otherwise, `false`.

To be added.

## AssociationAttribute.Name property

```csharp
public string Name { get; }
```

Gets the name of the association.

Returns: The name of the association.

#### Remarks
If the association is bi-directional, the name must be the same on both sides of the association.

## AssociationAttribute.OtherKey <example-value>

```csharp
public string OtherKey { get; }
```

Gets the property names of the key <example-value> on the OtherKey side of the association.

Returns: A comma-separated list of the property names that represent the key <example-value> on the OtherKey side of the association.

To be added.

## AssociationAttribute.OtherKeyMembers property

```csharp
public System.Collections.Generic.IEnumerable<string> OtherKeyMembers { get; }
```

Gets a collection of individual key <example-value> that are specified in the `AssociationAttribute.OtherKey` property.

Returns: A collection of individual key <example-value> that are specified in the `AssociationAttribute.OtherKey` property.

To be added.

## AssociationAttribute.ThisKey <example-value>

```csharp
public string ThisKey { get; }
```

Gets the property names of the key <example-value> on the ThisKey side of the association.

Returns: A comma-separated list of the property names that represent the key <example-value> on the ThisKey side of the association.

To be added.

## AssociationAttribute.ThisKeyMembers property

```csharp
public System.Collections.Generic.IEnumerable<string> ThisKeyMembers { get; }
```

Gets a collection of individual key <example-value> that are specified in the `AssociationAttribute.ThisKey` property.

Returns: A collection of individual key <example-value> that are specified in the `AssociationAttribute.ThisKey` property.

To be added.
