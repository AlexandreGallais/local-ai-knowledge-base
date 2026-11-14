---
title: "XmlNode class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNode class (part 2 of 4)

## XmlNode.ParentNode property

```csharp
public virtual System.Xml.XmlNode? ParentNode { get; }
```

Gets the parent of this node (for nodes that can have parents).

Returns: The `XmlNode` that is the parent of the current node. If a node has just been created and not yet added to the tree, or if it has been removed from the tree, the parent is `null`. For all other nodes, the value returned depends on the `XmlNode.NodeType` of the node. The following table describes the possible return values for the `ParentNode` property.

-  Attribute, Document, DocumentFragment, Entity, Notation

:  Returns `null`; these nodes do not have parents.

-  CDATA

:  Returns the element or entity reference containing the CDATA section.

-  Comment

:  Returns the element, entity reference, document type, or document containing the comment.

-  DocumentType

:  Returns the document node.

-  Element

:  Returns the parent node of the element. If the element is the root node in the tree, the parent is the document node.

-  EntityReference

:  Returns the element, attribute, or entity reference containing the entity reference.

-  ProcessingInstruction

:  Returns the document, element, document type, or entity reference containing the processing instruction.

-  Text

:  Returns the parent element, attribute, or entity reference containing the text node.

#### Remarks
For information about parent and child nodes, see the W3C DOM (Core) Level 1 specification

## XmlNode.Prefix property

```csharp
public virtual string Prefix { get; set; }
```

Gets or sets the namespace prefix of this node.

Returns: The namespace prefix of this node. For example, `Prefix` is bk for the element <bk:book>. If there is no prefix, this property returns String.Empty.

Exceptions:

- `ArgumentException`: This node is read-only.
- `XmlException`: The specified prefix contains an invalid character.

The specified prefix is malformed.

The specified prefix is "xml" and the namespaceURI of this node is different from "http://www.w3.org/XML/1998/namespace".

This node is an attribute and the specified prefix is "xmlns" and the namespaceURI of this node is different from "http://www.w3.org/2000/xmlns/ ".

This node is an attribute and the qualifiedName of this node is "xmlns".

#### Remarks
Setting this property, when permitted, changes the `Name` property, which holds the qualified name, on Element and Attribute nodes. Setting this property on node types that cannot have a prefix (such as Text, Comment, EntityReference, CDATA, ProcessingInstruction, Document, and DocumentFragment) has no effect. Changing the prefix of an attribute that is known to have a default value, does not make a new attribute with the default value and the original prefix appear, since the namespace URI and local name do not change.

## XmlNode.PreviousSibling property

```csharp
public virtual System.Xml.XmlNode? PreviousSibling { get; }
```

Gets the node immediately preceding this node.

Returns: The preceding `XmlNode`. If there is no preceding node, `null` is returned.

#### Examples
The following example displays all the books in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlLinkedNode/PreviousSibling/source.cs._

## XmlNode.PreviousText property

```csharp
public virtual System.Xml.XmlNode? PreviousText { get; }
```

Gets the text node that immediately precedes this node.

Returns: Returns `XmlNode`.

#### Remarks
This property has faster performance than the `PreviousSibling` property but you can use it only to get a node of type `Text`. To get any other type of node that precedes this node, use the `PreviousSibling` property.

## XmlNode.SchemaInfo property

```csharp
public virtual System.Xml.Schema.IXmlSchemaInfo SchemaInfo { get; }
```

Gets the post schema validation infoset that has been assigned to this node as a result of schema validation.

Returns: An `IXmlSchemaInfo` object containing the post schema validation infoset of this node.

#### Remarks
The `SchemaInfo` property is set when this node is validated.

## XmlNode.Value property

```csharp
public virtual string? Value { get; set; }
```

Gets or sets the value of the node.

Returns: The value returned depends on the `XmlNode.NodeType` of the node:

-  Attribute

