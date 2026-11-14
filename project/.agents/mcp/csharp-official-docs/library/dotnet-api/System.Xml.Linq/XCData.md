---
title: "XCData class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XCData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XCData class

Namespace: `System.Xml.Linq`

```csharp
public class XCData : System.Xml.Linq.XText
```

Represents a text node that contains CDATA.

#### Remarks
An XML CDATA section allows you to store almost any arbitrary string as the contents of an XML element. This class represents the XML concept of a CDATA text node.

This class derives from `XText`, which represents XML text. CDATA sections are special cases of XML text.

## XCData.XCData(String) constructor

```csharp
public XCData (string value);
```

Initializes a new instance of the `XCData` class.

Parameters:

- `value`: A string that contains the value of the `XCData` node.

#### Examples
The following example creates an element that contains a CDATA node.

```csharp
XElement root = new XElement("Root",
    new XCData("Some content")
);
Console.WriteLine(root);
```

```vb
Dim root As XElement = <Root>
                           Some content]]>
                       </Root>
Console.WriteLine(root)
```

This example produces the following output:

```
<Root><![CDATA[Some content]<![CDATA[]></Root>
```

## XCData.XCData(XCData) constructor

```csharp
public XCData (System.Xml.Linq.XCData other);
```

Initializes a new instance of the `XCData` class.

Parameters:

- `other`: The `XCData` node to copy from.

#### Remarks
This constructor is primarily used internally to make a deep copy of an XML tree.

## XCData.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XCData` objects, this value is `XmlNodeType.CDATA`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example creates an XML tree that contains various types of nodes. It then iterates through the tree, and prints the node type of each node.

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
Dim xmlTree As XDocument = _
    <?xml version="1.0" encoding="utf-8"?>
        <!--a comment-->
        <?xml-stylesheet type='text/xsl' href='hello.xsl'?>
        <Root Att="attContent">
            <Child1>CDATA content]<![CDATA[]></Child1>
            <Child2>Text content</Child2>
        </Root>

' Note that XNode uses XmlNodeType, which is in the System.Xml namespace.
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

## XCData.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter writer);
```

Writes this CDATA object to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Remarks
This method is primarily used internally by the methods that write an XML tree to an `XmlWriter`.

## XCData.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Writes this `XCData` to the given `XmlWriter`.

Parameters:

- `writer`: The writer to write this `XCData` to.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XCData.WriteTo`.
