---
title: "JarFile class (java.util.jar)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/jar/JarFile.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JarFile class (java.util.jar)

```java
public class JarFile extends ZipFile
```

The `JarFile` class is used to read the contents of a jar file
from any file that can be opened with `java.io.RandomAccessFile`.
It extends the class `java.util.zip.ZipFile` with support
for reading an optional `Manifest` entry, and support for
processing multi-release jar files.  The `Manifest` can be used
to specify meta-information about the jar file and its entries.

A multi-release jar file is a jar file that
contains a manifest with a main attribute named "Multi-Release",
a set of "base" entries, some of which are public classes with public
or protected methods that comprise the public interface of the jar file,
and a set of "versioned" entries contained in subdirectories of the
"META-INF/versions" directory.  The versioned entries are partitioned by the
major version of the Java platform.  A versioned entry, with a version
`n`, `8 < n`, in the "META-INF/versions/{n}" directory overrides
the base entry as well as any entry with a version number `i` where
`8 < i < n`.

By default, a `JarFile` for a multi-release jar file is configured
to process the multi-release jar file as if it were a plain (unversioned) jar
file, and as such an entry name is associated with at most one base entry.
The `JarFile` may be configured to process a multi-release jar file by
creating the `JarFile` with the
boolean, int, Runtime.Version) constructor.  The
`Runtime.Version` object sets a maximum version used when searching for
versioned entries.  When so configured, an entry name
can correspond with at most one base entry and zero or more versioned
entries. A search is required to associate the entry name with the latest
versioned entry whose version is less than or equal to the maximum version
(see `getEntry(String)`).

Class loaders that utilize `JarFile` to load classes from the
contents of `JarFile` entries should construct the `JarFile`
by invoking the boolean, int, Runtime.Version)
constructor with the value `Runtime.version()` assigned to the last
argument.  This assures that classes compatible with the major
version of the running JVM are loaded from multi-release jar files.

 If the `verify` flag is on when opening a signed jar file, the content
of the jar entry is verified against the signature embedded inside the manifest
that is associated with its path name. For a
multi-release jar file, the content of a versioned entry is verified against
its own signature and `JarEntry.getCodeSigners()` returns its own signers.

Please note that the verification process does not include validating the
signer's certificate. A caller should inspect the return value of
`JarEntry.getCodeSigners()` to further determine if the signature
can be trusted.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**Implementation note:** If the API can not be used to configure a `JarFile` (e.g. to override
the configuration of a compiled application or library), two `System`
properties are available.

-
`jdk.util.jar.version` can be assigned a value that is the
`String` representation of a non-negative integer
`<= Runtime.version().feature()`.  The value is used to set the effective
runtime version to something other than the default value obtained by
evaluating `Runtime.version().feature()`. The effective runtime version
is the version that the boolean, int, Runtime.Version)
constructor uses when the value of the last argument is
`JarFile.runtimeVersion()`.

-
`jdk.util.jar.enableMultiRelease` can be assigned one of the three
`String` values *true*, *false*, or *force*.  The
value *true*, the default value, enables multi-release jar file
processing.  The value *false* disables multi-release jar processing,
ignoring the "Multi-Release" manifest attribute, and the versioned
directories in a multi-release jar file if they exist.  Furthermore,
the method `JarFile.isMultiRelease()` returns *false*. The value
*force* causes the `JarFile` to be initialized to runtime
versioning after construction.  It effectively does the same as this code:
`(new JarFile(File, boolean, int, JarFile.runtimeVersion())`.

**See also:** Manifest

**See also:** java.util.zip.ZipFile

**See also:** java.util.jar.JarEntry

**Since:** 1.2

## JarFile.MANIFEST_NAME

```java
public static final String MANIFEST_NAME
```

The JAR manifest file name.

## JarFile.baseVersion()

```java
public static Runtime.Version baseVersion()
```

Returns the version that represents the unversioned configuration of a
multi-release jar file.

**Returns:** the version that represents the unversioned configuration

**Since:** 9

## JarFile.runtimeVersion()

```java
public static Runtime.Version runtimeVersion()
```

Returns the version that represents the effective runtime versioned
configuration of a multi-release jar file.

