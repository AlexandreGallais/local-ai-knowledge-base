---
title: "Scanner class (java.util) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Scanner.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Scanner class (java.util) (part 2 of 4)

## Scanner.useDelimiter(String)

```java
public Scanner useDelimiter(String pattern)
```

Sets this scanner's delimiting pattern to a pattern constructed from
the specified `String`.

 An invocation of this method of the form
`useDelimiter(pattern)` behaves in exactly the same way as the
invocation `useDelimiter(Pattern.compile(pattern))`.

 Invoking the `reset` method will set the scanner's delimiter
to the default.

Parameters:

- `pattern`: A string specifying a delimiting pattern

**Returns:** this scanner

## Scanner.locale()

```java
public Locale locale()
```

Returns this scanner's locale.

A scanner's locale affects many elements of its default
primitive matching regular expressions; see
localized numbers above.

**Returns:** this scanner's locale

## Scanner.useLocale(Locale)

```java
public Scanner useLocale(Locale locale)
```

Sets this scanner's locale to the specified locale.

A scanner's locale affects many elements of its default
primitive matching regular expressions; see
localized numbers above.

Invoking the `reset` method will set the scanner's locale to
the initial locale.

Parameters:

- `locale`: A string specifying the locale to use

**Returns:** this scanner

## Scanner.radix()

```java
public int radix()
```

Returns this scanner's default radix.

A scanner's radix affects elements of its default
number matching regular expressions; see
localized numbers above.

**Returns:** the default radix of this scanner

## Scanner.useRadix(int)

```java
public Scanner useRadix(int radix)
```

Sets this scanner's default radix to the specified radix.

A scanner's radix affects elements of its default
number matching regular expressions; see
localized numbers above.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Invoking the `reset` method will set the scanner's radix to
`10`.

Parameters:

- `radix`: The radix to use when scanning numbers

**Returns:** this scanner

Throws:

- `IllegalArgumentException`: if radix is out of range

## Scanner.match()

```java
public MatchResult match()
```

Returns the match result of the last scanning operation performed
by this scanner. This method throws `IllegalStateException`
if no match has been performed, or if the last match was
not successful.

The various `next` methods of `Scanner`
make a match result available if they complete without throwing an
exception. For instance, after an invocation of the `nextInt`
method that returned an int, this method returns a
`MatchResult` for the search of the
*Integer* regular expression
defined above. Similarly the findInLine(),
findWithinHorizon(), and skip()
methods will make a match available if they succeed.

**Returns:** a match result for the last match operation

Throws:

- `IllegalStateException`: If no match result is available

## Scanner.toString()

```java
public String toString()
```

Returns the string representation of this `Scanner`. The
string representation of a `Scanner` contains information
that may be useful for debugging. The exact format is unspecified.

**Returns:** The string representation of this scanner

## Scanner.hasNext()

```java
public boolean hasNext()
```

Returns true if this scanner has another token in its input.
This method may block while waiting for input to scan.
The scanner does not advance past any input.

**Returns:** true if and only if this scanner has another token

**See also:** java.util.Iterator

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.next()

```java
public String next()
```

Finds and returns the next complete token from this scanner.
A complete token is preceded and followed by input that matches
the delimiter pattern. This method may block while waiting for input
to scan, even if a previous invocation of `hasNext` returned
`true`.

**Returns:** the next token

**See also:** java.util.Iterator

Throws:

- `NoSuchElementException`: if no more tokens are available
- `IllegalStateException`: if this scanner is closed

## Scanner.remove()

```java
public void remove()
```

The remove operation is not supported by this implementation of
`Iterator`.

**See also:** java.util.Iterator

Throws:

- `UnsupportedOperationException`: if this method is invoked.

## Scanner.hasNext(String)

```java
public boolean hasNext(String pattern)
```

Returns true if the next token <example-value> the pattern constructed from the
specified string. The scanner does not advance past any input.

 An invocation of this method of the form `hasNext(pattern)`
behaves in exactly the same way as the invocation
`hasNext(Pattern.compile(pattern))`.

Parameters:

- `pattern`: a string specifying the pattern to scan

**Returns:** true if and only if this scanner has another token <example-value>
        the specified pattern

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.next(String)

```java
public String next(String pattern)
```

Returns the next token if it matches the pattern constructed from the
specified string.  If the match is successful, the scanner advances
past the input that matched the pattern.

 An invocation of this method of the form `next(pattern)`
behaves in exactly the same way as the invocation
`next(Pattern.compile(pattern))`.

Parameters:

- `pattern`: a string specifying the pattern to scan

**Returns:** the next token

Throws:

- `NoSuchElementException`: if no such tokens are available
- `IllegalStateException`: if this scanner is closed

## Scanner.hasNext(Pattern)

```java
public boolean hasNext(Pattern pattern)
```

Returns true if the next complete token <example-value> the specified pattern.
A complete token is prefixed and postfixed by input that matches
the delimiter pattern. This method may block while waiting for input.
The scanner does not advance past any input.

Parameters:

- `pattern`: the pattern to scan for

**Returns:** true if and only if this scanner has another token <example-value>
        the specified pattern

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.next(Pattern)

```java
public String next(Pattern pattern)
```

Returns the next token if it matches the specified pattern. This
method may block while waiting for input to scan, even if a previous
invocation of `hasNext(Pattern)` returned `true`.
If the match is successful, the scanner advances past the input that
matched the pattern.

Parameters:

- `pattern`: the pattern to scan for

**Returns:** the next token

Throws:

- `NoSuchElementException`: if no more tokens are available
- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextLine()

```java
public boolean hasNextLine()
```

Returns true if there is another line in the input of this scanner.
This method may block while waiting for input. The scanner does not
advance past any input.

