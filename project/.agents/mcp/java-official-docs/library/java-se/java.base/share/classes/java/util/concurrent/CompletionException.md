# CompletionException class (java.util.concurrent)

```java
public class CompletionException extends RuntimeException
```

Exception thrown when an error or other exception is encountered
in the course of completing a result or task.

@since 1.8
@author Doug Lea

## CompletionException.CompletionException()

```java
protected CompletionException()
```

Constructs a {@code CompletionException} with no detail message.
The cause is not initialized, and may subsequently be
initialized by a call to {@link #initCause(Throwable) initCause}.

## CompletionException.CompletionException(String)

```java
protected CompletionException(String message)
```

Constructs a {@code CompletionException} with the specified detail
message. The cause is not initialized, and may subsequently be
initialized by a call to {@link #initCause(Throwable) initCause}.

@param message the detail message

## CompletionException.CompletionException(String, Throwable)

```java
public CompletionException(String message, Throwable cause)
```

Constructs a {@code CompletionException} with the specified detail
message and cause.

@param  message the detail message
@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method)

## CompletionException.CompletionException(Throwable)

```java
public CompletionException(Throwable cause)
```

Constructs a {@code CompletionException} with the specified cause.
The detail message is set to {@code (cause == null ? null :
cause.toString())} (which typically contains the class and
detail message of {@code cause}).

@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method)