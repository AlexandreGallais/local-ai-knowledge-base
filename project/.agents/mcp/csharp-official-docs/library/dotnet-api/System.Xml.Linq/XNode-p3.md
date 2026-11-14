---
title: "XNode class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNode class (part 3 of 5)

## XNode.CreateReader(ReaderOptions) method

```csharp
public System.Xml.XmlReader CreateReader (System.Xml.Linq.ReaderOptions readerOptions);
```

Creates an `XmlReader` with the options specified by the `readerOptions` parameter.

Parameters:

- `readerOptions`: A `ReaderOptions` object that specifies whether to omit duplicate namespaces.

Returns: An `XmlReader` object.

To be added.

## XNode.DeepEquals(XNode, XNode) method

```csharp
public static bool DeepEquals (System.Xml.Linq.XNode? n1, System.Xml.Linq.XNode? n2);
```

Compares the values of two nodes, including the values of all descendant nodes.

Parameters:

- `n1`: The first `XNode` to compare.
- `n2`: The second `XNode` to compare.

Returns: `true` if the nodes are equal; otherwise `false`.

#### Remarks
The following criteria determine whether two nodes are equal:

- A `null` node is equal to another `null` node but unequal to a non-`null` node.

- Two `XNode` objects of different types are never equal.

- Two `XText` nodes are equal if they contain the same text.

- Two `XElement` nodes are equal if they have the same tag name, the same set of attributes with the same values, and (ignoring comments and processing instructions) contain two equal length sequences of equal content nodes.

- Two `XDocument` nodes are equal if their root nodes are equal.

- Two `XComment` nodes are equal if they contain the same comment text.

- Two `XProcessingInstruction` nodes are equal if they have the same target and data.

- Two `XDocumentType` nodes are equal if the have the same name, public ID, system ID, and internal subset.

#### Examples
The following example uses this method to compare two XML trees.

```csharp
XElement xmlTree1 = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XElement("Child1", 1),
    new XElement("Child2", "some content")
);
XElement xmlTree2 = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XElement("Child1", 1),
    new XElement("Child2", "some content")
);
Console.WriteLine(XNode.DeepEquals(xmlTree1, xmlTree2));
```

```vb
Dim xmlTree1 As XElement = _
        <Root Att1="1" Att2="2">
            <Child1>1</Child1>
            <Child2>some content</Child2>
        </Root>

Dim xmlTree2 As XElement = _
        <Root Att1="1" Att2="2">
            <Child1>1</Child1>
            <Child2>some content</Child2>
        </Root>

Console.WriteLine(XNode.DeepEquals(xmlTree1, xmlTree2))
```

This example produces the following output:

```
True
```

## XNode.ElementsAfterSelf() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> ElementsAfterSelf ();
```

Returns a collection of the sibling elements after this node, in document order.

Returns: An `IEnumerable<T>` of `XElement` of the sibling elements after this node, in document order.

#### Remarks
This method only includes siblings in the returned collection. It does not include descendants.

This method uses deferred execution.

#### Examples
The following example creates an element with some complex content. It then uses this method to retrieve the nodes in document order.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XText("More text content."),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child = xmlTree.Element("Child3");
IEnumerable<XElement> elements = child.ElementsAfterSelf();
foreach (XElement el in elements)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
        <Root>Text content.
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>More text content.
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child As XElement = xmlTree.<Child3>(0)
Dim elements As IEnumerable(Of XElement) = child.ElementsAfterSelf()
For Each el In elements
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child4
Child5
```

## XNode.ElementsAfterSelf(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> ElementsAfterSelf (System.Xml.Linq.XName? name);
```

Returns a filtered collection of the sibling elements after this node, in document order. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` of the sibling elements after this node, in document order. Only elements that have a matching `XName` are included in the collection.

#### Remarks
This method only includes siblings in the returned collection. It does not include descendants.

This method uses deferred execution.

#### Examples
The following example creates an element with some complex content. It then uses this method to retrieve the sibling elements, in document order.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XText("More text content."),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child = xmlTree.Element("Child3");
IEnumerable<XElement> elements = child.ElementsAfterSelf("Child4");
foreach (XElement el in elements)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
        <Root>Text content.
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>More text content.
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child As XElement = xmlTree.<Child3>(0)
Dim elements As IEnumerable(Of XElement) = child.ElementsAfterSelf("Child4")

For Each el In elements
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child4
```

## XNode.ElementsBeforeSelf() method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> ElementsBeforeSelf ();
```

Returns a collection of the sibling elements before this node, in document order.

Returns: An `IEnumerable<T>` of `XElement` of the sibling elements before this node, in document order.

#### Remarks
This method only includes siblings in the returned collection. It does not include descendants.

This method uses deferred execution.

