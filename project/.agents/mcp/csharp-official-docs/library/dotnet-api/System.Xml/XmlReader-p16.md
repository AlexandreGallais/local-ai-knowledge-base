---
title: "XmlReader class (part 16 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 16 of 16)

## XmlReader.ReadToFollowing(String, String) method

```csharp
public virtual bool ReadToFollowing (string localName, string namespaceURI);
```

Reads until an element with the specified local name and namespace URI is found.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: `true` if a matching element is found; otherwise `false` and the `XmlReader` is in an end of file state.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentNullException`: Both parameter values are `null`.

#### Remarks
This method is functionally equivalent executing the `following::name` XPath expression from the current node. It provides a quick way to find a named element in the XML document. It advances the reader to the next following element that matches the specified name and returns `true` if a matching element is found.

```xml
<!--"sample.xml"-->
<?xml version="1.0">
   <items>
      
   </items>
</xml>
```

```csharp
XmlTextReader reader = newXmlTextReader("sample.xml");

reader.ReadToFollowing("item", "urn:1");
```

This method can be called on all node types.

## XmlReader.ReadToNextSibling(String) method

```csharp
public virtual bool ReadToNextSibling (string name);
```

Advances the `XmlReader` to the next sibling element with the specified qualified name.

Parameters:

- `name`: The qualified name of the sibling element you wish to move to.

Returns: `true` if a matching sibling element is found; otherwise `false`. If a matching sibling element is not found, the `XmlReader` is positioned on the end tag (`XmlReader.NodeType` is `XmlNodeType.EndElement`) of the parent element.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentException`: The parameter is an empty string.

#### Remarks

> **Note:**
> Do not call `XmlReader.ReadToNextSibling` when the `XmlReader` is an initial state (`ReadState` is `Initial`). You can call `XmlReader.Read` to advance the `XmlReader` and then call the `XmlReader.ReadToNextSibling` method.

#### Examples
The following example reads the ISBN attribute on each book node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.ReadToNextSibling(String, String) method

```csharp
public virtual bool ReadToNextSibling (string localName, string namespaceURI);
```

Advances the `XmlReader` to the next sibling element with the specified local name and namespace URI.

Parameters:

- `localName`: The local name of the sibling element you wish to move to.
- `namespaceURI`: The namespace URI of the sibling element you wish to move to.

Returns: `true` if a matching sibling element is found; otherwise, `false`. If a matching sibling element is not found, the `XmlReader` is positioned on the end tag (`XmlReader.NodeType` is `XmlNodeType.EndElement`) of the parent element.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentNullException`: Both parameter values are `null`.

#### Remarks

> **Note:**
> Do not call `XmlReader.ReadToNextSibling` when the `XmlReader` is an initial state (`ReadState` is `Initial`). You can call `XmlReader.Read` to advance the `XmlReader` and then call the `XmlReader.ReadToNextSibling` method.

## XmlReader.ReadValueChunk(Char[], Int32, Int32) method

```csharp
public virtual int ReadValueChunk (char[] buffer, int index, int count);
```

Reads large streams of text embedded in an XML document.

Parameters:

- `buffer`: The array of characters that serves as the buffer to which the text contents are written. This value cannot be `null`.
- `index`: The offset within the buffer where the `XmlReader` can start to copy the results.
- `count`: The maximum number of characters to copy into the buffer. The actual number of characters copied is returned from this method.

Returns: The number of characters read into the buffer. The value zero is returned when there is no more text content.

Exceptions:

- `InvalidOperationException`: The current node does not have a value (`XmlReader.HasValue` is `false`).

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `ArgumentNullException`: The `buffer` value is `null`.
- `ArgumentOutOfRangeException`: The index into the buffer, or index + count is larger than the allocated buffer size.
- `NotSupportedException`: The `XmlReader` implementation does not support this method.
- `XmlException`: The XML data is not well-formed.

#### Remarks
This method enables reading of very large streams of text embedded in an XML document in a streaming fashion, that is, a small number of characters at a time instead of allocating a single string for the whole value. This method can be called on any node that has a value (`HasValue` is `true`), however actual streaming of the node value only occurs when called on a text, white space and significant white space nodes. Other node type values are cached, including attributes and CDATA nodes.

This method returns only the content of the `Value` property and does not move the `XmlReader`.

This method reads the specified number of characters (`count`) of the node value into a character buffer (`buffer`) at a specified offset (`index`) and returns the number of characters written to the buffer. It returns the `0` when it has reached the end of the value. It cannot be restarted to read through the value again.

In between calls to `XmlReader.ReadValueChunk` the `XmlReader` properties do no change except for the `Value` property. When the `Value` property is accessed it may either return a partial value (with characters not yet returned by `XmlReader.ReadValueChunk`) or a full value depending on the implementation. All the `XmlReader` implementations in the `Xml` namespace return a partial value for the `Value` property implementation.

Any Read method can be called in between calls to `XmlReader.ReadValueChunk`. If this occurs, the `XmlReader` moves to the next `XmlNodeType` in the stream and any characters not yet returned are skipped.

There may be a case when `XmlReader.ReadValueChunk` returns less than the requested number of characters. For example, if you had a 200-character long value with a surrogate pair at positions 127 and 128 and you called `XmlReader.ReadValueChunk` with a 128-character buffer, the method call would return 127 characters instead of the requested 128. The surrogate pair would then be returned in the next `XmlReader.ReadValueChunk` call. In this case, `XmlReader.ReadValueChunk` did not return the requested 128 characters because doing so would have resulted in an incomplete surrogate pair at the end of the buffer.

For the asynchronous version of this method, see `XmlReader.ReadValueChunkAsync`.

## XmlReader.ReadValueChunkAsync(Char[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadValueChunkAsync (char[] buffer, int index, int count);
```

Asynchronously reads large streams of text embedded in an XML document.

Parameters:

- `buffer`: The array of characters that serves as the buffer to which the text contents are written. This value cannot be `null`.
- `index`: The offset within the buffer where the `XmlReader` can start to copy the results.
- `count`: The maximum number of characters to copy into the buffer. The actual number of characters copied is returned from this method.

Returns: The number of characters read into the buffer. The value zero is returned when there is no more text content.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadValueChunk`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadValueChunk`.

## XmlReader.ResolveEntity() method

```csharp
public abstract void ResolveEntity ();
```

When overridden in a derived class, resolves the entity reference for `EntityReference` nodes.

Exceptions:

- `InvalidOperationException`: The reader is not positioned on an `EntityReference` node; this implementation of the reader cannot resolve entities (`XmlReader.CanResolveEntity` returns `false`).

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
If the reader is positioned on an `EntityReference` node (`XmlNodeType.EntityReference`), if `XmlReader.Read` is called after calling this method, the entity replacement text is parsed. When the entity replacement text is finished, an `EndEntity` node is returned to close the entity reference scope.

> **Note:**
> After calling this method, if the entity is part of an attribute value, you must call `XmlReader.ReadAttributeValue` to step into the entity.

## XmlReader.Skip() method

```csharp
public virtual void Skip ();
```

Skips the children of the current node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
In the following XML input if the reader is positioned on the `` node or any of its attributes, calling `Skip` positions the reader to the `` node.

If the reader is positioned on a leaf node already (such as the `<x>` node or the text node `abc`), calling `Skip` is the same as calling `XmlReader.Read`.

```xml
<a name="bob" age="123">
 abc
</a>

...

```

This method checks for well-formed XML.

If the reader is an `XmlValidatingReader`, this method also validates the skipped content.

The `XmlReader` implementation determines whether or not the `Skip` method will expand external entities. The following table describes whether the external entities are expanded for the various types of `XmlReader` objects.

|Type of XmlReader|Expands external entities|
|-----------------------|-------------------------------|
|`XmlTextReader`|No.|
|`XmlReader` instance created by the `XmlReader.Create` method that is reading text data.|No.|
|`XmlReader` instance created by the `XmlReader.Create` method that is reading binary data.|Not applicable.|
|A schema validating `XmlReader` instance created by the `XmlReader.Create` method.|Yes.|
|`XmlValidatingReader`|Yes.|
|`XmlReader` instance returned by a `XPathNavigator` object.|Not applicable.|
|`XmlNodeReader`|No.|
|`XmlReader` instance wrapped around another `XmlReader` instance.|Depends on the implementation of the underlying `XmlReader`. (The `Skip` method on the underlying `XmlReader` is called).|

For the asynchronous version of this method, see `XmlReader.SkipAsync`.

#### Examples
The following example parses an XML file starting on the second book node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the file, `2books.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/2books.xml._
## XmlReader.SkipAsync() method

```csharp
public virtual System.Threading.Tasks.Task SkipAsync ();
```

Asynchronously skips the children of the current node.

Returns: The current node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.Skip`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Skip`.
