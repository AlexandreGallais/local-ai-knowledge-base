---
title: "XmlAttribute class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttribute class

Namespace: `System.Xml`

```csharp
public class XmlAttribute : System.Xml.XmlNode
```

Represents an attribute. Valid and default values for the attribute are defined in a document type definition (DTD) or schema.

#### Remarks
Attributes can be associated with an element. Use the `OwnerElement` property to get the `XmlElement` to which the attribute belongs.

The `XmlElement` class has several methods which allow you to access attribute nodes (`XmlElement.GetAttribute`, `XmlElement.SetAttribute`, `XmlElement.RemoveAttribute`, and so on). Additionally, you can call the `Attributes` property, which returns an `XmlAttributeCollection` enabling you to access attributes by name or index from the collection.

## XmlAttribute.XmlAttribute(String, String, String, XmlDocument) constructor

```csharp
protected internal XmlAttribute (string? prefix, string localName, string? namespaceURI, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlAttribute` class.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace uniform resource identifier (URI).
- `doc`: The parent XML document.

#### Remarks
Do not instantiate an `XmlAttribute` directly; instead, use methods such as `XmlDocument.CreateAttribute`.

## XmlAttribute.BaseURI property

```csharp
public override string BaseURI { get; }
```

Gets the base Uniform Resource Identifier (URI) of the node.

Returns: The location from which the node was loaded or String.Empty if the node has no base URI. Attribute nodes have the same base URI as their owner element. If an attribute node does not have an owner element, `BaseURI` returns String.Empty.

#### Remarks
A networked XML document is comprised of chunks of data aggregated using various World Wide Web Consortium (W3C) standard inclusion mechanisms and therefore contains nodes that come from different places. The `BaseURI` tells you where these nodes came from.

For additional information on `BaseURI` and how it behaves with other node types, see `BaseURI`.

This property is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example displays information on the attribute node, including its base URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/BaseURI/source.cs._

The sample uses the file, `baseuri.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlAttribute.BaseURI Example/XML/source.xml._
## XmlAttribute.InnerText property

```csharp
public override string InnerText { set; }
```

Sets the concatenated values of the node and all its children.

Returns: The concatenated values of the node and all its children. For attribute nodes, this property has the same functionality as the `XmlAttribute.Value` property.

#### Remarks
Setting this property replaces all the children with the parsed contents of the given string.

This property is a Microsoft extension to the Document Object Model (DOM).

## XmlAttribute.InnerXml property

```csharp
public override string InnerXml { set; }
```

Sets the value of the attribute.

Returns: The attribute value.

Exceptions:

- `XmlException`: The XML specified when setting this property is not well-formed.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM).

## XmlAttribute.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: The name of the attribute node with the prefix removed. In the following example <book bk:genre= 'novel'>, the `LocalName` of the attribute is `genre`.

#### Remarks
If the node does not have a prefix, `LocalName` is the same as `Name`.

#### Examples
The following example displays information on each of the nodes in the attribute collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/LocalName/source.cs._

## XmlAttribute.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: The qualified name of the attribute node.

#### Examples
The following example displays information on each of the nodes in the attribute collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/Name/source.cs._

## XmlAttribute.NamespaceURI property

```csharp
public override string NamespaceURI { get; }
```

Gets the namespace URI of this node.

Returns: The namespace URI of this node. If the attribute is not explicitly given a namespace, this property returns String.Empty.

#### Remarks
An attribute does not inherit its namespace from the element it is attached to. If an attribute is not explicitly given a namespace, the namespace URI is considered to be String.Empty.

#### Examples
The following example displays information on each of the nodes in the attribute collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/LocalName/source.cs._

## XmlAttribute.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: The node type for `XmlAttribute` nodes is XmlNodeType.Attribute.

To be added.

## XmlAttribute.OwnerDocument property

```csharp
public override System.Xml.XmlDocument OwnerDocument { get; }
```

Gets the `XmlDocument` to which this node belongs.

Returns: An XML document to which this node belongs.

#### Examples
The following example creates an attribute and displays its `OwnerDocument`.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/OwnerDocument/source.cs._

## XmlAttribute.OwnerElement property

```csharp
public virtual System.Xml.XmlElement? OwnerElement { get; }
```

Gets the `XmlElement` to which the attribute belongs.

Returns: The `XmlElement` that the attribute belongs to or `null` if this attribute is not part of an `XmlElement`.

#### Examples
The following example creates an attribute and displays the `OwnerElement` of the attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/OwnerElement/source.cs._

## XmlAttribute.ParentNode property

```csharp
public override System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent of this node. For `XmlAttribute` nodes, this property always returns `null`.

Returns: For `XmlAttribute` nodes, this property always returns `null`.

#### Remarks
Use the `OwnerElement` property to get the `XmlElement` to which the attribute belongs.

## XmlAttribute.Prefix property

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

The specified prefix is "xml", and the namespaceURI of this node is different from "http://www.w3.org/XML/1998/namespace".

This node is an attribute, the specified prefix is "xmlns", and the namespaceURI of this node is different from "http://www.w3.org/2000/xmlns/".

This node is an attribute, and the qualifiedName of this node is "xmlns" [Namespaces].

