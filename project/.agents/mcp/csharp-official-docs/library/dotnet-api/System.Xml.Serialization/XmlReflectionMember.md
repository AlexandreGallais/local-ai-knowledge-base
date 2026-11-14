---
title: "XmlReflectionMember class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlReflectionMember.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReflectionMember class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlReflectionMember
```

Provides mappings between code entities in .NET Web service methods and the content of Web Services Description Language (WSDL) messages that are defined for SOAP Web services.

#### Remarks
The `XmlReflectionMember` class is not used directly. Instead, it is used:

- To initialize `XmlSerializer` objects while .NET is initializing a SOAP Web service or client.

- By the `ServiceDescriptionReflector` class while `ServiceDescriptionReflector` creates `ServiceDescription` objects from classes that are identified as SOAP Web services.

During reflection of a SOAP Web service method, arrays of `XmlReflectionMember` objects are produced that represent the contents of WSDL message definitions. An array is produced for each of the following items that belong to a SOAP Web service method:

- Input parameters.

- Output parameters and return values.

- Request SOAP headers via attributes.

- Response SOAP headers via attributes.

The `SoapReflectionImporter` and `XmlReflectionImporter` classes translate an `XmlReflectionMember` array into an `XmlMembersMapping` that contains an `XmlMemberMapping` collection, for further processing.

## XmlReflectionMember.XmlReflectionMember() constructor

```csharp
public XmlReflectionMember ();
```

Initializes a new instance of the `XmlReflectionMember` class.

To be added.

## XmlReflectionMember.IsReturnValue property

```csharp
public bool IsReturnValue { get; set; }
```

Gets or sets a value that indicates whether the `XmlReflectionMember` represents a Web service method return value, as opposed to an output parameter.

Returns: `true`, if the member represents a Web service return value; otherwise, `false`.

#### Remarks
You do not need to use the `XmlReflectionMember` class and its properties directly.

## XmlReflectionMember.MemberName property

```csharp
public string MemberName { get; set; }
```

Gets or sets the name of the Web service method member for this mapping.

Returns: The name of the Web service method.

#### Remarks
The Web service method member may be an input parameter, an output parameter, a return type, an input header, or an output header.

You do not need to use the `XmlReflectionMember` class and its properties directly.

See the `XmlMembersMapping` class for the cases when a member corresponds to a `<part>` element defined in a Web Services Description Language (WSDL) document. Note, however, that with a wrapped binding between a WSDL operation and a .NET method (indicated by the `Wrapped` enumeration member), the method parameters and return value do not appear in the WSDL document.

When a Web service method is being reflected, the return type's `MemberName` property becomes the method name (made unique from other member names, if necessary) with "Result" appended.

## XmlReflectionMember.MemberType property

```csharp
public Type? MemberType { get; set; }
```

Gets or sets the type of the Web service method member code entity that is represented by this mapping.

Returns: The `Type` of the Web service method member code entity that is represented by this mapping.

#### Remarks
The Web service method member's code entity may be an input parameter, an output parameter, a return type, or a SOAP header attribute.

You do not need to use the `XmlReflectionMember` class and its properties directly.

See the `XmlMembersMapping` class for the cases when a member corresponds to a part element defined in a Web Services Description Language (WSDL) document. Note, however, that with a wrapped binding between a WSDL operation and a .NET method (indicated by the `Wrapped` enumeration member), the method parameters and return value do not appear in the WSDL document.

## XmlReflectionMember.OverrideIsNullable property

```csharp
public bool OverrideIsNullable { get; set; }
```

Gets or sets a value that indicates that the value of the corresponding XML element definition's `isNullable` attribute is `false`.

Returns: `true` to override the `XmlElementAttribute.IsNullable` property; otherwise, `false`.

#### Remarks
This setting overrides the `IsNullable` property of the `XmlElementAttribute` attribute. It is set to `true` only when a SOAP header's type is neither `SoapHeader` nor `SoapUnknownHeader`.

You do not need to use the `XmlReflectionMember` class and its properties directly.

## XmlReflectionMember.SoapAttributes property

```csharp
public System.Xml.Serialization.SoapAttributes SoapAttributes { get; set; }
```

Gets or sets a `SoapAttributes` with the collection of SOAP-related attributes that have been applied to the member code entity.

Returns: A `SoapAttributes` that contains the objects that represent SOAP attributes applied to the member.

#### Remarks
The Web service method member's code entity may be an input parameter, an output parameter, a return type, an input SOAP header attribute, or an output SOAP header attribute.

You do not need to use the `XmlReflectionMember` class and its properties directly.

## XmlReflectionMember.XmlAttributes property

```csharp
public System.Xml.Serialization.XmlAttributes XmlAttributes { get; set; }
```

Gets or sets an `XmlAttributes` with the collection of `XmlSerializer`-related attributes that have been applied to the member code entity.

Returns: An `XmlAttributes` that represents XML attributes that have been applied to the member code.

#### Remarks
The Web service method member's code entity may be an input parameter, an output parameter, a return type, an input SOAP header attribute, or an output SOAP header attribute.

You do not need to use the `XmlReflectionMember` class and its properties directly.
