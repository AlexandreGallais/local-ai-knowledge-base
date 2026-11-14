---
title: "XmlAttributeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAttributeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttributeAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlAttributeAttribute : Attribute
```

Specifies that the `XmlSerializer` must serialize the class member as an XML attribute.

#### Remarks
The `XmlAttributeAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes, or deserializes, an object. For a complete list of similar attributes, see Attributes That Control XML Serialization.

When applied to a public field or property, the `XmlAttributeAttribute` informs the `XmlSerializer` to serialize the member as an XML attribute. By default, the `XmlSerializer` serializes public fields and properties as XML elements.

You can assign the `XmlAttributeAttribute` only to public fields or public properties that return a value (or array of values) that can be mapped to one of the XML Schema definition language (XSD) simple types (including all built-in datatypes derived from the XSD `anySimpleType` type). The possible types include any that can be mapped to the XSD simple types, including `Guid`, `Char`, and enumerations. See the `DataType` property for a list of XSD types and how they are mapped to.NET data types.

There are two special attributes that can be set with the `XmlAttributeAttribute` : the `xml:lang` (specifies language) and `xml:space` (specifies how to handle white space) attributes. These attributes are intended to convey information that is relevant only to an application processing the XML. Examples of setting these are shown in the following code.

```csharp
[XmlAttribute("xml:lang")]
 public string Lang;
 // Set this to 'default' or 'preserve'.
 [XmlAttribute("space",
 Namespace = "http://www.w3.org/XML/1998/namespace")]
 public string Space
```

```vb
 <XmlAttribute("xml:lang")> _
 Public Lang As String
 ' Set this to 'default' or 'preserve'.
 <XmlAttribute("space", _
 Namespace:= "http://www.w3.org/XML/1998/namespace")> _
 Public Space As String
```

For more information about using attributes, see Attributes.

> **Note:**
> You can use the word `XmlAttribute` in your code instead of the longer `XmlAttributeAttribute`.

#### Examples
The following example serializes a class that contains several fields to which the `XmlAttributeAttribute` is applied.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeAttribute/Overview/source.cs._

## XmlAttributeAttribute.XmlAttributeAttribute() constructor

```csharp
public XmlAttributeAttribute ();
```

Initializes a new instance of the `XmlAttributeAttribute` class.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeAttribute/.ctor/xmlattributeattribute_ctr1_2.cs._

## XmlAttributeAttribute.XmlAttributeAttribute(String) constructor

```csharp
public XmlAttributeAttribute (string? attributeName);
```

Initializes a new instance of the `XmlAttributeAttribute` class and specifies the name of the generated XML attribute.

Parameters:

- `attributeName`: The name of the XML attribute that the `XmlSerializer` generates.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeAttribute/.ctor/xmlattributeattribute_ctr1_2.cs._

## XmlAttributeAttribute.XmlAttributeAttribute(Type) constructor

```csharp
public XmlAttributeAttribute (Type? type);
```

Initializes a new instance of the `XmlAttributeAttribute` class.

Parameters:

- `type`: The `Type` used to store the attribute.

To be added.

## XmlAttributeAttribute.XmlAttributeAttribute(String, Type) constructor

```csharp
public XmlAttributeAttribute (string? attributeName, Type? type);
```

Initializes a new instance of the `XmlAttributeAttribute` class.

Parameters:

- `attributeName`: The name of the XML attribute that is generated.
- `type`: The `Type` used to store the attribute.

To be added.

## XmlAttributeAttribute.AttributeName property

```csharp
public string AttributeName { get; set; }
```

Gets or sets the name of the XML attribute.

Returns: The name of the XML attribute. The default is the member name.

#### Remarks
Use the `AttributeName` property to specify an XML attribute name when the default value cannot be used. For example, if the XML attribute name is invalid as a member identifier, you can use a valid name for the identifier while setting the `AttributeName` to an invalid name.

#### Examples
The following example sets the `AttributeName` property of an `XmlAttributeAttribute`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeAttribute/AttributeName/source.cs._

## XmlAttributeAttribute.DataType property

```csharp
public string DataType { get; set; }
```

Gets or sets the XSD data type of the XML attribute generated by the `XmlSerializer`.

Returns: An XSD (XML Schema Document) data type.

#### Remarks
The following table lists the XSD simple data types with their.NET equivalents.

For the XSD `base64Binary` and `hexBinary` data types, use an array of `Byte` structures, and apply a `XmlArrayItemAttribute` with the `DataType` property set to "base64Binary" or "hexBinary", as appropriate. For the XSD `time` and `date` data types, use the `DateTime` type and apply the `XmlAttributeAttribute` with the `DataType` set to "date" or "time".

For every XSD type that is mapped to a string, apply the `XmlAttributeAttribute` with its `DataType` property set to the XSD type. However, this does not change the serialization format, only the schema for the member.

> **Note:**
> The property is case-sensitive, so you must set it exactly to one of the XSD data types.

> **Note:**
> Passing binary data as an XML element is more efficient than passing it as an XML attribute.

For more information about XML data types, see the XML Schema Part 2: DataTypes document from the World Wide Web Consortium.

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
The following example applies the `XmlAttributeAttribute` to two members, and sets the `DataType` property set to different values.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeAttribute/DataType/source.cs._

## XmlAttributeAttribute.Form property

```csharp
public System.Xml.Schema.XmlSchemaForm Form { get; set; }
```

Gets or sets a value that indicates whether the XML attribute name generated by the `XmlSerializer` is qualified.

Returns: One of the `XmlSchemaForm` values. The default is `XmlForm.None`.

#### Remarks
The `Form` property determines whether an XML element is qualified or unqualified. The `Form` property conforms to the 1999 http://www.w3.org specification `Namespaces in XML`.

If the `Namespace` property is set to any value, attempting to set the `Form` property to `XmlSchemaForm.Unqualified` throws an exception.

The default setting, `XmlSchemaForm.None`, instructs the `XmlSerializer` to check the schema for the XML document to determine whether the namespace is qualified. If the schema does not specify a value for an individual element or attribute, the `XmlSerializer` uses the `elementFormDefault` and `attributeFormDefault` values to determine whether an element or attribute is qualified. The following XML code shows a schema:

```xml
<schema elementFormDefault="qualified"
attributeFormDefault="unqualified"... >
   
   
</schema>
```

When the `XmlSerializer` reads the schema, the `Form` value for both the `Name` and `Number` is `XmlSchemaForm.None`, but the `Name` element is qualified, while the `Number` element is unqualified.

#### Examples
The following example applies the `XmlAttributeAttribute` to two fields contained in a class.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeAttribute/Form/source.cs._

## XmlAttributeAttribute.Namespace property

```csharp
public string? Namespace { get; set; }
```

Gets or sets the XML namespace of the XML attribute.

Returns: The XML namespace of the XML attribute.

#### Remarks
The `Namespace` property conforms to the http://www.w3.org specification `Namespaces in XML`.

To create namespaces that are associated with prefixes, you must create an `XmlSerializerNamespaces` object that contains the namespaces and prefixes used in the XML document. The namespace you set for each `XmlAttributeAttribute` must match one of the namespaces in the `XmlSerializerNamespaces` object. When the `XmlSerializer` generates the XML code, it correctly prefixes each attribute name.

#### Examples
The following example applies the `XmlAttributeAttribute` to two fields contained in a class. The example sets the `Namespace` property for each attribute to a value different from the member identifier.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeAttribute/Namespace/source.cs._

## XmlAttributeAttribute.Type property

```csharp
public Type? Type { get; set; }
```

Gets or sets the complex type of the XML attribute.

Returns: The type of the XML attribute.

To be added.
