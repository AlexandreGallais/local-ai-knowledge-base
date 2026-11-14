---
title: "XmlWriter class (part 1 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriter class

Namespace: `System.Xml`

```csharp
public abstract class XmlWriter : IAsyncDisposable, IDisposable
```

Represents a writer that provides a fast, non-cached, forward-only way to generate streams or files that contain XML data.

The `XmlWriter` class writes XML data to a stream, file, text, or string. It supports the W3C Extensible Markup Language (XML) 1.0 (fourth edition) and Namespaces in XML 1.0 (third edition) recommendations.

The members of the `XmlWriter` class enable you to:

- Verify that the characters are legal XML characters and that element and attribute names are valid XML names.
- Verify that the XML document is well-formed.
- Encode binary bytes as Base64 or BinHex, and write out the resulting text.
- Pass <example-value> by using common language runtime types instead of strings, to avoid having to manually perform value conversions.
- Write multiple documents to one output stream.
- Write valid names, qualified names, and name tokens.

#### Create an XML writer

To create an `XmlWriter` instance, use the `XmlWriter.Create` method. To specify the set of features you want to enable on the XML writer, pass an `XmlWriterSettings` to the `XmlWriter.Create` method. Otherwise, default settings are used. See the `XmlWriter.Create` reference pages for details.

#### Specify the output format

The `XmlWriterSettings` class includes several properties that control how `XmlWriter` output is formatted:

|Property|Description|
|--------------|-----------------|
|`Encoding`|Specifies the text encoding to use. The default is `Encoding.UTF8`.|
|`Indent`|Indicates whether to indent elements. The default is `false` (no indentation).|
|`IndentChars`|Specifies the character string to use when indenting. The default is two spaces.|
|`NewLineChars`|Specifies the character string to use for line breaks. The default is `\r\n` (carriage return, line feed) for non-Unix platforms, and `\n` (line feed) for Unix platforms.|
|`NewLineHandling`|Specifies how to handle newline characters.|
|`NewLineOnAttributes`|Indicates whether to write attributes on a new line. `Indent` should be set to `true` when using this property. The default is `false`.|
|`OmitXmlDeclaration`|Indicates whether to write an XML declaration. The default is `false`.|

The `Indent` and `IndentChars` properties control how insignificant white space is formatted. For example, to indent element nodes:

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

Use the `NewLineOnAttributes` to write each attribute on a new line with one extra level of indentation:

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

#### Data conformance

An XML writer uses two properties from the `XmlWriterSettings` class to check for data conformance:

- The `CheckCharacters` property instructs the XML writer to check characters and throw an `XmlException` exception if any characters are outside the legal range, as defined by the W3C.

- The `ConformanceLevel` property configures the XML writer to check that the stream being written complies with the rules for a well-formed XML 1.0 document or document fragment, as defined by the W3C. The three conformance levels are described in the following table. The default is `Document`. For details, see the `ConformanceLevel` property and the `ConformanceLevel` enumeration.

|Level|Description|
|-----------|-----------------|
|`Document`|The XML output conforms to the rules for a well-formed XML 1.0 document and can be processed by any conforming processor.|
|`Fragment`|The XML output conforms to the rules for a well-formed XML 1.0 document fragment.|
|`Auto`|The XML writer determines which level of conformation checking to apply (document or fragment) based on the incoming data.|

#### Write elements

You can use the following `XmlWriter` methods to write element nodes. For examples, see the methods listed.

| Use | To |
|-----|----|
|`XmlWriter.WriteElementString`|Write an entire element node, including a string value.|
|`XmlWriter.WriteStartElement`|To write an element value by using multiple method calls. For example, you can call `XmlWriter.WriteValue` to write a typed value, `XmlWriter.WriteCharEntity` to write a character entity, `XmlWriter.WriteAttributeString` to write an attribute, or you can write a child element. This is a more sophisticated version of the `XmlWriter.WriteElementString` method.To close the element, you call the `XmlWriter.WriteEndElement` or `XmlWriter.WriteFullEndElement` method.|
|`XmlWriter.WriteNode`|To copy an element node found at the current position of an `XmlReader` or `XPathNavigator` object. When called, it copies everything from the source object to the `XmlWriter` instance.|

