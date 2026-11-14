---
title: "String class (java.lang) (part 4 of 7)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/String.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# String class (java.lang) (part 4 of 7)

## String.indexOf(String, int)

```java
public int indexOf(String str, int fromIndex)
```

Returns the index within this string of the first occurrence of the
specified substring, starting at the specified index.

The returned index is the smallest value `k` for which:

```java
    k >= Math.min(fromIndex, this.length()) &&
                  this.startsWith(str, k)
```

If no such value of `k` exists, then `-1` is returned.

Parameters:

- `str`: the substring to search for.
- `fromIndex`: the index from which to start the search.

**API note:** Unlike `substring(int)`, for example, this method does not throw
an exception when `fromIndex` is outside the valid range.
Rather, it returns -1 when `fromIndex` is larger than the length of
the string.
This result is, by itself, indistinguishable from a genuine absence of
`str` in the string.
If stricter behavior is needed, int, int)
should be considered instead.
On `String` `s` and a non-empty `str`, for example,
`s.indexOf(str, fromIndex, s.length())` would throw if
`fromIndex` were larger than the string length, or were negative.

**Returns:** the index of the first occurrence of the specified substring,
         starting at the specified index,
         or `-1` if there is no such occurrence.

## String.indexOf(String, int, int)

```java
public int indexOf(String str, int beginIndex, int endIndex)
```

Returns the index of the first occurrence of the specified substring
within the specified index range of `this` string.

This method returns the same result as the one of the invocation

```java
    s.substring(beginIndex, endIndex).indexOf(str) + beginIndex
```

if the index returned by `indexOf(String)` is non-negative,
and returns -1 otherwise.
(No substring is instantiated, though.)

Parameters:

- `str`: the substring to search for.
- `beginIndex`: the index to start the search from (included).
- `endIndex`: the index to stop the search at (excluded).

**Returns:** the index of the first occurrence of the specified substring
         within the specified index range,
         or `-1` if there is no such occurrence.

**Since:** 21

Throws:

- `StringIndexOutOfBoundsException`: if `beginIndex` is negative, or `endIndex` is larger than the length of this `String` object, or `beginIndex` is larger than `endIndex`.

## String.lastIndexOf(String)

```java
public int lastIndexOf(String str)
```

Returns the index within this string of the last occurrence of the
specified substring.  The last occurrence of the empty string ""
is considered to occur at the index value `this.length()`.

The returned index is the largest value `k` for which:

```java
this.startsWith(str, k)
```

If no such value of `k` exists, then `-1` is returned.

Parameters:

- `str`: the substring to search for.

**Returns:** the index of the last occurrence of the specified substring,
         or `-1` if there is no such occurrence.

## String.lastIndexOf(String, int)

```java
public int lastIndexOf(String str, int fromIndex)
```

Returns the index within this string of the last occurrence of the
specified substring, searching backward starting at the specified index.

The returned index is the largest value `k` for which:

```java
    k <= Math.min(fromIndex, this.length()) &&
                  this.startsWith(str, k)
```

If no such value of `k` exists, then `-1` is returned.

Parameters:

- `str`: the substring to search for.
- `fromIndex`: the index to start the search from.

**Returns:** the index of the last occurrence of the specified substring,
         searching backward from the specified index,
         or `-1` if there is no such occurrence.

## String.substring(int)

```java
public String substring(int beginIndex)
```

Returns a string that is a substring of this string. The
substring begins with the character at the specified index and
extends to the end of this string.

Examples:

```java
"unhappy".substring(2) returns "happy"
"Harbison".substring(3) returns "bison"
"emptiness".substring(9) returns "" (an empty string)
```

Parameters:

- `beginIndex`: the beginning index, inclusive.

**Returns:** the specified substring.

Throws:

- `IndexOutOfBoundsException`: if `beginIndex` is negative or larger than the length of this `String` object.

## String.substring(int, int)

```java
public String substring(int beginIndex, int endIndex)
```

Returns a string that is a substring of this string. The
substring begins at the specified `beginIndex` and
extends to the character at index `endIndex - 1`.
Thus the length of the substring is `endIndex-beginIndex`.

Examples:

```java
"hamburger".substring(4, 8) returns "urge"
"smiles".substring(1, 5) returns "mile"
```

Parameters:

- `beginIndex`: the beginning index, inclusive.
- `endIndex`: the ending index, exclusive.

**Returns:** the specified substring.

Throws:

- `IndexOutOfBoundsException`: if the `beginIndex` is negative, or `endIndex` is larger than the length of this `String` object, or `beginIndex` is larger than `endIndex`.

## String.subSequence(int, int)

```java
public CharSequence subSequence(int beginIndex, int endIndex)
```

Returns a character sequence that is a subsequence of this sequence.

 An invocation of this method of the form

```java
str.subSequence(begin, end)
```

behaves in exactly the same way as the invocation

```java
str.substring(begin, end)
```

Parameters:

- `beginIndex`: the begin index, inclusive.
- `endIndex`: the end index, exclusive.

**API note:** This method is defined so that the `String` class can implement
the `CharSequence` interface.

**Returns:** the specified subsequence.

**Since:** 1.4

Throws:

- `IndexOutOfBoundsException`: if `beginIndex` or `endIndex` is negative, if `endIndex` is greater than `length()`, or if `beginIndex` is greater than `endIndex`

## String.concat(String)

```java
public String concat(String str)
```

Concatenates the specified string to the end of this string.

If the length of the argument string is `0`, then this
`String` object is returned. Otherwise, a
`String` object is returned that represents a character
sequence that is the concatenation of the character sequence
represented by this `String` object and the character
sequence represented by the argument string.

Examples:

```java
"cares".concat("s") returns "caress"
"to".concat("get").concat("her") returns "together"
```

Parameters:

- `str`: the `String` that is concatenated to the end of this `String`.

**Returns:** a string that represents the concatenation of this object's
         characters followed by the string argument's characters.

## String.replace(char, char)

```java
public String replace(char oldChar, char newChar)
```

Returns a string resulting from replacing all occurrences of
`oldChar` in this string with `newChar`.

If the character `oldChar` does not occur in the
character sequence represented by this `String` object,
then a reference to this `String` object is returned.
Otherwise, a `String` object is returned that
represents a character sequence identical to the character sequence
represented by this `String` object, except that every
occurrence of `oldChar` is replaced by an occurrence
of `newChar`.

Examples:

```java
"mesquite in your cellar".replace('e', 'o')
        returns "mosquito in your collar"
"the war of baronets".replace('r', 'y')
        returns "the way of bayonets"
"sparring with a purple porpoise".replace('p', 't')
        returns "starring with a turtle tortoise"
"JonL".replace('q', 'x') returns "JonL" (no change)
```

Parameters:

- `oldChar`: the old character.
- `newChar`: the new character.

**Returns:** a string derived from this string by replacing every
         occurrence of `oldChar` with `newChar`.

## String.matches(String)

```java
public boolean matches(String regex)
```

Tells whether or not this string matches the given regular expression.

 An invocation of this method of the form
*str*`.matches(`*regex*`)` yields exactly the
same result as the expression

`java.util.regex.Pattern`.matches(*regex*, *str*)

Parameters:

- `regex`: the regular expression to which this string is to be matched

**Returns:** `true` if, and only if, this string matches the
         given regular expression

**See also:** java.util.regex.Pattern

**Since:** 1.4

Throws:

- `PatternSyntaxException`: if the regular expression's syntax is invalid

## String.contains(CharSequence)

```java
public boolean contains(CharSequence s)
```

Returns true if and only if this string contains the specified
sequence of char values.

Parameters:

- `s`: the sequence to search for

**Returns:** true if this string contains `s`, false otherwise

**Since:** 1.5

## String.replaceFirst(String, String)

```java
public String replaceFirst(String regex, String replacement)
```

Replaces the first substring of this string that matches the given regular expression with the
given replacement.

 An invocation of this method of the form
*str*`.replaceFirst(`*regex*`,` *repl*`)`
yields exactly the same result as the expression

`
`java.util.regex.Pattern`.compile(*regex*).matcher(*str*).replaceFirst(*repl*)
`

