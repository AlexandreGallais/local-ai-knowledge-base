---
title: "File class (java.io) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/File.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# File class (java.io) (part 4 of 4)

## File.listRoots()

```java
public static File[] listRoots()
```

List the available filesystem roots.

 A particular Java platform may support zero or more
hierarchically-organized file systems.  Each file system has a
`root` directory from which all other files in that file system
can be reached.

 This method returns an array of `File` objects that denote the
root directories of the available filesystem roots.  It is guaranteed
that the canonical pathname of any file physically present on the local
machine will begin with one of the roots returned by this method.
There is no guarantee that a root directory can be accessed.

**Implementation note:** Windows platforms, for example, have a root directory
for each active drive; UNIX platforms have a single root directory,
namely `"/"`.  The set of filesystem roots is affected
by various system-level operations such as the disconnecting or
unmounting of physical or virtual disk drives.

 The canonical pathname of a file that resides on some other machine
and is accessed via a remote-filesystem protocol such as SMB or NFS may
or may not begin with one of the roots returned by this method.  If the
pathname of a remote file is syntactically indistinguishable from the
pathname of a local file then it will begin with one of the roots
returned by this method.  Thus, for example, `File` objects
denoting the root directories of the mapped network drives of a Windows
platform will be returned by this method, while `File` objects
containing UNC pathnames will not be returned by this method.

**Returns:** An array of `File` objects denoting the available
         filesystem roots, or `null` if the set of roots could not
         be determined.  The array will be empty if there are no
         filesystem roots.

**Since:** 1.2

**See also:** java.nio.file.FileStore

## File.getTotalSpace()

```java
public long getTotalSpace()
```

Returns the size of the partition named by this
abstract pathname. If the total number of bytes in the partition is
greater than `Long.MAX_VALUE`, then `Long.MAX_VALUE` will be
returned.

**Returns:** The size, in bytes, of the partition or `0L` if this
         abstract pathname does not name a partition or if the size
         cannot be obtained

**Since:** 1.6

**See also:** FileStore#getTotalSpace

## File.getFreeSpace()

```java
public long getFreeSpace()
```

Returns the number of unallocated bytes in the partition named by this abstract path name.  If the
number of unallocated bytes in the partition is greater than
`Long.MAX_VALUE`, then `Long.MAX_VALUE` will be returned.

 The returned number of unallocated bytes is a hint, but not
a guarantee, that it is possible to use most or any of these
bytes.  The number of unallocated bytes is most likely to be
accurate immediately after this call.  It is likely to be made
inaccurate by any external I/O operations including those made
on the system outside of this virtual machine.  This method
makes no guarantee that write operations to this file system
will succeed.

**Returns:** The number of unallocated bytes on the partition or `0L`
         if the abstract pathname does not name a partition or if this
         number cannot be obtained.  This value will be less than or
         equal to the total file system size returned by
         `getTotalSpace`.

**Since:** 1.6

**See also:** FileStore#getUnallocatedSpace

## File.getUsableSpace()

```java
public long getUsableSpace()
```

Returns the number of bytes available to this virtual machine on the
partition named by this abstract pathname.  If
the number of available bytes in the partition is greater than
`Long.MAX_VALUE`, then `Long.MAX_VALUE` will be returned.
When possible, this method checks for write permissions and other
operating system restrictions and will therefore usually provide a more
accurate estimate of how much new data can actually be written than
`getFreeSpace`.

 The returned number of available bytes is a hint, but not a
guarantee, that it is possible to use most or any of these bytes.  The
number of available bytes is most likely to be accurate immediately
after this call.  It is likely to be made inaccurate by any external
I/O operations including those made on the system outside of this
virtual machine.  This method makes no guarantee that write operations
to this file system will succeed.

**Returns:** The number of available bytes on the partition or `0L`
         if the abstract pathname does not name a partition or if this
         number cannot be obtained.  On systems where this information
         is not available, this method will be equivalent to a call to
         `getFreeSpace`.

**Since:** 1.6

**See also:** FileStore#getUsableSpace

## File.createTempFile(String, String, File)

```java
public static File createTempFile(String prefix, String suffix, File directory) throws IOException
```

Creates a new empty file in the specified directory, using the
given prefix and suffix strings to generate its name.  If this method
returns successfully then it is guaranteed that:

-  The file denoted by the returned abstract pathname did not exist
     before this method was invoked, and

-  Neither this method nor any of its variants will return the same
     abstract pathname again in the current invocation of the virtual
     machine.

This method provides only part of a temporary-file facility.  To arrange
for a file created by this method to be deleted automatically, use the
`deleteOnExit` method.

 The `prefix` argument must be at least three characters
long.  It is recommended that the prefix be a short, meaningful string
such as `"hjb"` or `"mail"`.  The
`suffix` argument may be `null`, in which case the
suffix `".tmp"` will be used.

 To create the new file, the prefix and the suffix may first be
adjusted to fit the limitations of the underlying platform.  If the
prefix is too long then it will be truncated, but its first three
characters will always be preserved.  If the suffix is too long then it
too will be truncated, but if it begins with a period character
(`'.'`) then the period and the first three characters
following it will always be preserved.  Once these adjustments have been
made the name of the new file will be generated by concatenating the
prefix, five or more internally-generated characters, and the suffix.

 If a file with the generated name cannot be created by the
