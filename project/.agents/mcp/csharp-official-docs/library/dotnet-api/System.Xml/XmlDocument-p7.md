---
title: "XmlDocument class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocument class (part 7 of 7)

## XmlDocument.Validate(ValidationEventHandler) method

```csharp
public void Validate (System.Xml.Schema.ValidationEventHandler? validationEventHandler);
```

Validates the `XmlDocument` against the XML Schema Definition Language (XSD) schemas contained in the `XmlDocument.Schemas` property.

Parameters:

- `validationEventHandler`: The `ValidationEventHandler` object that receives information about schema validation warnings and errors.

Exceptions:

- `XmlSchemaValidationException`: A schema validation event occurred and no `ValidationEventHandler` object was specified.

#### Remarks
The `XmlDocument.Validate` method validates the XML data in the `XmlDocument` against the schemas contained in the `Schemas` property. The `XmlDocument.Validate` method performs infoset augmentation. Specifically, after successful validation, schema defaults are applied, text values are converted to atomic values as necessary, and type information is associated with validated information items. The result is a previously un-typed XML sub-tree in the `XmlDocument` replaced with a typed sub-tree.

Consider the following points when using the `XmlDocument.Validate` method:

- Schema location hints like `xsi:schemaLocation` or `xsi:noNamespaceSchemaLocation` are ignored.
- Inline schemas are ignored.
- If schema validation errors occur during validation the `XmlDocument` becomes partially validated with some nodes with correct type information and some without.
- The validation process includes checking for uniqueness and reference constraints (`xs:ID`, `xs:IDREF`, `xs:key`, `xs:keyref`, and `xs:unique`).

#### Examples

The following example illustrates use of the `XmlDocument.Validate` method. The example creates an `XmlDocument` that contains an associated XSD schema using the `XmlReaderSettings` and `XmlReader` objects. The example then uses the `XPathNavigator` class to incorrectly modify the typed value of an element in the XML document generating a schema validation error.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Validate/XPathValidation.cs._

The example takes the `contosoBooks.xml` and `contosoBooks.xsd` files as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml._

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xsd._

## XmlDocument.Validate(ValidationEventHandler, XmlNode) method

```csharp
public void Validate (System.Xml.Schema.ValidationEventHandler? validationEventHandler, System.Xml.XmlNode nodeToValidate);
```

Validates the `XmlNode` object specified against the XML Schema Definition Language (XSD) schemas in the `XmlDocument.Schemas` property.

Parameters:

- `validationEventHandler`: The `ValidationEventHandler` object that receives information about schema validation warnings and errors.
- `nodeToValidate`: The `XmlNode` object created from an `XmlDocument` to validate.

Exceptions:

- `ArgumentException`: The `XmlNode` object parameter was not created from an `XmlDocument`.
- `InvalidOperationException`: The `XmlNode` object parameter is not an element, attribute, document fragment, or the root node.
- `XmlSchemaValidationException`: A schema validation event occurred and no `ValidationEventHandler` object was specified.

#### Remarks
The `XmlDocument.Validate` method validates the XML data in the `XmlNode` object against the schemas contained in the `Schemas` property. The `XmlDocument.Validate` method performs infoset augmentation. Specifically, after successful validation, schema defaults are applied, text values are converted to atomic values as necessary, and type information is associated with validated information items. The result is a previously un-typed XML sub-tree in the `XmlDocument` replaced with a typed sub-tree.

The following are important notes to consider when using the `XmlDocument.Validate` method.

- Schema location hints like `xsi:schemaLocation` or `xsi:noNamespaceSchemaLocation` are ignored.

- Inline schemas are ignored.

- If schema validation errors occur during validation the `XmlDocument` becomes partially validated with some nodes with correct type information and some without.

If the node to validate is the root node, the validation process includes checking for uniqueness and reference constraints (`xs:ID`, `xs:IDREF`, `xs:key`, `xs:keyref`, and `xs:unique`); otherwise, uniqueness and reference constraints are omitted.

#### Examples
For an example of the `XmlDocument.Validate` method, see the `XmlDocument.Validate` method.

## XmlDocument.WriteContentTo(XmlWriter) method

```csharp
public override void WriteContentTo (System.Xml.XmlWriter xw);
```

Saves all the children of the `XmlDocument` node to the specified `XmlWriter`.

Parameters:

- `xw`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is functionally equivalent to the `InnerXml` property.

The `Encoding` property determines the encoding that is written out. If the `Encoding` property does not have a value, the `XmlDocument` is written out without an encoding attribute.

#### Examples

The following example displays the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/WriteContentTo/source.cs._
[!code-vbClassic WebData XmlDocument.WriteContentTo Example#1]

## XmlDocument.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter w);
```

Saves the `XmlDocument` node to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

#### Remarks
This method is a Microsoft extension to the Document Object Model (DOM). It is functionally equivalent to the `OuterXml` property.

The `Encoding` property determines the encoding that is written out. If the `Encoding` property does not have a value, the `XmlDocument` is written out without an encoding attribute.

#### Examples

The following example displays the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/WriteTo/source.cs._
[!code-vbClassic WebData XmlDocument.WriteTo Example#1]

## XmlDocument.NodeChanged event

```csharp
public event System.Xml.XmlNodeChangedEventHandler NodeChanged;
```

Occurs when the `XmlNode.Value` of a node belonging to this document has been changed.

#### Remarks
This event only applies to nodes that have a value.

All nodes created by this document, whether or not they have been inserted into the document, are included in this event.

## XmlDocument.NodeChanging event

```csharp
public event System.Xml.XmlNodeChangedEventHandler NodeChanging;
```

Occurs when the `XmlNode.Value` of a node belonging to this document is about to be changed.

#### Remarks
This event allows the user to do extra checking and, if necessary, throw an exception to stop the operation. If an exception is thrown the `XmlDocument` returns to its original state. This event only applies to nodes that have a value.

All nodes created by this document, whether or not they have been inserted into the document, are included in this event.

## XmlDocument.NodeInserted event

```csharp
public event System.Xml.XmlNodeChangedEventHandler NodeInserted;
```

Occurs when a node belonging to this document has been inserted into another node.

#### Remarks
All nodes created by this document, whether or not they have been inserted into the document, are included in this event.

## XmlDocument.NodeInserting event

```csharp
public event System.Xml.XmlNodeChangedEventHandler NodeInserting;
```

Occurs when a node belonging to this document is about to be inserted into another node.

#### Remarks
This event allows the user to do extra checking and, if necessary, throw an exception to stop the operation. If an exception is thrown the `XmlDocument` returns to its original state.

All nodes created by this document, whether or not they have been inserted into the document, are included in this event.

## XmlDocument.NodeRemoved event

```csharp
public event System.Xml.XmlNodeChangedEventHandler NodeRemoved;
```

Occurs when a node belonging to this document has been removed from its parent.

#### Remarks
All nodes created by this document, whether or not they have been inserted into the document, are included in this event.

## XmlDocument.NodeRemoving event

```csharp
public event System.Xml.XmlNodeChangedEventHandler NodeRemoving;
```

Occurs when a node belonging to this document is about to be removed from the document.

#### Remarks
This event allows the user to do extra checking and, if necessary, throw an exception to stop the operation. If an exception is thrown the `XmlDocument` returns to its original state.

All nodes created by this document, whether or not they have been inserted into the document, are included in this event.
