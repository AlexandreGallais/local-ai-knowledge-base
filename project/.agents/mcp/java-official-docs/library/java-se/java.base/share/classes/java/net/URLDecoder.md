# URLDecoder class (java.net)

```java
public final class URLDecoder
```

Utility class for HTML form decoding. This class contains static methods
for decoding a String from the <CODE>application/x-www-form-urlencoded</CODE>
MIME format.
<p>
The conversion process is the reverse of that used by the URLEncoder class. It is assumed
that all characters in the encoded string are one of the following:
&quot;{@code a}&quot; through &quot;{@code z}&quot;,
&quot;{@code A}&quot; through &quot;{@code Z}&quot;,
&quot;{@code 0}&quot; through &quot;{@code 9}&quot;, and
&quot;{@code -}&quot;, &quot;{@code _}&quot;,
&quot;{@code .}&quot;, and &quot;{@code *}&quot;. The
character &quot;{@code %}&quot; is allowed but is interpreted
as the start of a special escaped sequence.
<p>
The following rules are applied in the conversion:

<ul>
<li>The alphanumeric characters &quot;{@code a}&quot; through
    &quot;{@code z}&quot;, &quot;{@code A}&quot; through
    &quot;{@code Z}&quot; and &quot;{@code 0}&quot;
    through &quot;{@code 9}&quot; remain the same.
<li>The special characters &quot;{@code .}&quot;,
    &quot;{@code -}&quot;, &quot;{@code *}&quot;, and
    &quot;{@code _}&quot; remain the same.
<li>The plus sign &quot;{@code +}&quot; is converted into a
    space character &quot; &nbsp; &quot; .
<li>A sequence of the form "<i>{@code %xy}</i>" will be
    treated as representing a byte where <i>xy</i> is the two-digit
    hexadecimal representation of the 8 bits. Then, all substrings
    that contain one or more of these byte sequences consecutively
    will be replaced by the character(s) whose encoding would result
    in those consecutive bytes.
    The encoding scheme used to decode these characters may be specified,
    or if unspecified, the default charset will be used.
</ul>
<p>
There are two possible ways in which this decoder could deal with
illegal strings.  It could either leave illegal characters alone or
it could throw an {@link java.lang.IllegalArgumentException}.
Which approach the decoder takes is left to the
implementation.

@see Charset#defaultCharset()

@author  Mark Chamness
@author  Michael McCloskey
@since   1.2

## URLDecoder.decode(String)

```java
public static String decode(String s)
```

Decodes a {@code x-www-form-urlencoded} string.
The default charset is used to determine what characters
are represented by any consecutive sequences of the form
"<i>{@code %xy}</i>".
@param s the {@code String} to decode
@deprecated The resulting string may vary depending on the
         default charset. Instead, use the decode(String,String) method
         to specify the encoding.
@return the newly decoded {@code String}
@throws IllegalArgumentException if the implementation encounters malformed
escape sequences

## URLDecoder.decode(String, String)

```java
public static String decode(String s, String enc) throws UnsupportedEncodingException
```

Decodes an {@code application/x-www-form-urlencoded} string using
a specific encoding scheme.

<p>
This method behaves the same as {@linkplain decode(String s, Charset charset)}
except that it will {@linkplain Charset#forName look up the charset}
using the given encoding name.

@param s the {@code String} to decode
@param enc   The name of a supported
   <a href="../lang/package-summary.html#charenc">character
   encoding</a>.
@return the newly decoded {@code String}
@throws UnsupportedEncodingException
            If character encoding needs to be consulted, but
            named character encoding is not supported
@throws IllegalArgumentException if the implementation encounters malformed
escape sequences
@see URLEncoder#encode(java.lang.String, java.lang.String)
@since 1.4

## URLDecoder.decode(String, Charset)

```java
public static String decode(String s, Charset charset)
```

Decodes an {@code application/x-www-form-urlencoded} string using
a specific {@linkplain Charset Charset}.
The supplied charset is used to determine
what characters are represented by any consecutive escape sequences of
the form "<i>{@code %xy}</i>". Erroneous bytes are replaced with the
supplied {@code Charset}'s {@linkplain java.nio.charset.CharsetDecoder##cae
replacement value}.
<p>
<em><strong>Note:</strong> The <a href=
"http://www.w3.org/TR/html40/appendix/notes.html#non-ascii-chars">
World Wide Web Consortium Recommendation</a> states that
UTF-8 should be used. Not doing so may introduce
incompatibilities.</em>

@param s the {@code String} to decode
@param charset the given charset
@return the newly decoded {@code String}
@throws NullPointerException if {@code s} or {@code charset} is {@code null}
@throws IllegalArgumentException if the implementation encounters malformed
escape sequences

@spec https://www.w3.org/TR/html4 HTML 4.01 Specification
@see URLEncoder#encode(java.lang.String, Charset)
@since 10