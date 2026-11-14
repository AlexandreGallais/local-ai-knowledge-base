---
title: "ActivityCreationOptions<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityCreationOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityCreationOptions<T> struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct ActivityCreationOptions<T>
```

Encapsulates all the information that is sent to the activity listener, to make decisions about the creation of the activity instance, as well as its state.

The possible generic type parameters are `ActivityContext` or `String`.

Parameters:

- `T`: The type of the `Parent` property. Should be either `String` or `ActivityContext`.

To be added.

## ActivityCreationOptions<T>.Kind property

```csharp
public System.Diagnostics.ActivityKind Kind { get; }
```

Gets the activity kind that the activity will be created with.

Returns: One of the enumeration values that represent an activity kind.

To be added.

## ActivityCreationOptions<T>.Links property

```csharp
public System.Collections.Generic.IEnumerable<System.Diagnostics.ActivityLink>? Links { get; }
```

Gets the enumeration of activity links that the activity will be created with.

Returns: An enumeration of activity links.

To be added.

## ActivityCreationOptions<T>.Name property

```csharp
public string Name { get; }
```

Gets the name to use as OperationName of the activity that will get created.

Returns: A string representing the activity name.

To be added.

## ActivityCreationOptions<T>.Parent property

```csharp
public T Parent { get; }
```

Gets the parent context or parent Id that the activity will get created with.

Returns: The parent of the activity, represented either as a `String` or as an `ActivityContext`.

To be added.

## ActivityCreationOptions<T>.SamplingTags property

```csharp
public System.Diagnostics.ActivityTagsCollection SamplingTags { get; }
```

Gets the collection that is used to add more tags during the sampling process. The added tags are also added to the created Activity if it is decided that it should be created by the `ActivityListener` callbacks.

Returns: The Activity tags collection.

To be added.

## ActivityCreationOptions<T>.Source property

```csharp
public System.Diagnostics.ActivitySource Source { get; }
```

Gets the activity source that creates the activity.

Returns: An activity source object.

To be added.

## ActivityCreationOptions<T>.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? Tags { get; }
```

Gets the tags that the activity will be created with.

Returns: A key-value pair enumeration of tags associated with the activity.

To be added.

## ActivityCreationOptions<T>.TraceId property

```csharp
public System.Diagnostics.ActivityTraceId TraceId { get; }
```

Gets the trace Id to use in the Activity object if it is decided that it should be created by `ActivityListener` callbacks.

Returns: The trace Id.

If the parent is an `ActivityContext` and not equal to the `default` value, then the trace Id inside the parent will be the value returned from this property. If it is equal to the `default` value, a new trace Id will get generated and returned from this property.

## ActivityCreationOptions<T>.TraceState property

```csharp
public string? TraceState { get; init; }
```

Gets or initializes the trace state to use when creating the Activity.

Returns: To be added.

To be added.
