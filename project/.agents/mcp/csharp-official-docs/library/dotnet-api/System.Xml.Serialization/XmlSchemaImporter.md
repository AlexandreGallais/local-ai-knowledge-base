---
title: "XmlSchemaImporter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSchemaImporter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSchemaImporter class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlSchemaImporter : System.Xml.Serialization.SchemaImporter
```

Generates internal mappings to .NET types for XML schema element declarations, including literal XSD message parts in a WSDL document.

#### Remarks
The `XmlSchemaImporter` class is used by the Web Services Description Language Tool (Wsdl.exe) and the `ServiceDescriptionImporter` class while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document. The class is also used by the Web Services Description Language Tool (Wsdl.exe) while generating classes from XML Schema Definition (XSD) documents. Instead of using this class directly, use Wsdl.exe or Xsd.exe.

The `XmlSchemaImporter` class has methods to generate internal mappings to .NET types for elements defined in an XSD document or as parts in a WSDL document. The following list shows when the class is used by Wsdl.exe:

- A WSDL document specifies literal use, where the content of SOAP message parameters and return values (or request and response documents) is literally specified with XML schema definitions.
- A WSDL document specifies .NET's non-SOAP implementations of Web services via the HTTP-GET and HTTP-POST operations.

## XmlSchemaImporter.XmlSchemaImporter(XmlSchemas) constructor

```csharp
public XmlSchemaImporter (System.Xml.Serialization.XmlSchemas schemas);
```

Initializes a new instance of the `XmlSchemaImporter` class, taking a collection of `XmlSchema` objects representing the XML schemas used by SOAP literal messages defined in a WSDL document.

Parameters:

- `schemas`: A collection of `XmlSchema` objects.

#### Remarks
Use this constructor when a WSDL document specifies that the data is serialized according to a schema (\).

Instead of directly creating an instance of the `XmlSchemaImporter` class, use Wsdl.exe or Xsd.exe.

## XmlSchemaImporter.XmlSchemaImporter(XmlSchemas, CodeIdentifiers) constructor

```csharp
public XmlSchemaImporter (System.Xml.Serialization.XmlSchemas schemas, System.Xml.Serialization.CodeIdentifiers? typeIdentifiers);
```

Initializes a new instance of the `XmlSchemaImporter` class, taking a collection of `XmlSchema` objects that represents the XML schemas used by SOAP literal messages, plus classes being generated for bindings defined in a Web Services Description Language (WSDL) document.

Parameters:

- `schemas`: An `XmlSchemas` object.
- `typeIdentifiers`: A `CodeIdentifiers` object that specifies a collection of classes being generated for bindings defined in a WSDL document.

#### Remarks
Use this constructor when a WSDL document specifies that the data is serialized according to a schema (\).

Instead of directly creating an instance of the `XmlSchemaImporter` class, use Wsdl.exe or Xsd.exe.

## XmlSchemaImporter.ImportAnyType(XmlQualifiedName, String) method

```csharp
public System.Xml.Serialization.XmlMembersMapping? ImportAnyType (System.Xml.XmlQualifiedName typeName, string elementName);
```

Generates internal type mapping information for a single, (SOAP) literal element part defined in a WSDL document.

Parameters:

- `typeName`: An `XmlQualifiedName` that specifies the name of an element's type for which a .NET type is generated.
- `elementName`: The name of the part element in the WSDL document.

Returns: An `XmlMembersMapping` representing the .NET type mapping for a single element part of a WSDL message definition.

#### Remarks
The `XmlSchemaImporter.ImportAnyType` method is used by the Wsdl.exe tool while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document. Instead of calling this method directly, use Wsdl.exe or Xsd.exe.

The `XmlSchemaImporter` class is used only when a WSDL document specifies literal use. The `XmlSchemaImporter.ImportAnyType` method is used when a WSDL message has a single part element but the part has not been identified as a wrapper element.

## XmlSchemaImporter.ImportDerivedTypeMapping(XmlQualifiedName, Type) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportDerivedTypeMapping (System.Xml.XmlQualifiedName name, Type? baseType);
```

Generates internal type mapping information for an element defined in an XML schema document.

Parameters:

- `name`: An `XmlQualifiedName` that specifies the name of an element defined in an XML schema document.
- `baseType`: A base type for the .NET type that is generated to correspond to an XSD element's type.

Returns: An `XmlTypeMapping` representing the.NET type mapping information for an XML schema element.

#### Remarks
This overload of the `XmlSchemaImporter.ImportDerivedTypeMapping` method is used by the Xsd.exe tool to generate classes from an XML Schema Definition (XSD) document. Instead of calling this method directly, use Xsd.exe.

## XmlSchemaImporter.ImportDerivedTypeMapping(XmlQualifiedName, Type, Boolean) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportDerivedTypeMapping (System.Xml.XmlQualifiedName name, Type? baseType, bool baseTypeCanBeIndirect);
```

Generates internal type mapping information for an element defined in an XML schema document or as a part in a WSDL document.

Parameters:

- `name`: An `XmlQualifiedName` that specifies the name of an element defined in an XML schema document.
- `baseType`: A base type for the .NET type that is generated to correspond to an XSD element's type.
- `baseTypeCanBeIndirect`: `true` to indicate that the type corresponding to an XSD element can indirectly inherit from the base type; otherwise, `false`.

Returns: The .NET type mapping information for an XML schema element.

#### Remarks
This overload of the `XmlSchemaImporter.ImportDerivedTypeMapping` method is used by the Xsd.exe tool to generate classes from an XML Schema Definition (XSD) document. It also is used by the Wsdl.exe tool while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document. Instead of calling this method directly, use Wsdl.exe or Xsd.exe.

## XmlSchemaImporter.ImportMembersMapping(XmlQualifiedName) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (System.Xml.XmlQualifiedName name);
```

