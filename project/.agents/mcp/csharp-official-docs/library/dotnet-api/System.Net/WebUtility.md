---
title: "WebUtility class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebUtility.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebUtility class

Namespace: `System.Net`

```csharp
public static class WebUtility
```

Provides methods for encoding and decoding URLs when processing Web requests.

#### Remarks
The `HttpUtility` class contains encoding and decoding utility methods for use with HTML-encode strings. The `Uri` class also contains methods and properties that can be used for similar purposes.

## WebUtility.HtmlDecode(String) method

```csharp
public static string? HtmlDecode (string? value);
```

Converts a string that has been HTML-encoded for HTTP transmission into a decoded string.

Parameters:

- `value`: The string to decode.

Returns: A decoded string.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. HTML encoding converts characters that are not allowed in HTML into character-entity equivalents; HTML decoding reverses the encoding. For example, when embedded in a block of text, the characters `<` and `>` are encoded as `<` and `>` for HTTP transmission.

If the `value` parameter is `null`, then the returned decoded string is `null`. If the `value` parameter is an empty string, then the returned decoded string is an empty string.

## WebUtility.HtmlDecode(String, TextWriter) method

```csharp
public static void HtmlDecode (string? value, System.IO.TextWriter output);
```

Converts a string that has been HTML-encoded into a decoded string, and sends the decoded string to a `TextWriter` output stream.

Parameters:

- `value`: The string to decode.
- `output`: A `TextWriter` stream of output.

Exceptions:

- `ArgumentNullException`: The `output` parameter cannot be `null` if the `value` parameter is not `null`.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. HTML encoding converts characters that are not allowed in HTML into character-entity equivalents; HTML decoding reverses the encoding. For example, when embedded in a block of text, the characters `<` and `>` are encoded as `<` and `>` for HTTP transmission.

## WebUtility.HtmlEncode(String) method

```csharp
public static string? HtmlEncode (string? value);
```

Converts a string to an HTML-encoded string.

Parameters:

- `value`: The string to encode.

Returns: An encoded string.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. HTML encoding converts characters that are not allowed in HTML into character-entity equivalents; HTML decoding reverses the encoding. For example, when embedded in a block of text, the characters `<` and `>` are encoded as `<` and `>` for HTTP transmission.

If the `value` parameter is `null`, then the returned encoded string is `null`. If the `value` parameter is an empty string, then the returned encoded string is an empty string.

## WebUtility.HtmlEncode(String, TextWriter) method

```csharp
public static void HtmlEncode (string? value, System.IO.TextWriter output);
```

Converts a string into an HTML-encoded string, and returns the output as a `TextWriter` stream of output.

Parameters:

- `value`: The string to encode.
- `output`: A `TextWriter` output stream.

Exceptions:

- `ArgumentNullException`: The `output` parameter cannot be `null` if the `value` parameter is not `null`.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. HTML encoding converts characters that are not allowed in HTML into character-entity equivalents; HTML decoding reverses the encoding. For example, when embedded in a block of text, the characters `<` and `>` are encoded as `<` and `>` for HTTP transmission.

## WebUtility.UrlDecode(String) method

```csharp
public static string? UrlDecode (string? encodedValue);
```

Converts a string that has been encoded for transmission in a URL into a decoded string.

Parameters:

- `encodedValue`: A URL-encoded string to decode.

Returns: A decoded string.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. URL encoding converts characters that are not allowed in a URL into equivalent hexadecimal escape sequences. The hexadecimal escape sequences are in uppercase. For example, the characters `<` and `>` are encoded into the escape sequences `%3C` and `%3E`. The `WebUtility.UrlEncode` method creates a URL-encoded string.

URL decoding replaces hexadecimal escape sequences with corresponding ASCII character equivalents. For example, when embedded in a block of URL-encoded text, the escape sequences `%3c` and `%3e` are decoded into the characters `<` and `>`.

## WebUtility.UrlDecodeToBytes(Byte[], Int32, Int32) method

