---
title: "XmlWriterSettings class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlWriterSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriterSettings class (part 2 of 2)

## XmlWriterSettings.DoNotEscapeUriAttributes property

```csharp
public bool DoNotEscapeUriAttributes { get; set; }
```

Gets or sets a value that indicates whether the `XmlWriter` does not escape URI attributes.

Returns: `true` if the `XmlWriter` does not escape URI attributes; otherwise, `false`. The default is `false`.

To be added.

## XmlWriterSettings.Encoding property

```csharp
public System.Text.Encoding Encoding { get; set; }
```

Gets or sets the type of text encoding to use.

Returns: The text encoding to use. The default is `Encoding.UTF8`.

#### Remarks
The `XmlWriter` encodes a buffer of characters all at once, rather than character by character. An exception is thrown when the `XmlWriter.Flush` method is called if any encoding errors are encountered.

The `Encoding` property only applies to the `XmlWriter` instances that are created either with the specified `Stream` or with the specified file name. If the `XmlWriter` instance is created with the specified `TextWriter`, the `Encoding` property is overridden by the encoding of the underlying `TextWriter`. For example, if this property is set to Unicode (UTF-16) for a particular `XmlWriter`, but the underlying writer is a `StreamWriter` (which derives from `TextWriter`) with its encoding set to UTF8, the output will be UTF-8 encoded.

If the `XmlWriter` instance is created with other output parameters, the `Encoding` property is ignored.

In the following example:

- The default value of `Encoding` is `Encoding.UTF8`.

- The `StreamWriter` is set to `Encoding.Unicode` and the `StreamWriter`'s encoding overrides the `Encoding` setting.

- The output will be `Encoding.Unicode`.

```csharp
using (StreamWriter output =
    new StreamWriter(new FileStream("Xml01.xml", FileMode.Create), Encoding.Unicode))
{
    using (XmlWriter xmlWriter =
        XmlWriter.Create(output, new XmlWriterSettings()))
    {
        xmlWriter.WriteStartDocument();
        xmlWriter.WriteStartElement("Root");
        xmlWriter.WriteEndElement();
        xmlWriter.WriteEndDocument();
    }
}
```

> **Important:**
> Do not accept an `Encoding` object from an untrusted source.

#### Examples
The following example shows how to set the `Encoding` property:

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriterSettings/Encoding/migration.cs._

## XmlWriterSettings.Indent property

```csharp
public bool Indent { get; set; }
```

Gets or sets a value indicating whether to indent elements.

Returns: `true` to write individual elements on new lines and indent; otherwise, `false`. The default is `false`.

#### Remarks
This property only applies to `XmlWriter` instances that output text content; otherwise, this setting is ignored.

The elements are indented as long as the element does not contain mixed content. Once the `XmlWriter.WriteString` or `XmlWriter.WriteWhitespace` method is called to write out a mixed element content, the `XmlWriter` stops indenting. The indenting resumes once the mixed content element is closed.

#### Examples
The following example creates an `XmlWriter` object that uses the TAB character for indentation.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writeindent.cs._

## XmlWriterSettings.IndentChars property

```csharp
public string IndentChars { get; set; }
```

Gets or sets the character string to use when indenting. This setting is used when the `XmlWriterSettings.Indent` property is set to `true`.

Returns: The character string to use when indenting. This can be set to any string value. However, to ensure valid XML, you should specify only valid white space characters, such as space characters, tabs, carriage returns, or line feeds. The default is two spaces.

Exceptions:

- `ArgumentNullException`: The value assigned to the `XmlWriterSettings.IndentChars` is `null`.

#### Remarks
This property only applies to `XmlWriter` instances that output text content; otherwise, this setting is ignored. The `XmlWriter` throws an exception if the indent characters would result in invalid XML.

#### Examples
The following example creates an `XmlWriter` object that uses the TAB character for indentation.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writeindent.cs._

## XmlWriterSettings.NamespaceHandling property

```csharp
public System.Xml.NamespaceHandling NamespaceHandling { get; set; }
```

Gets or sets a value that indicates whether the `XmlWriter` should remove duplicate namespace declarations when writing XML content. The default behavior is for the writer to output all namespace declarations that are present in the writer's namespace resolver.

Returns: The `NamespaceHandling` enumeration used to specify whether to remove duplicate namespace declarations in the `XmlWriter`.

To be added.

## XmlWriterSettings.NewLineChars property

```csharp
public string NewLineChars { get; set; }
```

Gets or sets the character string to use for line breaks.

Returns: The character string to use for line breaks. This can be set to any string value. However, to ensure valid XML, you should specify only valid white space characters, such as space characters, tabs, carriage returns, or line feeds. The default is `\r\n` (carriage return, new line) for non-Unix platforms, and `\n` (new line) for Unix platforms.

Exceptions:

- `ArgumentNullException`: The value assigned to the `XmlWriterSettings.NewLineChars` is `null`.

#### Remarks
This property only applies to `XmlWriter` instances that output text content; otherwise, this setting is ignored. The `XmlWriter` throws an exception if the line break characters would result in invalid XML.

## XmlWriterSettings.NewLineHandling property

```csharp
public System.Xml.NewLineHandling NewLineHandling { get; set; }
```

Gets or sets a value indicating whether to normalize line breaks in the output.

Returns: One of the `NewLineHandling` values. The default is `NewLineHandling.Replace`.

#### Remarks
This setting applies when writing text content or attribute values. Each of the `NewLineHandling` values is described below:

