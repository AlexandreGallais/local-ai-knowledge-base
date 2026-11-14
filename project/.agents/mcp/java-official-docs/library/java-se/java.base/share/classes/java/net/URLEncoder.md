---
title: "URLEncoder class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLEncoder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLEncoder class (java.net)

```java
public final class URLEncoder
```

Utility class for HTML form encoding. This class contains static methods
for converting a String to the `application/x-www-form-urlencoded` MIME
format. For more information about HTML form encoding, consult the HTML
specification.

When encoding a String, the following rules apply:

- The alphanumeric characters "`a`" through
    "`z`", "`A`" through
    "`Z`" and "`0`"
    through "`9`" remain the same.

- The special characters "`.`",
    "`-`", "`*`", and
    "`_`" remain the same.

- The space character "   " is
    converted into a plus sign "`+`".

- All other characters are unsafe and are first converted into
    one or more bytes using some encoding scheme. Then each byte is
    represented by the 3-character string
    "*`%xy`*", where *xy* is the
    two-digit hexadecimal representation of the byte.
    The recommended encoding scheme to use is UTF-8. However,
    for compatibility reasons, if an encoding is not specified,
    then the default charset is used.

For example using UTF-8 as the encoding scheme the string "The
string ü@foo-bar" would get converted to
"The+string+%C3%BC%40foo-bar" because in UTF-8 the character
ü is encoded as two bytes C3 (hex) and BC (hex), and the
character @ is encoded as one byte 40 (hex).

**See also:** Charset#defaultCharset()

**Since:** 1.0

## URLEncoder.encode(String)

```java
public static String encode(String s)
```

Translates a string into `x-www-form-urlencoded`
format. This method uses the default charset
as the encoding scheme to obtain the bytes for unsafe characters.

Parameters:

- `s`: `String` to be translated.

**Deprecated:** The resulting string may vary depending on the
            default charset. Instead, use the encode(String,String)
            method to specify the encoding.

**Returns:** the translated `String`.

## URLEncoder.encode(String, String)

```java
public static String encode(String s, String enc) throws UnsupportedEncodingException
```

Translates a string into `application/x-www-form-urlencoded`
format using a specific encoding scheme.

This method behaves the same as s, Charset charset)
except that it will look up the charset
using the given encoding name.

Parameters:

- `s`: `String` to be translated.
- `enc`: The name of a supported character encoding.

**Returns:** the translated `String`.

**See also:** URLDecoder#decode(java.lang.String, java.lang.String)

**Since:** 1.4

Throws:

- `UnsupportedEncodingException`: If the named encoding is not supported

## URLEncoder.encode(String, Charset)

```java
public static String encode(String s, Charset charset)
```

Translates a string into `application/x-www-form-urlencoded`
format using a specific Charset.
This method uses the supplied charset to obtain the bytes for unsafe
characters.

If the input string is malformed, or if the input cannot be mapped
to a valid byte sequence in the given `Charset`, then the
erroneous input will be replaced with the `Charset`'s
replacement values.

Parameters:

- `s`: `String` to be translated.
- `charset`: the given charset

**API note:** The
World Wide Web Consortium Recommendation states that
UTF-8 should be used. Not doing so may introduce incompatibilities.

**Returns:** the translated `String`.

**See also:** URLDecoder#decode(java.lang.String, Charset)

**Since:** 10

Throws:

- `NullPointerException`: if `s` or `charset` is `null`.
