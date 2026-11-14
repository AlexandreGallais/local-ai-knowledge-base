---
title: "XmlTextReader class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextReader class (part 2 of 6)

## XmlTextReader.XmlTextReader(String, TextReader, XmlNameTable) constructor

```csharp
public XmlTextReader (string url, System.IO.TextReader input, System.Xml.XmlNameTable nt);
```

Initializes a new instance of the `XmlTextReader` class with the specified URL, `TextReader` and `XmlNameTable`.

Parameters:

- `url`: The URL to use for resolving external resources. The `XmlTextReader.BaseURI` is set to this value. If `url` is `null`, `BaseURI` is set to `String.Empty`.
- `input`: The `TextReader` containing the XML data to read.
- `nt`: The `XmlNameTable` to use.

Exceptions:

- `ArgumentNullException`: The `nt` value is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

It is assumed that the `TextReader` is already set to the correct encoding. This is used by clients that have already read some things from the stream in a multi-part MIME scenario.

## XmlTextReader.XmlTextReader(String, XmlNodeType, XmlParserContext) constructor

```csharp
public XmlTextReader (string xmlFragment, System.Xml.XmlNodeType fragType, System.Xml.XmlParserContext? context);
```

Initializes a new instance of the `XmlTextReader` class with the specified string, `XmlNodeType`, and `XmlParserContext`.

Parameters:

- `xmlFragment`: The string containing the XML fragment to parse.
- `fragType`: The `XmlNodeType` of the XML fragment. This also determines what the fragment string can contain. (See table below.)
- `context`: The `XmlParserContext` in which the `xmlFragment` is to be parsed. This includes the `XmlNameTable` to use, encoding, namespace scope, the current `xml:lang`, and the `xml:space` scope.

Exceptions:

- `XmlException`: `fragType` is not an `Element`, `Attribute`, or `Document``XmlNodeType`.
- `ArgumentNullException`: `xmlFragment` is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This constructor parses the given string as a fragment of XML. If the XML fragment is an element or attribute, you can bypass the root level rules for well-formed XML documents. This constructor can handle strings returned from `XmlReader.ReadInnerXml`.

The following table lists valid values for `fragType` and how the reader parses each of the different node types.

|XmlNodeType|Fragment May Contain|
|-----------------|--------------------------|
|Element|Any valid element content (for example, any combination of elements, comments, processing instructions, CDATA sections, text, and entity references). An XML declaration can also be supplied. This allows you to specify the encoding for the XML fragment, rather than having to set it on the `XmlParserContext` object.|
|Attribute|The value of an attribute (the part inside the quotes).|
|Document|The contents of an entire XML document. This enforces document level rules.|

#### Examples
The following example parses an XML fragment. It uses the `XmlParserContext` and its `XmlNamespaceManager` to handle namespace resolution.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/.ctor/readfrag.cs._

## XmlTextReader.AttributeCount property

```csharp
public override int AttributeCount { get; }
```

Gets the number of attributes on the current node.

Returns: The number of attributes on the current node.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This property is relevant to `Element`, `DocumentType` and `XmlDeclaration` nodes only. (Other node types do not have attributes.)

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/AttributeCount/source.cs._

## XmlTextReader.BaseURI property

```csharp
public override string BaseURI { get; }
```

Gets the base URI of the current node.

Returns: The base URI of the current node.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

A networked XML document is comprised of chunks of data aggregated using various W3C standard inclusion mechanisms and therefore contains nodes that come from different places. DTD entities are an example of this, but this is not limited to DTDs. The base URI tells you where these nodes came from. If there is no base URI for the nodes being returned (for example, they were parsed from an in-memory string), `String.Empty` is returned.

#### Examples
The following example displays the base URI for each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/BaseURI/source.cs._

