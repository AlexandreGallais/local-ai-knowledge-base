---
title: "XmlAttributeEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlAttributeEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlAttributeEventArgs class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlAttributeEventArgs : EventArgs
```

Provides data for the `XmlSerializer.UnknownAttribute` event.

#### Remarks
For more information about handling events, see Events Overview.

The `UnknownAttribute` event occurs only when you call the `XmlSerializer.Deserialize` method.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownAttributes.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownAttribute` event occurs. To try the example, paste the following XML code into a file named UnknownAttributes.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" GroupType = 'Technical' GroupNumber = '42' GroupBase = 'Red'>
  <GroupName>MyGroup</GroupName>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeEventArgs/Overview/source.cs._

## XmlAttributeEventArgs.Attr property

```csharp
public System.Xml.XmlAttribute Attr { get; }
```

Gets an object that represents the unknown XML attribute.

Returns: An `XmlAttribute` that represents the unknown XML attribute.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownAttributes.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownAttribute` event occurs. To try the example, paste the following XML code into a file named UnknownAttributes.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" GroupType = 'Technical' GroupNumber = '42' GroupBase = 'Red'>
  <GroupName>MyGroup</GroupName>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeEventArgs/Overview/source.cs._

## XmlAttributeEventArgs.ExpectedAttributes property

```csharp
public string ExpectedAttributes { get; }
```

Gets a comma-delimited list of XML attribute names expected to be in an XML document instance.

Returns: A comma-delimited list of XML attribute names. Each name is in the following format: `namespace`:`name`.

To be added.

## XmlAttributeEventArgs.LineNumber property

```csharp
public int LineNumber { get; }
```

Gets the line number of the unknown XML attribute.

Returns: The line number of the unknown XML attribute.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownAttributes.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownAttribute` event occurs. To try the example, paste the following XML code into a file named UnknownAttributes.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" GroupType = 'Technical' GroupNumber = '42' GroupBase = 'Red'>
  <GroupName>MyGroup</GroupName>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeEventArgs/Overview/source.cs._

## XmlAttributeEventArgs.LinePosition property

```csharp
public int LinePosition { get; }
```

Gets the position in the line of the unknown XML attribute.

Returns: The position number of the unknown XML attribute.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownAttributes.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownAttribute` event occurs. To try the example, paste the following XML code into a file named UnknownAttributes.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" GroupType = 'Technical' GroupNumber = '42' GroupBase = 'Red'>
  <GroupName>MyGroup</GroupName>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeEventArgs/Overview/source.cs._

## XmlAttributeEventArgs.ObjectBeingDeserialized property

```csharp
public object? ObjectBeingDeserialized { get; }
```

Gets the object being deserialized.

Returns: The object being deserialized.

#### Examples
The following example prints the value returned by the `Object.ToString` method when the `XmlSerializer.Deserialize` method encounters an unknown attribute.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlAttributeEventArgs/ObjectBeingDeserialized/source.cs._
