---
title: "XmlElementAttribute class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlElementAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlElementAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlElementAttribute : Attribute
```

Indicates that a public field or property represents an XML element when the `XmlSerializer` serializes or deserializes the object that contains it.

#### Remarks
The `XmlElementAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object. For a complete list of similar attributes, see Attributes That Control XML Serialization.

An XML document usually contains XML elements, each of which consists of three parts: an opening tag with possible attributes, a closing tag, and the data between the tags. XML tags can be nested--that is, the data between tags can also be XML elements. This capacity of one element to enclose another allows the document to contain hierarchies of data. An XML element can also include attributes.

Apply the `XmlElementAttribute` to public fields or public read/write properties to control characteristics of the XML elements such as the element name and namespace.

The `XmlElementAttribute` can be applied multiple times to a field that returns an array of objects. The purpose of this is to specify (through the `Type` property) different types that can be inserted into the array. For example, the array in the following C# code accepts both strings and integers.

```
public class Things{
   [XmlElement(Type = typeof(string)),
   XmlElement(Type = typeof(int))]
   public object[] StringsAndInts;
}
```

This results in XML that might resemble the following.

```
<Things>
   <string>Hello</string>
   <int>999</int>
   <string>World</string>
</Things>
```

Note that when you apply the `XmlElementAttribute` multiple times without specifying an `ElementName` property value, the elements are named after the type of the acceptable objects.

If you apply the `XmlElementAttribute` to a field or property that returns an array, the items in the array are encoded as a sequence of XML elements.

In contrast if an `XmlElementAttribute` is not applied to such a field or property, the items in the array are encoded as a sequence of elements, nested under an element named after the field or property. (Use the `XmlArrayAttribute` and `XmlArrayItemAttribute` attributes to control how an array is serialized.)

You can set the `Type` property to specify a type that is derived from the type of the original field or property--that is, the field or property to which you have applied the `XmlElementAttribute`.

If a field or property returns an `ArrayList`, you can apply multiple instances of the `XmlElementAttribute` to the member. For each instance, set the `Type` property to a type of object that can be inserted into the array.

For more information about using attributes, see Attributes.

> **Note:**
> You can use the word `XmlElement` in your code instead of the longer `XmlElementAttribute`.

#### Examples
The following example serializes a class named `Group` and applies the `XmlElementAttribute` to several of its members. The field named `Employees` returns an array of `Employee` objects. In this case, the `XmlElementAttribute` specifies that the resulting XML will not be nested (which is the default behavior of items in an array).

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/Overview/source.cs._

## XmlElementAttribute.XmlElementAttribute() constructor

```csharp
public XmlElementAttribute ();
```

Initializes a new instance of the `XmlElementAttribute` class.

#### Examples
The following example applies the `XmlElementAttribute` to a class.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/.ctor/source.cs._

## XmlElementAttribute.XmlElementAttribute(String) constructor

```csharp
public XmlElementAttribute (string? elementName);
```

Initializes a new instance of the `XmlElementAttribute` class and specifies the name of the XML element.

Parameters:

- `elementName`: The XML element name of the serialized member.

#### Remarks
By default, the `XmlSerializer` uses the member name as the XML element name when serializing a class instance. For example, a field named `Vehicle` generates an XML element named `Vehicle`. However if you need a different element, such as `Cars`, pass it in the `elementName` parameter.

#### Examples
The following example shows a simple class that contains a single field named `Vehicles`. The example applies the `XmlElementAttribute` to the field and includes the `elementName` parameter, thereby instructing the `XmlSerializer` to generate XML elements named "Cars" rather than "Vehicles".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/.ctor/source1.cs._

## XmlElementAttribute.XmlElementAttribute(Type) constructor

```csharp
public XmlElementAttribute (Type? type);
```

Initializes a new instance of the `XmlElementAttribute` class and specifies a type for the member to which the `XmlElementAttribute` is applied. This type is used by the `XmlSerializer` when serializing or deserializing object that contains it.

Parameters:

- `type`: The `Type` of an object derived from the member's type.

#### Remarks
Use the `type` parameter to specify a type that is derived from a base class. For example, suppose a property named `MyAnimal` returns an `Animal` object. You want to enhance the object, so you create a new class named `Mammal` that inherits from the `Animal` class. To instruct the `XmlSerializer` to accept the `Mammal` class when it serializes the `MyAnimal` property, pass the `Type` of the `Mammal` class to the constructor.

#### Examples
The following example serializes a class named `Orchestra` that contains a single field named `Instruments`, which returns an array of `Instrument` objects. A second class named `Brass` inherits from the `Instrument` class. The example applies the `XmlElementAttribute` to the `Instruments` field, and specifies the `Brass` type, allowing the `Instruments` field to accept `Brass` objects. The example also specifies the name of the XML element by setting the `ElementName` property.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/.ctor/source2.cs._

## XmlElementAttribute.XmlElementAttribute(String, Type) constructor

