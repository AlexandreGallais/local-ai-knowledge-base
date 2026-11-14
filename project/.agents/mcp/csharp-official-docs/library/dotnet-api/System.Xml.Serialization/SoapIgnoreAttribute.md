---
title: "SoapIgnoreAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/SoapIgnoreAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SoapIgnoreAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class SoapIgnoreAttribute : Attribute
```

Instructs the `XmlSerializer` not to serialize the public field or public read/write property value.

#### Remarks
The `SoapIgnoreAttribute` class belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object as encoded SOAP XML. The resulting XML conforms to section 5 of the World Wide Web Consortium document, Simple Object Access Protocol (SOAP) 1.1. For a complete list of similar attributes, see Attributes That Control Encoded SOAP Serialization.

To serialize an object as an encoded SOAP message, you must construct the `XmlSerializer` using an `XmlTypeMapping` created with the `SoapReflectionImporter.ImportTypeMapping` method of the `SoapReflectionImporter` class.

Apply the `SoapIgnoreAttribute` to any class member that you want the `XmlSerializer` to ignore when an instance of the class is serialized. For example, you may do this when the member is used to contain metadata about the object being serialized.

For more information about using attributes, see Attributes.

> **Note:**
> You can use the word `SoapIgnore` in your code instead of the longer `SoapIgnoreAttribute`.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapIgnoreAttribute.SoapIgnoreAttribute() constructor

```csharp
public SoapIgnoreAttribute ();
```

Initializes a new instance of the `SoapIgnoreAttribute` class.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._
