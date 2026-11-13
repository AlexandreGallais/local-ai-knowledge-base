---
title: ".NET 8 breaking change: Base64.DecodeFromUtf8 methods ignore whitespace"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/decodefromutf8-whitespace.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Base64.DecodeFromUtf8 methods ignore whitespace

The `System.Convert.FromBase64String(System.String)`, `System.Convert.FromBase64CharArray(System.Char[],System.Int32,System.Int32)`, and corresponding `Try` methods on `System.Convert` ignore the ASCII whitespace characters ' ', '\t', '\r', and '\n' and allow any amount of such whitespace to be in the input. However, when the `System.Buffers.Text.Base64.DecodeFromUtf8(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@,System.Int32@,System.Boolean)` and `System.Buffers.Text.Base64.DecodeFromUtf8InPlace(System.Span{System.Byte},System.Int32@)` methods were added, they didn't ignore these whitespace characters and instead failed to decode any input that included whitespace. That made the behavior of the UTF16-based APIs different from that of the UTF8-based APIs. It also meant that:

- The `Base64.DecodeFromUtf8` and `Base64.DecodeFromUtf8InPlace` methods couldn't roundtrip the UTF-encoded base-64 encoded data produced by `System.Convert.FromBase64String(System.String)` with the `System.Base64FormattingOptions.InsertLineBreaks` option.
- The new `System.Buffers.Text.Base64.IsValid(System.ReadOnlySpan{System.Char})` and `System.Buffers.Text.Base64.IsValid(System.ReadOnlySpan{System.Byte})` methods would either need to have behavior inconsistent with each other or with their corresponding methods for UTF-16 and UTF-8 data on `System.Convert` and `System.Buffers.Text.Base64`.

With this change, the `System.Buffers.Text.Base64.DecodeFromUtf8(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@,System.Int32@,System.Boolean)` and `System.Buffers.Text.Base64.DecodeFromUtf8InPlace(System.Span{System.Byte},System.Int32@)` methods now ignore whitespace in the input.

## Previous behavior

`System.Buffers.Text.Base64.DecodeFromUtf8(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@,System.Int32@,System.Boolean)` and `System.Buffers.Text.Base64.DecodeFromUtf8InPlace(System.Span{System.Byte},System.Int32@)` failed to process input that contained whitespace and returned `System.Buffers.OperationStatus.InvalidData` if any whitespace was encountered.

## New behavior

`System.Buffers.Text.Base64.DecodeFromUtf8(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@,System.Int32@,System.Boolean)` and `System.Buffers.Text.Base64.DecodeFromUtf8InPlace(System.Span{System.Byte},System.Int32@)` now ignore whitespace (specifically ' ', '\t', '\r', and '\n') in the input, which matches the behavior of `System.Convert.FromBase64String(System.String)`.

## Version introduced

.NET 8 Preview 5

## Type of breaking change

This change is a behavioral change.

## Reason for change

The change was made so that:

- The `System.Buffers.Text.Base64` methods can decode a wider range of input data, including:
  - Data produced by `System.Convert.ToBase64String*` with the `System.Base64FormattingOptions.InsertLineBreaks` option.
  - Common formatting of data in configuration files and other real data sources.
- The `System.Buffers.Text.Base64` methods are consistent with the corresponding decoding APIs on `System.Convert`.
- The new `System.Buffers.Text.Base64.IsValid(System.ReadOnlySpan{System.Char})` and `System.Buffers.Text.Base64.IsValid(System.ReadOnlySpan{System.Byte})` APIs could be added in a manner where their behavior is consistent with each other and with the existing `System.Convert` and `System.Buffers.Text.Base64` APIs.

## Recommended action

If the new behavior is problematic for your code, you can call `IndexOfAny(" \t\r\n"u8)` to search the input for the whitespace that previously would have triggered an `System.Buffers.OperationStatus.InvalidData` result.

## Affected APIs

- `System.Buffers.Text.Base64.DecodeFromUtf8(System.ReadOnlySpan{System.Byte},System.Span{System.Byte},System.Int32@,System.Int32@,System.Boolean)`
- `System.Buffers.Text.Base64.DecodeFromUtf8InPlace(System.Span{System.Byte},System.Int32@)`
