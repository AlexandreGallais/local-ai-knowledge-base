---
title: "XmlNamespaceScope enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNamespaceScope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNamespaceScope enum

Namespace: `System.Xml`

```csharp
public enum XmlNamespaceScope
```

Defines the namespace scope.

To be added.

## XmlNamespaceScope.All field

```csharp
All
```

All namespaces defined in the scope of the current node. This includes the xmlns:xml namespace, which is always declared implicitly. The order of the namespaces returned is not defined.

## XmlNamespaceScope.ExcludeXml field

```csharp
ExcludeXml
```

All namespaces defined in the scope of the current node, excluding the xmlns:xml namespace, which is always declared implicitly. The order of the namespaces returned is not defined.

## XmlNamespaceScope.Local field

```csharp
Local
```

All namespaces that are defined locally at the current node.
