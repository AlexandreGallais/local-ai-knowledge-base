---
title: "JsonSerializerOptions class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializerOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializerOptions class

Namespace: `System.Text.Json`

```csharp
public sealed class JsonSerializerOptions
```

Provides options to be used with `JsonSerializer`.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonSerializerOptions.JsonSerializerOptions() constructor

```csharp
public JsonSerializerOptions ();
```

Initializes a new instance of the `JsonSerializerOptions` class.

To be added.

## JsonSerializerOptions.JsonSerializerOptions(JsonSerializerDefaults) constructor

```csharp
public JsonSerializerOptions (System.Text.Json.JsonSerializerDefaults defaults);
```

Constructs a new `JsonSerializerOptions` instance with a predefined set of options determined by the specified `JsonSerializerDefaults`.

Parameters:

- `defaults`: The `JsonSerializerDefaults` to reason about.

To be added.

## JsonSerializerOptions.JsonSerializerOptions(JsonSerializerOptions) constructor

```csharp
public JsonSerializerOptions (System.Text.Json.JsonSerializerOptions options);
```

Copies the options from a `JsonSerializerOptions` instance to a new instance.

Parameters:

- `options`: The options instance to copy options from.

Exceptions:

- `ArgumentNullException`: `options` is `null`.

To be added.

## JsonSerializerOptions.AllowDuplicateProperties property

```csharp
public bool AllowDuplicateProperties { get; set; }
```

Gets or sets a value that indicates whether duplicate property names are allowed when deserializing JSON objects.

Returns: `true` if duplicate property names are allowed when deserializing JSON objects. The default is `true`.

Exceptions:

- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

If set to `false`, `JsonException` is thrown when a duplicate property name is encountered during deserialization.

Duplicate property names are not allowed in serialization.

## JsonSerializerOptions.AllowOutOfOrderMetadataProperties property

```csharp
public bool AllowOutOfOrderMetadataProperties { get; set; }
```

Gets or sets a value that indicates whether JSON metadata properties can be specified after regular properties in a deserialized JSON object.

Returns: `true` if JSON metadata properties, such as \\$id and \\$type, aren't required to be specified at the very start of the deserialized JSON object; `false` if JSON metadata properties must be specified before regular properties.

Exceptions:

- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

#### Remarks

By default, `System.Text.Json` requires that JSON metadata properties such as `$id`, `$type`, and `$ref` appear at the very start of a JSON object. Setting this property to `true` relaxes that requirement, allowing metadata to appear after regular properties. This is useful when consuming JSON from producers that don't guarantee metadata ordering.

However, there are performance implications when this property is enabled:

- **Buffering**: When this property is enabled, the deserializer can no longer process object properties in a single forward pass. Because metadata properties appearing later in the object (for example, a `$type` discriminator) can change how all earlier properties should be interpreted, the deserializer must buffer the entire JSON object in memory before it can commit to a deserialization strategy. In streaming deserialization scenarios, this can significantly increase memory consumption, especially for large JSON payloads.
- **Backtracking**: With nested objects, the cost of out-of-order metadata is multiplicative. The deserializer might need to backtrack (that is, reread and reprocess previously buffered data) once for each level of nesting depth in the incoming object graph. This means the worst-case deserialization time is **O(n × d)**, where *n* is the length of the JSON input and *d* is the depth of the object graph.

## JsonSerializerOptions.AllowTrailingCommas property

```csharp
public bool AllowTrailingCommas { get; set; }
```

Get or sets a value that indicates whether an extra comma at the end of a list of JSON values in an object or array is allowed (and ignored) within the JSON payload being deserialized.

Returns: `true` if an extra comma at the end of a list of JSON values in an object or array is allowed (and ignored); `false` otherwise.

Exceptions:

- `InvalidOperationException`: This property was set after serialization or deserialization has occurred.

#### Remarks

By default, `AllowTrailingCommas` is set to `false`, and a `JsonException` is thrown during deserialization if a trailing comma is encountered.

