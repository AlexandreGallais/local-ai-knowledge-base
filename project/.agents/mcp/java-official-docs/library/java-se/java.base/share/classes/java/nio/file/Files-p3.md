---
title: "Files class (java.nio.file) (part 3 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file) (part 3 of 8)

## Files.copy(Path, Path, CopyOption...)

```java
public static Path copy(Path source, Path target, CopyOption... options) throws IOException
```

Copy a file to a target file.

 This method copies a file to the target file with the `options` parameter specifying how the copy is performed. By default, the
copy fails if the target file already exists or is a symbolic link,
except if the source and target are the same file, in
which case the method completes without copying the file. File attributes
are not required to be copied to the target file. If symbolic links are
supported, and the file is a symbolic link, then the final target of the
link is copied. If the file is a directory then an empty directory is
created in the target location (entries in the directory are not
copied). This method can be used with the walkFileTree method to copy a directory and all entries in the directory,
or an entire *file-tree* where required.

 The `options` parameter may include any of the following:

Options

 Option Description

   REPLACE_EXISTING
   Replace an existing file. A non-empty directory cannot be
    replaced. If the target file exists and is a symbolic link, then the
    symbolic link itself, not the target of the link, is replaced.

   COPY_ATTRIBUTES
   Attempts to copy the file attributes associated with this file to
    the target file. The exact file attributes that are copied is platform
    and file system dependent and therefore unspecified. Minimally, the
    last-modified-time is
    copied to the target file if supported by both the source and target
    file stores. Copying of file timestamps may result in precision
    loss.

   NOFOLLOW_LINKS
   Symbolic links are not followed. If the file is a symbolic link,
    then the symbolic link itself, not the target of the link, is copied.
    It is implementation specific if file attributes can be copied to the
    new link. In other words, the `COPY_ATTRIBUTES` option may be
    ignored when copying a symbolic link.

 An implementation of this interface may support additional
implementation specific options.

 Copying a file is not an atomic operation. If an `IOException`
is thrown, then it is possible that the target file is incomplete or some
of its file attributes have not been copied from the source file. When
the `REPLACE_EXISTING` option is specified and the target file
exists, then the target file is replaced. The check for the existence of
the file and the creation of the new file may not be atomic with respect
to other file system activities.

 **Usage Example:**
Suppose we want to copy a file into a directory, giving it the same file
name as the source file:

Parameters:

- `source`: the path to the file to copy
- `target`: the path to the target file (may be associated with a different provider to the source path)
- `options`: options specifying how the copy should be done

**Returns:** the path to the target file

Throws:

- `UnsupportedOperationException`: if the array contains a copy option that is not supported
- `FileAlreadyExistsException`: if the target file exists but cannot be replaced because the `REPLACE_EXISTING` option is not specified *(optional specific exception)*
- `DirectoryNotEmptyException`: the `REPLACE_EXISTING` option is specified but the file cannot be replaced because it is a non-empty directory *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.move(Path, Path, CopyOption...)

```java
public static Path move(Path source, Path target, CopyOption... options) throws IOException
```

Move or rename a file to a target file.

 By default, this method attempts to move the file to the target
file, failing if the target file exists except if the source and
target are the same file, in which case this method
has no effect. If the file is a symbolic link then the symbolic link
itself, not the target of the link, is moved. This method may be
invoked to move an empty directory. In some implementations a directory
has entries for special files or links that are created when the
directory is created. In such implementations a directory is considered
empty when only the special entries exist. When invoked to move a
directory that is not empty then the directory is moved if it does not
require moving the entries in the directory.  For example, renaming a
directory on the same `FileStore` will usually not require moving
the entries in the directory. When moving a directory requires that its
entries be moved then this method fails (by throwing an `IOException`). To move a *file tree* may involve copying rather
than moving directories and this can be done using the copy method in conjunction with the Files.walkFileTree utility method.

 The `options` parameter may include any of the following:

Options

 Option Description

   REPLACE_EXISTING
   Replace an existing file. A non-empty directory cannot be
    replaced. If the target file exists and is a symbolic link, then the
    symbolic link itself, not the target of the link, is replaced.

   ATOMIC_MOVE
   The move is performed as an atomic file system operation and all
    other options are ignored. If the target file exists then it is
    implementation specific if the existing file is replaced or this method
    fails by throwing an `IOException`. If the move cannot be
    performed as an atomic file system operation then `AtomicMoveNotSupportedException` is thrown. This can arise, for
    example, when the target location is on a different `FileStore`
    and would require that the file be copied, or target location is
    associated with a different provider to this object.

If the `ATOMIC_MOVE` option is not specified, then the check
whether the target file exists and the actual move might not be atomic
with respect to other filesystem activities.

 An implementation of this interface may support additional
implementation specific options.

 Moving a file will copy the last-modified-time to the target
file if supported by both source and target file stores. Copying of file
timestamps may result in precision loss. An implementation may also
attempt to copy other file attributes but is not required to fail if the
file attributes cannot be copied. When the move is performed as
a non-atomic operation, and an `IOException` is thrown, then the
state of the files is not defined. The original file and the target file
may both exist, the target file may be incomplete or some of its file
attributes may not been copied from the original file.

 **Usage Examples:**
Suppose we want to rename a file to "newname", keeping the file in the
same directory:

Alternatively, suppose we want to move a file to new directory, keeping
the same file name, and replacing any existing file of that name in the
directory:

