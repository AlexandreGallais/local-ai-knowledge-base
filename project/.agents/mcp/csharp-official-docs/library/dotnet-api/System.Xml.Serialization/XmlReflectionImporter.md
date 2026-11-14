---
title: "XmlReflectionImporter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlReflectionImporter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReflectionImporter class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlReflectionImporter
```

Generates mappings to XML schema element declarations, including literal XML Schema Definition (XSD) message parts in a Web Services Description Language (WSDL) document, for .NET types or Web service method information.

#### Remarks
The `XmlReflectionImporter` class is not used directly. Instead, it is used as follows:

- By the `ServiceDescriptionReflector` class while it creates `ServiceDescription` objects from classes that are identified as Web services.

- By a Web service or client, including during initialization.

- To initialize an `XmlSerializer` object.

- By the XML Schema Definition tool (Xsd.exe) while the tool generates XML schemas from types in a run-time assembly file.

- By the Web Services Description Language tool (Wsdl.exe) while the tool generates client proxy classes or abstract server classes from a WSDL document.

The `XmlReflectionImporter` class is used for Web services when a service or client specifies:

- Literal use, which indicates that the contents of SOAP message parameters and return values (or request and response documents) are literally specified with XML schema definitions.

- Non-SOAP implementations of Web services using the HTTP-GET and HTTP-POST operations.

## XmlReflectionImporter.XmlReflectionImporter() constructor

```csharp
public XmlReflectionImporter ();
```

Initializes a new instance of the `XmlReflectionImporter` class.

#### Remarks
You do not need to create an instance of an `XmlReflectionImporter` object directly.

## XmlReflectionImporter.XmlReflectionImporter(String) constructor

```csharp
public XmlReflectionImporter (string? defaultNamespace);
```

Initializes a new instance of the `XmlReflectionImporter` class using the specified default XML namespace.

Parameters:

- `defaultNamespace`: The default XML namespace to use for imported type mappings.

#### Remarks
It is not necessary to create an instance of the `XmlReflectionImporter` class directly.

## XmlReflectionImporter.XmlReflectionImporter(XmlAttributeOverrides) constructor

```csharp
public XmlReflectionImporter (System.Xml.Serialization.XmlAttributeOverrides? attributeOverrides);
```

Initializes a new instance of the `XmlReflectionImporter` class using the specified XML serialization overrides.

Parameters:

- `attributeOverrides`: An object that overrides how the `XmlSerializer` class serializes mapped types.

#### Remarks
It is not necessary to create an instance of the `XmlReflectionImporter` class directly.

## XmlReflectionImporter.XmlReflectionImporter(XmlAttributeOverrides, String) constructor

```csharp
public XmlReflectionImporter (System.Xml.Serialization.XmlAttributeOverrides? attributeOverrides, string? defaultNamespace);
```

Initializes a new instance of the `XmlReflectionImporter` class using the specified XML serialization overrides and default XML namespace.

Parameters:

- `attributeOverrides`: An object that overrides how the `XmlSerializer` class serializes mapped types.
- `defaultNamespace`: The default XML namespace to use for imported type mappings.

#### Remarks
It is not necessary to create an instance of the `XmlReflectionImporter` class directly.

## XmlReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[], Boolean) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members, bool hasWrapperElement);
```

Generates internal type mappings for information from a Web service method.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of `XmlReflectionMember` objects that contain .NET code entities that belong to a Web service method.
- `hasWrapperElement`: `true` if elements that correspond to Web Services Description Language (WSDL) message parts should be enclosed in an extra wrapper element in a SOAP message; otherwise, `false`.

Returns: An `XmlMembersMapping` with mappings to the element parts of a WSDL message definition.

#### Remarks
The `XmlReflectionImporter.ImportMembersMapping` method is called while initializing a Web service or client, or reflecting a Web service. It is not necessary to call it directly.

The `XmlReflectionMember` array parameter can consist of any one of the following:

- Web service method input parameters.

- Web service method output parameters, plus the return type, if not void, at index 0.

- SOAP input headers.

- SOAP output headers.

## XmlReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[], Boolean, Boolean) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members, bool hasWrapperElement, bool rpc);
```

Returns internal type mappings using information from a Web service method, and allows you to specify an XML element name, XML namespace, and other options.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of `XmlReflectionMember` objects that contain .NET code entities that belong to a Web service method.
- `hasWrapperElement`: `true` if elements that correspond to Web Services Description Language (WSDL) message parts should be enclosed in an extra wrapper element in a SOAP message; otherwise, `false`.
- `rpc`: `true` if the method is a remote procedure call; otherwise, `false`.

Returns: An `XmlMembersMapping` that contains the mappings.

To be added.

## XmlReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[], Boolean, Boolean, Boolean) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members, bool hasWrapperElement, bool rpc, bool openModel);
```

