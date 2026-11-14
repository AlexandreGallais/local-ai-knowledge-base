---
title: "XNode class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNode class (part 4 of 5)

## XNode.NodesAfterSelf() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> NodesAfterSelf ();
```

Returns a collection of the sibling nodes after this node, in document order.

Returns: An `IEnumerable<T>` of `XNode` of the sibling nodes after this node, in document order.

#### Remarks
This method only includes siblings in the returned collection. It does not include descendants.

This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then queries the tree using this axis method.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XText("More text content."),
    new XElement("child3", "child3 content")
);
XElement child = xmlTree.Element("Child2");
IEnumerable<XNode> nodes =
    from node in child.NodesAfterSelf()
    select node;
foreach (XNode node in nodes)
{
    Console.WriteLine("Node type: {0}  {1}",
        node.NodeType,
        node.NodeType == XmlNodeType.Text ? (node as XText).Value : "");
}
```

```vb
Dim xmlTree As XElement = New XElement("Root", _New XText("Text content."), _
    New XElement("Child1", "child1 content"), _
    New XElement("Child2", "child2 content"), _
    New XText("More text content."), _
    New XElement("child3", "child3 content") _
)

Dim child As XElement = xmlTree.Element("Child2")
Dim nodes As IEnumerable(Of XNode) = _
    From node In child.NodesAfterSelf() _
    Select node
For Each node As XNode In nodes
    Dim s As String = ""
    If node.NodeType = XmlNodeType.Text Then
        s = DirectCast(node, XText).Value
    End If
    Console.WriteLine("Node type: {0}  {1}", node.NodeType, s)
Next
```

This example produces the following output:

```
Node type: Text  More text content.
Node type: Element
```

## XNode.NodesBeforeSelf() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XNode> NodesBeforeSelf ();
```

Returns a collection of the sibling nodes before this node, in document order.

Returns: An `IEnumerable<T>` of `XNode` of the sibling nodes before this node, in document order.

#### Remarks
This method only includes siblings in the returned collection. It does not include descendants.

This method uses deferred execution.

#### Examples
The following example creates an XML tree, and then queries the tree using this axis method.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XText("More text content."),
    new XElement("child3", "child3 content")
);
XElement child = xmlTree.Element("Child2");
IEnumerable<XNode> nodes =
    from node in child.NodesBeforeSelf()
    select node;
foreach (XNode node in nodes)
    Console.WriteLine("Node type: {0}  {1}",
        node.NodeType,
        node.NodeType == XmlNodeType.Text ? (node as XText).Value : "");
```

```vb
Dim xmlTree As XElement = New XElement("Root", _
    New XText("Text content."), _
    New XElement("Child1", "child1 content"), _
    New XElement("Child2", "child2 content"), _
    New XText("More text content."), _
    New XElement("child3", "child3 content") _
)

Dim child As XElement = xmlTree.Element("Child2")
Dim nodes As IEnumerable(Of XNode) = _
    From node In child.NodesBeforeSelf() _
    Select node
For Each node As XNode In nodes
    Dim s As String = ""
    If node.NodeType = XmlNodeType.Text Then
        s = DirectCast(node, XText).Value
    End If
    Console.WriteLine("Node type: {0}  {1}", node.NodeType, s)
Next
```

This example produces the following output:

```
Node type: Text  Text content.
Node type: Element
```

## XNode.ReadFrom(XmlReader) method

```csharp
public static System.Xml.Linq.XNode ReadFrom (System.Xml.XmlReader reader);
```

Creates an `XNode` from an `XmlReader`.

Parameters:

- `reader`: An `XmlReader` positioned at the node to read into this `XNode`.

Returns: An `XNode` that contains the node and its descendant nodes that were read from the reader. The runtime type of the node is determined by the node type (`XObject.NodeType`) of the first node encountered in the reader.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on a recognized node type.
- `XmlException`: The underlying `XmlReader` throws an exception.

#### Remarks
You can use this method to write a method that returns a collection of nodes, yielding each node as the node is read from the reader. This method enables you to process arbitrarily large XML files with a very small memory footprint.

The reader that you pass to this method might throw exceptions. `XNode.ReadFrom` does not catch all exceptions thrown by the reader; the unhandled exceptions bubble up to the code that called `XNode.ReadFrom`. In particular, your code should be prepared to handle `XmlException`.

For an example of how to stream a more complex document, see How to stream XML fragments with access to header information.

Certain standard query operators, such as `Enumerable.OrderBy`, iterate their source, collect all of the data, sort it, and then finally yield the first item in the sequence. If you use a query operator that materializes its source before yielding the first item, you will not retain a small memory footprint.

For an example of using LINQ to XML to transform extremely large XML documents while maintaining a small memory footprint, see How to perform streaming transform of large XML documents.

#### Examples

This example uses the following XML file, named *Source.xml*:

