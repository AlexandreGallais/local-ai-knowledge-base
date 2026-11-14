---
title: "IXmlTextParser interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/IXmlTextParser.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlTextParser interface

Namespace: `System.Xml.Serialization`

```csharp
public interface IXmlTextParser
```

Establishes a `IXmlTextParser.Normalized` property for use by the .NET infrastructure.

#### Remarks
You should not implement the `IXmlTextParser` interface in your code. Instead use the `Normalization` property of the `XmlTextReader` class.

## IXmlTextParser.Normalized property

```csharp
public bool Normalized { get; set; }
```

Gets or sets whether white space and attribute values are normalized.

Returns: `true` if white space attributes values are normalized; otherwise, `false`.

#### Remarks
You should not implement the `IXmlTextParser` interface and `Normalized` property in your code. Instead use the `Normalization` property of the `XmlTextReader` class.

## IXmlTextParser.WhitespaceHandling property

```csharp
public System.Xml.WhitespaceHandling WhitespaceHandling { get; set; }
```

Gets or sets how white space is handled when parsing XML.

Returns: A member of the `WhitespaceHandling` enumeration that describes how whites pace is handled when parsing XML.

#### Remarks
You should not implement the `IXmlTextParser` interface and `Normalized` property in your code. Instead use the `Normalization` property of the `XmlTextReader` class.
