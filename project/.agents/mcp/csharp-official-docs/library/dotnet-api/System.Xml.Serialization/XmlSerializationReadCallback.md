---
title: "XmlSerializationReadCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationReadCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationReadCallback delegate

Namespace: `System.Xml.Serialization`

```csharp
public delegate object? XmlSerializationReadCallback();
```

Delegate used by the `XmlSerializer` class for deserialization of types from SOAP-encoded, non-root XML data.

Returns: The object returned by the callback.

#### Remarks
During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization derived from the `XmlSerializationReader` class. During this process, the .NET XML serialization infrastructure generates read methods that implement the `XmlSerializationReadCallback` delegate. It does so for certain mappings between .NET types and XML data types that are serialized through SOAP-encoded XML and are not root elements. Then, as necessary, a read method is called during deserialization.

Do not directly create instances of the `XmlSerializationReadCallback` class.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.
