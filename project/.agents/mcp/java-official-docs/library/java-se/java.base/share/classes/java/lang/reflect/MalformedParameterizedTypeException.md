# MalformedParameterizedTypeException class (java.lang.reflect)

```java
public class MalformedParameterizedTypeException extends RuntimeException
```

Thrown when a semantically malformed parameterized type is
encountered by a reflective method that needs to instantiate it.
For example, if the number of type arguments to a parameterized type
is wrong.

@since 1.5

## MalformedParameterizedTypeException.MalformedParameterizedTypeException()

```java
public MalformedParameterizedTypeException()
```

Constructs a {@code MalformedParameterizedTypeException} with
no detail message.

## MalformedParameterizedTypeException.MalformedParameterizedTypeException(String)

```java
public MalformedParameterizedTypeException(String message)
```

Constructs a {@code MalformedParameterizedTypeException} with
the given detail message.
@param message the detail message; may be {@code null}

@since 10