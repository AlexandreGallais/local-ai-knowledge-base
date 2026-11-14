---
title: "FileReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FileReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileReader class (java.io)

```java
public class FileReader extends InputStreamReader
```

Reads text from character files using a default buffer size. Decoding from bytes
to characters uses either a specified charset
or the default charset.

The `FileReader` is meant for reading streams of characters. For reading
streams of raw bytes, consider using a `FileInputStream`.

**See also:** InputStreamReader

**See also:** FileInputStream

**See also:** Charset#defaultCharset()

**Since:** 1.1

## FileReader.FileReader(String)

```java
public FileReader(String fileName) throws FileNotFoundException
```

Creates a new `FileReader`, given the name of the file to read,
using the default charset.

Parameters:

- `fileName`: the name of the file to read

**See also:** Charset#defaultCharset()

Throws:

- `FileNotFoundException`: if the named file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading.

## FileReader.FileReader(File)

```java
public FileReader(File file) throws FileNotFoundException
```

Creates a new `FileReader`, given the `File` to read,
using the default charset.

Parameters:

- `file`: the `File` to read

**See also:** Charset#defaultCharset()

Throws:

- `FileNotFoundException`: if the file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading.

## FileReader.FileReader(FileDescriptor)

```java
public FileReader(FileDescriptor fd)
```

Creates a new `FileReader`, given the `FileDescriptor` to read,
using the default charset.

Parameters:

- `fd`: the `FileDescriptor` to read

**See also:** Charset#defaultCharset()

## FileReader.FileReader(String, Charset)

```java
public FileReader(String fileName, Charset charset) throws IOException
```

Creates a new `FileReader`, given the name of the file to read
and the charset.

Parameters:

- `fileName`: the name of the file to read
- `charset`: the charset

**Since:** 11

Throws:

- `IOException`: if the named file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading.

## FileReader.FileReader(File, Charset)

```java
public FileReader(File file, Charset charset) throws IOException
```

Creates a new `FileReader`, given the `File` to read and
the charset.

Parameters:

- `file`: the `File` to read
- `charset`: the charset

**Since:** 11

Throws:

- `IOException`: if the file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading.
