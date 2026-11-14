---
title: "Utf8JsonReader struct (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonReader struct (part 3 of 3)

## Utf8JsonReader.TryGetDecimal(Decimal) method

```csharp
public bool TryGetDecimal (out decimal value);
```

Tries to parse the current JSON token value from the source as a `Decimal` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the decimal equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `Decimal` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetDouble(Double) method

```csharp
public bool TryGetDouble (out double value);
```

Tries to parse the current JSON token value from the source as a `Double` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains a double-precision floating point value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `Double` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetGuid(Guid) method

```csharp
public bool TryGetGuid (out Guid value);
```

Tries to parse the current JSON token value from the source as a `Guid` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the GUID equivalent to the current JSON string if the conversion succeeded, or `Guid.Empty` if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `Guid` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The value of the JSON token isn't a `JsonTokenType.String`.

#### Remarks

This method only parses `Guid` values with hyphens and without any surrounding decorations.

## Utf8JsonReader.TryGetInt16(Int16) method

```csharp
public bool TryGetInt16 (out short value);
```

Tries to parse the current JSON token value from the source as an `Int16` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the 16-bit integer value equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `Int16` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetInt32(Int32) method

```csharp
public bool TryGetInt32 (out int value);
```

Tries to parse the current JSON token value from the source as an `Int32` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the 32-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to an `Int32` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetInt64(Int64) method

```csharp
public bool TryGetInt64 (out long value);
```

Tries to parse the current JSON token value from the source as an `Int64` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the 64-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to an `Int64` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetSByte(SByte) method

```csharp
public bool TryGetSByte (out sbyte value);
```

Tries to parse the current JSON token value from the source as an `SByte` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the signed byte equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to an `SByte` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetSingle(Single) method

```csharp
public bool TryGetSingle (out float value);
```

Tries to parse the current JSON token value from the source as a `Single` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the single-precision floating point value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to an `Single` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetUInt16(UInt16) method

```csharp
public bool TryGetUInt16 (out ushort value);
```

Tries to parse the current JSON token value from the source as a `UInt16` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the unsigned 16-bit integer value equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `UInt16` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetUInt32(UInt32) method

```csharp
public bool TryGetUInt32 (out uint value);
```

Tries to parse the current JSON token value from the source as a `UInt32` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains unsigned 32-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `UInt32` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetUInt64(UInt64) method

```csharp
public bool TryGetUInt64 (out ulong value);
```

Tries to parse the current JSON token value from the source as a `UInt64` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains unsigned 64-bit integer value equivalent to the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `UInt64` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TrySkip() method

```csharp
public bool TrySkip ();
```

Tries to skip the children of the current JSON token.

Returns: `true` if there was enough data for the children to be skipped successfully; otherwise, `false`.

Exceptions:

- `JsonException`: An invalid JSON token was encountered while skipping, according to the JSON RFC.

-or -

The current depth exceeds the recursive limit set by the maximum depth.

#### Remarks

If the reader did not have enough data to completely skip the children of the current token, it will be reset to the state it was in before the method was called.

When `TokenType` is `PropertyName`, the reader first moves to the property value.

When `TokenType` (originally, or after advancing) is `StartObject` or `StartArray`, the reader advances to the matching `EndObject` or `EndArray`.

For all other token types, the reader does not move. After the next call to `Read`, the reader will be at the next value (when in an array), the next property name (when in an object), or the end array/object token.

## Utf8JsonReader.ValueTextEquals(Byte>) method

```csharp
public readonly bool ValueTextEquals (ReadOnlySpan<byte> utf8Text);
```

Compares the UTF-8 encoded text in a read-only byte span to the unescaped JSON token value in the source and returns a value that indicates whether they match.

Parameters:

- `utf8Text`: The UTF-8 encoded text to compare against.

Returns: `true` if the JSON token value in the source matches the UTF-8 encoded lookup text; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token is not a JSON string (that is, it is not `JsonTokenType.String` or `JsonTokenType.PropertyName`).

#### Remarks

The lookup text must be valid UTF-8 text. Otherwise, this method could return `true` if the source has a string token <example-value> invalid UTF-8 text that matches.

The comparison of the JSON token value in the source and the lookup text is done by first unescaping the JSON value in source, if required. The lookup text is matched as is, without any modifications to it.

## Utf8JsonReader.ValueTextEquals(Char>) method

```csharp
public readonly bool ValueTextEquals (ReadOnlySpan<char> text);
```

Compares the text in a read-only character span to the unescaped JSON token value in the source and returns a value that indicates whether they match.

Parameters:

- `text`: The text to compare against.

Returns: `true` if the JSON token value in the source matches the lookup text; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token is not a JSON string (that is, it is not `JsonTokenType.String` or `JsonTokenType.PropertyName`).

#### Remarks

If the lookup text is invalid or incomplete UTF-16 text (that is, unpaired surrogates), the method returns `false` since you can't have invalid UTF-16 within the JSON payload.

The comparison of the JSON token value in the source and the lookup text is done by first unescaping the JSON value in source, if required. The lookup text is matched as is, without any modifications to it.

## Utf8JsonReader.ValueTextEquals(String) method

```csharp
public readonly bool ValueTextEquals (string? text);
```

Compares the string text to the unescaped JSON token value in the source and returns a value that indicates whether they match.

Parameters:

- `text`: The text to compare against.

Returns: `true` if the JSON token value in the source matches the lookup text; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token is not a JSON string (that is, it is not `JsonTokenType.String` or `JsonTokenType.PropertyName`).

#### Remarks

If the lookup text is invalid or incomplete UTF-16 text (that is, unpaired surrogates), the method returns `false` since you can't have invalid UTF-16 within the JSON payload.

The comparison of the JSON token value in the source and the lookup text is done by first unescaping the JSON value in source, if required. The lookup text is matched as is, without any modifications to it.