By default the feature version number of the returned `Version` will
be equal to the feature version number of `Runtime.version()`.
However, if the `jdk.util.jar.version` property is set, the
returned `Version` is derived from that property and feature version
numbers may not be equal.

**Returns:** the version that represents the runtime versioned configuration

**Since:** 9

## JarFile.JarFile(String)

```java
public JarFile(String name) throws IOException
```

Creates a new `JarFile` to read from the specified
file `name`. The `JarFile` will be verified if
it is signed.

Parameters:

- `name`: the name of the jar file to be opened for reading

Throws:

- `IOException`: if an I/O error has occurred

## JarFile.JarFile(String, boolean)

```java
public JarFile(String name, boolean verify) throws IOException
```

Creates a new `JarFile` to read from the specified
file `name`.

Parameters:

- `name`: the name of the jar file to be opened for reading
- `verify`: whether or not to verify the jar file if it is signed.

Throws:

- `IOException`: if an I/O error has occurred

## JarFile.JarFile(File)

```java
public JarFile(File file) throws IOException
```

Creates a new `JarFile` to read from the specified
`File` object. The `JarFile` will be verified if
it is signed.

Parameters:

- `file`: the jar file to be opened for reading

Throws:

- `IOException`: if an I/O error has occurred

## JarFile.JarFile(File, boolean)

```java
public JarFile(File file, boolean verify) throws IOException
```

Creates a new `JarFile` to read from the specified
`File` object.

Parameters:

- `file`: the jar file to be opened for reading
- `verify`: whether or not to verify the jar file if it is signed.

Throws:

- `IOException`: if an I/O error has occurred

## JarFile.JarFile(File, boolean, int)

```java
public JarFile(File file, boolean verify, int mode) throws IOException
```

Creates a new `JarFile` to read from the specified
`File` object in the specified mode.  The mode argument
must be either `OPEN_READ` or `OPEN_READ | OPEN_DELETE`.

Parameters:

- `file`: the jar file to be opened for reading
- `verify`: whether or not to verify the jar file if it is signed.
- `mode`: the mode in which the file is to be opened

**Since:** 1.3

Throws:

- `IOException`: if an I/O error has occurred
- `IllegalArgumentException`: if the `mode` argument is invalid

## JarFile.JarFile(File, boolean, int, Runtime.Version)

```java
public JarFile(File file, boolean verify, int mode, Runtime.Version version) throws IOException
```

Creates a new `JarFile` to read from the specified
`File` object in the specified mode.  The mode argument
must be either `OPEN_READ` or `OPEN_READ | OPEN_DELETE`.
The version argument, after being converted to a canonical form, is
used to configure the `JarFile` for processing
multi-release jar files.

The canonical form derived from the version parameter is
`Runtime.Version.parse(Integer.toString(n))` where `n` is
`Math.max(version.feature(), JarFile.baseVersion().feature())`.

Parameters:

- `file`: the jar file to be opened for reading
- `verify`: whether or not to verify the jar file if it is signed.
- `mode`: the mode in which the file is to be opened
- `version`: specifies the release version for a multi-release jar file

**Since:** 9

Throws:

- `IOException`: if an I/O error has occurred
- `IllegalArgumentException`: if the `mode` argument is invalid
- `NullPointerException`: if `version` is `null`

## JarFile.getVersion()

```java
public final Runtime.Version getVersion()
```

Returns the maximum version used when searching for versioned entries.

If this `JarFile` is not a multi-release jar file or is not
configured to be processed as such, then the version returned will be the
same as that returned from `baseVersion()`.

**Returns:** the maximum version

**Since:** 9

## JarFile.isMultiRelease()

```java
public final boolean isMultiRelease()
```

Indicates whether or not this jar file is a multi-release jar file.

**Returns:** true if this JarFile is a multi-release jar file

**Since:** 9

## JarFile.getManifest()

```java
public Manifest getManifest() throws IOException
```

Returns the jar file manifest, or `null` if none.

**Returns:** the jar file manifest, or `null` if none

Throws:

- `IllegalStateException`: may be thrown if the jar file has been closed
- `IOException`: if an I/O error has occurred

## JarFile.getJarEntry(String)

```java
public JarEntry getJarEntry(String name)
```

Returns the `JarEntry` for the given base entry name or
`null` if not found.

