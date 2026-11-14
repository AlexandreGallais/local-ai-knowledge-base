---
title: "XmlNodeReader class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeReader class (part 2 of 4)

## XmlNodeReader.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: One of the `XmlNodeType` values representing the type of the current node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

#### Examples
The following example reads an XML and displays each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/Close/source.cs._

The example uses the file, `items.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNodeReader.Name Example/XML/source.xml._
## XmlNodeReader.Prefix property

```csharp
public override string Prefix { get; }
```

Gets the namespace prefix associated with the current node.

Returns: The namespace prefix associated with the current node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

#### Examples
The following example displays the local name of each node, and, if they exist, the prefix and namespace URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/LocalName/source.cs._

## XmlNodeReader.ReadState property

```csharp
public override System.Xml.ReadState ReadState { get; }
```

Gets the state of the reader.

Returns: One of the `ReadState` values.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

## XmlNodeReader.SchemaInfo property

```csharp
public override System.Xml.Schema.IXmlSchemaInfo? SchemaInfo { get; }
```

Gets the schema information that has been assigned to the current node.

Returns: An `IXmlSchemaInfo` object containing the schema information for the current node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

The `IXmlSchemaInfo` interface represents the Post Schema Validation Infoset (PSVI) of the underlying XML node. The PSVI contents of this property are set after the node has been validated.

## XmlNodeReader.Value property

```csharp
public override string Value { get; }
```

Gets the text value of the current node.

Returns: The value returned depends on the `XmlNodeReader.NodeType` of the node. The following table lists node types that have a value to return. All other node types return String.Empty.

- `Attribute`:  The value of the attribute.

- `CDATA`:  The content of the CDATA section.

- `Comment`:  The content of the comment.

- `DocumentType`:  The internal subset.

- `ProcessingInstruction`:  The entire content, excluding the target.

- `SignificantWhitespace`:  The white space between markup in a mixed content model.

- `Text`:  The content of the text node.

- `Whitespace`:  The white space between markup.

- `XmlDeclaration`:  The content of the declaration.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

#### Examples
The following example reads an XML and displays each node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/Close/source.cs._

The example uses the file, `items.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNodeReader.Name Example/XML/source.xml._
## XmlNodeReader.XmlLang property

```csharp
public override string XmlLang { get; }
```

Gets the current `xml:lang` scope.

Returns: The current `xml:lang` scope.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This property represents the xml:lang scope within which the current node resides. For example, here is an XML fragment with `xml:lang` set to US English in the root element:

```xml
<root xml:lang="en-us">
<name>Fred</name>
</root>
```

When the reader is positioned on the `name` element, you can use this property to find that it is in the scope of a US English `xml:lang` attribute.

The string returned is also in `NameTable`.

## XmlNodeReader.XmlSpace property

```csharp
public override System.Xml.XmlSpace XmlSpace { get; }
```

Gets the current `xml:space` scope.

Returns: One of the `XmlSpace` values. If no `xml:space` scope exists, this property defaults to `XmlSpace.None`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

## XmlNodeReader.Close() method

```csharp
public override void Close ();
```

Changes the `XmlNodeReader.ReadState` to `Closed`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This method also releases any resources held while reading. If `Close` has already been called, no action is performed.

#### Examples
The following example parses a file and closes the reader.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/Close/source.cs._

The example uses the file, `items.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNodeReader.Name Example/XML/source.xml._
## XmlNodeReader.GetAttribute(Int32) method

```csharp
public override string GetAttribute (int attributeIndex);
```

Gets the value of the attribute with the specified index.

Parameters:

- `attributeIndex`: The index of the attribute. The index is zero-based. (The first attribute has index 0.)

Returns: The value of the specified attribute.

Exceptions:

- `ArgumentOutOfRangeException`: `attributeIndex` is less than 0 or greater than or equal to `XmlNodeReader.AttributeCount`.

#### Remarks

The recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method.

This method does not move the reader.

## XmlNodeReader.GetAttribute(String) method

```csharp
public override string? GetAttribute (string name);
```

Gets the value of the attribute with the specified name.

Parameters:

- `name`: The qualified name of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This method does not move the reader.

If the reader is positioned on a `DocumentType` node, this method can be used to get the PUBLIC and SYSTEM literals, for example, `reader.GetAttribute("PUBLIC")`

#### Examples
The following example gets the value of the ISBN attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/GetAttribute/source.cs._

## XmlNodeReader.GetAttribute(String, String) method

```csharp
public override string? GetAttribute (string name, string? namespaceURI);
```

Gets the value of the attribute with the specified local name and namespace URI.

Parameters:

- `name`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

The following XML contains an attribute in a specific namespace:

```xml

