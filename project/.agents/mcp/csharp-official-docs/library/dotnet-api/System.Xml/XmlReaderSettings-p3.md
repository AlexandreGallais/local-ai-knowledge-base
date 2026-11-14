---
title: "XmlReaderSettings class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReaderSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReaderSettings class (part 3 of 3)

## XmlReaderSettings.ValidationFlags property

```csharp
public System.Xml.Schema.XmlSchemaValidationFlags ValidationFlags { get; set; }
```

Gets or sets a value indicating the schema validation settings. This setting applies to `XmlReader` objects that validate schemas (`XmlReaderSettings.ValidationType` property set to `ValidationType.Schema`).

Returns: A bitwise combination of enumeration values that specify validation options. `XmlSchemaValidationFlags.ProcessIdentityConstraints` and `XmlSchemaValidationFlags.AllowXmlAttributes` are enabled by default. `XmlSchemaValidationFlags.ProcessInlineSchema`, `XmlSchemaValidationFlags.ProcessSchemaLocation`, and `XmlSchemaValidationFlags.ReportValidationWarnings` are disabled by default.

#### Remarks

> **Important:**
> The `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags of an `XmlReaderSettings` object are not set by default. When these flags are set, the `XmlResolver` of the `XmlReaderSettings` object is used to resolve schema locations encountered in the instance document in the `XmlReader`. If the `XmlResolver` object is `null`, schema locations are not resolved even if the `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags are set.
>
> Schemas added during validation add new types and can change the validation outcome of the document being validated. As a result, external schemas should only be resolved from trusted sources.
>
> Disabling the `ProcessIdentityConstraints` flag (enabled by default) is recommended when validating, untrusted, large XML documents in high availability scenarios against a schema with identity constraints over a large part of the document.

#### Examples
The following example validates an XML file against an inline XML Schema by enabling the `ProcessInlineSchema` setting. The XML reader is configured to display validation warnings, so you also see the expected warning on the root element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReaderSettings/ValidationEventHandler/factory_rdr_cctor.cs._

The example uses the inlineSchema.xml file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReaderSettings.IgnoreInlineSchema/XML/inlineSchema.xml._
The output is as follows:

Warning:   Matching schema not found. No validation occurred. Could not find schema information for the element 'root'.

Validation error:   The element 'xsdHeadCount:HeadCount' has invalid child element 'division'. Expected 'ID'.

## XmlReaderSettings.ValidationType property

```csharp
public System.Xml.ValidationType ValidationType { get; set; }
```

Gets or sets a value indicating whether the `XmlReader` will perform validation or type assignment when reading.

Returns: One of the `ValidationType` values that indicates whether XmlReader will perform validation or type assignment when reading. The default is `ValidationType.None`.

#### Remarks
The following table describes the `ValidationType` values.

|ValidationType|Description|
|--------------------|-----------------|
|`DTD`|Validation is performed using a document type definition (DTD). **Note:**  The `DtdProcessing` property must also be set to `Parse`.|
|`None`|The `XmlReader` does not validate data, or perform any type assignment.|
|`Schema`|Validation and type assignment is performed using an XML Schema definition language (XSD) schema. The reader accesses the XML Schema using the following: -   Uses the `Schemas` property to access the `XmlSchemaSet` object associated with this reader.-   Uses the in-line schema contained in the XML instance document. (The `ProcessInlineSchema` option must be enabled.)-   Uses the XML Schema specified by schema location hints (`xsi:schemaLocation` or `xsi:noNamespaceSchemaLocation` attribute) found in the XML instance document. (The `ProcessSchemaLocation` option must be enabled.)|

#### Examples
The following example validates using a schema stored in the `XmlSchemaSet`.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReaderSettings/ValidationType/validschemaset.cs._

The sample uses the following input files:

`booksSchemaFail.xml`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader_Validate_SchemaSet/XML/booksschemafail.xml._
`books.xsd`

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReader_Validate_SchemaSet/XML/books.xsd._
## XmlReaderSettings.XmlResolver property

```csharp
public System.Xml.XmlResolver? XmlResolver { set; }
```

Sets the `XmlResolver` used to access external documents.

Returns: An `XmlResolver` used to access external documents. If set to `null`, an `XmlException` is thrown when the `XmlReader` tries to access an external resource. The default value is `null`.

#### Remarks
The `XmlResolver` is used to locate and open an XML instance document, or to locate and open any external resources referenced by the XML instance document. This can include entities, DTD, or schemas. The `Credentials` property can be used to specify any credentials <example-value> for network authentication.

> **Important:**
> Because the `XmlResolver` can contain sensitive information such as user credentials, you should be careful when caching `XmlReaderSettings` objects, or when passing the `XmlReaderSettings` object from one component to another.
>
> Use `ThrowingResolver` to restrict access to external documents.
>
> The `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags of an `XmlReaderSettings` object are not set by default. When these flags are set, the `XmlResolver` of the `XmlReaderSettings` object is used to resolve schema locations encountered in the instance document in the `XmlReader`. If the `XmlResolver` object is `null`, schema locations are not resolved even if the `ProcessInlineSchema` and `ProcessSchemaLocation` validation flags are set.
>
> Schemas added during validation add new types and can change the validation outcome of the document being validated. As a result, external schemas should only be resolved from trusted sources.

## XmlReaderSettings.Clone() method

```csharp
public System.Xml.XmlReaderSettings Clone ();
```

Creates a copy of the `XmlReaderSettings` instance.

Returns: The cloned `XmlReaderSettings` object.

#### Remarks
The cloned `XmlReaderSettings` object can be modified without affecting the settings on the original object.

## XmlReaderSettings.Reset() method

```csharp
public void Reset ();
```

Resets the members of the settings class to their default values.

#### Remarks
The following table shows initial property values for an instance of `XmlReaderSettings`.

|Property|Initial Value|
|--------------|-------------------|
|`Async`|`false`.|
|`CheckCharacters`|`true`.|
|`ConformanceLevel`|`Document`.|
|`IgnoreComments`|`false`.|
|`IgnoreProcessingInstructions`|`false`.|
|`IgnoreWhitespace`|`false`.|
|`LineNumberOffset`|0.|
|`LinePositionOffset`|0.|
|`MaxCharactersFromEntities`|0 (there is no limit on the number of characters that result from expanding entities).|
|`MaxCharactersInDocument`|0 (there is no limit on the size of the XML document).|
|`NameTable`|`null`.|
|`DtdProcessing`|`Prohibit`|
|`ProhibitDtd`|`true`. This property is obsolete. Use `DtdProcessing` instead. If you had set `ProhibitDtd` to its default value `true` set `DtdProcessing` to `Prohibit`. If you had set `ProhibitDtd` to `false` set `DtdProcessing` to `Parse`.|
|`Schemas`|An empty `XmlSchemaSet` object.|
|`ValidationFlags`|`ProcessIdentityConstraints`.|
|`ValidationType`|`None`.|
|`XmlResolver`|A new `XmlUrlResolver` object.|

## XmlReaderSettings.ValidationEventHandler event

```csharp
public event System.Xml.Schema.ValidationEventHandler ValidationEventHandler;
```

Occurs when the reader encounters validation errors.

#### Remarks
These events occur while reading an XML instance document if the `ValidationType` is set to either `DTD` or `Schema`. If the `ReportValidationWarnings` setting has been enabled on the `ValidationFlags` property these events also occur when any validation warnings are encountered.

If the reader is configured for validation and no validation event handler has been set, an `XmlSchemaValidationException` is thrown for all validation errors. (Validation warnings do not cause an `XmlSchemaValidationException` to be thrown).

> **Important:**
> Validation error messages may expose sensitive content model information. Validation error and warning messages are handled using the `ValidationEventHandler` delegate, or are exposed as an `XmlSchemaValidationException` if no event handler is provided to the `XmlReaderSettings` object (validation warnings do not cause an `XmlSchemaValidationException` to be thrown). This content model information should not be exposed in untrusted scenarios. Validation warning messages are suppressed by default and can be reported by setting the `ReportValidationWarnings` flag.
>
> The `SourceUri` property of an `XmlSchemaValidationException` returns the URI path to the schema file that caused the exception. The `SourceUri` property should not be exposed in untrusted scenarios.

#### Examples
The following example shows the settings to specify to create a reader that validates using an inline schema and that also displays validation warnings. The validation event handler uses the `XmlSeverityType` enumeration to differentiate between warnings and errors.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReaderSettings/ValidationEventHandler/factory_rdr_cctor.cs._
