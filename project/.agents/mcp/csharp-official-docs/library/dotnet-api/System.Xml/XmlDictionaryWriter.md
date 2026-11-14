---
title: "XmlDictionaryWriter class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryWriter class

Namespace: `System.Xml`

```csharp
public abstract class XmlDictionaryWriter : System.Xml.XmlWriter
```

Represents an abstract class that Windows Communication Foundation (WCF) derives from `XmlWriter` to do serialization and deserialization.

#### Remarks
You can derive from this class to do other functions than serialization.

Note that there is a known issue with the normalization of linefeed characters inside of CDATA sections that you may encounter.

## XmlDictionaryWriter.XmlDictionaryWriter() constructor

```csharp
protected XmlDictionaryWriter ();
```

Initializes a new instance of the `XmlDictionaryWriter` class.

#### Remarks
Invoked only by its derived classes because this class is abstract.

## XmlDictionaryWriter.CanCanonicalize property

```csharp
public virtual bool CanCanonicalize { get; }
```

This property always returns `false`. Its derived classes can override to return `true` if they support canonicalization.

Returns: `false` in all cases.

#### Remarks
Returns `true` if and only if this derived class of `XmlDictionaryWriter` can canonicalize the XML content being written to it, according to the Exclusive XML Canonicalization rules as defined in Exclusive XML Canonicalization Version 1.0.

## XmlDictionaryWriter.Close() method

```csharp
public override void Close ();
```

To be added.

To be added.

## XmlDictionaryWriter.CreateBinaryWriter(Stream) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateBinaryWriter (System.IO.Stream stream);
```

Creates an instance of `XmlDictionaryWriter` that writes WCF binary XML format.

Parameters:

- `stream`: The stream to write to.

Returns: An instance of `XmlDictionaryWriter`.

To be added.

## XmlDictionaryWriter.CreateBinaryWriter(Stream, IXmlDictionary) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateBinaryWriter (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary);
```

Creates an instance of `XmlDictionaryWriter` that writes WCF binary XML format.

Parameters:

- `stream`: The stream to write to.
- `dictionary`: The `XmlDictionary` to use as the shared dictionary.

Returns: An instance of `XmlDictionaryWriter`.

To be added.

## XmlDictionaryWriter.CreateBinaryWriter(Stream, IXmlDictionary, XmlBinaryWriterSession) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateBinaryWriter (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlBinaryWriterSession? session);
```

Creates an instance of `XmlDictionaryWriter` that writes WCF binary XML format.

Parameters:

- `stream`: The stream to write to.
- `dictionary`: The `XmlDictionary` to use as the shared dictionary.
- `session`: The `XmlBinaryWriterSession` to use.

Returns: An instance of `XmlDictionaryWriter`.

To be added.

## XmlDictionaryWriter.CreateBinaryWriter(Stream, IXmlDictionary, XmlBinaryWriterSession, Boolean) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateBinaryWriter (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlBinaryWriterSession? session, bool ownsStream);
```

Creates an instance of `XmlDictionaryWriter` that writes WCF binary XML format.

Parameters:

- `stream`: The stream from which to read.
- `dictionary`: The `XmlDictionary` to use as the shared dictionary.
- `session`: The `XmlBinaryWriterSession` to use.
- `ownsStream`: `true` to indicate that the stream is closed by the writer when done; otherwise `false`.

Returns: An instance of `XmlDictionaryWriter`.

To be added.

## XmlDictionaryWriter.CreateDictionaryWriter(XmlWriter) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateDictionaryWriter (System.Xml.XmlWriter writer);
```

Creates an instance of `XmlDictionaryWriter` from an existing `XmlWriter`.

Parameters:

- `writer`: An instance of `XmlWriter`.

Returns: An instance of `XmlDictionaryWriter`.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

To be added.

## XmlDictionaryWriter.CreateMtomWriter(Stream, Encoding, Int32, String) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateMtomWriter (System.IO.Stream stream, System.Text.Encoding encoding, int maxSizeInBytes, string startInfo);
```

Creates an instance of `XmlDictionaryWriter` that writes XML in the MTOM format.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding of the stream.
- `maxSizeInBytes`: The maximum number of bytes that are buffered in the writer.
- `startInfo`: An attribute in the ContentType SOAP header.

Returns: An instance of `XmlDictionaryWriter`.

To be added.

