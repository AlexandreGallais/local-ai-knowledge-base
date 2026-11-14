---
title: "ToLongFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/ToLongFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ToLongFunction interface (java.util.function)

```java
public interface ToLongFunction<T>
```

Represents a function that produces a long-valued result.  This is the
`long`-producing primitive specialization for `Function`.

This is a functional interface
whose functional method is `applyAsLong(Object)`.

Parameters:

- `<T>`: the type of the input to the function

**See also:** Function

**Since:** 1.8

## ToLongFunction.applyAsLong(T)

```java
long applyAsLong(T value)
```

Applies this function to the given argument.

Parameters:

- `value`: the function argument

**Returns:** the function result
