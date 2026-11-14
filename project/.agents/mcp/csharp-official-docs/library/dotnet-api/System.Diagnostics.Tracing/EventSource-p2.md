---
title: "EventSource class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSource class (part 2 of 5)

## EventSource.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `EventSource` class.

#### Remarks
Call `Dispose` when you are finished using the `EventSource`. The `Dispose` method leaves the `EventSource` in an unusable state. After calling `Dispose`, you must release all references to the `EventSource` so the garbage collector can reclaim the memory that the `EventSource` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `EventSource`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `EventSource` object's `Finalize` method.

## EventSource.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `EventSource` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `EventSource` references. This method invokes the `Dispose()` method of each referenced object.

## EventSource.Finalize() method

```csharp
~EventSource ();
```

Allows the `EventSource` object to attempt to free resources and perform other cleanup operations before the object is reclaimed by garbage collection.

To be added.

## EventSource.GenerateManifest(Type, String) method

```csharp
public static string? GenerateManifest (Type eventSourceType, string? assemblyPathToIncludeInManifest);
```

Returns a string of the XML manifest that is associated with the current event source.

Parameters:

- `eventSourceType`: The type of the event source.
- `assemblyPathToIncludeInManifest`: The path to the assembly file (.dll) to include in the provider element of the manifest.

Returns: The XML data string.

#### Remarks
The information about the XML schema for the event manifest, see Event Manifest Schema.

## EventSource.GenerateManifest(Type, String, EventManifestOptions) method

```csharp
public static string? GenerateManifest (Type eventSourceType, string? assemblyPathToIncludeInManifest, System.Diagnostics.Tracing.EventManifestOptions flags);
```

Returns a string of the XML manifest that is associated with the current event source.

Parameters:

- `eventSourceType`: The type of the event source.
- `assemblyPathToIncludeInManifest`: The path to the assembly file (.dll) file to include in the provider element of the manifest.
- `flags`: A bitwise combination of the enumeration values that specify how the manifest is generated.

Returns: The XML data string or `null`.

#### Remarks
If `flags` specifies `OnlyIfNeededForRegistration` and the `eventSourceType` specified does not require explicit registration, `EventSource.GenerateManifest` returns `null`.

## EventSource.GetGuid(Type) method

```csharp
public static Guid GetGuid (Type eventSourceType);
```

Gets the unique identifier for this implementation of the event source.

Parameters:

- `eventSourceType`: The type of the event source.

Returns: A unique identifier for this event source type.

<format type="text/markdown">
## Remarks
If the name of the `EventSource` that was passed to the constructor isn't specified as an `EventSourceAttribute`, this method can return a different GUID to the one returned by the `Guid` property.

In such cases, the GUID that is used to register the `EventSource` is the one returned by `Guid` property.
]</format>

## EventSource.GetName(Type) method

```csharp
public static string GetName (Type eventSourceType);
```

Gets the friendly name of the event source.

Parameters:

- `eventSourceType`: The type of the event source.

Returns: The friendly name of the event source. The default is the simple name of the class.

To be added.

## EventSource.GetSources() method

```csharp
public static System.Collections.Generic.IEnumerable<System.Diagnostics.Tracing.EventSource> GetSources ();
```

Gets a snapshot of all the event sources for the application domain.

Returns: An enumeration of all the event sources in the application domain.

To be added.

## EventSource.GetTrait(String) method

```csharp
public string? GetTrait (string key);
```

Gets the trait value associated with the specified key.

Parameters:

- `key`: The key of the trait to get.

Returns: The trait value associated with the specified key. If the key is not found, returns `null`.

#### Remarks
Traits provide additional information for an event and are interpreted by an event listener. Traits are specified as key-value pairs when the event source is constructed.

## EventSource.IsEnabled() method

```csharp
public bool IsEnabled ();
```

Determines whether the current event source is enabled.

Returns: `true` if the current event source is enabled; otherwise, `false`.

To be added.

