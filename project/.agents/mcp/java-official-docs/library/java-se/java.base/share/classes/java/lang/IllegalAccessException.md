---
title: "IllegalAccessException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IllegalAccessException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalAccessException class (java.lang)

```java
public class IllegalAccessException extends ReflectiveOperationException
```

An IllegalAccessException is thrown when an application tries
to reflectively create an instance (other than an array),
set or get a field, or invoke a method, but the currently
executing method does not have access to the definition of
the specified class, field, method or constructor.

**See also:** Class#newInstance()

**See also:** java.lang.reflect.Field#set(Object, Object)

**See also:** java.lang.reflect.Field#setBoolean(Object, boolean)

**See also:** java.lang.reflect.Field#setByte(Object, byte)

**See also:** java.lang.reflect.Field#setShort(Object, short)

**See also:** java.lang.reflect.Field#setChar(Object, char)

**See also:** java.lang.reflect.Field#setInt(Object, int)

**See also:** java.lang.reflect.Field#setLong(Object, long)

**See also:** java.lang.reflect.Field#setFloat(Object, float)

**See also:** java.lang.reflect.Field#setDouble(Object, double)

**See also:** java.lang.reflect.Field#get(Object)

**See also:** java.lang.reflect.Field#getBoolean(Object)

**See also:** java.lang.reflect.Field#getByte(Object)

**See also:** java.lang.reflect.Field#getShort(Object)

**See also:** java.lang.reflect.Field#getChar(Object)

**See also:** java.lang.reflect.Field#getInt(Object)

**See also:** java.lang.reflect.Field#getLong(Object)

**See also:** java.lang.reflect.Field#getFloat(Object)

**See also:** java.lang.reflect.Field#getDouble(Object)

**See also:** java.lang.reflect.Method#invoke(Object, Object[])

**See also:** java.lang.reflect.Constructor#newInstance(Object[])

**Since:** 1.0

## IllegalAccessException.IllegalAccessException()

```java
public IllegalAccessException()
```

Constructs an `IllegalAccessException` without a
detail message.

## IllegalAccessException.IllegalAccessException(String)

```java
public IllegalAccessException(String s)
```

Constructs an `IllegalAccessException` with a detail message.

Parameters:

- `s`: the detail message.
