---
title: "XmlRootAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlRootAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlRootAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlRootAttribute : Attribute
```

Controls XML serialization of the attribute target as an XML root element.

#### Remarks
The `XmlRootAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object. For a complete list of similar attributes, see Attributes That Control XML Serialization.

You can apply the `XmlRootAttribute` to a class, structure, enumeration, or interface. You can also apply the attribute to the return value of an XML Web service method.

Every XML document must have a single root element that contains all the other elements. The `XmlRootAttribute` allows you to control how the `XmlSerializer` generates the root element by setting certain properties. For example, specify the name of the generated XML element by setting the `ElementName` property.

For more information about using attributes, see Attributes.

> **Note:**
> You can use the word `XmlRoot` in your code instead of the longer `XmlRootAttribute`.

#### Examples
The following example applies the `XmlRootAttribute` to a class. The attribute specifies the element name, namespace, and whether the element is qualified, and whether the `xsi:nil` attribute is generated if the class is set to `null`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlRootAttribute/Overview/source.cs._

## XmlRootAttribute.XmlRootAttribute() constructor

```csharp
public XmlRootAttribute ();
```

Initializes a new instance of the `XmlRootAttribute` class.

#### Examples
The following example creates an instance of an `XmlRootAttribute` and assigns it to the `XmlRoot` property of an `XmlAttributes` object. When the `XmlSerializer` serializes the `MyClass` object, it uses the `XmlRootAttribute` object to override the default root element.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlRootAttribute/.ctor/source.cs._

## XmlRootAttribute.XmlRootAttribute(String) constructor

```csharp
public XmlRootAttribute (string elementName);
```

Initializes a new instance of the `XmlRootAttribute` class and specifies the name of the XML root element.

Parameters:

- `elementName`: The name of the XML root element.

#### Examples
The following example creates an instance of the XmlRootAttribute and uses it to override the serialization of an instance of a class named "Student".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlRootAttribute/.ctor/xmlrootattribute_constructor.cs._

## XmlRootAttribute.DataType property

```csharp
public string DataType { get; set; }
```

Gets or sets the XSD data type of the XML root element.

Returns: An XSD (XML Schema Document) data type.

#### Remarks
The following table lists the XSD simple data types with their .NET equivalents.

For the XSD `base64Binary` and `hexBinary` data types, use an array of `Byte` structures, and apply a `XmlRootAttribute` with the `DataType` property set to "base64Binary" or "hexBinary", as appropriate. For the XSD `time` and `date` data types, use the `DateTime` type and apply the `XmlRootAttribute` with the `DataType` set to "date" or "time".

For every XSD type that is mapped to a string, apply the `XmlRootAttribute` with its `DataType` property set to the XSD type. However, this does not change the serialization format, only the schema for the member.

> **Note:**
> The property is case-sensitive, so you must set it exactly to one of the XSD data types.

> **Note:**
> Passing binary data as an XML element is more efficient than passing it as an XML attribute.

For more information about XML data types, see the World Wide Web Consortium document named XML Schema Part 2: Datatypes.

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
|recurringDate|`String`|
|duration|`String`|
|string|`String`|
|short|`Int16`|
|time|`DateTime`|
|token|`String`|
|unsignedByte|`Byte`|
|unsignedInt|`UInt32`|
|unsignedLong|`UInt64`|
|unsignedShort|`UInt16`|

## XmlRootAttribute.ElementName property

```csharp
public string ElementName { get; set; }
```

Gets or sets the name of the XML element that is generated and recognized by the `XmlSerializer` class's `XmlSerializer.Serialize` and `XmlSerializer.Deserialize` methods, respectively.

Returns: The name of the XML root element that is generated and recognized in an XML-document instance. The default is the name of the serialized class.

#### Remarks
Specify an `ElementName` if you want the name of the generated XML element to differ from the class name.

#### Examples
The following example creates an instance of the `XmlRootAttribute` class and sets the `ElementName` property to a new value. The object is then used to create an `XmlAttributeOverrides` object used to override the serialization of an object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlRootAttribute/ElementName/xmlrootattribute_elementname.cs._

## XmlRootAttribute.IsNullable property

```csharp
public bool IsNullable { get; set; }
```

Gets or sets a value that indicates whether the `XmlSerializer` must serialize a member that is set to `null` into the `xsi:nil` attribute set to `true`.

Returns: `true` if the `XmlSerializer` generates the `xsi:nil` attribute; otherwise, `false`.

#### Remarks
The XML schema specification for structures allows an XML document to explicitly signal that an element's content is missing. Such an element contains the attribute `xsi:nil` set to `true`. For more information, see XML Schema Part 1: Structures Second Edition.

If the `IsNullable` property is set to `true`, the `xsi:nil` attribute is generated as shown in the following XML:

```
<?xml version="1.0" encoding="utf-8"?>

```

If the `IsNullable` property is `false`, an empty element is created as shown in the following code:

```
<?xml version="1.0" encoding="utf-8"?>

```

#### Examples
The following example serializes a class named `Group`. The example applies the `XmlRootAttribute` to the class, and sets the `IsNullable` property to `false`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlRootAttribute/IsNullable/source.cs._

## XmlRootAttribute.Namespace property

```csharp
public string? Namespace { get; set; }
```

Gets or sets the namespace for the XML root element.

Returns: The namespace for the XML element.

#### Remarks
The `Namespace` property conforms to the World Wide Web Consortium specification named Namespaces in XML.

To create prefixed namespaces in the XML document, create an `XmlSerializerNamespaces` object that contains all the prefix-namespace pairs. The namespace you set for each `XmlArrayAttribute` must be contained in the `XmlSerializerNamespaces` object. When the `XmlSerializer` generates the document, it correctly prefixes the element name for each array item.

#### Examples
The following example applies the `XmlRootAttribute` to a class and sets the `Namespace` property.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlRootAttribute/Namespace/source.cs._
