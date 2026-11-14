---
title: "SoapAttributeOverrides class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/SoapAttributeOverrides.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SoapAttributeOverrides class

Namespace: `System.Xml.Serialization`

```csharp
public class SoapAttributeOverrides
```

Allows you to override attributes applied to properties, fields, and classes when you use an `XmlSerializer` to serialize or deserialize an object as encoded SOAP.

#### Remarks
The `SoapAttributeOverrides` class enables an `XmlSerializer` to override the default way of serializing a set of objects. Overriding serialization in this way has two uses: first, you can control and augment the serialization of objects found in a DLL, even if you do not have access to the source; second, you can create one set of serializable classes, but serialize the objects in multiple ways. For example, instead of serializing members of a class instance as XML elements, you can serialize them as XML attributes, resulting in a more efficient document to transport.

After you create a `SoapAttributeOverrides`, you create an `XmlTypeMapping` using the `SoapReflectionImporter.ImportTypeMapping` method of the `SoapReflectionImporter` class. Pass the resulting object as an argument to the `XmlSerializer.%23ctor` constructor. The resulting `XmlSerializer` uses the data contained by the `SoapAttributeOverrides` to override attributes that control how objects are serialized. To accomplish this, the `SoapAttributeOverrides` contains a collection of the object types that are overridden, as well as a `SoapAttributes` associated with each overridden object type. Each `SoapAttributes` contains an appropriate set of attribute objects that control how each field, property, or class is serialized.

The process for creating and using a `SoapAttributeOverrides` is as follows:

1.  Create a `SoapAttributes`.

2.  Create an attribute object that is appropriate to the object being overridden. For example, to override a field or property, create a `SoapElementAttribute`, using the new, derived type. You can optionally assign a new `ElementName` that overrides the base class's attribute name or namespace.

3.  Add the attribute object to the appropriate `SoapAttributes` property or collection. For example, you would set the `SoapElement` property of the `SoapAttributes` object to the `SoapElementAttribute` and specify the member name that is being overridden.

4.  Create a `SoapAttributeOverrides`.

5.  Add the `SoapAttributes` to the `SoapAttributeOverrides` using the `XmlAttributeOverrides.Add` method. If the object being overridden is a `SoapTypeAttribute`, you need only specify the type of the overridden object. But if you are overriding a field or property, you must also specify the name of the overridden member.

6.  Create an `XmlTypeMapping` using the `SoapReflectionImporter.ImportTypeMapping` method of the `SoapReflectionImporter` class.

7.  When constructing the `XmlSerializer`, pass the `XmlTypeMapping` to the `XmlSerializer.%23ctor` constructor.

8.  Use the resulting `XmlSerializer` to serialize or deserialize the class objects.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapAttributeOverrides.SoapAttributeOverrides() constructor

```csharp
public SoapAttributeOverrides ();
```

Initializes a new instance of the `SoapAttributeOverrides` class.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapAttributeOverrides.Item property

```csharp
public System.Xml.Serialization.SoapAttributes? this[Type type] { get; }
```

Gets the object associated with the specified (base class) type.

Parameters:

- `type`: The base class `Type` that is associated with the collection of attributes you want to retrieve.

Returns: A `SoapAttributes` that represents the collection of overriding attributes.

#### Remarks
Use this overload to return a `SoapAttributes` that contains attributes for a `SoapTypeAttribute`.

#### Examples
The following example creates a `SoapAttributeOverrides` that is used to override the serialization of an instance of the `Group` class. The example also uses the `SoapAttributeOverrides.Item` property to retrieve the `SoapAttributes` that is used to specify how the serialization is being overridden.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Item/attadd2.cs._

## SoapAttributeOverrides.Item property

```csharp
public System.Xml.Serialization.SoapAttributes? this[Type type, string member] { get; }
```

Gets the object associated with the specified (base class) type. The `member` parameter specifies the base class member that is overridden.

Parameters:

- `type`: The base class `Type` that is associated with the collection of attributes you want to override.
- `member`: The name of the overridden member that specifies the `SoapAttributes` to return.

Returns: A `SoapAttributes` that represents the collection of overriding attributes.

#### Remarks
Use this overload to return a `SoapAttributes` that contains attributes that override a `SoapAttributeAttribute`, `SoapElementAttribute`, `SoapIgnoreAttribute`, or `SoapEnumAttribute`. You can also return a `SoapAttributes` that contains the override of a default value that uses a `DefaultValueAttribute`.

If the `SoapAttributes` contains a `SoapTypeAttribute`, you must use the overload that specifies only the overridden type.

#### Examples
The following example creates a `SoapAttributeOverrides` used to override the serialization of an instance of the `Group` class. The example also uses the `SoapAttributeOverrides.Item` property to retrieve the `SoapAttributes` that is used to specify how the serialization is being overridden.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Item/attadd.cs._

## SoapAttributeOverrides.Add(Type, SoapAttributes) method

```csharp
public void Add (Type type, System.Xml.Serialization.SoapAttributes? attributes);
```

Adds a `SoapAttributes` to a collection of `SoapAttributes` objects. The `type` parameter specifies an object to be overridden by the `SoapAttributes`.

Parameters:

- `type`: The `Type` of the object that is overridden.
- `attributes`: A `SoapAttributes` that represents the overriding attributes.

#### Remarks
The `SoapAttributes` contains a union of attribute objects that cause the `XmlSerializer` to override its default serialization behavior for a set of objects. You choose the attribute objects to place in the `SoapAttributes`, depending on the particular behaviors you want to override. For example, the `XmlSerializer` serializes a class member as an XML element by default. If you want the member to be serialized as an XML attribute instead, you would create a `SoapAttributeAttribute`, assign it to the `SoapAttribute` property of a `SoapAttributes`, and add the `XmlAttributes` to the `SoapAttributeOverrides`. Use the `SoapAttributeOverrides.Add` method to add the `SoapAttributes` to the `SoapAttributeOverrides`.

Use this overload to add a `SoapAttributes` that contains a `SoapTypeAttribute`. Because the `SoapTypeAttribute` overrides the serialization of a class, you need not specify a member of the class to override, only the type of the class.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapAttributeOverrides.Add(Type, String, SoapAttributes) method

```csharp
public void Add (Type type, string member, System.Xml.Serialization.SoapAttributes? attributes);
```

Adds a `SoapAttributes` to the collection of `SoapAttributes` objects contained by the `SoapAttributeOverrides`. The `type` parameter specifies the object to be overridden by the `SoapAttributes`. The `member` parameter specifies the name of a member that is overridden.

Parameters:

- `type`: The `Type` of the object to override.
- `member`: The name of the member to override.
- `attributes`: A `SoapAttributes` that represents the overriding attributes.

#### Remarks
The `SoapAttributes` contains a union of attribute objects that cause the `XmlSerializer` to override its default serialization behavior for a set of objects. You choose the attribute objects to place in the `SoapAttributes`, depending on the particular behaviors you want to override. For example, the `XmlSerializer` serializes a class member as an XML element by default. If you want the member to be serialized as a SOAP attribute instead, you would create a `SoapAttributeAttribute`, assign it to the `SoapAttribute` property of a `SoapAttributes`, and add the `XmlAttributes` to the `SoapAttributeOverrides`. Use the `SoapAttributeOverrides.Add` method to add the `SoapAttributes` to the `SoapAttributeOverrides`.

Use this method when the `SoapAttributes` contains either a `SoapAttributeAttribute`, `DefaultValueAttribute``SoapElementAttribute`, `SoapEnumAttribute`, or `SoapIgnoreAttribute`.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._
