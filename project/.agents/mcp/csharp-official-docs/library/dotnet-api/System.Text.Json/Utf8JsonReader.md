---
title: "Utf8JsonReader struct (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/Utf8JsonReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8JsonReader struct

Namespace: `System.Text.Json`

```csharp
public ref struct Utf8JsonReader
```

Provides a high-performance API for forward-only, read-only access to UTF-8 encoded JSON text.

#### Remarks

`Utf8JsonReader` processes the text sequentially with no caching and by default adheres strictly to the JSON RFC.

When `Utf8JsonReader` encounters invalid JSON, it throws a `JsonException` with basic error information like line number and byte position on the line.

Since this type is a ref struct, it doesn't directly support async. However, it does provide support for reentrancy to read incomplete data and to continue reading once more data is presented.

To be able to set max depth while reading or to allow skipping comments, create an instance of `JsonReaderOptions` and pass it to the reader.

For more information, see Use Utf8JsonReader.

## Utf8JsonReader.Utf8JsonReader(Byte>, JsonReaderOptions) constructor

```csharp
public Utf8JsonReader (System.Buffers.ReadOnlySequence<byte> jsonData, System.Text.Json.JsonReaderOptions options = default);
```

Initializes a new instance of the `Utf8JsonReader` structure that processes a read-only sequence of UTF-8 encoded text using the specified options.

Parameters:

- `jsonData`: The UTF-8 encoded JSON text to process.
- `options`: Options that define customized behavior of the `Utf8JsonReader` that differs from the JSON RFC (for example, how to handle comments or maximum depth allowed when reading). By default, the `Utf8JsonReader` follows the JSON RFC strictly; comments within the JSON are invalid, and the maximum depth is 64.

#### Remarks

Since this type is a ref struct, it is a stack-only type, and all the limitations of ref structs apply to it.

This constructor assumes that the entire JSON payload is contained in `jsonData`; it is equivalent to `IsFinalBlock` = `true`.

## Utf8JsonReader.Utf8JsonReader(Byte>, JsonReaderOptions) constructor

```csharp
public Utf8JsonReader (ReadOnlySpan<byte> jsonData, System.Text.Json.JsonReaderOptions options = default);
```

Initializes a new instance of the `Utf8JsonReader` structure that processes a read-only span of UTF-8 encoded text using the specified options.

Parameters:

- `jsonData`: The UTF-8 encoded JSON text to process.
- `options`: Options that define customized behavior of the `Utf8JsonReader` that differs from the JSON RFC (for example, how to handle comments or maximum depth allowed when reading). By default, the `Utf8JsonReader` follows the JSON RFC strictly; comments within the JSON are invalid, and the maximum depth is 64.

#### Remarks

Since this type is a ref struct, it is a stack-only type, and all the limitations of ref structs apply to it.

This constructor assumes that the entire JSON payload is contained in `jsonData`; it is equivalent to `IsFinalBlock` = `true`.

## Utf8JsonReader.Utf8JsonReader(Byte>, Boolean, JsonReaderState) constructor

```csharp
public Utf8JsonReader (System.Buffers.ReadOnlySequence<byte> jsonData, bool isFinalBlock, System.Text.Json.JsonReaderState state);
```

Initializes a new instance of the `Utf8JsonReader` structure that processes a read-only sequence of UTF-8 encoded text and indicates whether the input contains all the text to process.

Parameters:

- `jsonData`: The UTF-8 encoded JSON text to process.
- `isFinalBlock`: `true` to indicate that the input sequence contains the entire data to process; `false` to indicate that the input span contains partial data with more data to follow.
- `state`: The reader state. If this is the first call to the constructor, pass the default state; otherwise, pass the value of the `Utf8JsonReader.CurrentState` property from the previous instance of the `Utf8JsonReader`.

#### Remarks

Since this type is a ref struct, it is a stack-only type, and all the limitations of ref structs apply to it.
This is the reason why the constructor accepts a `JsonReaderState`.

## Utf8JsonReader.Utf8JsonReader(Byte>, Boolean, JsonReaderState) constructor

```csharp
public Utf8JsonReader (ReadOnlySpan<byte> jsonData, bool isFinalBlock, System.Text.Json.JsonReaderState state);
```

Initializes a new instance of the `Utf8JsonReader` structure that processes a read-only span of UTF-8 encoded text and indicates whether the input contains all the text to process.

Parameters:

- `jsonData`: The UTF-8 encoded JSON text to process.
- `isFinalBlock`: `true` to indicate that the input sequence contains the entire data to process; `false` to indicate that the input span contains partial data with more data to follow.
- `state`: The reader state. If this is the first call to the constructor, pass the default state; otherwise, pass the value of the `Utf8JsonReader.CurrentState` property from the previous instance of the `Utf8JsonReader`.

