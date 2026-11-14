---
title: "XmlReader class (part 14 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 14 of 16)

## XmlReader.ReadElementContentAsString() method

```csharp
public virtual string ReadElementContentAsString ();
```

Reads the current element and returns the contents as a `String` object.

Returns: The element content as a `String` object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a `String` object.
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

For the asynchronous version of this method, see `XmlReader.ReadElementContentAsStringAsync`.

#### Examples
The following example reads the `stringValue` element and returns the text content (ignoring the comment and processing instruction).

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

The example uses the `dataFile.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/dataFile.xml._
## XmlReader.ReadElementContentAsString(String, String) method

```csharp
public virtual string ReadElementContentAsString (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a `String` object.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content as a `String` object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a `String` object.
- `ArgumentNullException`: The method is called with `null` arguments.
- `ArgumentException`: The specified local name and namespace URI do not match that of the current element being read.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

#### Examples
The following example reads the `stringValue` element and returns the text content (ignoring the comment and processing instruction).

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

The example uses the `dataFile.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/dataFile.xml._
## XmlReader.ReadElementContentAsStringAsync() method

```csharp
public virtual System.Threading.Tasks.Task<string> ReadElementContentAsStringAsync ();
```

Asynchronously reads the current element and returns the contents as a `String` object.

Returns: The element content as a `String` object.

Exceptions:

- `InvalidOperationException`: An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadElementContentAsString`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadElementContentAsString`.

## XmlReader.ReadElementString() method

```csharp
public virtual string ReadElementString ();
```

Reads a text-only element. However, we recommend that you use the `XmlReader.ReadElementContentAsString` method instead, because it provides a more straightforward way to handle this operation.

Returns: The text contained in the element that was read. An empty string if the element is empty.

Exceptions:

- `XmlException`: The next content node is not a start tag; or the element found does not contain a simple text value.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
We recommend that you use the `ReadElementContentAsString` method to read a text element.

## XmlReader.ReadElementString(String) method

```csharp
public virtual string ReadElementString (string name);
```

Checks that the `XmlReader.Name` property of the element found matches the given string before reading a text-only element. However, we recommend that you use the `XmlReader.ReadElementContentAsString` method instead, because it provides a more straightforward way to handle this operation.

Parameters:

- `name`: The name to check.

Returns: The text contained in the element that was read. An empty string if the element is empty.

Exceptions:

- `XmlException`: If the next content node is not a start tag; if the element `Name` does not match the given argument; or if the element found does not contain a simple text value.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
We recommend that you use the `ReadElementContentAsString` method to read a text element.

## XmlReader.ReadElementString(String, String) method

```csharp
public virtual string ReadElementString (string localname, string ns);
```

Checks that the `XmlReader.LocalName` and `XmlReader.NamespaceURI` properties of the element found matches the given strings before reading a text-only element. However, we recommend that you use the `XmlReader.ReadElementContentAsString` method instead, because it provides a more straightforward way to handle this operation.

Parameters:

- `localname`: The local name to check.
- `ns`: The namespace URI to check.

Returns: The text contained in the element that was read. An empty string if the element is empty.

Exceptions:

- `XmlException`: If the next content node is not a start tag; if the element `LocalName` or `NamespaceURI` do not match the given arguments; or if the element found does not contain a simple text value.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
We recommend that you use the `ReadElementContentAsString` method to read a text element.

## XmlReader.ReadEndElement() method

```csharp
public virtual void ReadEndElement ();
```

Checks that the current content node is an end tag and advances the reader to the next node.

Exceptions:

- `XmlException`: The current node is not an end tag or if incorrect XML is encountered in the input stream.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example displays the text content of each element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the `book3.xml` file.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/book3.xml._
## XmlReader.ReadInnerXml() method

```csharp
public virtual string ReadInnerXml ();
```

When overridden in a derived class, reads all the content, including markup, as a string.

Returns: All the XML content, including markup, in the current node. If the current node has no children, an empty string is returned.

If the current node is neither an element nor attribute, an empty string is returned.

Exceptions:

- `XmlException`: The XML was not well-formed, or an error occurred while parsing the XML.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method returns all the content of the current node including the markup. The current node (start tag) and corresponding end node (end tag) are not returned. For example, if you had the following:

```xml
<node>
 this 
</node>
```

`ReadInnerXml` returns `this `

This method handles element and attribute nodes in the following manner:

|Node type|Position before the call|XML fragment|Return value|Position after the call|
|---------------|------------------------------|------------------|------------------|-----------------------------|
|`Element`|On the `item1` start tag.|\<item1>text1\</item1>\<item2>text2\</item2>|text1|On the `item2` start tag.|
|`Attribute`|On the `attr1` attribute node.|\text\|val1|Remains on the `attr1` attribute node.|

If the reader is positioned on a leaf node, calling `ReadInnerXml` is equivalent to calling `XmlReader.Read`. The method returns `String.Empty` (except for attribute nodes, in which case the value of the attribute is returned).

This method checks for well-formed XML. If `ReadInnerXml` is called from an `XmlValidatingReader`, this method also validates the content returned.

As implemented in the `XmlNodeReader`, `XmlTextReader` and `XmlValidatingReader` classes the `ReadOuterXml` method is namespace aware.

For the asynchronous version of this method, see `XmlReader.ReadInnerXmlAsync`.

#### Examples
The following example compares the `ReadInnerXml` and `XmlReader.ReadOuterXml` methods.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses `2books.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/2books.xml._
## XmlReader.ReadInnerXmlAsync() method

```csharp
public virtual System.Threading.Tasks.Task<string> ReadInnerXmlAsync ();
```

Asynchronously reads all the content, including markup, as a string.

Returns: All the XML content, including markup, in the current node. If the current node has no children, an empty string is returned.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadInnerXml`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadInnerXml`.
