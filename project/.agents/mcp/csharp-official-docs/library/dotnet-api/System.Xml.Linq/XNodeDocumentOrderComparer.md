---
title: "XNodeDocumentOrderComparer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNodeDocumentOrderComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNodeDocumentOrderComparer class

Namespace: `System.Xml.Linq`

```csharp
public sealed class XNodeDocumentOrderComparer : System.Collections.Generic.IComparer<System.Xml.Linq.XNode>, System.Collections.IComparer
```

Contains functionality to compare nodes for their document order. This class cannot be inherited.

#### Remarks
This class implements `IComparer` and `IComparer<XNode>`.

We recommend that instead of using this class directly, you use the `Extensions.InDocumentOrder` method. This class is used internally by that method.

## XNodeDocumentOrderComparer.XNodeDocumentOrderComparer() constructor

```csharp
public XNodeDocumentOrderComparer ();
```

Initializes a new instance of the `XNodeDocumentOrderComparer` class.

#### Remarks
We recommend that instead of using this class directly, you use the `Extensions.InDocumentOrder` method. This class is used internally by that method.

#### Examples
The following example uses of this class to compare the document order for two nodes.

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
XNodeDocumentOrderComparer documentOrderComparer = new XNodeDocumentOrderComparer();
int val = documentOrderComparer.Compare(child3, child5);
if (val == 0)
    Console.WriteLine("Child3 is same as Child5");
else if (val < 0)
    Console.WriteLine("Child3 is before Child5");
else
    Console.WriteLine("Child3 is after Child5");
```

This example produces the following output:

```
Child3 is before Child5
```

## XNodeDocumentOrderComparer.Compare(XNode, XNode) method

```csharp
public int Compare (System.Xml.Linq.XNode? x, System.Xml.Linq.XNode? y);
```

Compares two nodes to determine their relative document order.

Parameters:

- `x`: The first `XNode` to compare.
- `y`: The second `XNode` to compare.

Returns: An `Int32` that contains 0 if the nodes are equal; -1 if `x` is before `y`; 1 if `x` is after `y`.

Exceptions:

- `InvalidOperationException`: The two nodes do not share a common ancestor.

#### Remarks
We recommend that instead of using this class directly, you use the `Extensions.InDocumentOrder` method. This class is used internally by that method.

#### Examples
The following example uses this class to compare document order for two nodes.

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
XNodeDocumentOrderComparer documentOrderComparer = new XNodeDocumentOrderComparer();
int val = documentOrderComparer.Compare(child3, child5);
if (val == 0)
    Console.WriteLine("Child3 is same as Child5");
else if (val < 0)
    Console.WriteLine("Child3 is before Child5");
else
    Console.WriteLine("Child3 is after Child5");
```

This example produces the following output:

```
Child3 is before Child5
```

## XNodeDocumentOrderComparer.System.Collections.IComparer.Compare(Object, Object) method

```csharp
int IComparer.Compare (object x, object y);
```

Compares two nodes to determine their relative document order.

Parameters:

- `x`: The first `XNode` to compare.
- `y`: The second `XNode` to compare.

Returns: An `Int32` that contains 0 if the nodes are equal; -1 if `x` is before `y`; 1 if `x` is after `y`.

Exceptions:

- `InvalidOperationException`: The two nodes do not share a common ancestor.
- `ArgumentException`: The two nodes are not derived from `XNode`.

#### Remarks
We recommend that instead of using this class directly, you use the `Extensions.InDocumentOrder` method. This class is used internally by that method.