underlying platform, then an `IOException` will be thrown.
This could occur for example if the supplied prefix or suffix contains
one or more characters not supported by the underlying file system.

 If the `directory` argument is `null` then the
system-dependent default temporary-file directory will be used.  The
default temporary-file directory is specified by the system property
`java.io.tmpdir`.  On UNIX systems the default value of this
property is typically `"/tmp"` or `"/var/tmp"`; on
Microsoft Windows systems it is typically `"C:\\WINNT\\TEMP"`.  A different
value may be given to this system property when the Java virtual machine
is invoked, but programmatic changes to this property are not guaranteed
to have any effect upon the temporary directory used by this method.

 If the `directory` argument is not `null` and its
abstract pathname is valid and denotes an existing, writable directory,
then the file will be created in that directory. Otherwise the file will
not be created and an `IOException` will be thrown.  Under no
circumstances will a directory be created at the location specified by
the `directory` argument.

Parameters:

- `prefix`: The prefix string to be used in generating the file's name; must be at least three characters long
- `suffix`: The suffix string to be used in generating the file's name; may be `null`, in which case the suffix `".tmp"` will be used
- `directory`: The directory in which the file is to be created, or `null` if the default temporary-file directory is to be used

**Returns:** An abstract pathname denoting a newly-created empty file

**Since:** 1.2

Throws:

- `IllegalArgumentException`: If the `prefix` argument contains fewer than three characters
- `IOException`: If a file could not be created

## File.createTempFile(String, String)

```java
public static File createTempFile(String prefix, String suffix) throws IOException
```

Creates an empty file in the default temporary-file directory, using
the given prefix and suffix to generate its name. Invoking this method
is equivalent to invoking java.lang.String, java.io.File) createTempFile(prefix, suffix, null).

 The Files.createTempFile method provides an alternative method to create an
empty file in the temporary-file directory. Files created by that method
may have more restrictive access permissions to files created by this
method and so may be more suited to security-sensitive applications.

Parameters:

- `prefix`: The prefix string to be used in generating the file's name; must be at least three characters long
- `suffix`: The suffix string to be used in generating the file's name; may be `null`, in which case the suffix `".tmp"` will be used

**Returns:** An abstract pathname denoting a newly-created empty file

**Since:** 1.2

**See also:** java.nio.file.Files#createTempDirectory(String,FileAttribute[])

Throws:

- `IllegalArgumentException`: If the `prefix` argument contains fewer than three characters
- `IOException`: If a file could not be created

## File.compareTo(File)

```java
public int compareTo(File pathname)
```

Compares two abstract pathnames lexicographically.  The ordering
defined by this method depends upon the underlying system.  On UNIX
systems, alphabetic case is significant in comparing pathnames; on
Microsoft Windows systems it is not.

Parameters:

- `pathname`: The abstract pathname to be compared to this abstract pathname

**Returns:** Zero if the argument is equal to this abstract pathname, a
         value less than zero if this abstract pathname is
         lexicographically less than the argument, or a value greater
         than zero if this abstract pathname is lexicographically
         greater than the argument

**Since:** 1.2

## File.equals(Object)

```java
public boolean equals(Object obj)
```

Tests this abstract pathname for equality with the given object.
Returns `true` if and only if the argument is not
`null` and is an abstract pathname that is the same as this
abstract pathname.  Whether or not two abstract
pathnames are equal depends upon the underlying operating system.
On UNIX systems, alphabetic case is significant in comparing pathnames;
on Microsoft Windows systems it is not.

Parameters:

- `obj`: The object to be compared with this abstract pathname

**API note:** This method only tests whether the abstract pathnames are equal;
         it does not access the file system and the file is not required
         to exist.

**Returns:** `true` if and only if the objects are the same;
         `false` otherwise

**See also:** #compareTo(File)

**See also:** java.nio.file.Files#isSameFile(Path,Path)

## File.hashCode()

```java
public int hashCode()
```

Computes a hash code for this abstract pathname.  Because equality of
abstract pathnames is inherently system-dependent, so is the computation
of their hash codes.  On UNIX systems, the hash code of an abstract
pathname is equal to the exclusive *or* of the hash code
of its pathname string and the decimal value
`1234321`.  On Microsoft Windows systems, the hash
code is equal to the exclusive *or* of the hash code of
its pathname string converted to lower case and the decimal
value `1234321`.  Locale is not taken into account on
lowercasing the pathname string.

**Returns:** A hash code for this abstract pathname

## File.toString()

```java
public String toString()
```

Returns the pathname string of this abstract pathname.  This is just the
string returned by the `getPath` method.

**Returns:** The string form of this abstract pathname

## File.toPath()

```java
public Path toPath()
```

Returns a java.nio.file.Path object constructed from
this abstract path. The resulting `Path` is associated with the
default-filesystem.

 The first invocation of this method works as if invoking it were
equivalent to evaluating the expression:

Subsequent invocations of this method return the same `Path`.

 If this abstract pathname is the empty abstract pathname then this
method returns a `Path` that may be used to access the current
user directory.

**Returns:** a `Path` constructed from this abstract path

**Since:** 1.7

**See also:** Path#toFile

Throws:

- `java.nio.file.InvalidPathException`: if a `Path` object cannot be constructed from the abstract path (see FileSystem.getPath)
