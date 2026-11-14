---
title: "Scanner class (java.util) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Scanner.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Scanner class (java.util)

```java
public final class Scanner implements Iterator<String>, Closeable
```

A simple text scanner which can parse primitive types and strings using
regular expressions.

A `Scanner` breaks its input into tokens using a
delimiter pattern, which by default matches whitespace. The resulting
tokens may then be converted into values of different types using the
various `next` methods.

For example, this code allows a user to read a number from
the console.

This code allows `long` types to be
assigned from entries in a file `myNumbers`:

This code uses a `Scanner` to read lines from `System.in`. The
`Scanner` uses the system property value of
stdin.encoding as the `Charset`. Specifying
the charset explicitly is important when reading from `System.in`, as it
may differ from the default charset depending
on the host environment or user configuration:

The scanner can also use delimiters other than whitespace. This
example reads several items in from a string:

prints the following output:

```java
    1
    2
    red
    blue
```

The same output can be generated with this code, which uses a regular
expression to parse all four tokens at once:

The default whitespace delimiter used
by a scanner is as recognized by Character.isWhitespace(). The reset()
method will reset the value of the scanner's delimiter to the default
whitespace delimiter regardless of whether it was previously changed.

A scanning operation may block waiting for input.

The `next` and `hasNext` methods and their
companion methods (such as `nextInt` and
`hasNextInt`) first skip any input that matches the delimiter
pattern, and then attempt to return the next token. Both `hasNext()`
and `next()` methods may block waiting for further input.  Whether a
`hasNext()` method blocks has no connection to whether or not its
associated `next()` method will block. The `tokens` method
may also block waiting for input.

The findInLine(),
findWithinHorizon(),
skip(), and findAll()
methods operate independently of the delimiter pattern. These methods will
attempt to match the specified pattern with no regard to delimiters in the
input and thus can be used in special circumstances where delimiters are
not relevant. These methods may block waiting for more input.

When a scanner throws an `InputMismatchException`, the scanner
will not pass the token that caused the exception, so that it may be
retrieved or skipped via some other method.

Depending upon the type of delimiting pattern, empty tokens may be
returned. For example, the pattern `"\\s+"` will return no empty
tokens since it matches multiple instances of the delimiter. The delimiting
pattern `"<example-value>"` could return empty tokens since it only passes one
space at a time.

 A scanner can read text from any object which implements the `java.lang.Readable` interface.  If an invocation of the underlying
readable's read() method throws an `java.io.IOException` then the scanner assumes that the end of the input
has been reached.  The most recent `IOException` thrown by the
underlying readable can be retrieved via the `ioException` method.

When a `Scanner` is closed, it will close its input source
if the source implements the `java.io.Closeable` interface.

A `Scanner` is not safe for multithreaded use without
external synchronization.

Unless otherwise mentioned, passing a `null` parameter into
any method of a `Scanner` will cause a
`NullPointerException` to be thrown.

A scanner will default to interpreting numbers as decimal unless a
different radix has been set by using the `useRadix` method. The
`reset` method will reset the value of the scanner's radix to
`10` regardless of whether it was previously changed.

####  Localized numbers

 An instance of this class is capable of scanning numbers in the standard
formats as well as in the formats of the scanner's locale. A scanner's
initial locale is the value returned by the Locale.getDefault(Locale.Category.FORMAT) method; it may be changed via the useLocale() method. The `reset` method will reset the value of the
scanner's locale to the initial locale regardless of whether it was
previously changed.

The localized formats are defined in terms of the following parameters,
which for a particular locale are taken from that locale's DecimalFormat object, `df`, and its
DecimalFormatSymbols object,
`dfs`.

    *LocalGroupSeparator  *
        The character used to separate thousands groups,
        *i.e.,* `dfs.`getGroupingSeparator()
    *LocalDecimalSeparator  *
        The character used for the decimal point,
    *i.e.,* `dfs.`getDecimalSeparator()
    *LocalPositivePrefix  *
        The string that appears before a positive number (may
        be empty), *i.e.,* `df.`getPositivePrefix()
    *LocalPositiveSuffix  *
        The string that appears after a positive number (may be
        empty), *i.e.,* `df.`getPositiveSuffix()
    *LocalNegativePrefix  *
        The string that appears before a negative number (may
        be empty), *i.e.,* `df.`getNegativePrefix()
    *LocalNegativeSuffix  *
        The string that appears after a negative number (may be
        empty), *i.e.,* `df.`getNegativeSuffix()
    *LocalNaN  *
        The string that represents not-a-number for
        floating-point values,
        *i.e.,* `dfs.`getNaN()
    *LocalInfinity  *
        The string that represents infinity for floating-point
        values, *i.e.,* `dfs.`getInfinity()