#### Remarks
Because changing the prefix of an attribute does not change its namespace URI, changing the prefix of an attribute that is known to have a default value does not create a new attribute with the default value and the original prefix.

#### Examples
The following example displays information on each of the nodes in the attribute collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/LocalName/source.cs._

## XmlAttribute.SchemaInfo property

```csharp
public override System.Xml.Schema.IXmlSchemaInfo SchemaInfo { get; }
```

Gets the post-schema-validation-infoset that has been assigned to this node as a result of schema validation.

Returns: An `IXmlSchemaInfo` containing the post-schema-validation-infoset of this node.

#### Remarks
The `SchemaInfo` property is set when this node is validated.

## XmlAttribute.Specified property

```csharp
public virtual bool Specified { get; }
```

Gets a value indicating whether the attribute value was explicitly set.

Returns: `true` if this attribute was explicitly given a value in the original instance document; otherwise, `false`. A value of `false` indicates that the value of the attribute came from the DTD.

#### Remarks
The implementation is in charge of this property, not the user. If the user changes the value of the attribute (even if it ends up having the same value as the default/fixed value), then the specified flag is automatically flipped to `true`. To re-specify the attribute as the default/fixed value from the DTD, the user must delete the attribute. The implementation then makes a new attribute available with specified set to `false` and the default/fixed value (if one exists).

In summary:

1.  If the attribute has an assigned value in the document, `Specified` is `true`, and the value is the assigned value.

2.  If the attribute has no assigned value in the document and has a default/fixed value in the DTD, `Specified` is `false`, and the value is the default/fixed value in the DTD.

3.  Otherwise, the attribute does not appear in the structure model of the document.

## XmlAttribute.Value property

```csharp
public override string Value { get; set; }
```

Gets or sets the value of the node.

Returns: The value returned depends on the `XmlNode.NodeType` of the node. For `XmlAttribute` nodes, this property is the value of attribute.

Exceptions:

- `ArgumentException`: The node is read-only and a set operation is called.

#### Examples
The following example displays information on each of the nodes in the attribute collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/LocalName/source.cs._

## XmlAttribute.AppendChild(XmlNode) method

```csharp
public override System.Xml.XmlNode? AppendChild (System.Xml.XmlNode newChild);
```

Adds the specified node to the end of the list of child nodes, of this node.

Parameters:

- `newChild`: The `XmlNode` to add.

Returns: The `XmlNode` added.

Exceptions:

- `InvalidOperationException`: This node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

This node is read-only.

#### Remarks
If the `newChild` is already in the tree, it is first removed.

If the node being inserted was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be inserted into the current document.

#### Examples
For an example of the `XmlAttribute.AppendChild` method, see the `XmlNode.AppendChild` method.

## XmlAttribute.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: The duplicate node.

#### Remarks
This method serves as a copy constructor for nodes. The cloned node has no parent (`ParentNode` returns `null`).

Cloning an unspecified attribute returns a specified attribute (`Specified` returns `true`).

#### Examples
The following example uses `CloneNode` to add an attribute to two different element nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttribute/CloneNode/source.cs._

The example uses the file, `2elems.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlAttribute.CloneNode Example/XML/source.xml._
## XmlAttribute.InsertAfter(XmlNode, XmlNode) method

```csharp
public override System.Xml.XmlNode? InsertAfter (System.Xml.XmlNode newChild, System.Xml.XmlNode? refChild);
```

Inserts the specified node immediately after the specified reference node.

Parameters:

- `newChild`: The `XmlNode` to insert.
- `refChild`: The `XmlNode` that is the reference node. The `newChild` is placed after the `refChild`.

Returns: The `XmlNode` inserted.

Exceptions:

- `InvalidOperationException`: This node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

The `refChild` is not a child of this node.

This node is read-only.

#### Remarks
If `refChild` is `null`, insert `newChild` at the beginning of the list of child nodes. If `newChild` is an `XmlDocumentFragment` object, its child nodes are inserted, in the same order, after `refChild`. If the `newChild` is already in the tree, it is first removed.

If the node being inserted was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be inserted into the current document.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
For an example of the `XmlAttribute.InsertAfter` method see the `XmlNode.InsertAfter` method.

## XmlAttribute.InsertBefore(XmlNode, XmlNode) method

```csharp
public override System.Xml.XmlNode? InsertBefore (System.Xml.XmlNode newChild, System.Xml.XmlNode? refChild);
```

Inserts the specified node immediately before the specified reference node.

Parameters:

- `newChild`: The `XmlNode` to insert.
- `refChild`: The `XmlNode` that is the reference node. The `newChild` is placed before this node.

Returns: The `XmlNode` inserted.

Exceptions:

- `InvalidOperationException`: The current node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

The `refChild` is not a child of this node.

This node is read-only.

#### Remarks
If `refChild` is `null`, insert `newChild` at the end of the list of child nodes. If `newChild` is an `XmlDocumentFragment` object, its child nodes are inserted, in the same order, before `refChild`. If the `newChild` is already in the tree, it is first removed.

If the node being inserted was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be inserted into the current document.

#### Examples
For an example of the `XmlAttribute.InsertBefore` method, see the `XmlNode.InsertBefore` method.
