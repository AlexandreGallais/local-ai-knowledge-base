# WriteAbortedException class (java.io)

```java
public class WriteAbortedException extends ObjectStreamException
```

Signals that one of the ObjectStreamExceptions was thrown during a
write operation.  Thrown during a read operation when one of the
ObjectStreamExceptions was thrown during a write operation.  The
exception that terminated the write can be found in the detail
field. The stream is reset to its initial state and all references
to objects already deserialized are discarded.

@since   1.1

## WriteAbortedException.detail

```java
public Exception detail
```

Exception that was caught while writing the ObjectStream.

@deprecated This field predates the general-purpose exception
chaining facility.  The {@link Throwable#getCause()} method is
now the preferred means of obtaining this information.

@serial

## WriteAbortedException.WriteAbortedException(String, Exception)

```java
public WriteAbortedException(String s, Exception ex)
```

Constructs a WriteAbortedException with a string describing
the exception and the exception causing the abort.
@param s   String describing the exception.
@param ex  Exception causing the abort.

## WriteAbortedException.getMessage()

```java
public String getMessage()
```

Produce the message and include the message from the nested
exception, if there is one.

## WriteAbortedException.getCause()

```java
public Throwable getCause()
```

Returns the exception that terminated the operation (the <i>cause</i>).

@return  the exception that terminated the operation (the <i>cause</i>),
         which may be null.
@since   1.4