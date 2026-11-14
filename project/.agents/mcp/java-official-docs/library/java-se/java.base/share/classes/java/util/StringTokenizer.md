# StringTokenizer class (java.util)

```java
public class StringTokenizer implements Enumeration<Object>
```

The string tokenizer class allows an application to break a
string into tokens. The tokenization method is much simpler than
the one used by the {@code StreamTokenizer} class. The
{@code StringTokenizer} methods do not distinguish among
identifiers, numbers, and quoted strings, nor do they recognize
and skip comments.
<p>
The set of delimiters (the characters that separate tokens) may
be specified either at creation time or on a per-token basis.
<p>
An instance of {@code StringTokenizer} behaves in one of two
ways, depending on whether it was created with the
{@code returnDelims} flag having the value {@code true}
or {@code false}:
<ul>
<li>If the flag is {@code false}, delimiter characters serve to
    separate tokens. A token is a maximal sequence of consecutive
    characters that are not delimiters.
<li>If the flag is {@code true}, delimiter characters are themselves
    considered to be tokens. A token is thus either one delimiter
    character, or a maximal sequence of consecutive characters that are
    not delimiters.
</ul><p>
A {@code StringTokenizer} object internally maintains a current
position within the string to be tokenized. Some operations advance this
current position past the characters processed.<p>
A token is returned by taking a substring of the string that was used to
create the {@code StringTokenizer} object.
<p>
The following is one example of the use of the tokenizer. The code:
<blockquote><pre>
    StringTokenizer st = new StringTokenizer("this is a test");
    while (st.hasMoreTokens()) {
        System.out.println(st.nextToken());
    }
</pre></blockquote>
<p>
prints the following output:
<blockquote><pre>
    this
    is
    a
    test
</pre></blockquote>

<p>
{@code StringTokenizer} is a legacy class that is retained for
compatibility reasons although its use is discouraged in new code. It is
recommended that anyone seeking this functionality use the {@code split}
method of {@code String} or the java.util.regex package instead.
<p>
The following example illustrates how the {@code String.split}
method can be used to break up a string into its basic tokens:
<blockquote><pre>
    String[] result = "this is a test".split("\\s");
    for (String r : result)
        System.out.println(r);
</pre></blockquote>
<p>
prints the following output:
<blockquote><pre>
    this
    is
    a
    test
</pre></blockquote>

@see     java.io.StreamTokenizer
@since   1.0

## StringTokenizer.StringTokenizer(String, String, boolean)

```java
public StringTokenizer(String str, String delim, boolean returnDelims)
```

Constructs a string tokenizer for the specified string. All
characters in the {@code delim} argument are the delimiters
for separating tokens.
<p>
If the {@code returnDelims} flag is {@code true}, then
the delimiter characters are also returned as tokens. Each
delimiter is returned as a string consisting of a single
<a href="../lang/Character.html#unicode">Unicode code point</a>
of the delimiter (which may be one or two {@code char}s). If the
flag is {@code false}, the delimiter characters are skipped
and only serve as separators between tokens.
<p>
Note that if {@code delim} is {@code null}, this constructor does
not throw an exception. However, trying to invoke other methods on the
resulting {@code StringTokenizer} may result in a
{@code NullPointerException}.

@param   str            a string to be parsed.
@param   delim          the delimiters.
@param   returnDelims   flag indicating whether to return the delimiters
                        as tokens.
@throws    NullPointerException if str is {@code null}

## StringTokenizer.StringTokenizer(String, String)

```java
public StringTokenizer(String str, String delim)
```

Constructs a string tokenizer for the specified string. The
characters in the {@code delim} argument are the delimiters
for separating tokens. Delimiter characters themselves will not
be treated as tokens.
<p>
Note that if {@code delim} is {@code null}, this constructor does
not throw an exception. However, trying to invoke other methods on the
resulting {@code StringTokenizer} may result in a
{@code NullPointerException}.

@param   str     a string to be parsed.
@param   delim   the delimiters.
@throws    NullPointerException if str is {@code null}

## StringTokenizer.StringTokenizer(String)

```java
public StringTokenizer(String str)
```

Constructs a string tokenizer for the specified string. The
tokenizer uses the default delimiter set, which is
<code>"&nbsp;&#92;t&#92;n&#92;r&#92;f"</code>: the space character,
the tab character, the newline character, the carriage-return character,
and the form-feed character. Delimiter characters themselves will
not be treated as tokens.

@param   str   a string to be parsed.
@throws    NullPointerException if str is {@code null}

## StringTokenizer.hasMoreTokens()

```java
public boolean hasMoreTokens()
```

Tests if there are more tokens available from this tokenizer's string.
If this method returns {@code true}, then a subsequent call to
{@code nextToken} with no argument will successfully return a token.

@return  {@code true} if and only if there is at least one token
         in the string after the current position; {@code false}
         otherwise.

## StringTokenizer.nextToken()

```java
public String nextToken()
```

Returns the next token from this string tokenizer.

@return     the next token from this string tokenizer.
@throws     NoSuchElementException  if there are no more tokens in this
              tokenizer's string.

## StringTokenizer.nextToken(String)

```java
public String nextToken(String delim)
```

Returns the next token in this string tokenizer's string. First,
the set of characters considered to be delimiters by this
{@code StringTokenizer} object is changed to be the characters in
the string {@code delim}. Then the next token in the string
after the current position is returned. The current position is
advanced beyond the recognized token.  The new delimiter set
remains the default after this call.

@param      delim   the new delimiters.
@return     the next token, after switching to the new delimiter set.
@throws     NoSuchElementException  if there are no more tokens in this
              tokenizer's string.
@throws    NullPointerException if delim is {@code null}

## StringTokenizer.hasMoreElements()

```java
public boolean hasMoreElements()
```

Returns the same value as the {@code hasMoreTokens}
method. It exists so that this class can implement the
{@code Enumeration} interface.

@return  {@code true} if there are more tokens;
         {@code false} otherwise.
@see     java.util.Enumeration
@see     java.util.StringTokenizer#hasMoreTokens()

## StringTokenizer.nextElement()

```java
public Object nextElement()
```

Returns the same value as the {@code nextToken} method,
except that its declared return value is {@code Object} rather than
{@code String}. It exists so that this class can implement the
{@code Enumeration} interface.

@return     the next token in the string.
@throws     NoSuchElementException  if there are no more tokens in this
              tokenizer's string.
@see        java.util.Enumeration
@see        java.util.StringTokenizer#nextToken()

## StringTokenizer.countTokens()

```java
public int countTokens()
```

Calculates the number of times that this tokenizer's
{@code nextToken} method can be called before it generates an
exception. The current position is not advanced.

@return  the number of tokens remaining in the string using the current
         delimiter set.
@see     java.util.StringTokenizer#nextToken()