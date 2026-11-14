---
title: "IXmlBinaryReaderInitializer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IXmlBinaryReaderInitializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlBinaryReaderInitializer interface

Namespace: `System.Xml`

```csharp
public interface IXmlBinaryReaderInitializer
```

Provides methods for reinitializing a binary reader to read a new document.

To be added.

## IXmlBinaryReaderInitializer.SetInput(Stream, IXmlDictionary, XmlDictionaryReaderQuotas, XmlBinaryReaderSession, OnXmlDictionaryReaderClose) method

```csharp
public void SetInput (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.XmlBinaryReaderSession? session, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Reinitializes the binary reader using the given input stream.

Parameters:

- `stream`: The stream from which to read.
- `dictionary`: `XmlDictionary` to use.
- `quotas`: `XmlDictionaryReaderQuotas` to apply.
- `session`: `XmlBinaryReaderSession` to use.
- `onClose`: Delegate to call when the reader is closed.

To be added.

## IXmlBinaryReaderInitializer.SetInput(Byte[], Int32, Int32, IXmlDictionary, XmlDictionaryReaderQuotas, XmlBinaryReaderSession, OnXmlDictionaryReaderClose) method

```csharp
public void SetInput (byte[] buffer, int offset, int count, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlDictionaryReaderQuotas quotas, System.Xml.XmlBinaryReaderSession? session, System.Xml.OnXmlDictionaryReaderClose? onClose);
```

Reinitializes the binary reader using the given input buffer.

Parameters:

- `buffer`: The buffer from which to read.
- `offset`: Starting position from which to read in `buffer`.
- `count`: Number of bytes that can be read from `buffer`.
- `dictionary`: `XmlDictionary` to use.
- `quotas`: `XmlDictionaryReaderQuotas` to apply.
- `session`: `XmlBinaryReaderSession` to use.
- `onClose`: Delegate to call when the reader is closed.

To be added.
