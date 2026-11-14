---
title: "XmlTextReader class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextReader class (part 4 of 6)

## XmlTextReader.XmlResolver property

```csharp
public System.Xml.XmlResolver? XmlResolver { set; }
```

Sets the `XmlResolver` used for resolving DTD references.

Returns: The `XmlResolver` to use. If set to `null`, external resources are not resolved.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

The reader uses `XmlResolver` to resolve the location of the file loaded into the reader and also to resolve DTD references. For example, if your XML included the DOCTYPE declaration, `<!DOCTYPE book SYSTEM book.dtd>` the reader resolves this external file and ensures that the DTD is well-formed. The reader does not use the DTD for validation.

This property can be changed at any time and takes effect on the next read operation. If this property is set to `null`, any external DTD references encountered by the reader are not resolved.

#### Examples
The following example uses the `XmlResolver` property to specify the credentials <example-value> to access the networked file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/XmlResolver/rdr_resolver.cs._

## XmlTextReader.XmlSpace property

```csharp
public override System.Xml.XmlSpace XmlSpace { get; }
```

Gets the current `xml:space` scope.

Returns: One of the `XmlSpace` values. If no `xml:space` scope exists, this property defaults to `XmlSpace.None`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

#### Examples
The following example parses a file and returns significant white space if an `xml:space='preserve'` scope is found.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/XmlSpace/readspace.cs._

The example uses the file, `authors.xml`, as input.

## XmlTextReader.Close() method

```csharp
public override void Close ();
```

Changes the `XmlReader.ReadState` to `Closed`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method also releases any resources held while reading. If this reader was constructed using a stream, this method also calls `Close` on the underlying stream.

If `Close` has already been called, no action is performed.

## XmlTextReader.GetAttribute(Int32) method

```csharp
public override string GetAttribute (int i);
```

Gets the value of the attribute with the specified index.

Parameters:

- `i`: The index of the attribute. The index is zero-based. (The first attribute has index 0.)

Returns: The value of the specified attribute.

Exceptions:

- `ArgumentOutOfRangeException`: The `i` parameter is less than 0 or greater than or equal to `XmlTextReader.AttributeCount`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method does not move the reader.

## XmlTextReader.GetAttribute(String) method

```csharp
public override string? GetAttribute (string name);
```

Gets the value of the attribute with the specified name.

Parameters:

- `name`: The qualified name of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method does not move the reader.

If the reader is positioned on a `DocumentType` node, this method can be used to get the PUBLIC and SYSTEM literals, for example, `reader.GetAttribute("PUBLIC")`

#### Examples
The following example gets the value of the ISBN attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/GetAttribute/source.cs._