#### Write attributes

You can use the following `XmlWriter` methods to write attributes on element nodes. These methods can also be used to create namespace declarations on an element, as discussed in the next section.

| Use | To |
|-----|----|
|`XmlWriter.WriteAttributeString`|To write an entire attribute node, including a string value.|
|`XmlWriter.WriteStartAttribute`|To write the attribute value using multiple method calls. For example, you can call `XmlWriter.WriteValue` to write a typed value. This is a more sophisticated version of the `XmlWriter.WriteElementString` method.To close the element, you call the `XmlWriter.WriteEndAttribute` method.|
|`XmlWriter.WriteAttributes`|To copy all the attributes found at the current position of an `XmlReader` object. The attributes that are written depend on the type of node the reader is currently positioned on:- For an attribute node, it writes the current attribute, and then the rest of the attributes until the element closing tag.- For an element node, it writes all attributes contained by the element.- For an XML declaration node, it writes all the attributes in the declaration.- For all other node types, the method throws an exception.|

#### Handle namespaces

Namespaces are used to qualify element and attribute names in an XML document. Namespace prefixes associate elements and attributes with namespaces, which are in turn associated with URI references. Namespaces create element and attribute name uniqueness in an XML document.

The `XmlWriter` maintains a namespace stack that corresponds to all the namespaces defined in the current namespace scope. When writing elements and attributes you can utilize namespaces in the following ways:

- Declare namespaces manually by using the `XmlWriter.WriteAttributeString` method. This can be useful when you know how to best optimize the number of namespace declarations. For an example, see the `WriteAttributeString` method.

- Override the current namespace declaration with a new namespace. In the following code, the `XmlWriter.WriteAttributeString` method changes the namespace URI for the `"x"` prefix from `"123"` to `"abc"`.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Overview/writer_v2.cs._

The code generates the following XML string:

```xml
    <x:root xmlns:x="123">
      
    </x:root>
```

- Specify a namespace prefix when writing attributes or elements. Many of the methods used to write element and attributes enable you to do this. For example, the `WriteStartElement` method writes a start tag and associates it with a specified namespace and prefix.

#### Write typed data

The `XmlWriter.WriteValue` method accepts a common language runtime (CLR) object, converts the input value to its string representation according to XML schema definition language (XSD) data type conversion rules, and writes it out by using the `XmlWriter.WriteString` method. This is easier than using the methods in the `XmlConvert` class to convert the typed data to a string value before writing it out.

When writing to text, the typed value is serialized to text by using the `XmlConvert` rules for that schema type.

For default XSD data types that correspond to CLR types, see the `XmlWriter.WriteValue` method.

The `XmlWriter` can also be used to write to an XML data store. For example, the `XPathNavigator` class can create an `XmlWriter` object to create nodes for an `XmlDocument` object. If the data store has schema information available to it, the `XmlWriter.WriteValue` method throws an exception if you try to convert to a type that is not allowed. If the data store does not have schema information available to it, the `XmlWriter.WriteValue` method treats all values as an `xsd:anySimpleType` type.

#### Close the XML writer

When you use `XmlWriter` methods to output XML, the elements and attributes are not written until you call the `XmlWriter.Close` method. For example, if you are using `XmlWriter` to populate an `XmlDocument` object, you won't be able to see the written elements and attributes in the target document until you close the `XmlWriter` instance.

#### Asynchronous programming

Most of the `XmlWriter` methods have asynchronous counterparts that have "Async" at the end of their method names. For example, the asynchronous equivalent of `XmlWriter.WriteAttributeString` is `XmlWriter.WriteAttributeStringAsync`.

