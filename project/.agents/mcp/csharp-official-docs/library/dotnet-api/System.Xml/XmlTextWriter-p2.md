---
title: "XmlTextWriter class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlTextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTextWriter class (part 2 of 4)

## XmlTextWriter.XmlLang property

```csharp
public override string? XmlLang { get; }
```

Gets the current `xml:lang` scope.

Returns: The current `xml:lang` or `null` if there is no `xml:lang` in the current scope.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This property allows one component to find out what state another component has left the writer in. For example, perhaps one component wants to tell another which language help text to generate. The language information is communicated by writing an `xml:lang` attribute.

## XmlTextWriter.XmlSpace property

```csharp
public override System.Xml.XmlSpace XmlSpace { get; }
```

Gets an `XmlSpace` representing the current `xml:space` scope.

Returns: An `XmlSpace` representing the current `xml:space` scope.

-  None

:  This is the default if no `xml:space` scope exists.

-  Default

:  The current scope is `xml:space`="default".

-  Preserve

:  The current scope is `xml:space`="preserve".

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This property allows one component to find out in what state another component has left the writer.

#### Examples
The following example uses the `WriteWhitespace` method to control how the file is formatted.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteWhitespace/source.cs._

## XmlTextWriter.Close() method

```csharp
public override void Close ();
```

Closes this stream and the underlying stream.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

Any elements or attributes left open are automatically closed.

This method does not throw any exceptions.

#### Examples
The following example writes an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/Close/source.cs._

## XmlTextWriter.Flush() method

```csharp
public override void Flush ();
```

Flushes whatever is in the buffer to the underlying streams and also flushes the underlying stream.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This is called instead of `XmlTextWriter.Close` when you want to write more to the underlying stream without losing what is still in the buffer.

#### Examples
The following example writes out two XML fragments.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/Flush/write2docs.cs._

## XmlTextWriter.LookupPrefix(String) method

```csharp
public override string? LookupPrefix (string ns);
```

Returns the closest prefix defined in the current namespace scope for the namespace URI.

Parameters:

- `ns`: Namespace URI whose prefix you want to find.

Returns: The matching prefix. Or `null` if no matching namespace URI is found in the current scope.

Exceptions:

- `ArgumentException`: `ns` is either `null` or `String.Empty`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

#### Examples
The following example writes out a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/LookupPrefix/source.cs._

## XmlTextWriter.WriteBase64(Byte[], Int32, Int32) method

```csharp
public override void WriteBase64 (byte[] buffer, int index, int count);
```

Encodes the specified binary bytes as base64 and writes out the resulting text.

Parameters:

- `buffer`: Byte array to encode.
- `index`: The position within the buffer indicating the start of the bytes to write.
- `count`: The number of bytes to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.
- `InvalidOperationException`: The `XmlTextWriter.WriteState` is `Closed`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

#### Examples
The following example encodes an input file using `WriteBase64` and generates a temporary XML file. The temporary XML file is decoded using the `XmlTextReader.ReadBase64` method and compared to the original file.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteBase64/writebase64.cs._

## XmlTextWriter.WriteBinHex(Byte[], Int32, Int32) method

```csharp
public override void WriteBinHex (byte[] buffer, int index, int count);
```

Encodes the specified binary bytes as binhex and writes out the resulting text.

Parameters:

- `buffer`: Byte array to encode.
- `index`: The position in the buffer indicating the start of the bytes to write.
- `count`: The number of bytes to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.
- `InvalidOperationException`: The `XmlTextWriter.WriteState` is Closed.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

## XmlTextWriter.WriteCData(String) method

```csharp
public override void WriteCData (string? text);
```

Writes out a <![CDATA[...]]> block containing the specified text.

Parameters:

- `text`: Text to place inside the CDATA block.

Exceptions:

