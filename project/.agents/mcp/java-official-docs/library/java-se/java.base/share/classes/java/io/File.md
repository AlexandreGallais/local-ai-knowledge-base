---
title: "File class (java.io) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/File.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# File class (java.io)

```java
public class File implements Serializable, Comparable<File>
```

An abstract representation of file and directory pathnames.

 User interfaces and operating systems use system-dependent *pathname
strings* to name files and directories.  This class presents an
abstract, system-independent view of hierarchical pathnames.  An
*abstract pathname* has two components:

-  An optional system-dependent *prefix* string,
     such as a disk-drive specifier, `"/"` for the UNIX root
     directory, or `"\\\\"` for a Microsoft Windows UNC pathname, and

-  A sequence of zero or more string *names*.

The first name in an abstract pathname may be a directory name or, in the
case of Microsoft Windows UNC pathnames, a hostname.  Each subsequent name
in an abstract pathname denotes a directory; the last name may denote
either a directory or a file.  The *empty* abstract pathname has no
prefix and an empty name sequence.  Accessing a file with the empty abstract
pathname is equivalent to accessing the current user directory.

 The conversion of a pathname string to or from an abstract pathname is
inherently system-dependent.  When an abstract pathname is converted into a
pathname string, each name is separated from the next by a single copy of
the default *separator character*.  The default name-separator
character is defined by the system property `file.separator`, and
is made available in the public static fields `separator` and `separatorChar` of this class.
When a pathname string is converted into an abstract pathname, the names
within it may be separated by the default name-separator character or by any
other name-separator character that is supported by the underlying system.

 A pathname, whether abstract or in string form, may be either
*absolute* or *relative*.  An absolute pathname is complete in
that no other information is required in order to locate the file that it
denotes.  A relative pathname, in contrast, must be interpreted in terms of
information taken from some other pathname.  By default the classes in the
`java.io` package always resolve relative pathnames against the
current user directory.  This directory is named by the system property
`user.dir`, and is typically the directory in which the Java
virtual machine was invoked.

 Unless otherwise noted, symbolic links
are automatically redirected to the *target* of the link, whether they
are provided by a pathname string or via a `File` object.

 The *parent* of an abstract pathname may be obtained by invoking
the `getParent` method of this class and consists of the pathname's
prefix and each name in the pathname's name sequence except for the last.
Each directory's absolute pathname is an ancestor of any `File`
object with an absolute abstract pathname which begins with the directory's
absolute pathname.  For example, the directory denoted by the abstract
pathname `"/usr"` is an ancestor of the directory denoted by the
pathname `"/usr/local/bin"`.

 The prefix concept is used to handle root directories on UNIX platforms,
and drive specifiers, root directories and UNC pathnames on Microsoft Windows platforms,
as follows:

-  For UNIX platforms, the prefix of an absolute pathname is always
`"/"`.  Relative pathnames have no prefix.  The abstract pathname
denoting the root directory has the prefix `"/"` and an empty
name sequence.

-  For Microsoft Windows platforms, the prefix of a pathname that contains a drive
specifier consists of the drive letter followed by `":"` and
possibly followed by `"\\"` if the pathname is absolute.  The
prefix of a UNC pathname is `"\\\\"`; the hostname and the share
name are the first two names in the name sequence.  A relative pathname that
does not specify a drive has no prefix.

 Instances of this class may or may not denote an actual file-system
object such as a file or a directory.  If it does denote such an object
then that object resides in a *partition*.  A partition is an
operating system-specific portion of storage for a file system.  A single
storage device (e.g. a physical disk-drive, flash memory, CD-ROM) may
contain multiple partitions.  The object, if any, will reside on the
partition named by some ancestor of the absolute
form of this pathname.

 A file system may implement restrictions to certain operations on the
actual file-system object, such as reading, writing, and executing.  These
restrictions are collectively known as *access permissions*.  The file
system may have multiple sets of access permissions on a single object.
For example, one set may apply to the object's *owner*, and another
may apply to all other users.  The access permissions on an object may
cause some methods in this class to fail.

 Instances of the `File` class are immutable; that is, once
