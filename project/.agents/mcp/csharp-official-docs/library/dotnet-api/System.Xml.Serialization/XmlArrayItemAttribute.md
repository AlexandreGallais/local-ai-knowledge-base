---
title: "XmlArrayItemAttribute class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlArrayItemAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlArrayItemAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlArrayItemAttribute : Attribute
```

Represents an attribute that specifies the derived types that the `XmlSerializer` can place in a serialized array.

#### Remarks
The `XmlArrayItemAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object. For a complete list of similar attributes, see Attributes That Control XML Serialization.

You can apply the `XmlArrayItemAttribute` to any public read/write member that returns an array, or provides access to one. For example, a field that returns an array of objects, a collection, an `ArrayList`, or any class that implements the `IEnumerable` interface.

The `XmlArrayItemAttribute` supports polymorphism--in other words, it allows the `XmlSerializer` to add derived objects to an array. For example, suppose a class named `Mammal` is derived from a base class named `Animal`. Further suppose that a class named `MyAnimals` contains a field that returns an array of `Animal` objects. To allow the `XmlSerializer` to serialize both the `Animal` and `Mammal` type, apply the `XmlArrayItemAttribute` to the field twice, each time specifying one of the two acceptable types.

> **Note:**
> You can apply multiple instances of the `XmlArrayItemAttribute` or `XmlElementAttribute` to specify types of objects that can be inserted into the array.

> **Note:**
> The serialization of a field or property that returns an interface or array of interfaces is not supported.

For more information about using attributes, see Attributes.

> **Note:**
> You can use the word `XmlArrayItem` in your code instead of the longer `XmlArrayItemAttribute`.

#### Examples
The following example serializes a class named `Group` that contains a field named `Employees` that returns an array of `Employee` objects. The example applies the `XmlArrayItemAttribute` to the field, thereby instructing the `XmlSerializer` that it can insert objects of both the base class (`Employee`) type and derived class type (`Manager`) into the serialized array.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/Overview/source.cs._

## XmlArrayItemAttribute.XmlArrayItemAttribute() constructor

```csharp
public XmlArrayItemAttribute ();
```

Initializes a new instance of the `XmlArrayItemAttribute` class.

#### Examples
The following example serializes a class named `Transportation` that contains a field named `MyVehicles` that returns an array of `Vehicle` objects. The example applies the `XmlArrayItemAttribute` to the field, allowing the `XmlSerializer` to insert instances of the `Car` class, which is derived from the `Vehicle` class, into the array.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/.ctor/source.cs._

## XmlArrayItemAttribute.XmlArrayItemAttribute(String) constructor

```csharp
public XmlArrayItemAttribute (string? elementName);
```

Initializes a new instance of the `XmlArrayItemAttribute` class and specifies the name of the XML element generated in the XML document.

Parameters:

- `elementName`: The name of the XML element.

#### Remarks
This overload sets the `ElementName` property.

Use this overload if you want the name of the generated XML element to differ from the member's identifier.

An XML document that includes namespaces can contain more than one version of an element name. For details, see the `ElementName` property.

#### Examples
The following example serializes a class named `Transportation` that contains a field named `MyVehicles` that returns an array of `Vehicle` objects. The example applies the `XmlArrayItemAttribute` to the field, allowing the `XmlSerializer` to insert instances of the `Car` class, which is derived from the `Vehicle` class, into the array. While applying the attribute, the example sets the `ElementName` property using the `elementName` parameter.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/.ctor/source1.cs._

## XmlArrayItemAttribute.XmlArrayItemAttribute(Type) constructor

```csharp
public XmlArrayItemAttribute (Type? type);
```

Initializes a new instance of the `XmlArrayItemAttribute` class and specifies the `Type` that can be inserted into the serialized array.

Parameters:

- `type`: The `Type` of the object to serialize.

#### Examples
The following example serializes a class named `Transportation` that contains a field named `MyVehicles` that returns an array of `Vehicle` objects. The example applies the `XmlArrayItemAttribute` to the field, allowing the `XmlSerializer` to insert instances of the `Car` class, which is derived from the `Vehicle` class, into the array. While applying the attribute, the example sets the `Type` property using the `type` parameter.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/.ctor/source2.cs._

## XmlArrayItemAttribute.XmlArrayItemAttribute(String, Type) constructor

```csharp
public XmlArrayItemAttribute (string? elementName, Type? type);
```

Initializes a new instance of the `XmlArrayItemAttribute` class and specifies the name of the XML element generated in the XML document and the `Type` that can be inserted into the generated XML document.

Parameters:

- `elementName`: The name of the XML element.
- `type`: The `Type` of the object to serialize.

#### Remarks
This overload sets the `ElementName` and the `Type` properties.

Use this overload if you want the name of the generated XML element to differ from the member's identifier.

An XML document that includes namespaces can contain more than one version of an element name. For details, see the `ElementName` property.

#### Examples
The following example serializes a class named `Transportation` that contains a field named `MyVehicles` that returns an array of `Vehicle` objects. The example applies the `XmlArrayItemAttribute` to the field, allowing the `XmlSerializer` to insert instances of the `Car` class, which is derived from the `Vehicle` class, into the array. While applying the attribute, the example sets the `ElementName` property using the `elementName` parameter, and the `Type` property using the `type` parameter.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/.ctor/source3.cs._

## XmlArrayItemAttribute.DataType property

```csharp
public string DataType { get; set; }
```

Gets or sets the XML data type of the generated XML element.

Returns: An XML schema definition (XSD) data type.

#### Remarks
The following table lists the XML Schema simple data types with their .NET equivalents.

