---
title: "XmlSchemaProviderAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSchemaProviderAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSchemaProviderAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public sealed class XmlSchemaProviderAttribute : Attribute
```

When applied to a type, stores the name of a static method of the type that returns an XML schema and a `XmlQualifiedName` (or `XmlSchemaType` for anonymous types) that controls the serialization of the type.

#### Remarks
The main purpose of the `XmlSchemaProviderAttribute` is to enable the `XmlSchemaExporter` class to return a schema when queried by the Web Services Description Language tool (WSDL.exe), or when using the **Add Web Reference** feature of Visual Studio. You can control the actual schema for the type in the static method.

> **Note:**
> The target class of the attribute must implement the `IXmlSerializable` interface.

The `MethodName` property returns the name of a static method through reflection. The method, which must be implemented, must take a single parameter, an `XmlSchemaSet` object, which the method populates with an `XmlSchema` object. The method must also return an `XmlQualifiedName` object that identifies the data type.

#### Returning Anonymous Types
An anonymous complex type cannot be created using a method that returns `XmlQualifiedName`. Because an anonymous type has no name, and you cannot add an anonymous type to a schema, the anonymous type must be returned as an `XmlSchemaType`.

#### Examples
The following example applies the `XmlSchemaProviderAttribute` to a server-side class. When invoked, the method named by the `MethodName` property creates the schema. This simple implementation reads an existing schema off the disk. However, you can also create a custom schema, if necessary, using the types found in the `Schema` namespace.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSchemaProviderAttribute/Overview/SerializationChunk.cs._

## XmlSchemaProviderAttribute.XmlSchemaProviderAttribute(String) constructor

```csharp
public XmlSchemaProviderAttribute (string? methodName);
```

Initializes a new instance of the `XmlSchemaProviderAttribute` class, taking the name of the static method that supplies the type's XML schema.

Parameters:

- `methodName`: The name of the static method that must be implemented.

To be added.

## XmlSchemaProviderAttribute.IsAny property

```csharp
public bool IsAny { get; set; }
```

Gets or sets a value that determines whether the target class is a wildcard, or that the schema for the class has contains only an `xs:any` element.

Returns: `true`, if the class is a wildcard, or if the schema contains only the `xs:any` element; otherwise, `false`.

#### Remarks
The target class of the attribute can be any class. This can be achieved in the following ways:

- The method named by the attribute can return `null`.

- Set the value of this property to `true` to prevent the method from being called.

## XmlSchemaProviderAttribute.MethodName property

```csharp
public string? MethodName { get; }
```

Gets the name of the static method that supplies the type's XML schema and the name of its XML Schema data type.

Returns: The name of the method that is invoked by the XML infrastructure to return an XML schema.

To be added.
