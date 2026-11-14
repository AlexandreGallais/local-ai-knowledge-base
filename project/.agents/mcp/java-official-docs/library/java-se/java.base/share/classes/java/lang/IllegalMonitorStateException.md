---
title: "IllegalMonitorStateException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IllegalMonitorStateException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalMonitorStateException class (java.lang)

```java
public class IllegalMonitorStateException extends RuntimeException
```

Thrown to indicate that a thread has attempted to wait on an
object's monitor or to notify other threads waiting on an object's
monitor without owning the specified monitor.

**See also:** java.lang.Object#notify()

**See also:** java.lang.Object#notifyAll()

**See also:** java.lang.Object#wait()

**See also:** java.lang.Object#wait(long)

**See also:** java.lang.Object#wait(long, int)

**Since:** 1.0

## IllegalMonitorStateException.IllegalMonitorStateException()

```java
public IllegalMonitorStateException()
```

Constructs an `IllegalMonitorStateException` with no
detail message.

## IllegalMonitorStateException.IllegalMonitorStateException(String)

```java
public IllegalMonitorStateException(String s)
```

Constructs an `IllegalMonitorStateException` with the
specified detail message.

Parameters:

- `s`: the detail message.
