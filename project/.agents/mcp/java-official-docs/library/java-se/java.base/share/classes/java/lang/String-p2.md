---
title: "String class (java.lang) (part 2 of 7)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/String.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# String class (java.lang) (part 2 of 7)

## String.String(StringBuilder)

```java
public String(StringBuilder builder)
```

Allocates a new string that contains the sequence of characters
currently contained in the string builder argument. The contents of the
string builder are copied; subsequent modification of the string builder
does not affect the newly created string.

 The contents of the string are unspecified if the `StringBuilder`
is modified during string construction.

 This constructor is provided to ease migration to `StringBuilder`. Obtaining a string from a string builder via the `toString` method is likely to run faster and is generally preferred.

Parameters:

- `builder`: A `StringBuilder`

**Since:** 1.5

## String.length()

```java
public int length()
```

Returns the length of this string.
The length is equal to the number of Unicode
code units in the string.

**Returns:** the length of the sequence of characters represented by this
         object.

## String.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if, and only if, `length()` is `0`.

**Returns:** `true` if `length()` is `0`, otherwise
`false`

**API note:** To determine whether a string contains only
white space, use
isBlank.

**Since:** 1.6

## String.charAt(int)

```java
public char charAt(int index)
```

Returns the `char` value at the
specified index. An index ranges from `0` to
`length() - 1`. The first `char` value of the sequence
is at index `0`, the next at index `1`,
and so on, as for array indexing.

If the `char` value specified by the index is a
surrogate, the surrogate
value is returned.

Parameters:

- `index`: the index of the `char` value.

**Returns:** the `char` value at the specified index of this string.
            The first `char` value is at index `0`.

Throws:

- `IndexOutOfBoundsException`: if the `index` argument is negative or not less than the length of this string.

## String.codePointAt(int)

```java
public int codePointAt(int index)
```

Returns the character (Unicode code point) at the specified
index. The index refers to `char` values
(Unicode code units) and ranges from `0` to
`length()``- 1`.

 If the `char` value specified at the given index
is in the high-surrogate range, the following index is less
than the length of this `String`, and the
`char` value at the following index is in the
low-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the `char` value at the given index is returned.

Parameters:

- `index`: the index to the `char` values

**Returns:** the code point value of the character at the
            `index`

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: if the `index` argument is negative or not less than the length of this string.

## String.codePointBefore(int)

```java
public int codePointBefore(int index)
```

Returns the character (Unicode code point) before the specified
index. The index refers to `char` values
(Unicode code units) and ranges from `1` to length.

 If the `char` value at `(index - 1)`
is in the low-surrogate range, `(index - 2)` is not
negative, and the `char` value at `(index - 2)` is in the high-surrogate range, then the
supplementary code point value of the surrogate pair is
returned. If the `char` value at `index - 1` is an unpaired low-surrogate or a high-surrogate, the
surrogate value is returned.

Parameters:

- `index`: the index following the code point that should be returned

**Returns:** the Unicode code point value before the given index.

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: if the `index` argument is less than 1 or greater than the length of this string.

## String.codePointCount(int, int)

```java
public int codePointCount(int beginIndex, int endIndex)
```

Returns the number of Unicode code points in the specified text
range of this `String`. The text range begins at the
specified `beginIndex` and extends to the
`char` at index `endIndex - 1`. Thus the
length (in `char`s) of the text range is
`endIndex-beginIndex`. Unpaired surrogates within
the text range count as one code point each.

Parameters:

- `beginIndex`: the index to the first `char` of the text range.
- `endIndex`: the index after the last `char` of the text range.

**Returns:** the number of Unicode code points in the specified text
range

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: if the `beginIndex` is negative, or `endIndex` is larger than the length of this `String`, or `beginIndex` is larger than `endIndex`.

## String.offsetByCodePoints(int, int)

```java
public int offsetByCodePoints(int index, int codePointOffset)
```

Returns the index within this `String` that is
offset from the given `index` by
`codePointOffset` code points. Unpaired surrogates
within the text range given by `index` and
`codePointOffset` count as one code point each.

