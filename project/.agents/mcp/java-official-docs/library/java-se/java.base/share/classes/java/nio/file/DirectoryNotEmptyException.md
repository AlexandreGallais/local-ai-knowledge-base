# DirectoryNotEmptyException class (java.nio.file)

```java
public class DirectoryNotEmptyException extends FileSystemException
```

Checked exception thrown when a file system operation fails because a
directory is not empty.

@since 1.7

## DirectoryNotEmptyException.DirectoryNotEmptyException(String)

```java
public DirectoryNotEmptyException(String dir)
```

Constructs an instance of this class.

@param   dir
         a string identifying the directory or {@code null} if not known