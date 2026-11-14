# ArrayStoreException class (java.lang)

```java
public class ArrayStoreException extends RuntimeException
```

Thrown to indicate that an attempt has been made to store the
wrong type of object into an array of objects. For example, the
following code generates an {@code ArrayStoreException}:
<blockquote><pre>
    Object x[] = new String[3];
    x[0] = Integer.valueOf(0);
</pre></blockquote>

@since   1.0

## ArrayStoreException.ArrayStoreException()

```java
public ArrayStoreException()
```

Constructs an {@code ArrayStoreException} with no detail message.

## ArrayStoreException.ArrayStoreException(String)

```java
public ArrayStoreException(String s)
```

Constructs an {@code ArrayStoreException} with the specified
detail message.

@param   s   the detail message.