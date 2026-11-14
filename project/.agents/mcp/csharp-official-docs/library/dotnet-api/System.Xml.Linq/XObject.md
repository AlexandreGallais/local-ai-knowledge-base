---
title: "XObject class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XObject class

Namespace: `System.Xml.Linq`

```csharp
public abstract class XObject : System.Xml.IXmlLineInfo
```

Represents a node or an attribute in an XML tree.

#### Remarks
This class is the abstract common base class for `XNode` and `XAttribute`. It provides some basic <example-value> that is common to both classes, such as annotations, and raising events when nodes have changed.

Note that annotations are not part of the XML infoset; they are not serialized or deserialized.

#### Thread safety

An `XObject` instance, including an instance of a derived type, is safe for concurrent read operations as long as no thread modifies it. If the instance is modified, you must synchronize all access to it.

## XObject.BaseUri property

```csharp
public string BaseUri { get; }
```

Gets the base URI for this `XObject`.

Returns: A `String` that contains the base URI for this `XObject`.

#### Remarks
Using LINQ to XML, you can deserialize XML in a number of fashions. You can parse it from a string, load it from a file, or read it from a `TextReader` or an `XmlReader`. In all of these cases, LINQ to XML uses one or another of the concrete subclasses of `XmlReader`.

Sometimes the `XmlReader` has the base URI, and sometimes it does not. For instance, when loading from a file, the `XmlReader` knows the base URI, but when reading from an `XmlReader` that was created because of calling the `XElement.Parse` method, there is no possibility of the `XmlReader` reporting a base URI; the XML was in a string.

If, when parsing or loading the XML, you specify `SetBaseUri`, LINQ to XML will request the base URI for each node as the `XmlReader` returns the node. If the reader has the base URI, LINQ to XML will save the information with the LINQ to XML node. This property returns that information. If the underlying `XmlReader` does not have the base URI, then this property will return an empty string.

Setting `SetBaseUri` when loading an XML tree will result in slower parsing.

When setting the base URI for an XML tree, LINQ to XML puts an annotation on the root of the tree. This property is a computed property, and navigates up the tree to find the base URI.

#### Examples
The following example loads the base URI and line information as it loads the file. It then prints the base URI and the line information.

This example uses the following XML document: Sample XML File: Typical Purchase Order (LINQ to XML).

```csharp
XElement po = XElement.Load("PurchaseOrder.xml",
    LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);
string[] splitUri = po.BaseUri.Split('/');
Console.WriteLine("BaseUri: {0}", splitUri[splitUri.Length - 1]);
Console.WriteLine();
Console.WriteLine("{0}{1}{2}",
    "Element Name".PadRight(20),
    "Line".PadRight(5),
    "Position");
Console.WriteLine("{0}{1}{2}",
    "------------".PadRight(20),
    "----".PadRight(5),
    "--------");
foreach (XElement e in po.DescendantsAndSelf())
    Console.WriteLine("{0}{1}{2}",
        ("".PadRight(e.Ancestors().Count() * 2) + e.Name).PadRight(20),
        ((IXmlLineInfo)e).LineNumber.ToString().PadRight(5),
        ((IXmlLineInfo)e).LinePosition);
```

```vb
Dim po As XElement = XElement.Load("PurchaseOrder.xml", LoadOptions.SetBaseUri Or LoadOptions.SetLineInfo)
Dim splitUri() As String = po.BaseUri.Split("/"c)
Console.WriteLine("BaseUri: {0}", splitUri(splitUri.Length - 1))
Console.WriteLine()
Console.WriteLine("{0}{1}{2}", _
    "Element Name".PadRight(20), _
    "Line".PadRight(5), _
    "Position")
Console.WriteLine("{0}{1}{2}", _
    "------------".PadRight(20), _
    "----".PadRight(5), _
    "--------")
For Each e As XElement In po.DescendantsAndSelf()
    Console.WriteLine("{0}{1}{2}", _
        ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString).PadRight(20), _
        DirectCast(e, IXmlLineInfo).LineNumber.ToString().PadRight(5), _
        DirectCast(e, IXmlLineInfo).LinePosition)
Next
```

