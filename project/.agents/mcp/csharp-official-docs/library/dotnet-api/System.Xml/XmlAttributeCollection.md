---
title: "XmlAttributeCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlAttributeCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttributeCollection class

Namespace: `System.Xml`

```csharp
public sealed class XmlAttributeCollection : System.Xml.XmlNamedNodeMap, System.Collections.ICollection
```

Represents a collection of attributes that can be accessed by name or index.

#### Remarks
`XmlAttributeCollection` extends the `XmlNamedNodeMap` class by adding strongly typed helper methods. You can use this class to add, remove, or modify attributes in the collection. `XmlAttributeCollection` is returned by the `Attributes` property.

## XmlAttributeCollection.ItemOf property

```csharp
public System.Xml.XmlAttribute this[int i] { get; }
```

Gets the attribute with the specified index.

Parameters:

- `i`: The index of the attribute.

Returns: The attribute at the specified index.

Exceptions:

- `IndexOutOfRangeException`: The index being passed in is out of range.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM). It is equivalent to calling `XmlNamedNodeMap.Item`.

#### Examples
The following example displays all the attributes in the collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/ItemOf/source1.cs._

## XmlAttributeCollection.ItemOf property

```csharp
public System.Xml.XmlAttribute? this[string name] { get; }
```

Gets the attribute with the specified name.

Parameters:

- `name`: The qualified name of the attribute.

Returns: The attribute with the specified name. If the attribute does not exist, this property returns `null`.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM). It is equivalent to calling `XmlNamedNodeMap.GetNamedItem`.

#### Examples
The following example removes an attribute from the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/ItemOf/source.cs._

## XmlAttributeCollection.ItemOf property

```csharp
public System.Xml.XmlAttribute? this[string localName, string? namespaceURI] { get; }
```

Gets the attribute with the specified local name and namespace Uniform Resource Identifier (URI).

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The attribute with the specified local name and namespace URI. If the attribute does not exist, this property returns `null`.

#### Remarks
This property is a Microsoft extension to the Document Object Model (DOM). It is equivalent to calling `XmlNamedNodeMap.GetNamedItem`.

## XmlAttributeCollection.System.Collections.ICollection.Count property

```csharp
int System.Collections.ICollection.Count { get; }
```

For a description of this member, see `XmlAttributeCollection.System#Collections#ICollection#Count`.

Returns: An `int` that contains the count of the attributes.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlAttributeCollection` instance is cast to an `ICollection` interface.

## XmlAttributeCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

For a description of this member, see `XmlAttributeCollection.System#Collections#ICollection#IsSynchronized`.

Returns: `true` if the collection is synchronized.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlAttributeCollection` instance is cast to an `ICollection` interface.

## XmlAttributeCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

For a description of this member, see `XmlAttributeCollection.System#Collections#ICollection#SyncRoot`.

