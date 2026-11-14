# ArrayIndexOutOfBoundsException class (java.lang)

```java
public class ArrayIndexOutOfBoundsException extends IndexOutOfBoundsException
```

Thrown to indicate that an array has been accessed with an illegal index. The
index is either negative or greater than or equal to the size of the array.

@since 1.0

## ArrayIndexOutOfBoundsException.ArrayIndexOutOfBoundsException()

```java
public ArrayIndexOutOfBoundsException()
```

Constructs an {@code ArrayIndexOutOfBoundsException} with no detail
message.

## ArrayIndexOutOfBoundsException.ArrayIndexOutOfBoundsException(String)

```java
public ArrayIndexOutOfBoundsException(String s)
```

Constructs an {@code ArrayIndexOutOfBoundsException} class with the
specified detail message.

@param s the detail message.

## ArrayIndexOutOfBoundsException.ArrayIndexOutOfBoundsException(int)

```java
public ArrayIndexOutOfBoundsException(int index)
```

Constructs a new {@code ArrayIndexOutOfBoundsException} class with an
argument indicating the illegal index.

<p>The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

@param index the illegal index.