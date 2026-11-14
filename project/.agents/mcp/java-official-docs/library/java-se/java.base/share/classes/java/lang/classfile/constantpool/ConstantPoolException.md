# ConstantPoolException class (java.lang.classfile.constantpool)

```java
public class ConstantPoolException extends IllegalArgumentException
```

Thrown to indicate that requested entry cannot be obtained from the constant
pool or the bootstrap method table.  This is also thrown when the lazy
evaluation of constant pool or bootstrap method table entries encounter
format errors.

@since 24

## ConstantPoolException.ConstantPoolException()

```java
public ConstantPoolException()
```

Constructs a {@code ConstantPoolException} with no detail message.

## ConstantPoolException.ConstantPoolException(String)

```java
public ConstantPoolException(String message)
```

Constructs a {@code ConstantPoolException} with the specified detail
message.

@param message the detail message, may be {@code null} for no detail
               message

## ConstantPoolException.ConstantPoolException(Throwable)

```java
public ConstantPoolException(Throwable cause)
```

Constructs a {@code ConstantPoolException} with the specified cause and
a detail message of {@code cause == null ? null : cause.toString()}.

@param cause the cause, may be {@code null} for nonexistent or unknown
             cause

## ConstantPoolException.ConstantPoolException(String, Throwable)

```java
public ConstantPoolException(String message, Throwable cause)
```

Constructs a {@code ConstantPoolException} with the specified detail
message and cause.

@param message the detail message, may be {@code null} for no detail
               message
@param cause the cause, may be {@code null} for nonexistent or unknown
             cause