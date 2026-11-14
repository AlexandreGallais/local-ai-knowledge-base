---
title: "ThreadFactory interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ThreadFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThreadFactory interface (java.util.concurrent)

```java
public interface ThreadFactory
```

An object that creates new threads on demand.  Using thread factories
removes hardwiring of calls to new Thread,
enabling applications to use special thread subclasses, priorities, etc.

The simplest implementation of this interface is just:

```java
class SimpleThreadFactory implements ThreadFactory {
  public Thread newThread(Runnable r) {
    return new Thread(r);
  }
}
```

The `Executors.defaultThreadFactory` method provides a more
useful simple implementation, that sets the created thread context
to known values before returning it.

**Since:** 1.5

**See also:** Thread.Builder#factory()

## ThreadFactory.newThread(Runnable)

```java
Thread newThread(Runnable r)
```

Constructs a new unstarted `Thread` to run the given runnable.

Parameters:

- `r`: a runnable to be executed by new thread instance

**Returns:** constructed thread, or `null` if the request to
        create a thread is rejected

**See also:** Inheritance when
creating threads
