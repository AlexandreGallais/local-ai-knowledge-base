---
title: "JarInputStream class (java.util.jar)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/jar/JarInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JarInputStream class (java.util.jar)

```java
public class JarInputStream extends ZipInputStream
```

The `JarInputStream` class, which extends `ZipInputStream`,
is used to read the contents of a JAR file from an input stream.
It provides support for reading an optional
Manifest
entry. The `Manifest` can be used to store
meta-information about the JAR file and its entries.

Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

#### Accessing the Manifest

The getManifest method is used to return the
Manifest
from the entry `META-INF/MANIFEST.MF` when it is the first entry
in the stream (or the second entry if the first entry in the stream is
`META-INF/` and the second entry is `META-INF/MANIFEST.MF`).

 The `getNextJarEntry()` and `getNextEntry()` methods are
used to read JAR file entries from the stream. These methods skip over the
Manifest (`META-INF/MANIFEST.MF`) when it is at the beginning of the
stream. In other words, these methods do not return an entry for the Manifest
when the Manifest is the first entry in the stream. If the first entry is
`META-INF/` and the second entry is the Manifest then both are skipped
over by these methods. Whether these methods skip over the Manifest when it
appears later in the stream is not specified.

#### Signed JAR Files

A `JarInputStream` verifies the signatures of entries in a
Signed JAR file
when:

-
        The `Manifest` is the first entry in the stream (or the second
        entry if the first entry in the stream is `META-INF/` and the
        second entry is `META-INF/MANIFEST.MF`).

-
        All signature-related entries immediately follow the `Manifest`

 Once the `JarEntry` has been completely verified, which is done by
 reading until the end of the entry's input stream,
 `JarEntry.getCertificates()` may be called to obtain the certificates
 for this entry and `JarEntry.getCodeSigners()` may be called to obtain
 the signers.

 It is important to note that the verification process does not include validating
 the signer's certificate. A caller should inspect the return value of
 `JarEntry.getCodeSigners()` to further determine if the signature
 can be trusted.

**API note:** If a `JarEntry` is modified after the JAR file is signed,
a `SecurityException` will be thrown when the entry is read.

**See also:** Manifest

**See also:** java.util.zip.ZipInputStream

**Since:** 1.2

## JarInputStream.JarInputStream(InputStream)

```java
public JarInputStream(InputStream in) throws IOException
```

Creates a new `JarInputStream` and reads the optional
manifest. If a manifest is present, also attempts to verify
the signatures if the JarInputStream is signed.

Parameters:

- `in`: the actual input stream

Throws:

- `IOException`: if an I/O error has occurred

## JarInputStream.JarInputStream(InputStream, boolean)

```java
public JarInputStream(InputStream in, boolean verify) throws IOException
```

Creates a new `JarInputStream` and reads the optional
manifest. If a manifest is present and verify is true, also attempts
to verify the signatures if the JarInputStream is signed.

Parameters:

- `in`: the actual input stream
- `verify`: whether or not to verify the JarInputStream if it is signed.

Throws:

- `IOException`: if an I/O error has occurred

## JarInputStream.getManifest()

```java
public Manifest getManifest()
```

Returns the `Manifest` for this JAR file when it is the first entry
in the stream (or the second entry if the first entry in the stream is
`META-INF/` and the second entry is `META-INF/MANIFEST.MF`), or
`null` otherwise.

**Returns:** the `Manifest` for this JAR file, or
        `null` otherwise.

## JarInputStream.getNextEntry()

```java
public ZipEntry getNextEntry() throws IOException
```

Reads the next ZIP file entry and positions the stream at the
beginning of the entry data. If verification has been enabled,
any invalid signature detected while positioning the stream for
the next entry will result in an exception.

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred
- `SecurityException`: if any of the jar file entries are incorrectly signed.

## JarInputStream.getNextJarEntry()

```java
public JarEntry getNextJarEntry() throws IOException
```

Reads the next JAR file entry and positions the stream at the
beginning of the entry data. If verification has been enabled,
any invalid signature detected while positioning the stream for
the next entry will result in an exception.

**Returns:** the next JAR file entry, or null if there are no more entries

Throws:

- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred
- `SecurityException`: if any of the jar file entries are incorrectly signed.

## JarInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads from the current JAR entry into an array of bytes, returning the number of
inflated bytes. If `len` is not zero, the method blocks until some input is
available; otherwise, no bytes are read and `0` is returned.

If the current entry is compressed and this method returns a nonzero
integer *n* then `buf[off]`
through `buf[off+`*n*`-1]` contain the uncompressed
data.  The content of elements `buf[off+`*n*`]` through
`buf[off+`*len*`-1]` is undefined, contrary to the
specification of the InputStream superclass,
so an implementation is free to modify these elements during the inflate
operation. If this method returns `-1` or throws an exception then
the content of `buf[off]` through `buf[off+`*len*`-1]` is undefined.

If verification has been enabled, any invalid signature
on the current entry will be reported at some point before the
end of the entry is reached.

Parameters:

- `b`: the buffer into which the data is read
- `off`: the start offset in the destination array `b`
- `len`: the maximum number of bytes to read

**Returns:** the actual number of bytes read, or -1 if the end of the
        entry is reached

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `b.length - off`
- `ZipException`: if a ZIP file error has occurred
- `IOException`: if an I/O error has occurred
- `SecurityException`: if any of the jar file entries are incorrectly signed.

## JarInputStream.createZipEntry(String)

```java
protected ZipEntry createZipEntry(String name)
```

Creates a new `JarEntry` (`ZipEntry`) for the
specified JAR file entry name. The manifest attributes of
the specified JAR file entry name will be copied to the new
`JarEntry`.

Parameters:

- `name`: the name of the JAR/ZIP file entry

**Returns:** the `JarEntry` object just created
