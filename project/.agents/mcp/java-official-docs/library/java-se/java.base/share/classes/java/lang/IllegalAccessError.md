# IllegalAccessError class (java.lang)

```java
public class IllegalAccessError extends IncompatibleClassChangeError
```

Thrown if an application attempts to access or modify a field, or
to call a method that it does not have access to.
<p>
Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

@since   1.0

## IllegalAccessError.IllegalAccessError()

```java
public IllegalAccessError()
```

Constructs an {@code IllegalAccessError} with no detail message.

## IllegalAccessError.IllegalAccessError(String)

```java
public IllegalAccessError(String s)
```

Constructs an {@code IllegalAccessError} with the specified
detail message.

@param   s   the detail message.