# IOError class (java.io)

```java
public class IOError extends Error
```

Thrown when a serious I/O error has occurred.

@author  Xueming Shen
@since   1.6

## IOError.IOError(Throwable)

```java
public IOError(Throwable cause)
```

Constructs a new instance of IOError with the specified cause. The
IOError is created with the detail message of
{@code (cause==null ? null : cause.toString())} (which typically
contains the class and detail message of cause).

@param  cause
        The cause of this error, or {@code null} if the cause
        is not known