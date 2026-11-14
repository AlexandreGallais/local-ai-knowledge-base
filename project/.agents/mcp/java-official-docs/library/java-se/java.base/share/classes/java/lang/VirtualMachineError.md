# VirtualMachineError class (java.lang)

```java
public abstract class VirtualMachineError extends Error
```

Thrown to indicate that the Java Virtual Machine is broken or has
run out of resources necessary for it to continue operating.


@author  Frank Yellin
@since   1.0

## VirtualMachineError.VirtualMachineError()

```java
public VirtualMachineError()
```

Constructs a {@code VirtualMachineError} with no detail message.

## VirtualMachineError.VirtualMachineError(String)

```java
public VirtualMachineError(String message)
```

Constructs a {@code VirtualMachineError} with the specified
detail message.

@param   message   the detail message.

## VirtualMachineError.VirtualMachineError(String, Throwable)

```java
public VirtualMachineError(String message, Throwable cause)
```

Constructs a {@code VirtualMachineError} with the specified
detail message and cause.  <p>Note that the detail message
associated with {@code cause} is <i>not</i> automatically
incorporated in this error's detail message.

@param  message the detail message (which is saved for later retrieval
        by the {@link #getMessage()} method).
@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method).  (A {@code null} value is
        permitted, and indicates that the cause is nonexistent or
        unknown.)
@since  1.8

## VirtualMachineError.VirtualMachineError(Throwable)

```java
public VirtualMachineError(Throwable cause)
```

Constructs a {@code VirtualMachineError} with the specified
cause and a detail message of {@code (cause==null ? null :
cause.toString())} (which typically contains the class and
detail message of {@code cause}).

@param  cause the cause (which is saved for later retrieval by the
        {@link #getCause()} method).  (A {@code null} value is
        permitted, and indicates that the cause is nonexistent or
        unknown.)
@since  1.8