# AccessDeniedException class (java.nio.file)

```java
public class AccessDeniedException extends FileSystemException
```

Checked exception thrown when a file system operation is denied, typically
due to a file permission or other access check.

@since 1.7

## AccessDeniedException.AccessDeniedException(String)

```java
public AccessDeniedException(String file)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known

## AccessDeniedException.AccessDeniedException(String, String, String)

```java
public AccessDeniedException(String file, String other, String reason)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known
@param   other
         a string identifying the other file or {@code null} if not known
@param   reason
         a reason message with additional information or {@code null}