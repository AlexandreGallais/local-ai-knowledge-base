---
title: "XmlNodeReader class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeReader class (part 3 of 4)

## XmlNodeReader.MoveToNextAttribute() method

```csharp
public override bool MoveToNextAttribute ();
```

Moves to the next attribute.

Returns: `true` if there is a next attribute; `false` if there are no more attributes.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

If the current node is not an attribute node, this method is equivalent to `XmlNodeReader.MoveToFirstAttribute`. If `MoveToNextAttribute` returns `true`, the reader moves to the next attribute; otherwise, the position of the reader does not change.

#### Examples
The following example reads a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/MoveToNextAttribute/source.cs._

## XmlNodeReader.Read() method

```csharp
public override bool Read ();
```

Reads the next node from the stream.

Returns: `true` if the next node was read successfully; `false` if there are no more nodes to read.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

When a reader is first created and initialized, there is no information available. You must call `Read` to read the first node.

#### Examples
The following example reads an XML and displays each node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/Close/source.cs._

The example uses the file, `items.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNodeReader.Name Example/XML/source.xml._
## XmlNodeReader.ReadAttributeValue() method

```csharp
public override bool ReadAttributeValue ();
```

Parses the attribute value into one or more `Text`, `EntityReference`, or `EndEntity` nodes.

Returns: `true` if there are nodes to return.

`false` if the reader is not positioned on an attribute node when the initial call is made or if all the attribute values have been read.

An empty attribute, such as, `misc=""`, returns `true` with a single node with a value of String.Empty.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

Use this method after calling `XmlNodeReader.MoveToAttribute` to read through the text or entity reference nodes that make up the attribute value. The `Depth` of the attribute value nodes is one plus the depth of the attribute node; it increments and decrements by one when you step into and out of general entity references.

#### Examples
The following example reads an attribute with text and entity reference nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/ReadAttributeValue/source.cs._

## XmlNodeReader.ReadContentAsBase64(Byte[], Int32, Int32) method

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
- `InvalidOperationException`: `XmlNodeReader.ReadContentAsBase64` is not supported on the current node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This method streams the content, decodes the Base64 content, and returns the decoded binary bytes (for example, an inline Base64 encoded GIF image) into the buffer. This method can be called successively to read large streams of embedded text. For more information, see RFC 1521, "MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying and Describing the Format of Internet Message Bodies". You can obtain RFCs from the Request for Comments Web site.

> **Note:**
> You should not access any of the reader properties between calls to the `XmlNodeReader.ReadContentAsBase64` method until the method returns the value 0.

This method has the following behavior:

-   `XmlNodeReader.ReadContentAsBase64` returns the value 0 when it has reached the end of the byte stream it was operating on. The reader is positioned on the first non-content node.

- If you ask for fewer, or the exact number, of bytes than are left in the stream the reader remains in its current position.

-   `XmlNodeReader.ReadContentAsBase64` is not supported on the following XML node types: Element, XmlDeclaration, None, Document, DocumentType, Notation, Entity, DocumentFragment.

## XmlNodeReader.ReadContentAsBinHex(Byte[], Int32, Int32) method

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
- `InvalidOperationException`: `XmlNodeReader.ReadContentAsBinHex` is not supported on the current node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This method streams the content, decodes the BinHex content, and returns the decoded binary bytes (for example, an inline BinHex encoded GIF image) into the buffer. This method can be called successively to read large streams of embedded text.

> **Note:**
> You should not access any of the reader properties between calls to the `XmlNodeReader.ReadContentAsBinHex` method until the method returns the value 0.

This method has the following behavior:

-   `XmlNodeReader.ReadContentAsBinHex` returns the value 0 when it has reached the end of the byte stream it was operating on. The reader is positioned on the first non-content node.

- If you ask for fewer, or the exact number, of bytes than are left in the stream the reader remains in its current position.

-   `XmlNodeReader.ReadContentAsBinHex` is not supported on the following XML node types: Element, XmlDeclaration, None, Document, DocumentType, Notation, Entity, DocumentFragment.

## XmlNodeReader.ReadElementContentAsBase64(Byte[], Int32, Int32) method

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
- `XmlException`: The element contains mixed content.
- `FormatException`: The content cannot be converted to the requested type.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This method reads the content, decodes it using Base64 encoding, and returns the decoded binary bytes (for example, an inline Base64 encoded GIF image) into the buffer. For more information, see RFC 1521, "MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying and Describing the Format of Internet Message Bodies". You can obtain RFCs from the Request for Comments Web site.

This method can only read simple-content elements. The element can contain text, white space, significant white space, CDATA sections, comments and processing instructions. It can also contain entity references, which are automatically expanded. The element cannot have child elements.

This method is very similar to the `XmlNodeReader.ReadContentAsBase64` method except that it can only be called on element node types.

If the count value is higher than the number of bytes in the document, or if it is equal to the number of bytes in the document, the `XmlNodeReader` reads all the remaining bytes in the document and returns the number of bytes read. The next `XmlNodeReader.ReadElementContentAsBase64` method call returns a zero and moves the reader to the node following the `EndElement` node.

If you call `XmlNodeReader.Read` before all of the element content is consumed, the reader may behave as if the first content was consumed and then the `XmlNodeReader.Read` method was called. This means that the reader reads all the text until the end element is encountered. It then reads the end tag node, read the next node, and then position itself on the next subsequent node.

#### Examples
See `XmlReader.ReadElementContentAsBase64` to see an example using this method.

## XmlNodeReader.ReadElementContentAsBinHex(Byte[], Int32, Int32) method

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
- `XmlException`: The element contains mixed content.
- `FormatException`: The content cannot be converted to the requested type.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

This method reads the element content, decodes it using BinHex encoding, and returns the decoded binary bytes (for example, an inline BinHex encoded GIF image) into the buffer.

This method can only read simple-content elements. The element can contain text, white space, significant white space, CDATA sections, comments and processing instructions. It can also contain entity references, which are automatically expanded. The element cannot have child elements.

This method is very similar to the `XmlNodeReader.ReadContentAsBinHex` method except that it can only be called on element node types.

If the count value is higher than the number of bytes in the document, or if it is equal to the number of bytes in the document, the `XmlNodeReader` reads all the remaining bytes in the document and returns the number of bytes read. The next `XmlNodeReader` method call returns a zero and moves the reader to the node following the `EndElement` node.

If you call `XmlNodeReader.Read` before all of the element content is consumed, the reader may behave as if the first content was consumed and then the `XmlNodeReader.Read` method was called. This means that the reader reads all the text until the end element is encountered. It then reads the end tag node, read the next node, and then position itself on the next subsequent node.

#### Examples
See `XmlReader.ReadElementContentAsBinHex` to see an example using this method.

## XmlNodeReader.ReadString() method

```csharp
public override string ReadString ();
```

Reads the contents of an element or text node as a string.

Returns: The contents of the element or text-like node (This can include CDATA, Text nodes, and so on). This can be an empty string if the reader is positioned on something other than an element or text node, or if there is no more text content to return in the current context.

`Note:` The text node can be either an element or an attribute text node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

If positioned on an element, `ReadString` concatenates all text, significant white space, white space, and CData section node types together and returns the concatenated data as the element content. It stops when any markup is encountered. This could occur in a mixed content model, or when an element end tag is read.

If positioned on a text-like node, `ReadString` performs the same concatenation from the text node to the element end tag. If the reader is positioned on an attribute text node, `ReadString` has the same functionality as if the reader were position on the element start tag. It returns all the concatenated element text nodes.

#### Examples
The following example displays the text content of each of the elements.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/IsEmptyElement/source.cs._
