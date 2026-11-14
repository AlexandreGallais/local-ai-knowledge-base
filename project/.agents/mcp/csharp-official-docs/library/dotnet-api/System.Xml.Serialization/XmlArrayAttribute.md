---
title: "XmlArrayAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlArrayAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlArrayAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlArrayAttribute : Attribute
```

Specifies that the `XmlSerializer` must serialize a particular class member as an array of XML elements.

#### Remarks
The `XmlArrayAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object. For a complete list of similar attributes, see Attributes That Control XML Serialization.

You can apply the `XmlArrayAttribute` to a public field or read/write property that returns an array of objects. You can also apply it to collections and fields that return an `ArrayList` or any field that returns an object that implements the `IEnumerable` interface.

When you apply the `XmlArrayAttribute` to a class member, the `XmlSerializer.Serialize` method of the `XmlSerializer` class generates a nested sequence of XML elements from that member. An XML schema document (an .xsd file), indicates such an array as a `complexType`. For example, if the class to be serialized represents a purchase order, you can generate an array of purchased items by applying the `XmlArrayAttribute` to a public field that returns an array of objects that represent order items.

If no attributes are applied to a public field or property that returns an array of complex or primitive type objects, the `XmlSerializer` generates a nested sequence of XML elements by default. To more precisely control what XML elements are generated, apply an `XmlArrayItemAttribute` and an `XmlArrayAttribute` to the field or property. For example, by default, the name of the generated XML element is derived from the member identifier You can change the name of the generated XML element by setting the `ElementName` property.

If you serialize an array that contains items of a specific type and all the classes derived from that type, you must use the `XmlArrayItemAttribute` to declare each of the types.

> **Note:**
> You can use `XmlArray` in your code instead of the longer `XmlArrayAttribute`.

For more information about using attributes, see Attributes.

#### Examples
The following example serializes a class instance into an XML document that contains several object arrays. The `XmlArrayAttribute` is applied to the members that become XML element arrays.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayAttribute/Overview/source.cs._

## XmlArrayAttribute.XmlArrayAttribute() constructor

```csharp
public XmlArrayAttribute ();
```

Initializes a new instance of the `XmlArrayAttribute` class.

#### Remarks
For more information about using attributes, see Attributes.

#### Examples
The following example assigns the `XmlArrayAttribute` to two arrays.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayAttribute/.ctor/source.cs._

## XmlArrayAttribute.XmlArrayAttribute(String) constructor

```csharp
public XmlArrayAttribute (string? elementName);
```

Initializes a new instance of the `XmlArrayAttribute` class and specifies the XML element name generated in the XML document instance.

Parameters:

- `elementName`: The name of the XML element that the `XmlSerializer` generates.

#### Remarks
For more information about using attributes, see Attributes.

#### Examples
The following example assigns the `XmlArrayAttribute` to two arrays, and serializes a class instance that contains those arrays.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayAttribute/.ctor/source1.cs._

_Code sample not included: ~/snippets/common/VS_Snippets_Remoting/Classic XmlArrayAttribute.XmlArrayAttribute1 Example/Common/MyClass1.xml._
## XmlArrayAttribute.ElementName property

```csharp
public string ElementName { get; set; }
```

Gets or sets the XML element name given to the serialized array.

Returns: The XML element name of the serialized array. The default is the name of the member to which the `XmlArrayAttribute` is assigned.

#### Remarks
Specify an `ElementName` when you want the generated XML element name to differ from the member's identifier.

You can set the same `ElementName` value to more than one member as long as the generated XML document uses XML namespaces to distinguish between the identically named members. For more details about using namespaces and creating prefixed names in the XML document, see `XmlSerializerNamespaces`.

#### Examples
The following example serializes an instance of the `Library` class that contains a property named `Books` that returns an array of `Book` items. The example uses the `ElementName` property to specify that the array of XML elements should be named `My_Books` rather than `Books`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayAttribute/ElementName/source.cs._

## XmlArrayAttribute.Form property

```csharp
public System.Xml.Schema.XmlSchemaForm Form { get; set; }
```

