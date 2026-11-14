---
title: "Utf8Formatter class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Text/Utf8Formatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8Formatter class (part 2 of 2)

## Utf8Formatter.TryFormat(UInt64, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (ulong value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `UInt64` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

| Format string | Example result string |
|---------------|-----------------------|
| G/g (default) |                       |
| D/d           | 32767                 |
| N/n           | 32,767                |
| X/x           | 7fff                  |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.
