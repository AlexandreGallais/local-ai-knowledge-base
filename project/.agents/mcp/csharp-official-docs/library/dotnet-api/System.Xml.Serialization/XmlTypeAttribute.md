---
title: "XmlTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlTypeAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlTypeAttribute : Attribute
```

Controls the XML schema that is generated when the attribute target is serialized by the `XmlSerializer`.

#### Remarks
The `XmlTypeAttribute` belongs to a family of attributes that controls how the `XmlSerializer` serializes or deserializes an object. For a complete list of similar attributes, see Attributes That Control XML Serialization.

You can apply the `XmlTypeAttribute` to a class, structure, enumeration, or interface declaration.

Apply the `XmlTypeAttribute` to a class to specify the XML type's namespace, the XML type name, and whether to include the type in the XML schema document. To see the results of setting the properties of the `XmlTypeAttribute` class, compile your application as an executable or DLL, and pass the resulting file to the XML Schema Definition Tool (Xsd.exe). The tool writes the schema, including the type definition.

> **Note:**
> If you set the `IncludeInSchema` property to `false`, the XML Schema Definition Tool (Xsd.exe) does not include the type in the schema. By default, for each public class, the XSD tool generates a `complexType` and an element of that type.

For more information about using attributes, see Attributes.

> **Note:**
> You can use the word `XmlType` in your code instead of the longer `XmlTypeAttribute`.

#### Examples
The following example shows two classes to which the `XmlTypeAttribute` has been applied.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeAttribute/Overview/source.cs._

## XmlTypeAttribute.XmlTypeAttribute() constructor

```csharp
public XmlTypeAttribute ();
```

Initializes a new instance of the `XmlTypeAttribute` class.

#### Examples
The following example creates two instances of the `XmlTypeAttribute` class that are used to override the serialization of the two classes.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeAttribute/.ctor/xmltypeattribute1_2.cs._

## XmlTypeAttribute.XmlTypeAttribute(String) constructor

```csharp
public XmlTypeAttribute (string? typeName);
```

Initializes a new instance of the `XmlTypeAttribute` class and specifies the name of the XML type.

Parameters:

- `typeName`: The name of the XML type that the `XmlSerializer` generates when it serializes the class instance (and recognizes when it deserializes the class instance).

#### Remarks
Apply the `XmlTypeAttribute` to a class to specify the XML type's namespace, the XML type name, and whether to include the type in the XML schema document. To see the results of setting the properties of the `XmlTypeAttribute` class, compile your application as an executable or DLL, and pass the resulting file to the XML Schema Definition Tool (Xsd.exe). The tool writes the schema, including the type definition.

#### Examples
The following example creates two instances of the `XmlTypeAttribute` class that are used to override the serialization of the two classes.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeAttribute/.ctor/xmltypeattribute1_2.cs._

## XmlTypeAttribute.AnonymousType property

```csharp
public bool AnonymousType { get; set; }
```

Gets or sets a value that determines whether the resulting schema type is an XSD anonymous type.

Returns: `true`, if the resulting schema type is an XSD anonymous type; otherwise, `false`.

To be added.

## XmlTypeAttribute.IncludeInSchema property

```csharp
public bool IncludeInSchema { get; set; }
```

Gets or sets a value that indicates whether to include the type in XML schema documents.

Returns: `true` to include the type in XML schema documents; otherwise, `false`.

#### Remarks
Apply the `XmlTypeAttribute` to a class to specify the XML type's namespace, the XML type name, and whether to include the type in the XML schema document. To see the results of setting the properties of the `XmlTypeAttribute` class, compile your application as an executable or DLL, and pass the resulting file to the XML Schema Definition tool (XSD.exe). The tool writes the schema, including the type definition.

#### Examples
The following example applies the `XmlTypeAttribute` to the `ExtraneousInfo` class, setting the `IncludeInSchema` property to `false`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeAttribute/IncludeInSchema/source.cs._

## XmlTypeAttribute.Namespace property

```csharp
public string? Namespace { get; set; }
```

Gets or sets the namespace of the XML type.

Returns: The namespace of the XML type.

#### Examples
The following example applies the `XmlTypeAttribute` to a class while setting the `Namespace` property.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeAttribute/Namespace/source.cs._

## XmlTypeAttribute.TypeName property

```csharp
public string TypeName { get; set; }
```

Gets or sets the name of the XML type.

Returns: The name of the XML type.

#### Remarks
Apply the `XmlTypeAttribute` to a class to specify the XML type's namespace, the XML type name, and whether to include the type in the XML schema document. To see the results of setting the properties of the `XmlTypeAttribute` class, compile your application as an executable or DLL, and pass the resulting file to the XML Schema Definition Tool (Xsd.exe). The tool writes the schema, including the type definition.

#### Examples
The following example applies the `XmlTypeAttribute` to the `Person` and `Job` classes. If you compile the class and pass the resulting executable file to the XML Schema Definition tool, the schema is displayed in the Output section.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlTypeAttribute/TypeName/source.cs._