## EventSource.IsEnabled(EventLevel, EventKeywords) method

```csharp
public bool IsEnabled (System.Diagnostics.Tracing.EventLevel level, System.Diagnostics.Tracing.EventKeywords keywords);
```

Determines whether the current event source that has the specified level and keyword is enabled.

Parameters:

- `level`: The level of the event source.
- `keywords`: The keyword of the event source.

Returns: `true` if the event source is enabled; otherwise, `false`.

#### Remarks
The result of this method is only an approximation of whether a particular event is active. Use it to avoid expensive computation for logging when logging is disabled. Event sources may have additional filtering that determines their activity.

## EventSource.IsEnabled(EventLevel, EventKeywords, EventChannel) method

```csharp
public bool IsEnabled (System.Diagnostics.Tracing.EventLevel level, System.Diagnostics.Tracing.EventKeywords keywords, System.Diagnostics.Tracing.EventChannel channel);
```

Determines whether the current event source is enabled for events with the specified level, keywords and channel.

Parameters:

- `level`: The event level to check. An event source will be considered enabled when its level is greater than or equal to `level`.
- `keywords`: The event keywords to check.
- `channel`: The event channel to check.

Returns: `true` if the event source is enabled for the specified event level, keywords and channel; otherwise, `false`.

The result of this method is only an approximation of whether a particular event is active. Use it to avoid expensive computation for logging when logging is disabled. Event sources may have additional filtering that determines their activity.

#### Remarks
If the

## EventSource.OnEventCommand(EventCommandEventArgs) method

```csharp
protected virtual void OnEventCommand (System.Diagnostics.Tracing.EventCommandEventArgs command);
```

Called when the current event source is updated by the controller.

Parameters:

- `command`: The arguments for the event.

To be added.

## EventSource.SendCommand(EventSource, EventCommand, String>) method

```csharp
public static void SendCommand (System.Diagnostics.Tracing.EventSource eventSource, System.Diagnostics.Tracing.EventCommand command, System.Collections.Generic.IDictionary<string,string?>? commandArguments);
```

Sends a command to a specified event source.

Parameters:

- `eventSource`: The event source to send the command to.
- `command`: The event command to send.
- `commandArguments`: The arguments for the event command.

#### Remarks
Calling `EventSource.SendCommand` forwards the command to the `EventSource.OnEventCommand` callback. What the `EventSource` does with the command and its arguments is specific to the event source. The command and command arguments are passed to the `EventSource.OnEventCommand` callback of the specified event source. If possible, the current event source should not affect other event listeners' filtering events; however, that may not be possible if the command causes a garbage collection, a system flush, or some other global activity.

## EventSource.SetCurrentThreadActivityId(Guid) method

```csharp
public static void SetCurrentThreadActivityId (Guid activityId);
```

Sets the activity ID on the current thread.

Parameters:

- `activityId`: The current thread's new activity ID, or `Guid.Empty` to indicate that work on the current thread is not associated with any activity.

#### Remarks
Calling the `EventSource.SetCurrentThreadActivityId` method sets the activity ID on a per-thread basis. All events on the thread will have that activity ID until a new activity is started on the same thread.

This method is called only by libraries that manage their own threads.

## EventSource.SetCurrentThreadActivityId(Guid, Guid) method

```csharp
public static void SetCurrentThreadActivityId (Guid activityId, out Guid oldActivityThatWillContinue);
```

Sets the activity ID on the current thread, and returns the previous activity ID.

Parameters:

- `activityId`: The current thread's new activity ID, or `Guid.Empty` to indicate that work on the current thread is not associated with any activity.
- `oldActivityThatWillContinue`: When this method returns, contains the previous activity ID on the current thread.

#### Remarks
You can call the `SetCurrentThreadActivityId` method to temporarily overwrite the current thread's activity ID with a new activity ID. You must then restore the previous activity ID by passing the `oldActivityThatWillContinue` argument to the `SetCurrentThreadActivityId` method.

## EventSource.ToString() method

