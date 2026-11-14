# InstantiationException class (java.lang)

```java
public class InstantiationException extends ReflectiveOperationException
```

Thrown when an application tries to create an instance of a class
using the {@code newInstance} method in class
{@code Class}, but the specified class object cannot be
instantiated.  The instantiation can fail for a variety of
reasons including but not limited to:

<ul>
<li> the class object represents an abstract class, an interface,
     an array class, a primitive type, or {@code void}
<li> the class has no nullary constructor
</ul>

@see     java.lang.Class#newInstance()
@since   1.0

## InstantiationException.InstantiationException()

```java
public InstantiationException()
```

Constructs an {@code InstantiationException} with no detail message.

## InstantiationException.InstantiationException(String)

```java
public InstantiationException(String s)
```

Constructs an {@code InstantiationException} with the
specified detail message.

@param   s   the detail message.