---
title: "XmlDocument class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDocument class (part 6 of 7)

## XmlDocument.Load(String) method

```csharp
public virtual void Load (string filename);
```

Loads the XML document from the specified URL.

Parameters:

- `filename`: URL for the file containing the XML document to load. The URL can be either a local file or an HTTP URL (a Web address).

Exceptions:

- `XmlException`: There is a load or parse error in the XML. In this case, a `FileNotFoundException` is raised.
- `ArgumentException`: `filename` is a zero-length string, contains only white space, or contains one or more invalid characters as defined by `Path.InvalidPathChars`.
- `ArgumentNullException`: `filename` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `filename` specified a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`filename` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in `filename` was not found.
- `NotSupportedException`: `filename` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks

> **Note:**
> The `Load` method always preserves significant white space. The `PreserveWhitespace` property determines whether or not insignificant white space, that is white space in element content, is preserved. The default is `false`; white space in element content is not preserved.

If you want validation to occur, you can create a validating `XmlReader` instance by using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section of the `XmlReader` reference page.

This method is a Microsoft extension to the Document Object Model (DOM).

## XmlDocument.Load(XmlReader) method

```csharp
public virtual void Load (System.Xml.XmlReader reader);
```

Loads the XML document from the specified `XmlReader`.

Parameters:

- `reader`: The `XmlReader` used to feed the XML data into the document.

Exceptions:

- `XmlException`: There is a load or parse error in the XML. In this case, the document remains empty.

#### Remarks

> **Note:**
> The `Load` method always preserves significant white space. The `PreserveWhitespace` property determines whether or not insignificant white space, that is white space in element content, is preserved. The default is `false`; white space in element content is not preserved.

If the reader is in the initial state (`ReadState` =ReadState.Initial), `Load` consumes the entire contents of the reader and builds the DOM from what it finds.

If the reader is already positioned on some node at depth "n", this method loads that node and all subsequent siblings up to the end tag that closes depth "n". This has the following results.

If the current node and its siblings look like the following:

```xml
<!--comment--><element1>one</element1><element2>two</element2>
```

`Load` throws an exception because a document cannot have two root level elements. If the current node and its siblings look like the following:

```xml
<!--comment--><?process instruction?><!--comment--></endtag>
```

`Load` succeeds, but you have an incomplete DOM tree because there is no root level element. Before you save the document, you must add a root level element, otherwise `XmlDocument.Save` will throw an exception.

If the reader is positioned on a leaf node that is invalid for the root level of a document, for example a white space or attribute node, the reader continues to read until it is positioned on a node that can be used for the root. The document begins loading at this point.

