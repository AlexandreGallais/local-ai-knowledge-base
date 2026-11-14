---
title: "EnumConstantNotPresentException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/EnumConstantNotPresentException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EnumConstantNotPresentException class (java.lang)

```java
/* rawtypes are part of the public api */ public class EnumConstantNotPresentException extends RuntimeException
```

Thrown when an application tries to access an enum constant by name
and the enum type contains no constant with the specified name.
This exception can be thrown by the API used to read annotations reflectively.

**See also:** java.lang.reflect.AnnotatedElement

**Since:** 1.5

## EnumConstantNotPresentException.EnumConstantNotPresentException(Class<? extends Enum>, String)

```java
public EnumConstantNotPresentException(Class<? extends Enum> enumType, String constantName)
```

Constructs an `EnumConstantNotPresentException` for the
specified constant.

Parameters:

- `enumType`: the type of the missing enum constant
- `constantName`: the name of the missing enum constant

## EnumConstantNotPresentException.enumType()

```java
public Class<? extends Enum> enumType()
```

Returns the type of the missing enum constant.

**Returns:** the type of the missing enum constant

## EnumConstantNotPresentException.constantName()

```java
public String constantName()
```

Returns the name of the missing enum constant.

**Returns:** the name of the missing enum constant
