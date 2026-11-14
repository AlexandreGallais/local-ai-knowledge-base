# AbstractMethodError class (java.lang)

```java
public class AbstractMethodError extends IncompatibleClassChangeError
```

Thrown when an application tries to call an abstract method.
Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of some class has
incompatibly changed since the currently executing method was last
compiled.

@since   1.0

## AbstractMethodError.AbstractMethodError()

```java
public AbstractMethodError()
```

Constructs an {@code AbstractMethodError} with no detail  message.

## AbstractMethodError.AbstractMethodError(String)

```java
public AbstractMethodError(String s)
```

Constructs an {@code AbstractMethodError} with the specified
detail message.

@param   s   the detail message.