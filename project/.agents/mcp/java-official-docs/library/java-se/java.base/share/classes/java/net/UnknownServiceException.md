# UnknownServiceException class (java.net)

```java
public class UnknownServiceException extends IOException
```

Thrown to indicate that an unknown service exception has
occurred. Either the MIME type returned by a URL connection does
not make sense, or the application is attempting to write to a
read-only URL connection.

@since   1.0

## UnknownServiceException.UnknownServiceException()

```java
public UnknownServiceException()
```

Constructs a new {@code UnknownServiceException} with no
detail message.

## UnknownServiceException.UnknownServiceException(String)

```java
public UnknownServiceException(String msg)
```

Constructs a new {@code UnknownServiceException} with the
specified detail message.

@param   msg   the detail message.