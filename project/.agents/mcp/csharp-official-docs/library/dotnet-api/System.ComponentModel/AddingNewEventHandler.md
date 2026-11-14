---
title: "AddingNewEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AddingNewEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AddingNewEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void AddingNewEventHandler(object? sender, AddingNewEventArgs e);
```

Represents the method that will handle the `BindingSource.AddingNew` event.

Parameters:

- `sender`: The source of the event, typically a data container or data-bound collection.
- `e`: A `AddingNewEventArgs` that contains the event data.

#### Remarks
The `AddingNew` event occurs prior to adding a new item to a collection, typically in data-binding scenarios. The handler of this event can supply the new item to be added, overriding the standard action of the collection class. This is accomplished by setting the `NewObject` property of the `AddingNewEventArgs` parameter `e` to this new item. Typically this item must be of a type expected by the recipient collection, or the collection will throw an exception of type `InvalidCastException`.

This event is commonly used in data-binding scenarios, within classes such as `BindingSource` and `BindingList<T>`.

When you create an `AddingNewEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

#### Examples
The following code example demonstrates how to use the `AddingNewEventHandler` delegate to handle the `AddingNew` event. This code example is part of a larger example provided in How to: Customize Item Addition with the Windows Forms BindingSource.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AddingNewEventArgs/Overview/form1.cs._
