---
title: "Encoding class (part 6 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 6 of 14)

## Encoding.GetByteCount(Char*, Int32) method

```csharp
public virtual int GetByteCount (char* chars, int count);
```

When overridden in a derived class, calculates the number of bytes produced by encoding a set of characters starting at the specified character pointer.

Parameters:

- `chars`: A pointer to the first character to encode.
- `count`: The number of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `count` is less than zero.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size that `Encoding.GetBytes` requires to store the resulting bytes, you should call the `Encoding.GetByteCount` method. To calculate the maximum array size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

The `GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some considerations for using these methods:

- Your app may need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used.

- If your app handles string inputs, you should use the string version of the `Encoding.GetBytes` method.

- The Unicode character buffer version of `Encoding.GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

## Encoding.GetByteCount(Char[], Int32, Int32) method

```csharp
public abstract int GetByteCount (char[] chars, int index, int count);
```

When overridden in a derived class, calculates the number of bytes produced by encoding a set of characters from the specified character array.

Parameters:

- `chars`: The character array containing the set of characters to encode.
- `index`: The index of the first character to encode.
- `count`: The number of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.

-or-

`index` and `count` do not denote a valid range in `chars`.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `Encoding.GetBytes` to store the resulting bytes, call the `Encoding.GetByteCount` method. To calculate the maximum array size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used.

- If your app handles string inputs, the string version of `Encoding.GetBytes` is recommended.

- The Unicode character buffer version of `GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

#### Examples
The following example determines the number of bytes required to encode three characters from a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetByteCount/getbytes_chararric.cs._

## Encoding.GetByteCount(String, Int32, Int32) method

```csharp
public int GetByteCount (string s, int index, int count);
```

When overridden in a derived class, calculates the number of bytes produced by encoding a set of characters from the specified string.

Parameters:

- `s`: The string containing the set of characters to encode.
- `index`: The index of the first character to encode.
- `count`: The number of characters to encode.

Returns: The number of bytes produced by encoding the string.

#### Remarks
To calculate the exact array size required by `Encoding.GetBytes` to store the resulting bytes, call the `Encoding.GetByteCount` method. To calculate the maximum array size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used.

- If your app handles string inputs, the string version of `Encoding.GetBytes` is recommended.

- The Unicode character buffer version of `GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

#### Examples
The following example determines the number of bytes required to encode three characters from a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetByteCount/getbytes_chararric.cs._

## Encoding.GetBytes(Char[]) method

```csharp
public virtual byte[] GetBytes (char[] chars);
```

When overridden in a derived class, encodes all the characters in the specified character array into a sequence of bytes.

Parameters:

- `chars`: The character array containing the characters to encode.

Returns: A byte array containing the results of encoding the specified set of characters.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
If the data to be converted is available only in sequential blocks (such as data read from a stream) or if the amount of data is so large that it needs to be divided into smaller blocks, you should use the `Decoder` or the `Encoder` provided by the `Encoding.GetDecoder` method or the `Encoding.GetEncoder` method, respectively, of a derived class.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used. (For example, a character sequence that includes surrogate pairs might end with a high surrogate. The `Encoder` will remember that high surrogate so that it can be combined with a low surrogate at the beginning of a following call. `Encoding` won't be able to maintain the state, so the character will be sent to the `EncoderFallback`.)

- If your app handles string inputs, you should call the string version of the `Encoding.GetBytes` method.

- The Unicode character buffer version of `GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, it should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

#### Examples
The following example determines the number of bytes required to encode a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/getbytes_chararr.cs._