#### Examples
The following example uses this axis method.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XText("More text content."),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child = xmlTree.Element("Child3");
IEnumerable<XElement> elements = child.ElementsBeforeSelf();
foreach (XElement el in elements)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
        <Root>Text content.
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>More text content.
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child As XElement = xmlTree.<Child3>(0)
Dim elements As IEnumerable(Of XElement) = child.ElementsBeforeSelf()

For Each el In elements
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child1
Child2
```

## XNode.ElementsBeforeSelf(XName) method

```csharp
public System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> ElementsBeforeSelf (System.Xml.Linq.XName? name);
```

Returns a filtered collection of the sibling elements before this node, in document order. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` of the sibling elements before this node, in document order. Only elements that have a matching `XName` are included in the collection.

#### Remarks
This method only includes siblings in the returned collection. It does not include descendants.

This method uses deferred execution.

#### Examples
The following example uses this method.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XText("More text content."),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child = xmlTree.Element("Child3");
IEnumerable<XElement> elements = child.ElementsBeforeSelf("Child2");
foreach (XElement el in elements)
    Console.WriteLine(el.Name);
```

```vb
Dim xmlTree As XElement = _
        <Root>Text content.
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>More text content.
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child As XElement = xmlTree.<Child3>(0)
Dim elements As IEnumerable(Of XElement) = child.ElementsBeforeSelf("Child2")

For Each el In elements
    Console.WriteLine(el.Name)
Next
```

This example produces the following output:

```
Child2
```

## XNode.IsAfter(XNode) method

```csharp
public bool IsAfter (System.Xml.Linq.XNode? node);
```

Determines if the current node appears after a specified node in terms of document order.

Parameters:

- `node`: The `XNode` to compare for document order.

Returns: `true` if this node appears after the specified node; otherwise `false`.

#### Remarks
The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.CompareDocumentOrder` method must traverse the ancestors of the two nodes being compared until it finds the common parent. Then it must traverse the list of the common parent's child nodes to determine the order of the two nodes being compared. Therefore, using this method might affect your performance.

#### Examples
The following example uses this method.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XText("More text content."),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child3 = xmlTree.Element("Child3");
XElement child5 = xmlTree.Element("Child5");
if (child5.IsAfter(child3))
    Console.WriteLine("Child5 is after Child3");
else
    Console.WriteLine("Child5 is not after Child3");
```

```vb
Dim xmlTree As XElement = _
        <Root>Text content.
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>More text content.
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child3 As XElement = xmlTree.<Child3>(0)
Dim child5 As XElement = xmlTree.<Child5>(0)
If (child5.IsAfter(child3)) Then
    Console.WriteLine("Child5 is after Child3")
Else
    Console.WriteLine("Child5 is not after Child3")
End If
```

This example produces the following output:

```
Child5 is after Child3
```

## XNode.IsBefore(XNode) method

```csharp
public bool IsBefore (System.Xml.Linq.XNode? node);
```

Determines if the current node appears before a specified node in terms of document order.

Parameters:

- `node`: The `XNode` to compare for document order.

Returns: `true` if this node appears before the specified node; otherwise `false`.

#### Remarks
The `XContainer` stores its child nodes as a singly-linked list of `XNode` objects. This means that the `XNode.IsBefore` method must traverse the ancestors of the two nodes being compared until it finds the common parent. Then it must traverse the list of the common parent's child nodes to determine the order of the two nodes being compared. Therefore, using this method might affect your performance.

#### Examples
The following example uses this method.

```csharp
XElement xmlTree = new XElement("Root",
    new XText("Text content."),
    new XElement("Child1", "child1 content"),
    new XElement("Child2", "child2 content"),
    new XElement("Child3", "child3 content"),
    new XText("More text content."),
    new XElement("Child4", "child4 content"),
    new XElement("Child5", "child5 content")
);
XElement child3 = xmlTree.Element("Child3");
XElement child5 = xmlTree.Element("Child5");
if (child5.IsBefore(child3))
    Console.WriteLine("Child5 is before Child3");
else
    Console.WriteLine("Child5 is not before Child3");
```

```vb
Dim xmlTree As XElement = _
        <Root>Text content.
            <Child1>child1 content</Child1>
            <Child2>child2 content</Child2>
            <Child3>child3 content</Child3>More text content.
            <Child4>child4 content</Child4>
            <Child5>child5 content</Child5>
        </Root>

Dim child3 As XElement = xmlTree.<Child3>(0)
Dim child5 As XElement = xmlTree.<Child5>(0)
If (child5.IsBefore(child3)) Then
    Console.WriteLine("Child5 is before Child3")
Else
    Console.WriteLine("Child5 is not before Child3")
End If
```

This example produces the following output:

```
Child5 is not before Child3
```
