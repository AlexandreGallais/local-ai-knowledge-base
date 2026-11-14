---
title: "XmlReaderSettings class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReaderSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReaderSettings class (part 2 of 3)

## XmlReaderSettings.DtdProcessing property

```csharp
public System.Xml.DtdProcessing DtdProcessing { get; set; }
```

Gets or sets a value that determines the processing of DTDs.

Returns: One of the enumeration values that determines the processing of DTDs. The default is `DtdProcessing.Prohibit`.

Document type definition (DTD) validation is implemented by using the validity constraints defined in the W3C Extensible Markup Language (XML) 1.0 (fourth edition) recommendation. DTDs use a formal grammar to describe the structure and syntax of compliant XML documents; they specify the content and values allowed for the XML document.

The `DtdProcessing` property can have one of the following values:

- `Parse` to enable DTD processing.
- `Prohibit` to throw an `XmlException` exception when a DTD is encountered.
- `Ignore` to disable DTD processing without warnings or exceptions.

To perform validation against a DTD, the `XmlReader` uses the DTD defined in the DOCTYPE declaration of an XML document. The DOCTYPE declaration can either point to an inline DTD or can be a reference to an external DTD file. To validate an XML file against a DTD:

- Set the `DtdProcessing` property to `DtdProcessing.Parse`.
- Set the `ValidationType` property to `ValidationType.DTD`.
- If the DTD is an external file stored on a network resource that requires authentication, pass an `XmlResolver` object with the necessary credentials to the `XmlReader.Create` method.

> **Important:**
> If the `DtdProcessing` property is set to `Ignore`, the `XmlReader` will not report the DTDs. This means that the DTD/DOCTYPE will be lost on output.

The following example validates an XML file using a DTD file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReaderSettings/DtdProcessing/validdtd.cs._

The example uses the `itemDTD.xml` file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlReaderSettings.DtdValidate/XML/itemDTD.xml._
## XmlReaderSettings.IgnoreComments property

```csharp
public bool IgnoreComments { get; set; }
```

Gets or sets a value indicating whether to ignore comments.

Returns: `true` to ignore comments; otherwise `false`. The default is `false`.

#### Remarks
Setting this property to `true` can result in multiple contiguous text nodes being returned from the reader. This does not affect validation.

#### Examples
The following creates a settings object that can be used to construct a reader that strips processing instructions, comments, and insignificant white space.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Create/factory_rdr_cctor2.cs._

## XmlReaderSettings.IgnoreProcessingInstructions property

```csharp
public bool IgnoreProcessingInstructions { get; set; }
```

Gets or sets a value indicating whether to ignore processing instructions.

Returns: `true` to ignore processing instructions; otherwise `false`. The default is `false`.

#### Remarks
Setting this property to `true` can result in multiple contiguous text nodes being returned from the reader. This does not affect validation.

#### Examples
The following creates a settings object that can be used to construct a reader that strips processing instructions, comments, and insignificant white space.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Create/factory_rdr_cctor2.cs._

## XmlReaderSettings.IgnoreWhitespace property

```csharp
public bool IgnoreWhitespace { get; set; }
```

Gets or sets a value indicating whether to ignore insignificant white space.

Returns: `true` to ignore white space; otherwise `false`. The default is `false`.

#### Remarks
White space that is not considered to be significant includes spaces, tabs, and blank lines used to set apart the markup for greater readability. An example of this is white space in element content.

This property setting does not affect white space between markup in a mixed content mode, or white space that occurs within the scope of an `xml:space='preserve'` attribute.

#### Examples
The following creates a settings object that can be used to construct a reader that strips processing instructions, comments, and insignificant white space.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Create/factory_rdr_cctor2.cs._

## XmlReaderSettings.LineNumberOffset property

```csharp
public int LineNumberOffset { get; set; }
```

Gets or sets line number offset of the `XmlReader` object.

Returns: The line number offset. The default is 0.

#### Remarks
The `LineNumberOffset` setting determines the point where the `LineNumber` property starts counting. This is useful if your XML data is embedded within a larger document. For example, if your XML data were embedded in a larger document, and your data started on line 101 of the document, you may want to specify that the reader start at line 100. Therefore, if the reader threw an exception while parsing the first line of the XML, it would report the line number as line 101, rather than line 1.

## XmlReaderSettings.LinePositionOffset property

