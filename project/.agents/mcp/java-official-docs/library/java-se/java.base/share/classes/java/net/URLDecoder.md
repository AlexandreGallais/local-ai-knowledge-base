---
title: "URLDecoder class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URLDecoder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URLDecoder class (java.net)

```java
public final class URLDecoder
```

Utility class for HTML form decoding. This class contains static methods
for decoding a String from the `application/x-www-form-urlencoded`
MIME format.

The conversion process is the reverse of that used by the URLEncoder class. It is assumed
that all characters in the encoded string are one of the following:
"`a`" through "`z`",
"`A`" through "`Z`",
"`0`" through "`9`", and
"`-`", "`_`",
"`.`", and "`*`". The
character "`%`" is allowed but is interpreted
as the start of a special escaped sequence.

The following rules are applied in the conversion:

- The alphanumeric characters "`a`" through
    "`z`", "`A`" through
    "`Z`" and "`0`"
    through "`9`" remain the same.

- The special characters "`.`",
    "`-`", "`*`", and
    "`_`" remain the same.

- The plus sign "`+`" is converted into a
    space character "   " .

- A sequence of the form "*`%xy`*" will be
    treated as representing a byte where *xy* is the two-digit
    hexadecimal representation of the 8 bits. Then, all substrings
    that contain one or more of these byte sequences consecutively
    will be replaced by the character(s) whose encoding would result
    in those consecutive bytes.
    The encoding scheme used to decode these characters may be specified,
    or if unspecified, the default charset will be used.

There are two possible ways in which this decoder could deal with
illegal strings.  It could either leave illegal characters alone or
it could throw an `java.lang.IllegalArgumentException`.
Which approach the decoder takes is left to the
implementation.

**See also:** Charset#defaultCharset()

**Since:** 1.2

## URLDecoder.decode(String)

```java
public static String decode(String s)
```

Decodes a `x-www-form-urlencoded` string.
The default charset is used to determine what characters
are represented by any consecutive sequences of the form
"*`%xy`*".

Parameters:

- `s`: the `String` to decode

**Deprecated:** The resulting string may vary depending on the
         default charset. Instead, use the decode(String,String) method
         to specify the encoding.

**Returns:** the newly decoded `String`

Throws:

- `IllegalArgumentException`: if the implementation encounters malformed escape sequences

## URLDecoder.decode(String, String)

```java
public static String decode(String s, String enc) throws UnsupportedEncodingException
```

Decodes an `application/x-www-form-urlencoded` string using
a specific encoding scheme.

This method behaves the same as s, Charset charset)
except that it will look up the charset
using the given encoding name.

Parameters:

- `s`: the `String` to decode
- `enc`: The name of a supported character encoding.

**Returns:** the newly decoded `String`

**See also:** URLEncoder#encode(java.lang.String, java.lang.String)

**Since:** 1.4

Throws:

- `UnsupportedEncodingException`: If character encoding needs to be consulted, but named character encoding is not supported
- `IllegalArgumentException`: if the implementation encounters malformed escape sequences

## URLDecoder.decode(String, Charset)

```java
public static String decode(String s, Charset charset)
```

Decodes an `application/x-www-form-urlencoded` string using
a specific Charset.
The supplied charset is used to determine
what characters are represented by any consecutive escape sequences of
the form "*`%xy`*". Erroneous bytes are replaced with the
supplied `Charset`'s replacement value.

***Note:** The
World Wide Web Consortium Recommendation states that
UTF-8 should be used. Not doing so may introduce
incompatibilities.*

Parameters:

- `s`: the `String` to decode
- `charset`: the given charset

**Returns:** the newly decoded `String`

**See also:** URLEncoder#encode(java.lang.String, Charset)

**Since:** 10

Throws:

- `NullPointerException`: if `s` or `charset` is `null`
- `IllegalArgumentException`: if the implementation encounters malformed escape sequences
