---
title: "XmlElement class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlElement class

Namespace: `System.Xml`

```csharp
public class XmlElement : System.Xml.XmlLinkedNode
```

Represents an element.

#### Remarks
Elements are one of the most common nodes in the W3C Document Object Model (DOM). Elements can have attributes associated with them. The `XmlElement` class has many methods for accessing attributes (`XmlElement.GetAttribute`, `XmlElement.SetAttribute`, `XmlElement.RemoveAttribute`, `XmlElement.GetAttributeNode`, and so on). You can also use the `Attributes` property which returns an `XmlAttributeCollection` enabling you to access attributes by name or index from the collection.

## XmlElement.XmlElement(String, String, String, XmlDocument) constructor

```csharp
protected internal XmlElement (string? prefix, string localName, string? namespaceURI, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlElement` class.

Parameters:

- `prefix`: The namespace prefix; see the `XmlElement.Prefix` property.
- `localName`: The local name; see the `XmlElement.LocalName` property.
- `namespaceURI`: The namespace URI; see the `XmlElement.NamespaceURI` property.
- `doc`: The parent XML document.

#### Remarks
Do not instantiate an `XmlElement` directly; instead, use methods such as `XmlDocument.CreateElement`.

## XmlElement.Attributes property

```csharp
public override System.Xml.XmlAttributeCollection Attributes { get; }
```

Gets an `XmlAttributeCollection` containing the list of attributes for this node.

Returns: `XmlAttributeCollection` containing the list of attributes for this node.

#### Examples
The following example uses changes the value of the first attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/Attributes/source.cs._

## XmlElement.HasAttributes property

```csharp
public virtual bool HasAttributes { get; }
```

Gets a `boolean` value indicating whether the current node has any attributes.

Returns: `true` if the current node has attributes; otherwise, `false`.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example removes all attributes from the root element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/HasAttributes/source.cs._

## XmlElement.InnerText property

```csharp
public override string InnerText { get; set; }
```

Gets or sets the concatenated values of the node and all its children.

Returns: The concatenated values of the node and all its children.

#### Remarks

Setting this property replaces all the children with the parsed contents of the given string, so children nodes are not preserved.
The only child node after the set operation is a text node.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example compares the `InnerText` and `InnerXml` properties.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/InnerText/source.cs._

## XmlElement.InnerXml property

```csharp
public override string InnerXml { get; set; }
```

Gets or sets the markup representing just the children of this node.

Returns: The markup of the children of this node.

Exceptions:

- `XmlException`: The XML specified when setting this property is not well-formed.

#### Remarks
Setting this property replaces the children of the node with the parsed contents of the given string. The parsing is done in the current namespace context.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example compares the `InnerText` and `InnerXml` properties.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/InnerText/source.cs._

## XmlElement.IsEmpty property

```csharp
public bool IsEmpty { get; set; }
```

Gets or sets the tag format of the element.

Returns: `true` if the element is to be serialized in the short tag format "<item/>"; `false` for the long format "<item></item>".

When setting this property, if set to `true`, the children of the element are removed and the element is serialized in the short tag format. If set to `false`, the value of the property is changed (regardless of whether or not the element has content); if the element is empty, it is serialized in the long format.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Remarks
This property is a Microsoft extension of the Document Object Model (DOM).

#### Examples
The following example adds content to an empty element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/IsEmpty/source.cs._

## XmlElement.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the current node.

Returns: The name of the current node with the prefix removed. For example, `LocalName` is book for the element <bk:book>.

#### Remarks
If the node does not have a prefix, `LocalName` is the same as `Name`.

#### Examples
The following example displays information on the ISBN element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/LocalName/source.cs._

## XmlElement.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: The qualified name of the node. For `XmlElement` nodes, this is the tag name of the element.

#### Examples
The following example displays information on the ISBN element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/Name/source.cs._

## XmlElement.NamespaceURI property

```csharp
public override string NamespaceURI { get; }
```

Gets the namespace URI of this node.

Returns: The namespace URI of this node. If there is no namespace URI, this property returns String.Empty.

#### Remarks
This is the namespace URI specified at creation time. For example, `NamespaceURI` is urn:samples for the element \<bk:book xmlns:bk= "urn:samples">

#### Examples
The following example displays information on the ISBN element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/LocalName/source.cs._

## XmlElement.NextSibling property

```csharp
public override System.Xml.XmlNode? NextSibling { get; }
```

Gets the `XmlNode` immediately following this element.

Returns: The `XmlNode` immediately following this element.

To be added.

## XmlElement.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: The node type. For `XmlElement` nodes, this value is XmlNodeType.Element.

To be added.

## XmlElement.OwnerDocument property

```csharp
public override System.Xml.XmlDocument OwnerDocument { get; }
```

Gets the `XmlDocument` to which this node belongs.

Returns: The `XmlDocument` to which this element belongs.

#### Remarks
When adding nodes to the current node, use the `XmlDocument` returned by the `OwnerDocument` property to create the node.

#### Examples
The following example inserts a new element into an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/OwnerDocument/source.cs._

## XmlElement.ParentNode property

