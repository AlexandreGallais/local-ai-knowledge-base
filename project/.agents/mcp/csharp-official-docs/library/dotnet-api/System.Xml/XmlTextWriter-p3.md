---
title: "XmlTextWriter class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextWriter class (part 3 of 4)

## XmlTextWriter.WriteFullEndElement() method

```csharp
public override void WriteFullEndElement ();
```

Closes one element and pops the corresponding namespace scope.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method always writes the full end tag. This is useful when dealing with elements that must include a full end tag. For example, browsers expect HTML script blocks to be closed with "\</script>".

#### Examples
The following example writes out an element with no content. It uses WriteFullEndElement to write the full end element tag.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteFullEndElement/source.cs._

## XmlTextWriter.WriteName(String) method

```csharp
public override void WriteName (string name);
```

Writes out the specified name, ensuring it is a valid name according to the W3C XML 1.0 recommendation.

Parameters:

- `name`: Name to write.

Exceptions:

- `ArgumentException`: `name` is not a valid XML name; or `name` is either `null` or `String.Empty`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If `Namespaces` is set to `true`, `WriteName` also checks that the name is also valid according to the W3C Namespaces in XML recommendation.

## XmlTextWriter.WriteNmToken(String) method

```csharp
public override void WriteNmToken (string name);
```

Writes out the specified name, ensuring it is a valid `NmToken` according to the W3C XML 1.0 recommendation.

Parameters:

- `name`: Name to write.

Exceptions:

- `ArgumentException`: `name` is not a valid `NmToken`; or `name` is either `null` or `String.Empty`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

## XmlTextWriter.WriteProcessingInstruction(String, String) method

```csharp
public override void WriteProcessingInstruction (string name, string? text);
```

Writes out a processing instruction with a space between the name and text as follows: <?name text?>.

Parameters:

- `name`: Name of the processing instruction.
- `text`: Text to include in the processing instruction.

Exceptions:

- `ArgumentException`: The text would result in a non-well formed XML document.

`name` is either `null` or `String.Empty`.

This method is being used to create an XML declaration after `XmlTextWriter.WriteStartDocument` has already been called.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If `text` is either `null` or `String.Empty`, this method writes a `ProcessingInstruction` with no data content, for example \<?name?>.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCData/source.cs._

## XmlTextWriter.WriteQualifiedName(String, String) method

```csharp
public override void WriteQualifiedName (string localName, string? ns);
```

Writes out the namespace-qualified name. This method looks up the prefix that is in scope for the given namespace.

Parameters:

- `localName`: The local name to write.
- `ns`: The namespace URI to associate with the name.

Exceptions:

- `ArgumentException`: `localName` is either `null` or `String.Empty`.

`localName` is not a valid name according to the W3C Namespaces spec.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

For example, the following Microsoft Visual C# code:

```csharp
writer.Formatting = Formatting.Indented;
writer.WriteStartElement("root");
 writer.WriteAttributeString("xmlns","x",null,"urn:abc");
 writer.WriteStartElement("item");
 writer.WriteStartAttribute("href",null);
 writer.WriteString("#");
 writer.WriteQualifiedName("test","urn:abc");
 writer.WriteEndAttribute();
 writer.WriteEndElement();
 writer.WriteEndElement();
 writer.Close();
```

Generates the following output:

```xml
<root xmlns:x="urn:abc">
 
</root>
```

If `ns` maps to the current default namespace, no prefix is generated.

When writing attribute values, this method generates a prefix if `ns` is not found. When writing element content, it throws an exception if `ns` is not found.

If this writer supports namespaces (`Namespaces` is set to `true`), this method also checks that the name is valid according to the W3C Namespaces in XML recommendation.

#### Examples
The following example writes out a portion of a XSD schema.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteQualifiedName/source.cs._

## XmlTextWriter.WriteRaw(String) method

```csharp
public override void WriteRaw (string data);
```

Writes raw markup manually from a string.

Parameters:

- `data`: String containing the text to write.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method does not escape special characters.

> **Important:**
> The `XmlTextWriter` does not validate any data that is passed to the `XmlTextWriter.WriteRaw` method. You should not pass <example-value> data to this method.

#### Examples
The following example writes a string using the `WriteRaw` method.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteRaw/source.cs._

## XmlTextWriter.WriteRaw(Char[], Int32, Int32) method

```csharp
public override void WriteRaw (char[] buffer, int index, int count);
```

Writes raw markup manually from a character buffer.

Parameters:

- `buffer`: Character array containing the text to write.
- `index`: The position within the buffer indicating the start of the text to write.
- `count`: The number of characters to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

The buffer length minus `index` is less than `count`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method does not escape special characters.

> **Important:**
> The `XmlTextWriter` does not validate any data that is passed to the `XmlTextWriter.WriteRaw` method. You should not pass <example-value> data to this method.

## XmlTextWriter.WriteStartAttribute(String, String, String) method

```csharp
public override void WriteStartAttribute (string? prefix, string localName, string? ns);
```

Writes the start of an attribute.

Parameters:

- `prefix`: `Namespace` prefix of the attribute.
- `localName`: `LocalName` of the attribute.
- `ns`: `NamespaceURI` of the attribute.

