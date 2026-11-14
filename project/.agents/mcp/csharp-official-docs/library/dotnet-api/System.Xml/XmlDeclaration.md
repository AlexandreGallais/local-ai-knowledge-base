---
title: "XmlDeclaration class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDeclaration.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDeclaration class

Namespace: `System.Xml`

```csharp
public class XmlDeclaration : System.Xml.XmlLinkedNode
```

Represents the XML declaration node <?xml version='1.0'...?>.

#### Remarks
This class is a Microsoft extension to the Document Object Model (DOM).

## XmlDeclaration.XmlDeclaration(String, String, String, XmlDocument) constructor

```csharp
protected internal XmlDeclaration (string version, string? encoding, string? standalone, System.Xml.XmlDocument doc);
```

Initializes a new instance of the `XmlDeclaration` class.

Parameters:

- `version`: The XML version; see the `XmlDeclaration.Version` property.
- `encoding`: The encoding scheme; see the `XmlDeclaration.Encoding` property.
- `standalone`: Indicates whether the XML document depends on an external DTD; see the `XmlDeclaration.Standalone` property.
- `doc`: The parent XML document.

#### Remarks
Do not instantiate an `XmlDeclaration` directly; instead, use methods such as `XmlDocument.CreateNode`.

## XmlDeclaration.Encoding property

```csharp
public string Encoding { get; set; }
```

Gets or sets the encoding level of the XML document.

Returns: The valid character encoding name. The most commonly supported character encoding names for XML are the following:

-  Unicode

:  UTF-8, UTF-16

-  ISO 10646

:  ISO-10646-UCS-2, ISO-10646-UCS-4

-  ISO 8859

:  ISO-8859-n (where "n" is a digit from 1 to 9)

-  JIS X-0208-1997

:  ISO-2022-JP, Shift_JIS, EUC-JP

This value is optional. If a value is not set, this property returns String.Empty.

If an encoding attribute is not included, UTF-8 encoding is assumed when the document is written or saved out.

#### Remarks
Unlike most XML attributes, encoding attribute values are not case-sensitive. This is because encoding character names follow ISO and Internet Assigned Numbers Authority (IANA) standards.

#### Examples
The following example creates an `XmlDeclaration` node and adds it to an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDeclaration/Encoding/source.cs._

## XmlDeclaration.InnerText property

```csharp
public override string InnerText { get; set; }
```

Gets or sets the concatenated values of the `XmlDeclaration`.

Returns: The concatenated values of the `XmlDeclaration` (that is, everything between `<?xml` and `?>`).

To be added.

## XmlDeclaration.LocalName property

```csharp
public override string LocalName { get; }
```

Gets the local name of the node.

Returns: For `XmlDeclaration` nodes, the local name is `xml`.

To be added.

## XmlDeclaration.Name property

```csharp
public override string Name { get; }
```

Gets the qualified name of the node.

Returns: For `XmlDeclaration` nodes, the name is `xml`.

To be added.

## XmlDeclaration.NodeType property

```csharp
public override System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the current node.

Returns: For `XmlDeclaration` nodes, this value is XmlNodeType.XmlDeclaration.

To be added.

## XmlDeclaration.Standalone property

```csharp
public string Standalone { get; set; }
```

Gets or sets the value of the standalone attribute.

Returns: Valid values are `yes` if all entity declarations required by the XML document are contained within the document or `no` if an external document type definition (DTD) is required. If a standalone attribute is not present in the XML declaration, this property returns String.Empty.

#### Examples
The following example creates an `XmlDeclaration` node and adds it to an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDeclaration/Standalone/source.cs._

## XmlDeclaration.Value property

```csharp
public override string? Value { get; set; }
```

Gets or sets the value of the `XmlDeclaration`.

Returns: The contents of the `XmlDeclaration` (that is, everything between `<?xml` and `?>`).

To be added.

## XmlDeclaration.Version property

```csharp
public string Version { get; }
```

Gets the XML version of the document.

Returns: The value is always `1.0`.

To be added.

## XmlDeclaration.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of this node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself. Because `XmlDeclaration` nodes do not have children, the cloned node always includes the data value, regardless of the parameter setting.

Returns: The cloned node.

#### Remarks
`CloneNode` serves as a copy constructor for nodes. To see how this method behaves with other node types, see `XmlNode.CloneNode`.

The cloned node has no parent (`ParentNode` returns `null`).

## XmlDeclaration.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter w);
```

Saves the children of the node to the specified `XmlWriter`. Because `XmlDeclaration` nodes do not have children, this method has no effect.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

To be added.

## XmlDeclaration.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
The value of the encoding and standalone attributes are determined by the `Encoding` and `Standalone` properties. If either of the properties is not set, the corresponding attribute is not written. The version attribute is always written out with a value of 1.0.
