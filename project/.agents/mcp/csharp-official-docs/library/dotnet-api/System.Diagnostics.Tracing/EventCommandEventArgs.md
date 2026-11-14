---
title: "EventCommandEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventCommandEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventCommandEventArgs class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventCommandEventArgs : EventArgs
```

Provides the arguments for the `EventSource.OnEventCommand` callback.

To be added.

## EventCommandEventArgs.Arguments property

```csharp
public System.Collections.Generic.IDictionary<string,string?>? Arguments { get; }
```

Gets the array of arguments for the callback.

Returns: An array of callback arguments.

To be added.

## EventCommandEventArgs.Command property

```csharp
public System.Diagnostics.Tracing.EventCommand Command { get; }
```

Gets the command for the callback.

Returns: The callback command.

To be added.

## EventCommandEventArgs.DisableEvent(Int32) method

```csharp
public bool DisableEvent (int eventId);
```

Disables the event that have the specified identifier.

Parameters:

- `eventId`: The identifier of the event to disable.

Returns: `true` if `eventId` is in range; otherwise, `false`.

#### Remarks
You can turn off all events in an event listener by calling `EventCommandEventArgs.DisableEvent` starting with `eventID` = 1 and continuing until `EventCommandEventArgs.DisableEvent` returns `false`.

## EventCommandEventArgs.EnableEvent(Int32) method

```csharp
public bool EnableEvent (int eventId);
```

Enables the event that has the specified identifier.

Parameters:

- `eventId`: The identifier of the event to enable.

Returns: `true` if `eventId` is in range; otherwise, `false`.

#### Remarks
You can turn on all events in an event listener by calling `EventCommandEventArgs.EnableEvent` starting with `eventID` = 1 and continuing until `EventCommandEventArgs.EnableEvent` returns `false`.
