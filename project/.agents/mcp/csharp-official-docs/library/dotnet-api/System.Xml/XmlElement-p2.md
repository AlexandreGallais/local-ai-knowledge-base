---
title: "XmlElement class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlElement class (part 2 of 2)

## XmlElement.HasAttribute(String, String) method

```csharp
public virtual bool HasAttribute (string localName, string? namespaceURI);
```

Determines whether the current node has an attribute with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the attribute to find.
- `namespaceURI`: The namespace URI of the attribute to find.

Returns: `true` if the current node has the specified attribute; otherwise, `false`.

To be added.

## XmlElement.RemoveAll() method

```csharp
public override void RemoveAll ();
```

Removes all specified attributes and children of the current node. Default attributes are not removed.

#### Examples
The following example removes all attributes and child nodes from the root element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/RemoveAll/source.cs._

## XmlElement.RemoveAllAttributes() method

```csharp
public virtual void RemoveAllAttributes ();
```

Removes all specified attributes from the element. Default attributes are not removed.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example removes all attributes from the root element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/RemoveAllAttributes/source.cs._

## XmlElement.RemoveAttribute(String) method

```csharp
public virtual void RemoveAttribute (string name);
```

Removes an attribute by name.

Parameters:

- `name`: The name of the attribute to remove. This is a qualified name. It is matched against the `Name` property of the matching node.

Exceptions:

- `ArgumentException`: The node is read-only.

#### Remarks
If the removed attribute is known to have a default value, an attribute immediately appears containing the default value and, if applicable, the corresponding namespace URI, local name, and prefix.

#### Examples
The following example removes an attribute from an element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/RemoveAttribute/source.cs._

## XmlElement.RemoveAttribute(String, String) method

```csharp
public virtual void RemoveAttribute (string localName, string? namespaceURI);
```

Removes an attribute with the specified local name and namespace URI. (If the removed attribute has a default value, it is immediately replaced).

Parameters:

- `localName`: The local name of the attribute to remove.
- `namespaceURI`: The namespace URI of the attribute to remove.

Exceptions:

- `ArgumentException`: The node is read-only.

#### Remarks
If the removed attribute is known to have a default value, an attribute immediately appears containing the default value and, if applicable, the corresponding namespace URI, local name, and prefix.

#### Examples
The following example removes an attribute from an element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/RemoveAttribute/source1.cs._

## XmlElement.RemoveAttributeAt(Int32) method

```csharp
public virtual System.Xml.XmlNode? RemoveAttributeAt (int i);
```

Removes the attribute node with the specified index from the element. (If the removed attribute has a default value, it is immediately replaced).

Parameters:

- `i`: The index of the node to remove. The first node has index 0.

Returns: The attribute node removed or `null` if there is no node at the given index.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example removes an attribute from an element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/RemoveAttributeAt/source.cs._

## XmlElement.RemoveAttributeNode(XmlAttribute) method

```csharp
public virtual System.Xml.XmlAttribute? RemoveAttributeNode (System.Xml.XmlAttribute oldAttr);
```

Removes the specified `XmlAttribute`.

Parameters:

- `oldAttr`: The `XmlAttribute` node to remove. If the removed attribute has a default value, it is immediately replaced.

Returns: The removed `XmlAttribute` or `null` if `oldAttr` is not an attribute node of the `XmlElement`.

Exceptions:

- `ArgumentException`: This node is read-only.

To be added.

## XmlElement.RemoveAttributeNode(String, String) method

```csharp
public virtual System.Xml.XmlAttribute? RemoveAttributeNode (string localName, string? namespaceURI);
```

Removes the `XmlAttribute` specified by the local name and namespace URI. (If the removed attribute has a default value, it is immediately replaced).

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The removed `XmlAttribute` or `null` if the `XmlElement` does not have a matching attribute node.

Exceptions:

- `ArgumentException`: This node is read-only.

#### Examples
The following example removes an attribute from an element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/RemoveAttributeNode/source.cs._

## XmlElement.SetAttribute(String, String) method

```csharp
public virtual void SetAttribute (string name, string? value);
```

Sets the value of the attribute with the specified name.

Parameters:

- `name`: The name of the attribute to create or alter. This is a qualified name. If the name contains a colon it is parsed into prefix and local name components.
- `value`: The value to set for the attribute.

Exceptions:

- `XmlException`: The specified name contains an invalid character.
- `ArgumentException`: The node is read-only.

#### Remarks
If an attribute with the same name is already present in the element, its value is changed to that of `value`. `value` is a simple string. It is not parsed as it is being set. Any markup, such as syntax to be recognized as an entity reference, is treated as literal text and needs to be properly escaped by the implementation when it is written out. In order to assign an attribute value that contains entity references, the user must create an `XmlAttribute` node plus any `XmlText` and `XmlEntityReference` nodes, build the appropriate subtree and use `XmlElement.SetAttributeNode` to assign it as the value of an attribute.

## XmlElement.SetAttribute(String, String, String) method

```csharp
public virtual string? SetAttribute (string localName, string? namespaceURI, string? value);
```

Sets the value of the attribute with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.
- `value`: The value to set for the attribute.

Returns: The attribute value.

To be added.

## XmlElement.SetAttributeNode(XmlAttribute) method

```csharp
public virtual System.Xml.XmlAttribute? SetAttributeNode (System.Xml.XmlAttribute newAttr);
```

Adds the specified `XmlAttribute`.

Parameters:

- `newAttr`: The `XmlAttribute` node to add to the attribute collection for this element.

Returns: If the attribute replaces an existing attribute with the same name, the old `XmlAttribute` is returned; otherwise, `null` is returned.

Exceptions:

- `ArgumentException`: The `newAttr` was created from a different document than the one that created this node. Or this node is read-only.
- `InvalidOperationException`: The `newAttr` is already an attribute of another `XmlElement` object. You must explicitly clone `XmlAttribute` nodes to re-use them in other `XmlElement` objects.

#### Remarks
If an attribute with that name is already present in the element, it is replaced by the new one.

## XmlElement.SetAttributeNode(String, String) method

```csharp
public virtual System.Xml.XmlAttribute SetAttributeNode (string localName, string? namespaceURI);
```

Adds the specified `XmlAttribute`.

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The `XmlAttribute` to add.

#### Remarks
The `XmlAttribute` does not have any children. Use `Value` to assign a text value to the attribute or use `XmlNode.AppendChild` (or a similar method) to add children to the attribute.

#### Examples
The following example adds an attribute to an element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/SetAttributeNode/source.cs._

## XmlElement.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves all the children of the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example displays the contents of the element to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/WriteContentTo/source.cs._

## XmlElement.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the current node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples
The following example adds an attribute to an element and then displays the modified element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/WriteTo/source.cs._
