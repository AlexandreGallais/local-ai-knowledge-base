---
title: "UTFDataFormatException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/UTFDataFormatException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UTFDataFormatException class (java.io)

```java
public class UTFDataFormatException extends IOException
```

Signals that a malformed string in
modified UTF-8
format has been read in a data
input stream or by any class that implements the data input
interface.
See the
`DataInput`
class description for the format in
which modified UTF-8 strings are read and written.

**See also:** java.io.DataInput

**See also:** java.io.DataInputStream#readUTF(java.io.DataInput)

**See also:** java.io.IOException

**Since:** 1.0

## UTFDataFormatException.UTFDataFormatException()

```java
public UTFDataFormatException()
```

Constructs a `UTFDataFormatException` with
`null` as its error detail message.

## UTFDataFormatException.UTFDataFormatException(String)

```java
public UTFDataFormatException(String s)
```

Constructs a `UTFDataFormatException` with the
specified detail message. The string `s` can be
retrieved later by the
`java.lang.Throwable.getMessage`
method of class `java.lang.Throwable`.

Parameters:

- `s`: the detail message.
