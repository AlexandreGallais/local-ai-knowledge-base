# InterruptedIOException class (java.io)

```java
public class InterruptedIOException extends IOException
```

Signals that an I/O operation has been interrupted. An
{@code InterruptedIOException} is thrown to indicate that an
input or output transfer has been terminated because the thread
performing it was interrupted. The field {@link #bytesTransferred}
indicates how many bytes were successfully transferred before
the interruption occurred.

@see     java.io.InputStream
@see     java.io.OutputStream
@see     java.lang.Thread#interrupt()
@since   1.0

## InterruptedIOException.InterruptedIOException()

```java
public InterruptedIOException()
```

Constructs an {@code InterruptedIOException} with
{@code null} as its error detail message.

## InterruptedIOException.InterruptedIOException(String)

```java
public InterruptedIOException(String s)
```

Constructs an {@code InterruptedIOException} with the
specified detail message. The string {@code s} can be
retrieved later by the
{@link java.lang.Throwable#getMessage}
method of class {@code java.lang.Throwable}.

@param   s   the detail message.

## InterruptedIOException.bytesTransferred

```java
public int bytesTransferred
```

Reports how many bytes had been transferred as part of the I/O
operation before it was interrupted.

@serial