---
title: "FileSystemProvider class (java.nio.file.spi) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/spi/FileSystemProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileSystemProvider class (java.nio.file.spi) (part 2 of 3)

## FileSystemProvider.newDirectoryStream(Path, DirectoryStream.Filter<? super Path>)

```java
public abstract DirectoryStream<Path> newDirectoryStream(Path dir, DirectoryStream.Filter<? super Path> filter) throws IOException
```

Opens a directory, returning a `DirectoryStream` to iterate over
the entries in the directory. This method works in exactly the manner
specified by the java.nio.file.DirectoryStream.Filter)
method.

Parameters:

- `dir`: the path to the directory
- `filter`: the directory stream filter

**Returns:** a new and open `DirectoryStream` object

Throws:

- `NotDirectoryException`: if the file could not otherwise be opened because it is not a directory *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.createDirectory(Path, FileAttribute<?>...)

```java
public abstract void createDirectory(Path dir, FileAttribute<?>... attrs) throws IOException
```

Creates a new directory. This method works in exactly the manner
specified by the `Files.createDirectory` method.

Parameters:

- `dir`: the directory to create
- `attrs`: an optional list of file attributes to set atomically when creating the directory

Throws:

- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the directory
- `FileAlreadyExistsException`: if a directory could not otherwise be created because a file of that name already exists *(optional specific exception)*
- `IOException`: if an I/O error occurs or the parent directory does not exist

## FileSystemProvider.createSymbolicLink(Path, Path, FileAttribute<?>...)

```java
public void createSymbolicLink(Path link, Path target, FileAttribute<?>... attrs) throws IOException
```

Creates a symbolic link to a target. This method works in exactly the
manner specified by the `Files.createSymbolicLink` method.

 The default implementation of this method throws `UnsupportedOperationException`.

Parameters:

- `link`: the path of the symbolic link to create
- `target`: the target of the symbolic link
- `attrs`: the array of attributes to set atomically when creating the symbolic link

Throws:

- `UnsupportedOperationException`: if the implementation does not support symbolic links or the array contains an attribute that cannot be set atomically when creating the symbolic link
- `FileAlreadyExistsException`: if a file with the name already exists *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.createLink(Path, Path)

```java
public void createLink(Path link, Path existing) throws IOException
```

Creates a new link (directory entry) for an existing file. This method
works in exactly the manner specified by the `Files.createLink`
method.

 The default implementation of this method throws `UnsupportedOperationException`.

Parameters:

- `link`: the link (directory entry) to create
- `existing`: a path to an existing file

Throws:

- `UnsupportedOperationException`: if the implementation does not support adding an existing file to a directory
- `FileAlreadyExistsException`: if the entry could not otherwise be created because a file of that name already exists *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.delete(Path)

```java
public abstract void delete(Path path) throws IOException
```

Deletes a file. This method works in exactly the  manner specified by the
`Files.delete` method.

Parameters:

- `path`: the path to the file to delete

Throws:

- `NoSuchFileException`: if the file does not exist *(optional specific exception)*
- `DirectoryNotEmptyException`: if the file is a directory and could not otherwise be deleted because the directory is not empty *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.deleteIfExists(Path)

```java
public boolean deleteIfExists(Path path) throws IOException
```

Deletes a file if it exists. This method works in exactly the manner
specified by the `Files.deleteIfExists` method.

 The default implementation of this method simply invokes `delete` ignoring the `NoSuchFileException` when the file does not
exist. It may be overridden where appropriate.

Parameters:

- `path`: the path to the file to delete

**Returns:** `true` if the file was deleted by this method; `false` if the file could not be deleted because it did not
         exist

Throws:

- `DirectoryNotEmptyException`: if the file is a directory and could not otherwise be deleted because the directory is not empty *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.readSymbolicLink(Path)

```java
public Path readSymbolicLink(Path link) throws IOException
```

Reads the target of a symbolic link. This method works in exactly the
manner specified by the `Files.readSymbolicLink` method.

 The default implementation of this method throws `UnsupportedOperationException`.

Parameters:

