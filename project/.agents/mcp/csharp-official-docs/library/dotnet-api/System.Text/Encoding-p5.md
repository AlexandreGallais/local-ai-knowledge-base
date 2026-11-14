---
title: "Encoding class (part 5 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Encoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Encoding class (part 5 of 14)

## Encoding.Clone() method

```csharp
public virtual object Clone ();
```

When overridden in a derived class, creates a shallow copy of the current `Encoding` object.

Returns: A copy of the current `Encoding` object.

#### Remarks
The clone is writable even if the original `Encoding` object is read-only. Therefore, the properties of the clone can be modified.

A shallow copy of an object is a copy of the object only. If the object contains references to other objects, the shallow copy does not create copies of the referred objects. It refers to the original objects instead. In contrast, a deep copy of an object creates a copy of the object and a copy of everything directly or indirectly referenced by that object.

## Encoding.Convert(Encoding, Encoding, Byte[]) method

```csharp
public static byte[] Convert (System.Text.Encoding srcEncoding, System.Text.Encoding dstEncoding, byte[] bytes);
```

Converts an entire byte array from one encoding to another.

Parameters:

- `srcEncoding`: The encoding format of `bytes`.
- `dstEncoding`: The target encoding format.
- `bytes`: The bytes to convert.

Returns: An array of type `Byte` containing the results of converting `bytes` from `srcEncoding` to `dstEncoding`.

Exceptions:

- `ArgumentNullException`: `srcEncoding` is `null`.

-or-

`dstEncoding` is `null`.

-or-

`bytes` is `null`.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

**srcEncoding.** `Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

**dstEncoding.** `Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Examples
The following example converts a Unicode-encoded string to an ASCII-encoded string. Because the ASCII encoding object returned by the `ASCII` property uses replacement fallback and the Pi character is not part of the ASCII character set, the Pi character is replaced with a question mark, as the output from the example shows.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Overview/convert.cs._

## Encoding.Convert(Encoding, Encoding, Byte[], Int32, Int32) method

```csharp
public static byte[] Convert (System.Text.Encoding srcEncoding, System.Text.Encoding dstEncoding, byte[] bytes, int index, int count);
```

Converts a range of bytes in a byte array from one encoding to another.

Parameters:

- `srcEncoding`: The encoding of the source array, `bytes`.
- `dstEncoding`: The encoding of the output array.
- `bytes`: The array of bytes to convert.
- `index`: The index of the first element of `bytes` to convert.
- `count`: The number of bytes to convert.

Returns: An array of type `Byte` containing the result of converting a range of bytes in `bytes` from `srcEncoding` to `dstEncoding`.

Exceptions:

- `ArgumentNullException`: `srcEncoding` is `null`.

-or-

`dstEncoding` is `null`.

-or-

`bytes` is `null`.
- `ArgumentOutOfRangeException`: `index` and `count` do not specify a valid range in the byte array.
- `DecoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

**srcEncoding.** `Encoding.DecoderFallback` is set to `DecoderExceptionFallback`.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

**dstEncoding.** `Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

To be added.

## Encoding.CreateTranscodingStream(Stream, Encoding, Encoding, Boolean) method

```csharp
public static System.IO.Stream CreateTranscodingStream (System.IO.Stream innerStream, System.Text.Encoding innerStreamEncoding, System.Text.Encoding outerStreamEncoding, bool leaveOpen = false);
```

Creates a `Stream` that serves to transcode data between an inner `Encoding` and an outer `Encoding`, similar to `Encoding.Convert`.

Parameters:

- `innerStream`: The stream to wrap.
- `innerStreamEncoding`: The encoding associated with `innerStream`.
- `outerStreamEncoding`: The encoding associated with the `Stream` that's returned by this method.
- `leaveOpen`: `true` if disposing the `Stream` returned by this method should not dispose `innerStream`.

Returns: A stream that transcodes the contents of `innerStream` as `outerStreamEncoding`.

#### Remarks

The returned `Stream`'s `CanRead` and `CanWrite` properties will reflect whether `innerStream` is readable or writable. If `innerStream` is full-duplex, the returned `Stream` will be as well. However, the returned `Stream` is not seekable, even if `innerStream`'s `CanSeek` property returns `true`.

## Encoding.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified `Object` is equal to the current instance.

