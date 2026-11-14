---
title: "XmlSerializationReader class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationReader class (part 2 of 4)

## XmlSerializationReader.CreateMissingIXmlSerializableType(String, String, String) method

```csharp
protected Exception CreateMissingIXmlSerializableType (string? name, string? ns, string? clrType);
```

Creates an `InvalidOperationException` that indicates that a derived type that is mapped to an XML Schema data type cannot be located.

Parameters:

- `name`: The local name of the XML Schema data type that is mapped to the unavailable derived type.
- `ns`: The namespace of the XML Schema data type that is mapped to the unavailable derived type.
- `clrType`: The full name of the .NET base type for which a derived type cannot be located.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateReadOnlyCollectionException(String) method

```csharp
protected Exception CreateReadOnlyCollectionException (string name);
```

Creates an `InvalidOperationException` that indicates that a SOAP-encoded collection type cannot be modified and its values cannot be filled in.

Parameters:

- `name`: The fully qualified name of the .NET type for which there is a mapping.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateUnknownConstantException(String, Type) method

```csharp
protected Exception CreateUnknownConstantException (string? value, Type enumType);
```

Creates an `InvalidOperationException` that indicates that an enumeration value is not valid.

Parameters:

- `value`: The enumeration value that is not valid.
- `enumType`: The enumeration type.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateUnknownNodeException() method

```csharp
protected Exception CreateUnknownNodeException ();
```

Creates an `InvalidOperationException` that indicates that the current position of `XmlReader` represents an unknown XML node.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateUnknownTypeException(XmlQualifiedName) method

```csharp
protected Exception CreateUnknownTypeException (System.Xml.XmlQualifiedName type);
```

Creates an `InvalidOperationException` that indicates that a type is unknown.

Parameters:

- `type`: An `XmlQualifiedName` that represents the name of the unknown type.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.EnsureArrayIndex(Array, Int32, Type) method

```csharp
protected Array EnsureArrayIndex (Array? a, int index, Type elementType);
```

Ensures that a given array, or a copy, is large enough to contain a specified index.

Parameters:

- `a`: The `Array` that is being checked.
- `index`: The required index.
- `elementType`: The `Type` of the array's elements.

Returns: The existing `Array`, if it is already large enough; otherwise, a new, larger array that contains the original array's elements.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.FixupArrayRefs(Object) method

```csharp
protected void FixupArrayRefs (object fixup);
```

Fills in the values of a SOAP-encoded array whose data type maps to a .NET reference type.

Parameters:

- `fixup`: An object that contains the array whose values are filled in.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.FixupArrayRefs` method implements the `XmlSerializationFixupCallback` delegate for deserialization of SOAP-encoded XML data.

While deserializing XML documents into .NET objects, the .NET XML serialization infrastructure dynamically creates an instance of the `XmlSerializationReader.FixupArrayRefs` method for SOAP-encoded arrays whose data types map to .NET reference types. The method then is called by `XmlSerializationFixupCallback` to fill in the objects in the array.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.GetArrayLength(String, String) method

```csharp
protected int GetArrayLength (string name, string ns);
```

Gets the length of the SOAP-encoded array where the `XmlReader` is currently positioned.

Parameters:

- `name`: The local name that the array should have.
- `ns`: The namespace that the array should have.

Returns: The length of the SOAP array.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.GetArrayLength` method applies to the `arrayType` attribute that is used with SOAP encoding and specified with the namespace "".

## XmlSerializationReader.GetNullAttr() method

```csharp
protected bool GetNullAttr ();
```

Determines whether the XML element where the `XmlReader` is currently positioned has a null attribute set to the value `true`.

Returns: `true` if `XmlReader` is currently positioned over a null attribute with the value `true`; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.GetTarget(String) method

```csharp
protected object GetTarget (string id);
```

Gets an object that is being deserialized from a SOAP-encoded `multiRef` element and that was stored earlier by `XmlSerializationReader.AddTarget`.

Parameters:

- `id`: The value of the `id` attribute of a `multiRef` element that identifies the element.

Returns: An object to be deserialized from a SOAP-encoded `multiRef` element.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements. SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.GetXsiType() method

