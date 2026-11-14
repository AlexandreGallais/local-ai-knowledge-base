# NoSuchFileException class (java.nio.file)

```java
public class NoSuchFileException extends FileSystemException
```

Checked exception thrown when an attempt is made to access a file that does
not exist.

@since 1.7

## NoSuchFileException.NoSuchFileException(String)

```java
public NoSuchFileException(String file)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known.

## NoSuchFileException.NoSuchFileException(String, String, String)

```java
public NoSuchFileException(String file, String other, String reason)
```

Constructs an instance of this class.

@param   file
         a string identifying the file or {@code null} if not known.
@param   other
         a string identifying the other file or {@code null} if not known.
@param   reason
         a reason message with additional information or {@code null}