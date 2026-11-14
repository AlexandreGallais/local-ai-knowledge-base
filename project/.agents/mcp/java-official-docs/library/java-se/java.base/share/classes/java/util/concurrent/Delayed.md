---
title: "Delayed interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Delayed.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Delayed interface (java.util.concurrent)

```java
public interface Delayed extends Comparable<Delayed>
```

A mix-in style interface for marking objects that should be
acted upon after a given delay.

An implementation of this interface must define a
`compareTo` method that provides an ordering consistent with
its `getDelay` method.

**Since:** 1.5

## Delayed.getDelay(TimeUnit)

```java
long getDelay(TimeUnit unit)
```

Returns the remaining delay associated with this object, in the
given time unit.

Parameters:

- `unit`: the time unit

**Returns:** the remaining delay; zero or negative values indicate
that the delay has already elapsed
