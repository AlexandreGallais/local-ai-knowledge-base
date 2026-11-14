---
title: "JarOutputStream class (java.util.jar)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/jar/JarOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JarOutputStream class (java.util.jar)

```java
public class JarOutputStream extends ZipOutputStream
```

The `JarOutputStream` class is used to write the contents
of a JAR file to any output stream. It extends the class
`java.util.zip.ZipOutputStream` with support
for writing an optional `Manifest` entry. The
`Manifest` can be used to specify meta-information about
the JAR file and its entries.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**See also:** Manifest

**See also:** java.util.zip.ZipOutputStream

**Since:** 1.2

## JarOutputStream.JarOutputStream(OutputStream, Manifest)

```java
public JarOutputStream(OutputStream out, Manifest man) throws IOException
```

Creates a new `JarOutputStream` with the specified
`Manifest`. The manifest is written as the first
entry to the output stream.

Parameters:

- `out`: the actual output stream
- `man`: the optional `Manifest`

Throws:

- `IOException`: if an I/O error has occurred

## JarOutputStream.JarOutputStream(OutputStream)

```java
public JarOutputStream(OutputStream out) throws IOException
```

Creates a new `JarOutputStream` with no manifest.

Parameters:

- `out`: the actual output stream

Throws:

- `IOException`: if an I/O error has occurred

## JarOutputStream.putNextEntry(ZipEntry)

```java
public void putNextEntry(ZipEntry ze) throws IOException
```

Begins writing a new JAR file entry and positions the stream
to the start of the entry data. This method will also close
any previous entry.

The default compression method will be used if no compression
method was specified for the entry. When writing a compressed
(DEFLATED) entry, and the compressed size has not been explicitly
set with the `ZipEntry.setCompressedSize(long)` method,
then the compressed size will be set to the actual compressed
size after deflation.

The current time will be used if the entry has no set modification
time.

Parameters:

- `ze`: the ZIP/JAR entry to be written

Throws:

- `ZipException`: if a ZIP error has occurred
- `IOException`: if an I/O error has occurred
