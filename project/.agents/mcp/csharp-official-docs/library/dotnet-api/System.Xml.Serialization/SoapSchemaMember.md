---
title: "SoapSchemaMember class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/SoapSchemaMember.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SoapSchemaMember class

Namespace: `System.Xml.Serialization`

```csharp
public class SoapSchemaMember
```

Represents certain attributes of a XSD <`part`> element in a WSDL document for generating classes from the document.

#### Remarks
The `SoapSchemaMember` class is used by the Wsdl.exe tool while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document. Instead of using this class directly, use Wsdl.exe.

The `SoapSchemaMember` class has properties that correspond to the name and type attributes of a WSDL part element. The class is used only when a WSDL document specifies SOAP encoding, as described in Section 5 of the SOAP 1.1 specification.

## SoapSchemaMember.SoapSchemaMember() constructor

```csharp
public SoapSchemaMember ();
```

Initializes a new instance of the `SoapSchemaMember` class.

To be added.

## SoapSchemaMember.MemberName property

```csharp
public string MemberName { get; set; }
```

Gets or sets a value that corresponds to the name attribute of the WSDL part element.

Returns: The element name.

#### Remarks
This property corresponds to the XML `name` attribute of the XML element `<wsdl:part>`. For more information about the element,see the WSDL specification.

The `SoapSchemaMember` class is used by the Wsdl.exe tool while generating classes from a Web Services Description Language (WSDL) document that specifies SOAP encoding. Instead of using this class directly, use Wsdl.exe.

## SoapSchemaMember.MemberType property

```csharp
public System.Xml.XmlQualifiedName? MemberType { get; set; }
```

Gets or sets a value that corresponds to the type attribute of the WSDL part element.

Returns: An `XmlQualifiedName` that corresponds to the XML type.

#### Remarks
This property corresponds to the XML `type` attribute of the XML element `<wsdl:part>`. For more information about the element,see the WSDL specification.

The `SoapSchemaMember` class is used by the Wsdl.exe tool while generating classes from a Web Services Description Language (WSDL) document that specifies SOAP encoding. Instead of using this class directly, use Wsdl.exe.
