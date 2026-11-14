---
title: "XmlTypeMapping class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlTypeMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTypeMapping class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlTypeMapping : System.Xml.Serialization.XmlMapping
```

Contains a mapping of one type to another.

#### Remarks
The `XmlTypeMapping` class is used to serialize an object as encoded SOAP XML. The resulting XML conforms to section 5 of the World Wide Web Consortium document, "Simple Object Access Protocol (SOAP) 1.1". Create an `XmlTypeMapping` by calling the `SoapReflectionImporter.ImportTypeMapping` method of the `SoapReflectionImporter` class. Use the `XmlTypeMapping` to construct an instance of the `XmlSerializer` class. To control the serialization, use one of the attributes listed in Attributes That Control Encoded SOAP Serialization.

#### Examples
The following example serializes an instance of a class named `Transportation` that contains a field named `Vehicle`. A `SoapElementAttribute` is applied to the field. When the field is serialized, the XML element name is "Wheels" instead of "Vehicle". The `SerializeOverride` method creates a `SoapElementAttribute` and sets the `SoapElement` property of a `SoapAttributes` to the `SoapElementAttribute`. The `SoapAttributes` is added to a `SoapAttributeOverrides` that is used to create an `XmlTypeMapping`. An `XmlSerializer` is constructed with the `XmlTypeMapping`, and an instance of the `Transportation` class is again serialized. Because the `SoapElementAttribute` is used to override the serialization, the generated XML element name is now "Truck" instead of "Wheels".

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributes/SoapElement/soapelementoverrides.cs._

## XmlTypeMapping.TypeFullName property

```csharp
public string TypeFullName { get; }
```

The fully qualified type name that includes the namespace (or namespaces) and type.

Returns: The fully qualified type name.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeMapping/TypeFullName/mapping.cs._

## XmlTypeMapping.TypeName property

```csharp
public string TypeName { get; }
```

Gets the type name of the mapped object.

Returns: The type name of the mapped object.

#### Remarks
The type name is the class name of the mapped object.

You can also see the fully qualified name by examining the `TypeFullName` property.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeMapping/TypeFullName/mapping.cs._

## XmlTypeMapping.XsdTypeName property

```csharp
public string? XsdTypeName { get; }
```

Gets the XML element name of the mapped object.

Returns: The XML element name of the mapped object. The default is the class name of the object.

#### Remarks
To set an alternate element name of an object, apply a `SoapTypeAttribute` to the class, and set the `TypeName` property to a new value.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeMapping/TypeFullName/mapping.cs._

## XmlTypeMapping.XsdTypeNamespace property

```csharp
public string? XsdTypeNamespace { get; }
```

Gets the XML namespace of the mapped object.

Returns: The XML namespace of the mapped object. The default is an empty string ("").

#### Remarks
To set a namespace name of an object, apply a `SoapTypeAttribute` to the class, and set the `Namespace` property to a new value.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeMapping/TypeFullName/mapping.cs._
