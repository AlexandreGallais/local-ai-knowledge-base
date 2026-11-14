---
title: "XmlDocument class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocument class (part 5 of 7)

## XmlDocument.CreateXmlDeclaration(String, String, String) method

```csharp
public virtual System.Xml.XmlDeclaration CreateXmlDeclaration (string version, string? encoding, string? standalone);
```

Creates an `XmlDeclaration` node with the specified values.

Parameters:

- `version`: The version must be "1.0".
- `encoding`: The value of the encoding attribute. This is the encoding that is used when you save the `XmlDocument` to a file or a stream; therefore, it must be set to a string supported by the `Encoding` class, otherwise `XmlDocument.Save` fails. If this is `null` or String.Empty, the `Save` method does not write an encoding attribute on the XML declaration and therefore the default encoding, UTF-8, is used.

Note: If the `XmlDocument` is saved to either a `TextWriter` or an `XmlTextWriter`, this encoding value is discarded. Instead, the encoding of the `TextWriter` or the `XmlTextWriter` is used. This ensures that the XML written out can be read back using the correct encoding.
- `standalone`: The value must be either "yes" or "no". If this is `null` or String.Empty, the `Save` method does not write a standalone attribute on the XML declaration.

Returns: The new `XmlDeclaration` node.

Exceptions:

- `ArgumentException`: The values of `version` or `standalone` are something other than the ones specified above.

#### Remarks
The attributes are exposed as special properties on the `XmlDeclaration` node, and not as `XmlAttribute` nodes.

Although this method creates the new object in the context of the document, it does not automatically add the new object to the document tree. To add the new object, you must explicitly call one of the node insert methods.

