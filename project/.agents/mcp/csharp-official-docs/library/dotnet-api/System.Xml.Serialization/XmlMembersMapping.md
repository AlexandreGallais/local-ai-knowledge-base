---
title: "XmlMembersMapping class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlMembersMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlMembersMapping class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlMembersMapping : System.Xml.Serialization.XmlMapping
```

Provides mappings between .NET Web service methods and Web Services Description Language (WSDL) messages that are defined for SOAP Web services.

#### Remarks
The `XmlMembersMapping` class is not used directly. Instead, it is used:

- By the Wsdl.exe tool, or the `ServiceDescriptionImporter` class, while generating client proxy classes or abstract server classes from a WSDL document. The WSDL document specifies use of the SOAP protocol.

- To initialize `XmlSerializer` objects while .NET is initializing a SOAP Web service or client.

- By the `ServiceDescriptionReflector` class while creating `ServiceDescription` objects from classes that are identified as SOAP Web services.

The `XmlMembersMapping` class is a substitute for the `XmlTypeMapping` class for mapping between Web service methods and messages. It is used to contain any of the following entities belonging to a SOAP Web service method:

- Input parameters.

- Output parameters and return value.

- Request SOAP headers.

- Response SOAP headers.

Specifically, the class represents mappings for a WSDL message definition, according to the following choices:

- For a Web service method that uses SOAP encoding: The top-level `ElementName` and `TypeName` properties pertain to a parent, wrapper element; the message parts are represented by array members. However, in the rare case when the Web service operation uses document style combined with a wrapped binding to a .NET method plus SOAP encoding, the top-level `ElementName` and `TypeName` properties pertain to the single **part** element that appears in a generated WSDL document.

- For a Web service method that makes literal use of XML Schema definitions: If a Web service message or operation uses a wrapped binding to a .NET method or merely defines a single message part, the top-level `ElementName` and `TypeName` properties pertain to the part. If there are multiple parts (the atypical case), the top-level `ElementName` and `TypeName` properties pertain to a parent, wrapper element; the parts are represented by the `Count` and indexed array access properties. In addition, the XSD `any` element receives special treatment.

## XmlMembersMapping.Count property

```csharp
public int Count { get; }
```

Gets the number of .NET code entities that belong to a Web service method to which a SOAP message is being mapped.

Returns: The number of mappings in the collection.

#### Remarks
The collection can contain of any of the following:

- Web service method input parameters.

- Web service method output parameters, plus 1 for the return type, if not void.

- SOAP input headers.

- SOAP output headers.

See the `XmlMembersMapping` class for the conditions under which these entities translate to `part` elements in a Web Services Description Language (WSDL) document.

## XmlMembersMapping.Item property

```csharp
public System.Xml.Serialization.XmlMemberMapping this[int index] { get; }
```

Gets an item that contains internal type mapping information for a .NET code entity that belongs to a Web service method being mapped to a SOAP message.

Parameters:

- `index`: The index of the mapping to return.

Returns: The requested `XmlMemberMapping`.

#### Remarks
The indexed array access operator for the `XmlMembersMapping` class gets a specified entry from an array of any of the following:

- Web service method input parameters.

- Web service method output parameters, plus the return type, if not void, at index 0.

- SOAP input headers.

- SOAP output headers.

See the `XmlMembersMapping` class for the conditions under which these entities translate to `part` elements in a Web Services Description Language (WSDL) document.

## XmlMembersMapping.TypeName property

```csharp
public string? TypeName { get; }
```

Gets the name of the .NET type being mapped to the data type of an XML Schema element that represents a SOAP message.

Returns: The name of the .NET type.

#### Remarks
A SOAP message is defined in a Web Services Description Language (WSDL) document using the `message` element.

See the `XmlMembersMapping` class for the conditions under which the `TypeName` property refers to a code entity defined in a Web service method (a parameter or return value) instead of to an extra parent or wrapper element.

## XmlMembersMapping.TypeNamespace property

```csharp
public string? TypeNamespace { get; }
```

Gets the namespace of the .NET type being mapped to the data type of an XML Schema element that represents a SOAP message.

Returns: The .NET namespace of the mapping.

#### Remarks
A SOAP message is defined in a Web Services Description Language (WSDL) document using the `message` element.
