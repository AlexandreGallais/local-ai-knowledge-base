---
title: "XmlSerializationWriter class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationWriter class (part 4 of 5)

## XmlSerializationWriter.WriteNullableStringEncodedRaw(String, String, String, XmlQualifiedName) method

```csharp
protected void WriteNullableStringEncodedRaw (string name, string? ns, string? value, System.Xml.XmlQualifiedName? xsiType);
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

The `XmlSerializationWriter.WriteNullableStringEncodedRaw` method is called only when writing SOAP-encoded XML, as described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteNullableStringLiteral(String, String, String) method

```csharp
protected void WriteNullableStringLiteral (string name, string? ns, string? value);
```

Writes an XML element that contains a string as the body. `XmlWriter` inserts an `xsi:nil='true'` attribute if the string's value is `null`.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `value`: The string to write in the body of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullableStringLiteral` method is called only when writing literal XML that can be defined in an XML Schema document.

## XmlSerializationWriter.WriteNullableStringLiteralRaw(String, String, Byte[]) method

```csharp
protected void WriteNullableStringLiteralRaw (string name, string? ns, byte[]? value);
```

Writes a byte array as the body of an XML element. `XmlWriter` inserts an `xsi:nil='true'` attribute if the string's value is `null`.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `value`: The byte array to write in the body of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullableStringLiteralRaw` method is called only when writing literal XML that can be defined in an XML Schema document.

## XmlSerializationWriter.WriteNullableStringLiteralRaw(String, String, String) method

```csharp
protected void WriteNullableStringLiteralRaw (string name, string? ns, string? value);
```

Writes an XML element that contains a string as the body. `XmlWriter` inserts a `xsi:nil='true'` attribute if the string's value is `null`.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `value`: The string to write in the body of the XML element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullableStringLiteralRaw` method is called only when writing literal XML that can be defined in an XML Schema document.

## XmlSerializationWriter.WriteNullTagEncoded(String) method

```csharp
protected void WriteNullTagEncoded (string? name);
```

Writes an XML element with an `xsi:nil='true'` attribute.

Parameters:

- `name`: The local name of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullTagEncoded` method is called only when writing SOAP-encoded XML, as described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteNullTagEncoded(String, String) method

```csharp
protected void WriteNullTagEncoded (string? name, string? ns);
```

Writes an XML element with an `xsi:nil='true'` attribute.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullTagEncoded` method is called only when writing SOAP-encoded XML, as described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteNullTagLiteral(String) method

```csharp
protected void WriteNullTagLiteral (string? name);
```

Writes an XML element with an `xsi:nil='true'` attribute.

Parameters:

- `name`: The local name of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullTagLiteral` method is called only when writing literal XML that can be defined in an XML Schema document.

## XmlSerializationWriter.WriteNullTagLiteral(String, String) method

```csharp
protected void WriteNullTagLiteral (string? name, string? ns);
```

Writes an XML element with an `xsi:nil='true'` attribute.

Parameters:

- `name`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

When set to `true`, the `nil` attribute from the XML Schema instance namespace (abbreviated `xsi`) indicates a null value.

The `XmlSerializationWriter.WriteNullTagLiteral` method is called only when writing literal XML that can be defined in an XML Schema document.

## XmlSerializationWriter.WritePotentiallyReferencingElement(String, String, Object) method

```csharp
protected void WritePotentiallyReferencingElement (string? n, string? ns, object? o);
```

Writes a SOAP message XML element that can contain a reference to a `<multiRef>` XML element for a given object.

Parameters:

- `n`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `o`: The object being serialized either in the current XML element or a `multiRef` element that is referenced by the current element.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `<multiRef>` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WritePotentiallyReferencingElement(String, String, Object, Type) method

```csharp
protected void WritePotentiallyReferencingElement (string? n, string? ns, object? o, Type? ambientType);
```

Writes a SOAP message XML element that can contain a reference to a `<multiRef>` XML element for a given object.

Parameters:

- `n`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `o`: The object being serialized either in the current XML element or a `multiRef` element that referenced by the current element.
- `ambientType`: The type stored in the object's type mapping (as opposed to the object's type found directly through the `typeof` operation).

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `<multiRef>` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WritePotentiallyReferencingElement(String, String, Object, Type, Boolean) method

```csharp
protected void WritePotentiallyReferencingElement (string n, string? ns, object? o, Type? ambientType, bool suppressReference);
```

Writes a SOAP message XML element that can contain a reference to a `<multiRef>` XML element for a given object.

Parameters:

- `n`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `o`: The object being serialized either in the current XML element or a `multiRef` element that is referenced by the current element.
- `ambientType`: The type stored in the object's type mapping (as opposed to the object's type found directly through the `typeof` operation).
- `suppressReference`: `true` to serialize the object directly into the XML element rather than make the element reference another element that contains the data; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WritePotentiallyReferencingElement(String, String, Object, Type, Boolean, Boolean) method

```csharp
protected void WritePotentiallyReferencingElement (string? n, string? ns, object? o, Type? ambientType, bool suppressReference, bool isNullable);
```

Writes a SOAP message XML element that can contain a reference to a `multiRef` XML element for a given object.

Parameters:

- `n`: The local name of the XML element to write.
- `ns`: The namespace of the XML element to write.
- `o`: The object being serialized either in the current XML element or a `multiRef` element that referenced by the current element.
- `ambientType`: The type stored in the object's type mapping (as opposed to the object's type found directly through the `typeof` operation).
- `suppressReference`: `true` to serialize the object directly into the XML element rather than make the element reference another element that contains the data; otherwise, `false`.
- `isNullable`: `true` to write an `xsi:nil='true'` attribute if the object to serialize is `null`; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteReferencedElements() method

```csharp
protected void WriteReferencedElements ();
```

Serializes objects into SOAP-encoded `multiRef` XML elements in a SOAP message.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteReferencingElement(String, String, Object) method

```csharp
protected void WriteReferencingElement (string n, string? ns, object? o);
```

Writes a SOAP message XML element that contains a reference to a `multiRef` element for a given object.

Parameters:

- `n`: The local name of the referencing element being written.
- `ns`: The namespace of the referencing element being written.
- `o`: The object being serialized.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.
