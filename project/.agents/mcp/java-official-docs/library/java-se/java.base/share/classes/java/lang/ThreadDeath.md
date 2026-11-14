---
title: "ThreadDeath class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ThreadDeath.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThreadDeath class (java.lang)

```java
public class ThreadDeath extends Error
```

An instance of `ThreadDeath` was originally specified to be thrown
by a victim thread when "stopped" with `Thread.stop()`.

**Deprecated:** `Thread.stop()` was originally specified to "stop" a victim
     thread by causing the victim thread to throw a `ThreadDeath`. It
     was inherently unsafe and deprecated in an early JDK release. The ability
     to "stop" a thread with `Thread.stop` has been removed and the
     `Thread.stop` method changed to throw an exception. Consequently,
     `ThreadDeath` is also deprecated, for removal.

**Since:** 1.0

## ThreadDeath.ThreadDeath()

```java
public ThreadDeath()
```

Constructs a `ThreadDeath`.
