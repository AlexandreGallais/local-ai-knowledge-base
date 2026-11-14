---
title: "UnhandledExceptionEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UnhandledExceptionEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnhandledExceptionEventHandler delegate

Namespace: `System`

```csharp
public delegate void UnhandledExceptionEventHandler(object sender, UnhandledExceptionEventArgs e);
```

Represents the method that will handle the event raised by an exception that is not handled by the application domain.

Parameters:

- `sender`: The source of the unhandled exception event.
- `e`: An `UnhandledExceptionEventArgs` that contains the event data.

#### Remarks
An `UnhandledExceptionEventHandler` can only be specified for the default application domain that is created by the system to execute an application. Specifying an `UnhandledExceptionEventHandler` for an `AppDomain` created by an application has no effect.

When you create an `UnhandledExceptionEventHandler` delegate, you identify the method that will handle the event. To associate the event handler with your event, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.
