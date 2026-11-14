---
title: "XmlNodeChangedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeChangedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeChangedEventHandler delegate

Namespace: `System.Xml`

```csharp
public delegate void XmlNodeChangedEventHandler(object sender, XmlNodeChangedEventArgs e);
```

Represents the method that handles `XmlDocument.NodeChanged`, `XmlDocument.NodeChanging`, `XmlDocument.NodeInserted`, `XmlDocument.NodeInserting`, `XmlDocument.NodeRemoved` and `XmlDocument.NodeRemoving` events.

Parameters:

- `sender`: The source of the event.
- `e`: An `XmlNodeChangedEventArgs` containing the event data.

#### Remarks
When you create an `XmlNodeChangedEventHandler` delegate, you identify the method that handles the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

#### Examples
The following example shows how to handle the `NodeChanged` and `NodeInserted` events.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeChangedEventHandler/Overview/nodeevent.cs._

The example uses the file `book.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XmlNodeChangedEventHandler/XML/book.xml._
