---
title: "Activity class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Activity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Activity class

Namespace: `System.Diagnostics`

```csharp
public class Activity : IDisposable
```

Represents an operation with context to be used for logging.

#### Remarks

An `Activity` has an operation name, an ID, a start time and duration, tags, and baggage.

The current activity can be accessed with the static `Current` property.

Activities should be created by calling the constructor, configured as necessary, and then started with the `Activity.Start` method, which maintains parent-child relationships for the activities and sets `Current`.

When an activity is finished, it should be stopped with the `Stop` method.

However, if you dispose the `Activity` object, that stops it so you don't need to explicitly call `Stop`. That simplifies the coding pattern. For more information, see the `Activity.Dispose` method.

No `Activity` methods allow exceptions to escape as a response to bad inputs. They are thrown and caught (which allows debuggers and monitors to see the error), but the exception is suppressed, and the operation does something reasonable (typically it does nothing).

## Activity.Activity(String) constructor

```csharp
public Activity (string operationName);
```

Initializes a new instance of the `Activity` class.

Parameters:

- `operationName`: The name of the operation.

#### Remarks

Note that `Activity` has a "builder" pattern: you call the constructor, a number of `Set*` and `Add*` APIs, and then call `Start` to build the activity. You **must** call `Start` before using the new instance.

## Activity.ActivityTraceFlags property

```csharp
public System.Diagnostics.ActivityTraceFlags ActivityTraceFlags { get; set; }
```

Gets or sets the flags (defined by the W3C ID specification) associated with the activity.

Returns: the flags associated with the activity.

To be added.

