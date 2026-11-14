# BootstrapMethodError class (java.lang)

```java
public class BootstrapMethodError extends LinkageError
```

Thrown to indicate that an {@code invokedynamic} instruction or a dynamic
constant failed to resolve its bootstrap method and arguments,
or for {@code invokedynamic} instruction the bootstrap method has failed to
provide a
{@linkplain java.lang.invoke.CallSite call site} with a
{@linkplain java.lang.invoke.CallSite#getTarget target}
of the correct {@linkplain java.lang.invoke.MethodHandle#type() method type},
or for a dynamic constant the bootstrap method has failed to provide a
constant value of the required type.

@author John Rose, JSR 292 EG
@since 1.7

## BootstrapMethodError.BootstrapMethodError()

```java
public BootstrapMethodError()
```

Constructs a {@code BootstrapMethodError} with no detail message.

## BootstrapMethodError.BootstrapMethodError(String)

```java
public BootstrapMethodError(String s)
```

Constructs a {@code BootstrapMethodError} with the specified
detail message.

@param s the detail message.

## BootstrapMethodError.BootstrapMethodError(String, Throwable)

```java
public BootstrapMethodError(String s, Throwable cause)
```

Constructs a {@code BootstrapMethodError} with the specified
detail message and cause.

@param s the detail message.
@param cause the cause, may be {@code null}.

## BootstrapMethodError.BootstrapMethodError(Throwable)

```java
public BootstrapMethodError(Throwable cause)
```

Constructs a {@code BootstrapMethodError} with the specified
cause.

@param cause the cause, may be {@code null}.