For the `XmlWriter.WriteValue` method, which doesn't have an asynchronous counterpart, convert the return value to a string and use the `XmlWriter.WriteStringAsync` method instead.

#### Security considerations

Consider the following when working with the `XmlWriter` class:

- Exceptions thrown by the `XmlWriter` can disclose path information that you do not want bubbled up to the app. Your app must catch exceptions and process them appropriately.

- `XmlWriter` does not validate any data that is passed to the `XmlWriter.WriteDocType` or `XmlWriter.WriteRaw` method. You should not pass <example-value> data to these methods.

The following example code shows how to use the asynchronous API to generate XML.

```csharp

    async Task TestWriter(Stream stream)
    {
        XmlWriterSettings settings = new XmlWriterSettings();
        settings.Async = true;

        using (XmlWriter writer = XmlWriter.Create(stream, settings)) {
            await writer.WriteStartElementAsync("pf", "root", "http://ns");
            await writer.WriteStartElementAsync(null, "sub", null);
            await writer.WriteAttributeStringAsync(null, "att", null, "val");
            await writer.WriteStringAsync("text");
            await writer.WriteEndElementAsync();
            await writer.WriteProcessingInstructionAsync("pName", "pValue");
            await writer.WriteCommentAsync("cValue");
            await writer.WriteCDataAsync("cdata value");
            await writer.WriteEndElementAsync();
            await writer.FlushAsync();
        }
    }
    
```

## XmlWriter.XmlWriter() constructor

```csharp
protected XmlWriter ();
```

Initializes a new instance of the `XmlWriter` class.

To be added.

## XmlWriter.Settings property

```csharp
public virtual System.Xml.XmlWriterSettings? Settings { get; }
```

Gets the `XmlWriterSettings` object used to create this `XmlWriter` instance.

Returns: The `XmlWriterSettings` object used to create this writer instance. If this writer was not created using the `Create` method, this property returns `null`.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The `XmlWriterSettings` class is used to specify the set of features to support on the created writer instance. The `XmlWriterSettings` object returned by the `Settings` property cannot be modified. Any attempt to change individual settings results in an exception being thrown.

## XmlWriter.WriteState property

```csharp
public abstract System.Xml.WriteState WriteState { get; }
```

When overridden in a derived class, gets the state of the writer.

Returns: One of the `WriteState` values.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

To be added.

## XmlWriter.XmlLang property

```csharp
public virtual string? XmlLang { get; }
```

When overridden in a derived class, gets the current `xml:lang` scope.

Returns: The current `xml:lang` scope.

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property allows one component to find out in what state another component has left the writer. For example, perhaps one component wants to tell another which language help text to generate. The language information is communicated by writing an `xml:lang` attribute.

## XmlWriter.XmlSpace property

```csharp
public virtual System.Xml.XmlSpace XmlSpace { get; }
```

When overridden in a derived class, gets an `XmlSpace` representing the current `xml:space` scope.

Returns: An `XmlSpace` representing the current `xml:space` scope.

- `None`:  This is the default if no `xml:space` scope exists.

- `Default`:  The current scope is `xml:space`="default".

- `Preserve`:  The current scope is `xml:space`="preserve".

Exceptions:

- `InvalidOperationException`: An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This allows one component to find out what state another component has left the writer in.

## XmlWriter.Close() method

```csharp
public virtual void Close ();
```

When overridden in a derived class, closes this stream and the underlying stream.

Exceptions:

- `InvalidOperationException`: A call is made to write more output after `Close` has been called or the result of this call is an invalid XML document.

-or-

An `XmlWriter` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
Any elements or attributes left open are automatically closed.

> **Note:**
> When you use the `XmlWriter` methods to output XML, the elements and attributes will not be written until you call the `XmlWriter.Close` method. For example, if you are using the XmlWriter to populate an `XmlDocument`, until you close the `XmlWriter`, you will not be able to observe the written elements and attributes in the target document.

#### Examples
The following example writes an XML node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Close/writeelems.cs._
