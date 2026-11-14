---
title: "XmlReader class (part 7 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 7 of 16)

## XmlReader.IsStartElement(String) method

```csharp
public virtual bool IsStartElement (string name);
```

Calls `XmlReader.MoveToContent` and tests if the current content node is a start tag or empty element tag and if the `XmlReader.Name` property of the element found matches the given argument.

Parameters:

- `name`: The string matched against the `Name` property of the element found.

Returns: `true` if the resulting node is an element and the `Name` property matches the specified string. `false` if a node type other than `XmlNodeType.Element` was found or if the element `Name` property does not match the specified string.

Exceptions:

- `XmlException`: Incorrect XML is encountered in the input stream.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method skips white space, comments, and processing instructions until the reader is positioned on a content node. The method then tests if the current node is an element.

#### Examples
The following example displays each price element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.IsStartElement(String, String) method

```csharp
public virtual bool IsStartElement (string localname, string ns);
```

Calls `XmlReader.MoveToContent` and tests if the current content node is a start tag or empty element tag and if the `XmlReader.LocalName` and `XmlReader.NamespaceURI` properties of the element found match the given strings.

Parameters:

- `localname`: The string to match against the `LocalName` property of the element found.
- `ns`: The string to match against the `NamespaceURI` property of the element found.

Returns: `true` if the resulting node is an element. `false` if a node type other than `XmlNodeType.Element` was found or if the `LocalName` and `NamespaceURI` properties of the element do not match the specified strings.

Exceptions:

- `XmlException`: Incorrect XML is encountered in the input stream.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method skips white space, comments, and processing instructions until the reader is positioned on a content node. The method then tests if the current node is an element.

## XmlReader.LookupNamespace(String) method

```csharp
public abstract string? LookupNamespace (string prefix);
```

When overridden in a derived class, resolves a namespace prefix in the current element's scope.

Parameters:

- `prefix`: The prefix whose namespace URI you want to resolve. To match the default namespace, pass an empty string.

Returns: The namespace URI to which the prefix maps or `null` if no matching prefix is found.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
In the following XML string, if the reader is positioned on the `href` attribute, the prefix `a` is resolved by calling `reader.LookupNamespace("a")`. The returned string is `urn:456`.

```xml
<root xmlns:a="urn:456">
  
  
  
 </root>
```

## XmlReader.MoveToAttribute(Int32) method

```csharp
public virtual void MoveToAttribute (int i);
```

When overridden in a derived class, moves to the attribute with the specified index.

Parameters:

- `i`: The index of the attribute.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentOutOfRangeException`: The parameter has a negative value.

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.MoveToAttribute(String) method

```csharp
public abstract bool MoveToAttribute (string name);
```

When overridden in a derived class, moves to the attribute with the specified `XmlReader.Name`.

Parameters:

- `name`: The qualified name of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the reader's position does not change.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The parameter is an empty string.

#### Remarks
After calling `MoveToAttribute`, the `Name`, `NamespaceURI`, and `Prefix` properties reflect the properties of that attribute.

## XmlReader.MoveToAttribute(String, String) method

```csharp
public abstract bool MoveToAttribute (string name, string? ns);
```

When overridden in a derived class, moves to the attribute with the specified `XmlReader.LocalName` and `XmlReader.NamespaceURI`.

Parameters:

- `name`: The local name of the attribute.
- `ns`: The namespace URI of the attribute.

Returns: `true` if the attribute is found; otherwise, `false`. If `false`, the reader's position does not change.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentNullException`: Both parameter values are `null`.

#### Remarks
After calling `MoveToAttribute`, the `Name`, `NamespaceURI`, and `Prefix` properties reflect the properties of that attribute.

## XmlReader.MoveToContent() method

```csharp
public virtual System.Xml.XmlNodeType MoveToContent ();
```

Checks whether the current node is a content (non-white space text, `CDATA`, `Element`, `EndElement`, `EntityReference`, or `EndEntity`) node. If the node is not a content node, the reader skips ahead to the next content node or end of file. It skips over nodes of the following type: `ProcessingInstruction`, `DocumentType`, `Comment`, `Whitespace`, or `SignificantWhitespace`.

