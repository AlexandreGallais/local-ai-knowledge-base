---
title: "SoapReflectionImporter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/SoapReflectionImporter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SoapReflectionImporter class

Namespace: `System.Xml.Serialization`

```csharp
public class SoapReflectionImporter
```

Generates mappings to SOAP-encoded messages from .NET types or Web service method information.

#### Remarks
The `SoapReflectionImporter` class provides type mappings to SOAP-encoded message parts, as defined in a Web Services Description Language (WSDL) document. It is used only when a Web service or client specifies SOAP encoding, as described in Section 5 of the SOAP 1.1 specification.

#### Examples
The following example serializes a class named `Group`. The serialization of the `GroupName` and `IgnoreThis` fields and the members of the `GroupType` enumeration are overridden. In the `CreateOverrideSerializer` method, a `SoapAttributeOverrides` is created, and for each overridden member or enumeration, a `SoapAttributes` is created with the appropriate property set and added to the `SoapAttributeOverrides`. An `XmlTypeMapping` is created using the `SoapAttributeOverrides`, and that `XmlTypeMapping` is used to create the `XmlSerializer` that overrides the default serialization.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/SoapAttributeOverrides/Overview/soapover.cs._

## SoapReflectionImporter.SoapReflectionImporter() constructor

```csharp
public SoapReflectionImporter ();
```

Initializes a new instance of the `SoapReflectionImporter` class.

To be added.

## SoapReflectionImporter.SoapReflectionImporter(String) constructor

```csharp
public SoapReflectionImporter (string? defaultNamespace);
```

Initializes a new instance of the `SoapReflectionImporter` class, specifying a default XML namespace for imported type mappings.

Parameters:

- `defaultNamespace`: The default XML namespace to use for imported type mappings.

To be added.

## SoapReflectionImporter.SoapReflectionImporter(SoapAttributeOverrides) constructor

```csharp
public SoapReflectionImporter (System.Xml.Serialization.SoapAttributeOverrides? attributeOverrides);
```

Initializes a new instance of the `SoapReflectionImporter` class, specifying overrides for XML serialization.

Parameters:

- `attributeOverrides`: A `SoapAttributeOverrides` object that overrides how the `XmlSerializer` class serializes mapped types using SOAP encoding.

To be added.

## SoapReflectionImporter.SoapReflectionImporter(SoapAttributeOverrides, String) constructor

```csharp
public SoapReflectionImporter (System.Xml.Serialization.SoapAttributeOverrides? attributeOverrides, string? defaultNamespace);
```

Initializes a new instance of the `SoapReflectionImporter` class, specifying XML serialization overrides and a default XML namespace.

Parameters:

- `attributeOverrides`: A `SoapAttributeOverrides` object that overrides how the `XmlSerializer` class serializes mapped types using SOAP encoding.
- `defaultNamespace`: The default XML namespace to use for imported type mappings.

To be added.

## SoapReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[]) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members);
```

Generates internal type mappings for information that is gathered from a Web service method.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of .NET code entities that belong to a Web service method.

Returns: Internal .NET type mappings to the element parts of a WSDL message definition.

#### Remarks
The `SoapReflectionImporter.ImportMembersMapping` method is called while initializing a Web service or client, or reflecting a Web service. You do not need to call it directly.

The following list describes possible values for the `members` parameter:

- Web service method input parameters.

- Web service method output parameters, plus the return type, if not void, at index zero.

- SOAP input headers.

- SOAP output headers.

## SoapReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[], Boolean, Boolean) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members, bool hasWrapperElement, bool writeAccessors);
```

Generates internal type mappings for information that is gathered from a Web service method.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of .NET code entities that belong to a Web service method.
- `hasWrapperElement`: `true` to indicate that elements that correspond to WSDL message parts should be enclosed in an extra wrapper element in a SOAP message; otherwise, `false`.
- `writeAccessors`: `true` to indicate an RPC-style Web service binding; `false` to indicate a document-style Web service binding or a SOAP header.

Returns: Internal .NET type mappings to the element parts of a WSDL message definition.

#### Remarks
The `SoapReflectionImporter.ImportMembersMapping` method is called while initializing a Web service or client, or reflecting a Web service. You do not need to call it directly.

The following list describes possible values for the `members` parameter:

- Web service method input parameters.

- Web service method output parameters, plus the return type, if not void, at index zero.

