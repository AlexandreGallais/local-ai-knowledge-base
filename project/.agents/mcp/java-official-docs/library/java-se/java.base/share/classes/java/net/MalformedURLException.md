---
title: "MalformedURLException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/MalformedURLException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MalformedURLException class (java.net)

```java
public class MalformedURLException extends IOException
```

Thrown to indicate that a malformed URL has occurred. Either no
legal protocol could be found in a specification string or the
string could not be parsed.

**Since:** 1.0

## MalformedURLException.MalformedURLException()

```java
public MalformedURLException()
```

Constructs a `MalformedURLException` with no detail message.

## MalformedURLException.MalformedURLException(String)

```java
public MalformedURLException(String msg)
```

Constructs a `MalformedURLException` with the
specified detail message.

Parameters:

- `msg`: the detail message.
