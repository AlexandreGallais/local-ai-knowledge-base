---
title: "UnreferencedObjectEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/UnreferencedObjectEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnreferencedObjectEventArgs class

Namespace: `System.Xml.Serialization`

```csharp
public class UnreferencedObjectEventArgs : EventArgs
```

Provides data for the known, but unreferenced, object found in an encoded SOAP XML stream during deserialization.

#### Remarks
For more information about the `UnreferencedObjectEventArgs` class, see the `UnreferencedObject` event of the `XmlSerializer`.

The `UnreferencedObject` event occurs only when you call the `XmlSerializer.Deserialize` method.

For more information about handling events, see Events Overview

#### Examples
The following example adds an `UnreferencedObjectEventHandler` to an `XmlSerializer`. The event is handled by the `Serializer_UnreferencedObject` method. To run the example, cut and paste the following XML into a file named UnrefObj.xml.

```
<wrapper>
  <Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="id1" n1:GroupName=".NET" xmlns:n1="http://www.cpandl.com">
   </Group>
<Vehicle id="id2" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">ABCD</licenseNumber>
  </Vehicle>
<Vehicle id="id3" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">1234</licenseNumber>
  </Vehicle>
</wrapper>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/UnreferencedObjectEventArgs/Overview/unrefobj.cs._

## UnreferencedObjectEventArgs.UnreferencedObjectEventArgs(Object, String) constructor

```csharp
public UnreferencedObjectEventArgs (object? o, string? id);
```

Initializes a new instance of the `UnreferencedObjectEventArgs` class.

Parameters:

- `o`: The unreferenced object.
- `id`: A unique string used to identify the unreferenced object.

#### Examples
The following example adds an `UnreferencedObjectEventHandler` to an `XmlSerializer`. The event is handled by the `Serializer_UnreferencedObject` method. To run the example, cut and paste the following XML into a file named UnrefObj.xml.

```
<wrapper>
  <Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="id1" n1:GroupName=".NET" xmlns:n1="http://www.cpandl.com">
   </Group>
<Vehicle id="id2" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">ABCD</licenseNumber>
  </Vehicle>
<Vehicle id="id3" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">1234</licenseNumber>
  </Vehicle>
</wrapper>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/UnreferencedObjectEventArgs/Overview/unrefobj.cs._

## UnreferencedObjectEventArgs.UnreferencedId property

```csharp
public string? UnreferencedId { get; }
```

Gets the ID of the object.

Returns: The ID of the object.

#### Remarks
Use the `UnreferencedId` property when you need to know when more than one object raises the event. The property allows you to distinguish between multiple instances of unreferenced objects.

For more information about the `UnreferencedId` property, see the `UnreferencedObject` event.

#### Examples
The following example adds an `UnreferencedObjectEventHandler` to an `XmlSerializer`. The event is handled by the `Serializer_UnreferencedObject` method. To run the example, cut and paste the following XML into a file named UnrefObj.xml.

```
<wrapper>
  <Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="id1" n1:GroupName=".NET" xmlns:n1="http://www.cpandl.com">
   </Group>
<Vehicle id="id2" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">ABCD</licenseNumber>
  </Vehicle>
<Vehicle id="id3" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">1234</licenseNumber>
  </Vehicle>
</wrapper>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/UnreferencedObjectEventArgs/Overview/unrefobj.cs._

## UnreferencedObjectEventArgs.UnreferencedObject property

```csharp
public object? UnreferencedObject { get; }
```

Gets the deserialized, but unreferenced, object.

Returns: The deserialized, but unreferenced, object.

#### Remarks
The `UnreferencedObject` can be cast to the known type if examining its properties is required.

See the `UnreferencedObject` event for more information about the `UnreferencedObject` property.

#### Examples
The following example adds an `UnreferencedObjectEventHandler` to an `XmlSerializer`. The event is handled by the `Serializer_UnreferencedObject` method. To run the example, cut and paste the following XML into a file named UnrefObj.xml.

```
<wrapper>
  <Group xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="id1" n1:GroupName=".NET" xmlns:n1="http://www.cpandl.com">
   </Group>
<Vehicle id="id2" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">ABCD</licenseNumber>
  </Vehicle>
<Vehicle id="id3" n1:type="Vehicle" xmlns:n1="http://www.w3.org/2001/XMLSchema-instance">
    <licenseNumber xmlns:q1="http://www.w3.org/2001/XMLSchema" n1:type="q1:string">1234</licenseNumber>
  </Vehicle>
</wrapper>
```

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/UnreferencedObjectEventArgs/Overview/unrefobj.cs._
