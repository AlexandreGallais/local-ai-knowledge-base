---
title: "XmlArrayItemAttribute class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlArrayItemAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlArrayItemAttribute class (part 2 of 2)

## XmlArrayItemAttribute.NestingLevel property

```csharp
public int NestingLevel { get; set; }
```

Gets or sets the level in a hierarchy of XML elements that the `XmlArrayItemAttribute` affects.

Returns: The zero-based index of a set of indexes in an array of arrays.

#### Remarks
An XML document can contain hierarchies of XML elements. To represent such a hierarchy, an array of arrays is used. In such an array, each index represents a level in the hierarchy. Therefore, the `NestingLevel` property is only used when applying an `XmlArrayItemAttribute` to a field that returns an array of arrays.

When applying the attribute, specify which hierarchy level the attribute affects by setting the `NestingLevel`. The first index always has the value of 0; therefore it is optional to set its `NestingLevel` --an `XmlArrayItemAttribute` without a `NestingLevel` value is applied to the first array index. Only the subsequent `XmlArrayItemAttribute` objects require `NestingLevel` values specified (as 1, 2, 3, and so forth).

#### Examples
The following example applies three `XmlArrayItemAttribute` attributes to an array of arrays. To specify which of the arrays each attribute applies to, the `NestingLevel` property is set to the index of the arrays.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/NestingLevel/nestinglevel.cs._
## XmlArrayItemAttribute.Type property

```csharp
public Type? Type { get; set; }
```

Gets or sets the type allowed in an array.

Returns: A `Type` that is allowed in the array.

#### Remarks
Use the `Type` property to specify an overridden type for a public field or public read/write property value.

If a field or property returns an array of type `Object`, apply multiple instances of the `XmlArrayItemAttribute` to the field or property. For each instance, set the `Type` property to a type of object that can be inserted into the array.

If an array contains only primitive types, you do not need to apply the `XmlArrayItemAttribute`. By default, the `XmlSerializer` generates a series of elements, each with the same element name, for each value, but the type of each element is set to the XML Schema data type. For example, the following code:

```
' Visual Basic code
Public Class Arrays
   Public XSDTypes ()As Object= New Object(){"one", 2, 3.0}
End Class
// C# code
public class MyArray{
   // No XmlArrayItemAttribute is applied.
   public object[] XSDTypes= new object[]{"one", 2, 3.2};
}
```

results in this XML:

```
<?xml version="1.0" encoding="utf-8"?>
<Arrays xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <XSDTypes>
    <Object xsi:type="xsd:string">one</Object>
    <Object xsi:type="xsd:int">2</Object>
    <Object xsi:type="xsd:double">3</Object>
  </XSDTypes>
</Arrays>
```

However, if you specify the `Type` property for each primitive type, the element name for each value is generated using the .NET type name. For example this code:

```
' Visual Basic code
Public Class Arrays
   <XmlArrayItem(GetType(String)), _
   XmlArrayItem(GetType(Integer)), _
   XmlArrayItem(GetType(Double))> _
   Public PrimitiveTypes () As Object = New Object(){"one", 2, 3.0}
End Class
// C# code
public class Arrays{
   [XmlArrayItem(typeof(string))]
   [XmlArrayItem(typeof(int))]
   [XmlArrayItem(typeof(double))]
   public object [] PrimitiveTypes = new object[]{"one", 2, 3.0};
}
```

results in this XML:

```
<?xml version="1.0" encoding="utf-8"?>
<Arrays xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <PrimitiveTypes>
    <string>one</string>
    <int>2</int>
    <double>3</double>
  </PrimitiveTypes>
</Arrays>
```

#### Examples
The following example serializes an array of objects. The field that returns the array is attributed with two `XmlArrayItemAttribute` instances. Each instance instructs the `XmlSerializer` to accept the specified `Type` in the array.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlArrayItemAttribute/Type/source.cs._
