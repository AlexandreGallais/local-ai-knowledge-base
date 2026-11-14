---
title: "ListChangedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ListChangedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListChangedEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void ListChangedEventHandler(object? sender, ListChangedEventArgs e);
```

Represents the method that will handle the `IBindingList.ListChanged` event of the `IBindingList` class.

Parameters:

- `sender`: The source of the event.
- `e`: A `ListChangedEventArgs` that contains the event data.

#### Remarks
When you create a `ListChangedEventHandler` delegate, you identify a method to handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

#### Examples
For an example of using this delegate, see Handling DataView Events.
