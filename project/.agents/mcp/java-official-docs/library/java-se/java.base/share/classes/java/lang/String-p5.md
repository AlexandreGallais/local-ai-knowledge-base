---
title: "String class (java.lang) (part 5 of 7)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/String.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# String class (java.lang) (part 5 of 7)

## String.splitWithDelimiters(String, int)

```java
public String[] splitWithDelimiters(String regex, int limit)
```

Splits this string around matches of the given regular expression and
returns both the strings and the matching delimiters.

 The array returned by this method contains each substring of this
string that is terminated by another substring that matches the given
expression or is terminated by the end of the string.
Each substring is immediately followed by the subsequence (the delimiter)
that matches the given expression, *except* for the last
substring, which is not followed by anything.
The substrings in the array and the delimiters are in the order in which
they occur in the input.
If the expression does not match any part of the input then the resulting
array has just one element, namely this string.

 When there is a positive-width match at the beginning of this
string then an empty leading substring is included at the beginning
of the resulting array. A zero-width match at the beginning however
never produces such empty leading substring nor the empty delimiter.

 The `limit` parameter controls the number of times the
pattern is applied and therefore affects the length of the resulting
array.

-  If the *limit* is positive then the pattern will be applied
   at most *limit* - 1 times, the array's length will be
   no greater than 2 &times; *limit* - 1, and the array's last
   entry will contain all input beyond the last matched delimiter.

-  If the *limit* is zero then the pattern will be applied as
   many times as possible, the array can have any length, and trailing
   empty strings will be discarded.

-  If the *limit* is negative then the pattern will be applied
   as many times as possible and the array can have any length.

 The input `"boo:::and::foo"`, for example, yields the following
results with these parameters:

Split example showing regex, limit, and result

    Regex
    Limit
    Result

:+
    2
    `{ "boo", ":::", "and::foo" }`

    5
    `{ "boo", ":::", "and", "::", "foo" }`

    -1
    `{ "boo", ":::", "and", "::", "foo" }`
o
    5
    `{ "b", "o", "", "o", ":::and::f", "o", "", "o", "" }`

    -1
    `{ "b", "o", "", "o", ":::and::f", "o", "", "o", "" }`

    0
    `{ "b", "o", "", "o", ":::and::f", "o", "", "o" }`

Parameters:

- `regex`: the delimiting regular expression
- `limit`: the result threshold, as described above

**API note:** An invocation of this method of the form
*str.*`splitWithDelimiters(`*regex*`,` *n*`)`
yields the same result as the expression

`
`java.util.regex.Pattern`.compile(*regex*).splitWithDelimiters(*str*, *n*)
`

**Returns:** the array of strings computed by splitting this string
         around matches of the given regular expression, alternating
         substrings and matching delimiters

**Since:** 21

## String.split(String)

```java
public String[] split(String regex)
```

Splits this string around matches of the given regular expression.

 This method works as if by invoking the two-argument int) split method with the given expression and a limit
argument of zero.  Trailing empty strings are therefore not included in
the resulting array.

 The string `"boo:and:foo"`, for example, yields the following
results with these expressions:

Split examples showing regex and result

 Regex
 Result

:
    `{ "boo", "and", "foo" }`
o
    `{ "b", "", ":and:f" }`

Parameters:

- `regex`: the delimiting regular expression

**Returns:** the array of strings computed by splitting this string
         around matches of the given regular expression

**See also:** java.util.regex.Pattern

**Since:** 1.4

Throws:

- `PatternSyntaxException`: if the regular expression's syntax is invalid

## String.join(CharSequence, CharSequence...)

```java
public static String join(CharSequence delimiter, CharSequence... elements)
```

Returns a new String composed of copies of the
`CharSequence elements` joined together with a copy of
the specified `delimiter`.

For example,

```java
    String message = String.join("-", "Java", "is", "cool");
    // message returned is: "Java-is-cool"
```

Note that if an element is null, then `"null"` is added.

Parameters:

- `delimiter`: the delimiter that separates each element
- `elements`: the elements to join together.

**Returns:** a new `String` that is composed of the `elements`
        separated by the `delimiter`

**See also:** java.util.StringJoiner

**Since:** 1.8

Throws:

- `NullPointerException`: If `delimiter` or `elements` is `null`

## String.join(CharSequence, Iterable<? extends CharSequence>)

```java
public static String join(CharSequence delimiter, Iterable<? extends CharSequence> elements)
```

