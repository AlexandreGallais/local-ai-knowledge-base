---
title: "FileTypeDetector class (java.nio.file.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/spi/FileTypeDetector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileTypeDetector class (java.nio.file.spi)

```java
public abstract class FileTypeDetector
```

A file type detector for probing a file to guess its file type.

 A file type detector is a concrete implementation of this class, has a
zero-argument constructor, and implements the abstract methods specified
below.

 The means by which a file type detector determines the file type is
highly implementation specific. A simple implementation might examine the
*file extension* (a convention used in some platforms) and map it to
a file type. In other cases, the file type may be stored as a file  attribute or the bytes in a
file may be examined to guess its file type.

**See also:** java.nio.file.Files#probeContentType(Path)

**Since:** 1.7

## FileTypeDetector.FileTypeDetector()

```java
protected FileTypeDetector()
```

Initializes a new instance of this class.

## FileTypeDetector.probeContentType(Path)

```java
public abstract String probeContentType(Path path) throws IOException
```

Probes the given file to guess its content type.

 The means by which this method determines the file type is highly
implementation specific. It may simply examine the file name, it may use
a file attribute,
or it may examine bytes in the file.

 The probe result is the string form of the value of a
Multipurpose Internet Mail Extension (MIME) content type as
defined by *RFC 2045:
Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet
Message Bodies*. The string must be parsable according to the
grammar in the RFC 2045.

Parameters:

- `path`: the path to the file to probe

**Returns:** The content type or `null` if the file type is not
         recognized

**See also:** java.nio.file.Files#probeContentType

Throws:

- `IOException`: An I/O error occurs
