---
title: "String class (java.lang) (part 6 of 7)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/String.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# String class (java.lang) (part 6 of 7)

## String.indent(int)

```java
public String indent(int n)
```

Adjusts the indentation of each line of this string based on the value of
`n`, and normalizes line termination characters.

This string is conceptually separated into lines using
`String.lines()`. Each line is then adjusted as described below
and then suffixed with a line feed `"\n"` (U+000A). The resulting
lines are then concatenated and returned.

If `n > 0` then `n` spaces (U+0020) are inserted at the
beginning of each line.

If `n < 0` then up to `n`
white space characters are removed
from the beginning of each line. If a given line does not contain
sufficient white space then all leading
white space characters are removed.
Each white space character is treated as a single character. In
particular, the tab character `"\t"` (U+0009) is considered a
single character; it is not expanded.

If `n == 0` then the line remains unchanged. However, line
terminators are still normalized.

Parameters:

- `n`: number of leading white space characters to add or remove

**Returns:** string with indentation adjusted and line endings normalized

**See also:** String#lines()

**See also:** String#isBlank()

**See also:** Character#isWhitespace(int)

**Since:** 12

## String.stripIndent()

```java
public String stripIndent()
```

Returns a string whose value is this string, with incidental
white space removed from
the beginning and end of every line.

Incidental white space
is often present in a text block to align the content with the opening
delimiter. For example, in the following code, dots represent incidental
white space:

```java
String html = """
..............<html>
..............    <body>
..............        <p>Hello, world</p>
..............    </body>
..............</html>
..............""";
```

This method treats the incidental
white space as indentation to be
stripped, producing a string that preserves the relative indentation of
the content. Using | to visualize the start of each line of the string:

```java
|<html>
|    <body>
|        <p>Hello, world</p>
|    </body>
|</html>
```

First, the individual lines of this string are extracted. A *line*
is a sequence of zero or more characters followed by either a line
terminator or the end of the string.
If the string has at least one line terminator, the last line consists
of the characters between the last terminator and the end of the string.
Otherwise, if the string has no terminators, the last line is the start
of the string to the end of the string, in other words, the entire
string.
A line does not include the line terminator.

Then, the *minimum indentation* (min) is determined as follows:

-

For each non-blank line (as defined by `String.isBlank()`),
  the leading white space
  characters are counted.

-

The leading white space
  characters on the last line are also counted even if
  blank.

The *min* value is the smallest of these counts.

For each non-blank line, *min* leading
white space characters are
removed, and any trailing white space characters are removed. Blank lines
are replaced with the empty string.

Finally, the lines are joined into a new string, using the LF character
`"\n"` (U+000A) to separate lines.

**API note:** This method's primary purpose is to shift a block of lines as far as
possible to the left, while preserving relative indentation. Lines
that were indented the least will thus have no leading
white space.
The result will have the same number of line terminators as this string.
If this string ends with a line terminator then the result will end
with a line terminator.

**Implementation requirements:** This method treats all white space
characters as having equal width. As long as the indentation on every
line is consistently composed of the same character sequences, then the
result will be as described above.

**Returns:** string with incidental indentation removed and line
        terminators normalized

**See also:** String#lines()

**See also:** String#isBlank()

**See also:** String#indent(int)

**See also:** Character#isWhitespace(int)

**Since:** 15

## String.translateEscapes()

```java
public String translateEscapes()
```

Returns a string whose value is this string, with escape sequences
translated as if in a string literal.

Escape sequences are translated as follows;

  Translation

    Escape
    Name
    Translation

    `\u005Cb`
    backspace
    `U+0008`

    `\u005Ct`
    horizontal tab
    `U+0009`

    `\u005Cn`
    line feed
    `U+000A`

    `\u005Cf`
    form feed
    `U+000C`

    `\u005Cr`
    carriage return
    `U+000D`

    `\u005Cs`
    space
    `U+0020`

    `\u005C"`
    double quote
    `U+0022`

    `\u005C'`
    single quote
    `U+0027`

    `\u005C\u005C`
    backslash
    `U+005C`

    `\u005C0 - \u005C377`
    octal escape
    code point equivalents

    `\u005C<line-terminator>`
    continuation
    discard

