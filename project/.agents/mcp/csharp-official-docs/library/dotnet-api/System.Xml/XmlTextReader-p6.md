---
title: "XmlTextReader class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextReader class (part 6 of 6)

## XmlTextReader.ReadElementContentAsBase64(Byte[], Int32, Int32) method

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
- `NotSupportedException`: The `XmlTextReader` implementation does not support this method.
- `XmlException`: The element contains mixed-content.
- `FormatException`: The content cannot be converted to the requested type.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method reads the element content, decodes it using Base64 encoding, and returns the decoded binary bytes (for example, an inline Base64 encoded GIF image) into the buffer. For more information, see RFC 1521, "MIME (Multipurpose Internet Mail Extensions) Part One: Mechanisms for Specifying and Describing the Format of Internet Message Bodies". You can obtain RFCs from the Request for Comments Web site.

This method can only read simple-content elements. The element can contain text, white space, significant white space, CDATA sections, comments and processing instructions. It can also contain entity references, which are automatically expanded. The element cannot have child elements.

This method is very similar to the `XmlTextReader.ReadContentAsBase64` method except that it can only be called on element node types.

If the `count` value is higher than the number of bytes in the document, or if it is equal to the number of bytes in the document, the `XmlTextReader` reads all the remaining bytes in the document and returns the number of bytes read. The next `XmlTextReader` method call returns a zero and moves the reader to the node following the `EndElement`.

If you call `XmlTextReader.Read` before all of the element content is consumed, the reader may behave as if the first content was consumed and then the `XmlTextReader.Read` method was called. This means that the reader reads all the text until the end element is encountered. It then reads the end tag node, reads the next node, and then positions itself on the next subsequent node.

#### Examples
See `XmlReader.ReadElementContentAsBase64` to see an example using this method.

## XmlTextReader.ReadElementContentAsBinHex(Byte[], Int32, Int32) method

```csharp
public override int ReadElementContentAsBinHex (byte[] buffer, int index, int count);
```

Reads the element and decodes the `BinHex` content.

Parameters:

- `buffer`: The buffer into which to copy the resulting text. This value cannot be `null`.
- `index`: The offset into the buffer where to start copying the result.
- `count`: The maximum number of bytes to copy into the buffer. The actual number of bytes copied is returned from this method.

Returns: The number of bytes written to the buffer.

Exceptions:

- `ArgumentNullException`: The `buffer` value is `null`.
- `InvalidOperationException`: The current node is not an element node.
- `ArgumentOutOfRangeException`: The index into the buffer or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlReader` implementation does not support this method.
- `XmlException`: The element contains mixed-content.
- `FormatException`: The content cannot be converted to the requested type.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method reads the element content, decodes it using `BinHex` encoding, and returns the decoded binary bytes (for example, an inline `BinHex` encoded GIF image) into the buffer.

This method can only read simple-content elements. The element can contain text, white space, significant white space, CDATA sections, comments and processing instructions. It can also contain entity references, which are automatically expanded. The element cannot have child elements.

This method is very similar to the `XmlTextReader.ReadContentAsBinHex` method except that it can only be called on element node types.

If the `count` value is higher than the number of bytes in the document, or if it is equal to the number of bytes in the document, the `XmlTextReader` reads all the remaining bytes in the document and returns the number of bytes read. The next `XmlTextReader` method call returns a zero and moves the reader to the node following the `EndElement`.

If you call `XmlTextReader.Read` before all of the element content is consumed, the reader may behave as if the first content was consumed and then the `XmlTextReader.Read` method was called. This means that the reader reads all the text until the end element is encountered. It then reads the end tag node, reads the next node, and then positions itself on the next subsequent node.

#### Examples
See `XmlReader.ReadElementContentAsBinHex` to see an example using this method.

## XmlTextReader.ReadString() method

```csharp
public override string ReadString ();
```

Reads the contents of an element or a text node as a string.

Returns: The contents of the element or text node. This can be an empty string if the reader is positioned on something other than an element or text node, or if there is no more text content to return in the current context.

`Note:` The text node can be either an element or an attribute text node.

Exceptions:

- `XmlException`: An error occurred while parsing the XML.
- `InvalidOperationException`: An invalid operation was attempted.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

If positioned on an element, `ReadString` concatenates all text, significant white space, white space, and `CData` section node types together and returns the concatenated data as the element content. It stops when any markup is encountered, including comments and processing instructions. This could occur in a mixed content model, or when an element end tag is read.

If positioned on a text node, `ReadString` performs the same concatenation from the text node to the element end tag. If the reader is positioned on an attribute text node, `ReadString` has the same functionality as if the reader were position on the element start tag. It returns all the concatenated element text nodes.

#### Examples
The following example displays the text content of each element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/IsEmptyElement/source.cs._

The example uses the file, `elems.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlReader.IsStartElement Example/XML/source.xml._
## XmlTextReader.ResetState() method

