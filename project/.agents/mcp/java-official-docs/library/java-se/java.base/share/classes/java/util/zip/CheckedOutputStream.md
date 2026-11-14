---
title: "CheckedOutputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/CheckedOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CheckedOutputStream class (java.util.zip)

```java
public class CheckedOutputStream extends FilterOutputStream
```

An output stream that also maintains a checksum of the data being
written. The checksum can then be used to verify the integrity of
the output data.

**See also:** Checksum

**Since:** 1.1

## CheckedOutputStream.CheckedOutputStream(OutputStream, Checksum)

```java
public CheckedOutputStream(OutputStream out, Checksum cksum)
```

Creates an output stream with the specified Checksum.

Parameters:

- `out`: the output stream
- `cksum`: the checksum

## CheckedOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes a byte. Will block until the byte is actually written.

Parameters:

- `b`: the byte to be written

Throws:

- `IOException`: if an I/O error has occurred

## CheckedOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes. Will block until the bytes are
actually written.

Parameters:

- `b`: the data to be written
- `off`: the start offset of the data
- `len`: the number of bytes to be written

Throws:

- `IOException`: if an I/O error has occurred

## CheckedOutputStream.getChecksum()

```java
public Checksum getChecksum()
```

Returns the Checksum for this output stream.

**Returns:** the Checksum
