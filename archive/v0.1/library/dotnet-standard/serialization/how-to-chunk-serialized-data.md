---
title: "How to: chunk serialized data (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/how-to-chunk-serialized-data.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: chunk serialized data

> **Warning:**
> Binary serialization with `BinaryFormatter` can be dangerous. For more information, see the BinaryFormatter security guide and the BinaryFormatter migration guide.

Two issues that occur when sending large data sets in Web service messages are:

1. A large working set (memory) due to buffering by the serialization engine.

2. Inordinate bandwidth consumption due to 33 percent inflation after Base64 encoding.

 To solve these problems, implement the `System.Xml.Serialization.IXmlSerializable` interface to control the serialization and deserialization. Specifically, implement the `System.Xml.Serialization.IXmlSerializable.WriteXml*` and `System.Xml.Serialization.IXmlSerializable.ReadXml*` methods to chunk the data.

### To implement server-side chunking

1. On the server machine, the Web method must turn off ASP.NET buffering and return a type that implements `System.Xml.Serialization.IXmlSerializable`.

2. The type that implements `System.Xml.Serialization.IXmlSerializable` chunks the data in the `System.Xml.Serialization.IXmlSerializable.WriteXml*` method.

### To implement client-side processing

1. Alter the Web method on the client proxy to return the type that implements `System.Xml.Serialization.IXmlSerializable`. You can use a `System.Xml.Serialization.Advanced.SchemaImporterExtension` to do this automatically, but this isn't shown here.

2. Implement the `System.Xml.Serialization.IXmlSerializable.ReadXml*` method to read the chunked data stream and write the bytes to disk. This implementation also raises progress events that can be used by a graphic control, such as a progress bar.
