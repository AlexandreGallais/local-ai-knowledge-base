---
title: "FileWriter class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FileWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileWriter class (java.io)

```java
public class FileWriter extends OutputStreamWriter
```

Writes text to character files using a default buffer size. Encoding from characters
to bytes uses either a specified charset
or the default charset.

Whether or not a file is available or may be created depends upon the
underlying platform.  Some platforms, in particular, allow a file to be
opened for writing by only one `FileWriter` (or other file-writing
object) at a time.  In such situations the constructors in this class
will fail if the file involved is already open.

The `FileWriter` is meant for writing streams of characters. For writing
streams of raw bytes, consider using a `FileOutputStream`.

**See also:** OutputStreamWriter

**See also:** FileOutputStream

**See also:** Charset#defaultCharset()

**Since:** 1.1

## FileWriter.FileWriter(String)

```java
public FileWriter(String fileName) throws IOException
```

Constructs a `FileWriter` given a file name, using the
default charset

Parameters:

- `fileName`: String The system-dependent filename.

**See also:** Charset#defaultCharset()

Throws:

- `IOException`: if the named file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileWriter.FileWriter(String, boolean)

```java
public FileWriter(String fileName, boolean append) throws IOException
```

Constructs a `FileWriter` given a file name and a boolean indicating
whether to append the data written, using the
default charset.

Parameters:

- `fileName`: String The system-dependent filename.
- `append`: boolean if `true`, then data will be written to the end of the file rather than the beginning.

**See also:** Charset#defaultCharset()

Throws:

- `IOException`: if the named file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileWriter.FileWriter(File)

```java
public FileWriter(File file) throws IOException
```

Constructs a `FileWriter` given the `File` to write,
using the default charset

Parameters:

- `file`: the `File` to write.

**See also:** Charset#defaultCharset()

Throws:

- `IOException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileWriter.FileWriter(File, boolean)

```java
public FileWriter(File file, boolean append) throws IOException
```

Constructs a `FileWriter` given the `File` to write and
a boolean indicating whether to append the data written, using the
default charset.

Parameters:

- `file`: the `File` to write
- `append`: if `true`, then bytes will be written to the end of the file rather than the beginning

**See also:** Charset#defaultCharset()

**Since:** 1.4

Throws:

- `IOException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileWriter.FileWriter(FileDescriptor)

```java
public FileWriter(FileDescriptor fd)
```

Constructs a `FileWriter` given a file descriptor,
using the default charset.

Parameters:

- `fd`: the `FileDescriptor` to write.

**See also:** Charset#defaultCharset()

## FileWriter.FileWriter(String, Charset)

```java
public FileWriter(String fileName, Charset charset) throws IOException
```

Constructs a `FileWriter` given a file name and
charset.

Parameters:

- `fileName`: the name of the file to write
- `charset`: the charset

**Since:** 11

Throws:

- `IOException`: if the named file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileWriter.FileWriter(String, Charset, boolean)

```java
public FileWriter(String fileName, Charset charset, boolean append) throws IOException
```

Constructs a `FileWriter` given a file name,
charset and a boolean indicating
whether to append the data written.

Parameters:

- `fileName`: the name of the file to write
- `charset`: the charset
- `append`: a boolean. If `true`, the writer will write the data to the end of the file rather than the beginning.

**Since:** 11

Throws:

- `IOException`: if the named file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileWriter.FileWriter(File, Charset)

```java
public FileWriter(File file, Charset charset) throws IOException
```

Constructs a `FileWriter` given the `File` to write and
charset.

Parameters:

- `file`: the `File` to write
- `charset`: the charset

**Since:** 11

Throws:

- `IOException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileWriter.FileWriter(File, Charset, boolean)

```java
public FileWriter(File file, Charset charset, boolean append) throws IOException
```

Constructs a `FileWriter` given the `File` to write,
charset and a boolean indicating
whether to append the data written.

Parameters:

- `file`: the `File` to write
- `charset`: the charset
- `append`: a boolean. If `true`, the writer will write the data to the end of the file rather than the beginning.

**Since:** 11

Throws:

- `IOException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason
