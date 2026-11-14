# NoSuchMethodError class (java.lang)

```java
public class NoSuchMethodError extends IncompatibleClassChangeError
```

Thrown if an application tries to call a specified method of a
class (either static or instance), and that class no longer has a
definition of that method.
<p>
Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

@since   1.0

## NoSuchMethodError.NoSuchMethodError()

```java
public NoSuchMethodError()
```

Constructs a {@code NoSuchMethodError} with no detail message.

## NoSuchMethodError.NoSuchMethodError(String)

```java
public NoSuchMethodError(String s)
```

Constructs a {@code NoSuchMethodError} with the
specified detail message.

@param   s   the detail message.