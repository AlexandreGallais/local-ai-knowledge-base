---
title: "Pattern class (java.util.regex) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/regex/Pattern.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Pattern class (java.util.regex) (part 3 of 3)

## Pattern.split(CharSequence, int)

```java
public String[] split(CharSequence input, int limit)
```

Splits the given input sequence around matches of this pattern.

 The array returned by this method contains each substring of the
input sequence that is terminated by another subsequence that matches
this pattern or is terminated by the end of the input sequence.  The
substrings in the array are in the order in which they occur in the
input. If this pattern does not match any subsequence of the input then
the resulting array has just one element, namely the input sequence in
string form.

 When there is a positive-width match at the beginning of the input
sequence then an empty leading substring is included at the beginning
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

 The input `"boo:and:foo"`, for example, yields the following
results with these parameters:

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

Parameters:

- `input`: The character sequence to be split
- `limit`: The result threshold, as described above

**Returns:** The array of strings computed by splitting the input
         around matches of this pattern

## Pattern.splitWithDelimiters(CharSequence, int)

```java
public String[] splitWithDelimiters(CharSequence input, int limit)
```

Splits the given input sequence around matches of this pattern and
returns both the strings and the matching delimiters.

 The array returned by this method contains each substring of the
input sequence that is terminated by another subsequence that matches
this pattern or is terminated by the end of the input sequence.
Each substring is immediately followed by the subsequence (the delimiter)
that matches this pattern, *except* for the last substring, which
is not followed by anything.
The substrings in the array and the delimiters are in the order in which
they occur in the input.
If this pattern does not match any subsequence of the input then the
resulting array has just one element, namely the input sequence in string
form.

 When there is a positive-width match at the beginning of the input
sequence then an empty leading substring is included at the beginning
of the resulting array.
A zero-width match at the beginning however never produces such empty
leading substring nor the empty delimiter.

 The `limit` parameter controls the number of times the
pattern is applied and therefore affects the length of the resulting
array.

-  If the *limit* is positive then the pattern will be applied
   at most *limit* - 1 times, the array's length will be
   no greater than 2 &times; *limit* - 1, and the array's last
   entry will contain all input beyond the last matched delimiter.

-  If the *limit* is zero then the pattern will be applied as
   many times as possible, the array can have any length, and trailing
   empty strings, whether substrings or delimiters, will be discarded.

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

- `input`: The character sequence to be split
- `limit`: The result threshold, as described above

**Returns:** The array of strings computed by splitting the input
         around matches of this pattern, alternating
         substrings and matching delimiters

**Since:** 21

## Pattern.split(CharSequence)

```java
public String[] split(CharSequence input)
```

Splits the given input sequence around matches of this pattern.

 This method works as if by invoking the two-argument int) split method with the given input
sequence and a limit argument of zero.  Trailing empty strings are
therefore not included in the resulting array.

 The input `"boo:and:foo"`, for example, yields the following
results with these expressions:

Split examples showing regex and result

 Regex
 Result

:
    `{ "boo", "and", "foo" }`
o
    `{ "b", "", ":and:f" }`

Parameters:

- `input`: The character sequence to be split

**Returns:** The array of strings computed by splitting the input
         around matches of this pattern

## Pattern.quote(String)

```java
public static String quote(String s)
```

Returns a literal pattern `String` for the specified
`String`.

This method produces a `String` that can be used to
create a `Pattern` that would match the string
`s` as if it were a literal pattern.

 Metacharacters
or escape sequences in the input sequence will be given no special
meaning.

Parameters:

- `s`: The string to be literalized

**Returns:** A literal string replacement

**Since:** 1.5

## Pattern.namedGroups()

```java
public Map<String, Integer> namedGroups()
```

Returns an unmodifiable map from capturing group names to group numbers.
If there are no named groups, returns an empty map.

**Returns:** an unmodifiable map from capturing group names to group numbers

**Since:** 20

## Pattern.asPredicate()

```java
public Predicate<String> asPredicate()
```

Creates a predicate that tests if this pattern is found in a given input
string.

**API note:** This method creates a predicate that behaves as if it creates a matcher
from the input sequence and then calls `find`, for example a
predicate of the form:

```java
  s -> matcher(s).find();
```

**Returns:** The predicate which can be used for finding a match on a
         subsequence of a string

**Since:** 1.8

**See also:** Matcher#find

## Pattern.asMatchPredicate()

```java
public Predicate<String> asMatchPredicate()
```

Creates a predicate that tests if this pattern matches a given input string.

**API note:** This method creates a predicate that behaves as if it creates a matcher
from the input sequence and then calls `matches`, for example a
predicate of the form:

```java
  s -> matcher(s).matches();
```

**Returns:** The predicate which can be used for matching an input string
         against this pattern.

**Since:** 11

**See also:** Matcher#matches

## Pattern.splitAsStream(CharSequence)

```java
public Stream<String> splitAsStream(final CharSequence input)
```

Creates a stream from the given input sequence around matches of this
pattern.

 The stream returned by this method contains each substring of the
input sequence that is terminated by another subsequence that matches
this pattern or is terminated by the end of the input sequence.  The
substrings in the stream are in the order in which they occur in the
input. Trailing empty strings will be discarded and not encountered in
the stream.

 If this pattern does not match any subsequence of the input then
the resulting stream has just one element, namely the input sequence in
string form.

 When there is a positive-width match at the beginning of the input
sequence then an empty leading substring is included at the beginning
of the stream. A zero-width match at the beginning however never produces
such empty leading substring.

 If the input sequence is mutable, it must remain constant during the
execution of the terminal stream operation.  Otherwise, the result of the
terminal stream operation is undefined.

Parameters:

- `input`: The character sequence to be split

**Returns:** The stream of strings computed by splitting the input
         around matches of this pattern

**See also:** #split(CharSequence)

**Since:** 1.8
