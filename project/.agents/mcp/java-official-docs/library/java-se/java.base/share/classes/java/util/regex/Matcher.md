---
title: "Matcher class (java.util.regex) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/regex/Matcher.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Matcher class (java.util.regex)

```java
public final class Matcher implements MatchResult
```

An engine that performs match operations on a character sequence by interpreting a `Pattern`.

 A matcher is created from a pattern by invoking the pattern's matcher method.  Once created, a matcher can be used to
perform three different kinds of match operations:

-

 The matches method attempts to match the entire
  input sequence against the pattern.

-

 The lookingAt method attempts to match the
  input sequence, starting at the beginning, against the pattern.

-

 The find method scans the input sequence looking
  for the next subsequence that matches the pattern.

 Each of these methods returns a boolean indicating success or failure.
More information about a successful match can be obtained by querying the
state of the matcher.

 A matcher finds matches in a subset of its input called the
*region*. By default, the region contains all of the matcher's input.
The region can be modified via the int) region method
and queried via the regionStart and regionEnd methods. The way that the region boundaries interact
with some pattern constructs can be changed. See useAnchoringBounds and useTransparentBounds for more details.

 This class also defines methods for replacing matched subsequences with
new strings whose contents can, if desired, be computed from the match
result.  The appendReplacement and appendTail methods can be used in tandem in order to collect
the result into an existing string buffer or string builder. Alternatively,
the more convenient replaceAll method can be used to
create a string in which every matching subsequence in the input sequence
is replaced.

 The explicit state of a matcher includes the start and end indices of
the most recent successful match.  It also includes the start and end
indices of the input subsequence captured by each capturing group in the pattern as well as a total
count of such subsequences.  As a convenience, methods are also provided for
returning these captured subsequences in string form.

 The explicit state of a matcher is initially undefined; attempting to
query any part of it before a successful match will cause an `IllegalStateException` to be thrown.  The explicit state of a matcher is
recomputed by every match operation.

 The implicit state of a matcher includes the input character sequence as
well as the *append position*, which is initially zero and is updated
by the appendReplacement method.

 A matcher may be reset explicitly by invoking its `reset()`
method or, if a new input sequence is desired, its reset(CharSequence) method.  Resetting a
matcher discards its explicit state information and sets the append position
to zero.

 Instances of this class are not safe for use by multiple concurrent
threads.

**Since:** 1.4

## Matcher.pattern()

```java
public Pattern pattern()
```

Returns the pattern that is interpreted by this matcher.

**Returns:** The pattern for which this matcher was created

## Matcher.toMatchResult()

```java
public MatchResult toMatchResult()
```

Returns the match state of this matcher as a `MatchResult`.
The result is unaffected by subsequent operations performed upon this
matcher.

**Returns:** a `MatchResult` with the state of this matcher

**Since:** 1.5

## Matcher.usePattern(Pattern)

```java
public Matcher usePattern(Pattern newPattern)
```

Changes the `Pattern` that this `Matcher` uses to
find matches with.

 This method causes this matcher to lose information
about the groups of the last match that occurred. The
matcher's position in the input is maintained and its
last append position is unaffected.

Parameters:

- `newPattern`: The new pattern used by this matcher

**Returns:** This matcher

**Since:** 1.5

Throws:

- `IllegalArgumentException`: If newPattern is `null`

## Matcher.reset()

```java
public Matcher reset()
```

Resets this matcher.

 Resetting a matcher discards all of its explicit state information
and sets its append position to zero. The matcher's region is set to the
default region, which is its entire character sequence. The anchoring
and transparency of this matcher's region boundaries are unaffected.

**Returns:** This matcher

## Matcher.reset(CharSequence)

```java
public Matcher reset(CharSequence input)
```

Resets this matcher with a new input sequence.

 Resetting a matcher discards all of its explicit state information
and sets its append position to zero.  The matcher's region is set to
the default region, which is its entire character sequence.  The
anchoring and transparency of this matcher's region boundaries are
unaffected.

Parameters:

- `input`: The new input character sequence

**Returns:** This matcher

## Matcher.start()

```java
public int start()
```

Returns the start index of the previous match.

**Returns:** The index of the first character matched

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed

## Matcher.start(int)

```java
public int start(int group)
```

Returns the start index of the subsequence captured by the given group
during the previous match operation.

 Capturing groups are indexed from left
to right, starting at one.  Group zero denotes the entire pattern, so
the expression *m.*`start(0)` is equivalent to
*m.*`start()`.

Parameters:

- `group`: The index of a capturing group in this matcher's pattern

**Returns:** The index of the first character captured by the group,
         or `-1` if the match was successful but the group
         itself did not match anything

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IndexOutOfBoundsException`: If there is no capturing group in the pattern with the given index

## Matcher.start(String)

```java
public int start(String name)
```

Returns the start index of the subsequence captured by the given
named-capturing group during the
previous match operation.

Parameters:

- `name`: The name of a named-capturing group in this matcher's pattern

**Returns:** The index of the first character captured by the group,
         or `-1` if the match was successful but the group
         itself did not match anything

**Since:** 1.8

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If there is no capturing group in the pattern with the given name

## Matcher.end()

```java
public int end()
```

Returns the offset after the last character matched.

**Returns:** The offset after the last character matched

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed

## Matcher.end(int)

```java
public int end(int group)
```

Returns the offset after the last character of the subsequence
captured by the given group during the previous match operation.

 Capturing groups are indexed from left
to right, starting at one.  Group zero denotes the entire pattern, so
the expression *m.*`end(0)` is equivalent to
*m.*`end()`.

Parameters:

- `group`: The index of a capturing group in this matcher's pattern

**Returns:** The offset after the last character captured by the group,
         or `-1` if the match was successful
         but the group itself did not match anything

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IndexOutOfBoundsException`: If there is no capturing group in the pattern with the given index

