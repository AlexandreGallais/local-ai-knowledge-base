---
title: "XmlReaderSettings class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReaderSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReaderSettings class

Namespace: `System.Xml`

```csharp
public sealed class XmlReaderSettings
```

Specifies a set of features to support on the `XmlReader` object created by the `Create` method.

You use the `XmlReader.Create` method to obtain `XmlReader` instances. This method uses the `XmlReaderSettings` class to specify which features to implement in the `XmlReader` object it creates.

See the Remarks sections of the `XmlReader` and `XmlReader.Create` reference pages for information about which settings to use for conformance checks, validation, and other common scenarios. See the `%23ctor` constructor for a list of default settings.

#### Security considerations

Consider the following when using the `XmlReaderSettings` class.

- The `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags of an `XmlReaderSettings` object are not set by default. When these flags are set, the `XmlResolver` of the `XmlReaderSettings` object is used to resolve schema locations encountered in the instance document in the `XmlReader`. If the `XmlResolver` object is `null`, schema locations are not resolved even if the `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags are set.

- Schemas added during validation add new types and can change the validation outcome of the document being validated. As a result, external schemas should only be resolved from trusted sources.

- Validation error messages may expose sensitive content model information. Validation error and warning messages are handled using the `ValidationEventHandler` delegate, or are exposed as an `XmlSchemaValidationException` if no event handler is provided to the `XmlReaderSettings` object (validation warnings do not cause an `XmlSchemaValidationException` to be thrown). This content model information should not be exposed in untrusted scenarios. Validation warning messages are suppressed by default and can be reported by setting the `ReportValidationWarnings` flag.

- The `SourceUri` property of an `XmlSchemaValidationException` returns the URI path to the schema file that caused the exception. The `SourceUri` property should not be exposed in untrusted scenarios.

- Disabling the `ProcessIdentityConstraints` flag (enabled by default) is recommended when validating, untrusted, large XML documents in high availability scenarios against a schema with identity constraints over a large part of the document.

- `XmlReaderSettings` objects can contain sensitive information such as user credentials. You should be careful when caching `XmlReaderSettings` objects, or when passing the `XmlReaderSettings` object from one component to another.

- DTD processing is disabled by default. If you enable DTD processing, you need to be aware of including DTDs from untrusted sources and possible denial of service attacks. Use `ThrowingResolver` to restrict the resources that the `XmlReader` can access.

- Do not accept supporting components, such as `NameTable`, `XmlNamespaceManager`, and `XmlResolver` objects, from an untrusted source.

- Memory usage of an application that uses `XmlReader` may have a correlation to the size of the parsed XML document. One form of denial of service attack is when excessively large XML documents are submitted to be parsed. You can limit the size of the document that can be parsed by setting the `MaxCharactersInDocument` property and then limit the number of characters that result from expanding entities by setting the `MaxCharactersFromEntities` property.

The following example creates an `XmlReader` that uses an `XmlUrlResolver` with the necessary credentials.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._

## XmlReaderSettings.XmlReaderSettings() constructor

```csharp
public XmlReaderSettings ();
```

Initializes a new instance of the `XmlReaderSettings` class.

#### Remarks
The following table shows initial property values for an instance of `XmlReaderSettings`.

|Property|Initial value|
|--------------|-------------------|
|`Async`|`false`.|
|`CheckCharacters`|`true`.|
|`CloseInput`|`false`.|
|`ConformanceLevel`|`Document`.|
|`DtdProcessing`|`Prohibit`|
|`IgnoreComments`|`false`.|
|`IgnoreProcessingInstructions`|`false`.|
|`IgnoreWhitespace`|`false`.|
|`LineNumberOffset`|0.|
|`LinePositionOffset`|0.|
|`MaxCharactersFromEntities`|0 (there is no limit on the number of characters that result from expanding entities).|
|`MaxCharactersInDocument`|0 (there is no limit on the size of the XML document).|
|`NameTable`|`null`.|
|`ProhibitDtd`|`true`. This property is obsolete. Use `DtdProcessing` instead. If you had set `ProhibitDtd` to its default value `true` set `DtdProcessing` to `Prohibit`. If you had set `ProhibitDtd` to `false` set `DtdProcessing` to `Parse`.|
|`Schemas`|An empty `XmlSchemaSet` object.|
|`ValidationFlags`|`ProcessIdentityConstraints`.|
|`ValidationType`|`None`.|
|`XmlResolver`|A new `XmlUrlResolver` object.|

#### Examples
The following creates a settings object that can be used to construct a reader that strips processing instructions, comments, and insignificant white space.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Create/factory_rdr_cctor2.cs._

## XmlReaderSettings.Async property

```csharp
public bool Async { get; set; }
```

Gets or sets whether asynchronous `XmlReader` methods can be used on a particular `XmlReader` instance.

Returns: `true` if asynchronous methods can be used; otherwise, `false`.

#### Remarks
You must set this value to `true` when you create a new `XmlReader` instance if you want to use asynchronous `XmlReader` methods on that instance. After the `XmlReader` instance is created, the `Async` property is read-only. The default value of this property is `false`.

This flag is ignored by the `XmlReader.Create` overload. This means that if you create a new `XmlReader` based on an existing `XmlReader`, the async behavior depends on the input `XmlReader`, and you cannot use the `Async` flag to change the async behavior.

## XmlReaderSettings.CheckCharacters property

