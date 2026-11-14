---
title: "IllegalThreadStateException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IllegalThreadStateException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalThreadStateException class (java.lang)

```java
public class IllegalThreadStateException extends IllegalArgumentException
```

Thrown to indicate that a thread is not in an appropriate state
for the requested operation.

**See also:** Thread#start()

**Since:** 1.0

## IllegalThreadStateException.IllegalThreadStateException()

```java
public IllegalThreadStateException()
```

Constructs an `IllegalThreadStateException` with no
detail message.

## IllegalThreadStateException.IllegalThreadStateException(String)

```java
public IllegalThreadStateException(String s)
```

Constructs an `IllegalThreadStateException` with the
specified detail message.

Parameters:

- `s`: the detail message.
