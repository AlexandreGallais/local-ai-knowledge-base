---
title: "Callable interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Callable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Callable interface (java.util.concurrent)

```java
public interface Callable<V>
```

A task that returns a result and may throw an exception.
Implementors define a single method with no arguments called
`call`.

The `Callable` interface is similar to `java.lang.Runnable`, in that both are designed for classes whose
instances are potentially executed by another thread.  A
`Runnable`, however, does not return a result and cannot
throw a checked exception.

The `Executors` class contains utility methods to
convert from other common forms to `Callable` classes.

Parameters:

- `<V>`: the result type of method `call`

**See also:** Executor

**Since:** 1.5

## Callable.call()

```java
V call() throws Exception
```

Computes a result, or throws an exception if unable to do so.

**Returns:** computed result

Throws:

- `Exception`: if unable to compute a result