```csharp
public XmlElementAttribute (string? elementName, Type? type);
```

Initializes a new instance of the `XmlElementAttribute` and specifies the name of the XML element and a derived type for the member to which the `XmlElementAttribute` is applied. This member type is used when the `XmlSerializer` serializes the object that contains it.

Parameters:

- `elementName`: The XML element name of the serialized member.
- `type`: The `Type` of an object derived from the member's type.

#### Remarks
By default, the `XmlSerializer` uses the member name as the XML element name when serializing a class instance. For example, a field named `Vehicle` generates an XML element named `Vehicle`. However, if you need a different element, such as `Cars`, pass it in the `elementName` parameter.

Use the `type` parameter to specify a type that is derived from a base class. For example, suppose a property named `MyAnimal` returns an `Animal` object. You want to enhance the object, so you create a new class named `Mammal` that inherits from the `Animal` class. To instruct the `XmlSerializer` to accept the `Mammal` class when it serializes the `MyAnimal` property, pass the `Type` of the `Mammal` class to the constructor.

#### Examples
The following example serializes a class named `Orchestra` that contains a single field named `Instruments`, which returns an array of `Instrument` objects. A second class named `Brass` inherits from the `Instrument` class. The example applies the `XmlElementAttribute` to the `Instruments` field, and specifies the `Brass` type, allowing the `Instruments` field to accept `Brass` objects. The example also specifies the name of the XML element by setting the `ElementName` property.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/.ctor/source2.cs._

## XmlElementAttribute.DataType property

```csharp
public string DataType { get; set; }
```

Gets or sets the XML Schema definition (XSD) data type of the XML element generated by the `XmlSerializer`.

Returns: An XML Schema data type.

Exceptions:

- `Exception`: The XML Schema data type you have specified cannot be mapped to the.NET data type.

#### Remarks
The following table lists the XML Schema simple data types with their.NET equivalents.

For the XML Schema `base64Binary` and `hexBinary` data types, use an array of `Byte` structures, and apply a `XmlElementAttribute` with the `DataType` set to "base64Binary" or "hexBinary", as appropriate. For the XML Schema `time` and `date` data types, use the `DateTime` type and apply the `XmlElementAttribute` with the `DataType` set to "date" or "time".

For every XML Schema type that is mapped to a string, apply the `XmlElementAttribute` with its `DataType` property set to the XML Schema type. It is possible that this can change the serialization format, not only the schema for the member.

> **Note:**
> The property is case-sensitive, so you must set it exactly to one of the XML Schema data types.

> **Note:**
> Passing binary data as an XML element is more efficient than passing it as an XML Schema attribute.

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
The following example serializes a class named `Group` that contains a field named `ExtraInfo`, which returns an `ArrayList`. The example applies two instances of the `XmlElementAttribute` to the field and specifies different `DataType` values for each instance. Each instance enables the `XmlSerializer` to serialize the specified types inserted into the array.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/DataType/source.cs._

## XmlElementAttribute.ElementName property

```csharp
public string ElementName { get; set; }
```

Gets or sets the name of the generated XML element.

Returns: The name of the generated XML element. The default is the member identifier.

#### Remarks
Specify an `ElementName` if you want the name of the generated XML element to differ from the member's identifier.

You can set the same `ElementName` value to more than one class member if the generated XML document uses XML namespaces to distinguish between the identically named members. For details on how to use namespaces and prefixed names in the XML document, see the `XmlSerializerNamespaces` class.

#### Examples
The following example sets the `ElementName` property of an `XmlElementAttribute` to a new value.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/ElementName/source.cs._

## XmlElementAttribute.Form property

```csharp
public System.Xml.Schema.XmlSchemaForm Form { get; set; }
```

Gets or sets a value that indicates whether the element is qualified.

Returns: One of the `XmlSchemaForm` values. The default is `XmlSchemaForm.None`.

#### Remarks
The `Form` property determines whether an XML element is qualified or unqualified. The `Form` property conforms to the World Wide Web Consortium 1999 specification, Namespaces in XML.

If the `Namespace` property is set to any value, attempting to set the `Form` property to `XmlSchemaForm.Unqualified` throws an exception. The default setting, `XmlSchemaForm.None`, instructs the `XmlSerializer` to check the schema for the XML document to determine whether the namespace is qualified. If the schema does not specify a value for an individual element or attribute, the `XmlSerializer` uses the `elementFormDefault` and `attributeFormDefault` values to determine whether an element or attribute is qualified. The following XML code shows a schema:

```
<schema elementFormDefault="qualified"
attributeFormDefault="unqualified"... >
 
 
</schema>
```

When the `XmlSerializer` reads the schema, the `Form` value for both the `Name` and `Number` is `XmlSchemaForm.None`, but the `Name` element is qualified, while the `Number` element is unqualified.

#### Examples
The following example sets the `Form` property to `XmlSchemaForm.Unqualified`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/Form/source.cs._