#### Remarks

Since this type is a ref struct, it is a stack-only type, and all the limitations of ref structs apply to it.
This is the reason why the constructor accepts a `JsonReaderState`.

## Utf8JsonReader.BytesConsumed property

```csharp
public long BytesConsumed { get; }
```

Gets the total number of bytes consumed so far by this instance of the `Utf8JsonReader`.

Returns: The total number of bytes consumed so far.

To be added.

## Utf8JsonReader.CurrentDepth property

```csharp
public int CurrentDepth { get; }
```

Gets the depth of the current token.

Returns: The depth of the current token.

#### Remarks

The `CurrentDepth` property tracks the recursive depth of the nested objects or arrays within the JSON text processed so far.

## Utf8JsonReader.CurrentState property

```csharp
public System.Text.Json.JsonReaderState CurrentState { get; }
```

Gets the current `Utf8JsonReader` state to pass to a `Utf8JsonReader` constructor with more data.

Returns: The current reader state.

#### Remarks

Unlike the `Utf8JsonReader`, which is a ref struct, the state can survive across `async`/`await` boundaries. This type is required to provide support for reading in more data asynchronously before continuing with a new instance of the `Utf8JsonReader`.

## Utf8JsonReader.HasValueSequence property

```csharp
public bool HasValueSequence { get; }
```

Gets a value that indicates which `Value` property to use to get the token value.

Returns: `true` if `Utf8JsonReader.ValueSequence` should be used to get the token value; `false` if `Utf8JsonReader.ValueSpan` should be used instead.

#### Remarks

If `HasValueSequence` is `false`, `ValueSequence` is empty. Therefore, read the token value using the `ValueSpan` property.

For input data within a `ReadOnlySpan<byte>`, this always returns `false`. For input data within a `ReadOnlySequence<byte>`, this only returns `true` if the token value straddles more than a single segment and hence can't be represented as a span.

## Utf8JsonReader.IsFinalBlock property

```csharp
public bool IsFinalBlock { get; }
```

Gets a value that indicates whether all the JSON data was provided or there is more data to come.

Returns: `true` if the reader was constructed with the input span or sequence containing the entire JSON data to process; `false` if the reader was constructed with an input span or sequence that may contain partial JSON data with more data to follow.

To be added.

## Utf8JsonReader.Position property

```csharp
public SequencePosition Position { get; }
```

Gets the current `SequencePosition` within the provided UTF-8 encoded input ReadOnlySequence<byte> or a default `SequencePosition` if the `Utf8JsonReader` struct was constructed with a ReadOnlySpan<byte>.

Returns: The current `SequencePosition` within the provided UTF-8 encoded input ReadOnlySequence<byte> or a default `SequencePosition` if the `Utf8JsonReader` struct was constructed with a ReadOnlySpan<byte>.

To be added.

## Utf8JsonReader.TokenStartIndex property

```csharp
public long TokenStartIndex { get; }
```

Gets the index that the last processed JSON token <example-value> at (within the given UTF-8 encoded input text), skipping any white space.

Returns: The starting index of the last processed JSON token <example-value> the given UTF-8 encoded input text.

#### Remarks

For JSON strings (including property names), this value points to before the start quote.

For comments, this value points to before the first comment delimiter (that is, '/'). This is only applicable when the reader is constructed using the `Allow` option.

## Utf8JsonReader.TokenType property

```csharp
public System.Text.Json.JsonTokenType TokenType { get; }
```

Gets the type of the last processed JSON token in the UTF-8 encoded JSON text.

Returns: The type of the last processed JSON token.

To be added.

## Utf8JsonReader.ValueIsEscaped property

```csharp
public bool ValueIsEscaped { get; }
```

Gets a value that indicates whether the current `Utf8JsonReader.ValueSpan` or `Utf8JsonReader.ValueSequence` properties contain escape sequences per RFC 8259 section 7, and therefore require unescaping before being consumed.

Returns: To be added.

To be added.

## Utf8JsonReader.ValueSequence property

```csharp
public System.Buffers.ReadOnlySequence<byte> ValueSequence { get; }
```

Gets the raw value of the last processed token as a ReadOnlySequence<byte> slice of the input payload, only if the token is contained within multiple segments.

Returns: A byte read-only sequence.

#### Remarks

If the JSON is provided within a ReadOnlySequence<byte> and the slice that represents the token value fits in a single segment, then `ValueSpan` contains the sliced value since it can be represented as a span. Otherwise, `ValueSequence` contains the token value.

If `HasValueSequence` is `false`, `ValueSequence` is empty.
Therefore, only access `ValueSequence` if `HasValueSequence` is `true`.
Otherwise, the token value must be accessed from `ValueSpan`.

