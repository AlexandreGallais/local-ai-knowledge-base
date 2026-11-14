---
title: "File class (java.io) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/File.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# File class (java.io) (part 2 of 4)

## File.getCanonicalPath()

```java
public String getCanonicalPath() throws IOException
```

Returns the canonical pathname string of this abstract pathname.

 A canonical pathname is both absolute and unique.  The precise
definition of canonical form is system-dependent.  This method first
converts this pathname to absolute form if necessary, as if by invoking the
`getAbsolutePath` method, and then maps it to its unique form in a
system-dependent way.  This typically involves removing redundant names
such as `"."` and `".."` from the pathname, resolving
symbolic links, and converting drive letters to a standard case (on
Microsoft Windows platforms).

 Every pathname that denotes an existing file or directory has a
unique canonical form.  Every pathname that denotes a nonexistent file
or directory also has a unique canonical form.  The canonical form of
the pathname of a nonexistent file or directory may be different from
the canonical form of the same pathname after the file or directory is
created.  Similarly, the canonical form of the pathname of an existing
file or directory may be different from the canonical form of the same
pathname after the file or directory is deleted.

**Returns:** The canonical pathname string denoting the same file or
         directory as this abstract pathname

**Since:** 1.1

**See also:** Path#toRealPath

Throws:

- `IOException`: If an I/O error occurs, which is possible because the construction of the canonical pathname may require filesystem queries

## File.getCanonicalFile()

```java
public File getCanonicalFile() throws IOException
```

Returns the canonical form of this abstract pathname.  Equivalent to
`new File(this.`getCanonicalPath`)`.

**Returns:** The canonical pathname string denoting the same file or
         directory as this abstract pathname

**Since:** 1.2

**See also:** Path#toRealPath

Throws:

- `IOException`: If an I/O error occurs, which is possible because the construction of the canonical pathname may require filesystem queries

## File.toURL()

```java
public URL toURL() throws MalformedURLException
```

Converts this abstract pathname into a `file:` URL.  The
exact form of the URL is system-dependent.  If it can be determined that
the file denoted by this abstract pathname is a directory, then the
resulting URL will end with a slash.

**Returns:** A URL object representing the equivalent file URL

**See also:** #toURI()

**See also:** java.net.URI

**See also:** java.net.URI#toURL()

**See also:** java.net.URL

**Since:** 1.2

**Deprecated:** This method does not automatically escape characters that
are illegal in URLs.  It is recommended that new code convert an
abstract pathname into a URL by first converting it into a URI, via the
toURI method, and then converting the URI into a URL
via the URI.toURL method.

Throws:

- `MalformedURLException`: If the path cannot be parsed as a URL

## File.toURI()

```java
public URI toURI()
```

Constructs a `file:` URI that represents this abstract pathname.

 The exact form of the URI is system-dependent.  If it can be
determined that the file denoted by this abstract pathname is a
directory, then the resulting URI will end with a slash.

 For a given abstract pathname *f*, it is guaranteed that

`
new File(`* f*`.toURI()).equals(
`* f*`.getAbsoluteFile())
`

so long as the original abstract pathname, the URI, and the new abstract
pathname are all created in (possibly different invocations of) the same
Java virtual machine.  Due to the system-dependent nature of abstract
pathnames, however, this relationship typically does not hold when a
`file:` URI that is created in a virtual machine on one operating
system is converted into an abstract pathname in a virtual machine on a
different operating system.

 Note that when this abstract pathname represents a UNC pathname then
all components of the UNC (including the server name component) are encoded
in the `URI` path. The authority component is undefined, meaning
that it is represented as `null`. The `Path` class defines the
toUri method to encode the server name in the authority
component of the resulting `URI`. The toPath method
may be used to obtain a `Path` representing this abstract pathname.

**Returns:** An absolute, hierarchical URI with a scheme equal to
         `"file"`, a path representing this abstract pathname,
         and undefined authority, query, and fragment components

**See also:** #File(java.net.URI)

**See also:** java.net.URI

**See also:** java.net.URI#toURL()

