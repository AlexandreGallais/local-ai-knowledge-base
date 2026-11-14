---
title: "XmlNamedNodeMap class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNamedNodeMap.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNamedNodeMap class

Namespace: `System.Xml`

```csharp
public class XmlNamedNodeMap : System.Collections.IEnumerable
```

Represents a collection of nodes that can be accessed by name or index.

#### Remarks
`XmlNamedNodeMap` is returned by the following three properties.

-   `Attributes` - Returns `XmlAttributeCollection`, a class which inherits from `XmlNamedNodeMap`.

-   `Entities` - Returns an `XmlNamedNodeMap` containing `XmlEntity` objects. The `XmlNamedNodeMap` is read-only.

-   `Notations` - Returns an `XmlNamedNodeMap` containing `XmlNotation` objects. The `XmlNamedNodeMap` is read-only.

## XmlNamedNodeMap.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of nodes in the `XmlNamedNodeMap`.

Returns: The number of nodes.

#### Examples
The following example uses the `XmlAttributeCollection` class (which inherits from `XmlNamedNodeMap`) to display all the attributes of a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamedNodeMap/Count/source.cs._

## XmlNamedNodeMap.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Provides support for the "foreach" style iteration over the collection of nodes in the `XmlNamedNodeMap`.

Returns: An enumerator object.

#### Examples
The following example displays all attributes in the collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamedNodeMap/GetEnumerator/source.cs._

## XmlNamedNodeMap.GetNamedItem(String) method

```csharp
public virtual System.Xml.XmlNode? GetNamedItem (string name);
```

Retrieves an `XmlNode` specified by name.

Parameters:

- `name`: The qualified name of the node to retrieve. It is matched against the `XmlNode.Name` property of the matching node.

Returns: An `XmlNode` with the specified name or `null` if a matching node is not found.

#### Examples
The following example uses the `XmlAttributeCollection` class (which inherits from `XmlNamedNodeMap`) to modify an attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamedNodeMap/GetNamedItem/source.cs._

## XmlNamedNodeMap.GetNamedItem(String, String) method

```csharp
public virtual System.Xml.XmlNode? GetNamedItem (string localName, string? namespaceURI);
```

Retrieves a node with the matching `XmlNode.LocalName` and `XmlNode.NamespaceURI`.

Parameters:

- `localName`: The local name of the node to retrieve.
- `namespaceURI`: The namespace Uniform Resource Identifier (URI) of the node to retrieve.

Returns: An `XmlNode` with the matching local name and namespace URI or `null` if a matching node was not found.

To be added.

## XmlNamedNodeMap.Item(Int32) method

```csharp
public virtual System.Xml.XmlNode? Item (int index);
```

Retrieves the node at the specified index in the `XmlNamedNodeMap`.

Parameters:

- `index`: The index position of the node to retrieve from the `XmlNamedNodeMap`. The index is zero-based; therefore, the index of the first node is 0 and the index of the last node is `XmlNamedNodeMap.Count` -1.

Returns: The `XmlNode` at the specified index. If `index` is less than 0 or greater than or equal to the `XmlNamedNodeMap.Count` property, `null` is returned.

#### Examples
The following example uses the `XmlAttributeCollection` class (which inherits from `XmlNamedNodeMap`) to display all the attributes of a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamedNodeMap/Count/source.cs._

## XmlNamedNodeMap.RemoveNamedItem(String) method

```csharp
public virtual System.Xml.XmlNode? RemoveNamedItem (string name);
```

Removes the node from the `XmlNamedNodeMap`.

Parameters:

- `name`: The qualified name of the node to remove. The name is matched against the `XmlNode.Name` property of the matching node.

Returns: The `XmlNode` removed from this `XmlNamedNodeMap` or `null` if a matching node was not found.

#### Examples
The following example uses the `XmlAttributeCollection` class (which inherits from `XmlNamedNodeMap`) to remove an attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamedNodeMap/RemoveNamedItem/source.cs._

## XmlNamedNodeMap.RemoveNamedItem(String, String) method

```csharp
public virtual System.Xml.XmlNode? RemoveNamedItem (string localName, string? namespaceURI);
```

Removes a node with the matching `XmlNode.LocalName` and `XmlNode.NamespaceURI`.

Parameters:

- `localName`: The local name of the node to remove.
- `namespaceURI`: The namespace URI of the node to remove.

Returns: The `XmlNode` removed or `null` if a matching node was not found.

To be added.

## XmlNamedNodeMap.SetNamedItem(XmlNode) method

```csharp
public virtual System.Xml.XmlNode? SetNamedItem (System.Xml.XmlNode? node);
```

Adds an `XmlNode` using its `XmlNode.Name` property.

Parameters:

- `node`: An `XmlNode` to store in the `XmlNamedNodeMap`. If a node with that name is already present in the map, it is replaced by the new one.

Returns: If the `node` replaces an existing node with the same name, the old node is returned; otherwise, `null` is returned.

Exceptions:

- `ArgumentException`: The `node` was created from a different `XmlDocument` than the one that created the `XmlNamedNodeMap`; or the `XmlNamedNodeMap` is read-only.

#### Examples
The following example uses the `XmlAttributeCollection` class (which inherits from `XmlNamedNodeMap`) to add an attribute to the collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamedNodeMap/SetNamedItem/source.cs._