- `link`: the path to the symbolic link

**Returns:** The target of the symbolic link

Throws:

- `UnsupportedOperationException`: if the implementation does not support symbolic links
- `NotLinkException`: if the target could otherwise not be read because the file is not a symbolic link *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.copy(Path, Path, CopyOption...)

```java
public abstract void copy(Path source, Path target, CopyOption... options) throws IOException
```

Copy a file to a target file. This method works in exactly the manner
specified by the `Files.copy(Path,Path,CopyOption[])` method
except that both the source and target paths must be associated with
this provider.

Parameters:

- `source`: the path to the file to copy
- `target`: the path to the target file
- `options`: options specifying how the copy should be done

Throws:

- `UnsupportedOperationException`: if the array contains a copy option that is not supported
- `FileAlreadyExistsException`: if the target file exists but cannot be replaced because the `REPLACE_EXISTING` option is not specified *(optional specific exception)*
- `DirectoryNotEmptyException`: the `REPLACE_EXISTING` option is specified but the file cannot be replaced because it is a non-empty directory *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.move(Path, Path, CopyOption...)

```java
public abstract void move(Path source, Path target, CopyOption... options) throws IOException
```

Move or rename a file to a target file. This method works in exactly the
manner specified by the `Files.move` method except that both the
source and target paths must be associated with this provider.

Parameters:

- `source`: the path to the file to move
- `target`: the path to the target file
- `options`: options specifying how the move should be done

Throws:

- `UnsupportedOperationException`: if the array contains a copy option that is not supported
- `FileAlreadyExistsException`: if the target file exists but cannot be replaced because the `REPLACE_EXISTING` option is not specified *(optional specific exception)*
- `DirectoryNotEmptyException`: the `REPLACE_EXISTING` option is specified but the file cannot be replaced because it is a non-empty directory *(optional specific exception)*
- `AtomicMoveNotSupportedException`: if the options array contains the `ATOMIC_MOVE` option but the file cannot be moved as an atomic file system operation.
- `IOException`: if an I/O error occurs

## FileSystemProvider.isSameFile(Path, Path)

```java
public abstract boolean isSameFile(Path path, Path path2) throws IOException
```

Tests if two paths locate the same file. This method works in exactly the
manner specified by the `Files.isSameFile` method.

Parameters:

- `path`: one path to the file
- `path2`: the other path

**Returns:** `true` if, and only if, the two paths locate the same file

Throws:

- `IOException`: if an I/O error occurs

## FileSystemProvider.isHidden(Path)

```java
public abstract boolean isHidden(Path path) throws IOException
```

Tells whether or not a file is considered *hidden*. This method
works in exactly the manner specified by the `Files.isHidden`
method.

 This method is invoked by the isHidden method.

Parameters:

- `path`: the path to the file to test

**Returns:** `true` if the file is considered hidden

Throws:

- `IOException`: if an I/O error occurs

## FileSystemProvider.getFileStore(Path)

```java
public abstract FileStore getFileStore(Path path) throws IOException
```

Returns the `FileStore` representing the file store where a file
is located. This method works in exactly the manner specified by the
`Files.getFileStore` method.

Parameters:

- `path`: the path to the file

**Returns:** the file store where the file is stored

Throws:

- `IOException`: if an I/O error occurs

## FileSystemProvider.checkAccess(Path, AccessMode...)

```java
public abstract void checkAccess(Path path, AccessMode... modes) throws IOException
```

Checks the existence, and optionally the accessibility, of a file.

 This method may be used by the isReadable,
isWritable and isExecutable methods to check the accessibility of a file.

 This method checks the existence of a file and that this Java virtual
machine has appropriate privileges that would allow it access the file
according to all of access modes specified in the `modes` parameter
as follows:

Access Modes

 Value Description

   READ
   Checks that the file exists and that the Java virtual machine has
    permission to read the file.

   WRITE
   Checks that the file exists and that the Java virtual machine has
    permission to write to the file,

   EXECUTE
   Checks that the file exists and that the Java virtual machine has
    permission to execute the file. The semantics
    may differ when checking access to a directory. For example, on UNIX
    systems, checking for `EXECUTE` access checks that the Java
    virtual machine has permission to search the directory in order to
    access file or subdirectories.

 If the `modes` parameter is of length zero, then the existence
