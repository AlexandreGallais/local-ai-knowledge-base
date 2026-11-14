---
title: "CheckedInputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/CheckedInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CheckedInputStream class (java.util.zip)

```java
public class CheckedInputStream extends FilterInputStream
```

An input stream that also maintains a checksum of the data being read.
The checksum can then be used to verify the integrity of the input data.

**See also:** Checksum

**Since:** 1.1

## CheckedInputStream.CheckedInputStream(InputStream, Checksum)

```java
public CheckedInputStream(InputStream in, Checksum cksum)
```

Creates an input stream using the specified Checksum.

Parameters:

- `in`: the input stream
- `cksum`: the Checksum

## CheckedInputStream.read()

```java
public int read() throws IOException
```

Reads a byte. Will block if no input is available.

**Returns:** the byte read, or -1 if the end of the stream is reached.

Throws:

- `IOException`: if an I/O error has occurred

## CheckedInputStream.read(byte[], int, int)

```java
public int read(byte[] buf, int off, int len) throws IOException
```

Reads into an array of bytes. If `len` is not zero, the method
blocks until some input is available; otherwise, no
bytes are read and `0` is returned.

Parameters:

- `buf`: the buffer into which the data is read
- `off`: the start offset in the destination array `b`
- `len`: the maximum number of bytes read

**Returns:** the actual number of bytes read, or -1 if the end
           of the stream is reached.

Throws:

- `NullPointerException`: If `buf` is `null`.
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `buf.length - off`
- `IOException`: if an I/O error has occurred

## CheckedInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips specified number of bytes of input.

Parameters:

- `n`: the number of bytes to skip

**Returns:** the actual number of bytes skipped

Throws:

- `IOException`: if an I/O error has occurred

## CheckedInputStream.getChecksum()

```java
public Checksum getChecksum()
```

Returns the Checksum for this input stream.

**Returns:** the Checksum value
