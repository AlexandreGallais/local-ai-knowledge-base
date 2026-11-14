---
title: "Encoding class (part 8 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 8 of 14)

## Encoding.GetBytes(Char*, Int32, Byte*, Int32) method

```csharp
public virtual int GetBytes (char* chars, int charCount, byte* bytes, int byteCount);
```

When overridden in a derived class, encodes a set of characters starting at the specified character pointer into a sequence of bytes that are stored starting at the specified byte pointer.

Parameters:

- `chars`: A pointer to the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: A pointer to the location at which to start writing the resulting sequence of bytes.
- `byteCount`: The maximum number of bytes to write.

Returns: The actual number of bytes written at the location indicated by the `bytes` parameter.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.

-or-

`bytes` is `null`.
- `ArgumentOutOfRangeException`: `charCount` or `byteCount` is less than zero.
- `ArgumentException`: `byteCount` is less than the resulting number of bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `Encoding.GetBytes` requires to store the resulting bytes, call the `Encoding.GetByteCount` method. To calculate the maximum array size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` object provided by the `Encoding.GetDecoder` or the `Encoding.GetEncoder` method, respectively, of a derived class.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used. (For example, a character sequence that includes surrogate pairs might end with a high surrogate. The `Encoder` will remember that high surrogate so that it can be combined with a low surrogate at the beginning of a following call. `Encoding` won't be able to maintain the state, so the character will be sent to the `EncoderFallback`.)

- If your app handles string inputs, you should use the string version of `Encoding.GetBytes`.

- The Unicode character buffer version of `GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

## Encoding.GetBytes(Char[], Int32, Int32, Byte[], Int32) method

```csharp
public abstract int GetBytes (char[] chars, int charIndex, int charCount, byte[] bytes, int byteIndex);
```

When overridden in a derived class, encodes a set of characters from the specified character array into the specified byte array.

Parameters:

- `chars`: The character array containing the set of characters to encode.
- `charIndex`: The index of the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: The byte array to contain the resulting sequence of bytes.
- `byteIndex`: The index at which to start writing the resulting sequence of bytes.

Returns: The actual number of bytes written into `bytes`.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.

-or-

`bytes` is `null`.
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `chars`.

-or-

`byteIndex` is not a valid index in `bytes`.
- `ArgumentException`: `bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `Encoding.GetBytes` to store the resulting bytes, you should call the `Encoding.GetByteCount` method. To calculate the maximum array size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `Encoding.GetDecoder` method or the `Encoding.GetEncoder` method, respectively, of a derived class.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used. (For example, a character sequence that includes surrogate pairs might end with a high surrogate. The `Encoder` will remember that high surrogate so that it can be combined with a low surrogate at the beginning of a following call. `Encoding` won't be able to maintain the state, so the character will be sent to the `EncoderFallback`.)

- If your app handles string inputs, you should use the string version of `Encoding.GetBytes`.

- The Unicode character buffer version of `GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

#### Examples
The following example determines the number of bytes required to encode three characters from a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetByteCount/getbytes_chararric.cs._

## Encoding.GetBytes(String, Int32, Int32, Byte[], Int32) method

```csharp
public virtual int GetBytes (string s, int charIndex, int charCount, byte[] bytes, int byteIndex);
```

When overridden in a derived class, encodes a set of characters from the specified string into the specified byte array.

Parameters:

- `s`: The string containing the set of characters to encode.
- `charIndex`: The index of the first character to encode.
- `charCount`: The number of characters to encode.
- `bytes`: The byte array to contain the resulting sequence of bytes.
- `byteIndex`: The index at which to start writing the resulting sequence of bytes.

Returns: The actual number of bytes written into `bytes`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.

-or-

`bytes` is `null`.
- `ArgumentOutOfRangeException`: `charIndex` or `charCount` or `byteIndex` is less than zero.

-or-

`charIndex` and `charCount` do not denote a valid range in `s`.

-or-

`byteIndex` is not a valid index in `bytes`.
- `ArgumentException`: `bytes` does not have enough capacity from `byteIndex` to the end of the array to accommodate the resulting bytes.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `Encoding.GetBytes` to store the resulting bytes, you should call the `Encoding.GetByteCount` method. To calculate the maximum array size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `Encoding.GetDecoder` method or the `Encoding.GetEncoder` method, respectively, of a derived class.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used. (For example, a character sequence that includes surrogate pairs might end with a high surrogate. The `Encoder` will remember that high surrogate so that it can be combined with a low surrogate at the beginning of a following call. `Encoding` won't be able to maintain the state, so the character will be sent to the `EncoderFallback`.)

- If your app handles string inputs, you should use the string version of `Encoding.GetBytes`.

- The Unicode character buffer version of `GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

#### Examples
The following example determines the number of bytes required to encode a string or a range in the string, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetByteCount/getbytes_string.cs._
