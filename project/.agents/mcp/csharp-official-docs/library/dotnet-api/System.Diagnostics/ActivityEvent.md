---
title: "ActivityEvent struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityEvent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityEvent struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct ActivityEvent
```

Represents an event containing a name and a timestamp, as well as an optional list of tags.

To be added.

## ActivityEvent.ActivityEvent(String) constructor

```csharp
public ActivityEvent (string name);
```

Initializes a new activity event instance using the specified name and the current time as the event timestamp.

Parameters:

- `name`: The event name.

To be added.

## ActivityEvent.ActivityEvent(String, DateTimeOffset, ActivityTagsCollection) constructor

```csharp
public ActivityEvent (string name, DateTimeOffset timestamp = default, System.Diagnostics.ActivityTagsCollection? tags = default);
```

Initializes a new activity event instance using the specified name, timestamp and tags.

Parameters:

- `name`: The event name.
- `timestamp`: The event timestamp. Timestamp must only be used for the events that happened in the past, not at the moment of this call.
- `tags`: The event tags.

To be added.

## ActivityEvent.Name property

```csharp
public string Name { get; }
```

Gets the activity event name.

Returns: A string representing the activity event name.

To be added.

## ActivityEvent.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> Tags { get; }
```

Gets the collection of tags associated with the event.

Returns: A key-value pair enumeration containing the tags associated with the event.

To be added.

## ActivityEvent.Timestamp property

```csharp
public DateTimeOffset Timestamp { get; }
```

Gets the activity event timestamp.

Returns: A datetime offset representing the activity event timestamp.

To be added.

## ActivityEvent.EnumerateTagObjects() method

```csharp
public System.Diagnostics.Activity.Enumerator<System.Collections.Generic.KeyValuePair<string,object?>> EnumerateTagObjects ();
```

Enumerate the tags attached to this `ActivityEvent` object.

Returns: `Enumerator<T>`.

To be added.
