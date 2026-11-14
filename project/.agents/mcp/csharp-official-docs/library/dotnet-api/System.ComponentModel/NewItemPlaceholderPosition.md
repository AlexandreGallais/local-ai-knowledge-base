---
title: "NewItemPlaceholderPosition enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/NewItemPlaceholderPosition.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NewItemPlaceholderPosition enum

Namespace: `System.ComponentModel`

```csharp
public enum NewItemPlaceholderPosition
```

Specifies where the placeholder for a new item appears in the collection.

To be added.

## NewItemPlaceholderPosition.AtBeginning field

```csharp
AtBeginning
```

The placeholder for a new item appears at the beginning of the collection.  New items are at the beginning of the collection, after the new item placeholder.

## NewItemPlaceholderPosition.AtEnd field

```csharp
AtEnd
```

The placeholder for a new item appears at the end of the collection. New items are added at the end of the collection, before the new item placeholder.

## NewItemPlaceholderPosition.None field

```csharp
None
```

The collection does not use a new item placeholder. The position of items that are added depends on the underlying collection.  Usually, they are added at the end of the collection.
