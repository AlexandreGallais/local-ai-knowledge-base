---
title: "Encoder class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoder class (part 2 of 2)

## Encoder.GetByteCount(Char>, Boolean) method

```csharp
public virtual int GetByteCount (ReadOnlySpan<char> chars, bool flush);
```

When overridden in a derived class, calculates the number of bytes produced by encoding a set of characters in the 'chars' span. A parameter indicates whether to clear the internal state of the encoder after the calculation.

Parameters:

- `chars`: A character span to encode.
- `flush`: `true` to simulate clearing the internal state of the encoder after the calculation; otherwise, `false`.

Returns: The number of bytes produced by encoding the specified characters and any characters in the internal buffer.

To be added.

## Encoder.GetByteCount(Char*, Int32, Boolean) method

```csharp
public virtual int GetByteCount (char* chars, int count, bool flush);
```

When overridden in a derived class, calculates the number of bytes produced by encoding a set of characters starting at the specified character pointer. A parameter indicates whether to clear the internal state of the encoder after the calculation.

Parameters:

- `chars`: A pointer to the first character to encode.
- `count`: The number of characters to encode.
- `flush`: `true` to simulate clearing the internal state of the encoder after the calculation; otherwise, `false`.

Returns: The number of bytes produced by encoding the specified characters and any characters in the internal buffer.

Exceptions:

- `ArgumentNullException`: `chars` is `null` (`Nothing` in Visual Basic .NET).
- `ArgumentOutOfRangeException`: `count` is less than zero.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoder.Fallback` is set to `EncoderExceptionFallback`.

To be added.

## Encoder.GetByteCount(Char[], Int32, Int32, Boolean) method

```csharp
public abstract int GetByteCount (char[] chars, int index, int count, bool flush);
```

When overridden in a derived class, calculates the number of bytes produced by encoding a set of characters from the specified character array. A parameter indicates whether to clear the internal state of the encoder after the calculation.

Parameters:

- `chars`: The character array containing the set of characters to encode.
- `index`: The index of the first character to encode.
- `count`: The number of characters to encode.
- `flush`: `true` to simulate clearing the internal state of the encoder after the calculation; otherwise, `false`.

Returns: The number of bytes produced by encoding the specified characters and any characters in the internal buffer.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `chars`.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoder.Fallback` is set to `EncoderExceptionFallback`.

#### Examples

The following code example demonstrates how to use the `Encoder.GetByteCount` method to return the number of bytes required to encode an array of characters using a Unicode `Encoder`.

_Code sample not included: ~/snippets/csharp/System.Text/Encoder/GetByteCount/getbytecount-char[]-int32-int32.cs._

## Encoder.GetBytes(Char>, Byte>, Boolean) method

```csharp
public virtual int GetBytes (ReadOnlySpan<char> chars, Span<byte> bytes, bool flush);
```

When overridden in a derived class, encodes a set of characters in the input characters span and any characters in the internal buffer into a sequence of bytes that are stored in the input byte span. A parameter indicates whether to clear the internal state of the encoder after the conversion.

Parameters:

- `chars`: A character span to encode.
- `bytes`: A byte span to write the resulting sequence of bytes to.
- `flush`: `true` to clear the internal state of the encoder after the conversion; otherwise, `false`.

Returns: The actual number of bytes written at the location indicated by the `bytes` parameter.

To be added.

## Encoder.GetBytes(Char*, Int32, Byte*, Int32, Boolean) method

```csharp
public virtual int GetBytes (char* chars, int charCount, byte* bytes, int byteCount, bool flush);
```

When overridden in a derived class, encodes a set of characters starting at the specified character pointer and any characters in the internal buffer into a sequence of bytes that are stored starting at the specified byte pointer. A parameter indicates whether to clear the internal state of the encoder after the conversion.

Parameters:

- `chars`: A pointer to the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: A pointer to the location at which to start writing the resulting sequence of bytes.
- `byteCount`: The maximum number of bytes to write.
- `flush`: `true` to clear the internal state of the encoder after the conversion; otherwise, `false`.

Returns: The actual number of bytes written at the location indicated by the `bytes` parameter.

Exceptions:

- `ArgumentNullException`: `chars` is `null` (`Nothing`).

-or-

`bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charCount` or `byteCount` is less than zero.
- `ArgumentException`: `byteCount` is less than the resulting number of bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoder.Fallback` is set to `EncoderExceptionFallback`.

To be added.

## Encoder.GetBytes(Char[], Int32, Int32, Byte[], Int32, Boolean) method

```csharp
public abstract int GetBytes (char[] chars, int charIndex, int charCount, byte[] bytes, int byteIndex, bool flush);
```

When overridden in a derived class, encodes a set of characters from the specified character array and any characters in the internal buffer into the specified byte array. A parameter indicates whether to clear the internal state of the encoder after the conversion.

Parameters:

- `chars`: The character array containing the set of characters to encode.
- `charIndex`: The index of the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: The byte array to contain the resulting sequence of bytes.
- `byteIndex`: The index at which to start writing the resulting sequence of bytes.
- `flush`: `true` to clear the internal state of the encoder after the conversion; otherwise, `false`.

Returns: The actual number of bytes written into `bytes`.

Exceptions:

- `ArgumentNullException`: `chars` is `null` (`Nothing`).

-or-

`bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `chars`.

-or-

`byteIndex` is not a valid index in `bytes`.
- `ArgumentException`: `bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoder.Fallback` is set to `EncoderExceptionFallback`.

#### Examples
The following example demonstrates how to encode a range of elements from a character array and store the encoded bytes in a range of elements in a byte array. The `Encoder.GetByteCount` method is used to determine the size of the array required by `Encoder.GetBytes`.

_Code sample not included: ~/snippets/csharp/System.Text/Encoder/GetBytes/getbytes-char[]-int32-int32-byte[]-int32.cs._

## Encoder.Reset() method

```csharp
public virtual void Reset ();
```

When overridden in a derived class, sets the encoder back to its initial state.

#### Remarks
This method clears the internal state of the `Encoder` object. The method clears any state information preserved from a previous call to `Encoder.GetBytes` or `Decoder.Convert`, including trailing characters at the end of the previous data block, such as an unmatched high surrogate.

Your application should call the `Reset` method if it wants to reuse the same encoder even after an exception is thrown by `Encoder.GetBytes` or `Encoder.GetByteCount`, or if the application switches streams.
