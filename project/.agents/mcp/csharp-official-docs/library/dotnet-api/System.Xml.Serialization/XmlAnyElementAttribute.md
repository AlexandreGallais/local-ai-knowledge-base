---
title: "XmlAnyElementAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAnyElementAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAnyElementAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlAnyElementAttribute : Attribute
```

Specifies that the member (a field that returns an array of `XmlElement` or `XmlNode` objects) contains objects that represent any XML element that has no corresponding member in the object being serialized or deserialized.

#### Remarks

Use the `XmlAnyElementAttribute` to contain arbitrary data (as XML elements) that can be sent as part of an XML document, such as metadata sent as part of the document.

Apply the `XmlAnyElementAttribute` to a field that returns an array of `XmlElement` or `XmlNode` objects. Such a field can be used in two ways, depending on whether an object is being serialized or deserialized. When serialized, the object is generated as XML elements or nodes, even though they have no corresponding member (or members) in the object being serialized. If you specify a `Name` property value when applying the attribute, all `XmlElement` or `XmlNode` objects inserted into the array must have the same element name and default namespace, or an exception is thrown. If you set the `Namespace` property value, you must set the `Name` property as well, and the `XmlElement` or `XmlNode` objects must also have the same name and namespace values. If no `Name` value is specified, the `XmlElement` or `XmlNode` objects can have any element name.

When you call the `XmlSerializer.Deserialize` method of the `XmlSerializer` class, all elements that do not have a corresponding member in the object being deserialized are collected in the array. After deserialization, iterate through the collection of `XmlElement` items to process the data. If you specify a `Name` value, the array contains only XML elements with that name. If you do not specify a `Name` value, the array contains all elements that have no corresponding member in the class. If a class contains more than one field to which the attribute is applied, use the `Name`, or `Name` and `Namespace` properties to differentiate between the contents of the arrays. If such a class (with multiple fields) also contains one field that has no differentiating property values set (in other words, `Name` and `Namespace`) during deserialization, this array contains any unknown XML elements that are not already contained in the other arrays. If a class contains more than one field that does not have a differentiating `Name`, or `Name` and `Namespace` value set, the behavior during deserialization is unspecified.

You can also apply the `XmlAnyElementAttribute` to a field that returns a single `XmlElement` object. If you do so, you must use the properties and methods of the `XmlElement` class to recursively iterate through the unknown elements.

You can apply multiple instances of the `XmlAnyElementAttribute` to a class member, but each instance must have a distinct `Name` property value. Or, if the same `Name` property is set for each instance, a distinct `Namespace` property value must be set for each instance.

The `UnknownNode` and `UnknownAttribute` events of the `XmlSerializer` do not occur if you apply the `XmlAnyElementAttribute` to a member of a class.

> **Note:**
> You can use the word `XmlAnyElement` in your code instead of the longer `XmlAnyElementAttribute`.

For more information about using attributes, see Attributes.

#### Examples
The following example applies the `XmlAnyElementAttribute` to a field named `AllElements` that returns an array of `XmlElement` objects.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyElementAttribute/Overview/source.cs._

## XmlAnyElementAttribute.XmlAnyElementAttribute() constructor

```csharp
public XmlAnyElementAttribute ();
```

Initializes a new instance of the `XmlAnyElementAttribute` class.

#### Remarks
Use the `XmlAnyElementAttribute` constructor when you are overriding the serialization of a field. For more details about overriding serialization, see the `XmlAttributeOverrides` class.

## XmlAnyElementAttribute.XmlAnyElementAttribute(String) constructor

```csharp
public XmlAnyElementAttribute (string? name);
```

Initializes a new instance of the `XmlAnyElementAttribute` class and specifies the XML element name generated in the XML document.

Parameters:

- `name`: The name of the XML element that the `XmlSerializer` generates.

#### Remarks
Use the `XmlAnyElementAttribute` constructor when you are overriding the serialization of a field. For more details about overriding serialization, see the `XmlAttributeOverrides` class.

## XmlAnyElementAttribute.XmlAnyElementAttribute(String, String) constructor

```csharp
public XmlAnyElementAttribute (string? name, string? ns);
```

Initializes a new instance of the `XmlAnyElementAttribute` class and specifies the XML element name generated in the XML document and its XML namespace.

Parameters:

- `name`: The name of the XML element that the `XmlSerializer` generates.
- `ns`: The XML namespace of the XML element.

#### Remarks
Use the `XmlAnyElementAttribute` constructor when you are overriding the serialization of a field. For more details about overriding serialization, see the `XmlAttributeOverrides` class.

## XmlAnyElementAttribute.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the XML element name.

Returns: The name of the XML element.

Exceptions:

- `InvalidOperationException`: The element name of an array member does not match the element name specified by the `XmlAnyElementAttribute.Name` property.

#### Remarks
If you specify a `Name` property value when applying the attribute, all `XmlElement` or `XmlNode` objects inserted into the array must have the same element name and default namespace, or an exception is thrown. If you set the `Namespace` property value, you must set the `Name` property as well, and the `XmlElement` or `XmlNode` objects must also have the same name and namespace values. If no `Name` value is specified, the `XmlElement` or `XmlNode` objects can have any element name.

When you call the `XmlSerializer.Deserialize` method of the `XmlSerializer` class, all attributes that do not have a corresponding member in the object being deserialized are collected in the array. If you specify a `Name` value, the array contains only XML elements with that name. If you do not specify a `Name` value, the array contains all elements that have no corresponding member in the class. If a class contains more than one field to which the attribute is applied, use the `Name` and `Namespace` properties to differentiate between the contents of the arrays. If such a class (with multiple fields) also contains one field that has no differentiating property values set (that is, `Name` and `Namespace`) during deserialization, the array contains any XML elements that are not already contained in the other arrays. If you add more than one field that does not have a differentiating `Name` or `Namespace` value set, the last field in the class contains all unknown elements that are not already contained in the other arrays, and any other fields are set to `null`.

You can apply multiple instances of the `XmlAnyElementAttribute` to a class member, but each instance must have a distinct `Name` property value. Or, if the same `Name` property is set for each instance, a distinct `Namespace` property value must be set for each instance.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyElementAttribute/Name/anyelement.cs._

## XmlAnyElementAttribute.Namespace property

```csharp
public string? Namespace { get; set; }
```

Gets or sets the XML namespace generated in the XML document.

Returns: An XML namespace.

#### Remarks
The `Namespace` property allows you to set a unique name for the XML attribute. The `Namespace` property conforms to the rules for creating an XML namespace as found in the Namespaces in XML document from the World Wide Web Consortium.

To set the `Namespace` property to a prefixed name, create an `XmlSerializerNamespaces` that contains the namespaces and prefixes used in the XML document. Set the `Namespace` property to one of the namespaces in the `XmlSerializerNamespaces`. When the XML is generated, the attribute name is correctly prefixed with the prefix associated with the specified namespace.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyElementAttribute/Name/anyelement.cs._

## XmlAnyElementAttribute.Order property

```csharp
public int Order { get; set; }
```

Gets or sets the explicit order in which the elements are serialized or deserialized.

Returns: The order of the code generation.

#### Remarks
Use the `GenerateOrder` enumeration to instruct the `ServiceDescriptionImporter` to generate code that sets the `Order` property.

> **Important:**
> Once the `Order` property has been used on one public property or field in a type, it must be applied to all public properties and fields for that type and all inherited types.