Returns: The `XmlReader.NodeType` of the current node found by the method or `XmlNodeType.None` if the reader has reached the end of the input stream.

Exceptions:

- `XmlException`: Incorrect XML encountered in the input stream.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If the current node is an attribute node, this method moves the reader back to the element that owns the attribute.

For the asynchronous version of this method, see `XmlReader.MoveToContentAsync`.

#### Examples
This is useful when you want to write code that can skip over random XML markup without breaking. For example, suppose you have the following code:

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/MoveToContent/source.cs._

This code can handle the following inputs without breaking:

```xml
<price>123.4</price>
```

and

```xml
<?xml version="1.0"><!DOCTYPE price SYSTEM
  "abc"><price>123.4</price>
```

and

```xml
<?xml version="1.0"><!DOCTYPE price SYSTEM "abc"
  [<!ENTITY p
  "123.4">]><price>&p;</price>
```

and

```xml
<!-- some test comment --><?processing
  instruction?><price>123.4</price>
```

## XmlReader.MoveToContentAsync() method

```csharp
public virtual System.Threading.Tasks.Task<System.Xml.XmlNodeType> MoveToContentAsync ();
```

Asynchronously checks whether the current node is a content node. If the node is not a content node, the reader skips ahead to the next content node or end of file.

Returns: The `XmlReader.NodeType` of the current node found by the method or `XmlNodeType.None` if the reader has reached the end of the input stream.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.MoveToContent`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `MoveToContent`.

## XmlReader.MoveToElement() method

```csharp
public abstract bool MoveToElement ();
```

When overridden in a derived class, moves to the element that contains the current attribute node.

Returns: `true` if the reader is positioned on an attribute (the reader moves to the element that owns the attribute); `false` if the reader is not positioned on an attribute (the position of the reader does not change).

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
Use this method to return to an element after navigating through its attributes. This method moves the reader to one of the following node types: `Element`, `DocumentType`, or `XmlDeclaration`.

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.MoveToFirstAttribute() method

```csharp
public abstract bool MoveToFirstAttribute ();
```

When overridden in a derived class, moves to the first attribute.

Returns: `true` if an attribute exists (the reader moves to the first attribute); otherwise, `false` (the position of the reader does not change).

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example gets the value of the first attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.MoveToNextAttribute() method

```csharp
public abstract bool MoveToNextAttribute ();
```

When overridden in a derived class, moves to the next attribute.

Returns: `true` if there is a next attribute; `false` if there are no more attributes.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If the current node is an element node, this method is equivalent to `XmlReader.MoveToFirstAttribute`. If `MoveToNextAttribute` returns `true`, the reader moves to the next attribute; otherwise, the position of the reader does not change.

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.Read() method

```csharp
public abstract bool Read ();
```

When overridden in a derived class, reads the next node from the stream.

Returns: `true` if the next node was read successfully; otherwise, `false`.

Exceptions:

- `XmlException`: An error occurred while parsing the XML.
- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
When an `XmlReader` is first created and initialized, there is no information available. You must call `XmlReader.Read` to read the first node. The `XmlReader.Read` method sets the state of the XML reader to initiate `Initial` and moves through the XML file sequentially until it reaches the end of the file, at which point the method returns a value of `false`.

This method requires at least four bytes from the data stream in order to begin parsing. If fewer than four bytes are returned and there is no more data in the stream, the method returns `false`. If there is more data in the stream, the method will block parsing until receipt of the fourth byte.

For the asynchronous version of this method, see `XmlReader.ReadAsync`.

#### Examples
The following example reads an XML file and displays each of the nodes:

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The sample uses the `items.xml` file.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/items.xml._
**Output:**

## XmlReader.ReadAsync() method

```csharp
public virtual System.Threading.Tasks.Task<bool> ReadAsync ();
```

Asynchronously reads the next node from the stream.

Returns: `true` if the next node was read successfully; `false` if there are no more nodes to read.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.Read`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.
