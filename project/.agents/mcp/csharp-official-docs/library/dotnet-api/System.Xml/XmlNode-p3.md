---
title: "XmlNode class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNode class (part 3 of 4)

## XmlNode.InsertAfter(XmlNode, XmlNode) method

```csharp
public virtual System.Xml.XmlNode? InsertAfter (System.Xml.XmlNode newChild, System.Xml.XmlNode? refChild);
```

Inserts the specified node immediately after the specified reference node.

Parameters:

- `newChild`: The node to insert.
- `refChild`: The reference node. `newChild` is placed after `refChild`.

Returns: The node being inserted.

Exceptions:

- `InvalidOperationException`: This node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

The `refChild` is not a child of this node.

This node is read-only.

#### Remarks
If `refChild` is `null`, insert `newChild` at the beginning of the list of child nodes. All the contents of the `newChild` are inserted, in the same order, after `refChild`. If the `newChild` is already in the tree, it is removed from its original position and added to its target position. For more information about inserting nodes, see Inserting Nodes into an XML Document.

If the node being inserted was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be inserted into the current document.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new node to the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/InsertAfter/source.cs._

## XmlNode.InsertBefore(XmlNode, XmlNode) method

```csharp
public virtual System.Xml.XmlNode? InsertBefore (System.Xml.XmlNode newChild, System.Xml.XmlNode? refChild);
```

Inserts the specified node immediately before the specified reference node.

Parameters:

- `newChild`: The node to insert.
- `refChild`: The reference node. `newChild` is placed before this node.

Returns: The node being inserted.

Exceptions:

- `InvalidOperationException`: The current node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

The `refChild` is not a child of this node.

This node is read-only.

#### Remarks
If `refChild` is `null`, insert `newChild` at the end of the list of child nodes. All the contents of the `newChild` are inserted, in the same order, before `refChild`. If the `newChild` is already in the tree, it is removed from its original position and added to its target position. For more information about inserting nodes, see Inserting Nodes into an XML Document.

If the node being inserted was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be inserted into the current document.

#### Examples
The following example adds a new node to the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/InsertBefore/source.cs._

## XmlNode.Normalize() method

```csharp
public virtual void Normalize ();
```

Puts all XmlText nodes in the full depth of the sub-tree underneath this XmlNode into a "normal" form where only markup (that is, tags, comments, processing instructions, CDATA sections, and entity references) separates XmlText nodes, that is, there are no adjacent XmlText nodes.

#### Remarks
This method can be used to ensure that the DOM view of a document is the same as if it were saved and re-loaded, and is useful when operations (such as XPointer lookups) that depend on a particular document tree structure are to be used.

## XmlNode.PrependChild(XmlNode) method

```csharp
public virtual System.Xml.XmlNode? PrependChild (System.Xml.XmlNode newChild);
```

Adds the specified node to the beginning of the list of child nodes for this node.

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

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new node to the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/PrependChild/source.cs._

## XmlNode.RemoveAll() method

```csharp
public virtual void RemoveAll ();
```

Removes all the child nodes and/or attributes of the current node.

#### Remarks
If a removed attribute is known to have a default value, an attribute immediately appears containing the default value and, if applicable, the corresponding namespace URI, local name, and prefix.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example removes all child and attribute nodes from the root node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/RemoveAll/source.cs._

## XmlNode.RemoveChild(XmlNode) method

```csharp
public virtual System.Xml.XmlNode RemoveChild (System.Xml.XmlNode oldChild);
```

Removes specified child node.

Parameters:

- `oldChild`: The node being removed.

Returns: The node removed.

Exceptions:

- `ArgumentException`: The `oldChild` is not a child of this node. Or this node is read-only.

#### Examples
The following example removes a node from the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/RemoveChild/source.cs._

## XmlNode.ReplaceChild(XmlNode, XmlNode) method

```csharp
public virtual System.Xml.XmlNode ReplaceChild (System.Xml.XmlNode newChild, System.Xml.XmlNode oldChild);
```

Replaces the child node `oldChild` with `newChild` node.

Parameters:

- `newChild`: The new node to put in the child list.
- `oldChild`: The node being replaced in the list.

Returns: The node replaced.

Exceptions:

- `InvalidOperationException`: This node is of a type that does not allow child nodes of the type of the `newChild` node.

The `newChild` is an ancestor of this node.
- `ArgumentException`: The `newChild` was created from a different document than the one that created this node.

This node is read-only.

The `oldChild` is not a child of this node.

#### Remarks
If the `newChild` is already in the tree, it is first removed.

If the `newChild` was created from another document, you can use `XmlDocument.ImportNode` to import the node to the current document. The imported node can then be passed to the `ReplaceChild` method.

#### Examples
The following example replaces the title element in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/ReplaceChild/source.cs._

## XmlNode.SelectNodes(String) method

