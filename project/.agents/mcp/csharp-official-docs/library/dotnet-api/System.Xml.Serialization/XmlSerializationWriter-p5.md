---
title: "XmlSerializationWriter class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationWriter class (part 5 of 5)

## XmlSerializationWriter.WriteReferencingElement(String, String, Object, Boolean) method

```csharp
protected void WriteReferencingElement (string n, string? ns, object? o, bool isNullable);
```

Writes a SOAP message XML element that contains a reference to a `multiRef` element for a given object.

Parameters:

- `n`: The local name of the referencing element being written.
- `ns`: The namespace of the referencing element being written.
- `o`: The object being serialized.
- `isNullable`: `true` to write an `xsi:nil='true'` attribute if the object to serialize is `null`; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteRpcResult(String, String) method

```csharp
protected void WriteRpcResult (string name, string? ns);
```

Writes a SOAP 1.2 RPC result element with a specified qualified name in its body.

Parameters:

- `name`: The local name of the result body.
- `ns`: The namespace of the result body.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `result` element is defined in the namespace "http://www.w3.org/2002/12/soap-rpc".

## XmlSerializationWriter.WriteSerializable(IXmlSerializable, String, String, Boolean) method

```csharp
protected void WriteSerializable (System.Xml.Serialization.IXmlSerializable? serializable, string name, string ns, bool isNullable);
```

Writes an object that uses custom XML formatting as an XML element.

Parameters:

- `serializable`: An object that implements the `IXmlSerializable` interface that uses custom XML formatting.
- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `isNullable`: `true` to write an `xsi:nil='true'` attribute if the `IXmlSerializable` class object is `null`; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteSerializable(IXmlSerializable, String, String, Boolean, Boolean) method

```csharp
protected void WriteSerializable (System.Xml.Serialization.IXmlSerializable? serializable, string name, string? ns, bool isNullable, bool wrapped);
```

Instructs `XmlNode` to write an object that uses custom XML formatting as an XML element.

Parameters:

- `serializable`: An object that implements the `IXmlSerializable` interface that uses custom XML formatting.
- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `isNullable`: `true` to write an `xsi:nil='true'` attribute if the `IXmlSerializable` object is `null`; otherwise, `false`.
- `wrapped`: `true` to ignore writing the opening element tag; otherwise, `false` to write the opening element tag.

To be added.

## XmlSerializationWriter.WriteStartDocument() method

```csharp
protected void WriteStartDocument ();
```

Writes the XML declaration if the writer is positioned at the start of an XML document.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteStartElement(String) method

```csharp
protected void WriteStartElement (string name);
```

Writes an opening element tag, including any attributes.

Parameters:

- `name`: The local name of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteStartElement(String, String) method

```csharp
protected void WriteStartElement (string name, string? ns);
```

Writes an opening element tag, including any attributes.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteStartElement(String, String, Boolean) method

```csharp
protected void WriteStartElement (string name, string? ns, bool writePrefixed);
```

Writes an opening element tag, including any attributes.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `writePrefixed`: `true` to write the element name with a prefix if none is available for the specified namespace; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteStartElement(String, String, Object) method

```csharp
protected void WriteStartElement (string name, string? ns, object? o);
```

Writes an opening element tag, including any attributes.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `o`: The object being serialized as an XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteStartElement(String, String, Object, Boolean) method

```csharp
protected void WriteStartElement (string name, string? ns, object? o, bool writePrefixed);
```

Writes an opening element tag, including any attributes.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `o`: The object being serialized as an XML element.
- `writePrefixed`: `true` to write the element name with a prefix if none is available for the specified namespace; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteStartElement(String, String, Object, Boolean, XmlSerializerNamespaces) method

```csharp
protected void WriteStartElement (string name, string? ns, object? o, bool writePrefixed, System.Xml.Serialization.XmlSerializerNamespaces? xmlns);
```

Writes an opening element tag, including any attributes.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `o`: The object being serialized as an XML element.
- `writePrefixed`: `true` to write the element name with a prefix if none is available for the specified namespace; otherwise, `false`.
- `xmlns`: An instance of the `XmlSerializerNamespaces` class that contains prefix and namespace pairs to be used in the generated XML.

To be added.

## XmlSerializationWriter.WriteTypedPrimitive(String, String, Object, Boolean) method

```csharp
protected void WriteTypedPrimitive (string? name, string? ns, object o, bool xsiType);
```

Writes an XML element whose text body is a value of a simple XML Schema data type.

Parameters:

- `name`: The local name of the element to write.
- `ns`: The namespace of the element to write.
- `o`: The object to be serialized in the element body.
- `xsiType`: `true` if the XML element explicitly specifies the text value's type using the `xsi:type` attribute; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `xsi:type` attribute explicitly indicates the XML Schema data type. The prefix `xsi` refers to the XML Schema instance namespace.

## XmlSerializationWriter.WriteValue(Byte[]) method

```csharp
protected void WriteValue (byte[]? value);
```

Writes a base-64 byte array.

Parameters:

- `value`: The byte array to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteValue(String) method

```csharp
protected void WriteValue (string? value);
```

Writes a specified string value.

Parameters:

- `value`: The value of the string to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteXmlAttribute(XmlNode) method

```csharp
protected void WriteXmlAttribute (System.Xml.XmlNode node);
```

Writes the specified `XmlNode` as an XML attribute.

Parameters:

- `node`: The XML node to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteXmlAttribute(XmlNode, Object) method

```csharp
protected void WriteXmlAttribute (System.Xml.XmlNode node, object? container);
```

Writes the specified `XmlNode` object as an XML attribute.

Parameters:

- `node`: The XML node to write.
- `container`: An `XmlSchemaObject` object (or `null`) used to generate a qualified name value for an `arrayType` attribute from the Web Services Description Language (WSDL) namespace ("http://schemas.xmlsoap.org/wsdl/").

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteXsiType(String, String) method

```csharp
protected void WriteXsiType (string name, string? ns);
```

Writes an `xsi:type` attribute for an XML element that is being serialized into a document.

Parameters:

- `name`: The local name of an XML Schema data type.
- `ns`: The namespace of an XML Schema data type.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `xsi:type` attribute explicitly indicates the XML Schema data type. The prefix `xsi` refers to the XML Schema instance namespace.
