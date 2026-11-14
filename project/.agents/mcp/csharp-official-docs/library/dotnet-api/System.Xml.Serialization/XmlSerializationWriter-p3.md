---
title: "XmlSerializationWriter class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationWriter class (part 3 of 5)

## XmlSerializationWriter.WriteElementString(String, String) method

```csharp
protected void WriteElementString (string localName, string? value);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element to be written without namespace qualification.
- `value`: The text value of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementString(String, String, String) method

```csharp
protected void WriteElementString (string localName, string? ns, string? value);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The text value of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementString(String, String, XmlQualifiedName) method

```csharp
protected void WriteElementString (string localName, string? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `value`: The text value of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementString(String, String, String, XmlQualifiedName) method

```csharp
protected void WriteElementString (string localName, string? ns, string? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The text value of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, Byte[]) method

```csharp
protected void WriteElementStringRaw (string localName, byte[]? value);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `value`: The text value of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, String) method

```csharp
protected void WriteElementStringRaw (string localName, string? value);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `value`: The text value of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, Byte[], XmlQualifiedName) method

```csharp
protected void WriteElementStringRaw (string localName, byte[]? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `value`: The text value of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, String, Byte[]) method

```csharp
protected void WriteElementStringRaw (string localName, string? ns, byte[]? value);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The text value of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, String, String) method

```csharp
protected void WriteElementStringRaw (string localName, string? ns, string? value);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The text value of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, String, XmlQualifiedName) method

```csharp
protected void WriteElementStringRaw (string localName, string? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `value`: The text value of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, String, Byte[], XmlQualifiedName) method

```csharp
protected void WriteElementStringRaw (string localName, string? ns, byte[]? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The text value of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementStringRaw(String, String, String, XmlQualifiedName) method

```csharp
protected void WriteElementStringRaw (string localName, string? ns, string? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified value in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The text value of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteEmptyTag(String) method

```csharp
protected void WriteEmptyTag (string? name);
```

Writes an XML element whose body is empty.

Parameters:

- `name`: The local name of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteEmptyTag(String, String) method

```csharp
protected void WriteEmptyTag (string? name, string? ns);
```

Writes an XML element whose body is empty.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteEndElement() method

```csharp
protected void WriteEndElement ();
```

Writes a `<closing>` element tag.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteEndElement(Object) method

```csharp
protected void WriteEndElement (object? o);
```

Writes a `<closing>` element tag.

Parameters:

- `o`: The object being serialized.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteId(Object) method

```csharp
protected void WriteId (object o);
```

Writes an `id` attribute that appears in a SOAP-encoded `multiRef` element.

Parameters:

- `o`: The object being serialized.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times by `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteNamespaceDeclarations(XmlSerializerNamespaces) method

```csharp
protected void WriteNamespaceDeclarations (System.Xml.Serialization.XmlSerializerNamespaces? xmlns);
```

Writes the namespace declaration attributes.

Parameters:

- `xmlns`: The XML namespaces to declare.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteNullableQualifiedNameEncoded(String, String, XmlQualifiedName, XmlQualifiedName) method

```csharp
protected void WriteNullableQualifiedNameEncoded (string name, string? ns, System.Xml.XmlQualifiedName? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element whose body contains a valid XML qualified name. `XmlWriter` inserts an `xsi:nil='true'` attribute if the string's value is `null`.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `value`: The XML qualified name to write in the body of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullableQualifiedNameEncoded` method is called only when writing SOAP-encoded XML, as described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteNullableQualifiedNameLiteral(String, String, XmlQualifiedName) method

```csharp
protected void WriteNullableQualifiedNameLiteral (string name, string? ns, System.Xml.XmlQualifiedName? value);
```

Writes an XML element whose body contains a valid XML qualified name. `XmlWriter` inserts an `xsi:nil='true'` attribute if the string's value is `null`.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `value`: The XML qualified name to write in the body of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullableQualifiedNameLiteral` method is called only when writing literal XML that can be defined in an XML Schema document.

## XmlSerializationWriter.WriteNullableStringEncoded(String, String, String, XmlQualifiedName) method

```csharp
protected void WriteNullableStringEncoded (string name, string? ns, string? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element that contains a string as the body. `XmlWriter` inserts an `xsi:nil='true'` attribute if the string's value is `null`.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `value`: The string to write in the body of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullableStringEncoded` method is called only when writing SOAP-encoded XML, as described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteNullableStringEncodedRaw(String, String, Byte[], XmlQualifiedName) method

```csharp
protected void WriteNullableStringEncodedRaw (string name, string? ns, byte[]? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes a byte array as the body of an XML element. `XmlWriter` inserts an `xsi:nil='true'` attribute if the string's value is `null`.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `value`: The byte array to write in the body of the XML element.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullableStringEncodedRaw` method is called only when writing SOAP-encoded XML, as described in Section 5 of the SOAP 1.1 specification.
