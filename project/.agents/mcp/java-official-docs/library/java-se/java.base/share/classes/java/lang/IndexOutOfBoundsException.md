# IndexOutOfBoundsException class (java.lang)

```java
public class IndexOutOfBoundsException extends RuntimeException
```

Thrown to indicate that an index of some sort (such as to an array, to a
string, or to a vector) is out of range.
<p>
Applications can subclass this class to indicate similar exceptions.

@author Frank Yellin
@since 1.0

## IndexOutOfBoundsException.IndexOutOfBoundsException()

```java
public IndexOutOfBoundsException()
```

Constructs an {@code IndexOutOfBoundsException} with no detail message.

## IndexOutOfBoundsException.IndexOutOfBoundsException(String)

```java
public IndexOutOfBoundsException(String s)
```

Constructs an {@code IndexOutOfBoundsException} with the specified detail
message.

@param s the detail message

## IndexOutOfBoundsException.IndexOutOfBoundsException(int)

```java
public IndexOutOfBoundsException(int index)
```

Constructs a new {@code IndexOutOfBoundsException} class with an
argument indicating the illegal index.

<p>The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

@param index the illegal index.
@since 9

## IndexOutOfBoundsException.IndexOutOfBoundsException(long)

```java
public IndexOutOfBoundsException(long index)
```

Constructs a new {@code IndexOutOfBoundsException} class with an
argument indicating the illegal index.

<p>The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

@param index the illegal index.
@since 16