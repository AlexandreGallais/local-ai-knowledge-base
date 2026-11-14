---
title: "File class (java.io) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/File.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# File class (java.io) (part 3 of 4)

## File.listFiles()

```java
public File[] listFiles()
```

Returns an array of abstract pathnames denoting the files in the
directory denoted by this abstract pathname.

 If this abstract pathname does not denote a directory, then this
method returns `null`.  Otherwise an array of `File` objects
is returned, one for each file or directory in the directory.  Pathnames
denoting the directory itself and the directory's parent directory are
not included in the result.  Each resulting abstract pathname is
constructed from this abstract pathname using the String) File(File, String) constructor.  Therefore if this
pathname is absolute then each resulting pathname is absolute; if this
pathname is relative then each resulting pathname will be relative to
the same directory.

 There is no guarantee that the name strings in the resulting array
will appear in any specific order; they are not, in particular,
guaranteed to appear in alphabetical order.

 Note that the `java.nio.file.Files` class defines the newDirectoryStream method
to open a directory and iterate over the names of the files in the
directory. This may use less resources when working with very large
directories.

**Returns:** An array of abstract pathnames denoting the files and
         directories in the directory denoted by this abstract pathname.
         The array will be empty if the directory is empty.  Returns
         `null` if this abstract pathname does not denote a
         directory, or if an I/O error occurs.

**Since:** 1.2

## File.listFiles(FilenameFilter)

```java
public File[] listFiles(FilenameFilter filter)
```

Returns an array of abstract pathnames denoting the files and
directories in the directory denoted by this abstract pathname that
satisfy the specified filter.  The behavior of this method is the same
as that of the `listFiles()` method, except that the pathnames in
the returned array must satisfy the filter.  If the given `filter`
is `null` then all pathnames are accepted.  Otherwise, a pathname
satisfies the filter if and only if the value `true` results when
the FilenameFilter.accept(File, String) method of the filter is
invoked on this abstract pathname and the name of a file or directory in
the directory that it denotes.

Parameters:

- `filter`: A filename filter

**Returns:** An array of abstract pathnames denoting the files and
         directories in the directory denoted by this abstract pathname.
         The array will be empty if the directory is empty.  Returns
         `null` if this abstract pathname does not denote a
         directory, or if an I/O error occurs.

**Since:** 1.2

**See also:** java.nio.file.Files#newDirectoryStream(Path,String)

## File.listFiles(FileFilter)

```java
public File[] listFiles(FileFilter filter)
```

Returns an array of abstract pathnames denoting the files and
directories in the directory denoted by this abstract pathname that
satisfy the specified filter.  The behavior of this method is the same
as that of the `listFiles()` method, except that the pathnames in
the returned array must satisfy the filter.  If the given `filter`
is `null` then all pathnames are accepted.  Otherwise, a pathname
satisfies the filter if and only if the value `true` results when
the FileFilter.accept(File) method of the
filter is invoked on the pathname.

Parameters:

- `filter`: A file filter

**Returns:** An array of abstract pathnames denoting the files and
         directories in the directory denoted by this abstract pathname.
         The array will be empty if the directory is empty.  Returns
         `null` if this abstract pathname does not denote a
         directory, or if an I/O error occurs.

**Since:** 1.2

**See also:** java.nio.file.Files#newDirectoryStream(Path,java.nio.file.DirectoryStream.Filter)

## File.mkdir()

```java
public boolean mkdir()
```

Creates the directory named by this abstract pathname.

**Returns:** `true` if and only if the directory was
         created; `false` otherwise

## File.mkdirs()

```java
public boolean mkdirs()
```

Creates the directory named by this abstract pathname, including any
necessary but nonexistent parent directories.  Note that if this
operation fails it may have succeeded in creating some of the necessary
parent directories.

**Returns:** `true` if and only if the directory was created,
         along with all necessary parent directories; `false`
         otherwise

## File.renameTo(File)

```java
public boolean renameTo(File dest)
```

