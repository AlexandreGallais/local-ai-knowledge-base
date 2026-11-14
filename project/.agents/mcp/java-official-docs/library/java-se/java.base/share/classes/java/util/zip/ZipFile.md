---
title: "ZipFile class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/ZipFile.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZipFile class (java.util.zip)

```java
public class ZipFile implements ZipConstants, Closeable
```

This class is used to read entries from a ZIP file.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**API note:** To release resources used by this `ZipFile`, the `close()` method
should be called explicitly or by try-with-resources. Subclasses are responsible
for the cleanup of resources acquired by the subclass. Subclasses that override
`finalize()` in order to perform cleanup should be modified to use alternative
cleanup mechanisms such as `java.lang.ref.Cleaner` and remove the overriding
`finalize` method.

**Since:** 1.1

## ZipFile.OPEN_READ

```java
public static final int OPEN_READ
```

Mode flag to open a ZIP file for reading.

## ZipFile.OPEN_DELETE

```java
public static final int OPEN_DELETE
```

Mode flag to open a ZIP file and mark it for deletion.  The file will be
deleted some time between the moment that it is opened and the moment
that it is closed, but its contents will remain accessible via the
`ZipFile` object until either the close method is invoked or the
virtual machine exits.

## ZipFile.ZipFile(String)

```java
public ZipFile(String name) throws IOException
```

Opens a ZIP file for reading.

The UTF-8 charset is used to
decode the entry names and comments.

Parameters:

- `name`: the name of the ZIP file

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred

## ZipFile.ZipFile(File, int)

```java
public ZipFile(File file, int mode) throws IOException
```

Opens a new `ZipFile` to read from the specified
`File` object in the specified mode.  The mode argument
must be either `OPEN_READ` or `OPEN_READ | OPEN_DELETE`.

The UTF-8 charset is used to
decode the entry names and comments

Parameters:

- `file`: the ZIP file to be opened for reading
- `mode`: the mode in which the file is to be opened

**Since:** 1.3

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred
- `IllegalArgumentException`: if the `mode` argument is invalid

## ZipFile.ZipFile(File)

```java
public ZipFile(File file) throws ZipException, IOException
```

Opens a ZIP file for reading given the specified File object.

The UTF-8 charset is used to
decode the entry names and comments.

Parameters:

- `file`: the ZIP file to be opened for reading

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred

## ZipFile.ZipFile(File, int, Charset)

```java
public ZipFile(File file, int mode, Charset charset) throws IOException
```

Opens a new `ZipFile` to read from the specified
`File` object in the specified mode.  The mode argument
must be either `OPEN_READ` or `OPEN_READ | OPEN_DELETE`.

Parameters:

- `file`: the ZIP file to be opened for reading
- `mode`: the mode in which the file is to be opened
- `charset`: the charset to be used to decode the ZIP entry name and comment that are not encoded by using UTF-8 encoding (indicated by entry's general purpose flag).

**Since:** 1.7

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred
- `IllegalArgumentException`: if the `mode` argument is invalid

## ZipFile.ZipFile(String, Charset)

```java
public ZipFile(String name, Charset charset) throws IOException
```

Opens a ZIP file for reading.

Parameters:

- `name`: the name of the ZIP file
- `charset`: the charset to be used to decode the ZIP entry name and comment that are not encoded by using UTF-8 encoding (indicated by entry's general purpose flag).

**Since:** 1.7

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred

## ZipFile.ZipFile(File, Charset)

```java
public ZipFile(File file, Charset charset) throws IOException
```

Opens a ZIP file for reading given the specified File object.

Parameters:

- `file`: the ZIP file to be opened for reading
- `charset`: The charset to be used to decode the ZIP entry name and comment (ignored if the  language encoding bit of the ZIP entry's general purpose bit flag is set).

**Since:** 1.7

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred

## ZipFile.getComment()

```java
public String getComment()
```

Returns the ZIP file comment. If a comment does not exist or an error is
encountered decoding the comment using the charset specified
when opening the ZIP file, then `null` is returned.

**Returns:** the comment string for the ZIP file, or null if none

**Since:** 1.7

Throws:

- `IllegalStateException`: if the ZIP file has been closed

## ZipFile.getEntry(String)

```java
public ZipEntry getEntry(String name)
```

Returns the ZIP file entry for the specified name, or null
if not found.

Parameters:

- `name`: the name of the entry

**Returns:** the ZIP file entry, or null if not found

Throws:

- `IllegalStateException`: if the ZIP file has been closed

## ZipFile.getInputStream(ZipEntry)

```java
public InputStream getInputStream(ZipEntry entry) throws IOException
```

Returns an input stream for reading the contents of the specified
ZIP file entry.

Closing this ZIP file will, in turn, close all input streams that
have been returned by invocations of this method.

Parameters:

- `entry`: the ZIP file entry

**API note:** The `InputStream` returned by this method can wrap an
InflaterInputStream, whose
int, int) read(byte[], int, int) method can modify any element of the output
buffer.

**Returns:** the input stream for reading the contents of the specified
ZIP file entry or null if the ZIP file entry does not exist
within the ZIP file.

Throws:

- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred
- `IllegalStateException`: if the ZIP file has been closed

## ZipFile.getName()

```java
public String getName()
```

## ZipFile.toString()

```java
public String toString()
```

## ZipFile.entries()

```java
public Enumeration<? extends ZipEntry> entries()
```

Throws:

- `IllegalStateException`: if the ZIP file has been closed

## ZipFile.stream()

```java
public Stream<? extends ZipEntry> stream()
```

Returns an ordered `Stream` over the ZIP file entries.

Entries appear in the `Stream` in the order they appear in
the central directory of the ZIP file.

**Returns:** an ordered `Stream` of entries in this ZIP file

**Since:** 1.8

Throws:

- `IllegalStateException`: if the ZIP file has been closed

## ZipFile.size()

```java
public int size()
```

Returns the number of entries in the ZIP file.

**Returns:** the number of entries in the ZIP file

Throws:

- `IllegalStateException`: if the ZIP file has been closed

## ZipFile.close()

```java
public void close() throws IOException
```

Closes the ZIP file.

 Closing this ZIP file will close all of the input streams
previously returned by invocations of the getInputStream method.

Throws:

- `IOException`: if an I/O error has occurred

## ZipFile.Key(File, BasicFileAttributes, Charset)

```java
public Key(File file, BasicFileAttributes attrs, Charset charset)
```

Constructs a `Key` to a `Source` of a `ZipFile`

Parameters:

- `file`: the ZIP file
- `attrs`: the attributes of the ZIP file
- `charset`: the Charset that was provided when constructing the ZipFile instance
