---
title: "EventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/EventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventHandler delegate

Namespace: `System`

```csharp
public delegate void EventHandler(object? sender, EventArgs e);
```

Represents the method that will handle an event that has no event data.

Parameters:

- `sender`: The source of the event.
- `e`: An object that contains no event data.

#### Remarks

The event model in .NET is based on having an event delegate that connects an event with its handler. To raise an event, two elements are needed:

- A delegate that identifies the method that provides the response to the event.
- Optionally, a class that holds the event data, if the event provides data.

The delegate is a type that defines a signature, that is, the return value type and parameter list types for a method. You can use the delegate type to declare a variable that can refer to any method with the same signature as the delegate.

The standard signature of an event handler delegate defines a method that does not return a value. This method's first parameter is of type `Object` and refers to the instance that raises the event. Its second parameter is derived from type `EventArgs` and holds the event data. If the event does not generate event data, the second parameter is simply the value of the `Empty` field. Otherwise, the second parameter is a type derived from `EventArgs` and supplies any fields or properties needed to hold the event data.

The `EventHandler` delegate is a predefined delegate that specifically represents an event handler method for an event that does not generate data. If your event does generate data, you must use the generic `EventHandler<T>` delegate class.

To associate the event with the method that will handle the event, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate.

For more information about event handler delegates, see Handling and Raising Events.