:  The value of the attribute.

-  CDATASection

:  The content of the CDATA Section.

-  Comment

:  The content of the comment.

-  Document

: `null`.

-  DocumentFragment

: `null`.

-  DocumentType

: `null`.

-  Element

: `null`. You can use the `XmlElement.InnerText` or `XmlElement.InnerXml` properties to access the value of the element node.

-  Entity

: `null`.

-  EntityReference

: `null`.

-  Notation

: `null`.

-  ProcessingInstruction

:  The entire content excluding the target.

-  Text

:  The content of the text node.

-  SignificantWhitespace

:  The white space characters. White space can consist of one or more space characters, carriage returns, line feeds, or tabs.

-  Whitespace

:  The white space characters. White space can consist of one or more space characters, carriage returns, line feeds, or tabs.

-  XmlDeclaration

:  The content of the declaration (that is, everything between <?xml and ?>).

Exceptions:

- `ArgumentException`: Setting the value of a node that is read-only.
- `InvalidOperationException`: Setting the value of a node that is not supposed to have a value (for example, an Element node).

#### Examples
The following example adds a new attribute to the XML document and sets the `Value` property of the new attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/Attributes/source.cs._

## XmlNode.AppendChild(XmlNode) method

```csharp
public virtual System.Xml.XmlNode? AppendChild (System.Xml.XmlNode newChild);
```

Adds the specified node to the end of the list of child nodes, of this node.

Parameters:

- `newChild`: The node to add. All the contents of the node to be added are moved into the specified location.

Returns: The node added.

Exceptions:

- `InvalidOperationException`: This node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

This node is read-only.

#### Remarks
If the `newChild` is already in the tree, it is removed from its original position and added to its target position. For more information about inserting nodes, see Inserting Nodes into an XML Document.

If the node being inserted was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be inserted into the current document.

#### Examples
The following example adds a new node to the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/AppendChild/source.cs._

**Output:**

```txt
Display the modified XML...
<?xml version="1.0" encoding="IBM437"?>
<book genre="novel" ISBN="1-861001-57-5">
  <title>Pride And Prejudice</title>
  <price>19.95</price>
```

## XmlNode.Clone() method

```csharp
public virtual System.Xml.XmlNode Clone ();
```

Creates a duplicate of this node.

Returns: The cloned node.

#### Remarks
Cloning an `XmlElement` copies all attributes and their values, including those generated by the XML processor to represent defaulted attributes. This method recursively clones the node and the subtree underneath it.

`Clone` is equivalent to calling `CloneNode(true)`.

The following table describes the specific behavior for each `XmlNodeType`.

|XmlNodeType|Clone|
|-----------------|-----------|
|Attribute|Clones the attribute node, including child nodes.|
|CData|Clones the CData node, including its data content.|
|Comment|Clones the comment node, including its text content.|
|Document|Clones the document node, including any child nodes.|
|DocumentFragment|Clones the document fragment node, including any child nodes.|
|DocumentType|Clones the document type node.|
|Element|Clones the element node, its attributes, and any child nodes.|
|Entity|Entity nodes cannot be cloned.|
|EntityReference|Clones the entity reference node. The replacement text is not included.|
|Notation|Notation nodes cannot be cloned.|
|ProcessingInstruction|Clones the processing instruction node, including its target and data.|
|SignificantWhitespace|Clones the significant white space node, including its data value.|
|Text|Clones the text node, including its data value.|
|Whitespace|Clones the white space node, including its data value.|
|XmlDeclaration|Clones the XmlDeclaration node, including its data value.|
|All other node types.|These node types cannot be cloned.|

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example clones the root node of the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/Clone/source.cs._

## XmlNode.CloneNode(Boolean) method

