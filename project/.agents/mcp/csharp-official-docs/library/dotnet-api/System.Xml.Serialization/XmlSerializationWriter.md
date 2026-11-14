---
title: "XmlSerializationWriter class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationWriter class

Namespace: `System.Xml.Serialization`

```csharp
public abstract class XmlSerializationWriter : System.Xml.Serialization.XmlSerializationGeneratedCode
```

Represents an abstract class used for controlling serialization by the `XmlSerializer` class.

#### Remarks
During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for serialization that is derived from the abstract `XmlSerializationWriter` class. `XmlSerializationWriter` is also implemented within .NET for serialization of `DiscoveryDocument` and `ServiceDescription` objects into XML documents.

You should not derive classes from `XmlSerializationWriter`. Instead, call the `XmlSerializer.Serialize` method.

## XmlSerializationWriter.XmlSerializationWriter() constructor

```csharp
protected XmlSerializationWriter ();
```

Initializes a new instance of the `XmlSerializationWriter` class.

To be added.

## XmlSerializationWriter.EscapeName property

```csharp
protected bool EscapeName { get; set; }
```

Gets or sets a value that indicates whether the `XmlConvert.EncodeName` method is used to write valid XML.

Returns: `true` if the `XmlSerializationWriter.FromXmlQualifiedName` method returns an encoded name; otherwise, `false`.

#### Remarks
The `XmlConvert.EncodeName` method writes valid XML from invalid sources. For example, the `ColumnName` property of the `DataColumn` class can contain spaces, which are invalid as XML. The `XmlConvert.DecodeName` method reads the encoded XML and restores it to the original value. However, the `XmlSchema.Read` method of the `XmlSchema` cannot read such encoded XML. In that case, set the `EscapeName` property to `false` to disable the encoding of the XML.

## XmlSerializationWriter.Namespaces property

```csharp
protected System.Collections.ArrayList? Namespaces { get; set; }
```

Gets or sets a list of XML qualified name objects that contain the namespaces and prefixes used to produce qualified names in XML documents.

Returns: An `ArrayList` that contains the namespaces and prefix pairs.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.Writer property

```csharp
protected System.Xml.XmlWriter Writer { get; set; }
```

Gets or sets the `XmlWriter` that is being used by the `XmlSerializationWriter`.

Returns: The `XmlWriter` used by the class instance.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.AddWriteCallback(Type, String, String, XmlSerializationWriteCallback) method

```csharp
protected void AddWriteCallback (Type type, string typeName, string? typeNs, System.Xml.Serialization.XmlSerializationWriteCallback callback);
```

Stores an implementation of the `XmlSerializationWriteCallback` delegate and the type it applies to, for a later invocation.

Parameters:

- `type`: The `Type` of objects that are serialized.
- `typeName`: The name of the type of objects that are serialized.
- `typeNs`: The namespace of the type of objects that are serialized.
- `callback`: An instance of the `XmlSerializationWriteCallback` delegate.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for serialization that is derived from `XmlSerializationWriter`. During this process, .NET generates write methods that implement the `XmlSerializationWriteCallback` delegate. It does so for certain mappings between .NET types and XML data types that are serialized via SOAP-encoded XML and are not root elements. Then, as necessary, a write method is called during serialization.

You should not directly create an instance of `XmlSerializationWriteCallback`.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.CreateChoiceIdentifierValueException(String, String, String, String) method

```csharp
protected Exception CreateChoiceIdentifierValueException (string value, string identifier, string name, string ns);
```

Creates an `InvalidOperationException` that indicates an unexpected name for an element that adheres to an XML Schema `choice` element declaration.

Parameters:

- `value`: The name that is not valid.
- `identifier`: The `choice` element declaration that the name belongs to.
- `name`: The expected local name of an element.
- `ns`: The expected namespace of an element.

Returns: The newly created exception.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.CreateInvalidAnyTypeException(Object) method

```csharp
protected Exception CreateInvalidAnyTypeException (object o);
```

Creates an `InvalidOperationException` that indicates the `XmlAnyElementAttribute` that has been invalidly applied to a member; only members that are of type `XmlNode`, or derived from `XmlNode`, are valid.

Parameters:

- `o`: The object that represents the invalid member.

Returns: The newly created exception.

To be added.

## XmlSerializationWriter.CreateInvalidAnyTypeException(Type) method

```csharp
protected Exception CreateInvalidAnyTypeException (Type type);
```

Creates an `InvalidOperationException` that indicates the `XmlAnyElementAttribute` that has been invalidly applied to a member; only members that are of type `XmlNode`, or derived from `XmlNode`, are valid.

Parameters:

- `type`: The `Type` that is invalid.

Returns: The newly created exception.

To be added.

## XmlSerializationWriter.CreateInvalidChoiceIdentifierValueException(String, String) method

```csharp
protected Exception CreateInvalidChoiceIdentifierValueException (string type, string identifier);
```

Creates an `InvalidOperationException` that indicates a failure while writing an array where an XML Schema `choice` element declaration is applied.

