---
title: "CoderResult class (java.nio.charset)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/charset/CoderResult.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CoderResult class (java.nio.charset)

```java
public final class CoderResult
```

A description of the result state of a coder.

 A charset coder, that is, either a decoder or an encoder, consumes bytes
(or characters) from an input buffer, translates them, and writes the
resulting characters (or bytes) to an output buffer.  A coding process
terminates for one of four categories of reasons, which are described by
instances of this class:

-

 *Underflow* is reported when there is no more input to be
  processed, or there is insufficient input and additional input is
  required.  This condition is represented by the unique result object
  `UNDERFLOW`, whose isUnderflow method
  returns `true`.

-

 *Overflow* is reported when there is insufficient room
  remaining in the output buffer.  This condition is represented by the
  unique result object `OVERFLOW`, whose isOverflow method returns `true`.

-

 A *malformed-input error* is reported when a sequence of
  input units is not well-formed.  Such errors are described by instances of
  this class whose isMalformed method returns
  `true` and whose length method returns the length
  of the malformed sequence.  There is one unique instance of this class for
  all malformed-input errors of a given length.

-

 An *unmappable-character error* is reported when a sequence
  of input units denotes a character that cannot be represented in the
  output charset.  Such errors are described by instances of this class
  whose isUnmappable method returns `true` and
  whose length method returns the length of the input
  sequence denoting the unmappable character.  There is one unique instance
  of this class for all unmappable-character errors of a given length.

 For convenience, the isError method returns `true`
for result objects that describe malformed-input and unmappable-character
errors but `false` for those that describe underflow or overflow
conditions.

**Since:** 1.4

## CoderResult.toString()

```java
public String toString()
```

Returns a string describing this coder result.

**Returns:** A descriptive string

## CoderResult.isUnderflow()

```java
public boolean isUnderflow()
```

Tells whether or not this object describes an underflow condition.

**Returns:** `true` if, and only if, this object denotes underflow

## CoderResult.isOverflow()

```java
public boolean isOverflow()
```

Tells whether or not this object describes an overflow condition.

**Returns:** `true` if, and only if, this object denotes overflow

## CoderResult.isError()

```java
public boolean isError()
```

Tells whether or not this object describes an error condition.

**Returns:** `true` if, and only if, this object denotes either a
         malformed-input error or an unmappable-character error

## CoderResult.isMalformed()

```java
public boolean isMalformed()
```

Tells whether or not this object describes a malformed-input error.

**Returns:** `true` if, and only if, this object denotes a
         malformed-input error

## CoderResult.isUnmappable()

```java
public boolean isUnmappable()
```

Tells whether or not this object describes an unmappable-character
error.

**Returns:** `true` if, and only if, this object denotes an
         unmappable-character error

## CoderResult.length()

```java
public int length()
```

Returns the length of the erroneous input described by this
object  *(optional operation)*.

**Returns:** The length of the erroneous input, a positive integer

Throws:

- `UnsupportedOperationException`: If this object does not describe an error condition, that is, if the isError does not return `true`

## CoderResult.UNDERFLOW

```java
public static final CoderResult UNDERFLOW
```

Result object indicating underflow, meaning that either the input buffer
has been completely consumed or, if the input buffer is not yet empty,
that additional input is required.

## CoderResult.OVERFLOW

```java
public static final CoderResult OVERFLOW
```

Result object indicating overflow, meaning that there is insufficient
room in the output buffer.

## CoderResult.malformedForLength(int)

```java
public static CoderResult malformedForLength(int length)
```

Static factory method that returns the unique object describing a
malformed-input error of the given length.

Parameters:

- `length`: The given length

**Returns:** The requested coder-result object

## CoderResult.unmappableForLength(int)

```java
public static CoderResult unmappableForLength(int length)
```

Static factory method that returns the unique result object describing
an unmappable-character error of the given length.

Parameters:

- `length`: The given length

**Returns:** The requested coder-result object

## CoderResult.throwException()

```java
public void throwException() throws CharacterCodingException
```

Throws an exception appropriate to the result described by this object.

Throws:

- `BufferUnderflowException`: If this object is `UNDERFLOW`
- `BufferOverflowException`: If this object is `OVERFLOW`
- `MalformedInputException`: If this object represents a malformed-input error; the exception's length value will be that of this object
- `UnmappableCharacterException`: If this object represents an unmappable-character error; the exception's length value will be that of this object
- `CharacterCodingException`: `MalformedInputException` if this object represents a malformed-input error; `UnmappableCharacterException` if this object represents an unmappable-character error