Parameters:

- `index`: the index to be offset
- `codePointOffset`: the offset in code points

**Returns:** the index within this `String`

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: if `index` is negative or larger than the length of this `String`, or if `codePointOffset` is positive and the substring starting with `index` has fewer than `codePointOffset` code points, or if `codePointOffset` is negative and the substring before `index` has fewer than the absolute value of `codePointOffset` code points.

## String.getChars(int, int, char[], int)

```java
public void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)
```

(inherited documentation)

Parameters:

- `srcBegin`: (inherited documentation)
- `srcEnd`: (inherited documentation)
- `dst`: (inherited documentation)
- `dstBegin`: (inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## String.getBytes(int, int, byte[], int)

```java
public void getBytes(int srcBegin, int srcEnd, byte[] dst, int dstBegin)
```

Copies characters from this string into the destination byte array. Each
byte receives the 8 low-order bits of the corresponding character. The
eight high-order bits of each character are not copied and do not
participate in the transfer in any way.

 The first character to be copied is at index `srcBegin`; the
last character to be copied is at index `srcEnd-1`.  The total
number of characters to be copied is `srcEnd-srcBegin`. The
characters, converted to bytes, are copied into the subarray of `dst` starting at index `dstBegin` and ending at index:

```java
    dstBegin + (srcEnd-srcBegin) - 1
```

Parameters:

- `srcBegin`: Index of the first character in the string to copy
- `srcEnd`: Index after the last character in the string to copy
- `dst`: The destination array
- `dstBegin`: The start offset in the destination array

**Deprecated:** This method does not properly convert characters into
bytes.  As of JDK 1.1, the preferred way to do this is via the
`getBytes()` method, which uses the default charset.

Throws:

- `IndexOutOfBoundsException`: If any of the following is true:
-  `srcBegin` is negative
-  `srcBegin` is greater than `srcEnd`
-  `srcEnd` is greater than the length of this String
-  `dstBegin` is negative
-  `dstBegin+(srcEnd-srcBegin)` is larger than `dst.length`

## String.getBytes(String)

```java
public byte[] getBytes(String charsetName) throws UnsupportedEncodingException
```

Encodes this `String` into a sequence of bytes using the named
charset, storing the result into a new byte array.

 The behavior of this method when this string cannot be encoded in
the given charset is unspecified.  The `java.nio.charset.CharsetEncoder` class should be used when more control
over the encoding process is required.

Parameters:

- `charsetName`: The name of a supported charset

**Returns:** The resultant byte array

**Since:** 1.1

Throws:

- `UnsupportedEncodingException`: If the named charset is not supported

## String.getBytes(Charset)

```java
public byte[] getBytes(Charset charset)
```

Encodes this `String` into a sequence of bytes using the given
charset, storing the result into a
new byte array.

 This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement byte array.  The
`java.nio.charset.CharsetEncoder` class should be used when more
control over the encoding process is required.

Parameters:

- `charset`: The `java.nio.charset.Charset` to be used to encode the `String`

**Returns:** The resultant byte array

**Since:** 1.6

## String.getBytes()

```java
public byte[] getBytes()
```

Encodes this `String` into a sequence of bytes using the
default charset, storing the result
into a new byte array.

 The behavior of this method when this string cannot be encoded in
the default charset is unspecified.  The `java.nio.charset.CharsetEncoder` class should be used when more control
over the encoding process is required.

**Returns:** The resultant byte array

**Since:** 1.1

## String.equals(Object)

```java
public boolean equals(Object anObject)
```

Compares this string to the specified object.  The result is `true` if and only if the argument is not `null` and is a `String` object that represents the same sequence of characters as this
object.

For finer-grained String comparison, refer to
`java.text.Collator`.

Parameters:

- `anObject`: The object to compare this `String` against

**Returns:** `true` if the given object represents a `String`
         equivalent to this string, `false` otherwise

**See also:** #compareTo(String)

**See also:** #equalsIgnoreCase(String)

## String.contentEquals(StringBuffer)

```java
public boolean contentEquals(StringBuffer sb)
```

Compares this string to the specified `StringBuffer`.  The result
is `true` if and only if this `String` represents the same
sequence of characters as the specified `StringBuffer`. This method
synchronizes on the `StringBuffer`.

For finer-grained String comparison, refer to
`java.text.Collator`.

Parameters:

- `sb`: The `StringBuffer` to compare this `String` against

**Returns:** `true` if this `String` represents the same
         sequence of characters as the specified `StringBuffer`,
         `false` otherwise

**Since:** 1.4

## String.contentEquals(CharSequence)

```java
public boolean contentEquals(CharSequence cs)
```

Compares this string to the specified `CharSequence`.  The
result is `true` if and only if this `String` represents the
same sequence of char values as the specified sequence. Note that if the
`CharSequence` is a `StringBuffer` then the method
synchronizes on it.

For finer-grained String comparison, refer to
`java.text.Collator`.

Parameters:

- `cs`: The sequence to compare this `String` against

**Returns:** `true` if this `String` represents the same
         sequence of char values as the specified sequence, `false` otherwise

**Since:** 1.5

## String.equalsIgnoreCase(String)

```java
public boolean equalsIgnoreCase(String anotherString)
```

Compares this `String` to another `String`, ignoring case
considerations.  Two strings are considered equal ignoring case if they
are of the same length and corresponding Unicode code points in the two
strings are equal ignoring case.

 Two Unicode code points are considered the same
ignoring case if at least one of the following is true:

-  The two Unicode code points are the same (as compared by the
       `==` operator)

-  Calling `Character.toLowerCase(Character.toUpperCase(int))`
       on each Unicode code point produces the same result

Note that this method does *not* take locale into account, and
will result in unsatisfactory results for certain locales.  The
`java.text.Collator` class provides locale-sensitive comparison.

Parameters:

- `anotherString`: The `String` to compare this `String` against

**Returns:** `true` if the argument is not `null` and it
         represents an equivalent `String` ignoring case; `false` otherwise

**See also:** #equals(Object)

**See also:** #codePoints()

## String.compareTo(String)

```java
public int compareTo(String anotherString)
```

Compares two strings lexicographically.
The comparison is based on the Unicode value of each character in
the strings. The character sequence represented by this
`String` object is compared lexicographically to the
character sequence represented by the argument string. The result is
a negative integer if this `String` object
lexicographically precedes the argument string. The result is a
positive integer if this `String` object lexicographically
follows the argument string. The result is zero if the strings
are equal; `compareTo` returns `0` exactly when
the `equals(Object)` method would return `true`.

This is the definition of lexicographic ordering. If two strings are
different, then either they have different characters at some index
that is a valid index for both strings, or their lengths are different,
or both. If they have different characters at one or more index
positions, let *k* be the smallest such index; then the string
whose character at position *k* has the smaller value, as
determined by using the `<` operator, lexicographically precedes the
other string. In this case, `compareTo` returns the
difference of the two character values at position `k` in
the two string -- that is, the value:

```java
this.charAt(k)-anotherString.charAt(k)
```

If there is no index position at which they differ, then the shorter
string lexicographically precedes the longer string. In this case,
`compareTo` returns the difference of the lengths of the
strings -- that is, the value:

```java
this.length()-anotherString.length()
```

For finer-grained String comparison, refer to
`java.text.Collator`.

Parameters:

- `anotherString`: the `String` to be compared.

**Returns:** the value `0` if the argument string is equal to
         this string; a value less than `0` if this string
         is lexicographically less than the string argument; and a
         value greater than `0` if this string is
         lexicographically greater than the string argument.

## String.CASE_INSENSITIVE_ORDER

```java
public static final Comparator<String> CASE_INSENSITIVE_ORDER
```

A Comparator that orders `String` objects as by
compareToIgnoreCase.
This comparator is serializable.

Note that this Comparator does *not* take locale into account,
and will result in an unsatisfactory ordering for certain locales.
The `java.text.Collator` class provides locale-sensitive comparison.

**See also:** java.text.Collator

**Since:** 1.2
