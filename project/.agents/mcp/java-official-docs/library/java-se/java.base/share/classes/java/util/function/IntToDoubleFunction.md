---
title: "IntToDoubleFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/IntToDoubleFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IntToDoubleFunction interface (java.util.function)

```java
public interface IntToDoubleFunction
```

Represents a function that accepts an int-valued argument and produces a
double-valued result.  This is the `int`-to-`double` primitive
specialization for `Function`.

This is a functional interface
whose functional method is `applyAsDouble(int)`.

**See also:** Function

**Since:** 1.8

## IntToDoubleFunction.applyAsDouble(int)

```java
double applyAsDouble(int value)
```

Applies this function to the given argument.

Parameters:

- `value`: the function argument

**Returns:** the function result