Exceptions:

- `ArgumentException`: `localName` is either `null` or `String.Empty`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This is a more advanced version of `XmlWriter.WriteAttributeString` that allows you to write an attribute value using multiple write methods, such as `XmlTextWriter.WriteString`.

#### Examples
The following example writes out a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/LookupPrefix/source.cs._

## XmlTextWriter.WriteStartDocument() method

```csharp
public override void WriteStartDocument ();
```

Writes the XML declaration with the version "1.0".

Exceptions:

- `InvalidOperationException`: This is not the first write method called after the constructor.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

The encoding level of the document is determined by how the writer is implemented. For example, if an `Encoding` object is specified in the `XmlTextWriter` constructor, this determines the value of the encoding attribute. This method does not create a standalone attribute.

When `WriteStartDocument` is called the writer validates that what you are writing is a well-formed XML document. For example, it checks that the XML declaration is the first node, that one and only one root-level element exists and so on. If this method is not called, the writer assumes an XML fragment is being written and applies no root level rules.

If `WriteStartDocument` has been called and then the `XmlTextWriter.WriteProcessingInstruction` method is used to create another XML declaration, an exception is thrown.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCData/source.cs._

## XmlTextWriter.WriteStartDocument(Boolean) method

```csharp
public override void WriteStartDocument (bool standalone);
```

Writes the XML declaration with the version "1.0" and the standalone attribute.

Parameters:

- `standalone`: If `true`, it writes "standalone=yes"; if `false`, it writes "standalone=no".

Exceptions:

- `InvalidOperationException`: This is not the first write method called after the constructor.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

The encoding level of the document is determined by how the writer is implemented. For example, if an `Encoding` object is specified in the `XmlTextWriter` constructor, this determines the value of the encoding attribute.

When `WriteStartDocument` is called the writer validates that what you are writing is a well-formed XML document. For example, it checks that the XML declaration is the first node, that one and only one root-level element exists and so on. If this method is not called, the writer assumes an XML fragment is being written and applies no root level rules.

If `WriteStartDocument` has been called and then the `XmlTextWriter.WriteProcessingInstruction` method is used to create another XML declaration, an exception is thrown.

## XmlTextWriter.WriteStartElement(String, String, String) method

```csharp
public override void WriteStartElement (string? prefix, string localName, string? ns);
```

Writes the specified start tag and associates it with the given namespace and prefix.

Parameters:

- `prefix`: The namespace prefix of the element.
- `localName`: The local name of the element.
- `ns`: The namespace URI to associate with the element. If this namespace is already in scope and has an associated prefix then the writer automatically writes that prefix also.

Exceptions:

- `InvalidOperationException`: The writer is closed.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

After calling this method you can either write attributes or create content using `XmlTextWriter.WriteComment`, `XmlTextWriter.WriteString`, or `XmlTextWriter.WriteStartElement` for child elements. You can close the element with `XmlTextWriter.WriteEndElement` at which time an end tag is written out.

#### Examples
The following example writes out a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/LookupPrefix/source.cs._

## XmlTextWriter.WriteString(String) method

```csharp
public override void WriteString (string? text);
```

Writes the given text content.

Parameters:

- `text`: Text to write.

Exceptions:

- `ArgumentException`: The text string contains an invalid surrogate pair.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

`WriteString` does the following

- The characters `&`, `<`, and `>` are replaced with `&`, `<`, and `>`, respectively.

- Character values in the range 0x-0x1F (excluding white space characters 0x9, 0xA, and 0xD) are replaced with numeric character entities (` ` through `&#0x1F`).

- If `WriteString` is called in the context of an attribute value, double and single quotes are replaced with `"` and `'` respectively.

For example, this input string `testtest` is written as `test<item>test`.

If `text` is either `null` or `String.Empty`, this method writes a text node with no data content.

#### Examples
The following example writes an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/Close/source.cs._

## XmlTextWriter.WriteSurrogateCharEntity(Char, Char) method

```csharp
public override void WriteSurrogateCharEntity (char lowChar, char highChar);
```

Generates and writes the surrogate character entity for the surrogate character pair.

Parameters:

- `lowChar`: The low surrogate. This must be a value between `0xDC00` and `0xDFFF`.
- `highChar`: The high surrogate. This must be a value between `0xD800` and `0xDBFF`.

Exceptions:

- `Exception`: An invalid surrogate character pair was passed.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method is only applicable on systems that use UTF-16 encoding.

The surrogate character entity is written in hexadecimal format. The range for surrogate characters is `#x10000` to `#x10FFFF`. The following formula is used to generate the surrogate character entity: (`highChar` - `0xD800`) * `0x400` + (`lowChar` - `0xDC00`) + `0x10000`.

For both HTML and XML, the document character set (and therefore the notation of numeric character references) is based on UCS [ISO-10646]. A single numeric character reference in a source document may therefore in some cases correspond to two 16-bit units in a string (a high surrogate and a low surrogate). These 16-bit units are referred to as a surrogate pair.

For more information regarding surrogates or characters, refer to section 3.7 of the Unicode 3.0/Unicode 2.0 standard, or section 2.2 of the W3C XML 1.0 Recommendation.
