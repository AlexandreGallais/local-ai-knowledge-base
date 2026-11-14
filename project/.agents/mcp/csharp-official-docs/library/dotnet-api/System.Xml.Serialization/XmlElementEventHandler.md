---
title: "XmlElementEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlElementEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlElementEventHandler delegate

Namespace: `System.Xml.Serialization`

```csharp
public delegate void XmlElementEventHandler(object? sender, XmlElementEventArgs e);
```

Represents the method that handles the `XmlSerializer.UnknownElement` event of an `XmlSerializer`.

Parameters:

- `sender`: The source of the event.
- `e`: A `XmlElementEventArgs` that contains the event data.

#### Remarks
When you create an `XmlElementEventHandler` delegate, you identify the method that handles the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

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
