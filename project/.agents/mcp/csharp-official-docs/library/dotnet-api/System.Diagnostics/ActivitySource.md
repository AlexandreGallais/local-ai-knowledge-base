---
title: "ActivitySource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivitySource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivitySource class

Namespace: `System.Diagnostics`

```csharp
public sealed class ActivitySource : IDisposable
```

Provides APIs to create and start `Activity` objects and to register `ActivityListener` objects to listen to the `Activity` events.

To be added.

## ActivitySource.ActivitySource(ActivitySourceOptions) constructor

```csharp
public ActivitySource (System.Diagnostics.ActivitySourceOptions options);
```

Initializes a new instance of `ActivitySource` using the `ActivitySourceOptions`.

Parameters:

- `options`: The `ActivitySourceOptions` object to use for initializing the ActivitySource object.

To be added.

## ActivitySource.ActivitySource(String) constructor

```csharp
public ActivitySource (string name);
```

Initializes a new instance of `ActivitySource` with the specified input name.

Parameters:

- `name`: The name of the ActivitySource object

To be added.

## ActivitySource.ActivitySource(String, String) constructor

```csharp
public ActivitySource (string name, string? version = "");
```

Constructs an activity source object with the specified `name`.

Parameters:

- `name`: The name of the activity source object.
- `version`: The version of the component publishing the tracing info.

To be added.

## ActivitySource.ActivitySource(String, String, Object>>) constructor

```csharp
public ActivitySource (string name, string? version = "", System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default);
```

Initializes a new instance of `ActivitySource` with the specified input name.

Parameters:

- `name`: The name of the ActivitySource object.
- `version`: The version of the component publishing the tracing info.
- `tags`: The optional ActivitySource tags.

To be added.

## ActivitySource.Name property

```csharp
public string Name { get; }
```

Returns the activity source name.

Returns: A string that represents the activity source name.

To be added.

## ActivitySource.Scope property

```csharp
public object? Scope { get; }
```

To be added.

Returns: To be added.

To be added.