## Activity.Baggage property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string?>> Baggage { get; }
```

Gets a collection of key/value pairs that represents information that is passed to children of this `Activity`.

Returns: Information that's passed to children of this `Activity`.

#### Remarks

`Baggage` is serialized when requests leave the process (along with the ID). Typically, `Baggage` is used for fine-grained control over logging of the activity and any children.  In general, if you are not using the data at runtime, you should be using `Tags` instead.

## Activity.Context property

```csharp
public System.Diagnostics.ActivityContext Context { get; }
```

Gets the context of the activity. Context becomes valid only if the activity has been started.

Returns: The context of the activity, if the activity has been started; otherwise, returns the default context.

To be added.

## Activity.Current property

```csharp
public static System.Diagnostics.Activity? Current { get; set; }
```

Gets or sets the current operation (`Activity`) for the current thread. This flows across async calls.

Returns: The current operation for the current thread.

To be added.

## Activity.DefaultIdFormat property

```csharp
public static System.Diagnostics.ActivityIdFormat DefaultIdFormat { get; set; }
```

Gets or sets the default ID format for the `Activity`.

Returns: To be added.

The `Activity` instance tries to use the same format for IDs as its parent. If the activity has no parent, this property determines the default format to use.

The default format is `W3C`.

## Activity.DisplayName property

```csharp
public string DisplayName { get; set; }
```

Gets or sets the display name of the activity.

Returns: A string that represents the activity display name.

#### Remarks

`DisplayName` is intended to be used in a user interface and need not be the same as `OperationName`.

If the `DisplayName` property is not set, it will return the same value as `OperationName`.

## Activity.Duration property

```csharp
public TimeSpan Duration { get; }
```

Gets the duration of the operation.

Returns: The delta between `Activity.StartTimeUtc` and the end time if the `Activity` has ended (`Activity.Stop` or `Activity.SetEndTime` was called), or `TimeSpan.Zero` if the `Activity` has not ended and `Activity.SetEndTime` was not called.

To be added.

## Activity.Events property

```csharp
public System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityEvent> Events { get; }
```

Gets the list of all the activity events attached to this activity.

Returns: An enumeration of activity events attached to this activity. If the activity has no events, returns an empty enumeration.

To be added.

## Activity.ForceDefaultIdFormat property

```csharp
public static bool ForceDefaultIdFormat { get; set; }
```

Gets or sets a value that detrmines if the `Activity.DefaultIdFormat` is always used to define the default ID format.

Returns: `true` to always use the `Activity.DefaultIdFormat`; otherwise, `false`.

Normally if the `ParentId` is defined, its format determines the format used by the current `Activity`. However, if `ForceDefaultFormat` is set to `true`, the ID format is always defined by the `DefaultIdFormat` property even if the `ParentId` is defined and the parent has a different format.

## Activity.HasRandomizedTraceId property

```csharp
public bool HasRandomizedTraceId { get; }
```

To be added.

Returns: To be added.

To be added.

## Activity.HasRemoteParent property

```csharp
public bool HasRemoteParent { get; }
```

Gets a value that indicates whether the parent context was created from remote propagation.

Returns: To be added.

To be added.

## Activity.Id property

```csharp
public string? Id { get; }
```

Gets an identifier that is specific to a particular request.

Returns: The activity ID.

#### Remarks

An ID has a hierarchical structure: `root-id.id1_id2.id3_`. The ID is generated when `Start` is called by appending a suffix to the `Activity.Parent.Id` or the `ParentId`. An `Activity` has no ID until it starts. For more information, see Activity IDs.

## Activity.IdFormat property

```csharp
public System.Diagnostics.ActivityIdFormat IdFormat { get; }
```

Gets the format for the `Activity.Id`.

Returns: The format for the `Activity.Id`.

To be added.

## Activity.IsAllDataRequested property

```csharp
public bool IsAllDataRequested { get; set; }
```

Gets or sets a value that indicates whether this activity should be populated with all the propagation information, as well as all the other properties, such as links, tags, and events.

Returns: `true` if the activity should be populated; `false` otherwise.

#### Remarks

The best practice for the library authors is not try to set this property. This property is automatically set when creating the Activity. The setter is useful only in the case of Activity objects created using the Activity constructor and want to override the default value. Activity objects created using `ActivitySource.StartActivity` automatically have this property set to the right value.

## Activity.IsStopped property

```csharp
public bool IsStopped { get; }
```

Gets a value that indicates whether this `Activity` object is stopped or not.

Returns: To be added.

#### Remarks

When subscribing to `Activity` stop event using `ActivityStopped`, the received `Activity` object in the event callback will have `IsStopped` as `true`.

## Activity.Kind property

```csharp
public System.Diagnostics.ActivityKind Kind { get; }
```

Gets the relationship between the activity, its parents, and its children in a trace.

Returns: One of the enumeration values that indicate relationship between the activity, its parents, and its children in a trace.

To be added.

## Activity.Links property

```csharp
public System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityLink> Links { get; }
```

Gets the list of all the activity links attached to this activity.

Returns: An enumeration of activity links attached to this activity. If the activity has no links, returns an empty enumeration.

To be added.

## Activity.OperationName property

```csharp
public string OperationName { get; }
```

Gets the operation name.

Returns: The name of the operation.

#### Remarks

An operation name is the *coarsest* name that is useful for grouping/filtering. The name is typically a compile-time constant. Names of Rest APIs are reasonable, but arguments (such as specific accounts) should not be in the name but rather in the tags.

## Activity.Parent property

```csharp
public System.Diagnostics.Activity? Parent { get; }
```

Gets the parent `Activity` that created this activity.

Returns: The parent of this `Activity`, if it is from the same process, or `null` if this instance has no parent (it is a root activity) or if the parent is from outside the process.

To be added.

## Activity.ParentId property

```csharp
public string? ParentId { get; }
```

Gets the ID of this activity's parent.

Returns: The parent ID, if one exists, or `null` if it does not.

#### Remarks

If the parent for this `Activity` comes from outside the process, the `Activity` does not have a parent but *may* have a parent ID (which was deserialized from the parent).

This property value can be `null` if this is a root `Activity` (that is, it has no `Parent`). For more information, see ID format.

## Activity.ParentSpanId property

```csharp
public System.Diagnostics.ActivitySpanId ParentSpanId { get; }
```

Gets the parent's `Activity.SpanId`.

Returns: The parent's `Activity.SpanId`.

If the `ParentId` is in the W3C format, this property returns the `SpanId` part of the ParentId.  Otherwise it returns a zero `SpanId`.

## Activity.Recorded property

```csharp
public bool Recorded { get; }
```

Gets a value that indicates whether the W3CIdFlags.Recorded flag is set.

Returns: `true` if the W3CIdFlags.Recorded flag is set; otherwise, `false`.

To be added.

## Activity.RootId property

```csharp
public string? RootId { get; }
```

Gets the root ID of this `Activity`.

Returns: The root ID, or `null` if the current instance has neither `Activity.ParentId` nor `Activity.Id`.

#### Remarks

The root ID is a substring from the `Id` or the `ParentId`) between '|' (or the beginning) and the first `.`. Filtering by root ID allows you to find all activities involved in operation processing. For more information, see ID Format.

## Activity.Source property

```csharp
public System.Diagnostics.ActivitySource Source { get; }
```

Gets the activity source associated with this activity.

Returns: To be added.

#### Remarks

All activities created from public constructors will have a singleton source where the source name is an empty string. Otherwise, the source will hold the object that created the activity through `ActivitySource.StartActivity`.

## Activity.SpanId property

```csharp
public System.Diagnostics.ActivitySpanId SpanId { get; }
```

Gets the SPAN part of the `Activity.Id`.

Returns: The ID for the SPAN part of `Activity.Id`, if the `Activity` has the W3C format; otherwise, a zero `SpanId`.

To be added.

## Activity.StartTimeUtc property

```csharp
public DateTime StartTimeUtc { get; }
```

Gets the time when the operation started.

Returns: The UTC time that the operation started.

#### Remarks

The `StartTimeUtc` property is typically initialized when `Start` is called, but it can be set at any time by calling `Activity.SetStartTime`.

## Activity.Status property

```csharp
public System.Diagnostics.ActivityStatusCode Status { get; }
```

Gets status code of the current activity object.

Returns: To be added.

To be added.

## Activity.StatusDescription property

```csharp
public string? StatusDescription { get; }
```

Gets the status description of the current activity object.

Returns: To be added.

To be added.

## Activity.TagObjects property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> TagObjects { get; }
```

