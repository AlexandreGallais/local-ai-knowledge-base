# NoSuchFieldError class (java.lang)

```java
public class NoSuchFieldError extends IncompatibleClassChangeError
```

Thrown if an application tries to access or modify a specified
field of an object, and that object no longer has that field.
<p>
Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

@since   1.0

## NoSuchFieldError.NoSuchFieldError()

```java
public NoSuchFieldError()
```

Constructs a {@code NoSuchFieldError} with no detail message.

## NoSuchFieldError.NoSuchFieldError(String)

```java
public NoSuchFieldError(String s)
```

Constructs a {@code NoSuchFieldError} with the specified
detail message.

@param   s   the detail message.