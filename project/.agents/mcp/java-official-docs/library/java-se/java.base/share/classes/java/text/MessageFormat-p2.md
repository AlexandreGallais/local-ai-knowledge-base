---
title: "MessageFormat class (java.text) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/MessageFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MessageFormat class (java.text) (part 2 of 3)

## MessageFormat.applyPattern(String)

```java
public void applyPattern(String pattern)
```

Sets the pattern used by this message format.
The method parses the pattern and creates a list of subformats
for the format elements contained in it.
Patterns and their interpretation are specified in the
class description.

Parameters:

- `pattern`: the pattern for this message format

Throws:

- `IllegalArgumentException`: if the pattern is invalid
- `NullPointerException`: if `pattern` is `null`

## MessageFormat.toPattern()

```java
public String toPattern()
```

The string is constructed from internal information and therefore
does not necessarily equal the previously applied pattern. The order of
`FormatStyle` matching is not guaranteed. That is, a `FormatStyle` produced may not be equivalent to the corresponding style passed,
in the instance that multiple styles are equivalent.

**Implementation requirements:** The implementation in `MessageFormat` returns a
string that, when passed to a `MessageFormat()` constructor
or applyPattern(), produces an instance that
is semantically equivalent to this instance. If a subformat cannot be
converted to a String pattern, the `FormatType` and `FormatStyle`
will be omitted from the `FormatElement`.

## MessageFormat.setFormatsByArgumentIndex(Format[])

```java
public void setFormatsByArgumentIndex(Format[] newFormats)
```

Sets the formats to use for the values passed into
`format` methods or returned from `parse`
methods. The indices of elements in `newFormats`
correspond to the argument indices used in the previously set
pattern string.
The order of formats in `newFormats` thus corresponds to
the order of elements in the `arguments` array passed
to the `format` methods or the result array returned
by the `parse` methods.

If an argument index is used for more than one format element
in the pattern string, then the corresponding new format is used
for all such format elements. If an argument index is not used
for any format element in the pattern string, then the
corresponding new format is ignored. If fewer formats are provided
than needed, then only the formats for argument indices less
than `newFormats.length` are replaced.

Parameters:

- `newFormats`: the new formats to use

**Since:** 1.4

Throws:

- `NullPointerException`: if `newFormats` is null

## MessageFormat.setFormats(Format[])

```java
public void setFormats(Format[] newFormats)
```

Sets the formats to use for the format elements in the
previously set pattern string.
The order of formats in `newFormats` corresponds to
the order of format elements in the pattern string.

If more formats are provided than needed by the pattern string,
the remaining ones are ignored. If fewer formats are provided
than needed, then only the first `newFormats.length`
formats are replaced.

Since the order of format elements in a pattern string often
changes during localization, it is generally better to use the
setFormatsByArgumentIndex
method, which assumes an order of formats corresponding to the
order of elements in the `arguments` array passed to
the `format` methods or the result array returned by
the `parse` methods.

Parameters:

- `newFormats`: the new formats to use

Throws:

- `NullPointerException`: if `newFormats` is null

## MessageFormat.setFormatByArgumentIndex(int, Format)

```java
public void setFormatByArgumentIndex(int argumentIndex, Format newFormat)
```

Sets the format to use for the format elements within the
previously set pattern string that use the given argument
index.
The argument index is part of the format element definition and
represents an index into the `arguments` array passed
to the `format` methods or the result array returned
by the `parse` methods.

If the argument index is used for more than one format element
in the pattern string, then the new format is used for all such
format elements. If the argument index is not used for any format
element in the pattern string, then the new format is ignored.

Parameters:

- `argumentIndex`: the argument index for which to use the new format
- `newFormat`: the new format to use

**Since:** 1.4

## MessageFormat.setFormat(int, Format)

```java
public void setFormat(int formatElementIndex, Format newFormat)
```

Sets the format to use for the format element with the given
format element index within the previously set pattern string.
The format element index is the zero-based number of the format
element counting from the start of the pattern string.