Gets or sets a value that indicates whether the XML element name generated by the `XmlSerializer` is qualified or unqualified.

Returns: One of the `XmlSchemaForm` values. The default is `XmlSchemaForm.None`.

#### Remarks
The `Form` property determines whether an XML element name is qualified or unqualified. The `Form` property conforms to the 1999 World Wide Web Consortium document titled Namespaces in XML.

If the `Namespace` property is set to any value, attempting to set the `Form` property to `XmlSchemaForm.Unqualified` throws an exception.

The default setting, `XmlSchemaForm.None`, instructs the `XmlSerializer` to check the schema for the XML document to determine whether the namespace is qualified. If the schema does not specify a value for an individual element or attribute, the `XmlSerializer` uses the `elementFormDefault` and `attributeFormDefault` values to determine whether an element or attribute is qualified. The following XML code shows a schema:

```
<schema elementFormDefault="qualified"
attributeFormDefault="unqualified"... >
   
   
</schema>
```

When the `XmlSerializer` reads the schema, the `Form` value for both the `Name` and `Number` is `XmlSchemaForm.None`, but the `Name` element is qualified, while the `Number` element is unqualified.

#### Examples
The following example serializes an instance of the `Enterprises` class. Two XML elements have the same local name (`Company`) but different prefixes. The example sets the `Form` property is set to `XmlForm.Qualified` to ensure that the qualified names occur in the XML instance.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayAttribute/Form/source.cs._

## XmlArrayAttribute.IsNullable property

```csharp
public bool IsNullable { get; set; }
```

Gets or sets a value that indicates whether the `XmlSerializer` must serialize a member as an empty XML tag with the `xsi:nil` attribute set to `true`.

Returns: `true` if the `XmlSerializer` generates the `xsi:nil` attribute; otherwise, `false`.

#### Remarks
The XML schema specification for structures allows an XML document to explicitly signal that an element's content is missing. Such an element contains the attribute `xsi:nil` set to `true`. For more information, see the World Wide Web Consortium specification titled XML Schema Part 1: Structures.

If the `IsNullable` property is set to `true`, the `xsi:nil` attribute is generated for class members that have been set to `null`. For example, if you set a field named `MyStringArray` to `null`, the `XmlSerializer` generates the following XML code.

```

```

If the `IsNullable` property is `false`, no XML element is generated.

> **Note:**
> You cannot apply the `IsNullable` property to a member typed as a value type because a value type cannot contain `null`.

#### Examples
The following example contains two arrays: one with the `IsNullable` property set to `true`, and another with the `IsNullable` property set to `false`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayAttribute/IsNullable/source.cs._

## XmlArrayAttribute.Namespace property

```csharp
public string? Namespace { get; set; }
```

Gets or sets the namespace of the XML element.

Returns: The namespace of the XML element.

#### Remarks
The `Namespace` property allows you to create qualified XML element names. The `Namespace` property conforms to the rules for creating an XML namespace as found in the 1999 World Wide Web Consortium document titled Namespaces in XML.

To create namespaces that are associated with a prefix, you must create an instance of the `XmlSerializerNamespaces` class that contains the namespaces and prefixes used in the XML document. As you set the namespace for each `XmlArrayAttribute`, it must match one of the namespaces in the `XmlSerializerNamespaces`. When the XML is generated, each array is correctly prefixed with the prefix associated with the specified namespace.

#### Examples
The following example serializes an instance of the `Library` class that contains two members, one that contain book titles, and another that contain periodical titles. Although both XML elements are named `Titles`, each contains a different prefix. The example also includes an instance of the `XmlSerializerNamespaces` class that contains the namespaces and prefixes used to qualify the two element names.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayAttribute/Namespace/source.cs._

## XmlArrayAttribute.Order property

```csharp
public int Order { get; set; }
```

Gets or sets the explicit order in which the elements are serialized or deserialized.

Returns: The order of the code generation.

#### Remarks
Use the `GenerateOrder` enumeration to instruct the `ServiceDescriptionImporter` to generate code that sets the `Order` property.

> **Important:**
> Once the `Order` property has been used on one public property or field in a type, it must be applied to all public properties and fields for that type and all inherited types.
