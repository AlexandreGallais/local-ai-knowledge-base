---
title: "UnreferencedObjectEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/UnreferencedObjectEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnreferencedObjectEventHandler delegate

Namespace: `System.Xml.Serialization`

```csharp
public delegate void UnreferencedObjectEventHandler(object? sender, UnreferencedObjectEventArgs e);
```

Represents the method that handles the `XmlSerializer.UnreferencedObject` event of an `XmlSerializer`.

Parameters:

- `sender`: The source of the event.
- `e`: An `UnreferencedObjectEventArgs` that contains the event data.

#### Remarks
When you create an `UnreferencedObjectEventHandler` delegate, you identify the method that handles the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events

The `UnreferencedObject` event occurs only when you call the `XmlSerializer.Deserialize` method.

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
