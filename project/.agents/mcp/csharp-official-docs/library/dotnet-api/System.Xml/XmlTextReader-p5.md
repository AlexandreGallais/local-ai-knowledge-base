---
title: "XmlTextReader class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextReader class (part 5 of 6)

## XmlTextReader.Read() method

```csharp
public override bool Read ();
```

Reads the next node from the stream.

Returns: `true` if the next node was read successfully; `false` if there are no more nodes to read.

Exceptions:

- `XmlException`: An error occurred while parsing the XML.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

When a reader is first created and initialized, there is no information available. You must call `Read` to read the first node.

This method requires at least four bytes from the data stream in order to begin parsing. If fewer than four bytes are returned and there is no more data in the stream, the method will fail. If there is more data in the stream, the method will block parsing until receipt of the fourth byte.

#### Examples
The following example reads an XML file and displays each node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/.ctor/source.cs._

The sample uses the file `items.xml`.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.Name Example/XML/source.xml._
## XmlTextReader.ReadAttributeValue() method

```csharp
public override bool ReadAttributeValue ();
```

Parses the attribute value into one or more `Text`, `EntityReference`, or `EndEntity` nodes.

Returns: `true` if there are nodes to return.

`false` if the reader is not positioned on an attribute node when the initial call is made or if all the attribute values have been read.

An empty attribute, such as, `misc=""`, returns `true` with a single node with a value of `String.Empty`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

Use this method after calling `MoveToAttribute` to read through the text or entity reference nodes that make up the attribute value. The `Depth` of the attribute value nodes is one plus the depth of the attribute node; it increments and decrements by one when you step into and out of general entity references.

#### Examples
The following example reads an attribute with text and entity nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/ReadAttributeValue/readattrval.cs._

## XmlTextReader.ReadBase64(Byte[], Int32, Int32) method

```csharp
public int ReadBase64 (byte[] array, int offset, int len);
```

Decodes Base64 and returns the decoded binary bytes.

Parameters:

- `array`: The array of characters that serves as the buffer to which the text contents are written.
- `offset`: The zero-based index into the array specifying where the method can begin to write to the buffer.
- `len`: The number of bytes to write into the buffer.

Returns: The number of bytes written to the buffer.

Exceptions:

- `XmlException`: The Base64 sequence is not valid.
- `ArgumentNullException`: The value of `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` < 0, or `len` < 0, or `len` > `array`.Length- `offset`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

Like `XmlTextReader.ReadChars`, this method can be called successively to read large streams of embedded text. It decodes Base64 content and returns the decoded binary bytes (for example, an inline Base64 encoded GIF image) into the buffer. See RFC 1521. (You can obtain RFCs from the Request for Comments Web site.)

#### Examples
The following example reads a file containing Base64 and BinHex data.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/ReadBase64/source.cs._

The sample uses the file `binary.xml`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.ReadBase64 Example/XML/source.xml._
## XmlTextReader.ReadBinHex(Byte[], Int32, Int32) method

```csharp
public int ReadBinHex (byte[] array, int offset, int len);
```

Decodes `BinHex` and returns the decoded binary bytes.

Parameters:

- `array`: The byte array that serves as the buffer to which the decoded binary bytes are written.
- `offset`: The zero-based index into the array specifying where the method can begin to write to the buffer.
- `len`: The number of bytes to write into the buffer.

Returns: The number of bytes written to your buffer.

Exceptions:

- `XmlException`: The `BinHex` sequence is not valid.
- `ArgumentNullException`: The value of `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` < 0, or `len` < 0, or `len` > `array`.Length- `offset`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

Like `XmlTextReader.ReadChars`, this method can be called successively to read large streams of embedded text. It decodes `BinHex` content and returns the decoded binary bytes (for example, an inline `BinHex` encoded GIF image) into the buffer.

#### Examples
The following example reads a file containing `Base64` and `BinHex` data.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/ReadBase64/source.cs._

The sample uses the file `binary.xml`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.ReadBase64 Example/XML/source.xml._
## XmlTextReader.ReadChars(Char[], Int32, Int32) method

```csharp
public int ReadChars (char[] buffer, int index, int count);
```

Reads the text contents of an element into a character buffer. This method is designed to read large streams of embedded text by calling it successively.

Parameters:

- `buffer`: The array of characters that serves as the buffer to which the text contents are written.
- `index`: The position within `buffer` where the method can begin writing text contents.
- `count`: The number of characters to write into `buffer`.