**Since:** 1.4

## File.canRead()

```java
public boolean canRead()
```

Tests whether the application can read the file denoted by this
abstract pathname. On some platforms it may be possible to start the
Java virtual machine with special privileges that allow it to read
files that are marked as unreadable. Consequently, this method may return
`true` even though the file does not have read permissions.

**Returns:** `true` if and only if the file specified by this
         abstract pathname exists *and* can be read by the
         application; `false` otherwise

## File.canWrite()

```java
public boolean canWrite()
```

Tests whether the application can modify the file denoted by this
abstract pathname. On some platforms it may be possible to start the
Java virtual machine with special privileges that allow it to modify
files that are marked read-only. Consequently, this method may return
`true` even though the file is marked read-only.

**Returns:** `true` if and only if the file system actually
         contains a file denoted by this abstract pathname *and*
         the application is allowed to write to the file;
         `false` otherwise.

## File.exists()

```java
public boolean exists()
```

Tests whether the file or directory denoted by this abstract pathname
exists.

**Returns:** `true` if and only if the file or directory denoted
         by this abstract pathname exists; `false` otherwise

## File.isDirectory()

```java
public boolean isDirectory()
```

Tests whether the file denoted by this abstract pathname is a
directory.

 Where it is required to distinguish an I/O exception from the case
that the file is not a directory, or where several attributes of the
same file are required at the same time, then the Files.readAttributes method may be used.

**Returns:** `true` if and only if the file denoted by this
         abstract pathname exists *and* is a directory;
         `false` otherwise

## File.isFile()

```java
public boolean isFile()
```

Tests whether the file denoted by this abstract pathname is a normal
file.  A file is *normal* if it is not a directory and, in
addition, satisfies other system-dependent criteria.  Any non-directory
file created by a Java application is guaranteed to be a normal file.

 Where it is required to distinguish an I/O exception from the case
that the file is not a normal file, or where several attributes of the
same file are required at the same time, then the Files.readAttributes method may be used.

**Returns:** `true` if and only if the file denoted by this
         abstract pathname exists *and* is a normal file;
         `false` otherwise

## File.isHidden()

```java
public boolean isHidden()
```

Tests whether the file named by this abstract pathname is a hidden
file.  The exact definition of *hidden* is system-dependent.  On
UNIX systems, a file is considered to be hidden if its name begins with
a period character (`'.'`).  On Microsoft Windows systems, a file
is considered to be hidden if it has been marked as such in the
filesystem.

**Implementation note:** If the file is a symbolic link, then on UNIX system it is considered to
be hidden if the name of the link itself, not that of its target, begins
with a period character.  On Windows systems, a symbolic link is
considered hidden if its target is so marked in the filesystem.

**Returns:** `true` if and only if the file denoted by this
         abstract pathname is hidden according to the conventions of the
         underlying platform

**Since:** 1.2

## File.lastModified()

```java
public long lastModified()
```

Returns the time that the file denoted by this abstract pathname was
last modified.

**API note:** While the unit of time of the return value is milliseconds, the
granularity of the value depends on the underlying file system and may
be larger.  For example, some file systems use time stamps in units of
seconds.

 Where it is required to distinguish an I/O exception from the case
where `0L` is returned, or where several attributes of the
same file are required at the same time, or where the time of last
access or the creation time are required, then the Files.readAttributes method may be used.  If however only the
time of last modification is required, then the
Files.getLastModifiedTime method may be used instead.

**Returns:** A `long` value representing the time the file was
         last modified, measured in milliseconds since the epoch
         (00:00:00 GMT, January 1, 1970), or `0L` if the
         file does not exist or if an I/O error occurs.  The value may
         be negative indicating the number of milliseconds before the
         epoch

## File.length()

```java
public long length()
```

Returns the length of the file denoted by this abstract pathname.
The return value is unspecified if this pathname denotes a directory.

 Where it is required to distinguish an I/O exception from the case
that `0L` is returned, or where several attributes of the same file
are required at the same time, then the Files.readAttributes method may be used.

