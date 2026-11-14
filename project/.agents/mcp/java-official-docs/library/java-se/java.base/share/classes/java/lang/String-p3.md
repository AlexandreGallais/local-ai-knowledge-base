---
title: "String class (java.lang) (part 3 of 7)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/String.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# String class (java.lang) (part 3 of 7)

## String.compareToIgnoreCase(String)

```java
public int compareToIgnoreCase(String str)
```

Compares two strings lexicographically, ignoring case
differences. This method returns an integer whose sign is that of
calling `compareTo` with case folded versions of the strings
where case differences have been eliminated by calling
`Character.toLowerCase(Character.toUpperCase(int))` on
each Unicode code point.

Note that this method does *not* take locale into account,
and will result in an unsatisfactory ordering for certain locales.
The `java.text.Collator` class provides locale-sensitive comparison.

Parameters:

- `str`: the `String` to be compared.

**Returns:** a negative integer, zero, or a positive integer as the
         specified String is greater than, equal to, or less
         than this String, ignoring case considerations.

**See also:** java.text.Collator

**See also:** #codePoints()

**Since:** 1.2

## String.regionMatches(int, String, int, int)

```java
public boolean regionMatches(int toffset, String other, int ooffset, int len)
```

Tests if two string regions are equal.

A substring of this `String` object is compared to a substring
of the argument other. The result is true if these substrings
represent identical character sequences. The substring of this
`String` object to be compared begins at index `toffset`
and has length `len`. The substring of other to be compared
begins at index `ooffset` and has length `len`. The
result is `false` if and only if at least one of the following
is true:

- `toffset` is negative.

- `ooffset` is negative.

- `toffset+len` is greater than the length of this
`String` object.

- `ooffset+len` is greater than the length of the other
argument.

- There is some nonnegative integer *k* less than `len`
such that:
`this.charAt(toffset +`*k*`) != other.charAt(ooffset +`
*k*`)`

Note that this method does *not* take locale into account.  The
`java.text.Collator` class provides locale-sensitive comparison.

Parameters:

- `toffset`: the starting offset of the subregion in this string.
- `other`: the string argument.
- `ooffset`: the starting offset of the subregion in the string argument.
- `len`: the number of characters to compare.

**Returns:** `true` if the specified subregion of this string
         exactly matches the specified subregion of the string argument;
         `false` otherwise.

## String.regionMatches(boolean, int, String, int, int)

```java
public boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)
```

Tests if two string regions are equal.

A substring of this `String` object is compared to a substring
of the argument `other`. The result is `true` if these
substrings represent Unicode code point sequences that are the same,
ignoring case if and only if `ignoreCase` is true.
The sequences `tsequence` and `osequence` are compared,
where `tsequence` is the sequence produced as if by calling
`this.substring(toffset, toffset + len).codePoints()` and
`osequence` is the sequence produced as if by calling
`other.substring(ooffset, ooffset + len).codePoints()`.
The result is `true` if and only if all of the following
are true:

- `toffset` is non-negative.

- `ooffset` is non-negative.

- `toffset+len` is less than or equal to the length of this
`String` object.

- `ooffset+len` is less than or equal to the length of the other
argument.

