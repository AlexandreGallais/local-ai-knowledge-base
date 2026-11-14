# InstantiationError class (java.lang)

```java
public class InstantiationError extends IncompatibleClassChangeError
```

Thrown when an application tries to use the Java {@code new}
construct to instantiate an abstract class or an interface.
<p>
Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

@since   1.0

## InstantiationError.InstantiationError()

```java
public InstantiationError()
```

Constructs an {@code InstantiationError} with no detail  message.

## InstantiationError.InstantiationError(String)

```java
public InstantiationError(String s)
```

Constructs an {@code InstantiationError} with the specified
detail message.

@param   s   the detail message.