**Returns:** The length, in bytes, of the file denoted by this abstract
         pathname, or `0L` if the file does not exist.  Some
         operating systems may return `0L` for pathnames
         denoting system-dependent entities such as devices or pipes.

## File.createNewFile()

```java
public boolean createNewFile() throws IOException
```

Atomically creates a new, empty file named by this abstract pathname if
and only if a file with this name does not yet exist.  The check for the
existence of the file and the creation of the file if it does not exist
are a single operation that is atomic with respect to all other
filesystem activities that might affect the file.

Note: this method should *not* be used for file-locking, as
the resulting protocol cannot be made to work reliably. The
FileLock
facility should be used instead.

**Returns:** `true` if the named file does not exist and was
         successfully created; `false` if the named file
         already exists

**Since:** 1.2

Throws:

- `IOException`: If an I/O error occurred

## File.delete()

```java
public boolean delete()
```

Deletes the file or directory denoted by this abstract pathname.  If
this pathname denotes a directory, then the directory must be empty in
order to be deleted.  If this pathname denotes a symbolic link, then the
link itself, not its target, will be deleted.

 Note that the `java.nio.file.Files` class defines the delete method to throw an `IOException`
when a file cannot be deleted. This is useful for error reporting and to
diagnose why a file cannot be deleted.

**Returns:** `true` if and only if the file or directory is
         successfully deleted; `false` otherwise

## File.deleteOnExit()

```java
public void deleteOnExit()
```

Requests that the file or directory denoted by this abstract
pathname be deleted when the virtual machine terminates.
If this pathname denotes a symbolic link, then the
link itself, not its target, will be deleted.
Files (or directories) are deleted in the reverse order that
they are registered. Invoking this method to delete a file or
directory that is already registered for deletion has no effect.
Deletion will be attempted only for normal termination of the
virtual machine, as defined by the Java Language Specification.

 Once deletion has been requested, it is not possible to cancel the
request.  This method should therefore be used with care.

Note: this method should *not* be used for file-locking, as
the resulting protocol cannot be made to work reliably. The
FileLock
facility should be used instead.

**See also:** #delete

**Since:** 1.2

## File.list()

```java
public String[] list()
```

Returns an array of strings naming the files and directories in the
directory denoted by this abstract pathname.

 If this abstract pathname does not denote a directory, then this
method returns `null`.  Otherwise an array of strings is
returned, one for each file or directory in the directory.  Names
denoting the directory itself and the directory's parent directory are
not included in the result.  Each string is a file name rather than a
complete path.

 There is no guarantee that the name strings in the resulting array
will appear in any specific order; they are not, in particular,
guaranteed to appear in alphabetical order.

 Note that the `java.nio.file.Files` class defines the newDirectoryStream method to
open a directory and iterate over the names of the files in the directory.
This may use less resources when working with very large directories, and
may be more responsive when working with remote directories.

**Returns:** An array of strings naming the files and directories in the
         directory denoted by this abstract pathname.  The array will be
         empty if the directory is empty.  Returns `null` if
         this abstract pathname does not denote a directory, or if an
         I/O error occurs.

## File.list(FilenameFilter)

```java
public String[] list(FilenameFilter filter)
```

Returns an array of strings naming the files and directories in the
directory denoted by this abstract pathname that satisfy the specified
filter.  The behavior of this method is the same as that of the
`list()` method, except that the strings in the returned array
must satisfy the filter.  If the given `filter` is `null`
then all names are accepted.  Otherwise, a name satisfies the filter if
and only if the value `true` results when the FilenameFilter.accept(File, String) method
of the filter is invoked on this abstract pathname and the name of a
file or directory in the directory that it denotes.

Parameters:

- `filter`: A filename filter

**Returns:** An array of strings naming the files and directories in the
         directory denoted by this abstract pathname that were accepted
         by the given `filter`.  The array will be empty if the
         directory is empty or if no names were accepted by the filter.
         Returns `null` if this abstract pathname does not denote
         a directory, or if an I/O error occurs.

**See also:** java.nio.file.Files#newDirectoryStream(Path,String)