**Implementation note:** This method does *not* translate Unicode escapes such as "`\u005cu2022`".
Unicode escapes are translated by the Java compiler when reading input characters and
are not part of the string literal specification.

**Returns:** String with escape sequences translated.

**JLS:** 3.10.7 Escape Sequences

**Since:** 15

Throws:

- `IllegalArgumentException`: when an escape sequence is malformed.

## String.transform(Function<? super String, ? extends R>)

```java
public <R> R transform(Function<? super String, ? extends R> f)
```

This method allows the application of a function to `this`
string. The function should expect a single String argument
and produce an `R` result.

Any exception thrown by `f.apply()` will be propagated to the
caller.

Parameters:

- `f`: a function to apply
- `<R>`: the type of the result

**Returns:** the result of applying the function to this string

**See also:** java.util.function.Function

**Since:** 12

## String.toString()

```java
public String toString()
```

This object (which is already a string!) is itself returned.

**Returns:** the string itself.

## String.chars()

```java
public IntStream chars()
```

Returns a stream of `int` zero-extending the `char` values
from this sequence.  Any char which maps to a surrogate code point is passed through
uninterpreted.

**Returns:** an IntStream of char values from this sequence

**Since:** 9

## String.codePoints()

```java
public IntStream codePoints()
```

Returns a stream of code point values from this sequence.  Any surrogate
pairs encountered in the sequence are combined as if by Character.toCodePoint and the result is passed
to the stream. Any other code units, including ordinary BMP characters,
unpaired surrogates, and undefined code units, are zero-extended to
`int` values which are then passed to the stream.

**Returns:** an IntStream of Unicode code points from this sequence

**Since:** 9

## String.toCharArray()

```java
public char[] toCharArray()
```

Converts this string to a new character array.

**Returns:** a newly allocated character array whose length is the length
         of this string and whose contents are initialized to contain
         the character sequence represented by this string.

## String.format(String, Object...)

```java
public static String format(String format, Object... args)
```

Returns a formatted string using the specified format string and
arguments.

 The locale always used is the one returned by Locale.getDefault(Locale.Category) with
FORMAT category specified.

Parameters:

- `format`: A format string
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behaviour on a `null` argument depends on the conversion.

**Returns:** A formatted string

**See also:** java.util.Formatter

**Since:** 1.5

Throws:

- `java.util.IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification.

## String.format(Locale, String, Object...)

```java
public static String format(Locale l, String format, Object... args)
```

Returns a formatted string using the specified locale, format string,
and arguments.

Parameters:

- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.
- `format`: A format string
- `args`: Arguments referenced by the format specifiers in the format string. If there are more arguments than format specifiers, the extra arguments are ignored. The number of arguments is variable and may be zero. The maximum number of arguments is limited by the maximum dimension of a Java array as defined by *The Java Virtual Machine Specification*. The behaviour on a `null` argument depends on the conversion.

**Returns:** A formatted string

**See also:** java.util.Formatter

**Since:** 1.5

Throws:

- `java.util.IllegalFormatException`: If a format string contains an illegal syntax, a format specifier that is incompatible with the given arguments, insufficient arguments given the format string, or other illegal conditions. For specification of all possible formatting errors, see the Details section of the formatter class specification

## String.formatted(Object...)

```java
public String formatted(Object... args)
```

Formats using this string as the format string, and the supplied
arguments.

Parameters:

- `args`: Arguments referenced by the format specifiers in this string.

**Implementation requirements:** This method is equivalent to `String.format(this, args)`.

**Returns:** A formatted string

**See also:** java.lang.String#format(String,Object...)

**See also:** java.util.Formatter

**Since:** 15

## String.valueOf(Object)

```java
public static String valueOf(Object obj)
```

Returns the string representation of the `Object` argument.

Parameters:

- `obj`: an `Object`.

**Returns:** if the argument is `null`, then a string equal to
         `"null"`; otherwise, the value of
         `obj.toString()` is returned.

**See also:** java.lang.Object#toString()

## String.valueOf(char[])

```java
public static String valueOf(char[] data)
```

Returns the string representation of the `char` array
argument. The contents of the character array are copied; subsequent
modification of the character array does not affect the returned
string.

 The contents of the string are unspecified if the character array
is modified during string construction.

Parameters:

- `data`: the character array.

**Returns:** a `String` that contains the characters of the
         character array.

## String.valueOf(char[], int, int)

```java
public static String valueOf(char[] data, int offset, int count)
```

Returns the string representation of a specific subarray of the
`char` array argument.

The `offset` argument is the index of the first
character of the subarray. The `count` argument
specifies the length of the subarray. The contents of the subarray
are copied; subsequent modification of the character array does not
affect the returned string.

 The contents of the string are unspecified if the character array
is modified during string construction.

Parameters:

- `data`: the character array.
- `offset`: initial offset of the subarray.
- `count`: length of the subarray.

**Returns:** a `String` that contains the characters of the
         specified subarray of the character array.

Throws:

- `IndexOutOfBoundsException`: if `offset` is negative, or `count` is negative, or `offset+count` is larger than `data.length`.

## String.copyValueOf(char[], int, int)

```java
public static String copyValueOf(char[] data, int offset, int count)
```

Equivalent to int, int).

Parameters:

- `data`: the character array.
- `offset`: initial offset of the subarray.
- `count`: length of the subarray.

**Returns:** a `String` that contains the characters of the
         specified subarray of the character array.

Throws:

- `IndexOutOfBoundsException`: if `offset` is negative, or `count` is negative, or `offset+count` is larger than `data.length`.

## String.copyValueOf(char[])

```java
public static String copyValueOf(char[] data)
```

Equivalent to `valueOf(char[])`.

Parameters:

- `data`: the character array.

**Returns:** a `String` that contains the characters of the
         character array.

## String.valueOf(boolean)

```java
public static String valueOf(boolean b)
```

Returns the string representation of the `boolean` argument.

Parameters:

- `b`: a `boolean`.

**Returns:** if the argument is `true`, a string equal to
         `"true"` is returned; otherwise, a string equal to
         `"false"` is returned.

## String.valueOf(char)

```java
public static String valueOf(char c)
```

Returns the string representation of the `char`
argument.

Parameters:

- `c`: a `char`.

**Returns:** a string of length `1` containing
         as its single character the argument `c`.

## String.valueOf(int)

```java
public static String valueOf(int i)
```

Returns the string representation of the `int` argument.

The representation is exactly the one returned by the
`Integer.toString` method of one argument.

Parameters:

- `i`: an `int`.

**Returns:** a string representation of the `int` argument.

**See also:** java.lang.Integer#toString(int, int)

## String.valueOf(long)

```java
public static String valueOf(long l)
```

Returns the string representation of the `long` argument.

The representation is exactly the one returned by the
`Long.toString` method of one argument.

Parameters:

- `l`: a `long`.

**Returns:** a string representation of the `long` argument.

**See also:** java.lang.Long#toString(long)

## String.valueOf(float)

```java
public static String valueOf(float f)
```

Returns the string representation of the `float` argument.

The representation is exactly the one returned by the
`Float.toString` method of one argument.

Parameters:

- `f`: a `float`.

**Returns:** a string representation of the `float` argument.

**See also:** java.lang.Float#toString(float)

## String.valueOf(double)

```java
public static String valueOf(double d)
```

Returns the string representation of the `double` argument.

The representation is exactly the one returned by the
`Double.toString` method of one argument.

Parameters:

- `d`: a `double`.

**Returns:** a  string representation of the `double` argument.

**See also:** java.lang.Double#toString(double)