Generates internal type mapping information for a single element part of a literal-use SOAP message defined in a WSDL document.

Parameters:

- `name`: An `XmlQualifiedName` that specifies the name of the message part.

Returns: The .NET type mapping for a WSDL message definition containing a single element part.

#### Remarks
The `XmlSchemaImporter.ImportMembersMapping` method of the `XmlSchemaImporter` class is used by the Wsdl.exe tool while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document. Instead of calling this method directly, use Wsdl.exe or Xsd.exe.

The `XmlSchemaImporter` class is used only when a WSDL document specifies literal use. This overload is used when a WSDL message is wrapped within a single part element.

## XmlSchemaImporter.ImportMembersMapping(XmlQualifiedName[]) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (System.Xml.XmlQualifiedName[] names);
```

Generates internal type mapping information for the element parts of a literal-use SOAP message defined in a WSDL document.

Parameters:

- `names`: An array of type `XmlQualifiedName` that specifies the names of the message parts.

Returns: An `XmlMembersMapping` that represents the .NET type mappings for the element parts of a WSDL message definition.

#### Remarks
The `XmlSchemaImporter.ImportMembersMapping` method is used by the Wsdl.exe tool while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document. Instead of calling this method directly, use Wsdl.exe or Xsd.exe.

The `XmlSchemaImporter` class is used only when a WSDL document specifies literal use. The value of the `names` parameter contains the qualified names of the parts elements under a message definition in a WSDL document.

This method does not account for the part elements' types.

## XmlSchemaImporter.ImportMembersMapping(String, String, SoapSchemaMember[]) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (string name, string? ns, System.Xml.Serialization.SoapSchemaMember[] members);
```

Generates internal type mapping information for the element parts of a literal-use SOAP message defined in a WSDL document.

Parameters:

- `name`: The name of the element for which to generate a mapping.
- `ns`: The namespace of the element for which to generate a mapping.
- `members`: An array of `SoapSchemaMember` instances that specifies the members of the element for which to generate a mapping.

Returns: A `XmlMembersMapping` that contains type mapping information.

To be added.

## XmlSchemaImporter.ImportMembersMapping(XmlQualifiedName[], Type, Boolean) method

```csharp
public System.Xml.Serialization.XmlMembersMapping ImportMembersMapping (System.Xml.XmlQualifiedName[] names, Type? baseType, bool baseTypeCanBeIndirect);
```

Generates internal type mapping information for the element parts of a literal-use SOAP message defined in a WSDL document.

Parameters:

- `names`: An array of type `XmlQualifiedName` that specifies the names of the message parts.
- `baseType`: A base type for all .NET types that are generated to correspond to message parts.
- `baseTypeCanBeIndirect`: `true` to indicate that the types corresponding to message parts can indirectly inherit from the base type; otherwise, `false`.

Returns: The .NET type mappings for the element parts of a WSDL message definition.

#### Remarks
The `XmlSchemaImporter.ImportMembersMapping` method is used by the Wsdl.exe tool while generating client proxy classes or abstract server classes from a Web Services Description Language (WSDL) document. Instead of calling this method directly, use Wsdl.exe or Xsd.exe.

The `XmlSchemaImporter` class is used only when a WSDL document specifies literal use. The value of the `names` parameter contains the qualified names of the parts elements under a message definition in a WSDL document.

This method does not account for the part elements' types.

## XmlSchemaImporter.ImportSchemaType(XmlQualifiedName) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportSchemaType (System.Xml.XmlQualifiedName typeName);
```

Generates internal type mapping information for an element defined in an XML schema document.

Parameters:

- `typeName`: A `XmlQualifiedName` that specifies an XML element.

Returns: A `XmlTypeMapping` object that describes a type mapping.

To be added.

## XmlSchemaImporter.ImportSchemaType(XmlQualifiedName, Type) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportSchemaType (System.Xml.XmlQualifiedName typeName, Type? baseType);
```

Generates internal type mapping information for an element defined in an XML schema document.

Parameters:

- `typeName`: A `XmlQualifiedName` that specifies an XML element.
- `baseType`: A `Type` object that specifies a base type.

Returns: A `XmlTypeMapping` object that describes a type mapping.

To be added.

## XmlSchemaImporter.ImportSchemaType(XmlQualifiedName, Type, Boolean) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportSchemaType (System.Xml.XmlQualifiedName typeName, Type? baseType, bool baseTypeCanBeIndirect);
```

Generates internal type mapping information for an element defined in an XML schema document.

Parameters:

- `typeName`: A `XmlQualifiedName` that specifies an XML element.
- `baseType`: A `Type` object that specifies a base type.
- `baseTypeCanBeIndirect`: A `Boolean` value that specifies whether the generated type can indirectly inherit the `baseType`.

Returns: A `XmlTypeMapping` object that describes a type mapping.

To be added.

## XmlSchemaImporter.ImportTypeMapping(XmlQualifiedName) method

```csharp
public System.Xml.Serialization.XmlTypeMapping ImportTypeMapping (System.Xml.XmlQualifiedName name);
```

Generates internal type mapping information for an element defined in an XML schema document.

Parameters:

- `name`: An `XmlQualifiedName` that specifies the name of an element defined in an XML schema document.

Returns: The .NET type mapping information for an XML schema element.

#### Remarks
The `XmlSchemaImporter.ImportTypeMapping` method is used by the Xsd.exe tool while generating classes XML Schema Definition (XSD) document. Instead of calling this method directly, use Xsd.exe.

This method does not account for the XML schema element's type.
