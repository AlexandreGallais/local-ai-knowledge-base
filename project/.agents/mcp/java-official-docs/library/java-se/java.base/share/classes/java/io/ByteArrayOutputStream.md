---
title: "ByteArrayOutputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ByteArrayOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ByteArrayOutputStream class (java.io)

```java
public class ByteArrayOutputStream extends OutputStream
```

This class implements an output stream in which the data is
written into a byte array. The buffer automatically grows as data
is written to it.
The data can be retrieved using `toByteArray()` and
`toString()`.

Closing a `ByteArrayOutputStream` has no effect. The methods in
this class can be called after the stream has been closed without
generating an `IOException`.

**Since:** 1.0

## ByteArrayOutputStream.buf

```java
protected byte[] buf
```

The buffer where data is stored.

## ByteArrayOutputStream.count

```java
protected int count
```

The number of valid bytes in the buffer.

## ByteArrayOutputStream.ByteArrayOutputStream()

```java
public ByteArrayOutputStream()
```

Creates a new `ByteArrayOutputStream`. The buffer capacity is
initially 32 bytes, though its size increases if necessary.

## ByteArrayOutputStream.ByteArrayOutputStream(int)

```java
public ByteArrayOutputStream(int size)
```

Creates a new `ByteArrayOutputStream`, with a buffer capacity of
the specified size, in bytes.

Parameters:

- `size`: the initial size.

Throws:

- `IllegalArgumentException`: if size is negative.

## ByteArrayOutputStream.write(int)

```java
public synchronized void write(int b)
```

Writes the specified byte to this `ByteArrayOutputStream`.

Parameters:

- `b`: the byte to be written.

## ByteArrayOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len)
```

Writes `len` bytes from the specified byte array
starting at offset `off` to this `ByteArrayOutputStream`.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

Throws:

- `NullPointerException`: if `b` is `null`.
- `IndexOutOfBoundsException`: if `off` is negative, `len` is negative, or `len` is greater than `b.length - off`

## ByteArrayOutputStream.writeBytes(byte[])

```java
public void writeBytes(byte[] b)
```

Writes the complete contents of the specified byte array
to this `ByteArrayOutputStream`.

Parameters:

- `b`: the data.

**API note:** This method is equivalent to write(b, 0, b.length).

**Since:** 11

Throws:

- `NullPointerException`: if `b` is `null`.

## ByteArrayOutputStream.writeTo(OutputStream)

```java
public synchronized void writeTo(OutputStream out) throws IOException
```

Writes the complete contents of this `ByteArrayOutputStream` to
the specified output stream argument, as if by calling the output
stream's write method using `out.write(buf, 0, count)`.

Parameters:

- `out`: the output stream to which to write the data.

Throws:

- `NullPointerException`: if `out` is `null`.
- `IOException`: if an I/O error occurs.

## ByteArrayOutputStream.reset()

```java
public synchronized void reset()
```

Resets the `count` field of this `ByteArrayOutputStream`
to zero, so that all currently accumulated output in the
output stream is discarded. The output stream can be used again,
reusing the already allocated buffer space.

**See also:** java.io.ByteArrayInputStream#count

## ByteArrayOutputStream.toByteArray()

```java
public synchronized byte[] toByteArray()
```

Creates a newly allocated byte array. Its size is the current
size of this output stream and the valid contents of the buffer
have been copied into it.

**Returns:** the current contents of this output stream, as a byte array.

**See also:** java.io.ByteArrayOutputStream#size()

## ByteArrayOutputStream.size()

```java
public synchronized int size()
```

Returns the current size of the buffer.

**Returns:** the value of the `count` field, which is the number
         of valid bytes in this output stream.

**See also:** java.io.ByteArrayOutputStream#count

## ByteArrayOutputStream.toString()

```java
public synchronized String toString()
```

Converts the buffer's contents into a string decoding bytes using the
default charset. The length of the new `String`
is a function of the charset, and hence may not be equal to the
size of the buffer.

 This method always replaces malformed-input and unmappable-character
sequences with the default replacement string for the
default charset. The `java.nio.charset.CharsetDecoder`
class should be used when more control over the decoding process is
required.

**See also:** Charset#defaultCharset()

**Returns:** String decoded from the buffer's contents.

**Since:** 1.1

## ByteArrayOutputStream.toString(String)

```java
public synchronized String toString(String charsetName) throws UnsupportedEncodingException
```

Converts the buffer's contents into a string by decoding the bytes using
the named charset.

 This method is equivalent to `#toString(charset)` that takes a
charset.

 An invocation of this method of the form

behaves in exactly the same way as the expression

Parameters:

- `charsetName`: the name of a supported charset

**Returns:** String decoded from the buffer's contents.

**Since:** 1.1

Throws:

- `UnsupportedEncodingException`: If the named charset is not supported

## ByteArrayOutputStream.toString(Charset)

```java
public synchronized String toString(Charset charset)
```

Converts the buffer's contents into a string by decoding the bytes using
the specified charset. The length of the new
`String` is a function of the charset, and hence may not be equal
to the length of the byte array.

 This method always replaces malformed-input and unmappable-character
sequences with the charset's default replacement string. The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

Parameters:

- `charset`: the charset to be used to decode the `bytes`

**Returns:** String decoded from the buffer's contents.

**Since:** 10

## ByteArrayOutputStream.toString(int)

```java
public synchronized String toString(int hibyte)
```

Creates a newly allocated string. Its size is the current size of
the output stream and the valid contents of the buffer have been
copied into it. Each character *c* in the resulting string is
constructed from the corresponding element *b* in the byte
array such that:

Parameters:

- `hibyte`: the high byte of each resulting Unicode character.

**Deprecated:** This method does not properly convert bytes into characters.
As of JDK 1.1, the preferred way to do this is via the
charsetName) or charset)
method, which takes an encoding-name or charset argument,
or the `toString()` method, which uses the default charset.

**Returns:** the current contents of the output stream, as a string.

**See also:** java.io.ByteArrayOutputStream#size()

**See also:** java.io.ByteArrayOutputStream#toString(String)

**See also:** java.io.ByteArrayOutputStream#toString()

**See also:** Charset#defaultCharset()

## ByteArrayOutputStream.close()

```java
public void close() throws IOException
```

Closing a `ByteArrayOutputStream` has no effect. The methods in
this class can be called after the stream has been closed without
generating an `IOException`.