Returns internal type mappings using information from a Web service method, and allows you to specify an XML element name, XML namespace, and other options.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of `XmlReflectionMember` objects that contain .NET code entities that belong to a Web service method.
- `hasWrapperElement`: `true` if elements that correspond to Web Services Description Language (WSDL) message parts should be enclosed in an extra wrapper element in a SOAP message; otherwise, `false`.
- `rpc`: `true` if the method is a remote procedure call; otherwise, `false`.
- `openModel`: `true` to specify that the generated schema type will be marked with the `<xs:anyAttribute>` element; otherwise, `false`.

Returns: An `XmlMembersMapping` that contains the mappings.

To be added.

## XmlReflectionImporter.ImportMembersMapping(String, String, XmlReflectionMember[], Boolean, Boolean, Boolean, XmlMappingAccess) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string? elementName, string? ns, System.Xml.Serialization.XmlReflectionMember[] members, bool hasWrapperElement, bool rpc, bool openModel, System.Xml.Serialization.XmlMappingAccess access);
```

Generates internal type mappings for information from a Web service method.

Parameters:

- `elementName`: An XML element name produced from the Web service method.
- `ns`: An XML element namespace produced from the Web service method.
- `members`: An array of `XmlReflectionMember` objects that contain .NET code entities that belong to a Web service method.
- `hasWrapperElement`: `true` if elements that correspond to Web Services Description Language (WSDL) message parts should be enclosed in an extra wrapper element in a SOAP message; otherwise, `false`.
- `rpc`: `true` if the method is a remote procedure call; otherwise, `false`.
- `openModel`: `true` to specify that the generated schema type will be marked with the `<xs:anyAttribute>` element; otherwise, `false`.
- `access`: One of the `XmlMappingAccess` values. The default is `None`.

Returns: An `XmlMembersMapping` that contains the mappings.

To be added.

## XmlReflectionImporter.ImportTypeMapping(Type) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportTypeMapping (Type type);
```

Generates a mapping to an XML Schema element for a specified .NET type.

Parameters:

- `type`: The .NET type for which to generate a type mapping.

Returns: Internal .NET mapping of a type to an XML Schema element.

#### Remarks
It is not necessary to call the `XmlReflectionImporter.ImportTypeMapping` method directly.

## XmlReflectionImporter.ImportTypeMapping(Type, String) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportTypeMapping (Type type, string? defaultNamespace);
```

Generates a mapping to an XML Schema element for a .NET type, using the specified type and namespace.

Parameters:

- `type`: The .NET type for which to generate a type mapping.
- `defaultNamespace`: The default XML namespace to use.

Returns: Internal .NET mapping of a type to an XML Schema element.

#### Remarks
It is not necessary to call the `XmlReflectionImporter.ImportTypeMapping` method directly.

## XmlReflectionImporter.ImportTypeMapping(Type, XmlRootAttribute) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportTypeMapping (Type type, System.Xml.Serialization.XmlRootAttribute? root);
```

Generates a mapping to an XML Schema element for a .NET type, using the specified type and attribute.

Parameters:

- `type`: The .NET type for which to generate a type mapping.
- `root`: An `XmlRootAttribute` attribute that is applied to the type.

Returns: An `XmlTypeMapping` that represents a mapping of a .NET type to an XML Schema element.

#### Remarks
It is not necessary to call the `XmlReflectionImporter.ImportTypeMapping` method directly.

## XmlReflectionImporter.ImportTypeMapping(Type, XmlRootAttribute, String) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportTypeMapping (Type type, System.Xml.Serialization.XmlRootAttribute? root, string? defaultNamespace);
```

Generates a mapping to an XML Schema element for a .NET type, using the specified type, attribute, and namespace.

Parameters:

- `type`: The .NET type for which to generate a type mapping.
- `root`: An `XmlRootAttribute` attribute that is applied to the type.
- `defaultNamespace`: The default XML namespace to use.

Returns: An `XmlTypeMapping` that contains the internal .NET mapping of a type to an XML Schema element.

#### Remarks
It is not necessary to call the `XmlReflectionImporter.ImportTypeMapping` method directly.

## XmlReflectionImporter.IncludeType(Type) method

```csharp
public void IncludeType (Type type);
```

Includes mappings for a type for later use when import methods are invoked.

Parameters:

- `type`: The .NET type for which to save type mapping information.

#### Remarks
It is not necessary to call the `XmlReflectionImporter.IncludeType` method directly.

## XmlReflectionImporter.IncludeTypes(ICustomAttributeProvider) method

```csharp
public void IncludeTypes (System.Reflection.ICustomAttributeProvider provider);
```

Includes mappings for derived types for later use when import methods are invoked.

Parameters:

- `provider`: An instance of the `ICustomAttributeProvider` class that contains custom attributes derived from the `XmlIncludeAttribute` attribute.

To be added.
