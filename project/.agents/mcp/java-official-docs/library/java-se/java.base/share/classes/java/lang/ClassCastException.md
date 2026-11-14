# ClassCastException class (java.lang)

```java
public class ClassCastException extends RuntimeException
```

Thrown to indicate that the code has attempted to cast an object
to a subclass of which it is not an instance. For example, the
following code generates a {@code ClassCastException}:
<blockquote><pre>
    Object x = Integer.valueOf(0);
    System.out.println((String)x);
</pre></blockquote>

@since   1.0

## ClassCastException.ClassCastException()

```java
public ClassCastException()
```

Constructs a {@code ClassCastException} with no detail message.

## ClassCastException.ClassCastException(String)

```java
public ClassCastException(String s)
```

Constructs a {@code ClassCastException} with the specified
detail message.

@param   s   the detail message.