---
title: "RefreshEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RefreshEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RefreshEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void RefreshEventHandler(RefreshEventArgs e);
```

Represents the method that handles the `TypeDescriptor.Refreshed` event raised when a `Type` or component is changed during design time.

Parameters:

- `e`: A `RefreshEventArgs` that contains the component or `Type` that changed.

#### Remarks
When you create a `RefreshEventHandler` delegate, you identify the method that will handle the event. To associate the event with your event handler, add an instance of the delegate to the event. The event handler is called whenever the event occurs, unless you remove the delegate. For more information about event handler delegates, see Handling and Raising Events.

#### Examples
The following sample demonstrates how to use a `RefreshEventHandler` delegate to handle the `Refreshed` event when a type or component changes. In the code, the `OnRefreshed` event handles the event and displays the component being changed.

The code assumes that a `TextBox` control is already sited on the form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/RefreshEventHandler/Overview/refreshevent.cs._
