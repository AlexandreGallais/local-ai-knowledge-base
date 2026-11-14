---
title: "LambdaConversionException class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/LambdaConversionException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LambdaConversionException class (java.lang.invoke)

```java
public class LambdaConversionException extends Exception
```

LambdaConversionException

**Since:** 1.8

## LambdaConversionException.LambdaConversionException()

```java
public LambdaConversionException()
```

Constructs a `LambdaConversionException`.

## LambdaConversionException.LambdaConversionException(String)

```java
public LambdaConversionException(String message)
```

Constructs a `LambdaConversionException` with a message.

Parameters:

- `message`: the detail message

## LambdaConversionException.LambdaConversionException(String, Throwable)

```java
public LambdaConversionException(String message, Throwable cause)
```

Constructs a `LambdaConversionException` with a message and cause.

Parameters:

- `message`: the detail message
- `cause`: the cause

## LambdaConversionException.LambdaConversionException(Throwable)

```java
public LambdaConversionException(Throwable cause)
```

Constructs a `LambdaConversionException` with a cause.

Parameters:

- `cause`: the cause

## LambdaConversionException.LambdaConversionException(String, Throwable, boolean, boolean)

```java
public LambdaConversionException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
```

Constructs a `LambdaConversionException` with a message,
cause, and other settings.

Parameters:

- `message`: the detail message
- `cause`: the cause
- `enableSuppression`: whether or not suppressed exceptions are enabled
- `writableStackTrace`: whether or not the stack trace is writable