Parameters:

- `type`: The type being serialized.
- `identifier`: A name for the `choice` element declaration.

Returns: The newly created exception.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.CreateInvalidEnumValueException(Object, String) method

```csharp
protected Exception CreateInvalidEnumValueException (object value, string typeName);
```

Creates an `InvalidOperationException` for an invalid enumeration value.

Parameters:

- `value`: An object that represents the invalid enumeration.
- `typeName`: The XML type name.

Returns: The newly created exception.

To be added.

## XmlSerializationWriter.CreateMismatchChoiceException(String, String, String) method

```csharp
protected Exception CreateMismatchChoiceException (string value, string elementName, string enumValue);
```

Creates an `InvalidOperationException` that indicates that a value for an XML element does not match an enumeration type.

Parameters:

- `value`: The value that is not valid.
- `elementName`: The name of the XML element with an invalid value.
- `enumValue`: The valid value.

Returns: The newly created exception.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.CreateUnknownAnyElementException(String, String) method

```csharp
protected Exception CreateUnknownAnyElementException (string name, string ns);
```

Creates an `InvalidOperationException` that indicates that an XML element that should adhere to the XML Schema `any` element declaration cannot be processed.

Parameters:

- `name`: The XML element that cannot be processed.
- `ns`: The namespace of the XML element.

Returns: The newly created exception.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.CreateUnknownTypeException(Object) method

```csharp
protected Exception CreateUnknownTypeException (object o);
```

Creates an `InvalidOperationException` that indicates that a type being serialized is not being used in a valid manner or is unexpectedly encountered.

Parameters:

- `o`: The object whose type cannot be serialized.

Returns: The newly created exception.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.CreateUnknownTypeException(Type) method

```csharp
protected Exception CreateUnknownTypeException (Type type);
```

Creates an `InvalidOperationException` that indicates that a type being serialized is not being used in a valid manner or is unexpectedly encountered.

Parameters:

- `type`: The type that cannot be serialized.

Returns: The newly created exception.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.FromByteArrayBase64(Byte[]) method

```csharp
protected static byte[] FromByteArrayBase64 (byte[] value);
```

Processes a base-64 byte array.

Parameters:

- `value`: A base-64 `Byte` array.

Returns: The same byte array that was passed in as an argument.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

Rather than return a string as other similar "from" methods, the static `XmlSerializationWriter.FromByteArrayBase64` method returns the original `byte[]` object to improve performance and conserve memory.

## XmlSerializationWriter.FromByteArrayHex(Byte[]) method

```csharp
protected static string? FromByteArrayHex (byte[]? value);
```

Produces a string from an input hexadecimal byte array.

Parameters:

- `value`: A hexadecimal byte array to translate to a string.

Returns: The byte array value converted to a string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromByteArrayHex` method is static.

## XmlSerializationWriter.FromChar(Char) method

```csharp
protected static string FromChar (char value);
```

Produces a string from an input `Char`.

Parameters:

- `value`: A `Char` to translate to a string.

Returns: The `Char` value converted to a string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromChar` method is static.

## XmlSerializationWriter.FromDate(DateTime) method

```csharp
protected static string FromDate (DateTime value);
```

Produces a string from a `DateTime` object.

Parameters:

- `value`: A `DateTime` to translate to a string.

Returns: A string representation of the `DateTime` that shows the date but no time.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromDate` method is static.

## XmlSerializationWriter.FromDateOnly(DateOnly) method

```csharp
protected static string FromDateOnly (DateOnly value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## XmlSerializationWriter.FromDateTime(DateTime) method

```csharp
protected static string FromDateTime (DateTime value);
```

Produces a string from an input `DateTime`.

Parameters:

- `value`: A `DateTime` to translate to a string.

Returns: A string representation of the `DateTime` that shows the date and time.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromDateTime` method is static.

## XmlSerializationWriter.FromEnum(Int64, String[], Int64[]) method

```csharp
protected static string FromEnum (long value, string[] values, long[] ids);
```

Produces a string that consists of delimited identifiers that represent the enumeration members that have been set.

Parameters:

- `value`: The enumeration value as a series of bitwise `OR` operations.
- `values`: The enumeration's name values.
- `ids`: The enumeration's constant values.

Returns: A string that consists of delimited identifiers, where each represents a member from the set enumerator list.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromEnum` method is static.

## XmlSerializationWriter.FromEnum(Int64, String[], Int64[], String) method

```csharp
protected static string FromEnum (long value, string[] values, long[] ids, string typeName);
```

Takes a numeric enumeration value and the names and constants from the enumerator list for the enumeration and returns a string that consists of delimited identifiers that represent the enumeration members that have been set.

Parameters:

- `value`: The enumeration value as a series of bitwise `OR` operations.
- `values`: The values of the enumeration.
- `ids`: The constants of the enumeration.
- `typeName`: The name of the type.

Returns: A string that consists of delimited identifiers, where each item is one of the values set by the bitwise operation.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.