- if `ignoreCase` is `false`, all pairs of corresponding Unicode
code points are equal integer values; or if `ignoreCase` is `true`,
Character.toLowerCase(
`Character.toUpperCase(int)``)` on all pairs of Unicode code points
results in equal integer values.

Note that this method does *not* take locale into account,
and will result in unsatisfactory results for certain locales when
`ignoreCase` is `true`.  The `java.text.Collator` class
provides locale-sensitive comparison.

Parameters:

- `ignoreCase`: if `true`, ignore case when comparing characters.
- `toffset`: the starting offset of the subregion in this string.
- `other`: the string argument.
- `ooffset`: the starting offset of the subregion in the string argument.
- `len`: the number of characters (Unicode code units - 16bit `char` value) to compare.

**Returns:** `true` if the specified subregion of this string
         matches the specified subregion of the string argument;
         `false` otherwise. Whether the matching is exact
         or case insensitive depends on the `ignoreCase`
         argument.

**See also:** #codePoints()

## String.startsWith(String, int)

```java
public boolean startsWith(String prefix, int toffset)
```

Tests if the substring of this string beginning at the
specified index starts with the specified prefix.

Parameters:

- `prefix`: the prefix.
- `toffset`: where to begin looking in this string.

**Returns:** `true` if the character sequence represented by the
         argument is a prefix of the substring of this object starting
         at index `toffset`; `false` otherwise.
         The result is `false` if `toffset` is
         negative or greater than the length of this
         `String` object; otherwise the result is the same
         as the result of the expression

```java
         this.substring(toffset).startsWith(prefix)
```

## String.startsWith(String)

```java
public boolean startsWith(String prefix)
```

Tests if this string starts with the specified prefix.

Parameters:

- `prefix`: the prefix.

**Returns:** `true` if the character sequence represented by the
         argument is a prefix of the character sequence represented by
         this string; `false` otherwise.
         Note also that `true` will be returned if the
         argument is an empty string or is equal to this
         `String` object as determined by the
         `equals(Object)` method.

**Since:** 1.0

## String.endsWith(String)

```java
public boolean endsWith(String suffix)
```

Tests if this string ends with the specified suffix.

Parameters:

- `suffix`: the suffix.

**Returns:** `true` if the character sequence represented by the
         argument is a suffix of the character sequence represented by
         this object; `false` otherwise. Note that the
         result will be `true` if the argument is the
         empty string or is equal to this `String` object
         as determined by the `equals(Object)` method.

## String.hashCode()

```java
public int hashCode()
```

Returns a hash code for this string. The hash code for a
`String` object is computed as

```java
s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
```

using `int` arithmetic, where `s[i]` is the
*i*th character of the string, `n` is the length of
the string, and `^` indicates exponentiation.
(The hash value of the empty string is zero.)

**Returns:** a hash code value for this object.

## String.indexOf(int)

```java
public int indexOf(int ch)
```

Returns the index within this string of the first occurrence of
the specified character. If a character with value
`ch` occurs in the character sequence represented by
this `String` object, then the index (in Unicode
code units) of the first such occurrence is returned. For
values of `ch` in the range from 0 to 0xFFFF
(inclusive), this is the smallest value *k* such that:

```java
this.charAt(<i>k</i>) == ch
```

is true. For other values of `ch`, it is the
smallest value *k* such that:

```java
this.codePointAt(<i>k</i>) == ch
```

is true. In either case, if no such character occurs in this
string, then `-1` is returned.

Parameters:

- `ch`: a character (Unicode code point).

**Returns:** the index of the first occurrence of the character in the
         character sequence represented by this object, or
         `-1` if the character does not occur.

## String.indexOf(int, int)

```java
public int indexOf(int ch, int fromIndex)
```

Returns the index within this string of the first occurrence of the
specified character, starting the search at the specified index.

If a character with value `ch` occurs in the
character sequence represented by this `String`
object at an index no smaller than `fromIndex`, then
the index of the first such occurrence is returned. For values
of `ch` in the range from 0 to 0xFFFF (inclusive),
this is the smallest value *k* such that:

```java
(this.charAt(<i>k</i>) == ch) {@code &&} (<i>k</i> >= fromIndex)
```

is true. For other values of `ch`, it is the
smallest value *k* such that:

```java
(this.codePointAt(<i>k</i>) == ch) {@code &&} (<i>k</i> >= fromIndex)
```

is true. In either case, if no such character occurs in this
string at or after position `fromIndex`, then
`-1` is returned.

There is no restriction on the value of `fromIndex`. If it
is negative, it has the same effect as if it were zero: this entire
string may be searched. If it is greater than the length of this
string, it has the same effect as if it were equal to the length of
this string: `-1` is returned.

All indices are specified in `char` values
(Unicode code units).

Parameters:

- `ch`: a character (Unicode code point).
- `fromIndex`: the index to start the search from.

**Returns:** the index of the first occurrence of the character in the
         character sequence represented by this object that is greater
         than or equal to `fromIndex`, or `-1`
         if the character does not occur.

**API note:** Unlike `substring(int)`, for example, this method does not throw
an exception when `fromIndex` is outside the valid range.
Rather, it returns -1 when `fromIndex` is larger than the length of
the string.
This result is, by itself, indistinguishable from a genuine absence of
`ch` in the string.
If stricter behavior is needed, int, int)
should be considered instead.
On a `String` `s`, for example,
`s.indexOf(ch, fromIndex, s.length())` would throw if
`fromIndex` were larger than the string length, or were negative.

