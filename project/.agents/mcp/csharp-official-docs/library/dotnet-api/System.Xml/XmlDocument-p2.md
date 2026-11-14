---
title: "XmlDocument class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocument class (part 2 of 7)

## XmlDocument.InnerXml property

```csharp
public override string InnerXml { get; set; }
```

Gets or sets the markup representing the children of the current node.

Returns: The markup of the children of the current node.

Exceptions:

- `XmlException`: The XML specified when setting this property is not well-formed.

#### Remarks
Setting this property replaces the children of the node with the parsed contents of the given string. The parsing is done in the current namespace context.

`InnerXml` removes redundant namespace declarations. As a result, numerous cut and paste operations do not increase the size of your document with redundant namespace declarations. Consider the following XSL document:

```xml
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
     <xsl:template match="stock">
         ...
     </xsl:template>
    </xsl:stylesheet>
```

The `InnerXml` property on the stylesheet node returns the following string:

```xml
<xsl:template match="stock"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
     ...
    </xsl:template>
```

Notice the additional xmlns:xsl namespace declaration which is used to preserve the node identity. If you re-insert this inner XML string, you will get back your original document. In other words, `InnerXml` recognizes that the xmlns:xsl namespace declaration is redundant, given that the parent xsl:stylesheet element already has the xmlns:xsl namespace declaration, and therefore removes it.

If you move `InnerXml` from a document with no default namespace to a document with a default namespace, the behavior is a little different. Consider the following XML string:

```xml
<test>
      123
    </test>
```

`InnerXml` returns a plain XML string with no namespace declarations:

```xml
123
```

If you then insert this string into a document that does have a default namespace, such as the following:

```xml
<test2 xmlns="urn:1">
    </test>
```

`InnerXml` parses the string in context, and the new nodes pick up the urn:1 namespace. The result looks like this:

```xml
<test2 xmlns="urn:1">
      123
    </test>
```

Now when you ask for the `InnerXml` you get back the following:

```xml
123
```

If you explicitly want the inserted item to preserve the fact that it came from a document that had no namespace then you need to manually add an xmlns= "" declaration and insert the resulting string:

```xml
123
```

The net effect of all this is as follows:

1.  Cutting and pasting `InnerXml` among documents that do not use namespaces is clean and simple and does not create "xmlns" redundancy in your strings.

2.  `InnerXml` can also be used to cut and paste between documents which have more than one namespace (that is XSL stylesheets).

3.  xmlns:xsl declarations automatically appear in your strings and disappear in your node hierarchies.

4.  In the case where you are moving `InnerXml` from a document that has no default namespace to a document that does have a default namespace, the new nodes will pick up the new default namespace.

If `InnerXml` is set with text containing entity references that are not currently defined in the document, the resulting tree will contain empty EntityReference nodes.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlDocument.IsReadOnly property

```csharp
public override bool IsReadOnly { get; }
```

Gets a value indicating whether the current node is read-only.

Returns: `true` if the current node is read-only; otherwise `false`. `XmlDocument` nodes always return `false`.

