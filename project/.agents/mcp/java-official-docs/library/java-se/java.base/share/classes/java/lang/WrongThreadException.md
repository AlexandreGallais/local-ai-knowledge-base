# WrongThreadException class (java.lang)

```java
public final class WrongThreadException extends RuntimeException
```

Thrown to indicate that a method has been called on the wrong thread.

@since 19

## WrongThreadException.WrongThreadException()

```java
public WrongThreadException()
```

Constructs a WrongThreadException with no detail message.

## WrongThreadException.WrongThreadException(String)

```java
public WrongThreadException(String s)
```

Constructs a WrongThreadException with the given detail message.

@param s the String that contains a detailed message, can be null

## WrongThreadException.WrongThreadException(String, Throwable)

```java
public WrongThreadException(String message, Throwable cause)
```

Constructs a WrongThreadException with the given detail message and cause.

@param  message the detail message, can be null
@param  cause the cause, can be null

## WrongThreadException.WrongThreadException(Throwable)

```java
public WrongThreadException(Throwable cause)
```

Constructs a WrongThreadException with the given cause and a detail
message of {@code (cause==null ? null : cause.toString())} (which
typically contains the class and detail message of {@code cause}).

@param  cause the cause, can be null