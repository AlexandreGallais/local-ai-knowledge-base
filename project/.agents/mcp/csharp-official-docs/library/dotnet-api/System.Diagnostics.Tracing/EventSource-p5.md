---
title: "EventSource class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSource class (part 5 of 5)

## EventSource.WriteEventWithRelatedActivityId(Int32, Guid, Object[]) method

```csharp
protected void WriteEventWithRelatedActivityId (int eventId, Guid relatedActivityId, params object?[] args);
```

Writes an event that indicates that the current activity is related to another activity.

Parameters:

- `eventId`: An identifier that uniquely identifies this event within the `EventSource`.
- `relatedActivityId`: The related activity identifier.
- `args`: An array of objects that contain data about the event.

#### Remarks
The `EventSource.WriteEventWithRelatedActivityId` method logs a transfer event. The activity of the current thread is logged with the event, and this allows two activities to be related by a consumer of events.

Your ETW event method calling this function must follow these guidelines:

- Specify the first parameter as a `Guid` named `relatedActivityId`.
- Specify either `Send` or `Receive` as the `Opcode` property.
- Call `EventSource.WriteEventWithRelatedActivityId` passing in the event ID, followed by the related ID GUID, followed by all the parameters the event method is passed, in the same order.

If `args` is not used, it is converted to an empty array for the resulting call to ETW.

#### Examples

The following code example shows how you might can specify an event source that calls `EventSource.WriteEventWithRelatedActivityId`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/WriteEventWithRelatedActivityId/program.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/WriteEventWithRelatedActivityId/program.cs._
## EventSource.WriteEventWithRelatedActivityIdCore(Int32, Guid*, Int32, EventSource+EventData*) method

```csharp
protected void WriteEventWithRelatedActivityIdCore (int eventId, Guid* relatedActivityId, int eventDataCount, System.Diagnostics.Tracing.EventSource.EventData* data);
```

Writes an event that indicates that the current activity is related to another activity.

Parameters:

- `eventId`: An identifier that uniquely identifies this event within the `EventSource`.
- `relatedActivityId`: A pointer to the GUID of the related activity ID.
- `eventDataCount`: The number of items in the `data` field.
- `data`: A pointer to the first item in the event data field.

#### Remarks
`EventSource.WriteEventWithRelatedActivityIdCore` is similar to the `EventSource.WriteEventWithRelatedActivityId` method but offers better performance, because it does not have to unbox the `childActivityID` and `data` arguments.

Your ETW event method calling this function must follow these guidelines:

- Specify the first parameter as a `Guid` named `relatedActivityId`.
- Specify either `Send` or `Receive` as the `Opcode` property.
- Call `EventSource.WriteEventWithRelatedActivityIdCore` passing in the event ID, followed by the related ID GUID, followed by all the parameters the event method is passed, in the same order.

This method uses the same rules as `EventSource.WriteEventCore` for the `args` parameter. See WriteEventCore documentation for more details.

#### Examples

The following C# code example shows how to define a method overload that calls `EventSource.WriteEventWithRelatedActivityIdCore`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/WriteEventWithRelatedActivityId/program.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/WriteEventWithRelatedActivityId/program.cs._

## EventSource.EventCommandExecuted event

```csharp
public event EventHandler<System.Diagnostics.Tracing.EventCommandEventArgs>? EventCommandExecuted;
```

Occurs when a command comes from an event listener.

To be added.
