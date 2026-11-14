---
title: "Utf8JsonReader struct (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonReader struct (part 2 of 3)

## Utf8JsonReader.GetBytesFromBase64() method

```csharp
public byte[] GetBytesFromBase64 ();
```

Parses the current JSON token value from the source and decodes the Base64 encoded JSON string as a byte array.

Returns: The byte array that represents the current JSON token value.

Exceptions:

- `InvalidOperationException`: The type of the JSON token is not a `JsonTokenType.String`.
- `FormatException`: The value is not encoded as Base64 text, so it can't be decoded to bytes.

-or-

The value contains invalid or more than two padding characters.

-or-

The value is incomplete. That is, the JSON string length is not a multiple of 4.

To be added.

## Utf8JsonReader.GetComment() method

```csharp
public string GetComment ();
```

Parses the current JSON token value from the source as a comment and transcodes it as a `String`.

Returns: The comment that represents the current JSON token value.

Exceptions:

- `InvalidOperationException`: The JSON token is not a comment.

This is only applicable when the reader is constructed using the `JsonCommentHandling.Allow` option. Otherwise, the `Utf8JsonReader.TokenType` will never be `JsonTokenType.Comment`.

## Utf8JsonReader.GetDateTime() method

```csharp
public DateTime GetDateTime ();
```

Reads the next JSON token value from the source and parses it to a `DateTime`.

Returns: The date and time value, if the entire UTF-8 encoded token value can be successfully parsed.

Exceptions:

- `InvalidOperationException`: The value of the JSON token isn't a `JsonTokenType.String`.
- `FormatException`: The JSON token value cannot be read as a `DateTime`.

-or-

The entire UTF-8 encoded token value cannot be parsed to a `DateTime` value.

-or-

The JSON token value is of an unsupported format.

#### Remarks

This method only creates a `DateTime` representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).

## Utf8JsonReader.GetDateTimeOffset() method

```csharp
public DateTimeOffset GetDateTimeOffset ();
```

Reads the next JSON token value from the source and parses it to a `DateTimeOffset`.

Returns: The date and time offset, if the entire UTF-8 encoded token value can be successfully parsed.

Exceptions:

- `InvalidOperationException`: The value of the JSON token isn't a `JsonTokenType.String`.
- `FormatException`: The JSON token value cannot be read as a `DateTimeOffset`.

-or-

The entire UTF-8 encoded token value cannot be parsed to a `DateTimeOffset` value.

-or-

The JSON token value is of an unsupported format.

#### Remarks

This method only creates a `DateTimeOffset` representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).

## Utf8JsonReader.GetDecimal() method

```csharp
public decimal GetDecimal ();
```

Reads the next JSON token value from the source and parses it to a `Decimal`.

Returns: The UTF-8 encoded token value parsed to a `Decimal`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.
- `FormatException`: The JSON token value represents a number less than <see cref="<example-value>">Decimal.MinValue</see> or greater than <see cref="<example-value>">Decimal.MaxValue</see>.

To be added.

## Utf8JsonReader.GetDouble() method

```csharp
public double GetDouble ();
```

Reads the next JSON token value from the source and parses it to a `Double`.

Returns: The UTF-8 encoded token value parsed to a `Double`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.
- `FormatException`: The JSON token value represents a number less than <see cref="<example-value>">Double.MinValue</see> or greater than <see cref="<example-value>">Double.MaxValue</see>.

To be added.

## Utf8JsonReader.GetGuid() method

```csharp
public Guid GetGuid ();
```

Reads the next JSON token value from the source and parses it to a `Guid`.

Returns: The GUID value, if the entire UTF-8 encoded token value can be successfully parsed.

Exceptions:

- `InvalidOperationException`: The value of the JSON token isn't a `JsonTokenType.String`.
- `FormatException`: The JSON token value is in an unsupported format for a Guid.

-or-

The entire UTF-8 encoded token value cannot be parsed to a `Guid` value.

To be added.

## Utf8JsonReader.GetInt16() method

```csharp
public short GetInt16 ();
```

Parses the current JSON token value from the source as a `Int16`.

Returns: The UTF-8 encoded token value parsed to an `Int16`.

