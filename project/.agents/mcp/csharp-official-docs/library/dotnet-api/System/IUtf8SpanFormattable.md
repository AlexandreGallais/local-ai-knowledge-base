---
title: "IUtf8SpanFormattable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IUtf8SpanFormattable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IUtf8SpanFormattable interface

Namespace: `System`

```csharp
public interface IUtf8SpanFormattable
```

Provides functionality to format the string representation of an object into a span as UTF-8.

To be added.

## IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format, IFormatProvider? provider);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

An implementation of this interface should produce the same string of characters as an implementation of `IFormattable.ToString` or `ISpanFormattable.TryFormat` on the same type. TryFormat should return `false` only if there is not enough space in the destination buffer; any other failures should throw an exception.
