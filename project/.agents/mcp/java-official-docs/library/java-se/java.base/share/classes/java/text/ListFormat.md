# ListFormat class (java.text)

```java
public final class ListFormat extends Format
```

{@code ListFormat} formats or parses a list of strings in a locale-sensitive way.
Use {@code ListFormat} to construct a list of strings displayed for end users.
For example, displaying a list of 3 weekdays, e.g. "Monday", "Wednesday", "Friday"
as "Monday, Wednesday, and Friday" in an inclusive list type. This class provides
the functionality defined in Unicode Consortium's LDML specification for
<a href="https://www.unicode.org/reports/tr35/tr35-general.html#ListPatterns">
List Patterns</a>.
<p>
Three formatting types are provided: {@link Type#STANDARD STANDARD}, {@link Type#OR OR},
and {@link Type#UNIT UNIT}, which determines the punctuation
between the strings and the connecting words if any. Also, three formatting styles for each
type are provided: {@link Style#FULL FULL}, {@link Style#SHORT SHORT}, and
{@link Style#NARROW NARROW}, suitable for how the strings are abbreviated (or not).
The following snippet is an example of formatting
the list of Strings {@code "Foo", "Bar", "Baz"} in US English with
{@code STANDARD} type and {@code FULL} style:
{@snippet lang=java :
ListFormat.getInstance(Locale.US, ListFormat.Type.STANDARD, ListFormat.Style.FULL)
    .format(List.of("Foo", "Bar", "Baz"))
}
This will produce the concatenated list string, "Foo, Bar, and Baz" as seen in
the following:
<table class="striped">
<caption style="display:none">Formatting examples</caption>
<thead>
<tr><th scope="col"></th>
    <th scope="col">FULL</th>
    <th scope="col">SHORT</th>
    <th scope="col">NARROW</th></tr>
</thead>
<tbody>
<tr><th scope="row" style="text-align:left">STANDARD</th>
    <td>Foo, Bar, and Baz</td>
    <td>Foo, Bar, &amp; Baz</td>
    <td>Foo, Bar, Baz</td>
<tr><th scope="row" style="text-align:left">OR</th>
    <td>Foo, Bar, or Baz</td>
    <td>Foo, Bar, or Baz</td>
    <td>Foo, Bar, or Baz</td>
<tr><th scope="row" style="text-align:left">UNIT</th>
    <td>Foo, Bar, Baz</td>
    <td>Foo, Bar, Baz</td>
    <td>Foo Bar Baz</td>
</tbody>
</table>
Note: these examples are from CLDR, there could be different results from other locale providers.
<p>
Alternatively, Locale, Type, and/or Style independent instances
can be created with {@link #getInstance(String[])}. The String array to the
method specifies the delimiting patterns for the start/middle/end portion of
the formatted string, as well as optional specialized patterns for two or three
elements. Refer to the method description for more detail.
<p>
On parsing, if some ambiguity is found in the input string, such as delimiting
sequences in the input string, the result, when formatted with the same formatting, does not
re-produce the input string. For example, a two element String list
"a, b,", "c" will be formatted as "a, b, and c", but may be parsed as three elements
"a", "b", "c".

@implSpec This class is immutable and thread-safe

@spec https://www.unicode.org/reports/tr35 Unicode Locale Data Markup Language (LDML)
@since 22

## ListFormat.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

{@return the available locales that support ListFormat}

## ListFormat.getInstance()

```java
public static ListFormat getInstance()
```

{@return the ListFormat object for the default
{@link Locale.Category#FORMAT FORMAT Locale}, {@link Type#STANDARD STANDARD} type,
and {@link Style#FULL FULL} style}

## ListFormat.getInstance(Locale, Type, Style)

```java
public static ListFormat getInstance(Locale locale, Type type, Style style)
```

{@return the ListFormat object for the specified {@link Locale}, {@link Type Type},
and {@link Style Style}}
@param locale {@code Locale} to be used, not null
@param type type of the ListFormat. One of {@code STANDARD}, {@code OR},
            or {@code UNIT}, not null
@param style style of the ListFormat. One of {@code FULL}, {@code SHORT},
             or {@code NARROW}, not null
@throws NullPointerException if any of the arguments are null

## ListFormat.getInstance(String[])

```java
public static ListFormat getInstance(String[] patterns)
```

{@return the ListFormat object for the specified patterns}
<p>
This factory returns an instance based on the customized patterns array,
instead of letting the runtime provide appropriate patterns for the {@code Locale},
{@code Type}, or {@code Style}.
<p>
The patterns array should contain five String patterns, each corresponding to the Unicode LDML's
{@code listPatternPart}, i.e., "start", "middle", "end", two element, and three element patterns
in this order. Each pattern contains "{0}" and "{1}" (and "{2}" for the three element pattern)
placeholders that are substituted with the passed input strings on formatting.
If the length of the patterns array is not 5, an {@code IllegalArgumentException}
is thrown.
<p>
Each pattern string is first parsed as follows. Literals in parentheses, such as
"start_before", are optional:
<blockquote><pre>
start := (start_before){0}start_between{1}
middle := {0}middle_between{1}
end := {0}end_between{1}(end_after)
two := (two_before){0}two_between{1}(two_after)
three := (three_before){0}three_between1{1}three_between2{2}(three_after)
</pre></blockquote>
If two or three pattern string is empty, it falls back to
{@code "(start_before){0}end_between{1}(end_after)"},
{@code "(start_before){0}start_between{1}end_between{2}(end_after)"} respectively.
If parsing of any pattern string for start, middle, end, two, or three fails,
it throws an {@code IllegalArgumentException}.
<p>
On formatting, the input string list with {@code n} elements substitutes above
placeholders based on the number of elements:
<blockquote><pre>
n = 1: {0}
n = 2: parsed pattern for "two"
n = 3: parsed pattern for "three"
n > 3: (start_before){0}start_between{1}middle_between{2} ... middle_between{m}end_between{n}(end_after)
</pre></blockquote>
As an example, the following table shows a pattern array which is equivalent to
{@code STANDARD} type, {@code FULL} style in US English:
<table class="striped">
<caption style="display:none">Standard/Full Patterns in US English</caption>
<thead>
<tr><th scope="col">Pattern Kind</th>
    <th scope="col">Pattern String</th></tr>
</thead>
<tbody>
<tr><th scope="row" style="text-align:left">start</th>
    <td>"{0}, {1}"</td>
<tr><th scope="row" style="text-align:left">middle</th>
    <td>"{0}, {1}"</td>
<tr><th scope="row" style="text-align:left">end</th>
    <td>"{0}, and {1}"</td>
<tr><th scope="row" style="text-align:left">two</th>
    <td>"{0} and {1}"</td>
<tr><th scope="row" style="text-align:left">three</th>
    <td>""</td>
</tbody>
</table>
Here are the resulting formatted strings with the above pattern array.
<table class="striped">
<caption style="display:none">Formatting examples</caption>
<thead>
<tr><th scope="col">Input String List</th>
    <th scope="col">Formatted String</th></tr>
</thead>
<tbody>
<tr><th scope="row" style="text-align:left">"Foo", "Bar", "Baz", "Qux"</th>
    <td>"Foo, Bar, Baz, and Qux"</td>
<tr><th scope="row" style="text-align:left">"Foo", "Bar", "Baz"</th>
    <td>"Foo, Bar, and Baz"</td>
<tr><th scope="row" style="text-align:left">"Foo", "Bar"</th>
    <td>"Foo and Bar"</td>
<tr><th scope="row" style="text-align:left">"Foo"</th>
    <td>"Foo"</td>
</tbody>
</table>

@param patterns array of patterns, not null
@throws IllegalArgumentException if the length {@code patterns} array is not 5, or
         any of {@code start}, {@code middle}, {@code end}, {@code two}, or
         {@code three} patterns cannot be parsed.
@throws NullPointerException if {@code patterns} is null.

## ListFormat.getLocale()

```java
public Locale getLocale()
```

{@return the {@code Locale} of this ListFormat}

The {@code locale} is defined by {@link #getInstance(Locale, Type, Style)} or
{@link #getInstance(String[])}.

## ListFormat.getPatterns()

```java
public String[] getPatterns()
```

{@return the patterns used in this ListFormat}

The {@code patterns} are defined by {@link #getInstance(Locale, Type, Style)} or
{@link #getInstance(String[])}.

## ListFormat.format(List<String>)

```java
public String format(List<String> input)
```

{@return the string that consists of the input strings, concatenated with the
patterns of this {@code ListFormat}}
@apiNote Formatting the string from an excessively long list may exceed memory
         or string sizes.
@param input The list of input strings to format. There should at least
             one String element in this list, otherwise an {@code IllegalArgumentException}
             is thrown.
@throws IllegalArgumentException if the length of {@code input} is zero.
@throws NullPointerException if {@code input} is null.

## ListFormat.format(Object, StringBuffer, FieldPosition)

```java
public StringBuffer format(Object obj, StringBuffer toAppendTo, FieldPosition pos)
```

Formats an object and appends the resulting text to a given string
buffer. The object should either be a List or an array of Objects.

@apiNote Formatting the string from an excessively long list or array
         may exceed memory or string sizes.
@param obj    The object to format. Must be a List or an array
              of Object.
@param toAppendTo    where the text is to be appended
@param pos    Ignored. Not used in ListFormat. May be null
@return       the string buffer passed in as {@code toAppendTo},
              with formatted text appended
@throws    NullPointerException if {@code obj} or {@code toAppendTo} is null
@throws    IllegalArgumentException if {@code obj} is neither a {@code List}
              nor an array of {@code Object}s, or its length is zero.

## ListFormat.parse(String)

```java
public List<String> parse(String source) throws ParseException
```

{@return the parsed list of strings from the {@code source} string}

Note that {@link #format(List)} and this method
may not guarantee a round-trip, if the input strings contain ambiguous
delimiters. For example, a two element String list {@code "a, b,", "c"} will be
formatted as {@code "a, b, and c"}, but may be parsed as three elements
{@code "a", "b", "c"}.

@param source the string to parse, not null.
@throws ParseException if parse failed
@throws NullPointerException if source is null

## ListFormat.parseObject(String, ParsePosition)

```java
public Object parseObject(String source, ParsePosition parsePos)
```

Parses text from a string to produce a list of strings.
<p>
The method attempts to parse text starting at the index given by
{@code parsePos}.
If parsing succeeds, then the index of {@code parsePos} is updated
to the index after the last character used (parsing does not necessarily
use all characters up to the end of the string), and the parsed
object is returned. The updated {@code parsePos} can be used to
indicate the starting point for the next call to parse additional text.
If an error occurs, then the index of {@code parsePos} is not
changed, the error index of {@code parsePos} is set to the index of
the character where the error occurred, and null is returned.
See the {@link #parse(String)} method for more information
on list parsing.

@param source A string, part of which should be parsed.
@param parsePos A {@code ParsePosition} object with index and error
           index information as described above.
@return A list of string parsed from the {@code source}.
           In case of error, returns null.
@throws NullPointerException if {@code source} or {@code parsePos} is null.
@throws IndexOutOfBoundsException if the starting index given by
           {@code parsePos} is outside {@code source}.

## ListFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code ListFormat} for equality.
Returns {@code true} if the specified object is also a {@code ListFormat}, and
{@code locale} and {@code patterns}, returned from {@link #getLocale()}
and {@link #getPatterns()} respectively, are equal.
@param obj the object to be compared for equality.
@return {@code true} if the specified object is equal to this {@code ListFormat}

## ListFormat.hashCode()

```java
public int hashCode()
```

{@inheritDoc}

## ListFormat.toString()

```java
public String toString()
```

{@return a string identifying this {@code ListFormat}, for debugging}