Exceptions:

- `InvalidOperationException`: The value of the JSON token is not a `JsonTokenType.Number`.
- `FormatException`: The numeric format of the JSON token value is incorrect (for example, it contains a fractional value or is written in scientific notation).

-or-

The JSON token value represents a number less than <see cref="<example-value>">Int16.MinValue</see> or greater than <see cref="<example-value>">Int16.MaxValue</see>.

To be added.

## Utf8JsonReader.GetInt32() method

```csharp
public int GetInt32 ();
```

Reads the next JSON token value from the source and parses it to an `Int32`.

Returns: The UTF-8 encoded token value parsed to an `Int32`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.
- `FormatException`: The JSON token value is of the incorrect numeric format. For example, it contains a decimal or is written in scientific notation.

-or-

The JSON token value represents a number less than <see cref="<example-value>">Int32.MinValue</see> or greater than <see cref="<example-value>">Int32.MaxValue</see>.

To be added.

## Utf8JsonReader.GetInt64() method

```csharp
public long GetInt64 ();
```

Reads the next JSON token value from the source and parses it to an `Int64`.

Returns: The UTF-8 encoded token value parsed to an `Int64`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.
- `FormatException`: The JSON token value is of the incorrect numeric format. For example, it contains a decimal or is written in scientific notation.

-or-

The JSON token value represents a number less than <see cref="<example-value>">Int64.MinValue</see> or greater than <see cref="<example-value>">Int64.MaxValue</see>.

To be added.

## Utf8JsonReader.GetSByte() method

```csharp
public sbyte GetSByte ();
```

Parses the current JSON token value from the source as an `SByte`.

Returns: The UTF-8 encoded token value parsed to an `SByte`.

Exceptions:

- `InvalidOperationException`: The value of the JSON token is not a `JsonTokenType.Number`.
- `FormatException`: The numeric format of the JSON token value is incorrect (for example, it contains a fractional value or is written in scientific notation).

-or-

The JSON token value represents a number less than <see cref="<example-value>">SByte.MinValue</see> or greater than <see cref="<example-value>">SByte.MaxValue</see>.

To be added.

## Utf8JsonReader.GetSingle() method

```csharp
public float GetSingle ();
```

Reads the next JSON token value from the source and parses it to a `Single`.

Returns: The UTF-8 encoded token value parsed to a `Single`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.
- `FormatException`: The JSON token value represents a number less than <see cref="<example-value>">Single.MinValue</see> or greater than <see cref="<example-value>">Single.MaxValue</see>.

To be added.

## Utf8JsonReader.GetString() method

```csharp
public string? GetString ();
```

Reads the next JSON token value from the source unescaped and transcodes it as a string.

Returns: The token value parsed to a string, or `null` if `Utf8JsonReader.TokenType` is `JsonTokenType.Null`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a string (that is, not a `JsonTokenType.String`, `JsonTokenType.PropertyName`, or `JsonTokenType.Null`).

-or-

The JSON string contains invalid UTF-8 bytes or invalid UTF-16 surrogates.

#### Remarks

Returns `null` when `TokenType` is `Null`.

If performance is a concern, consider using the `Utf8JsonReader.CopyString` method instead. `CopyString` avoids allocating a new string each time the method is called.

## Utf8JsonReader.GetUInt16() method

```csharp
public ushort GetUInt16 ();
```

Parses the current JSON token value from the source as a `UInt16`.

Returns: The UTF-8 encoded token value parsed to a `UInt16`.

Exceptions:

- `InvalidOperationException`: The value of the JSON token is not a `JsonTokenType.Number`.
- `FormatException`: The numeric format of the JSON token value is incorrect (for example, it contains a fractional value or is written in scientific notation).

-or-

The JSON token value represents a number less than <see cref="<example-value>">UInt16.MinValue</see> or greater than <see cref="<example-value>">UInt16.MaxValue</see>.

To be added.

## Utf8JsonReader.GetUInt32() method

```csharp
public uint GetUInt32 ();
```

Reads the next JSON token value from the source and parses it to a `UInt32`.

