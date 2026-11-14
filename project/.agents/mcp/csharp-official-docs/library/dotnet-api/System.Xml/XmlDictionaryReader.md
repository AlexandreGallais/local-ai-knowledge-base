---
title: "XmlDictionaryReader class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryReader class

Namespace: `System.Xml`

```csharp
public abstract class XmlDictionaryReader : System.Xml.XmlReader
```

An `abstract` class that the Windows Communication Foundation (WCF) derives from `XmlReader` to do serialization and deserialization.

#### Remarks
Methods in this class read `XmlDictionary` objects.

This class is derived from `XmlReader`.

Note that there is a known issue with the normalization of linefeed characters inside of CDATA sections that you may encounter.

## XmlDictionaryReader.XmlDictionaryReader() constructor

```csharp
protected XmlDictionaryReader ();
```

Creates an instance of this class.  Invoked only by its derived classes.

#### Remarks
The only constructor for this class is the parameterless constructor.

## XmlDictionaryReader.CanCanonicalize property

```csharp
public virtual bool CanCanonicalize { get; }
```

This property always returns `false`. Its derived classes can override to return `true` if they support canonicalization.

Returns: Returns `false`.

#### Remarks
This property always returns `false`.

## XmlDictionaryReader.Quotas property

```csharp
public virtual System.Xml.XmlDictionaryReaderQuotas Quotas { get; }
```

Gets the quota values that apply to the current instance of this class.

Returns: The `XmlDictionaryReaderQuotas` that applies to the current instance of this class.

To be added.

## XmlDictionaryReader.CreateBinaryReader(Byte[], XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (byte[] buffer, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `buffer`: The buffer from which to read.
- `quotas`: The quotas that apply to this operation.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Stream, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (System.IO.Stream stream, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `stream`: The stream from which to read.
- `quotas`: The quotas that apply to this operation.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Stream, IXmlDictionary, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `stream`: The stream from which to read.
- `dictionary`: `XmlDictionary` to use.
- `quotas`: The quotas that apply to this operation.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `stream` or `quotas` is `null`.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Byte[], Int32, Int32, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (byte[] buffer, int offset, int count, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `quotas`: The quotas that apply to this operation.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `count` is less than zero or greater than the buffer length minus the offset.

-or-

`offset` is less than zero or greater than the buffer length.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Stream, IXmlDictionary, XmlDictionaryReaderQuotas, XmlBinaryReaderSession) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.XmlBinaryReaderSession? session);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `stream`: The stream from which to read.
- `dictionary`: `XmlDictionary` to use.
- `quotas`: The quotas that apply to this operation.
- `session`: `XmlBinaryReaderSession` to use.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Byte[], Int32, Int32, IXmlDictionary, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (byte[] buffer, int offset, int count, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `dictionary`: `XmlDictionary` to use.
- `quotas`: The quotas that apply to this operation.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`offset` is less than zero or greater than the buffer length.
- `ArgumentOutOfRangeException`: `count` is less than zero or greater than the buffer length minus the offset.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Stream, IXmlDictionary, XmlDictionaryReaderQuotas, XmlBinaryReaderSession, OnXmlDictionaryReaderClose) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.XmlBinaryReaderSession? session, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `stream`: The stream from which to read.
- `dictionary`: `XmlDictionary` to use.
- `quotas`: `XmlDictionaryReaderQuotas` to apply.
- `session`: `XmlBinaryReaderSession` to use.
- `onClose`: Delegate to be called when the reader is closed.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Byte[], Int32, Int32, IXmlDictionary, XmlDictionaryReaderQuotas, XmlBinaryReaderSession) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (byte[] buffer, int offset, int count, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.XmlBinaryReaderSession? session);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `dictionary`: The `XmlDictionary` to use.
- `quotas`: The `XmlDictionaryReaderQuotas` to apply.
- `session`: The `XmlBinaryReaderSession` to use.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `count` is less than zero or greater than the buffer length minus the offset.

-or-

