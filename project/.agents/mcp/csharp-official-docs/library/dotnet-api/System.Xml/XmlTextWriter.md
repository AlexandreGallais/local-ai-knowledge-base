---
title: "XmlTextWriter class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextWriter class

Namespace: `System.Xml`

```csharp
public class XmlTextWriter : System.Xml.XmlWriter
```

Represents a writer that provides a fast, non-cached, forward-only way of generating streams or files containing XML data that conforms to the W3C Extensible Markup Language (XML) 1.0 and the Namespaces in XML recommendations.

We recommend that you use the `XmlWriter` class instead.

The `XmlTextWriter` class implements the `XmlWriter` class.

> **Note:**
> We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

`XmlTextWriter` maintains a namespace stack corresponding to all the namespaces defined in the current element stack. Using `XmlTextWriter` you can declare namespaces manually.

```csharp
w.WriteStartElement("root");
w.WriteAttributeString("xmlns", "x", null, "urn:1");
w.WriteStartElement("item","urn:1");
w.WriteEndElement();
w.WriteStartElement("item","urn:1");
w.WriteEndElement();
w.WriteEndElement();
```

This C# code produces the following output. `XmlTextWriter` promotes the namespace declaration to the root element to avoid having it duplicated on the two child elements. The child elements pick up the prefix from the namespace declaration.

```xml
<root xmlns:x="urn:1">

</root>
```

`XmlTextWriter` also allows you to override the current namespace declaration. In the following example, the namespace URI "123" is overridden by "abc" to produce the XML element ``.

```csharp
w.WriteStartElement("x","node","123");
w.WriteAttributeString("xmlns","x",null,"abc");
```

By using the write methods that take a prefix as an argument, you can also specify which prefix to use. In the following example, two different prefixes are mapped to the same namespace URI to produce the XML text `<x:root xmlns:x="urn:1"></x:root>`.

```csharp
XmlTextWriter w = new XmlTextWriter(Console.Out);
w.WriteStartElement("x","root","urn:1");
w.WriteStartElement("y","item","urn:1");
w.WriteEndElement();
w.WriteEndElement();
w.Close();
```

If there are multiple namespace declarations mapping different prefixes to the same namespace URI, `XmlTextWriter` walks the stack of namespace declarations backwards and picks the closest one.

```csharp
XmlTextWriter w = new XmlTextWriter(Console.Out);
w.Formatting = Formatting.Indented;
w.WriteStartElement("x","root","urn:1");
w.WriteStartElement("y","item","urn:1");
w.WriteAttributeString("attr","urn:1","123");
w.WriteEndElement();
w.WriteEndElement();
w.Close();
```

In this C# example, because the `WriteAttributeString` call does not specify a prefix, the writer uses the last prefix pushed onto the namespace stack, and produces the following XML:

```xml
<x:root xmlns:x="urn:1">

</x:root>
```

If namespace conflicts occur, `XmlTextWriter` resolves them by generating alternate prefixes. For example, if an attribute and element have the same prefix but different namespaces, `XmlWriter` generates an alternate prefix for the attribute. The generated prefixes are named `n{i}` where `i` is a number beginning at 1. The number is reset to 1 for each element.

Attributes which are associated with a namespace URI must have a prefix (default namespaces do not apply to attributes). This conforms to section 5.2 of the W3C Namespaces in XML recommendation. If an attribute references a namespace URI, but does not specify a prefix, the writer generates a prefix for the attribute.

When writing an empty element, an additional space is added between tag name and the closing tag, for example ``. This provides compatibility with older browsers.

When a `String` is used as method parameter, `null` and `String.Empty` are equivalent. `String.Empty` follows the W3C rules.

To write strongly typed data, use the `XmlConvert` class to convert data types to string. For example, the following C# code converts the data from `Double` to `String` and writes the element `<price>19.95</price>`.

```csharp
Double price = 19.95;
writer.WriteElementString("price", XmlConvert.ToString(price));
```

