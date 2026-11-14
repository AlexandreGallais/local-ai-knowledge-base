# SimpleFileVisitor class (java.nio.file)

```java
public class SimpleFileVisitor<T> implements FileVisitor<T>
```

A simple visitor of files with default behavior to visit all files and to
re-throw I/O errors.

<p> Methods in this class may be overridden subject to their general contract.

@param   <T>     The type of reference to the files

@since 1.7

## SimpleFileVisitor.SimpleFileVisitor()

```java
protected SimpleFileVisitor()
```

Initializes a new instance of this class.

## SimpleFileVisitor.preVisitDirectory(T, BasicFileAttributes)

```java
public FileVisitResult preVisitDirectory(T dir, BasicFileAttributes attrs) throws IOException
```

Invoked for a directory before entries in the directory are visited.

<p> Unless overridden, this method returns {@link FileVisitResult#CONTINUE
CONTINUE}.

## SimpleFileVisitor.visitFile(T, BasicFileAttributes)

```java
public FileVisitResult visitFile(T file, BasicFileAttributes attrs) throws IOException
```

Invoked for a file in a directory.

<p> Unless overridden, this method returns {@link FileVisitResult#CONTINUE
CONTINUE}.

## SimpleFileVisitor.visitFileFailed(T, IOException)

```java
public FileVisitResult visitFileFailed(T file, IOException exc) throws IOException
```

Invoked for a file that could not be visited.

<p> Unless overridden, this method re-throws the I/O exception that prevented
the file from being visited.

## SimpleFileVisitor.postVisitDirectory(T, IOException)

```java
public FileVisitResult postVisitDirectory(T dir, IOException exc) throws IOException
```

Invoked for a directory after entries in the directory, and all of their
descendants, have been visited.

<p> Unless overridden, this method returns {@link FileVisitResult#CONTINUE
CONTINUE} if the directory iteration completes without an I/O exception;
otherwise this method re-throws the I/O exception that caused the iteration
of the directory to terminate prematurely.