There is no guarantee that this property will always contain well-formed data. If the input JSON passed in to the `Utf8JsonReader` contains invalid UTF-8 bytes within JSON string tokens, this property will return back those invalid UTF-8 bytes as is.
Therefore, if the input is untrusted or not previously validated, call `GetString` to get the JSON string token.

Since this property returns the raw bytes, avoid using it for text comparison. Instead call `Utf8JsonReader.ValueTextEquals`, which unescapes the text if necessary.

## Utf8JsonReader.ValueSpan property

```csharp
public ReadOnlySpan<byte> ValueSpan { get; }
```

Gets the raw value of the last processed token as a ReadOnlySpan<byte> slice of the input payload, if the token fits in a single segment or if the reader was constructed with a JSON payload contained in a ReadOnlySpan<byte>.

Returns: A read-only span of bytes.

#### Remarks

If the JSON is provided within a ReadOnlySequence<byte> and the slice that represents the token value fits in a single segment, then `ValueSpan` contains the sliced value since it can be represented as a span. Otherwise, `ValueSequence` contains the token value.

If `HasValueSequence` is `true`, `ValueSpan` is empty.
Therefore, only access `ValueSpan` if `HasValueSequence` is `false`.
Otherwise, the token value must be accessed from `ValueSequence`.

There is no guarantee that this property will always contain well-formed data. If the input JSON passed in to the `Utf8JsonReader` contains invalid UTF-8 bytes within JSON string tokens, this property will return back those invalid UTF-8 bytes as is.
Therefore, if the input is untrusted or not previously validated, call `GetString` to get the JSON string token.

Since this property returns the raw bytes, avoid using it for text comparison. Instead call `Utf8JsonReader.ValueTextEquals` which unescapes the text if necessary.

## Utf8JsonReader.CopyString(Byte>) method

```csharp
public readonly int CopyString (Span<byte> utf8Destination);
```

Copies the current JSON token value from the source, unescaped, as UTF-8 bytes to a buffer.

Parameters:

- `utf8Destination`: A buffer to write the unescaped UTF-8 bytes into.

Returns: The number of bytes written to `utf8Destination`.

Exceptions:

- `InvalidOperationException`: The JSON token is not a string, that is, it's not `JsonTokenType.String` or `JsonTokenType.PropertyName`.

-or-

The JSON string contains invalid UTF-8 bytes or invalid UTF-16 surrogates.
- `ArgumentException`: The destination buffer is too small to hold the unescaped value.

#### Remarks

Unlike `GetString`, this method does not support `Null`.

This method will throw an `ArgumentException` if the destination buffer is too small to hold the unescaped value. You can determine an appropriately sized buffer by consulting the length of either `ValueSpan` or `ValueSequence`, since the unescaped result is always less than or equal to the length of the encoded strings.

## Utf8JsonReader.CopyString(Char>) method

```csharp
public readonly int CopyString (Span<char> destination);
```

Copies the current JSON token value from the source, unescaped, as UTF-16 characters to a buffer.

Parameters:

- `destination`: A buffer to write the transcoded UTF-16 characters into.

Returns: The number of characters written to `destination`.

Exceptions:

- `InvalidOperationException`: The JSON token is not a string, that is, it's not `JsonTokenType.String` or `JsonTokenType.PropertyName`.

-or-

The JSON string contains invalid UTF-8 bytes or invalid UTF-16 surrogates.
- `ArgumentException`: The destination buffer is too small to hold the unescaped value.

#### Remarks

Unlike `GetString`, this method does not support `Null`.

This method will throw an `ArgumentException` if the destination buffer is too small to hold the unescaped value. You can determine an appropriately sized buffer by consulting the length of either `ValueSpan` or `ValueSequence`, since the unescaped result is always less than or equal to the length of the encoded strings.

## Utf8JsonReader.GetBoolean() method

```csharp
public bool GetBoolean ();
```

Reads the next JSON token value from the source as a `Boolean`.

Returns: `true` if the `Utf8JsonReader.TokenType` is `JsonTokenType.True`; `false` if the `Utf8JsonReader.TokenType` is `JsonTokenType.False`.

Exceptions:

- `InvalidOperationException`: The value of the JSON token isn't a Boolean value (that is, `JsonTokenType.True` or `JsonTokenType.False`).

To be added.

## Utf8JsonReader.GetByte() method

```csharp
public byte GetByte ();
```

Parses the current JSON token value from the source as a `Byte`.

Returns: The value of the UTF-8 encoded token.

Exceptions:

- `InvalidOperationException`: The value of the JSON token is not a `JsonTokenType.Number`.
- `FormatException`: The numeric format of the JSON token value is incorrect (for example, it contains a fractional value or is written in scientific notation).

-or-

The JSON token value represents a number less than <see cref="<example-value>">Byte.MinValue</see> or greater than <see cref="<example-value>">Byte.MaxValue</see>.

To be added.
