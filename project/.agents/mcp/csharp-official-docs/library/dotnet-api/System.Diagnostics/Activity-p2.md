---
title: "Activity class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Activity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Activity class (part 2 of 2)

## Activity.AddBaggage(String, String) method

```csharp
public System.Diagnostics.Activity AddBaggage (string key, string? value);
```

Updates the `Activity` to have a new baggage item with the specified key and value.

Parameters:

- `key`: The baggage key.
- `value`: The baggage value.

Returns: `this` for convenient chaining.

#### Remarks

This key/value pair is included in the collection returned by the `Baggage` property, and can also be retrieved by the `Activity.GetBaggageItem` method.

`Baggage` is meant for information that is needed for runtime control. For information that is useful to show up in the log with the `Activity`, use the `Tags` property.

## Activity.AddEvent(ActivityEvent) method

```csharp
public System.Diagnostics.Activity AddEvent (System.Diagnostics.ActivityEvent e);
```

Adds the specified activity event to the events list.

Parameters:

- `e`: The activity event to add.

Returns: `this` for convenient chaining.

#### Remarks

`AddEvent` is not intended for adding many events over a long period of time, because the event objects are stored in memory. Adding too many events to the same `Activity` object can impact app performance.
Callers should either restrict the number of events added to the same `Activity` object or choose another logging mechanism, for example, `Logging`.

## Activity.AddException(Exception, TagList, DateTimeOffset) method

```csharp
public System.Diagnostics.Activity AddException (Exception exception, in System.Diagnostics.TagList tags = default, DateTimeOffset timestamp = default);
```

Add an `ActivityEvent` object containing the exception information to the `Activity.Events` list.

Parameters:

- `exception`: The exception to add to the attached events list.
- `tags`: The tags to add to the exception event.
- `timestamp`: The timestamp to add to the exception event.

Returns: `this` for convenient chaining.

- The name of the event will be "exception", and it will include the tags "exception.message", "exception.stacktrace", and "exception.type", in addition to the tags provided in the `tags` parameter.

- Any registered `ActivityListener` with the `ActivityListener.ExceptionRecorder` callback will be notified about this exception addition before the `ActivityEvent` object is added to the `Activity.Events` list.

- Any registered `ActivityListener` with the `ActivityListener.ExceptionRecorder` callback that adds "exception.message", "exception.stacktrace", or "exception.type" tags will not have these tags overwritten, except by any subsequent `ActivityListener` that explicitly overwrites them.

## Activity.AddLink(ActivityLink) method

```csharp
public System.Diagnostics.Activity AddLink (System.Diagnostics.ActivityLink link);
```

Adds an `ActivityLink` to the `Activity.Links` list.

Parameters:

- `link`: The `ActivityLink` to add.

Returns: `this` for convenient chaining.

For contexts that are available during span creation, adding links at span creation is preferred to calling `Activity.AddLink` later, because head sampling decisions can only consider information present during span creation.

## Activity.AddTag(String, Object) method

```csharp
public System.Diagnostics.Activity AddTag (string key, object? value);
```

Updates the activity to have a tag with an additional `key` and `value`.

Parameters:

- `key`: The tag key name.
- `value`: The tag value mapped to the input key.

Returns: `this` for convenient chaining.

#### Remarks

This shows up in the `TagObjects` enumeration. It is meant for information that is useful to log but not needed for runtime control (for the latter, `Baggage`).

## Activity.AddTag(String, String) method

```csharp
public System.Diagnostics.Activity AddTag (string key, string? value);
```

Updates the `Activity` to have a new tag with the provided `key` and `value`.

Parameters:

- `key`: The tag key.
- `value`: The tag value.

Returns: `this` for convenient chaining.

#### Remarks

This key/value pair is included in the collection returned by the `Tags` or `TagObjects` property.

`Tags` `TagObjects` are meant for information that is useful to log with the `Activity`. For information that's needed for runtime control, use the `Baggage` property.

## Activity.Dispose() method

```csharp
public void Dispose ();
```

Stops the activity if it is already started and notifies any event listeners. Nothing will happen otherwise.

To be added.

## Activity.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

When overriden by a derived type, this method releases any allocated resources.

Parameters:

- `disposing`: `false` if the method is being called from the finalizer; `true` if calling from user code.

