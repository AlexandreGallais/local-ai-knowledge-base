---
title: "XmlEnumAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlEnumAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlEnumAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlEnumAttribute : Attribute
```

Controls how the `XmlSerializer` serializes an enumeration member.

#### Remarks
The `XmlEnumAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object. For a complete list of similar attributes, see Attributes That Control XML Serialization.

Use the `XmlEnumAttribute` to change the enumeration that the `XmlSerializer` generates or recognizes (when it serializes or deserializes a class, respectively). For example, if an enumeration contains a member named `One`, but you prefer that the XML output be named `Single`, apply the `XmlEnumAttribute` to the enumeration member and set the `Name` property to "Single".

You can override the `Name` property value of an `XmlEnumAttribute` by creating an instance of the `XmlEnumAttribute` class and assigning it to the `XmlEnum` property of an `XmlAttributes` object. For details, see the `XmlAttributeOverrides` class.

> **Note:**
> You can use the word `XmlEnum` in your code instead of the longer `XmlEnumAttribute`.

#### Examples
The following example applies the `XmlEnumAttribute` to the members of an enumeration. When the `XmlSerializer` generates XML data for this enumeration, the data conforms to the values of the `Name` properties.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlEnumAttribute/Overview/source.cs._

> **Note:**
> You can use the word `XmlEnum` in your code instead of the longer `XmlEnumAttribute`.

## XmlEnumAttribute.XmlEnumAttribute() constructor

```csharp
public XmlEnumAttribute ();
```

Initializes a new instance of the `XmlEnumAttribute` class.

#### Remarks
You can use the `XmlEnumAttribute.%23ctor` to override an existing enumeration.

> **Note:**
> You can use the word `XmlEnum` in your code instead of the longer `XmlEnumAttribute`.

#### Examples
The following example serializes two classes named `Food` and `FoodType`. The `FoodType` class contains two enumerations that are overridden and, for each enumeration, the example creates an `XmlEnumAttribute` object that is assigned to the `XmlEnum` property of an `XmlAttributes` object. The example then adds the `XmlAttributes` object to an `XmlAttributeOverrides` object, which is used to create an `XmlSerializer`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlEnumAttribute/.ctor/source1.cs._

## XmlEnumAttribute.XmlEnumAttribute(String) constructor

```csharp
public XmlEnumAttribute (string? name);
```

Initializes a new instance of the `XmlEnumAttribute` class, and specifies the XML value that the `XmlSerializer` generates or recognizes (when it serializes or deserializes the enumeration, respectively).

Parameters:

- `name`: The overriding name of the enumeration member.

#### Remarks

> **Note:**
> You can use the word `XmlEnum` in your code instead of the longer `XmlEnumAttribute`.

#### Examples
The following example applies the `XmlEnumAttribute` to the members of an enumeration. When the `XmlSerializer` generates XML data for this enumeration, the data conforms to the values of the `Name` properties.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlEnumAttribute/.ctor/source.cs._

## XmlEnumAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the value generated in an XML-document instance when the `XmlSerializer` serializes an enumeration, or the value recognized when it deserializes the enumeration member.

Returns: The value generated in an XML-document instance when the `XmlSerializer` serializes the enumeration, or the value recognized when it is deserializes the enumeration member.

#### Remarks
Specify the `Name` when you want the generated XML data to differ from the enumeration identifier.

> **Note:**
> You can use the word `XmlEnum` in your code instead of the longer `XmlEnumAttribute`.

#### Examples
The following example applies the `XmlEnumAttribute` attribute to members of an enumeration. The generated XML data conforms to the values set for the `Name` property.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlEnumAttribute/.ctor/source.cs._