```

You can lookup the `dt:type` attribute using one argument (prefix and local name) or two arguments (local name and namespace URI):

```csharp
String dt = reader.GetAttribute("dt:type");
String dt2 = reader.GetAttribute("type","urn:datatypes");
```

To lookup the `xmlns:dt` attribute, use one of the following arguments:

```csharp
String dt3 = reader.GetAttribute("xmlns:dt");
String dt4 = reader.GetAttribute("dt",http://www.w3.org/2000/xmlns/);
```

You can also get this information using the `Prefix` property.

## XmlNodeReader.LookupNamespace(String) method

```csharp
public override string? LookupNamespace (string prefix);
```

Resolves a namespace prefix in the current element's scope.

Parameters:

- `prefix`: The prefix whose namespace URI you want to resolve. To match the default namespace, pass an empty string. This string does not have to be atomized.

Returns: The namespace URI to which the prefix maps or `null` if no matching prefix is found.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

In the following XML string, if the reader is positioned on the `href` attribute, the prefix `a` is resolved by calling `reader.LookupNamespace("a")`. The returned string is `urn:456`.

```xml
<root xmlns:a="urn:456">
 
 
 
</root>
```

## XmlNodeReader.MoveToAttribute(Int32) method

```csharp
public override void MoveToAttribute (int attributeIndex);
```

Moves to the attribute with the specified index.

Parameters:

- `attributeIndex`: The index of the attribute.

Exceptions:

- `ArgumentOutOfRangeException`: The `i` parameter is less than 0 or greater than or equal to `XmlReader.AttributeCount`.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

#### Examples
The following example reads all the attributes on the root node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/AttributeCount/source.cs._

## XmlNodeReader.MoveToAttribute(String) method

```csharp
public override bool MoveToAttribute (string name);
```

Moves to the attribute with the specified name.

Parameters:

- `name`: The qualified name of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the reader's position does not change.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

After calling this method, the `Name`, `NamespaceURI`, and `Prefix` properties reflect the properties of that attribute.

## XmlNodeReader.MoveToAttribute(String, String) method

```csharp
public override bool MoveToAttribute (string name, string? namespaceURI);
```

Moves to the attribute with the specified local name and namespace URI.

Parameters:

- `name`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the reader's position does not change.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

After calling this method, the `Name`, `NamespaceURI`, and `Prefix` properties reflect the properties of that attribute.

## XmlNodeReader.MoveToElement() method

```csharp
public override bool MoveToElement ();
```

Moves to the element that contains the current attribute node.

Returns: `true` if the reader is positioned on an attribute (the reader moves to the element that owns the attribute); `false` if the reader is not positioned on an attribute (the position of the reader does not change).

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

Use this method to return to an element after navigating through its attributes. This method moves the reader to one of the following node types: `Element`, `DocumentType`, or `XmlDeclaration`.

#### Examples
The following example reads all the attributes on the root node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/AttributeCount/source.cs._

## XmlNodeReader.MoveToFirstAttribute() method

```csharp
public override bool MoveToFirstAttribute ();
```

Moves to the first attribute.

Returns: `true` if an attribute exists (the reader moves to the first attribute); otherwise, `false` (the position of the reader does not change).

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method.

#### Examples
The following example gets the value of the first attribute of the root node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/MoveToFirstAttribute/source.cs._
