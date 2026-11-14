# FindException class (java.lang.module)

```java
public class FindException extends RuntimeException
```

Thrown by a {@link ModuleFinder ModuleFinder} when an error occurs finding
a module. Also thrown by {@link
Configuration#resolve(ModuleFinder,java.util.List,ModuleFinder,java.util.Collection)
Configuration.resolve} when resolution fails for observability-related
reasons.

@since 9

## FindException.FindException()

```java
public FindException()
```

Constructs a {@code FindException} with no detail message.

## FindException.FindException(String)

```java
public FindException(String msg)
```

Constructs a {@code FindException} with the given detail
message.

@param msg
       The detail message; can be {@code null}

## FindException.FindException(Throwable)

```java
public FindException(Throwable cause)
```

Constructs a {@code FindException} with the given cause.

@param cause
       The cause; can be {@code null}

## FindException.FindException(String, Throwable)

```java
public FindException(String msg, Throwable cause)
```

Constructs a {@code FindException} with the given detail message
and cause.

@param msg
       The detail message; can be {@code null}
@param cause
       The cause; can be {@code null}