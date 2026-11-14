---
title: "JsonElement struct (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonElement struct (part 3 of 3)

## Remarks

Property name matching is performed as an ordinal, case-sensitive comparison.

If a property is defined multiple times for the same object, the method matches the last such definition.

For more information, see How to write custom serializers and deserializers with System.Text.Json.

</format>

## JsonElement.TryGetProperty(Char>, JsonElement) method

```csharp
public bool TryGetProperty (ReadOnlySpan<char> propertyName, out System.Text.Json.JsonElement value);
```

Looks for a property named `propertyName` in the current object, returning a value that indicates whether or not such a property exists. When the property exists, the method assigns its value to the `value` argument.

Parameters:

- `propertyName`: The name of the property to find.
- `value`: When this method returns, contains the value of the specified property.

Returns: `true` if the property was found; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

Property name matching is performed as an ordinal, case-sensitive comparison.

If a property is defined multiple times for the same object, the method matches the last such definition.

</format>

## JsonElement.TryGetProperty(String, JsonElement) method

```csharp
public bool TryGetProperty (string propertyName, out System.Text.Json.JsonElement value);
```

Looks for a property named `propertyName` in the current object, returning a value that indicates whether or not such a property exists. When the property exists, its value is assigned to the `value` argument.

Parameters:

- `propertyName`: The name of the property to find.
- `value`: When this method returns, contains the value of the specified property.

Returns: `true` if the property was found; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `ArgumentNullException`: `propertyName` is `null`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

Property name matching is performed as an ordinal, case-sensitive comparison.

If a property is defined multiple times for the same object, the method matches the last such definition.

</format>

## JsonElement.TryGetSByte(SByte) method

```csharp
public bool TryGetSByte (out sbyte value);
```

Attempts to represent the current JSON number as an `SByte`.

Parameters:

- `value`: When this method returns, contains the signed byte equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as an `SByte`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not parse the contents of a JSON string value.

## JsonElement.TryGetSingle(Single) method

```csharp
public bool TryGetSingle (out float value);
```

Attempts to represent the current JSON number as a `Single`.

Parameters:

- `value`: When this method returns, contains the single-precision floating point value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `Single`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

This method does not return `false` for values larger than `MaxValue` or smaller than `MinValue`. Instead, it returns `true` and assigns `PositiveInfinity` or `NegativeInfinity` to the `value` argument.

</format>

## JsonElement.TryGetUInt16(UInt16) method

```csharp
public bool TryGetUInt16 (out ushort value);
```

Attempts to represent the current JSON number as a `UInt16`.

Parameters:

- `value`: When this method returns, contains the unsigned 16-bit integer value equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `UInt16`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not parse the contents of a JSON string value.

## JsonElement.TryGetUInt32(UInt32) method

```csharp
public bool TryGetUInt32 (out uint value);
```

Attempts to represent the current JSON number as a `UInt32`.

Parameters:

- `value`: When this method returns, contains unsigned 32-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `UInt32`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.TryGetUInt64(UInt64) method

```csharp
public bool TryGetUInt64 (out ulong value);
```

Attempts to represent the current JSON number as a `UInt64`.

Parameters:

- `value`: When this method returns, contains unsigned 64-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `UInt64`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.TryParseValue(Utf8JsonReader, JsonElement>) method

```csharp
public static bool TryParseValue (ref System.Text.Json.Utf8JsonReader reader, out System.Text.Json.JsonElement? element);
```

Attempts to parse one JSON value (including objects or arrays) from the provided reader.

Parameters:

- `reader`: The reader to read.
- `element`: Receives the parsed element.

Returns: `true` if a value was read and parsed into a JsonElement; `false` if the reader ran out of data while parsing.
All other situations result in an exception being thrown.

Exceptions:

- `ArgumentException`: `reader` is using unsupported options.
- `ArgumentException`: The current `reader` token does not start or represent a value.
- `JsonException`: A value could not be read from the reader.

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will be advanced by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` is positioned at the final token in the JSON value. If an exception is thrown or `false` is returned, the reader is reset to the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

## JsonElement.ValueEquals(Byte>) method

```csharp
public bool ValueEquals (ReadOnlySpan<byte> utf8Text);
```

Compares the text represented by a UTF8-encoded byte span to the string value of this element.

Parameters:

- `utf8Text`: The UTF-8 encoded text to compare against.

Returns: `true` if the string value of this element has the same UTF-8 encoding as
`utf8Text`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.

#### Remarks

This method is functionally equal to doing an ordinal comparison of the string produced by UTF-8 decoding `utf8Text` with the result of calling `GetString`, but avoids creating the string instances.

## JsonElement.ValueEquals(Char>) method

```csharp
public bool ValueEquals (ReadOnlySpan<char> text);
```

Compares a specified read-only character span to the string value of this element.

Parameters:

- `text`: The text to compare against.

Returns: `true` if the string value of this element matches `text`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.

#### Remarks

This method is functionally equal to doing an ordinal comparison of `text` and the result of calling `GetString`, but avoids creating the string instance.

## JsonElement.ValueEquals(String) method

```csharp
public bool ValueEquals (string? text);
```

Compares a specified string to the string value of this element.

Parameters:

- `text`: The text to compare against.

Returns: `true` if the string value of this element matches `text`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.

#### Remarks

This method is functionally equal to doing an ordinal comparison of `text` and the result of calling `GetString`, but avoids creating the string instance.

## JsonElement.WriteTo(Utf8JsonWriter) method

```csharp
public void WriteTo (System.Text.Json.Utf8JsonWriter writer);
```

Writes the element to the specified writer as a JSON value.

Parameters:

- `writer`: The writer to which to write the element.

Exceptions:

- `ArgumentNullException`: The `writer` parameter is `null`.
- `InvalidOperationException`: The `JsonElement.ValueKind` of this value is `JsonValueKind.Undefined`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.
