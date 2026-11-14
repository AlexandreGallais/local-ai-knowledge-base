---
title: "Scanner class (java.util) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Scanner.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Scanner class (java.util) (part 3 of 4)

## Scanner.nextByte()

```java
public byte nextByte()
```

Scans the next token of the input as a `byte`.

 An invocation of this method of the form
`nextByte()` behaves in exactly the same way as the
invocation `nextByte(radix)`, where `radix`
is the default radix of this scanner.

**Returns:** the `byte` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.nextByte(int)

```java
public byte nextByte(int radix)
```

Scans the next token of the input as a `byte`.
This method will throw `InputMismatchException`
if the next token <example-value> be translated into a valid byte value as
described below. If the translation is successful, the scanner advances
past the input that matched.

 If the next token <example-value> the *Integer* regular expression defined
above then the token is converted into a `byte` value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via Character.digit, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
int) Byte.parseByte with the
specified radix.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as a byte value

**Returns:** the `byte` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.hasNextShort()

```java
public boolean hasNextShort()
```

Returns true if the next token in this scanner's input can be
interpreted as a short value in the default radix using the
`nextShort` method. The scanner does not advance past any input.

**Returns:** true if and only if this scanner's next token is a valid
        short value in the default radix

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextShort(int)

```java
public boolean hasNextShort(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a short value in the specified radix using the
`nextShort` method. The scanner does not advance past any input.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as a short value

**Returns:** true if and only if this scanner's next token is a valid
        short value in the specified radix

Throws:

- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.nextShort()

```java
public short nextShort()
```

Scans the next token of the input as a `short`.

 An invocation of this method of the form
`nextShort()` behaves in exactly the same way as the
invocation nextShort(radix), where `radix`
is the default radix of this scanner.

**Returns:** the `short` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.nextShort(int)

```java
public short nextShort(int radix)
```

Scans the next token of the input as a `short`.
This method will throw `InputMismatchException`
if the next token <example-value> be translated into a valid short value as
described below. If the translation is successful, the scanner advances
past the input that matched.

 If the next token <example-value> the *Integer* regular expression defined
above then the token is converted into a `short` value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via Character.digit, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
int) Short.parseShort with the
specified radix.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as a short value

**Returns:** the `short` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.hasNextInt()

```java
public boolean hasNextInt()
```

Returns true if the next token in this scanner's input can be
interpreted as an int value in the default radix using the
`nextInt` method. The scanner does not advance past any input.

**Returns:** true if and only if this scanner's next token is a valid
        int value

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextInt(int)

```java
public boolean hasNextInt(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as an int value in the specified radix using the
`nextInt` method. The scanner does not advance past any input.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as an int value

**Returns:** true if and only if this scanner's next token is a valid
        int value

Throws:

- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.nextInt()

```java
public int nextInt()
```

Scans the next token of the input as an `int`.

 An invocation of this method of the form
`nextInt()` behaves in exactly the same way as the
invocation `nextInt(radix)`, where `radix`
is the default radix of this scanner.

**Returns:** the `int` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.nextInt(int)

```java
public int nextInt(int radix)
```

Scans the next token of the input as an `int`.
This method will throw `InputMismatchException`
if the next token <example-value> be translated into a valid int value as
described below. If the translation is successful, the scanner advances
past the input that matched.

 If the next token <example-value> the *Integer* regular expression defined
above then the token is converted into an `int` value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via Character.digit, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
int) Integer.parseInt with the
specified radix.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as an int value

**Returns:** the `int` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.hasNextLong()

```java
public boolean hasNextLong()
```

Returns true if the next token in this scanner's input can be
interpreted as a long value in the default radix using the
`nextLong` method. The scanner does not advance past any input.

**Returns:** true if and only if this scanner's next token is a valid
        long value

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextLong(int)

```java
public boolean hasNextLong(int radix)
```

Returns true if the next token in this scanner's input can be
interpreted as a long value in the specified radix using the
`nextLong` method. The scanner does not advance past any input.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as a long value

**Returns:** true if and only if this scanner's next token is a valid
        long value

Throws:

- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.nextLong()

```java
public long nextLong()
```

Scans the next token of the input as a `long`.

 An invocation of this method of the form
`nextLong()` behaves in exactly the same way as the
invocation `nextLong(radix)`, where `radix`
is the default radix of this scanner.

**Returns:** the `long` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.nextLong(int)

```java
public long nextLong(int radix)
```

Scans the next token of the input as a `long`.
This method will throw `InputMismatchException`
if the next token <example-value> be translated into a valid long value as
described below. If the translation is successful, the scanner advances
past the input that matched.

 If the next token <example-value> the *Integer* regular expression defined
above then the token is converted into a `long` value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via Character.digit, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
int) Long.parseLong with the
specified radix.

If the radix is less than Character.MIN_RADIX
or greater than Character.MAX_RADIX, then an
`IllegalArgumentException` is thrown.

Parameters:

- `radix`: the radix used to interpret the token as an int value

**Returns:** the `long` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Integer* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed
- `IllegalArgumentException`: if the radix is out of range

## Scanner.hasNextFloat()

```java
public boolean hasNextFloat()
```

Returns true if the next token in this scanner's input can be
interpreted as a float value using the `nextFloat`
method. The scanner does not advance past any input.

**Returns:** true if and only if this scanner's next token is a valid
        float value

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.nextFloat()

```java
public float nextFloat()
```

Scans the next token of the input as a `float`.
This method will throw `InputMismatchException`
if the next token <example-value> be translated into a valid float value as
described below. If the translation is successful, the scanner advances
past the input that matched.

 If the next token <example-value> the *Float* regular expression defined above
then the token is converted into a `float` value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via Character.digit, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
Float.parseFloat. If the token <example-value>
the localized NaN or infinity strings, then either "Nan" or "Infinity"
is passed to Float.parseFloat as
appropriate.

**Returns:** the `float` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Float* regular expression, or is out of range
- `NoSuchElementException`: if input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextDouble()

```java
public boolean hasNextDouble()
```

Returns true if the next token in this scanner's input can be
interpreted as a double value using the `nextDouble`
method. The scanner does not advance past any input.

**Returns:** true if and only if this scanner's next token is a valid
        double value

Throws:

- `IllegalStateException`: if this scanner is closed

## Scanner.nextDouble()

```java
public double nextDouble()
```

Scans the next token of the input as a `double`.
This method will throw `InputMismatchException`
if the next token <example-value> be translated into a valid double value.
If the translation is successful, the scanner advances past the input
that matched.

 If the next token <example-value> the *Float* regular expression defined above
then the token is converted into a `double` value as if by
removing all locale specific prefixes, group separators, and locale
specific suffixes, then mapping non-ASCII digits into ASCII
digits via Character.digit, prepending a
negative sign (-) if the locale specific negative prefixes and suffixes
were present, and passing the resulting string to
Double.parseDouble. If the token <example-value>
the localized NaN or infinity strings, then either "Nan" or "Infinity"
is passed to Double.parseDouble as
appropriate.

**Returns:** the `double` scanned from the input

Throws:

- `InputMismatchException`: if the next token does not match the *Float* regular expression, or is out of range
- `NoSuchElementException`: if the input is exhausted
- `IllegalStateException`: if this scanner is closed

## Scanner.hasNextBigInteger()

```java
public boolean hasNextBigInteger()
```

Returns true if the next token in this scanner's input can be
interpreted as a `BigInteger` in the default radix using the
`nextBigInteger` method. The scanner does not advance past any
input.

**Returns:** true if and only if this scanner's next token is a valid
        `BigInteger`

Throws:

- `IllegalStateException`: if this scanner is closed