created, the abstract pathname represented by a `File` object
will never change.

#### Interoperability with `java.nio.file` package

 The `java.nio.file`
package defines interfaces and classes for the Java virtual machine to access
files, file attributes, and file systems. This API may be used to overcome
many of the limitations of the `java.io.File` class.
The toPath method may be used to obtain a `Path` that uses the abstract path represented by a `File` object to
locate a file. The resulting `Path` may be used with the `java.nio.file.Files` class to provide more efficient and extensive access to
additional file operations, file attributes, and I/O exceptions to help
diagnose errors when an operation on a file fails.

**Since:** 1.0

## File.separatorChar

```java
public static final char separatorChar
```

The system-dependent default name-separator character.  This field is
initialized to contain the first character of the value of the system
property `file.separator`.  On UNIX systems the value of this
field is `'/'`; on Microsoft Windows systems it is `'\\'`.

**See also:** java.lang.System#getProperty(java.lang.String)

## File.separator

```java
public static final String separator
```

The system-dependent default name-separator character, represented as a
string for convenience.  This string contains a single character, namely
`separatorChar`.

## File.pathSeparatorChar

```java
public static final char pathSeparatorChar
```

The system-dependent path-separator character.  This field is
initialized to contain the first character of the value of the system
property `path.separator`.  This character is used to
separate filenames in a sequence of files given as a *path list*.
On UNIX systems, this character is `':'`; on Microsoft Windows systems it
is `';'`.

**See also:** java.lang.System#getProperty(java.lang.String)

## File.pathSeparator

```java
public static final String pathSeparator
```

The system-dependent path-separator character, represented as a string
for convenience.  This string contains a single character, namely
`pathSeparatorChar`.

## File.File(String)

```java
public File(String pathname)
```

Creates a new `File` instance by converting the given
pathname string into an abstract pathname.  If the given string is
the empty string, then the result is the empty abstract pathname.

Parameters:

- `pathname`: A pathname string

Throws:

- `NullPointerException`: If the `pathname` argument is `null`

## File.File(String, String)

```java
public File(String parent, String child)
```

Creates a new `File` instance from a parent pathname string
and a child pathname string.

 If `parent` is `null` then the new
`File` instance is created as if by invoking the
single-argument `File` constructor on the given
`child` pathname string.

 Otherwise the `parent` pathname string is taken to denote
a directory, and the `child` pathname string is taken to
denote either a directory or a file.  If the `child` pathname
string is absolute then it is converted into a relative pathname in a
system-dependent way.  If `parent` is the empty string then
the new `File` instance is created by converting
`child` into an abstract pathname and resolving the result
against a system-dependent default directory.  Otherwise each pathname
string is converted into an abstract pathname and the child abstract
pathname is resolved against the parent.

Parameters:

- `parent`: The parent pathname string
- `child`: The child pathname string

Throws:

- `NullPointerException`: If `child` is `null`

## File.File(File, String)

```java
public File(File parent, String child)
```

Creates a new `File` instance from a parent abstract
pathname and a child pathname string.

 If `parent` is `null` then the new
`File` instance is created as if by invoking the
single-argument `File` constructor on the given
`child` pathname string.

 Otherwise the `parent` abstract pathname is taken to
denote a directory, and the `child` pathname string is taken
to denote either a directory or a file.  If the `child`
pathname string is absolute then it is converted into a relative
pathname in a system-dependent way.  If `parent` is the empty
abstract pathname then the new `File` instance is created by
converting `child` into an abstract pathname and resolving
the result against a system-dependent default directory.  Otherwise each
pathname string is converted into an abstract pathname and the child
abstract pathname is resolved against the parent.

Parameters:

- `parent`: The parent abstract pathname
- `child`: The child pathname string

Throws:

- `NullPointerException`: If `child` is `null`

## File.File(URI)

```java
public File(URI uri)
```

Creates a new `File` instance by converting the given
`file:` URI into an abstract pathname.

 The exact form of a `file:` URI is system-dependent, hence
