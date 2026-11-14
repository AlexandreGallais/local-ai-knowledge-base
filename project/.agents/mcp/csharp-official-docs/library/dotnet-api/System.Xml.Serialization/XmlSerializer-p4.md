---
title: "XmlSerializer class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializer class (part 4 of 4)

## XmlSerializer.Serialize(TextWriter, Object, XmlSerializerNamespaces) method

```csharp
public void Serialize (System.IO.TextWriter textWriter, object? o, System.Xml.Serialization.XmlSerializerNamespaces? namespaces);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `TextWriter` and references the specified namespaces.

Parameters:

- `textWriter`: The `TextWriter` used to write the XML document.
- `o`: The `Object` to serialize.
- `namespaces`: The `XmlSerializerNamespaces` that contains namespaces for the generated XML document.

Exceptions:

- `InvalidOperationException`: An error occurred during serialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
When the `XmlSerializer.Serialize` method is invoked the public fields and read/write properties of an object are converted into XML. Methods, indexers, private fields, and read-only properties are not serialized.

Use the `textWriter` parameter to specify an object that derives from the abstract `TextWriter` class. Classes that derive from `TextWriter` class include:

-   `StreamWriter`
-   `StringWriter`
-   `IndentedTextWriter`

> **Note:**
> The `XmlSerializer` cannot serialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example serializes an object with a `TextWriter`. The example also creates an `XmlSerializerNamespaces` object and adds two namespaces to the object. The class that defines the serialized object is also attributed with `XmlElementAttribute` attributes to specify the namespace for each element.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Serialize/source1.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlSerializer.Serialize1 Example/Common/simple.xml._
## XmlSerializer.Serialize(XmlWriter, Object, XmlSerializerNamespaces) method

```csharp
public void Serialize (System.Xml.XmlWriter xmlWriter, object? o, System.Xml.Serialization.XmlSerializerNamespaces? namespaces);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `XmlWriter` and references the specified namespaces.

Parameters:

- `xmlWriter`: The `XmlWriter` used to write the XML document.
- `o`: The `Object` to serialize.
- `namespaces`: The `XmlSerializerNamespaces` referenced by the object.

Exceptions:

- `InvalidOperationException`: An error occurred during serialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
When the `XmlSerializer.Serialize` method is invoked, the public fields and read/write properties of an object are converted into XML. Methods, indexers, private fields, and read-only properties are not serialized.

Use the `xmlWriter` parameter to specify an object that derives from the abstract `XmlWriter` class, which is designed to write XML documents. The `XmlTextWriter` derives from the `XmlWriter`.

> **Note:**
> The `XmlSerializer` cannot serialize the following: arrays of `ArrayList` and arrays of `List<T>`.

#### Examples
The following example serializes an object with an `XmlWriter`. The example also creates an `XmlSerializerNamespaces` and adds two namespaces to the object. Several instances of the `XmlElementAttribute` class are applied to the class members to specify the namespace for each element.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializer/Serialize/source5.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlSerializer.Serialize5 Example/Common/simple.xml._
## XmlSerializer.Serialize(XmlWriter, Object, XmlSerializerNamespaces, String) method

```csharp
public void Serialize (System.Xml.XmlWriter xmlWriter, object? o, System.Xml.Serialization.XmlSerializerNamespaces? namespaces, string? encodingStyle);
```

Serializes the specified object and writes the XML document to a file using the specified `XmlWriter` and references the specified namespaces and encoding style.

Parameters:

- `xmlWriter`: The `XmlWriter` used to write the XML document.
- `o`: The object to serialize.
- `namespaces`: The `XmlSerializerNamespaces` referenced by the object.
- `encodingStyle`: The encoding style of the serialized XML.

Exceptions:

- `InvalidOperationException`: An error occurred during serialization. The original exception is available using the `Exception.InnerException` property.

#### Remarks
When the `XmlSerializer.Serialize` method is invoked, the public fields and read/write properties of an object are converted into XML. Methods, indexers, private fields, and read-only properties are not serialized.

Use the `xmlWriter` parameter to specify an object that derives from the abstract `XmlWriter` class, which is designed to write XML documents. The `XmlTextWriter` derives from the `XmlWriter`.

Set the `encodingStyle` parameter to "http://schemas.xmlsoap.org/soap/encoding/" for SOAP version 1.1 encoding; otherwise, set it to "http://www.w3.org/2001/12/soap-encoding" for SOAP version 1.2 encoding.

> **Note:**
> The `XmlSerializer` cannot serialize the following: arrays of `ArrayList` and arrays of `List<T>`.

## XmlSerializer.Serialize(XmlWriter, Object, XmlSerializerNamespaces, String, String) method

```csharp
public void Serialize (System.Xml.XmlWriter xmlWriter, object? o, System.Xml.Serialization.XmlSerializerNamespaces? namespaces, string? encodingStyle, string? id);
```

Serializes the specified `Object` and writes the XML document to a file using the specified `XmlWriter`, XML namespaces, and encoding.

Parameters:

