---
title: "Charset class (java.nio.charset) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/charset/Charset.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Charset class (java.nio.charset) (part 2 of 2)

## Charset.contains(Charset)

```java
public abstract boolean contains(Charset cs)
```

Tells whether or not this charset contains the given charset.

 A charset *C* is said to *contain* a charset *D* if,
and only if, every character representable in *D* is also
representable in *C*.  If this relationship holds then it is
guaranteed that every string that can be encoded in *D* can also be
encoded in *C* without performing any replacements.

 That *C* contains *D* does not imply that each character
representable in *C* by a particular byte sequence is represented
in *D* by the same byte sequence, although sometimes this is the
case.

 Every charset contains itself.

 This method computes an approximation of the containment relation:
If it returns `true` then the given charset is known to be
contained by this charset; if it returns `false`, however, then
it is not necessarily the case that the given charset is not contained
in this charset.

Parameters:

- `cs`: The given charset

**Returns:** `true` if the given charset is contained in this charset

## Charset.newDecoder()

```java
public abstract CharsetDecoder newDecoder()
```

Constructs a new decoder for this charset.

**Returns:** A new decoder for this charset

## Charset.newEncoder()

```java
public abstract CharsetEncoder newEncoder()
```

Constructs a new encoder for this charset.

**Returns:** A new encoder for this charset

Throws:

- `UnsupportedOperationException`: If this charset does not support encoding

## Charset.canEncode()

```java
public boolean canEncode()
```

Tells whether or not this charset supports encoding.

 Nearly all charsets support encoding.  The primary exceptions are
special-purpose *auto-detect* charsets whose decoders can determine
which of several possible encoding schemes is in use by examining the
input byte sequence.  Such charsets do not support encoding because
there is no way to determine which encoding should be used on output.
Implementations of such charsets should override this method to return
`false`.

**Returns:** `true` if, and only if, this charset supports encoding

## Charset.decode(ByteBuffer)

```java
public final CharBuffer decode(ByteBuffer bb)
```

Convenience method that decodes bytes in this charset into Unicode
characters.

 An invocation of this method upon a charset `cs` returns the
same result as the expression

except that it is potentially more efficient because it can cache
decoders between successive invocations.

 This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement byte array.  In order
to detect such sequences, use the `CharsetDecoder.decode(java.nio.ByteBuffer)` method directly.

Parameters:

- `bb`: The byte buffer to be decoded

**Returns:** A char buffer containing the decoded characters

## Charset.encode(CharBuffer)

```java
public final ByteBuffer encode(CharBuffer cb)
```

Convenience method that encodes Unicode characters into bytes in this
charset.

 An invocation of this method upon a charset `cs` returns the
same result as the expression

except that it is potentially more efficient because it can cache
encoders between successive invocations.

 This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement string.  In order to
detect such sequences, use the `CharsetEncoder.encode(java.nio.CharBuffer)` method directly.

Parameters:

- `cb`: The char buffer to be encoded

**Returns:** A byte buffer containing the encoded characters

## Charset.encode(String)

```java
public final ByteBuffer encode(String str)
```

Convenience method that encodes a string into bytes in this charset.

 An invocation of this method upon a charset `cs` returns the
same result as the expression

Parameters:

- `str`: The string to be encoded

**Returns:** A byte buffer containing the encoded characters

## Charset.compareTo(Charset)

```java
public final int compareTo(Charset that)
```

Compares this charset to another.

 Charsets are ordered by their canonical names, without regard to
case.

Parameters:

- `that`: The charset to which this charset is to be compared

**Returns:** A negative integer, zero, or a positive integer as this charset
        is less than, equal to, or greater than the specified charset

## Charset.hashCode()

```java
public final int hashCode()
```

## Charset.equals(Object)

```java
public final boolean equals(Object ob)
```

Tells whether or not this object is equal to another.

 Two charsets are equal if, and only if, they have the same canonical
names.  A charset is never equal to any other type of object.

**Returns:** `true` if, and only if, this charset is equal to the
         given object

## Charset.toString()

```java
public final String toString()
```
