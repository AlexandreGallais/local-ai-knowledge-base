---
title: "ConformanceLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/ConformanceLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConformanceLevel enum

Namespace: `System.Xml`

```csharp
public enum ConformanceLevel
```

Specifies the amount of input or output checking that `XmlReader` and `XmlWriter` objects perform.

#### Remarks
When you create an XML reader or writer instance, you can use the `XmlReaderSettings` or `XmlWriterSettings` class to specify the features that you want the new instance to support. One of the features that you can configure is the level of conformance you want to enforce on the XML data.

Creating a compliant reader or writer guarantees that the XML data being processed complies with the specified conformance level. If the stream being read or written doesn't comply with the conformance level, an exception is thrown.

Document-level checks with the `ConformanceLevel.Document` enumeration member enforce fragment-level checks (the `ConformanceLevel.Fragment` member) and also ensure the following:

- The top-level item doesn't have any nodes other than the XML declaration, DTD, element, comment, white space, or processing instruction.

- The XML data has one and only one top-level element node.

## ConformanceLevel.Auto field

```csharp
Auto
```

The `XmlReader` or `XmlWriter` object automatically detects whether document-level or fragment-level checking should be performed, and does the appropriate checking. If you're wrapping another `XmlReader` or `XmlWriter` object, the outer object doesn't do any additional conformance checking. Conformance checking is left up to the underlying object.

See the `XmlReaderSettings.ConformanceLevel` and `XmlWriterSettings.ConformanceLevel` properties for details on how the compliance level is determined.

## ConformanceLevel.Document field

```csharp
Document
```

The XML data complies with the rules for a well-formed XML 1.0 document, as defined by the W3C. This level of checking ensures that the stream being read or written can be consumed by any processor as an XML 1.0 document.

## ConformanceLevel.Fragment field

```csharp
Fragment
```

The XML data is a well-formed XML fragment, as defined by the W3C.  This conformance level represents an XML document that might not have a root element but is otherwise well-formed. This level of checking ensures that the stream being read or written can be consumed by any processor as an [XML 1.0 external parsed entity]](https://www.w3.org/TR/2006/REC-xml-20060816/#wf-entities).
