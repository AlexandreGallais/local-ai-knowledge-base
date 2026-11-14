---
title: "EncoderFallback class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncoderFallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderFallback class

Namespace: `System.Text`

```csharp
public abstract class EncoderFallback
```

Provides a failure-handling mechanism, called a fallback, for an input character that cannot be converted to an encoded output byte sequence.

#### Remarks
An encoding maps a Unicode character to an encoded sequence of bytes. A particular encoding is represented by a type that is derived from the `Encoding` class. Specifically, a character is encoded to a byte sequence by calling the encoding type's `Encoding.GetBytes` method, and the byte sequence is decoded to a character array or a string by calling the `Encoding.GetChars` or `Encoding.GetString` method.

An encoding operation can fail if the input character cannot be represented by the encoding. For example, an `ASCIIEncoding` object cannot encode a character whose Unicode code point value is outside the range U+0000 to U+007F.

When an encoding conversion cannot be performed, .NET provides a failure-handling mechanism called a fallback. Your application can use predefined .NET encoder fallbacks, or it can create a custom encoder fallback derived from the `EncoderFallback` and `EncoderFallbackBuffer` classes.

`EncoderFallback` and `EncoderFallbackBuffer` are the base classes for all encoding fallback handlers in .NET. They support the following three kinds of fallback handling mechanisms:

- Best-fit fallback, which maps valid Unicode characters that cannot be encoded to an approximate equivalent. For example, a best-fit fallback handler for the `ASCIIEncoding` class might map Æ (U+00C6) to AE (U+0041 + U+0045). A best-fit fallback handler might also be implemented to transliterate one alphabet (such as Cyrillic) to another (such as Latin or Roman). .NET does not provide any public best-fit fallback implementations.

- Replacement fallback, which replaces each character that cannot be encoded with a predefined string. .NET provides a predefined replacement fallback handler. The `EncoderReplacementFallback` class replaces each byte sequence that cannot be decoded with a question mark character ("?", or U+003F) or a REPLACEMENT CHARACTER (U+FFFD). You can customize the replacement string by specifying a substitute in the call to the `%23ctor` constructor. After the substitute string is emitted, the encoding operation continues converting the remainder of the input.

- Exception fallback, which throws an exception when a character cannot be encoded. .NET provides a predefined exception fallback handler. The `EncoderExceptionFallback` class throws an `EncoderFallbackException` when an invalid character is encountered, and the encoding operation terminates.

If you choose to implement a custom solution, you must override the following abstract members of the `EncoderFallback` class:

- The `EncoderFallback.CreateFallbackBuffer` method, which returns a class instance derived from `EncoderFallbackBuffer`. Depending on the type of fallback handler that you are developing, the `EncoderFallbackBuffer` implementation is responsible for performing the mapping or replacement, or for throwing the exception.

- The `MaxCharCount` property, which returns the maximum number of characters that the fallback implementation can return. For an exception fallback handler, its value should be zero.

For more information about encoding, decoding, and fallback strategies, see Character Encoding in .NET.

## EncoderFallback.EncoderFallback() constructor

```csharp
protected EncoderFallback ();
```

Initializes a new instance of the `EncoderFallback` class.

To be added.

## EncoderFallback.ExceptionFallback property

```csharp
public static System.Text.EncoderFallback ExceptionFallback { get; }
```

Gets an object that throws an exception when an input character cannot be encoded.

Returns: A type derived from the `EncoderFallback` class. The default value is a `EncoderExceptionFallback` object.

To be added.

## EncoderFallback.MaxCharCount property

```csharp
public abstract int MaxCharCount { get; }
```

When overridden in a derived class, gets the maximum number of characters the current `EncoderFallback` object can return.

Returns: The maximum number of characters the current `EncoderFallback` object can return.

#### Remarks
For an exception fallback handler, this property should return zero.

## EncoderFallback.ReplacementFallback property

```csharp
public static System.Text.EncoderFallback ReplacementFallback { get; }
```

Gets an object that outputs a substitute string in place of an input character that cannot be encoded.

Returns: A type derived from the `EncoderFallback` class. The default value is a `EncoderReplacementFallback` object that replaces unknown input characters with the QUESTION MARK character ("?", U+003F).

To be added.

## EncoderFallback.CreateFallbackBuffer() method

```csharp
public abstract System.Text.EncoderFallbackBuffer CreateFallbackBuffer ();
```

When overridden in a derived class, initializes a new instance of the `EncoderFallbackBuffer` class.

Returns: An object that provides a fallback buffer for an encoder.

#### Remarks
This method returns an object derived from `EncoderFallbackBuffer` that is responsible for performing the fallback operation. For example, of the predefined `EncoderFallback` implementations in .NET, the `EncoderReplacementFallback.CreateFallbackBuffer` method returns an `EncoderReplacementFallbackBuffer` object, and the `EncoderExceptionFallback.CreateFallbackBuffer` method returns an `EncoderExceptionFallbackBuffer` object.

The `EncoderFallback.CreateFallbackBuffer` method is called by an encoder when it encounters the first character that it is unable to encode. The `EncoderFallbackBuffer` object returned by this method provides the fallback implementation and is responsible for returning the byte array that replaces the character or characters that could not be encoded.
