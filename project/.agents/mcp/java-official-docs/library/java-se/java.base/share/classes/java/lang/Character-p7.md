---
title: "Character class (java.lang) (part 7 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 7 of 12)

## Character.charCount(int)

```java
public static int charCount(int codePoint)
```

Determines the number of `char` values needed to
represent the specified character (Unicode code point). If the
specified character is equal to or greater than 0x10000, then
the method returns 2. Otherwise, the method returns 1.

This method doesn't validate the specified character to be a
valid Unicode code point. The caller must validate the
character value using isValidCodePoint
if necessary.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** 2 if the character is a valid supplementary character; 1 otherwise.

**See also:** Character#isSupplementaryCodePoint(int)

**Since:** 1.5

## Character.toCodePoint(char, char)

```java
public static int toCodePoint(char high, char low)
```

Converts the specified surrogate pair to its supplementary code
point value. This method does not validate the specified
surrogate pair. The caller must validate it using char) isSurrogatePair if necessary.

Parameters:

- `high`: the high-surrogate code unit
- `low`: the low-surrogate code unit

**Returns:** the supplementary code point composed from the
        specified surrogate pair.

**Since:** 1.5

## Character.codePointAt(CharSequence, int)

```java
public static int codePointAt(CharSequence seq, int index)
```

Returns the code point at the given index of the
`CharSequence`. If the `char` value at
the given index in the `CharSequence` is in the
high-surrogate range, the following index is less than the
length of the `CharSequence`, and the
`char` value at the following index is in the
low-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the `char` value at the given index is returned.

Parameters:

- `seq`: a sequence of `char` values (Unicode code units)
- `index`: the index to the `char` values (Unicode code units) in `seq` to be converted

**Returns:** the Unicode code point at the given index

**Since:** 1.5

Throws:

- `NullPointerException`: if `seq` is null.
- `IndexOutOfBoundsException`: if the value `index` is negative or not less than seq.length().

## Character.codePointAt(char[], int)

```java
public static int codePointAt(char[] a, int index)
```

Returns the code point at the given index of the
`char` array. If the `char` value at
the given index in the `char` array is in the
high-surrogate range, the following index is less than the
length of the `char` array, and the
`char` value at the following index is in the
low-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the `char` value at the given index is returned.

Parameters:

- `a`: the `char` array
- `index`: the index to the `char` values (Unicode code units) in the `char` array to be converted

**Returns:** the Unicode code point at the given index

**Since:** 1.5

Throws:

- `NullPointerException`: if `a` is null.
- `IndexOutOfBoundsException`: if the value `index` is negative or not less than the length of the `char` array.

## Character.codePointAt(char[], int, int)

```java
public static int codePointAt(char[] a, int index, int limit)
```

Returns the code point at the given index of the
`char` array, where only array elements with
`index` less than `limit` can be used. If
the `char` value at the given index in the
`char` array is in the high-surrogate range, the
following index is less than the `limit`, and the
`char` value at the following index is in the
low-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the `char` value at the given index is returned.

Parameters:

- `a`: the `char` array
- `index`: the index to the `char` values (Unicode code units) in the `char` array to be converted
- `limit`: the index after the last array element that can be used in the `char` array

**Returns:** the Unicode code point at the given index

**Since:** 1.5

Throws:

- `NullPointerException`: if `a` is null.
- `IndexOutOfBoundsException`: if the `index` argument is negative or not less than the `limit` argument, or if the `limit` argument is negative or greater than the length of the `char` array.

## Character.codePointBefore(CharSequence, int)

```java
public static int codePointBefore(CharSequence seq, int index)
```

Returns the code point preceding the given index of the
`CharSequence`. If the `char` value at
`(index - 1)` in the `CharSequence` is in
the low-surrogate range, `(index - 2)` is not
negative, and the `char` value at `(index - 2)`
in the `CharSequence` is in the
high-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the `char` value at `(index - 1)` is
returned.

Parameters:

