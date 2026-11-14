---
title: "XmlReader class (part 1 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class

Namespace: `System.Xml`

```csharp
public abstract class XmlReader : IDisposable
```

Represents a reader that provides fast, noncached, forward-only access to XML data.

`XmlReader` provides forward-only, read-only access to XML data in a document or stream. This class conforms to the W3C Extensible Markup Language (XML) 1.0 (fourth edition) and the Namespaces in XML 1.0 (third edition) recommendations.

`XmlReader` methods let you move through XML data and read the contents of a node. The properties of the class reflect the value of the current node, which is where the reader is positioned. The `ReadState` property value indicates the current state of the XML reader. For example, the property is set to `Initial` by the `XmlReader.Read` method and `Closed` by the `XmlReader.Close` method. `XmlReader` also provides data conformance checks and validation against a DTD or schema.

`XmlReader` uses a pull model to retrieve data. This model:

- Simplifies state management by a natural, top-down procedural refinement.
- Supports multiple input streams and layering.
- Enables the client to give the parser a buffer into which the string is directly written, and thus avoids the necessity of an extra string copy.
- Supports selective processing. The client can skip items and process those that are of interest to the application. You can also set properties in advance to manage how the XML stream is processed (for example, normalization).

#### Create an XML reader

Use the `XmlReader.Create` method to create an `XmlReader` instance.

Although .NET provides concrete implementations of the `XmlReader` class, such as the `XmlTextReader`, `XmlNodeReader`, and the `XmlValidatingReader` classes, we recommend that you use the specialized classes only in these scenarios:

