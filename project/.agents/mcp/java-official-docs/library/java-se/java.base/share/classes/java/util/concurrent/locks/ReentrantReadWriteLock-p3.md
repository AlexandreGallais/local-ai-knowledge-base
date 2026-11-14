---
title: "ReentrantReadWriteLock class (java.util.concurrent.locks) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/ReentrantReadWriteLock.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReentrantReadWriteLock class (java.util.concurrent.locks) (part 3 of 3)

## ReentrantReadWriteLock.toString()

```java
public String toString()
```

Returns a string identifying this lock, as well as its lock state.
The state, in brackets, includes the String `"Write locks ="`
followed by the number of reentrantly held write locks, and the
String `"Read locks ="` followed by the number of held
read locks.

**Returns:** a string identifying this lock, as well as its lock state