```csharp
public int LinePositionOffset { get; set; }
```

Gets or sets line position offset of the `XmlReader` object.

Returns: The line position offset. The default is 0.

#### Remarks
The `LinePositionOffset` setting determines the point where the `LinePosition` property starts counting. This is useful if your XML data is embedded within a larger document and there is no new line at the beginning of the XML. In this case, if the reader throws an exception while parsing the XML, you want it to return the line position relative to the main document, not just relative to the XML fragment.

## XmlReaderSettings.MaxCharactersFromEntities property

```csharp
public long MaxCharactersFromEntities { get; set; }
```

Gets or sets a value indicating the maximum allowable number of characters in a document that result from expanding entities.

Returns: The maximum allowable number of characters from expanded entities. The default is 0.

#### Remarks
A zero (0) value means no limits on the number of characters that result from expanding entities. A non-zero value specifies the maximum number of characters that can result from expanding entities.

If the reader attempts to read a document that contains entities such that the expanded size will exceed this property, an `XmlException` will be thrown.

This property allows you to mitigate denial of service attacks where the attacker submits XML documents that attempt to exceed memory limits via expanding entities. By limiting the characters that result from expanded entities, you can detect the attack and recover reliably.

#### Examples
The following code sets this property, and then attempts to parse a document that contains an entity that expands to a size greater than the set limit. In a real world scenario, you would set this limit to a value large enough to handle valid documents, yet small enough to limit the threat from malicious documents.

```csharp
string markup =
@"<!DOCTYPE Root [
  <!ENTITY anEntity ""Expands to more than 30 characters"">
  <!ELEMENT Root (#PCDATA)>
]>
<Root>Content &anEntity;</Root>";

XmlReaderSettings settings = new XmlReaderSettings();
settings.DtdProcessing = DtdProcessing.Parse;
settings.ValidationType = ValidationType.DTD;
settings.MaxCharactersFromEntities = 30;

try
{
    XmlReader reader = XmlReader.Create(new StringReader(markup), settings);
    while (reader.Read()) { }
}
catch (XmlException ex)
{
    Console.WriteLine(ex.Message);
}
```

```vb
Dim markup As String = _
    "<!DOCTYPE Root [" + Environment.NewLine + _
    "  <!ENTITY anEntity ""Expands to more than 30 characters"">" + Environment.NewLine + _
    "  <!ELEMENT Root (#PCDATA)>" + Environment.NewLine + _
    "]>" + Environment.NewLine + _
    "<Root>Content &anEntity;</Root>"

Dim settings As XmlReaderSettings = New XmlReaderSettings()
settings.DtdProcessing = DtdProcessing.Parse;
settings.ValidationType = ValidationType.DTD
settings.MaxCharactersFromEntities = 30

Try
    Dim reader As XmlReader = XmlReader.Create(New StringReader(markup), settings)
    While (reader.Read())
    End While
Catch ex As XmlException
    Console.WriteLine(ex.Message)
End Try
```

This example produces the following output:

```txt
There is an error in XML document (MaxCharactersFromEntities, ).
```

## XmlReaderSettings.MaxCharactersInDocument property

```csharp
public long MaxCharactersInDocument { get; set; }
```

Gets or sets a value indicating the maximum allowable number of characters in an XML document. A zero (0) value means no limits on the size of the XML document. A non-zero value specifies the maximum size, in characters.

Returns: The maximum allowable number of characters in an XML document. The default is 0.

#### Remarks
A zero (0) value means no limits on the number of characters in the parsed document. A non-zero value specifies the maximum number of characters that can be parsed.

The maximum character count for the document includes the count of characters that result from expanded entities.

If the reader attempts to read a document with a size that exceeds this property, an `XmlException` will be thrown.

This property allows you to mitigate denial of service attacks where the attacker submits extremely large XML documents. By limiting the size of a document, you can detect the attack and recover reliably.

#### Examples
The following code sets this property, and then attempts to parse a document larger than the limit. In a real world scenario, you would set this limit to a value large enough to handle valid documents, yet small enough to limit the threat from malicious documents.

```csharp
string markup = "<Root>Content</Root>";

XmlReaderSettings settings = new XmlReaderSettings();
settings.MaxCharactersInDocument = 10;

try
{
    XmlReader reader = XmlReader.Create(new StringReader(markup), settings);
    while (reader.Read()) { }
}
catch (XmlException ex)
{
    Console.WriteLine(ex.Message);
}
```

