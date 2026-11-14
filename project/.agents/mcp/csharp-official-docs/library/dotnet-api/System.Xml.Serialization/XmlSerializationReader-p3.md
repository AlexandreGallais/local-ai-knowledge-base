---
title: "XmlSerializationReader class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationReader class (part 3 of 4)

## XmlSerializationReader.ReadReferencedElement(String, String) method

```csharp
protected object? ReadReferencedElement (string? name, string? ns);
```

Deserializes an object from a SOAP-encoded `multiRef` XML element.

Parameters:

- `name`: The local name of the element's XML Schema data type.
- `ns`: The namespace of the element's XML Schema data type.

Returns: The value of the referenced element in the document.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

This signature of the `XmlSerializationReader.ReadReferencedElement` method obtains the XML Schema data type of the `multiRef` element from the method parameters rather than by reading the `xsi:type` attribute. The prefix `xsi` refers to the instance of the XML Schema namespace.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.ReadReferencedElements() method

```csharp
protected void ReadReferencedElements ();
```

Deserializes objects from the SOAP-encoded `multiRef` elements in a SOAP message.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.ReadReferencingElement(String) method

```csharp
protected object? ReadReferencingElement (out string? fixupReference);
```

Deserializes an object from an XML element in a SOAP message that contains a reference to a `multiRef` element.

Parameters:

- `fixupReference`: An output string into which the `href` attribute value is read.

Returns: The deserialized object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.ReadReferencingElement(String, String, String) method

```csharp
protected object? ReadReferencingElement (string? name, string? ns, out string? fixupReference);
```

Deserializes an object from an XML element in a SOAP message that contains a reference to a `multiRef` element.

Parameters:

- `name`: The local name of the element's XML Schema data type.
- `ns`: The namespace of the element's XML Schema data type.
- `fixupReference`: An output string into which the `href` attribute value is read.

Returns: The deserialized object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.ReadReferencingElement(String, String, Boolean, String) method

```csharp
protected object? ReadReferencingElement (string? name, string? ns, bool elementCanBeType, out string? fixupReference);
```

Deserializes an object from an XML element in a SOAP message that contains a reference to a `multiRef` element.

Parameters:

- `name`: The local name of the element's XML Schema data type.
- `ns`: The namespace of the element's XML Schema data type.
- `elementCanBeType`: `true` if the element name is also the XML Schema data type name; otherwise, `false`.
- `fixupReference`: An output string into which the value of the `href` attribute is read.

Returns: The deserialized object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.ReadSerializable(IXmlSerializable) method

```csharp
protected System.Xml.Serialization.IXmlSerializable ReadSerializable (System.Xml.Serialization.IXmlSerializable serializable);
```

Populates an object from its XML representation at the current location of the `XmlReader`.

Parameters:

- `serializable`: An `IXmlSerializable` that corresponds to the current position of the `XmlReader`.

Returns: An object that implements the `IXmlSerializable` interface with its members populated from the location of the `XmlReader`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadSerializable(IXmlSerializable, Boolean) method

```csharp
protected System.Xml.Serialization.IXmlSerializable ReadSerializable (System.Xml.Serialization.IXmlSerializable serializable, bool wrappedAny);
```

This method supports the .NET infrastructure and is not intended to be used directly from your code.

Parameters:

- `serializable`: An IXmlSerializable object that corresponds to the current position of the XMLReader.
- `wrappedAny`: Specifies whether the serializable object is wrapped.

Returns: An object that implements the IXmlSerializable interface with its members populated from the location of the XmlReader.

To be added.

## XmlSerializationReader.ReadString(String) method

```csharp
protected string? ReadString (string? value);
```

Produces the result of a call to the `XmlReader.ReadString` method appended to the input value.

Parameters:

- `value`: A string to prefix to the result of a call to the `XmlReader.ReadString` method.

Returns: The result of call to the `XmlReader.ReadString` method appended to the input value.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadString(String, Boolean) method

```csharp
protected string? ReadString (string? value, bool trim);
```

Returns the result of a call to the `XmlReader.ReadString` method of the `XmlReader` class, trimmed of white space if needed, and appended to the input value.

Parameters:

- `value`: A string that will be appended to.
- `trim`: `true` if the result of the read operation should be trimmed; otherwise, `false`.

Returns: The result of the read operation appended to the input value.

To be added.

