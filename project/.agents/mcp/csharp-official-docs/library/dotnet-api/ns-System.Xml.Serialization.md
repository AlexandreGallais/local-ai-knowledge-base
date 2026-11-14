---
title: "System.Xml.Serialization namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Xml.Serialization.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Xml.Serialization namespace

Contains classes that are used to serialize objects into XML format documents or streams.

#### Remarks
The central class in the namespace is the `XmlSerializer` class. To use this class, use the `XmlSerializer.%23ctor` constructor to create an instance of the class using the type of the object to serialize. Once an `XmlSerializer` is created, create an instance of the object to serialize. You must also create an object to write the file to a document or stream, such as a `Stream`, `TextWriter`, or `XmlWriter`. You can then call the `XmlSerializer.Serialize` method to convert the object into an XML document.

To deserialize an object from an XML document, create a suitable object to read the document or stream (again, a `Stream`, `TextWriter`, or `XmlWriter`). Invoke the `XmlSerializer.Deserialize` method while casting the resulting object to the type of the original object (that was serialized).

To further control the serialization, the `Serialization` namespace contains several `Attribute` classes that can be applied to members of a class. For example, if a class contains a member that will be serialized as an XML element, you can apply the `XmlElementAttribute` attribute to the member. When applying the attribute, you can specify details such as the actual XML element name using the `ElementName` property. For a complete list of all the attributes, see the `XmlSerializer` class overview.