```csharp
public bool CheckCharacters { get; set; }
```

Gets or sets a value indicating whether to do character checking.

Returns: `true` to do character checking; otherwise `false`. The default is `true`.

#### Remarks

This property instructs the XML reader to check characters in the XML data it's reading and throw an `XmlException` if any characters are outside the range of legal XML characters. When character checking is enabled, you are ensured the following:

- Characters are within the range of legal XML characters, as defined by the 2.2 Characters section of the W3C XML 1.0 Recommendation.

- All XML names are valid, as defined by the 2.3 Common Syntactic Constructs section of the W3C XML 1.0 Recommendation.

When this property is set to `true`, which is the default setting, an `XmlException` exception is thrown if the XML file contains illegal characters or invalid XML names (for example, an element name starts with a number).

If the `XmlReader` is processing text data, it always checks that the XML names and text content are valid, regardless of the property setting. Setting `CheckCharacters` to `false` turns off character checking for character entity references.

## XmlReaderSettings.CloseInput property

```csharp
public bool CloseInput { get; set; }
```

Gets or sets a value indicating whether the underlying stream or `TextReader` should be closed when the reader is closed.

Returns: `true` to close the underlying stream or `TextReader` when the reader is closed; otherwise `false`. The default is `false`.

#### Remarks
This setting is used when a stream or `TextReader` is passed to the `XmlReader.Create` method. If a stream is created by the reader for its own processing, such as when the reader is created with a URI or when it opens an external document type definition, it is always closed when the reader is closed.

## XmlReaderSettings.ConformanceLevel property

```csharp
public System.Xml.ConformanceLevel ConformanceLevel { get; set; }
```

Gets or sets the level of conformance with which the `XmlReader` will comply.

Returns: One of the enumeration values that specifies the level of conformance that the XML reader will enforce. The default is `ConformanceLevel.Document`.

#### Remarks
XML readers that are created by the `XmlReader.Create` method meet the following compliance requirements by default:

- New lines and attribute value are normalized according to the W3C XML 1.0 Recommendation.

- All entities are automatically expanded.

- Default attributes declared in the document type definition are always added even when the reader does not validate.

- Declaration of XML prefix mapped to the correct XML namespace URI is allowed.

- The notation names in a single `NotationType` attribute declaration and `NmTokens` in a single `Enumeration` attribute declaration are distinct.

You can use the `ConformanceLevel` property to check and guarantee that the stream being read complies with the rules for a well-formed XML 1.0 document or document fragment. If the data doesn't comply, an `XmlException` exception is thrown. The default is `Document` (document-level conformance).

The three conformance levels are:

|Setting|Description|
|-------------|-----------------|
|`Document`|Ensures that the XML data conforms to the rules for a well-formed XML 1.0 document. This level of checking ensures that any processor can consume the stream being read as an well-formed XML 1.0 document. The reader checks for the following: -   The top-level item must not have any nodes other than XML Declaration, document type definition (DTD), element, comment, white space, or processing instruction.-   The XML data must have exactly one top-level element node.|
|`Fragment`|Ensures that the XML data conforms to the rules for a well-formed XML 1.0 document fragment. This setting accepts XML data with multiple root elements, or text nodes at the top-level. This level of checking ensures that any processor can consume the stream being read as an external parsed entity.|
|`Auto`|Specifies that the reader should determine the level of conformance checking based on the incoming data. Document conformance checking is applied if the XML data contains DTD information. Fragment conformance checking is applied if the XML data contains one of following: -   Text, CDATA, or entity reference node at the root level.-   More than one element at the root level.-   No element at the root level. An `XmlException` is thrown if there is a conflict, such as when there is a text node and a DTD at the root level. This setting can be used in wrapping scenarios when the `XmlReader.Create` method is used to add additional features to an existing `XmlReader`. In this case, `Document` does not add any new conformance checking. Conformance checking is left to the `XmlReader` that is being wrapped.|

> **Note:**
> The XML 1.0 recommendation requires document-level conformance when a DTD is present. Therefore, if the reader is configured to support `Fragment`, but the XML data contains a document type definition (DTD), an `XmlException` is thrown.

Here's how the reader handles specific conformance violations depending on the setting of the `ConformanceLevel` property:

|Condition|`Document`|`Fragment`|`Auto`|
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
|Text or a typed value appears at the top level.|`XmlException` is thrown.|Not considered a violation for this setting.|Not considered a violation for this setting.|
|Multiple elements or no element appear at the top level.|`XmlException` is thrown.|Not considered a violation for this setting.|Not considered a violation for this setting.|
|Top-level item is white space.|Not considered a violation for this setting.|Not considered a violation for this setting.|Not considered a violation for this setting.|
|Top-level item is an attribute (recognized as a text node).|`XmlException` is thrown.|Not considered a violation for this setting.|Not considered a violation for this setting.|
|Multiple, contiguous text nodes are found.|Not considered a violation for this setting.|Not considered a violation for this setting.|Not considered a violation for this setting.|
|The same namespace prefix is declared twice in the same local scope.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|The namespace in an element or attribute doesn't exist in the local scope.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|Data contains a prefix-namespace mismatch.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|`xml:space` attribute contains an invalid value.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|An invalid name is encountered.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|The `xml` prefix isn't matched to the http://www.w3.org/XML/1998/namespace URI.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|

#### Examples
The following example creates an `XmlReader` object that reads an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlParserContext/Overview/XmlReader_Create.cs._
