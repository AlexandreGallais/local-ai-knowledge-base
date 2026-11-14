---
title: "SoapAttributes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/SoapAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SoapAttributes class

Namespace: `System.Xml.Serialization`

```csharp
public class SoapAttributes
```

Represents a collection of attribute objects that control how the `XmlSerializer` serializes and deserializes SOAP methods.

#### Remarks
Creating a `SoapAttributes` is part of a process that overrides the default way the `XmlSerializer` serializes class instances. For example, suppose you want to serialize an object that is created from a DLL that has an inaccessible source. By using the `SoapAttributeOverrides` class, you can augment or otherwise control how the object is serialized.

The members of the `SoapAttributes` class correspond directly to a family of attribute classes that control serialization. For example, the `SoapAttribute` property must be set to a `SoapAttributeAttribute`, which allows you to override serialization of a field or property by instructing the `XmlSerializer` to serialize the property value as an encoded SOAP attribute. For a complete list of attributes that control encoded SOAP serialization, see Attributes That Control Encoded SOAP Serialization.

For more details about adding an instance of the `SoapAttributes` class to an instance of the `SoapAttributeOverrides` class, see the `SoapAttributeOverrides` class overview.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapAttributes.SoapAttributes() constructor

```csharp
public SoapAttributes ();
```

Initializes a new instance of the `SoapAttributes` class.

#### Remarks
For each member or class instance whose serialization is being overridden, you must create a new `SoapAttributes`. Set the properties for the `SoapAttributes` as appropriate to the member or object, then add the `SoapAttributes` to an instance of the `SoapAttributeOverrides` class.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapAttributes.SoapAttributes(ICustomAttributeProvider) constructor

```csharp
public SoapAttributes (System.Reflection.ICustomAttributeProvider provider);
```

Initializes a new instance of the `SoapAttributes` class using the specified custom type.

Parameters:

- `provider`: Any object that implements the `ICustomAttributeProvider` interface, such as the `Type` class.

To be added.

## SoapAttributes.SoapAttribute property

```csharp
public System.Xml.Serialization.SoapAttributeAttribute? SoapAttribute { get; set; }
```

Gets or sets the `SoapAttributeAttribute` to override.

Returns: A `SoapAttributeAttribute` that overrides the behavior of the `XmlSerializer` when the member is serialized.

#### Remarks
By default, if no attribute is applied to a public field or public read/write property, it is serialized as an XML element. You can also instruct the `XmlSerializer` to serialize a member as an encoded SOAP XML attribute by applying a `SoapAttributeAttribute` to the field or property. (The `XmlSerializer` must be created with an `XmlTypeMapping` in order to serialize an object as an encoded SOAP XML stream.)

The `SoapAttribute` property allows you to override the serialization controlled by applying a `SoapAttributeAttribute` to the member. For more details on this process, see the `SoapAttributeOverrides` class overview.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapAttributes.SoapDefaultValue property

```csharp
public object? SoapDefaultValue { get; set; }
```

Gets or sets the default value of an XML element or attribute.

Returns: An object that represents the default value of an XML element or attribute.

#### Remarks
The default value of a member can be set by applying a `DefaultValueAttribute` attribute to the member. If the member is being serialized as an encoded SOAP message, you can change the default value by creating a new `DefaultValueAttribute`, setting its `Value` property, and setting the `SoapDefaultValue` property to the object. Add the `SoapAttributes` to a `SoapAttributeOverrides`. For more details, see the `SoapAttributeOverrides` class overview.

#### Examples
The following example serializes a class named `Group` that includes a field named `GroupName`. The default value is set with the `DefaultValueAttribute` to ".NET". By either not setting the field, or by setting it to ".NET", the value is not serialized (because the default value is already known). The sample also overrides the default value in the `CreateOverrideSerializer` method, which is called by the `SerializeOverride` method. The example calls both methods, `SerializeOriginal` and `SerializeOverride`, and sets the same value (".NET") for the `GroupName` field. Because of the override, the value is serialized only when calling the `SerializeOverride` method.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapDefaultValue/defvalue.cs._

## SoapAttributes.SoapElement property

```csharp
public System.Xml.Serialization.SoapElementAttribute? SoapElement { get; set; }
```

Gets or sets a `SoapElementAttribute` to override.

Returns: The `SoapElementAttribute` to override.

#### Remarks
The `SoapElementAttribute` is used to control the serialization of a class member as an XML element. Set the `SoapElement` property to a new `SoapElementAttribute` to override the serialization of a class member as an XML element by creating a new `SoapElementAttribute` and assigning it to the property. Then add the `SoapAttributes` to a `SoapAttributeOverrides`. Create an `XmlTypeMapping` with the `SoapAttributeOverrides`, then construct an `XmlSerializer` with the `XmlTypeMapping`.

For more information, see the `SoapAttributeOverrides` class overview.

#### Examples
The following example serializes a class named `Transportation`. The serialization of the `Vehicle` field is overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapElement/soapelementoverrides.cs._

## SoapAttributes.SoapEnum property

```csharp
public System.Xml.Serialization.SoapEnumAttribute? SoapEnum { get; set; }
```

Gets or sets an object that specifies how the `XmlSerializer` serializes a SOAP enumeration.

Returns: An object that specifies how the `XmlSerializer` serializes an enumeration member.

#### Remarks
The `SoapEnumAttribute` is used to control the serialization of an enumeration member. Set the `SoapEnum` property to a new `SoapEnumAttribute` to override the serialization of such a member.

For more information, see the `SoapAttributeOverrides` class overview.

#### Examples
The following example serializes two classes named `Food` and `FoodType`. The `FoodType` class contains two enumerations that are overridden, and for each enumeration, the example creates a `SoapEnumAttribute` that it assigns to the `SoapEnum` property of a `SoapAttributes`. The example then adds the `SoapAttributes` to a `SoapAttributeOverrides`, which is used to create an `XmlSerializer`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapEnum/soapenumoverrides.cs._

## SoapAttributes.SoapIgnore property

```csharp
public bool SoapIgnore { get; set; }
```

Gets or sets a value that specifies whether the `XmlSerializer` serializes a public field or property as encoded SOAP XML.

Returns: `true` if the `XmlSerializer` must not serialize the field or property; otherwise, `false`.

#### Remarks
By default, all public fields and public read/write properties are serialized by the `XmlSerializer`. That is, the value of each public field or property is persisted as an XML element or XML attribute in an XML document.

To override the default serialization of a field or property, create a `SoapAttributes`, and set its `SoapIgnore` property to `true`. Use the `SoapAttributeOverrides.Add` method to add the object to a `SoapAttributeOverrides` and specify the type of the object that contains the field or property to ignore and the name of the field or property to ignore.

If a `SoapIgnoreAttribute` is applied to a field or property, the field or property is ignored. However you can override that behavior by creating a `SoapAttributes`, setting its `SoapIgnore` property to `false`, and adding it to a `SoapAttributeOverrides`, specifying the type of the object that contains the field or property and the name of the field or property.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapAttributes.SoapType property

```csharp
public System.Xml.Serialization.SoapTypeAttribute? SoapType { get; set; }
```

Gets or sets an object that instructs the `XmlSerializer` how to serialize an object type into encoded SOAP XML.

Returns: A `SoapTypeAttribute` that either overrides a `SoapTypeAttribute` applied to a class declaration, or is applied to a class declaration.

#### Remarks
The `SoapTypeAttribute` can be used to control the XML stream generated by the `XmlSerializer`. Set the `SoapType` property to a new `SoapTypeAttribute` to control the schema for the XML that is generated when a class is serialized.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._