To be added.

## Activity.EnumerateEvents() method

```csharp
public System.Diagnostics.Activity.Enumerator<System.Diagnostics.ActivityEvent> EnumerateEvents ();
```

Enumerates the `ActivityEvent` objects attached to this Activity object.

Returns: `Enumerator<T>`.

To be added.

## Activity.EnumerateLinks() method

```csharp
public System.Diagnostics.Activity.Enumerator<System.Diagnostics.ActivityLink> EnumerateLinks ();
```

Enumerates the `ActivityLink` objects attached to this Activity object.

Returns: `Enumerator<T>`.

To be added.

## Activity.EnumerateTagObjects() method

```csharp
public System.Diagnostics.Activity.Enumerator<System.Collections.Generic.KeyValuePair<string,object?>> EnumerateTagObjects ();
```

Enumerates the tags attached to this Activity object.

Returns: `Enumerator<T>`.

To be added.

## Activity.GetBaggageItem(String) method

```csharp
public string? GetBaggageItem (string key);
```

Returns the value of a key-value pair added to the activity with `Activity.AddBaggage`.

Parameters:

- `key`: The baggage key.

Returns: The value of the key-value-pair item if it exists, or `null` if it does not exist.

To be added.

## Activity.GetCustomProperty(String) method

```csharp
public object? GetCustomProperty (string propertyName);
```

Returns the object mapped to the specified property name.

Parameters:

- `propertyName`: The name associated to the object.

Returns: The object mapped to the property name, if one is found; otherwise, `null`.

To be added.

## Activity.GetTagItem(String) method

```csharp
public object? GetTagItem (string key);
```

Returns the value of the Activity tag mapped to the input key.
Returns `null` if that key does not exist.

Parameters:

- `key`: The tag key string.

Returns: The tag value mapped to the input key.

To be added.

## Activity.SetBaggage(String, String) method

```csharp
public System.Diagnostics.Activity SetBaggage (string key, string? value);
```

Add or update the Activity baggage with the input key and value.
If the input value is `null` - if the collection has any baggage with the same key, then this baggage will get removed from the collection.
- otherwise, nothing will happen and the collection will not change.
If the input value is not `null` - if the collection has any baggage with the same key, then the value mapped to this key will get updated with the new input value.
- otherwise, the key and value will get added as a new baggage to the collection.
Baggage item will be updated/removed only if it was originaly added to the current activity. Items inherited from the parents will not be changed/removed, new item would be added to current activity baggage instead.

Parameters:

- `key`: The baggage key name
- `value`: The baggage value mapped to the input key

Returns: `this` for convenient chaining.

To be added.

## Activity.SetCustomProperty(String, Object) method

```csharp
public void SetCustomProperty (string propertyName, object? propertyValue);
```

Attaches any custom object to this activity. If the specified `propertyName` was previously associated with another object, the property will be updated to be associated with the new `propertyValue` instead. It is recommended to use a unique property name to avoid conflicts with anyone using the same value.

Parameters:

- `propertyName`: The name to associate the value with.
- `propertyValue`: The object to attach and map to the property name.

To be added.

## Activity.SetEndTime(DateTime) method

```csharp
public System.Diagnostics.Activity SetEndTime (DateTime endTimeUtc);
```

Updates the `Activity` to set its `Activity.Duration` as the difference between `Activity.StartTimeUtc` and the specified stop time.

Parameters:

- `endTimeUtc`: The UTC stop time.

Returns: `this` for convenient chaining.

To be added.

## Activity.SetIdFormat(ActivityIdFormat) method

```csharp
public System.Diagnostics.Activity SetIdFormat (System.Diagnostics.ActivityIdFormat format);
```

Sets the ID format on this `Activity` before it is started.

Parameters:

- `format`: One of the enumeration values that specifies the format of the `Activity.Id` property.

Returns: `this` for convenient chaining.

#### Remarks

The specified format will take precedence over `Parent.IdFormat`, the `ParentId` format, `DefaultIdFormat`, and `ForceDefaultIdFormat`.

## Activity.SetParentId(String) method

```csharp
public System.Diagnostics.Activity SetParentId (string parentId);
```

Updates this `Activity` to indicate that the `Activity` with an ID of `parentId` caused this `Activity`.

