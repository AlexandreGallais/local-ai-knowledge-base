---
title: "Runnable interface (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Runnable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Runnable interface (java.lang)

```java
public interface Runnable
```

Represents an operation that does not return a result.

 This is a functional interface
whose functional method is `run()`.

**See also:** java.util.concurrent.Callable

**Since:** 1.0

## Runnable.run()

```java
void run()
```

Runs this operation.