- When you want to read an XML DOM subtree from an `XmlNode` object, use the `XmlNodeReader` class. (However, this class doesn't support DTD or schema validation.)
- If you must expand entities on request, you don't want your text content normalized, or you don't want default attributes returned, use the `XmlTextReader` class.

To specify the set of features you want to enable on the XML reader, pass an `XmlReaderSettings` object to the `XmlReader.Create` method. You can use a single `XmlReaderSettings` object to create multiple readers with the same functionality, or modify the `XmlReaderSettings` object to create a new reader with a different set of features. You can also easily add features to an existing reader.

If you don't use a `XmlReaderSettings` object, default settings are used. See the `XmlReader.Create` reference page for details.

`XmlReader` throws an `XmlException` on XML parse errors. After an exception is thrown, the state of the reader is not predictable. For example, the reported node type may be different from the actual node type of the current node. Use the `ReadState` property to check whether the reader is in error state.

#### Validate XML data

To define the structure of an XML document and its element relationships, data types, and content constraints, you use a document type definition (DTD) or XML Schema definition language (XSD) schema. An XML document is considered to be well formed if it meets all the syntactical requirements defined by the W3C XML 1.0 Recommendation. It's considered valid if it's well formed and also conforms to the constraints defined by its DTD or schema. (See the W3C XML Schema Part 1: Structures and the W3C XML Schema Part 2: Datatypes recommendations.) Therefore, although all valid XML documents are well formed, not all well-formed XML documents are valid.

You can validate the data against a DTD, an inline XSD Schema, or an XSD Schema stored in an `XmlSchemaSet` object (a cache); these scenarios are described on the `XmlReader.Create` reference page. `XmlReader` doesn't support XML-Data Reduced (XDR) schema validation.

You use the following settings on the `XmlReaderSettings` class to specify what type of validation, if any, the `XmlReader` instance supports.

|Use this `XmlReaderSettings` member|To specify|
|-----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
|`DtdProcessing` property|Whether to allow DTD processing. The default is to disallow DTD processing.|
|`ValidationType` property|Whether the reader should validate data, and what type of validation to perform (DTD or schema). The default is no data validation.|
|`ValidationEventHandler` event|An event handler for receiving information about validation events. If an event handler is not provided, an `XmlException` is thrown on the first validation error.|
|`ValidationFlags` property|Additional validation options through the `XmlSchemaValidationFlags` enumeration members:- `AllowXmlAttributes`-- Allow XML attributes (`xml:*`) in instance documents even when they're not defined in the schema. The attributes are validated based on their data type. See the `XmlSchemaValidationFlags` reference page for the setting to use in specific scenarios. (Disabled by default.)- `ProcessIdentityConstraints` --Process identity constraints (`xs:ID`, `xs:IDREF`, `xs:key`, `xs:keyref`, `xs:unique`) encountered during validation. (Enabled by default.)- `ProcessSchemaLocation` --Process schemas specified by the `xsi:schemaLocation` or `xsi:noNamespaceSchemaLocation` attribute. (Enabled by default.)- `ProcessInlineSchema`-- Process inline XML Schemas during validation. (Disabled by default.)- `ReportValidationWarnings`--Report events if a validation warning occurs. A warning is typically issued when there is no DTD or XML Schema to validate a particular element or attribute against. The `ValidationEventHandler` is used for notification. (Disabled by default.)|
|`Schemas`|The `XmlSchemaSet` to use for validation.|
|`XmlResolver` property|The `XmlResolver` for resolving and accessing external resources. This can include external entities such as DTD and schemas, and any `xs:include` or `xs:import` elements contained in the XML Schema. If you don't specify an `XmlResolver`, the `XmlReader` uses a default `XmlUrlResolver` with no user credentials.|

#### Data conformance

XML readers that are created by the `XmlReader.Create` method meet the following compliance requirements by default:

- New lines and attribute value are normalized according to the W3C XML 1.0 Recommendation.

- All entities are automatically expanded.

- Default attributes declared in the document type definition are always added even when the reader doesn't validate.

- Declaration of XML prefix mapped to the correct XML namespace URI is allowed.

- The notation names in a single `NotationType` attribute declaration and `NmTokens` in a single `Enumeration` attribute declaration are distinct.

Use these `XmlReaderSettings` properties to specify the type of conformance checks you want to enable:

|Use this `XmlReaderSettings` property|To|Default|
|-------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|-------------|
|`CheckCharacters` property|Enable or disable checks for the following:- Characters are within the range of legal XML characters, as defined by the 2.2 Characters section of the W3C XML 1.0 Recommendation.- All XML names are valid, as defined by the 2.3 Common Syntactic Constructs section of the W3C XML 1.0 Recommendation.When this property is set to `true` (default), an `XmlException` exception is thrown if the XML file contains illegal characters or invalid XML names (for example, an element name starts with a number).|Character and name checking is enabled.Setting `CheckCharacters` to `false` turns off character checking for character entity references. If the reader is processing text data, it always checks that XML names are valid, regardless of this setting. **Note:**  The XML 1.0 recommendation requires document-level conformance when a DTD is present. Therefore, if the reader is configured to support `Fragment`, but the XML data contains a document type definition (DTD), an `XmlException` is thrown.|
|`ConformanceLevel` property|Choose the level of conformance to enforce:- `Document`. Conforms to the rules for a well-formed XML 1.0 document.- `Fragment`. Conforms to the rules for a well-formed document fragment that can be consumed as an external parsed entity.- `Auto`. Conforms to the level decided by the reader.If the data isn't in conformance, an `XmlException` exception is thrown.|`Document`|

#### Navigate through nodes

The current node is the XML node on which the XML reader is currently positioned. All `XmlReader` methods perform operations in relation to this node, and all `XmlReader` properties reflect the value of the current node.

The following methods make it easy to navigate through nodes and parse data.

| Use this `XmlReader` method | To |
|--------------------------------------------|----|
| `XmlReader.Read`          | Read the first node, and advance through the stream one node at a time. Such calls are typically performed inside a `while` loop.Use the `NodeType` property to get the type (for example, attribute, comment, element, and so on) of the current node. |
|`XmlReader.Skip`|Skip the children of the current node and move to the next node.|
|`XmlReader.MoveToContent` and `XmlReader.MoveToContentAsync`|Skip non-content nodes and move to the next content node or to the end of the file.Non-content nodes include `ProcessingInstruction`, `DocumentType`, `Comment`, `Whitespace`, and `SignificantWhitespace`.Content nodes include non-white space text, `CDATA`, `EntityReference` , and `EndEntity`.|
|`XmlReader.ReadSubtree`|Read an element and all its children, and return a new `XmlReader` instance set to `Initial`.This method is useful for creating boundaries around XML elements; for example, if you want to pass data to another component for processing and you want to limit how much of your data the component can access.|

See the `XmlReader.Read` reference page for an example of navigating through a text stream one node at a time and displaying the type of each node.

The following sections describe how you can read specific types of data, such as elements, attributes, and typed data.

#### Read XML elements

The following table lists the methods and properties that the `XmlReader` class provides for processing elements. After the `XmlReader` is positioned on an element, the node properties, such as `Name`, reflect the element values. In addition to the members described below, any of the general methods and properties of the `XmlReader` class can also be used to process elements. For example, you can use the `XmlReader.ReadInnerXml` method to read the contents of an element.

> **Note:**
> See section 3.1 of the W3C XML 1.0 Recommendation for definitions of start tags, end tags, and empty element tags.

|Use this `XmlReader` member|To|
|---------------------------------------------------------------------------------------------------------------------------------------------------|--------|
|`XmlReader.IsStartElement` method|Check if the current node is a start tag or an empty element tag.|
|`XmlReader.ReadStartElement` method|Check that the current node is an element and advance the reader to the next node (calls `XmlReader.IsStartElement` followed by `XmlReader.Read`).|
|`XmlReader.ReadEndElement` method|Check that the current node is an end tag and advance the reader to the next node.|
|`XmlReader.ReadElementString` method|Read a text-only element.|
|`XmlReader.ReadToDescendant` method|Advance the XML reader to the next descendant (child) element that has the specified name.|
|`XmlReader.ReadToNextSibling` method|Advance the XML reader to the next sibling element that has the specified name.|
|`IsEmptyElement` property|Check if the current element has an end element tag. For example:- `` (`XmlReader.IsEmptyElement` is `true`.)- ` ` (`XmlReader.IsEmptyElement` is `false`, although the element's content is empty.)|

For an example of reading the text content of elements, see the `XmlReader.ReadString` method. The following example processes elements by using a `while` loop.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

#### Read XML attributes

XML attributes are most commonly found on elements, but they're also allowed on XML declaration and document type nodes.

When positioned on an element node, the `XmlReader.MoveToAttribute` method lets you go through the attribute list of the element. Note that after `XmlReader.MoveToAttribute` has been called, node properties such as `Name`, `NamespaceURI`, and `Prefix` reflect the properties of that attribute, not the properties of the element the attribute belongs to.

The `XmlReader` class provides these methods and properties to read and process attributes on elements.

|Use this `XmlReader` member|To|
|---------------------------------------------------------------------------------------------------------------------------------------------------|--------|
|`HasAttributes` property|Check whether the current node has any attributes.|
|`AttributeCount` property|Get the number of attributes on the current element.|
|`XmlReader.MoveToFirstAttribute` method|Move to the first attribute in an element.|
|`XmlReader.MoveToNextAttribute` method|Move to the next attribute in an element.|
|`XmlReader.MoveToAttribute` method|Move to a specified attribute.|
|`XmlReader.GetAttribute` method or `Item` property|Get the value of a specified attribute.|
|`IsDefault` property|Check whether the current node is an attribute that was generated from the default value defined in the DTD or schema.|
|`XmlReader.MoveToElement` method|Move to the element that owns the current attribute. Use this method to return to an element after navigating through its attributes.|
|`XmlReader.ReadAttributeValue` method|Parse the attribute value into one or more `Text`, `EntityReference`, or `EndEntity` nodes.|

Any of the general `XmlReader` methods and properties can also be used to process attributes. For example, after the `XmlReader` is positioned on an attribute, the `Name` and `Value` properties reflect the values of the attribute. You can also use any of the content `Read` methods to get the value of the attribute.

This example uses the `AttributeCount` property to navigate through all the attributes on an element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

This example uses the `XmlReader.MoveToNextAttribute` method in a `while` loop to navigate through the attributes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

**Reading attributes on XML declaration nodes**
