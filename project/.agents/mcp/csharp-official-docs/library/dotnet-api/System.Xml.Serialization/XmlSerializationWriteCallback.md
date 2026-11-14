---
title: "XmlSerializationWriteCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationWriteCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationWriteCallback delegate

Namespace: `System.Xml.Serialization`

```csharp
public delegate void XmlSerializationWriteCallback(object o);
```

Delegate that is used by the `XmlSerializer` class for serialization of types from SOAP-encoded, non-root XML data.

Parameters:

- `o`: The object being serialized.

#### Remarks
During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for serialization derived from the `XmlSerializationWriter` class. During this process, the .NET XML serialization infrastructure generates write methods that implement the `XmlSerializationWriteCallback` class delegate. It does so for certain mappings between .NET types and XML data types that are serialized through SOAP-encoded XML and are not root elements. Then, as necessary, a write method is called during serialization.

You should not directly instantiate `XmlSerializationWriteCallback`.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.
