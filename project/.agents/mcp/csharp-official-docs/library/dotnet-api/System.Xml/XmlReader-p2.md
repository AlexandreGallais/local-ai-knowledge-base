---
title: "XmlReader class (part 2 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 2 of 16)

When the XML reader is positioned on an XML declaration node, the `Value` property returns the version, standalone, and encoding information as a single string. `XmlReader` objects created by the `XmlReader.Create` method, the `XmlTextReader` class, and the `XmlValidatingReader` class expose the version, standalone, and encoding items as attributes.

**Reading attributes on document type nodes**

When the XML reader is positioned on a document type node, the `XmlReader.GetAttribute` method and `Item` property can be used to return the values for the SYSTEM and PUBLIC literals. For example, calling `reader.GetAttribute("PUBLIC")` returns the PUBLIC value.

**Reading attributes on processing instruction nodes**

When the `XmlReader` is positioned on a processing instruction node, the `Value` property returns the entire text content. Items in the processing instruction node aren't treated as attributes. They can't be read with the `XmlReader.GetAttribute` or `XmlReader.MoveToAttribute` method.

#### Read XML content

The XmlReader class includes the following members that read content from an XML file and return the content as string values. (To return CLR types, see Convert to CLR types.)

|Use this `XmlReader` member|To|
|---------------------------------------------------------------------------------------------------------------------------------------------------|--------|
|`Value` property|Get the text content of the current node. The value returned depends on the node type; see the `Value` reference page for details.|
|`XmlReader.ReadString` method|Get the content of an element or text node as a string. This method stops on processing instructions and comments.For details on how this method handles specific node types, see the `XmlReader.ReadString` reference page.|
|`XmlReader.ReadInnerXml` and `XmlReader.ReadInnerXmlAsync` methods|Get all the content of the current node, including the markup, but excluding start and end tags. For example, for:`<node>this</node>``XmlReader.ReadInnerXml` returns:`this`|
|`XmlReader.ReadOuterXml` and `XmlReader.ReadOuterXmlAsync` methods|Get all the content of the current node and its children, including markup and start/end tags. For example, for:`<node>this</node>``XmlReader.ReadOuterXml` returns:`<node>this</node>`|

#### Convert to CLR types

You can use the members of the `XmlReader` class (listed in the following table) to read XML data and return values as common language runtime (CLR) types instead of strings. These members enable you to get values in the representation that is most appropriate for your coding task without having to manually parse or convert string values.

- The **ReadElementContentAs** methods can only be called on element node types. These methods cannot be used on elements that contain child elements or mixed content. When called, the `XmlReader` object reads the start tag, reads the element content, and then moves past the end element tag. Processing instructions and comments are ignored and entities are expanded.

- The **ReadContentAs** methods read the text content at the current reader position, and if the XML data doesn't have any schema or data type information associated with it, convert the text content to the requested return type. Text, white space, significant white space and CDATA sections are concatenated. Comments and processing instructions are skipped, and entity references are automatically resolved.

The `XmlReader` class uses the rules defined by the W3C XML Schema Part 2: Datatypes recommendation.

|Use this `XmlReader` method|To return this CLR type|
|--------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|
|`XmlReader.ReadContentAsBoolean` and `XmlReader.ReadElementContentAsBoolean`|`Boolean`|
|`XmlReader.ReadContentAsDateTime` and `XmlReader.ReadElementContentAsDateTime`|`DateTime`|
|`XmlReader.ReadContentAsDouble` and `XmlReader.ReadElementContentAsDouble`|`Double`|
|`XmlReader.ReadContentAsLong` and `XmlReader.ReadElementContentAsLong`|`Int64`|
|`XmlReader.ReadContentAsInt` and `XmlReader.ReadElementContentAsInt`|`Int32`|
|`XmlReader.ReadContentAsString` and `XmlReader.ReadElementContentAsString`|`String`|
|`XmlReader.ReadContentAs` and `XmlReader.ReadElementContentAs`|The type you specify with the `returnType` parameter|
|`XmlReader.ReadContentAsObject` and `XmlReader.ReadElementContentAsObject`|The most appropriate type, as specified by the `ValueType` property. See Type Support in the System.Xml Classes for mapping information.|

If an element can't easily be converted to a CLR type because of its format, you can use a schema mapping to ensure a successful conversion. The following example uses an .xsd file to convert the `hire-date` element to the `xs:date` type, and then uses the `XmlReader.ReadElementContentAsDateTime` method to return the element as a `DateTime` object.

**Input (hireDate.xml):**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/xml/hireDate.xml._
**Schema (hireDate.xsd):**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/xml/hireDate.xsd._
**Code:**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/readElementContentAs.cs._

**Output:**

```
Six Month Review Date:  7/8/2003 12:00:00 AM
```

#### Asynchronous programming

Most of the `XmlReader` methods have asynchronous counterparts that have "Async" at the end of their method names. For example, the asynchronous equivalent of `XmlReader.ReadContentAsObject` is `XmlReader.ReadContentAsObjectAsync`.

The following methods can be used with asynchronous method calls:

- `XmlReader.GetAttribute`
- `XmlReader.MoveToAttribute`
- `XmlReader.MoveToFirstAttribute`
- `XmlReader.MoveToNextAttribute`
- `XmlReader.MoveToElement`
- `XmlReader.ReadAttributeValue`
- `XmlReader.ReadSubtree`
- `XmlReader.ResolveEntity`

The following sections describe asynchronous usage for methods that don't have asynchronous counterparts.

**ReadStartElement method**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/program.cs._

**ReadEndElement method**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/program.cs._

**ReadToNextSibling method**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/program.cs._

