---
title: "IntToLongFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/IntToLongFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IntToLongFunction interface (java.util.function)

```java
public interface IntToLongFunction
```

Represents a function that accepts an int-valued argument and produces a
long-valued result.  This is the `int`-to-`long` primitive
specialization for `Function`.

This is a functional interface
whose functional method is `applyAsLong(int)`.

**See also:** Function

**Since:** 1.8

## IntToLongFunction.applyAsLong(int)

```java
long applyAsLong(int value)
```

Applies this function to the given argument.

Parameters:

- `value`: the function argument

**Returns:** the function result
