# DirectoryIteratorException class (java.nio.file)

```java
public final class DirectoryIteratorException extends ConcurrentModificationException
```

Runtime exception thrown if an I/O error is encountered when iterating over
the entries in a directory. The I/O error is retrieved as an {@link
IOException} using the {@link #getCause() getCause()} method.

@since 1.7
@see DirectoryStream

## DirectoryIteratorException.DirectoryIteratorException(IOException)

```java
public DirectoryIteratorException(IOException cause)
```

Constructs an instance of this class.

@param   cause
         the {@code IOException} that caused the directory iteration
         to fail

@throws  NullPointerException
         if the cause is {@code null}

## DirectoryIteratorException.getCause()

```java
public IOException getCause()
```

Returns the cause of this exception.

@return  the cause