## String.indexOf(int, int, int)

```java
public int indexOf(int ch, int beginIndex, int endIndex)
```

Returns the index within this string of the first occurrence of the
specified character, starting the search at `beginIndex` and
stopping before `endIndex`.

If a character with value `ch` occurs in the
character sequence represented by this `String`
object at an index no smaller than `beginIndex` but smaller than
`endIndex`, then
the index of the first such occurrence is returned. For values
of `ch` in the range from 0 to 0xFFFF (inclusive),
this is the smallest value *k* such that:

```java
(this.charAt(<i>k</i>) == ch) && (beginIndex <= <i>k</i> < endIndex)
```

is true. For other values of `ch`, it is the
smallest value *k* such that:

```java
(this.codePointAt(<i>k</i>) == ch) && (beginIndex <= <i>k</i> < endIndex)
```

is true. In either case, if no such character occurs in this
string at or after position `beginIndex` and before position
`endIndex`, then `-1` is returned.

All indices are specified in `char` values
(Unicode code units).

Parameters:

- `ch`: a character (Unicode code point).
- `beginIndex`: the index to start the search from (included).
- `endIndex`: the index to stop the search at (excluded).

**Returns:** the index of the first occurrence of the character in the
         character sequence represented by this object that is greater
         than or equal to `beginIndex` and less than `endIndex`,
         or `-1` if the character does not occur.

**Since:** 21

Throws:

- `StringIndexOutOfBoundsException`: if `beginIndex` is negative, or `endIndex` is larger than the length of this `String` object, or `beginIndex` is larger than `endIndex`.

## String.lastIndexOf(int)

```java
public int lastIndexOf(int ch)
```

Returns the index within this string of the last occurrence of
the specified character. For values of `ch` in the
range from 0 to 0xFFFF (inclusive), the index (in Unicode code
units) returned is the largest value *k* such that:

```java
this.charAt(<i>k</i>) == ch
```

is true. For other values of `ch`, it is the
largest value *k* such that:

```java
this.codePointAt(<i>k</i>) == ch
```

is true.  In either case, if no such character occurs in this
string, then `-1` is returned.  The
`String` is searched backwards starting at the last
character.

Parameters:

- `ch`: a character (Unicode code point).

**Returns:** the index of the last occurrence of the character in the
         character sequence represented by this object, or
         `-1` if the character does not occur.

## String.lastIndexOf(int, int)

```java
public int lastIndexOf(int ch, int fromIndex)
```

Returns the index within this string of the last occurrence of
the specified character, searching backward starting at the
specified index. For values of `ch` in the range
from 0 to 0xFFFF (inclusive), the index returned is the largest
value *k* such that:

```java
(this.charAt(<i>k</i>) == ch) {@code &&} (<i>k</i> <= fromIndex)
```

is true. For other values of `ch`, it is the
largest value *k* such that:

```java
(this.codePointAt(<i>k</i>) == ch) {@code &&} (<i>k</i> <= fromIndex)
```

is true. In either case, if no such character occurs in this
string at or before position `fromIndex`, then
`-1` is returned.

All indices are specified in `char` values
(Unicode code units).

Parameters:

- `ch`: a character (Unicode code point).
- `fromIndex`: the index to start the search from. There is no restriction on the value of `fromIndex`. If it is greater than or equal to the length of this string, it has the same effect as if it were equal to one less than the length of this string: this entire string may be searched. If it is negative, it has the same effect as if it were -1: -1 is returned.

**Returns:** the index of the last occurrence of the character in the
         character sequence represented by this object that is less
         than or equal to `fromIndex`, or `-1`
         if the character does not occur before that point.

## String.indexOf(String)

```java
public int indexOf(String str)
```

Returns the index within this string of the first occurrence of the
specified substring.

The returned index is the smallest value `k` for which:

```java
this.startsWith(str, k)
```

If no such value of `k` exists, then `-1` is returned.

Parameters:

- `str`: the substring to search for.

**Returns:** the index of the first occurrence of the specified substring,
         or `-1` if there is no such occurrence.