`offset` is less than zero or greater than the buffer length.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateBinaryReader(Byte[], Int32, Int32, IXmlDictionary, XmlDictionaryReaderQuotas, XmlBinaryReaderSession, OnXmlDictionaryReaderClose) method

```csharp
public static System.Xml.XmlDictionaryReader CreateBinaryReader (byte[] buffer, int offset, int count, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.XmlBinaryReaderSession? session, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Creates an instance of `XmlDictionaryReader` that can read .NET Binary XML Format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `dictionary`: The `XmlDictionary` to use.
- `quotas`: The `XmlDictionaryReaderQuotas` to apply.
- `session`: The `XmlBinaryReaderSession` to use.
- `onClose`: Delegate to be called when the reader is closed.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `count` is less than zero or greater than the buffer length minus the offset.

-or-

`offset` is less than zero or greater than the buffer length.

#### Remarks
Other `XmlDictionaryReader` properties are set to default values or `null`.

## XmlDictionaryReader.CreateDictionaryReader(XmlReader) method

```csharp
public static System.Xml.XmlDictionaryReader CreateDictionaryReader (System.Xml.XmlReader reader);
```

Creates an instance of `XmlDictionaryReader` from an existing `XmlReader`.

Parameters:

- `reader`: An instance of `XmlReader`.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

To be added.

## XmlDictionaryReader.CreateMtomReader(Stream, Encoding, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (System.IO.Stream stream, System.Text.Encoding encoding, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `stream`: The stream from which to read.
- `encoding`: The possible character encoding of the stream.
- `quotas`: The quotas to apply to this reader.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `encoding` is `null`.

#### Remarks
This method reads from a stream, using the character encoding specified by `encoding`, an instance of `Encoding`.

## XmlDictionaryReader.CreateMtomReader(Stream, Encoding[], XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (System.IO.Stream stream, System.Text.Encoding[] encodings, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `stream`: The stream from which to read.
- `encodings`: The possible character encodings of the stream.
- `quotas`: The quotas to apply to this reader.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `encodings` is `null`.

#### Remarks
This method reads from a stream, using one of the character encodings specified by `encodings`, an array of instances of `Encoding`.

## XmlDictionaryReader.CreateMtomReader(Stream, Encoding[], String, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (System.IO.Stream stream, System.Text.Encoding[] encodings, string? contentType, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `stream`: The stream from which to read.
- `encodings`: The possible character encodings of the stream.
- `contentType`: The Content-Type MIME type of the message.
- `quotas`: The quotas to apply to this reader.

Returns: An instance of `XmlDictionaryReader`.

#### Remarks
This method reads from a stream, using one of the character encodings specified by `encodings`, an array of instances of `Encoding`. The message is of the specified MIME type. If `contentType` is `null`, the Content-Type MIME header must be present in the message.

## XmlDictionaryReader.CreateMtomReader(Byte[], Int32, Int32, Encoding, XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (byte[] buffer, int offset, int count, System.Text.Encoding encoding, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `encoding`: The possible character encoding of the input.
- `quotas`: The quotas to apply to this reader.

Returns: An instance of `XmlDictionaryReader`.

Exceptions:

- `ArgumentNullException`: `encoding` is `null`.

#### Remarks
This method reads from a buffer with a specified offset and count, using the character encoding specified by `encoding`, an instance of `Encoding`.

## XmlDictionaryReader.CreateMtomReader(Byte[], Int32, Int32, Encoding[], XmlDictionaryReaderQuotas) method

```csharp
public static System.Xml.XmlDictionaryReader CreateMtomReader (byte[] buffer, int offset, int count, System.Text.Encoding[] encodings, System.Xml.XmlDictionaryReaderQuotas quotas);
```

Creates an instance of `XmlDictionaryReader` that reads XML in the MTOM format.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `encodings`: The possible character encodings of the input.
- `quotas`: The quotas to apply to this reader.

Returns: An instance of `XmlDictionaryReader`.

#### Remarks
This method reads from a buffer with a specified offset and count, using one of the character encodings specified by `encodings`, an array of instances of `Encoding`.
