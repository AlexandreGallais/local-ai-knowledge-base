---
title: "XmlAttributes class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttributes class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlAttributes
```

Represents a collection of attribute objects that control how the `XmlSerializer` serializes and deserializes an object.

#### Remarks
Creating the `XmlAttributes` is part of a process that overrides the default way the `XmlSerializer` serializes class instances. For example, suppose you want to serialize an object that is created from a DLL that has an inaccessible source. By using the `XmlAttributeOverrides`, you can augment or otherwise control how the object is serialized.

The members of the `XmlAttributes` class correspond directly to a family of attribute classes that control serialization. For example, the `XmlText` property must be set to an `XmlTextAttribute`, which allows you to override serialization of a field or property by instructing the `XmlSerializer` to serialize the property value as XML text. For a complete list of attributes that control serialization, see the `XmlSerializer`.

For more details on using the `XmlAttributeOverrides` with the `XmlAttributes` class, see How to: Specify an Alternate Element Name for an XML Stream.

#### Examples
The following example serializes an instance of a class named `Orchestra`, which contains a single field named `Instruments` that returns an array of `Instrument` objects. A second class named `Brass` inherits from the `Instrument` class. The example creates an `XmlAttributes` object to override the `Instrument` field--allowing the field to accept `Brass` objects--and adds the `XmlAttributes` object to an instance of the `XmlAttributeOverrides` class.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/Overview/source.cs._

## XmlAttributes.XmlAttributes() constructor

```csharp
public XmlAttributes ();
```

Initializes a new instance of the `XmlAttributes` class.

#### Examples
The following example serializes an instance of a class named `Orchestra`, which contains a single field named `Instruments` that returns an array of `Instrument` objects. A second class named `Brass` inherits from the `Instrument` class. The example creates an `XmlAttributes` object to override the `Instrument` field--allowing the field to accept `Brass` objects--and adds the `XmlAttributes` object to an instance of the `XmlAttributeOverrides` class.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/Overview/source.cs._

## XmlAttributes.XmlAttributes(ICustomAttributeProvider) constructor

```csharp
public XmlAttributes (System.Reflection.ICustomAttributeProvider provider);
```

Initializes a new instance of the `XmlAttributes` class and customizes how the `XmlSerializer` serializes and deserializes an object.

Parameters:

- `provider`: A class that can provide alternative implementations of attributes that control XML serialization.

#### Remarks
Use the parameterless constructor for the `XmlAttributes` class, rather than using this constructor.

## XmlAttributes.XmlAnyAttribute property

```csharp
public System.Xml.Serialization.XmlAnyAttributeAttribute? XmlAnyAttribute { get; set; }
```

Gets or sets the `XmlAnyAttributeAttribute` to override.

Returns: The `XmlAnyAttributeAttribute` to override.

#### Remarks
The `XmlAnyAttributeAttribute` can be applied to a member that returns an array of `XmlAttribute` objects on deserialization. This allows the `XmlSerializer` to deserialize any attributes that do not have a corresponding member in the object being deserialized--thus those elements are "unknown" to the `XmlSerializer`. This is useful when the XML stream has been altered by an XML Web service, or when it is known that random data is always included with the XML stream.

The `XmlAnyAttribute` property allows you to override the serialization of a member to which the `XmlAnyAttributeAttribute` has been applied.

## XmlAttributes.XmlAnyElements property

```csharp
public System.Xml.Serialization.XmlAnyElementAttributes XmlAnyElements { get; }
```

Gets the collection of `XmlAnyElementAttribute` objects to override.

Returns: An `XmlAnyElementAttributes` object that represents the collection of `XmlAnyElementAttribute` objects.

#### Remarks
The `XmlAnyElementAttribute` can be applied to a member that returns an array of `XmlElement` objects on deserialization. This allows the `XmlSerializer` to deserialize any elements that do not have a corresponding member in the object being deserialized--thus those elements are "unknown" to the `XmlSerializer`. This is useful when the XML stream has been altered by an XML Web service, or when it is known that random data is always included with the XML stream.

The `XmlAnyElements` property allows you to override the serialization of a member to function as a member to which the `XmlAnyElementAttribute` has been applied.

#### Examples
The following example creates a new `XmlAnyElementAttribute` object and adds it to the collection of objects accessed through the `XmlAnyElements` property. The `XmlAttributes` object is then added to a `XmlAttributeOverrides` object which is used to create an `XmlSerializer` object. The `XmlSerializer` is used to serialize or deserialize an object. To see the effect of using the `XmlAnyElementAttributes` property, create an XML document named "UnknownElements.xml" by running the `SerializeObject` method in the `Main` method. Edit the resulting document to include other (unknown) elements. Comment out the `SerializeObject` call in the `Main` method, and uncomment the call to the `DeserializeObject` method, which prints out the name and value of any unknown XML element.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyElementAttributes/Overview/xmlanyover.cs._

## XmlAttributes.XmlArray property

```csharp
public System.Xml.Serialization.XmlArrayAttribute? XmlArray { get; set; }
```

Gets or sets an object that specifies how the `XmlSerializer` serializes a public field or read/write property that returns an array.

Returns: An `XmlArrayAttribute` that specifies how the `XmlSerializer` serializes a public field or read/write property that returns an array.

#### Remarks
There are two ways in which a public field or public read/write property that returns an array is serialized by the `XmlSerializer`: the default serialization, and the controlled serialization.

In the default serialization, no attribute is applied to the member. When serialized, the array is serialized as a nested sequence of XML elements with the XML element name of the nested sequence taken from the member name.

To control the serialization more precisely, apply an `XmlArrayAttribute` to the field or property. For example, you can change the generated XML element name from the default to a different name by setting the `ElementName` property to a new value.

The `XmlArray` property allows you to override the default serialization, as well as the serialization controlled by applying an `XmlArrayAttribute` to the member. For example, you can change the XML element name generated from the default (the member identifier) to a new value. In addition, if you apply an `XmlArrayAttribute` to a member, it is overridden by any `XmlArrayAttribute` that is assigned to the `XmlArray` property.

#### Examples
The following example serializes a class that contains a field named `Members` that returns an array of objects. The `XmlArrayAttribute` is used to override the serialization of the field, and rename the element name to `Staff`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlArray/source.cs._

## XmlAttributes.XmlArrayItems property

```csharp
public System.Xml.Serialization.XmlArrayItemAttributes XmlArrayItems { get; }
```

Gets or sets a collection of objects that specify how the `XmlSerializer` serializes items inserted into an array returned by a public field or read/write property.

Returns: An `XmlArrayItemAttributes` object that contains a collection of `XmlArrayItemAttribute` objects.

#### Remarks
The `XmlArrayItems` property allows you to specify the derived types that can be inserted into an array returned by a public field or public read/write property. For each new type you want the field or property to accept, create an `XmlArrayItemAttribute` object and `XmlArrayItemAttributes.Add` it to the `XmlArrayItemAttributes`) returned by the `XmlArrayItems` property. (The new type must be derived from the type already accepted by the field or property.) `XmlAttributeOverrides.Add` the `XmlAttributes` object to an `XmlAttributeOverrides` object and specify the type of the object that contains the field or property, and the name of the field or property. Construct an `XmlSerializer` with the `XmlAttributeOverrides` object before calling `XmlSerializer.Serialize` or `XmlSerializer.Deserialize` method.

#### Examples
The following example serializes a class that contains a field named `Members` that returns an array of objects. Two `XmlArrayItemAttribute` objects are created to allow the field to accept objects that derive from the base class named `Member`. Each object is added to the `XmlAttributes` through the `XmlArrayItems` property.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlArrayItems/source.cs._

## XmlAttributes.XmlAttribute property

```csharp
public System.Xml.Serialization.XmlAttributeAttribute? XmlAttribute { get; set; }
```

Gets or sets an object that specifies how the `XmlSerializer` serializes a public field or public read/write property as an XML attribute.

Returns: An `XmlAttributeAttribute` that controls the serialization of a public field or read/write property as an XML attribute.

#### Remarks
By default, if no attribute is applied to a public field or public read/write property, it is serialized as an XML element. You can also instruct the `XmlSerializer` to generate an XML attribute by applying an `XmlAttributeAttribute` to the field or property.

The `XmlAttribute` property allows you to override the default serialization, as well as the serialization controlled by applying an `XmlAttributeAttribute` to the member. To do this, create an `XmlAttributeAttribute` and set its properties (such as `AttributeName`). Assign the new object to the `XmlAttribute` property of an `XmlAttributes` object. Add the `XmlAttributes` object to an `XmlAttributeOverrides` object and specify the type of the object that contains the field or property, and the name of the field or property. Lastly, create an `XmlSerializer` using the `XmlAttributeOverrides` object and call the `XmlSerializer.Serialize` or `XmlSerializer.Deserialize` method.

#### Examples
The following example serializes a class named `Group` that contains a property named `GroupName`; the `GroupName` property is serialized as an XML attribute. The example creates an `XmlAttributeOverrides` and an `XmlAttributes` object to override the default serialization of the field. The example then creates an `XmlAttributeAttribute` to specifically override the property, and the object is set to the `XmlAttribute` property The `XmlAttributes` object is added to the `XmlAttributeOverrides` object with the name of the overridden member specified. Finally, an `XmlSerializer` is constructed and returned using the `XmlAttributeOverrides` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlAttribute/source.cs._

## XmlAttributes.XmlChoiceIdentifier property

```csharp
public System.Xml.Serialization.XmlChoiceIdentifierAttribute? XmlChoiceIdentifier { get; }
```

Gets or sets an object that allows you to distinguish between a set of choices.

Returns: An `XmlChoiceIdentifierAttribute` that can be applied to a class member that is serialized as an `xsi:choice` element.

To be added.

## XmlAttributes.XmlDefaultValue property

```csharp
public object? XmlDefaultValue { get; set; }
```

Gets or sets the default value of an XML element or attribute.

Returns: An `Object` that represents the default value of an XML element or attribute.

#### Remarks
You can specify the default value of an XML element or XML attribute by applying a `DefaultValueAttribute` to a member. To examine the result of applying the value, compile the application into a DLL or executable, and pass the resulting file as an argument to the XML Schema Definition tool (XSD.exe). In the XML schema document, a default value is assigned to the `default` attribute. In the following example, the default for the \<Animal> element is "Dogs."

```xml
<?xml version="1.0"?>
 <schema attributeFormDefault="qualified"
 elementFormDefault="qualified" targetNamespace=""
 xmlns="http://www.w3.org/2000/10/XMLSchema">
   
   <complexType name="Pets">
     <sequence>
       
     </sequence>
   </complexType>
 </schema>
```

To override the default value, create an `Object` and assign it to the `XmlDefaultValue`.

If the value assigned to a field or property is equal to the default value for that field or property, the `XmlSerializer` does not serialize the value to the XML-instance. This is because the assigned value can be recovered from the XML schema. In other words, setting a field or property to its own default value is equivalent of not setting it at all. Likewise, if no value is set for the field or property, the `XmlSerializer` uses the default value found in the schema. In both cases, (setting the property to its default, or not setting it at all), the XML-document instance does not contain any value for the property.

You can use the class constructors instead of the schema to assign the default values. If you are using Xsd.exe to generate a classes from schemas, you can comment out or remove all of the [System.ComponentModel.DefaultValueAttribute("myFieldName")] attributes from the class files.

#### Examples
The following example shows a class named `Pet` that contains a field that has a default value set to "Dog". However, the example also creates an `XmlAttributes` object, and sets its `XmlDefaultValue` property to a new default value ("Cat"). This overrides the original default value. Thus, if the field value is set to "Cat", the `XmlSerializer` treats it as the default value, and not serialize it. If it is set to any other value, the `XmlSerializer` serializes the value.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlDefaultValue/source.cs._