Renames the file denoted by this abstract pathname.  If this pathname
denotes a symbolic link, then the link itself, not its target, will be
renamed.

 Many aspects of the behavior of this method are inherently
platform-dependent: The rename operation might not be able to move a
file from one filesystem to another, it might not be atomic, and it
might not succeed if a file with the destination abstract pathname
already exists.  The return value should always be checked to make sure
that the rename operation was successful.  As instances of `File`
are immutable, this File object is not changed to name the destination
file or directory.

 Note that the `java.nio.file.Files` class defines the move method to move or rename a file in a
platform independent manner.

Parameters:

- `dest`: The new abstract pathname for the named file

**Returns:** `true` if and only if the renaming succeeded;
         `false` otherwise

Throws:

- `NullPointerException`: If parameter `dest` is `null`

## File.setLastModified(long)

```java
public boolean setLastModified(long time)
```

Sets the last-modified time of the file or directory named by this
abstract pathname.

 All platforms support file-modification times to the nearest second,
but some provide more precision.  The argument will be truncated to fit
the supported precision.  If the operation succeeds and no intervening
operations on the file take place, then the next invocation of the
`lastModified` method will return the (possibly
truncated) `time` argument that was passed to this method.

Parameters:

- `time`: The new last-modified time, measured in milliseconds since the epoch (00:00:00 GMT, January 1, 1970)

**Returns:** `true` if and only if the operation succeeded;
         `false` otherwise

**Since:** 1.2

Throws:

- `IllegalArgumentException`: If the argument is negative

## File.setReadOnly()

```java
public boolean setReadOnly()
```

Marks the file or directory named by this abstract pathname so that
only read operations are allowed. After invoking this method the file
or directory will not change until it is either deleted or marked
to allow write access. On some platforms it may be possible to start the
Java virtual machine with special privileges that allow it to modify
files that are marked read-only. Whether or not a read-only file or
directory may be deleted depends upon the underlying system.

**Returns:** `true` if and only if the operation succeeded;
         `false` otherwise

**Since:** 1.2

## File.setWritable(boolean, boolean)

```java
public boolean setWritable(boolean writable, boolean ownerOnly)
```

Sets the owner's or everybody's write permission for this abstract
pathname. On some platforms it may be possible to start the Java virtual
machine with special privileges that allow it to modify files that
disallow write operations.

 The `java.nio.file.Files` class defines methods that operate on
file attributes including file permissions. This may be used when finer
manipulation of file permissions is required.

Parameters:

- `writable`: If `true`, sets the access permission to allow write operations; if `false` to disallow write operations
- `ownerOnly`: If `true`, the write permission applies only to the owner's write permission; otherwise, it applies to everybody. If the underlying file system can not distinguish the owner's write permission from that of others, then the permission will apply to everybody, regardless of this value.

**Returns:** `true` if and only if the operation succeeded. The
         operation will fail if the user does not have permission to change
         the access permissions of this abstract pathname.

**Since:** 1.6

## File.setWritable(boolean)

```java
public boolean setWritable(boolean writable)
```

A convenience method to set the owner's write permission for this abstract
pathname. On some platforms it may be possible to start the Java virtual
machine with special privileges that allow it to modify files that
disallow write operations.

 An invocation of this method of the form `file.setWritable(arg)`
behaves in exactly the same way as the invocation

Parameters:

- `writable`: If `true`, sets the access permission to allow write operations; if `false` to disallow write operations

**Returns:** `true` if and only if the operation succeeded.  The
         operation will fail if the user does not have permission to
         change the access permissions of this abstract pathname.

**Since:** 1.6

## File.setReadable(boolean, boolean)

```java
public boolean setReadable(boolean readable, boolean ownerOnly)
```

Sets the owner's or everybody's read permission for this abstract
pathname. On some platforms it may be possible to start the Java virtual
machine with special privileges that allow it to read files that are
marked as unreadable.

 The `java.nio.file.Files` class defines methods that operate on
file attributes including file permissions. This may be used when finer
manipulation of file permissions is required.

 If the platform supports setting a file's read permission, but
