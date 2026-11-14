---
title: "XmlValidatingReader class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlValidatingReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlValidatingReader class

Namespace: `System.Xml`

```csharp
public class XmlValidatingReader : System.Xml.XmlReader, System.Xml.IXmlLineInfo, System.Xml.IXmlNamespaceResolver
```

Represents a reader that provides document type definition (DTD), XML-Data Reduced (XDR) schema, and XML Schema definition language (XSD) validation.

To be added.

## XmlValidatingReader.XmlValidatingReader(XmlReader) constructor

```csharp
public XmlValidatingReader (System.Xml.XmlReader reader);
```

Initializes a new instance of the `XmlValidatingReader` class that validates the content returned from the given `XmlReader`.

Parameters:

- `reader`: The `XmlReader` to read from while validating. The current implementation supports only `XmlTextReader`.

Exceptions:

- `ArgumentException`: The reader specified is not an `XmlTextReader`.

To be added.

## XmlValidatingReader.XmlValidatingReader(Stream, XmlNodeType, XmlParserContext) constructor

```csharp
public XmlValidatingReader (System.IO.Stream xmlFragment, System.Xml.XmlNodeType fragType, System.Xml.XmlParserContext context);
```

Initializes a new instance of the `XmlValidatingReader` class with the specified values.

Parameters:

- `xmlFragment`: The stream containing the XML fragment to parse.
- `fragType`: The `XmlNodeType` of the XML fragment. This determines what the fragment can contain (see table below).
- `context`: The `XmlParserContext` in which the XML fragment is to be parsed. This includes the `XmlNameTable` to use, encoding, namespace scope, current `xml:lang`, and `xml:space` scope.

Exceptions:

- `XmlException`: `fragType` is not one of the node types listed in the table below.

To be added.

## XmlValidatingReader.XmlValidatingReader(String, XmlNodeType, XmlParserContext) constructor

```csharp
public XmlValidatingReader (string xmlFragment, System.Xml.XmlNodeType fragType, System.Xml.XmlParserContext context);
```

Initializes a new instance of the `XmlValidatingReader` class with the specified values.

Parameters:

- `xmlFragment`: The string containing the XML fragment to parse.
- `fragType`: The `XmlNodeType` of the XML fragment. This also determines what the fragment string can contain (see table below).
- `context`: The `XmlParserContext` in which the XML fragment is to be parsed. This includes the `NameTable` to use, encoding, namespace scope, current xml:lang, and xml:space scope.

Exceptions:

- `XmlException`: `fragType` is not one of the node types listed in the table below.

To be added.

## XmlValidatingReader.AttributeCount property

```csharp
public override int AttributeCount { get; }
```

Gets the number of attributes on the current node.

Returns: The number of attributes on the current node. This number includes default attributes.

To be added.

## XmlValidatingReader.BaseURI property

```csharp
public override string BaseURI { get; }
```

Gets the base URI of the current node.

Returns: The base URI of the current node.

To be added.

## XmlValidatingReader.CanReadBinaryContent property

```csharp
public override bool CanReadBinaryContent { get; }
```

Gets a value indicating whether the `XmlValidatingReader` implements the binary content read methods.

Returns: `true` if the binary content read methods are implemented; otherwise `false`. The `XmlValidatingReader` class returns `true`.

To be added.

## XmlValidatingReader.CanResolveEntity property

```csharp
public override bool CanResolveEntity { get; }
```

Gets a value indicating whether this reader can parse and resolve entities.

Returns: `true` if the reader can parse and resolve entities; otherwise, `false`. `XmlValidatingReader` always returns `true`.

To be added.

## XmlValidatingReader.Depth property

```csharp
public override int Depth { get; }
```

Gets the depth of the current node in the XML document.

Returns: The depth of the current node in the XML document.

To be added.

## XmlValidatingReader.Encoding property

```csharp
public System.Text.Encoding? Encoding { get; }
```

Gets the encoding attribute for the document.

Returns: The encoding value. If no encoding attribute exists, and there is not byte-order mark, this defaults to UTF-8.

To be added.

## XmlValidatingReader.EntityHandling property

```csharp
public System.Xml.EntityHandling EntityHandling { get; set; }
```

Gets or sets a value that specifies how the reader handles entities.

Returns: One of the `EntityHandling` values. If no `EntityHandling` is specified, it defaults to EntityHandling.ExpandEntities.

Exceptions:

- `ArgumentOutOfRangeException`: Invalid value was specified.

To be added.

## XmlValidatingReader.EOF property

```csharp
public override bool EOF { get; }
```

Gets a value indicating whether the reader is positioned at the end of the stream.

Returns: `true` if the reader is positioned at the end of the stream; otherwise, `false`.

To be added.

## XmlValidatingReader.HasValue property

```csharp
public override bool HasValue { get; }
```

Gets a value indicating whether the current node can have a `XmlValidatingReader.Value` other than String.Empty.

Returns: `true` if the node on which the reader is currently positioned can have a `Value`; otherwise, `false`.

To be added.

## XmlValidatingReader.IsDefault property

```csharp
public override bool IsDefault { get; }
```

Gets a value indicating whether the current node is an attribute that was generated from the default value defined in the document type definition (DTD) or schema.

Returns: `true` if the current node is an attribute whose value was generated from the default value defined in the DTD or schema; `false` if the attribute value was explicitly set.

To be added.

## XmlValidatingReader.IsEmptyElement property

```csharp
public override bool IsEmptyElement { get; }
```

Gets a value indicating whether the current node is an empty element (for example, `<MyElement/>`).

Returns: `true` if the current node is an element (`XmlValidatingReader.NodeType` equals `XmlNodeType.Element`) that ends with `/>`; otherwise, `false`.

To be added.

## XmlValidatingReader.LineNumber property

```csharp
public int LineNumber { get; }
```

Gets the current line number.

Returns: The current line number. The starting value for this property is 1.

To be added.

## XmlValidatingReader.LinePosition property

```csharp
public int LinePosition { get; }
```

Gets the current line position.

Returns: The current line position. The starting value for this property is 1.

To be added.

## XmlValidatingReader.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the current node.

Returns: The name of the current node with the prefix removed. For example, `LocalName` is `book` for the element `<bk:book>`.

For node types that do not have a name (like `Text`, `Comment`, and so on), this property returns String.Empty.

To be added.

## XmlValidatingReader.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the current node.

Returns: The qualified name of the current node. For example, `Name` is `bk:book` for the element `<bk:book>`.

The name returned is dependent on the `XmlValidatingReader.NodeType` of the node. The following node types return the listed values. All other node types return an empty string.

- `Attribute`:  The name of the attribute.

- `DocumentType`:  The document type name.

- `Element`:  The tag name.

- `EntityReference`:  The name of the entity referenced.

- `ProcessingInstruction`:  The target of the processing instruction.

- `XmlDeclaration`:  The literal string `xml`.

To be added.

## XmlValidatingReader.Namespaces property

```csharp
public bool Namespaces { get; set; }
```

Gets or sets a value indicating whether to do namespace support.

Returns: `true` to do namespace support; otherwise, `false`. The default is `true`.

To be added.

## XmlValidatingReader.NamespaceURI property

```csharp
public override string NamespaceURI { get; }
```

Gets the namespace Uniform Resource Identifier (URI) (as defined in the World Wide Web Consortium (W3C) Namespace specification) of the node on which the reader is positioned.

Returns: The namespace URI of the current node; otherwise an empty string.

To be added.

## XmlValidatingReader.NameTable property

```csharp
public override System.Xml.XmlNameTable NameTable { get; }
```

Gets the `XmlNameTable` associated with this implementation.

Returns: `XmlNameTable` that enables you to get the atomized version of a string within the node.

To be added.

## XmlValidatingReader.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: One of the `XmlNodeType` values representing the type of the current node.

To be added.

## XmlValidatingReader.Prefix property

```csharp
public override string Prefix { get; }
```

Gets the namespace prefix associated with the current node.

Returns: The namespace prefix associated with the current node.

To be added.

## XmlValidatingReader.QuoteChar property

```csharp
public override char QuoteChar { get; }
```

Gets the quotation mark character used to enclose the value of an attribute node.

