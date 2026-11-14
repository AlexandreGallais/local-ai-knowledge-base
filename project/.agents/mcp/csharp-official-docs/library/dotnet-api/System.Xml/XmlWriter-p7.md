---
title: "XmlWriter class (part 7 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class (part 7 of 11)

## XmlWriter.WriteNmTokenAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteNmTokenAsync (string name);
```

Asynchronously writes out the specified name, ensuring it is a valid NmToken <example-value> to the W3C XML 1.0 recommendation (https://www.w3.org/TR/1998/REC-xml-19980210#NT-Name).

Parameters:

- `name`: The name to write.

Returns: The task that represents the asynchronous `WriteNmToken` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteNmToken`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteNmToken`.

## XmlWriter.WriteNode(XmlReader, Boolean) method

```csharp
public virtual void WriteNode (System.Xml.XmlReader reader, bool defattr);
```

When overridden in a derived class, copies everything from the reader to the writer and moves the reader to the start of the next sibling.

Parameters:

- `reader`: The `XmlReader` to read from.
- `defattr`: `true` to copy the default attributes from the `XmlReader`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.
- `ArgumentException`: `reader` contains invalid characters.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The following table shows the supported node types for this method.

|NodeType|WriteNode Behavior|
|--------------|------------------------|
|`None`|Writes out all the nodes irrespective of type. That is, the writer consumes the `XmlReader` and writes out all the nodes read including attributes, processing instructions, comments, and so on. This situation occurs when the `XmlReader` is in an initial state. (The `ReadState` property returns `ReaderState.Initial`).|
|`Element`|Writes out the element node and any attribute nodes.|
|`Attribute`|No operation. Use `XmlWriter.WriteStartAttribute` or `XmlWriter.WriteAttributeString` instead.|
|`Text`|Writes out the text node.|
|`CDATA`|Writes out the CDATA section node.|
|`EntityReference`|Writes out the entity reference node.|
|`ProcessingInstruction`|Writes out the processing instruction node.|
|`Comment`|Writes out the comment node.|
|`DocumentType`|Writes out the document type node.|
|`SignificantWhitespace`|Writes out the significant white space node.|
|`Whitespace`|Writes out the white space node.|
|`EndElement`|Writes out the end element tag.|
|`EndEntity`|No operation.|
|`XmlDeclaration`|Writes out the XML declaration node.|

If the reader is in the initial state, this method moves the reader to the end of file. If the reader is already at the end of file or in a closed state, this method is non-operational.

The following C# code copies an entire XML input document to the console:

```csharp
XmlReader reader = XmlReader.Create(myfile);
XmlWriter writer = XmlWriter.Create(Console.Out);
writer.WriteNode(reader, false);
```

If you have moved off the root node and are positioned elsewhere in the document the following C# example correctly writes out the nodes.

```csharp
XmlReader reader = XmlReader.Create(myfile);
reader.Read(); // Read PI
reader.Read(); // Read Comment
reader.Read(); // Read DOCType
XmlWriter writer = XmlWriter.Create(Console.Out);
while (!reader.EOF){
  writer.WriteNode(reader, false);
 }
```

If the reader is configured to return white space and the writer has is configured to indent output, `WriteNode` may produce strange output. You will essentially be getting double formatting.

For the asynchronous version of this method, see `XmlWriter.WriteNodeAsync`.

#### Examples
The following example writes the first and last book nodes out to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteNode/writenode.cs._

The example uses the file, `books.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlWriter.WriteNode/XML/books.xml._
## XmlWriter.WriteNode(XPathNavigator, Boolean) method

```csharp
public virtual void WriteNode (System.Xml.XPath.XPathNavigator navigator, bool defattr);
```

Copies everything from the `XPathNavigator` object to the writer. The position of the `XPathNavigator` remains unchanged.

Parameters:

- `navigator`: The `XPathNavigator` to copy from.
- `defattr`: `true` to copy the default attributes; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `navigator` is `null`.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The following table shows the supported `XPath` node types for this method.

