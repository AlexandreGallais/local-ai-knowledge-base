# OutOfMemoryError class (java.lang)

```java
public class OutOfMemoryError extends VirtualMachineError
```

Thrown when the Java Virtual Machine cannot allocate an object
because it is out of memory, and no more memory could be made
available by the garbage collector.

{@code OutOfMemoryError} objects may be constructed by the virtual
machine as if {@linkplain Throwable#Throwable(String, Throwable,
boolean, boolean) suppression were disabled and/or the stack trace was not
writable}.

@since   1.0

## OutOfMemoryError.OutOfMemoryError()

```java
public OutOfMemoryError()
```

Constructs an {@code OutOfMemoryError} with no detail message.

## OutOfMemoryError.OutOfMemoryError(String)

```java
public OutOfMemoryError(String s)
```

Constructs an {@code OutOfMemoryError} with the specified
detail message.

@param   s   the detail message.