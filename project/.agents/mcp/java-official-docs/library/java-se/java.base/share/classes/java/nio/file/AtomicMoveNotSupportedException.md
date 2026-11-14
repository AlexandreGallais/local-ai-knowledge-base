# AtomicMoveNotSupportedException class (java.nio.file)

```java
public class AtomicMoveNotSupportedException extends FileSystemException
```

Checked exception thrown when a file cannot be moved as an atomic file system
operation.

@since 1.7

## AtomicMoveNotSupportedException.AtomicMoveNotSupportedException(String, String, String)

```java
public AtomicMoveNotSupportedException(String source, String target, String reason)
```

Constructs an instance of this class.

@param   source
         a string identifying the source file or {@code null} if not known
@param   target
         a string identifying the target file or {@code null} if not known
@param   reason
         a reason message with additional information or {@code null}