The example uses the file, `baseuri.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.BaseURI Example/XML/source.xml._
## XmlTextReader.CanReadBinaryContent property

```csharp
public override bool CanReadBinaryContent { get; }
```

Gets a value indicating whether the `XmlTextReader` implements the binary content read methods.

Returns: `true` if the binary content read methods are implemented; otherwise `false`. The `XmlTextReader` class always returns `true`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

The binary content read methods include the `XmlTextReader.ReadContentAsBase64`, `XmlTextReader.ReadContentAsBinHex`, `XmlTextReader.ReadElementContentAsBase64`, and `XmlTextReader.ReadElementContentAsBinHex` methods.

## XmlTextReader.CanReadValueChunk property

```csharp
public override bool CanReadValueChunk { get; }
```

Gets a value indicating whether the `XmlTextReader` implements the `XmlReader.ReadValueChunk` method.

Returns: `true` if the `XmlTextReader` implements the `XmlReader.ReadValueChunk` method; otherwise `false`. The `XmlTextReader` class always returns `false`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

The `XmlTextReader` throws a `NotSupportedException` if the `XmlReader.ReadValueChunk` method is called.

## XmlTextReader.CanResolveEntity property

```csharp
public override bool CanResolveEntity { get; }
```

Gets a value indicating whether this reader can parse and resolve entities.

Returns: `true` if the reader can parse and resolve entities; otherwise, `false`. The `XmlTextReader` class always returns `true`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

## XmlTextReader.Depth property

```csharp
public override int Depth { get; }
```

Gets the depth of the current node in the XML document.

Returns: The depth of the current node in the XML document.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

#### Examples
The following example displays each node including its depth, line number, and line position.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/Depth/readlinenum.cs._

## XmlTextReader.DtdProcessing property

```csharp
public System.Xml.DtdProcessing DtdProcessing { get; set; }
```

Gets or sets the `DtdProcessing` enumeration.

Returns: The `DtdProcessing` enumeration.

#### Remarks
The `DtdProcessing` enumeration contains the `Prohibit`, `Ignore`, and `Parse` enumerators. `Parse` is the default behavior. The `DtdProcessing` property replaces the `ProhibitDTD` property and adds the ability to ignore the DOCTYPE element.

> **Important:**
> If the `DtdProcessing` property is set to `Ignore`, the `XmlTextReader` will not report the DTDs. This means that the DTD/DOCTYPE will be lost on output.

## XmlTextReader.Encoding property

```csharp
public System.Text.Encoding? Encoding { get; }
```

Gets the encoding of the document.

Returns: The encoding value. If no encoding attribute exists, and there is no byte-order mark, this defaults to UTF-8.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of newer functionality.

Because `XmlTextReader` uses the `Encoding` class, `XmlTextReader` also supports all encodings supported by that class. The exception to this is any encoding, such as UTF-7 or EBCDIC, that maps the `<?xml` sequence to different byte values than UTF-8.

## XmlTextReader.EntityHandling property

```csharp
public System.Xml.EntityHandling EntityHandling { get; set; }
```

Gets or sets a value that specifies how the reader handles entities.

Returns: One of the `EntityHandling` values. If no `EntityHandling` is specified, it defaults to `EntityHandling.ExpandCharEntities`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This property can be changed on the fly and takes effect after the next `XmlTextReader.Read` call.

When `EntityHandling` is set to `ExpandCharEntities`, attribute values are only partially normalized. The reader normalizes each individual text node independently from the content of adjacent entity reference nodes.

To illustrate the difference between the entity handling modes consider the following XML:

```xml
<!DOCTYPE doc [<!ENTITY num "123">]>
    <doc> A &num; </doc>
```

When `EntityHandling` is set to `ExpandEntities` the "doc" element node contains one text node with the expanded entity text:

| Depth | Node type | Name | Value |
|-------|-----------|------|-------|
| 1     | `Text`    |      | A 123 |

When `EntityHandling` is set to `ExpandCharEntities`, and `WhitespaceHandling` is set to `Significant` or `All`, the "doc" element expands the character entity and returns the general entity as a node:

| Depth | Node type               | Name | Value |
|-------|-------------------------|------|-------|
| 1     | `Text`                  |      | A     |
| 1     | `EntityReference`       | num  |       |
| 1     | `SignificantWhitespace` |      |       |

## XmlTextReader.EOF property

```csharp
public override bool EOF { get; }
```

Gets a value indicating whether the reader is positioned at the end of the stream.

Returns: `true` if the reader is positioned at the end of the stream; otherwise, `false`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

## XmlTextReader.HasValue property

```csharp
public override bool HasValue { get; }
```

Gets a value indicating whether the current node can have a `XmlTextReader.Value` other than `String.Empty`.

Returns: `true` if the node on which the reader is currently positioned can have a `Value`; otherwise, `false`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

The following table lists node types that have a value to return.

|Node type|Value|
|---------------|-----------|
|`Attribute`|The value of the attribute.|
|`CDATA`|The content of the CDATA section.|
|`Comment`|The content of the comment.|
|`DocumentType`|The internal subset.|
|`ProcessingInstruction`|The entire content, excluding the target.|
|`SignificantWhitespace`|The white space between markup in a mixed content model.|
|`Text`|The content of the text node.|
|`Whitespace`|The white space between markup.|
|`XmlDeclaration`|The content of the declaration.|

#### Examples
The following example displays the value for every node that can have a value.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/HasValue/source.cs._

The example uses the file, `book1.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.HasValue Example/XML/source.xml._
## XmlTextReader.IsDefault property

```csharp
public override bool IsDefault { get; }
```

Gets a value indicating whether the current node is an attribute that was generated from the default value defined in the DTD or schema.

Returns: This property always returns `false`. (`XmlTextReader` does not expand default attributes.)

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This property applies only to attribute nodes.

## XmlTextReader.IsEmptyElement property

```csharp
public override bool IsEmptyElement { get; }
```

Gets a value indicating whether the current node is an empty element (for example, `<MyElement/>`).

Returns: `true` if the current node is an element (`XmlTextReader.NodeType` equals `XmlNodeType.Element`) that ends with `/>`; otherwise, `false`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This property enables you to determine the difference between the following:

`` (`IsEmptyElement` is `true`).

`` (`IsEmptyElement` is `false`, although element content is empty).

A corresponding `EndElement` node is not generated for empty elements.

`IsEmptyElement` simply reports whether or not the element in the source document had an end element tag.

#### Examples
The following example displays the text content of each element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/IsEmptyElement/source.cs._

The example uses the file, `elems.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlReader.IsStartElement Example/XML/source.xml._
## XmlTextReader.LineNumber property

```csharp
public int LineNumber { get; }
```

Gets the current line number.

Returns: The current line number.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This property is most commonly used for error reporting, but can be called at any time. The starting value for this property is `1`.

Combined with `LinePosition`, a value of `1,1` indicates the start of the document.

#### Examples
The following example displays each node including its depth, line number, and line position.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/Depth/readlinenum.cs._
