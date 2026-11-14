---
title: "XmlMapping class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlMapping class

Namespace: `System.Xml.Serialization`

```csharp
public abstract class XmlMapping
```

Supports mappings between .NET types and XML Schema data types.

#### Remarks
`XmlMapping` is the base class for the `XmlTypeMapping` and `XmlMembersMapping` classes. It supports built-in and custom XML schema data types, plus SOAP encoding (Section 5 of the SOAP 1.1 specification). Use the `XmlTypeMapping` or `XmlMemberMapping` class instead of deriving a class directly from `XmlMapping`.

## XmlMapping.ElementName property

```csharp
public string ElementName { get; }
```

Gets the name of the mapped element.

Returns: The name of the mapped element.

To be added.

## XmlMapping.Namespace property

```csharp
public string? Namespace { get; }
```

Gets the namespace of the mapped element.

Returns: The namespace of the mapped element.

To be added.

## XmlMapping.XsdElementName property

```csharp
public string XsdElementName { get; }
```

Gets the name of the XSD element of the mapping.

Returns: The XSD element name.

To be added.

## XmlMapping.SetKey(String) method

```csharp
public void SetKey (string? key);
```

Sets the key used to look up the mapping.

Parameters:

- `key`: The lookup key.

To be added.
