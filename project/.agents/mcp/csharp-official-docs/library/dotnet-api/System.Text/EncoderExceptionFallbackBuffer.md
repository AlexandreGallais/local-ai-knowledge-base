---
title: "EncoderExceptionFallbackBuffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncoderExceptionFallbackBuffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderExceptionFallbackBuffer class

Namespace: `System.Text`

```csharp
public sealed class EncoderExceptionFallbackBuffer : System.Text.EncoderFallbackBuffer
```

Throws `EncoderFallbackException` when an input character cannot be converted to an encoded output byte sequence. This class cannot be inherited.

#### Remarks
A common reason for an encoding or decoding operation to fail is if the underlying encoding class does not provide a mapping between a character and an equivalent byte sequence. If the input character cannot be converted to an output byte sequence, the encoding operation calls the `EncoderExceptionFallbackBuffer.Fallback` method, which throws `EncoderFallbackException`.

The `EncoderFallbackBuffer` class, which represents a data buffer used in an encoding operation, is the base class for the `EncoderExceptionFallbackBuffer` class. However, instead of a data buffer, the `EncoderExceptionFallbackBuffer` class represents a standard behavior wherein an exception is thrown if an encoding operation fails. No actual data buffer exists, and the members designed to manipulate such a buffer do no significant work.

## EncoderExceptionFallbackBuffer.EncoderExceptionFallbackBuffer() constructor

```csharp
public EncoderExceptionFallbackBuffer ();
```

Initializes a new instance of the `EncoderExceptionFallbackBuffer` class.

To be added.

## EncoderExceptionFallbackBuffer.Remaining property

```csharp
public override int Remaining { get; }
```

Gets the number of characters in the current `EncoderExceptionFallbackBuffer` object that remain to be processed.

Returns: The return value is always zero.

A return value is defined, although it is unchanging, because this method implements an abstract method.

#### Remarks
Because `EncoderExceptionFallbackBuffer` has no actual exception data buffer, the `Remaining` property always returns zero.

## EncoderExceptionFallbackBuffer.Fallback(Char, Int32) method

```csharp
public override bool Fallback (char charUnknown, int index);
```

Throws an exception because the input character cannot be encoded. Parameters specify the value and index position of the character that cannot be converted.

Parameters:

- `charUnknown`: An input character.
- `index`: The index position of the character in the input buffer.

Returns: None. No value is returned because the `EncoderExceptionFallbackBuffer.Fallback` method always throws an exception.

Exceptions:

- `EncoderFallbackException`: `charUnknown` cannot be encoded. This method always throws an exception that reports the value of the `charUnknown` and `index` parameters.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `EncoderExceptionFallbackBuffer.Fallback` if they encounter an unknown character in their input. In response, `EncoderExceptionFallbackBuffer.Fallback` always throws `EncoderFallbackException`.

## EncoderExceptionFallbackBuffer.Fallback(Char, Char, Int32) method

```csharp
public override bool Fallback (char charUnknownHigh, char charUnknownLow, int index);
```

Throws an exception because the input character cannot be encoded. Parameters specify the value and index position of the surrogate pair in the input, and the nominal return value is not used.

Parameters:

- `charUnknownHigh`: The high surrogate of the input pair.
- `charUnknownLow`: The low surrogate of the input pair.
- `index`: The index position of the surrogate pair in the input buffer.

Returns: None. No value is returned because the `EncoderExceptionFallbackBuffer.Fallback` method always throws an exception.

Exceptions:

- `EncoderFallbackException`: The character represented by `charUnknownHigh` and `charUnknownLow` cannot be encoded.
- `ArgumentOutOfRangeException`: Either `charUnknownHigh` or `charUnknownLow` is invalid. `charUnknownHigh` is not between U+D800 and U+DBFF, inclusive, or `charUnknownLow` is not between U+DC00 and U+DFFF, inclusive.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `EncoderExceptionFallbackBuffer.Fallback` if they encounter a surrogate pair in their input. In response, `EncoderExceptionFallbackBuffer.Fallback` always throws an exception.

## EncoderExceptionFallbackBuffer.GetNextChar() method

```csharp
public override char GetNextChar ();
```

Retrieves the next character in the exception fallback buffer.

Returns: The return value is always the Unicode character, NULL (U+0000).

A return value is defined, although it is unchanging, because this method implements an abstract method.

#### Remarks
Because `EncoderExceptionFallbackBuffer` has no actual exception data buffer, the `EncoderExceptionFallbackBuffer.GetNextChar` method always returns the Unicode NULL character.

## EncoderExceptionFallbackBuffer.MovePrevious() method

```csharp
public override bool MovePrevious ();
```

Causes the next call to the `EncoderExceptionFallbackBuffer.GetNextChar` method to access the exception data buffer character position that is prior to the current position.

Returns: The return value is always `false`.

A return value is defined, although it is unchanging, because this method implements an abstract method.

#### Remarks
Because `EncoderExceptionFallbackBuffer` has no actual exception data buffer, the `EncoderExceptionFallbackBuffer.MovePrevious` method always returns `false`.
