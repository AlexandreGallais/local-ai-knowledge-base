---
title: "DecoderExceptionFallback class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/DecoderExceptionFallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecoderExceptionFallback class

Namespace: `System.Text`

```csharp
public sealed class DecoderExceptionFallback : System.Text.DecoderFallback
```

Provides a failure-handling mechanism, called a fallback, for an encoded input byte sequence that cannot be converted to an input character. The fallback throws an exception instead of decoding the input byte sequence. This class cannot be inherited.

#### Remarks
An encoding maps a Unicode character to an encoded sequence of bytes, which can subsequently be transferred to a physical medium, such as a disk, or over a communications link. Characters can be mapped in various ways, and a particular encoding is represented by a type derived from the `Encoding` class. Specifically, the encoding type's `GetBytes` method encodes a character to a byte sequence, and the `GetChars` method decodes a byte sequence to a character.

A decoding operation can fail if the input byte sequence cannot be mapped by the encoding. For example, an `ASCIIEncoding` object cannot decode a byte sequence that yields a character having a code point value that is outside the range U+0000 to U+007F.

In cases where an encoding or decoding conversion cannot be performed, .NET provides a failure-handling mechanism called a fallback. Your application can use the predefined decoder fallback, or it can create a custom decoder fallback derived from the `DecoderFallback` and `DecoderFallbackBuffer` classes.

.NET provides two predefined classes that implement different fallback strategies for handling decoding conversion failures. The `DecoderReplacementFallback` class substitutes a string provided in place of any input byte sequence that cannot be converted. After the substitute string is emitted, the decoding operation continues converting the remainder of the input. In contrast, the `DecoderExceptionFallback` class throws a `DecoderFallbackException` when an invalid byte sequence is encountered.

#### Examples
The following code example demonstrates the `DecoderExceptionFallback` and `DecoderFallbackException` classes.

_Code sample not included: ~/snippets/csharp/System.Text/DecoderExceptionFallback/Overview/fallDecExc.cs._

## DecoderExceptionFallback.DecoderExceptionFallback() constructor

```csharp
public DecoderExceptionFallback ();
```

Initializes a new instance of the `DecoderExceptionFallback` class.

To be added.

## DecoderExceptionFallback.MaxCharCount property

```csharp
public override int MaxCharCount { get; }
```

Gets the maximum number of characters this instance can return.

Returns: The return value is always zero.

To be added.

## DecoderExceptionFallback.CreateFallbackBuffer() method

```csharp
public override System.Text.DecoderFallbackBuffer CreateFallbackBuffer ();
```

Returns a decoder fallback buffer that throws an exception if it cannot convert a sequence of bytes to a character.

Returns: A decoder fallback buffer that throws an exception when it cannot decode a byte sequence.

#### Remarks
A decoder fallback buffer is responsible for receiving and handling byte sequences that a decoder cannot convert to characters. This method returns an instance of the `DecoderExceptionFallbackBuffer` class, which is a subclass of  the `DecoderFallbackBuffer` class. A `DecoderExceptionFallbackBuffer` object throws an `DecoderFallbackException` exception whenever a sequence of bytes is passed to its `DecoderExceptionFallbackBuffer.Fallback` method.

## DecoderExceptionFallback.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether the current `DecoderExceptionFallback` object and a specified object are equal.

Parameters:

- `value`: An object that derives from the `DecoderExceptionFallback` class.

Returns: `true` if `value` is not `null` and is a `DecoderExceptionFallback` object; otherwise, `false`.

To be added.

## DecoderExceptionFallback.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Retrieves the hash code for this instance.

Returns: The return value is always the same arbitrary value, and has no special significance.

#### Remarks
Because the `DecoderExceptionFallback.GetHashCode` method always returns the same value, the application should not use this value to distinguish one `DecoderExceptionFallback` object from another.
