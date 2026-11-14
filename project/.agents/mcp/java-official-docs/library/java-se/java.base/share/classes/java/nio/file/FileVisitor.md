---
title: "FileVisitor interface (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/FileVisitor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileVisitor interface (java.nio.file)

```java
public interface FileVisitor<T>
```

A visitor of files. An implementation of this interface is provided to the
Files.walkFileTree methods to visit each file in
a file tree.

 **Usage Examples:**
Suppose we want to delete a file tree. In that case, each directory should
be deleted after the entries in the directory are deleted.

Parameters:

- `<T>`: the type of file/directory

**Override:** public FileVisitResult visitFile(Path file, BasicFileAttributes attrs)
            throws IOException
        {
            Files.delete(file);
            return FileVisitResult.CONTINUE;
        }

**Override:** public FileVisitResult postVisitDirectory(Path dir, IOException e)
            throws IOException
        {
            if (e == null) {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
            } else {
                // directory iteration failed
                throw e;
            }
        }
    });
}

 Furthermore, suppose we want to copy a file tree to a target location.
In that case, symbolic links should be followed and the target directory
should be created before the entries in the directory are copied.

**Override:** public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs)
                throws IOException
            {
                Path targetdir = target.resolve(source.relativize(dir));
                try {
                    Files.copy(dir, targetdir);
                } catch (FileAlreadyExistsException e) {
                     if (!Files.isDirectory(targetdir))
                         throw e;
                }
                return CONTINUE;
            }

**Override:** public FileVisitResult visitFile(Path file, BasicFileAttributes attrs)
                throws IOException
            {
                Files.copy(file, target.resolve(source.relativize(file)));
                return CONTINUE;
            }
        });
}

**Since:** 1.7

## FileVisitor.preVisitDirectory(T, BasicFileAttributes)

```java
FileVisitResult preVisitDirectory(T dir, BasicFileAttributes attrs) throws IOException
```

Invoked for a directory before entries in the directory are visited.

 If this method returns CONTINUE,
then entries in the directory are visited. If this method returns SKIP_SUBTREE or SKIP_SIBLINGS then entries in the
directory (and any descendants) will not be visited.

Parameters:

- `dir`: a reference to the directory
- `attrs`: the directory's basic <example-value>

**Returns:** the visit result

Throws:

- `IOException`: if an I/O error occurs

## FileVisitor.visitFile(T, BasicFileAttributes)

```java
FileVisitResult visitFile(T file, BasicFileAttributes attrs) throws IOException
```

Invoked for a file in a directory.

Parameters:

- `file`: a reference to the file
- `attrs`: the file's basic <example-value>

**Returns:** the visit result

Throws:

- `IOException`: if an I/O error occurs

## FileVisitor.visitFileFailed(T, IOException)

```java
FileVisitResult visitFileFailed(T file, IOException exc) throws IOException
```

Invoked for a file that could not be visited. This method is invoked
if the file's attributes could not be read, the file is a directory
that could not be opened, and other reasons.

Parameters:

- `file`: a reference to the file
- `exc`: the I/O exception that prevented the file from being visited

**Returns:** the visit result

Throws:

- `IOException`: if an I/O error occurs

## FileVisitor.postVisitDirectory(T, IOException)

```java
FileVisitResult postVisitDirectory(T dir, IOException exc) throws IOException
```

Invoked for a directory after entries in the directory, and all of their
descendants, have been visited. This method is also invoked when iteration
of the directory completes prematurely (by a visitFile
method returning SKIP_SIBLINGS,
or an I/O error when iterating over the directory).

Parameters:

- `dir`: a reference to the directory
- `exc`: `null` if the iteration of the directory completes without an error; otherwise the I/O exception that caused the iteration of the directory to complete prematurely

**Returns:** the visit result

Throws:

- `IOException`: if an I/O error occurs