**ReadToFollowing method**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/program.cs._

**ReadToDescendant method**

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/program.cs._

#### Security considerations

Consider the following when working with the `XmlReader` class:

- Exceptions thrown from the `XmlReader` can disclose path information that you might not want bubbled up to your app. Your app must catch exceptions and process them appropriately.

- Do not enable DTD processing if you're concerned about denial of service issues or if you're dealing with untrusted sources. DTD processing is disabled by default for `XmlReader` objects created by the `XmlReader.Create` method.

- XML data can include references to external resources such as a schema file. By default, external resources are resolved by using an `XmlUrlResolver` object with no user credentials. You can secure this further by doing one of the following:

- Use `ThrowingResolver` when attempting to forbid XML external entity resolution.
- Do not allow the `XmlReader` to open any external resources by setting the `XmlResolver` property to `null`.

- The `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags of an `XmlReaderSettings` object aren't set by default. This helps to protect the `XmlReader` against schema-based attacks when it is processing XML data from an untrusted source. When these flags are set, the `XmlResolver` of the `XmlReaderSettings` object is used to resolve schema locations encountered in the instance document in the `XmlReader`. If the `XmlResolver` property is set to `null`, schema locations aren't resolved even if the `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags are set.

Schemas added during validation add new types and can change the validation outcome of the document being validated. As a result, external schemas should only be resolved from trusted sources.

We recommend disabling the `ProcessIdentityConstraints` flag when validating untrusted, large XML documents in high availability scenarios against a schema that has identity constraints over a large part of the document. This flag is enabled by default.

- XML data can contain a large number of attributes, namespace declarations, nested elements and so on that require a substantial amount of time to process. To limit the size of the input that is sent to the `XmlReader`, you can:

- Limit the size of the document by setting the `MaxCharactersInDocument` property.

- Limit the number of characters that result from expanding entities by setting the `MaxCharactersFromEntities` property.

- Create a custom `IStream` implementation for the `XmlReader`.

- The `XmlReader.ReadValueChunk` method can be used to handle large streams of data. This method reads a small number of characters at a time instead of allocating a single string for the whole value.

- When reading an XML document with a large number of unique local names, namespaces, or prefixes, a problem can occur. If you are using a class that derives from `XmlReader`, and you call the `LocalName`, `Prefix`, or `NamespaceURI` property for each item, the returned string is added to a `NameTable`. The collection held by the `NameTable` never decreases in size, creating a virtual memory leak of the string handles. One mitigation for this is to derive from the `NameTable` class and enforce a maximum size quota. (There is no way to prevent the use of a `NameTable`, or to switch the `NameTable` when it is full). Another mitigation is to avoid using the properties mentioned and instead use the `XmlReader.MoveToAttribute` method with the `XmlReader.IsStartElement` method where possible; those methods don't return strings and thus avoid the problem of overfilling the `NameTable` collection.

- `XmlReaderSettings` objects can contain sensitive information such as user credentials. An untrusted component could use the `XmlReaderSettings` object and its user credentials to create `XmlReader` objects to read data. Be careful when caching `XmlReaderSettings` objects, or when passing the `XmlReaderSettings` object from one component to another.

- Do not accept supporting components, such as `NameTable`, `XmlNamespaceManager`, and `XmlResolver` objects, from an untrusted source.

The following example code shows how to use the asynchronous API to parse XML.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/program.cs._

## XmlReader.XmlReader() constructor

```csharp
protected XmlReader ();
```

Initializes a new instance of the `XmlReader` class.

#### Remarks
This constructor is called by derived class constructors to initialize state in this type.

## XmlReader.AttributeCount property

```csharp
public abstract int AttributeCount { get; }
```

When overridden in a derived class, gets the number of attributes on the current node.

Returns: The number of attributes on the current node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property is relevant to `Element`, `DocumentType` and `XmlDeclaration` nodes only. (Other node types do not have attributes.)

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.BaseURI property

```csharp
public abstract string BaseURI { get; }
```

When overridden in a derived class, gets the base URI of the current node.

Returns: The base URI of the current node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
A networked XML document is comprised of chunks of data aggregated using various W3C standard inclusion mechanisms and therefore contains nodes that come from different places. DTD entities are an example of this, but this is not limited to DTDs. The base URI tells you where these nodes came from. If there is no base URI for the nodes being returned (for example, they were parsed from an in-memory string), `String.Empty` is returned.

## XmlReader.CanReadBinaryContent property

```csharp
public virtual bool CanReadBinaryContent { get; }
```

Gets a value indicating whether the `XmlReader` implements the binary content read methods.

Returns: `true` if the binary content read methods are implemented; otherwise `false`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The binary content read methods include the `XmlReader.ReadContentAsBase64`, `XmlReader.ReadContentAsBinHex`, `XmlReader.ReadElementContentAsBase64`, and `XmlReader.ReadElementContentAsBinHex` methods. If this property returns `false`, a `NotSupportedException` is returned when any of the binary read methods is called.

All .NET implementations of the `XmlReader` class return `true` for this property.

## XmlReader.CanReadValueChunk property

```csharp
public virtual bool CanReadValueChunk { get; }
```

Gets a value indicating whether the `XmlReader` implements the `XmlReader.ReadValueChunk` method.

Returns: `true` if the `XmlReader` implements the `XmlReader.ReadValueChunk` method; otherwise `false`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
Text parsing `XmlReader` objects that were created from the static `XmlReader.Create` method always return `true`. All other .NET implementations of the `XmlReader` class, including the `XmlTextReader` class, return `false`.

If this property returns `false` a `NotSupportedException` is returned when the `XmlReader.ReadValueChunk` method is called.