- SOAP input headers.

- SOAP output headers.

## SoapReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[], Boolean, Boolean, Boolean) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members, bool hasWrapperElement, bool writeAccessors, bool validate);
```

Generates internal type mappings for information that is gathered from a Web service method.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of .NET code entities that belong to a Web service method.
- `hasWrapperElement`: `true` to indicate that elements that correspond to WSDL message parts should be enclosed in an extra wrapper element in a SOAP message; otherwise, `false`.
- `writeAccessors`: `true` to indicate an RPC-style Web service binding; `false` to indicate a document-style Web service binding or a SOAP header.
- `validate`: `true` to indicate that a generated deserializer should check for the expected qualified name of the wrapper element; otherwise, `false`. This parameter's value is relevant only if the `hasWrapperElement` parameter's value is `true`.

Returns: Internal .NET type mappings to the element parts of a WSDL message definition.

#### Remarks
The `SoapReflectionImporter.ImportMembersMapping` method is called while initializing a Web service or client, or reflecting a Web service. You do not need to call it directly.

The following list describes possible values for the `members` parameter:

- Web service method input parameters.

- Web service method output parameters, plus the return type, if not void, at index zero.

- SOAP input headers.

- SOAP output headers.

## SoapReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[], Boolean, Boolean, Boolean, XmlMappingAccess) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members, bool hasWrapperElement, bool writeAccessors, bool validate, System.Xml.Serialization.XmlMappingAccess access);
```

Generates internal type mappings for information that is gathered from a Web service method.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of .NET code entities that belong to a Web service method.
- `hasWrapperElement`: `true` to indicate that elements that correspond to WSDL message parts should be enclosed in an extra wrapper element in a SOAP message; otherwise, `false`.
- `writeAccessors`: `true` to indicate an RPC-style Web service binding; `false` to indicate a document-style Web service binding or a SOAP header.
- `validate`: `true` to indicate that a generated deserializer should check for the expected qualified name of the wrapper element; otherwise, `false`. This parameter's value is relevant only if the `hasWrapperElement` parameter's value is `true`.
- `access`: One of the `XmlMappingAccess` values.

Returns: Internal .NET type mappings to the element parts of a WSDL message definition.

#### Remarks
The `SoapReflectionImporter.ImportMembersMapping` method is called while initializing a Web service or client, or reflecting a Web service. You do not need to call it directly.

The following list describes possible values for the `members` parameter:

- Web service method input parameters.

- Web service method output parameters, plus the return type, if not void, at index zero.

- SOAP input headers.

- SOAP output headers.

## SoapReflectionImporter.ImportTypeMapping(Type) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportTypeMapping (Type type);
```

Generates a mapping to an XML Schema element for a .NET type.

Parameters:

- `type`: The .NET type for which to generate a type mapping.

Returns: Internal .NET mapping of a type to an XML Schema element.

#### Remarks
The XML Schema element is serialized using SOAP encoding.

You do not need to call the `SoapReflectionImporter.ImportTypeMapping` method directly.

## SoapReflectionImporter.ImportTypeMapping(Type, String) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportTypeMapping (Type type, string? defaultNamespace);
```

Generates a mapping to an XML Schema element for a .NET type.

Parameters:

- `type`: The .NET type for which to generate a type mapping.
- `defaultNamespace`: The default XML namespace to use.

Returns: Internal .NET mapping of a type to an XML Schema element.

#### Remarks
The XML Schema element is serialized using SOAP encoding.

You do not need to call the `SoapReflectionImporter.ImportTypeMapping` method directly.

## SoapReflectionImporter.IncludeType(Type) method

```csharp
public void IncludeType (Type type);
```

Places mappings for a type in the `SoapReflectionImporter` instance's context for later use when import methods are invoked.

Parameters:

- `type`: The .NET type for which to save type mapping information.

#### Remarks
You do not need to call the `SoapReflectionImporter.IncludeType` method directly.

## SoapReflectionImporter.IncludeTypes(ICustomAttributeProvider) method

```csharp
public void IncludeTypes (System.Reflection.ICustomAttributeProvider provider);
```

Places mappings for derived types in the `SoapReflectionImporter` instance's context for later use when import methods are invoked.

Parameters:

- `provider`: An `ICustomAttributeProvider` reflection object that contains custom attributes that are derived from the `SoapIncludeAttribute` attribute.

To be added.
