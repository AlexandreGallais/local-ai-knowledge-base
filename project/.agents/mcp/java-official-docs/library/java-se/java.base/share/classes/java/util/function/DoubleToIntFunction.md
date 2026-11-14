---
title: "DoubleToIntFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/DoubleToIntFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleToIntFunction interface (java.util.function)

```java
public interface DoubleToIntFunction
```

Represents a function that accepts a double-valued argument and produces an
int-valued result.  This is the `double`-to-`int` primitive
specialization for `Function`.

This is a functional interface
whose functional method is `applyAsInt(double)`.

**See also:** Function

**Since:** 1.8

## DoubleToIntFunction.applyAsInt(double)

```java
int applyAsInt(double value)
```

Applies this function to the given argument.

Parameters:

- `value`: the function argument

**Returns:** the function result
