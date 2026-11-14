# Scanner class (java.util)

```java
public final class Scanner implements Iterator<String>, Closeable
```

A simple text scanner which can parse primitive types and strings using
regular expressions.

<p>A {@code Scanner} breaks its input into tokens using a
delimiter pattern, which by default matches whitespace. The resulting
tokens may then be converted into values of different types using the
various {@code next} methods.

<p>For example, this code allows a user to read a number from
the console.
{@snippet :
    var con = System.console();
    if (con != null) {
        // @link substring="reader()" target="java.io.Console#reader()" :
        Scanner sc = new Scanner(con.reader());
        int i = sc.nextInt();
    }
}

<p>This code allows {@code long} types to be
assigned from entries in a file {@code myNumbers}:
{@snippet :
     Scanner sc = new Scanner(new File("myNumbers"));
     while (sc.hasNextLong()) {
         long aLong = sc.nextLong();
     }
}

<p>This code uses a {@code Scanner} to read lines from {@link System#in}. The
{@code Scanner} uses the system property value of
{@link System##stdin.encoding stdin.encoding} as the {@code Charset}. Specifying
the charset explicitly is important when reading from {@code System.in}, as it
may differ from the {@link Charset#defaultCharset() default charset} depending
on the host environment or user configuration:
{@snippet :
     Scanner sc = new Scanner(System.in, System.getProperty("stdin.encoding"));
     while (sc.hasNextLine()) {
         String aLine = sc.nextLine();
     }
}

<p>The scanner can also use delimiters other than whitespace. This
example reads several items in from a string:
{@snippet :
    String input = "1 fish 2 fish red fish blue fish";
    Scanner s = new Scanner(input).useDelimiter("\\s*fish\\s*");
    System.out.println(s.nextInt());
    System.out.println(s.nextInt());
    System.out.println(s.next());
    System.out.println(s.next());
    s.close();
}
<p>
prints the following output:
<blockquote><pre>{@code
    1
    2
    red
    blue
}</pre></blockquote>

<p>The same output can be generated with this code, which uses a regular
expression to parse all four tokens at once:
{@snippet :
    String input = "1 fish 2 fish red fish blue fish";
    Scanner s = new Scanner(input);
    s.findInLine("(\\d+) fish (\\d+) fish (\\w+) fish (\\w+)");
    MatchResult result = s.match();
    for (int i=1; i<=result.groupCount(); i++)
        System.out.println(result.group(i));
    s.close();
}

<p>The <a id="default-delimiter">default whitespace delimiter</a> used
by a scanner is as recognized by {@link Character#isWhitespace(char)
Character.isWhitespace()}. The {@link #reset reset()}
method will reset the value of the scanner's delimiter to the default
whitespace delimiter regardless of whether it was previously changed.

<p>A scanning operation may block waiting for input.

<p>The {@link #next} and {@link #hasNext} methods and their
companion methods (such as {@link #nextInt} and
{@link #hasNextInt}) first skip any input that matches the delimiter
pattern, and then attempt to return the next token. Both {@code hasNext()}
and {@code next()} methods may block waiting for further input.  Whether a
{@code hasNext()} method blocks has no connection to whether or not its
associated {@code next()} method will block. The {@link #tokens} method
may also block waiting for input.

<p>The {@link #findInLine findInLine()},
{@link #findWithinHorizon findWithinHorizon()},
{@link #skip skip()}, and {@link #findAll findAll()}
methods operate independently of the delimiter pattern. These methods will
attempt to match the specified pattern with no regard to delimiters in the
input and thus can be used in special circumstances where delimiters are
not relevant. These methods may block waiting for more input.

<p>When a scanner throws an {@link InputMismatchException}, the scanner
will not pass the token that caused the exception, so that it may be
retrieved or skipped via some other method.

<p>Depending upon the type of delimiting pattern, empty tokens may be
returned. For example, the pattern {@code "\\s+"} will return no empty
tokens since it matches multiple instances of the delimiter. The delimiting
pattern {@code "\\s"} could return empty tokens since it only passes one
space at a time.

<p> A scanner can read text from any object which implements the {@link
java.lang.Readable} interface.  If an invocation of the underlying
readable's {@link java.lang.Readable#read read()} method throws an {@link
java.io.IOException} then the scanner assumes that the end of the input
has been reached.  The most recent {@code IOException} thrown by the
underlying readable can be retrieved via the {@link #ioException} method.

<p>When a {@code Scanner} is closed, it will close its input source
if the source implements the {@link java.io.Closeable} interface.

<p>A {@code Scanner} is not safe for multithreaded use without
external synchronization.

<p>Unless otherwise mentioned, passing a {@code null} parameter into
any method of a {@code Scanner} will cause a
{@code NullPointerException} to be thrown.

<p>A scanner will default to interpreting numbers as decimal unless a
different radix has been set by using the {@link #useRadix} method. The
{@link #reset} method will reset the value of the scanner's radix to
{@code 10} regardless of whether it was previously changed.

<h2> <a id="localized-numbers">Localized numbers</a> </h2>

<p> An instance of this class is capable of scanning numbers in the standard
formats as well as in the formats of the scanner's locale. A scanner's
<a id="initial-locale">initial locale </a>is the value returned by the {@link
java.util.Locale#getDefault(Locale.Category)
Locale.getDefault(Locale.Category.FORMAT)} method; it may be changed via the {@link
#useLocale useLocale()} method. The {@link #reset} method will reset the value of the
scanner's locale to the initial locale regardless of whether it was
previously changed.

<p>The localized formats are defined in terms of the following parameters,
which for a particular locale are taken from that locale's {@link
java.text.DecimalFormat DecimalFormat} object, {@code df}, and its
{@link java.text.DecimalFormatSymbols DecimalFormatSymbols} object,
{@code dfs}.

<blockquote><dl>
    <dt><i>LocalGroupSeparator&nbsp;&nbsp;</i>
        <dd>The character used to separate thousands groups,
        <i>i.e.,</i>&nbsp;{@code dfs.}{@link
        java.text.DecimalFormatSymbols#getGroupingSeparator
        getGroupingSeparator()}
    <dt><i>LocalDecimalSeparator&nbsp;&nbsp;</i>
        <dd>The character used for the decimal point,
    <i>i.e.,</i>&nbsp;{@code dfs.}{@link
    java.text.DecimalFormatSymbols#getDecimalSeparator
    getDecimalSeparator()}
    <dt><i>LocalPositivePrefix&nbsp;&nbsp;</i>
        <dd>The string that appears before a positive number (may
        be empty), <i>i.e.,</i>&nbsp;{@code df.}{@link
        java.text.DecimalFormat#getPositivePrefix
        getPositivePrefix()}
    <dt><i>LocalPositiveSuffix&nbsp;&nbsp;</i>
        <dd>The string that appears after a positive number (may be
        empty), <i>i.e.,</i>&nbsp;{@code df.}{@link
        java.text.DecimalFormat#getPositiveSuffix
        getPositiveSuffix()}
    <dt><i>LocalNegativePrefix&nbsp;&nbsp;</i>
        <dd>The string that appears before a negative number (may
        be empty), <i>i.e.,</i>&nbsp;{@code df.}{@link
        java.text.DecimalFormat#getNegativePrefix
        getNegativePrefix()}
    <dt><i>LocalNegativeSuffix&nbsp;&nbsp;</i>
        <dd>The string that appears after a negative number (may be
        empty), <i>i.e.,</i>&nbsp;{@code df.}{@link
    java.text.DecimalFormat#getNegativeSuffix
    getNegativeSuffix()}
    <dt><i>LocalNaN&nbsp;&nbsp;</i>
        <dd>The string that represents not-a-number for
        floating-point values,
        <i>i.e.,</i>&nbsp;{@code dfs.}{@link
        java.text.DecimalFormatSymbols#getNaN
        getNaN()}
    <dt><i>LocalInfinity&nbsp;&nbsp;</i>
        <dd>The string that represents infinity for floating-point
        values, <i>i.e.,</i>&nbsp;{@code dfs.}{@link
        java.text.DecimalFormatSymbols#getInfinity
        getInfinity()}
</dl></blockquote>

<h3> <a id="number-syntax">Number syntax</a> </h3>

<p> The strings that can be parsed as numbers by an instance of this class
are specified in terms of the following regular-expression grammar, where
Rmax is the highest digit in the radix being used (for example, Rmax is 9 in base 10).

<dl>
  <dt><i>NonAsciiDigit</i>:
      <dd>A non-ASCII character c for which
           {@link java.lang.Character#isDigit Character.isDigit}{@code (c)}
                       returns&nbsp;true

  <dt><i>Non0Digit</i>:
      <dd>{@code [1-}<i>Rmax</i>{@code ] | }<i>NonASCIIDigit</i>

  <dt><i>Digit</i>:
      <dd>{@code [0-}<i>Rmax</i>{@code ] | }<i>NonASCIIDigit</i>

  <dt><i>GroupedNumeral</i>:
      <dd><code>(&nbsp;</code><i>Non0Digit</i>
                  <i>Digit</i>{@code ?
                  }<i>Digit</i>{@code ?}
      <dd>&nbsp;&nbsp;&nbsp;&nbsp;<code>(&nbsp;</code><i>LocalGroupSeparator</i>
                        <i>Digit</i>
                        <i>Digit</i>
                        <i>Digit</i>{@code  )+ )}

  <dt><i>Numeral</i>:
      <dd>{@code ( ( }<i>Digit</i>{@code + )
              | }<i>GroupedNumeral</i>{@code  )}

  <dt><a id="Integer-regex"><i>Integer</i>:</a>
      <dd>{@code ( [-+]? ( }<i>Numeral</i>{@code
                              ) )}
      <dd>{@code | }<i>LocalPositivePrefix</i> <i>Numeral</i>
                     <i>LocalPositiveSuffix</i>
      <dd>{@code | }<i>LocalNegativePrefix</i> <i>Numeral</i>
                <i>LocalNegativeSuffix</i>

  <dt><i>DecimalNumeral</i>:
      <dd><i>Numeral</i>
      <dd>{@code | }<i>Numeral</i>
                <i>LocalDecimalSeparator</i>
                <i>Digit</i>{@code *}
      <dd>{@code | }<i>LocalDecimalSeparator</i>
                <i>Digit</i>{@code +}

  <dt><i>Exponent</i>:
      <dd>{@code ( [eE] [+-]? }<i>Digit</i>{@code + )}

  <dt><a id="Decimal-regex"><i>Decimal</i>:</a>
      <dd>{@code ( [-+]? }<i>DecimalNumeral</i>
                        <i>Exponent</i>{@code ? )}
      <dd>{@code | }<i>LocalPositivePrefix</i>
                <i>DecimalNumeral</i>
                <i>LocalPositiveSuffix</i>
                <i>Exponent</i>{@code ?}
      <dd>{@code | }<i>LocalNegativePrefix</i>
                <i>DecimalNumeral</i>
                <i>LocalNegativeSuffix</i>
                <i>Exponent</i>{@code ?}

  <dt><i>HexFloat</i>:
      <dd>{@code [-+]? 0[xX][0-9a-fA-F]*\.[0-9a-fA-F]+
                ([pP][-+]?[0-9]+)?}

  <dt><i>NonNumber</i>:
      <dd>{@code NaN
                         | }<i>LocalNan</i>{@code
                         | Infinity
                         | }<i>LocalInfinity</i>

  <dt><i>SignedNonNumber</i>:
      <dd>{@code ( [-+]? }<i>NonNumber</i>{@code  )}
      <dd>{@code | }<i>LocalPositivePrefix</i>
                <i>NonNumber</i>
                <i>LocalPositiveSuffix</i>
      <dd>{@code | }<i>LocalNegativePrefix</i>
                <i>NonNumber</i>
                <i>LocalNegativeSuffix</i>

  <dt><a id="Float-regex"><i>Float</i></a>:
      <dd><i>Decimal</i>
          {@code | }<i>HexFloat</i>
          {@code | }<i>SignedNonNumber</i>

</dl>
<p>Whitespace is not significant in the above regular expressions.

@since   1.5

## Scanner.Scanner(Readable)

```java
public Scanner(Readable source)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified source.

@param  source A character source implementing the {@link Readable}
        interface

## Scanner.Scanner(InputStream)

```java
public Scanner(InputStream source)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified input stream. Bytes from the stream are converted
into characters using the
{@linkplain Charset#defaultCharset() default charset}.

@param  source An input stream to be scanned
@see Charset#defaultCharset()

## Scanner.Scanner(InputStream, String)

```java
public Scanner(InputStream source, String charsetName)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified input stream. Bytes from the stream are converted
into characters using the specified charset.

@param  source An input stream to be scanned
@param charsetName The encoding type used to convert bytes from the
       stream into characters to be scanned
@throws IllegalArgumentException if the specified character set
        does not exist

## Scanner.Scanner(InputStream, Charset)

```java
public Scanner(InputStream source, Charset charset)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified input stream. Bytes from the stream are converted
into characters using the specified charset.

@param  source an input stream to be scanned
@param  charset the charset used to convert bytes from the file
        into characters to be scanned
@since  10

## Scanner.Scanner(File)

```java
public Scanner(File source) throws FileNotFoundException
```

Constructs a new {@code Scanner} that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the
{@linkplain Charset#defaultCharset() default charset}.

@param  source A file to be scanned
@throws FileNotFoundException if source is not found
@see Charset#defaultCharset()

## Scanner.Scanner(File, String)

```java
public Scanner(File source, String charsetName) throws FileNotFoundException
```

Constructs a new {@code Scanner} that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

@param  source A file to be scanned
@param charsetName The encoding type used to convert bytes from the file
       into characters to be scanned
@throws FileNotFoundException if source is not found
@throws IllegalArgumentException if the specified encoding is
        not found

## Scanner.Scanner(File, Charset)

```java
public Scanner(File source, Charset charset) throws IOException
```

Constructs a new {@code Scanner} that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

@param  source A file to be scanned
@param  charset The charset used to convert bytes from the file
        into characters to be scanned
@throws IOException
        if an I/O error occurs opening the source
@since  10

## Scanner.Scanner(Path)

```java
public Scanner(Path source) throws IOException
```

Constructs a new {@code Scanner} that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the
{@linkplain Charset#defaultCharset() default charset}.

@param   source
         the path to the file to be scanned
@throws  IOException
         if an I/O error occurs opening source
@see Charset#defaultCharset()

@since   1.7

## Scanner.Scanner(Path, String)

```java
public Scanner(Path source, String charsetName) throws IOException
```

Constructs a new {@code Scanner} that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

@param   source
         the path to the file to be scanned
@param   charsetName
         The encoding type used to convert bytes from the file
         into characters to be scanned
@throws  IOException
         if an I/O error occurs opening source
@throws  IllegalArgumentException
         if the specified encoding is not found
@since   1.7

## Scanner.Scanner(Path, Charset)

```java
public Scanner(Path source, Charset charset) throws IOException
```

Constructs a new {@code Scanner} that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

@param   source
         the path to the file to be scanned
@param   charset
         the charset used to convert bytes from the file
         into characters to be scanned
@throws  IOException
         if an I/O error occurs opening the source
@since   10

## Scanner.Scanner(String)

```java
public Scanner(String source)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified string.

@param  source A string to scan

## Scanner.Scanner(ReadableByteChannel)

```java
public Scanner(ReadableByteChannel source)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified channel. Bytes from the source are converted into
characters using the
{@linkplain Charset#defaultCharset() default charset}.

@param  source A channel to scan
@see Charset#defaultCharset()

## Scanner.Scanner(ReadableByteChannel, String)

```java
public Scanner(ReadableByteChannel source, String charsetName)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified channel. Bytes from the source are converted into
characters using the specified charset.

@param  source A channel to scan
@param charsetName The encoding type used to convert bytes from the
       channel into characters to be scanned
@throws IllegalArgumentException if the specified character set
        does not exist

## Scanner.Scanner(ReadableByteChannel, Charset)

```java
public Scanner(ReadableByteChannel source, Charset charset)
```

Constructs a new {@code Scanner} that produces values scanned
from the specified channel. Bytes from the source are converted into
characters using the specified charset.

@param source a channel to scan
@param charset the encoding type used to convert bytes from the
       channel into characters to be scanned
@since 10

## Scanner.close()

```java
public void close()
```

Closes this scanner.

<p> If this scanner has not yet been closed then if its underlying
{@linkplain java.lang.Readable readable} also implements the {@link
java.io.Closeable} interface then the readable's {@code close} method
will be invoked.  If this scanner is already closed then invoking this
method will have no effect.

<p>Attempting to perform search operations after a scanner has
been closed will result in an {@link IllegalStateException}.

## Scanner.ioException()

```java
public IOException ioException()
```

Returns the {@code IOException} last thrown by this
{@code Scanner}'s underlying {@code Readable}. This method
returns {@code null} if no such exception exists.

@return the last exception thrown by this scanner's readable

## Scanner.delimiter()

```java
public Pattern delimiter()
```

Returns the {@code Pattern} this {@code Scanner} is currently
using to match delimiters.

@return this scanner's delimiting pattern.

## Scanner.useDelimiter(Pattern)

```java
public Scanner useDelimiter(Pattern pattern)
```

Sets this scanner's delimiting pattern to the specified pattern.

@param pattern A delimiting pattern
@return this scanner

## Scanner.useDelimiter(String)

```java
public Scanner useDelimiter(String pattern)
```

Sets this scanner's delimiting pattern to a pattern constructed from
the specified {@code String}.

<p> An invocation of this method of the form
{@code useDelimiter(pattern)} behaves in exactly the same way as the
invocation {@code useDelimiter(Pattern.compile(pattern))}.

<p> Invoking the {@link #reset} method will set the scanner's delimiter
to the <a href= "#default-delimiter">default</a>.

@param pattern A string specifying a delimiting pattern
@return this scanner

## Scanner.locale()

```java
public Locale locale()
```

Returns this scanner's locale.

<p>A scanner's locale affects many elements of its default
primitive matching regular expressions; see
<a href= "#localized-numbers">localized numbers</a> above.

@return this scanner's locale

## Scanner.useLocale(Locale)

```java
public Scanner useLocale(Locale locale)
```

Sets this scanner's locale to the specified locale.

<p>A scanner's locale affects many elements of its default
primitive matching regular expressions; see
<a href= "#localized-numbers">localized numbers</a> above.

<p>Invoking the {@link #reset} method will set the scanner's locale to
the <a href= "#initial-locale">initial locale</a>.

@param locale A string specifying the locale to use
@return this scanner

## Scanner.radix()

```java
public int radix()
```

Returns this scanner's default radix.

<p>A scanner's radix affects elements of its default
number matching regular expressions; see
<a href= "#localized-numbers">localized numbers</a> above.

@return the default radix of this scanner

## Scanner.useRadix(int)

```java
public Scanner useRadix(int radix)
```

Sets this scanner's default radix to the specified radix.

<p>A scanner's radix affects elements of its default
number matching regular expressions; see
<a href= "#localized-numbers">localized numbers</a> above.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

<p>Invoking the {@link #reset} method will set the scanner's radix to
{@code 10}.

@param radix The radix to use when scanning numbers
@return this scanner
@throws IllegalArgumentException if radix is out of range

## Scanner.match()

```java
public MatchResult match()
```

Returns the match result of the last scanning operation performed
by this scanner. This method throws {@code IllegalStateException}
if no match has been performed, or if the last match was
not successful.

<p>The various {@code next} methods of {@code Scanner}
make a match result available if they complete without throwing an
exception. For instance, after an invocation of the {@link #nextInt}
method that returned an int, this method returns a
{@code MatchResult} for the search of the
<a href="#Integer-regex"><i>Integer</i></a> regular expression
defined above. Similarly the {@link #findInLine findInLine()},
{@link #findWithinHorizon findWithinHorizon()}, and {@link #skip skip()}
methods will make a match available if they succeed.

@return a match result for the last match operation
@throws IllegalStateException  If no match result is available

## Scanner.toString()

```java
public String toString()
```

<p>Returns the string representation of this {@code Scanner}. The
string representation of a {@code Scanner} contains information
that may be useful for debugging. The exact format is unspecified.

@return  The string representation of this scanner

## Scanner.hasNext()

```java
public boolean hasNext()
```

Returns true if this scanner has another token in its input.
This method may block while waiting for input to scan.
The scanner does not advance past any input.

@return true if and only if this scanner has another token
@throws IllegalStateException if this scanner is closed
@see java.util.Iterator

## Scanner.next()

```java
public String next()
```

Finds and returns the next complete token from this scanner.
A complete token is preceded and followed by input that matches
the delimiter pattern. This method may block while waiting for input
to scan, even if a previous invocation of {@link #hasNext} returned
{@code true}.

@return the next token
@throws NoSuchElementException if no more tokens are available
@throws IllegalStateException if this scanner is closed
@see java.util.Iterator

## Scanner.remove()

```java
public void remove()
```

The remove operation is not supported by this implementation of
{@code Iterator}.

@throws UnsupportedOperationException if this method is invoked.
@see java.util.Iterator

## Scanner.hasNext(String)

```java
public boolean hasNext(String pattern)
```

Returns true if the next token matches the pattern constructed from the
specified string. The scanner does not advance past any input.

<p> An invocation of this method of the form {@code hasNext(pattern)}
behaves in exactly the same way as the invocation
{@code hasNext(Pattern.compile(pattern))}.

@param pattern a string specifying the pattern to scan
@return true if and only if this scanner has another token matching
        the specified pattern
@throws IllegalStateException if this scanner is closed

## Scanner.next(String)

```java
public String next(String pattern)
```

Returns the next token if it matches the pattern constructed from the
specified string.  If the match is successful, the scanner advances
past the input that matched the pattern.

<p> An invocation of this method of the form {@code next(pattern)}
behaves in exactly the same way as the invocation
{@code next(Pattern.compile(pattern))}.

@param pattern a string specifying the pattern to scan
@return the next token
@throws NoSuchElementException if no such tokens are available
@throws IllegalStateException if this scanner is closed

## Scanner.hasNext(Pattern)

```java
public boolean hasNext(Pattern pattern)
```

Returns true if the next complete token matches the specified pattern.
A complete token is prefixed and postfixed by input that matches
the delimiter pattern. This method may block while waiting for input.
The scanner does not advance past any input.

@param pattern the pattern to scan for
@return true if and only if this scanner has another token matching
        the specified pattern
@throws IllegalStateException if this scanner is closed

## Scanner.next(Pattern)

```java
public String next(Pattern pattern)
```

Returns the next token if it matches the specified pattern. This
method may block while waiting for input to scan, even if a previous
invocation of {@link #hasNext(Pattern)} returned {@code true}.
If the match is successful, the scanner advances past the input that
matched the pattern.

@param pattern the pattern to scan for
@return the next token
@throws NoSuchElementException if no more tokens are available
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextLine()

```java
public boolean hasNextLine()
```

Returns true if there is another line in the input of this scanner.
This method may block while waiting for input. The scanner does not
advance past any input.

@return true if there is a line separator in the remaining input
or if the input has other remaining characters
@throws IllegalStateException if this scanner is closed

## Scanner.nextLine()

```java
public String nextLine()
```

Advances this scanner past the current line and returns the input
that was skipped.

This method returns the rest of the current line, excluding any line
separator at the end. The position is set to the beginning of the next
line.

<p>Since this method continues to search through the input looking
for a line separator, it may buffer all of the input searching for
the line to skip if no line separators are present.

@return the line that was skipped
@throws NoSuchElementException if no line was found
@throws IllegalStateException if this scanner is closed

## Scanner.findInLine(String)

```java
public String findInLine(String pattern)
```

Attempts to find the next occurrence of a pattern constructed from the
specified string, ignoring delimiters.

<p>An invocation of this method of the form {@code findInLine(pattern)}
behaves in exactly the same way as the invocation
{@code findInLine(Pattern.compile(pattern))}.

@param pattern a string specifying the pattern to search for
@return the text that matched the specified pattern
@throws IllegalStateException if this scanner is closed

## Scanner.findInLine(Pattern)

```java
public String findInLine(Pattern pattern)
```

Attempts to find the next occurrence of the specified pattern ignoring
delimiters. If the pattern is found before the next line separator, the
scanner advances past the input that matched and returns the string that
matched the pattern.
If no such pattern is detected in the input up to the next line
separator, then {@code null} is returned and the scanner's
position is unchanged. This method may block waiting for input that
matches the pattern.

<p>Since this method continues to search through the input looking
for the specified pattern, it may buffer all of the input searching for
the desired token if no line separators are present.

@param pattern the pattern to scan for
@return the text that matched the specified pattern
@throws IllegalStateException if this scanner is closed

## Scanner.findWithinHorizon(String, int)

```java
public String findWithinHorizon(String pattern, int horizon)
```

Attempts to find the next occurrence of a pattern constructed from the
specified string, ignoring delimiters.

<p>An invocation of this method of the form
{@code findWithinHorizon(pattern)} behaves in exactly the same way as
the invocation
{@code findWithinHorizon(Pattern.compile(pattern), horizon)}.

@param pattern a string specifying the pattern to search for
@param horizon the search horizon
@return the text that matched the specified pattern
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if horizon is negative

## Scanner.findWithinHorizon(Pattern, int)

```java
public String findWithinHorizon(Pattern pattern, int horizon)
```

Attempts to find the next occurrence of the specified pattern.

<p>This method searches through the input up to the specified
search horizon, ignoring delimiters. If the pattern is found the
scanner advances past the input that matched and returns the string
that matched the pattern. If no such pattern is detected then the
null is returned and the scanner's position remains unchanged. This
method may block waiting for input that matches the pattern.

<p>A scanner will never search more than {@code horizon} code
points beyond its current position. Note that a match may be clipped
by the horizon; that is, an arbitrary match result may have been
different if the horizon had been larger. The scanner treats the
horizon as a transparent, non-anchoring bound (see {@link
Matcher#useTransparentBounds} and {@link Matcher#useAnchoringBounds}).

<p>If horizon is {@code 0}, then the horizon is ignored and
this method continues to search through the input looking for the
specified pattern without bound. In this case it may buffer all of
the input searching for the pattern.

<p>If horizon is negative, then an IllegalArgumentException is
thrown.

@param pattern the pattern to scan for
@param horizon the search horizon
@return the text that matched the specified pattern
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if horizon is negative

## Scanner.skip(Pattern)

```java
public Scanner skip(Pattern pattern)
```

Skips input that matches the specified pattern, ignoring delimiters.
This method will skip input if an anchored match of the specified
pattern succeeds.

<p>If a match to the specified pattern is not found at the
current position, then no input is skipped and a
{@code NoSuchElementException} is thrown.

<p>Since this method seeks to match the specified pattern starting at
the scanner's current position, patterns that can match a lot of
input (".*", for example) may cause the scanner to buffer a large
amount of input.

<p>Note that it is possible to skip something without risking a
{@code NoSuchElementException} by using a pattern that can
match nothing, e.g., {@code sc.skip("[ \t]*")}.

@param pattern the pattern to skip over
@return this scanner
@throws NoSuchElementException if the specified pattern is not found
@throws IllegalStateException if this scanner is closed

## Scanner.skip(String)

```java
public Scanner skip(String pattern)
```

Skips input that matches a pattern constructed from the specified
string.

<p> An invocation of this method of the form {@code skip(pattern)}
behaves in exactly the same way as the invocation
{@code skip(Pattern.compile(pattern))}.

@param pattern a string specifying the pattern to skip over
@return this scanner
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextBoolean()

```java
public boolean hasNextBoolean()
```

Returns true if the next token in this scanner's input can be
interpreted as a boolean value using a case insensitive pattern
created from the string "true|false".  The scanner does not
advance past the input that matched.

@return true if and only if this scanner's next token is a valid
        boolean value
@throws IllegalStateException if this scanner is closed

## Scanner.nextBoolean()

```java
public boolean nextBoolean()
```

Scans the next token of the input into a boolean value and returns
that value. This method will throw {@code InputMismatchException}
if the next token cannot be translated into a valid boolean value.
If the match is successful, the scanner advances past the input that
matched.

@return the boolean scanned from the input
@throws InputMismatchException if the next token is not a valid boolean
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextByte()

```java
public boolean hasNextByte()
```

Returns true if the next token in this scanner's input can be
interpreted as a byte value in the default radix using the
{@link #nextByte} method. The scanner does not advance past any input.

@return true if and only if this scanner's next token is a valid
        byte value
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextByte(int)

```java
public boolean hasNextByte(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a byte value in the specified radix using the
{@link #nextByte} method. The scanner does not advance past any input.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as a byte value
@return true if and only if this scanner's next token is a valid
        byte value
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.nextByte()

```java
public byte nextByte()
```

Scans the next token of the input as a {@code byte}.

<p> An invocation of this method of the form
{@code nextByte()} behaves in exactly the same way as the
invocation {@code nextByte(radix)}, where {@code radix}
is the default radix of this scanner.

@return the {@code byte} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.nextByte(int)

```java
public byte nextByte(int radix)
```

Scans the next token of the input as a {@code byte}.
This method will throw {@code InputMismatchException}
if the next token cannot be translated into a valid byte value as
described below. If the translation is successful, the scanner advances
past the input that matched.

<p> If the next token matches the <a
href="#Integer-regex"><i>Integer</i></a> regular expression defined
above then the token is converted into a {@code byte} value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via {@link Character#digit Character.digit}, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
{@link Byte#parseByte(String, int) Byte.parseByte} with the
specified radix.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as a byte value
@return the {@code byte} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.hasNextShort()

```java
public boolean hasNextShort()
```

Returns true if the next token in this scanner's input can be
interpreted as a short value in the default radix using the
{@link #nextShort} method. The scanner does not advance past any input.

@return true if and only if this scanner's next token is a valid
        short value in the default radix
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextShort(int)

```java
public boolean hasNextShort(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a short value in the specified radix using the
{@link #nextShort} method. The scanner does not advance past any input.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as a short value
@return true if and only if this scanner's next token is a valid
        short value in the specified radix
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.nextShort()

```java
public short nextShort()
```

Scans the next token of the input as a {@code short}.

<p> An invocation of this method of the form
{@code nextShort()} behaves in exactly the same way as the
invocation {@link #nextShort(int) nextShort(radix)}, where {@code radix}
is the default radix of this scanner.

@return the {@code short} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.nextShort(int)

```java
public short nextShort(int radix)
```

Scans the next token of the input as a {@code short}.
This method will throw {@code InputMismatchException}
if the next token cannot be translated into a valid short value as
described below. If the translation is successful, the scanner advances
past the input that matched.

<p> If the next token matches the <a
href="#Integer-regex"><i>Integer</i></a> regular expression defined
above then the token is converted into a {@code short} value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via {@link Character#digit Character.digit}, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
{@link Short#parseShort(String, int) Short.parseShort} with the
specified radix.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as a short value
@return the {@code short} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.hasNextInt()

```java
public boolean hasNextInt()
```

Returns true if the next token in this scanner's input can be
interpreted as an int value in the default radix using the
{@link #nextInt} method. The scanner does not advance past any input.

@return true if and only if this scanner's next token is a valid
        int value
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextInt(int)

```java
public boolean hasNextInt(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as an int value in the specified radix using the
{@link #nextInt} method. The scanner does not advance past any input.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as an int value
@return true if and only if this scanner's next token is a valid
        int value
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.nextInt()

```java
public int nextInt()
```

Scans the next token of the input as an {@code int}.

<p> An invocation of this method of the form
{@code nextInt()} behaves in exactly the same way as the
invocation {@code nextInt(radix)}, where {@code radix}
is the default radix of this scanner.

@return the {@code int} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.nextInt(int)

```java
public int nextInt(int radix)
```

Scans the next token of the input as an {@code int}.
This method will throw {@code InputMismatchException}
if the next token cannot be translated into a valid int value as
described below. If the translation is successful, the scanner advances
past the input that matched.

<p> If the next token matches the <a
href="#Integer-regex"><i>Integer</i></a> regular expression defined
above then the token is converted into an {@code int} value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via {@link Character#digit Character.digit}, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
{@link Integer#parseInt(String, int) Integer.parseInt} with the
specified radix.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as an int value
@return the {@code int} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.hasNextLong()

```java
public boolean hasNextLong()
```

Returns true if the next token in this scanner's input can be
interpreted as a long value in the default radix using the
{@link #nextLong} method. The scanner does not advance past any input.

@return true if and only if this scanner's next token is a valid
        long value
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextLong(int)

```java
public boolean hasNextLong(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a long value in the specified radix using the
{@link #nextLong} method. The scanner does not advance past any input.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as a long value
@return true if and only if this scanner's next token is a valid
        long value
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.nextLong()

```java
public long nextLong()
```

Scans the next token of the input as a {@code long}.

<p> An invocation of this method of the form
{@code nextLong()} behaves in exactly the same way as the
invocation {@code nextLong(radix)}, where {@code radix}
is the default radix of this scanner.

@return the {@code long} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.nextLong(int)

```java
public long nextLong(int radix)
```

Scans the next token of the input as a {@code long}.
This method will throw {@code InputMismatchException}
if the next token cannot be translated into a valid long value as
described below. If the translation is successful, the scanner advances
past the input that matched.

<p> If the next token matches the <a
href="#Integer-regex"><i>Integer</i></a> regular expression defined
above then the token is converted into a {@code long} value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via {@link Character#digit Character.digit}, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
{@link Long#parseLong(String, int) Long.parseLong} with the
specified radix.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as an int value
@return the {@code long} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.hasNextFloat()

```java
public boolean hasNextFloat()
```

Returns true if the next token in this scanner's input can be
interpreted as a float value using the {@link #nextFloat}
method. The scanner does not advance past any input.

@return true if and only if this scanner's next token is a valid
        float value
@throws IllegalStateException if this scanner is closed

## Scanner.nextFloat()

```java
public float nextFloat()
```

Scans the next token of the input as a {@code float}.
This method will throw {@code InputMismatchException}
if the next token cannot be translated into a valid float value as
described below. If the translation is successful, the scanner advances
past the input that matched.

<p> If the next token matches the <a
href="#Float-regex"><i>Float</i></a> regular expression defined above
then the token is converted into a {@code float} value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via {@link Character#digit Character.digit}, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
{@link Float#parseFloat Float.parseFloat}. If the token matches
the localized NaN or infinity strings, then either "Nan" or "Infinity"
is passed to {@link Float#parseFloat(String) Float.parseFloat} as
appropriate.

@return the {@code float} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Float</i>
        regular expression, or is out of range
@throws NoSuchElementException if input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextDouble()

```java
public boolean hasNextDouble()
```

Returns true if the next token in this scanner's input can be
interpreted as a double value using the {@link #nextDouble}
method. The scanner does not advance past any input.

@return true if and only if this scanner's next token is a valid
        double value
@throws IllegalStateException if this scanner is closed

## Scanner.nextDouble()

```java
public double nextDouble()
```

Scans the next token of the input as a {@code double}.
This method will throw {@code InputMismatchException}
if the next token cannot be translated into a valid double value.
If the translation is successful, the scanner advances past the input
that matched.

<p> If the next token matches the <a
href="#Float-regex"><i>Float</i></a> regular expression defined above
then the token is converted into a {@code double} value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via {@link Character#digit Character.digit}, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
{@link Double#parseDouble Double.parseDouble}. If the token matches
the localized NaN or infinity strings, then either "Nan" or "Infinity"
is passed to {@link Double#parseDouble(String) Double.parseDouble} as
appropriate.

@return the {@code double} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Float</i>
        regular expression, or is out of range
@throws NoSuchElementException if the input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextBigInteger()

```java
public boolean hasNextBigInteger()
```

Returns true if the next token in this scanner's input can be
interpreted as a {@code BigInteger} in the default radix using the
{@link #nextBigInteger} method. The scanner does not advance past any
input.

@return true if and only if this scanner's next token is a valid
        {@code BigInteger}
@throws IllegalStateException if this scanner is closed

## Scanner.hasNextBigInteger(int)

```java
public boolean hasNextBigInteger(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a {@code BigInteger} in the specified radix using
the {@link #nextBigInteger} method. The scanner does not advance past
any input.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token as an integer
@return true if and only if this scanner's next token is a valid
        {@code BigInteger}
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.nextBigInteger()

```java
public BigInteger nextBigInteger()
```

Scans the next token of the input as a {@link java.math.BigInteger
BigInteger}.

<p> An invocation of this method of the form
{@code nextBigInteger()} behaves in exactly the same way as the
invocation {@code nextBigInteger(radix)}, where {@code radix}
is the default radix of this scanner.

@return the {@code BigInteger} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if the input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.nextBigInteger(int)

```java
public BigInteger nextBigInteger(int radix)
```

Scans the next token of the input as a {@link java.math.BigInteger
BigInteger}.

<p> If the next token matches the <a
href="#Integer-regex"><i>Integer</i></a> regular expression defined
above then the token is converted into a {@code BigInteger} value as if
by removing all group separators, mapping non-ASCII digits into ASCII
digits via the {@link Character#digit Character.digit}, and passing the
resulting string to the {@link
java.math.BigInteger#BigInteger(java.lang.String)
BigInteger(String, int)} constructor with the specified radix.

<p>If the radix is less than {@link Character#MIN_RADIX Character.MIN_RADIX}
or greater than {@link Character#MAX_RADIX Character.MAX_RADIX}, then an
{@code IllegalArgumentException} is thrown.

@param radix the radix used to interpret the token
@return the {@code BigInteger} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Integer</i>
        regular expression, or is out of range
@throws NoSuchElementException if the input is exhausted
@throws IllegalStateException if this scanner is closed
@throws IllegalArgumentException if the radix is out of range

## Scanner.hasNextBigDecimal()

```java
public boolean hasNextBigDecimal()
```

Returns true if the next token in this scanner's input can be
interpreted as a {@code BigDecimal} using the
{@link #nextBigDecimal} method. The scanner does not advance past any
input.

@return true if and only if this scanner's next token is a valid
        {@code BigDecimal}
@throws IllegalStateException if this scanner is closed

## Scanner.nextBigDecimal()

```java
public BigDecimal nextBigDecimal()
```

Scans the next token of the input as a {@link java.math.BigDecimal
BigDecimal}.

<p> If the next token matches the <a
href="#Decimal-regex"><i>Decimal</i></a> regular expression defined
above then the token is converted into a {@code BigDecimal} value as if
by removing all group separators, mapping non-ASCII digits into ASCII
digits via the {@link Character#digit Character.digit}, and passing the
resulting string to the {@link
java.math.BigDecimal#BigDecimal(java.lang.String) BigDecimal(String)}
constructor.

@return the {@code BigDecimal} scanned from the input
@throws InputMismatchException
        if the next token does not match the <i>Decimal</i>
        regular expression, or is out of range
@throws NoSuchElementException if the input is exhausted
@throws IllegalStateException if this scanner is closed

## Scanner.reset()

```java
public Scanner reset()
```

Resets this scanner.

<p> Resetting a scanner discards all of its explicit state
information which may have been changed by invocations of
{@link #useDelimiter useDelimiter()},
{@link #useLocale useLocale()}, or
{@link #useRadix useRadix()}.

<p> An invocation of this method of the form
{@code scanner.reset()} behaves in exactly the same way as the
invocation

<blockquote><pre>{@code
  scanner.useDelimiter("\\p{javaWhitespace}+")
         .useLocale(Locale.getDefault(Locale.Category.FORMAT))
         .useRadix(10);
}</pre></blockquote>

@return this scanner

@since 1.6

## Scanner.tokens()

```java
public Stream<String> tokens()
```

Returns a stream of delimiter-separated tokens from this scanner. The
stream contains the same tokens that would be returned, starting from
this scanner's current state, by calling the {@link #next} method
repeatedly until the {@link #hasNext} method returns false.

<p>The resulting stream is sequential and ordered. All stream elements are
non-null.

<p>Scanning starts upon initiation of the terminal stream operation, using the
current state of this scanner. Subsequent calls to any methods on this scanner
other than {@link #close} and {@link #ioException} may return undefined results
or may cause undefined effects on the returned stream. The returned stream's source
{@code Spliterator} is <em>fail-fast</em> and will, on a best-effort basis, throw a
{@link java.util.ConcurrentModificationException} if any such calls are detected
during stream pipeline execution.

<p>After stream pipeline execution completes, this scanner is left in an indeterminate
state and cannot be reused.

<p>If this scanner contains a resource that must be released, this scanner
should be closed, either by calling its {@link #close} method, or by
closing the returned stream. Closing the stream will close the underlying scanner.
{@code IllegalStateException} is thrown if the scanner has been closed when this
method is called, or if this scanner is closed during stream pipeline execution.

<p>This method might block waiting for more input.

@apiNote
For example, the following code will create a list of
comma-delimited tokens from a string:

<pre>{@code
List<String> result = new Scanner("abc,def,,ghi")
    .useDelimiter(",")
    .tokens()
    .collect(Collectors.toList());
}</pre>

<p>The resulting list would contain {@code "abc"}, {@code "def"},
the empty string, and {@code "ghi"}.

@return a sequential stream of token strings
@throws IllegalStateException if this scanner is closed
@since 9

## Scanner.findAll(Pattern)

```java
public Stream<MatchResult> findAll(Pattern pattern)
```

Returns a stream of match results from this scanner. The stream
contains the same results in the same order that would be returned by
calling {@code findWithinHorizon(pattern, 0)} and then {@link #match}
successively as long as {@link #findWithinHorizon findWithinHorizon()}
finds matches.

<p>The resulting stream is sequential and ordered. All stream elements are
non-null.

<p>Scanning starts upon initiation of the terminal stream operation, using the
current state of this scanner. Subsequent calls to any methods on this scanner
other than {@link #close} and {@link #ioException} may return undefined results
or may cause undefined effects on the returned stream. The returned stream's source
{@code Spliterator} is <em>fail-fast</em> and will, on a best-effort basis, throw a
{@link java.util.ConcurrentModificationException} if any such calls are detected
during stream pipeline execution.

<p>After stream pipeline execution completes, this scanner is left in an indeterminate
state and cannot be reused.

<p>If this scanner contains a resource that must be released, this scanner
should be closed, either by calling its {@link #close} method, or by
closing the returned stream. Closing the stream will close the underlying scanner.
{@code IllegalStateException} is thrown if the scanner has been closed when this
method is called, or if this scanner is closed during stream pipeline execution.

<p>As with the {@link #findWithinHorizon findWithinHorizon()} methods, this method
might block waiting for additional input, and it might buffer an unbounded amount of
input searching for a match.

@apiNote
For example, the following code will read a file and return a list
of all sequences of characters consisting of seven or more Latin capital
letters:

<pre>{@code
try (Scanner sc = new Scanner(Path.of("input.txt"))) {
    Pattern pat = Pattern.compile("[A-Z]{7,}");
    List<String> capWords = sc.findAll(pat)
                              .map(MatchResult::group)
                              .collect(Collectors.toList());
}
}</pre>

@param pattern the pattern to be matched
@return a sequential stream of match results
@throws NullPointerException if pattern is null
@throws IllegalStateException if this scanner is closed
@since 9

## Scanner.findAll(String)

```java
public Stream<MatchResult> findAll(String patString)
```

Returns a stream of match results that match the provided pattern string.
The effect is equivalent to the following code:

<pre>{@code
    scanner.findAll(Pattern.compile(patString))
}</pre>

@param patString the pattern string
@return a sequential stream of match results
@throws NullPointerException if patString is null
@throws IllegalStateException if this scanner is closed
@throws PatternSyntaxException if the regular expression's syntax is invalid
@since 9
@see java.util.regex.Pattern