the transformation performed by this constructor is also
system-dependent.

 For a given abstract pathname *f* it is guaranteed that

`
new File(`* f*`.toURI()).equals(`* f*`.getAbsoluteFile())
`

so long as the original abstract pathname, the URI, and the new abstract
pathname are all created in (possibly different invocations of) the same
Java virtual machine.  This relationship typically does not hold,
however, when a `file:` URI that is created in a virtual machine
on one operating system is converted into an abstract pathname in a
virtual machine on a different operating system.

Parameters:

- `uri`: An absolute, hierarchical URI with a scheme equal to `"file"`, a non-empty path component, and undefined authority, query, and fragment components

**See also:** #toURI()

**See also:** java.net.URI

**Since:** 1.4

Throws:

- `NullPointerException`: If `uri` is `null`
- `IllegalArgumentException`: If the preconditions on the parameter do not hold

## File.getName()

```java
public String getName()
```

Returns the name of the file or directory denoted by this abstract
pathname.  This is just the last name in the pathname's name
sequence.  If the pathname's name sequence is empty, then the empty
string is returned.

**Returns:** The name of the file or directory denoted by this abstract
         pathname, or the empty string if this pathname's name sequence
         is empty

## File.getParent()

```java
public String getParent()
```

Returns the pathname string of this abstract pathname's parent, or
`null` if this pathname does not name a parent directory.

 The *parent* of an abstract pathname consists of the
pathname's prefix, if any, and each name in the pathname's name
sequence except for the last.  If the name sequence is empty then
the pathname does not name a parent directory.

**Returns:** The pathname string of the parent directory named by this
         abstract pathname, or `null` if this pathname
         does not name a parent

## File.getParentFile()

```java
public File getParentFile()
```

Returns the abstract pathname of this abstract pathname's parent,
or `null` if this pathname does not name a parent
directory.

 The *parent* of an abstract pathname consists of the
pathname's prefix, if any, and each name in the pathname's name
sequence except for the last.  If the name sequence is empty then
the pathname does not name a parent directory.

**Returns:** The abstract pathname of the parent directory named by this
         abstract pathname, or `null` if this pathname
         does not name a parent

**Since:** 1.2

## File.getPath()

```java
public String getPath()
```

Converts this abstract pathname into a pathname string.  The resulting
string uses the default name-separator character to
separate the names in the name sequence.

**Returns:** The string form of this abstract pathname

## File.isAbsolute()

```java
public boolean isAbsolute()
```

Tests whether this abstract pathname is absolute.  The definition of
absolute pathname is system dependent.  On UNIX systems, a pathname is
absolute if its prefix is `"/"`.  On Microsoft Windows systems, a
pathname is absolute if its prefix is a drive specifier followed by
`"\\"`, or if its prefix is `"\\\\"`.

**Returns:** `true` if this abstract pathname is absolute,
         `false` otherwise

## File.getAbsolutePath()

```java
public String getAbsolutePath()
```

Returns the absolute pathname string of this abstract pathname.

 If this abstract pathname is already absolute, then the pathname
string is simply returned as if by the `getPath`
method.  If this abstract pathname is the empty abstract pathname then
the pathname string of the current user directory, which is named by the
system property `user.dir`, is returned.  Otherwise this
pathname is resolved in a system-dependent way.  On UNIX systems, a
relative pathname is made absolute by resolving it against the current
user directory.  On Microsoft Windows systems, a relative pathname is made absolute
by resolving it against the current directory of the drive named by the
pathname, if any; if not, it is resolved against the current user
directory.

**Returns:** The absolute pathname string denoting the same file or
         directory as this abstract pathname

**See also:** java.io.File#isAbsolute()

## File.getAbsoluteFile()

```java
public File getAbsoluteFile()
```

Returns the absolute form of this abstract pathname.  Equivalent to
`new File(this.`getAbsolutePath`)`.

**Returns:** The absolute abstract pathname denoting the same file or
         directory as this abstract pathname

**Since:** 1.2
