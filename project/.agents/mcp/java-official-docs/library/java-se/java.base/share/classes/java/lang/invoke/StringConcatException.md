# StringConcatException class (java.lang.invoke)

```java
public class StringConcatException extends Exception
```

StringConcatException is thrown by {@link StringConcatFactory} when linkage
invariants are violated.

@since 9

## StringConcatException.StringConcatException(String)

```java
public StringConcatException(String msg)
```

Constructs an exception with a message
@param msg exception message

## StringConcatException.StringConcatException(String, Throwable)

```java
public StringConcatException(String msg, Throwable cause)
```

Constructs an exception with a message and a linked throwable
@param msg   exception message
@param cause throwable cause