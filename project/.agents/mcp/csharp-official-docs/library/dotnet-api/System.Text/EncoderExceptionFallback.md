---
title: "EncoderExceptionFallback class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncoderExceptionFallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderExceptionFallback class

Namespace: `System.Text`

```csharp
public sealed class EncoderExceptionFallback : System.Text.EncoderFallback
```

Provides a failure-handling mechanism, called a fallback, for an input character that cannot be converted to an output byte sequence. The fallback throws an exception if an input character cannot be converted to an output byte sequence. This class cannot be inherited.

#### Remarks
An encoding maps a Unicode character to an encoded sequence of bytes, which can subsequently be transferred to a physical medium, such as a disk, or over a communications link. Characters can be mapped in various ways, and a particular encoding is represented by a type derived from the `Encoding` class. Specifically, the encoding type's `GetBytes` method encodes a character to a byte sequence, and the `GetChars` method decodes a byte sequence to a character.

An encoding operation can fail if the input character cannot be represented by the encoding. For example, a `ASCIIEncoding` object cannot encode a character that yields a Unicode code point value that is outside the range U+0000 to U+007F.

In cases where an encoding or decoding conversion cannot be performed, .NET provides a failure-handling mechanism called a fallback. Your application can use the predefined .NET encoder fallback, or it can create a custom encoder fallback derived from the `EncoderFallback` and `EncoderFallbackBuffer` classes.

.NET provides two predefined classes that implement different fallback strategies for handling encoding conversion failures. The `EncoderReplacementFallback` class substitutes a string provided for any input character that cannot be converted. The substitute string is encoded in place of the invalid character, and then the encoding operation continues converting the remainder of the input. In contrast, the `EncoderExceptionFallback` class throws a `EncoderFallbackException` when an invalid character is encountered.

#### Examples
The following code example demonstrates the `EncoderExceptionFallback` and `EncoderFallbackException` classes.

_Code sample not included: ~/snippets/csharp/System.Text/EncoderExceptionFallback/Overview/fallEncExc.cs._

## EncoderExceptionFallback.EncoderExceptionFallback() constructor

```csharp
public EncoderExceptionFallback ();
```

Initializes a new instance of the `EncoderExceptionFallback` class.

To be added.

## EncoderExceptionFallback.MaxCharCount property

```csharp
public override int MaxCharCount { get; }
```

Gets the maximum number of characters this instance can return.

Returns: The return value is always zero.

To be added.

## EncoderExceptionFallback.CreateFallbackBuffer() method

```csharp
public override System.Text.EncoderFallbackBuffer CreateFallbackBuffer ();
```

Returns an encoder fallback buffer that throws an exception if it cannot convert a character sequence to a byte sequence.

Returns: An encoder fallback buffer that throws an exception when it cannot encode a character sequence.

#### Remarks
An encoder fallback buffer is responsible for receiving and handling characters that an encoder cannot convert to a byte sequence. This method returns an instance of the `EncoderExceptionFallbackBuffer` class, which is a subclass of  the `EncoderFallbackBuffer` class. An `EncoderExceptionFallbackBuffer` object throws an `EncoderFallbackException` exception whenever characters are passed to its `EncoderExceptionFallbackBuffer.Fallback` method.

## EncoderExceptionFallback.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether the current `EncoderExceptionFallback` object and a specified object are equal.

Parameters:

- `value`: An object that derives from the `EncoderExceptionFallback` class.

Returns: `true` if `value` is not `null` (`Nothing` in Visual Basic .NET) and is a `EncoderExceptionFallback` object; otherwise, `false`.

To be added.

## EncoderExceptionFallback.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Retrieves the hash code for this instance.

Returns: The return value is always the same arbitrary value, and has no special significance.

#### Remarks
Because the `EncoderExceptionFallback.GetHashCode` method always returns the same value, the application should not use this value to distinguish one instance of the `EncoderExceptionFallback` class from another.
