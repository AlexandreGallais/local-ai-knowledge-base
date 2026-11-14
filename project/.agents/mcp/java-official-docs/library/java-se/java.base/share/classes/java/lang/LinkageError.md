# LinkageError class (java.lang)

```java
public class LinkageError extends Error
```

Subclasses of {@code LinkageError} indicate that a class has
some dependency on another class; however, the latter class has
incompatibly changed after the compilation of the former class.


@author  Frank Yellin
@since   1.0

## LinkageError.LinkageError()

```java
public LinkageError()
```

Constructs a {@code LinkageError} with no detail message.

## LinkageError.LinkageError(String)

```java
public LinkageError(String s)
```

Constructs a {@code LinkageError} with the specified detail
message.

@param   s   the detail message.

## LinkageError.LinkageError(String, Throwable)

```java
public LinkageError(String s, Throwable cause)
```

Constructs a {@code LinkageError} with the specified detail
message and cause.

@param s     the detail message.
@param cause the cause, may be {@code null}
@since 1.7