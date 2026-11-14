---
title: "ObjIntConsumer interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/ObjIntConsumer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjIntConsumer interface (java.util.function)

```java
public interface ObjIntConsumer<T>
```

Represents an operation that accepts an object-valued and a
`int`-valued argument, and returns no result.  This is the
`(reference, int)` specialization of `BiConsumer`.
Unlike most other functional interfaces, `ObjIntConsumer` is
expected to operate via side-effects.

This is a functional interface
whose functional method is int).

Parameters:

- `<T>`: the type of the object argument to the operation

**See also:** BiConsumer

**Since:** 1.8

## ObjIntConsumer.accept(T, int)

```java
void accept(T t, int value)
```

Performs this operation on the given arguments.

Parameters:

- `t`: the first input argument
- `value`: the second input argument