For more information, see How to allow some kinds of invalid JSON with System.Text.Json.

## JsonSerializerOptions.Converters property

```csharp
public System.Collections.Generic.IList<System.Text.Json.Serialization.JsonConverter> Converters { get; }
```

Gets the list of user-defined converters that were registered.

Returns: The list of custom converters.

#### Remarks

Once serialization or deserialization occurs, the list cannot be modified.

For more information, see How to write custom converters.

## JsonSerializerOptions.Default property

```csharp
public static System.Text.Json.JsonSerializerOptions Default { get; }
```

Gets a read-only, singleton instance of `JsonSerializerOptions` that uses the default configuration.

Returns: To be added.

#### Remarks

Each `JsonSerializerOptions` instance encapsulates its own serialization metadata caches,
so using fresh default instances every time one is needed can result in redundant recomputation of converters.
This property provides a shared instance that can be consumed by any number of components without necessitating any converter recomputation.

## JsonSerializerOptions.DefaultBufferSize property

```csharp
public int DefaultBufferSize { get; set; }
```

Gets or sets the default buffer size, in bytes, to use when creating temporary buffers.

Returns: The default buffer size in bytes.

Exceptions:

- `ArgumentException`: The buffer size is less than 1.
- `InvalidOperationException`: This property was set after serialization or deserialization has occurred.

#### Remarks

The default buffer size, in bytes, is 16,384.
For most workloads, the default size is a reasonable amount of JSON to buffer while reading from a stream or writing to a stream.
That is, it performs well without creating objects on the Large Object Heap for the Garbage Collector (GC) to track.
In non-streaming scenarios, increasing the default buffer size could improve performance for large JSON strings or UTF-8 byte arrays.
We recommend that you leave this value unchanged unless changing it makes an observable difference in performance.

## JsonSerializerOptions.DefaultIgnoreCondition property

```csharp
public System.Text.Json.Serialization.JsonIgnoreCondition DefaultIgnoreCondition { get; set; }
```

Gets or sets a value that determines when properties with default values are ignored during serialization or deserialization.
The default value is `JsonIgnoreCondition.Never`.

Returns: To be added.

Exceptions:

- `ArgumentException`: This property is set to `JsonIgnoreCondition.Always`.
- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

-or-

`JsonSerializerOptions.IgnoreNullValues` has been set to `true`. These properties cannot be used together.

To be added.

## JsonSerializerOptions.DictionaryKeyPolicy property

```csharp
public System.Text.Json.JsonNamingPolicy? DictionaryKeyPolicy { get; set; }
```

Gets or sets the policy used to convert a `IDictionary` key's name to another format, such as camel-casing.

Returns: The policy used to convert a `IDictionary` key's name to another format.

#### Remarks

The naming policy is not used when deserializing.

For more information, see Use a naming policy for dictionary keys.

## JsonSerializerOptions.Encoder property

```csharp
public System.Text.Encodings.Web.JavaScriptEncoder? Encoder { get; set; }
```

Gets or sets the encoder to use when escaping strings, or `null` to use the default encoder.

Returns: The JavaScript character encoding.

#### Remarks

For more information, see How to customize character encoding with System.Text.Json.

## JsonSerializerOptions.IgnoreNullValues property

```csharp
public bool IgnoreNullValues { get; set; }
```

Gets or sets a value that indicates whether `null` values are ignored during serialization and deserialization. The default value is `false`.

Returns: `true` if null values are ignored during serialization and deserialization; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This property was set after serialization or deserialization has occurred.

-or-

`JsonSerializerOptions.DefaultIgnoreCondition` has been set to a non-default value. These properties cannot be used together.

To be added.

## JsonSerializerOptions.IgnoreReadOnlyFields property

```csharp
public bool IgnoreReadOnlyFields { get; set; }
```

Gets or sets a value that indicates whether read-only fields are ignored during serialization. A field is read-only if it is marked with the `readonly` keyword. The default value is `false`.

