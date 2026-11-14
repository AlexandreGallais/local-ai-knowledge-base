---
title: "XmlIgnoreAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlIgnoreAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlIgnoreAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlIgnoreAttribute : Attribute
```

Instructs the `XmlSerializer.Serialize` method of the `XmlSerializer` not to serialize the public field or public read/write property value.

#### Remarks
The `XmlIgnoreAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object. If you apply the `XmlIgnoreAttribute` to any member of a class, the `XmlSerializer` ignores the member when serializing or deserializing an instance of the class. For a complete list of similar attributes, see Attributes That Control XML Serialization.

You can override the behavior caused by the `XmlIgnoreAttribute` by creating an `XmlAttributes` object, and setting its `XmlIgnore` property to `false`. You must `XmlAttributeOverrides.Add` the `XmlAttributes` object to an instance of the `XmlAttributeOverrides` class. Lastly, you must use the `XmlAttributeOverrides` object to construct an instance of the `XmlSerializer` class before you call the `XmlSerializer.Serialize` or `XmlSerializer.Deserialize` methods.

The XML Schema Definition Tool (Xsd.exe) occasionally generates the `XmlIgnoreAttribute` when creating classes from a schema file (.xsd). This behavior occurs because value types cannot be set to `null`, but all XML data types can be. Therefore, the tool creates two fields when it encounters an XML type that maps to a value type: one to hold the value and another special field that takes the form of `fieldnameSpecified`, where the `fieldname` is replaced by the name of the field or property. Notice, however, that this special field is generated only when the schema specifies that the element has no minimum occurrence (minOccurs = "0") and that the element has no default value. The `XmlSerializer` sets and checks this special field to determine whether a value has been set for the field or property. Because the special field must not be serialized, the tool applies the `XmlIgnoreAttribute` to it.

For more information about using attributes, see Attributes.

> **Note:**
> You can use the word `XmlIgnore` in your code instead of the longer `XmlIgnoreAttribute`.

#### Examples
The following example shows a class named `Group`, which contains a field named `Comment`. The example assigns the `XmlIgnoreAttribute` to the field, thereby instructing the `XmlSerializer` to ignore the field when serializing or deserializing an instance of the class.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlIgnoreAttribute/Overview/source.cs._

## XmlIgnoreAttribute.XmlIgnoreAttribute() constructor

```csharp
public XmlIgnoreAttribute ();
```

Initializes a new instance of the `XmlIgnoreAttribute` class.

#### Examples
The following example shows a class named `Group`, which contains a field named `Comment`. The example assigns the `XmlIgnoreAttribute` to the field, thereby instructing the `XmlSerializer` to ignore the field when serializing or deserializing an instance of the class.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlIgnoreAttribute/Overview/source.cs._