```csharp
public override System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent of this node (for nodes that can have parents).

Returns: The `XmlNode` that is the parent of the current node. If a node has just been created and not yet added to the tree, or if it has been removed from the tree, the parent is `null`. For all other nodes, the value returned depends on the `XmlNode.NodeType` of the node. The following table describes the possible return values for the `ParentNode` property.

To be added.

## XmlElement.Prefix property

```csharp
public override string Prefix { get; set; }
```

Gets or sets the namespace prefix of this node.

Returns: The namespace prefix of this node. If there is no prefix, this property returns String.Empty.

Exceptions:

- `ArgumentException`: This node is read-only.
- `XmlException`: The specified prefix contains an invalid character.

The specified prefix is malformed.

The namespaceURI of this node is `null`.

The specified prefix is "xml" and the namespaceURI of this node is different from http://www.w3.org/XML/1998/namespace.

#### Remarks
Setting this property changes the `Name` property, which holds the qualified name for an `XmlElement`. However, changing the prefix does not change the namespace URI of the element.

#### Examples
The following example displays information on the ISBN element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/LocalName/source.cs._

## XmlElement.SchemaInfo property

```csharp
public override System.Xml.Schema.IXmlSchemaInfo SchemaInfo { get; }
```

Gets the post schema validation infoset that has been assigned to this node as a result of schema validation.

Returns: An `IXmlSchemaInfo` object containing the post schema validation infoset of this node.

#### Remarks
The `SchemaInfo` property is set when this node is validated.

## XmlElement.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself (and its attributes if the node is an `XmlElement`).

Returns: The cloned node.

#### Remarks
This method serves as a copy constructor for nodes. The duplicate node has no parent (`ParentNode` returns `null`).

#### Examples
The following example creates a new element, clones it, and then adds both elements into an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/CloneNode/source.cs._

## XmlElement.GetAttribute(String) method

```csharp
public virtual string GetAttribute (string name);
```

Returns the value for the attribute with the specified name.

Parameters:

- `name`: The name of the attribute to retrieve. This is a qualified name. It is matched against the `Name` property of the matching node.

Returns: The value of the specified attribute. An empty string is returned if a matching attribute is not found or if the attribute does not have a specified or default value.

#### Examples
The following example checks to see if the element has the specified attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/GetAttribute/source.cs._

## XmlElement.GetAttribute(String, String) method

```csharp
public virtual string GetAttribute (string localName, string? namespaceURI);
```

Returns the value for the attribute with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the attribute to retrieve.
- `namespaceURI`: The namespace URI of the attribute to retrieve.

Returns: The value of the specified attribute. An empty string is returned if a matching attribute is not found or if the attribute does not have a specified or default value.

To be added.

## XmlElement.GetAttributeNode(String) method

```csharp
public virtual System.Xml.XmlAttribute? GetAttributeNode (string name);
```

Returns the `XmlAttribute` with the specified name.

Parameters:

- `name`: The name of the attribute to retrieve. This is a qualified name. It is matched against the `Name` property of the matching node.

Returns: The specified `XmlAttribute` or `null` if a matching attribute was not found.

#### Examples
The following example checks to see if the element has the specified attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/GetAttributeNode/source.cs._

## XmlElement.GetAttributeNode(String, String) method

```csharp
public virtual System.Xml.XmlAttribute? GetAttributeNode (string localName, string? namespaceURI);
```

Returns the `XmlAttribute` with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The specified `XmlAttribute` or `null` if a matching attribute was not found.

To be added.

## XmlElement.GetElementsByTagName(String) method

```csharp
public virtual System.Xml.XmlNodeList GetElementsByTagName (string name);
```

Returns an `XmlNodeList` containing a list of all descendant elements that match the specified `XmlElement.Name`.

Parameters:

- `name`: The name tag to match. This is a qualified name. It is matched against the `Name` property of the matching node. The asterisk (*) is a special value that matches all tags.

Returns: An `XmlNodeList` containing a list of all matching nodes. The list is empty if there are no matching nodes.

#### Remarks
The nodes are placed in the order in which they would be encountered in a preorder traversal of the `XmlElement` tree.

> **Note:**
> It is recommended that you use the `XmlNode.SelectNodes` or `XmlNode.SelectSingleNode` method instead of the `XmlElement.GetElementsByTagName` method.

#### Examples
The following example gets and displays all the book titles.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/GetElementsByTagName/source.cs._

The example uses the file, `2books.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlElement.GetElementsByTagName Example/XML/source.xml._
## XmlElement.GetElementsByTagName(String, String) method

```csharp
public virtual System.Xml.XmlNodeList GetElementsByTagName (string localName, string namespaceURI);
```

Returns an `XmlNodeList` containing a list of all descendant elements that match the specified `XmlElement.LocalName` and `XmlElement.NamespaceURI`.

Parameters:

- `localName`: The local name to match. The asterisk (*) is a special value that matches all tags.
- `namespaceURI`: The namespace URI to match.

Returns: An `XmlNodeList` containing a list of all matching nodes. The list is empty if there are no matching nodes.

#### Remarks
The nodes are placed in the order in which they would be encountered in a preorder traversal of the `XmlElement` tree.

> **Note:**
> It is recommended that you use the `XmlNode.SelectNodes` or `XmlNode.SelectSingleNode` method instead of the `XmlElement.GetElementsByTagName` method.

## XmlElement.HasAttribute(String) method

```csharp
public virtual bool HasAttribute (string name);
```

Determines whether the current node has an attribute with the specified name.

Parameters:

- `name`: The name of the attribute to find. This is a qualified name. It is matched against the `Name` property of the matching node.

Returns: `true` if the current node has the specified attribute; otherwise, `false`.

#### Examples
The following example checks to see if the element has the specified attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/GetAttribute/source.cs._
