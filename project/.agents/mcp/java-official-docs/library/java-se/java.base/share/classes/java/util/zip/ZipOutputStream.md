---
title: "ZipOutputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/ZipOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZipOutputStream class (java.util.zip)

```java
public class ZipOutputStream extends DeflaterOutputStream implements ZipConstants
```

This class implements an output stream filter for writing files in the
ZIP file format. Includes support for both compressed and uncompressed
entries.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**Since:** 1.1

## ZipOutputStream.STORED

```java
public static final int STORED
```

Compression method for uncompressed (STORED) entries.

## ZipOutputStream.DEFLATED

```java
public static final int DEFLATED
```

Compression method for compressed (DEFLATED) entries.

## ZipOutputStream.ZipOutputStream(OutputStream)

```java
public ZipOutputStream(OutputStream out)
```

Creates a new ZIP output stream.

The UTF-8 charset is used
to encode the entry names and comments.

Parameters:

- `out`: the actual output stream

## ZipOutputStream.ZipOutputStream(OutputStream, Charset)

```java
public ZipOutputStream(OutputStream out, Charset charset)
```

Creates a new ZIP output stream.

Parameters:

- `out`: the actual output stream
- `charset`: the charset to be used to encode the entry names and comments

**Since:** 1.7

## ZipOutputStream.setComment(String)

```java
public void setComment(String comment)
```

Sets the ZIP file comment.

Parameters:

- `comment`: the comment string

Throws:

- `IllegalArgumentException`: if the length of the specified ZIP file comment is greater than 0xFFFF bytes

## ZipOutputStream.setMethod(int)

```java
public void setMethod(int method)
```

Sets the default compression method for subsequent entries. This
default will be used whenever the compression method is not specified
for an individual ZIP file entry, and is initially set to DEFLATED.

Parameters:

- `method`: the default compression method

Throws:

- `IllegalArgumentException`: if the specified compression method is invalid

## ZipOutputStream.setLevel(int)

```java
public void setLevel(int level)
```

Sets the compression level for subsequent entries which are DEFLATED.
The default setting is DEFAULT_COMPRESSION.

Parameters:

- `level`: the compression level (0-9)

Throws:

- `IllegalArgumentException`: if the compression level is invalid

## ZipOutputStream.putNextEntry(ZipEntry)

```java
public void putNextEntry(ZipEntry e) throws IOException
```

Begins writing a new ZIP file entry and positions the stream to the
start of the entry data. Closes the current entry if still active.

The default compression method will be used if no compression method
was specified for the entry. When writing a compressed (DEFLATED)
entry, and the compressed size has not been explicitly set with the
`ZipEntry.setCompressedSize(long)` method, then the compressed
size will be set to the actual compressed size after deflation.

The current time will be used if the entry has no set modification time.

Parameters:

- `e`: the ZIP entry to be written

**API note:** When writing a directory entry, the STORED compression method
should be used and the size and CRC-32 values should be set to 0:

This allows optimal performance when processing directory entries.

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred

## ZipOutputStream.closeEntry()

```java
public void closeEntry() throws IOException
```

Closes the current ZIP entry and positions the stream for writing
the next entry.

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred

## ZipOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes to the current ZIP entry data. This method
will block until all the bytes are written.

Parameters:

- `b`: the data to be written
- `off`: the start offset in the data
- `len`: the number of bytes that are written

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred

## ZipOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing the contents of the ZIP output stream without closing
the underlying stream. Use this method when applying multiple filters
in succession to the same output stream.

A ZipException will be thrown if the combined length, after encoding,
of the entry name, the extra field data, the entry comment and
CEN Header size, exceeds 65,535 bytes.

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O exception has occurred

## ZipOutputStream.close()

```java
public void close() throws IOException
```

Closes the underlying stream and the stream being filtered after
the contents of the ZIP output stream are fully written.

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred
