---
title: "XmlReader class (part 13 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 13 of 16)

## XmlReader.ReadElementContentAsFloat(String, String) method

```csharp
public virtual float ReadElementContentAsFloat (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a single-precision floating-point number.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content as a single-precision floating point number.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a single-precision floating-point number.
- `ArgumentNullException`: The method is called with `null` arguments.
- `ArgumentException`: The specified local name and namespace URI do not match that of the current element being read.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

The reader attempts to convert the element content to a single-precision floating point number according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsInt() method

```csharp
public virtual int ReadElementContentAsInt ();
```

Reads the current element and returns the contents as a 32-bit signed integer.

Returns: The element content as a 32-bit signed integer.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a 32-bit signed integer.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

If the content is typed `xsd:integer`, the reader returns an unboxed 32-bit signed integer. If the content is not typed `xsd:integer`, the reader attempts to convert it to a 32-bit signed integer according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsInt(String, String) method

```csharp
public virtual int ReadElementContentAsInt (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a 32-bit signed integer.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content as a 32-bit signed integer.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a 32-bit signed integer.
- `ArgumentNullException`: The method is called with `null` arguments.
- `ArgumentException`: The specified local name and namespace URI do not match that of the current element being read.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

If the content is typed `xsd:integer`, the reader returns an unboxed 32-bit signed integer. If the content is not typed `xsd:integer`, the reader attempts to convert it to a 32-bit signed integer according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsLong() method

```csharp
public virtual long ReadElementContentAsLong ();
```

Reads the current element and returns the contents as a 64-bit signed integer.

Returns: The element content as a 64-bit signed integer.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a 64-bit signed integer.
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

If the content is typed `xsd:long`, the reader returns an unboxed 64-bit signed integer. If the content is not typed `xsd:long`, the reader attempts to convert it to a 64-bit signed integer according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

#### Examples
The following example uses the `XmlReader.ReadElementContentAsLong` method to read the content of the `longValue` element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

The example uses the `dataFile.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/dataFile.xml._
## XmlReader.ReadElementContentAsLong(String, String) method

```csharp
public virtual long ReadElementContentAsLong (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a 64-bit signed integer.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content as a 64-bit signed integer.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a 64-bit signed integer.
- `ArgumentNullException`: The method is called with `null` arguments.
- `ArgumentException`: The specified local name and namespace URI do not match that of the current element being read.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

If the content is typed `xsd:long`, the reader returns an unboxed 64-bit signed integer. If the content is not typed `xsd:long`, the reader attempts to convert it to a 64-bit signed integer according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsObject() method

```csharp
public virtual object ReadElementContentAsObject ();
```

Reads the current element and returns the contents as an `Object`.

Returns: A boxed common language runtime (CLR) object of the most appropriate type. The `XmlReader.ValueType` property determines the appropriate CLR type. If the content is typed as a list type, this method returns an array of boxed objects of the appropriate type.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to the requested type
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

For the asynchronous version of this method, see `XmlReader.ReadElementContentAsObjectAsync`.

#### Examples
The following example uses the method to read the content of the `price` node. The reader uses the information in the schema to map the content to the correct data type.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

The example uses the following two files as input.

`item.xml`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/item.xml._
`item.xsd`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/item.xsd._
## XmlReader.ReadElementContentAsObject(String, String) method

```csharp
public virtual object ReadElementContentAsObject (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as an `Object`.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: A boxed common language runtime (CLR) object of the most appropriate type. The `XmlReader.ValueType` property determines the appropriate CLR type. If the content is typed as a list type, this method returns an array of boxed objects of the appropriate type.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to the requested type.
- `ArgumentNullException`: The method is called with `null` arguments.
- `ArgumentException`: The specified local name and namespace URI do not match that of the current element being read.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

For more information, see the Remarks section of the `XmlReader` reference page and the W3C XML Schema Part 2: Datatypes recommendation.

## XmlReader.ReadElementContentAsObjectAsync() method

```csharp
public virtual System.Threading.Tasks.Task<object> ReadElementContentAsObjectAsync ();
```

Asynchronously reads the current element and returns the contents as an `Object`.

Returns: A boxed common language runtime (CLR) object of the most appropriate type. The `XmlReader.ValueType` property determines the appropriate CLR type. If the content is typed as a list type, this method returns an array of boxed objects of the appropriate type.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

-or-

An `XmlReader` asynchronous method was called without setting the `XmlReaderSettings.Async` flag to `true`. In this case, `InvalidOperationException` is thrown with the message "Set XmlReaderSettings.Async to true if you want to use Async Methods."

#### Remarks
This is the asynchronous version of `XmlReader.ReadElementContentAsObject`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadElementContentAsObject`.
