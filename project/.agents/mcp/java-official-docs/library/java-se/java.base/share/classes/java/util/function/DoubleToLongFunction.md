---
title: "DoubleToLongFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/DoubleToLongFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleToLongFunction interface (java.util.function)

```java
public interface DoubleToLongFunction
```

Represents a function that accepts a double-valued argument and produces a
long-valued result.  This is the `double`-to-`long` primitive
specialization for `Function`.

This is a functional interface
whose functional method is `applyAsLong(double)`.

**See also:** Function

**Since:** 1.8

## DoubleToLongFunction.applyAsLong(double)

```java
long applyAsLong(double value)
```

Applies this function to the given argument.

Parameters:

- `value`: the function argument

**Returns:** the function result
