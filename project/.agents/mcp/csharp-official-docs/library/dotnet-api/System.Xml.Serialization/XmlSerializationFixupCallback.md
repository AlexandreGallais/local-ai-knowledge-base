---
title: "XmlSerializationFixupCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationFixupCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationFixupCallback delegate

Namespace: `System.Xml.Serialization`

```csharp
public delegate void XmlSerializationFixupCallback(object fixup);
```

Delegate used by the `XmlSerializer` class for deserialization of SOAP-encoded XML data.

Parameters:

- `fixup`: An instance of the `Fixup` class that contains the object to be fixed and the array of string identifiers for the items to fill in.

#### Remarks
While deserializing XML documents into .NET objects, the .NET XML serialization infrastructure dynamically instantiates fix-up methods that implement the `XmlSerializationFixupCallback` delegate. The infrastructure does so for SOAP-encoded arrays whose data types map to .NET reference types. Then, as necessary, a fix-up method is called to fill in the objects in the array.

In addition, during initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization derived from the `XmlSerializationReader` class. During this process, the infrastructure generates `XmlSerializationFixupCallback` methods for SOAP-encoded, multi-referenced XML data. The methods are then invoked during deserialization.

Do not directly create an instance of the `XmlSerializationFixupCallback` class.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.
