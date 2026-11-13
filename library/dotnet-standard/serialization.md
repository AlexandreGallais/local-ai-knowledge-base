---
title: "Serialization - .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Serialization in .NET

Serialization is the process of converting the state of an object into a form that can be persisted or transported. The complement of serialization is deserialization, which converts a stream into an object. Together, these processes allow data to be stored and transferred.

.NET features the following serialization technologies:

- JSON serialization maps .NET objects to and from JavaScript Object Notation (JSON). JSON is an open standard that's commonly used to share data across the web. The JSON serializer serializes public properties by default, and can be configured to serialize private and internal members as well.

- XML and SOAP serialization serializes only `public` properties and fields and does not preserve type fidelity. This is useful when you want to provide or consume data without restricting the application that uses the data. Because XML is an open standard, it is an attractive choice for sharing data across the Web. SOAP is likewise an open standard, which makes it an attractive choice.

- Binary serialization preserves *type fidelity*, which means that the complete state of the object is recorded and when you deserialize, an exact copy is created. This type of serialization is useful for preserving the state of an object between different invocations of an application. For example, you can share an object between different applications by serializing it to the Clipboard. You can serialize an object to a stream, to a disk, to memory, over the network, and so forth. Remoting uses serialization to pass objects "by value" from one computer or application domain to another.

  > **Warning:**
> Binary serialization with `BinaryFormatter` can be dangerous. For more information, see the BinaryFormatter security guide and the BinaryFormatter migration guide.

## Reference

`System.Text.Json`\
Contains classes that can be used to serialize objects into JSON format documents or streams.

`System.Runtime.Serialization`\
Contains classes that can be used for serializing and deserializing objects.

`System.Xml.Serialization`\
Contains classes that can be used to serialize objects into XML format documents or streams.
