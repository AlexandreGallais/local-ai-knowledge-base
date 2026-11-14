---
title: "Files class (java.nio.file) (part 2 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file) (part 2 of 8)

## Files.createDirectories(Path, FileAttribute<?>...)

```java
public static Path createDirectories(Path dir, FileAttribute<?>... attrs) throws IOException
```

Creates a directory by creating all nonexistent parent directories first.
Unlike the createDirectory method, an exception
is not thrown if the directory could not be created because it already
exists.

 The `attrs` parameter is optional file-attributes to set atomically when creating the nonexistent
directories. Each file attribute is identified by its name. If more than one attribute of the same name is
included in the array then all but the last occurrence is ignored.

 If this method fails, then it may do so after creating some, but not
all, of the parent directories.

Parameters:

- `dir`: the directory to create
- `attrs`: an optional list of file attributes to set atomically when creating the directory

**Returns:** the directory

Throws:

- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the directory
- `FileAlreadyExistsException`: if `dir` exists but is not a directory *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.createTempFile(Path, String, String, FileAttribute<?>...)

```java
public static Path createTempFile(Path dir, String prefix, String suffix, FileAttribute<?>... attrs) throws IOException
```

Creates a new empty file in the specified directory, using the given
prefix and suffix strings to generate its name. The resulting
`Path` is associated with the same `FileSystem` as the given
directory.

 The details as to how the name of the file is constructed is
implementation dependent and therefore not specified. Where possible
the `prefix` and `suffix` are used to construct candidate
names in the same manner as the `java.io.File.createTempFile(String,String,File)` method.

 As with the `File.createTempFile` methods, this method is only
part of a temporary-file facility. Where used as a *work file*,
the resulting file may be opened using the DELETE_ON_CLOSE option so that the
file is deleted when the appropriate `close` method is invoked.
Alternatively, a shutdown-hook, or the
`java.io.File.deleteOnExit` mechanism may be used to delete the
file automatically.

 The `attrs` parameter is optional file-attributes to set atomically when creating the file. Each attribute
is identified by its name. If more than one
attribute of the same name is included in the array then all but the last
occurrence is ignored. When no file attributes are specified, then the
resulting file may have more restrictive access permissions than files
created by the `java.io.File.createTempFile(String,String,File)`
method.

Parameters:

- `dir`: the path to directory in which to create the file
- `prefix`: the prefix string to be used in generating the file's name; may be `null`
- `suffix`: the suffix string to be used in generating the file's name; may be `null`, in which case "`.tmp`" is used
- `attrs`: an optional list of file attributes to set atomically when creating the file

**Returns:** the path to the newly created file that did not exist before
         this method was invoked

Throws:

- `IllegalArgumentException`: if the prefix or suffix parameters cannot be used to generate a candidate file name
- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the directory
- `IOException`: if an I/O error occurs or `dir` does not exist

## Files.createTempFile(String, String, FileAttribute<?>...)

```java
public static Path createTempFile(String prefix, String suffix, FileAttribute<?>... attrs) throws IOException
```

Creates an empty file in the default temporary-file directory, using
the given prefix and suffix to generate its name. The resulting `Path` is associated with the default `FileSystem`.

 This method works in exactly the manner specified by the
`createTempFile(Path,String,String,FileAttribute[])` method for
the case that the `dir` parameter is the temporary-file directory.

Parameters:

- `prefix`: the prefix string to be used in generating the file's name; may be `null`
- `suffix`: the suffix string to be used in generating the file's name; may be `null`, in which case "`.tmp`" is used
- `attrs`: an optional list of file attributes to set atomically when creating the file

**Returns:** the path to the newly created file that did not exist before
         this method was invoked

Throws:

- `IllegalArgumentException`: if the prefix or suffix parameters cannot be used to generate a candidate file name
- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the directory
- `IOException`: if an I/O error occurs or the temporary-file directory does not exist

## Files.createTempDirectory(Path, String, FileAttribute<?>...)

```java
public static Path createTempDirectory(Path dir, String prefix, FileAttribute<?>... attrs) throws IOException
```

Creates a new directory in the specified directory, using the given
prefix to generate its name.  The resulting `Path` is associated
with the same `FileSystem` as the given directory.

 The details as to how the name of the directory is constructed is
implementation dependent and therefore not specified. Where possible
the `prefix` is used to construct candidate names.

 As with the `createTempFile` methods, this method is only
part of a temporary-file facility. A shutdown-hook, or the `java.io.File.deleteOnExit` mechanism may be
used to delete the directory automatically.

 The `attrs` parameter is optional file-attributes to set atomically when creating the directory. Each
attribute is identified by its name. If more
than one attribute of the same name is included in the array then all but
the last occurrence is ignored. When no file attributes are specified,
then the resulting directory may have more restrictive access
permissions than directories created by the
FileAttribute<?>...) method.

Parameters:

- `dir`: the path to directory in which to create the directory
- `prefix`: the prefix string to be used in generating the directory's name; may be `null`
- `attrs`: an optional list of file attributes to set atomically when creating the directory

**Returns:** the path to the newly created directory that did not exist before
         this method was invoked

Throws:

- `IllegalArgumentException`: if the prefix cannot be used to generate a candidate directory name
- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the directory
- `IOException`: if an I/O error occurs or `dir` does not exist

