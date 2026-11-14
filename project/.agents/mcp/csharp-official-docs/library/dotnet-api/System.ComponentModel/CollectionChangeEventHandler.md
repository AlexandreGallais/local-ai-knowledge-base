---
title: "CollectionChangeEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CollectionChangeEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionChangeEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void CollectionChangeEventHandler(object? sender, CollectionChangeEventArgs e);
```

Represents the method that handles the `DataColumnCollection.CollectionChanged` event raised when adding elements to or removing elements from a collection.

Parameters:

- `sender`: The source of the event.
- `e`: A `CollectionChangeEventArgs` that contains the event data.

#### Remarks
When you create a `CollectionChangeEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

#### Examples
For an example of using the `CollectionChangeEventHandler` delegate, see the sample code in the `CollectionChanged` event of the `DataColumnCollection` class.