Since the order of format elements in a pattern string often
changes during localization, it is generally better to use the
setFormatByArgumentIndex
method, which accesses format elements based on the argument
index they specify.

Parameters:

- `formatElementIndex`: the index of a format element within the pattern
- `newFormat`: the format to use for the specified format element

Throws:

- `ArrayIndexOutOfBoundsException`: if `formatElementIndex` is equal to or larger than the number of format elements in the pattern string

## MessageFormat.getFormatsByArgumentIndex()

```java
public Format[] getFormatsByArgumentIndex()
```

Gets the formats used for the values passed into
`format` methods or returned from `parse`
methods. The indices of elements in the returned array
correspond to the argument indices used in the previously set
pattern string.
The order of formats in the returned array thus corresponds to
the order of elements in the `arguments` array passed
to the `format` methods or the result array returned
by the `parse` methods.

If an argument index is used for more than one format element
in the pattern string, then the format used for the last such
format element is returned in the array. If an argument index
is not used for any format element in the pattern string, then
null is returned in the array.

**Returns:** the formats used for the arguments within the pattern

**Since:** 1.4

## MessageFormat.getFormats()

```java
public Format[] getFormats()
```

Gets the formats used for the format elements in the
previously set pattern string.
The order of formats in the returned array corresponds to
the order of format elements in the pattern string.

Since the order of format elements in a pattern string often
changes during localization, it's generally better to use the
getFormatsByArgumentIndex
method, which assumes an order of formats corresponding to the
order of elements in the `arguments` array passed to
the `format` methods or the result array returned by
the `parse` methods.

**Returns:** the formats used for the format elements in the pattern

## MessageFormat.format(Object[], StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object[] arguments, StringBuffer result, FieldPosition pos)
```

Formats an array of objects and appends the `MessageFormat`'s
pattern, with format elements replaced by the formatted objects, to the
provided `StringBuffer`.

The text substituted for the individual format elements is derived from
the current subformat of the format element and the
`arguments` element at the format element's argument index
as indicated by the first matching line of the following table. An
argument is *unavailable* if `arguments` is
`null` or has fewer than argumentIndex+1 elements.

Examples of subformat, argument, and formatted text

      Subformat
      Argument
      Formatted Text

      *any*
      *unavailable*
      `"{" + argumentIndex + "}"`

      `null`
      `"null"`

      `instanceof ChoiceFormat`
      *any*
      `subformat.format(argument).indexOf('{') >= 0 ?

          (new MessageFormat(subformat.format(argument), getLocale())).format(argument) :
          subformat.format(argument)`

      `!= null`
      *any*
      `subformat.format(argument)`

      `null`
      `instanceof Number`
      `NumberFormat.getInstance(getLocale()).format(argument)`

      `instanceof Date`
      `DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.SHORT, getLocale()).format(argument)`

      `instanceof String`
      `argument`

      *any*
      `argument.toString()`

If `pos` is non-null, and refers to
`Field.ARGUMENT`, the location of the first formatted
string will be returned.

Parameters:

- `arguments`: an array of objects to be formatted and substituted.
- `result`: where text is appended.
- `pos`: keeps track on the position of the first replaced argument in the output string.

**Returns:** the string buffer passed in as `result`, with formatted
text appended

Throws:

- `IllegalArgumentException`: if an argument in the `arguments` array is not of the type expected by the format element(s) that use it.
- `NullPointerException`: if `result` is `null` or if the `MessageFormat` instance that calls this method has locale set to null, and the implementation uses a locale-dependent subformat.

## MessageFormat.format(String, Object ...)

```java
public static String format(String pattern, Object ... arguments)
```

Creates a MessageFormat with the given pattern and uses it
to format the given arguments.
This method returns a string that would be equal to the string returned by

    `(new MessageFormat(pattern)).java.lang.StringBuffer, java.text.FieldPosition) format(arguments, new StringBuffer(), null).toString()`

Parameters:

- `pattern`: the pattern string
- `arguments`: object(s) to format

**Returns:** the formatted string

Throws:

- `IllegalArgumentException`: if the pattern is invalid, or if an argument in the `arguments` array is not of the type expected by the format element(s) that use it.
- `NullPointerException`: if `pattern` is `null`

## MessageFormat.format(Object, StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object arguments, StringBuffer result, FieldPosition pos)
```