The example uses the file, `attrs.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.GetAttribute1 Example/XML/source.xml._
## XmlTextReader.GetAttribute(String, String) method

```csharp
public override string? GetAttribute (string localName, string? namespaceURI);
```

Gets the value of the attribute with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned. This method does not move the reader.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

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

## XmlTextReader.GetNamespacesInScope(XmlNamespaceScope) method

```csharp
public System.Collections.Generic.IDictionary<string,string> GetNamespacesInScope (System.Xml.XmlNamespaceScope scope);
```

Gets a collection that contains all namespaces currently in-scope.

Parameters:

- `scope`: An `XmlNamespaceScope` value that specifies the type of namespace nodes to return.

Returns: An `IDictionary` object that contains all the current in-scope namespaces. If the reader is not positioned on an element, an empty dictionary (no namespaces) is returned.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

The dictionary consists of a collection of namespace names keyed by prefix. It can be used to enumerate the in-scope namespaces. The dictionary is a disconnected copy of the namespace list of the reader. It remains unchanged as the reader position, current in-scope namespace list, changes.

The following table describes how the `XmlNamespaceScope` enumeration value affects the whether or not the default and built-in namespaces are returned by `XmlTextReader.GetNamespacesInScope`.

|XmlNamespaceScope Value|xmlns:xml|xmlns:xmlns|xmlns=""|
|-----------------------------|---------------|-----------------|---------------|
|`All`|yes|no|no|
|`ExcludeXml`|no|no|no|
|`Local`|no|no|yes|

## XmlTextReader.GetRemainder() method

```csharp
public System.IO.TextReader GetRemainder ();
```

Gets the remainder of the buffered XML.

Returns: A `TextReader` containing the remainder of the buffered XML.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

Because `XmlTextReader` does a buffered `Read`, it must be able to return the remainder of the unused buffer so that no data is lost. This allows protocols (such as multi-part MIME) to package XML in the same stream as other things.

After calling this method, `EOF` is set to `true`.

#### Examples
The following example reads the first part of an XML document and then uses `GetRemainder` to complete reading the document using a second reader.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/GetRemainder/source.cs._

The example uses the input file `tworeads.xml`.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.GetRemainder Example/XML/source.xml._
## XmlTextReader.HasLineInfo() method

```csharp
public bool HasLineInfo ();
```

Gets a value indicating whether the class can return line information.

Returns: `true` if the class can return line information; otherwise, `false`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

## XmlTextReader.LookupNamespace(String) method

```csharp
public override string? LookupNamespace (string prefix);
```

Resolves a namespace prefix in the current element's scope.

Parameters:

- `prefix`: The prefix whose namespace URI you want to resolve. To match the default namespace, pass an empty string. This string does not have to be atomized.

Returns: The namespace URI to which the prefix maps or `null` if no matching prefix is found.

Exceptions:

- `ArgumentNullException`: The `XmlTextReader.Namespaces` property is set to `true` and the `prefix` value is `null`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

In the following XML, if the reader is positioned on the `href` attribute, the prefix `a` is resolved by calling `reader.LookupNamespace("a")`. The returned string is `urn:456`.

```xml
<root xmlns:a="urn:456">
 
 
 
</root>
```

## XmlTextReader.MoveToAttribute(Int32) method

```csharp
public override void MoveToAttribute (int i);
```

Moves to the attribute with the specified index.

Parameters:

- `i`: The index of the attribute.

Exceptions:

- `ArgumentOutOfRangeException`: The `i` parameter is less than 0 or greater than or equal to `XmlReader.AttributeCount`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/AttributeCount/source.cs._

## XmlTextReader.MoveToAttribute(String) method

```csharp
public override bool MoveToAttribute (string name);
```

Moves to the attribute with the specified name.

Parameters:

- `name`: The qualified name of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the reader's position does not change.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

After calling `MoveToAttribute`, the `Name`, `NamespaceURI`, and `Prefix` properties reflects the properties of that attribute.

## XmlTextReader.MoveToAttribute(String, String) method

```csharp
public override bool MoveToAttribute (string localName, string? namespaceURI);
```

Moves to the attribute with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the reader's position does not change.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

After calling `MoveToAttribute`, the `Name`, `NamespaceURI`, and `Prefix` properties reflects the properties of that attribute.

## XmlTextReader.MoveToElement() method

```csharp
public override bool MoveToElement ();
```

Moves to the element that contains the current attribute node.

Returns: `true` if the reader is positioned on an attribute (the reader moves to the element that owns the attribute); `false` if the reader is not positioned on an attribute (the position of the reader does not change).

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

Use this method to return to an element after navigating through its attributes. This method moves the reader to one of the following node types: `Element`, `DocumentType`, or `XmlDeclaration`.

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/AttributeCount/source.cs._

## XmlTextReader.MoveToFirstAttribute() method

```csharp
public override bool MoveToFirstAttribute ();
```

Moves to the first attribute.

Returns: `true` if an attribute exists (the reader moves to the first attribute); otherwise, `false` (the position of the reader does not change).

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

#### Examples
The following example gets the value of the first attribute of the root node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/MoveToFirstAttribute/source.cs._

The example uses the file, `attrs.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.MoveToFirstAttribute Example/XML/source.xml._
## XmlTextReader.MoveToNextAttribute() method

```csharp
public override bool MoveToNextAttribute ();
```

Moves to the next attribute.

Returns: `true` if there is a next attribute; `false` if there are no more attributes.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

If the current node is an element node, this method is equivalent to `XmlTextReader.MoveToFirstAttribute`. If `MoveToNextAttribute` returns `true`, the reader moves to the next attribute; otherwise, the position of the reader does not change.

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/MoveToNextAttribute/source.cs._