Returns: `true` if read-only fields are ignored during serialization; `false` otherwise.

Exceptions:

- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

#### Remarks

Read-only fields are not deserialized regardless of this setting.

## JsonSerializerOptions.IgnoreReadOnlyProperties property

```csharp
public bool IgnoreReadOnlyProperties { get; set; }
```

Gets or sets a value that indicates whether read-only properties are ignored during serialization. The default value is `false`.

Returns: `true` if read-only properties are ignored during serialization; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This property was set after serialization or deserialization has occurred.

#### Remarks

A property is read-only if it contains a public getter but not a public setter.

Read-only properties are not deserialized regardless of this setting.

For more information, see How to ignore properties with System.Text.Json.

## JsonSerializerOptions.IncludeFields property

```csharp
public bool IncludeFields { get; set; }
```

Gets or sets a value that indicates whether fields are handled during serialization and deserialization.
The default value is `false`.

Returns: `true` if public fields are included during serialization; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

This flag only enables serialization for public fields, as is the case for properties.
Private members need to be opted into individually using the `JsonIncludeAttribute` attribute.

## JsonSerializerOptions.IndentCharacter property

```csharp
public char IndentCharacter { get; set; }
```

Defines the indentation character being used when `JsonSerializerOptions.WriteIndented` is enabled. Defaults to the space character.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `value` contains an invalid character.
- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

Allowed characters are space and horizontal tab.

## JsonSerializerOptions.IndentSize property

```csharp
public int IndentSize { get; set; }
```

Defines the indentation size being used when `JsonSerializerOptions.WriteIndented` is enabled. Defaults to two.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is out of the allowed range.
- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

Allowed values are all integers between 0 and 127, included.

## JsonSerializerOptions.InferClosedTypePolymorphism property

```csharp
public bool InferClosedTypePolymorphism { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonSerializerOptions.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether the current instance has been locked for user modification.

Returns: To be added.

A `JsonSerializerOptions` instance can be locked if it has been passed to one of the `JsonSerializer` methods, has been associated with a `JsonSerializerContext` instance, or a user explicitly called the `JsonSerializerOptions.MakeReadOnly` methods on the instance.

Read-only instances use caching when querying `JsonConverter` and `JsonTypeInfo` metadata.

## JsonSerializerOptions.MaxDepth property

```csharp
public int MaxDepth { get; set; }
```

Gets or sets the maximum depth allowed when serializing or deserializing JSON, with the default value of 0 indicating a maximum depth of 64.

Returns: The maximum depth allowed when serializing or deserializing JSON.

Exceptions:

- `InvalidOperationException`: This property was set after serialization or deserialization has occurred.
- `ArgumentOutOfRangeException`: The max depth is set to a negative value.

#### Remarks

Going past this depth throws a `JsonException`.

## JsonSerializerOptions.NewLine property

```csharp
public string NewLine { get; set; }
```

Gets or sets the new line string to use when `JsonSerializerOptions.WriteIndented` is `true`.

The default is the value of `Environment.NewLine`.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: Thrown when the new line string is `null`.
- `ArgumentOutOfRangeException`: Thrown when the new line string is not `\n` or `\r\n`.
- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

To be added.

## JsonSerializerOptions.NumberHandling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling NumberHandling { get; set; }
```

Gets or sets an object that specifies how number types should be handled when serializing or deserializing.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

To be added.

## JsonSerializerOptions.PreferredObjectCreationHandling property

```csharp
public System.Text.Json.Serialization.JsonObjectCreationHandling PreferredObjectCreationHandling { get; set; }
```

Gets or sets the preferred object creation handling for properties when deserializing JSON.

Returns: When set to `JsonObjectCreationHandling.Populate`, all properties that are capable of reusing the existing instance will be populated.

Only property type is taken into consideration. For example, if a property is of type `IEnumerable<T>` but it is assigned `List<T>`, it won't be populated because `IEnumerable<T>` is not capable of populating.
Additionally, value types require a setter to be populated.
