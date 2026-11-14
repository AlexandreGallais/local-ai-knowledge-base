---
title: "XmlNodeOrder enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeOrder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeOrder enum

Namespace: `System.Xml`

```csharp
public enum XmlNodeOrder
```

Describes the document order of a node compared to a second node.

To be added.

## XmlNodeOrder.After field

```csharp
After
```

The current node of this navigator is after the current node of the supplied navigator.

## XmlNodeOrder.Before field

```csharp
Before
```

The current node of this navigator is before the current node of the supplied navigator.

## XmlNodeOrder.Same field

```csharp
Same
```

The two navigators are positioned on the same node.

## XmlNodeOrder.Unknown field

```csharp
Unknown
```

The node positions cannot be determined in document order, relative to each other. This could occur if the two nodes reside in different trees.