## ActivitySource.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? Tags { get; }
```

Gets the tags associated with the ActivitySource.

Returns: To be added.

To be added.

## ActivitySource.TelemetrySchemaUrl property

```csharp
public string? TelemetrySchemaUrl { get; }
```

Gets the telemetry schema URL associated with the ActivitySource.

Returns: To be added.

To be added.

## ActivitySource.Version property

```csharp
public string? Version { get; }
```

Returns the activity source version.

Returns: A string that represents the activity source version.

To be added.

## ActivitySource.AddActivityListener(ActivityListener) method

```csharp
public static void AddActivityListener (System.Diagnostics.ActivityListener listener);
```

Adds a listener to the activity starting and stopping events.

Parameters:

- `listener`: The activity listener object to use for listening to the activity events.

To be added.

## ActivitySource.CreateActivity(String, ActivityKind) method

```csharp
public System.Diagnostics.Activity? CreateActivity (string name, System.Diagnostics.ActivityKind kind);
```

Creates a new `Activity` object if there is any listener to the Activity, returns `null` otherwise.

Parameters:

- `name`: The operation name of the Activity
- `kind`: The `ActivityKind`

Returns: The created `Activity` object or `null` if there are no listeners.

#### Remarks

If the Activity object is created, it will not start automatically. Callers need to call `Start` to start it.

## ActivitySource.CreateActivity(String, ActivityKind, ActivityContext, Object>>, ActivityLink>, ActivityIdFormat) method

```csharp
public System.Diagnostics.Activity? CreateActivity (string name, System.Diagnostics.ActivityKind kind, System.Diagnostics.ActivityContext parentContext, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default, System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityLink>? links = default, System.Diagnostics.ActivityIdFormat idFormat = System.Diagnostics.ActivityIdFormat.Unknown);
```

Creates a new `Activity` object if there is any listener to the Activity, returns `null` otherwise.
If the Activity object is created, it will not automatically start. Callers will need to call `Activity.Start` to start it.

Parameters:

- `name`: The operation name of the Activity.
- `kind`: The `ActivityKind`
- `parentContext`: The parent `ActivityContext` object to initialize the created Activity object with.
- `tags`: The optional tags list to initialize the created Activity object with.
- `links`: The optional `ActivityLink` list to initialize the created Activity object with.
- `idFormat`: The default Id format to use.

Returns: The created `Activity` object or `null` if there are no listeners.

#### Remarks

If the Activity object is created, it will not start automatically. Callers need to call `Start` to start it.

## ActivitySource.CreateActivity(String, ActivityKind, String, Object>>, ActivityLink>, ActivityIdFormat) method

```csharp
public System.Diagnostics.Activity? CreateActivity (string name, System.Diagnostics.ActivityKind kind, string? parentId, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default, System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityLink>? links = default, System.Diagnostics.ActivityIdFormat idFormat = System.Diagnostics.ActivityIdFormat.Unknown);
```

Creates a new `Activity` object if there is any listener to the Activity, returns `null` otherwise.

Parameters:

- `name`: The operation name of the Activity.
- `kind`: The `ActivityKind`
- `parentId`: The parent Id to initialize the created Activity object with.
- `tags`: The optional tags list to initialize the created Activity object with.
- `links`: The optional `ActivityLink` list to initialize the created Activity object with.
- `idFormat`: The default Id format to use.

Returns: The created `Activity` object or `null` if there are no listeners.

#### Remarks

If the Activity object is created, it will not start automatically. Callers need to call `Start` to start it.

## ActivitySource.Dispose() method

```csharp
public void Dispose ();
```

Disposes the activity source object, removes the current instance from the global list, and empties the listeners list.

To be added.

## ActivitySource.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## ActivitySource.HasListeners() method

```csharp
public bool HasListeners ();
```

Checks if there are any listeners for this activity source.

Returns: `true` if there is a listener registered for this activity source; otherwise, `false`.

To be added.

## ActivitySource.StartActivity(String, ActivityKind) method

```csharp
public System.Diagnostics.Activity? StartActivity (string name = "", System.Diagnostics.ActivityKind kind = System.Diagnostics.ActivityKind.Internal);
```

Creates and starts a new activity if there are active listeners for it, using the specified name and activity kind.

Parameters:

- `name`: The operation name of the activity.
- `kind`: The activity kind.

Returns: The created activity object, if it had active listeners, or `null` if it has no event listeners.

To be added.

## ActivitySource.StartActivity(ActivityKind, ActivityContext, Object>>, ActivityLink>, DateTimeOffset, String) method

```csharp
public System.Diagnostics.Activity? StartActivity (System.Diagnostics.ActivityKind kind, System.Diagnostics.ActivityContext parentContext = default, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default, System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityLink>? links = default, DateTimeOffset startTime = default, string name = "");
```

Creates and starts a new `Activity` object if there is any listener to the Activity events, returns `null` otherwise.

Parameters:

- `kind`: The `ActivityKind`
- `parentContext`: The parent `ActivityContext` object to initialize the created Activity object with.
- `tags`: The optional tags list to initialize the created Activity object with.
- `links`: The optional `ActivityLink` list to initialize the created Activity object with.
- `startTime`: The optional start timestamp to set on the created Activity object.
- `name`: The operation name of the Activity.

Returns: The created `Activity` object or `null` if there are no listeners.

To be added.

## ActivitySource.StartActivity(String, ActivityKind, ActivityContext, Object>>, ActivityLink>, DateTimeOffset) method

```csharp
public System.Diagnostics.Activity? StartActivity (string name, System.Diagnostics.ActivityKind kind, System.Diagnostics.ActivityContext parentContext, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default, System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityLink>? links = default, DateTimeOffset startTime = default);
```

Creates and starts a new activity if there are active listeners for it, using the specified name, activity kind, parent activity context, tags, optional activity link and optional start time.

Parameters:

- `name`: The operation name of the activity.
- `kind`: The activity kind.
- `parentContext`: The parent `ActivityContext` object to initialize the created activity object with.
- `tags`: The optional tags list to initialize the created activity object with.
- `links`: The optional `ActivityLink` list to initialize the created activity object with.
- `startTime`: The optional start timestamp to set on the created activity object.

Returns: The created activity object, if it had active listeners, or `null` if it has no event listeners.

To be added.

## ActivitySource.StartActivity(String, ActivityKind, String, Object>>, ActivityLink>, DateTimeOffset) method

```csharp
public System.Diagnostics.Activity? StartActivity (string name, System.Diagnostics.ActivityKind kind, string? parentId, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags = default, System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityLink>? links = default, DateTimeOffset startTime = default);
```

Creates and starts a new activity if there are active listeners for it, using the specified name, activity kind, parent Id, tags, optional activity links and optional start time.

Parameters:

- `name`: The operation name of the activity.
- `kind`: The activity kind.
- `parentId`: The parent Id to initialize the created activity object with.
- `tags`: The optional tags list to initialize the created activity object with.
- `links`: The optional `ActivityLink` list to initialize the created activity object with.
- `startTime`: The optional start timestamp to set on the created activity object.

Returns: The created activity object, if it had active listeners, or `null` if it has no event listeners.

To be added.
