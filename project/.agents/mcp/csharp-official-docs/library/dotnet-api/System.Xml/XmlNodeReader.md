---
title: "XmlNodeReader class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeReader class

Namespace: `System.Xml`

```csharp
public class XmlNodeReader : System.Xml.XmlReader, System.Xml.IXmlNamespaceResolver
```

Represents a reader that provides fast, non-cached forward only access to XML data in an `XmlNode`.

> **Note:**
> Instead of using the `XmlNodeReader`, we recommend that you create `XmlReader` instances by using the `XmlReaderSettings` class and the `XmlReader.Create` method. This enables you to take advantage of conformance checking and compliance to the XML 1.0 recommendation.

The `XmlNodeReader` has the ability to read an XML DOM subtree. This class does not support document type definition (DTD) or schema validation. However, you can create an `XmlReader` object that wraps around the `XmlNodeReader` object to validate the data stored in the `XmlNodeReader` object, as shown in Examples section.

In the following example, an XML file is loaded into an XML document and modified. The XML document is passed to an `XmlNodeReader`, which is then passed to the `XmlReader.Create` method. When the validating reader parses the file, it can validate any changes made to the XML file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/Overview/valid_dom.cs._

The following two XML files are used as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/booksschema.xml._
_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/books.xsd._
Output:

> Validation Error: The 'publisher' attribute is not declared.

## XmlNodeReader.XmlNodeReader(XmlNode) constructor

```csharp
public XmlNodeReader (System.Xml.XmlNode node);
```

Creates an instance of the `XmlNodeReader` class using the specified `XmlNode`.

Parameters:

- `node`: The `XmlNode` you want to read.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

For more information and examples of the code used to create an `XmlNodeReader`, see `XmlReader` and overloads of the `XmlReader.Create` method.

## XmlNodeReader.AttributeCount property

```csharp
public override int AttributeCount { get; }
```

Gets the number of attributes on the current node.

Returns: The number of attributes on the current node. This number includes default attributes.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This property is relevant to `Element`, `DocumentType` and `XmlDeclaration` nodes only. (Other node types do not have attributes.)

#### Examples
The following example reads all the attributes on the root node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/AttributeCount/source.cs._

## XmlNodeReader.BaseURI property

```csharp
public override string BaseURI { get; }
```

Gets the base URI of the current node.

Returns: The base URI of the current node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

A networked XML document is comprised of chunks of data aggregated using various W3C standard inclusion mechanisms and therefore contains nodes that come from different places. DTD entities are an example of this, but this is not limited to DTDs. The base URI tells you where these nodes came from. If there is no base URI for the nodes being returned (for example, they were parsed from an in-memory string), String.Empty is returned.

#### Examples
The following example parses a file and displays the base URI of each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/BaseURI/source.cs._