- `seq`: the `CharSequence` instance
- `index`: the index following the code point that should be returned

**Returns:** the Unicode code point value before the given index.

**Since:** 1.5

Throws:

- `NullPointerException`: if `seq` is null.
- `IndexOutOfBoundsException`: if the `index` argument is less than 1 or greater than seq.length().

## Character.codePointBefore(char[], int)

```java
public static int codePointBefore(char[] a, int index)
```

Returns the code point preceding the given index of the
`char` array. If the `char` value at
`(index - 1)` in the `char` array is in
the low-surrogate range, `(index - 2)` is not
negative, and the `char` value at `(index - 2)`
in the `char` array is in the
high-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the `char` value at `(index - 1)` is
returned.

Parameters:

- `a`: the `char` array
- `index`: the index following the code point that should be returned

**Returns:** the Unicode code point value before the given index.

**Since:** 1.5

Throws:

- `NullPointerException`: if `a` is null.
- `IndexOutOfBoundsException`: if the `index` argument is less than 1 or greater than the length of the `char` array

## Character.codePointBefore(char[], int, int)

```java
public static int codePointBefore(char[] a, int index, int start)
```

Returns the code point preceding the given index of the
`char` array, where only array elements with
`index` greater than or equal to `start`
can be used. If the `char` value at `(index - 1)`
in the `char` array is in the
low-surrogate range, `(index - 2)` is not less than
`start`, and the `char` value at
`(index - 2)` in the `char` array is in
the high-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the `char` value at `(index - 1)` is
returned.

Parameters:

- `a`: the `char` array
- `index`: the index following the code point that should be returned
- `start`: the index of the first array element in the `char` array

**Returns:** the Unicode code point value before the given index.

**Since:** 1.5

Throws:

- `NullPointerException`: if `a` is null.
- `IndexOutOfBoundsException`: if the `index` argument is not greater than the `start` argument or is greater than the length of the `char` array, or if the `start` argument is negative or not less than the length of the `char` array.

## Character.highSurrogate(int)

```java
public static char highSurrogate(int codePoint)
```

Returns the leading surrogate (a

high surrogate code unit) of the

surrogate pair
representing the specified supplementary character (Unicode
code point) in the UTF-16 encoding.  If the specified character
is not a
supplementary character,
an unspecified `char` is returned.

If
isSupplementaryCodePoint(x)
is `true`, then
isHighSurrogate`(highSurrogate(x))` and
toCodePoint`(highSurrogate(x),`lowSurrogate`(x)) == x`
are also always `true`.

Parameters:

- `codePoint`: a supplementary character (Unicode code point)

**Returns:** the leading surrogate code unit used to represent the
         character in the UTF-16 encoding

**Since:** 1.7

## Character.lowSurrogate(int)

```java
public static char lowSurrogate(int codePoint)
```

Returns the trailing surrogate (a

low surrogate code unit) of the

surrogate pair
representing the specified supplementary character (Unicode
code point) in the UTF-16 encoding.  If the specified character
is not a
supplementary character,
an unspecified `char` is returned.

If
isSupplementaryCodePoint(x)
is `true`, then
isLowSurrogate`(lowSurrogate(x))` and
toCodePoint`(`highSurrogate`(x), lowSurrogate(x)) == x`
are also always `true`.

Parameters:

- `codePoint`: a supplementary character (Unicode code point)

**Returns:** the trailing surrogate code unit used to represent the
         character in the UTF-16 encoding

**Since:** 1.7

## Character.toChars(int, char[], int)

```java
public static int toChars(int codePoint, char[] dst, int dstIndex)
```

Converts the specified character (Unicode code point) to its
UTF-16 representation. If the specified code point is a BMP
(Basic <example-value> Plane or Plane 0) value, the same value is
stored in `dst[dstIndex]`, and 1 is returned. If the
specified code point is a supplementary character, its
surrogate values are stored in `dst[dstIndex]`
(high-surrogate) and `dst[dstIndex+1]`
(low-surrogate), and 2 is returned.

Parameters:

