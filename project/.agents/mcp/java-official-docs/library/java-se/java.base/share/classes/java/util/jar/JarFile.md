# JarFile class (java.util.jar)

```java
public class JarFile extends ZipFile
```

The {@code JarFile} class is used to read the contents of a jar file
from any file that can be opened with {@code java.io.RandomAccessFile}.
It extends the class {@code java.util.zip.ZipFile} with support
for reading an optional {@code Manifest} entry, and support for
processing multi-release jar files.  The {@code Manifest} can be used
to specify meta-information about the jar file and its entries.

<p><a id="multirelease">A multi-release jar file</a> is a jar file that
contains a manifest with a main attribute named "Multi-Release",
a set of "base" entries, some of which are public classes with public
or protected methods that comprise the public interface of the jar file,
and a set of "versioned" entries contained in subdirectories of the
"META-INF/versions" directory.  The versioned entries are partitioned by the
major version of the Java platform.  A versioned entry, with a version
{@code n}, {@code 8 < n}, in the "META-INF/versions/{n}" directory overrides
the base entry as well as any entry with a version number {@code i} where
{@code 8 < i < n}.

<p>By default, a {@code JarFile} for a multi-release jar file is configured
to process the multi-release jar file as if it were a plain (unversioned) jar
file, and as such an entry name is associated with at most one base entry.
The {@code JarFile} may be configured to process a multi-release jar file by
creating the {@code JarFile} with the
{@link JarFile#JarFile(File, boolean, int, Runtime.Version)} constructor.  The
{@code Runtime.Version} object sets a maximum version used when searching for
versioned entries.  When so configured, an entry name
can correspond with at most one base entry and zero or more versioned
entries. A search is required to associate the entry name with the latest
versioned entry whose version is less than or equal to the maximum version
(see {@link #getEntry(String)}).

<p>Class loaders that utilize {@code JarFile} to load classes from the
contents of {@code JarFile} entries should construct the {@code JarFile}
by invoking the {@link JarFile#JarFile(File, boolean, int, Runtime.Version)}
constructor with the value {@code Runtime.version()} assigned to the last
argument.  This assures that classes compatible with the major
version of the running JVM are loaded from multi-release jar files.

<p> If the {@code verify} flag is on when opening a signed jar file, the content
of the jar entry is verified against the signature embedded inside the manifest
that is associated with its {@link JarEntry#getRealName() path name}. For a
multi-release jar file, the content of a versioned entry is verified against
its own signature and {@link JarEntry#getCodeSigners()} returns its own signers.

<p>Please note that the verification process does not include validating the
signer's certificate. A caller should inspect the return value of
{@link JarEntry#getCodeSigners()} to further determine if the signature
can be trusted.

<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.

@implNote
<div class="block">
If the API can not be used to configure a {@code JarFile} (e.g. to override
the configuration of a compiled application or library), two {@code System}
properties are available.
<ul>
<li>
{@code jdk.util.jar.version} can be assigned a value that is the
{@code String} representation of a non-negative integer
{@code <= Runtime.version().feature()}.  The value is used to set the effective
runtime version to something other than the default value obtained by
evaluating {@code Runtime.version().feature()}. The effective runtime version
is the version that the {@link JarFile#JarFile(File, boolean, int, Runtime.Version)}
constructor uses when the value of the last argument is
{@code JarFile.runtimeVersion()}.
</li>
<li>
{@code jdk.util.jar.enableMultiRelease} can be assigned one of the three
{@code String} values <em>true</em>, <em>false</em>, or <em>force</em>.  The
value <em>true</em>, the default value, enables multi-release jar file
processing.  The value <em>false</em> disables multi-release jar processing,
ignoring the "Multi-Release" manifest attribute, and the versioned
directories in a multi-release jar file if they exist.  Furthermore,
the method {@link JarFile#isMultiRelease()} returns <em>false</em>. The value
<em>force</em> causes the {@code JarFile} to be initialized to runtime
versioning after construction.  It effectively does the same as this code:
{@code (new JarFile(File, boolean, int, JarFile.runtimeVersion())}.
</li>
</ul>
</div>

@author  David Connelly
@see     Manifest
@see     java.util.zip.ZipFile
@see     java.util.jar.JarEntry
@since   1.2

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

@return the version that represents the unversioned configuration
@since 9

## JarFile.runtimeVersion()

```java
public static Runtime.Version runtimeVersion()
```

Returns the version that represents the effective runtime versioned
configuration of a multi-release jar file.
<p>
By default the feature version number of the returned {@code Version} will
be equal to the feature version number of {@code Runtime.version()}.
However, if the {@code jdk.util.jar.version} property is set, the
returned {@code Version} is derived from that property and feature version
numbers may not be equal.

@return the version that represents the runtime versioned configuration

@since 9

## JarFile.JarFile(String)

```java
public JarFile(String name) throws IOException
```

Creates a new {@code JarFile} to read from the specified
file {@code name}. The {@code JarFile} will be verified if
it is signed.
@param name the name of the jar file to be opened for reading
@throws IOException if an I/O error has occurred

## JarFile.JarFile(String, boolean)

```java
public JarFile(String name, boolean verify) throws IOException
```

Creates a new {@code JarFile} to read from the specified
file {@code name}.
@param name the name of the jar file to be opened for reading
@param verify whether or not to verify the jar file if
it is signed.
@throws IOException if an I/O error has occurred

## JarFile.JarFile(File)

```java
public JarFile(File file) throws IOException
```

Creates a new {@code JarFile} to read from the specified
{@code File} object. The {@code JarFile} will be verified if
it is signed.
@param file the jar file to be opened for reading
@throws IOException if an I/O error has occurred

## JarFile.JarFile(File, boolean)

```java
public JarFile(File file, boolean verify) throws IOException
```

Creates a new {@code JarFile} to read from the specified
{@code File} object.
@param file the jar file to be opened for reading
@param verify whether or not to verify the jar file if
it is signed.
@throws IOException if an I/O error has occurred

## JarFile.JarFile(File, boolean, int)

```java
public JarFile(File file, boolean verify, int mode) throws IOException
```

Creates a new {@code JarFile} to read from the specified
{@code File} object in the specified mode.  The mode argument
must be either {@code OPEN_READ} or {@code OPEN_READ | OPEN_DELETE}.

@param file the jar file to be opened for reading
@param verify whether or not to verify the jar file if
it is signed.
@param mode the mode in which the file is to be opened
@throws IOException if an I/O error has occurred
@throws IllegalArgumentException
        if the {@code mode} argument is invalid
@since 1.3

## JarFile.JarFile(File, boolean, int, Runtime.Version)

```java
public JarFile(File file, boolean verify, int mode, Runtime.Version version) throws IOException
```

Creates a new {@code JarFile} to read from the specified
{@code File} object in the specified mode.  The mode argument
must be either {@code OPEN_READ} or {@code OPEN_READ | OPEN_DELETE}.
The version argument, after being converted to a canonical form, is
used to configure the {@code JarFile} for processing
multi-release jar files.
<p>
The canonical form derived from the version parameter is
{@code Runtime.Version.parse(Integer.toString(n))} where {@code n} is
{@code Math.max(version.feature(), JarFile.baseVersion().feature())}.

@param file the jar file to be opened for reading
@param verify whether or not to verify the jar file if
it is signed.
@param mode the mode in which the file is to be opened
@param version specifies the release version for a multi-release jar file
@throws IOException if an I/O error has occurred
@throws IllegalArgumentException
        if the {@code mode} argument is invalid
@throws NullPointerException if {@code version} is {@code null}
@since 9

## JarFile.getVersion()

```java
public final Runtime.Version getVersion()
```

Returns the maximum version used when searching for versioned entries.
<p>
If this {@code JarFile} is not a multi-release jar file or is not
configured to be processed as such, then the version returned will be the
same as that returned from {@link #baseVersion()}.

@return the maximum version
@since 9

## JarFile.isMultiRelease()

```java
public final boolean isMultiRelease()
```

Indicates whether or not this jar file is a multi-release jar file.

@return true if this JarFile is a multi-release jar file
@since 9

## JarFile.getManifest()

```java
public Manifest getManifest() throws IOException
```

Returns the jar file manifest, or {@code null} if none.

@return the jar file manifest, or {@code null} if none

@throws IllegalStateException
        may be thrown if the jar file has been closed
@throws IOException  if an I/O error has occurred

## JarFile.getJarEntry(String)

```java
public JarEntry getJarEntry(String name)
```

Returns the {@code JarEntry} for the given base entry name or
{@code null} if not found.

<p>If this {@code JarFile} is a multi-release jar file and is configured
to be processed as such, then a search is performed to find and return
a {@code JarEntry} that is the latest versioned entry associated with the
given entry name.  The returned {@code JarEntry} is the versioned entry
corresponding to the given base entry name prefixed with the string
{@code "META-INF/versions/{n}/"}, for the largest value of {@code n} for
which an entry exists.  If such a versioned entry does not exist, then
the {@code JarEntry} for the base entry is returned, otherwise
{@code null} is returned if no entries are found.  The initial value for
the version {@code n} is the maximum version as returned by the method
{@link JarFile#getVersion()}.

@param name the jar file entry name
@return the {@code JarEntry} for the given entry name, or
        the versioned entry name, or {@code null} if not found

@throws IllegalStateException
        may be thrown if the jar file has been closed

@see java.util.jar.JarEntry

@implSpec
<div class="block">
This implementation invokes {@link JarFile#getEntry(String)}.
</div>

## JarFile.getEntry(String)

```java
public ZipEntry getEntry(String name)
```

Returns the {@code ZipEntry} for the given base entry name or
{@code null} if not found.

<p>If this {@code JarFile} is a multi-release jar file and is configured
to be processed as such, then a search is performed to find and return
a {@code ZipEntry} that is the latest versioned entry associated with the
given entry name.  The returned {@code ZipEntry} is the versioned entry
corresponding to the given base entry name prefixed with the string
{@code "META-INF/versions/{n}/"}, for the largest value of {@code n} for
which an entry exists.  If such a versioned entry does not exist, then
the {@code ZipEntry} for the base entry is returned, otherwise
{@code null} is returned if no entries are found.  The initial value for
the version {@code n} is the maximum version as returned by the method
{@link JarFile#getVersion()}.

@param name the jar file entry name
@return the {@code ZipEntry} for the given entry name or
        the versioned entry name or {@code null} if not found

@throws IllegalStateException
        may be thrown if the jar file has been closed

@see java.util.zip.ZipEntry

@implSpec
<div class="block">
This implementation may return a versioned entry for the requested name
even if there is not a corresponding base entry.  This can occur
if there is a private or package-private versioned entry that matches.
If a subclass overrides this method, assure that the override method
invokes {@code super.getEntry(name)} to obtain all versioned entries.
</div>

## JarFile.entries()

```java
public Enumeration<JarEntry> entries()
```

Returns an enumeration of the jar file entries.

@return an enumeration of the jar file entries
@throws IllegalStateException
        may be thrown if the jar file has been closed

## JarFile.stream()

```java
public Stream<JarEntry> stream()
```

Returns an ordered {@code Stream} over the jar file entries.
Entries appear in the {@code Stream} in the order they appear in
the central directory of the jar file.

@return an ordered {@code Stream} of entries in this jar file
@throws IllegalStateException if the jar file has been closed
@since 1.8

## JarFile.versionedStream()

```java
public Stream<JarEntry> versionedStream()
```

Returns a {@code Stream} of the versioned jar file entries.

<p>If this {@code JarFile} is a multi-release jar file and is configured to
be processed as such, then an entry in the stream is the latest versioned entry
associated with the corresponding base entry name. The maximum version of the
latest versioned entry is the version returned by {@link #getVersion()}.
The returned stream may include an entry that only exists as a versioned entry.

If the jar file is not a multi-release jar file or the {@code JarFile} is not
configured for processing a multi-release jar file, this method returns the
same stream that {@link #stream()} returns.

@return stream of versioned entries
@since 10

## JarFile.getInputStream(ZipEntry)

```java
public synchronized InputStream getInputStream(ZipEntry ze) throws IOException
```

Returns an input stream for reading the contents of the specified
ZIP file entry.

@apiNote The {@code InputStream} returned by this method can wrap an
{@link java.util.zip.InflaterInputStream InflaterInputStream}, whose
{@link java.util.zip.InflaterInputStream#read(byte[], int, int)
read(byte[], int, int)} method can modify any element of the output
buffer.

@param ze the ZIP file entry
@return an input stream for reading the contents of the specified
        ZIP file entry or null if the ZIP file entry does not exist
        within the jar file
@throws ZipException if a ZIP file format error has occurred
@throws IOException if an I/O error has occurred
@throws SecurityException if any of the jar file entries
        are incorrectly signed.
@throws IllegalStateException
        may be thrown if the jar file has been closed