---
title: "ObjDoubleConsumer interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/ObjDoubleConsumer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjDoubleConsumer interface (java.util.function)

```java
public interface ObjDoubleConsumer<T>
```

Represents an operation that accepts an object-valued and a
`double`-valued argument, and returns no result.  This is the
`(reference, double)` specialization of `BiConsumer`.
Unlike most other functional interfaces, `ObjDoubleConsumer` is
expected to operate via side-effects.

This is a functional interface
whose functional method is double).

Parameters:

- `<T>`: the type of the object argument to the operation

**See also:** BiConsumer

**Since:** 1.8

## ObjDoubleConsumer.accept(T, double)

```java
void accept(T t, double value)
```

Performs this operation on the given arguments.

Parameters:

- `t`: the first input argument
- `value`: the second input argument