- `ArgumentException`: The text would result in a non-well formed XML document.
- `InvalidOperationException`: The `XmlTextWriter.WriteState` is `Closed`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If `text` is either `null` or `String.Empty`, this method writes an empty CDATA block, for example \]<![CDATA[]>.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCData/source.cs._

## XmlTextWriter.WriteCharEntity(Char) method

```csharp
public override void WriteCharEntity (char ch);
```

Forces the generation of a character entity for the specified Unicode character value.

Parameters:

- `ch`: Unicode character for which to generate a character entity.

Exceptions:

- `ArgumentException`: The character is in the surrogate pair character range, `0xd800` - `0xdfff`; or the text would result in a non-well formed XML document.
- `InvalidOperationException`: The `XmlTextWriter.WriteState` is `Closed`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method writes the Unicode character in hexadecimal character entity reference format.

#### Examples
The following example uses the `WriteCharEntity` method to write an email address.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCharEntity/source.cs._

## XmlTextWriter.WriteChars(Char[], Int32, Int32) method

```csharp
public override void WriteChars (char[] buffer, int index, int count);
```

Writes text one buffer at a time.

Parameters:

- `buffer`: Character array containing the text to write.
- `index`: The position in the buffer indicating the start of the text to write.
- `count`: The number of characters to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

The buffer length minus `index` is less than `count`; the call results in surrogate pair characters being split or an invalid surrogate pair being written.
- `InvalidOperationException`: The `XmlTextWriter.WriteState` is Closed.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method can be used to write large amounts of text one buffer at a time.

Special handling must be done to ensure the `WriteChars` method does not split surrogate pair characters across multiple buffer writes. The XML specification defines the valid ranges for surrogate pairs.

An exception is thrown if surrogate pair characters are written that would result in the surrogate pair characters being split in the buffer.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteChars/xmlwriterwritecharsexample.cs._
## XmlTextWriter.WriteComment(String) method

```csharp
public override void WriteComment (string? text);
```

Writes out a comment  containing the specified text.

Parameters:

- `text`: Text to place inside the comment.

Exceptions:

- `ArgumentException`: The text would result in a non-well formed XML document.
- `InvalidOperationException`: The `XmlTextWriter.WriteState` is `Closed`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If `text` is either `null` or `String.Empty`, this method writes a `Comment` with no data content, for example \.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCData/source.cs._

## XmlTextWriter.WriteDocType(String, String, String, String) method

```csharp
public override void WriteDocType (string name, string? pubid, string? sysid, string? subset);
```

Writes the DOCTYPE declaration with the specified name and optional attributes.

Parameters:

- `name`: The name of the DOCTYPE. This must be non-empty.
- `pubid`: If non-null it also writes PUBLIC "pubid" "sysid" where `pubid` and `sysid` are replaced with the value of the given arguments.
- `sysid`: If `pubid` is null and `sysid` is non-null it writes SYSTEM "sysid" where `sysid` is replaced with the value of this argument.
- `subset`: If non-null it writes [subset] where subset is replaced with the value of this argument.

Exceptions:

- `InvalidOperationException`: This method was called outside the prolog (after the root element).
- `ArgumentException`: `name` is `null` or `String.Empty`

-or-

the value for `name` would result in invalid XML.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

This method does not check for invalid characters in `pubid`, `sysid` or `subset`. It also does not check that the internal subset is well-formed.

> **Important:**
> The `XmlTextWriter` does not validate any data that is passed to the `XmlTextWriter.WriteDocType` method. You should not pass <example-value> data to this method.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCData/source.cs._

## XmlTextWriter.WriteEndAttribute() method

```csharp
public override void WriteEndAttribute ();
```

Closes the previous `XmlTextWriter.WriteStartAttribute` call.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If you call `WriteStartAttribute`, you can close the attribute with this method.

You can also close the attribute by calling `WriteStartAttribute` again, calling `XmlWriter.WriteAttributeString`, or calling `XmlTextWriter.WriteEndElement`.

#### Examples
The following example writes out a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/LookupPrefix/source.cs._

## XmlTextWriter.WriteEndDocument() method

```csharp
public override void WriteEndDocument ();
```

Closes any open elements or attributes and puts the writer back in the Start state.

Exceptions:

- `ArgumentException`: The XML document is invalid.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCData/source.cs._

## XmlTextWriter.WriteEndElement() method

```csharp
public override void WriteEndElement ();
```

Closes one element and pops the corresponding namespace scope.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

If the element contains no content a short end tag "/>" is written; otherwise a full end tag is written.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteEndElement/source.cs._

## XmlTextWriter.WriteEntityRef(String) method

```csharp
public override void WriteEntityRef (string name);
```

Writes out an entity reference as `&name;`.

Parameters:

- `name`: Name of the entity reference.

Exceptions:

- `ArgumentException`: The text would result in a non-well formed XML document or `name` is either `null` or `String.Empty`.

#### Remarks

> **Note:**
>We recommend that you create `XmlWriter` instances by using the `XmlWriter.Create` method and the `XmlWriterSettings` class to take advantage of new functionality.

#### Examples
The following example writes an XML file representing a book.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlTextWriter/WriteCData/source.cs._
