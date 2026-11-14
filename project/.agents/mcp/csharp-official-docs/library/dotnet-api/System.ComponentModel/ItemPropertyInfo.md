---
title: "ItemPropertyInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ItemPropertyInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ItemPropertyInfo class

Namespace: `System.ComponentModel`

```csharp
public class ItemPropertyInfo
```

Contains information about a property.

To be added.

## ItemPropertyInfo.ItemPropertyInfo(String, Type, Object) constructor

```csharp
public ItemPropertyInfo (string name, Type type, object descriptor);
```

Initializes a new instance of the `ItemPropertyInfo` class.

Parameters:

- `name`: The name of the property.
- `type`: The type of the property.
- `descriptor`: An object that contains additional information about the property.

#### Remarks
The `descriptor` parameter can be any object that contains information about the property, such as a `PropertyDescriptor` or `PropertyInfo` object.

## ItemPropertyInfo.Descriptor property

```csharp
public object Descriptor { get; }
```

Gets an object that contains additional information about the property.

Returns: An object that contains additional information about the property.

#### Remarks
`ItemPropertyInfo.Descriptor` can be any object that contains information about the property, such as a `PropertyDescriptor` or `PropertyInfo` object.

## ItemPropertyInfo.Name property

```csharp
public string Name { get; }
```

Gets the name of the property.

Returns: The name of the property.

To be added.

## ItemPropertyInfo.PropertyType property

```csharp
public Type PropertyType { get; }
```

Gets the type of the property.

Returns: The type of the property.

To be added.
