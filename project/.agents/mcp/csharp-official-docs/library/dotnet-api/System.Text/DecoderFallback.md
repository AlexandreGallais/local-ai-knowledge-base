---
title: "DecoderFallback class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/DecoderFallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecoderFallback class

Namespace: `System.Text`

```csharp
public abstract class DecoderFallback
```

Provides a failure-handling mechanism, called a fallback, for an encoded input byte sequence that cannot be converted to an output character.

#### Remarks
An encoding maps a Unicode character to an encoded sequence of bytes. A particular encoding is represented by a type that is derived from the `Encoding` class. Specifically, a character is encoded to a byte sequence by calling the encoding type's `Encoding.GetBytes` method, and the byte sequence is decoded to a character array or a string by calling the `Encoding.GetChars` or `Encoding.GetString` method.

A decoding operation can fail if the input byte sequence cannot be mapped by the encoding. For example, an `ASCIIEncoding` object cannot decode a byte sequence if that sequence represents a character that has a code point value that is outside the range U+0000 to U+007F.

When a decoding conversion cannot be performed, .NET provides a failure-handling mechanism called a fallback. Your application can use predefined .NET decoder fallbacks, or it can create a custom decoder fallback derived from the `DecoderFallback` and `DecoderFallbackBuffer` classes.

`DecoderFallback` and `DecoderFallbackBuffer` are the base classes for all decoding fallback handlers in .NET. They support the following three kinds of fallback handling mechanisms:

- Best-fit fallback, which maps valid Unicode characters that cannot be decoded to an approximate equivalent. For example, a best-fit fallback handler for the `ASCIIEncoding` class might map Æ (U+00C6) to AE (U+0041 + U+0045). A best-fit fallback handler might also be implemented to transliterate one alphabet (such as Cyrillic) to another (such as Latin or Roman). .NET does not provide any public best-fit fallback implementations.

- Replacement fallback, which replaces each character that cannot be decoded with a predefined string. .NET provides a predefined replacement fallback handler. The `DecoderReplacementFallback` class replaces each byte sequence that cannot be decoded with a question mark character ("?", or U+003F) or a REPLACEMENT CHARACTER (U+FFFD). You can customize the replacement string by specifying a substitute in the call to the `%23ctor` constructor. After the substitute string is emitted, the decoding operation continues converting the remainder of the input.

- Exception fallback, which throws an exception when a byte sequence cannot be decoded. .NET provides a predefined exception fallback handler. The `DecoderExceptionFallback` class throws a `DecoderFallbackException` when an invalid byte sequence is encountered, and the decoding operation terminates.

If you choose to implement a custom solution, you must override the following abstract members of the `DecoderFallback` class:

- The `DecoderFallback.CreateFallbackBuffer` method, which returns a class instance derived from `DecoderFallbackBuffer`. Depending on the type of fallback handler that you are developing, the `DecoderFallbackBuffer` implementation is responsible for performing the mapping or replacement, or for throwing the exception.

- The `MaxCharCount` property, which returns the maximum number of characters that the fallback implementation can return. For an exception fallback handler, its value should be zero.

For more information about encoding, decoding, and fallback strategies, see Character Encoding in .NET.

## DecoderFallback.DecoderFallback() constructor

```csharp
protected DecoderFallback ();
```

Initializes a new instance of the `DecoderFallback` class.

To be added.

## DecoderFallback.ExceptionFallback property

```csharp
public static System.Text.DecoderFallback ExceptionFallback { get; }
```

Gets an object that throws an exception when an input byte sequence cannot be decoded.

Returns: A type derived from the `DecoderFallback` class. The default value is a `DecoderExceptionFallback` object.

To be added.

## DecoderFallback.MaxCharCount property

```csharp
public abstract int MaxCharCount { get; }
```

When overridden in a derived class, gets the maximum number of characters the current `DecoderFallback` object can return.

Returns: The maximum number of characters the current `DecoderFallback` object can return.

#### Remarks
For an exception fallback handler, this property should return zero.

## DecoderFallback.ReplacementFallback property

```csharp
public static System.Text.DecoderFallback ReplacementFallback { get; }
```

Gets an object that outputs a substitute string in place of an input byte sequence that cannot be decoded.

Returns: A type derived from the `DecoderFallback` class. The default value is a `DecoderReplacementFallback` object that emits the QUESTION MARK character ("?", U+003F) in place of unknown byte sequences.

To be added.

## DecoderFallback.CreateFallbackBuffer() method

```csharp
public abstract System.Text.DecoderFallbackBuffer CreateFallbackBuffer ();
```

When overridden in a derived class, initializes a new instance of the `DecoderFallbackBuffer` class.

Returns: An object that provides a fallback buffer for a decoder.

#### Remarks
This method returns an object derived from `DecoderFallbackBuffer` that is responsible for performing the fallback operation. For example, of the predefined `DecoderFallback` implementations in .NET, the `DecoderReplacementFallback.CreateFallbackBuffer` method returns a `DecoderReplacementFallbackBuffer` object, and the `DecoderExceptionFallback.CreateFallbackBuffer` method returns a `DecoderExceptionFallbackBuffer` object.

The `DecoderFallback.CreateFallbackBuffer` method is called by a decoder when it encounters the first byte that it is unable to decode. The `DecoderFallbackBuffer` object returned by this method provides the fallback implementation and is responsible for returning the string that replaces the byte or bytes that could not be decoded.
