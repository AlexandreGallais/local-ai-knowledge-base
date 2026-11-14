---
title: "XContainer class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XContainer class

Namespace: `System.Xml.Linq`

```csharp
public abstract class XContainer : System.Xml.Linq.XNode
```

Represents a node that can contain other nodes.

#### Remarks
This class provides functionality such as finding the next or previous sibling node, or enumerating the direct children of a node.

The two classes that derive from `XContainer` are `XDocument` and `XElement`.

## XContainer.FirstNode property

```csharp
public System.Xml.Linq.XNode? FirstNode { get; }
```

Gets the first child node of this node.

Returns: An `XNode` containing the first child node of the `XContainer`.

#### Examples
The following example creates an element that contains child elements. It then gets the first child node of the parent element.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);
XNode firstNode = xmlTree.FirstNode;
Console.WriteLine(firstNode);
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

Dim firstNode As XNode = xmlTree.FirstNode
Console.WriteLine(firstNode)
```

This example produces the following output:

```xml
<Child1>1</Child1>
```

## XContainer.LastNode property

```csharp
public System.Xml.Linq.XNode? LastNode { get; }
```

Gets the last child node of this node.

Returns: An `XNode` containing the last child node of the `XContainer`.

#### Examples
The following example creates an element that contains child elements. It then gets the last child node of the parent element.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1", 1),
    new XElement("Child2", 2),
    new XElement("Child3", 3),
    new XElement("Child4", 4),
    new XElement("Child5", 5)
);
XNode lastNode = xmlTree.LastNode;
Console.WriteLine(lastNode);
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

Dim lastNode As XNode = xmlTree.LastNode
Console.WriteLine(lastNode)
```

This example produces the following output:

```xml
<Child5>5</Child5>
```

## XContainer.Add(Object) method

```csharp
public void Add (object? content);
```

Adds the specified content as children of this `XContainer`.

Parameters:

- `content`: A content object containing simple content or a collection of content objects to be added.

#### Remarks
This method adds the new content after the existing content of the `XContainer`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates two XML trees, and then uses this method to add an `XElement` object to one of them. It also adds the results of a LINQ query to the XML tree.

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
xmlTree.Add(new XElement("NewChild", "new content"));
xmlTree.Add(
    from el in srcTree.Elements()
    where (int)el > 3
    select el
);
// Even though Child9 does not exist in srcTree, the following statement will not
// throw an exception, and nothing will be added to xmlTree.
xmlTree.Add(srcTree.Element("Child9"));
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

xmlTree.Add(New XElement("NewChild", "new content"))
xmlTree.Add( _
    From el In srcTree.Elements() _
    Where CInt(el) > 3 _
    Select el _
)
' Even though Child9 does not exist in srcTree, the following statement will not
' throw an exception, and nothing will be added to xmlTree.
xmlTree.Add(srcTree.<Child9>)
Console.WriteLine(xmlTree)

```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
  <NewChild>new content</NewChild>
  <Element4>4</Element4>
  <Element5>5</Element5>
</Root>
```

## XContainer.Add(Object[]) method

```csharp
public void Add (params object?[] content);
```

Adds the specified content as children of this `XContainer`.

Parameters:

- `content`: A parameter list of content objects.

#### Remarks
This method adds the new content after the existing content of the `XContainer`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates two XML trees, uses this method to add an `XElement` object to one of them. It also adds the results of a LINQ query to the XML tree.

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
xmlTree.Add(new XElement("NewChild", "new content"));
xmlTree.Add(
    from el in srcTree.Elements()
    where (int)el > 3
    select el
);
// Even though Child9 does not exist in srcTree, the following statement will not
// throw an exception, and nothing will be added to xmlTree
xmlTree.Add(srcTree.Element("Child9"));
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

xmlTree.Add(New XElement("NewChild", "new content"))
xmlTree.Add( _
    From el In srcTree.Elements() _
    Where CInt(el) > 3 _
    Select el _
)
' Even though Child9 does not exist in srcTree, the following statement will not
' throw an exception, and nothing will be added to xmlTree
xmlTree.Add(srcTree.<Child9>)
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
  <NewChild>new content</NewChild>
  <Element4>4</Element4>
  <Element5>5</Element5>
</Root>
```

## XContainer.AddFirst(Object) method

```csharp
public void AddFirst (object? content);
```

Adds the specified content as the first children of this document or element.

Parameters:

- `content`: A content object containing simple content or a collection of content objects to be added.

#### Remarks
This method adds the new content before the existing content of the `XContainer`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates two XML trees, uses this method to add an `XElement` object as the first element to one of them. It also adds the results of a LINQ query to the XML tree.

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
xmlTree.AddFirst(new XElement("NewChild", "new content"));
xmlTree.AddFirst(
    from el in srcTree.Elements()
    where (int)el > 3
    select el
);
// Even though Child9 does not exist in srcTree, the following statement will not
// throw an exception, and nothing will be added to xmlTree
xmlTree.AddFirst(srcTree.Element("Child9"));
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

xmlTree.AddFirst(New XElement("NewChild", "new content"))
xmlTree.AddFirst( _
    From el In srcTree.Elements() _
    Where CInt(el) > 3 _
    Select el _
)
' Even though Child9 does not exist in srcTree, the following statement will not
' throw an exception, and nothing will be added to xmlTree
xmlTree.AddFirst(srcTree.<Child9>)
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Element4>4</Element4>
  <Element5>5</Element5>
  <NewChild>new content</NewChild>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```

## XContainer.AddFirst(Object[]) method

```csharp
public void AddFirst (params object?[] content);
```

Adds the specified content as the first children of this document or element.

Parameters:

- `content`: A parameter list of content objects.

Exceptions:

- `InvalidOperationException`: The parent is `null`.

#### Remarks
This method adds the new content before the existing content of the `XContainer`.

For details about the valid content that can be passed to this function, see Valid Content of XElement and XDocument Objects.

This method will raise the `Changed` and the `Changing` events.

#### Examples
The following example creates two XML trees, and uses this method to add an `XElement` object as the first element to one of them. It also adds the results of a LINQ query to the XML tree.

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
xmlTree.AddFirst(new XElement("NewChild", "new content"));
xmlTree.AddFirst(
    from el in srcTree.Elements()
    where (int)el > 3
    select el
);
// Even though Child9 does not exist in srcTree, the following statement will not
// throw an exception, and nothing will be added to xmlTree.
xmlTree.AddFirst(srcTree.Element("Child9"));
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

xmlTree.AddFirst(New XElement("NewChild", "new content"))
xmlTree.AddFirst( _
    From el In srcTree.Elements() _
    Where CInt(el) > 3 _
    Select el _
)
' Even though Child9 does not exist in srcTree, the following statement will not
' throw an exception, and nothing will be added to xmlTree.
xmlTree.AddFirst(srcTree.<Child9>)
Console.WriteLine(xmlTree)
```

This example produces the following output:

```xml
<Root>
  <Element4>4</Element4>
  <Element5>5</Element5>
  <NewChild>new content</NewChild>
  <Child1>1</Child1>
  <Child2>2</Child2>
  <Child3>3</Child3>
  <Child4>4</Child4>
  <Child5>5</Child5>
</Root>
```