Returns a new `String` composed of copies of the
`CharSequence elements` joined together with a copy of the
specified `delimiter`.

For example,

```java
    List<String> strings = List.of("Java", "is", "cool");
    String message = String.join(" ", strings);
    // message returned is: "Java is cool"

    Set<String> strings =
        new LinkedHashSet<>(List.of("Java", "is", "very", "cool"));
    String message = String.join("-", strings);
    // message returned is: "Java-is-very-cool"
```

Note that if an individual element is `null`, then `"null"` is added.

Parameters:

- `delimiter`: a sequence of characters that is used to separate each of the `elements` in the resulting `String`
- `elements`: an `Iterable` that will have its `elements` joined together.

**Returns:** a new `String` that is composed from the `elements`
        argument

**See also:** #join(CharSequence,CharSequence...)

**See also:** java.util.StringJoiner

**Since:** 1.8

Throws:

- `NullPointerException`: If `delimiter` or `elements` is `null`

## String.toLowerCase(Locale)

```java
public String toLowerCase(Locale locale)
```

Converts all of the characters in this `String` to lower
case using the rules of the given `Locale`.  Case mapping is based
on the Unicode Standard version specified by the Character
class. Since case mappings are not always 1:1 char mappings, the resulting `String`
and this `String` may differ in length.

Examples of lowercase mappings are in the following table:

Lowercase mapping examples showing language code of locale, upper case, lower case, and description

  Language Code of Locale
  Upper Case
  Lower Case
  Description

  tr (Turkish)
  \u0130
  \u0069
  capital letter I with dot above -> small letter i

  tr (Turkish)
  \u0049
  \u0131
  capital letter I -> small letter dotless i

  (all)
  French Fries
  french fries
  lowercased all chars in String

  (all)

      &Iota;&Chi;&Theta;&Upsilon;&Sigma;
  &iota;&chi;&theta;&upsilon;&sigma;
  lowercased all chars in String

Parameters:

- `locale`: use the case transformation rules for this locale

**Returns:** the `String`, converted to lowercase.

**See also:** java.lang.String#toLowerCase()

**See also:** java.lang.String#toUpperCase()

**See also:** java.lang.String#toUpperCase(Locale)

**Since:** 1.1

## String.toLowerCase()

```java
public String toLowerCase()
```

Converts all of the characters in this `String` to lower
case using the rules of the default locale. This method is equivalent to
`toLowerCase(Locale.getDefault())`.

**API note:** This method is locale sensitive, and may produce unexpected
results if used for strings that are intended to be interpreted locale
independently.
Examples are programming language identifiers, protocol keys, and HTML
tags.
For instance, `"TITLE".toLowerCase()` in a Turkish locale
returns `"t\u005Cu0131tle"`, where '\u005Cu0131' is the
LATIN SMALL LETTER DOTLESS I character.
To obtain correct results for locale insensitive strings, use
`toLowerCase(Locale.ROOT)`.

**Returns:** the `String`, converted to lowercase.

**See also:** java.lang.String#toLowerCase(Locale)

## String.toUpperCase(Locale)

```java
public String toUpperCase(Locale locale)
```

Converts all of the characters in this `String` to upper
case using the rules of the given `Locale`. Case mapping is based
on the Unicode Standard version specified by the Character
class. Since case mappings are not always 1:1 char mappings, the resulting `String`
and this `String` may differ in length.

Examples of locale-sensitive and 1:M case mappings are in the following table:

Examples of locale-sensitive and 1:M case mappings. Shows Language code of locale, lower case, upper case, and description.

  Language Code of Locale
  Lower Case
  Upper Case
  Description

  tr (Turkish)
  \u0069
  \u0130
  small letter i -> capital letter I with dot above

  tr (Turkish)
  \u0131
  \u0049
  small letter dotless i -> capital letter I

  (all)
  \u00df
  \u0053 \u0053
  small letter sharp s -> two letters: SS

  (all)
  Fahrvergn&uuml;gen
  FAHRVERGN&Uuml;GEN

Parameters:

- `locale`: use the case transformation rules for this locale

**Returns:** the `String`, converted to uppercase.

**See also:** java.lang.String#toUpperCase()

**See also:** java.lang.String#toLowerCase()

**See also:** java.lang.String#toLowerCase(Locale)

**Since:** 1.1

## String.toUpperCase()

```java
public String toUpperCase()
```

