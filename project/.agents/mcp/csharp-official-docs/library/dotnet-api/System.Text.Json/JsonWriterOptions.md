---
title: "JsonWriterOptions struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonWriterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonWriterOptions struct

Namespace: `System.Text.Json`

```csharp
public struct JsonWriterOptions
```

Allows the user to define custom behavior when writing JSON using the `Utf8JsonWriter`.

#### Remarks

By default, the JSON is written without any indentation or extra white space.
Also, `Utf8JsonWriter` throws an exception if the user attempts to write structurally invalid JSON.

For more information, see How to write custom serializers and deserializers with System.Text.Json.

## JsonWriterOptions.Encoder property

```csharp
public System.Text.Encodings.Web.JavaScriptEncoder? Encoder { get; set; }
```

Gets or sets the encoder to use when escaping strings, or `null` to use the default encoder.

Returns: The JavaScript character encoder used to override the escaping behavior.

To be added.

## JsonWriterOptions.IndentCharacter property

```csharp
public char IndentCharacter { get; set; }
```

Defines the indentation character used by `Utf8JsonWriter` when `JsonWriterOptions.Indented` is enabled. Defaults to the space character.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `value` contains an invalid character.

Allowed characters are space and horizontal tab.

## JsonWriterOptions.Indented property

```csharp
public bool Indented { get; set; }
```

Gets or sets a value that indicates whether the `Utf8JsonWriter` should format the JSON output, which includes indenting nested JSON tokens, adding new lines, and adding white space between property names and values.

Returns: `true` if the JSON output is formatted; `false` if the JSON is written without any extra white space. The default is `false`.

To be added.

## JsonWriterOptions.IndentSize property

```csharp
public int IndentSize { get; set; }
```

Defines the indentation size used by `Utf8JsonWriter` when `JsonWriterOptions.Indented` is enabled. Defaults to two.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is out of the allowed range.

Allowed values are integers between 0 and 127, included.

## JsonWriterOptions.MaxDepth property

```csharp
public int MaxDepth { get; set; }
```

Gets or sets the maximum depth allowed when writing JSON, with the default (that is, 0) indicating a maximum depth of 1000.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: The max depth is set to a negative value.

Writing past this depth will throw a `JsonException`.

## JsonWriterOptions.NewLine property

```csharp
public string NewLine { get; set; }
```

Gets or sets the new line string to use when `JsonWriterOptions.Indented` is `true`.

The default is the value of `Environment.NewLine`.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: The new line string is `null`.
- `ArgumentOutOfRangeException`: The new line string is not `\n` or `\r\n`.

To be added.

## JsonWriterOptions.SkipValidation property

```csharp
public bool SkipValidation { get; set; }
```

Gets or sets a value that indicates whether the `Utf8JsonWriter` should skip structural validation and allow the user to write invalid JSON.

Returns: `true` if structural validation is skipped and invalid JSON is allowed; `false` if an `InvalidOperationException` is thrown on any attempt to write invalid JSON.

#### Remarks

If the JSON being written is known to be correct, then skipping validation (by setting this property to `true`) could improve performance.
An example of invalid JSON where the writer will throw (when `SkipValidation` is set to `false`) is when you write a value within a JSON object without a property name.