If you want validation to occur, you can create a validating `XmlReader` instance by using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section of the `XmlReader` reference page.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example loads the last book node of the `books.xml` file into the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Load/source.cs._
[!code-vbClassic WebData XmlDocument.Load2 Example#1]

The example uses the file, `books.xml`, as input.

[!code-xmlClassic WebData XslTransform.Transform7 Example#2]

## XmlDocument.LoadXml(String) method

```csharp
public virtual void LoadXml (string xml);
```

Loads the XML document from the specified string.

Parameters:

- `xml`: String containing the XML document to load.

Exceptions:

- `XmlException`: There is a load or parse error in the XML. In this case, the document remains empty.

#### Remarks
By default the `LoadXml` method does not preserve white space or significant white space.

This method parses Document Type Definitions (DTDs), but does not do DTD or Schema validation. If you want validation to occur, you can create a validating `XmlReader` instance by using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section of the `XmlReader` reference page.

If you want to load from a `Stream`, `String`, `TextReader`, or `XmlReader`, use the Load method instead of this method.

This method is a Microsoft extension to the Document Object Model (DOM).

#### Examples

The following example loads XML into an `XmlDocument` object and saves it out to a file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/LoadXml/source.cs._
[!code-vbClassic WebData XmlDocument.LoadXml Example#1]

## XmlDocument.ReadNode(XmlReader) method

```csharp
public virtual System.Xml.XmlNode? ReadNode (System.Xml.XmlReader reader);
```

Creates an `XmlNode` object based on the information in the `XmlReader`. The reader must be positioned on a node or attribute.

Parameters:

- `reader`: The XML source.

Returns: The new `XmlNode` or `null` if no more nodes exist.

Exceptions:

- `NullReferenceException`: The reader is positioned on a node type that does not translate to a valid DOM node (for example, EndElement or EndEntity).

#### Remarks
Reads one `XmlNode` from the given reader and positions the reader on the next node. This method creates the type of `XmlNode` matching the `NodeType` on which the reader is currently positioned. (If the reader is in the initial state, `ReadNode` advances the reader to the first node and then operates on that node.)

If the reader is positioned on the start of an element, `ReadNode` reads all the attributes and any child nodes, up to and including the end tag of the current node. The `XmlNode` returned contains the sub-tree representing everything read. The reader is positioned immediately after the end tag.

`ReadNode` can also read attributes, but in this case it does not advance the reader to the next attribute. This allows you to write the following C# code:

```csharp
XmlDocument doc = new XmlDocument();
while (reader.MoveToNextAttribute())
{
  XmlNode a = doc.ReadNode(reader);
  // Do some more processing.
}
```

`ReadNode` does consume the attribute value though, which means after calling `ReadNode` on an attribute, `XmlReader.ReadAttributeValue` returns `false`.

#### Examples

The following example uses `ReadNode` to create a new node and then inserts the new node into the document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/ReadNode/source.cs._
[!code-vbClassic WebData XmlDocument.ReadNode Example#1]

The example uses the file, `cd.xml`, as input.

[!code-xmlClassic WebData XmlDocument.ReadNode Example#2]

## XmlDocument.Save(Stream) method

```csharp
public virtual void Save (System.IO.Stream outStream);
```

Saves the XML document to the specified stream.

Parameters:

- `outStream`: The stream to which you want to save.

Exceptions:

- `XmlException`: The operation would not result in a well formed XML document (for example, no document element or duplicate XML declarations).

#### Remarks
White space is preserved only if `PreserveWhitespace` is set to `true`.

The XmlDeclaration of the current `XmlDocument` object determines the encoding attribute in the saved document. The value of the encoding attribute is taken from the `Encoding` property. If the `XmlDocument` does not have an XmlDeclaration, or if the XmlDeclaration does not have an encoding attribute, the saved document will not have one either.

When the document is saved, xmlns attributes are generated to persist the node identity (local name + namespace URI) correctly. For example, the following C# code

```csharp
XmlDocument doc = new XmlDocument();
doc.AppendChild(doc.CreateElement("item","urn:1"));
doc.Save(Console.Out);
```

generates this xmls attribute ``.

This method is a Microsoft extension to the Document Object Model (DOM).

Note that only the `XmlDocument.Save` method enforces a well-formed XML document. All other `Save` overloads only guarantee a well-formed fragment.

## XmlDocument.Save(TextWriter) method

```csharp
public virtual void Save (System.IO.TextWriter writer);
```

Saves the XML document to the specified `TextWriter`.

Parameters:

- `writer`: The `TextWriter` to which you want to save.

Exceptions:

- `XmlException`: The operation would not result in a well formed XML document (for example, no document element or duplicate XML declarations).

#### Remarks
The encoding on the `TextWriter` determines the encoding that is written out (The encoding of the XmlDeclaration node is replaced by the encoding of the `TextWriter`). If there was no encoding specified on the `TextWriter`, the `XmlDocument` is saved without an encoding attribute.

This method is a Microsoft extension to the Document Object Model (DOM).

Note that only the `XmlDocument.Save` method enforces a well-formed XML document. All other `Save` overloads only guarantee a well-formed fragment.

## XmlDocument.Save(String) method

```csharp
public virtual void Save (string filename);
```

Saves the XML document to the specified file. If the specified file exists, this method overwrites it.

Parameters:

- `filename`: The location of the file where you want to save the document.

Exceptions:

- `XmlException`: The operation would not result in a well formed XML document (for example, no document element or duplicate XML declarations).

#### Remarks
White space is preserved in the output file only if `PreserveWhitespace` is set to `true`.

The XmlDeclaration of the current `XmlDocument` object determines the encoding attribute in the saved document. The value of the encoding attribute is taken from the `Encoding` property. If the `XmlDocument` does not have an XmlDeclaration, or if the XmlDeclaration does not have an encoding attribute, the saved document will not have one either.

When the document is saved, xmlns attributes are generated to persist the node identity (local name + namespace URI) correctly. For example, the following C# code

```csharp
XmlDocument doc = new XmlDocument();
doc.AppendChild(doc.CreateElement("item","urn:1"));
doc.Save(Console.Out);
```

generates this xmls attribute ``.

This method is a Microsoft extension to the Document Object Model (DOM).

Note that only the `XmlDocument.Save` method enforces a well-formed XML document. All other `Save` overloads only guarantee a well-formed fragment.

#### Examples

The following example loads XML into an XmlDocument object, modifies it, and then saves it to a file named data.xml.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/Save/source.cs._
[!code-vbClassic WebData XmlDocument.Save Example#1]

The data.xml file will contain the following XML: `<name>wrench</name><price>10.95</price>`.

## XmlDocument.Save(XmlWriter) method

```csharp
public virtual void Save (System.Xml.XmlWriter w);
```

Saves the XML document to the specified `XmlWriter`.

Parameters:

- `w`: The `XmlWriter` to which you want to save.

Exceptions:

- `XmlException`: The operation would not result in a well formed XML document (for example, no document element or duplicate XML declarations).

#### Remarks
White space is preserved only if `PreserveWhitespace` is set to `true`.

The encoding on the `XmlWriter` determines the encoding that is written out (The encoding of the XmlDeclaration node is replaced by the encoding of the `XmlWriter`). If there was no encoding specified on the `XmlWriter`, the `XmlDocument` is saved without an encoding attribute.

When the document is saved, xmlns attributes are generated to persist the node identity (LocalName + NamespaceURI) correctly. For example, the following C# code

```csharp
XmlDocument doc = new XmlDocument();
doc.AppendChild(doc.CreateElement("item","urn:1"));
doc.Save(Console.Out);
```

generates this xmls attribute:

```xml

```

This method is a Microsoft extension to the Document Object Model (DOM).

Note that only the `XmlDocument.Save` method enforces a well-formed XML document. All other `Save` overloads only guarantee a well-formed fragment.

#### Examples

The following example loads XML into an `XmlDocument` object and saves it out to a file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlDocument/LoadXml/source.cs._
[!code-vbClassic WebData XmlDocument.LoadXml Example#1]
