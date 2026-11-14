---
title: "IXmlBinaryWriterInitializer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IXmlBinaryWriterInitializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlBinaryWriterInitializer interface

Namespace: `System.Xml`

```csharp
public interface IXmlBinaryWriterInitializer
```

Specifies implementation requirements for XML binary writers that derive from this interface.

To be added.

## IXmlBinaryWriterInitializer.SetOutput(Stream, IXmlDictionary, XmlBinaryWriterSession, Boolean) method

```csharp
public void SetOutput (System.IO.Stream stream, System.Xml.IXmlDictionary? dictionary, System.Xml.XmlBinaryWriterSession? session, bool ownsStream);
```

Specifies initialization requirements for XML binary writers that implement this method.

Parameters:

- `stream`: The stream to write to.
- `dictionary`: The `XmlDictionary` to use.
- `session`: The `XmlBinaryWriterSession` to use.
- `ownsStream`: `true` to indicate the stream is closed by the writer when done; otherwise, `false`.

To be added.
