---
title: "XNodeEqualityComparer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XNodeEqualityComparer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XNodeEqualityComparer class

Namespace: `System.Xml.Linq`

```csharp
public sealed class XNodeEqualityComparer : System.Collections.Generic.IEqualityComparer<System.Xml.Linq.XNode>, System.Collections.IEqualityComparer
```

Compares nodes to determine whether they are equal. This class cannot be inherited.

#### Remarks
The purpose of this class is to implement `IEqualityComparer` and `IEqualityComparer<T>`. Classes that require identity (such as `Dictionary<T1,T2>` ) require an instance of a class that implements one of these interfaces.

## XNodeEqualityComparer.XNodeEqualityComparer() constructor

```csharp
public XNodeEqualityComparer ();
```

Initializes a new instance of the `XNodeEqualityComparer` class.

#### Examples
The following example uses this class to determine whether two nodes are equal.

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
XNodeEqualityComparer equalityComparer = new XNodeEqualityComparer();
Console.WriteLine(equalityComparer.Equals(xmlTree1, xmlTree2));
xmlTree2.Add(new XElement("NewChild", "new content"));
Console.WriteLine(equalityComparer.Equals(xmlTree1, xmlTree2));
```

This example produces the following output:

```
True
False
```

## XNodeEqualityComparer.Equals(XNode, XNode) method

```csharp
public bool Equals (System.Xml.Linq.XNode? x, System.Xml.Linq.XNode? y);
```

Compares the values of two nodes.

Parameters:

- `x`: The first `XNode` to compare.
- `y`: The second `XNode` to compare.

Returns: A `Boolean` indicating if the nodes are equal.

#### Remarks
The following criteria determine whether two nodes are equal:

- A `null` node is equal to another `null` node but unequal to a non-`null` node.

- Two `XNode` objects of different types are never equal.

- Two `XText` nodes are equal if they contain the same text.

- Two `XElement` nodes are equal if they have the same tag name, the same set of attributes with the same values, and (ignoring comments and processing instructions), contain two equal-length sequences of pairwise equal content nodes.

- Two `XDocument` objects are equal if their root nodes are equal.

- Two `XComment` nodes are equal if they contain the same comment text.

- Two `XProcessingInstruction` nodes are equal if they have the same target and data.

- Two `XDocumentType` nodes are equal if the have the same name, public ID, system ID, and internal subset.

#### Examples
The following example uses this class to compare two nodes.

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
XNodeEqualityComparer equalityComparer = new XNodeEqualityComparer();
Console.WriteLine(equalityComparer.Equals(xmlTree1, xmlTree2));
xmlTree2.Add(new XElement("NewChild", "new content"));
Console.WriteLine(equalityComparer.Equals(xmlTree1, xmlTree2));
```

This example produces the following output:

```
True
False
```

## XNodeEqualityComparer.GetHashCode(XNode) method

```csharp
public int GetHashCode (System.Xml.Linq.XNode obj);
```

Returns a hash code based on an `XNode`.

Parameters:

- `obj`: The `XNode` to hash.

Returns: A `Int32` that contains a value-based hash code for the node.

#### Remarks
The `XNode` implementation of  `Object.GetHashCode` is based on the referential identity of the node. This method computes a deep hash code based on the value of the node and all descendants. The hash code reflects all attributes and all descendent nodes.

#### Examples
The following example uses this method to get a deep hash code for an XML tree.

```csharp
XElement xmlTree = new XElement("Root",
    new XAttribute("Att1", 1),
    new XAttribute("Att2", 2),
    new XElement("Child1", 1),
    new XElement("Child2", "some content")
);
XNodeEqualityComparer equalityComparer = new XNodeEqualityComparer();
Console.WriteLine("HashCode: {0}", equalityComparer.GetHashCode(xmlTree).ToString("X"));
xmlTree.Add(new XElement("NewChild", "new content"));
Console.WriteLine("HashCode: {0}", equalityComparer.GetHashCode(xmlTree).ToString("X"));
```

This example produces the following output:

```
HashCode: 958CCD0
HashCode: AD26516B
```

## XNodeEqualityComparer.System.Collections.IEqualityComparer.Equals(Object, Object) method

```csharp
bool IEqualityComparer.Equals (object x, object y);
```

Compares the values of two nodes.

Parameters:

- `x`: The first `XNode` to compare.
- `y`: The second `XNode` to compare.

Returns: `true` if the nodes are equal; otherwise `false`.

#### Remarks
The following criteria determine whether two nodes are equal:

- A `null` node is equal to another `null` node but unequal to a non-`null` node.

- Two `XNode` objects of different types are never equal.

- Two `XText` nodes are equal if they contain the same text.

- Two `XElement` nodes are equal if they have the same tag name, the same set of attributes with the same values, and (ignoring comments and processing instructions), contain two equa-length sequences of pairwise equal content nodes.

- Two `XDocument` objects are equal if their root nodes are equal.

- Two `XComment` nodes are equal if they contain the same comment text.

- Two `XProcessingInstruction` nodes are equal if they have the same target and data.

- Two `XDocumentType` nodes are equal if the have the same name, public ID, system ID, and internal subset.

## XNodeEqualityComparer.System.Collections.IEqualityComparer.GetHashCode(Object) method

```csharp
int IEqualityComparer.GetHashCode (object obj);
```

Returns a hash code based on the value of a node.

Parameters:

- `obj`: The node to hash.

Returns: A `Int32` that contains a value-based hash code for the node.

#### Remarks
The `XNode` implementation of `Object.GetHashCode` is based on the referential identity of the node. This method computes a deep hash code based on the value of the node, its attributes, and its descendants.