####  Number syntax

 The strings that can be parsed as numbers by an instance of this class
are specified in terms of the following regular-expression grammar, where
Rmax is the highest digit in the radix being used (for example, Rmax is 9 in base 10).

  *NonAsciiDigit*:
      A non-ASCII character c for which
           Character.isDigit`(c)`
                       returns true

  *Non0Digit*:
      `[1-`*Rmax*`] |`*NonASCIIDigit*

  *Digit*:
      `[0-`*Rmax*`] |`*NonASCIIDigit*

  *GroupedNumeral*:
      `( `*Non0Digit*
                  *Digit*`?`*Digit*`?`
          `( `*LocalGroupSeparator*
                        *Digit*
                        *Digit*
                        *Digit*`)+ )`

  *Numeral*:
      `( (`*Digit*`+ ) |`*GroupedNumeral*`)`

  *Integer*:
      `( [-+]? (`*Numeral*`) )`
      `|`*LocalPositivePrefix* *Numeral*
                     *LocalPositiveSuffix*
      `|`*LocalNegativePrefix* *Numeral*
                *LocalNegativeSuffix*

  *DecimalNumeral*:
      *Numeral*
      `|`*Numeral*
                *LocalDecimalSeparator*
                *Digit*`*`
      `|`*LocalDecimalSeparator*
                *Digit*`+`

  *Exponent*:
      `( [eE] [+-]?`*Digit*`+ )`

  *Decimal*:
      `( [-+]?`*DecimalNumeral*
                        *Exponent*`? )`
      `|`*LocalPositivePrefix*
                *DecimalNumeral*
                *LocalPositiveSuffix*
                *Exponent*`?`
      `|`*LocalNegativePrefix*
                *DecimalNumeral*
                *LocalNegativeSuffix*
                *Exponent*`?`

  *HexFloat*:
      `[-+]? 0xX*\.[0-9a-fA-F]+ (pP?[0-9]+)?`

  *NonNumber*:
      `NaN |`*LocalNan*`| Infinity |`*LocalInfinity*

  *SignedNonNumber*:
      `( [-+]?`*NonNumber*`)`
      `|`*LocalPositivePrefix*
                *NonNumber*
                *LocalPositiveSuffix*
      `|`*LocalNegativePrefix*
                *NonNumber*
                *LocalNegativeSuffix*

  *Float*:
      *Decimal*
          `|`*HexFloat*
          `|`*SignedNonNumber*

Whitespace is not significant in the above regular expressions.

**Since:** 1.5

## Scanner.Scanner(Readable)

```java
public Scanner(Readable source)
```

Constructs a new `Scanner` that produces values scanned
from the specified source.

Parameters:

- `source`: A character source implementing the `Readable` interface

## Scanner.Scanner(InputStream)

```java
public Scanner(InputStream source)
```

Constructs a new `Scanner` that produces values scanned
from the specified input stream. Bytes from the stream are converted
into characters using the
default charset.

Parameters:

- `source`: An input stream to be scanned

**See also:** Charset#defaultCharset()

## Scanner.Scanner(InputStream, String)

```java
public Scanner(InputStream source, String charsetName)
```

Constructs a new `Scanner` that produces values scanned
from the specified input stream. Bytes from the stream are converted
into characters using the specified charset.

Parameters:

- `source`: An input stream to be scanned
- `charsetName`: The encoding type used to convert bytes from the stream into characters to be scanned

Throws:

- `IllegalArgumentException`: if the specified character set does not exist

## Scanner.Scanner(InputStream, Charset)

```java
public Scanner(InputStream source, Charset charset)
```

Constructs a new `Scanner` that produces values scanned
from the specified input stream. Bytes from the stream are converted
into characters using the specified charset.

Parameters:

- `source`: an input stream to be scanned
- `charset`: the charset used to convert bytes from the file into characters to be scanned

**Since:** 10

## Scanner.Scanner(File)

```java
public Scanner(File source) throws FileNotFoundException
```

Constructs a new `Scanner` that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the
default charset.

Parameters:

- `source`: A file to be scanned

**See also:** Charset#defaultCharset()

Throws:

- `FileNotFoundException`: if source is not found

## Scanner.Scanner(File, String)

```java
public Scanner(File source, String charsetName) throws FileNotFoundException
```

Constructs a new `Scanner` that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

Parameters:

- `source`: A file to be scanned
- `charsetName`: The encoding type used to convert bytes from the file into characters to be scanned

Throws:

- `FileNotFoundException`: if source is not found
- `IllegalArgumentException`: if the specified encoding is not found

## Scanner.Scanner(File, Charset)

```java
public Scanner(File source, Charset charset) throws IOException
```

Constructs a new `Scanner` that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

Parameters:

- `source`: A file to be scanned
- `charset`: The charset used to convert bytes from the file into characters to be scanned

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs opening the source

## Scanner.Scanner(Path)

```java
public Scanner(Path source) throws IOException
```

Constructs a new `Scanner` that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the
default charset.

Parameters:

- `source`: the path to the file to be scanned

**See also:** Charset#defaultCharset()

**Since:** 1.7

Throws:

- `IOException`: if an I/O error occurs opening source

## Scanner.Scanner(Path, String)

```java
public Scanner(Path source, String charsetName) throws IOException
```

Constructs a new `Scanner` that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

Parameters:

- `source`: the path to the file to be scanned
- `charsetName`: The encoding type used to convert bytes from the file into characters to be scanned

**Since:** 1.7

Throws:

- `IOException`: if an I/O error occurs opening source
- `IllegalArgumentException`: if the specified encoding is not found

## Scanner.Scanner(Path, Charset)

```java
public Scanner(Path source, Charset charset) throws IOException
```

Constructs a new `Scanner` that produces values scanned
from the specified file. Bytes from the file are converted into
characters using the specified charset.

Parameters:

- `source`: the path to the file to be scanned
- `charset`: the charset used to convert bytes from the file into characters to be scanned

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs opening the source

## Scanner.Scanner(String)

```java
public Scanner(String source)
```

Constructs a new `Scanner` that produces values scanned
from the specified string.

Parameters:

- `source`: A string to scan

## Scanner.Scanner(ReadableByteChannel)

```java
public Scanner(ReadableByteChannel source)
```

Constructs a new `Scanner` that produces values scanned
from the specified channel. Bytes from the source are converted into
characters using the
default charset.

Parameters:

- `source`: A channel to scan

**See also:** Charset#defaultCharset()

## Scanner.Scanner(ReadableByteChannel, String)

```java
public Scanner(ReadableByteChannel source, String charsetName)
```

Constructs a new `Scanner` that produces values scanned
from the specified channel. Bytes from the source are converted into
characters using the specified charset.

Parameters:

- `source`: A channel to scan
- `charsetName`: The encoding type used to convert bytes from the channel into characters to be scanned

Throws:

- `IllegalArgumentException`: if the specified character set does not exist

## Scanner.Scanner(ReadableByteChannel, Charset)

```java
public Scanner(ReadableByteChannel source, Charset charset)
```

Constructs a new `Scanner` that produces values scanned
from the specified channel. Bytes from the source are converted into
characters using the specified charset.

Parameters:

- `source`: a channel to scan
- `charset`: the encoding type used to convert bytes from the channel into characters to be scanned

**Since:** 10

## Scanner.close()

```java
public void close()
```

Closes this scanner.

 If this scanner has not yet been closed then if its underlying
readable also implements the `java.io.Closeable` interface then the readable's `close` method
will be invoked.  If this scanner is already closed then invoking this
method will have no effect.

Attempting to perform search operations after a scanner has
been closed will result in an `IllegalStateException`.

## Scanner.ioException()

```java
public IOException ioException()
```

Returns the `IOException` last thrown by this
`Scanner`'s underlying `Readable`. This method
returns `null` if no such exception exists.

**Returns:** the last exception thrown by this scanner's readable

## Scanner.delimiter()

```java
public Pattern delimiter()
```

Returns the `Pattern` this `Scanner` is currently
using to match delimiters.

**Returns:** this scanner's delimiting pattern.

## Scanner.useDelimiter(Pattern)

```java
public Scanner useDelimiter(Pattern pattern)
```

Sets this scanner's delimiting pattern to the specified pattern.

Parameters:

- `pattern`: A delimiting pattern

**Returns:** this scanner