This example produces the following output:

```
BaseUri: PurchaseOrder.xml

Element Name        Line Position
------------        ---- --------
PurchaseOrder       2    2
  Address           3    4
    Name            4    6
    Street          5    6
    City            6    6
    State           7    6
    Zip             8    6
    Country         9    6
  Address           11   4
    Name            12   6
    Street          13   6
    City            14   6
    State           15   6
    Zip             16   6
    Country         17   6
  DeliveryNotes     19   4
  Items             20   4
    Item            21   6
      ProductName   22   8
      Quantity      23   8
      USPrice       24   8
      Comment       25   8
    Item            27   6
      ProductName   28   8
      Quantity      29   8
      USPrice       30   8
      ShipDate      31   8
```

## XObject.Document property

```csharp
public System.Xml.Linq.XDocument? Document { get; }
```

Gets the `XDocument` for this `XObject`.

Returns: The `XDocument` for this `XObject`.

#### Examples
The following example creates a document with some complex content. It then uses this property to retrieve the document for the `Child` element.

```csharp
XDocument doc = new XDocument(
    new XComment("A comment in the document."),
    new XElement("Root",
        new XElement("Child", "content")
    )
);
XElement child = doc.Descendants("Child").First();
XDocument documentOfChild = child.Document;
Console.WriteLine(documentOfChild.FirstNode);
```

```vb
Dim doc As XDocument = _
        <?xml version="1.0"?>
        <!--A comment in the document.-->
        <Root>
            <Child>content</Child>
         </Root>
Dim child As XElement = doc.Descendants("Child").First()
Dim documentOfChild As XDocument = child.Document
Console.WriteLine(documentOfChild.FirstNode)
```

This example produces the following output:

```
<!--A comment in the document.-->
```

## XObject.NodeType property

```csharp
public abstract System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this `XObject`.

Returns: The node type for this `XObject`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example uses this method to retrieve the node type for a variety of nodes.

```csharp
// Note that XNode uses XmlNodeType, which is in the System.Xml namespace.
XDocument xmlTree = new XDocument(
    new XComment("a comment"),
    new XProcessingInstruction("xml-stylesheet", "type=\"text/xsl\" href=\"hello.xsl\""),
    new XElement("Root",
        new XAttribute("Att", "attContent"),
        new XElement("Child1",
            new XCData("CDATA content")
        ),
        new XElement("Child2",
            new XText("Text content")
        )
    )
);

