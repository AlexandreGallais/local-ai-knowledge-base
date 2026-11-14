---
title: "NamespaceHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/NamespaceHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NamespaceHandling enum

Namespace: `System.Xml`

```csharp
public enum NamespaceHandling
```

Specifies whether to remove duplicate namespace declarations in the `XmlWriter`.

#### Remarks
The `NamespaceHandling` enumeration has a `FlagsAttribute` attribute that allows a bitwise combination of its member values.

## NamespaceHandling.Default field

```csharp
Default
```

Specifies that duplicate namespace declarations will not be removed.

## NamespaceHandling.OmitDuplicates field

```csharp
OmitDuplicates
```

Specifies that duplicate namespace declarations will be removed. For the duplicate namespace to be removed, the prefix and the namespace must match.