- `codePoint`: the character (Unicode code point) to be converted.
- `dst`: an array of `char` in which the `codePoint`'s UTF-16 value is stored.
- `dstIndex`: the start index into the `dst` array where the converted value is stored.

**Returns:** 1 if the code point is a BMP code point, 2 if the
code point is a supplementary code point.

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the specified `codePoint` is not a valid Unicode code point.
- `NullPointerException`: if the specified `dst` is null.
- `IndexOutOfBoundsException`: if `dstIndex` is negative or not less than `dst.length`, or if `dst` at `dstIndex` doesn't have enough array element(s) to store the resulting `char` value(s). (If `dstIndex` is equal to `dst.length-1` and the specified `codePoint` is a supplementary character, the high-surrogate value is not stored in `dst[dstIndex]`.)

## Character.toChars(int)

```java
public static char[] toChars(int codePoint)
```

Converts the specified character (Unicode code point) to its
UTF-16 representation stored in a `char` array. If
the specified code point is a BMP (Basic <example-value> Plane or
Plane 0) value, the resulting `char` array has
the same value as `codePoint`. If the specified code
point is a supplementary code point, the resulting
`char` array has the corresponding surrogate pair.

Parameters:

- `codePoint`: a Unicode code point

**Returns:** a `char` array having
        `codePoint`'s UTF-16 representation.

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the specified `codePoint` is not a valid Unicode code point.

## Character.codePointCount(CharSequence, int, int)

```java
public static int codePointCount(CharSequence seq, int beginIndex, int endIndex)
```

Returns the number of Unicode code points in the text range of
the specified char sequence. The text range begins at the
specified `beginIndex` and extends to the
`char` at index `endIndex - 1`. Thus the
length (in `char`s) of the text range is
`endIndex-beginIndex`. Unpaired surrogates within
the text range count as one code point each.

Parameters:

- `seq`: the char sequence
- `beginIndex`: the index to the first `char` of the text range.
- `endIndex`: the index after the last `char` of the text range.

**Returns:** the number of Unicode code points in the specified text
range

**Since:** 1.5

Throws:

- `NullPointerException`: if `seq` is null.
- `IndexOutOfBoundsException`: if the `beginIndex` is negative, or `endIndex` is larger than the length of the given sequence, or `beginIndex` is larger than `endIndex`.

## Character.codePointCount(char[], int, int)

```java
public static int codePointCount(char[] a, int offset, int count)
```

Returns the number of Unicode code points in a subarray of the
`char` array argument. The `offset`
argument is the index of the first `char` of the
subarray and the `count` argument specifies the
length of the subarray in `char`s. Unpaired
surrogates within the subarray count as one code point each.

Parameters:

- `a`: the `char` array
- `offset`: the index of the first `char` in the given `char` array
- `count`: the length of the subarray in `char`s

**Returns:** the number of Unicode code points in the specified subarray

**Since:** 1.5

Throws:

- `NullPointerException`: if `a` is null.
- `IndexOutOfBoundsException`: if `offset` or `count` is negative, or if `offset + count` is larger than the length of the given array.

## Character.offsetByCodePoints(CharSequence, int, int)

```java
public static int offsetByCodePoints(CharSequence seq, int index, int codePointOffset)
```

Returns the index within the given char sequence that is offset
from the given `index` by `codePointOffset`
code points. Unpaired surrogates within the text range given by
`index` and `codePointOffset` count as
one code point each.

Parameters:

- `seq`: the char sequence
- `index`: the index to be offset
- `codePointOffset`: the offset in code points

**Returns:** the index within the char sequence

**Since:** 1.5

Throws:

- `NullPointerException`: if `seq` is null.
- `IndexOutOfBoundsException`: if `index` is negative or larger than the length of the char sequence, or if `codePointOffset` is positive and the subsequence starting with `index` has fewer than `codePointOffset` code points, or if `codePointOffset` is negative and the subsequence before `index` has fewer than the absolute value of `codePointOffset` code points.
