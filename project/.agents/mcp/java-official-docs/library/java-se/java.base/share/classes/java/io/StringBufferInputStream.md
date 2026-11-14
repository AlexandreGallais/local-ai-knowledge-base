---
title: "StringBufferInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/StringBufferInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringBufferInputStream class (java.io)

```java
public class StringBufferInputStream extends InputStream
```

This class allows an application to create an input stream in
which the bytes read are supplied by the contents of a string.
Applications can also read bytes from a byte array by using a
`ByteArrayInputStream`.

Only the low eight bits of each character in the string are used by
this class.

**See also:** java.io.ByteArrayInputStream

**See also:** java.io.StringReader

**Since:** 1.0

**Deprecated:** This class does not properly convert characters into bytes.  As
            of JDK 1.1, the preferred way to create a stream from a
            string is via the `StringReader` class.

## StringBufferInputStream.buffer

```java
protected String buffer
```

The string from which bytes are read.

## StringBufferInputStream.pos

```java
protected int pos
```

The index of the next character to read from the input stream buffer.

**See also:** java.io.StringBufferInputStream#buffer

## StringBufferInputStream.count

```java
protected int count
```

The number of valid characters in the input stream buffer.

**See also:** java.io.StringBufferInputStream#buffer

## StringBufferInputStream.StringBufferInputStream(String)

```java
public StringBufferInputStream(String s)
```

Creates a string input stream to read data from the specified string.

Parameters:

- `s`: the underlying input buffer.

## StringBufferInputStream.read()

```java
public synchronized int read()
```

Reads the next byte of data from this input stream. The value
byte is returned as an `int` in the range
`0` to `255`. If no byte is available
because the end of the stream has been reached, the value
`-1` is returned.

**Implementation requirements:** The `read` method of
`StringBufferInputStream` cannot block. It returns the
low eight bits of the next character in this input stream's buffer.

**Returns:** (inherited documentation)

## StringBufferInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len)
```

Reads up to `len` bytes of data from this input stream
into an array of bytes.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Implementation requirements:** The `read` method of
`StringBufferInputStream` cannot block. It copies the
low eight bits from the characters in this input stream's buffer into
the byte array argument.

**Returns:** (inherited documentation)

## StringBufferInputStream.skip(long)

```java
public synchronized long skip(long n)
```

Skips `n` bytes of input from this input stream. Fewer
bytes might be skipped if the end of the input stream is reached.

Parameters:

- `n`: (inherited documentation)

**Returns:** the actual number of bytes skipped.

## StringBufferInputStream.available()

```java
public synchronized int available()
```

Returns the number of bytes that can be read from the input
stream without blocking.

**Returns:** the value of `count - pos`, which is the
            number of bytes remaining to be read from the input buffer.

## StringBufferInputStream.reset()

```java
public synchronized void reset()
```

Resets the input stream to begin reading from the first character
of this input stream's underlying buffer.
