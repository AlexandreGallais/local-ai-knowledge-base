---
title: "JsonReaderOptions struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonReaderOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonReaderOptions struct

Namespace: `System.Text.Json`

```csharp
public struct JsonReaderOptions
```

Provides the ability for the user to define custom behavior when reading JSON.

#### Remarks

For more information, see How to write custom serializers and deserializers with System.Text.Json.

## JsonReaderOptions.AllowMultipleValues property

```csharp
public bool AllowMultipleValues { get; set; }
```

Gets or sets a value that indicates whether the `Utf8JsonReader` should tolerate zero or more top-level JSON values that are whitespace separated.

Returns: `true` if the `Utf8JsonReader` should tolerate zero or more top-level JSON values that are whitespace separated. The default is `false`.

Exceptions:

- `JsonException`: Trailing content was encountered after the first top-level JSON value.

To be added.

## JsonReaderOptions.AllowTrailingCommas property

```csharp
public bool AllowTrailingCommas { get; set; }
```

Gets or sets a value that defines whether an extra comma at the end of a list of JSON values in an object or array is allowed (and ignored) within the JSON payload being read.

Returns: `true` if an extra comma is allowed; otherwise, `false`.

By default, this property is set to `false`, and a `JsonException` is thrown if a trailing comma is encountered.

## JsonReaderOptions.CommentHandling property

```csharp
public System.Text.Json.JsonCommentHandling CommentHandling { get; set; }
```

Gets or sets a value that determines how the `Utf8JsonReader` handles comments when reading through the JSON data.

Returns: One of the enumeration values that indicates how comments are handled.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is not a member of the `JsonCommentHandling` enumeration.

By default, the reader throws a `JsonException` if it encounters a comment.

## JsonReaderOptions.MaxDepth property

```csharp
public int MaxDepth { get; set; }
```

Gets or sets the maximum depth allowed when reading JSON, with the default (that is, 0) indicating a maximum depth of 64.

Returns: The maximum depth allowed when reading JSON.

Exceptions:

- `ArgumentOutOfRangeException`: The maximum depth is being set to a negative value.

Reading past this depth will throw a `JsonException`.
