---
title: "Formatting enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/Formatting.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Formatting enum

Namespace: `System.Xml`

```csharp
public enum Formatting
```

Specifies formatting options for the `XmlTextWriter`.

To be added.

## Formatting.Indented field

```csharp
Indented
```

Causes child elements to be indented according to the `XmlTextWriter.Indentation` and `XmlTextWriter.IndentChar` settings.

This option indents element content only; mixed content is not affected. For the XML 1.0 definitions of these terms, see the World Wide Web Consortium (W3C) documentation Element Content and Mixed Content.

## Formatting.None field

```csharp
None
```

No special formatting is applied. This is the default.
