---
title: "LongToDoubleFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/LongToDoubleFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongToDoubleFunction interface (java.util.function)

```java
public interface LongToDoubleFunction
```

Represents a function that accepts a long-valued argument and produces a
double-valued result.  This is the `long`-to-`double` primitive
specialization for `Function`.

This is a functional interface
whose functional method is `applyAsDouble(long)`.

**See also:** Function

**Since:** 1.8

## LongToDoubleFunction.applyAsDouble(long)

```java
double applyAsDouble(long value)
```

Applies this function to the given argument.

Parameters:

- `value`: the function argument

**Returns:** the function result