Returns: The UTF-8 encoded token value parsed to a `UInt32`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.
- `FormatException`: The JSON token value is of the incorrect numeric format. For example, it contains a decimal or is written in scientific notation.

-or-

The JSON token value represents a number less than <see cref="<example-value>">UInt32.MinValue</see> or greater than <see cref="<example-value>">UInt32.MaxValue</see>.

To be added.

## Utf8JsonReader.GetUInt64() method

```csharp
public ulong GetUInt64 ();
```

Reads the next JSON token value from the source and parses it to a `UInt64`.

Returns: The UTF-8 encoded token value parsed to a `UInt64`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.
- `FormatException`: The JSON token value is of the incorrect numeric format. For example, it contains a decimal or is written in scientific notation.

-or-

The JSON token value represents a number less than <see cref="<example-value>">UInt64.MinValue</see> or greater than <see cref="<example-value>">UInt64.MaxValue</see>.

To be added.

## Utf8JsonReader.Read() method

```csharp
public bool Read ();
```

Reads the next JSON token from the input source.

Returns: `true` if the token was read successfully; otherwise, `false`.

Exceptions:

- `JsonException`: An invalid JSON token <example-value> to the JSON RFC is encountered.

-or-

The current depth exceeds the recursive limit set by the maximum depth.

To be added.

## Utf8JsonReader.Skip() method

```csharp
public void Skip ();
```

Skips the children of the current JSON token.

Exceptions:

- `InvalidOperationException`: The reader was given partial data with more data to follow (that is, `Utf8JsonReader.IsFinalBlock` is `false`).
- `JsonException`: An invalid JSON token was encountered while skipping, according to the JSON RFC.

-or-

The current depth exceeds the recursive limit set by the maximum depth.

#### Remarks

When `TokenType` is `PropertyName`, the reader first moves to the property value.

When `TokenType` (originally, or after advancing) is `StartObject` or  `StartArray`, the reader advances to the matching `EndObject` or `EndArray`.

For all other token types, the reader does not move. After the next call to `Read`, the reader will be at the next value (when in an array), the next property name (when in an object), or the end array/object token.

## Utf8JsonReader.TryGetByte(Byte) method

```csharp
public bool TryGetByte (out byte value);
```

Tries to parse the current JSON token value from the source as a `Byte` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the byte equivalent of the current JSON number if the conversion succeeded, or 0 if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `Byte` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token value isn't a `JsonTokenType.Number`.

To be added.

## Utf8JsonReader.TryGetBytesFromBase64(Byte[]) method

```csharp
public bool TryGetBytesFromBase64 (out byte[]? value);
```

Tries to parse the current JSON token value from the source and decodes the Base64 encoded JSON string as a byte array and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the decoded binary representation of the Base64 text.

Returns: `true` if the entire token value is encoded as valid Base64 text and can be successfully decoded to bytes; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The JSON token is not a `JsonTokenType.String`.

To be added.

## Utf8JsonReader.TryGetDateTime(DateTime) method

```csharp
public bool TryGetDateTime (out DateTime value);
```

Tries to parse the current JSON token value from the source as a `DateTime` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the date and time value equivalent to the current JSON string if the conversion succeeded, or `DateTime.MinValue` if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `DateTime` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The value of the JSON token isn't a `JsonTokenType.String`.

#### Remarks

This method only creates a `DateTime` representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).

## Utf8JsonReader.TryGetDateTimeOffset(DateTimeOffset) method

```csharp
public bool TryGetDateTimeOffset (out DateTimeOffset value);
```

Tries to parse the current JSON token value from the source as a `DateTimeOffset` and returns a value that indicates whether the operation succeeded.

Parameters:

- `value`: When this method returns, contains the date and time value equivalent to the current JSON string if the conversion succeeded, or `DateTimeOffset.MinValue` if the conversion failed.

Returns: `true` if the entire UTF-8 encoded token value can be successfully parsed to a `DateTimeOffset` value; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The value of the JSON token isn't a `JsonTokenType.String`.

#### Remarks

This method only creates a `DateTimeOffset` representation of JSON strings that conform to the ISO 8601-1 extended format (see DateTime and DateTimeOffset support in System.Text.Json).