```csharp
public abstract System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of the node, when overridden in a derived class.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: The cloned node.

Exceptions:

- `InvalidOperationException`: Calling this method on a node type that cannot be cloned.

#### Remarks
This method serves as a copy constructor for nodes. The duplicate node has no parent (`ParentNode` returns `null`).

The following table describes the specific behavior for each `XmlNodeType`.

|XmlNodeType|CloneNode(true)|CloneNode(false)|
|-----------------|-----------------------|------------------------|
|Attribute|Clones the attribute node, including child nodes.|Clones the attribute node, including child nodes.|
|CData|Clones the CData node, including its data content.|Clones the CData node, including its data content.|
|Comment|Clones the comment node, including its text content.|Clones the comment node, including its text content.|
|Document|Clones the document node, including any child nodes.|Clones the document node.|
|DocumentFragment|Clones the document fragment node, including any child nodes.|Clones the document fragment node.|
|DocumentType|Clones the document type node.|Clones the document type node.|
|Element|Clones the element node, its attributes, and any child nodes.|Clones the element node and its attributes, including any default attributes.|
|Entity|Entity nodes cannot be cloned.|Entity nodes cannot be cloned.|
|EntityReference|Clones the entity reference node. The replacement text is not included.|Clones the entity reference node. The replacement text is not included.|
|Notation|Notation nodes cannot be cloned.|Notation nodes cannot be cloned.|
|ProcessingInstruction|Clones the processing instruction node, including its target and data.|Clones the processing instruction node, including its target and data.|
|SignificantWhitespace|Clones the significant white space node, including its data value.|Clones the significant white space node, including its data value.|
|Text|Clones the text node, including its data value.|Clones the text node, including its data value.|
|Whitespace|Clones the white space node, including its data value.|Clones the white space node, including its data value.|
|XmlDeclaration|Clones the XmlDeclaration node, including its data value.|Clones the XmlDeclaration node, including its data value.|
|All other node types.|These node types cannot be cloned.|These node types cannot be cloned.|

#### Examples
The following example shows the difference between a deep and shallow clone.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/CloneNode/source.cs._

## XmlNode.CreateNavigator() method

```csharp
public virtual System.Xml.XPath.XPathNavigator? CreateNavigator ();
```

Creates an `XPathNavigator` for navigating this object.

Returns: An `XPathNavigator` object used to navigate the node. The `XPathNavigator` is positioned on the node from which the method was called. It is not positioned on the root of the document.

#### Remarks
The `XPathNavigator` provides read-only, random access to data. Because it is optimized for XSLT transformations, it provides performance benefits when used as an input mechanism to the `XslTransform.Transform` method.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example loads and edits an XML document before performing an XSLT transform.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/CreateNavigator/trans_snip.cs._

## XmlNode.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Gets an enumerator that iterates through the child nodes in the current node.

Returns: An `IEnumerator` object that can be used to iterate through the child nodes in the current node.

#### Remarks
Provides support for the "for each" style iteration over the nodes in the `XmlNode`.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example displays all the books in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/GetEnumerator/source.cs._

The example uses the file, `books.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNode.GetEnumerator Example/XML/source.xml._
## XmlNode.GetNamespaceOfPrefix(String) method

```csharp
public virtual string GetNamespaceOfPrefix (string prefix);
```

Looks up the closest **xmlns** declaration for the given prefix that is in scope for the current node and returns the namespace URI in the declaration.

Parameters:

- `prefix`: The prefix whose namespace URI you want to find.

Returns: The namespace URI of the specified prefix.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new attribute to the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/Attributes/source.cs._

## XmlNode.GetPrefixOfNamespace(String) method

```csharp
public virtual string GetPrefixOfNamespace (string namespaceURI);
```

Looks up the closest **xmlns** declaration for the given namespace URI that is in scope for the current node and returns the prefix defined in that declaration.

Parameters:

- `namespaceURI`: The namespace URI whose prefix you want to find.

Returns: The prefix for the specified namespace URI.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new element to the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/GetPrefixOfNamespace/source.cs._
