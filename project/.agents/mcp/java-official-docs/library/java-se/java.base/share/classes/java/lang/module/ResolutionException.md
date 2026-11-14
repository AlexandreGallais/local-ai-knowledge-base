# ResolutionException class (java.lang.module)

```java
public class ResolutionException extends RuntimeException
```

Thrown when resolving a set of modules, or resolving a set of modules with
service binding, fails.

@see Configuration
@since 9

## ResolutionException.ResolutionException()

```java
public ResolutionException()
```

Constructs a {@code ResolutionException} with no detail message.

## ResolutionException.ResolutionException(String)

```java
public ResolutionException(String msg)
```

Constructs a {@code ResolutionException} with the given detail
message.

@param msg
       The detail message; can be {@code null}

## ResolutionException.ResolutionException(Throwable)

```java
public ResolutionException(Throwable cause)
```

Constructs an instance of this exception with the given cause.

@param cause
       The cause; can be {@code null}

## ResolutionException.ResolutionException(String, Throwable)

```java
public ResolutionException(String msg, Throwable cause)
```

Constructs a {@code ResolutionException} with the given detail message
and cause.

@param msg
       The detail message; can be {@code null}
@param cause
       The cause; can be {@code null}