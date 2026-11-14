---
title: "Encoder class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoder class

Namespace: `System.Text`

```csharp
public abstract class Encoder
```

Converts a set of characters into a sequence of bytes.

To obtain an instance of an implementation of the `Encoder` class, the application should use the `Encoding.GetEncoder` method of an `Encoding` implementation.

The `Encoder.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoder.GetBytes` method performs the actual encoding. There are several versions of both of these methods available in the `Encoder` class. For more information, see `Encoding.GetBytes`.

A `Encoder` object maintains state information between successive calls to `GetBytes` or `Decoder.Convert` methods so that it can correctly encode character sequences that span blocks. The `Encoder` also preserves trailing characters at the end of data blocks and uses the trailing characters in the next encoding operation. For example, a data block might end with an unmatched high surrogate, and the matching low surrogate might be in the next data block. Therefore, `Encoding.GetDecoder` and `Encoding.GetEncoder` are useful for network transmission and file operations, because those operations often deal with blocks of data instead of a complete data stream.

> **Note:**
> When the application is done with a stream of data it should make sure that the state information is flushed by setting the `flush` parameter to `true` in the appropriate method call. If an exception occurs or if the application switches streams, it should call `Encoder.Reset` to clear the internal state of the `Encoder` object.

The following example demonstrates how to convert an array of Unicode characters into blocks of bytes using a specified encoding. For comparison, the array of characters is first encoded using `UTF7Encoding`. Next, the array of characters is encoded using an `Encoder`.

_Code sample not included: ~/snippets/csharp/System.Text/Encoder/Overview/snippet.cs._

## Encoder.Encoder() constructor

```csharp
protected Encoder ();
```

Initializes a new instance of the `Encoder` class.

#### Remarks
To obtain an instance of an implementation of this class, the application should use the `Encoding.GetEncoder` method of an `Encoding` implementation.

#### Examples
The following example demonstrates two techniques for initializing a new `Encoder` instance.

_Code sample not included: ~/snippets/csharp/System.Text/Encoder/.ctor/ctor.cs._

## Encoder.Fallback property

```csharp
public System.Text.EncoderFallback? Fallback { get; set; }
```

Gets or sets a `EncoderFallback` object for the current `Encoder` object.

Returns: A `EncoderFallback` object.

Exceptions:

