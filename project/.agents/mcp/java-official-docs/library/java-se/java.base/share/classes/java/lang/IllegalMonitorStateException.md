# IllegalMonitorStateException class (java.lang)

```java
public class IllegalMonitorStateException extends RuntimeException
```

Thrown to indicate that a thread has attempted to wait on an
object's monitor or to notify other threads waiting on an object's
monitor without owning the specified monitor.

@see     java.lang.Object#notify()
@see     java.lang.Object#notifyAll()
@see     java.lang.Object#wait()
@see     java.lang.Object#wait(long)
@see     java.lang.Object#wait(long, int)
@since   1.0

## IllegalMonitorStateException.IllegalMonitorStateException()

```java
public IllegalMonitorStateException()
```

Constructs an {@code IllegalMonitorStateException} with no
detail message.

## IllegalMonitorStateException.IllegalMonitorStateException(String)

```java
public IllegalMonitorStateException(String s)
```

Constructs an {@code IllegalMonitorStateException} with the
specified detail message.

@param   s   the detail message.