Formats an array of objects and appends the `MessageFormat`'s
pattern, with format elements replaced by the formatted objects, to the
provided `StringBuffer`.
This is equivalent to

    `java.lang.StringBuffer, java.text.FieldPosition) format((Object[]) arguments, result, pos)`

Parameters:

- `arguments`: an array of objects to be formatted and substituted.
- `result`: where text is appended.
- `pos`: keeps track on the position of the first replaced argument in the output string.

Throws:

- `IllegalArgumentException`: if an argument in the `arguments` array is not of the type expected by the format element(s) that use it.
- `NullPointerException`: if `result` is `null` or if the `MessageFormat` instance that calls this method has locale set to null, and the implementation uses a locale-dependent subformat.

## MessageFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object arguments)
```

Formats an array of objects and inserts them into the
`MessageFormat`'s pattern, producing an
`AttributedCharacterIterator`.
You can use the returned `AttributedCharacterIterator`
to build the resulting String, as well as to determine information
about the resulting String.

The text of the returned `AttributedCharacterIterator` is
the same that would be returned by

    `java.lang.StringBuffer, java.text.FieldPosition) format(arguments, new StringBuffer(), null).toString()`

In addition, the `AttributedCharacterIterator` contains at
least attributes indicating where text was generated from an
argument in the `arguments` array. The keys of these attributes are of
type `MessageFormat.Field`, their values are
`Integer` objects indicating the index in the `arguments`
array of the argument from which the text was generated.

The attributes/value from the underlying `Format`
instances that `MessageFormat` uses will also be
placed in the resulting `AttributedCharacterIterator`.
This allows you to not only find where an argument is placed in the
resulting String, but also which fields it contains in turn.

Parameters:

- `arguments`: an array of objects to be formatted and substituted.

**Returns:** AttributedCharacterIterator describing the formatted value.

**Since:** 1.4

Throws:

- `NullPointerException`: if `arguments` is null.
- `IllegalArgumentException`: if an argument in the `arguments` array is not of the type expected by the format element(s) that use it.

## MessageFormat.parse(String, ParsePosition)

```java
public Object[] parse(String source, ParsePosition pos)
```

Parses the string.

Caveats: The parse may fail in a number of circumstances.
For example:

- If one of the arguments does not occur in the pattern.

- If the format of an argument loses information, such as
    with a choice format where a large number formats to "many".

- Does not yet handle recursion (where
    the substituted strings contain {n} references.)

- Will not always find a match (or the correct match)
    if some part of the parse is ambiguous.
    For example, if the pattern "{1},{2}" is used with the
    string arguments {"a,b", "c"}, it will format as "a,b,c".
    When the result is parsed, it will return {"a", "b,c"}.

- If a single argument is parsed more than once in the string,
    then the later parse wins.

When the parse fails, use ParsePosition.getErrorIndex() to find out
where in the string the parsing failed.  The returned error
index is the starting offset of the sub-patterns that the string
is comparing with.  For example, if the parsing string "AAA {0} BBB"
is comparing against the pattern "AAD {0} BBB", the error index is
0. When an error occurs, the call to this method will return null.
If the source is null, return an empty array.

Parameters:

- `source`: the string to parse
- `pos`: the parse position

**Returns:** an array of parsed objects

Throws:

- `NullPointerException`: if `pos` is `null` for a non-null `source` string.

## MessageFormat.parse(String)

```java
public Object[] parse(String source) throws ParseException
```

Parses text from the beginning of the given string to produce an object
array.
The method may not use the entire text of the given string.

See the ParsePosition) method for more information
on message parsing.

Parameters:

- `source`: A `String` whose beginning should be parsed.

**Returns:** An `Object` array parsed from the string.

Throws:

- `ParseException`: if the beginning of the specified string cannot be parsed.
