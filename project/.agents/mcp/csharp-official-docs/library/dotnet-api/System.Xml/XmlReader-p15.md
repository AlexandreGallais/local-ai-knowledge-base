---
title: "XmlReader class (part 15 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 15 of 16)

## XmlReader.ReadOuterXml() method

```csharp
public virtual string ReadOuterXml ();
```

When overridden in a derived class, reads the content, including markup, representing this node and all its children.

Returns: If the reader is positioned on an element or an attribute node, this method returns all the XML content, including markup, of the current node and all its children; otherwise, it returns an empty string.

Exceptions:

- `XmlException`: The XML was not well-formed, or an error occurred while parsing the XML.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method is similar to `XmlReader.ReadInnerXml` except it also returns the start and end tags.

This method handles element and attribute nodes in the following manner:

|Node type|Position before the call|XML fragment|Return value|Position After the Call|
|---------------|------------------------------|------------------|------------------|-----------------------------|
|`Element`|On the `item1` start tag.|\<item1>text1\</item1>\<item2>text2\</item2>|\<item1>text1\</item1>|On the `item2` start tag.|
|`Attribute`|On the `attr1` attribute node.|\text\|attr1="val1"|Remains on the `attr1` attribute node.|

If the reader is positioned on a leaf node, calling `ReadOuterXml` is equivalent to calling `XmlReader.Read`. The method returns `String.Empty` (except for attribute nodes, in which case the attribute markup is returned).

This method checks for well-formed XML. If `ReadOuterXml` is called from an `XmlValidatingReader`, this method also validates the content returned

As implemented in the `XmlNodeReader`, `XmlTextReader` and `XmlValidatingReader` classes the `ReadOuterXml` method is namespace aware. Given the following XML text `hello`, if the reader were positioned on the `S:B` start tag, `ReadOuterXml` returns `hello`.

For the asynchronous version of this method, see `XmlReader.ReadOuterXmlAsync`.

#### Examples
The following example compares the `ReadInnerXml` and `ReadOuterXml` methods.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses `2books.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/2books.xml._
## XmlReader.ReadOuterXmlAsync() method

```csharp
public virtual System.Threading.Tasks.Task<string> ReadOuterXmlAsync ();
```

Asynchronously reads the content, including markup, representing this node and all its children.

Returns: If the reader is positioned on an element or an attribute node, this method returns all the XML content, including markup, of the current node and all its children; otherwise, it returns an empty string.

Exceptions:

- `InvalidOperationException`: An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadOuterXml`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadOuterXml`.

## XmlReader.ReadStartElement() method

```csharp
public virtual void ReadStartElement ();
```

Checks that the current node is an element and advances the reader to the next node.

Exceptions:

- `XmlException`: Incorrect XML was encountered in the input stream.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method calls `XmlReader.IsStartElement` followed by `XmlReader.Read` to position you on the content of that element found in the input stream.

## XmlReader.ReadStartElement(String) method

```csharp
public virtual void ReadStartElement (string name);
```

Checks that the current content node is an element with the given `XmlReader.Name` and advances the reader to the next node.

Parameters:

- `name`: The qualified name of the element.

Exceptions:

- `XmlException`: Incorrect XML was encountered in the input stream.

-or-

The `XmlReader.Name` of the element does not match the given `name`.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
A call to this method corresponds to a call to `XmlReader.IsStartElement` followed by a call to `XmlReader.Read`.

#### Examples
The following example displays the text content of each element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the `book3.xml` file.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/book3.xml._
## XmlReader.ReadStartElement(String, String) method

```csharp
public virtual void ReadStartElement (string localname, string ns);
```

Checks that the current content node is an element with the given `XmlReader.LocalName` and `XmlReader.NamespaceURI` and advances the reader to the next node.

Parameters:

- `localname`: The local name of the element.
- `ns`: The namespace URI of the element.

Exceptions:

- `XmlException`: Incorrect XML was encountered in the input stream.

-or-

The `XmlReader.LocalName` and `XmlReader.NamespaceURI` properties of the element found do not match the given arguments.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
A call to this method corresponds to a call to `XmlReader.IsStartElement` followed by a call to `XmlReader.Read`.

## XmlReader.ReadString() method

```csharp
public virtual string ReadString ();
```

When overridden in a derived class, reads the contents of an element or text node as a string. However, we recommend that you use the `ReadElementContentAsString` method instead, because it provides a more straightforward way to handle this operation.

Returns: The contents of the element or an empty string.

Exceptions:

- `XmlException`: An error occurred while parsing the XML.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
We recommend that you use the `XmlReader.ReadElementContentAsString` method to read the contents of an element or text node as a string.

## XmlReader.ReadSubtree() method

```csharp
public virtual System.Xml.XmlReader ReadSubtree ();
```

Returns a new `XmlReader` instance that can be used to read the current node, and all its descendants.

Returns: A new XML reader instance set to `ReadState.Initial`. Calling the `XmlReader.Read` method positions the new reader on the node that was current before the call to the `XmlReader.ReadSubtree` method.

Exceptions:

- `InvalidOperationException`: The XML reader isn't positioned on an element when this method is called.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
`XmlReader.ReadSubtree` can be called only on element nodes. When the entire sub-tree has been read, calls to the `XmlReader.Read` method returns `false`. When the new XML reader has been closed, the original reader is positioned on the `EndElement` node of the sub-tree. Thus, if you called the `XmlReader.ReadSubtree` method on the start tag of the book element, after the sub-tree has been read and the new XML reader has been closed, the original XML reader is positioned on the end tag of the book element.

You should not perform any operations on the original reader until the new reader has been closed. This action is not supported and can result in unpredictable behavior.

> **Note:**
> The `XmlReader.ReadSubtree` method isn't intended for creating copies of the XML data that you can work with independently. It's designed to create a boundary around an XML element. This is useful if you want to pass data to another component for processing and you wish to limit how much of your data the component can access. When you pass an XML reader returned by the `XmlReader.ReadSubtree` method to another application, the application can access only that XML element, not the entire XML document.

#### Examples
The following example shows how to use the `XmlReader.ReadSubtree` method.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

Use the following XML data to run the examples in this topic:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<Books>
  <Book>
    <Title>A Brief History of Time</Title>
  </Book>
  <Book>
    <Title>Principle Of Relativity</Title>
  </Book>
  <Book>
    <Title>Victory of Reason</Title>
  </Book>
  <Book>
    <Title>The Unicorn that did not Fail</Title>
  </Book>
  <Book>
    <Title>Rational Ontology</Title>
  </Book>
  <Book>
    <Title>The Meaning of Pizza</Title>
  </Book>
</Books>
```

