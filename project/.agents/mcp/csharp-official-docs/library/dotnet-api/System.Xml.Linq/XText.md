---
title: "XText class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XText.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XText class

Namespace: `System.Xml.Linq`

```csharp
public class XText : System.Xml.Linq.XNode
```

Represents a text node.

#### Remarks
XML elements can contain text content. Sometimes the content is simple (the element only contains text content), and sometimes the content is mixed (the contents of the element contains both text and other elements). In either case, each chunk of text is represented as an `XText` node.

LINQ to XML developers will often have to write code to work with arbitrary LINQ to XML trees that they did not create. If you are writing code that has to work with LINQ to XML trees that you have no control over creating, you should be aware of certain behaviors of `XText` nodes.

When processing the contents of an XML tree at the node level, you should be prepared for multiple `XText` nodes to be adjacent to each other. Further, you should be prepared for `XText` nodes that contain no text. It is possible through LINQ to XML methods to remove the content of a text node. However, LINQ to XML does not automatically delete the node. The node has identity, and might have annotations, so LINQ to XML allows for zero-length nodes in the tree.

For more information, see Programming with nodes.

## XText.XText(String) constructor

```csharp
public XText (string value);
```

Initializes a new instance of the `XText` class.

Parameters:

- `value`: The `String` that contains the value of the `XText` node.

#### Remarks
You typically do not create text nodes by using the `XText` constructors. When you pass text content when constructing an `XElement`, text nodes are automatically created.

#### Examples
The following example creates an element that contains a text node.

```csharp
XElement root = new XElement("Root", "Some text");
Console.WriteLine(root);
```

```vb
Dim root As XElement = <Root>Some text</Root>
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>Some text</Root>
```

## XText.XText(XText) constructor

```csharp
public XText (System.Xml.Linq.XText other);
```

Initializes a new instance of the `XText` class from another `XText` object.

Parameters:

- `other`: The `XText` node to copy from.

#### Remarks
This constructor is primarily used internally to make a deep copy of an XML tree.

## XText.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the node type for this node.

Returns: The node type. For `XText` objects, this value is `XmlNodeType.Text`.

#### Remarks
Because all classes that derive from `XObject` contain a `NodeType` property, you can write code that operates on collections of concrete subclass of `XObject`. Your code can then test for the node type of each node in the collection.

#### Examples
The following example creates an XML tree that contains a number of types of nodes. It then iterates through the tree, outputting the node type of each node.

Note that `Child2` contains an `XText` node, implicitly converted from the string content.

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
        new XElement("Child2", "Text content")
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
' Note that XNode uses XmlNodeType, which is in the System.Xml namespace.
Dim xmlTree As XDocument = _
    <?xml version='1.0'?>
    <!-- a comment -->
    <?xml-stylesheet type='text/xsl' href='hello.xsl'?>
    <Root Att="attContent">
        <Child1>
            CDATA content]<![CDATA[]>
        </Child1>
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

## XText.Value property

```csharp
public string Value { get; set; }
```

Gets or sets the value of this node.

Returns: A `String` that contains the value of this node.

#### Remarks
Setting this property will raise the `Changed` and the `Changing` events.

#### Examples
The following example shows getting and setting this property.

```csharp
XElement root = new XElement("Root", "Some text");
XText txtNode = root.Nodes().OfType<XText>().First();
Console.WriteLine(txtNode.Value);
txtNode.Value = "New text";
Console.WriteLine(txtNode.Value);

root.Value = "Newer text";
txtNode = root.Nodes().OfType<XText>().First();
Console.WriteLine(txtNode.Value);
```

```vb
Dim root As XElement = <Root>Some text</Root>
Dim txtNode As XText = root.Nodes().OfType(Of XText).First()
Console.WriteLine(txtNode.Value)
txtNode.Value = "New text"
Console.WriteLine(txtNode.Value)

root.Value = "Newer text"
txtNode = root.Nodes().OfType(Of XText).First()
Console.WriteLine(txtNode.Value)
```

This example produces the following output:

```
Some text
New text
Newer text
```

## XText.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter writer);
```

Writes this node to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Remarks
This method is primarily used internally by the methods that write an XML tree to an `XmlWriter`.

## XText.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes this `XText` to the specified `XmlWriter`.

Parameters:

- `writer`: The writer to write this `XText` to.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XText.WriteTo`.
