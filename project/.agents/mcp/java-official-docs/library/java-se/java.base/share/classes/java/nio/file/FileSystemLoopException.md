# FileSystemLoopException class (java.nio.file)

```java
public class FileSystemLoopException extends FileSystemException
```

Checked exception thrown when a file system loop, or cycle, is encountered.

@since 1.7
@see Files#walkFileTree

## FileSystemLoopException.FileSystemLoopException(String)

```java
public FileSystemLoopException(String file)
```

Constructs an instance of this class.

@param   file
         a string identifying the file causing the cycle or {@code null} if
         not known