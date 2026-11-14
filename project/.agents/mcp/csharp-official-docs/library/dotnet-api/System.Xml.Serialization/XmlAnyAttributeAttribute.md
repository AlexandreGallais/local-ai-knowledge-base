---
title: "XmlAnyAttributeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAnyAttributeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAnyAttributeAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlAnyAttributeAttribute : Attribute
```

Specifies that the member (a field that returns an array of `XmlAttribute` objects) can contain any XML attributes.

#### Remarks
Use the `XmlAnyAttributeAttribute` to contain arbitrary data (as XML attributes) that is sent as part of an XML document, such as, metadata sent as part of the document.

Apply the `XmlAnyAttributeAttribute` to a field that returns an array of `XmlAttribute` or `XmlNode` objects. When the `XmlSerializer.Deserialize` method of the `XmlSerializer` class is called, all XML attributes that do not have a corresponding member in the class being deserialized are collected in the array. After deserialization, you can iterate through the collection of `XmlAttribute` items to process the data.

The `UnknownNode` and `UnknownAttribute` events of the `XmlSerializer` do not occur if you apply the `XmlAnyAttributeAttribute` to a member of a class.

> **Note:**
> You can use the word `XmlAnyAttribute` in your code instead of the longer `XmlAnyAttributeAttribute`.

For more information about using attributes, see Attributes.

#### Examples
The following example collects all unknown attributes into an array of `XmlAttribute` objects. To try the example, create a file named `UnknownAttributes.xml` that contains the following XML:

```
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema"
GroupType = 'Technical' GroupNumber = '42' GroupBase = 'Red'>
  <GroupName>MyGroup</GroupName>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyAttributeAttribute/Overview/anyattribute.cs._

## XmlAnyAttributeAttribute.XmlAnyAttributeAttribute() constructor

```csharp
public XmlAnyAttributeAttribute ();
```

Constructs a new instance of the `XmlAnyAttributeAttribute` class.

#### Examples
The following example constructs an `XmlAnyAttributeAttribute` that is used to override the deserialization of an object. To try the example, create a file named UnknownAttributes.xml that contains the following XML:

```
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" GroupType = 'Technical' GroupNumber = '42' GroupBase = 'Red'>
  <GroupName>MyGroup</GroupName>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAnyAttributeAttribute/.ctor/anyattover.cs._
