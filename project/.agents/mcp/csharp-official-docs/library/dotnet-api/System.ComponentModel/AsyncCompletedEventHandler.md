---
title: "AsyncCompletedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AsyncCompletedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncCompletedEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void AsyncCompletedEventHandler(object? sender, AsyncCompletedEventArgs e);
```

Represents the method that will handle the *MethodName*`Completed` event of an asynchronous operation.

Parameters:

- `sender`: The source of the event.
- `e`: An `AsyncCompletedEventArgs` that contains the event data.

#### Remarks
When you create an `AsyncCompletedEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event-handler method is called whenever the event occurs, unless you remove the delegate. For more information about event-handler delegates, see Handling and Raising Events.

For an asynchronous method, called *MethodName*, in your component, you will have a corresponding *MethodName*`Completed` event, and an optional *MethodName*`CompletedEventArgs` class.

For a component that supports multiple concurrent invocations of its asynchronous methods, the client can supply a unique token, or task ID, to distinguish which asynchronous task is raising particular events. The client'<example-value>'s task IDs with pending asynchronous tasks.

#### Examples
For a code example of the `AsyncCompletedEventHandler` delegate, see the example in the `AsyncCompletedEventArgs` class.