## XmlReader.ReadToDescendant(String) method

```csharp
public virtual bool ReadToDescendant (string name);
```

Advances the `XmlReader` to the next descendant element with the specified qualified name.

Parameters:

- `name`: The qualified name of the element you wish to move to.

Returns: `true` if a matching descendant element is found; otherwise `false`. If a matching descendant element is not found, the `XmlReader` is positioned on the end tag (`XmlReader.NodeType` is `XmlNodeType.EndElement`) of the element.

If the `XmlReader` is not positioned on an element when `XmlReader.ReadToDescendant` was called, this method returns `false` and the position of the `XmlReader` is not changed.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The parameter is an empty string.

#### Examples
The following example parses the second book node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the file, `2books.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/2books.xml._
## XmlReader.ReadToDescendant(String, String) method

```csharp
public virtual bool ReadToDescendant (string localName, string namespaceURI);
```

Advances the `XmlReader` to the next descendant element with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the element you wish to move to.
- `namespaceURI`: The namespace URI of the element you wish to move to.

Returns: `true` if a matching descendant element is found; otherwise `false`. If a matching descendant element is not found, the `XmlReader` is positioned on the end tag (`XmlReader.NodeType` is `XmlNodeType.EndElement`) of the element.

If the `XmlReader` is not positioned on an element when `XmlReader.ReadToDescendant` was called, this method returns `false` and the position of the `XmlReader` is not changed.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentNullException`: Both parameter values are `null`.

To be added.

## XmlReader.ReadToFollowing(String) method

```csharp
public virtual bool ReadToFollowing (string name);
```

Reads until an element with the specified qualified name is found.

Parameters:

- `name`: The qualified name of the element.

Returns: `true` if a matching element is found; otherwise `false` and the `XmlReader` is in an end of file state.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The parameter is an empty string.

#### Remarks
This method is functionally equivalent executing the `following::name` XPath expression from the current node. It provides a quick way to find a named element in the XML document. It advances the reader to the next following element that matches the specified name and returns `true` if a matching element is found. Using the example below, the reader would read to the first instance of the specified element while reading forward.

```xml
<!--"sample.xml"-->
<?xml version="1.0">
   <items>
      
   </items>
</xml>
```

```csharp
XmlTextReader reader = newXmlTextReader("sample.xml");

reader.ReadToFollowing("item");
```

This method can be called on all node types.
