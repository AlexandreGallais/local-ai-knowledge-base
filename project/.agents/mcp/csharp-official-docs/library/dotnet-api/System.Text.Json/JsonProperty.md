---
title: "JsonProperty struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonProperty.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonProperty struct

Namespace: `System.Text.Json`

```csharp
public readonly struct JsonProperty
```

Represents a single property for a JSON object.

To be added.

## JsonProperty.Name property

```csharp
public string Name { get; }
```

Gets the name of this property.

Returns: The name of this property.

To be added.

## JsonProperty.Value property

```csharp
public System.Text.Json.JsonElement Value { get; }
```

Gets the value of this property.

Returns: The value of this property.

To be added.

## JsonProperty.NameEquals(Byte>) method

```csharp
public bool NameEquals (ReadOnlySpan<byte> utf8Text);
```

Compares the specified UTF-8 encoded text to the name of this property.

Parameters:

- `utf8Text`: The UTF-8 encoded text to compare against.

Returns: `true` if the name of this property has the same UTF-8 encoding as `utf8Text`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `Type` is not `JsonTokenType.PropertyName`.

#### Remarks

This method is functionally equal to doing an ordinal comparison of `utf8Text` and `Name`, but it can avoid creating the string instance.

## JsonProperty.NameEquals(Char>) method

```csharp
public bool NameEquals (ReadOnlySpan<char> text);
```

Compares the specified text as a character span to the name of this property.

Parameters:

- `text`: The text to compare against.

Returns: `true` if the name of this property matches `text`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `Type` is not `JsonTokenType.PropertyName`.

#### Remarks

This method is functionally equal to doing an ordinal comparison of `text` and `Name`, but it can avoid creating the string instance.

## JsonProperty.NameEquals(String) method

```csharp
public bool NameEquals (string? text);
```

Compares the specified string to the name of this property.

Parameters:

- `text`: The text to compare against.

Returns: `true` if the name of this property matches `text`; otherwise `false`.

Exceptions:

- `InvalidOperationException`: This value's `Type` is not `JsonTokenType.PropertyName`.

#### Remarks

This method is functionally equal to doing an ordinal comparison of `text` and `Name`.

## JsonProperty.ToString() method

```csharp
public override string ToString ();
```

Provides a string representation of the property for debugging purposes.

Returns: A string containing the uninterpreted value of the property, beginning at the declaring open-quote and ending at the last character that is part of the value.

To be added.

## JsonProperty.WriteTo(Utf8JsonWriter) method

```csharp
public void WriteTo (System.Text.Json.Utf8JsonWriter writer);
```

Writes the property to the provided writer as a named JSON object property.

Parameters:

- `writer`: The writer to which to write the property.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.
- `ArgumentException`: `JsonProperty.Name` is too large to be a JSON object property.
- `InvalidOperationException`: The `JsonElement.ValueKind` of this JSON property's `JsonProperty.Value` would result in invalid JSON.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.
