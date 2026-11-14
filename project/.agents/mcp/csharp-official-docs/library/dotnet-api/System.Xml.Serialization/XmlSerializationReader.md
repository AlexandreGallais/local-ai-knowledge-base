---
title: "XmlSerializationReader class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationReader class

Namespace: `System.Xml.Serialization`

```csharp
public abstract class XmlSerializationReader : System.Xml.Serialization.XmlSerializationGeneratedCode
```

Controls deserialization by the `XmlSerializer` class.

#### Remarks
During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization that is derived from the abstract `XmlSerializationReader` class. `XmlSerializationReader` is also implemented within the .NET XML serialization infrastructure for deserialization of XML documents into `DiscoveryDocument` and `ServiceDescription` objects.

You should not derive classes from `XmlSerializationReader`. Instead, call one of the `XmlSerializer.Deserialize` methods.

## XmlSerializationReader.XmlSerializationReader() constructor

```csharp
protected XmlSerializationReader ();
```

Initializes a new instance of the `XmlSerializationReader` class.

To be added.

## XmlSerializationReader.DecodeName property

```csharp
protected bool DecodeName { get; set; }
```

Gets or sets a value that determines whether XML strings are translated into valid .NET type names.

Returns: `true` if XML strings are decoded into valid .NET type names; otherwise, `false`.

#### Remarks
The `XmlConvert.EncodeName` method writes valid XML from invalid sources. For example, the `ColumnName` property of the `DataColumn` class can contain spaces, which are invalid as XML. The `XmlConvert.DecodeName` reads the encoded XML and restores it to the original value. However, the `XmlSchema.Read` method of the `XmlSchema` class cannot read such encoded XML. In that case, set the `EscapeName` property to `false` to disable the encoding of the XML.

## XmlSerializationReader.Document property

```csharp
protected System.Xml.XmlDocument Document { get; }
```

Gets the XML document object into which the XML document is being deserialized.

Returns: An `XmlDocument` that represents the deserialized `XmlDocument` data.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.IsReturnValue property

```csharp
protected bool IsReturnValue { get; set; }
```

Gets or sets a value that should be `true` for a SOAP 1.1 return value.

Returns: `true`, if the value is a return value.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.Reader property

```csharp
protected System.Xml.XmlReader Reader { get; }
```

Gets the `XmlReader` object that is being used by `XmlSerializationReader`.

Returns: The `XmlReader` that is being used by the `XmlSerializationReader`.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.ReaderCount property

```csharp
protected int ReaderCount { get; }
```

Gets the current count of the `XmlReader`.

Returns: The current count of an `XmlReader`.

#### Remarks
The method is used by generated classes and should not be directly invoked.

The `XmlSerializationReader` uses an instance of the `XmlReader` class to count when a read operation occurs. The count is incremented each time the reader calls an appropriate method, for example the `XmlReader.Read` method or the `XmlReader.ReadElementString` method.

## XmlSerializationReader.AddFixup(XmlSerializationReader+CollectionFixup) method

```csharp
protected void AddFixup (System.Xml.Serialization.XmlSerializationReader.CollectionFixup? fixup);
```

Stores an object that contains a callback method that will be called, as necessary, to fill in .NET collections or enumerations that map to SOAP-encoded arrays or SOAP-encoded, multi-referenced elements.

Parameters:

- `fixup`: A `XmlSerializationCollectionFixupCallback` delegate and the callback method's input data.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization that is derived from `XmlSerializationReader`. During this process, the infrastructure generates `XmlSerializationCollectionFixupCallback` methods and it creates `CollectionFixup` objects to store the fix-up methods and their input data. The infrastructure does so for SOAP-encoded arrays or SOAP-encoded, multi-referenced elements whose data types, in either case, map to .NET collections or enumerations. Next, as necessary, the methods are invoked during deserialization to fill in array items or multi-referenced objects.

You should not directly create an instance of the `XmlSerializationCollectionFixupCallback` or `CollectionFixup` class.

## XmlSerializationReader.AddFixup(XmlSerializationReader+Fixup) method

```csharp
protected void AddFixup (System.Xml.Serialization.XmlSerializationReader.Fixup? fixup);
```

Stores an object that contains a callback method instance that will be called, as necessary, to fill in the objects in a SOAP-encoded array.

Parameters:

- `fixup`: An `XmlSerializationFixupCallback` delegate and the callback method's input data.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

While deserializing XML documents into .NET objects, the .NET XML serialization infrastructure dynamically creates instances of fix-up methods that implement the `XmlSerializationFixupCallback` delegate and creates instances of the `Fixup` class to store the fix-up methods and their input data. The infrastructure does so for SOAP-encoded arrays whose data types map to .NET reference types. Next, as necessary, a fix-up method is called to fill in the objects in the array.

In addition, during initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization that derives from `XmlSerializationReader`. During this process, the infrastructure generates `XmlSerializationFixupCallback` methods and `Fixup` objects for SOAP-encoded, multi-referenced XML data. The methods are then invoked during deserialization.

You should not directly create instances of the `XmlSerializationFixupCallback` or `Fixup` classes.

