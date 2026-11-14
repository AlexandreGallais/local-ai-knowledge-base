---
title: "ActivityLink struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ActivityLink.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityLink struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct ActivityLink : IEquatable<System.Diagnostics.ActivityLink>
```

Activities may be linked to zero or more activity context instances that are causally related.

Activity links can point to activity contexts inside a single trace or across different traces.

Activity links can be used to represent batched operations where an activity was initiated by multiple initiating activities, each representing a single incoming item being processed in the batch.

To be added.

## ActivityLink.ActivityLink(ActivityContext, ActivityTagsCollection) constructor

```csharp
public ActivityLink (System.Diagnostics.ActivityContext context, System.Diagnostics.ActivityTagsCollection? tags = default);
```

Constructs a new activity link, which can be linked to an activity.

Parameters:

- `context`: The trace activity context.
- `tags`: The key-value pair list of tags associated to the activity context.

To be added.

## ActivityLink.Context property

```csharp
public System.Diagnostics.ActivityContext Context { get; }
```

Retrieves the activity context inside this activity link.

Returns: To be added.

To be added.

## ActivityLink.Tags property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? Tags { get; }
```

Retrieves the key-value pair enumeration of tags attached to the activity context.

Returns: An enumeration of tags attached to the activity context.

To be added.

## ActivityLink.EnumerateTagObjects() method

```csharp
public System.Diagnostics.Activity.Enumerator<System.Collections.Generic.KeyValuePair<string,object?>> EnumerateTagObjects ();
```

Enumerate the tags attached to this `ActivityLink` object.

Returns: `Enumerator<T>`.

To be added.

## ActivityLink.Equals(ActivityLink) method

```csharp
public bool Equals (System.Diagnostics.ActivityLink value);
```

Indicates whether the current activity link is equal to another activity link.

Parameters:

- `value`: The activity link to compare.

Returns: `true` if the current activity link is equal to `value`; otherwise, `false`.

## Remarks

`ActivityLink` equality is currently undefined. The current behavior is that two `ActivityLink` instances with the same `ActivityContext` and no tags return `true` for `Equals`. `Equals` returns `false` when tags are used. This might change in the future. Exercise caution when calling this method.

## ActivityLink.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether the current activity link is equal to another object.

Parameters:

- `obj`: The object to compare.

Returns: `true` if the current activity link is equal to `obj`; otherwise, `false`.

`ActivityLink` equality is currently undefined. The current behavior is that two `ActivityLink` instances with the same `ActivityContext` and no tags return `true` for `Equals`. `Equals` always returns `false` when tags are used.

## ActivityLink.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Provides a hash function for the current `ActivityLink` that's suitable for hashing algorithms and data structures, such as hash tables.

Returns: A hash code for the current `ActivityLink`.

To be added.

## ActivityLink.op_Equality(ActivityLink, ActivityLink) method

```csharp
public static bool operator == (System.Diagnostics.ActivityLink left, System.Diagnostics.ActivityLink right);
```

Determines whether two specified `ActivityLink` values are equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

To be added.

## ActivityLink.op_Inequality(ActivityLink, ActivityLink) method

```csharp
public static bool operator != (System.Diagnostics.ActivityLink left, System.Diagnostics.ActivityLink right);
```

Determines whether two specified `ActivityLink` values are not equal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

To be added.