Parameters:

- `parentId`: The ID of the parent operation.

Returns: `this` for convenient chaining.

#### Remarks

- This method should only be used in 'boundary' scenarios where an `Activity` from another process logically started this `Activity`. The `parentId` brings up the `Tags` (as well as the `ParentId` property) and can be used to reconstruct the causal tree.
- This method is only intended for use with Activities created from the Activity constructor. Activities created by calling `ActivitySource.CreateActivity` or `ActivitySource.StartActivity` already have the parent ID set, and invoking this method has no effect.
- This method should only be used before starting the `Activity` object. This method has no effect if you call it after the `Activity` object has started.

## Activity.SetParentId(ActivityTraceId, ActivitySpanId, ActivityTraceFlags) method

```csharp
public System.Diagnostics.Activity SetParentId (System.Diagnostics.ActivityTraceId traceId, System.Diagnostics.ActivitySpanId spanId, System.Diagnostics.ActivityTraceFlags activityTraceFlags = System.Diagnostics.ActivityTraceFlags.None);
```

Sets the parent ID using the W3C convention of a TraceId and a SpanId.

Parameters:

- `traceId`: The parent activity's TraceId.
- `spanId`: The parent activity's SpanId.
- `activityTraceFlags`: One of the enumeration values that specifies flags defined by the W3C standard that are associated with an activity.

Returns: `this` for convenient chaining.

#### Remarks

- This method has the advantage that no string manipulation is needed to set the ID.
- This method should only be used before starting the `Activity` object. This method has no effect if you call it after the `Activity` object has started.

## Activity.SetStartTime(DateTime) method

```csharp
public System.Diagnostics.Activity SetStartTime (DateTime startTimeUtc);
```

Sets the start time of this `Activity`.

Parameters:

- `startTimeUtc`: The `Activity` start time in UTC.

Returns: `this` for convenient chaining.

To be added.

## Activity.SetStatus(ActivityStatusCode, String) method

```csharp
public System.Diagnostics.Activity SetStatus (System.Diagnostics.ActivityStatusCode code, string? description = default);
```

Sets the status code and description on the current activity object.

Parameters:

- `code`: The status code
- `description`: The error status description

Returns: `this` for convenient chaining.

#### Remarks

When passing code value different than ActivityStatusCode.Error, the Activity.StatusDescription will reset to `null` value.
The description parameter will be respected only when passing ActivityStatusCode.Error value.

## Activity.SetTag(String, Object) method

```csharp
public System.Diagnostics.Activity SetTag (string key, object? value);
```

Adds or update the activity tag with the input key and value.

Parameters:

- `key`: The tag key name.
- `value`: The tag value mapped to the input key.

Returns: `this` for convenient chaining.

#### Remarks

- If the input value is `null`:

- If the collection has any tag with the same key, then this tag will get removed from the collection.
- Otherwise, nothing will happen and the collection will not change.

- If the input value is not `null`:

- If the collection has any tag with the same key, then the value mapped to this key will get updated with the new input value.
- Otherwise, the key and value will get added as a new tag to the collection.

## Activity.Start() method

```csharp
public System.Diagnostics.Activity Start ();
```

Starts the activity.

Returns: `this` for convenient chaining.

#### Remarks

Calling the `Start` method does the following:

- Sets `Parent` to hold `Current`.
- Sets `Current` to this `Activity`.
- If `StartTimeUtc` was not set previously, sets it to `UtcNow`.
- Generates a unique `Id` for this activity.

Use `DiagnosticSource.StartActivity` to start the `Activity` and write the start event.

## Activity.Stop() method

```csharp
public void Stop ();
```

Stops the activity.

#### Remarks

This information is NOT passed on to the children of this `Activity`.
Calling the `Stop` method:

- Sets `Current` to `Parent`.
- If the end time was not set previously, sets `Duration` as the difference between `UtcNow` and `StartTimeUtc`.

Call `DiagnosticSource.StopActivity` to stop the `Activity` and write the stop event.

## Activity.CurrentChanged event

```csharp
public static event EventHandler<System.Diagnostics.ActivityChangedEventArgs>? CurrentChanged;
```

Occurs when the `Activity.Current` value changes.

To be added.
