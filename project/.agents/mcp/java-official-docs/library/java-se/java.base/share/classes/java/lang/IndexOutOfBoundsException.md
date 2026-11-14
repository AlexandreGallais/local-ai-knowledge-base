---
title: "IndexOutOfBoundsException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IndexOutOfBoundsException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IndexOutOfBoundsException class (java.lang)

```java
public class IndexOutOfBoundsException extends RuntimeException
```

Thrown to indicate that an index of some sort (such as to an array, to a
string, or to a vector) is out of range.

Applications can subclass this class to indicate similar exceptions.

**Since:** 1.0

## IndexOutOfBoundsException.IndexOutOfBoundsException()

```java
public IndexOutOfBoundsException()
```

Constructs an `IndexOutOfBoundsException` with no detail message.

## IndexOutOfBoundsException.IndexOutOfBoundsException(String)

```java
public IndexOutOfBoundsException(String s)
```

Constructs an `IndexOutOfBoundsException` with the specified detail
message.

Parameters:

- `s`: the detail message

## IndexOutOfBoundsException.IndexOutOfBoundsException(int)

```java
public IndexOutOfBoundsException(int index)
```

Constructs a new `IndexOutOfBoundsException` class with an
argument indicating the illegal index.

The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

Parameters:

- `index`: the illegal index.

**Since:** 9

## IndexOutOfBoundsException.IndexOutOfBoundsException(long)

```java
public IndexOutOfBoundsException(long index)
```

Constructs a new `IndexOutOfBoundsException` class with an
argument indicating the illegal index.

The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

Parameters:

- `index`: the illegal index.

**Since:** 16
