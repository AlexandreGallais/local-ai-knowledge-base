---
title: "XmlParserContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlParserContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlParserContext class

Namespace: `System.Xml`

```csharp
public class XmlParserContext
```

Provides all the context information required by the `XmlReader` to parse an XML fragment.

#### Examples
The following example creates an `XmlReader` object that reads an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._

## XmlParserContext.XmlParserContext(XmlNameTable, XmlNamespaceManager, String, XmlSpace) constructor

```csharp
public XmlParserContext (System.Xml.XmlNameTable? nt, System.Xml.XmlNamespaceManager? nsMgr, string? xmlLang, System.Xml.XmlSpace xmlSpace);
```

Initializes a new instance of the `XmlParserContext` class with the specified `XmlNameTable`, `XmlNamespaceManager`, `xml:lang`, and `xml:space` values.

Parameters:

- `nt`: The `XmlNameTable` to use to atomize strings. If this is `null`, the name table used to construct the `nsMgr` is used instead. For more information about atomized strings, see `XmlNameTable`.
- `nsMgr`: The `XmlNamespaceManager` to use for looking up namespace information, or `null`.
- `xmlLang`: The `xml:lang` scope.
- `xmlSpace`: An `XmlSpace` value indicating the `xml:space` scope.

Exceptions:

- `XmlException`: `nt` is not the same `XmlNameTable` used to construct `nsMgr`.

#### Examples
The following example reads an XML fragment. It uses an `XmlParserContext` and its `XmlNamespaceManager` to handle namespace matching.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/.ctor/source.cs._

## XmlParserContext.XmlParserContext(XmlNameTable, XmlNamespaceManager, String, XmlSpace, Encoding) constructor

```csharp
public XmlParserContext (System.Xml.XmlNameTable? nt, System.Xml.XmlNamespaceManager? nsMgr, string? xmlLang, System.Xml.XmlSpace xmlSpace, System.Text.Encoding? enc);
```

Initializes a new instance of the `XmlParserContext` class with the specified `XmlNameTable`, `XmlNamespaceManager`, `xml:lang`, `xml:space`, and encoding.

Parameters:

- `nt`: The `XmlNameTable` to use to atomize strings. If this is `null`, the name table used to construct the `nsMgr` is used instead. For more information on atomized strings, see `XmlNameTable`.
- `nsMgr`: The `XmlNamespaceManager` to use for looking up namespace information, or `null`.
- `xmlLang`: The `xml:lang` scope.
- `xmlSpace`: An `XmlSpace` value indicating the `xml:space` scope.
- `enc`: An `Encoding` object indicating the encoding setting.

Exceptions:

- `XmlException`: `nt` is not the same `XmlNameTable` used to construct `nsMgr`.

To be added.

## XmlParserContext.XmlParserContext(XmlNameTable, XmlNamespaceManager, String, String, String, String, String, String, XmlSpace) constructor

```csharp
public XmlParserContext (System.Xml.XmlNameTable? nt, System.Xml.XmlNamespaceManager? nsMgr, string? docTypeName, string? pubId, string? sysId, string? internalSubset, string? baseURI, string? xmlLang, System.Xml.XmlSpace xmlSpace);
```

Initializes a new instance of the `XmlParserContext` class with the specified `XmlNameTable`, `XmlNamespaceManager`, base URI, `xml:lang`, `xml:space`, and document type values.

Parameters:

- `nt`: The `XmlNameTable` to use to atomize strings. If this is `null`, the name table used to construct the `nsMgr` is used instead. For more information about atomized strings, see `XmlNameTable`.
- `nsMgr`: The `XmlNamespaceManager` to use for looking up namespace information, or `null`.
- `docTypeName`: The name of the document type declaration.
- `pubId`: The public identifier.
- `sysId`: The system identifier.
- `internalSubset`: The internal DTD subset. The DTD subset is used for entity resolution, not for document validation.
- `baseURI`: The base URI for the XML fragment (the location from which the fragment was loaded).
- `xmlLang`: The `xml:lang` scope.
- `xmlSpace`: An `XmlSpace` value indicating the `xml:space` scope.

Exceptions:

- `XmlException`: `nt` is not the same `XmlNameTable` used to construct `nsMgr`.

#### Remarks
This constructor supplies all `DocumentType` information required by `XmlValidatingReader`. If this `XmlParserContext` is passed to an `XmlTextReader`, all DTD information is ignored.

If you pass a DTD as the `internalSubset`, the DTD is used for entity resolution, not for document validation.

#### Examples
The following example uses an `XmlParserContext` to read an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/.ctor/source1.cs._

## XmlParserContext.XmlParserContext(XmlNameTable, XmlNamespaceManager, String, String, String, String, String, String, XmlSpace, Encoding) constructor

