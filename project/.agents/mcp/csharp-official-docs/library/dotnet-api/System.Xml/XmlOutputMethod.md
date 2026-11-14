---
title: "XmlOutputMethod enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlOutputMethod.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlOutputMethod enum

Namespace: `System.Xml`

```csharp
public enum XmlOutputMethod
```

Specifies the method used to serialize the `XmlWriter` output.

To be added.

## XmlOutputMethod.AutoDetect field

```csharp
AutoDetect
```

Use the XSLT rules to choose between the `XmlOutputMethod.Xml` and `XmlOutputMethod.Html` output methods at runtime.

## XmlOutputMethod.Html field

```csharp
Html
```

Serialize according to the HTML rules specified by XSLT.

## XmlOutputMethod.Text field

```csharp
Text
```

Serialize text blocks only.

## XmlOutputMethod.Xml field

```csharp
Xml
```

Serialize according to the XML 1.0 rules.
