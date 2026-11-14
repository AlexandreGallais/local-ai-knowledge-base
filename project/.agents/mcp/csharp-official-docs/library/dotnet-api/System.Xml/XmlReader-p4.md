---
title: "XmlReader class (part 4 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 4 of 16)

## XmlReader.Prefix property

```csharp
public abstract string Prefix { get; }
```

When overridden in a derived class, gets the namespace prefix associated with the current node.

Returns: The namespace prefix associated with the current node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example displays the local name of each node, and, if they exist, the prefix and namespace URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the file, book2.xml, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/book2.xml._
## XmlReader.QuoteChar property

```csharp
public virtual char QuoteChar { get; }
```

When overridden in a derived class, gets the quotation mark character used to enclose the value of an attribute node.

Returns: The quotation mark character (" or ') used to enclose the value of an attribute node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property applies only to an attribute node.

## XmlReader.ReadState property

```csharp
public abstract System.Xml.ReadState ReadState { get; }
```

When overridden in a derived class, gets the state of the reader.

Returns: One of the enumeration values that specifies the state of the reader.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The `ReadState` property has one of the following values:

- `Initial`, when the `XmlReader.Read` method is called.

- `Interactive`, when the `XmlReader.Read` method has been called, and additional methods may be called on the reader.

- `EndOfFile`, when the end of the XML document has been reached successfully.

- `Closed`, when the `XmlReader.Close` method is called.

- `Error`, when an error is preventing the read operation from continuing.

## XmlReader.SchemaInfo property

```csharp
public virtual System.Xml.Schema.IXmlSchemaInfo? SchemaInfo { get; }
```

Gets the schema information that has been assigned to the current node as a result of schema validation.

Returns: An `IXmlSchemaInfo` object containing the schema information for the current node. Schema information can be set on elements, attributes, or on text nodes with a non-null `XmlReader.ValueType` (typed values).

If the current node is not one of the above node types, or if the `XmlReader` instance does not report schema information, this property returns `null`.

If this property is called from an `XmlTextReader` or an `XmlValidatingReader` object, this property always returns `null`. These `XmlReader` implementations do not expose schema information through the `SchemaInfo` property.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks

The `IXmlSchemaInfo` interface exposes a subset of the Post Schema Validation Infoset (PSVI) associated with an XML node.

If you have to get the post-schema-validation information set (PSVI) for an element, position the reader on the end tag of the element, rather than on the start tag. You get the PSVI through the `SchemaInfo` property of a reader. The validating reader that is created through `XmlReader.Create` with the `ValidationType` property set to `Schema` has complete PSVI for an element only when the reader is positioned on the end tag of an element.

## XmlReader.Settings property

```csharp
public virtual System.Xml.XmlReaderSettings? Settings { get; }
```

Gets the `XmlReaderSettings` object used to create this `XmlReader` instance.

Returns: The `XmlReaderSettings` object used to create this reader instance. If this reader was not created using the `Create` method, this property returns `null`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks

> **Important:**
> The `XmlReaderSettings` object can contain sensitive information such as user credentials. Applications must be careful when caching this object or passing it to another component.

The `XmlReaderSettings` class is used to specify the set of features to support on the created reader instance. The `XmlReaderSettings` object returned by this property cannot be modified. Any attempt to change individual settings results in an exception being thrown.

## XmlReader.Value property

```csharp
public abstract string Value { get; }
```

When overridden in a derived class, gets the text value of the current node.

Returns: The value returned depends on the `XmlReader.NodeType` of the node. The following table lists node types that have a value to return. All other node types return `String.Empty`.

- `Attribute`:  The value of the attribute.

- `CDATA`:  The content of the CDATA section.

- `Comment`:  The content of the comment.

- `DocumentType`:  The internal subset.

- `ProcessingInstruction`:  The entire content, excluding the target.

- `SignificantWhitespace`:  The white space between markup in a mixed content model.

- `Text`:  The content of the text node.

- `Whitespace`:  The white space between markup.

- `XmlDeclaration`:  The content of the declaration.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
For the asynchronous version of this property, see the `XmlReader.GetValueAsync` method.

#### Examples
The following example reads an XML file and displays each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The sample uses the `items.xml` file.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/items.xml._
## XmlReader.ValueType property

```csharp
public virtual Type ValueType { get; }
```

Gets The Common Language Runtime (CLR) type for the current node.

Returns: The CLR type that corresponds to the typed value of the node. The default is `System.String`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
See Type Support in the System.Xml Classes for a list of the default mappings.

An element of type `xs:int` has a `ValueType` of `System.Int32` by default. However, the `ValueType` could be one of the valid types that can be mapped to `xs:int`, such as `System.Int16` or `System.Double`.

If a node is un-typed, or if the node is an element that contains mixed content, the node value is mapped to the `System.String` type.

## XmlReader.XmlLang property

```csharp
public virtual string XmlLang { get; }
```

When overridden in a derived class, gets the current `xml:lang` scope.

Returns: The current `xml:lang` scope.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property represents the `xml:lang` scope within which the current node resides. For example, here is an XML fragment with `xml:lang` set to US English in the root element:

```xml
<root xml:lang="en-us">
<name>Fred</name>
</root>
```

When the reader is positioned on the `name` element, you can use this property to find that it is in the scope of a US English `xml:lang` attribute.

#### Examples
See `XmlLang` for an example of using this property.

## XmlReader.XmlSpace property

```csharp
public virtual System.Xml.XmlSpace XmlSpace { get; }
```

When overridden in a derived class, gets the current `xml:space` scope.

Returns: One of the `XmlSpace` values. If no `xml:space` scope exists, this property defaults to `XmlSpace.None`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
See `XmlSpace` (in the `XmlTextReader` class) for an example using this property.

## XmlReader.Close() method

```csharp
public virtual void Close ();
```

When overridden in a derived class, changes the `XmlReader.ReadState` to `ReadState.Closed`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This method also releases any resources held during reading. If `XmlReader.Close` has already been called, no action is performed.

## XmlReader.Create(Stream) method

```csharp
public static System.Xml.XmlReader Create (System.IO.Stream input);
```

Creates a new `XmlReader` instance using the specified stream with default settings.

Parameters:

- `input`: The stream that contains the XML data.

The `XmlReader` scans the first bytes of the stream looking for a byte order mark or other sign of encoding. When encoding is determined, the encoding is used to continue reading the stream, and processing continues parsing the input as a stream of (Unicode) characters.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `input` value is `null`.
- `SecurityException`: The `XmlReader` does not have sufficient permissions to access the location of the XML data.

#### Remarks
An `XmlReaderSettings` object with default settings is used to create the reader. If you wish to specify the features to support on the created reader, use the overload that takes an `XmlReaderSettings` object as one of its arguments, and pass in an `XmlReaderSettings` object with the correct settings.

A default `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, specify an `XmlResolver` with the necessary credentials using the `XmlResolver` property.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

#### Examples
The following example creates an `XmlReader` object that reads from a `FileStream`.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._

## XmlReader.Create(TextReader) method

```csharp
public static System.Xml.XmlReader Create (System.IO.TextReader input);
```

Creates a new `XmlReader` instance by using the specified text reader.

Parameters:

- `input`: The text reader from which to read the XML data. A text reader returns a stream of Unicode characters, so the encoding specified in the XML declaration is not used by the XML reader to decode the data stream.

Returns: An object that is used to read the XML data in the stream.

Exceptions:

- `ArgumentNullException`: The `input` value is `null`.

#### Remarks
An `XmlReaderSettings` object with default settings is used to create the reader. If you wish to specify the features to support on the created reader, use the overload that takes an `XmlReaderSettings` object as one of its arguments, and pass in an `XmlReaderSettings` object with the correct settings.

A default `XmlUrlResolver` with no credentials is used to access any external resources such as a document type definition (DTD), entities, schemas, and so on.

> **Important:**
> No default `XmlUrlResolver` is provided. Specify an `XmlResolver` using the `XmlResolver` property.

If the external resource is located on a network resource that requires authentication, specify an `XmlResolver` with the necessary credentials using the `XmlResolver` property.

The created `XmlReader` object expands entity references and performs XML normalization of new line characters.

#### Examples
The following example uses the `StringReader` class to read an XML string.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._
