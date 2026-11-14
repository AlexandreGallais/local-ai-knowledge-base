---
title: "XmlSerializationWriter class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationWriter class (part 2 of 5)

## XmlSerializationWriter.FromTime(DateTime) method

```csharp
protected static string FromTime (DateTime value);
```

Produces a string from a `DateTime` object.

Parameters:

- `value`: A `DateTime` that is translated to a string.

Returns: A string representation of the `DateTime` object that shows the time but no date.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromTime` method is static.

## XmlSerializationWriter.FromTimeOnly(TimeOnly) method

```csharp
protected static string FromTimeOnly (TimeOnly value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## XmlSerializationWriter.FromTimeOnlyIgnoreOffset(TimeOnly) method

```csharp
protected static string FromTimeOnlyIgnoreOffset (TimeOnly value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## XmlSerializationWriter.FromXmlName(String) method

```csharp
protected static string? FromXmlName (string? name);
```

Encodes a valid XML name by replacing characters that are not valid with escape sequences.

Parameters:

- `name`: A string to be used as an XML name.

Returns: An encoded string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromXmlName` method is static.

## XmlSerializationWriter.FromXmlNCName(String) method

```csharp
protected static string? FromXmlNCName (string? ncName);
```

Encodes a valid XML local name by replacing characters that are not valid with escape sequences.

Parameters:

- `ncName`: A string to be used as a local (unqualified) XML name.

Returns: An encoded string.

#### Remarks
The protected members of the `XmlSerializationWriter` class are intended for use by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromXmlNCName` method is static.

## XmlSerializationWriter.FromXmlNmToken(String) method

```csharp
protected static string? FromXmlNmToken (string? nmToken);
```

Encodes an XML name.

Parameters:

- `nmToken`: An XML name to be encoded.

Returns: An encoded string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromXmlNmToken` method is static.

## XmlSerializationWriter.FromXmlNmTokens(String) method

```csharp
protected static string? FromXmlNmTokens (string? nmTokens);
```

Encodes a space-delimited sequence of XML names into a single XML name.

Parameters:

- `nmTokens`: A space-delimited sequence of XML names to be encoded.

Returns: An encoded string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.FromXmlNmTokens` method is static.

## XmlSerializationWriter.FromXmlQualifiedName(XmlQualifiedName) method

```csharp
protected string? FromXmlQualifiedName (System.Xml.XmlQualifiedName? xmlQualifiedName);
```

Returns an XML qualified name, with invalid characters replaced by escape sequences.

Parameters:

- `xmlQualifiedName`: An `XmlQualifiedName` that represents the XML to be written.

Returns: An XML qualified name, with invalid characters replaced by escape sequences.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.FromXmlQualifiedName(XmlQualifiedName, Boolean) method

```csharp
protected string? FromXmlQualifiedName (System.Xml.XmlQualifiedName? xmlQualifiedName, bool ignoreEmpty);
```

Produces a string that can be written as an XML qualified name, with invalid characters replaced by escape sequences.

Parameters:

- `xmlQualifiedName`: An `XmlQualifiedName` that represents the XML to be written.
- `ignoreEmpty`: `true` to ignore empty spaces in the string; otherwise, `false`.

Returns: An XML qualified name, with invalid characters replaced by escape sequences.

To be added.

## XmlSerializationWriter.InitCallbacks() method

```csharp
protected abstract void InitCallbacks ();
```

Initializes an instances of the `XmlSerializationWriteCallback` delegate to serialize SOAP-encoded XML data.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

During initialization, the .NET XML serialization infrastructure dynamically generates and compiles a temporary class for serialization that is derived from `XmlSerializationWriter`. During this process, .NET generates write methods that implement the `XmlSerializationWriteCallback` delegate. It does so for certain mappings between .NET types and XML data types that are serialized using SOAP-encoded XML and are not root elements. Then, as necessary, a write method is called during serialization.

The abstract `XmlSerializationWriter.InitCallbacks` method is where the temporary derived class creates an instance of and initializes write callback methods.

You should not directly create an instance of `XmlSerializationWriteCallback`.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.ResolveDynamicAssembly(String) method

```csharp
protected static System.Reflection.Assembly? ResolveDynamicAssembly (string assemblyFullName);
```

Gets a dynamically generated assembly by name.

Parameters:

- `assemblyFullName`: The full name of the assembly.

Returns: A dynamically generated assembly.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.ResolveDynamicAssembly` method is static.

## XmlSerializationWriter.TopLevelElement() method

```csharp
protected void TopLevelElement ();
```

Initializes object references only while serializing a SOAP-encoded SOAP message.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding allows a unique XML element to appear once within a SOAP message as a `multiRef` element and to be referenced any number of times by substitute elements. The `XmlSerializationWriter.TopLevelElement` method helps keep track of the objects that can be serialized as `multiRef` elements.

SOAP encoding is described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteAttribute(String, Byte[]) method

```csharp
protected void WriteAttribute (string localName, byte[]? value);
```

Instructs an `XmlWriter` object to write an XML attribute that has no namespace specified for its name.

Parameters:

- `localName`: The local name of the XML attribute.
- `value`: The value of the XML attribute as a byte array.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteAttribute(String, String) method

```csharp
protected void WriteAttribute (string localName, string? value);
```

Instructs the `XmlWriter` to write an XML attribute that has no namespace specified for its name.

Parameters:

- `localName`: The local name of the XML attribute.
- `value`: The value of the XML attribute as a string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteAttribute(String, String, Byte[]) method

```csharp
protected void WriteAttribute (string localName, string ns, byte[]? value);
```

Instructs an `XmlWriter` object to write an XML attribute.

Parameters:

- `localName`: The local name of the XML attribute.
- `ns`: The namespace of the XML attribute.
- `value`: The value of the XML attribute as a byte array.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteAttribute(String, String, String) method

```csharp
protected void WriteAttribute (string localName, string? ns, string? value);
```

Writes an XML attribute.

Parameters:

- `localName`: The local name of the XML attribute.
- `ns`: The namespace of the XML attribute.
- `value`: The value of the XML attribute as a string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteAttribute(String, String, String, String) method

```csharp
protected void WriteAttribute (string? prefix, string localName, string? ns, string? value);
```

Writes an XML attribute where the namespace prefix is provided manually.

Parameters:

- `prefix`: The namespace prefix to write.
- `localName`: The local name of the XML attribute.
- `ns`: The namespace represented by the prefix.
- `value`: The value of the XML attribute as a string.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementEncoded(XmlNode, String, String, Boolean, Boolean) method

```csharp
protected void WriteElementEncoded (System.Xml.XmlNode? node, string name, string? ns, bool isNullable, bool any);
```

Writes an XML node object within the body of a named XML element.

Parameters:

- `node`: The XML node to write, possibly a child XML element.
- `name`: The local name of the parent XML element to write.
- `ns`: The namespace of the parent XML element to write.
- `isNullable`: `true` to write an `xsi:nil='true'` attribute if the object to serialize is `null`; otherwise, `false`.
- `any`: `true` to indicate that the node, if an XML element, adheres to an XML Schema `any` element declaration; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.WriteElementEncoded` method is called only when writing SOAP-encoded XML, as described in Section 5 of the SOAP 1.1 specification.

## XmlSerializationWriter.WriteElementLiteral(XmlNode, String, String, Boolean, Boolean) method

```csharp
protected void WriteElementLiteral (System.Xml.XmlNode? node, string name, string? ns, bool isNullable, bool any);
```

Instructs an `XmlWriter` object to write an `XmlNode` object within the body of a named XML element.

Parameters:

- `node`: The XML node to write, possibly a child XML element.
- `name`: The local name of the parent XML element to write.
- `ns`: The namespace of the parent XML element to write.
- `isNullable`: `true` to write an `xsi:nil='true'` attribute if the object to serialize is `null`; otherwise, `false`.
- `any`: `true` to indicate that the node, if an XML element, adheres to an XML Schema `any` element declaration; otherwise, `false`.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationWriter.WriteElementLiteral` method is called only when writing literal XML that can be defined in an XML Schema document.

## XmlSerializationWriter.WriteElementQualifiedName(String, XmlQualifiedName) method

```csharp
protected void WriteElementQualifiedName (string localName, System.Xml.XmlQualifiedName? value);
```

Writes an XML element with a specified qualified name in its body.

Parameters:

- `localName`: The local name of the XML element.
- `value`: The name to write, using its prefix if namespace-qualified, in the element text.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementQualifiedName(String, String, XmlQualifiedName) method

```csharp
protected void WriteElementQualifiedName (string localName, string? ns, System.Xml.XmlQualifiedName? value);
```

Writes an XML element with a specified qualified name in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The name to write, using its prefix if namespace-qualified, in the element text.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementQualifiedName(String, XmlQualifiedName, XmlQualifiedName) method

```csharp
protected void WriteElementQualifiedName (string localName, System.Xml.XmlQualifiedName? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified qualified name in its body.

Parameters:

- `localName`: The local name of the XML element.
- `value`: The name to write, using its prefix if namespace-qualified, in the element text.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

## XmlSerializationWriter.WriteElementQualifiedName(String, String, XmlQualifiedName, XmlQualifiedName) method

```csharp
protected void WriteElementQualifiedName (string localName, string? ns, System.Xml.XmlQualifiedName? value, System.Xml.XmlQualifiedName? xsiType);
```

Writes an XML element with a specified qualified name in its body.

Parameters:

- `localName`: The local name of the XML element.
- `ns`: The namespace of the XML element.
- `value`: The name to write, using its prefix if namespace-qualified, in the element text.
- `xsiType`: The name of the XML Schema data type to be written to the `xsi:type` attribute.

#### Remarks
The protected members of `XmlSerializationWriter` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.
