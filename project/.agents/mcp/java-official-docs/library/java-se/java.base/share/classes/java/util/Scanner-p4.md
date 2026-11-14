---
title: "Scanner class (java.util) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Scanner.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Scanner class (java.util) (part 4 of 4)

## Scanner.hasNextBigInteger(int)

```java
public boolean hasNextBigInteger(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a `BigInteger` in the specified radix using
the `nextBigInteger` method. The scanner does not advance past
any input.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as an integer

**Returns:** true if and only if this scanner's next token is a valid
        `BigInteger`

Throws:

- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.nextBigInteger()

```java
public BigInteger nextBigInteger()
```

Scans the next token of the input as a BigInteger.

 An invocation of this method of the form
`nextBigInteger()` behaves in exactly the same way as the
invocation `nextBigInteger(radix)`, where `radix`
is the default radix of this scanner.

**Returns:** the `BigInteger` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if the input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.nextBigInteger(int)

```java
public BigInteger nextBigInteger(int radix)
```

Scans the next token of the input as a BigInteger.

 If the next token <example-value> the *Integer* regular expression defined
above then the token is converted into a `BigInteger` value as if
by removing all group separators, mapping non-ASCII digits into ASCII
digits via the Character.digit, and passing the
resulting string to the BigInteger(String, int) constructor with the specified radix.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token

**Returns:** the `BigInteger` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if the input is exhausted
- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.hasNextBigDecimal()

```java
public boolean hasNextBigDecimal()
```

Returns true if the next token in this scanner's input can be
interpreted as a `BigDecimal` using the
`nextBigDecimal` method. The scanner does not advance past any
input.

**Returns:** true if and only if this scanner's next token is a valid
        `BigDecimal`

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.nextBigDecimal()

```java
public BigDecimal nextBigDecimal()
```

Scans the next token of the input as a BigDecimal.

 If the next token <example-value> the *Decimal* regular expression defined
above then the token is converted into a `BigDecimal` value as if
by removing all group separators, mapping non-ASCII digits into ASCII
digits via the Character.digit, and passing the
resulting string to the BigDecimal(String)
constructor.

**Returns:** the `BigDecimal` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Decimal* regular expression, or is out of range
- `NoSuchElementException`: if the input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.reset()

```java
public Scanner reset()
```

Resets this scanner.

 Resetting a scanner discards all of its explicit state
information which may have been changed by invocations of
useDelimiter(),
useLocale(), or
useRadix().

 An invocation of this method of the form
`scanner.reset()` behaves in exactly the same way as the
invocation

```java
  scanner.useDelimiter("\\p{javaWhitespace}+")
         .useLocale(Locale.getDefault(Locale.Category.FORMAT))
         .useRadix(10);
```

**Returns:** this scanner

**Since:** 1.6

## Scanner.tokens()

```java
public Stream<String> tokens()
```

Returns a stream of delimiter-separated tokens from this scanner. The
stream contains the same tokens that would be returned, starting from
this scanner's current state, by calling the `next` method
repeatedly until the `hasNext` method returns false.

The resulting stream is sequential and ordered. All stream elements are
non-null.

Scanning starts upon initiation of the terminal stream operation, using the
current state of this scanner. Subsequent calls to any methods on this scanner
other than `close` and `ioException` may return undefined results
or may cause undefined effects on the returned stream. The returned stream's source
`Spliterator` is *fail-fast* and will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if any such calls are detected
during stream pipeline execution.

After stream pipeline execution completes, this scanner is left in an indeterminate
state and cannot be reused.

If this scanner contains a resource that must be released, this scanner
should be closed, either by calling its `close` method, or by
closing the returned stream. Closing the stream will close the underlying scanner.
`IllegalStateException` is thrown if the scanner has been closed when this
method is called, or if this scanner is closed during stream pipeline execution.

This method might block waiting for more input.

**API note:** For example, the following code will create a list of
comma-delimited tokens from a string:

```java
List<String> result = new Scanner("abc,def,,ghi")
    .useDelimiter(",")
    .tokens()
    .collect(Collectors.toList());
```

The resulting list would contain `"abc"`, `"def"`,
the empty string, and `"ghi"`.

**Returns:** a sequential stream of token <example-value>

**Since:** 9

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.findAll(Pattern)

```java
public Stream<MatchResult> findAll(Pattern pattern)
```

Returns a stream of match results from this scanner. The stream
contains the same results in the same order that would be returned by
calling `findWithinHorizon(pattern, 0)` and then `match`
successively as long as findWithinHorizon()
finds matches.

The resulting stream is sequential and ordered. All stream elements are
non-null.

Scanning starts upon initiation of the terminal stream operation, using the
current state of this scanner. Subsequent calls to any methods on this scanner
other than `close` and `ioException` may return undefined results
or may cause undefined effects on the returned stream. The returned stream's source
`Spliterator` is *fail-fast* and will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if any such calls are detected
during stream pipeline execution.

After stream pipeline execution completes, this scanner is left in an indeterminate
state and cannot be reused.

If this scanner contains a resource that must be released, this scanner
should be closed, either by calling its `close` method, or by
closing the returned stream. Closing the stream will close the underlying scanner.
`IllegalStateException` is thrown if the scanner has been closed when this
method is called, or if this scanner is closed during stream pipeline execution.

As with the findWithinHorizon() methods, this method
might block waiting for additional input, and it might buffer an unbounded amount of
input searching for a match.

Parameters:

- `pattern`: the pattern to be matched

**API note:** For example, the following code will read a file and return a list
of all sequences of characters consisting of seven or more Latin capital
letters:

```java
try (Scanner sc = new Scanner(Path.of("input.txt"))) {
    Pattern pat = Pattern.compile("[A-Z]{7,}");
    List<String> capWords = sc.findAll(pat)
                              .map(MatchResult::group)
                              .collect(Collectors.toList());
}
```

**Returns:** a sequential stream of match results

**Since:** 9

Throws:

- `NullPointerException`: if pattern is null
- `IllegalStateException`: if this scanner is closed

## Scanner.findAll(String)

```java
public Stream<MatchResult> findAll(String patString)
```

Returns a stream of match results that match the provided pattern string.
The effect is equivalent to the following code:

```java
    scanner.findAll(Pattern.compile(patString))
```

Parameters:

- `patString`: the pattern string

**Returns:** a sequential stream of match results

**Since:** 9

**See also:** java.util.regex.Pattern

Throws:

- `NullPointerException`: if patString is null
- `IllegalStateException`: if this scanner is closed
- `PatternSyntaxException`: if the regular expression's syntax is invalid
