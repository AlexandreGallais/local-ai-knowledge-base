---
title: "XmlWriter class (part 9 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 9 of 11)

## XmlWriter.WriteStartDocument() method

```csharp
public abstract void WriteStartDocument ();
```

When overridden in a derived class, writes the XML declaration with the version "1.0".

Exceptions:

- `InvalidOperationException`: This is not the first write method called after the constructor.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The encoding level of the document is determined by how the writer is implemented. For example, if an `Encoding` object is specified in the `XmlTextWriter` constructor, this determines the value of the encoding attribute. This method does not create a standalone attribute.

When `WriteStartDocument` is called the writer validates that what you are writing is a well-formed XML document. For example, it checks that the XML declaration is the first node, that one and only one root-level element exists, and so on. If this method is not called, the writer assumes an XML fragment is being written and applies no root level rules.

If `WriteStartDocument` has been called and then the `XmlWriter.WriteProcessingInstruction` method is used to create another XML declaration, an exception will be thrown.

For the asynchronous version of this method, see `XmlWriter.WriteStartDocumentAsync`.

## XmlWriter.WriteStartDocument(Boolean) method

```csharp
public abstract void WriteStartDocument (bool standalone);
```

When overridden in a derived class, writes the XML declaration with the version "1.0" and the standalone attribute.

Parameters:

- `standalone`: If `true`, it writes "standalone=yes"; if `false`, it writes "standalone=no".

Exceptions:

- `InvalidOperationException`: This is not the first write method called after the constructor.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The encoding level of the document is determined by how the writer is implemented. For example, if an `Encoding` object is specified in the `XmlTextWriter` constructor, this determines the value of the encoding attribute.

When `WriteStartDocument` is called, the writer validates that what you are writing is a well-formed XML document. For example, it checks that the XML declaration is the first node, that one and only one root-level element exists, and so on. If this method is not called, the writer assumes an XML fragment is being written and applies no root level rules.

If `WriteStartDocument` has been called and then the `XmlWriter.WriteProcessingInstruction` method is used to create another XML declaration, an exception will be thrown.

For the asynchronous version of this method, see `XmlWriter.WriteStartDocumentAsync`.

## XmlWriter.WriteStartDocumentAsync() method

```csharp
public virtual System.Threading.Tasks.Task WriteStartDocumentAsync ();
```

Asynchronously writes the XML declaration with the version "1.0".

Returns: The task that represents the asynchronous `WriteStartDocument` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteStartDocument`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteStartDocument`.

## XmlWriter.WriteStartDocumentAsync(Boolean) method

```csharp
public virtual System.Threading.Tasks.Task WriteStartDocumentAsync (bool standalone);
```

Asynchronously writes the XML declaration with the version "1.0" and the standalone attribute.

Parameters:

- `standalone`: If `true`, it writes "standalone=yes"; if `false`, it writes "standalone=no".

Returns: The task that represents the asynchronous `WriteStartDocument` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteStartDocument`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteStartDocument`.

## XmlWriter.WriteStartElement(String) method

```csharp
public void WriteStartElement (string localName);
```

When overridden in a derived class, writes out a start tag with the specified local name.

Parameters:

- `localName`: The local name of the element.

Exceptions:

- `InvalidOperationException`: The writer is closed.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteStartElementAsync`.

#### Examples
The following example writes an XML node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Close/writeelems.cs._

## XmlWriter.WriteStartElement(String, String) method

```csharp
public void WriteStartElement (string localName, string? ns);
```

When overridden in a derived class, writes the specified start tag and associates it with the given namespace.

Parameters:

- `localName`: The local name of the element.
- `ns`: The namespace URI to associate with the element. If this namespace is already in scope and has an associated prefix, the writer automatically writes that prefix also.

Exceptions:

- `InvalidOperationException`: The writer is closed.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.

#### Remarks
After calling this method you can either write attributes, or create content using `XmlWriter.WriteComment`, `XmlWriter.WriteString`, or `WriteStartElement` for child elements. You can close the element with either `XmlWriter.WriteEndElement` or `XmlWriter.WriteFullEndElement`. For example, the following C# code:

```csharp
writer.WriteStartElement("item",null);
writer.WriteString("some text");
writer.WriteEndElement();
```

Generates the following output:

```xml
some text
```

For the asynchronous version of this method, see `XmlWriter.WriteStartElementAsync`.

## XmlWriter.WriteStartElement(String, String, String) method

```csharp
public abstract void WriteStartElement (string? prefix, string localName, string? ns);
```

When overridden in a derived class, writes the specified start tag and associates it with the given namespace and prefix.

Parameters:

- `prefix`: The namespace prefix of the element.
- `localName`: The local name of the element.
- `ns`: The namespace URI to associate with the element.

Exceptions:

- `InvalidOperationException`: The writer is closed.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `EncoderFallbackException`: There is a character in the buffer that is a valid XML character but is not valid for the output encoding. For example, if the output encoding is ASCII, you should only use characters from the range of 0 to 127 for element and attribute names. The invalid character might be in the argument of this method or in an argument of previous methods that were writing to the buffer. Such characters are escaped by character entity references when possible (for example, in text nodes or attribute values). However, the character entity reference is not allowed in element and attribute names, comments, processing instructions, or CDATA sections.

#### Remarks
For the asynchronous version of this method, see `XmlWriter.WriteStartElementAsync`.

#### Examples
The following example writes out an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/LookupPrefix/writeelemstring_v2.cs._

## XmlWriter.WriteStartElementAsync(String, String, String) method

```csharp
public virtual System.Threading.Tasks.Task WriteStartElementAsync (string? prefix, string localName, string? ns);
```

Asynchronously writes the specified start tag and associates it with the given namespace and prefix.

Parameters:

- `prefix`: The namespace prefix of the element.
- `localName`: The local name of the element.
- `ns`: The namespace URI to associate with the element.

Returns: The task that represents the asynchronous `WriteStartElement` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteStartElement`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteStartElement`.

## XmlWriter.WriteString(String) method

```csharp
public abstract void WriteString (string? text);
```

When overridden in a derived class, writes the given text content.

Parameters:

- `text`: The text to write.

Exceptions:

- `ArgumentException`: The text string contains an invalid surrogate pair.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
`WriteString` does the following:

- The characters `&`, `<`, and `>` are replaced with `&`, `<`, and `>`, respectively.

- The default behavior of an `XmlWriter` created using `XmlWriter.Create` is to throw an `ArgumentException` when attempting to write character values in the range 0x-0x1F (excluding white space characters 0x9, 0xA, and 0xD). These invalid XML characters can be written by creating the `XmlWriter` with the `CheckCharacters` property set to `false`. Doing so will result in the characters being replaced with numeric character entities (&\#0; through &#0x1F). Additionally, an `XmlTextWriter` created with the `new` operator will replace the invalid characters with numeric character entities by default.

**Note** Microsoft does not encourage the practice of writing invalid XML characters, since many applications that consume XML are not designed to handle invalid characters.

- If `WriteString` is called in the context of an attribute value, double and single quotes are replaced with `"` and `'` respectively.

For example, this input string `testtest` is written out as

```txt
test<item>test
```

If `text` is either `null` or `String.Empty`, this method writes a text node with no data content.

For the asynchronous version of this method, see `XmlWriter.WriteStringAsync`.

#### Examples
The following example writes an XML node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Close/writeelems.cs._