```csharp
public static byte[]? UrlDecodeToBytes (byte[]? encodedValue, int offset, int count);
```

Converts an encoded byte array that has been encoded for transmission in a URL into a decoded byte array.

Parameters:

- `encodedValue`: A URL-encoded `Byte` array to decode.
- `offset`: The offset, in bytes, from the start of the `Byte` array to decode.
- `count`: The count, in bytes, to decode from the `Byte` array.

Returns: A decoded `Byte` array.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. URL encoding converts characters that are not allowed in a URL into equivalent hexadecimal escape sequences. The `WebUtility.UrlEncodeToBytes` method creates a URL-encoded byte array.

URL decoding replaces hexadecimal escape sequences with corresponding ASCII character equivalents. For example, when embedded in a block of URL-encoded text, the escape sequences `%3c` and `%3e` are decoded into the characters `<` and `>`.

## WebUtility.UrlEncode(String) method

```csharp
public static string? UrlEncode (string? value);
```

Converts a text string into a URL-encoded string.

Parameters:

- `value`: The text to URL-encode.

Returns: A URL-encoded string.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. URL encoding replaces characters that are not allowed in a URL with character-entity equivalents consisting of hexadecimal escape sequences. The converted string is expected to conform to the UTF-8 format.

URL encoding replaces all character codes except for letters, numbers, and the following punctuation characters:

-   `-` (minus sign)

-   `_` (underscore)

-   `.` (period)

-   `!` (exclamation point)

-   `*` (asterisk)

-   `(` and `)` (opening and closing parentheses)

Each ' ' (space) character is converted to a `+` (plus) character.

> **Note:**
> Replacing ' ' (space) with a '+' (plus) sign is expected only in query part of URI (by convention, not by standard) or in `application/x-www-form-urlencoded` HTTP content. Moreover, the above mentioned list of characters that are **not** replaced does not correspond neither to URL specification nor URI RFC 3986. Use `Uri.EscapeDataString` for RFC compliant transformation.

For example, when embedded in a block of text to be transmitted in a URL, the characters `<` and `>` are encoded as `%3c` and `%3e`.

The `WebUtility.UrlDecode` method reverses the encoding.

## WebUtility.UrlEncodeToBytes(Byte[], Int32, Int32) method

```csharp
public static byte[]? UrlEncodeToBytes (byte[]? value, int offset, int count);
```

Converts a byte array into a URL-encoded byte array.

Parameters:

- `value`: The `Byte` array to URL-encode.
- `offset`: The offset, in bytes, from the start of the `Byte` array to encode.
- `count`: The count, in bytes, to encode from the `Byte` array.

Returns: An encoded `Byte` array.

#### Remarks
If characters such as blanks and punctuation are passed in an HTTP stream, they might be misinterpreted at the receiving end. URL encoding replaces characters that are not allowed in a URL with character-entity equivalents consisting of hexadecimal escape sequences. The converted string is expected to conform to the UTF-8 format.

URL encoding replaces all character codes except for letters, numbers, and the following punctuation characters:

-   `-` (minus sign)

-   `_` (underscore)

-   `.` (period)

-   `!` (exclamation point)

-   `*` (asterisk)

-   `'` (single quotation mark)

-   `(` and `)` (opening and closing parentheses)

Each ' ' (space) character is converted to a `+` (plus) character.

> **Note:**
> Replacing ' ' (space) with a '+' (plus) sign is expected only in query part of URI (by convention, not by standard) or in `application/x-www-form-urlencoded` HTTP content. Moreover, the above mentioned list of characters that are **not** replaced does not correspond neither to URL specification nor URI RFC 3986. Use `Uri.EscapeDataString` for RFC compliant transformation.

For example, when embedded in a block of text to be transmitted in a URL, the characters `<` and `>` are encoded as `%3c` and `%3e`.

The `WebUtility.UrlDecodeToBytes` method reverses the encoding.
