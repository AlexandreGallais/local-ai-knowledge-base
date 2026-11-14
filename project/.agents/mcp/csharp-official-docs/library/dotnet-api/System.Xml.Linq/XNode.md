---
title: "XNode class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNode class

Namespace: `System.Xml.Linq`

```csharp
public abstract class XNode : System.Xml.Linq.XObject
```

Represents the abstract concept of a node (element, comment, document type, processing instruction, or text node) in the XML tree.

#### Remarks

`XNode` is an abstract common base class for the following types:

-   `XComment`

-   `XContainer`

-   `XDocumentType`

-   `XProcessingInstruction`

-   `XText`

`XContainer` is an abstract common base class for the following types:

-   `XDocument`

-   `XElement`

Objects of classes that derive from `XContainer` can contain child nodes.

> **Note:**
> An `XAttribute` is not an `XNode`. Attributes are maintained as a list of name/value pairs on an element.

If you are writing a complex XML application, such as an XML editor or a word processor that stores content as XML, you will often work at the node level. Typical activities when working at the node level include adding nodes, deleting nodes, transforming nodes, and iterating through axes that return collections of nodes.

## XNode.DocumentOrderComparer property

```csharp
public static System.Xml.Linq.XNodeDocumentOrderComparer DocumentOrderComparer { get; }
```

Gets a comparer that can compare the relative position of two nodes.

Returns: An `XNodeDocumentOrderComparer` that can compare the relative position of two nodes.

#### Remarks
This property is primarily used internally for implementing the `Extensions.InDocumentOrder` extension method. The recommended approach is to use that extension method instead of using this property directly.

#### Examples
The following example creates an XML tree with some elements. It then creates a `List<T>` of `XNode` that contains some elements from the XML tree at random. It sorts the list, using this property to retrieve a `XNodeDocumentOrderComparer`, which implements the `IComparer` and `IComparer<T>` interfaces.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);

List<XNode> nodeList = new List<XNode>();
nodeList.Add(xmlTree.Element("Child5"));
nodeList.Add(xmlTree.Element("Child3"));
nodeList.Add(xmlTree.Element("Child1"));

// Sort nodes in document order.
nodeList.Sort(XNode.DocumentOrderComparer);

foreach (XElement el in nodeList)
    Console.WriteLine(el);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
        </Root>

Dim nodeList As List(Of XNode) = New List(Of XNode)()
nodeList.Add(xmlTree.Element("Child5"))
nodeList.Add(xmlTree.Element("Child3"))
nodeList.Add(xmlTree.Element("Child1"))

' Sort nodes in document order.
nodeList.Sort(XNode.DocumentOrderComparer)

For Each el In nodeList
    Console.WriteLine(el)
Next
```

This example produces the following output:

```
<Child1>1</Child1>
<Child3>3</Child3>
<Child5>5</Child5>
```

## XNode.EqualityComparer property

```csharp
public static System.Xml.Linq.XNodeEqualityComparer EqualityComparer { get; }
```

Gets a comparer that can compare two nodes for value equality.

Returns: A `XNodeEqualityComparer` that can compare two nodes for value equality.

#### Examples
The following example uses this property to retrieve an `XNodeEqualityComparer`, which implements the `IEqualityComparer` and `IEqualityComparer<T>` interfaces. It creates a dictionary that uses this property.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);

Dictionary<XNode, string> nodeDictionary = new Dictionary<XNode, string>(XNode.EqualityComparer);
nodeDictionary.Add(xmlTree.Element("Child5"), "Child 5 Information");
nodeDictionary.Add(xmlTree.Element("Child3"), "Child 3 Information");
nodeDictionary.Add(xmlTree.Element("Child1"), "Child 1 Information");

string str = nodeDictionary[xmlTree.Element("Child3")];
Console.WriteLine(str);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
        </Root>

Dim nodeDictionary As Dictionary(Of XNode, String) = New Dictionary(Of XNode, String)(XNode.EqualityComparer)
nodeDictionary.Add(xmlTree.Element("Child5"), "Child 5 Information")
nodeDictionary.Add(xmlTree.Element("Child3"), "Child 3 Information")
nodeDictionary.Add(xmlTree.Element("Child1"), "Child 1 Information")

Dim str As String = nodeDictionary(xmlTree.Element("Child3"))
Console.WriteLine(str)
```

This example produces the following output:

```
Child 3 Information
```

## XNode.NextNode property

```csharp
public System.Xml.Linq.XNode? NextNode { get; }
```

Gets the next sibling node of this node.

Returns: The `XNode` that contains the next sibling node.

#### Remarks
If this `XNode` does not have a parent, or if there is no next node, this property returns `null`.

#### Examples
The following example uses this property to loop through nodes.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XText("Some Text"),
    new XElement("Child2",
        2,
        new XElement("GrandChild", "GrandChild Content")
    ),
    new XComment("a comment"),
    new XElement("Child3")
);
XNode node = xmlTree.Element("Child2");
do {
    StringBuilder sb = new StringBuilder();
    sb.Append(String.Format("NodeType: {0}", node.NodeType.ToString().PadRight(10)));
    switch (node.NodeType)
    {
        case XmlNodeType.Text:
            sb.Append((node as XText).Value);
            break;
        case XmlNodeType.Element:
            sb.Append((node as XElement).Name);
            break;
        case XmlNodeType.Comment:
            sb.Append((node as XComment).Value);
            break;
    }
    Console.WriteLine(sb.ToString());
}
while ((node = node.NextNode) != null);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>Some Text
            <Child2>2
                <GrandChild>GrandChild Content</GrandChild>
            </Child2>
            <!--a comment-->
            <Child3>3</Child3>
        </Root>

