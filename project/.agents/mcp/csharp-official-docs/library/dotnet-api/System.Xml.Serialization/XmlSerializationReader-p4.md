---
title: "XmlSerializationReader class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializationReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializationReader class (part 4 of 4)

## XmlSerializationReader.ToChar(String) method

```csharp
protected static char ToChar (string value);
```

Produces a `Char` object from an input string.

Parameters:

- `value`: A string to translate into a `Char` object.

Returns: A `Char` object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToChar` method is static.

## XmlSerializationReader.ToDate(String) method

```csharp
protected static DateTime ToDate (string value);
```

Produces a `DateTime` object from an input string.

Parameters:

- `value`: A string to translate into a `DateTime` class object.

Returns: A `DateTime` object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToDate` method is static.

## XmlSerializationReader.ToDateOnly(String) method

```csharp
protected static DateOnly ToDateOnly (string value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## XmlSerializationReader.ToDateTime(String) method

```csharp
protected static DateTime ToDateTime (string value);
```

Produces a `DateTime` object from an input string.

Parameters:

- `value`: A string to translate into a `DateTime` object.

Returns: A `DateTime` object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToDateTime` method is static.

## XmlSerializationReader.ToEnum(String, Hashtable, String) method

```csharp
protected static long ToEnum (string value, System.Collections.Hashtable h, string typeName);
```

Produces a numeric enumeration value from a string that consists of delimited identifiers that represent constants from the enumerator list.

Parameters:

- `value`: A string that consists of delimited identifiers where each identifier represents a constant from the set enumerator list.
- `h`: A `Hashtable` that consists of the identifiers as keys and the constants as integral numbers.
- `typeName`: The name of the enumeration type.

Returns: A long value that consists of the enumeration value as a series of bitwise `OR` operations.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToEnum` method is static.

## XmlSerializationReader.ToTime(String) method

```csharp
protected static DateTime ToTime (string value);
```

Produces a `DateTime` from a string that represents the time.

Parameters:

- `value`: A string to translate into a `DateTime` object.

Returns: A `DateTime` object.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToTime` method is static.

## XmlSerializationReader.ToTimeOnly(String) method

