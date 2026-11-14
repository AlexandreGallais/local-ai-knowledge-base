---
title: "IXmlTextWriterInitializer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IXmlTextWriterInitializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlTextWriterInitializer interface

Namespace: `System.Xml`

```csharp
public interface IXmlTextWriterInitializer
```

Specifies implementation requirements for XML text writers that derive from this interface.

To be added.

## IXmlTextWriterInitializer.SetOutput(Stream, Encoding, Boolean) method

```csharp
public void SetOutput (System.IO.Stream stream, System.Text.Encoding encoding, bool ownsStream);
```

Specifies initialization requirements for XML text writers that implement this method.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding of the stream.
- `ownsStream`: `true` to indicate the stream is closed by the writer when done; otherwise, `false`.

To be added.
