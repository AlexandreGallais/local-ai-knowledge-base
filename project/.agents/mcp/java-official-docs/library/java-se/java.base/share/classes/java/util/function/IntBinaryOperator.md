---
title: "IntBinaryOperator interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/IntBinaryOperator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IntBinaryOperator interface (java.util.function)

```java
public interface IntBinaryOperator
```

Represents an operation upon two `int`-valued operands and producing an
`int`-valued result.   This is the primitive type specialization of
`BinaryOperator` for `int`.

This is a functional interface
whose functional method is int).

**See also:** BinaryOperator

**See also:** IntUnaryOperator

**Since:** 1.8

## IntBinaryOperator.applyAsInt(int, int)

```java
int applyAsInt(int left, int right)
```

Applies this operator to the given operands.

Parameters:

- `left`: the first operand
- `right`: the second operand

**Returns:** the operator result
