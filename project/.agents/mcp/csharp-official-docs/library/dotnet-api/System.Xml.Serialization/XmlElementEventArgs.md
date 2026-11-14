---
title: "XmlElementEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlElementEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlElementEventArgs class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlElementEventArgs : EventArgs
```

Provides data for the `XmlSerializer.UnknownElement` event.

#### Remarks
For more information about handling events, see Handling and Raising Events and Handling and Raising Events.

The `UnknownElement` event occurs only when you call the `XmlSerializer.Deserialize` method.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownElements.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownElement` event occurs. To try the example, paste the following XML code into a file named UnknownElements.xml.

```
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <GroupName>MyGroup</GroupName>
  <GroupSize>Large</GroupSize>
  <GroupNumber>444</GroupNumber>
  <GroupBase>West</GroupBase>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementEventArgs/Overview/unknownelement.cs._

## XmlElementEventArgs.Element property

```csharp
public System.Xml.XmlElement Element { get; }
```

Gets the object that represents the unknown XML element.

Returns: The object that represents the unknown XML element.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownElements.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownElement` event occurs. To try the example, paste the following XML code into a file named UnknownElements.xml.

```
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <GroupName>MyGroup</GroupName>
  <GroupSize>Large</GroupSize>
  <GroupNumber>444</GroupNumber>
  <GroupBase>West</GroupBase>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementEventArgs/Overview/unknownelement.cs._

## XmlElementEventArgs.ExpectedElements property

```csharp
public string ExpectedElements { get; }
```

Gets a comma-delimited list of XML element names expected to be in an XML document instance.

Returns: A comma-delimited list of XML element names. Each name is in the following format: `namespace`:`name`.

To be added.

## XmlElementEventArgs.LineNumber property

```csharp
public int LineNumber { get; }
```

Gets the line number where the unknown element was encountered if the XML reader is an `XmlTextReader`.

Returns: The line number where the unknown element was encountered if the XML reader is an `XmlTextReader`; otherwise, -1.

#### Remarks
The `LineNumber` property returns a value only if the underlying XML reader is an `XmlTextReader`.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownElements.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownElement` event occurs. To try the example, paste the following XML code into a file named UnknownElements.xml.

```
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <GroupName>MyGroup</GroupName>
  <GroupSize>Large</GroupSize>
  <GroupNumber>444</GroupNumber>
  <GroupBase>West</GroupBase>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementEventArgs/Overview/unknownelement.cs._

## XmlElementEventArgs.LinePosition property

```csharp
public int LinePosition { get; }
```

Gets the place in the line where the unknown element occurs if the XML reader is an `XmlTextReader`.

Returns: The number in the line where the unknown element occurs if the XML reader is an `XmlTextReader`; otherwise, -1.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownElements.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownElement` event occurs. To try the example, paste the following XML code into a file named UnknownElements.xml.

```
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <GroupName>MyGroup</GroupName>
  <GroupSize>Large</GroupSize>
  <GroupNumber>444</GroupNumber>
  <GroupBase>West</GroupBase>
</Group>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlElementEventArgs/Overview/unknownelement.cs._

## XmlElementEventArgs.ObjectBeingDeserialized property

```csharp
public object? ObjectBeingDeserialized { get; }
```

Gets the object the `XmlSerializer` is deserializing.

Returns: The object that is being deserialized by the `XmlSerializer`.

#### Examples
The following example deserializes a class named `Group` from a file named UnknownElements.xml. Whenever an element is found in the file that has no corresponding member in the class, the `UnknownElement` event occurs. To try the example, paste the following XML code into a file named UnknownElements.xml.

```
<?xml version="1.0" encoding="utf-8"?>
<Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <GroupName>MyGroup</GroupName>
  <GroupSize>Large</GroupSize>
  <GroupNumber>444</GroupNumber>
  <GroupBase>West</GroupBase>
</Group>
```

XmlSerializer.UnknownElement Example#1
