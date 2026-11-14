---
title: "HandledEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/HandledEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HandledEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class HandledEventArgs : EventArgs
```

Provides data for events that can be handled completely in an event handler.

#### Remarks
Typically, the value of the `Handled` property is set in an event handler to indicate that the system should perform no further processing.

This class is a base class for types such as the `DataGridViewCellPaintingEventArgs`, `DataGridViewRowPrePaintEventArgs`, `DataGridViewRowHeightInfoPushedEventArgs`, and `DataGridViewSortCompareEventArgs` classes.

## HandledEventArgs.HandledEventArgs() constructor

```csharp
public HandledEventArgs ();
```

Initializes a new instance of the `HandledEventArgs` class with a default `HandledEventArgs.Handled` property value of `false`.

To be added.

## HandledEventArgs.HandledEventArgs(Boolean) constructor

```csharp
public HandledEventArgs (bool defaultHandledValue);
```

Initializes a new instance of the `HandledEventArgs` class with the specified default value for the `HandledEventArgs.Handled` property.

Parameters:

- `defaultHandledValue`: The default value for the `HandledEventArgs.Handled` property.

To be added.

## HandledEventArgs.Handled property

```csharp
public bool Handled { get; set; }
```

Gets or sets a value that indicates whether the event handler has completely handled the event or whether the system should continue its own processing.

Returns: `true` if the event has been completely handled; otherwise, `false`.

To be added.