- The `Entitize` setting tells the `XmlWriter` to replace new line characters that would not be otherwise preserved by a normalizing `XmlReader` with character entities. This is useful in round-trip scenarios where the output is read by a normalizing `XmlReader`. Additional normalization rules apply for attribute values when round tripping since `\t`, `\n` and `\r` are replaced with a space in attribute values when normalized in an `XmlReader`.

- The `Replace` setting tells the `XmlWriter` to replace new line characters with the character(s) specificed in the `NewLineChars` property. This setting also replaces new lines in attributes with character entities to preserve the characters. It is also the default value.

- The `None` setting tells the `XmlWriter` to leave the input unchanged. This setting is used when you do not want any new-line processing. This is useful when the output is read by an `XmlReader` that does not do any normalization (for example, an `XmlTextReader` with default settings.)

The following tables show the output of the `XmlWriter.WriteString` method when supplied with the input value depending on the `NewLineHandling` property setting. The tables show the output when writing text content and also when writing an attribute value.

Text Node Value:

| `NewLineHandling` | \r\n   | \n   | \r   | \t |
|-------------------|--------|------|------|----|
| `Entitize`        | &#D;\n | \n   | &#D; | \t |
| `Replace`         | \r\n   | \r\n | \r\n | \t |
| `None`            | \r\n   | \n   | \r   | \t |

Attribute Value:

| `NewLineHandling` | \r\n     | \n   | \r   | \t    |
|-------------------|----------|------|------|-------|
| `Entitize`        | &#D;&#A; | &#A; | &#D; | &\#9; |
| `Replace`         | &#D;&#A; | &#A; | &#D; | &\#9; |
| `None`            | \r\n     | \n   | \r   | \t    |

> **Note:**
> The `XmlWriter` has the following behavior when writing content within a CDATA section, comment, or processing instruction. New lines are never replaced with their character entities, even when the `NewLineHandling` property is set to `Entitize`. This is because character entities are not recognized in CDATA sections, comments or processing instructions. If the `NewLineHandling` property is set to `None` or `Replace`, the behavior is the same as when writing a text node value.

The following table describes what a normalizing `XmlReader` returns for each white space input. For more information, see sections 2.11 and 3.3.3 of the W3C XML 1.0 Recommendation.

| Value type | \r\n         | \n           | \r           | \t           |
|------------|--------------|--------------|--------------|--------------|
| Text Node  | \n           | \n           | \n           | \t           |
| Attribute  | single space | single space | single space | single space |

> **Note:**
> A normalizing reader is any `XmlReader` object created by the `XmlReader.Create` method. These objects always perform line break normalization and full normalization of attributes. The `XmlTextReader` object can also be a normalizing reader if its `Normalization` property is set to `true`.

## XmlWriterSettings.NewLineOnAttributes property

```csharp
public bool NewLineOnAttributes { get; set; }
```

Gets or sets a value indicating whether to write attributes on a new line.

Returns: `true` to write attributes on individual lines; otherwise, `false`. The default is `false`.

#### Remarks

This property only applies to `XmlWriter` instances that output text content; otherwise, this setting is ignored.

When `NewLineOnAttributes` is set to `true`, each attribute is prepended with a new line and one extra level of indentation.

This setting has no effect when the `Indent` property value is `false`.

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

## XmlWriterSettings.OmitXmlDeclaration property

```csharp
public bool OmitXmlDeclaration { get; set; }
```

Gets or sets a value indicating whether to omit an XML declaration.

Returns: `true` to omit the XML declaration; otherwise, `false`. The default is `false`, an XML declaration is written.

#### Remarks
This property only applies to `XmlWriter` instances that output text content; otherwise, this setting is ignored.

If `OmitXmlDeclaration` is set to `false`, The XML declaration is written automatically

The XML declaration is always written if `ConformanceLevel` is set to `Document`, even if `OmitXmlDeclaration` is set to `true`.

The XML declaration is never written if `ConformanceLevel` is set to `Fragment`. You can call `XmlWriter.WriteProcessingInstruction` to explicitly write out an XML declaration.

#### Examples
The following example writes an XML fragment to a memory stream.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlWriter/Create/writestream2.cs._

## XmlWriterSettings.OutputMethod property

```csharp
public System.Xml.XmlOutputMethod OutputMethod { get; }
```

Gets the method used to serialize the `XmlWriter` output.

Returns: One of the `XmlOutputMethod` values. The default is `XmlOutputMethod.Xml`.

#### Remarks
This property specifies the method used to serialize the output. The output can be serialized using the HTML rules, the XML 1.0 rules, and so on. This setting is set by the XSLT processor and is used internally by Visual Studio.

## XmlWriterSettings.WriteEndDocumentOnClose property

```csharp
public bool WriteEndDocumentOnClose { get; set; }
```

Gets or sets a value that indicates whether the `XmlWriter` will add closing tags to all unclosed element tags when the `XmlWriter.Close` method is called.

Returns: `true` if all unclosed element tags will be closed out; otherwise, `false`. The default value is `true`.

#### Remarks
If you set this flag to `false`, the output XML file may not be well-formed.

## XmlWriterSettings.Clone() method

```csharp
public System.Xml.XmlWriterSettings Clone ();
```

Creates a copy of the `XmlWriterSettings` instance.

Returns: The cloned `XmlWriterSettings` object.

#### Remarks
The cloned `XmlWriterSettings` object can be modified without affecting the settings on the original object.

## XmlWriterSettings.Reset() method

```csharp
public void Reset ();
```

Resets the members of the settings class to their default values.

#### Remarks
The following table shows the default property values for an instance of `XmlWriterSettings`.

|Property|Initial value|
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