- `xmlWriter`: The `XmlWriter` used to write the XML document.
- `o`: The object to serialize.
- `namespaces`: An instance of the `XmlSerializerNamespaces` that contains namespaces and prefixes to use.
- `encodingStyle`: The encoding used in the document.
- `id`: For SOAP encoded messages, the base used to generate id attributes.

#### Remarks
The *id* parameter supplies the base string used to create SOAP ids. By default, these are "id1", "id2" and so on. But if the parameter is set to "myBase" the generated values are "myBaseid1", "myBaseid2" and so on. This functionality is used to create unique id values across the whole SOAP message.

## XmlSerializer.UnknownAttribute event

```csharp
public event System.Xml.Serialization.XmlAttributeEventHandler UnknownAttribute;
```

Occurs when the `XmlSerializer` encounters an XML attribute of unknown type during deserialization.

#### Remarks
By default, after calling the `XmlSerializer.Deserialize` method, the `XmlSerializer` ignores XML attributes of unknown types. However, you can use this event to handle such node types.

If the instance of the class being deserialized contains a field that returns an array of `XmlAttribute` objects and an `XmlAnyAttributeAttribute` has been applied to the field, the `UnknownAttribute` event does not occur. Instead, all unknown XML attributes are collected into the array.

#### Examples
The following example prints information about any unknown attributes encountered while deserializing an XML document.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeEventArgs/Overview/source.cs._

## XmlSerializer.UnknownElement event

```csharp
public event System.Xml.Serialization.XmlElementEventHandler UnknownElement;
```

Occurs when the `XmlSerializer` encounters an XML element of unknown type during deserialization.

#### Remarks
By default, after calling the `XmlSerializer.Deserialize` method, the `XmlSerializer` ignores XML attributes of unknown types. However, you can use this event to handle such node types.

> **Note:**
> If the `XmlAnyElementAttribute` is applied to a field that returns an array of `XmlElement` objects, all unknown elements are collected in the array. In that case, the `UnknownElement` event does not occur.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownElements.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownElement` event occurs. To try the example, paste the following XML code into a file named UnknownElements.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <GroupName>MyGroup</GroupName>
  <GroupSize>Large</GroupSize>
  <GroupNumber>444</GroupNumber>
  <GroupBase>West</GroupBase>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementEventArgs/Overview/unknownelement.cs._

## XmlSerializer.UnknownNode event

```csharp
public event System.Xml.Serialization.XmlNodeEventHandler UnknownNode;
```

Occurs when the `XmlSerializer` encounters an XML node of unknown type during deserialization.

#### Remarks
By default, after calling the `XmlSerializer.Deserialize` method, the `XmlSerializer` ignores XML nodes of unknown types. However, you can use this event to handle such node types.

#### Examples
The following example prints the type of any encountered unknown node.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/Overview/source.cs._

## XmlSerializer.UnreferencedObject event

```csharp
public event System.Xml.Serialization.UnreferencedObjectEventHandler UnreferencedObject;
```

Occurs during deserialization of a SOAP-encoded XML stream, when the `XmlSerializer` encounters a recognized type that is not used or is unreferenced.

#### Remarks
The `UnreferencedObject` event only occurs when the `XmlSerializer` is used to deserialize an XML document that contains a SOAP message that conforms to section 5 of the World Wide Web Consortium document, Simple Object Access Protocol (SOAP) 1.1.

Documents that conform to section 5 are in a special format. At the very least, such a document includes the main body of the SOAP message. However, rather than having all types defined inline in the document, some type definitions can be encoded as references to top-level elements in the document. Thus, for every element found in the main body that is a reference, there must be a corresponding element that contains the type definition. To correlate the referencing element and the type definition, the type definition has an `id` attribute set to a unique string ID and the referencing element has an `href` attribute that references the same ID.

```xml
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="id1" n1:GroupName=".NET" GroupNumber="ZDI=" CreationDate="2002-05-02" xmlns:n1="http:'www.cpandl.com">
    <PosInt xsi:type="xsd:nonNegativeInteger">10000</PosInt>
    
  </Group>
  <Vehicle id="id2" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">1234</licenseNumber>
  </Vehicle>
```

The `UnreferencedObject` event occur when there is a type definition found in the document, but no parameter in the main body references it. When the event occurs, you can retrieve the XML type of the unreferenced object by examining the `UnreferencedObject` property of the `UnreferencedObjectEventArgs` class. The XML ID of the object is returned by the `UnreferencedId` property.

The `UnreferencedObject` event should not be confused with the `UnknownElement` and `UnknownNode` events, which occur when there is no class member that corresponds to the XML node or element type.

#### Examples
The following example adds an `UnreferencedObjectEventHandler` to an `XmlSerializer`. The event is handled by the `Serializer``_``UnreferencedObject` method. To run the example, cut and paste the following XML into a file named "UnrefObj.xml".

```xml
<wrapper>
  <Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="id1" n1:GroupName=".NET" xmlns:n1="http://www.cpandl.com">
   </Group>
<Vehicle id="id2" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">ABCD</licenseNumber>
  </Vehicle>
<Vehicle id="id3" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">1234</licenseNumber>
  </Vehicle>
</wrapper>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/UnreferencedObjectEventArgs/Overview/unrefobj.cs._
