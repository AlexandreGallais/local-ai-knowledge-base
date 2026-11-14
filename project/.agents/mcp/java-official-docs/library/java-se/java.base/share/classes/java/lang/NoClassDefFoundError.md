# NoClassDefFoundError class (java.lang)

```java
public class NoClassDefFoundError extends LinkageError
```

Thrown if the Java Virtual Machine or a {@code ClassLoader} instance
tries to load in the definition of a class (as part of a normal method call
or as part of creating a new instance using the {@code new} expression)
and no definition of the class could be found.
<p>
The searched-for class definition existed when the currently
executing class was compiled, but the definition can no longer be
found.

@since   1.0

## NoClassDefFoundError.NoClassDefFoundError()

```java
public NoClassDefFoundError()
```

Constructs a {@code NoClassDefFoundError} with no detail message.

## NoClassDefFoundError.NoClassDefFoundError(String)

```java
public NoClassDefFoundError(String s)
```

Constructs a {@code NoClassDefFoundError} with the specified
detail message.

@param   s   the detail message.