---
title: "XmlValidatingReader class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlValidatingReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlValidatingReader class (part 2 of 2)

## XmlValidatingReader.MoveToAttribute(Int32) method

```csharp
public override void MoveToAttribute (int i);
```

Moves to the attribute with the specified index.

Parameters:

- `i`: The index of the attribute.

Exceptions:

- `ArgumentOutOfRangeException`: The `i` parameter is less than 0 or greater than or equal to `XmlReader.AttributeCount`.

To be added.

## XmlValidatingReader.MoveToAttribute(String) method

```csharp
public override bool MoveToAttribute (string name);
```

Moves to the attribute with the specified name.

Parameters:

- `name`: The qualified name of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the position of the reader does not change.

To be added.

## XmlValidatingReader.MoveToAttribute(String, String) method

```csharp
public override bool MoveToAttribute (string localName, string? namespaceURI);
```

Moves to the attribute with the specified local name and namespace Uniform Resource Identifier (URI).

Parameters:

- `localName`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the position of the reader does not change.

To be added.

## XmlValidatingReader.MoveToElement() method

```csharp
public override bool MoveToElement ();
```

Moves to the element that contains the current attribute node.

Returns: `true` if the reader is positioned on an attribute (the reader moves to the element that owns the attribute); `false` if the reader is not positioned on an attribute (the position of the reader does not change).

To be added.

## XmlValidatingReader.MoveToFirstAttribute() method

```csharp
public override bool MoveToFirstAttribute ();
```

Moves to the first attribute.

Returns: `true` if an attribute exists (the reader moves to the first attribute); otherwise, `false` (the position of the reader does not change).

To be added.

## XmlValidatingReader.MoveToNextAttribute() method

```csharp
public override bool MoveToNextAttribute ();
```

Moves to the next attribute.

Returns: `true` if there is a next attribute; `false` if there are no more attributes.

To be added.

## XmlValidatingReader.Read() method

```csharp
public override bool Read ();
```

Reads the next node from the stream.

Returns: `true` if the next node was read successfully; `false` if there are no more nodes to read.

To be added.

## XmlValidatingReader.ReadAttributeValue() method

```csharp
public override bool ReadAttributeValue ();
```

Parses the attribute value into one or more `Text`, `EntityReference`, or `EndEntity` nodes.

Returns: `true` if there are nodes to return.

`false` if the reader is not positioned on an attribute node when the initial call is made or if all the attribute values have been read.

An empty attribute, such as, `misc=""`, returns `true` with a single node with a value of String.Empty.

To be added.

## XmlValidatingReader.ReadContentAsBase64(Byte[], Int32, Int32) method

```csharp
public override int ReadContentAsBase64 (byte[] buffer, int index, int count);
```

Reads the content and returns the Base64 decoded binary bytes.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: `XmlValidatingReader.ReadContentAsBase64` is not supported on the current node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.

To be added.

## XmlValidatingReader.ReadContentAsBinHex(Byte[], Int32, Int32) method

```csharp
public override int ReadContentAsBinHex (byte[] buffer, int index, int count);
```

Reads the content and returns the BinHex decoded binary bytes.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: `XmlValidatingReader.ReadContentAsBinHex` is not supported on the current node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlValidatingReader` implementation does not support this method.

To be added.

## XmlValidatingReader.ReadElementContentAsBase64(Byte[], Int32, Int32) method

```csharp
public override int ReadElementContentAsBase64 (byte[] buffer, int index, int count);
```

Reads the element and decodes the Base64 content.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: The current node is not an element node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlValidatingReader` implementation does not support this method.
- `XmlException`: The element contains mixed-content.
- `FormatException`: The content cannot be converted to the requested type.

To be added.

## XmlValidatingReader.ReadElementContentAsBinHex(Byte[], Int32, Int32) method

```csharp
public override int ReadElementContentAsBinHex (byte[] buffer, int index, int count);
```

Reads the element and decodes the BinHex content.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: The current node is not an element node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlValidatingReader` implementation does not support this method.
- `XmlException`: The element contains mixed-content.
- `FormatException`: The content cannot be converted to the requested type.

To be added.

## XmlValidatingReader.ReadString() method

```csharp
public override string ReadString ();
```

Reads the contents of an element or text node as a string.

Returns: The contents of the element or text node. This can be an empty string if the reader is positioned on something other than an element or text node, or if there is no more text content to return in the current context.

To be added.

## XmlValidatingReader.ReadTypedValue() method

```csharp
public object? ReadTypedValue ();
```

Gets the common language runtime type for the specified XML Schema definition language (XSD) type.

Returns: The common language runtime type for the specified XML Schema type.

To be added.

## XmlValidatingReader.ResolveEntity() method

```csharp
public override void ResolveEntity ();
```

Resolves the entity reference for `EntityReference` nodes.

Exceptions:

- `InvalidOperationException`: The reader is not positioned on an `EntityReference` node.

To be added.

## XmlValidatingReader.System.Xml.IXmlNamespaceResolver.GetNamespacesInScope(XmlNamespaceScope) method

```csharp
System.Collections.Generic.IDictionary<string,string> IXmlNamespaceResolver.GetNamespacesInScope (System.Xml.XmlNamespaceScope scope);
```

For a description of this member, see `IXmlNamespaceResolver.GetNamespacesInScope`.

Parameters:

- `scope`: An `XmlNamespaceScope` object that identifies the scope of the reader.

Returns: An `IDictionary` object that identifies the namespaces in scope.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlValidatingReader` instance is cast to an `IXmlNamespaceResolver` interface.

## XmlValidatingReader.System.Xml.IXmlNamespaceResolver.LookupNamespace(String) method

```csharp
string IXmlNamespaceResolver.LookupNamespace (string prefix);
```

For a description of this member, see `IXmlNamespaceResolver.LookupNamespace`.

Parameters:

- `prefix`: The namespace prefix.

Returns: A string value that contains the namespace Uri that is associated with the prefix.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlValidatingReader` instance is cast to an `IXmlNamespaceResolver` interface.

## XmlValidatingReader.System.Xml.IXmlNamespaceResolver.LookupPrefix(String) method

```csharp
string IXmlNamespaceResolver.LookupPrefix (string namespaceName);
```

For a description of this member, see `IXmlNamespaceResolver.LookupPrefix`.

Parameters:

- `namespaceName`: The namespace that is associated with the prefix.

Returns: A string value that contains the namespace prefix that is associated with the `namespaceName`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlValidatingReader` instance is cast to an `IXmlNamespaceResolver` interface.

## XmlValidatingReader.ValidationEventHandler event

```csharp
public event System.Xml.Schema.ValidationEventHandler ValidationEventHandler;
```

Sets an event handler for receiving information about document type definition (DTD), XML-Data Reduced (XDR) schema, and XML Schema definition language (XSD) schema validation errors.

To be added.
