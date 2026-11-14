---
title: "CollectionChangeAction enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CollectionChangeAction.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionChangeAction enum

Namespace: `System.ComponentModel`

```csharp
public enum CollectionChangeAction
```

Specifies how the collection is changed.

#### Remarks
The `CollectionChangeEventArgs` class uses this enumeration.

## CollectionChangeAction.Add field

```csharp
Add
```

Specifies that an element was added to the collection.

## CollectionChangeAction.Refresh field

```csharp
Refresh
```

Specifies that the entire collection has changed. This is caused by using methods that manipulate the entire collection, such as `CollectionBase.Clear`.

## CollectionChangeAction.Remove field

```csharp
Remove
```

Specifies that an element was removed from the collection.
