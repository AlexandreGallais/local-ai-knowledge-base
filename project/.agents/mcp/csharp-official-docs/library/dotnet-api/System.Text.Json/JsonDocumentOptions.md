---
title: "JsonDocumentOptions struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonDocumentOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonDocumentOptions struct

Namespace: `System.Text.Json`

```csharp
public struct JsonDocumentOptions
```

Provides the ability for the user to define custom behavior when parsing JSON to create a `JsonDocument`.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonDocumentOptions.AllowDuplicateProperties property

```csharp
public bool AllowDuplicateProperties { get; set; }
```

Defines whether duplicate property names are allowed when deserializing JSON objects.

Returns: To be added.

By default, it's set to `true`. If set to `false`, `JsonException` is thrown when a duplicate property name is encountered during deserialization.

## JsonDocumentOptions.AllowTrailingCommas property

```csharp
public bool AllowTrailingCommas { get; set; }
```

Gets or sets a value that indicates whether an extra comma at the end of a list of JSON values in an object or array is allowed (and ignored) within the JSON payload being read.

Returns: `true` if an extra comma at the end of a list of JSON values in an object or array is allowed; otherwise, `false`. Default is `false`

#### Remarks

By default, `AllowTrailingCommas` is set to `false`, and a `JsonException` is thrown if a trailing comma is encountered.

## JsonDocumentOptions.CommentHandling property

```csharp
public System.Text.Json.JsonCommentHandling CommentHandling { get; set; }
```

Gets or sets a value that determines how the `JsonDocument` handles comments when reading through the JSON data.

Returns: One of the enumeration values that indicates how comments are handled.

Exceptions:

- `ArgumentOutOfRangeException`: The comment handling enum is set to a value that is not supported (or not within the `JsonCommentHandling` enum range).

#### Remarks

By default, a `JsonException` is thrown if a comment is encountered.

## JsonDocumentOptions.MaxDepth property

```csharp
public int MaxDepth { get; set; }
```

Gets or sets the maximum depth allowed when parsing JSON data, with the default (that is, 0) indicating a maximum depth of 64.

Returns: The maximum depth allowed when parsing JSON data.

Exceptions:

- `ArgumentOutOfRangeException`: The max depth is set to a negative value.

#### Remarks

Parsing past this depth will throw a `JsonException`.