`XmlTextWriter` does not check for the following:

- Invalid characters in attribute and element names.
- Unicode characters that do not fit the specified encoding. If the Unicode characters do not fit the specified encoding, the `XmlTextWriter` does not escape the Unicode characters into character entities.
- Duplicate attributes.
- Characters in the DOCTYPE public identifier or system identifier.

#### Security considerations

The following items are things to consider when working with the `XmlTextWriter` class.

- Exceptions thrown by the `XmlTextWriter` can disclose path information that you do not want bubbled up to the application. Your applications must catch exceptions and process them appropriately.

- When you pass the `XmlTextWriter` to another application the underlying stream is exposed to that application. If you need to pass the `XmlTextWriter` to a semi-trusted application, you should use an `XmlWriter` object created by the `XmlWriter.Create` method instead.

- The `XmlTextWriter` does not validate any data that is passed to the `XmlTextWriter.WriteDocType` or `XmlTextWriter.WriteRaw` methods. You should not pass <example-value> data to these methods.

- If the default settings are changed, there is no guarantee that the generated output is well-formed XML data.

- Do not accept supporting components, such as an `Encoding` object, from an untrusted source.

## XmlTextWriter.XmlTextWriter(TextWriter) constructor

```csharp
public XmlTextWriter (System.IO.TextWriter w);
```

Creates an instance of the `XmlTextWriter` class using the specified `TextWriter`.

Parameters:

- `w`: The `TextWriter` to write to. It is assumed that the `TextWriter` is already set to the correct encoding.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

## XmlTextWriter.XmlTextWriter(Stream, Encoding) constructor

```csharp
public XmlTextWriter (System.IO.Stream w, System.Text.Encoding? encoding);
```

Creates an instance of the `XmlTextWriter` class using the specified stream and encoding.

Parameters:

- `w`: The stream to which you want to write.
- `encoding`: The encoding to generate. If encoding is `null` it writes out the stream as UTF-8 and omits the encoding attribute from the `ProcessingInstruction`.

Exceptions:

- `ArgumentException`: The encoding is not supported or the stream cannot be written to.
- `ArgumentNullException`: `w` is `null`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

## XmlTextWriter.XmlTextWriter(String, Encoding) constructor

```csharp
public XmlTextWriter (string filename, System.Text.Encoding? encoding);
```

Creates an instance of the `XmlTextWriter` class using the specified file.

Parameters:

- `filename`: The filename to write to. If the file exists, it truncates it and overwrites it with the new content.
- `encoding`: The encoding to generate. If encoding is `null` it writes the file out as UTF-8, and omits the encoding attribute from the `ProcessingInstruction`.

Exceptions:

- `ArgumentException`: The encoding is not supported; the filename is empty, contains only white space, or contains one or more invalid characters.
- `UnauthorizedAccessException`: Access is denied.
- `ArgumentNullException`: The filename is `null`.
- `DirectoryNotFoundException`: The directory to write to is not found.
- `IOException`: The filename includes an incorrect or invalid syntax for file name, directory name, or volume label syntax.
- `SecurityException`: The caller does not have the required permission.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

## XmlTextWriter.BaseStream property

```csharp
public System.IO.Stream? BaseStream { get; }
```

Gets the underlying stream object.

Returns: The stream to which the `XmlTextWriter` is writing or `null` if the `XmlTextWriter` was constructed using a `TextWriter` that does not inherit from the `StreamWriter` class.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If the writer was constructed using a `TextWriter` that is derived from the `StreamWriter` class, this property is equivalent to the `BaseStream` property. If the writer was constructed using a `Stream`, this property returns the `Stream` passed to the constructor. If the writer was constructed using a file name, this property returns the `Stream` representing the file.

## XmlTextWriter.Formatting property

```csharp
public System.Xml.Formatting Formatting { get; set; }
```

Indicates how the output is formatted.