## XmlSerializationReader.ReadTypedNull(XmlQualifiedName) method

```csharp
protected object? ReadTypedNull (System.Xml.XmlQualifiedName type);
```

Reads an XML element that allows null values (`xsi:nil = 'true'`) and returns a generic `Nullable<T>` value.

Parameters:

- `type`: The `XmlQualifiedName` that represents the simple data type for the current location of the `XmlReader`.

Returns: A generic `Nullable<T>` that represents a null XML value.

To be added.

## XmlSerializationReader.ReadTypedPrimitive(XmlQualifiedName) method

```csharp
protected object? ReadTypedPrimitive (System.Xml.XmlQualifiedName type);
```

Gets the value of the XML node at which the `XmlReader` is currently positioned.

Parameters:

- `type`: The `XmlQualifiedName` that represents the simple data type for the current location of the `XmlReader`.

Returns: The value of the node as a .NET value type, if the value is a simple XML Schema data type.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadXmlDocument(Boolean) method

```csharp
protected System.Xml.XmlDocument? ReadXmlDocument (bool wrapped);
```

Instructs the `XmlReader` to read an XML document root element at its current position.

Parameters:

- `wrapped`: `true` if the method should read content only after reading the element's start element; otherwise, `false`.

Returns: An `XmlDocument` that contains the root element that has been read.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadXmlNode(Boolean) method

```csharp
protected System.Xml.XmlNode? ReadXmlNode (bool wrapped);
```

Instructs the `XmlReader` to read the XML node at its current position.

Parameters:

- `wrapped`: `true` to read content only after reading the element's start element; otherwise, `false`.

Returns: An `XmlNode` that represents the XML node that has been read.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.Referenced(Object) method

```csharp
protected void Referenced (object? o);
```

Stores an object to be deserialized from a SOAP-encoded `multiRef` element.

Parameters:

- `o`: The object to be deserialized.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.ResolveDynamicAssembly(String) method

```csharp
protected static System.Reflection.Assembly? ResolveDynamicAssembly (string assemblyFullName);
```

Gets a dynamically generated assembly by name.

Parameters:

- `assemblyFullName`: The full name of the assembly.

Returns: A dynamically generated `Assembly`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ResolveDynamicAssembly` method is static.

## XmlSerializationReader.ShrinkArray(Array, Int32, Type, Boolean) method

```csharp
protected Array? ShrinkArray (Array? a, int length, Type elementType, bool isNullable);
```

Ensures that a given array, or a copy, is no larger than a specified length.

Parameters:

- `a`: The array that is being checked.
- `length`: The maximum length of the array.
- `elementType`: The `Type` of the array's elements.
- `isNullable`: `true` if `null` for the array, if present for the input array, can be returned; otherwise, a new, smaller array.

Returns: The existing `Array`, if it is already small enough; otherwise, a new, smaller array that contains the original array's elements up to the size of `length`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ToByteArrayBase64(Boolean) method

```csharp
protected byte[]? ToByteArrayBase64 (bool isNull);
```

Instructs the `XmlReader` to read the string value at its current position and return it as a base-64 byte array.

Parameters:

- `isNull`: `true` to return `null`; `false` to return a base-64 byte array.

Returns: A base-64 byte array; otherwise, `null` if the value of the `isNull` parameter is `true`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ToByteArrayBase64(String) method

```csharp
protected static byte[]? ToByteArrayBase64 (string? value);
```

Produces a base-64 byte array from an input string.

Parameters:

- `value`: A string to translate into a base-64 byte array.

Returns: A base-64 byte array.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToByteArrayBase64` method is static.

## XmlSerializationReader.ToByteArrayHex(Boolean) method

```csharp
protected byte[]? ToByteArrayHex (bool isNull);
```

Instructs the `XmlReader` to read the string value at its current position and return it as a hexadecimal byte array.

Parameters:

- `isNull`: `true` to return `null`; `false` to return a hexadecimal byte array.

Returns: A hexadecimal byte array; otherwise, `null` if the value of the `isNull` parameter is `true`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ToByteArrayHex(String) method

```csharp
protected static byte[]? ToByteArrayHex (string? value);
```

Produces a hexadecimal byte array from an input string.

Parameters:

- `value`: A string to translate into a hexadecimal byte array.

Returns: A hexadecimal byte array.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToByteArrayHex` method is static.
