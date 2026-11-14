---
title: "IXmlTextReaderInitializer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IXmlTextReaderInitializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlTextReaderInitializer interface

Namespace: `System.Xml`

```csharp
public interface IXmlTextReaderInitializer
```

Specifies implementation requirements for XML text readers that derive from this interface.

To be added.

## IXmlTextReaderInitializer.SetInput(Stream, Encoding, XmlDictionaryReaderQuotas, OnXmlDictionaryReaderClose) method

```csharp
public void SetInput (System.IO.Stream stream, System.Text.Encoding? encoding, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Specifies initialization requirements for XML text readers that read a stream.

Parameters:

- `stream`: The stream from which to read.
- `encoding`: The character encoding of the stream.
- `quotas`: The `XmlDictionaryReaderQuotas` to apply.
- `onClose`: The delegate to be called when the reader is closed.

To be added.

## IXmlTextReaderInitializer.SetInput(Byte[], Int32, Int32, Encoding, XmlDictionaryReaderQuotas, OnXmlDictionaryReaderClose) method

```csharp
public void SetInput (byte[] buffer, int offset, int count, System.Text.Encoding? encoding, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Specifies initialization requirements for XML text readers that read a buffer.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: The starting position from which to read in `buffer`.
- `count`: The number of bytes that can be read from `buffer`.
- `encoding`: The character encoding of the stream.
- `quotas`: The `XmlDictionaryReaderQuotas` to apply.
- `onClose`: The delegate to be called when the reader is closed.

To be added.