Parameters:

- `source`: the path to the file to move
- `target`: the path to the target file (may be associated with a different provider to the source path)
- `options`: options specifying how the move should be done

**Returns:** the path to the target file

Throws:

- `UnsupportedOperationException`: if the array contains a copy option that is not supported
- `FileAlreadyExistsException`: if the target file exists but cannot be replaced because the `REPLACE_EXISTING` option is *not* specified. It may also be thrown when the `REPLACE_EXISTING` option *is* specified, the move is not atomic, and the target file is created by some other entity at around the same time that this method is called
- `DirectoryNotEmptyException`: the `REPLACE_EXISTING` option is specified but the file cannot be replaced because it is a non-empty directory, or the source is a non-empty directory containing entries that would be required to be moved *(optional specific exceptions)*
- `AtomicMoveNotSupportedException`: if the options array contains the `ATOMIC_MOVE` option but the file cannot be moved as an atomic file system operation.
- `IOException`: if an I/O error occurs

## Files.readSymbolicLink(Path)

```java
public static Path readSymbolicLink(Path link) throws IOException
```

Reads the target of a symbolic link *(optional operation)*.

 If the file system supports symbolic
links then this method is used to read the target of the link, failing
if the file is not a symbolic link. The target of the link need not exist.
The returned `Path` object will be associated with the same file
system as `link`.

Parameters:

- `link`: the path to the symbolic link

**Returns:** a `Path` object representing the target of the link

Throws:

- `UnsupportedOperationException`: if the implementation does not support symbolic links
- `NotLinkException`: if the target could otherwise not be read because the file is not a symbolic link *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.getFileStore(Path)

```java
public static FileStore getFileStore(Path path) throws IOException
```

Returns the `FileStore` representing the file store where a file
is located.

 Once a reference to the `FileStore` is obtained it is
implementation specific if operations on the returned `FileStore`,
or `FileStoreAttributeView` objects obtained from it, continue
to depend on the existence of the file. In particular the behavior is not
defined for the case that the file is deleted or moved to a different
file store.

Parameters:

- `path`: the path to the file

**Returns:** the file store where the file is stored

Throws:

- `IOException`: if an I/O error occurs

## Files.isSameFile(Path, Path)

```java
public static boolean isSameFile(Path path, Path path2) throws IOException
```

Tests if two paths locate the same file.

 If both `Path` objects are equal
then this method returns `true` without checking if the file exists.
If the two `Path` objects are associated with different providers
then this method returns `false`. Otherwise, this method checks if
both `Path` objects locate the same file, and depending on the
implementation, may require to open or access both files.

 If the file system and files remain static, then this method implements
an equivalence relation for non-null `Paths`.

- It is *reflexive*: for `Path` `f`,
    `isSameFile(f,f)` should return `true`.

- It is *symmetric*: for two `Paths` `f` and `g`,
    `isSameFile(f,g)` will equal `isSameFile(g,f)`.

- It is *transitive*: for three `Paths`
    `f`, `g`, and `h`, if `isSameFile(f,g)` returns
    `true` and `isSameFile(g,h)` returns `true`, then
    `isSameFile(f,h)` will return `true`.

Parameters:

- `path`: one path to the file
- `path2`: the other path

**Returns:** `true` if, and only if, the two paths locate the same file

**See also:** java.nio.file.attribute.BasicFileAttributes#fileKey

Throws:

- `IOException`: if an I/O error occurs

## Files.mismatch(Path, Path)

```java
public static long mismatch(Path path, Path path2) throws IOException
```

Finds and returns the position of the first mismatched byte in the content
of two files, or `-1L` if there is no mismatch. The position will be
in the inclusive range of `0L` up to the size (in bytes) of the
smaller file.

 Two files are considered to match if they satisfy one of the following
conditions:

-  The two paths locate the Path) same file,
     even if two equal paths locate a file
     that does not exist, or

-  The two files are the same size, and every byte in the first file
     is identical to the corresponding byte in the second file.

 Otherwise there is a mismatch between the two files and the value
returned by this method is:

-  The position of the first mismatched byte, or

-  The size of the smaller file (in bytes) when the files are of different
     sizes and every byte of the smaller file is identical to the
     corresponding byte of the larger file.

 This method may not be atomic with respect to other file system
operations. This method is always *reflexive* (for `Path f`,
`mismatch(f,f)` returns `-1L`). If the file system and files
remain static, then this method is *symmetric* (for two `Paths f`
and `g`, `mismatch(f,g)` will return the same value as
`mismatch(g,f)`).

 If both `Path` objects are equal, then this method returns
`true` without checking if the file exists.

Parameters:

- `path`: the path to the first file
- `path2`: the path to the second file

**Returns:** the position of the first mismatch or `-1L` if no mismatch

**Since:** 12

Throws:

- `IOException`: if an I/O error occurs

## Files.isHidden(Path)

```java
public static boolean isHidden(Path path) throws IOException
```

Tells whether or not a file is considered *hidden*.

Parameters:

- `path`: the path to the file to test

**API note:** The exact definition of hidden is platform or provider dependent. On UNIX
for example a file is considered to be hidden if its name begins with a
period character ('.'). On Windows a file is considered hidden if the DOS
hidden attribute is set.

 Depending on the implementation this method may require to access
the file system to determine if the file is considered hidden.

**Returns:** `true` if the file is considered hidden

Throws:

- `IOException`: if an I/O error occurs
