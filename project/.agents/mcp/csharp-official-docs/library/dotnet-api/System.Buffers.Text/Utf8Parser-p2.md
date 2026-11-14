---
title: "Utf8Parser class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Text/Utf8Parser.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8Parser class (part 2 of 2)

## Utf8Parser.TryParse(Byte>, UInt16, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out ushort value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `UInt16` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string | Example expected format |
|---------------|-------------------------|
| G/g (default) |                         |
| D/d           | 32767                   |
| N/n           | 32,767                  |
| X/x           | 7fff                    |

## Utf8Parser.TryParse(Byte>, UInt32, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out uint value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `UInt32` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string | Example expected format |
|---------------|-------------------------|
| G/g (default) |                         |
| D/d           | 32767                   |
| N/n           | 32,767                  |
| X/x           | 7fff                    |

## Utf8Parser.TryParse(Byte>, UInt64, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out ulong value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `UInt64` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string | Example expected format |
|---------------|-------------------------|
| G/g (default) |                         |
| D/d           | 32767                   |
| N/n           | 32,767                  |
| X/x           | 7fff                    |
