---
title: "XmlWriterSettings class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriterSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriterSettings class

Namespace: `System.Xml`

```csharp
public sealed class XmlWriterSettings
```

Specifies a set of features to support on the `XmlWriter` object created by the `Create` method.

#### Remarks
The `XmlWriter.Create` method is the preferred mechanism for obtaining `XmlWriter` instances. The `XmlWriter.Create` method uses the `XmlWriterSettings` class to specify which features to implement in the `XmlWriter` object that is created.

> **Note:**
> If you're using the `XmlWriter` object with the `XslCompiledTransform.Transform` method, you should use the `OutputSettings` property to obtain an `XmlWriterSettings` object with the correct settings. This ensures that the created `XmlWriter` object has the correct output settings.

The `XmlWriterSettings` class provides properties that control data conformance and output format.

For data conformance checks and auto-corrections, use these properties:

|Property|Specifies|Value|Default|
|--------------|---------------|-----------|-------------|
|`CheckCharacters`|Whether to check that characters are in the legal XML character set, as defined by W3C.|`true` or `false`|`true`|
|`ConformanceLevel`|Whether to check that output is a well-formed XML 1.0 document or fragment.|`Document` (document-level), `Fragment` (fragment-level), or `Auto` (auto-detection)|`Document` (document-level conformance)|
|`WriteEndDocumentOnClose`|Whether to add closing tags to all unclosed elements when the `XmlWriter.Close` method is called.|`true` or `false`|`true`|

To specify output format, use these properties:

|Property|Specifies|Value|Default|
|--------------|---------------|-----------|-------------|
|`Encoding`|Text encoding to use.|`Encoding` value|`UTF8`|
|`Indent`|Whether to indent elements|`true` or `false`|`false` (no indentation)|
|`IndentChars`|Character string to use when indenting (used when `Indent` is set to `true`).|String|Two spaces|
|`NewLineChars`|Character string to use for line breaks.|String|`\r\n` (carriage return, line feed) for non-Unix platforms, or `\n` (line feed) for Unix platforms|
|`NewLineHandling`|How to handle newline characters.|`NewLineHandling` value: `Entitize` (normalize), `Replace` (replace), or `None` (leave unchanged)|`Replace` (replace with characters specified by `NewLineChars`)|
|`NewLineOnAttributes`|Whether to write attributes on individual lines (has no effect when `Indent` is `false`).|`true` or `false`|`false`|
|`OmitXmlDeclaration`|Whether to write an XML declaration.|`true` or `false`|`false`|

#### Examples
The following example creates an `XmlWriter` that writes to an XML file and writes each attribute on a new line.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriterSettings/Overview/writenewlineattrs.cs._

The sample produces the following output:

```xml
<order
  orderID="367A54"
  date="2001-05-03">
  <price>19.95</price>
</order>
```

## XmlWriterSettings.XmlWriterSettings() constructor

```csharp
public XmlWriterSettings ();
```

Initializes a new instance of the `XmlWriterSettings` class.

#### Remarks
The following table shows initial property values for an instance of `XmlWriterSettings`.

|Property|Initial Value|
|--------------|-------------------|
|`Async`|`false`.|
|`CheckCharacters`|`true`.|
|`CloseOutput`|`false`.|
|`ConformanceLevel`|`Document`.|
|`Encoding`|`Encoding.UTF8`.|
|`Indent`|`false`.|
|`IndentChars`|Two spaces.|
|`NewLineChars`|`\r\n` (carriage return, line feed) for non-Unix platforms, or `\n` (line feed) for Unix platforms.|
|`NewLineHandling`|`Replace`.|
|`NewLineOnAttributes`|`false`.|
|`OmitXmlDeclaration`|`false`.|
|`WriteEndDocumentOnClose`|`true`.|

#### Examples
The following example creates an `XmlWriter` object that uses the TAB character for indentation.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writeindent.cs._

## XmlWriterSettings.Async property

```csharp
public bool Async { get; set; }
```

Gets or sets a value that indicates whether asynchronous `XmlWriter` methods can be used on a particular `XmlWriter` instance.

