---
title: "JsonElement struct (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonElement struct (part 2 of 3)

## JsonElement.GetSingle() method

```csharp
public float GetSingle ();
```

Gets the current JSON number as a `Single`.

Returns: The current JSON number as a `Single`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `Single`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

This method returns `PositiveInfinity` for values larger than `MaxValue` and `NegativeInfinity` for values smaller than `MinValue`.

</format>

## JsonElement.GetString() method

```csharp
public string? GetString ();
```

Gets the value of the element as a `String`.

Returns: The value of the element as a `String`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is neither `JsonValueKind.String` nor `JsonValueKind.Null`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not create a string representation of values other than JSON strings.

</format>

## JsonElement.GetUInt16() method

```csharp
public ushort GetUInt16 ();
```

Gets the current JSON number as a `UInt16`.

Returns: The current JSON number as a `UInt16`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `UInt16`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not parse the contents of a JSON string value.

## JsonElement.GetUInt32() method

```csharp
public uint GetUInt32 ();
```

Gets the current JSON number as a `UInt32`.

Returns: The current JSON number as a `UInt32`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `UInt32`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.GetUInt64() method

```csharp
public ulong GetUInt64 ();
```

Gets the current JSON number as a `UInt64`.

Returns: The current JSON number as a `UInt64`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `FormatException`: The value cannot be represented as a `UInt64`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.Parse(Byte>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonElement Parse (ReadOnlySpan<byte> utf8Json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses UTF8-encoded text representing a single JSON value into a `JsonElement`.

Parameters:

- `utf8Json`: The JSON text to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A `JsonElement` representation of the JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

To be added.

## JsonElement.Parse(Char>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonElement Parse (ReadOnlySpan<char> json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses text representing a single JSON value into a `JsonElement`.

Parameters:

- `json`: The JSON text to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A `JsonElement` representation of the JSON value.

Exceptions:

- `JsonException`: `json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

To be added.

## JsonElement.Parse(String, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonElement Parse (string json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses text representing a single JSON value into a `JsonElement`.

Parameters:

- `json`: The JSON text to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A `JsonElement` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `json` is `null`.
- `JsonException`: `json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

To be added.

## JsonElement.ParseValue(Utf8JsonReader) method

```csharp
public static System.Text.Json.JsonElement ParseValue (ref System.Text.Json.Utf8JsonReader reader);
```

Parses one JSON value (including objects or arrays) from the provided reader.

Parameters:

- `reader`: The reader to read.

Returns: A JsonElement representing the value (and nested values) read from the reader.

Exceptions:

- `ArgumentException`: `reader` is using unsupported options.
- `ArgumentException`: The current `reader` token does not start or represent a value.
- `JsonException`: A value could not be read from the reader.

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will be advanced by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` is positioned at the final token in the JSON value. If an exception is thrown, the reader is reset to the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

## JsonElement.ToString() method

```csharp
public override string ToString ();
```

Gets a string representation for the current value appropriate to the value type.

Returns: A string representation for the current value appropriate to the value type.

Exceptions:

- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

For `Null`, `Empty` is returned.

For `True`, `TrueString` is returned.

For `False`, `FalseString` is returned.

For `String`, the value of `GetString` is returned.

For other types, the value of `GetRawText` is returned.

</format>

## JsonElement.TryGetByte(Byte) method

```csharp
public bool TryGetByte (out byte value);
```

Attempts to represent the current JSON number as a `Byte`.

Parameters:

- `value`: When this method returns, contains the byte equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `Byte`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not parse the contents of a JSON string value.

## JsonElement.TryGetBytesFromBase64(Byte[]) method

```csharp
public bool TryGetBytesFromBase64 (out byte[]? value);
```

Attempts to represent the current JSON string as a byte array, assuming that it is Base64 encoded.

Parameters:

- `value`: If the method succeeds, contains the decoded binary representation of the Base64 text.

Returns: `true` if the entire token value is encoded as valid Base64 text and can be successfully decoded to bytes; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not create a byte array representation of values other than Base64 encoded JSON strings.

## JsonElement.TryGetDateTime(DateTime) method

```csharp
public bool TryGetDateTime (out DateTime value);
```

Attempts to represent the current JSON string as a `DateTime`.

Parameters:

- `value`: When this method returns, contains the date and time value equivalent to the current JSON string if the conversion succeeded, or `DateTime.MinValue` if the conversion failed.

Returns: `true` if the string can be represented as a `DateTime`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method only creates a DateTime representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).

</format>

## JsonElement.TryGetDateTimeOffset(DateTimeOffset) method

```csharp
public bool TryGetDateTimeOffset (out DateTimeOffset value);
```

Attempts to represent the current JSON string as a `DateTimeOffset`.

Parameters:

- `value`: When this method returns, contains the date and time value equivalent to the current JSON string if the conversion succeeded, or `DateTimeOffset.MinValue` if the conversion failed.

Returns: `true` if the string can be represented as a `DateTimeOffset`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method only creates a DateTimeOffset representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).

</format>

## JsonElement.TryGetDecimal(Decimal) method

```csharp
public bool TryGetDecimal (out decimal value);
```

Attempts to represent the current JSON number as a `Decimal`.

Parameters:

- `value`: When this method returns, contains the decimal equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `Decimal`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.TryGetDouble(Double) method

```csharp
public bool TryGetDouble (out double value);
```

Attempts to represent the current JSON number as a `Double`.

Parameters:

- `value`: When this method returns, contains a double-precision floating point value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `Double`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

This method does not return `false` for values larger than `MaxValue` or smaller than `MinValue`. Instead, it returns `true` and assigns `PositiveInfinity` or `NegativeInfinity` to `value`.

</format>

## JsonElement.TryGetGuid(Guid) method

```csharp
public bool TryGetGuid (out Guid value);
```

Attempts to represent the current JSON string as a `Guid`.

Parameters:

- `value`: When this method returns, contains the GUID equivalent to the current JSON string if the conversion succeeded, or `Guid.Empty` if the conversion failed.

Returns: `true` if the string can be represented as a `Guid`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.String`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not create a Guid representation of values other than JSON strings.

</format>

## JsonElement.TryGetInt16(Int16) method

```csharp
public bool TryGetInt16 (out short value);
```

Attempts to represent the current JSON number as an `Int16`.

Parameters:

- `value`: When this method returns, contains the 16-bit integer value equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as an `Int16`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

#### Remarks

This method does not parse the contents of a JSON string value.

## JsonElement.TryGetInt32(Int32) method

```csharp
public bool TryGetInt32 (out int value);
```

Attempts to represent the current JSON number as an `Int32`.

Parameters:

- `value`: When this method returns, contains the 32-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as an `Int32`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.TryGetInt64(Int64) method

```csharp
public bool TryGetInt64 (out long value);
```

Attempts to represent the current JSON number as a `Int64`.

Parameters:

- `value`: When this method returns, contains the 64-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the number can be represented as a `Int64`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Number`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>

## Remarks

This method does not parse the contents of a JSON string value.

</format>

## JsonElement.TryGetProperty(Byte>, JsonElement) method

```csharp
public bool TryGetProperty (ReadOnlySpan<byte> utf8PropertyName, out System.Text.Json.JsonElement value);
```

Looks for a property named `utf8PropertyName` in the current object, returning a value that indicates whether or not such a property exists. When the property exists, the method assigns its value to the `value` argument.

Parameters:

- `utf8PropertyName`: The UTF-8 (with no Byte-Order-Mark (BOM)) representation of the name of the property to return.
- `value`: Receives the value of the located property.

Returns: `true` if the property was found; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: This value's `JsonElement.ValueKind` is not `JsonValueKind.Object`.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

<format>