```csharp
public void ResetState ();
```

Resets the state of the reader to ReadState.Initial.

Exceptions:

- `InvalidOperationException`: Calling `ResetState` if the reader was constructed using an `XmlParserContext`.
- `XmlException`: Documents in a single stream do not share the same encoding.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

This method enables you to parse multiple XML documents in a single stream. When you reach the end of an XML document, you can call `ResetState` to reset the state of the reader in preparation for the next XML document.

> **Important:**
> The documents in the stream must share the same encoding. If this is not the case, when `ResetState` is called an `XmlException` is thrown.

The following properties are not affected by `ResetState`.

- `Normalization`
- `Namespaces`
- `XmlResolver`
- `WhitespaceHandling`

#### Examples
The following example parses two XML documents in a single stream.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextReader/ResetState/resetstate.cs._

## XmlTextReader.ResolveEntity() method

```csharp
public override void ResolveEntity ();
```

Resolves the entity reference for `EntityReference` nodes.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

If the reader is positioned on an `EntityReference` node (`XmlNodeType.EntityReference`), if `XmlTextReader.Read` is called after calling this method, the entity replacement text is parsed. When the entity replacement text is finished, an `EndEntity` node is returned to close the entity reference scope.

> **Note:**
> After calling this method, if the entity is part of an attribute value, you must call `XmlTextReader.ReadAttributeValue` to step into the entity.

## XmlTextReader.Skip() method

```csharp
public override void Skip ();
```

Skips the children of the current node.

#### Remarks

> **Note:**
> We recommend that you create `XmlReader` instances by using the `XmlReader.Create` method to take advantage of new functionality.

In the following XML input if the reader is positioned on the `` node or any of its attributes, calling `Skip` positions the reader to the `` node.

If the reader is positioned on a leaf node already (such as the `<x>` node or the text node `abc`), calling `Skip` is the same as calling `XmlTextReader.Read`.

```xml
<a name="bob" age="123">
  abc
</a>

 ...

```

This method checks for well-formed XML.

## XmlTextReader.System.Xml.IXmlNamespaceResolver.GetNamespacesInScope(XmlNamespaceScope) method

```csharp
System.Collections.Generic.IDictionary<string,string> IXmlNamespaceResolver.GetNamespacesInScope (System.Xml.XmlNamespaceScope scope);
```

For a description of this member, see `IXmlNamespaceResolver.GetNamespacesInScope`.

Parameters:

- `scope`: An `XmlNamespaceScope` value that specifies the type of namespace nodes to return.

Returns: An `IDictionary` that contains the current in-scope namespaces.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlTextReader` instance is cast to an `IXmlNamespaceResolver` interface.

## XmlTextReader.System.Xml.IXmlNamespaceResolver.LookupNamespace(String) method

```csharp
string IXmlNamespaceResolver.LookupNamespace (string prefix);
```

For a description of this member, see `IXmlNamespaceResolver.LookupNamespace`.

Parameters:

- `prefix`: The prefix whose namespace URI you wish to find.

Returns: The namespace URI that is mapped to the prefix; `null` if the prefix is not mapped to a namespace URI.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlTextReader` instance is cast to an `IXmlNamespaceResolver` interface.

## XmlTextReader.System.Xml.IXmlNamespaceResolver.LookupPrefix(String) method

```csharp
string IXmlNamespaceResolver.LookupPrefix (string namespaceName);
```

For a description of this member, see `IXmlNamespaceResolver.LookupPrefix`.

Parameters:

- `namespaceName`: The namespace URI whose prefix you wish to find.

Returns: The prefix that is mapped to the namespace URI; `null` if the namespace URI is not mapped to a prefix.

To be added.