If this `JarFile` is a multi-release jar file and is configured
to be processed as such, then a search is performed to find and return
a `JarEntry` that is the latest versioned entry associated with the
given entry name.  The returned `JarEntry` is the versioned entry
corresponding to the given base entry name prefixed with the string
`"META-INF/versions/{n}/"`, for the largest value of `n` for
which an entry exists.  If such a versioned entry does not exist, then
the `JarEntry` for the base entry is returned, otherwise
`null` is returned if no entries are found.  The initial value for
the version `n` is the maximum version as returned by the method
`JarFile.getVersion()`.

Parameters:

- `name`: the jar file entry name

**Returns:** the `JarEntry` for the given entry name, or
        the versioned entry name, or `null` if not found

**See also:** java.util.jar.JarEntry

**Implementation requirements:** This implementation invokes `JarFile.getEntry(String)`.

Throws:

- `IllegalStateException`: may be thrown if the jar file has been closed

## JarFile.getEntry(String)

```java
public ZipEntry getEntry(String name)
```

Returns the `ZipEntry` for the given base entry name or
`null` if not found.

If this `JarFile` is a multi-release jar file and is configured
to be processed as such, then a search is performed to find and return
a `ZipEntry` that is the latest versioned entry associated with the
given entry name.  The returned `ZipEntry` is the versioned entry
corresponding to the given base entry name prefixed with the string
`"META-INF/versions/{n}/"`, for the largest value of `n` for
which an entry exists.  If such a versioned entry does not exist, then
the `ZipEntry` for the base entry is returned, otherwise
`null` is returned if no entries are found.  The initial value for
the version `n` is the maximum version as returned by the method
`JarFile.getVersion()`.

Parameters:

- `name`: the jar file entry name

**Returns:** the `ZipEntry` for the given entry name or
        the versioned entry name or `null` if not found

**See also:** java.util.zip.ZipEntry

**Implementation requirements:** This implementation may return a versioned entry for the requested name
even if there is not a corresponding base entry.  This can occur
if there is a private or package-private versioned entry that matches.
If a subclass overrides this method, assure that the override method
invokes `super.getEntry(name)` to obtain all versioned entries.

Throws:

- `IllegalStateException`: may be thrown if the jar file has been closed

## JarFile.entries()

```java
public Enumeration<JarEntry> entries()
```

Returns an enumeration of the jar file entries.

**Returns:** an enumeration of the jar file entries

Throws:

- `IllegalStateException`: may be thrown if the jar file has been closed

## JarFile.stream()

```java
public Stream<JarEntry> stream()
```

Returns an ordered `Stream` over the jar file entries.
Entries appear in the `Stream` in the order they appear in
the central directory of the jar file.

**Returns:** an ordered `Stream` of entries in this jar file

**Since:** 1.8

Throws:

- `IllegalStateException`: if the jar file has been closed

## JarFile.versionedStream()

```java
public Stream<JarEntry> versionedStream()
```

Returns a `Stream` of the versioned jar file entries.

If this `JarFile` is a multi-release jar file and is configured to
be processed as such, then an entry in the stream is the latest versioned entry
associated with the corresponding base entry name. The maximum version of the
latest versioned entry is the version returned by `getVersion()`.
The returned stream may include an entry that only exists as a versioned entry.

If the jar file is not a multi-release jar file or the `JarFile` is not
configured for processing a multi-release jar file, this method returns the
same stream that `stream()` returns.

**Returns:** stream of versioned entries

**Since:** 10

## JarFile.getInputStream(ZipEntry)

```java
public synchronized InputStream getInputStream(ZipEntry ze) throws IOException
```

Returns an input stream for reading the contents of the specified
ZIP file entry.

Parameters:

- `ze`: the ZIP file entry

**API note:** The `InputStream` returned by this method can wrap an
InflaterInputStream, whose
int, int) read(byte[], int, int) method can modify any element of the output
buffer.

**Returns:** an input stream for reading the contents of the specified
        ZIP file entry or null if the ZIP file entry does not exist
        within the jar file

Throws:

- `ZipException`: if a ZIP file format error has occurred
- `IOException`: if an I/O error has occurred
- `SecurityException`: if any of the jar file entries are incorrectly signed.
- `IllegalStateException`: may be thrown if the jar file has been closed
