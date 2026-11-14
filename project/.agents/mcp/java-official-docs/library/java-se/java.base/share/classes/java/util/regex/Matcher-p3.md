---
title: "Matcher class (java.util.regex) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/regex/Matcher.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Matcher class (java.util.regex) (part 3 of 3)

## Matcher.replaceFirst(Function<MatchResult, String>)

```java
public String replaceFirst(Function<MatchResult, String> replacer)
```

Replaces the first subsequence of the input sequence that matches the
pattern with the result of applying the given replacer function to the
match result of this matcher corresponding to that subsequence.
Exceptions thrown by the replace function are relayed to the caller.

 This method first resets this matcher.  It then scans the input
sequence looking for a match of the pattern.  Characters that are not
part of the match are appended directly to the result string; the match
is replaced in the result by the applying the replacer function that
returns a replacement string.  The replacement string may contain
references to captured subsequences as in the appendReplacement method.

Note that backslashes (`\`) and dollar signs (`$`) in
the replacement string may cause the results to be different than if it
were being treated as a literal replacement string. Dollar signs may be
treated as references to captured subsequences as described above, and
backslashes are used to escape literal characters in the replacement
string.

 Given the regular expression `dog`, the input
`"zzzdogzzzdogzzz"`, and the function
`mr -> mr.group().toUpperCase()`, an invocation of this method on
a matcher for that expression would yield the string
`"zzzDOGzzzdogzzz"`.

 Invoking this method changes this matcher's state.  If the matcher
is to be used in further matching operations then it should first be
reset.

 The replacer function should not modify this matcher's state during
replacement.  This method will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if such modification is
detected.

 The state of the match result passed to the replacer function is
guaranteed to be constant only for the duration of the replacer function
call and only if the replacer function does not modify this matcher's
state.

Parameters:

- `replacer`: The function to be applied to the match result of this matcher that returns a replacement string.

**Implementation note:** This implementation applies the replacer function to this matcher, which
is an instance of `MatchResult`.

**Returns:** The string constructed by replacing the first matching
         subsequence with the result of applying the replacer function to
         the matched subsequence, substituting captured subsequences as
         needed.

**Since:** 9

Throws:

- `NullPointerException`: if the replacer function is null
- `ConcurrentModificationException`: if it is detected, on a best-effort basis, that the replacer function modified this matcher's state

## Matcher.region(int, int)

```java
public Matcher region(int start, int end)
```

Sets the limits of this matcher's region. The region is the part of the
input sequence that will be searched to find a match. Invoking this
method resets the matcher, and then sets the region to start at the
index specified by the `start` parameter and end at the
index specified by the `end` parameter.

Depending on the transparency and anchoring being used (see
useTransparentBounds and
useAnchoringBounds), certain
constructs such as anchors may behave differently at or around the
boundaries of the region.

Parameters:

- `start`: The index to start searching at (inclusive)
- `end`: The index to end searching at (exclusive)

**Returns:** this matcher

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: If start or end is less than zero, if start is greater than the length of the input sequence, if end is greater than the length of the input sequence, or if start is greater than end.

## Matcher.regionStart()

```java
public int regionStart()
```

Reports the start index of this matcher's region. The
searches this matcher conducts are limited to finding matches
within regionStart (inclusive) and
regionEnd (exclusive).

**Returns:** The starting point of this matcher's region

**Since:** 1.5

## Matcher.regionEnd()

```java
public int regionEnd()
```

Reports the end index (exclusive) of this matcher's region.
The searches this matcher conducts are limited to finding matches
within regionStart (inclusive) and
regionEnd (exclusive).

**Returns:** the ending point of this matcher's region

**Since:** 1.5

## Matcher.hasTransparentBounds()

```java
public boolean hasTransparentBounds()
```

Queries the transparency of region bounds for this matcher.

 This method returns `true` if this matcher uses
*transparent* bounds, `false` if it uses *opaque*
bounds.

 See useTransparentBounds for a
description of transparent and opaque bounds.

 By default, a matcher uses opaque region boundaries.

**Returns:** `true` iff this matcher is using transparent bounds,
        `false` otherwise.

**See also:** java.util.regex.Matcher#useTransparentBounds(boolean)

**Since:** 1.5

## Matcher.useTransparentBounds(boolean)

```java
public Matcher useTransparentBounds(boolean b)
```

Sets the transparency of region bounds for this matcher.

 Invoking this method with an argument of `true` will set this
matcher to use *transparent* bounds. If the boolean
argument is `false`, then *opaque* bounds will be used.

 Using transparent bounds, the boundaries of this
matcher's region are transparent to lookahead, lookbehind,
and boundary matching constructs. Those constructs can see beyond the
boundaries of the region to see if a match is appropriate.

 Using opaque bounds, the boundaries of this matcher's
region are opaque to lookahead, lookbehind, and boundary matching
constructs that may try to see beyond them. Those constructs cannot
look past the boundaries so they will fail to match anything outside
of the region.

 By default, a matcher uses opaque bounds.

Parameters:

- `b`: a boolean indicating whether to use opaque or transparent regions

**Returns:** this matcher

**See also:** java.util.regex.Matcher#hasTransparentBounds

**Since:** 1.5

## Matcher.hasAnchoringBounds()

```java
public boolean hasAnchoringBounds()
```

Queries the anchoring of region bounds for this matcher.

 This method returns `true` if this matcher uses
*anchoring* bounds, `false` otherwise.

 See useAnchoringBounds for a
description of anchoring bounds.

 By default, a matcher uses anchoring region boundaries.

**Returns:** `true` iff this matcher is using anchoring bounds,
        `false` otherwise.

**See also:** java.util.regex.Matcher#useAnchoringBounds(boolean)

**Since:** 1.5

## Matcher.useAnchoringBounds(boolean)

```java
public Matcher useAnchoringBounds(boolean b)
```

Sets the anchoring of region bounds for this matcher.

 Invoking this method with an argument of `true` will set this
matcher to use *anchoring* bounds. If the boolean
argument is `false`, then *non-anchoring* bounds will be
used.

 Using anchoring bounds, the boundaries of this
matcher's region match anchors such as ^ and $.

 Without anchoring bounds, the boundaries of this
matcher's region will not match anchors such as ^ and $.

 By default, a matcher uses anchoring region boundaries.

Parameters:

- `b`: a boolean indicating whether or not to use anchoring bounds.

**Returns:** this matcher

**See also:** java.util.regex.Matcher#hasAnchoringBounds

**Since:** 1.5

## Matcher.toString()

```java
public String toString()
```

Returns the string representation of this matcher. The
string representation of a `Matcher` contains information
that may be useful for debugging. The exact format is unspecified.

**Returns:** The string representation of this matcher

**Since:** 1.5

## Matcher.hitEnd()

```java
public boolean hitEnd()
```

Returns true if the end of input was hit by the search engine in
the last match operation performed by this matcher.

When this method returns true, then it is possible that more input
would have changed the result of the last search.

**Returns:** true iff the end of input was hit in the last match; false
         otherwise

**Since:** 1.5

## Matcher.requireEnd()

```java
public boolean requireEnd()
```

Returns true if more input could change a positive match into a
negative one.

If this method returns true, and a match was found, then more
input could cause the match to be lost. If this method returns false
and a match was found, then more input might change the match but the
match won't be lost. If a match was not found, then requireEnd has no
meaning.

**Returns:** true iff more input could change a positive match into a
         negative one.

**Since:** 1.5

## Matcher.namedGroups()

```java
public Map<String, Integer> namedGroups()
```

(inherited documentation)

**Returns:** (inherited documentation)

**Since:** 20

## Matcher.hasMatch()

```java
public boolean hasMatch()
```

(inherited documentation)

**Returns:** (inherited documentation)

**Since:** 20