```csharp
protected static TimeOnly ToTimeOnly (string value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## XmlSerializationReader.ToTimeOnlyIgnoreOffset(String) method

```csharp
protected static TimeOnly ToTimeOnlyIgnoreOffset (string value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## XmlSerializationReader.ToXmlName(String) method

```csharp
protected static string? ToXmlName (string? value);
```

Decodes an XML name.

Parameters:

- `value`: An XML name to be decoded.

Returns: A decoded string.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToXmlName` method is static.

`XmlSerializationReader.ToXmlName` converts 4-digit hexadecimal UCS-2 codes into Unicode.

## XmlSerializationReader.ToXmlNCName(String) method

```csharp
protected static string? ToXmlNCName (string? value);
```

Decodes an XML name.

Parameters:

- `value`: An XML name to be decoded.

Returns: A decoded string.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToXmlNCName` method is static.

`XmlSerializationReader.ToXmlNCName` converts 4-digit hexadecimal UCS-2 codes into Unicode.

## XmlSerializationReader.ToXmlNmToken(String) method

```csharp
protected static string? ToXmlNmToken (string? value);
```

Decodes an XML name.

Parameters:

- `value`: An XML name to be decoded.

Returns: A decoded string.

#### Remarks
The protected members of `XmlSerializationReader` are only intended for use by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToXmlNmToken` method is static.

`XmlSerializationReader.ToXmlNmToken` converts 4-digit hexadecimal UCS-2 codes into Unicode.

## XmlSerializationReader.ToXmlNmTokens(String) method

```csharp
protected static string? ToXmlNmTokens (string? value);
```

Decodes an XML name.

Parameters:

- `value`: An XML name to be decoded.

Returns: A decoded string.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use by derived classes that are used internally within the .NET XML serialization infrastructure.

The `XmlSerializationReader.ToXmlNmTokens` method is static.

`XmlSerializationReader.ToXmlNmTokens` converts 4-digit hexadecimal UCS-2 codes into Unicode.

## XmlSerializationReader.ToXmlQualifiedName(String) method

```csharp
protected System.Xml.XmlQualifiedName ToXmlQualifiedName (string? value);
```

Obtains an `XmlQualifiedName` from a name that may contain a prefix.

Parameters:

- `value`: A name that may contain a prefix.

Returns: An `XmlQualifiedName` that represents a namespace-qualified XML name.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

If a prefix is present, the `XmlSerializationReader.ToXmlQualifiedName` method looks up the associated namespace for the current XML document and places the value in the `XmlQualifiedName` object.

## XmlSerializationReader.UnknownAttribute(Object, XmlAttribute) method

```csharp
protected void UnknownAttribute (object? o, System.Xml.XmlAttribute attr);
```

Raises an `XmlSerializer.UnknownAttribute` event for the current position of the `XmlReader`.

Parameters:

- `o`: An object that the `XmlSerializer` is attempting to deserialize, subsequently accessible through the `XmlAttributeEventArgs.ObjectBeingDeserialized` property.
- `attr`: An `XmlAttribute` that represents the attribute in question.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

Add a handler method to the `XmlSerializationReader.UnknownAttribute` method to handle unknown attributes while the `XmlSerializer` is executing its `XmlSerializer.Deserialize` method.

## XmlSerializationReader.UnknownAttribute(Object, XmlAttribute, String) method

```csharp
protected void UnknownAttribute (object? o, System.Xml.XmlAttribute attr, string? qnames);
```

Raises an `XmlSerializer.UnknownAttribute` event for the current position of the `XmlReader`.

Parameters:

- `o`: An object that the `XmlSerializer` is attempting to deserialize, subsequently accessible through the `XmlAttributeEventArgs.ObjectBeingDeserialized` property.
- `attr`: A `XmlAttribute` that represents the attribute in question.
- `qnames`: A comma-delimited list of XML qualified names.

To be added.

## XmlSerializationReader.UnknownElement(Object, XmlElement) method

```csharp
protected void UnknownElement (object? o, System.Xml.XmlElement elem);
```

Raises an `XmlSerializer.UnknownElement` event for the current position of the `XmlReader`.

Parameters:

- `o`: The `Object` that is being deserialized.
- `elem`: The `XmlElement` for which an event is raised.

To be added.

## XmlSerializationReader.UnknownElement(Object, XmlElement, String) method

```csharp
protected void UnknownElement (object? o, System.Xml.XmlElement elem, string? qnames);
```

Raises an `XmlSerializer.UnknownElement` event for the current position of the `XmlReader`.

Parameters:

- `o`: An object that the `XmlSerializer` is attempting to deserialize, subsequently accessible through the `XmlAttributeEventArgs.ObjectBeingDeserialized` property.
- `elem`: The `XmlElement` for which an event is raised.
- `qnames`: A comma-delimited list of XML qualified names.

To be added.

## XmlSerializationReader.UnknownNode(Object) method

```csharp
protected void UnknownNode (object? o);
```

Raises an `XmlSerializer.UnknownNode` event for the current position of the `XmlReader`.

Parameters:

- `o`: The object that is being deserialized.

To be added.

## XmlSerializationReader.UnknownNode(Object, String) method

```csharp
protected void UnknownNode (object? o, string? qnames);
```

Raises an `XmlSerializer.UnknownNode` event for the current position of the `XmlReader`.

Parameters:

- `o`: The object being deserialized.
- `qnames`: A comma-delimited list of XML qualified names.

To be added.

## XmlSerializationReader.UnreferencedObject(String, Object) method

```csharp
protected void UnreferencedObject (string? id, object? o);
```

Raises an `XmlSerializer.UnreferencedObject` event for the current position of the `XmlReader`.

Parameters:

- `id`: A unique string that is used to identify the unreferenced object, subsequently accessible through the `UnreferencedObjectEventArgs.UnreferencedId` property.
- `o`: An object that the `XmlSerializer` is attempting to deserialize, subsequently accessible through the `UnreferencedObjectEventArgs.UnreferencedObject` property.

#### Remarks
The protected members of `XmlSerializationReader` are intended for use only by derived classes that are used internally within the .NET XML serialization infrastructure.

SOAP encoding, as specified in Section 5 of the SOAP 1.1 specification, allows for elements referenced multiple times in a SOAP message (or optionally, just once) to be referred by an `href` attribute in the main message. An `UnreferencedObject` event occurs when such an element appears, but there is no `href` reference to it.

Add a handler method to `UnreferencedObject` to provide custom handling for unreferenced objects while the `XmlSerializer` executes its `XmlSerializer.Deserialize` method.
