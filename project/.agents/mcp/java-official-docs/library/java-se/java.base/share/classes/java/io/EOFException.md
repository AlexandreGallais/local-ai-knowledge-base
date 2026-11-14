# EOFException class (java.io)

```java
public class EOFException extends IOException
```

Signals that an end of file or end of stream has been reached
unexpectedly during input.
<p>
This exception is mainly used by data input streams to signal end of
stream. Note that many other input operations return a special value on
end of stream rather than throwing an exception.

@author  Frank Yellin
@see     java.io.DataInputStream
@see     java.io.IOException
@since   1.0

## EOFException.EOFException()

```java
public EOFException()
```

Constructs an {@code EOFException} with {@code null}
as its error detail message.

## EOFException.EOFException(String)

```java
public EOFException(String s)
```

Constructs an {@code EOFException} with the specified detail
message. The string {@code s} may later be retrieved by the
{@link java.lang.Throwable#getMessage} method of class
{@code java.lang.Throwable}.

@param   s   the detail message.