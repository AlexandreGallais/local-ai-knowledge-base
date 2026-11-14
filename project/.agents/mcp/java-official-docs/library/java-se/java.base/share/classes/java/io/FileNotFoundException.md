---
title: "FileNotFoundException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FileNotFoundException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileNotFoundException class (java.io)

```java
public class FileNotFoundException extends IOException
```

Signals that an attempt to open the file denoted by a specified pathname
has failed.

 This exception will be thrown by the `FileInputStream`, `FileOutputStream`, and `RandomAccessFile` constructors when a file
with the specified pathname does not exist.  It will also be thrown by these
constructors if the file does exist but for some reason is inaccessible, for
example when an attempt is made to open a read-only file for writing.

**Since:** 1.0

## FileNotFoundException.FileNotFoundException()

```java
public FileNotFoundException()
```

Constructs a `FileNotFoundException` with
`null` as its error detail message.

## FileNotFoundException.FileNotFoundException(String)

```java
public FileNotFoundException(String s)
```

Constructs a `FileNotFoundException` with the
specified detail message. The string `s` can be
retrieved later by the
`java.lang.Throwable.getMessage`
method of class `java.lang.Throwable`.

Parameters:

- `s`: the detail message.
