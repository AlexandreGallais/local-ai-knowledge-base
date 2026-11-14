---
title: "XmlNodeEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlNodeEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeEventHandler delegate

Namespace: `System.Xml.Serialization`

```csharp
public delegate void XmlNodeEventHandler(object? sender, XmlNodeEventArgs e);
```

Represents the method that handles the `XmlSerializer.UnknownNode` event of an `XmlSerializer`.

Parameters:

- `sender`: The source of the event.
- `e`: An `XmlNodeEventArgs` that contains the event data.

#### Remarks
When you create an `XmlNodeEventHandler` delegate, you identify the method that handles the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

The `UnknownNode` event occurs only when you call the `XmlSerializer.Deserialize` method.

#### Examples
The following example creates an `XmlSerializer`, adds an event handler for the `UnknownNode` event, and deserializes an object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventHandler/Overview/source.cs._