## XmlDictionaryWriter.CreateMtomWriter(Stream, Encoding, Int32, String, String, String, Boolean, Boolean) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateMtomWriter (System.IO.Stream stream, System.Text.Encoding encoding, int maxSizeInBytes, string startInfo, string? boundary, string? startUri, bool writeMessageHeaders, bool ownsStream);
```

Creates an instance of `XmlDictionaryWriter` that writes XML in the MTOM format.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding of the stream.
- `maxSizeInBytes`: The maximum number of bytes that are buffered in the writer.
- `startInfo`: The content-type of the MIME part that contains the Infoset.
- `boundary`: The MIME boundary in the message.
- `startUri`: The content-id URI of the MIME part that contains the Infoset.
- `writeMessageHeaders`: `true` to write message headers.
- `ownsStream`: `true` to indicate that the stream is closed by the writer when done; otherwise `false`.

Returns: An instance of `XmlDictionaryWriter`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## XmlDictionaryWriter.CreateTextWriter(Stream) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateTextWriter (System.IO.Stream stream);
```

Creates an instance of `XmlDictionaryWriter` that writes text XML.

Parameters:

- `stream`: The stream to write to.

Returns: An instance of `XmlDictionaryWriter`.

#### Remarks
The text writer writes the XML in UTF-8 format.

## XmlDictionaryWriter.CreateTextWriter(Stream, Encoding) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateTextWriter (System.IO.Stream stream, System.Text.Encoding encoding);
```

Creates an instance of `XmlDictionaryWriter` that writes text XML.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding of the output.

Returns: An instance of `XmlDictionaryWriter`.

#### Remarks
An instance of `XmlDictionaryWriter`.

## XmlDictionaryWriter.CreateTextWriter(Stream, Encoding, Boolean) method

```csharp
public static System.Xml.XmlDictionaryWriter CreateTextWriter (System.IO.Stream stream, System.Text.Encoding encoding, bool ownsStream);
```

Creates an instance of `XmlDictionaryWriter` that writes text XML.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding of the stream.
- `ownsStream`: `true` to indicate that the stream is closed by the writer when done; otherwise `false`.

Returns: An instance of `XmlDictionaryWriter`.

To be added.

## XmlDictionaryWriter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## XmlDictionaryWriter.EndCanonicalization() method

```csharp
public virtual void EndCanonicalization ();
```

When implemented by a derived class, it stops the canonicalization started by the matching `XmlDictionaryWriter.StartCanonicalization` call.

Exceptions:

- `NotSupportedException`: Method is not implemented yet.

#### Remarks
This method is not yet implemented.

## XmlDictionaryWriter.StartCanonicalization(Stream, Boolean, String[]) method

```csharp
public virtual void StartCanonicalization (System.IO.Stream stream, bool includeComments, string[]? inclusivePrefixes);
```

When implemented by a derived class, it starts the canonicalization.

Parameters:

- `stream`: The stream to write to.
- `includeComments`: `true` to include comments; otherwise, `false`.
- `inclusivePrefixes`: The prefixes to be included.

Exceptions:

- `NotSupportedException`: Method is not implemented yet.

#### Remarks
This method is not yet implemented.

## XmlDictionaryWriter.WriteArray(String, String, String, Boolean[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, bool[] array, int offset, int count);
```

Writes nodes from a `Boolean` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the data.
- `offset`: The starting index in the array.
- `count`: The number of values to write from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, DateTime[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, DateTime[] array, int offset, int count);
```

Writes nodes from a `DateTime` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, Decimal[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, decimal[] array, int offset, int count);
```

Writes nodes from a `Decimal` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, Double[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, double[] array, int offset, int count);
```

Writes nodes from a `Double` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, Guid[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, Guid[] array, int offset, int count);
```

Writes nodes from a `Guid` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, Int16[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, short[] array, int offset, int count);
```

Writes nodes from a `Int16` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, Int32[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, int[] array, int offset, int count);
```

Writes nodes from a `Int32` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryWriter.WriteArray(String, String, String, Int64[], Int32, Int32) method

```csharp
public virtual void WriteArray (string? prefix, string localName, string? namespaceUri, long[] array, int offset, int count);
```

Writes nodes from a `Int64` array.

Parameters:

- `prefix`: The namespace prefix.
- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array that contains the nodes.
- `offset`: The starting index in the array.
- `count`: The number of nodes to get from the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.
