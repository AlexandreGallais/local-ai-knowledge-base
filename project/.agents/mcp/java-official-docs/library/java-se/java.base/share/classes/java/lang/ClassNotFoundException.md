# ClassNotFoundException class (java.lang)

```java
public class ClassNotFoundException extends ReflectiveOperationException
```

Thrown when an application tries to load in a class through its
string name using:
<ul>
<li>The {@code forName} method in class {@code Class}.
<li>The {@code findSystemClass} method in class
    {@code ClassLoader} .
<li>The {@code loadClass} method in class {@code ClassLoader}.
</ul>
<p>
but no definition for the class with the specified name could be found.

@see     java.lang.Class#forName(java.lang.String)
@see     java.lang.ClassLoader#findSystemClass(java.lang.String)
@see     java.lang.ClassLoader#loadClass(java.lang.String, boolean)
@since   1.0

## ClassNotFoundException.ClassNotFoundException()

```java
public ClassNotFoundException()
```

Constructs a {@code ClassNotFoundException} with no detail message.

## ClassNotFoundException.ClassNotFoundException(String)

```java
public ClassNotFoundException(String s)
```

Constructs a {@code ClassNotFoundException} with the
specified detail message.

@param   s   the detail message.

## ClassNotFoundException.ClassNotFoundException(String, Throwable)

```java
public ClassNotFoundException(String s, Throwable ex)
```

Constructs a {@code ClassNotFoundException} with the
specified detail message and optional exception that was
raised while loading the class.

@param s the detail message
@param ex the exception that was raised while loading the class
@since 1.2

## ClassNotFoundException.getException()

```java
public Throwable getException()
```

Returns the exception that was raised if an error occurred while
attempting to load the class. Otherwise, returns {@code null}.

@apiNote
This method predates the general-purpose exception chaining facility.
The {@link Throwable#getCause()} method is now the preferred means of
obtaining this information.

@return the {@code Exception} that was raised while loading a class
@since 1.2