foreach (XNode node in xmlTree.DescendantNodes())
{
    Console.WriteLine(node.NodeType);
    if (node.NodeType == XmlNodeType.Element)
    {
        foreach (XAttribute att in ((XElement)node).Attributes())
            Console.WriteLine(att.NodeType);
    }
}
```

```vb
' Note that XNode uses XmlNodeType, which is in the System.Xml  namespace.
Dim xmlTree As XDocument = _
    <?xml version="1.0"?>
    <!--a comment-->
    <?xml-stylesheet type="text/xsl" href="hello.xsl"?>
    <Root Att="attContent">
        <Child1>CDATA content]<![CDATA[]></Child1>
        <Child2>Text content</Child2>
     </Root>

For Each node As XNode In xmlTree.DescendantNodes
    Console.WriteLine(node.NodeType.ToString())
    If node.NodeType = XmlNodeType.Element Then
        For Each att In DirectCast(node, XElement).Attributes
            Console.WriteLine(att.NodeType.ToString())
        Next
    End If
Next
```

This example produces the following output:

```
Comment
ProcessingInstruction
Element
Attribute
Element
CDATA
Element
Text
```

## XObject.Parent property

```csharp
public System.Xml.Linq.XElement? Parent { get; }
```

Gets the parent `XElement` of this `XObject`.

Returns: The parent `XElement` of this `XObject`.

#### Remarks
If this `XObject` has no parent element, this property returns `null`.

> **Note:**
> This property returns the parent element, and as children nodes of an `XDocument` have no parent element, this property returns `null` for them.

#### Examples
The following example uses this method.

```csharp
XDocument doc = new XDocument(
    new XComment("A comment in the document."),
    new XElement("Root",
        new XElement("Child", "content")
    )
);
XElement child = doc.Descendants("Child").First();
XElement root = child.Parent;
Console.WriteLine(root.Name);
```

```vb
Dim doc As XDocument = _
    <?xml version="1.0"?>
    <!--A comment in the document.-->
    <Root>
        <Child>content</Child>
    </Root>
Dim child As XElement = doc.Descendants("Child").First()
Dim root As XElement = child.Parent
Console.WriteLine(root.Name)
```

This example produces the following output:

```
Root
```

## XObject.System.Xml.IXmlLineInfo.LineNumber property

```csharp
int System.Xml.IXmlLineInfo.LineNumber { get; }
```

Gets the line number that the underlying `XmlReader` reported for this `XObject`.

Returns: An `Int32` that contains the line number reported by the `XmlReader` for this `XObject`.

#### Remarks
This method is an explicit interface member implementation of a method in the `IXmlLineInfo` interface, so in order to call this method, it is necessary to cast to `IXmlLineInfo`.

#### Examples
This example loads a small XML tree from a file, setting the options to set base URI and retain line information. It then adds another element that does not have line information. It then prints the line information for each element in the tree.

```csharp
string markup = @"<Root>
    
    
    
</Root>";

File.WriteAllText("Test.xml", markup);

XElement po = XElement.Load("Test.xml",
    LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);

// add a node to the tree.
// the newly added node will not have line information.
po.Element("Child2").AddAfterSelf(new XElement("Child3"));

string[] splitUri = po.BaseUri.Split('/');
Console.WriteLine("BaseUri: {0}", splitUri[splitUri.Length - 1]);
Console.WriteLine();
Console.WriteLine("{0}{1}{2}",
    "Element Name".PadRight(20),
    "Line".PadRight(5),
    "Position");
Console.WriteLine("{0}{1}{2}",
    "------------".PadRight(20),
    "----".PadRight(5),
    "--------");
foreach (XElement e in po.DescendantsAndSelf())
    Console.WriteLine("{0}{1}{2}",
        ("".PadRight(e.Ancestors().Count() * 2) + e.Name).PadRight(20),
        ((IXmlLineInfo)e).HasLineInfo() ?
            ((IXmlLineInfo)e).LineNumber.ToString().PadRight(5) :
            "",
        ((IXmlLineInfo)e).HasLineInfo() ?
            ((IXmlLineInfo)e).LinePosition.ToString() :
            "No Line Information");
```

```vb
Dim markup As String = _
    "<Root>" & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "</Root>"

File.WriteAllText("Test.xml", markup)

Dim po As XElement = XElement.Load("Test.xml", LoadOptions.SetBaseUri Or LoadOptions.SetLineInfo)

' add a node to the tree.
' the newly added node will not have line information.
po.Element("Child2").AddAfterSelf(New XElement("Child3"))

Dim splitUri() As String = po.BaseUri.Split("/"c)
Console.WriteLine("BaseUri: {0}", splitUri(splitUri.Length - 1))
Console.WriteLine()
Console.WriteLine("{0}{1}{2}", _
    "Element Name".PadRight(20), _
    "Line".PadRight(5), _
    "Position")
Console.WriteLine("{0}{1}{2}", _
    "------------".PadRight(20), _
    "----".PadRight(5), _
    "--------")
For Each e As XElement In po.DescendantsAndSelf()
    Console.WriteLine("{0}{1}{2}", _
        ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString).PadRight(20), _
        IIf(DirectCast(e, IXmlLineInfo).HasLineInfo(), _
            DirectCast(e, IXmlLineInfo).LineNumber.ToString().PadRight(5), _
            ""), _
        IIf(DirectCast(e, IXmlLineInfo).HasLineInfo(), _
            DirectCast(e, IXmlLineInfo).LinePosition.ToString(), _
            "No Line Information"))
Next
```

This example produces the following output:

```
BaseUri: Test.xml

Element Name        Line Position
------------        ---- --------
Root                1    2
  Child1            2    6
  Child2            3    6
  Child3            No Line Information
  Child4            4    6
```
