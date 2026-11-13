---
title: "What's new in .NET libraries for .NET 11 (part 2 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11 (part 2 of 8)

## Text, serialization, and data handling

- String and character enhancements
- Base64 encoding improvements
- UTF validation and invalid-subsequence search
- System.Text.Json improvements
- Regular expression improvements
- Read CBOR incrementally

### String and character enhancements

.NET 11 introduces significant enhancements to string and character manipulation APIs, making it easier to work with Unicode characters and runes.

#### Rune support in String methods

The `System.String` class now includes methods that accept `System.Text.Rune` parameters, enabling you to search, replace, and manipulate strings using Unicode scalar values directly. These new methods include:

- `Contains` - Check if a string contains a specific rune: `System.String.Contains(System.Text.Rune)` and `System.String.Contains(System.Text.Rune,System.StringComparison)`.
- `StartsWith` and `EndsWith` - Check if a string starts or ends with a specific rune: `System.String.StartsWith(System.Text.Rune)`, `System.String.StartsWith(System.Text.Rune,System.StringComparison)`, `System.String.EndsWith(System.Text.Rune)`, and `System.String.EndsWith(System.Text.Rune,System.StringComparison)`.
- `IndexOf` and `LastIndexOf` - Find the position of a rune in a string: `System.String.IndexOf(System.Text.Rune)`, `System.String.IndexOf(System.Text.Rune,System.StringComparison)`, `System.String.LastIndexOf(System.Text.Rune)`, and `System.String.LastIndexOf(System.Text.Rune,System.StringComparison)`.
- `Replace` - Replace occurrences of one rune with another: `System.String.Replace(System.Text.Rune,System.Text.Rune)`.
- `Split` - Split a string using a rune as the separator: `System.String.Split(System.Text.Rune,System.StringSplitOptions)` and `System.String.Split(System.Text.Rune,System.Int32,System.StringSplitOptions)`.
- `Trim`, `TrimStart`, and `TrimEnd` - Trim runes from strings: `System.String.Trim(System.Text.Rune)`, `System.String.TrimStart(System.Text.Rune)`, and `System.String.TrimEnd(System.Text.Rune)`.

Many of these methods include overloads that accept a `System.StringComparison` parameter for culture-aware comparisons.

#### Char.Equals with StringComparison

The `System.Char` struct now includes an `System.Char.Equals(System.Char,System.StringComparison)` method that accepts a `System.StringComparison` parameter, allowing you to compare characters using culture-aware or ordinal comparisons.

#### Rune support in TextInfo

The `System.Globalization.TextInfo` class now provides `System.Globalization.TextInfo.ToLower(System.Text.Rune)` and `System.Globalization.TextInfo.ToUpper(System.Text.Rune)` methods that accept `System.Text.Rune` parameters, enabling you to perform case conversions on individual Unicode scalar values.

#### StringBuilder.MoveChunks

To transfer content without copying characters, use the new static `System.Text.StringBuilder.MoveChunks(System.Text.StringBuilder)` method, which moves all content from a source `StringBuilder` to a new `StringBuilder`. After the call, the source `StringBuilder` has a length of 0:

```csharp
var source = new StringBuilder("Hello, ");
source.Append("World!");

// MoveChunks transfers all content from source to a new StringBuilder.
// After the call, source contains no characters.
StringBuilder dest = StringBuilder.MoveChunks(source);
Console.WriteLine(dest);          // Hello, World!
Console.WriteLine(source.Length); // 0
```
### Base64 encoding improvements

.NET 11 adds new APIs and overloads to the existing `System.Buffers.Text.Base64` type, providing comprehensive support for Base64 encoding and decoding. These additions offer improved performance and flexibility compared to existing methods.

#### New Base64 APIs

The new APIs support encoding and decoding operations with various input and output formats:

- **Encoding to chars**: `System.Buffers.Text.Base64.EncodeToChars*` and `System.Buffers.Text.Base64.EncodeToString*`
- **Encoding to UTF-8**: `System.Buffers.Text.Base64.EncodeToUtf8*`
- **Decoding from chars**: `System.Buffers.Text.Base64.DecodeFromChars*`
- **Decoding from UTF-8**: `System.Buffers.Text.Base64.DecodeFromUtf8*`

These methods provide both high-level convenience methods (that allocate and return arrays or strings) and low-level span-based methods (for zero-allocation scenarios).

### UTF validation and invalid-subsequence search

`System.Text.Unicode` has two new complementary features. `System.Text.Unicode.Utf16.IsValid(System.ReadOnlySpan{System.Char})` answers whether a sequence is well-formed UTF-16 without scanning twice, and `System.Text.Unicode.Utf8.IndexOfInvalidSubsequence(System.ReadOnlySpan{System.Byte})` / `System.Text.Unicode.Utf16.IndexOfInvalidSubsequence(System.ReadOnlySpan{System.Char})` return the position of the first ill-formed code-unit sequence (or `-1` for valid input). Together, these methods let parsers, validators, and serializers report precise errors instead of generic encoding-error messages.

```csharp
ReadOnlySpan<byte> bytes = [0xC3, 0x28]; // invalid UTF-8
int badIndex = Utf8.IndexOfInvalidSubsequence(bytes); // 0

ReadOnlySpan<char> chars = "valid \uD83D\uDC4D end"; // valid UTF-16 (👍 emoji)
bool ok = Utf16.IsValid(chars); // true
```
