---
title: "XmlReader class (part 12 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 12 of 16)

## XmlReader.ReadElementContentAsBoolean(String, String) method

```csharp
public virtual bool ReadElementContentAsBoolean (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a `Boolean` object.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content as a `Boolean` object.

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

If the content is typed `xsd:boolean`, the reader returns an unboxed `Boolean` object. If the content is not typed `xsd:boolean`, the reader attempts to convert it to a `Boolean` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsDateTime() method

```csharp
public virtual DateTime ReadElementContentAsDateTime ();
```

Reads the current element and returns the contents as a `DateTime` object.

Returns: The element content as a `DateTime` object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a `DateTime` object.
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

If the content is typed `xsd:dateTime`, the reader returns an unboxed `DateTime` object. If the content is not typed `xsd:dateTime`, the reader attempts to convert it to a `DateTime` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

> **Note:**
> You cannot rely on the `DateTime.Year` value when the content is typed as `xsd:gMonthDay`. `XmlReader` always sets the `DateTime.Year` value to 1904 in this case.

For more information, see the Remarks section of the `XmlReader` reference page.

#### Examples
The following example uses the `XmlReader.ReadElementContentAsDateTime` method to read the content of the `date` element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

The example uses the `dataFile.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/dataFile.xml._
## XmlReader.ReadElementContentAsDateTime(String, String) method

```csharp
public virtual DateTime ReadElementContentAsDateTime (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a `DateTime` object.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element contents as a `DateTime` object.

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

If the content is typed `xsd:dateTime`, the reader returns an unboxed `DateTime` object. If the content is not typed `xsd:dateTime`, the reader attempts to convert it to a `DateTime` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

> **Note:**
> You cannot rely on the `DateTime.Year` value when the content is typed as `xsd:gMonthDay`. `XmlReader` always sets the `DateTime.Year` value to 1904 in this case.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsDecimal() method

```csharp
public virtual decimal ReadElementContentAsDecimal ();
```

Reads the current element and returns the contents as a `Decimal` object.

Returns: The element content as a `Decimal` object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a `Decimal`.
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

The reader attempts to convert the element content to an `Decimal` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsDecimal(String, String) method

```csharp
public virtual decimal ReadElementContentAsDecimal (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a `Decimal` object.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content as a `Decimal` object.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a `Decimal`.
- `ArgumentNullException`: The method is called with `null` arguments.
- `ArgumentException`: The specified local name and namespace URI do not match that of the current element being read.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

The reader attempts to convert the element content to an `Decimal` object according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsDouble() method

```csharp
public virtual double ReadElementContentAsDouble ();
```

Reads the current element and returns the contents as a double-precision floating-point number.

Returns: The element content as a double-precision floating-point number.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a double-precision floating-point number.
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

If the content is typed `xsd:double`, the reader returns a double-precision floating-point number. If the content is not typed `xsd:double`, the reader attempts to convert it to a double-precision floating-point number according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

#### Examples
The following example uses the method to return the element content as a double-precision floating-point number.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

The example uses the `dataFile.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader.ReadElementContentAs/XML/dataFile.xml._
## XmlReader.ReadElementContentAsDouble(String, String) method

```csharp
public virtual double ReadElementContentAsDouble (string localName, string namespaceURI);
```

Checks that the specified local name and namespace URI matches that of the current element, then reads the current element and returns the contents as a double-precision floating-point number.

Parameters:

- `localName`: The local name of the element.
- `namespaceURI`: The namespace URI of the element.

Returns: The element content as a double-precision floating-point number.

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

If the content is typed `xsd:double`, the reader returns a double-precision floating-point number. If the content is not typed `xsd:double`, the reader attempts to convert it to a double-precision floating-point number according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.

## XmlReader.ReadElementContentAsFloat() method

```csharp
public virtual float ReadElementContentAsFloat ();
```

Reads the current element and returns the contents as single-precision floating-point number.

Returns: The element content as a single-precision floating point number.

Exceptions:

- `InvalidOperationException`: The `XmlReader` is not positioned on an element.

-or-

An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."
- `XmlException`: The current element contains child elements.

-or-

The element content cannot be converted to a single-precision floating-point number.
- `ArgumentNullException`: The method is called with `null` arguments.

#### Remarks
This method reads the start tag, the contents of the element, and moves the reader past the end element tag. It expands entities and ignores processing instructions and comments. The element can only contain simple content. That is, it cannot have child elements.

The reader attempts to convert the element content to a single-precision floating point number according to the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

For more information, see the Remarks section of the `XmlReader` reference page.
