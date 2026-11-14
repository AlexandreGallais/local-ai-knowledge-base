---
title: "DtdProcessing enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/DtdProcessing.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DtdProcessing enum

Namespace: `System.Xml`

```csharp
public enum DtdProcessing
```

Specifies the options for processing DTDs. The `DtdProcessing` enumeration is used by the `XmlReaderSettings` class.

#### Remarks
This enumeration is set on the `DtdProcessing` property or the `DtdProcessing` property.

## DtdProcessing.Ignore field

```csharp
Ignore
```

Causes the DOCTYPE element to be ignored. No DTD processing occurs, and the DTD/DOCTYPE is lost on output.

## DtdProcessing.Parse field

```csharp
Parse
```

Used for parsing DTDs.

## DtdProcessing.Prohibit field

```csharp
Prohibit
```

Specifies that when a DTD is encountered, an `XmlException` is thrown with a message that states that DTDs are prohibited. This is the default behavior.
