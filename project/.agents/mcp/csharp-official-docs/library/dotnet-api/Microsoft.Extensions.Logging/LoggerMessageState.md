---
title: "LoggerMessageState class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerMessageState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerMessageState class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public sealed class LoggerMessageState : Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector, Microsoft.Extensions.Logging.ITagCollector, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<string,object>>, System.Collections.Generic.IReadOnlyList<System.Collections.Generic.KeyValuePair<string,object>>
```

Additional state to use with `ILogger.Log<T>`.

To be added.

## LoggerMessageState.LoggerMessageState() constructor

```csharp
public LoggerMessageState ();
```

To be added.

To be added.

## LoggerMessageState.ClassifiedTagArray property

```csharp
public Microsoft.Extensions.Logging.LoggerMessageState.ClassifiedTag[] ClassifiedTagArray { get; }
```

Gets the array of classified tags.

Returns: To be added.

To be added.

## LoggerMessageState.ClassifiedTagsCount property

```csharp
public int ClassifiedTagsCount { get; }
```

Gets the number of classified tags currently in this instance.

Returns: To be added.

To be added.

## LoggerMessageState.Item property

```csharp
public System.Collections.Generic.KeyValuePair<string,object?> this[int index] { get; }
```

To be added.

Parameters:

- `index`: To be added.

Returns: To be added.

To be added.

## LoggerMessageState.RedactedTagArray property

```csharp
public System.Collections.Generic.KeyValuePair<string,object>[] RedactedTagArray { get; }
```

Gets the array of tags.

Returns: To be added.

To be added.

## LoggerMessageState.System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Count property

```csharp
int System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.Count { get; }
```

To be added.

Returns: To be added.

To be added.

## LoggerMessageState.TagArray property

```csharp
public System.Collections.Generic.KeyValuePair<string,object>[] TagArray { get; }
```

Gets the array of tags.

Returns: To be added.

To be added.

## LoggerMessageState.TagNamePrefix property

```csharp
public string TagNamePrefix { get; set; }
```

Gets or sets the parameter name that is prepended to all tag names added to this instance using the
`ITagCollector.Add` or `ITagCollector.Add`
methods.

Returns: To be added.

To be added.

## LoggerMessageState.TagsCount property

```csharp
public int TagsCount { get; }
```

Gets the number of unclassified tags currently in this instance.

Returns: To be added.

To be added.

## LoggerMessageState.AddClassifiedTag(String, Object, DataClassificationSet) method

```csharp
public void AddClassifiedTag (string name, object? value, Microsoft.Extensions.Compliance.Classification.DataClassificationSet classifications);
```

Adds a classified tag to the array.

Parameters:

- `name`: The name of the tag.
- `value`: The value.
- `classifications`: The data classification of the tag.

To be added.

## LoggerMessageState.AddTag(String, Object) method

```csharp
public void AddTag (string name, object? value);
```

Adds a tag to the array.

Parameters:

- `name`: The name of the tag.
- `value`: The value.

To be added.

## LoggerMessageState.Clear() method

```csharp
public void Clear ();
```

Resets the state of this object to its initial condition.

To be added.

## LoggerMessageState.Microsoft.Extensions.Diagnostics.Enrichment.IEnrichmentTagCollector.Add(String, Object) method

```csharp
void IEnrichmentTagCollector.Add (string key, object value);
```

To be added.

Parameters:

- `key`: To be added.
- `value`: To be added.

To be added.

## LoggerMessageState.Microsoft.Extensions.Logging.ITagCollector.Add(String, Object) method

```csharp
void ITagCollector.Add (string tagName, object? tagValue);
```

To be added.

Parameters:

- `tagName`: To be added.
- `tagValue`: To be added.

To be added.

## LoggerMessageState.Microsoft.Extensions.Logging.ITagCollector.Add(String, Object, DataClassificationSet) method

```csharp
void ITagCollector.Add (string tagName, object? tagValue, Microsoft.Extensions.Compliance.Classification.DataClassificationSet classifications);
```

To be added.

Parameters:

- `tagName`: To be added.
- `tagValue`: To be added.
- `classifications`: To be added.

To be added.

## LoggerMessageState.ReserveClassifiedTagSpace(Int32) method

```csharp
public int ReserveClassifiedTagSpace (int count);
```

Allocates some room to put some tags.

Parameters:

- `count`: The amount of space to allocate.

Returns: The index in the `LoggerMessageState.ClassifiedTagArray` where to store the classified tags.

To be added.

## LoggerMessageState.ReserveTagSpace(Int32) method

```csharp
public int ReserveTagSpace (int count);
```

Allocates some room to put some tags.

Parameters:

- `count`: The amount of space to allocate.

Returns: The index in the `LoggerMessageState.TagArray` where to store the tags.

To be added.

## LoggerMessageState.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<System.String,System.Object>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,object?>> IEnumerable<KeyValuePair<string,object>>.GetEnumerator ();
```

To be added.

Returns: To be added.

To be added.

## LoggerMessageState.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

To be added.

Returns: To be added.

To be added.

## LoggerMessageState.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of this object.

Returns: The string representation of this object.

To be added.
