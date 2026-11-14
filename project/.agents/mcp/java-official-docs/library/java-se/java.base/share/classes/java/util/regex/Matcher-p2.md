---
title: "Matcher class (java.util.regex) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/regex/Matcher.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Matcher class (java.util.regex) (part 2 of 3)

## Matcher.appendReplacement(StringBuffer, String)

```java
public Matcher appendReplacement(StringBuffer sb, String replacement)
```

Implements a non-terminal append-and-replace step.

 This method performs the following actions:

-

 It reads characters from the input sequence, starting at the
  append position, and appends them to the given string buffer.  It
  stops after reading the last character preceding the previous match,
  that is, the character at index `start()` `-` `1`.

-

 It appends the given replacement string to the string buffer.

-

 It sets the append position of this matcher to the index of
  the last character matched, plus one, that is, to `end()`.

 The replacement string may contain references to subsequences
captured during the previous match: Each occurrence of
`${`*name*`}` or `$`*g*
will be replaced by the result of evaluating the corresponding
group(name) or group(g)
respectively. For `$`*g*,
the first number after the `$` is always treated as part of
the group reference. Subsequent numbers are incorporated into g if
they would form a legal group reference. Only the numerals '0'
through '9' are considered as potential components of the group
reference. If the second group matched the string `"foo"`, for
example, then passing the replacement string `"$2bar"` would
cause `"foobar"` to be appended to the string buffer. A dollar
sign (`$`) may be included as a literal in the replacement
string by preceding it with a backslash (`\$`).

 Note that backslashes (`\`) and dollar signs (`$`) in
the replacement string may cause the results to be different than if it
were being treated as a literal replacement string. Dollar signs may be
treated as references to captured subsequences as described above, and
backslashes are used to escape literal characters in the replacement
string.

 This method is intended to be used in a loop together with the
appendTail and find
methods.  The following code, for example, writes `one dog two dogs in the yard` to the standard-output stream:

```java
Pattern p = Pattern.compile("cat");
Matcher m = p.matcher("one cat two cats in the yard");
StringBuffer sb = new StringBuffer();
while (m.find()) {
    m.appendReplacement(sb, "dog");
}
m.appendTail(sb);
System.out.println(sb.toString());
```

Parameters:

- `sb`: The target string buffer
- `replacement`: The replacement string

**Returns:** This matcher

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If the replacement string refers to a named-capturing group that does not exist in the pattern
- `IndexOutOfBoundsException`: If the replacement string refers to a capturing group that does not exist in the pattern

## Matcher.appendReplacement(StringBuilder, String)

```java
public Matcher appendReplacement(StringBuilder sb, String replacement)
```

Implements a non-terminal append-and-replace step.

 This method performs the following actions:

-

 It reads characters from the input sequence, starting at the
  append position, and appends them to the given string builder.  It
  stops after reading the last character preceding the previous match,
  that is, the character at index `start()` `-` `1`.

-

 It appends the given replacement string to the string builder.

-

 It sets the append position of this matcher to the index of
  the last character matched, plus one, that is, to `end()`.

 The replacement string may contain references to subsequences
captured during the previous match: Each occurrence of
`$`*g* will be replaced by the result of
evaluating group`(`*g*`)`.
The first number after the `$` is always treated as part of
the group reference. Subsequent numbers are incorporated into g if
they would form a legal group reference. Only the numerals '0'
through '9' are considered as potential components of the group
reference. If the second group matched the string `"foo"`, for
example, then passing the replacement string `"$2bar"` would
cause `"foobar"` to be appended to the string builder. A dollar
sign (`$`) may be included as a literal in the replacement
string by preceding it with a backslash (`\$`).

 Note that backslashes (`\`) and dollar signs (`$`) in
the replacement string may cause the results to be different than if it
were being treated as a literal replacement string. Dollar signs may be
treated as references to captured subsequences as described above, and
backslashes are used to escape literal characters in the replacement
string.

 This method is intended to be used in a loop together with the
appendTail and
find methods. The following code, for example, writes
`one dog two dogs in the yard` to the standard-output stream:

```java
Pattern p = Pattern.compile("cat");
Matcher m = p.matcher("one cat two cats in the yard");
StringBuilder sb = new StringBuilder();
while (m.find()) {
    m.appendReplacement(sb, "dog");
}
m.appendTail(sb);
System.out.println(sb.toString());
```

Parameters:

- `sb`: The target string builder
- `replacement`: The replacement string

**Returns:** This matcher

**Since:** 9

Throws:

- `IllegalStateException`: If no match has yet been attempted, or if the previous match operation failed
- `IllegalArgumentException`: If the replacement string refers to a named-capturing group that does not exist in the pattern
- `IndexOutOfBoundsException`: If the replacement string refers to a capturing group that does not exist in the pattern

## Matcher.appendTail(StringBuffer)

```java
public StringBuffer appendTail(StringBuffer sb)
```

Implements a terminal append-and-replace step.

 This method reads characters from the input sequence, starting at
the append position, and appends them to the given string buffer.  It is
intended to be invoked after one or more invocations of the String) appendReplacement method in
order to copy the remainder of the input sequence.

Parameters:

- `sb`: The target string buffer

**Returns:** The target string buffer

## Matcher.appendTail(StringBuilder)

```java
public StringBuilder appendTail(StringBuilder sb)
```

Implements a terminal append-and-replace step.

 This method reads characters from the input sequence, starting at
the append position, and appends them to the given string builder.  It is
intended to be invoked after one or more invocations of the String) appendReplacement method in order to copy the remainder of the input
sequence.

Parameters:

- `sb`: The target string builder

**Returns:** The target string builder

**Since:** 9

## Matcher.replaceAll(String)

```java
public String replaceAll(String replacement)
```

Replaces every subsequence of the input sequence that matches the
pattern with the given replacement string.

 This method first resets this matcher.  It then scans the input
sequence looking for matches of the pattern.  Characters that are not
part of any match are appended directly to the result string; each match
is replaced in the result by the replacement string.  The replacement
string may contain references to captured subsequences as in the appendReplacement method.

 Note that backslashes (`\`) and dollar signs (`$`) in
the replacement string may cause the results to be different than if it
were being treated as a literal replacement string. Dollar signs may be
treated as references to captured subsequences as described above, and
backslashes are used to escape literal characters in the replacement
string.

 Given the regular expression `a*b`, the input
`"aabfooaabfooabfoob"`, and the replacement string
`"-"`, an invocation of this method on a matcher for that
expression would yield the string `"-foo-foo-foo-"`.

 Invoking this method changes this matcher's state.  If the matcher
is to be used in further matching operations then it should first be
reset.

Parameters:

- `replacement`: The replacement string

**Returns:** The string constructed by replacing each matching subsequence
         by the replacement string, substituting captured subsequences
         as needed

## Matcher.replaceAll(Function<MatchResult, String>)

```java
public String replaceAll(Function<MatchResult, String> replacer)
```

Replaces every subsequence of the input sequence that matches the
pattern with the result of applying the given replacer function to the
match result of this matcher corresponding to that subsequence.
Exceptions thrown by the function are relayed to the caller.

 This method first resets this matcher.  It then scans the input
sequence looking for matches of the pattern.  Characters that are not
part of any match are appended directly to the result string; each match
is replaced in the result by the applying the replacer function that
returns a replacement string.  Each replacement string may contain
references to captured subsequences as in the appendReplacement method.

 Note that backslashes (`\`) and dollar signs (`$`) in
a replacement string may cause the results to be different than if it
were being treated as a literal replacement string. Dollar signs may be
treated as references to captured subsequences as described above, and
backslashes are used to escape literal characters in the replacement
string.

 Given the regular expression `dog`, the input
`"zzzdogzzzdogzzz"`, and the function
`mr -> mr.group().toUpperCase()`, an invocation of this method on
a matcher for that expression would yield the string
`"zzzDOGzzzDOGzzz"`.

 Invoking this method changes this matcher's state.  If the matcher
is to be used in further matching operations then it should first be
reset.

 The replacer function should not modify this matcher's state during
replacement.  This method will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if such modification is
detected.

 The state of each match result passed to the replacer function is
guaranteed to be constant only for the duration of the replacer function
call and only if the replacer function does not modify this matcher's
state.

Parameters:

- `replacer`: The function to be applied to the match result of this matcher that returns a replacement string.

**Implementation note:** This implementation applies the replacer function to this matcher, which
is an instance of `MatchResult`.

**Returns:** The string constructed by replacing each matching subsequence
         with the result of applying the replacer function to that
         matched subsequence, substituting captured subsequences as
         needed.

**Since:** 9

Throws:

- `NullPointerException`: if the replacer function is null
- `ConcurrentModificationException`: if it is detected, on a best-effort basis, that the replacer function modified this matcher's state

## Matcher.results()

```java
public Stream<MatchResult> results()
```

Returns a stream of match results for each subsequence of the input
sequence that matches the pattern.  The match results occur in the
same order as the matching subsequences in the input sequence.

 Each match result is produced as if by `toMatchResult()`.

 This method does not reset this matcher.  Matching starts on
initiation of the terminal stream operation either at the beginning of
this matcher's region, or, if the matcher has not since been reset, at
the first character not matched by a previous match.

 If the matcher is to be used for further matching operations after
the terminal stream operation completes then it should be first reset.

 This matcher's state should not be modified during execution of the
returned stream's pipeline.  The returned stream's source
`Spliterator` is *fail-fast* and will, on a best-effort
basis, throw a `java.util.ConcurrentModificationException` if such
modification is detected.

**Returns:** a sequential stream of match results.

**Since:** 9

## Matcher.replaceFirst(String)

```java
public String replaceFirst(String replacement)
```

Replaces the first subsequence of the input sequence that matches the
pattern with the given replacement string.

 This method first resets this matcher.  It then scans the input
sequence looking for a match of the pattern.  Characters that are not
part of the match are appended directly to the result string; the match
is replaced in the result by the replacement string.  The replacement
string may contain references to captured subsequences as in the appendReplacement method.

Note that backslashes (`\`) and dollar signs (`$`) in
the replacement string may cause the results to be different than if it
were being treated as a literal replacement string. Dollar signs may be
treated as references to captured subsequences as described above, and
backslashes are used to escape literal characters in the replacement
string.

 Given the regular expression `dog`, the input
`"zzzdogzzzdogzzz"`, and the replacement string
`"cat"`, an invocation of this method on a matcher for that
expression would yield the string `"zzzcatzzzdogzzz"`.

 Invoking this method changes this matcher's state.  If the matcher
is to be used in further matching operations then it should first be
reset.

Parameters:

- `replacement`: The replacement string

**Returns:** The string constructed by replacing the first matching
         subsequence by the replacement string, substituting captured
         subsequences as needed
