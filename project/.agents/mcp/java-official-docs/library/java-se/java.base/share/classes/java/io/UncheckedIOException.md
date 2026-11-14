# UncheckedIOException class (java.io)

```java
public class UncheckedIOException extends RuntimeException
```

Wraps an {@link IOException} with an unchecked exception.

@since   1.8

## UncheckedIOException.UncheckedIOException(String, IOException)

```java
public UncheckedIOException(String message, IOException cause)
```

Constructs an instance of this class.

@param   message
         the detail message, can be null
@param   cause
         the {@code IOException}

@throws  NullPointerException
         if the cause is {@code null}

## UncheckedIOException.UncheckedIOException(IOException)

```java
public UncheckedIOException(IOException cause)
```

Constructs an instance of this class.

@param   cause
         the {@code IOException}

@throws  NullPointerException
         if the cause is {@code null}

## UncheckedIOException.getCause()

```java
public IOException getCause()
```

Returns the cause of this exception.

@return  the {@code IOException} which is the cause of this exception.