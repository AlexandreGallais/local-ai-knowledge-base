# WrongMethodTypeException class (java.lang.invoke)

```java
public class WrongMethodTypeException extends RuntimeException
```

Thrown to indicate that code has attempted to call a method handle
via the wrong method type.  As with the bytecode representation of
normal Java method calls, method handle calls are strongly typed
to a specific type descriptor associated with a call site.
<p>
This exception may also be thrown when two method handles are
composed, and the system detects that their types cannot be
matched up correctly.  This amounts to an early evaluation
of the type mismatch, at method handle construction time,
instead of when the mismatched method handle is called.

@author John Rose, JSR 292 EG
@since 1.7

## WrongMethodTypeException.WrongMethodTypeException()

```java
public WrongMethodTypeException()
```

Constructs a {@code WrongMethodTypeException} with no detail message.

## WrongMethodTypeException.WrongMethodTypeException(String)

```java
public WrongMethodTypeException(String s)
```

Constructs a {@code WrongMethodTypeException} with the specified
detail message.

@param s the detail message.

## WrongMethodTypeException.WrongMethodTypeException(String, Throwable)

```java
/*non-public*/ WrongMethodTypeException(String s, Throwable cause)
```

Constructs a {@code WrongMethodTypeException} with the specified
detail message and cause.

@param s the detail message.
@param cause the cause of the exception, or null.

## WrongMethodTypeException.WrongMethodTypeException(Throwable)

```java
/*non-public*/ WrongMethodTypeException(Throwable cause)
```

Constructs a {@code WrongMethodTypeException} with the specified
cause.

@param cause the cause of the exception, or null.