---
title: "ArrayIndexOutOfBoundsException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ArrayIndexOutOfBoundsException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayIndexOutOfBoundsException class (java.lang)

```java
public class ArrayIndexOutOfBoundsException extends IndexOutOfBoundsException
```

Thrown to indicate that an array has been accessed with an illegal index. The
index is either negative or greater than or equal to the size of the array.

**Since:** 1.0

## ArrayIndexOutOfBoundsException.ArrayIndexOutOfBoundsException()

```java
public ArrayIndexOutOfBoundsException()
```

Constructs an `ArrayIndexOutOfBoundsException` with no detail
message.

## ArrayIndexOutOfBoundsException.ArrayIndexOutOfBoundsException(String)

```java
public ArrayIndexOutOfBoundsException(String s)
```

Constructs an `ArrayIndexOutOfBoundsException` class with the
specified detail message.

Parameters:

- `s`: the detail message.

## ArrayIndexOutOfBoundsException.ArrayIndexOutOfBoundsException(int)

```java
public ArrayIndexOutOfBoundsException(int index)
```

Constructs a new `ArrayIndexOutOfBoundsException` class with an
argument indicating the illegal index.

The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

Parameters:

- `index`: the illegal index.