Returns: The `Object` that is the root of the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlAttributeCollection` instance is cast to an `ICollection` interface.

## XmlAttributeCollection.Append(XmlAttribute) method

```csharp
public System.Xml.XmlAttribute Append (System.Xml.XmlAttribute node);
```

Inserts the specified attribute as the last node in the collection.

Parameters:

- `node`: The attribute to insert.

Returns: The `XmlAttribute` to append to the collection.

Exceptions:

- `ArgumentException`: `node` was created from a document different from the one that created this collection.

#### Remarks
If an attribute with the same name is already present in the collection, the original attribute is removed from the collection and `node` is added to the end of the collection.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new attribute to a document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/Append/source.cs._

## XmlAttributeCollection.CopyTo(XmlAttribute[], Int32) method

```csharp
public void CopyTo (System.Xml.XmlAttribute[] array, int index);
```

Copies all the `XmlAttribute` objects from this collection into the given array.

Parameters:

- `array`: The array that is the destination of the objects copied from this collection.
- `index`: The index in the array where copying begins.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example uses `CopyTo` to copy all the attributes in the collection into an array.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/CopyTo/source.cs._

## XmlAttributeCollection.InsertAfter(XmlAttribute, XmlAttribute) method

```csharp
public System.Xml.XmlAttribute InsertAfter (System.Xml.XmlAttribute newNode, System.Xml.XmlAttribute? refNode);
```

Inserts the specified attribute immediately after the specified reference attribute.

Parameters:

- `newNode`: The attribute to insert.
- `refNode`: The reference attribute. `newNode` is placed after the `refNode`.

Returns: The `XmlAttribute` to insert into the collection.

Exceptions:

- `ArgumentException`: The `newNode` was created from a document different from the one that created this collection. Or the `refNode` is not a member of this collection.

#### Remarks
If an attribute with the same name is already present in the collection, the original attribute is removed from the collection and `newNode` is inserted into the collection. If `refNode` is `null`, `newNode` is inserted at the beginning of the collection.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new attribute to a document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/InsertAfter/source.cs._

## XmlAttributeCollection.InsertBefore(XmlAttribute, XmlAttribute) method

```csharp
public System.Xml.XmlAttribute InsertBefore (System.Xml.XmlAttribute newNode, System.Xml.XmlAttribute? refNode);
```

Inserts the specified attribute immediately before the specified reference attribute.

Parameters:

- `newNode`: The attribute to insert.
- `refNode`: The reference attribute. `newNode` is placed before the `refNode`.

Returns: The `XmlAttribute` to insert into the collection.

Exceptions:

- `ArgumentException`: The `newNode` was created from a document different from the one that created this collection. Or the `refNode` is not a member of this collection.

#### Remarks
If an attribute with the same name is already present in the collection, the original attribute is removed from the collection and `newNode` is inserted into the collection. If `refNode` is `null`, `newNode` is inserted at the end of the collection.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new attribute to a document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/InsertBefore/source.cs._

## XmlAttributeCollection.Prepend(XmlAttribute) method

```csharp
public System.Xml.XmlAttribute Prepend (System.Xml.XmlAttribute node);
```

Inserts the specified attribute as the first node in the collection.

Parameters:

- `node`: The attribute to insert.

Returns: The `XmlAttribute` added to the collection.

#### Remarks
If an attribute with the same name is already present in the collection, the original attribute is removed from the collection and `node` is added to the beginning of the collection.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds a new attribute to a document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/Prepend/source.cs._

## XmlAttributeCollection.Remove(XmlAttribute) method

```csharp
public System.Xml.XmlAttribute? Remove (System.Xml.XmlAttribute? node);
```

Removes the specified attribute from the collection.

Parameters:

- `node`: The attribute to remove.

Returns: The node removed or `null` if it is not found in the collection.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example removes an attribute from the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/ItemOf/source.cs._

## XmlAttributeCollection.RemoveAll() method

```csharp
public void RemoveAll ();
```

Removes all attributes from the collection.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example removes all attributes from the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/RemoveAll/source.cs._

## XmlAttributeCollection.RemoveAt(Int32) method

```csharp
public System.Xml.XmlAttribute? RemoveAt (int i);
```

Removes the attribute corresponding to the specified index from the collection.

Parameters:

- `i`: The index of the node to remove. The first node has index 0.

Returns: Returns `null` if there is no attribute at the specified index.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example removes an attribute from the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/RemoveAt/source.cs._

## XmlAttributeCollection.SetNamedItem(XmlNode) method

```csharp
public override System.Xml.XmlNode? SetNamedItem (System.Xml.XmlNode? node);
```

Adds a `XmlNode` using its `XmlNode.Name` property.

Parameters:

- `node`: An attribute node to store in this collection. The node will later be accessible using the name of the node. If a node with that name is already present in the collection, it is replaced by the new one; otherwise, the node is appended to the end of the collection.

Returns: If the `node` replaces an existing node with the same name, the old node is returned; otherwise, the added node is returned.

Exceptions:

- `ArgumentException`: `node` was created from a different `XmlDocument` than the one that created this collection.

This `XmlAttributeCollection` is read-only.
- `InvalidOperationException`: `node` is an `XmlAttribute` that is already an attribute of another `XmlElement` object. To re-use attributes in other elements, you must clone the `XmlAttribute` objects you want to re-use.

#### Examples
The following example adds a new attribute to a document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlAttributeCollection/SetNamedItem/source.cs._

## XmlAttributeCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

For a description of this member, see `XmlAttributeCollection.CopyTo`.

Parameters:

- `array`: The array that is the destination of the objects copied from this collection.
- `index`: The index in the array where copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlAttributeCollection` instance is cast to an `ICollection` interface.