|XPathNodeType|WriteNode Behavior|
|-------------------|------------------------|
|`Root`|Writes out all the nodes irrespective of type. That is, the writer consumes the `XPathNavigator` and writes out all the nodes from the root node (including attributes, processing instructions, comments and so on.)|
|`Element`|Writes out the element node and any attribute nodes.|
|`Attribute`|No operation. Use `XmlWriter.WriteStartAttribute` or `XmlWriter.WriteAttributeString` instead.|
|`Text`|Writes out the text node.|
|`Namespace`|No operation. Use the `XmlWriter.WriteStartAttribute` or `XmlWriter.WriteAttributeString` method to write the namespace declaration.|
|`ProcessingInstruction`|Writes out the processing instruction node.|
|`Comment`|Writes out the comment node.|
|`SignificantWhitespace`|Writes out the significant white space node.|
|`Whitespace`|Writes out the white space node.|

For the asynchronous version of this method, see `XmlWriter.WriteNodeAsync`.

#### Examples
The following example uses the `XmlWriter.WriteNode` method to copy the first book node from a document and write it to the console.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteNode/XmlWriteNode_nav.cs._

The example uses the books.xml file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/books.xml._
## XmlWriter.WriteNodeAsync(XmlReader, Boolean) method

```csharp
public virtual System.Threading.Tasks.Task WriteNodeAsync (System.Xml.XmlReader reader, bool defattr);
```

Asynchronously copies everything from the reader to the writer and moves the reader to the start of the next sibling.

Parameters:

- `reader`: The `XmlReader` to read from.
- `defattr`: `true` to copy the default attributes from the `XmlReader`; otherwise, `false`.

Returns: The task that represents the asynchronous `WriteNode` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteNode`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteNode`.

## XmlWriter.WriteNodeAsync(XPathNavigator, Boolean) method

```csharp
public virtual System.Threading.Tasks.Task WriteNodeAsync (System.Xml.XPath.XPathNavigator navigator, bool defattr);
```

Asynchronously copies everything from the `XPathNavigator` object to the writer. The position of the `XPathNavigator` remains unchanged.

Parameters:

- `navigator`: The `XPathNavigator` to copy from.
- `defattr`: `true` to copy the default attributes; otherwise, `false`.

Returns: The task that represents the asynchronous `WriteNode` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteNode`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteNode`.

## XmlWriter.WriteProcessingInstruction(String, String) method

```csharp
public abstract void WriteProcessingInstruction (string name, string? text);
```

When overridden in a derived class, writes out a processing instruction with a space between the name and text as follows: <?name text?>.

Parameters:

- `name`: The name of the processing instruction.
- `text`: The text to include in the processing instruction.

Exceptions:

- `ArgumentException`: The text would result in a non-well formed XML document.

`name` is either `null` or `String.Empty`.

This method is being used to create an XML declaration after `XmlWriter.WriteStartDocument` has already been called.
- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method can be used to write the XML declaration (rather than `XmlWriter.WriteStartDocument`). This could result in the encoding attribute being incorrectly written. For example, the following C# code would result in an invalid XML document because the default encoding is UTF-8.

```csharp
XmlWriter writer = XmlWriter.Create("output.xml");
writer.WriteProcessingInstruction("xml", "version='1.0' encoding='UTF-16'");
writer.WriteStartElement("root");
writer.Close();
```

If `text` is either `null` or `String.Empty`, this method writes a `ProcessingInstruction` with no data content, for example \<?name?>.

If text contains an invalid sequence of "?>", the `XmlWriter` can either throw an `ArgumentException` (`XmlTextWriter` objects) or insert a space "? >" to avoid writing invalid XML (`XmlWriter` objects created by the `XmlWriter.Create` method).

For the asynchronous version of this method, see `XmlWriter.WriteProcessingInstructionAsync`.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/WriteCData/writerbook_v2.cs._

## XmlWriter.WriteProcessingInstructionAsync(String, String) method

```csharp
public virtual System.Threading.Tasks.Task WriteProcessingInstructionAsync (string name, string? text);
```

Asynchronously writes out a processing instruction with a space between the name and text as follows: <?name text?>.

Parameters:

- `name`: The name of the processing instruction.
- `text`: The text to include in the processing instruction.

Returns: The task that represents the asynchronous `WriteProcessingInstruction` operation.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlWriter` asynchronous method was called without setting the `XmlWriterSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlWriterSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlWriter.WriteProcessingInstruction`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteProcessingInstruction`.