## XmlSerializationReader.AddReadCallback(String, String, Type, XmlSerializationReadCallback) method

```csharp
protected void AddReadCallback (string name, string ns, Type type, System.Xml.Serialization.XmlSerializationReadCallback read);
```

Stores an implementation of the `XmlSerializationReadCallback` delegate and its input data for a later invocation.

Parameters:

- `name`: The name of the .NET type that is being deserialized.
- `ns`: The namespace of the .NET type that is being deserialized.
- `type`: The `Type` to be deserialized.
- `read`: An `XmlSerializationReadCallback` delegate.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for deserialization that derives from `XmlSerializationReader`. During this process, the .NET XML serialization infrastructure generates read methods that implement the `XmlSerializationReadCallback` delegate. It does so for certain mappings between .NET types and XML data types that are serialized through SOAP-encoded XML and are not root elements. Next, as necessary, a read method is called during deserialization.

You should not directly create an instance of the `XmlSerializationReadCallback` class.

## XmlSerializationReader.AddTarget(String, Object) method

```csharp
protected void AddTarget (string? id, object? o);
```

Stores an object that is being deserialized from a SOAP-encoded `multiRef` element for later access through the `XmlSerializationReader.GetTarget` method.

Parameters:

- `id`: The value of the `id` attribute of a `multiRef` element that identifies the element.
- `o`: The object that is deserialized from the XML element.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element identified by an `id` attribute. The `id` value can be referenced multiple times by `ref` attributes (or `href` attributes in SOAP 1.1) in substitute elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationReader.CheckReaderCount(Int32, Int32) method

```csharp
protected void CheckReaderCount (ref int whileIterations, ref int readerCount);
```

Checks whether the deserializer has advanced.

Parameters:

- `whileIterations`: The current `count` in a while loop.
- `readerCount`: The current `XmlSerializationReader.ReaderCount`.

Exceptions:

- `InvalidOperationException`: The `XmlSerializationReader.ReaderCount` has not advanced.

#### Remarks
The method is used by generated classes and should not be directly invoked.

The `XmlSerializationReader.CheckReaderCount` method is used when the `checkDeserializerAdvances` attribute of the `<xmlSerializer>` configuration element is set to `true`. For more information, see <xmlSerializer> Element.

## XmlSerializationReader.CollapseWhitespace(String) method

```csharp
protected string? CollapseWhitespace (string? value);
```

Removes all occurrences of white space characters from the beginning and end of the specified string.

Parameters:

- `value`: The string that will have its white space trimmed.

Returns: The trimmed string.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateAbstractTypeException(String, String) method

```csharp
protected Exception CreateAbstractTypeException (string name, string? ns);
```

Creates an `InvalidOperationException` that indicates that an object being deserialized should be abstract.

Parameters:

- `name`: The name of the abstract type.
- `ns`: The .NET namespace of the abstract type.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended only for use by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateBadDerivationException(String, String, String, String, String, String) method

```csharp
protected Exception CreateBadDerivationException (string? xsdDerived, string? nsDerived, string? xsdBase, string? nsBase, string? clrDerived, string? clrBase);
```

Populates an object from its XML representation at the current location of the `XmlReader`, with an option to read the inner element.

Parameters:

- `xsdDerived`: The local name of the derived XML Schema data type.
- `nsDerived`: The namespace of the derived XML Schema data type.
- `xsdBase`: The local name of the base XML Schema data type.
- `nsBase`: The namespace of the base XML Schema data type.
- `clrDerived`: The namespace of the derived .NET type.
- `clrBase`: The name of the base .NET type.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateCtorHasSecurityException(String) method

```csharp
protected Exception CreateCtorHasSecurityException (string typeName);
```

Creates an `InvalidOperationException` that indicates that an object being deserialized cannot be instantiated because the constructor throws a security exception.

Parameters:

- `typeName`: The name of the type.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateInaccessibleConstructorException(String) method

```csharp
protected Exception CreateInaccessibleConstructorException (string typeName);
```

Creates an `InvalidOperationException` that indicates that an object being deserialized cannot be instantiated because there is no constructor available.

Parameters:

- `typeName`: The name of the type.

Returns: An `InvalidOperationException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateInvalidCastException(Type, Object) method

```csharp
protected Exception CreateInvalidCastException (Type type, object? value);
```

Creates an `InvalidCastException` that indicates that an explicit reference conversion failed.

Parameters:

- `type`: The `Type` that an object cannot be cast to. This type is incorporated into the exception message.
- `value`: The object that cannot be cast. This object is incorporated into the exception message.

Returns: An `InvalidCastException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationReader.CreateInvalidCastException(Type, Object, String) method

```csharp
protected Exception CreateInvalidCastException (Type type, object? value, string? id);
```

Creates an `InvalidCastException` that indicates that an explicit reference conversion failed.

Parameters:

- `type`: The `Type` that an object cannot be cast to. This type is incorporated into the exception message.
- `value`: The object that cannot be cast. This object is incorporated into the exception message.
- `id`: A string identifier.

Returns: An `InvalidCastException` exception.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.
