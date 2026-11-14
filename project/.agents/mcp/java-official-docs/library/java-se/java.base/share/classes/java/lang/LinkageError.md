---
title: "LinkageError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/LinkageError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkageError class (java.lang)

```java
public class LinkageError extends Error
```

Subclasses of `LinkageError` indicate that a class has
some dependency on another class; however, the latter class has
incompatibly changed after the compilation of the former class.

**Since:** 1.0

## LinkageError.LinkageError()

```java
public LinkageError()
```

Constructs a `LinkageError` with no detail message.

## LinkageError.LinkageError(String)

```java
public LinkageError(String s)
```

Constructs a `LinkageError` with the specified detail
message.

Parameters:

- `s`: the detail message.

## LinkageError.LinkageError(String, Throwable)

```java
public LinkageError(String s, Throwable cause)
```

Constructs a `LinkageError` with the specified detail
message and cause.

Parameters:

- `s`: the detail message.
- `cause`: the cause, may be `null`

**Since:** 1.7
