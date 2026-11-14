---
title: "XmlAttributes class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttributes class (part 2 of 2)

## XmlAttributes.XmlElements property

```csharp
public System.Xml.Serialization.XmlElementAttributes XmlElements { get; }
```

Gets a collection of objects that specify how the `XmlSerializer` serializes a public field or read/write property as an XML element.

Returns: An `XmlElementAttributes` that contains a collection of `XmlElementAttribute` objects.

#### Remarks
For each overridden member that is serialized as an XML element, you must add a new `XmlElementAttribute` to an `XmlElementAttributes` by calling the `XmlElementAttributes.Add` method. By default, an `XmlElementAttributes` object is created and assigned to the `XmlElements` property.

#### Examples
The following example serializes the `Transportation` class, which contains a single field named `Vehicles` that returns an `ArrayList`. The example applies two `XmlElementAttribute` attributes to the `Vehicles` field. The example creates two `XmlElementAttribute` objects and adds them to the `XmlElementAttributes` collection of an `XmlAttributes` object. To allow the array to accept different object types, the `XmlAttributes` object is added to the `XmlAttributeOverrides` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlElements/source.cs._

## XmlAttributes.XmlEnum property

```csharp
public System.Xml.Serialization.XmlEnumAttribute? XmlEnum { get; set; }
```

Gets or sets an object that specifies how the `XmlSerializer` serializes an enumeration member.

Returns: An `XmlEnumAttribute` that specifies how the `XmlSerializer` serializes an enumeration member.

#### Remarks
For each identifier you want to override, you must create an `XmlAttributes` object, and set the `XmlEnum` property to an `XmlEnumAttribute` that overrides the identifier. Add the `XmlAttributes` object to the `XmlAttributeOverrides` object and specify both the `Type` of the class that contains the enumeration, and the overridden member name.

#### Examples
The following example serializes two classes named `Food` and `FoodType`. The `FoodType` class contains two enumerations that are overridden and, for each enumeration, the example creates an `XmlEnumAttribute` object that it assigns to the `XmlEnum` property of an `XmlAttributes` object. The example then adds the `XmlAttributes` object to an `XmlAttributeOverrides` object, which is used to create an `XmlSerializer`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlEnum/source.cs._

## XmlAttributes.XmlIgnore property

```csharp
public bool XmlIgnore { get; set; }
```

Gets or sets a value that specifies whether or not the `XmlSerializer` serializes a public field or public read/write property.

Returns: `true` if the `XmlSerializer` must not serialize the field or property; otherwise, `false`.

#### Remarks
By default, all public fields and public read/write properties are serialized by the `XmlSerializer`. That is, the value of each public field or property is persisted as an XML element or XML attribute in an XML-document instance.

To override the default serialization of a field or property, create an `XmlAttributes` object, and set its `XmlIgnore` property to `true`. `XmlAttributeOverrides.Add` the object to an `XmlAttributeOverrides` object and specify the type of the object that contains the field or property to ignore, and the name of the field or property to ignore.

If an `XmlIgnoreAttribute` is applied to a field or property, the field or property is ignored. However you can override that behavior by creating an `XmlAttributes` object, setting its `XmlIgnore` property to `false`, adding it to an `XmlAttributeOverrides` object specifying the type of the object that contains the field or property, and the name of the field or property.

#### Examples
The following example serializes a class named `Group`, which contains a member named `Comment` to which the `XmlIgnoreAttribute` is applied. The example creates an `XmlAttributes` object, and sets the `XmlIgnore` property to `false`, thereby overriding the `XmlIgnoreAttribute`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlIgnore/source.cs._

## XmlAttributes.Xmlns property

```csharp
public bool Xmlns { get; set; }
```

Gets or sets a value that specifies whether to keep all namespace declarations when an object containing a member that returns an `XmlSerializerNamespaces` object is overridden.

Returns: `true` if the namespace declarations should be kept; otherwise, `false`.

#### Examples
The following example contains a class named `Student`. The class contains a member named `MyNamespaces` that returns an `XmlSerializerNamespaces` object. The example creates an `XmlAttributes` object that is added to an instance of the `XmlAttributeOverrides` class. The `Xmlns` property is set to `true`, which instructs the `XmlSerializer` to preserve the namespaces when the serialization of the `Student` object is overridden.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/Xmlns/xmlns.cs._

## XmlAttributes.XmlRoot property

```csharp
public System.Xml.Serialization.XmlRootAttribute? XmlRoot { get; set; }
```

Gets or sets an object that specifies how the `XmlSerializer` serializes a class as an XML root element.

Returns: An `XmlRootAttribute` that overrides a class attributed as an XML root element.

#### Examples
The following example creates an `XmlAttributeOverrides` object, an `XmlAttributes` object, and an `XmlRootAttribute` object. The example assigns the `XmlRootAttribute` to the `XmlRoot` property of the `XmlAttributes` object, and adds the `XmlAttributes` object to the `XmlAttributeOverrides` object. Lastly, the example gets the `XmlAttributes` object by passing the `Type` of the serialized class to the `XmlAttributeOverrides` object. (In this example, the `Type` is `Group`.)

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlRoot/source.cs._

## XmlAttributes.XmlText property

```csharp
public System.Xml.Serialization.XmlTextAttribute? XmlText { get; set; }
```

Gets or sets an object that instructs the `XmlSerializer` to serialize a public field or public read/write property as XML text.

Returns: An `XmlTextAttribute` that overrides the default serialization of a public property or field.

#### Remarks
By default, a public field or public read/write property is serialized as an XML element by the `XmlSerializer`. However, it can force the field or property to be serialized as XML text by applying an `XmlTextAttribute` to the field or property.

> **Note:**
> The `XmlTextAttribute` cannot be applied to a field or property that returns an array.

To override the default serialization of a field or property (that does not return an array), create an `XmlTextAttribute` and assign it to the `XmlText` property of an `XmlAttributes` object. Add the `XmlAttributes` object to an `XmlAttributeOverrides` object and specify the type of the object that contains the overridden field or property, and the name of the overridden field or property.

#### Examples
The following example serializes the class named `Group`, which contains a field named `Comment`. To override the default way the `XmlSerializer` serializes the field, the example creates an `XmlAttributeOverrides` and an `XmlAttributes` object. The example then creates an `XmlTextAttribute` object, which it assigns to the `XmlText` property, and adds the `XmlAttributes` object (with the name of the field to be serialized as XML text) to the `XmlAttributeOverrides` object. Lastly the example creates an `XmlSerializer` using the `XmlAttributeOverrides` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlText/source.cs._

## XmlAttributes.XmlType property

```csharp
public System.Xml.Serialization.XmlTypeAttribute? XmlType { get; set; }
```

Gets or sets an object that specifies how the `XmlSerializer` serializes a class to which the `XmlTypeAttribute` has been applied.

Returns: An `XmlTypeAttribute` that overrides an `XmlTypeAttribute` applied to a class declaration.

#### Remarks
The `XmlTypeAttribute` can be used to control how a type is serialized by the `XmlSerializer`. For example, by default, when a type is serialized, the `XmlSerializer` uses the class name as the XML element name. By creating an `XmlTypeAttribute`, setting the `XmlType` property to it, and creating an `XmlAttributeOverrides` object, you can change the XML element name.

#### Examples
The following example creates an `XmlTypeAttribute` object, and assigns it to the `XmlType` property of an `XmlAttributes` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributes/XmlType/source.cs._
