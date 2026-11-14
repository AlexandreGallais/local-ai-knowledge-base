---
title: "XmlAttributeOverrides class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAttributeOverrides.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttributeOverrides class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlAttributeOverrides
```

Allows you to override property, field, and class attributes when you use the `XmlSerializer` to serialize or deserialize an object.

#### Remarks
The `XmlAttributeOverrides` enables the `XmlSerializer` to override the default way of serializing a set of objects. Overriding serialization in this way has two uses: first, you can control and augment the serialization of objects found in a DLL--even if you do not have access to the source; second, you can create one set of serializable classes, but serialize the objects in multiple ways. For example, instead of serializing members of a class instance as XML elements, you can serialize them as XML attributes, resulting in a more efficient document to transport.

After you create an `XmlAttributeOverrides` object, you pass it as an argument to the `XmlSerializer.%23ctor` constructor. The resulting `XmlSerializer` uses the data contained by the `XmlAttributeOverrides` to override attributes that control how objects are serialized. To accomplish this, the `XmlAttributeOverrides` contains a collection of the object types that are overridden, as well as an `XmlAttributes` object associated with each overridden object type. The `XmlAttributes` object itself contains an appropriate set of attribute objects that control how each field, property, or class is serialized.

The process for creating and using an `XmlAttributeOverrides` object is as follows:

1.  Create an `XmlAttributes` object.

2.  Create an attribute object that is appropriate to the object being overridden. For example, to override a field or property, create an `XmlElementAttribute`, using the new, derived type. You can optionally assign a new `ElementName`, or `Namespace` that overrides the base class's attribute name or namespace.

3.  Add the attribute object to the appropriate `XmlAttributes` property or collection. For example, you would add the `XmlElementAttribute` to the `XmlElements` collection of the `XmlAttributes` object, specifying the member name that is being overridden.

4.  Create an `XmlAttributeOverrides` object.

5.  Using the `XmlAttributeOverrides.Add` method, add the `XmlAttributes` object to the `XmlAttributeOverrides` object. If the object being overridden is an `XmlRootAttribute` or `XmlTypeAttribute`, you need only to specify the type of the overridden object. But if you are overriding a field or property, you must also specify the name of the overridden member.

6.  When constructing the `XmlSerializer`, pass the `XmlAttributeOverrides` to the `XmlSerializer.%23ctor` constructor.

7.  Use the resulting `XmlSerializer` to serialize or deserialize the derived class objects.

#### Examples
The following example serializes a class named `Orchestra`, which contains a single field named `Instruments` that returns an array of `Instrument` objects. A second class named `Brass` inherits from the `Instrument` class. The example uses an instance of the `XmlAttributeOverrides` class to override the `Instrument` field, allowing the field to accept `Brass` objects.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeOverrides/Overview/source.cs._

## XmlAttributeOverrides.XmlAttributeOverrides() constructor

```csharp
public XmlAttributeOverrides ();
```

Initializes a new instance of the `XmlAttributeOverrides` class.

To be added.

## XmlAttributeOverrides.Item property

```csharp
public System.Xml.Serialization.XmlAttributes? this[Type type] { get; }
```

Gets the object associated with the specified, base-class, type.

Parameters:

- `type`: The base class `Type` that is associated with the collection of attributes you want to retrieve.

Returns: An `XmlAttributes` that represents the collection of overriding attributes.

#### Remarks
Use this overload to return an `XmlAttributes` object that contains attributes for an `XmlRootAttribute` or `XmlTypeAttribute` object.

If the `XmlAttributes` object contains objects that override an `XmlArrayAttribute`, `XmlArrayItemAttribute`, `XmlElementAttribute`, `XmlEnumAttribute`, or `XmlAttributeAttribute`, you must use the overload that specifies the overridden member as well as the type.

#### Examples
The following example creates an `XmlAttributeOverrides` object, an `XmlAttributes` object, and an `XmlRootAttribute` object. The example assigns the `XmlRootAttribute` to the `XmlRoot` property of the `XmlAttributes` object, and adds the `XmlAttributes` object to the `XmlAttributeOverrides` object. Lastly, the example gets the `XmlAttributes` object by passing the `Type` of the serialized class to the `XmlAttributeOverrides` object. In this example, the `Type` is `Group`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeOverrides/Item/source.cs._

## XmlAttributeOverrides.Item property

```csharp
public System.Xml.Serialization.XmlAttributes? this[Type type, string member] { get; }
```

Gets the object associated with the specified (base-class) type. The member parameter specifies the base-class member that is overridden.

Parameters:

- `type`: The base class `Type` that is associated with the collection of attributes you want.
- `member`: The name of the overridden member that specifies the `XmlAttributes` to return.

Returns: An `XmlAttributes` that represents the collection of overriding attributes.

#### Remarks
Use this overload to return an `XmlAttributes` object that contains objects that override an `XmlArrayAttribute`, `XmlArrayItemAttribute`, `XmlAttributeAttribute`, `XmlElementAttribute`, or `XmlEnumAttribute`. If the `XmlAttributes` object contains an `XmlRootAttribute` or `XmlTypeAttribute`, you must use the overload that specifies only the overridden type.

#### Examples
The following example creates an `XmlAttributeOverrides` object, an `XmlAttributes`, and an `XmlAttributeAttribute` object. The example assigns the `XmlAttributeAttribute` to the `XmlAttribute` property of the `XmlAttributes` object and adds the `XmlAttributes` object to the `XmlAttributeOverrides` object. Lastly, the example gets the `XmlAttributes` object by passing the `Type` of the serialized class and member name to the `XmlAttributeOverrides` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeOverrides/Item/source1.cs._

## XmlAttributeOverrides.Add(Type, XmlAttributes) method

```csharp
public void Add (Type type, System.Xml.Serialization.XmlAttributes attributes);
```

Adds an `XmlAttributes` object to the collection of `XmlAttributes` objects. The `type` parameter specifies an object to be overridden by the `XmlAttributes` object.

Parameters:

- `type`: The `Type` of the object that is overridden.
- `attributes`: An `XmlAttributes` object that represents the overriding attributes.

#### Remarks
The `XmlAttributes` object contains a union of attribute objects that cause the `XmlSerializer` to override its default serialization behavior for a set of objects. You choose the attribute objects to place in the `XmlAttributes` object, depending on the particular behaviors you want to override. For example, the `XmlSerializer` serializes a class member as an XML element by default. If you want the member to be serialized as an XM attribute instead, you would create an `XmlAttributeAttribute`, assign it to the `XmlAttribute` property of an `XmlAttributes`, and add the `XmlAttributes` object to the `XmlAttributeOverrides` object.

Use this overload to override an `XmlRootAttribute` or `XmlTypeAttribute`.

#### Examples
The following example serializes a class named `Band`, which is derived from a class named `Orchestra`. The example creates an `XmlRootAttribute` object, and assigns it to the `XmlRoot` property of an `XmlAttributes` object. The example then calls the `XmlAttributeOverrides.Add` method to add the `XmlAttributes` object to the `XmlAttributeOverrides` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeOverrides/Add/source.cs._

## XmlAttributeOverrides.Add(Type, String, XmlAttributes) method

```csharp
public void Add (Type type, string member, System.Xml.Serialization.XmlAttributes? attributes);
```

Adds an `XmlAttributes` object to the collection of `XmlAttributes` objects. The `type` parameter specifies an object to be overridden. The `member` parameter specifies the name of a member that is overridden.

Parameters:

- `type`: The `Type` of the object to override.
- `member`: The name of the member to override.
- `attributes`: An `XmlAttributes` object that represents the overriding attributes.

#### Remarks
The `XmlAttributes` object contains a union of attribute objects that cause the `XmlSerializer` to override its default serialization behavior for a set of objects. You choose the attribute objects to place in the `XmlAttributes` object, depending on the particular behaviors you want to override. For example, the `XmlSerializer` serializes a class member as an XML element by default. If you want the member to be serialized as an XML attribute instead, you would create an `XmlAttributeAttribute`, assign it to the `XmlAttribute` property of an `XmlAttributes`, and add the `XmlAttributes` object to the `XmlAttributeOverrides` object.

Use this method when attempting to override an `XmlElementAttribute`, `XmlAttributeAttribute`, `XmlArrayAttribute`, `XmlArrayItemAttribute`, or `XmlIgnoreAttribute`.

#### Examples
The following example creates an `XmlAttributeAttribute` object, and assigns it to the `XmlAttribute` property of an `XmlAttributes` object. The example then adds the `XmlAttributes` object to an `XmlAttributeOverrides` object, before creating an `XmlSerializer`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeOverrides/Add/source1.cs._
