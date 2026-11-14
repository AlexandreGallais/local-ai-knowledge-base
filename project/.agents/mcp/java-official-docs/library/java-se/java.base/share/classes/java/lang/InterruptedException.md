---
title: "InterruptedException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/InterruptedException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InterruptedException class (java.lang)

```java
public class InterruptedException extends Exception
```

Thrown when a thread is waiting, sleeping, or otherwise occupied,
and the thread is interrupted, either before or during the activity.
Occasionally a method may wish to test whether the current
thread has been interrupted, and if so, to immediately throw
this exception.  The following code can be used to achieve
this effect:

**See also:** java.lang.Object#wait()

**See also:** java.lang.Object#wait(long)

**See also:** java.lang.Object#wait(long, int)

**See also:** java.lang.Thread#sleep(long)

**See also:** java.lang.Thread#interrupt()

**See also:** java.lang.Thread#interrupted()

**Since:** 1.0

## InterruptedException.InterruptedException()

```java
public InterruptedException()
```

Constructs an `InterruptedException` with no detail  message.

## InterruptedException.InterruptedException(String)

```java
public InterruptedException(String s)
```

Constructs an `InterruptedException` with the
specified detail message.

Parameters:

- `s`: the detail message.