## Matcher.end(String)

```java
public int end(String name)
```

Returns the offset after the last character of the subsequence
captured by the given named-capturing
group during the previous match operation.

Parameters:

- `name`: The name of a named-capturing group in this matcher's pattern

**Returns:** The offset after the last character captured by the group,
         or `-1` if the match was successful
         but the group itself did not match anything

**Since:** 1.8

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If there is no capturing group in the pattern with the given name

## Matcher.group()

```java
public String group()
```

Returns the input subsequence matched by the previous match.

 For a matcher *m* with input sequence *s*,
the expressions *m.*`group()` and
*s.*`substring(`*m.*`start(),` *m.*
`end())` are equivalent.

 Note that some patterns, for example `a*`, match the empty
string.  This method will return the empty string when the pattern
successfully matches the empty string in the input.

**Returns:** The (possibly empty) subsequence matched by the previous match,
        in string form or `null` if a matcher with a previous
        match has changed its `java.util.regex.Pattern`,
        but no new match has yet been attempted

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed

## Matcher.group(int)

```java
public String group(int group)
```

Returns the input subsequence captured by the given group during the
previous match operation.

 For a matcher *m*, input sequence *s*, and group index
*g*, the expressions *m.*`group(`*g*`)` and
*s.*`substring(`*m.*`start(`*g*`),` *m.*`end(`*g*`))`
are equivalent.

 Capturing groups are indexed from left
to right, starting at one.  Group zero denotes the entire pattern, so
the expression `m.group(0)` is equivalent to `m.group()`.

 If the match was successful but the group specified failed to match
any part of the input sequence, then `null` is returned. Note
that some groups, for example `(a*)`, match the empty string.
This method will return the empty string when such a group successfully
matches the empty string in the input.

Parameters:

- `group`: The index of a capturing group in this matcher's pattern

**Returns:** The (possibly empty) subsequence captured by the group
         during the previous match, or `null` if the group
         failed to match part of the input or if the matcher's
         `java.util.regex.Pattern` has changed after a
         successful match, but a new match has not been attempted

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IndexOutOfBoundsException`: If there is no capturing group in the pattern with the given index

## Matcher.group(String)

```java
public String group(String name)
```

Returns the input subsequence captured by the given
named-capturing group during the
previous match operation.

 If the match was successful but the group specified failed to match
any part of the input sequence, then `null` is returned. Note
that some groups, for example `(a*)`, match the empty string.
This method will return the empty string when such a group successfully
matches the empty string in the input.

Parameters:

- `name`: The name of a named-capturing group in this matcher's pattern

**Returns:** The (possibly empty) subsequence captured by the named group
         during the previous match, or `null` if the group
         failed to match part of the input

**Since:** 1.7

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If there is no capturing group in the pattern with the given name

## Matcher.groupCount()

```java
public int groupCount()
```

Returns the number of capturing groups in this matcher's pattern.

 Group zero denotes the entire pattern by convention. It is not
included in this count.

 Any non-negative integer smaller than or equal to the value
returned by this method is guaranteed to be a valid group index for
this matcher.

**Returns:** The number of capturing groups in this matcher's pattern

## Matcher.matches()

```java
public boolean matches()
```

Attempts to match the entire region against the pattern.

 If the match succeeds then more information can be obtained via the
`start`, `end`, and `group` methods.

**Returns:** `true` if, and only if, the entire region sequence
         matches this matcher's pattern

## Matcher.find()

```java
public boolean find()
```

Attempts to find the next subsequence of the input sequence that matches
the pattern.

 This method starts at the beginning of this matcher's region, or, if
a previous invocation of the method was successful and the matcher has
not since been reset, at the first character not matched by the previous
match.

 If the match succeeds then more information can be obtained via the
`start`, `end`, and `group` methods.

**Returns:** `true` if, and only if, a subsequence of the input
         sequence matches this matcher's pattern

## Matcher.find(int)

```java
public boolean find(int start)
```

Resets this matcher and then attempts to find the next subsequence of
the input sequence that matches the pattern, starting at the specified
index.

 If the match succeeds then more information can be obtained via the
`start`, `end`, and `group` methods, and subsequent
invocations of the `find()` method will start at the first
character not matched by this match.

Parameters:

- `start`: the index to start searching for a match

**Returns:** `true` if, and only if, a subsequence of the input
         sequence starting at the given index matches this matcher's
         pattern

Throws:

- `IndexOutOfBoundsException`: If start is less than zero or if start is greater than the length of the input sequence.

## Matcher.lookingAt()

```java
public boolean lookingAt()
```

Attempts to match the input sequence, starting at the beginning of the
region, against the pattern.

 Like the matches method, this method always starts
at the beginning of the region; unlike that method, it does not
require that the entire region be matched.

 If the match succeeds then more information can be obtained via the
`start`, `end`, and `group` methods.

**Returns:** `true` if, and only if, a prefix of the input
         sequence matches this matcher's pattern

## Matcher.quoteReplacement(String)

```java
public static String quoteReplacement(String s)
```

Returns a literal replacement `String` for the specified
`String`.

This method produces a `String` that will work
as a literal replacement `s` in the
`appendReplacement` method of the `Matcher` class.
The `String` produced will match the sequence of characters
in `s` treated as a literal sequence. Slashes ('\') and
dollar signs ('$') will be given no special meaning.

Parameters:

- `s`: The string to be literalized

**Returns:** A literal string replacement

**Since:** 1.5
