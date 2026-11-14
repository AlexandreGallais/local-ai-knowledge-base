---
title: "ArrayStoreException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ArrayStoreException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayStoreException class (java.lang)

```java
public class ArrayStoreException extends RuntimeException
```

Thrown to indicate that an attempt has been made to store the
wrong type of object into an array of objects. For example, the
following code generates an `ArrayStoreException`:

```java
    Object x[] = new String[3];
    x[0] = Integer.valueOf(0);
```

**Since:** 1.0

## ArrayStoreException.ArrayStoreException()

```java
public ArrayStoreException()
```

Constructs an `ArrayStoreException` with no detail message.

## ArrayStoreException.ArrayStoreException(String)

```java
public ArrayStoreException(String s)
```

Constructs an `ArrayStoreException` with the specified
detail message.

Parameters:

- `s`: the detail message.
