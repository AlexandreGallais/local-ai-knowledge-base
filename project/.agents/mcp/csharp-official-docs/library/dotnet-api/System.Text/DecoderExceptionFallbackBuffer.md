---
title: "DecoderExceptionFallbackBuffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/DecoderExceptionFallbackBuffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecoderExceptionFallbackBuffer class

Namespace: `System.Text`

```csharp
public sealed class DecoderExceptionFallbackBuffer : System.Text.DecoderFallbackBuffer
```

Throws `DecoderFallbackException` when an encoded input byte sequence cannot be converted to a decoded output character. This class cannot be inherited.

#### Remarks
A common reason for an encoding or decoding operation to fail is if the underlying encoding class does not provide a mapping between a character and an equivalent byte sequence. If the input byte sequence cannot be converted to an output character, the decoding operation calls the `DecoderExceptionFallbackBuffer.Fallback` method, which throws `DecoderFallbackException`.

The `DecoderFallbackBuffer` class, which represents a data buffer used in a decoding operation, is the base class for the `DecoderExceptionFallbackBuffer` class. However, instead of a data buffer, the `DecoderExceptionFallbackBuffer` class represents a standard behavior in which an exception is thrown if a decoding operation fails. No actual data buffer exists, and the members designed to manipulate such a buffer do no significant work.

## DecoderExceptionFallbackBuffer.DecoderExceptionFallbackBuffer() constructor

```csharp
public DecoderExceptionFallbackBuffer ();
```

Initializes a new instance of the `DecoderExceptionFallbackBuffer` class.

To be added.

## DecoderExceptionFallbackBuffer.Remaining property

```csharp
public override int Remaining { get; }
```

Gets the number of characters in the current `DecoderExceptionFallbackBuffer` object that remain to be processed.

Returns: The return value is always zero.

A return value is defined, although it is unchanging, because this method implements an abstract method.

#### Remarks
Because `DecoderExceptionFallbackBuffer` has no actual exception data buffer, the `Remaining` property always returns zero.

## DecoderExceptionFallbackBuffer.Fallback(Byte[], Int32) method

```csharp
public override bool Fallback (byte[] bytesUnknown, int index);
```

Throws `DecoderFallbackException` when the input byte sequence cannot be decoded. The nominal return value is not used.

Parameters:

- `bytesUnknown`: An input array of bytes.
- `index`: The index position of a byte in the input.

Returns: None. No value is returned because the `DecoderExceptionFallbackBuffer.Fallback` method always throws an exception.

The nominal return value is `true`. A return value is defined, although it is unchanging, because this method implements an abstract method.

Exceptions:

- `DecoderFallbackException`: This method always throws an exception that reports the value and index position of the input byte that cannot be decoded.

#### Remarks
The `Encoding.GetBytes` and `Decoder.Convert` methods call `DecoderExceptionFallbackBuffer.Fallback` if they encounter an unknown byte in their input. In response, the `DecoderExceptionFallbackBuffer.Fallback` method always throws `DecoderFallbackException` and displays the input data. The `DecoderExceptionFallbackBuffer.Fallback` method nominally indicates whether an exception is thrown if an input byte sequence cannot be decoded.

## DecoderExceptionFallbackBuffer.GetNextChar() method

```csharp
public override char GetNextChar ();
```

Retrieves the next character in the exception data buffer.

Returns: The return value is always the Unicode character NULL (U+0000).

A return value is defined, although it is unchanging, because this method implements an abstract method.

#### Remarks
Because `DecoderExceptionFallbackBuffer` has no actual exception data buffer, the `DecoderExceptionFallbackBuffer.GetNextChar` method always returns the Unicode NULL character.

## DecoderExceptionFallbackBuffer.MovePrevious() method

```csharp
public override bool MovePrevious ();
```

Causes the next call to `DecoderExceptionFallbackBuffer.GetNextChar` to access the exception data buffer character position that is prior to the current position.

Returns: The return value is always `false`.

A return value is defined, although it is unchanging, because this method implements an abstract method.

#### Remarks
Because `DecoderExceptionFallbackBuffer` has no actual exception data buffer, the `DecoderExceptionFallbackBuffer.MovePrevious` method always returns `false`.