```csharp
protected System.Xml.XmlQualifiedName? GetXsiType ();
```

Gets the value of the `xsi:type` attribute for the XML element at the current location of the `XmlReader`.

Returns: An XML qualified name that indicates the data type of an XML element.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `type` attribute from the instance of the XML Schema namespace explicitly specifies the data type of an XML element.

## XmlSerializationReader.InitCallbacks() method

```csharp
protected abstract void InitCallbacks ();
```

Initializes callback methods that populate objects that map to SOAP-encoded XML data.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization that is derived from `XmlSerializationReader`. During this process, .NET generates read methods that implement the `XmlSerializationReadCallback` delegate. It does so for certain mappings between .NET types and XML data types that are serialized through SOAP-encoded XML and are not root elements. Next, as necessary, a read method is called during deserialization.

The abstract `XmlSerializationReader.InitCallbacks` method is where the temporary derived class creates an instance of and initializes read callback methods.

You should not directly create an instance of `XmlSerializationReadCallback`.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.InitIDs() method

```csharp
protected abstract void InitIDs ();
```

Stores element and attribute names in a `NameTable` object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.InitIDs` method is abstract.

## XmlSerializationReader.IsXmlnsAttribute(String) method

```csharp
protected bool IsXmlnsAttribute (string name);
```

Determines whether an XML attribute name indicates an XML namespace.

Parameters:

- `name`: The name of an XML attribute.

Returns: `true` if the XML attribute name indicates an XML namespace; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

An attribute name indicates an XML namespace if it takes the form `xmlns:key`, where "key" is the namespace name.

## XmlSerializationReader.ParseWsdlArrayType(XmlAttribute) method

```csharp
protected void ParseWsdlArrayType (System.Xml.XmlAttribute attr);
```

Sets the value of the XML attribute if it is of type `arrayType` from the Web Services Description Language (WSDL) namespace.

Parameters:

- `attr`: An `XmlAttribute` that may have the type `wsdl:array`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

WSDL uses the namespace "".

## XmlSerializationReader.ReadElementQualifiedName() method

```csharp
protected System.Xml.XmlQualifiedName ReadElementQualifiedName ();
```

Makes the `XmlReader` read the fully qualified name of the element where it is currently positioned.

Returns: The fully qualified name of the current XML element.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadEndElement() method

```csharp
protected void ReadEndElement ();
```

Makes the `XmlReader` read an XML end tag.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadNull() method

```csharp
protected bool ReadNull ();
```

Instructs the `XmlReader` to read the current XML element if the element has a null attribute with the value true.

Returns: `true` if the element has a `null="true"` attribute value and has been read; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadNullableQualifiedName() method

```csharp
protected System.Xml.XmlQualifiedName? ReadNullableQualifiedName ();
```

Instructs the `XmlReader` to read the fully qualified name of the element where it is currently positioned.

Returns: A `XmlQualifiedName` that represents the fully qualified name of the current XML element; otherwise, `null` if a `null="true"` attribute value is present.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadNullableString() method

```csharp
protected string? ReadNullableString ();
```

Instructs the `XmlReader` to read a simple, text-only XML element that could be `null`.

Returns: The string value; otherwise, `null`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReadReference(String) method

```csharp
protected bool ReadReference (out string? fixupReference);
```

Reads the value of the `href` attribute (`ref` attribute for SOAP 1.2) that is used to refer to an XML element in SOAP encoding.

Parameters:

- `fixupReference`: An output string into which the `href` attribute value is read.

Returns: `true` if the value was read; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The opening `#` symbol is stripped from the `href` attribute value.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.ReadReferencedElement() method

```csharp
protected object? ReadReferencedElement ();
```

Deserializes an object from a SOAP-encoded `multiRef` XML element.

Returns: The value of the referenced element in the document.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ReadReferencedElement` method obtains the XML Schema data type by reading the `xsi:type` attribute of the `multiRef` element. The prefix `xsi` refers to the instance of the XML Schema namespace.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times using `href` attributes (or `ref` attributes in SOAP 1.2) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.
