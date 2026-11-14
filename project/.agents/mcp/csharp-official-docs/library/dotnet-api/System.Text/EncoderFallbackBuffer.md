---
title: "EncoderFallbackBuffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncoderFallbackBuffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderFallbackBuffer class

Namespace: `System.Text`

```csharp
public abstract class EncoderFallbackBuffer
```

Provides a buffer that allows a fallback handler to return an alternate string to an encoder when it cannot encode an input character.

#### Remarks
An encoding defines a mapping between a Unicode character and an encoded sequence of bytes. An encoding operation, which converts an input character to an output byte sequence, fails if no mapping is defined for a particular character.

.NET provides a failure handling mechanism, called a fallback, if a conversion cannot be performed. All encoder fallback handlers must implement the following:

- An encoder fallback, which is represented by a class derived from the `EncoderFallback` class.

- An encoder fallback buffer, which is represented by a type derived from the `EncoderFallbackBuffer` class that can return a string to the conversion operation.

Fallbacks can use three strategies to handle conversion failures:

- Best-fit mapping. The encoder fallback buffer can return a string that represents a close approximation to the input character. .NET does not provide a public best-fit `EncoderFallbackBuffer` implementation.

- Replacement. The encoder fallback buffer can return a string, such as a question mark ("?"), that indicates that a character could not be encoded. In .NET, the `EncoderReplacementFallback` and `EncoderReplacementFallbackBuffer` classes provide a public replacement fallback buffer implementation. The constructor of the `EncoderReplacementFallback` class enables you to define the replacement string.

- Exception. The `EncoderFallbackBuffer` implementation throws an exception, which indicates that a character cannot be encoded, and terminates the encoding operation. In this case, the fallback handler must provide an `EncoderFallbackBuffer` implementation, although it does not return a string to the encoder. In .NET, the `EncoderExceptionFallback` and `EncoderExceptionFallbackBuffer` classes provide a public exception fallback implementation that throws an `EncoderFallbackException` when a character cannot be encoded.

The buffer in an `EncoderFallbackBuffer` implementation represents the entire string to be returned to the encoder in response to an encoder fallback. Generally, implementations also include state information, such as the index of the next character to return to the encoder and the number of remaining characters to be returned. Because `EncoderFallbackBuffer` is an abstract class, it requires derived classes to implement the following members at a minimum:

- The overloaded `EncoderFallbackBuffer.Fallback` method, which is called by the encoder when it cannot encode a character. The encoder passes two pieces of information to the fallback buffer implementation: the character or surrogate pair that could not be encoded and the index of the character in the input. In an encoder fallback exception handler, the exception is thrown in this method. Otherwise, the method returns `true` if it provides a fallback, or `false` if it does not.

- The `EncoderFallbackBuffer.GetNextChar` method, which is called repeatedly by the encoder if the `EncoderFallbackBuffer.Fallback` method returns `true`. In successive calls, the handler should return each character in its buffer. When it has returned all characters, it should return U+0000. An exception handler always returns U+0000.

- The `EncoderFallbackBuffer.MovePrevious` method, which tries to move the pointer to the previous position in the buffer and indicates whether the move was successful. An exception handler always returns `false`.

- The `Remaining` property, which indicates the number of remaining characters to be returned to the encoder. An exception fallback handler always returns zero.

## EncoderFallbackBuffer.EncoderFallbackBuffer() constructor

```csharp
protected EncoderFallbackBuffer ();
```

Initializes a new instance of the `EncoderFallbackBuffer` class.

To be added.

## EncoderFallbackBuffer.Remaining property

```csharp
public abstract int Remaining { get; }
```

When overridden in a derived class, gets the number of characters in the current `EncoderFallbackBuffer` object that remain to be processed.

Returns: The number of characters in the current fallback buffer that have not yet been processed.

#### Remarks
The `EncoderFallbackBuffer.Fallback` method returns `true` if `EncoderFallbackBuffer.Remaining` is a nonzero value.

For an exception fallback handler, the `DecoderFallbackBuffer.Remaining` method should return zero.

## EncoderFallbackBuffer.Fallback(Char, Int32) method

```csharp
public abstract bool Fallback (char charUnknown, int index);
```

When overridden in a derived class, prepares the fallback buffer to handle the specified input character.

Parameters:

- `charUnknown`: An input character.
- `index`: The index position of the character in the input buffer.

Returns: `true` if the fallback buffer can process `charUnknown`; `false` if the fallback buffer ignores `charUnknown`.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `Fallback` if they encounter an unknown input character that cannot be encoded. A return value of `true` indicates that the fallback buffer can process the input character, which causes the calling method to call the `EncoderFallbackBuffer.GetNextChar` method to obtain each character of the fallback buffer. Because it does not process individual characters, the `EncoderFallbackBuffer.Fallback` method in an exception fallback handler throws an exception.

## EncoderFallbackBuffer.Fallback(Char, Char, Int32) method

```csharp
public abstract bool Fallback (char charUnknownHigh, char charUnknownLow, int index);
```

When overridden in a derived class, prepares the fallback buffer to handle the specified surrogate pair.

Parameters:

- `charUnknownHigh`: The high surrogate of the input pair.
- `charUnknownLow`: The low surrogate of the input pair.
- `index`: The index position of the surrogate pair in the input buffer.

Returns: `true` if the fallback buffer can process `charUnknownHigh` and `charUnknownLow`; `false` if the fallback buffer ignores the surrogate pair.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `Fallback` if they encounter a surrogate pair in their input. A return value of `true` indicates that the fallback buffer can process the surrogate pair, which causes the calling method to call the `EncoderFallbackBuffer.GetNextChar` method to obtain each character of the fallback buffer.  Because it does not process individual characters, the `EncoderFallbackBuffer.Fallback` method in an exception fallback handler throws an exception.

## EncoderFallbackBuffer.GetNextChar() method

```csharp
public abstract char GetNextChar ();
```

When overridden in a derived class, retrieves the next character in the fallback buffer.

Returns: The next character in the fallback buffer.

#### Remarks
An encoding operation calls the `EncoderFallbackBuffer.Fallback` method if the operation encounters an unknown character or surrogate pair in the input. For example, in the case of a replacement fallback, if the `EncoderFallbackBuffer.Fallback` method returns `true`, a substitute string exists that can be encoded instead of the unknown input. The encoding operation calls the `EncoderFallbackBuffer.GetNextChar` method repeatedly and obtains the substitute string one character at a time. When all characters in the fallback buffer have been returned to the encoder, the `EncoderFallbackBuffer.GetNextChar` method should return U+0000.

For an exception fallback handler, the `EncoderFallbackBuffer.GetNextChar` method should return U+0000.

## EncoderFallbackBuffer.MovePrevious() method

```csharp
public abstract bool MovePrevious ();
```

When overridden in a derived class, causes the next call to the `EncoderFallbackBuffer.GetNextChar` method to access the data buffer character position that is prior to the current character position.

Returns: `true` if the `EncoderFallbackBuffer.MovePrevious` operation was successful; otherwise, `false`.

#### Remarks
An exception fallback handler should return `false`.

## EncoderFallbackBuffer.Reset() method

```csharp
public virtual void Reset ();
```

Initializes all data and state information pertaining to this fallback buffer.

To be added.
