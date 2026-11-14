# FileAlreadyExistsException class (java.nio.file)

```java
public class FileAlreadyExistsException extends FileSystemException
```

Checked exception thrown when an attempt is made to create a file or
directory and a file of that name already exists.

@since 1.7

## FileAlreadyExistsException.FileAlreadyExistsException(String)

```java
public FileAlreadyExistsException(String file)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known

## FileAlreadyExistsException.FileAlreadyExistsException(String, String, String)

```java
public FileAlreadyExistsException(String file, String other, String reason)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known
@param   other
         a string identifying the other file or {@code null} if not known
@param   reason
         a reason message with additional information or {@code null}