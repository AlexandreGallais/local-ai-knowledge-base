---
title: "ListFormat class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/ListFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ListFormat class (java.text)

```java
public final class ListFormat extends Format
```

`ListFormat` formats or parses a list of strings in a locale-sensitive way.
Use `ListFormat` to construct a list of strings displayed for end users.
For example, displaying a list of 3 weekdays, e.g. "Monday", "Wednesday", "Friday"
as "Monday, Wednesday, and Friday" in an inclusive list type. This class provides
the functionality defined in Unicode Consortium's LDML specification for

List Patterns.

Three formatting types are provided: STANDARD, OR,
and UNIT, which determines the punctuation
between the strings and the connecting words if any. Also, three formatting styles for each
type are provided: FULL, SHORT, and
NARROW, suitable for how the strings are abbreviated (or not).
The following snippet is an example of formatting
the list of Strings `"Foo", "Bar", "Baz"` in US English with
`STANDARD` type and `FULL` style:

This will produce the concatenated list string, "Foo, Bar, and Baz" as seen in
the following:

Formatting examples

    FULL
    SHORT
    NARROW

STANDARD
    Foo, Bar, and Baz
    Foo, Bar, & Baz
    Foo, Bar, Baz
OR
    Foo, Bar, or Baz
    Foo, Bar, or Baz
    Foo, Bar, or Baz
UNIT
    Foo, Bar, Baz
    Foo, Bar, Baz
    Foo Bar Baz

Note: these examples are from CLDR, there could be different results from other locale providers.

Alternatively, Locale, Type, and/or Style independent instances
can be created with `getInstance(String[])`. The String array to the
method specifies the delimiting patterns for the start/middle/end portion of
the formatted string, as well as optional specialized patterns for two or three
elements. Refer to the method description for more detail.

On parsing, if some ambiguity is found in the input string, such as delimiting
sequences in the input string, the result, when formatted with the same formatting, does not
re-produce the input string. For example, a two element String list
"a, b,", "c" will be formatted as "a, b, and c", but may be parsed as three elements
"a", "b", "c".

**Implementation requirements:** This class is immutable and thread-safe

**Since:** 22

## ListFormat.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

## ListFormat.getInstance()

```java
public static ListFormat getInstance()
```

## ListFormat.getInstance(Locale, Type, Style)

```java
public static ListFormat getInstance(Locale locale, Type type, Style style)
```

Parameters:

- `locale`: `Locale` to be used, not null
- `type`: type of the ListFormat. One of `STANDARD`, `OR`, or `UNIT`, not null
- `style`: style of the ListFormat. One of `FULL`, `SHORT`, or `NARROW`, not null

Throws:

- `NullPointerException`: if any of the arguments are null

## ListFormat.getInstance(String[])

```java
public static ListFormat getInstance(String[] patterns)
```

This factory returns an instance based on the customized patterns array,
instead of letting the runtime provide appropriate patterns for the `Locale`,
`Type`, or `Style`.

The patterns array should contain five String patterns, each corresponding to the Unicode LDML's
`listPatternPart`, i.e., "start", "middle", "end", two element, and three element patterns
in this order. Each pattern contains "{0}" and "{1}" (and "{2}" for the three element pattern)
placeholders that are substituted with the passed input strings on formatting.
If the length of the patterns array is not 5, an `IllegalArgumentException`
is thrown.

Each pattern string is first parsed as follows. Literals in parentheses, such as
"start_before", are optional:

```java
start := (start_before){0}start_between{1}
middle := {0}middle_between{1}
end := {0}end_between{1}(end_after)
two := (two_before){0}two_between{1}(two_after)
three := (three_before){0}three_between1{1}three_between2{2}(three_after)
```

If two or three pattern string is empty, it falls back to
`"(start_before){0}end_between{1}(end_after)"`,
`"(start_before){0}start_between{1}end_between{2}(end_after)"` respectively.
If parsing of any pattern string for start, middle, end, two, or three fails,
it throws an `IllegalArgumentException`.

On formatting, the input string list with `n` elements substitutes above
placeholders based on the number of elements:

```java
n = 1: {0}
n = 2: parsed pattern for "two"
n = 3: parsed pattern for "three"
n > 3: (start_before){0}start_between{1}middle_between{2} ... middle_between{m}end_between{n}(end_after)
```

As an example, the following table shows a pattern array which is equivalent to
`STANDARD` type, `FULL` style in US English:

