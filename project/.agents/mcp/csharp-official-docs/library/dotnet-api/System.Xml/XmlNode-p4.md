---
title: "XmlNode class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNode class (part 4 of 4)

## XmlNode.SelectSingleNode(String) method

```csharp
public System.Xml.XmlNode? SelectSingleNode (string xpath);
```

Selects the first `XmlNode` that matches the XPath expression.

Parameters:

- `xpath`: The XPath expression.

Returns: The first `XmlNode` that matches the XPath query or `null` if no matching node is found.

Exceptions:

- `XPathException`: The XPath expression contains a prefix.

#### Remarks
If the XPath expression requires namespace resolution, you must use the `SelectSingleNode` overload that takes an `XmlNamespaceManager` as its argument. The `XmlNamespaceManager` is used to resolve namespaces.

> **Note:**
> If the XPath expression does not include a prefix, it is assumed that the namespace URI is the empty namespace. If your XML includes a default namespace, you must still use the `XmlNamespaceManager` and add a prefix and namespace URI to it; otherwise, you will not get a selected node. For more information, see Select Nodes Using XPath Navigation.

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

```vb
book = root.SelectSingleNode("descendant::book[title=""'Emma'""]")
```

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example changes the price of the first Jane Austen book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/SelectSingleNode/source.cs._

The example uses the file, `booksort.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNode.SelectSingleNode Example/XML/source.xml._
## XmlNode.SelectSingleNode(String, XmlNamespaceManager) method

```csharp
public System.Xml.XmlNode? SelectSingleNode (string xpath, System.Xml.XmlNamespaceManager nsmgr);
```

Selects the first `XmlNode` that matches the XPath expression. Any prefixes found in the XPath expression are resolved using the supplied `XmlNamespaceManager`.

Parameters:

- `xpath`: The XPath expression.
- `nsmgr`: An `XmlNamespaceManager` to use for resolving namespaces for prefixes in the XPath expression.

Returns: The first `XmlNode` that matches the XPath query or `null` if no matching node is found.

Exceptions:

- `XPathException`: The XPath expression contains a prefix that's not defined in the `XmlNamespaceManager`.

#### Remarks
XPath expressions can include namespaces. Namespace resolution is supported using the `XmlNamespaceManager`. If the XPath expression includes a prefix, the prefix and namespace URI pair must be added to the `XmlNamespaceManager`.

> **Note:**
> If the XPath expression does not include a prefix, it is assumed that the namespace URI is the empty namespace. If your XML includes a default namespace, you must still add a prefix and namespace URI to the `XmlNamespaceManager`; otherwise, you will not get a node selected. For more information, see Select Nodes Using XPath Navigation.

For example, if you had the following XML:

```xml
<bookstore xmlns="http://www.lucernepublishing.com">
 <book>
   <title>Pride And Prejudice</title>
 </book>
</bookstore>
```

The following C# code selects the first book node:

```csharp
XmlNamespaceManager nsmgr = new XmlNamespaceManager(doc.NameTable);
nsmgr.AddNamespace("ab", "http://www.lucernepublishing.com");
XmlNode book = doc.SelectSingleNode("//ab:book", nsmgr);
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
book = root.SelectSingleNode("descendant::ab:book[ab:title=""'Emma'""]", nsmgr)
```

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example selects the book with the matching ISBN value.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/SelectSingleNode/selectsingnode.cs._

The example uses the file, `booksort.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNode.SelectNodes Example/XML/source.xml._
## XmlNode.Supports(String, String) method

```csharp
public virtual bool Supports (string feature, string version);
```

Tests if the DOM implementation implements a specific feature.

Parameters:

- `feature`: The package name of the feature to test. This name is not case-sensitive.
- `version`: The version number of the package name to test. If the version is not specified (null), supporting any version of the feature causes the method to return true.

Returns: `true` if the feature is implemented in the specified version; otherwise, `false`. The following table describes the combinations that return `true`.

-  XML

:  1.0

-  XML

:  2.0

To be added.

## XmlNode.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

For a description of this member, see `XmlNode.GetEnumerator`.

Returns: An enumerator for the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlNode` instance is cast to an `IEnumerable` interface.

## XmlNode.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

For a description of this member, see `XmlNode.Clone`.

Returns: A copy of the node from which it is called.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlNode` instance is cast to an `ICloneable` interface.

## XmlNode.WriteContentTo(XmlWriter) method

```csharp
public abstract void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the child nodes of the node to the specified `XmlWriter`, when overridden in a derived class.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is functionally equivalent to the `InnerXml` property.

#### Examples
The following example displays the contents of the root node to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/WriteContentTo/source.cs._

## XmlNode.WriteTo(XmlWriter) method

```csharp
public abstract void WriteTo (System.Xml.XmlWriter w);
```

Saves the current node to the specified `XmlWriter`, when overridden in a derived class.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is functionally equivalent to the `OuterXml` property.

#### Examples
The following example displays the root node to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNode/WriteTo/source.cs._