Returns: One of the `Formatting` values. The default is `Formatting.None` (no special formatting).

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If the `Indented` option is set, child elements are indented using the `Indentation` and `IndentChar` properties. Only element content is indented. The following C# code writes out HTML elements including mixed content:

```csharp
XmlTextWriter w = new XmlTextWriter(Console.Out);
 w.Formatting = Formatting.Indented;
 w.WriteStartElement("ol");
 w.WriteStartElement("li");
 w.WriteString("The big "); // This means "li" now has a mixed content model.
 w.WriteElementString("b", "E");
 w.WriteElementString("i", "lephant");
 w.WriteString(" walks slowly.");
 w.WriteEndElement();
 w.WriteEndElement();
```

The above code produces the following output:

```xml
<ol>
  <li>The big Elephant walks slowly.</li>
</ol>
```

When this is viewed in HTML no white space appears between the bold and italic elements. In fact, in this example, if indenting was added between these elements the word "Elephant" would be incorrectly broken.

> **Note:**
> Writing any text content, excluding `String.Empty` puts that element into mixed content mode. Child elements do not inherit this "mixed" mode status. A child element of a "mixed" element does indenting, unless it is also contains "mixed" content. Element content and mixed content are defined according to the XML 1.0 definitions of these terms.

#### Examples
The following example writes an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/Close/source.cs._

## XmlTextWriter.Indentation property

```csharp
public int Indentation { get; set; }
```

Gets or sets how many IndentChars to write for each level in the hierarchy when `XmlTextWriter.Formatting` is set to `Formatting.Indented`.

Returns: Number of `IndentChars` for each level. The default is 2.

Exceptions:

- `ArgumentException`: Setting this property to a negative value.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

Indentation is performed on following node types: `DocumentType`, `Element`, `Comment`, `ProcessingInstruction`, and `CDATASection`. All other node types are not affected. The `XmlTextWriter` does not indent the internal DTD subset. However, you could do the following to apply formatting to the internal DTD subset.

```csharp
String name = "Employees";
String pubid = null;
String sysid = null;
String subset =
@"
    <!ELEMENT Employees (Employee)+>
    <!ELEMENT Employee EMPTY>
    <!ATTLIST Employee firstname CDATA #REQUIRED>
    <!ENTITY Company 'Microsoft'>]>
";
XmlTextWriter tw = new XmlTextWriter(Console.Out);
tw.WriteDocType(name, pubid, sysid, subset);
```

#### Examples
The following example writes an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/Close/source.cs._

## XmlTextWriter.IndentChar property

```csharp
public char IndentChar { get; set; }
```

Gets or sets which character to use for indenting when `XmlTextWriter.Formatting` is set to `Formatting.Indented`.

Returns: The character to use for indenting. The default is space.

#### Remarks

The `XmlTextWriter` allows you to set this property to any character. To ensure valid XML, you must specify a valid white space character, 0x9, 0x10, 0x13, or 0x20.

> **Note:**
> We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

## XmlTextWriter.Namespaces property

```csharp
public bool Namespaces { get; set; }
```

Gets or sets a value indicating whether to do namespace support.

Returns: `true` to support namespaces; otherwise, `false`.

The default is `true`.

Exceptions:

- `InvalidOperationException`: You can only change this property when in the `WriteState.Start` state.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This property determines whether the writer supports the W3C Namespaces in XML recommendation.

## XmlTextWriter.QuoteChar property

```csharp
public char QuoteChar { get; set; }
```

Gets or sets which character to use to quote attribute values.

Returns: The character to use to quote attribute values. This must be a single quote (') or a double quote (&#34;). The default is a double quote.

Exceptions:

- `ArgumentException`: Setting this property to something other than either a single or double quote.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

## XmlTextWriter.WriteState property

```csharp
public override System.Xml.WriteState WriteState { get; }
```

Gets the state of the writer.

Returns: One of the `WriteState` values.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.
