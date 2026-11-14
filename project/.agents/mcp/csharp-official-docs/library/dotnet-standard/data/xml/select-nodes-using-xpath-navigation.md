---
title: "Select Nodes Using XPath Navigation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/select-nodes-using-xpath-navigation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Select Nodes Using XPath Navigation

The XML Document Object Model (DOM) contains methods that allow you to use XML Path Language (XPath) navigation to query information in the DOM. You can use XPath to find a single, specific node or to find all nodes that match some criteria.

## XPath Select Methods

 The DOM classes provide two methods for XPath selection: the `System.Xml.XmlNode.SelectSingleNode*` method and the `System.Xml.XmlNode.SelectNodes*` method. The `System.Xml.XmlNode.SelectSingleNode*` method returns the first node that matches the selection criteria. The `System.Xml.XmlNode.SelectNodes*` method returns an `System.Xml.XmlNodeList` that contains the matching nodes.

 The following example uses the `System.Xml.XmlNode.SelectSingleNode*` method to select the first `book` node in which the author's last name meets the specified criteria. The bookstore.xml file (which is provided at the end of this topic) is used as the input file.

```vb
Dim doc As New XmlDocument()
doc.Load("bookstore.xml")
Dim root As XmlNode = doc.DocumentElement

' Add the namespace.
Dim nsmgr As New XmlNamespaceManager(doc.NameTable)
nsmgr.AddNamespace("bk", "urn:newbooks-schema")

' Select and display the first node in which the author's
' last name is Kingsolver.
Dim node As XmlNode = root.SelectSingleNode( _
     "descendant::bk:book[bk:author/bk:last-name='Kingsolver']", nsmgr)
Console.WriteLine(node.InnerXml)
```

```csharp
// Load the document and set the root element.
XmlDocument doc = new XmlDocument();
doc.Load("bookstore.xml");
XmlNode root = doc.DocumentElement;

// Add the namespace.
XmlNamespaceManager nsmgr = new XmlNamespaceManager(doc.NameTable);
nsmgr.AddNamespace("bk", "urn:newbooks-schema");

// Select and display the first node in which the author's
// last name is Kingsolver.
XmlNode node = root.SelectSingleNode(
    "descendant::bk:book[bk:author/bk:last-name='Kingsolver']", nsmgr);
Console.WriteLine(node.InnerXml);
```

 The next example uses the `System.Xml.XmlNode.SelectNodes*` method to select all the book nodes in which the price is greater than a specified amount. The price for each book in the selected list is then programmatically reduced by ten percent. Finally, the updated file is written to the console. The bookstore.xml file (which is provided at the end of this topic) is used as the input file.

```vb
' Load the document and set the root element.
Dim doc As New XmlDocument()
doc.Load("bookstore.xml")
Dim root As XmlNode = doc.DocumentElement

' Add the namespace.
Dim nsmgr As New XmlNamespaceManager(doc.NameTable)
nsmgr.AddNamespace("bk", "urn:newbooks-schema")

' Select all nodes where the book price is greater than 10.00.
Dim nodeList As XmlNodeList = root.SelectNodes( _
     "descendant::bk:book[bk:price>10.00]", nsmgr)
For Each book As XmlNode In nodeList
     Dim price As Double
     price = Math.Round(Convert.ToSingle( _
          book.LastChild.InnerText) * 0.9, 2)
     book.LastChild.InnerText = price.ToString()
Next

' Display the updated document.
doc.Save(Console.Out)
```

```csharp
// Load the document and set the root element.
XmlDocument doc = new XmlDocument();
doc.Load("bookstore.xml");
XmlNode root = doc.DocumentElement;

// Add the namespace.
XmlNamespaceManager nsmgr = new XmlNamespaceManager(doc.NameTable);
nsmgr.AddNamespace("bk", "urn:newbooks-schema");

// Select all nodes where the book price is greater than 10.00.
XmlNodeList nodeList = root.SelectNodes(
     "descendant::bk:book[bk:price>10.00]", nsmgr);
foreach (XmlNode book in nodeList)
{
     // Discount prices by 10%.
     double price;
     price = Math.Round(Convert.ToSingle(
          book.LastChild.InnerText) * 0.9, 2);
     book.LastChild.InnerText = price.ToString();
}

// Display the updated document.
doc.Save(Console.Out);
```

 The examples above start the XPath query at the document element. Setting the starting point for the XPath query sets the context node, which is the starting point for the XPath query. If you do not want to start at the document element, but want to start from the first child of the document element, you can code the select statement as follows:

```vb
doc.DocumentElement.FirstChild.SelectNodes(. . . )
```

```csharp
this doc.DocumentElement.FirstChild.SelectNodes(. . .);
```

 All `System.Xml.XmlNodeList` objects are synchronized with the underlying document. Therefore, if you iterate through the node list and modify the value of a node, that node is also updated in the document it came from. Notice in the previous example that when a node is modified in the selected `System.Xml.XmlNodeList` the underlying document is also modified.

> **Note:**
> When the underlying document is modified, it is advisable to rerun the select. If the node modified is one that could cause the node to be added to the node list when it was not previously, or would now cause it to be removed from the node list, there is no guarantee that the node list is now accurate.

## Namespaces in XPath Expressions

 XPath expressions can include namespaces. Namespace resolution is supported using the `System.Xml.XmlNamespaceManager`. If the XPath expression includes a prefix, the prefix and namespace URI pair must be added to the `System.Xml.XmlNamespaceManager`, and the `System.Xml.XmlNamespaceManager` is passed to the `System.Xml.XmlNode.SelectNodes(System.String,System.Xml.XmlNamespaceManager)` or `System.Xml.XmlNode.SelectSingleNode(System.String,System.Xml.XmlNamespaceManager)` method. Notice that the code examples above use the `System.Xml.XmlNamespaceManager` to resolve the namespace of the bookstore.xml document.

> **Note:**
> If the XPath expression does not include a prefix, it is assumed that the namespace Uniform Resource Identifier (URI) is the empty namespace. If your XML includes a default namespace, you must still add a prefix and namespace URI to the `System.Xml.XmlNamespaceManager`; otherwise, no nodes will be selected.

#### Input File

 The following is the bookstore.xml file that is used as the input file in the examples in this topic:

```xml
<?xml version='1.0'?>
<bookstore xmlns="urn:newbooks-schema">
  <book genre="novel" style="hardcover">
    <title>The Handmaid's Tale</title>
    <author>
      <first-name>Margaret</first-name>
      <last-name>Atwood</last-name>
    </author>
    <price>19.95</price>
  </book>
  <book genre="novel" style="other">
    <title>The Poisonwood Bible</title>
    <author>
      <first-name>Barbara</first-name>
      <last-name>Kingsolver</last-name>
    </author>
    <price>11.99</price>
  </book>
  <book genre="novel" style="paperback">
    <title>The Bean Trees</title>
    <author>
      <first-name>Barbara</first-name>
      <last-name>Kingsolver</last-name>
    </author>
    <price>5.99</price>
  </book>
</bookstore>
```

## See also

- XML Document Object Model (DOM)
