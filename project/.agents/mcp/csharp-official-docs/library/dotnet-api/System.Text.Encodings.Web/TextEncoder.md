---
title: "TextEncoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Encodings.Web/TextEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextEncoder class

Namespace: `System.Text.Encodings.Web`

```csharp
public abstract class TextEncoder
```

The base class of web encoders.

#### Remarks
TextEncoder subclasses can be used to do HTML encoding, URI encoding, and JavaScript encoding. Instances of such subclasses can be accessed using the `Default`, `Default`, and `Default` properties.

The source code for this type is available in the System.Text.Encodings.Web project on GitHub. Unit tests that can also serve as code examples are found in the System.Text.Encodings.Web/tests folder on GitHub.

## TextEncoder.TextEncoder() constructor

```csharp
protected TextEncoder ();
```

Initializes a new instance of the `TextEncoder` class.

To be added.

## TextEncoder.MaxOutputCharactersPerInputCharacter property

```csharp
public abstract int MaxOutputCharactersPerInputCharacter { get; }
```

Gets the maximum number of characters that this encoder can generate for each input code point.

Returns: The maximum number of characters.

To be added.

## TextEncoder.Encode(String) method

```csharp
public virtual string Encode (string value);
```

Encodes the supplied string and returns the encoded text as a new string.

Parameters:

- `value`: The string to encode.

Returns: The encoded string.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: The `TextEncoder.TryEncodeUnicodeScalar` method failed. The encoder does not implement `TextEncoder.MaxOutputCharactersPerInputCharacter` correctly.

To be added.

## TextEncoder.Encode(TextWriter, String) method

```csharp
public void Encode (System.IO.TextWriter output, string value);
```

Encodes the specified string to a `TextWriter` object.

Parameters:

- `output`: The stream to which to write the encoded text.
- `value`: The string to encode.

To be added.

## TextEncoder.Encode(TextWriter, Char[], Int32, Int32) method

```csharp
public virtual void Encode (System.IO.TextWriter output, char[] value, int startIndex, int characterCount);
```

Encodes characters from an array and writes them to a `TextWriter` object.

Parameters:

- `output`: The stream to which to write the encoded text.
- `value`: The array of characters to encode.
- `startIndex`: The array index of the first character to encode.
- `characterCount`: The number of characters in the array to encode.

Exceptions:

- `ArgumentNullException`: `output` is `null`.
- `ArgumentException`: The `TextEncoder.TryEncodeUnicodeScalar` method failed. The encoder does not implement `TextEncoder.MaxOutputCharactersPerInputCharacter` correctly.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is out of range.
- `ArgumentOutOfRangeException`: `characterCount` is out of range.

To be added.

## TextEncoder.Encode(TextWriter, String, Int32, Int32) method

```csharp
public virtual void Encode (System.IO.TextWriter output, string value, int startIndex, int characterCount);
```

Encodes a substring and writes it to a `TextWriter` object.

Parameters:

- `output`: The stream to which to write the encoded text.
- `value`: The string whose substring is to be encoded.
- `startIndex`: The index where the substring starts.
- `characterCount`: The number of characters in the substring.

Exceptions:

- `ArgumentNullException`: `output` is `null`.
- `ArgumentException`: The `TextEncoder.TryEncodeUnicodeScalar` method failed. The encoder does not implement `TextEncoder.MaxOutputCharactersPerInputCharacter` correctly.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is out of range.
- `ArgumentOutOfRangeException`: `characterCount` is out of range.

To be added.

## TextEncoder.Encode(Char>, Char>, Int32, Int32, Boolean) method

```csharp
public virtual System.Buffers.OperationStatus Encode (ReadOnlySpan<char> source, Span<char> destination, out int charsConsumed, out int charsWritten, bool isFinalBlock = true);
```

Encodes the supplied characters.

Parameters:

- `source`: A source buffer containing the characters to encode.
- `destination`: The destination buffer to which the encoded form of `source` will be written.
- `charsConsumed`: The number of characters consumed from the `source` buffer.
- `charsWritten`: The number of characters written to the `destination` buffer.
- `isFinalBlock`: `true` to indicate there is no further source data that needs to be encoded; otherwise, `false`.

Returns: An enumeration value that describes the result of the encoding operation.

#### Remarks

The buffers `source` and `destination` must not overlap.

## TextEncoder.EncodeUtf8(Byte>, Byte>, Int32, Int32, Boolean) method

```csharp
public virtual System.Buffers.OperationStatus EncodeUtf8 (ReadOnlySpan<byte> utf8Source, Span<byte> utf8Destination, out int bytesConsumed, out int bytesWritten, bool isFinalBlock = true);
```

Encodes the supplied UTF-8 text.

Parameters:

- `utf8Source`: A source buffer containing the UTF-8 text to encode.
- `utf8Destination`: The destination buffer to which the encoded form of `utf8Source` will be written.
- `bytesConsumed`: The number of bytes consumed from the `utf8Source` buffer.
- `bytesWritten`: The number of bytes written to the `utf8Destination` buffer.
- `isFinalBlock`: `true` to indicate there is no further source data that needs to be encoded; otherwise, `false`.

Returns: A status code that describes the result of the encoding operation.

#### Remarks

The `utf8Source` and `utf8Destination` buffers must not overlap.

## TextEncoder.FindFirstCharacterToEncode(Char*, Int32) method

```csharp
public abstract int FindFirstCharacterToEncode (char* text, int textLength);
```

Finds the index of the first character to encode.

Parameters:

- `text`: The text buffer to search.
- `textLength`: The number of characters in `text`.

Returns: The index of the first character to encode.

#### Remarks
This helper method is seldom called directly.

## TextEncoder.FindFirstCharacterToEncodeUtf8(Byte>) method

```csharp
public virtual int FindFirstCharacterToEncodeUtf8 (ReadOnlySpan<byte> utf8Text);
```

Finds the first element in a UTF-8 text input buffer that would be escaped by the current encoder instance.

Parameters:

- `utf8Text`: The UTF-8 text input buffer to search.

Returns: The index of the first element in `utf8Text` that would be escaped by the current encoder instance, or -1 if no data in `utf8Text` requires escaping.

To be added.

## TextEncoder.TryEncodeUnicodeScalar(Int32, Char*, Int32, Int32) method

```csharp
public abstract bool TryEncodeUnicodeScalar (int unicodeScalar, char* buffer, int bufferLength, out int numberOfCharactersWritten);
```

Encodes a Unicode scalar value and writes it to a buffer.

Parameters:

- `unicodeScalar`: A Unicode scalar value.
- `buffer`: A pointer to the buffer to which to write the encoded text.
- `bufferLength`: The length of the destination `buffer` in characters.
- `numberOfCharactersWritten`: When the method returns, indicates the number of characters written to the `buffer`.

Returns: `false` if `bufferLength` is too small to fit the encoded text; otherwise, returns `true`.

#### Remarks
This method is seldom called directly. One of the `TextEncoder.Encode` overloads should be used instead. Implementations of the `TextEncoder` class must be thread-safe and stateless.

## TextEncoder.WillEncode(Int32) method

```csharp
public abstract bool WillEncode (int unicodeScalar);
```

Determines if a given Unicode scalar value will be encoded.

Parameters:

- `unicodeScalar`: A Unicode scalar value.

Returns: `true` if the `unicodeScalar` value will be encoded by this encoder; otherwise, returns `false`.

To be added.