```csharp
public XmlParserContext (System.Xml.XmlNameTable? nt, System.Xml.XmlNamespaceManager? nsMgr, string? docTypeName, string? pubId, string? sysId, string? internalSubset, string? baseURI, string? xmlLang, System.Xml.XmlSpace xmlSpace, System.Text.Encoding? enc);
```

Initializes a new instance of the `XmlParserContext` class with the specified `XmlNameTable`, `XmlNamespaceManager`, base URI, `xml:lang`, `xml:space`, encoding, and document type values.

Parameters:

- `nt`: The `XmlNameTable` to use to atomize strings. If this is `null`, the name table used to construct the `nsMgr` is used instead. For more information about atomized strings, see `XmlNameTable`.
- `nsMgr`: The `XmlNamespaceManager` to use for looking up namespace information, or `null`.
- `docTypeName`: The name of the document type declaration.
- `pubId`: The public identifier.
- `sysId`: The system identifier.
- `internalSubset`: The internal DTD subset. The DTD is used for entity resolution, not for document validation.
- `baseURI`: The base URI for the XML fragment (the location from which the fragment was loaded).
- `xmlLang`: The `xml:lang` scope.
- `xmlSpace`: An `XmlSpace` value indicating the `xml:space` scope.
- `enc`: An `Encoding` object indicating the encoding setting.

Exceptions:

- `XmlException`: `nt` is not the same `XmlNameTable` used to construct `nsMgr`.

To be added.

## XmlParserContext.BaseURI property

```csharp
public string BaseURI { get; set; }
```

Gets or sets the base URI.

Returns: The base URI to use to resolve the DTD file.

#### Remarks
A networked XML document is comprised of chunks of data aggregated using various W3C standard inclusion mechanisms and therefore may contain nodes that come from different places. `BaseURI` shows where these nodes originated.

## XmlParserContext.DocTypeName property

```csharp
public string DocTypeName { get; set; }
```

Gets or sets the name of the document type declaration.

Returns: The name of the document type declaration.

#### Remarks
This property, along with `PublicId`, `SystemId`, and `InternalSubset`, provides all the document type declaration information. It is used to find and load the necessary DTD information so that you get all the default attributes and entities defined in the DTD.

## XmlParserContext.Encoding property

```csharp
public System.Text.Encoding? Encoding { get; set; }
```

Gets or sets the encoding type.

Returns: An `Encoding` object indicating the encoding type.

To be added.

## XmlParserContext.InternalSubset property

```csharp
public string InternalSubset { get; set; }
```

Gets or sets the internal DTD subset.

Returns: The internal DTD subset. For example, this property returns everything between the square brackets `<!DOCTYPE doc [...]>`.

#### Remarks
This property, along with `DocTypeName`, `PublicId`, and `SystemId`, provides all the document type declaration information. It is used to find and load the necessary DTD information so that you get all the default attributes and entities defined in the DTD.

The DTD is used for entity resolution, not for document validation.

## XmlParserContext.NamespaceManager property

```csharp
public System.Xml.XmlNamespaceManager? NamespaceManager { get; set; }
```

Gets or sets the `XmlNamespaceManager`.

Returns: The `XmlNamespaceManager`.

#### Remarks
The `NamespaceManager` defines the current namespace scope and provides methods for looking up namespace information.

## XmlParserContext.NameTable property

```csharp
public System.Xml.XmlNameTable? NameTable { get; set; }
```

Gets the `XmlNameTable` used to atomize strings. For more information on atomized strings, see `XmlNameTable`.

Returns: The `XmlNameTable`.

To be added.

## XmlParserContext.PublicId property

```csharp
public string PublicId { get; set; }
```

Gets or sets the public identifier.

Returns: The public identifier.

#### Remarks
This property, along with `DocTypeName`, `SystemId`, and `InternalSubset`, provides all the document type declaration information. It is used to find and load the required DTD information so that you get all the default attributes and entities defined in the DTD.

## XmlParserContext.SystemId property

```csharp
public string SystemId { get; set; }
```

Gets or sets the system identifier.

Returns: The system identifier.

#### Remarks
This property, along with `DocTypeName`, `PublicId`, and `InternalSubset`, provides all the document type declaration information. It is used to find and load the necessary DTD information so that you get all the default attributes and entities defined in the DTD.

## XmlParserContext.XmlLang property

```csharp
public string XmlLang { get; set; }
```

Gets or sets the current `xml:lang` scope.

Returns: The current `xml:lang` scope. If there is no `xml:lang` in scope, `String.Empty` is returned.

#### Remarks
For details on valid `xml:lang` values, refer to section 2.12 of the W3C Extensible Markup Language (XML) 1.0 recommendation.

## XmlParserContext.XmlSpace property

```csharp
public System.Xml.XmlSpace XmlSpace { get; set; }
```

Gets or sets the current `xml:space` scope.

Returns: An `XmlSpace` value indicating the `xml:space` scope.

To be added.
