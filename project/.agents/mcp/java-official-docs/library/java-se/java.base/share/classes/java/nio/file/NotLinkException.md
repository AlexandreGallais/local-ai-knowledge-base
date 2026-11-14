# NotLinkException class (java.nio.file)

```java
public class NotLinkException extends FileSystemException
```

Checked exception thrown when a file system operation fails because a file
is not a symbolic link.

@since 1.7

## NotLinkException.NotLinkException(String)

```java
public NotLinkException(String file)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known

## NotLinkException.NotLinkException(String, String, String)

```java
public NotLinkException(String file, String other, String reason)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known
@param   other
         a string identifying the other file or {@code null} if not known
@param   reason
         a reason message with additional information or {@code null}