Gets the list of tags that represent information to log along with the activity. This information is not passed on to the children of this activity.

Returns: A key-value pair enumeration of tags and objects.

To be added.

## Activity.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string?>> Tags { get; }
```

Gets a collection of key/value pairs that represent information that will be logged along with the `Activity` to the logging system.

Returns: Information that will be logged along with the `Activity` to the logging system.

The order of the tags in the list matches the order in which they're added to the list.

## Activity.TraceId property

```csharp
public System.Diagnostics.ActivityTraceId TraceId { get; }
```

Gets the TraceId part of the `Activity.Id`.

Returns: The ID for the TraceId part of the `Activity.Id`, if the ID has the W3C format; otherwise, a zero TraceId.

To be added.

## Activity.TraceIdGenerator property

```csharp
public static Func<System.Diagnostics.ActivityTraceId>? TraceIdGenerator { get; set; }
```

When starting an Activity which does not have a parent context, the Trace Id will automatically be generated using random numbers.
TraceIdGenerator can be used to override the runtime's default Trace Id generation algorithm.

Returns: To be added.

#### Remarks

- TraceIdGenerator needs to be set only if the default Trace Id generation is not enough for the app scenario.
- When setting TraceIdGenerator, ensure it is performant enough to avoid any slowness in the Activity starting operation.
- If TraceIdGenerator is set multiple times, the last set will be the one used for the Trace Id generation.
- Setting TraceIdGenerator to `null` will re-enable the default Trace Id generation algorithm.

## Activity.TraceStateString property

```csharp
public string? TraceStateString { get; set; }
```

Gets or sets the W3C `tracestate` header.

Returns: The W3C `tracestate` header.

The `tracestate` header is intended to carry supplemental information to trace identity contained in the trace parent. `tracestate` consists of a list of key/value pairs that convey information about the request position in multiple distributed tracing graphs. This information is typically used by distributed tracing systems and should not be used for general purpose baggage, since this may break the correlation of a distributed trace.

Logically `TraceStateString` is just a kind of baggage (if flows just like baggage), but because it is expected to be special-cased (it has its own HTTP header), it is more convenient/efficient if it is not lumped in with other baggage.