the user does not have permission to change the access permissions of
this abstract pathname, then the operation will fail. If the platform
does not support setting a file's read permission, this method does
nothing and returns the value of the `readable` parameter.

Parameters:

- `readable`: If `true`, sets the access permission to allow read operations; if `false` to disallow read operations
- `ownerOnly`: If `true`, the read permission applies only to the owner's read permission; otherwise, it applies to everybody. If the underlying file system can not distinguish the owner's read permission from that of others, then the permission will apply to everybody, regardless of this value.

**Returns:** `true` if the operation succeeds, `false` if it
         fails, or the value of the `readable` parameter if
         setting the read permission is not supported.

**Since:** 1.6

## File.setReadable(boolean)

```java
public boolean setReadable(boolean readable)
```

A convenience method to set the owner's read permission for this abstract
pathname. On some platforms it may be possible to start the Java virtual
machine with special privileges that allow it to read files that are
marked as unreadable.

An invocation of this method of the form `file.setReadable(arg)`
behaves in exactly the same way as the invocation

 If the platform supports setting a file's read permission, but
the user does not have permission to change the access permissions of
this abstract pathname, then the operation will fail. If the platform
does not support setting a file's read permission, this method does
nothing and returns the value of the `readable` parameter.

Parameters:

- `readable`: If `true`, sets the access permission to allow read operations; if `false` to disallow read operations

**Returns:** `true` if the operation succeeds, `false` if it
         fails, or the value of the `readable` parameter if
         setting the read permission is not supported.

**Since:** 1.6

## File.setExecutable(boolean, boolean)

```java
public boolean setExecutable(boolean executable, boolean ownerOnly)
```

Sets the owner's or everybody's execute permission for this abstract
pathname. On some platforms it may be possible to start the Java virtual
machine with special privileges that allow it to execute files that are
not marked executable.

 The `java.nio.file.Files` class defines methods that operate on
file attributes including file permissions. This may be used when finer
manipulation of file permissions is required.

 If the platform supports setting a file's execute permission, but
the user does not have permission to change the access permissions of
this abstract pathname, then the operation will fail. If the platform
does not support setting a file's execute permission, this method does
nothing and returns the value of the `executable` parameter.

Parameters:

- `executable`: If `true`, sets the access permission to allow execute operations; if `false` to disallow execute operations
- `ownerOnly`: If `true`, the execute permission applies only to the owner's execute permission; otherwise, it applies to everybody. If the underlying file system can not distinguish the owner's execute permission from that of others, then the permission will apply to everybody, regardless of this value.

**Returns:** `true` if the operation succeeds, `false` if it
         fails, or the value of the `executable` parameter if
         setting the execute permission is not supported.

**Since:** 1.6

## File.setExecutable(boolean)

```java
public boolean setExecutable(boolean executable)
```

A convenience method to set the owner's execute permission for this
abstract pathname. On some platforms it may be possible to start the Java
virtual machine with special privileges that allow it to execute files
that are not marked executable.

An invocation of this method of the form `file.setExecutable(arg)`
behaves in exactly the same way as the invocation

 If the platform supports setting a file's execute permission, but
the user does not have permission to change the access permissions of
this abstract pathname, then the operation will fail. If the platform
does not support setting a file's execute permission, this method does
nothing and returns the value of the `executable` parameter.

Parameters:

- `executable`: If `true`, sets the access permission to allow execute operations; if `false` to disallow execute operations

**Returns:** `true` if the operation succeeds, `false` if it
         fails, or the value of the `executable` parameter if
         setting the execute permission is not supported.

**Since:** 1.6

## File.canExecute()

```java
public boolean canExecute()
```

Tests whether the application can execute the file denoted by this
abstract pathname. On some platforms it may be possible to start the
Java virtual machine with special privileges that allow it to execute
files that are not marked executable. Consequently, this method may return
`true` even though the file does not have execute permissions.

**Returns:** `true` if and only if the abstract pathname exists
         *and* the application is allowed to execute the file

**Since:** 1.6