```vb
Dim markup As String = "<Root>Content</Root>"

Dim settings As XmlReaderSettings = New XmlReaderSettings()
settings.MaxCharactersInDocument = 10

Try
    Dim reader As XmlReader = XmlReader.Create(New StringReader(markup), settings)
    While (reader.Read())
    End While
Catch ex As XmlException
    Console.WriteLine(ex.Message)
End Try
```

This code produces the following output:

```txt
There is an error in XML document (MaxCharactersInDocument, ).
```

## XmlReaderSettings.NameTable property

```csharp
public System.Xml.XmlNameTable? NameTable { get; set; }
```

Gets or sets the `XmlNameTable` used for atomized string comparisons.

Returns: The `XmlNameTable` that stores all the atomized strings used by all `XmlReader` instances created using this `XmlReaderSettings` object.

The default is `null`. The created `XmlReader` instance will use a new empty `NameTable` if this value is `null`.

#### Remarks
Set this property to an `XmlNameTable` instance if you want to share a common name table among all the created `XmlReader` instances.

> **Note:**
> The `NameTable` class is not thread-safe. Therefore it cannot be shared between `XmlReader` objects that run simultaneously in different threads.

## XmlReaderSettings.ProhibitDtd property

```csharp
public bool ProhibitDtd { get; set; }
```

Gets or sets a value indicating whether to prohibit document type definition (DTD) processing. This property is obsolete. Use `XmlTextReader.DtdProcessing` instead.

Returns: `true` to prohibit DTD processing; otherwise `false`. The default is `true`.

This property is obsolete. Use `XmlTextReader.DtdProcessing` instead. If you had set `XmlReaderSettings.ProhibitDtd` to its default value `true`, set `XmlTextReader.DtdProcessing` to `DtdProcessing.Prohibit`. If you had set `XmlReaderSettings.ProhibitDtd` to `false`, set `XmlTextReader.DtdProcessing` to `DtdProcessing.Parse`.

## XmlReaderSettings.Schemas property

```csharp
public System.Xml.Schema.XmlSchemaSet Schemas { get; set; }
```

Gets or sets the `XmlSchemaSet` to use when performing schema validation.

Returns: The `XmlSchemaSet` to use when performing schema validation. The default is an empty `XmlSchemaSet` object.

This article pertains to the `Schemas` property.

> **Important:**
>
> - Do not use schemas from unknown or untrusted sources or locations. Doing so compromises the security of your code.
> - XML schemas (including inline schemas) are inherently vulnerable to denial of service attacks; do not accept them in untrusted scenarios.
> - Schema validation error messages and exceptions may expose sensitive information about the content model or URI paths to the schema file. Be careful not to expose this information to untrusted callers.
> - For additional information, see the "Security considerations" section.

The `XmlSchemaSet` class only supports XML Schema definition language (XSD) schemas. `XmlReader` instances created by the `XmlReader.Create` method cannot be configured to enable XML-Data Reduced (XDR) schema validation.

#### Security considerations

- Do not use schemas from unknown or untrusted sources. Doing so will compromise the security of your code. The `XmlUrlResolver` class is used to resolve external schemas by default. To disable resolution of include, import, and redefine elements of a schema, set the `XmlResolver` property to `null`.

- Exceptions raised as a result of using the `XmlSchemaSet` class, such as the `XmlSchemaException` class may contain sensitive information that should not be exposed in untrusted scenarios. For example, the `SourceUri` property of an `XmlSchemaException` returns the URI path to the schema file that caused the exception. The `SourceUri` property should not be exposed in untrusted scenarios. Exceptions should be properly handled so that this sensitive information is not exposed in untrusted scenarios.

The example below uses the `XmlReaderSettings` object and the `XmlReader.Create` method to associate a schema with an XML document. The schema is added to the `Schemas` property of the `XmlReaderSettings` object. The value of the `Schemas` property is an `XmlSchemaSet` object. The schema is used to validate that the XML document conforms to the schema content model. Schema validation errors and warnings are handled by the `ValidationEventHandler` defined in the `XmlReaderSettings` object.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReaderSettings/Schemas/xmlschemasetexample.cs._

The example uses the books.xml file as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlSchemaSetOverall Example/XML/books.xml._
The example uses the books.xsd file as an input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlSchemaSetOverall Example/XML/books.xsd._