#### Remarks
A read-only node is one whose properties, attributes, or children cannot be changed. You can remove a read-only node from the tree and insert it somewhere else.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example shows how to use the `IsReadOnly` property.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/IsReadOnly/source.cs._
[!code-vbClassic WebData XmlDocument.IsReadOnly Example#1]

## XmlDocument.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For `XmlDocument` nodes, the local name is #document.

#### Remarks
The local name returned depends on the `NodeType` of the node. To see a table describing the local name returned for each of the node types, see the `LocalName` property in the `XmlNode` class.

## XmlDocument.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For `XmlDocument` nodes, the name is #document.

#### Remarks
The name returned depends on the `NodeType` of the node. To see a table describing the name returned for each of the node types, see the `Name` property in the `XmlNode` class.

## XmlDocument.NameTable property

```csharp
public System.Xml.XmlNameTable NameTable { get; }
```

Gets the `XmlNameTable` associated with this implementation.

Returns: An `XmlNameTable` enabling you to get the atomized version of a string within the document.

#### Remarks
Each `XmlDocument` object has a `NameTable` object. Element and attribute names are stored in the `NameTable` as atomized strings. This means that even if a name is referenced in the document multiple times it is stored only once in the `NameTable`. For example, if the document had multiple elements with the name "Customer", `NameTable` returns the same object whenever it receives a request for that name. As a result, users can write code using object comparisons on these strings rather than the more expensive string comparisons.

For more information on atomized strings, see `XmlNameTable`.

This method is a Microsoft extension to the Document Object Model (DOM).

## XmlDocument.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: The node type. For `XmlDocument` nodes, this value is XmlNodeType.Document.

To be added.

## XmlDocument.OwnerDocument property

```csharp
public override System.Xml.XmlDocument? OwnerDocument { get; }
```

Gets the `XmlDocument` to which the current node belongs.

Returns: For `XmlDocument` nodes (`XmlDocument.NodeType` equals XmlNodeType.Document), this property always returns `null`.

To be added.

## XmlDocument.ParentNode property

```csharp
public override System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent node of this node (for nodes that can have parents).

Returns: Always returns `null`.

To be added.

## XmlDocument.PreserveWhitespace property

```csharp
public bool PreserveWhitespace { get; set; }
```

Gets or sets a value indicating whether to preserve white space in element content.

Returns: `true` to preserve white space; otherwise `false`. The default is `false`.

#### Remarks
This property determines how white space is handled during the load and save process.

If `PreserveWhitespace` is `true` before `XmlDocument.Load` or `XmlDocument.LoadXml` is called, white space nodes are preserved; otherwise, if this property is `false`, significant white space is preserved, white space is not.

If `PreserveWhitespace` is `true` before `XmlDocument.Save` is called, white space in the document is preserved in the output; otherwise, if this property is `false`, `XmlDocument` auto-indents the output.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example shows how to strip white space from a file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/PreserveWhitespace/source.cs._
[!code-vbClassic WebData XmlDocument.PreserveWhitespace Example#1]

The example uses the file `book.xml` as input.

[!code-xmlClassic WebData XmlDocument.PreserveWhitespace Example#2]

## XmlDocument.SchemaInfo property

```csharp
public override System.Xml.Schema.IXmlSchemaInfo SchemaInfo { get; }
```

Returns the Post-Schema-Validation-Infoset (PSVI) of the node.

Returns: The `IXmlSchemaInfo` object representing the PSVI of the node.

#### Remarks
The PSVI contents of this property are set after the node has been validated.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlDocument.Schemas property

```csharp
public System.Xml.Schema.XmlSchemaSet Schemas { get; set; }
```

Gets or sets the `XmlSchemaSet` object associated with this `XmlDocument`.

Returns: An `XmlSchemaSet` object containing the XML Schema Definition Language (XSD) schemas associated with this `XmlDocument`; otherwise, an empty `XmlSchemaSet` object.

#### Remarks
The schemas contained in an `XmlSchemaSet` object associated with an `XmlDocument` object are used for validation when the `XmlDocument.Validate` method of an `XmlDocument` is executed.

When an `XmlDocument` object is initialized with XML data from an `XmlReader` object, the `XmlSchemaSet` object is loaded from the `Schemas` property of the `XmlReader` object.

## XmlDocument.XmlResolver property

```csharp
public virtual System.Xml.XmlResolver? XmlResolver { set; }
```

Sets the `XmlResolver` to use for resolving external resources.

Returns: The `XmlResolver` to use.

Exceptions:

- `XmlException`: This property is set to `null` and an external DTD or entity is encountered.

#### Remarks
The `XmlResolver` can be used to load DTDs or expand entity references. Using the `Credentials` property, you can set credentials on the `XmlResolver` to access resources stored on a secure network resource.

- If the document was not loaded using an `XmlReader` (that is, if it was loaded using a stream, file, and so on) the `XmlResolver` on the `XmlDocument` is always used.

- If the document was loaded with an `XmlTextReader`, the resolver on the `XmlTextReader` is used to resolve any DTD references in the DocumentType node. The resolver on the `XmlDocument` is used to expand any entity references.

- If the document was loaded with an `XmlValidatingReader`, the resolver on the `XmlDocument` is never used.

- If the document was loaded with a class that extends `XmlReader` and the `XmlReader` cannot resolve entities (`CanResolveEntity` returns `false`), the `XmlResolver` on the `XmlDocument` is used to resolve any references in the DocumentType node and to expand any entity references.

> **Note:**
> If the `XmlDocument` is loaded using an `XmlReader` that had an `XmlResolver` set to it, the `XmlResolver` on the `XmlReader` is not cached by the `XmlDocument` after `XmlDocument.Load` completes.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example loads an XML document which includes a reference to a DTD file. The `XmlResolver` property is used to set the credentials <example-value> to access the network resource.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/XmlResolver/docresolver.cs._

The example uses the following data files as input.

`book5.xml`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlDocument.XmlResolver/XML/book5.xml._

`books.dtd`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlDocument.XmlResolver/XML/books.dtd._

## XmlDocument.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: The cloned `XmlDocument` node.

#### Remarks
This method serves as a copy constructor for nodes. The cloned node has no parent (`ParentNode` returns `null`).

If `deep` is `true`, the cloned node includes all the child nodes, otherwise only the `XmlDocument` node is cloned. See the `XmlNode.CloneNode` method to see how this method behaves on other node types.

#### Examples

The following example shows the difference between a deep and shallow clone.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CloneNode/source.cs._

## XmlDocument.CreateAttribute(String) method

```csharp
public System.Xml.XmlAttribute CreateAttribute (string name);
```

Creates an `XmlAttribute` with the specified `XmlDocument.Name`.

Parameters:

- `name`: The qualified name of the attribute. If the name contains a colon, the `XmlNode.Prefix` property reflects the part of the name preceding the first colon and the `XmlDocument.LocalName` property reflects the part of the name following the first colon. The `XmlNode.NamespaceURI` remains empty unless the prefix is a recognized built-in prefix such as xmlns. In this case `NamespaceURI` has a value of `http://www.w3.org/2000/xmlns/`.

Returns: The new `XmlAttribute`.

#### Remarks
The `XmlAttribute` can be added to an `XmlElement` using the `XmlElement.SetAttributeNode` method.

#### Examples

The following creates an attribute and adds it to an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/CreateAttribute/source.cs._

## XmlDocument.CreateAttribute(String, String) method

```csharp
public System.Xml.XmlAttribute CreateAttribute (string qualifiedName, string? namespaceURI);
```

Creates an `XmlAttribute` with the specified qualified name and `XmlNode.NamespaceURI`.

Parameters:

- `qualifiedName`: The qualified name of the attribute. If the name contains a colon then the `XmlNode.Prefix` property will reflect the part of the name preceding the colon and the `XmlDocument.LocalName` property will reflect the part of the name after the colon.
- `namespaceURI`: The namespaceURI of the attribute. If the qualified name includes a prefix of xmlns, then this parameter must be `http://www.w3.org/2000/xmlns/`.

Returns: The new `XmlAttribute`.

#### Remarks
The `XmlAttribute` can be added to an `XmlElement` using the `XmlElement.SetAttributeNode` method.

## XmlDocument.CreateAttribute(String, String, String) method

```csharp
public virtual System.Xml.XmlAttribute CreateAttribute (string? prefix, string localName, string? namespaceURI);
```

Creates an `XmlAttribute` with the specified `XmlNode.Prefix`, `XmlDocument.LocalName`, and `XmlNode.NamespaceURI`.

Parameters:

- `prefix`: The prefix of the attribute (if any). String.Empty and `null` are equivalent.
- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute (if any). String.Empty and `null` are equivalent. If `prefix` is xmlns, then this parameter must be `http://www.w3.org/2000/xmlns/`; otherwise an exception is thrown.

Returns: The new `XmlAttribute`.

#### Remarks
The `XmlAttribute` can be added to an `XmlElement` using the `XmlElement.SetAttributeNode` method.

This method is a Microsoft extension to the Document Object Model (DOM).
