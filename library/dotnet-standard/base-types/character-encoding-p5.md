---
title: "How to use character encoding classes in .NET (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/character-encoding.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use character encoding classes in .NET (part 5 of 6)

## Implementing a Custom Fallback Strategy

In addition to the best-fit mapping that is implemented internally by code pages, .NET includes the following classes for implementing a fallback strategy:

- Use `System.Text.EncoderReplacementFallback` and `System.Text.EncoderReplacementFallbackBuffer` to replace characters in encoding operations.

- Use `System.Text.DecoderReplacementFallback` and `System.Text.DecoderReplacementFallbackBuffer` to replace characters in decoding operations.

- Use `System.Text.EncoderExceptionFallback` and `System.Text.EncoderExceptionFallbackBuffer` to throw an `System.Text.EncoderFallbackException` when a character cannot be encoded.

- Use `System.Text.DecoderExceptionFallback` and `System.Text.DecoderExceptionFallbackBuffer` to throw a `System.Text.DecoderFallbackException` when a character cannot be decoded.

In addition, you can implement a custom solution that uses best-fit fallback, replacement fallback, or exception fallback, by following these steps:

1. Derive a class from `System.Text.EncoderFallback` for encoding operations, and from `System.Text.DecoderFallback` for decoding operations.

2. Derive a class from `System.Text.EncoderFallbackBuffer` for encoding operations, and from `System.Text.DecoderFallbackBuffer` for decoding operations.

3. For exception fallback, if the predefined `System.Text.EncoderFallbackException` and `System.Text.DecoderFallbackException` classes do not meet your needs, derive a class from an exception object such as `System.Exception` or `System.ArgumentException`.

### Deriving from EncoderFallback or DecoderFallback

To implement a custom fallback solution, you must create a class that inherits from `System.Text.EncoderFallback` for encoding operations, and from `System.Text.DecoderFallback` for decoding operations. Instances of these classes are passed to the `System.Text.Encoding.GetEncoding(System.String,System.Text.EncoderFallback,System.Text.DecoderFallback)` method and serve as the intermediary between the encoding class and the fallback implementation.

When you create a custom fallback solution for an encoder or decoder, you must implement the following members:

- The `System.Text.EncoderFallback.MaxCharCount*` or `System.Text.DecoderFallback.MaxCharCount` property, which returns the maximum possible number of characters that the best-fit, replacement, or exception fallback can return to replace a single character. For a custom exception fallback, its value is zero.

- The `System.Text.EncoderFallback.CreateFallbackBuffer*` or `System.Text.DecoderFallback.CreateFallbackBuffer*` method, which returns your custom `System.Text.EncoderFallbackBuffer` or `System.Text.DecoderFallbackBuffer` implementation. The method is called by the encoder when it encounters the first character that it is unable to successfully encode, or by the decoder when it encounters the first byte that it is unable to successfully decode.

### Deriving from EncoderFallbackBuffer or DecoderFallbackBuffer

To implement a custom fallback solution, you must also create a class that inherits from `System.Text.EncoderFallbackBuffer` for encoding operations, and from `System.Text.DecoderFallbackBuffer` for decoding operations. Instances of these classes are returned by the `System.Text.EncoderFallback.CreateFallbackBuffer*` method of the `System.Text.EncoderFallback` and `System.Text.DecoderFallback` classes. The `System.Text.EncoderFallback.CreateFallbackBuffer*` method is called by the encoder when it encounters the first character that it is not able to encode, and the `System.Text.DecoderFallback.CreateFallbackBuffer*` method is called by the decoder when it encounters one or more bytes that it is not able to decode. The `System.Text.EncoderFallbackBuffer` and `System.Text.DecoderFallbackBuffer` classes provide the fallback implementation. Each instance represents a buffer that contains the fallback characters that will replace the character that cannot be encoded or the byte sequence that cannot be decoded.

When you create a custom fallback solution for an encoder or decoder, you must implement the following members:

- The `System.Text.EncoderFallbackBuffer.Fallback*` or `System.Text.DecoderFallbackBuffer.Fallback*` method. `System.Text.EncoderFallbackBuffer.Fallback*` is called by the encoder to provide the fallback buffer with information about the character that it cannot encode. Because the character to be encoded may be a surrogate pair, this method is overloaded. One overload is passed the character to be encoded and its index in the string. The second overload is passed the high and low surrogate along with its index in the string. The `System.Text.DecoderFallbackBuffer.Fallback*` method is called by the decoder to provide the fallback buffer with information about the bytes that it cannot decode. This method is passed an array of bytes that it cannot decode, along with the index of the first byte. The fallback method should return `true` if the fallback buffer can supply a best-fit or replacement character or characters; otherwise, it should return `false`. For an exception fallback, the fallback method should throw an exception.

- The `System.Text.EncoderFallbackBuffer.GetNextChar*` or `System.Text.DecoderFallbackBuffer.GetNextChar*` method, which is called repeatedly by the encoder or decoder to get the next character from the fallback buffer. When all fallback characters have been returned, the method should return U+0000.

- The `System.Text.EncoderFallbackBuffer.Remaining*` or `System.Text.DecoderFallbackBuffer.Remaining` property, which returns the number of characters remaining in the fallback buffer.

- The `System.Text.EncoderFallbackBuffer.MovePrevious*` or `System.Text.DecoderFallbackBuffer.MovePrevious*` method, which moves the current position in the fallback buffer to the previous character.

- The `System.Text.EncoderFallbackBuffer.Reset*` or `System.Text.DecoderFallbackBuffer.Reset*` method, which reinitializes the fallback buffer.

If the fallback implementation is a best-fit fallback or a replacement fallback, the classes derived from `System.Text.EncoderFallbackBuffer` and `System.Text.DecoderFallbackBuffer` also maintain two private instance fields: the exact number of characters in the buffer; and the index of the next character in the buffer to return.
