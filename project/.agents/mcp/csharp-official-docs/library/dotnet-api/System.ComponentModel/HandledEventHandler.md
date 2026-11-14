---
title: "HandledEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/HandledEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HandledEventHandler delegate

Namespace: `System.ComponentModel`

```csharp
public delegate void HandledEventHandler(object? sender, HandledEventArgs e);
```

Represents a method that can handle events which may or may not require further processing after the event handler has returned.

Parameters:

- `sender`: The source of the event.
- `e`: A `HandledEventArgs` that contains the event data.

#### Remarks
This delegate is available for use with your own events when the `Handled` property provides sufficient event data. The event handler can set the `Handled` property to `true` if all necessary processing has been completed in the handler.

Typically, events that require this functionality will also require additional event data, and will use a class that derives from `HandledEventArgs` along with a corresponding, similarly-named delegate type. For example, the `RowPrePaint` event uses the `DataGridViewRowPrePaintEventArgs` event-data type and the `DataGridViewRowPrePaintEventHandler` delegate type. Because delegates are not inherited, the `HandledEventHandler` is rarely used.
