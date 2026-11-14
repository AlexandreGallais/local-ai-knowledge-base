---
title: "XmlDictionaryReader class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryReader class (part 2 of 5)

## XmlDictionaryReader.CreateMtomReader(Byte[], Int32, Int32, Encoding[], String, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (byte[] buffer, int offset, int count, System.Text.Encoding[] encodings, string? contentType, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `encodings`: The possible character encodings of the input.
- `contentType`: The Content-Type MIME type of the message.
- `quotas`: The quotas to apply to this reader.

Returns: An instance of `XmlDictionaryReader`.

#### Remarks
This method reads from a buffer with a specified offset and count, using one of the character encodings specified by `encodings`, an array of instances of `Encoding`. The message is of the specified MIME type. If `contentType` is `null`, the Content-Type MIME header must be present in the message.

## XmlDictionaryReader.CreateMtomReader(Stream, Encoding[], String, XmlDictionaryReaderQuotas, Int32, OnXmlDictionaryReaderClose) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (System.IO.Stream stream, System.Text.Encoding[] encodings, string? contentType, System.Xml.XmlDictionaryReaderQuotas quotas, int maxBufferSize, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `stream`: The stream from which to read.
- `encodings`: The possible character encodings of the stream.
- `contentType`: The Content-Type MIME type of the message.
- `quotas`: The MIME type of the message.
- `maxBufferSize`: The `XmlDictionaryReaderQuotas` to apply to the reader.
- `onClose`: The delegate to be called when the reader is closed.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
This method reads from a stream, using one of the character encodings specified by `encodings`, an array of instances of `Encoding`. The message is of the specified MIME type. If `contentType` is `null`, the Content-Type MIME header must be present in the message.

## XmlDictionaryReader.CreateMtomReader(Byte[], Int32, Int32, Encoding[], String, XmlDictionaryReaderQuotas, Int32, OnXmlDictionaryReaderClose) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (byte[] buffer, int offset, int count, System.Text.Encoding[] encodings, string? contentType, System.Xml.XmlDictionaryReaderQuotas quotas, int maxBufferSize, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `encodings`: The possible character encodings of the input.
- `contentType`: The Content-Type MIME type of the message.
- `quotas`: The `XmlDictionaryReaderQuotas` to apply to the reader.
- `maxBufferSize`: The maximum allowed size of the buffer.
- `onClose`: The delegate to be called when the reader is closed.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
This method reads from a buffer with a specified offset and count, using one of the character encodings specified by `encodings`, an array of instances of `Encoding`. The message is of the specified MIME type. If `contentType` is `null`, the Content-Type MIME header must be present in the message.

## XmlDictionaryReader.CreateTextReader(Byte[], XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateTextReader (byte[] buffer, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader`.

Parameters:

- `buffer`: The buffer from which to read.
- `quotas`: The quotas applied to the reader.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

#### Remarks
The reader created is optimized for reading UTF-8 text.

## XmlDictionaryReader.CreateTextReader(Stream, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateTextReader (System.IO.Stream stream, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader`.

Parameters:

- `stream`: The stream from which to read.
- `quotas`: The quotas applied to the reader.

Returns: An instance of `XmlDictionaryReader`.

#### Remarks
The reader created is optimized for reading UTF-8 text.

## XmlDictionaryReader.CreateTextReader(Byte[], Int32, Int32, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateTextReader (byte[] buffer, int offset, int count, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader`.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `quotas`: The quotas applied to the reader.

Returns: An instance of `XmlDictionaryReader`.

#### Remarks
The reader created is optimized for reading UTF-8 text.

## XmlDictionaryReader.CreateTextReader(Stream, Encoding, XmlDictionaryReaderQuotas, OnXmlDictionaryReaderClose) method

