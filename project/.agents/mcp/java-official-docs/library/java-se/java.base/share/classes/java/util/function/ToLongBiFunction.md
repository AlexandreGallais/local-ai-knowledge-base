---
title: "ToLongBiFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/ToLongBiFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ToLongBiFunction interface (java.util.function)

```java
public interface ToLongBiFunction<T, U>
```

Represents a function that accepts two arguments and produces a long-valued
result.  This is the `long`-producing primitive specialization for
`BiFunction`.

This is a functional interface
whose functional method is Object).

Parameters:

- `<T>`: the type of the first argument to the function
- ``: the type of the second argument to the function

**See also:** BiFunction

**Since:** 1.8

## ToLongBiFunction.applyAsLong(T, U)

```java
long applyAsLong(T t, U u)
```

Applies this function to the given arguments.

Parameters:

- `t`: the first function argument
- `u`: the second function argument

**Returns:** the function result
