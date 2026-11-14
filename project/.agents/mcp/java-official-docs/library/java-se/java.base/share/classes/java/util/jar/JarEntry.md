---
title: "JarEntry class (java.util.jar)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/jar/JarEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JarEntry class (java.util.jar)

```java
public class JarEntry extends ZipEntry
```

This class is used to represent a JAR file entry.

**Since:** 1.2

## JarEntry.JarEntry(String)

```java
public JarEntry(String name)
```

Creates a new `JarEntry` for the specified JAR file
entry name.

Parameters:

- `name`: the JAR file entry name

Throws:

- `NullPointerException`: if the entry name is `null`
- `IllegalArgumentException`: if the entry name is longer than 0xFFFF bytes.

## JarEntry.JarEntry(ZipEntry)

```java
public JarEntry(ZipEntry ze)
```

Creates a new `JarEntry` with fields taken from the
specified `ZipEntry` object.

Parameters:

- `ze`: the `ZipEntry` object to create the `JarEntry` from

Throws:

- `NullPointerException`: if `ze` is null

## JarEntry.JarEntry(JarEntry)

```java
public JarEntry(JarEntry je)
```

Creates a new `JarEntry` with fields taken from the
specified `JarEntry` object.

Parameters:

- `je`: the `JarEntry` to copy

Throws:

- `NullPointerException`: if `je` is null

## JarEntry.getAttributes()

```java
public Attributes getAttributes() throws IOException
```

Returns the `Manifest` `Attributes` for this
entry, or `null` if none.

**Returns:** the `Manifest` `Attributes` for this
entry, or `null` if none

Throws:

- `IOException`: if an I/O error has occurred

## JarEntry.getCertificates()

```java
public Certificate[] getCertificates()
```

Returns the `Certificate` objects for this entry, or
`null` if none. This method can only be called once
the `JarEntry` has been completely verified by reading
from the entry input stream until the end of the stream has been
reached. Otherwise, this method will return `null`.

It is recommended to use the `getCodeSigners` method instead,
which returns an array of `CodeSigner`s.

The returned certificate array comprises all the signer certificates
that were used to verify this entry. Each signer certificate is
followed by its supporting certificate chain (which may be empty).
Each signer certificate and its supporting certificate chain are ordered
bottom-to-top (i.e., with the signer certificate first and the (root)
certificate authority last).

**API note:** The verification process does not include validating or establishing
trust in the code signers. A caller should perform additional checks,
such as using a `java.security.cert.CertPathValidator` to
validate each signer's certificate chain, and determining whether
to trust the entry signed by the signers.

**Returns:** the `Certificate` objects for this entry, or
`null` if none.

## JarEntry.getCodeSigners()

```java
public CodeSigner[] getCodeSigners()
```

Returns the `CodeSigner` objects for this entry, or
`null` if none. This method can only be called once
the `JarEntry` has been completely verified by reading
from the entry input stream until the end of the stream has been
reached. Otherwise, this method will return `null`.

The returned array comprises all the code signers that have signed
this entry.

**API note:** The verification process does not include validating or establishing
trust in the code signers. A caller should perform additional checks,
such as using a `java.security.cert.CertPathValidator` to
validate each signer's certificate chain, and determining whether
to trust the entry signed by the signers.

**Returns:** the `CodeSigner` objects for this entry, or
`null` if none.

**Since:** 1.5

## JarEntry.getRealName()

```java
public String getRealName()
```

Returns the real name of this `JarEntry`.

If this `JarEntry` is an entry of a
multi-release jar file and the
`JarFile` is configured to be processed as such, the name returned
by this method is the path name of the versioned entry that the
`JarEntry` represents, rather than the path name of the base entry
that `getName()` returns. If the `JarEntry` does not represent
a versioned entry of a multi-release `JarFile` or the `JarFile`
is not configured for processing a multi-release jar file, this method
returns the same name that `getName()` returns.

**Returns:** the real name of the JarEntry

**Since:** 10