Parameters:

- `value`: The `Object` to compare with the current instance.

Returns: `true` if `value` is an instance of `Encoding` and is equal to the current instance; otherwise, `false`.

#### Remarks
Two instances of `Encoding` are considered equal if they correspond to the same code page and their `EncoderFallback` and `DecoderFallback` objects are equal. In particular, derived code pages all have a code page of 0 and their fallbacks are normally `null` (`Nothing` in Visual Basic .NET). Thus they are all considered equal to one another. One consequence is that when `Encoding.Equals` is used to populate a hash table, all derived encodings compare equal and fall into the same hash table slot.

#### Examples
The following example gets two instances of the same encoding (one by codepage and another by name), and checks their equality.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/Equals/equals.cs._

## Encoding.GetByteCount(Char[]) method

```csharp
public virtual int GetByteCount (char[] chars);
```

When overridden in a derived class, calculates the number of bytes produced by encoding all the characters in the specified character array.

Parameters:

- `chars`: The character array containing the characters to encode.

Returns: The number of bytes produced by encoding all the characters in the specified character array.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `EncoderFallbackException`: A fallback occurred (for more information, see Character Encoding in .NET)

-and-

`Encoding.EncoderFallback` is set to `EncoderExceptionFallback`.

#### Remarks
To calculate the exact array size required by `Encoding.GetBytes` to store the resulting bytes, call the `Encoding.GetByteCount` method. To calculate the maximum array size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used.

- If your app handles string inputs, you should use the string versions of the `Encoding.GetBytes` method.

- The Unicode character buffer version of `GetBytes` allows some fast techniques, particularly with multiple calls using the `Encoder` object or inserting into existing buffers. Bear in mind, however, that this method version is sometimes unsafe, since pointers are required.

- If your app must convert a large amount of data, you should reuse the output buffer. In this case, the `Encoding.GetBytes` version that supports byte arrays is the best choice.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output buffer is too small. For continuous encoding of a stream, this method is often the best choice.

#### Examples
The following example determines the number of bytes required to encode a character array, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/BigEndianUnicode/getbytes_chararr.cs._

## Encoding.GetByteCount(Char>) method

```csharp
public virtual int GetByteCount (ReadOnlySpan<char> chars);
```

When overridden in a derived class, calculates the number of bytes produced by encoding the characters in the specified character span.

Parameters:

- `chars`: The span of characters to encode.

Returns: The number of bytes produced by encoding the specified character span.

#### Remarks
To calculate the exact span size required by `Encoding.GetBytes` to store the resulting bytes, call the `Encoding.GetByteCount` method. To calculate the maximum span size, call the `Encoding.GetMaxByteCount` method. The `Encoding.GetByteCount` method generally allows allocation of less memory, while the `Encoding.GetMaxByteCount` method generally executes faster.

The `Encoding.GetByteCount` method determines how many bytes result in encoding a set of Unicode characters, and the `Encoding.GetBytes` method performs the actual encoding. The `Encoding.GetBytes` method expects discrete conversions, in contrast to the `Encoder.GetBytes` method, which handles multiple conversions on a single input stream.

Several versions of `Encoding.GetByteCount` and `Encoding.GetBytes` are supported. The following are some programming considerations for use of these methods:

- Your app might need to encode many input characters to a code page and process the characters using multiple calls. In this case, you probably need to maintain state between calls, taking into account the state that is persisted by the `Encoder` object being used.

- If your app handles span of characters inputs, the span version of `Encoding.GetBytes` is recommended.

- Consider using the `Encoder.Convert` method instead of `Encoding.GetByteCount`. The conversion method converts as much data as possible, and does throw an exception if the output span buffer is too small. For continuous encoding of a stream, this method is often the best choice.

## Encoding.GetByteCount(String) method

```csharp
public virtual int GetByteCount (string s);
```

When overridden in a derived class, calculates the number of bytes produced by encoding the characters in the specified string.

Parameters:

- `s`: The string containing the set of characters to encode.

Returns: The number of bytes produced by encoding the specified characters.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
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
The following example determines the number of bytes required to encode a string or a range in the string, encodes the characters, and displays the resulting bytes.

_Code sample not included: ~/snippets/csharp/System.Text/Encoding/GetByteCount/getbytes_string.cs._
