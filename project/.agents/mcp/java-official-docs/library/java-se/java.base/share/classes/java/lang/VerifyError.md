# VerifyError class (java.lang)

```java
public class VerifyError extends LinkageError
```

Thrown when the "verifier" detects that a class file,
though well formed, contains some sort of internal inconsistency
or security problem.

@since   1.0

## VerifyError.VerifyError()

```java
public VerifyError()
```

Constructs an {@code VerifyError} with no detail message.

## VerifyError.VerifyError(String)

```java
public VerifyError(String s)
```

Constructs an {@code VerifyError} with the specified detail message.

@param   s   the detail message.