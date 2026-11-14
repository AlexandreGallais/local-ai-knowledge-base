---
title: "DecoderFallbackBuffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/DecoderFallbackBuffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecoderFallbackBuffer class

Namespace: `System.Text`

```csharp
public abstract class DecoderFallbackBuffer
```

Provides a buffer that allows a fallback handler to return an alternate string to a decoder when it cannot decode an input byte sequence.

#### Remarks
An encoding defines a mapping between a Unicode character and an encoded sequence of bytes. A decoding operation, which converts an input byte sequence to an output character, fails if no mapping is defined for a particular byte sequence.

.NET provides a failure handling mechanism, called a fallback, if a conversion cannot be performed. All decoder fallback handlers must implement the following:

- A decoder fallback, which is represented by a class derived from the `DecoderFallback` class.

- A decoder fallback buffer, which is represented by a type derived from the `DecoderFallbackBuffer` class that can return a string to the conversion operation.

Fallbacks can use three strategies to handle conversion failures:

- Best-fit mapping. The decoder fallback buffer can return a string that represents a close approximation to the input byte sequence. .NET does not provide a public best-fit `DecoderFallbackBuffer` implementation.

- Replacement. The decoder fallback buffer can return a string, such as a question mark ("?"), that indicates that a byte sequence could not be decoded. In .NET, the `DecoderReplacementFallback` and `DecoderReplacementFallbackBuffer` classes provide a public replacement fallback buffer implementation. The constructor of the `DecoderReplacementFallback` class enables you to define the replacement string.

- Exception. The `DecoderFallbackBuffer` implementation throws an exception, which indicates that a byte sequence cannot be decoded, and terminates the decoding operation. In this case, the fallback handler must provide a `DecoderFallbackBuffer` implementation, although it does not return a string to the decoder. In .NET, the `DecoderExceptionFallback` and `DecoderExceptionFallbackBuffer` classes provide a public exception fallback implementation that throws a `DecoderFallbackException` when a byte sequence cannot be decoded.

The buffer in a `DecoderFallbackBuffer` implementation represents the entire string to be returned to the decoder in response to a decoder fallback. Generally, implementations also include state information, such as the index of the next character to return to the decoder and the number of remaining characters to be returned. Because `DecoderFallbackBuffer` is an abstract class, it requires derived classes to implement the following members at a minimum:

- The `DecoderFallbackBuffer.Fallback` method, which is called by the decoder when it cannot decode a byte sequence. The decoder passes two pieces of information to the fallback buffer implementation: an array containing the bytes that could not be decoded and the index of the first byte in the input byte array. In a decoder fallback exception handler, the exception is thrown in this method. Otherwise, the method returns `true` if it provides a fallback, or `false` if it does not.

- The `DecoderFallbackBuffer.GetNextChar` method, which is called repeatedly by the decoder if the `DecoderFallbackBuffer.Fallback` method returns `true`. In successive calls, the handler should return each character in its buffer. When it has returned all characters, it should return U+0000. An exception fallback handler always returns U+0000.

- The `DecoderFallbackBuffer.MovePrevious` method, which tries to move the pointer to the previous position in the buffer and indicates whether the move was successful. An exception handler always returns `false`.

- The `Remaining` property, which indicates the number of remaining characters to be returned to the decoder. An exception fallback handler always returns zero.

## DecoderFallbackBuffer.DecoderFallbackBuffer() constructor

```csharp
protected DecoderFallbackBuffer ();
```

Initializes a new instance of the `DecoderFallbackBuffer` class.

To be added.

## DecoderFallbackBuffer.Remaining property

```csharp
public abstract int Remaining { get; }
```

When overridden in a derived class, gets the number of characters in the current `DecoderFallbackBuffer` object that remain to be processed.

Returns: The number of characters in the current fallback buffer that have not yet been processed.

#### Remarks
The `DecoderFallbackBuffer.Fallback` method returns `true` if `DecoderFallbackBuffer.Remaining` is a nonzero value.

For an exception fallback handler, the `DecoderFallbackBuffer.Remaining` method should return zero.

## DecoderFallbackBuffer.Fallback(Byte[], Int32) method

```csharp
public abstract bool Fallback (byte[] bytesUnknown, int index);
```

When overridden in a derived class, prepares the fallback buffer to handle the specified input byte sequence.

Parameters:

- `bytesUnknown`: An input array of bytes.
- `index`: The index position of a byte in `bytesUnknown`.

Returns: `true` if the fallback buffer can process `bytesUnknown`; `false` if the fallback buffer ignores `bytesUnknown`.

#### Remarks

The `Encoding.GetChars`, `Encoding.GetString`, and `Decoder.Convert` methods call `DecoderFallbackBuffer.Fallback` if they encounter an unknown input byte sequence that cannot be decoded. A return value of `true` indicates that the fallback buffer can process the input byte sequence, which causes the calling method to call the `DecoderFallbackBuffer.GetNextChar` method to obtain each character of the fallback buffer. If called in an exception fallback handler, the `DecoderFallbackBuffer.Fallback` method throws an exception because it does not process individual bytes.

## DecoderFallbackBuffer.GetNextChar() method

```csharp
public abstract char GetNextChar ();
```

When overridden in a derived class, retrieves the next character in the fallback buffer.

Returns: The next character in the fallback buffer.

#### Remarks
A decoding operation calls the `DecoderFallbackBuffer.Fallback` method if the operation encounters an unknown byte sequence in the input. If the `DecoderFallbackBuffer.Fallback` method returns `true`, a substitute string exists that can be inserted in the output instead of decoding the unknown input. The decoding operation calls the `DecoderFallbackBuffer.GetNextChar` method repeatedly and obtains the substitute string one character at a time. When all characters in the fallback buffer have been returned to the decoder, the method should return U+0000.

For an exception fallback handler, the `DecoderFallbackBuffer.GetNextChar` method should return U+0000.

## DecoderFallbackBuffer.MovePrevious() method

```csharp
public abstract bool MovePrevious ();
```

When overridden in a derived class, causes the next call to the `DecoderFallbackBuffer.GetNextChar` method to access the data buffer character position that is prior to the current character position.

Returns: `true` if the `DecoderFallbackBuffer.MovePrevious` operation was successful; otherwise, `false`.

#### Remarks
An exception fallback handler should return `false`.

## DecoderFallbackBuffer.Reset() method

```csharp
public virtual void Reset ();
```

Initializes all data and state information pertaining to this fallback buffer.

To be added.