**Returns:** true if there is a line separator in the remaining input
or if the input has other remaining characters

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.nextLine()

```java
public String nextLine()
```

Advances this scanner past the current line and returns the input
that was skipped.

This method returns the rest of the current line, excluding any line
separator at the end. The position is set to the beginning of the next
line.

Since this method continues to search through the input looking
for a line separator, it may buffer all of the input searching for
the line to skip if no line separators are present.

**Returns:** the line that was skipped

Throws:

- `NoSuchElementException`: if no line was found
- `IllegalStateException`: if this scanner is closed

## Scanner.findInLine(String)

```java
public String findInLine(String pattern)
```

Attempts to find the next occurrence of a pattern constructed from the
specified string, ignoring delimiters.

An invocation of this method of the form `findInLine(pattern)`
behaves in exactly the same way as the invocation
`findInLine(Pattern.compile(pattern))`.

Parameters:

- `pattern`: a string specifying the pattern to search for

**Returns:** the text that matched the specified pattern

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.findInLine(Pattern)

```java
public String findInLine(Pattern pattern)
```

Attempts to find the next occurrence of the specified pattern ignoring
delimiters. If the pattern is found before the next line separator, the
scanner advances past the input that matched and returns the string that
matched the pattern.
If no such pattern is detected in the input up to the next line
separator, then `null` is returned and the scanner's
position is unchanged. This method may block waiting for input that
matches the pattern.

Since this method continues to search through the input looking
for the specified pattern, it may buffer all of the input searching for
the desired token if no line separators are present.

Parameters:

- `pattern`: the pattern to scan for

**Returns:** the text that matched the specified pattern

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.findWithinHorizon(String, int)

```java
public String findWithinHorizon(String pattern, int horizon)
```

Attempts to find the next occurrence of a pattern constructed from the
specified string, ignoring delimiters.

An invocation of this method of the form
`findWithinHorizon(pattern)` behaves in exactly the same way as
the invocation
`findWithinHorizon(Pattern.compile(pattern), horizon)`.

Parameters:

- `pattern`: a string specifying the pattern to search for
- `horizon`: the search horizon

**Returns:** the text that matched the specified pattern

Throws:

- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if horizon is negative

## Scanner.findWithinHorizon(Pattern, int)

```java
public String findWithinHorizon(Pattern pattern, int horizon)
```

Attempts to find the next occurrence of the specified pattern.

This method searches through the input up to the specified
search horizon, ignoring delimiters. If the pattern is found the
scanner advances past the input that matched and returns the string
that matched the pattern. If no such pattern is detected then the
null is returned and the scanner's position remains unchanged. This
method may block waiting for input that matches the pattern.

A scanner will never search more than `horizon` code
points beyond its current position. Note that a match may be clipped
by the horizon; that is, an arbitrary match result may have been
different if the horizon had been larger. The scanner treats the
horizon as a transparent, non-anchoring bound (see `Matcher.useTransparentBounds` and `Matcher.useAnchoringBounds`).

If horizon is `0`, then the horizon is ignored and
this method continues to search through the input looking for the
specified pattern without bound. In this case it may buffer all of
the input searching for the pattern.

If horizon is negative, then an IllegalArgumentException is
thrown.

Parameters:

- `pattern`: the pattern to scan for
- `horizon`: the search horizon

**Returns:** the text that matched the specified pattern

Throws:

- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if horizon is negative

## Scanner.skip(Pattern)

```java
public Scanner skip(Pattern pattern)
```

Skips input that matches the specified pattern, ignoring delimiters.
This method will skip input if an anchored match of the specified
pattern succeeds.

If a match to the specified pattern is not found at the
current position, then no input is skipped and a
`NoSuchElementException` is thrown.

Since this method seeks to match the specified pattern starting at
the scanner's current position, patterns that can match a lot of
input (".*", for example) may cause the scanner to buffer a large
amount of input.

Note that it is possible to skip something without risking a
`NoSuchElementException` by using a pattern that can
match nothing, e.g., `sc.skip("[ \t]*")`.

Parameters:

- `pattern`: the pattern to skip over

**Returns:** this scanner

Throws:

- `NoSuchElementException`: if the specified pattern is not found
- `IllegalStateException`: if this scanner is closed

## Scanner.skip(String)

```java
public Scanner skip(String pattern)
```

Skips input that matches a pattern constructed from the specified
string.

 An invocation of this method of the form `skip(pattern)`
behaves in exactly the same way as the invocation
`skip(Pattern.compile(pattern))`.

Parameters:

- `pattern`: a string specifying the pattern to skip over

**Returns:** this scanner

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextBoolean()

```java
public boolean hasNextBoolean()
```

Returns true if the next token in this scanner's input can be
interpreted as a boolean value using a case insensitive pattern
created from the string "true|false".  The scanner does not
advance past the input that matched.

**Returns:** true if and only if this scanner's next token is a valid
        boolean value

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.nextBoolean()

```java
public boolean nextBoolean()
```

Scans the next token of the input into a boolean value and returns
that value. This method will throw `InputMismatchException`
if the next token <example-value> be translated into a valid boolean value.
If the match is successful, the scanner advances past the input that
matched.

**Returns:** the boolean scanned from the input

Throws:

- `InputMismatchException`: if the next token is not a valid boolean
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextByte()

```java
public boolean hasNextByte()
```

Returns true if the next token in this scanner's input can be
interpreted as a byte value in the default radix using the
`nextByte` method. The scanner does not advance past any input.

**Returns:** true if and only if this scanner's next token is a valid
        byte value

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextByte(int)

```java
public boolean hasNextByte(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a byte value in the specified radix using the
`nextByte` method. The scanner does not advance past any input.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as a byte value

**Returns:** true if and only if this scanner's next token is a valid
        byte value

Throws:

- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range