Returns: `true` if asynchronous methods can be used; otherwise, `false`.

#### Remarks
You must set this value to `true` when you create a new `XmlWriter` instance if you want to use asynchronous `XmlWriter` methods on that instance. After the `XmlWriter` instance is created, the `Async` property is read-only. The default value of this property is `false`.

This flag is ignored by the `XmlWriter.Create` overload. This means that if you create a new `XmlWriter` based on an existing `XmlWriter`, the async behavior depends on the input `XmlWriter`, and you cannot use the `Async` flag to change the async behavior.

## XmlWriterSettings.CheckCharacters property

```csharp
public bool CheckCharacters { get; set; }
```

Gets or sets a value that indicates whether the XML writer should check to ensure that all characters in the document conform to the "2.2 Characters" section of the W3C XML 1.0 Recommendation.

Returns: `true` to do character checking; otherwise, `false`. The default is `true`.

#### Remarks
If the `XmlWriter` object supports character checking, it throws an exception if any characters are outside the range of legal XML characters specified by the "2.2 Characters" section of the W3C XML 1.0 Recommendation.

Character checking does not include checking for illegal characters in XML names or checking that all XML names are valid. These checks are part of conformance checking and are always performed.

## XmlWriterSettings.CloseOutput property

```csharp
public bool CloseOutput { get; set; }
```

Gets or sets a value indicating whether the `XmlWriter` should also close the underlying stream or `TextWriter` when the `XmlWriter.Close` method is called.

Returns: `true` to also close the underlying stream or `TextWriter`; otherwise, `false`. The default is `false`.

#### Remarks
This setting is useful when you wish to write XML to a stream, and then add extra information to the end of the stream after the `XmlWriter` has finished writing.

This property only applies to `XmlWriter` instances that output XML content to a stream or `TextWriter`; otherwise, this setting is ignored.

#### Examples
The following example writes an XML fragment to a memory stream.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writestream2.cs._

## XmlWriterSettings.ConformanceLevel property

```csharp
public System.Xml.ConformanceLevel ConformanceLevel { get; set; }
```

Gets or sets the level of conformance that the XML writer checks the XML output for.

Returns: One of the enumeration values that specifies the level of conformance (document, fragment, or automatic detection). The default is `ConformanceLevel.Document`.

#### Remarks
The `ConformanceLevel` property configures the XML writer to check and guarantee that the stream being written complies with a certain set of rules. The XML data can be checked to see that it conforms to the rules for a well-formed XML 1.0 document or a document fragment. The following table describes the three settings. The default is document-level conformance.

|Setting|Description|
|-------------|-----------------|
|`Document`|Ensures that the XML output conforms to the rules for a well-formed XML 1.0 document and can be processed by any conforming processor. The document conformance checks include most of the fragment-level checks and also ensure the following: -   The top-level item doesn't have any nodes other than XML Declaration, DTD, element, comment, white space, or processing instruction.-   The XML data has one and only one top-level element node. The XML writer doesn't parse DTD information that is written. The user is responsible for ensuring that the DTD is well-formed.|
|`Fragment`|Ensures that the XML output conforms to the rules for a well-formed XML 1.0 document fragment. This setting accepts XML data that has multiple root elements or text nodes at the top level. This level of checking ensures that any processor can consume the stream being read as an XML 1.0 external parsed entity. DTD information isn't allowed in document fragments.|
|`Auto`|Specifies that the XML writer should determine the level of conformance checking based on the incoming data. This setting can be useful when you don't know whether the generated XML will be a well-formed XML document or a fragment. Document conformance checking is applied in the following cases: -   If the `XmlWriter.WriteStartDocument` method is called.-   If DTD information is written. Fragment conformance checking is applied if the XML data contains one of these: -   Text, CDATA, or EntityReference node at the root level.-   More than one element at the root level.-   No element at the root level. An `XmlException` is thrown if there is a conflict, such as when you try to write a text node and a DTD at the root level. If you are wrapping another `XmlWriter` object, the outer object doesn't do any additional conformance checking; this is left to the underlying object.|

