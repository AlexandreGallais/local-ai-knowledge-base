---
title: "Utf8Formatter class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers.Text/Utf8Formatter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Utf8Formatter class

Namespace: `System.Buffers.Text`

```csharp
public static class Utf8Formatter
```

Provides static methods to format common data types as Utf8 strings.

To be added.

## Utf8Formatter.TryFormat(Boolean, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (bool value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `Boolean` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

|Format string|Example result string|
|--|--|
|G (default)|True/False|
|l|true/false|

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(Byte, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (byte value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `Byte` as a UTF8 string.

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
| D/d           | 122                   |
| N/n           | 122                   |
| X/x           | 7a                    |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(DateTime, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (DateTime value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `DateTime` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

| Format string | Example result string             | Comments             |
|---------------|-----------------------------------|----------------------|
| G  (default)  | 05/25/2017 10:30:15               |                      |
| R             | Tue, 03 Jan 2017 08:08:05 GMT     | (RFC 1123)           |
| l             | tue, 03 jan 2017 08:08:05 gmt     | (Lowercase RFC 1123) |
| O             | 2017-06-12T05:30:45.7680000-07:00 | (Round-trippable)    |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(DateTimeOffset, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (DateTimeOffset value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `DateTimeOffset` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

To be added.

## Utf8Formatter.TryFormat(Decimal, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (decimal value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `Decimal` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

| Format string  | Example result string | Comments    |
|----------------|-----------------------|-------------|
| G/g  (default) |                       |
| F/f            | 12.45                 | Fixed point |
| E/e            | 1.245000e1            | Exponential |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(Double, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (double value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `Double` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

| Format string  | Example result string | Comments    |
|----------------|-----------------------|-------------|
| G/g  (default) |                       |
| F/f            | 12.45                 | Fixed point |
| E/e            | 1.245000e1            | Exponential |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(Guid, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (Guid value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `Guid` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

|Format string|Result string|
|--|--|
|D (default)|nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn|
|B|{nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn}|
|P|(nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn)|
|N|nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn|

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(Int16, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (short value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats an `Int16` as a UTF8 string.

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

## Utf8Formatter.TryFormat(Int32, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (int value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats an `Int32` as a UTF8 string.

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

## Utf8Formatter.TryFormat(Int64, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (long value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats an `Int64` as a UTF8 string.

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

## Utf8Formatter.TryFormat(SByte, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (sbyte value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats an `SByte` as a UTF8 string.

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
| D/d           | 122                   |
| N/n           | 122                   |
| X/x           | 7a                    |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(Single, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (float value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `Single` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

| Format string  | Example result string | Comments    |
|----------------|-----------------------|-------------|
| G/g  (default) |                       |
| F/f            | 12.45                 | Fixed point |
| E/e            | 1.245000e1            | Exponential |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(TimeSpan, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (TimeSpan value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `TimeSpan` as a UTF8 string.

Parameters:

- `value`: The value to format.
- `destination`: The buffer to write the UTF8-formatted value to.
- `bytesWritten`: When the method returns, contains the length of the formatted text in bytes.
- `format`: The standard format to use.

Returns: `true` if the formatting operation succeeds; `false` if `destination` is too small.

Formats supported:

| Format string   | Result string                          | Comments          |
|-----------------|----------------------------------------|-------------------|
| c/t/T (default) | -hh:mm:ss[.fffffff]              | (constant format) |
| G               | [-]d:hh:mm:ss.fffffff                  | (general long)    |
| g               | -[h]h:mm:ss[.f[f[f[f[f[f[f]]]]]] | (general short)   |

If the method fails, iteratively increase the size of the buffer and retry until it succeeds.

## Utf8Formatter.TryFormat(UInt16, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (ushort value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `UInt16` as a UTF8 string.

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

## Utf8Formatter.TryFormat(UInt32, Byte>, Int32, StandardFormat) method

```csharp
public static bool TryFormat (uint value, Span<byte> destination, out int bytesWritten, System.Buffers.StandardFormat format = default);
```

Formats a `UInt32` as a UTF8 string.

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