For the XML Schema `base64Binary` and `hexBinary` data types, use an array of `Byte` objects, and apply an `XmlArrayItemAttribute` with the `DataType` property set to "base64Binary" or "hexBinary", as appropriate. For the XML Schema `time` and `date` data types, use the `DateTime` type and apply the `XmlArrayItemAttribute` with the `DataType` set to "date" or "time".

For every XML Schema type that is mapped to a string, apply the `XmlArrayItemAttribute` with its `DataType` property set to the XML Schema type. However, this does not change the serialization format, only the schema for the member.

> **Note:**
> The property is case-sensitive, so you must set it exactly to one of the XML Schema data types.

> **Note:**
> Passing binary data as an XML element is more efficient then passing it as an XML attribute.

For more information about XML Schema data types, see the World Wide Web Consortium document XML Schema Part 2: Datatypes.

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
The following example serializes a class named `PurchaseOrder`. Several instances of the `XmlArrayItemAttribute` class are applied to three members, and the `DataType` property for each instance is set to a type allowed in the array.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/DataType/arrayitem.cs._

## XmlArrayItemAttribute.ElementName property

```csharp
public string ElementName { get; set; }
```

Gets or sets the name of the generated XML element.

Returns: The name of the generated XML element. The default is the member identifier.

#### Remarks
Specify an `ElementName` if you want the name of the generated XML element to differ from the member's identifier.

You can set the same `ElementName` value to more than one class member if the generated XML document uses XML namespaces to distinguish between identically named members. For details about how to use namespaces and prefixed names in the XML document, see the `XmlSerializerNamespaces` class.

#### Examples
The following example sets the `ElementName` property for the `Vehicle` and `Car` class--thereby changing the names of XML elements that the `XmlSerializer` generates for those classes.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/ElementName/source.cs._

## XmlArrayItemAttribute.Form property

```csharp
public System.Xml.Schema.XmlSchemaForm Form { get; set; }
```

Gets or sets a value that indicates whether the name of the generated XML element is qualified.

Returns: One of the `XmlSchemaForm` values. The default is `XmlSchemaForm.None`.

Exceptions:

- `Exception`: The `XmlArrayItemAttribute.Form` property is set to `XmlSchemaForm.Unqualified` and a `XmlArrayItemAttribute.Namespace` value is specified.

#### Remarks
The `Form` property determines whether an XML element name is qualified, based on the World Wide Web Consortium specification Namespaces in XML.

If the `Namespace` property is set to any value, attempting to set the `Form` property to `XmlSchemaForm.Unqualified` throws an exception.

The default value, `XmlSchemaForm.None`, instructs the `XmlSerializer` to check the schema for the XML document to determine whether the namespace is qualified. For elements, the `XmlSerializer` checks the value of the schema-element attribute `elementFormDefault`. For attributes, it checks the value of the schema-element attribute `attributeFormDefault`. For example, the following XML Schema indicates that the `Name` element is qualified, while the `Number` element is unqualified.

```
<schema elementFormDefault="qualified"
attributeFormDefault="unqualified">
   
   
</schema>
```

#### Examples
The following example sets the `Form` property for the `Vehicle` class to `XmlSchemaForm.Unqualified`, and the `Form` property for the `Car` class to `XmlSchemaForm.Qualified`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/Form/source.cs._

## XmlArrayItemAttribute.IsNullable property

```csharp
public bool IsNullable { get; set; }
```

Gets or sets a value that indicates whether the `XmlSerializer` must serialize a member as an empty XML tag with the `xsi:nil` attribute set to `true`.

Returns: `true` if the `XmlSerializer` generates the `xsi:nil` attribute; otherwise, `false`, and no instance is generated. The default is `true`.

#### Remarks
The XML schema specification for structures allows an XML document to explicitly signal that an element's content is missing. Such an element contains the attribute `xsi:nil` set to `true`. For more information, see the World Wide Web Consortium specification titled XML Schema Part 1: Structures.

If the `IsNullable` property is `true`, the `xsi:nil` attribute is generated for class members that have been set to `null`. For example, if you set a field named `MyStringArray` to `null`, the `XmlSerializer` generates the following XML code.

```

```

If the `IsNullable` property is `false`, no XML element is generated.

> **Note:**
> You cannot apply the `IsNullable` property to a member typed as a value type because a value type cannot contain `null`.

#### Examples
The following example serializes a class named `Group`, which contains a field named `Employees` that returns an array of `Employee` objects. A second class named `Manager` derives from `Employee`. An `XmlArrayItemAttribute` specifies that the `XmlSerializer` can insert both `Employee` and `Manager` objects into the array. The example sets the `IsNullable` property, thereby telling the `XmlSerializer` not to generate the `xsi:nil` attribute objects in the array set to `null`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/IsNullable/source.cs._

## XmlArrayItemAttribute.Namespace property

```csharp
public string? Namespace { get; set; }
```

Gets or sets the namespace of the generated XML element.

Returns: The namespace of the generated XML element.

#### Remarks
The `Namespace` property conforms to the World Wide Web Consortium specification Namespaces in XML.

To create namespaces to use in the XML document and associated prefixes, you must create an `XmlSerializerNamespaces` that contains all the prefix and namespace pairs. The namespace you set for each `XmlArrayAttribute` must be contained in the `XmlSerializerNamespaces`. When the `XmlSerializer` generates the document, it correctly prefixes the element name for each array item.

#### Examples
The following example applies an `XmlArrayItemAttribute` and sets the `Namespace` property.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/Namespace/source.cs._