According to the W3C Extensible Markup Language (XML) 1.0 recommendation, the `XmlDeclaration` node must be the first node in the document.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example creates an XML declaration and adds it to the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateXmlDeclaration/source.cs._
[!code-vbClassic WebData XmlDocument.CreateXmlDeclaration Example#1]

## XmlDocument.GetElementById(String) method

```csharp
public virtual System.Xml.XmlElement? GetElementById (string elementId);
```

Gets the `XmlElement` with the specified ID.

Parameters:

- `elementId`: The attribute ID to match.

Returns: The `XmlElement` with the matching ID or `null` if no matching element is found.

#### Remarks
If the document has multiple elements with the matching ID, this method returns the first matching element in the document.

> **Note:**
> The DOM implementation must have information which defines which attributes are of type ID. Although attributes of type ID can be defined in either XSD schemas or DTDs, this version of the product only supports those defined in DTDs. Attributes with the name "ID" are not of type ID unless so defined in the DTD. Implementations where it is unknown whether the attributes are of type ID are expected to return `null`.

#### Examples

The following example uses the `GetElementById` method.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/GetElementById/source.cs._
[!code-vbClassic WebData XmlDocument.GetElementById Example#1]

The example uses the file, `ids.xml`, as input.

```xml
<!DOCTYPE root [
  <!ELEMENT root ANY>
  <!ELEMENT Person ANY>
  <!ELEMENT Customer EMPTY>
  <!ELEMENT Team EMPTY>
  <!ATTLIST Person SSN ID #REQUIRED>
  <!ATTLIST Customer id IDREF #REQUIRED >
  <!ATTLIST Team members IDREFS #REQUIRED>]>
<root>
  
  
  
  
</root>
```

## XmlDocument.GetElementsByTagName(String) method

```csharp
public virtual System.Xml.XmlNodeList GetElementsByTagName (string name);
```

Returns an `XmlNodeList` containing a list of all descendant elements that match the specified `XmlDocument.Name`.

Parameters:

- `name`: The qualified name to match. It is matched against the `Name` property of the matching node. The special value "*" matches all tags.

Returns: An `XmlNodeList` containing a list of all matching nodes. If no nodes match `name`, the returned collection will be empty.

#### Remarks
The nodes are placed in the order in which they would be encountered in the document.

> **Note:**
> It is recommended that you use the `XmlNode.SelectNodes` or `XmlNode.SelectSingleNode` method instead of the `XmlDocument.GetElementsByTagName` method.

#### Examples

The following example creates a `XmlDocument` object and uses the `GetElementsByTagName` method and the resulting `XmlNodeList` object to display all the book titles.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source1.cs._
[!code-vbClassic WebData XmlDocument.GetElementsByTagName Example#1]

The example uses the `books.xml` file as input.

[!code-xmlClassic WebData XslTransform.Transform7 Example#2]

## XmlDocument.GetElementsByTagName(String, String) method

```csharp
public virtual System.Xml.XmlNodeList GetElementsByTagName (string localName, string namespaceURI);
```

Returns an `XmlNodeList` containing a list of all descendant elements that match the specified `XmlDocument.LocalName` and `XmlNode.NamespaceURI`.

Parameters:

- `localName`: The LocalName to match. The special value "*" matches all tags.
- `namespaceURI`: NamespaceURI to match.

Returns: An `XmlNodeList` containing a list of all matching nodes. If no nodes match the specified `localName` and `namespaceURI`, the returned collection will be empty.

#### Remarks
The nodes are placed in the order in which they would be encountered in the document tree.

> **Note:**
> It is recommended that you use the `XmlNode.SelectNodes` or `XmlNode.SelectSingleNode` method instead of the `XmlDocument.GetElementsByTagName` method.

## XmlDocument.ImportNode(XmlNode, Boolean) method

```csharp
public virtual System.Xml.XmlNode ImportNode (System.Xml.XmlNode node, bool deep);
```

Imports a node from another document to the current document.

Parameters:

- `node`: The node being imported.
- `deep`: `true` to perform a deep clone; otherwise, `false`.

Returns: The imported `XmlNode`.

Exceptions:

- `InvalidOperationException`: The node type can't be imported.

#### Remarks
The returned node has no parent. The source node is not altered or removed from the original document; `ImportNode` creates a copy of the source node.

Importing a node creates an `XmlNode` object owned by the importing document, with `Name` and `NodeType` identical to the source node. The new object also has the attributes related to namespaces (`Prefix`, `LocalName`, and `NamespaceURI`).

Depending on the node type of the imported node and the value of the `deep` parameter, additional information is copied as appropriate. This method attempts to mirror the behavior expected if a fragment of XML or HTML source was copied from one document to another (recognizing that, in the XML case, the two documents could have different DTDs).

The following table describes the specific behavior for each `XmlNodeType`.

|XmlNodeType|ImportNode(true)|ImportNode(false)|
|-----------------|------------------------|-------------------------|
|Attribute|The `Specified` property is set to `true` on the generated `XmlAttribute`. The descendants of the source `XmlAttribute` are recursively imported and the resulting nodes reassembled to form the corresponding subtree.|The `deep` parameter does not apply to `XmlAttribute` nodes; they always carry their children with them when imported.|
|CData|Copies the node, including its data.|Copies the node, including its data.|
|Comment|Copies the node, including its data.|Copies the node, including its data.|
|DocumentFragment|The descendants of the source node are recursively imported and the resulting nodes reassembled to form the corresponding subtree.|An empty `XmlDocumentFragment` is generated.|
|DocumentType|Copies the node, including its data.*|Copies the node, including its data.*|
|Element|The descendants of the source element and its specified attribute nodes are recursively imported and the resulting nodes reassembled to form the corresponding subtree. Note: Default attributes are not copied. If the document being imported into defines default attributes for this element name, those are assigned.|Specified attribute nodes of the source element are imported, and the generated `XmlAttribute` nodes are attached to the generated `XmlElement`. Note: Default attributes are not copied. If the document being imported into defines default attributes for this element name, those are assigned.|
|EntityReference|Because the source and destination documents could have the entities defined differently, this method only copies the `XmlEntityReference` node. The replacement text is not included. If the destination document has the entity defined, its value is assigned.|Because the source and destination documents could have the entities defined differently, this method only copies the `XmlEntityReference` node. The replacement text is not included. If the destination document has the entity defined, its value is assigned.|
|ProcessingInstruction|Copies the target and data value from the imported node.|Copies the target and data value from the imported node.|
|Text|Copies the node, including its data.|Copies the node, including its data.|
|SignificantWhitespace|Copies the node, including its data.|Copies the node, including its data.|
|Whitespace|Copies the node, including its data.|Copies the node, including its data.|
|XmlDeclaration|Copies the target and data value from the imported node.|Copies the target and data value from the imported node.|
|All other node types.|These node types cannot be imported.|These node types cannot be imported.|

*Although DocumentType nodes can be imported, a document can only have one DocumentType. If the document currently has a DocumentType node, it must be removed before adding a new one.

#### Examples

The following example imports a book node from a second XML document into the original XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/ImportNode/source.cs._
[!code-vbClassic WebData XmlDocument.ImportNode Example#1]

The example uses the file, `books.xml`, as input.

[!code-xmlClassic WebData XslTransform.Transform7 Example#2]

## XmlDocument.Load(Stream) method

```csharp
public virtual void Load (System.IO.Stream inStream);
```

Loads the XML document from the specified stream.

Parameters:

- `inStream`: The stream containing the XML document to load.

Exceptions:

- `XmlException`: There is a load or parse error in the XML. In this case, a `FileNotFoundException` is raised.

#### Remarks

> **Note:**
> The `Load` method always preserves significant white space. The `PreserveWhitespace` property determines whether or not insignificant white space, that is white space in element content, is preserved. The default is `false`; white space in element content is not preserved.

If you want validation to occur, you can create a validating `XmlReader` instance by using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section of the `XmlReader` reference page.

This method is a Microsoft extension to the Document Object Model (DOM).

This method automatically detects the string format of the input XML (for example, UTF-8, ANSI, and so on). If your application needs to know which encoding is used to read the stream, consider using an `XmlTextReader` object to read the stream, and then use the `Encoding` property to determine the encoding. If you need to use a `XmlDocument` object to work with XML, you can use the `XmlTextReader` object to create one. For more information, see Reading XML Data using XPathDocument and XmlDocument.

## XmlDocument.Load(TextReader) method

```csharp
public virtual void Load (System.IO.TextReader txtReader);
```

Loads the XML document from the specified `TextReader`.

Parameters:

- `txtReader`: The `TextReader` used to feed the XML data into the document.

Exceptions:

- `XmlException`: There is a load or parse error in the XML. In this case, the document remains empty.

#### Remarks

> **Note:**
> The `Load` method always preserves significant white space. The `PreserveWhitespace` property determines whether or not insignificant white space, that is white space in element content, is preserved. The default is `false`; white space in element content is not preserved.

If you want validation to occur, you can create a validating `XmlReader` instance by using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section of the `XmlReader` reference page.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example uses the `StringReader` class to load a string of XML data into the `XmlDocument` object.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateElement/source1.cs._
[!code-vbClassic WebData XmlDocument.CreateElement2 Example#1]