- `ArgumentNullException`: The value in a set operation is `null` (`Nothing`).
- `ArgumentException`: A new value cannot be assigned in a set operation because the current `EncoderFallbackBuffer` object contains data that has not been encoded yet.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoder.Fallback` is set to `EncoderExceptionFallback`.

#### Remarks
The `EncoderFallback` object represents an error handler that is invoked when a character cannot be converted into an encoded byte sequence.

## Encoder.FallbackBuffer property

```csharp
public System.Text.EncoderFallbackBuffer FallbackBuffer { get; }
```

Gets the `EncoderFallbackBuffer` object associated with the current `Encoder` object.

Returns: A `EncoderFallbackBuffer` object.

#### Remarks
The `Encoder.FallbackBuffer` object represents data used by the `EncoderFallback` object. The `EncoderFallback` object represents an error handler that is invoked when a character cannot be converted into an encoded byte sequence.

## Encoder.Convert(Char>, Byte>, Boolean, Int32, Int32, Boolean) method

```csharp
public virtual void Convert (ReadOnlySpan<char> chars, Span<byte> bytes, bool flush, out int charsUsed, out int bytesUsed, out bool completed);
```

Converts a span of Unicode characters to an encoded byte sequence and stores the result in another buffer.

Parameters:

- `chars`: The span of UTF-16 encoded characters to convert.
- `bytes`: The span buffer to store the converted bytes.
- `flush`: `true` to indicate no further data is to be converted; otherwise, `false`.
- `charsUsed`: When this method returns, contains the number of characters from `chars` that were used in the conversion. This parameter is passed uninitialized.
- `bytesUsed`: When this method returns, contains the number of bytes that were used in the conversion. This parameter is passed uninitialized.
- `completed`: When this method returns, contains `true` if all the characters in `chars` were converted; otherwise, `false`. This parameter is passed uninitialized.

#### Remarks
Remember that the `Encoder` object saves state between calls to `Encoder.Convert`. When the application is done with a stream of data, it should set the `flush` parameter to `true` to make sure that the state information is flushed. With this setting, the encoder ignores invalid bytes at the end of the data block and clears the internal buffer. Any remaining processed data that is part of a logical unit, such as the high surrogate of a surrogate pair, is converted according to the current fallback settings.

The `Convert` method is designed to be used in a loop to encode an arbitrary amount of input, such as data read from a file or stream. It stores the output of the encoding operation in a fixed-size buffer. `Encoder.GetBytes` will throw an exception if the output buffer isn't large enough, but `Encoder.Convert` will fill as much space as possible and return the chars read and bytes written. Also see the `Encoding.GetBytes` topic for more comments.

The `completed` output parameter indicates whether all the data in the input buffer was converted and stored in the output buffer. This parameter is set to `false` if the number of characters specified by the `charCount` parameter cannot be converted without exceeding the number of bytes specified by the `byteCount` parameter. In that situation, the application should use the contents of the output buffer or provide a new output buffer, increment the `chars` parameter by the number of characters specified by the `charsUsed` parameter, then call the `Convert` method again to process the remaining input.

The `completed` parameter can also be set to `false`, even though the `charsUsed` parameter and 'char' span length are equal. This situation occurs if there is still data in the `Encoder` object that has not been stored in the `chars` buffer.

## Encoder.Convert(Char*, Int32, Byte*, Int32, Boolean, Int32, Int32, Boolean) method

```csharp
public virtual void Convert (char* chars, int charCount, byte* bytes, int byteCount, bool flush, out int charsUsed, out int bytesUsed, out bool completed);
```

Converts a buffer of Unicode characters to an encoded byte sequence and stores the result in another buffer.

Parameters:

- `chars`: The address of a string of UTF-16 encoded characters to convert.
- `charCount`: The number of characters in `chars` to convert.
- `bytes`: The address of a buffer to store the converted bytes.
- `byteCount`: The maximum number of bytes in `bytes` to use in the conversion.
- `flush`: `true` to indicate no further data is to be converted; otherwise, `false`.
- `charsUsed`: When this method returns, contains the number of characters from `chars` that were used in the conversion. This parameter is passed uninitialized.
- `bytesUsed`: When this method returns, contains the number of bytes that were used in the conversion. This parameter is passed uninitialized.
- `completed`: When this method returns, contains `true` if all the characters specified by `charCount` were converted; otherwise, `false`. This parameter is passed uninitialized.

Exceptions:

- `ArgumentNullException`: `chars` or `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charCount` or `byteCount` is less than zero.
- `ArgumentException`: The output buffer is too small to contain any of the converted input. The output buffer should be greater than or equal to the size indicated by the `GetByteCount` method.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoder.Fallback` is set to `EncoderExceptionFallback`.

#### Remarks
Remember that the `Encoder` object saves state between calls to `Encoder.Convert`. When the application is done with a stream of data, it should set the `flush` parameter to `true` to make sure that the state information is flushed. With this setting, the encoder ignores invalid bytes at the end of the data block and clears the internal buffer. Any remaining processed data that is part of a logical unit, such as the high surrogate of a surrogate pair, is converted according to the current fallback settings.

The `Convert` method is designed to be used in a loop to encode an arbitrary amount of input, such as data read from a file or stream. It stores the output of the encoding operation in a fixed-size buffer. `Encoder.GetBytes` will throw an exception if the output buffer isn't large enough, but `Encoder.Convert` will fill as much space as possible and return the chars read and bytes written. Also see the `Encoding.GetBytes` topic for more comments.

The `completed` output parameter indicates whether all the data in the input buffer was converted and stored in the output buffer. This parameter is set to `false` if the number of characters specified by the `charCount` parameter cannot be converted without exceeding the number of bytes specified by the `byteCount` parameter. In that situation, the application should use the contents of the output buffer or provide a new output buffer, increment the `chars` parameter by the number of characters specified by the `charsUsed` parameter, then call the `Convert` method again to process the remaining input.

The `completed` parameter can also be set to `false`, even though the `charsUsed` and `charCount` parameters are equal. This situation occurs if there is still data in the `Encoder` object that has not been stored in the `chars` buffer.

## Encoder.Convert(Char[], Int32, Int32, Byte[], Int32, Int32, Boolean, Int32, Int32, Boolean) method

```csharp
public virtual void Convert (char[] chars, int charIndex, int charCount, byte[] bytes, int byteIndex, int byteCount, bool flush, out int charsUsed, out int bytesUsed, out bool completed);
```

Converts an array of Unicode characters to an encoded byte sequence and stores the result in an array of bytes.

Parameters:

- `chars`: An array of characters to convert.
- `charIndex`: The first element of `chars` to convert.
- `charCount`: The number of elements of `chars` to convert.
- `bytes`: An array where the converted bytes are stored.
- `byteIndex`: The first element of `bytes` in which data is stored.
- `byteCount`: The maximum number of elements of `bytes` to use in the conversion.
- `flush`: `true` to indicate no further data is to be converted; otherwise, `false`.
- `charsUsed`: When this method returns, contains the number of characters from `chars` that were used in the conversion. This parameter is passed uninitialized.
- `bytesUsed`: When this method returns, contains the number of bytes that were produced by the conversion. This parameter is passed uninitialized.
- `completed`: When this method returns, contains `true` if all the characters specified by `charCount` were converted; otherwise, `false`. This parameter is passed uninitialized.

Exceptions:

- `ArgumentNullException`: `chars` or `bytes` is `null` (`Nothing`).
- `ArgumentOutOfRangeException`: `charIndex`, `charCount`, `byteIndex`, or `byteCount` is less than zero.

-or-

The length of `chars` - `charIndex` is less than `charCount`.

-or-

The length of `bytes` - `byteIndex` is less than `byteCount`.
- `ArgumentException`: The output buffer is too small to contain any of the converted input. The output buffer should be greater than or equal to the size indicated by the `GetByteCount` method.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoder.Fallback` is set to `EncoderExceptionFallback`.

#### Remarks
Remember that the `Encoder` object saves state between calls to `Encoder.Convert`. When the application is done with a stream of data, it should set the `flush` parameter to `true` to make sure that the state information is flushed. With this setting, the encoder ignores invalid bytes at the end of the data block and clears the internal buffer. Any remaining processed data that is part of a logical unit, such as the high surrogate of a surrogate pair, is converted according to the current fallback settings.

The `Convert` method is designed to be used in a loop to encode an arbitrary amount of input, such as data read from a file or stream. It stores the output of the encoding operation in a fixed-size buffer. `Encoder.GetBytes` will throw an exception if the output buffer isn't large enough, but `Encoder.Convert` will fill as much space as possible and return the chars read and bytes written. Also see the `Encoding.GetBytes` article for more comments.

The `completed` output parameter indicates whether all the data in the input buffer was converted and stored in the output buffer. This parameter is set to `false` if the number of characters specified by the `charCount` parameter cannot be converted without exceeding the number of bytes specified by the `byteCount` parameter. In that situation, the application should use the contents of the output buffer or provide a new output buffer, increment the `chars` parameter by the number of characters specified by the `charsUsed` parameter, then call the `Convert` method again to process the remaining input.

The `completed` parameter can also be set to `false`, even though the `charsUsed` and `charCount` parameters are equal. This situation occurs if there is still data in the `Encoder` object that has not been stored in the `chars` buffer.

#### Examples
The following example uses the `Encoder.Convert` method to convert a file of UTF-16 characters to UTF-8, then uses the `Decoder.Convert` method to convert the UTF-8 characters back to UTF-16 characters.

_Code sample not included: ~/snippets/csharp/System.Text/Decoder/Convert/edCvt.cs._
