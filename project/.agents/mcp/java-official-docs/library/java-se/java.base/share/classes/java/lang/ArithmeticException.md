# ArithmeticException class (java.lang)

```java
public class ArithmeticException extends RuntimeException
```

Thrown when an exceptional arithmetic condition has occurred. For
example, an integer "divide by zero" throws an
instance of this class.

{@code ArithmeticException} objects may be constructed by the
virtual machine as if {@linkplain Throwable#Throwable(String,
Throwable, boolean, boolean) suppression were disabled and/or the
stack trace was not writable}.

@since   1.0

## ArithmeticException.ArithmeticException()

```java
public ArithmeticException()
```

Constructs an {@code ArithmeticException} with no detail
message.

## ArithmeticException.ArithmeticException(String)

```java
public ArithmeticException(String s)
```

Constructs an {@code ArithmeticException} with the specified
detail message.

@param   s   the detail message.