of the file is checked.

 This method follows symbolic links if the file referenced by this
object is a symbolic link. Depending on the implementation, this method
may require to read file permissions, access control lists, or other
file attributes in order to check the effective access to the file. To
determine the effective access to a file may require access to several
attributes and so in some implementations this method may not be atomic
with respect to other file system operations.

Parameters:

- `path`: the path to the file to check
- `modes`: The access modes to check; may have zero elements

Throws:

- `UnsupportedOperationException`: an implementation is required to support checking for `READ`, `WRITE`, and `EXECUTE` access. This exception is specified to allow for the `Access` enum to be extended in future releases.
- `NoSuchFileException`: if a file does not exist *(optional specific exception)*
- `AccessDeniedException`: the requested access would be denied or the access cannot be determined because the Java virtual machine has insufficient privileges or other reasons. *(optional specific exception)*
- `IOException`: if an I/O error occurs

## FileSystemProvider.getFileAttributeView(Path, Class<V>, LinkOption...)

```java
public abstract <V extends FileAttributeView> V getFileAttributeView(Path path, Class<V> type, LinkOption... options)
```

Returns a file attribute view of a given type. This method works in
exactly the manner specified by the `Files.getFileAttributeView`
method.

Parameters:

- `<V>`: The `FileAttributeView` type
- `path`: the path to the file
- `type`: the `Class` object corresponding to the file attribute view
- `options`: options indicating how symbolic links are handled

**Returns:** a file attribute view of the specified type, or `null` if
         the attribute view type is not available

## FileSystemProvider.readAttributes(Path, Class, LinkOption...)

```java
public abstract <A extends BasicFileAttributes> A readAttributes(Path path, Class<A> type, LinkOption... options) throws IOException
```

Reads a file's attributes as a bulk operation. This method works in
exactly the manner specified by the `Files.readAttributes(Path,Class,LinkOption[])` method.

Parameters:

- ``: The `BasicFileAttributes` type
- `path`: the path to the file
- `type`: the `Class` of the file attributes required to read
- `options`: options indicating how symbolic links are handled

**Returns:** the file attributes

Throws:

- `UnsupportedOperationException`: if an attributes of the given type are not supported
- `IOException`: if an I/O error occurs

## FileSystemProvider.readAttributes(Path, String, LinkOption...)

```java
public abstract Map<String,Object> readAttributes(Path path, String attributes, LinkOption... options) throws IOException
```

Reads a set of file attributes as a bulk operation. This method works in
exactly the manner specified by the `Files.readAttributes(Path,String,LinkOption[])` method.

Parameters:

- `path`: the path to the file
- `attributes`: the attributes to read
- `options`: options indicating how symbolic links are handled

**Returns:** a map of the attributes returned; may be empty. The map's keys
         are the attribute names, its values are the attribute values

Throws:

- `UnsupportedOperationException`: if the attribute view is not available
- `IllegalArgumentException`: if no attributes are specified or an unrecognized attributes is specified
- `IOException`: If an I/O error occurs

## FileSystemProvider.setAttribute(Path, String, Object, LinkOption...)

```java
public abstract void setAttribute(Path path, String attribute, Object value, LinkOption... options) throws IOException
```

Sets the value of a file attribute. This method works in exactly the
manner specified by the `Files.setAttribute` method.

Parameters:

- `path`: the path to the file
- `attribute`: the attribute to set
- `value`: the attribute value
- `options`: options indicating how symbolic links are handled

Throws:

- `UnsupportedOperationException`: if the attribute view is not available
- `IllegalArgumentException`: if the attribute name is not specified, or is not recognized, or the attribute value is of the correct type but has an inappropriate value
- `ClassCastException`: If the attribute value is not of the expected type or is a collection containing elements that are not of the expected type
- `IOException`: If an I/O error occurs
