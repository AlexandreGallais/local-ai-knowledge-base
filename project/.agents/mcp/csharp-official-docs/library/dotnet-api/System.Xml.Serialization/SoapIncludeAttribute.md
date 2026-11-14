---
title: "SoapIncludeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/SoapIncludeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SoapIncludeAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class SoapIncludeAttribute : Attribute
```

Allows the `XmlSerializer` to recognize a type when it serializes or deserializes an object as encoded SOAP XML.

#### Remarks
The `SoapIncludeAttribute` class belongs to a family of attributes that controls how the `XmlSerializer` serializes, or deserializes, an object as encoded SOAP XML. The resulting XML conforms to section 5 of the World Wide Web Consortium document, Simple Object Access Protocol (SOAP) 1.1. For a complete list of similar attributes, see Attributes That Control Encoded SOAP Serialization.

To serialize an object as an encoded SOAP message, you must construct the `XmlSerializer` using an `XmlTypeMapping` created with the `SoapReflectionImporter.ImportTypeMapping` method of the `SoapReflectionImporter` class.

When applying the `SoapIncludeAttribute`, specify the `Type` of the derived class. When the `XmlSerializer` serializes objects that include both the base and the derived classes, it can then recognize both object types.

You can use the `SoapIncludeAttribute` to include derived classes in service description documents that are written in the Web Services Description Language (WSDL). For example, if a method returns an `Object`, apply the `SoapIncludeAttribute` to the method and specify the actual types that should be returned.

For more information about WSDL, see World Wide Web Consortium specification, Web Services Description Language (WSDL) 1.1.

For more information about using attributes, see Attributes.

#### Examples
The following example applies the `SoapIncludeAttribute` twice to an XML Web service method. The method returns an object of type `Vehicle` (a base class). The `SoapIncludeAttribute` allows the method to return instances of classes derived from the `Vehicle` class.

## SoapIncludeAttribute.SoapIncludeAttribute(Type) constructor

```csharp
public SoapIncludeAttribute (Type type);
```

Initializes a new instance of the `SoapIncludeAttribute` class using the specified type.

Parameters:

- `type`: The type of the object to include.

#### Remarks
Apply multiple instances of the `SoapIncludeAttribute` to a field or property that returns either an array of objects, an `ArrayList` that contains a collection of objects, or an object that can return multiple types. Set the `Type` property for each type that you want the field or property to contain.

#### Examples
The following example applies the `SoapIncludeAttribute` twice to an XML Web services method. The method returns an object of type `Vehicle` (a base class). The `SoapIncludeAttribute` allows the method to return instances of classes derived from the `Vehicle` class.

## SoapIncludeAttribute.Type property

```csharp
public Type Type { get; set; }
```

Gets or sets the type of the object to use when serializing or deserializing an object.

Returns: The type of the object to include.

#### Remarks

Apply multiple instances of the `SoapIncludeAttribute` to a field or property that returns either an array of objects, an `ArrayList` that contains a collection of objects, or an object that can return multiple types. Set the `Type` property for each type that you want the field or property to contain.
