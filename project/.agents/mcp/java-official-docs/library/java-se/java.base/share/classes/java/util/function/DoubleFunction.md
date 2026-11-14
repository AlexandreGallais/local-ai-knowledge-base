---
title: "DoubleFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/DoubleFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleFunction interface (java.util.function)

```java
public interface DoubleFunction<R>
```

Represents a function that accepts a double-valued argument and produces a
result.  This is the `double`-consuming primitive specialization for
`Function`.

This is a functional interface
whose functional method is `apply(double)`.

Parameters:

- `<R>`: the type of the result of the function

**See also:** Function

**Since:** 1.8

## DoubleFunction.apply(double)

```java
R apply(double value)
```

Applies this function to the given argument.

Parameters:

- `value`: the function argument

**Returns:** the function result
