---
title: "JsonSourceGenerationOptionsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonSourceGenerationOptionsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSourceGenerationOptionsAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonSourceGenerationOptionsAttribute : System.Text.Json.Serialization.JsonAttribute
```

Instructs the System.Text.Json source generator to assume the specified options will be used at run time via `JsonSerializerOptions`.

To be added.

## JsonSourceGenerationOptionsAttribute.JsonSourceGenerationOptionsAttribute() constructor

```csharp
public JsonSourceGenerationOptionsAttribute ();
```

Initializes a new instance of `JsonSourceGenerationOptionsAttribute`.

To be added.

## JsonSourceGenerationOptionsAttribute.JsonSourceGenerationOptionsAttribute(JsonSerializerDefaults) constructor

```csharp
public JsonSourceGenerationOptionsAttribute (System.Text.Json.JsonSerializerDefaults defaults);
```

Constructs a new `JsonSourceGenerationOptionsAttribute` instance with a predefined set of options determined by the specified `JsonSerializerDefaults`.

Parameters:

- `defaults`: The `JsonSerializerDefaults` to reason about.

Exceptions:

- `ArgumentOutOfRangeException`: `defaults` is invalid.

To be added.

## JsonSourceGenerationOptionsAttribute.AllowDuplicateProperties property

```csharp
public bool AllowDuplicateProperties { get; set; }
```

Specifies the default value of `JsonSerializerOptions.AllowDuplicateProperties` when set.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.AllowOutOfOrderMetadataProperties property

```csharp
public bool AllowOutOfOrderMetadataProperties { get; set; }
```

Specifies the default value of `JsonSerializerOptions.AllowOutOfOrderMetadataProperties` when set.

Returns: To be added.

#### Remarks

This property sets the default value for `AllowOutOfOrderMetadataProperties` on the generated serializer options.

When this property is enabled, JSON metadata properties such as `$id`, `$type`, and `$ref` are allowed to appear after regular properties during deserialization. However, this has performance implications. The deserializer must buffer entire JSON objects in memory, and with nested objects, it might need to backtrack once per nesting level, resulting in worst-case **O(n × d)** deserialization time (where *n* is the payload length and *d* is the object graph depth).

For more details on the performance tradeoffs, see `AllowOutOfOrderMetadataProperties`.

## JsonSourceGenerationOptionsAttribute.AllowTrailingCommas property

```csharp
public bool AllowTrailingCommas { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.AllowTrailingCommas`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.Converters property

```csharp
public Type[]? Converters { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.Converters`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.DefaultBufferSize property

```csharp
public int DefaultBufferSize { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.DefaultBufferSize`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.DefaultIgnoreCondition property

```csharp
public System.Text.Json.Serialization.JsonIgnoreCondition DefaultIgnoreCondition { get; set; }
```

Gets or sets the default ignore condition.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.DictionaryKeyPolicy property

```csharp
public System.Text.Json.Serialization.JsonKnownNamingPolicy DictionaryKeyPolicy { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.DictionaryKeyPolicy`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.GenerationMode property

```csharp
public System.Text.Json.Serialization.JsonSourceGenerationMode GenerationMode { get; set; }
```

Gets or sets the source generation mode for types that don't explicitly set the mode with `JsonSerializableAttribute.GenerationMode`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.IgnoreReadOnlyFields property

```csharp
public bool IgnoreReadOnlyFields { get; set; }
```

Gets or sets a value that indicates whether to ignore read-only fields.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.IgnoreReadOnlyProperties property

```csharp
public bool IgnoreReadOnlyProperties { get; set; }
```

Gets or sets a value that indicates whether to ignore read-only properties.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.IncludeFields property

```csharp
public bool IncludeFields { get; set; }
```

Gets or sets a value that indicates whether to include fields for serialization and deserialization.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.IndentCharacter property

```csharp
public char IndentCharacter { get; set; }
```

Specifies the default value of `JsonSerializerOptions.IndentCharacter` when set.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.IndentSize property

```csharp
public int IndentSize { get; set; }
```

Specifies the default value of `JsonSerializerOptions.IndentCharacter` when set.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.InferClosedTypePolymorphism property

```csharp
public bool InferClosedTypePolymorphism { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.MaxDepth property

```csharp
public int MaxDepth { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.MaxDepth`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.NewLine property

```csharp
public string? NewLine { get; set; }
```

Specifies the default value of `JsonSerializerOptions.NewLine` when set.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.NumberHandling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling NumberHandling { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.NumberHandling`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.PreferredObjectCreationHandling property

```csharp
public System.Text.Json.Serialization.JsonObjectCreationHandling PreferredObjectCreationHandling { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.PreferredObjectCreationHandling`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.PropertyNameCaseInsensitive property

```csharp
public bool PropertyNameCaseInsensitive { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.PropertyNameCaseInsensitive`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.PropertyNamingPolicy property

```csharp
public System.Text.Json.Serialization.JsonKnownNamingPolicy PropertyNamingPolicy { get; set; }
```

Gets or sets a built-in naming policy to convert JSON property names with.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.ReadCommentHandling property

```csharp
public System.Text.Json.JsonCommentHandling ReadCommentHandling { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.ReadCommentHandling`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.ReferenceHandler property

```csharp
public System.Text.Json.Serialization.JsonKnownReferenceHandler ReferenceHandler { get; set; }
```

Specifies the default value of `JsonSerializerOptions.ReferenceHandler` when set.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.RespectNullableAnnotations property

```csharp
public bool RespectNullableAnnotations { get; set; }
```

Specifies the default value of `JsonSerializerOptions.RespectNullableAnnotations` when set.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.RespectRequiredConstructorParameters property

```csharp
public bool RespectRequiredConstructorParameters { get; set; }
```

Specifies the default value of `JsonSerializerOptions.RespectRequiredConstructorParameters` when set.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.TypeClassifiers property

```csharp
public Type[]? TypeClassifiers { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.UnknownTypeHandling property

```csharp
public System.Text.Json.Serialization.JsonUnknownTypeHandling UnknownTypeHandling { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.UnknownTypeHandling`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.UnmappedMemberHandling property

```csharp
public System.Text.Json.Serialization.JsonUnmappedMemberHandling UnmappedMemberHandling { get; set; }
```

Gets or sets the default value of `JsonSerializerOptions.UnmappedMemberHandling`.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.UseStringEnumConverter property

```csharp
public bool UseStringEnumConverter { get; set; }
```

Gets or sets a value that indicates whether the source generator defaults to `JsonStringEnumConverter` instead of numeric serialization for all enum types encountered in its type graph.

Returns: To be added.

To be added.

## JsonSourceGenerationOptionsAttribute.WriteIndented property

```csharp
public bool WriteIndented { get; set; }
```

Gets or sets a value that indicates whether JSON output is pretty-printed.

Returns: To be added.

To be added.