```csharp
public override string ToString ();
```

Obtains a string representation of the current event source instance.

Returns: The name and unique identifier that identify the current event source.

To be added.

## EventSource.Write(String) method

```csharp
public void Write (string? eventName);
```

Writes an event without fields, but with the specified name and default options.

Parameters:

- `eventName`: The name of the event to write.

Exceptions:

- `ArgumentNullException`: `eventName` is `null`.

To be added.

## EventSource.Write(String, EventSourceOptions) method

```csharp
public void Write (string? eventName, System.Diagnostics.Tracing.EventSourceOptions options);
```

Writes an event without fields, but with the specified name and options.

Parameters:

- `eventName`: The name of the event to write.
- `options`: The options such as level, keywords and operation code for the event.

Exceptions:

- `ArgumentNullException`: `eventName` is `null`.

To be added.

## EventSource.Write<T>(String, T) method

```csharp
public void Write<T> (string? eventName, T data);
```

Writes an event with the specified name and data.

Parameters:

- `T`: The type that defines the event and its associated data. This type must be an anonymous type or marked with the `EventSourceAttribute` attribute.
- `eventName`: The name of the event.
- `data`: The event data. This type must be an anonymous type or marked with the `EventDataAttribute` attribute.

#### Remarks
If `eventName` is `null`, the event name is automatically derived from the type T's event data (`EventDataAttribute.Name`) or determined based on the name of type `T`. The public instance properties of `data` will be written recursively to create the event fields.

## EventSource.Write<T>(String, EventSourceOptions, T) method

```csharp
public void Write<T> (string? eventName, System.Diagnostics.Tracing.EventSourceOptions options, T data);
```

Writes an event with the specified name, event data and options.

Parameters:

- `T`: The type that defines the event and its associated data. This type must be an anonymous type or marked with the `EventSourceAttribute` attribute.
- `eventName`: The name of the event.
- `options`: The event options.
- `data`: The event data. This type must be an anonymous type or marked with the `EventDataAttribute` attribute.

#### Remarks
If `eventName` is `null`, the event name is automatically derived from the type T's event data (`EventDataAttribute.Name`) or determined based on the name of type `T`. The public instance properties of `data` will be written recursively to create the event fields.

## EventSource.Write<T>(String, EventSourceOptions, T) method

```csharp
public void Write<T> (string? eventName, ref System.Diagnostics.Tracing.EventSourceOptions options, ref T data);
```

Writes an event with the specified name, options and event data.

Parameters:

- `T`: The type that defines the event and its associated data. This type must be an anonymous type or marked with the `EventSourceAttribute` attribute.
- `eventName`: The name of the event.
- `options`: The event options.
- `data`: The event data. This type must be an anonymous type or marked with the `EventDataAttribute` attribute.

#### Remarks
If `eventName` is `null`, the event name is automatically derived from the type T's event data (`EventDataAttribute.Name`) or determined based on the name of type `T`. The public instance properties of `data` will be written recursively to create the event fields.

## EventSource.Write<T>(String, EventSourceOptions, Guid, Guid, T) method

```csharp
public void Write<T> (string? eventName, ref System.Diagnostics.Tracing.EventSourceOptions options, ref Guid activityId, ref Guid relatedActivityId, ref T data);
```

Writes an event with the specified name, options, related activity and event data.

Parameters:

- `T`: The type that defines the event and its associated data. This type must be an anonymous type or marked with the `EventSourceAttribute` attribute.
- `eventName`: The name of the event.
- `options`: The event options.
- `activityId`: The ID of the activity associated with the event.
- `relatedActivityId`: The ID of an associated activity, or `Guid.Empty` if there is no associated activity.
- `data`: The event data. This type must be an anonymous type or marked with the `EventDataAttribute` attribute.

#### Remarks
If `eventName` is `null`, the event name is automatically derived from the type T's event data (`EventDataAttribute.Name`) or determined based on the name of type `T`. The public instance properties of `data` will be written recursively to create the event fields.