The example uses the file, `uri.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNodeReader.BaseURI Example/XML/source.xml._
The `style.xml` file contains the XML text ``.

## XmlNodeReader.CanReadBinaryContent property

```csharp
public override bool CanReadBinaryContent { get; }
```

Gets a value indicating whether the `XmlNodeReader` implements the binary content read methods.

Returns: `true` if the binary content read methods are implemented; otherwise `false`. The `XmlNodeReader` class always returns `true`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

The binary content read methods include the `XmlNodeReader.ReadContentAsBase64`, `XmlNodeReader.ReadContentAsBinHex`, `XmlNodeReader.ReadElementContentAsBase64`, and `XmlNodeReader.ReadElementContentAsBinHex` methods.

## XmlNodeReader.CanResolveEntity property

```csharp
public override bool CanResolveEntity { get; }
```

Gets a value indicating whether this reader can parse and resolve entities.

Returns: `true` if the reader can parse and resolve entities; otherwise, `false`. `XmlNodeReader` always returns `true`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

## XmlNodeReader.Depth property

```csharp
public override int Depth { get; }
```

Gets the depth of the current node in the XML document.

Returns: The depth of the current node in the XML document.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

## XmlNodeReader.EOF property

```csharp
public override bool EOF { get; }
```

Gets a value indicating whether the reader is positioned at the end of the stream.

Returns: `true` if the reader is positioned at the end of the stream; otherwise, `false`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

## XmlNodeReader.HasAttributes property

```csharp
public override bool HasAttributes { get; }
```

Gets a value indicating whether the current node has any attributes.

Returns: `true` if the current node has attributes; otherwise, `false`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

#### Examples
The following example reads all the attributes on the root node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/AttributeCount/source.cs._

## XmlNodeReader.HasValue property

```csharp
public override bool HasValue { get; }
```

Gets a value indicating whether the current node can have a `XmlNodeReader.Value`.

Returns: `true` if the node on which the reader is currently positioned can have a `Value`; otherwise, `false`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

The following table lists node types that have a value to return.

|Node Type|Value|
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

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/HasValue/source.cs._

## XmlNodeReader.IsDefault property

```csharp
public override bool IsDefault { get; }
```

Gets a value indicating whether the current node is an attribute that was generated from the default value defined in the document type definition (DTD) or schema.

Returns: `true` if the current node is an attribute whose value was generated from the default value defined in the DTD or schema; `false` if the attribute value was explicitly set.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This property applies to attribute nodes only. If the reader is not positioned on an attribute node, this property returns `false`.

## XmlNodeReader.IsEmptyElement property

```csharp
public override bool IsEmptyElement { get; }
```

Gets a value indicating whether the current node is an empty element (for example, `<MyElement/>`).

Returns: `true` if the current node is an element (`XmlNodeReader.NodeType` equals `XmlNodeType.Element`) and it ends with `/>`; otherwise, `false`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This property enables you to determine the difference between the following:

`` (`IsEmptyElement` is `true`).

`` (`IsEmptyElement` is `false`, although element content is empty).

A corresponding `EndElement` node is not generated for empty elements.

#### Examples
The following example displays the text content of each element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/IsEmptyElement/source.cs._

## XmlNodeReader.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the current node.

Returns: The name of the current node with the prefix removed. For example, `LocalName` is `book` for the element `<bk:book>`.

For node types that do not have a name (like `Text`, `Comment`, and so on), this property returns String.Empty.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

#### Examples
The following example displays the local name of each node, and, if they exist, the prefix and namespace URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/LocalName/source.cs._

## XmlNodeReader.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the current node.

Returns: The qualified name of the current node. For example, `Name` is `bk:book` for the element `<bk:book>`.

The name returned is dependent on the `XmlNodeReader.NodeType` of the node. The following node types return the listed values. All other node types return an empty string.

- `Attribute`:  The name of the attribute.

- `DocumentType`:  The document type name.

- `Element`:  The tag name.

- `EntityReference`:  The name of the entity referenced.

- `ProcessingInstruction`:  The target of the processing instruction.

- `XmlDeclaration`:  The literal string `xml`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

#### Examples
The following example reads an XML and displays each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/Close/source.cs._

The example uses the file, `items.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNodeReader.Name Example/XML/source.xml._
## XmlNodeReader.NamespaceURI property

```csharp
public override string NamespaceURI { get; }
```

Gets the namespace URI (as defined in the W3C Namespace specification) of the node on which the reader is positioned.

Returns: The namespace URI of the current node; otherwise an empty string.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This property is relevant to `Element` and `Attribute` nodes only.

#### Examples
The following example displays the local name of each node, and, if they exist, the prefix and namespace URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/LocalName/source.cs._

## XmlNodeReader.NameTable property

```csharp
public override System.Xml.XmlNameTable NameTable { get; }
```

Gets the `XmlNameTable` associated with this implementation.

Returns: The `XmlNameTable` enabling you to get the atomized version of a string within the node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

All node and attribute names returned from this class are atomized using the `NameTable`. When the same name is returned multiple times (for example, `Customer`), then the same `String` object is returned for that name. This makes it possible for you to write efficient code that does object comparisons on these strings instead of expensive string comparisons.
