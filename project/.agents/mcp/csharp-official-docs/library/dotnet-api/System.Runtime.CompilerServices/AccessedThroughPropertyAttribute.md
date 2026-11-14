---
title: "AccessedThroughPropertyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AccessedThroughPropertyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AccessedThroughPropertyAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class AccessedThroughPropertyAttribute : Attribute
```

Specifies the name of the property that accesses the attributed field.

#### Remarks
You can apply this attribute to fields.

This attribute is for use by browsers or tools, and is ignored by the common language runtime.

The classes in System.Runtime.CompilerServices are for compiler writers use only.

## AccessedThroughPropertyAttribute.AccessedThroughPropertyAttribute(String) constructor

```csharp
public AccessedThroughPropertyAttribute (string propertyName);
```

Initializes a new instance of the `AccessedThroughPropertyAttribute` class with the name of the property used to access the attributed field.

Parameters:

- `propertyName`: The name of the property used to access the attributed field.

To be added.

## AccessedThroughPropertyAttribute.PropertyName property

```csharp
public string PropertyName { get; }
```

Gets the name of the property used to access the attributed field.

Returns: The name of the property used to access the attributed field.

To be added.
