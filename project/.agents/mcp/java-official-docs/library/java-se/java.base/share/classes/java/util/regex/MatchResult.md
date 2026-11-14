---
title: "MatchResult interface (java.util.regex)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/regex/MatchResult.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MatchResult interface (java.util.regex)

```java
public interface MatchResult
```

The result of a match operation.

This interface contains query methods used to determine the
results of a match against a regular expression. The match boundaries,
groups and group boundaries can be seen but not modified through
a `MatchResult`.

**Implementation note:** Support for named groups is implemented by the default methods
`start(String)`, `end(String)` and `group(String)`.
They all make use of the map returned by `namedGroups()`, whose
default implementation simply throws `UnsupportedOperationException`.
It is thus sufficient to override `namedGroups()` for these methods
to work. However, overriding them directly might be preferable for
performance or other reasons.

**See also:** Matcher

**Since:** 1.5

## MatchResult.start()

```java
int start()
```

Returns the start index of the match.

**Returns:** The index of the first character matched

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed

## MatchResult.start(int)

```java
int start(int group)
```

Returns the start index of the subsequence captured by the given group
during this match.

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

## MatchResult.start(String)

```java
default int start(String name)
```

Returns the start index of the subsequence captured by the given
named-capturing group during the
previous match operation.

Parameters:

- `name`: The name of a named-capturing group in this matcher's pattern

**Returns:** The index of the first character captured by the group,
         or `-1` if the match was successful but the group
         itself did not match anything

**Implementation requirements:** The default implementation of this method invokes `namedGroups()`
to obtain the group number from the `name` argument, and uses it
as argument to an invocation of `start(int)`.

**Since:** 20

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If there is no capturing group in the pattern with the given name

## MatchResult.end()

```java
int end()
```

Returns the offset after the last character matched.

**Returns:** The offset after the last character matched

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed

## MatchResult.end(int)

```java
int end(int group)
```

Returns the offset after the last character of the subsequence
captured by the given group during this match.

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

## MatchResult.end(String)

```java
default int end(String name)
```

Returns the offset after the last character of the subsequence
captured by the given named-capturing
group during the previous match operation.

Parameters:

- `name`: The name of a named-capturing group in this matcher's pattern

**Returns:** The offset after the last character captured by the group,
         or `-1` if the match was successful
         but the group itself did not match anything

**Implementation requirements:** The default implementation of this method invokes `namedGroups()`
to obtain the group number from the `name` argument, and uses it
as argument to an invocation of `end(int)`.

**Since:** 20

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If there is no capturing group in the pattern with the given name

## MatchResult.group()

```java
String group()
```

Returns the input subsequence matched by the previous match.

 For a matcher *m* with input sequence *s*,
the expressions *m.*`group()` and
*s.*`substring(`*m.*`start(),` *m.*`end())`
are equivalent.

 Note that some patterns, for example `a*`, match the empty
string.  This method will return the empty string when the pattern
successfully matches the empty string in the input.

**Returns:** The (possibly empty) subsequence matched by the previous match,
        in string form

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed

## MatchResult.group(int)

```java
String group(int group)
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
         failed to match part of the input

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IndexOutOfBoundsException`: If there is no capturing group in the pattern with the given index

## MatchResult.group(String)

```java
default String group(String name)
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

**Implementation requirements:** The default implementation of this method invokes `namedGroups()`
to obtain the group number from the `name` argument, and uses it
as argument to an invocation of `group(int)`.

**Since:** 20

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If there is no capturing group in the pattern with the given name

## MatchResult.groupCount()

```java
int groupCount()
```

Returns the number of capturing groups in this match result's pattern.

 Group zero denotes the entire pattern by convention. It is not
included in this count.

 Any non-negative integer smaller than or equal to the value
returned by this method is guaranteed to be a valid group index for
this matcher.

**Returns:** The number of capturing groups in this matcher's pattern

## MatchResult.namedGroups()

```java
default Map<String,Integer> namedGroups()
```

Returns an unmodifiable map from capturing group names to group numbers.
If there are no named groups, returns an empty map.

**Returns:** an unmodifiable map from capturing group names to group numbers

**Implementation requirements:** The default implementation of this method always throws
         `UnsupportedOperationException`

**API note:** This method must be overridden by an implementation that supports
named groups.

**Since:** 20

Throws:

- `UnsupportedOperationException`: if the implementation does not support named groups.

## MatchResult.hasMatch()

```java
default boolean hasMatch()
```

Returns whether `this` contains a valid match from
a previous match or find operation.

**Returns:** whether `this` contains a valid match

**Implementation requirements:** The default implementation of this method always throws
         `UnsupportedOperationException`

**Since:** 20

Throws:

- `UnsupportedOperationException`: if the implementation cannot report whether it has a match
