# RejectedExecutionException class (java.util.concurrent)

```java
public class RejectedExecutionException extends RuntimeException
```

Exception thrown by an {@link Executor} when a task cannot be
accepted for execution.

@since 1.5
@author Doug Lea

## RejectedExecutionException.RejectedExecutionException()

```java
public RejectedExecutionException()
```

Constructs a {@code RejectedExecutionException} with no detail message.
The cause is not initialized, and may subsequently be
initialized by a call to {@link #initCause(Throwable) initCause}.

## RejectedExecutionException.RejectedExecutionException(String)

```java
public RejectedExecutionException(String message)
```

Constructs a {@code RejectedExecutionException} with the
specified detail message. The cause is not initialized, and may
subsequently be initialized by a call to {@link
#initCause(Throwable) initCause}.

@param message the detail message

## RejectedExecutionException.RejectedExecutionException(String, Throwable)

```java
public RejectedExecutionException(String message, Throwable cause)
```

Constructs a {@code RejectedExecutionException} with the
specified detail message and cause.

@param  message the detail message
@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method)

## RejectedExecutionException.RejectedExecutionException(Throwable)

```java
public RejectedExecutionException(Throwable cause)
```

Constructs a {@code RejectedExecutionException} with the
specified cause.  The detail message is set to {@code (cause ==
null ? null : cause.toString())} (which typically contains
the class and detail message of {@code cause}).

@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method)