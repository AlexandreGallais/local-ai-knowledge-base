---
title: "System.Text namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Text.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Text namespace

Contains classes that represent ASCII and Unicode character encodings; abstract base classes for converting blocks of characters to and from blocks of bytes; and a helper class that manipulates and formats `String` objects without creating intermediate instances of `String`.

#### Remarks
The encoding classes are primarily intended to convert between different encodings or code pages and a Unicode encoding. `Encoding.Unicode` (UTF-16) encoding is used internally by .NET, and `Encoding.UTF8` encoding is often used for storing character data to ensure portability across machines and cultures.

The classes derived from `Encoding` enable you to choose a fallback strategy, which determines how characters that cannot be encoded into a sequence of bytes, or bytes that cannot be decoded into characters, are handled. You can choose one of the following:

- Exception fallback. You can choose to throw exceptions on data errors either by using a `throwonerror` flag that is available in some class constructors or by using the `EncoderExceptionFallback` and `DecoderExceptionFallback` classes. If you are concerned about the integrity of the data stream, throwing on an exception is recommended.

- Replacement fallback. You can use the `EncoderFallback` and `DecoderFallback` classes to silently change a character to "?" or to the Unicode replacement character (U+FFFD).

- Best-fit fallback. This option maps a character in one encoding to a character in another encoding. Best fit fallback is often not recommended because it can cause data loss and confusion, and is slower than simple "?" character replacements. However, for ANSI code pages the best-fit behavior is the default.

The `StringBuilder` class is designed for operations that perform extensive manipulations on a single string. Unlike the `String` class, the `StringBuilder` class is mutable and provides better performance when concatenating or deleting strings.

For more information about `Text`, see How to use character encoding classes in .NET .
