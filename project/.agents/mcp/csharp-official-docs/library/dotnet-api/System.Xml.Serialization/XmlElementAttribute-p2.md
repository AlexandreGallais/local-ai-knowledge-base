---
title: "XmlElementAttribute class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlElementAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlElementAttribute class (part 2 of 2)

## XmlElementAttribute.IsNullable property

```csharp
public bool IsNullable { get; set; }
```

Gets or sets a value that indicates whether the `XmlSerializer` must serialize a member that is set to `null` as an empty tag with the `xsi:nil` attribute set to `true`.

Returns: `true` if the `XmlSerializer` generates the `xsi:nil` attribute; otherwise, `false`.

#### Remarks
The XML schema specification for structures allows an XML document to explicitly signal that an element's content is missing. Such an element contains the attribute `xsi:nil` set to `true`. For more information, see the World Wide Web Consortium specification, XML Schema Part 1: Structures.

If the `IsNullable` property is set to `true`, the `xsi:nil` attribute is generated for class members that have been set to `null`. For example if you set a field named `MyStringArray` to `null`, the `XmlSerializer` generates the following XML code.

```

```

If the `IsNullable` property is `false`, no XML element is generated for class members that have been set to `null`.

> **Note:**
> You cannot apply the `IsNullable` property to a member typed as a value type because a value type cannot contain `null`. Additionally, you cannot set this property to `false` for nullable value types. When such types are `null`, they will be serialized by setting `xsi:nil` to `true`.

#### Examples
The following example shows a field with the `XmlElementAttribute` applied to it, and the `IsNullable` property set to `false`.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/IsNullable/source.cs._

## XmlElementAttribute.Namespace property

```csharp
public string? Namespace { get; set; }
```

Gets or sets the namespace assigned to the XML element that results when the class is serialized.

Returns: The namespace of the XML element.

#### Remarks
The `Namespace` property conforms to the World Wide Web Consortium specification, Namespaces in XML.

To create namespaces that are associated with a prefix, you must create an `XmlSerializerNamespaces` that contains the namespaces and prefixes used in the XML document. As you set the namespace for each `XmlArrayAttribute`, it must match one of the namespaces in the `XmlSerializerNamespaces`. When the XML is generated, each array is correctly prefixed with the prefix associated with the specified namespace.

## XmlElementAttribute.Order property

```csharp
public int Order { get; set; }
```

Gets or sets the explicit order in which the elements are serialized or deserialized.

Returns: The order of the code generation.

#### Remarks
Use the `GenerateOrder` enumeration to instruct the `ServiceDescriptionImporter` to generate code that sets the `Order` property.

> **Important:**
> Once the `Order` property has been used on one public property or field in a type, it must be applied to all public properties and fields for that type and all inherited types.

## XmlElementAttribute.Type property

```csharp
public Type? Type { get; set; }
```

Gets or sets the object type used to represent the XML element.

Returns: The `Type` of the member.

#### Remarks
Use the `Type` property to specify a derived type for a field or property.

If a field or property returns an `ArrayList`, you can apply multiple instances of the `XmlElementAttribute` to the member. For each instance, set the `Type` property to a type of object that can be inserted into the array.

#### Examples
The following example uses the `Type` property to specify a derived object for an `XmlElementAttribute`. The example also applies three instances of the `XmlElementAttribute` to a field that returns an `ArrayList`. Each instance specifies a type allowed in the field.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementAttribute/Type/source.cs._