```csharp
public static System.Xml.XmlDictionaryReader CreateTextReader (System.IO.Stream stream, System.Text.Encoding? encoding, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Creates an instance of `XmlDictionaryReader`.

Parameters:

- `stream`: The stream from which to read.
- `encoding`: The `Encoding` object that specifies the encoding properties to apply.
- `quotas`: The `XmlDictionaryReaderQuotas` to apply.
- `onClose`: The delegate to be called when the reader is closed.

Returns: An instance of `XmlDictionaryReader`.

#### Remarks
The reader created is optimized for reading UTF-8 text.

## XmlDictionaryReader.CreateTextReader(Byte[], Int32, Int32, Encoding, XmlDictionaryReaderQuotas, OnXmlDictionaryReaderClose) method

```csharp
public static System.Xml.XmlDictionaryReader CreateTextReader (byte[] buffer, int offset, int count, System.Text.Encoding? encoding, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Creates an instance of `XmlDictionaryReader`.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `encoding`: The `Encoding` object that specifies the encoding properties to apply.
- `quotas`: The `XmlDictionaryReaderQuotas` to apply.
- `onClose`: The delegate to be called when the reader is closed.

Returns: An instance of `XmlDictionaryReader`.

#### Remarks
The reader created is optimized for reading UTF-8 text.

## XmlDictionaryReader.EndCanonicalization() method

```csharp
public virtual void EndCanonicalization ();
```

This method is not yet implemented.

Exceptions:

- `NotSupportedException`: Always.

To be added.

## XmlDictionaryReader.GetAttribute(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual string? GetAttribute (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

When overridden in a derived class, gets the value of an attribute.

Parameters:

- `localName`: An `XmlDictionaryString` that represents the local name of the attribute.
- `namespaceUri`: An `XmlDictionaryString` that represents the namespace of the attribute.

Returns: The value of the attribute.

To be added.

## XmlDictionaryReader.GetNonAtomizedNames(String, String) method

```csharp
public virtual void GetNonAtomizedNames (out string localName, out string namespaceUri);
```

Gets non-atomized names.

Parameters:

- `localName`: The local name.
- `namespaceUri`: The namespace for the local `localName`.

To be added.

## XmlDictionaryReader.IndexOfLocalName(String[], String) method

```csharp
public virtual int IndexOfLocalName (string[] localNames, string namespaceUri);
```

Gets the index of the local name of the current node within an array of names.

Parameters:

- `localNames`: The string array of local names to be searched.
- `namespaceUri`: The namespace of current node.

Returns: The index of the local name of the current node within an array of names.

Exceptions:

- `ArgumentNullException`: `localNames` or any of the names in the array is `null`.

-or-

`namespaceUri` is `null`.

#### Remarks
`localNames` is an array of strings, and `namespaceUri` is a string.

## XmlDictionaryReader.IndexOfLocalName(XmlDictionaryString[], XmlDictionaryString) method

```csharp
public virtual int IndexOfLocalName (System.Xml.XmlDictionaryString[] localNames, System.Xml.XmlDictionaryString namespaceUri);
```

Gets the index of the local name of the current node within an array of names.

Parameters:

- `localNames`: The `XmlDictionaryString` array of local names to be searched.
- `namespaceUri`: The namespace of current node.

Returns: The index of the local name of the current node within an array of names.

Exceptions:

- `ArgumentNullException`: `localNames` or any of the names in the array is `null`.

-or-

`namespaceUri` is `null`.

#### Remarks
`localNames` is an array of `XmlDictionaryString`, and `namespaceUri` is an `XmlDictionaryString`.

## XmlDictionaryReader.IsLocalName(String) method

```csharp
public virtual bool IsLocalName (string localName);
```

Checks whether the parameter, `localName`, is the local name of the current node.

Parameters:

- `localName`: The local name of the current node.

Returns: `true` if `localName` matches local name of the current node; otherwise `false`.

To be added.

## XmlDictionaryReader.IsLocalName(XmlDictionaryString) method

```csharp
public virtual bool IsLocalName (System.Xml.XmlDictionaryString localName);
```

Checks whether the parameter, `localName`, is the local name of the current node.

Parameters:

- `localName`: An `XmlDictionaryString` that represents the local name of the current node.

Returns: `true` if `localName` matches local name of the current node; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `localName` is `null`.

To be added.

## XmlDictionaryReader.IsNamespaceUri(String) method

```csharp
public virtual bool IsNamespaceUri (string namespaceUri);
```

Checks whether the parameter, `namespaceUri`, is the namespace of the current node.

Parameters:

- `namespaceUri`: The namespace of current node.

Returns: `true` if `namespaceUri` matches namespace of the current node; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `namespaceUri` is `null`.

To be added.

## XmlDictionaryReader.IsNamespaceUri(XmlDictionaryString) method

```csharp
public virtual bool IsNamespaceUri (System.Xml.XmlDictionaryString namespaceUri);
```

Checks whether the parameter, `namespaceUri`, is the namespace of the current node.

Parameters:

- `namespaceUri`: Namespace of current node.

Returns: `true` if `namespaceUri` matches namespace of the current node; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `namespaceUri` is `null`.

To be added.

## XmlDictionaryReader.IsStartArray(Type) method

```csharp
public virtual bool IsStartArray (out Type? type);
```

Checks whether the reader is positioned at the start of an array. This class returns `false`, but derived classes that have the concept of arrays might return `true`.

Parameters:

- `type`: Type of the node, if a valid node; otherwise `null`.

Returns: `true` if the reader is positioned at the start of an array node; otherwise `false`.

To be added.

## XmlDictionaryReader.IsStartElement(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual bool IsStartElement (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Tests whether the first tag is a start tag or empty element tag and if the local name and namespace URI match those of the current node.

Parameters:

- `localName`: An `XmlDictionaryString` that represents the local name of the attribute.
- `namespaceUri`: An `XmlDictionaryString` that represents the namespace of the attribute.

Returns: `true` if the first tag in the array is a start tag or empty element tag and matches `localName` and `namespaceUri`; otherwise `false`.

To be added.

## XmlDictionaryReader.IsTextNode(XmlNodeType) method

```csharp
protected bool IsTextNode (System.Xml.XmlNodeType nodeType);
```

Tests whether the current node is a text node.

Parameters:

- `nodeType`: Type of the node being tested.

Returns: `true` if the node type is `XmlNodeType.Text`, `XmlNodeType.Whitespace`, `XmlNodeType.SignificantWhitespace`, `XmlNodeType.CDATA`, or `XmlNodeType.Attribute`; otherwise `false`.

To be added.

## XmlDictionaryReader.MoveToStartElement() method

```csharp
public virtual void MoveToStartElement ();
```

Tests whether the current content node is a start element or an empty element.

To be added.

## XmlDictionaryReader.MoveToStartElement(String) method

```csharp
public virtual void MoveToStartElement (string name);
```

Tests whether the current content node is a start element or an empty element and if the `XmlReader.Name` property of the element matches the given argument.

Parameters:

- `name`: The `XmlReader.Name` property of the element.

To be added.

## XmlDictionaryReader.MoveToStartElement(String, String) method

```csharp
public virtual void MoveToStartElement (string localName, string namespaceUri);
```

Tests whether the current content node is a start element or an empty element and if the `XmlReader.LocalName` and `XmlReader.NamespaceURI` properties of the element matches the given arguments.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

To be added.

## XmlDictionaryReader.MoveToStartElement(XmlDictionaryString, XmlDictionaryString) method

```csharp
public virtual void MoveToStartElement (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri);
```

Tests whether the current content node is a start element or an empty element and if the `XmlReader.LocalName` and `XmlReader.NamespaceURI` properties of the element matches the given argument.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.

To be added.