```csharp
public System.Xml.XmlNodeList? SelectNodes (string xpath);
```

Selects a list of nodes matching the XPath expression.

Parameters:

- `xpath`: The XPath expression.

Returns: An `XmlNodeList` containing a collection of nodes matching the XPath query.

Exceptions:

- `XPathException`: The XPath expression contains a prefix.

#### Remarks
If the XPath expression requires namespace resolution, you must use the `SelectNodes` overload that takes an `XmlNamespaceManager` as its argument. The `XmlNamespaceManager` is used to resolve namespaces.

> **Note:**
> If the XPath expression does not include a prefix, it is assumed that the namespace URI is the empty namespace. If your XML includes a default namespace, you must still use the `XmlNamespaceManager` and add a prefix and namespace URI to it; otherwise, you will not get any nodes selected. For more information, see Select Nodes Using XPath Navigation.

> **Note:**
> A common issue when formulating XPath expressions is how to include a single quote (') or double quote (") in the expression. If you have to search for a value that includes a single quote, you must enclose the string in double quotes. If you need to search for a value that includes a double quote, you must enclose the string in single quotes.

For example, suppose you have the following XML:

```xml
<bookstore>
  <book>
    <title>'Emma'</title>
  </book>
</bookstore>
```

The following Visual Basic code selects an element that contains single quotes:

```csharp
nodeList = root.SelectNodes("//book[contains(title,""'Emma'"")]")
```

This method is a Microsoft extension to the Document Object Model (DOM).

The `XmlNodeList` object returned by this method will be valid while the underlying document remains unchanged. If the underlying document changes, unexpected results may be returned (no exception will be thrown).

#### Examples
The following example selects all books where the author's last name is Austen, and then changes the price of those books.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Overview/source6.cs._

This example uses the following XML:

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNode.SelectNodes Example/XML/source.xml._
## XmlNode.SelectNodes(String, XmlNamespaceManager) method

```csharp
public System.Xml.XmlNodeList? SelectNodes (string xpath, System.Xml.XmlNamespaceManager nsmgr);
```

Selects a list of nodes matching the XPath expression. Any prefixes found in the XPath expression are resolved using the supplied `XmlNamespaceManager`.

Parameters:

- `xpath`: The XPath expression.
- `nsmgr`: An `XmlNamespaceManager` to use for resolving namespaces for prefixes in the XPath expression.

Returns: An `XmlNodeList` containing a collection of nodes matching the XPath query.

Exceptions:

- `XPathException`: The XPath expression contains a prefix that's not defined in the `XmlNamespaceManager`.

#### Remarks
XPath expressions can include namespaces. Namespace resolution is supported using the `XmlNamespaceManager`. If the XPath expression includes a prefix, the prefix and namespace URI pair must be added to the `XmlNamespaceManager`.

> **Note:**
> If the XPath expression does not include a prefix, it is assumed that the namespace URI is the empty namespace. If your XML includes a default namespace, you must still add a prefix and namespace URI to the `XmlNamespaceManager`; otherwise, you will not get any nodes selected. For more information, see Select Nodes Using XPath Navigation.

For example, if you had the following XML:

```xml
<bookstore xmlns="http://www.lucernepublishing.com">
 <book>
   <title>Pride And Prejudice</title>
 </book>
</bookstore>
```

The following C# code selects all book nodes:

```csharp
XmlNamespaceManager nsmgr = new XmlNamespaceManager(doc.NameTable);
nsmgr.AddNamespace("ab", "http://www.lucernepublishing.com");
XmlNodeList nodelist = doc.SelectNodes("//ab:book", nsmgr);
```

> **Note:**
> A common issue when formulating XPath expressions is how to include a single quote (') or double quote (") in the expression. If you have to search for a value that includes a single quote, you must enclose the string in double quotes. If you need to search for a value that includes a double quote, you must enclose the string in single quotes.

For example, suppose you have the following XML:

```xml
<bookstore xmlns="http://www.lucernepublishing.com">
  <book>
    <title>'Emma'</title>
  </book>
</bookstore>
```

The following Visual Basic code selects an element that contains single quotes:

```vb
Dim nsmgr As XmlNamespaceManager = New XmlNamespaceManager(doc.NameTable)
nsmgr.AddNamespace("ab", "http://www.lucernepublishing.com")
nodeList = root.SelectNodes("//ab:book[contains(ab:title,""'Emma'"")]", nsmgr)
```

This method is a Microsoft extension to the Document Object Model (DOM).

The `XmlNodeList` object returned by this method will be valid while the underlying document remains unchanged. If the underlying document changes, unexpected results may be returned (no exception will be thrown).

#### Examples
The following example displays the values of each of the ISBN attributes. This example uses an `XmlElement` object, which inherits from the `XmlNode` class.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/SelectNodes/selectnodes1.cs._

The example uses the file, `booksort.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNode.SelectNodes Example/XML/source.xml._
