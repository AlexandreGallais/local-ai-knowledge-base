# NotDirectoryException class (java.nio.file)

```java
public class NotDirectoryException extends FileSystemException
```

Checked exception thrown when a file system operation, intended for a
directory, fails because the file is not a directory.

@since 1.7

## NotDirectoryException.NotDirectoryException(String)

```java
public NotDirectoryException(String file)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known