Returns: The number of characters read. This can be `0` if the reader is not positioned on an element or if there is no more text content to return in the current context.

Exceptions:

- `ArgumentException`: `count` is greater than the space specified in the `buffer` (buffer size - `index`).
- `ArgumentNullException`: The `buffer` value is `null`.
- `ArgumentOutOfRangeException`: `index`
`< 0` or `count``< 0`.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This is the most efficient way to process very large streams of text embedded in an XML document. Rather than allocating large string objects, `ReadChars` returns text content a buffer at a time. This method is designed to work only on element nodes. Other node types cause `ReadChars` to return `0`.

In the following XML, if the reader is positioned on the start tag, `ReadChars` returns `test` and positions the reader after the end tag.

```xml
<Item>test</Item>
```

`ReadChars` has the following functionality:

- This method is designed to work on element nodes only. Other node types cause `ReadChars` to return 0.

- This method returns the actual character content. There is no attempt to resolve entities, CDATA, or any other markup encountered. `ReadChars` returns everything between the start tag and the end tag, including markup.

- `ReadChars` ignores XML markup that is not well-formed. For example, when reading the following XML string `12`, `ReadChars` returns `12`. (It returns markup from the matching element pair and ignores others.)

- This method does not do any normalization.

- When `ReadChars` has reached the end of the character stream, it returns the value 0 and the reader is positioned after the end tag.

- Attribute read methods are not available while using `ReadChars`.

For example, using the following XML:

```xml
<thing>
 some text
</thing>

```

The reader is positioned on the `` element at the end of the while loop.

```csharp
if (XmlNodeType.Element == reader.NodeType && "thing" == reader.Name)
{
 while(0 != reader.ReadChars(buffer, 0, 1)
 {
 // Do something.
 // Attribute values are not available at this point.
 }
}
```

#### Examples
The following example reads in XML using `ReadChars`.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/ReadChars/source.cs._

The example uses the `items.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlTextReader.Name Example/XML/source.xml._
## XmlTextReader.ReadContentAsBase64(Byte[], Int32, Int32) method

```csharp
public override int ReadContentAsBase64 (byte[] buffer, int index, int count);
```

Reads the content and returns the `Base64` decoded binary bytes.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: `XmlTextReader.ReadContentAsBase64` is not supported in the current node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method streams the content, decodes the `Base64` content, and returns the decoded binary bytes (for example, an inline `Base64`-encoded GIF image) into the buffer. This method can be called successively to read large streams of embedded text. For more information, see RFC 1521, "MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying and Describing the Format of Internet Message Bodies". You can obtain RFCs from the Request for Comments Web site.

> **Note:**
> You should not access any of the reader properties between calls to the `XmlTextReader.ReadContentAsBase64` method until the method returns the value 0.

This method has the following behavior:

- `XmlTextReader.ReadContentAsBase64` returns the value 0 when it has reached the end of the byte stream it was operating on. The reader is positioned on the first non-content node.

- If you ask for fewer, or the exact number, of bytes than are left in the stream the reader remains in its current position.

- `XmlTextReader.ReadContentAsBase64` is not supported on the following XML node types: `Element`, `XmlDeclaration`, `None`, `Document`, `DocumentType`, `Notation`, `Entity`, `DocumentFragment`.

## XmlTextReader.ReadContentAsBinHex(Byte[], Int32, Int32) method

```csharp
public override int ReadContentAsBinHex (byte[] buffer, int index, int count);
```

Reads the content and returns the `BinHex` decoded binary bytes.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: `XmlTextReader.ReadContentAsBinHex` is not supported on the current node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlTextReader` implementation does not support this method.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method streams the content, decodes the `BinHex` content, and returns the decoded binary bytes (for example, an inline `BinHex` encoded GIF image) into the buffer. This method can be called successively to read large streams of embedded text.

> **Note:**
> You should not access any of the reader properties between calls to the `XmlTextReader.ReadContentAsBinHex` method until the method returns the value 0.

This method has the following behavior:

- `XmlTextReader.ReadContentAsBinHex` returns the value 0 when it has reached the end of the byte stream it was operating on. The reader is positioned on the first non-content node.

- If you ask for fewer, or the exact number, of bytes than are left in the stream the reader remains in its current position.

- `XmlTextReader.ReadContentAsBinHex` is not supported on the following XML node types: `Element`, `XmlDeclaration`, `None`, `Document`, `DocumentType`, `Notation`, `Entity`, `DocumentFragment`.