If the XML writer detects any information that would violate the specified level of conformance, it throws an exception. In some cases, the XML writer automatically corrects the conformance error. For example, the writer closes an unclosed attribute without throwing an exception. The following table shows how various conformance violations are handled in each setting.

|Condition|`Document`|`Fragment`|`Auto`|
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
|DTD information is found.|Not a violation for this setting. However, the XML writer doesn't check the DTD; the user must ensure that the DTD is well-formed.|`XmlException` is thrown.|Document conformance checking is applied.|
|`XmlWriter.WriteStartDocument` is called.|Not considered a violation for this setting.|`XmlException` is thrown.|Document conformance checking is applied.|
|`XmlWriter.WriteStartDocument` is called multiple times.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|A text value appears at the top level (not below an element or attribute node).|`XmlException` is thrown.|Not considered a violation.|Fragment conformance checking is applied.|
|Multiple elements or no elements appear at the top level.|`XmlException` is thrown.|Not considered a violation.|Fragment conformance checking is applied.|
|Top-level item is white space.|Not considered a violation.|Not considered a violation.|Not considered a violation.|
|`XmlWriter.WriteEndAttribute` isn't called to end an attribute node.|Fixed by XML writer.|Fixed by XML writer.|Fixed by XML writer.|
|The XML writer is in an improperly nested state (for example, a `XmlWriter.WriteStartElement` call is followed by a `XmlWriter.WriteEndAttribute`).|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|Top-level item is an attribute.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|Multiple, contiguous text nodes are found.|Not considered a violation, but it's the responsibility of the user to concatenate the text nodes.|Not considered a violation, but it's the responsibility of the user to concatenate the text nodes.|Not considered a violation, but it's the responsibility of the user to concatenate the text nodes.|
|The same namespace prefix is declared twice in an element.|The XML writer generates a new prefix for the second namespace.|The XML writer generates a new prefix for the second namespace.|The XML writer generates a new prefix for the second namespace.|
|`XmlWriter.WriteStartElement` specifies a prefix and a namespace that isn't declared within that scope, or the prefix is associated with a different namespace.|The XML writer writes the necessary namespace node.|The XML writer writes the necessary namespace node.|The XML writer writes the necessary namespace node.|
|`XmlWriter.WriteStartAttribute` specifies a prefix and a namespace that isn't declared within that scope.|The XML writer writes the necessary namespace node.|The XML writer writes the necessary namespace node.|The XML writer writes the necessary namespace node.|
|`XmlWriter.WriteStartAttribute` specifies a prefix and a namespace, but the prefix is associated with a different in-scope namespace.|The XML writer ignores the specified prefix and either looks up the correct prefix or generates a new prefix.|The XML writer ignores the specified prefix and either looks up the correct prefix or generates a new prefix.|The XML writer ignores the specified prefix and either looks up the correct prefix or generates a new prefix.|
|`XmlWriter.WriteQualifiedName` is used to write element content by using a namespace that doesn't exist within the scope.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|`XmlWriter.WriteQualifiedName` is used to write attribute content by using a namespace that doesn't exist within the scope.|The XML writer writes the necessary namespace declaration.|The XML writer writes the necessary namespace declaration.|The XML writer writes the necessary namespace declaration.|
|The `xml:space` attribute doesn't contain a valid value.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|An invalid name is encountered.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|The `xml` prefix isn't matched to a URI.|The XML writer doesn't check for this type of violation.|The XML writer doesn't check for this type of violation.|The XML writer doesn't check for this type of violation.|
|The `xml` prefix isn't matched to the http://www.w3.org/XML/1998/namespace URI.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|
|The `xmlns` prefix or local name isn't matched to a URI.|The XML writer doesn't check for this type of violation.|The XML writer doesn't check for this type of violation.|The XML writer doesn't check for this type of violation.|
|The `xmlns` prefix or local name isn't matched to the http://www.w3.org/2000/xmlns URI.|`XmlException` is thrown.|`XmlException` is thrown.|`XmlException` is thrown.|

#### Examples
The following example writes an XML fragment to a memory stream.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writestream2.cs._