Returns: The quotation mark character (" or ') used to enclose the value of an attribute node.

To be added.

## XmlValidatingReader.Reader property

```csharp
public System.Xml.XmlReader Reader { get; }
```

Gets the `XmlReader` used to construct this `XmlValidatingReader`.

Returns: The `XmlReader` specified in the constructor.

To be added.

## XmlValidatingReader.ReadState property

```csharp
public override System.Xml.ReadState ReadState { get; }
```

Gets the state of the reader.

Returns: One of the `ReadState` values.

To be added.

## XmlValidatingReader.Schemas property

```csharp
public System.Xml.Schema.XmlSchemaCollection Schemas { get; }
```

Gets a `XmlSchemaCollection` to use for validation.

Returns: The `XmlSchemaCollection` to use for validation.

To be added.

## XmlValidatingReader.SchemaType property

```csharp
public object? SchemaType { get; }
```

Gets a schema type object.

Returns: `XmlSchemaDatatype`, `XmlSchemaSimpleType`, or `XmlSchemaComplexType` depending whether the node value is a built in XML Schema definition language (XSD) type or a user defined simpleType or complexType; `null` if the current node has no schema type.

To be added.

## XmlValidatingReader.ValidationType property

```csharp
public System.Xml.ValidationType ValidationType { get; set; }
```

Gets or sets a value indicating the type of validation to perform.

Returns: One of the `ValidationType` values. If this property is not set, it defaults to ValidationType.Auto.

Exceptions:

- `InvalidOperationException`: Setting the property after a Read has been called.

To be added.

## XmlValidatingReader.Value property

```csharp
public override string Value { get; }
```

Gets the text value of the current node.

Returns: The value returned depends on the `XmlValidatingReader.NodeType` of the node. The following table lists node types that have a value to return. All other node types return String.Empty.

- `Attribute`:  The value of the attribute.

- `CDATA`:  The content of the CDATA section.

- `Comment`:  The content of the comment.

- `DocumentType`:  The internal subset.

- `ProcessingInstruction`:  The entire content, excluding the target.

- `SignificantWhitespace`:  The white space between markup in a mixed content model.

- `Text`:  The content of the text node.

- `Whitespace`:  The white space between markup.

- `XmlDeclaration`:  The content of the declaration.

To be added.

## XmlValidatingReader.XmlLang property

```csharp
public override string XmlLang { get; }
```

Gets the current `xml:lang` scope.

Returns: The current `xml:lang` scope.

To be added.

## XmlValidatingReader.XmlResolver property

```csharp
public System.Xml.XmlResolver XmlResolver { set; }
```

Sets the `XmlResolver` used for resolving external document type definition (DTD) and schema location references. The `XmlResolver` is also used to handle any import or include elements found in XML Schema definition language (XSD) schemas.

Returns: The `XmlResolver` to use. If set to `null`, external resources are not resolved.

To be added.

## XmlValidatingReader.XmlSpace property

```csharp
public override System.Xml.XmlSpace XmlSpace { get; }
```

Gets the current `xml:space` scope.

Returns: One of the `XmlSpace` values. If no `xml:space` scope exists, this property defaults to `XmlSpace.None`.

To be added.

## XmlValidatingReader.Close() method

```csharp
public override void Close ();
```

Changes the `XmlReader.ReadState` to Closed.

To be added.

## XmlValidatingReader.GetAttribute(Int32) method

```csharp
public override string GetAttribute (int i);
```

Gets the value of the attribute with the specified index.

Parameters:

- `i`: The index of the attribute. The index is zero-based. (The first attribute has index 0.)

Returns: The value of the specified attribute.

Exceptions:

- `ArgumentOutOfRangeException`: The `i` parameter is less than 0 or greater than or equal to `XmlValidatingReader.AttributeCount`.

To be added.

## XmlValidatingReader.GetAttribute(String) method

```csharp
public override string? GetAttribute (string name);
```

Gets the value of the attribute with the specified name.

Parameters:

- `name`: The qualified name of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned.

To be added.

## XmlValidatingReader.GetAttribute(String, String) method

```csharp
public override string? GetAttribute (string localName, string? namespaceURI);
```

Gets the value of the attribute with the specified local name and namespace Uniform Resource Identifier (URI).

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned. This method does not move the reader.

To be added.

## XmlValidatingReader.HasLineInfo() method

```csharp
public bool HasLineInfo ();
```

Gets a value indicating whether the class can return line information.

Returns: `true` if the class can return line information; otherwise, `false`.

To be added.

## XmlValidatingReader.LookupNamespace(String) method

```csharp
public override string? LookupNamespace (string prefix);
```

Resolves a namespace prefix in the current element's scope.

Parameters:

- `prefix`: The prefix whose namespace Uniform Resource Identifier (URI) you want to resolve. To match the default namespace, pass an empty string.

Returns: The namespace URI to which the prefix maps or `null` if no matching prefix is found.

To be added.