_Code sample not included: ~/snippets/csharp/System.Xml.Linq/XNode/ReadFrom/Source.xml._
The following example creates a custom axis method that uses `XNode.ReadFrom` and then queries the custom axis by using a LINQ query:

_Code sample not included: ~/snippets/csharp/System.Xml.Linq/XNode/ReadFrom/Program.cs._

This example produces the following output:

```
bbb
ccc
```

## XNode.ReadFromAsync(XmlReader, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Xml.Linq.XNode> ReadFromAsync (System.Xml.XmlReader reader, System.Threading.CancellationToken <example-value>);
```

Creates an `XNode` from an `XmlReader`. The runtime type of the node is determined by the `XObject.NodeType` of the first node encountered in the reader.

Parameters:

- `reader`: A reader positioned at the node to read into this `XNode`.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: An XNode that contains the nodes read from the reader.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on a recognized node type.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XNode.ReadFrom`.

## XNode.Remove() method

```csharp
public void Remove ();
```

Removes this node from its parent.

Exceptions:

- `InvalidOperationException`: The parent is `null`.

#### Remarks
In LINQ to XML programming, you should not manipulate or modify a set of nodes while you are querying for nodes in that set. In practical terms, this means that you should not iterate over a set of nodes and remove them. Instead, you should materialize them into a `List<T>` by using the `Enumerable.ToList` extension method. Then, you can iterate over the list to remove the nodes. For more information, see Mixed Declarative Code/Imperative Code Bugs (LINQ to XML).

Alternatively, if you want to remove a set of nodes, it is recommended that you use the `Extensions.Remove` method. This method copies the nodes to a list, and then iterates over the list to remove the nodes.

This method will raise the `Changed` and the `Changing` events.

The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.Remove` method must traverse the list of direct child nodes under the parent container. Therefore, using this method might affect your performance.

#### Examples
The following example removes a node from its parent.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child3 = xmlTree.Element("Child3");
child3.Remove();
Console.WriteLine(xmlTree);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child3 As XElement = xmlTree.<Child3>(0)
child3.Remove()
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>child1 content</Child1>
  <Child2>child2 content</Child2>
  <Child4>child4 content</Child4>
  <Child5>child5 content</Child5>
</Root>
```

## XNode.ReplaceWith(Object) method

```csharp
public void ReplaceWith (object? content);
```

Replaces this node with the specified content.

Parameters:

- `content`: Content that replaces this node.

#### Remarks
This method first removes this node from its parent, and then adds the specified content to this node's parent, in the place of this node.

The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.ReplaceWith` method must traverse the list of direct child nodes under the parent container. Therefore, using this method might affect your performance.

For details about the valid content that can be passed to this method, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example uses this method to replace the contents of a node with different content.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child3 = xmlTree.Element("Child3");
child3.ReplaceWith(
    new XElement("NewChild", "new content")
);
Console.WriteLine(xmlTree);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child3 As XElement = xmlTree.<Child3>(0)
child3.ReplaceWith(<NewChild>new content</NewChild>)
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>child1 content</Child1>
  <Child2>child2 content</Child2>
  <NewChild>new content</NewChild>
  <Child4>child4 content</Child4>
  <Child5>child5 content</Child5>
</Root>
```

## XNode.ReplaceWith(Object[]) method

```csharp
public void ReplaceWith (params object?[] content);
```

Replaces this node with the specified content.

Parameters:

- `content`: A parameter list of the new content.

#### Remarks
This method first removes this node from its parent, and then adds the specified content to this node's parent, in the place of this node.

The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.ReplaceWith` method must traverse the list of direct child nodes under the parent container. Therefore, using this method might affect your performance.

For details about the valid content that can be passed to this method, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example shows using the results of a LINQ to XML query as the input to this method.

```csharp
XElement srcTree = new XElement("Root",
    new XElement("Element1", 1),
    new XElement("Element2", 2),
    new XElement("Element3", 3),
    new XElement("Element4", 4),
    new XElement("Element5", 5)
);
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);
XElement child3 = xmlTree.Element("Child3");
child3.ReplaceWith(
    from el in srcTree.Elements()
    where (int)el > 3
    select el
);
Console.WriteLine(xmlTree);
```

```vb
Dim srcTree As XElement = _
        <Root>
            <Element1>1</Element1>
            <Element2>2</Element2>
            <Element3>3</Element3>
            <Element4>4</Element4>
            <Element5>5</Element5>
        </Root>

Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
        </Root>

Dim child3 As XElement = xmlTree.<Child3>(0)
child3.ReplaceWith( _
    From el In srcTree.Elements() _
    Where (CInt(el) > 3) _
    Select el)

Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Element4>4</Element4>
  <Element5>5</Element5>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

## XNode.ToString() method

```csharp
public override string ToString ();
```

Returns the indented XML for this node.

Returns: A `String` containing the indented XML.

#### Examples
The following example uses this method to retrieve indented XML.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1)
);
Console.WriteLine(xmlTree);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
        </Root>

Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
</Root>
```