Note that backslashes (`\`) and dollar signs (`$`) in the
replacement string may cause the results to be different than if it were
being treated as a literal replacement string; see
`java.util.regex.Matcher.replaceFirst`.
Use `java.util.regex.Matcher.quoteReplacement` to suppress the special
meaning of these characters, if desired.

Parameters:

- `regex`: the regular expression to which this string is to be matched
- `replacement`: the string to be substituted for the first match

**Returns:** The resulting `String`

**See also:** java.util.regex.Pattern

**Since:** 1.4

Throws:

- `PatternSyntaxException`: if the regular expression's syntax is invalid

## String.replaceAll(String, String)

```java
public String replaceAll(String regex, String replacement)
```

Replaces each substring of this string that matches the given regular expression with the
given replacement.

 An invocation of this method of the form
*str*`.replaceAll(`*regex*`,` *repl*`)`
yields exactly the same result as the expression

`
`java.util.regex.Pattern`.compile(*regex*).matcher(*str*).replaceAll(*repl*)
`

Note that backslashes (`\`) and dollar signs (`$`) in the
replacement string may cause the results to be different than if it were
being treated as a literal replacement string; see
Matcher.replaceAll.
Use `java.util.regex.Matcher.quoteReplacement` to suppress the special
meaning of these characters, if desired.

Parameters:

- `regex`: the regular expression to which this string is to be matched
- `replacement`: the string to be substituted for each match

**Returns:** The resulting `String`

**See also:** java.util.regex.Pattern

**Since:** 1.4

Throws:

- `PatternSyntaxException`: if the regular expression's syntax is invalid

## String.replace(CharSequence, CharSequence)

```java
public String replace(CharSequence target, CharSequence replacement)
```

Replaces each substring of this string that matches the literal target
sequence with the specified literal replacement sequence. The
replacement proceeds from the beginning of the string to the end, for
example, replacing "aa" with "b" in the string "aaa" will result in
"ba" rather than "ab".

Parameters:

- `target`: The sequence of char values to be replaced
- `replacement`: The replacement sequence of char values

**Returns:** The resulting string

**Since:** 1.5

## String.split(String, int)

```java
public String[] split(String regex, int limit)
```

Splits this string around matches of the given
regular expression.

 The array returned by this method contains each substring of this
string that is terminated by another substring that matches the given
expression or is terminated by the end of the string.  The substrings in
the array are in the order in which they occur in this string.  If the
expression does not match any part of the input then the resulting array
has just one element, namely this string.

 When there is a positive-width match at the beginning of this
string then an empty leading substring is included at the beginning
of the resulting array. A zero-width match at the beginning however
never produces such empty leading substring.

 The `limit` parameter controls the number of times the
pattern is applied and therefore affects the length of the resulting
array.

-

   If the *limit* is positive then the pattern will be applied
   at most *limit* - 1 times, the array's length will be
   no greater than *limit*, and the array's last entry will contain
   all input beyond the last matched delimiter.

-

   If the *limit* is zero then the pattern will be applied as
   many times as possible, the array can have any length, and trailing
   empty strings will be discarded.

-

   If the *limit* is negative then the pattern will be applied
   as many times as possible and the array can have any length.

 The string `"boo:and:foo"`, for example, yields the
following results with these parameters:

Split example showing regex, limit, and result

    Regex
    Limit
    Result

:
    2
    `{ "boo", "and:foo" }`

    5
    `{ "boo", "and", "foo" }`

    -2
    `{ "boo", "and", "foo" }`
o
    5
    `{ "b", "", ":and:f", "", "" }`

    -2
    `{ "b", "", ":and:f", "", "" }`

    0
    `{ "b", "", ":and:f" }`

 An invocation of this method of the form
*str.*`split(`*regex*`,` *n*`)`
yields the same result as the expression

`
`java.util.regex.Pattern`.compile(*regex*).split(*str*, *n*)
`

Parameters:

- `regex`: the delimiting regular expression
- `limit`: the result threshold, as described above

**Returns:** the array of strings computed by splitting this string
         around matches of the given regular expression

**See also:** java.util.regex.Pattern

**Since:** 1.4

Throws:

- `PatternSyntaxException`: if the regular expression's syntax is invalid
