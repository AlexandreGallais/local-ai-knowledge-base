---
title: "XmlSerializationCollectionFixupCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationCollectionFixupCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationCollectionFixupCallback delegate

Namespace: `System.Xml.Serialization`

```csharp
public delegate void XmlSerializationCollectionFixupCallback(object? collection, object? collectionItems);
```

Delegate used by the `XmlSerializer` class for deserialization of SOAP-encoded XML data types that map to collections or enumerations.

Parameters:

- `collection`: The collection into which the collection items array is copied.
- `collectionItems`: An array of items to be copied into the `object collection`.

#### Remarks
During initialization, .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization derived from the `XmlSerializationReader` class. During this process, .NET generates collection fix-up methods that use the `XmlSerializationCollectionFixupCallback` delegate. This occurs for SOAP-encoded arrays or SOAP-encoded, multi-reference elements whose data types, in either case, map to .NET collections or enumerations. As necessary, the collection fix-up method is called during deserialization.

You should not directly instantiate `XmlSerializationCollectionFixupCallback`.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.
