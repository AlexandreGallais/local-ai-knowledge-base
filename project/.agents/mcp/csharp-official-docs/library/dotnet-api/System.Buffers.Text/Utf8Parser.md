---
title: "Utf8Parser class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Text/Utf8Parser.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8Parser class

Namespace: `System.Buffers.Text`

```csharp
public static class Utf8Parser
```

Provides static methods to parse Utf8 strings to common data types.

To be added.

## Utf8Parser.TryParse(Byte>, Boolean, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out bool value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `Boolean` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string. Supported formats are `'G'`, `'l'`, and `default`.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

The parsing is case insensitive. The format parameter is validated to ensure it is supported; however, all supported formats are treated identically.

## Utf8Parser.TryParse(Byte>, Byte, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out byte value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `Byte` at the start of a Utf8 string.

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
| D/d           | 122                     |
| N/n           | 122                     |
| X/x           | 7a                      |

## Utf8Parser.TryParse(Byte>, DateTime, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out DateTime value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `DateTime` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string | Example expected format           | Comments             |
|---------------|-----------------------------------|----------------------|
| G  (default)  | 05/25/2017 10:30:15               |                      |
| R             | Tue, 03 Jan 2017 08:08:05 GMT     | (RFC 1123)           |
| l             | tue, 03 jan 2017 08:08:05 gmt     | (Lowercase RFC 1123) |
| O             | 2017-06-12T05:30:45.7680000-07:00 | (Round-trippable)    |

## Utf8Parser.TryParse(Byte>, DateTimeOffset, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out DateTimeOffset value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `DateTimeOffset` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string | Example expected format           | Comments             |
|---------------|-----------------------------------|----------------------|
| G  (default)  | 05/25/2017 10:30:15               |                      |
| R             | Tue, 03 Jan 2017 08:08:05 GMT     | (RFC 1123)           |
| l             | tue, 03 jan 2017 08:08:05 gmt     | (Lowercase RFC 1123) |
| O             | 2017-06-12T05:30:45.7680000-07:00 | (Round-trippable)    |

## Utf8Parser.TryParse(Byte>, Decimal, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out decimal value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `Decimal` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string  | Example expected format | Comments    |
|----------------|-------------------------|-------------|
| G/g  (default) |                         |             |
| F/f            | 12.45                   | Fixed point |
| E/e            | 1.245000e1              | Exponential |

## Utf8Parser.TryParse(Byte>, Double, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out double value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `Double` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string  | Example expected format | Comments    |
|----------------|-------------------------|-------------|
| G/g  (default) |                         |             |
| F/f            | 12.45                   | Fixed point |
| E/e            | 1.245000e1              | Exponential |

## Utf8Parser.TryParse(Byte>, Guid, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out Guid value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `Guid` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

|Format string|Expected format|
|--|--|
|D (default)|nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn|
|B|{nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn}|
|P|(nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn)|
|N|nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn|

## Utf8Parser.TryParse(Byte>, Int16, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out short value, out int bytesConsumed, char standardFormat = '\0');
```

Parses an `Int16` at the start of a Utf8 string.

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

## Utf8Parser.TryParse(Byte>, Int32, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out int value, out int bytesConsumed, char standardFormat = '\0');
```

Parses an `Int32` at the start of a Utf8 string.

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

## Utf8Parser.TryParse(Byte>, Int64, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out long value, out int bytesConsumed, char standardFormat = '\0');
```

Parses an `Int64` at the start of a Utf8 string.

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

## Utf8Parser.TryParse(Byte>, SByte, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out sbyte value, out int bytesConsumed, char standardFormat = '\0');
```

Parses an `SByte` at the start of a Utf8 string.

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
| D/d           | 122                     |
| N/n           | 122                     |
| X/x           | 7a                      |

## Utf8Parser.TryParse(Byte>, Single, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out float value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `Single` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string  | Example expected format | Comments    |
|----------------|-------------------------|-------------|
| G/g  (default) |                         |             |
| F/f            | 12.45                   | Fixed point |
| E/e            | 1.245000e1              | Exponential |

## Utf8Parser.TryParse(Byte>, TimeSpan, Int32, Char) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> source, out TimeSpan value, out int bytesConsumed, char standardFormat = '\0');
```

Parses a `TimeSpan` at the start of a Utf8 string.

Parameters:

- `source`: The Utf8 string to parse.
- `value`: When the method returns, contains the value parsed from `source`, if the parsing operation succeeded.
- `bytesConsumed`: If the parsing operation was successful, contains the length in bytes of the parsed substring when the method returns. If the method fails, `bytesConsumed` is set to 0.
- `standardFormat`: The expected format of the Utf8 string.

Returns: `true` for success; `false` if the string was not syntactically valid or an overflow or underflow occurred.

Formats supported:

| Format string   | Expected format                        | Comments          |
|-----------------|----------------------------------------|-------------------|
| c/t/T (default) | -hh:mm:ss[.fffffff]              | (constant format) |
| G               | [-]d:hh:mm:ss.fffffff                  | (general long)    |
| g               | -[h]h:mm:ss[.f[f[f[f[f[f[f]]]]]] | (general short)   |
