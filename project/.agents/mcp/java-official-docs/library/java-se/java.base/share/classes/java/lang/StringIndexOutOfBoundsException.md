# StringIndexOutOfBoundsException class (java.lang)

```java
public class StringIndexOutOfBoundsException extends IndexOutOfBoundsException
```

Thrown by {@code String} methods to indicate that an index is either negative
or greater than the size of the string.  For some methods such as the
{@link String#charAt charAt} method, this exception also is thrown when the
index is equal to the size of the string.

@see java.lang.String#charAt(int)
@since 1.0

## StringIndexOutOfBoundsException.StringIndexOutOfBoundsException()

```java
public StringIndexOutOfBoundsException()
```

Constructs a {@code StringIndexOutOfBoundsException} with no detail
message.

## StringIndexOutOfBoundsException.StringIndexOutOfBoundsException(String)

```java
public StringIndexOutOfBoundsException(String s)
```

Constructs a {@code StringIndexOutOfBoundsException} with the specified
detail message.

@param s the detail message.

## StringIndexOutOfBoundsException.StringIndexOutOfBoundsException(int)

```java
public StringIndexOutOfBoundsException(int index)
```

Constructs a new {@code StringIndexOutOfBoundsException} class with an
argument indicating the illegal index.

<p>The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

@param index the illegal index.