Dim node As XNode = xmlTree.Element("Child2")
Do
    Dim sb As StringBuilder = New StringBuilder()
    sb.Append(String.Format("NodeType: {0}", node.NodeType.ToString().PadRight(10)))
    Select Case node.NodeType
        Case XmlNodeType.Text
            sb.Append(DirectCast(node, XText).Value)
        Case XmlNodeType.Element
            sb.Append(DirectCast(node, XElement).Name)
        Case XmlNodeType.Comment
            sb.Append(DirectCast(node, XComment).Value)
    End Select
    Console.WriteLine(sb.ToString())

    node = node.NextNode
Loop While (Not (node Is Nothing))
```

This example produces the following output:

```
NodeType: Element   Child2
NodeType: Comment   a comment
NodeType: Element   Child3
```

## XNode.PreviousNode property

```csharp
public System.Xml.Linq.XNode? PreviousNode { get; }
```

Gets the previous sibling node of this node.

Returns: The `XNode` that contains the previous sibling node.

#### Remarks
If this `XNode` does not have a parent, or if there is no previous node, this property returns `null`.

The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `PreviousNode` property must traverse the list of direct child nodes under the parent container. Therefore, using this property might affect your performance.

#### Examples
The following example uses this property to loop through nodes.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XText("Some Text"),
    new XElement("Child2",
        2,
        new XElement("GrandChild", "GrandChild Content")
    ),
    new XComment("a comment"),
    new XElement("Child3")
);
XNode node = xmlTree.Element("Child2");
do {
    StringBuilder sb = new StringBuilder();
    sb.Append(String.Format("NodeType: {0}", node.NodeType.ToString().PadRight(10)));
    switch (node.NodeType)
    {
        case XmlNodeType.Text:
            sb.Append((node as XText).Value);
            break;
        case XmlNodeType.Element:
            sb.Append((node as XElement).Name);
            break;
        case XmlNodeType.Comment:
            sb.Append((node as XComment).Value);
            break;
    }
    Console.WriteLine(sb.ToString());
}
while ((node = node.PreviousNode) != null);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Child1>1</Child1>Some Text<Child2>2
            <GrandChild>GrandChild Content</GrandChild>
        </Child2>
        <!--a comment-->
        <Child3>3</Child3>
    </Root>

Dim node As XNode = xmlTree.Element("Child2")
Do
    Dim sb As StringBuilder = New StringBuilder()
    sb.Append(String.Format("NodeType: {0}", node.NodeType.ToString().PadRight(10)))
    Select Case node.NodeType
        Case XmlNodeType.Text
            sb.Append(DirectCast(node, XText).Value)
        Case XmlNodeType.Element
            sb.Append(DirectCast(node, XElement).Name)
        Case XmlNodeType.Comment
            sb.Append(DirectCast(node, XComment).Value)
    End Select
    Console.WriteLine(sb.ToString())

    node = node.PreviousNode
Loop While (Not (node Is Nothing))
```

This example produces the following output:

```
NodeType: Element   Child2
NodeType: Text      Some Text
NodeType: Element   Child1
```

## XNode.AddAfterSelf(Object) method

```csharp
public void AddAfterSelf (object? content);
```

Adds the specified content immediately after this node.

Parameters:

- `content`: A content object that contains simple content or a collection of content objects to be added after this node.

Exceptions:

- `InvalidOperationException`: The parent is `null`.

#### Remarks
For details about the valid content that can be passed to this method, see Valid Content of XElement and XDocument Objects.

`Changing` events.

#### Examples
The following example uses this method to add an element into the tree.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);
XElement child1 = xmlTree.Element("Child1");
child1.AddAfterSelf(
    new XElement("NewChild", 10)
);
Console.WriteLine(xmlTree);
```

```vb
Dim xmlTree As XElement = _
        <Root>
            <Child1>1</Child1>
            <Child2>2</Child2>
            <Child3>3</Child3>
            <Child4>4</Child4>
            <Child5>5</Child5>
        </Root>

Dim child1 As XElement = xmlTree.<Child1>(0)
child1.AddAfterSelf(New XElement("NewChild", 10))
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
  <NewChild>10</NewChild>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

## XNode.AddAfterSelf(Object[]) method

```csharp
public void AddAfterSelf (params object?[] content);
```

Adds the specified content immediately after this node.

Parameters:

- `content`: A parameter list of content objects.

Exceptions:

- `InvalidOperationException`: The parent is `null`.

#### Remarks
For details about the valid content that can be passed to this method, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example uses a LINQ query to create an `IEnumerable<T>` of `XElement`, which it then passes to this method. This adds the results of a query to the tree in the desired location.

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
XElement child1 = xmlTree.Element("Child1");
child1.AddAfterSelf(
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

Dim child1 As XElement = xmlTree.<Child1>(0)
child1.AddAfterSelf( _
    From el In srcTree.Elements() _
    Where CInt(el) > 3 _
    Select el)
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
  <Element4>4</Element4>
  <Element5>5</Element5>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```
