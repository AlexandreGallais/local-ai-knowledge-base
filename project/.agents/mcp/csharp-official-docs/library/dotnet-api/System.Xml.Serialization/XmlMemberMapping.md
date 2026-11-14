---
title: "XmlMemberMapping class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlMemberMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlMemberMapping class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlMemberMapping
```

Maps a code entity in a .NET Web service method to an element in a Web Services Description Language (WSDL) message.

#### Remarks
The `XmlMemberMapping` class is used with the `XmlMembersMapping` class, which references an array of `XmlMemberMapping` objects.

An `XmlMemberMapping` object can represent any one of the following:

- A Web service method input parameter.

- A Web service method output parameter.

- A Web service return type, if not void.

- A SOAP input header.

- A SOAP output header.

The `XmlMemberMapping` objects are accessible through the indexed operator property.

See the `XmlMembersMapping` class for an explanation of the conditions under which an `XmlMemberMapping` object corresponds to a WSDL message definition's `<part>` element.

## XmlMemberMapping.Any property

```csharp
public bool Any { get; }
```

Gets or sets a value that indicates whether the .NET type maps to an XML element or attribute of any type.

Returns: `true`, if the type maps to an XML any element or attribute; otherwise, `false`.

#### Remarks
A true value for the `Any` property corresponds to the `<any>` element declaration and the `anyAttribute` attribute declaration in an XML Schema document.

## XmlMemberMapping.CheckSpecified property

```csharp
public bool CheckSpecified { get; }
```

Gets a value that indicates whether the accompanying field in the .NET type has a value specified.

Returns: `true`, if the accompanying field has a value specified; otherwise, `false`.

#### Remarks
In the XML Schema, an element declared with a `minOccurs="0"` attribute value indicates that the element is optional. An attribute can be declared with a `use="optional"` attribute. .NET, using the XML Schema Definition Tool (Xsd.exe), maps either of these constructs to a public field or property that is accompanied by a public field of type `bool` whose name is the first field's name with "Specified" appended. The `CheckSpecified` property checks whether such a `bool` field exists.

## XmlMemberMapping.ElementName property

```csharp
public string ElementName { get; }
```

Gets the unqualified name of the XML element declaration that applies to this mapping.

Returns: The unqualified name of the XML element declaration that applies to this mapping.

To be added.

## XmlMemberMapping.MemberName property

```csharp
public string MemberName { get; }
```

Gets the name of the Web service method member that is represented by this mapping.

Returns: The name of the Web service method member represented by this mapping.

#### Remarks
The Web service method member can be an input parameter, output parameter, return type, input header, or output header.

See the `XmlMembersMapping` class for cases when a member corresponds to a `<part>` element defined in a Web Services Description Language (WSDL) document. Note, however, that with a wrapped binding between a WSDL operation and a .NET method, (indicated by the `Wrapped` enumeration member), the method parameters and return value do not appear in the WSDL document.

When a Web service class is being reflected into a `ServiceDescription` object, the return type's `MemberName` property becomes the method name (made unique from other member names, if necessary) with "Result" appended. This convention also is used, in some circumstances, while importing Web service classes from `ServiceDescription` objects generated from WSDL documents.

## XmlMemberMapping.Namespace property

```csharp
public string? Namespace { get; }
```

Gets the XML namespace that applies to this mapping.

Returns: The XML namespace that applies to this mapping.

To be added.

## XmlMemberMapping.TypeFullName property

```csharp
public string TypeFullName { get; }
```

Gets the fully qualified type name of the .NET type for this mapping.

Returns: The fully qualified type name of the .NET type for this mapping.

To be added.

## XmlMemberMapping.TypeName property

```csharp
public string? TypeName { get; }
```

Gets the type name of the .NET type for this mapping.

Returns: The type name of the .NET type for this mapping.

To be added.

## XmlMemberMapping.TypeNamespace property

```csharp
public string? TypeNamespace { get; }
```

Gets the namespace of the .NET type for this mapping.

Returns: The namespace of the .NET type for this mapping.

To be added.

## XmlMemberMapping.XsdElementName property

```csharp
public string XsdElementName { get; }
```

Gets the XML element name as it appears in the service description document.

Returns: The XML element name.

To be added.