Standard/Full Patterns in US English

Pattern Kind
    Pattern String

start
    "{0}, {1}"
middle
    "{0}, {1}"
end
    "{0}, and {1}"
two
    "{0} and {1}"
three
    ""

Here are the resulting formatted strings with the above pattern array.

Formatting examples

Input String List
    Formatted String

"Foo", "Bar", "Baz", "Qux"
    "Foo, Bar, Baz, and Qux"
"Foo", "Bar", "Baz"
    "Foo, Bar, and Baz"
"Foo", "Bar"
    "Foo and Bar"
"Foo"
    "Foo"

Parameters:

- `patterns`: array of patterns, not null

Throws:

- `IllegalArgumentException`: if the length `patterns` array is not 5, or any of `start`, `middle`, `end`, `two`, or `three` patterns cannot be parsed.
- `NullPointerException`: if `patterns` is null.

## ListFormat.getLocale()

```java
public Locale getLocale()
```

The `locale` is defined by Type, Style) or
`getInstance(String[])`.

## ListFormat.getPatterns()

```java
public String[] getPatterns()
```

The `patterns` are defined by Type, Style) or
`getInstance(String[])`.

## ListFormat.format(List<String>)

```java
public String format(List<String> input)
```

Parameters:

- `input`: The list of input strings to format. There should at least one String element in this list, otherwise an `IllegalArgumentException` is thrown.

**API note:** Formatting the string from an excessively long list may exceed memory
         or string sizes.

Throws:

- `IllegalArgumentException`: if the length of `input` is zero.
- `NullPointerException`: if `input` is null.

## ListFormat.format(Object, StringBuffer, FieldPosition)

```java
public StringBuffer format(Object obj, StringBuffer toAppendTo, FieldPosition pos)
```

Formats an object and appends the resulting text to a given string
buffer. The object should either be a List or an array of Objects.

Parameters:

- `obj`: The object to format. Must be a List or an array of Object.
- `toAppendTo`: where the text is to be appended
- `pos`: Ignored. Not used in ListFormat. May be null

**API note:** Formatting the string from an excessively long list or array
         may exceed memory or string sizes.

**Returns:** the string buffer passed in as `toAppendTo`,
              with formatted text appended

Throws:

- `NullPointerException`: if `obj` or `toAppendTo` is null
- `IllegalArgumentException`: if `obj` is neither a `List` nor an array of `Object`s, or its length is zero.

## ListFormat.parse(String)

```java
public List<String> parse(String source) throws ParseException
```

Note that `format(List)` and this method
may not guarantee a round-trip, if the input strings contain ambiguous
delimiters. For example, a two element String list `"a, b,", "c"` will be
formatted as `"a, b, and c"`, but may be parsed as three elements
`"a", "b", "c"`.

Parameters:

- `source`: the string to parse, not null.

Throws:

- `ParseException`: if parse failed
- `NullPointerException`: if source is null

## ListFormat.parseObject(String, ParsePosition)

```java
public Object parseObject(String source, ParsePosition parsePos)
```

Parses text from a string to produce a list of strings.

The method attempts to parse text starting at the index given by
`parsePos`.
If parsing succeeds, then the index of `parsePos` is updated
to the index after the last character used (parsing does not necessarily
use all characters up to the end of the string), and the parsed
object is returned. The updated `parsePos` can be used to
indicate the starting point for the next call to parse additional text.
If an error occurs, then the index of `parsePos` is not
changed, the error index of `parsePos` is set to the index of
the character where the error occurred, and null is returned.
See the `parse(String)` method for more information
on list parsing.

Parameters:

- `source`: A string, part of which should be parsed.
- `parsePos`: A `ParsePosition` object with index and error index information as described above.

**Returns:** A list of string parsed from the `source`.
           In case of error, returns null.

Throws:

- `NullPointerException`: if `source` or `parsePos` is null.
- `IndexOutOfBoundsException`: if the starting index given by `parsePos` is outside `source`.

## ListFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `ListFormat` for equality.
Returns `true` if the specified object is also a `ListFormat`, and
`locale` and `patterns`, returned from `getLocale()`
and `getPatterns()` respectively, are equal.

Parameters:

- `obj`: the object to be compared for equality.

**Returns:** `true` if the specified object is equal to this `ListFormat`

## ListFormat.hashCode()

```java
public int hashCode()
```

(inherited documentation)

## ListFormat.toString()

```java
public String toString()
```
