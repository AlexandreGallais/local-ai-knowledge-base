---
title: "SoapElementAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/SoapElementAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SoapElementAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class SoapElementAttribute : Attribute
```

Specifies that the public member value be serialized by the `XmlSerializer` as an encoded SOAP XML element.

#### Remarks
The `SoapElementAttribute` class belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object as encoded SOAP XML. The resulting XML conforms to section 5 of the World Wide Web Consortium document, Simple Object Access Protocol (SOAP) 1.1. For a complete list of similar attributes, see Attributes That Control Encoded SOAP Serialization.

To serialize an object as an encoded SOAP message, you must construct the `XmlSerializer` using an `XmlTypeMapping` created with the `SoapReflectionImporter.ImportTypeMapping` method of the `SoapReflectionImporter` class.

Apply the `SoapElementAttribute` to a public field to direct the `XmlSerializer` to serialize the field as an encoded SOAP XML element.

For more information about using attributes, see Attributes.

#### Examples
The following example serializes an instance of a class named `Transportation` that contains a field named `Vehicle`. A `SoapElementAttribute` is applied to the field. When the field is serialized, the XML element name is "Wheels" instead of "Vehicle". The `SerializeOverride` method creates a `SoapElementAttribute` and sets the `SoapElement` property of a `SoapAttributes` to the `SoapElementAttribute`. The `SoapAttributes` is added to a `SoapAttributeOverrides` that is used to create an `XmlTypeMapping`. An `XmlSerializer` is constructed with the `XmlTypeMapping`, and an instance of the `Transportation` class is again serialized. Because the `SoapElementAttribute` is used to override the serialization, the generated XML element name is now "Truck" instead of "Wheels".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapElement/soapelementoverrides.cs._

## SoapElementAttribute.SoapElementAttribute() constructor

```csharp
public SoapElementAttribute ();
```

Initializes a new instance of the `SoapElementAttribute` class.

#### Examples
The following example serializes an instance of a class named `Transportation` that contains a field named `Vehicle`. A `SoapElementAttribute` is applied to the field. When the field is serialized, the XML element name is "Wheels" instead of "Vehicle". The `SerializeOverride` method creates a `SoapElementAttribute` and sets the `SoapElement` property of a `SoapAttributes` to the `SoapElementAttribute`. The `SoapAttributes` is added to a `SoapAttributeOverrides` that is used to create an `XmlTypeMapping`. An `XmlSerializer` is constructed with the `XmlTypeMapping`, and an instance of the `Transportation` class is again serialized. Because the `SoapElementAttribute` is used to override the serialization, the generated XML element name is now "Truck" instead of "Wheels".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapElement/soapelementoverrides.cs._

## SoapElementAttribute.SoapElementAttribute(String) constructor

```csharp
public SoapElementAttribute (string? elementName);
```

Initializes a new instance of the `SoapElementAttribute` class and specifies the name of the XML element.

Parameters:

- `elementName`: The XML element name of the serialized member.

#### Examples
The following example serializes an instance of a class named `Transportation` that contains a field named `Vehicle`. A `SoapElementAttribute` is applied to the field. When the field is serialized, the XML element name is "Wheels" instead of "Vehicle". The `SerializeOverride` method creates a `SoapElementAttribute` and sets the `SoapElement` property of a `SoapAttributes` to the `SoapElementAttribute`. The `SoapAttributes` is added to a `SoapAttributeOverrides` that is used to create an `XmlTypeMapping`. An `XmlSerializer` is constructed with the `XmlTypeMapping`, and an instance of the `Transportation` class is again serialized. Because the `SoapElementAttribute` is used to override the serialization, the generated XML element name is now "Truck" instead of "Wheels".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapElement/soapelementoverrides.cs._

## SoapElementAttribute.DataType property

```csharp
public string DataType { get; set; }
```

Gets or sets the XML Schema definition language (XSD) data type of the generated XML element.

Returns: One of the XML Schema data types.

#### Remarks
The following table lists the XML Schema simple data types with their .NET equivalents.

For the XML Schema `base64Binary` and `hexBinary` data types, use an array of `Byte` structures, and apply a `SoapElementAttribute` with the `DataType` set to "base64Binary" or "hexBinary", as appropriate. For the XML Schema `time` and `date` data types, use the `DateTime` type and apply the `SoapElementAttribute` with the `DataType` set to "date" or "time".

For every XML Schema data type that is mapped to a string, apply the `SoapElementAttribute` with its `DataType` property set to the XML Schema type. Note that this does not change the serialization format, only the schema for the member.

> **Note:**
> The property is case-sensitive, so you must set it exactly to one of the XML Schema data types.

> **Note:**
> Passing binary data as an XML element is more efficient than passing it as an XML attribute.

For more information about XML data types, see the World Wide Web Consortium document, XML Schema Part 2: Datatypes.

|XSD data type|.NET data type|
|-------------------|--------------------|
|anyURI|`String`|
|base64Binary|Array of `Byte` objects|
|boolean|`Boolean`|
|byte|`SByte`|
|date|`DateTime`|
|dateTime|`DateTime`|
|decimal|`Decimal`|
|double|`Double`|
|ENTITY|`String`|
|ENTITIES|`String`|
|float|`Single`|
|gDay|`String`|
|gMonth|`String`|
|gMonthDay|`String`|
|gYear|`String`|
|gYearMonth|`String`|
|hexBinary|Array of `Byte` objects|
|ID|`String`|
|IDREF|`String`|
|IDREFS|`String`|
|int|`Int32`|
|integer|`String`|
|language|`String`|
|long|`Int64`|
|Name|`String`|
|NCName|`String`|
|negativeInteger|`String`|
|NMTOKEN|`String`|
|NMTOKENS|`String`|
|normalizedString|`String`|
|nonNegativeInteger|`String`|
|nonPositiveInteger|`String`|
|NOTATION|`String`|
|positiveInteger|`String`|
|QName|`XmlQualifiedName`|
|duration|`String`|
|string|`String`|
|short|`Int16`|
|time|`DateTime`|
|token|`String`|
|unsignedByte|`Byte`|
|unsignedInt|`UInt32`|
|unsignedLong|`UInt64`|
|unsignedShort|`UInt16`|

#### Examples
The following example serializes an instance of a class named `Transportation` that contains a field named `Vehicle`. A `SoapElementAttribute` is applied to the field. When the field is serialized, the XML element name is "Wheels" instead of "Vehicle". The `SerializeOverride` method creates a `SoapElementAttribute` and sets the `SoapElement` property of a `SoapAttributes` to the `SoapElementAttribute`. The `SoapAttributes` is added to a `SoapAttributeOverrides` that is used to create an `XmlTypeMapping`. An `XmlSerializer` is constructed with the `XmlTypeMapping`, and an instance of the `Transportation` class is again serialized. Because the `SoapElementAttribute` is used to override the serialization, the generated XML element name is now "Truck" instead of "Wheels".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapElement/soapelementoverrides.cs._

## SoapElementAttribute.ElementName property

```csharp
public string ElementName { get; set; }
```

Gets or sets the name of the generated XML element.

Returns: The name of the generated XML element. The default is the member identifier.

#### Examples
The following example serializes an instance of a class named `Transportation` that contains a field named `Vehicle`. A `SoapElementAttribute` is applied to the field. When the field is serialized, the XML element name is "Wheels" instead of "Vehicle". The `SerializeOverride` method creates a `SoapElementAttribute` and sets the `SoapElement` property of a `SoapAttributes` to the `SoapElementAttribute`. The `SoapAttributes` is added to a `SoapAttributeOverrides` that is used to create an `XmlTypeMapping`. An `XmlSerializer` is constructed with the `XmlTypeMapping`, and an instance of the `Transportation` class is again serialized. Because the `SoapElementAttribute` is used to override the serialization, the generated XML element name is now "Truck" instead of "Wheels".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapElement/soapelementoverrides.cs._

## SoapElementAttribute.IsNullable property

```csharp
public bool IsNullable { get; set; }
```

Gets or sets a value that indicates whether the `XmlSerializer` must serialize a member that has the `xsi:null` attribute set to "1".

Returns: `true` if the `XmlSerializer` generates the `xsi:null` attribute; otherwise, `false`.

#### Remarks
The XML schema specification for structures allows an XML document to explicitly signal that an element's content is missing. Such an element contains the attribute `xsi:null` set to "1". For more information, see the World Wide Web Consortium specification named XML Schema Part 1: Structures.

If the `IsNullable` property is set to `true`, the `xsi:null` attribute is generated for class members that have been set to `null`. For example, if you set a field named `MyStringArray` to `null`, the `XmlSerializer` generates the following XML code.

```

```

If the `IsNullable` property is `false`, no XML element is generated.

> **Note:**
> You cannot apply the `IsNullable` property to a member typed as a value type because a value type cannot contain `null`.