## Files.createTempDirectory(String, FileAttribute<?>...)

```java
public static Path createTempDirectory(String prefix, FileAttribute<?>... attrs) throws IOException
```

Creates a new directory in the default temporary-file directory, using
the given prefix to generate its name. The resulting `Path` is
associated with the default `FileSystem`.

 This method works in exactly the manner specified by `createTempDirectory(Path,String,FileAttribute[])` method for the case
that the `dir` parameter is the temporary-file directory.

Parameters:

- `prefix`: the prefix string to be used in generating the directory's name; may be `null`
- `attrs`: an optional list of file attributes to set atomically when creating the directory

**Returns:** the path to the newly created directory that did not exist before
         this method was invoked

Throws:

- `IllegalArgumentException`: if the prefix cannot be used to generate a candidate directory name
- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the directory
- `IOException`: if an I/O error occurs or the temporary-file directory does not exist

## Files.createSymbolicLink(Path, Path, FileAttribute<?>...)

```java
public static Path createSymbolicLink(Path link, Path target, FileAttribute<?>... attrs) throws IOException
```

Creates a symbolic link to a target *(optional operation)*.

 The `target` parameter is the target of the link. It may be an
absolute or relative path and may not exist. When
the target is a relative path then file system operations on the resulting
link are relative to the path of the link.

 The `attrs` parameter is optional attributes to set atomically when creating the link. Each attribute is
identified by its name. If more than one attribute
of the same name is included in the array then all but the last occurrence
is ignored.

 Where symbolic links are supported, but the underlying `FileStore`
does not support symbolic links, then this may fail with an `IOException`. Additionally, some operating systems may require that the
Java virtual machine be started with implementation specific privileges to
create symbolic links, in which case this method may throw `IOException`.

Parameters:

- `link`: the path of the symbolic link to create
- `target`: the target of the symbolic link
- `attrs`: the array of attributes to set atomically when creating the symbolic link

**Returns:** the path to the symbolic link

Throws:

- `UnsupportedOperationException`: if the implementation does not support symbolic links or the array contains an attribute that cannot be set atomically when creating the symbolic link
- `FileAlreadyExistsException`: if a file with the name already exists *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.createLink(Path, Path)

```java
public static Path createLink(Path link, Path existing) throws IOException
```

Creates a new link (directory entry) for an existing file *(optional
operation)*.

 The `link` parameter locates the directory entry to create.
The `existing` parameter is the path to an existing file. This
method creates a new directory entry for the file so that it can be
accessed using `link` as the path. On some file systems this is
known as creating a "hard link". If the `existing` parameter
is the path to a symbolic link, then whether the new link is for the
target of the symbolic link or for the symbolic link itself is platform
dependent and therefore not specified. Whether the file attributes are
maintained for the file or for each directory entry is file system
specific and therefore not specified. Typically, a file system requires
that all links (directory entries) for a file be on the same file system.
Furthermore, on some platforms, the Java virtual machine may require to
be started with implementation specific privileges to create hard links
or to create links to directories.

Parameters:

- `link`: the link (directory entry) to create
- `existing`: a path to an existing file

**Returns:** the path to the link (directory entry)

Throws:

- `UnsupportedOperationException`: if the implementation does not support adding an existing file to a directory
- `FileAlreadyExistsException`: if the entry could not otherwise be created because a file of that name already exists *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.delete(Path)

```java
public static void delete(Path path) throws IOException
```

Deletes a file.

 An implementation may require to examine the file to determine if the
file is a directory. Consequently this method may not be atomic with respect
to other file system operations.  If the file is a symbolic link then the
symbolic link itself, not the final target of the link, is deleted.

 If the file is a directory then the directory must be empty. In some
implementations a directory has entries for special files or links that
are created when the directory is created. In such implementations a
directory is considered empty when only the special entries exist.
This method can be used with the walkFileTree
method to delete a directory and all entries in the directory, or an
entire *file-tree* where required.

 On some operating systems it may not be possible to remove a file when
it is open and in use by this Java virtual machine or other programs.

Parameters:

- `path`: the path to the file to delete

Throws:

- `NoSuchFileException`: if the file does not exist *(optional specific exception)*
- `DirectoryNotEmptyException`: if the file is a directory and could not otherwise be deleted because the directory is not empty *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.deleteIfExists(Path)

```java
public static boolean deleteIfExists(Path path) throws IOException
```

Deletes a file if it exists.

 As with the delete(Path) method, an
implementation may need to examine the file to determine if the file is a
directory. Consequently this method may not be atomic with respect to
other file system operations.  If the file is a symbolic link, then the
symbolic link itself, not the final target of the link, is deleted.

 If the file is a directory then the directory must be empty. In some
implementations a directory has entries for special files or links that
are created when the directory is created. In such implementations a
directory is considered empty when only the special entries exist.

 On some operating systems it may not be possible to remove a file when
it is open and in use by this Java virtual machine or other programs.

Parameters:

- `path`: the path to the file to delete

**Returns:** `true` if the file was deleted by this method; `false` if the file could not be deleted because it did not
         exist

Throws:

- `DirectoryNotEmptyException`: if the file is a directory and could not otherwise be deleted because the directory is not empty *(optional specific exception)*
- `IOException`: if an I/O error occurs