Converts all of the characters in this `String` to upper
case using the rules of the default locale. This method is equivalent to
`toUpperCase(Locale.getDefault())`.

**API note:** This method is locale sensitive, and may produce unexpected
results if used for strings that are intended to be interpreted locale
independently.
Examples are programming language identifiers, protocol keys, and HTML
tags.
For instance, `"title".toUpperCase()` in a Turkish locale
returns `"T\u005Cu0130TLE"`, where '\u005Cu0130' is the
LATIN CAPITAL LETTER I WITH DOT ABOVE character.
To obtain correct results for locale insensitive strings, use
`toUpperCase(Locale.ROOT)`.

**Returns:** the `String`, converted to uppercase.

**See also:** java.lang.String#toUpperCase(Locale)

## String.trim()

```java
public String trim()
```

Returns a string whose value is this string, with all leading
and trailing space removed, where space is defined
as any character whose codepoint is less than or equal to
`'U+0020'` (the space character).

If this `String` object represents an empty character
sequence, or the first and last characters of character sequence
represented by this `String` object both have codes
that are not space (as defined above), then a
reference to this `String` object is returned.

Otherwise, if all characters in this string are space (as
defined above), then a  `String` object representing an
empty string is returned.

Otherwise, let *k* be the index of the first character in the
string whose code is not a space (as defined above) and let
*m* be the index of the last character in the string whose code
is not a space (as defined above). A `String`
object is returned, representing the substring of this string that
begins with the character at index *k* and ends with the
character at index *m*-that is, the result of
`this.substring(k, m + 1)`.

**API note:** This method removes leading and trailing space characters and ASCII control
characters from the string. To remove characters using a Unicode-based definition of
white space, use strip,
stripIndent, stripLeading, or
stripTrailing.

**Returns:** a string whose value is this string, with all leading
         and trailing space removed, or this string if it
         has no leading or trailing space.

## String.strip()

```java
public String strip()
```

Returns a string whose value is this string, with all leading
and trailing white space
removed.

If this `String` object represents an empty string,
or if all code points in this string are
white space, then an empty string
is returned.

Otherwise, returns a substring of this string beginning with the first
code point that is not a white space
up to and including the last code point that is not a
white space.

This method may be used to strip
white space from
the beginning and end of a string.

**Returns:** a string whose value is this string, with all leading
         and trailing white space removed

**See also:** Character#isWhitespace(int)

**Since:** 11

## String.stripLeading()

```java
public String stripLeading()
```

Returns a string whose value is this string, with all leading
white space removed.

If this `String` object represents an empty string,
or if all code points in this string are
white space, then an empty string
is returned.

Otherwise, returns a substring of this string beginning with the first
code point that is not a white space
up to and including the last code point of this string.

This method may be used to trim
white space from
the beginning of a string.

**Returns:** a string whose value is this string, with all leading white
         space removed

**See also:** Character#isWhitespace(int)

**Since:** 11

## String.stripTrailing()

```java
public String stripTrailing()
```

Returns a string whose value is this string, with all trailing
white space removed.

If this `String` object represents an empty string,
or if all characters in this string are
white space, then an empty string
is returned.

Otherwise, returns a substring of this string beginning with the first
code point of this string up to and including the last code point
that is not a white space.

This method may be used to trim
white space from
the end of a string.

**Returns:** a string whose value is this string, with all trailing white
         space removed

**See also:** Character#isWhitespace(int)

**Since:** 11

## String.isBlank()

```java
public boolean isBlank()
```

**See also:** Character#isWhitespace(int)

**Since:** 11

## String.lines()

```java
public Stream<String> lines()
```

Returns a stream of lines extracted from this string,
separated by line terminators.

A *line terminator* is one of the following:
a line feed character `"\n"` (U+000A),
a carriage return character `"\r"` (U+000D),
or a carriage return followed immediately by a line feed
`"\r\n"` (U+000D U+000A).

A *line* is either a sequence of zero or more characters
followed by a line terminator, or it is a sequence of one or
more characters followed by the end of the string. A
line does not include the line terminator.

The stream returned by this method contains the lines from
this string in the order in which they occur.

**API note:** This definition of *line* implies that an empty
         string has zero lines and that there is no empty line
         following a line terminator at the end of a string.

**Implementation note:** This method provides better performance than
          split("\R") by supplying elements lazily and
          by faster search of new line terminators.

**Returns:** the stream of lines extracted from this string

**Since:** 11
