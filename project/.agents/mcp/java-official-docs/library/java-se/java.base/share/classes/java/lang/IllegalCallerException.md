# IllegalCallerException class (java.lang)

```java
public class IllegalCallerException extends RuntimeException
```

Thrown to indicate that a method has been called by an inappropriate caller.

@since 9
@see StackWalker#getCallerClass

## IllegalCallerException.IllegalCallerException()

```java
public IllegalCallerException()
```

Constructs an IllegalCallerException with no detail message.

## IllegalCallerException.IllegalCallerException(String)

```java
public IllegalCallerException(String s)
```

Constructs an IllegalCallerException with the specified detail
message.

@param s the String that contains a detailed message (can be null)

## IllegalCallerException.IllegalCallerException(String, Throwable)

```java
public IllegalCallerException(String message, Throwable cause)
```

Constructs a new exception with the specified detail message and
cause.

@param  message the detail message (can be null)
@param  cause the cause (can be null)

## IllegalCallerException.IllegalCallerException(Throwable)

```java
public IllegalCallerException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of {@code (cause==null ? null : cause.toString())} (which
typically contains the class and detail message of {@code cause}).

@param  cause the cause (can be null)