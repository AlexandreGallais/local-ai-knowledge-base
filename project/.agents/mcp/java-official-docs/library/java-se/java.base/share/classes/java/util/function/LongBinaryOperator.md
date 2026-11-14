---
title: "LongBinaryOperator interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/LongBinaryOperator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongBinaryOperator interface (java.util.function)

```java
public interface LongBinaryOperator
```

Represents an operation upon two `long`-valued operands and producing a
`long`-valued result.   This is the primitive type specialization of
`BinaryOperator` for `long`.

This is a functional interface
whose functional method is long).

**See also:** BinaryOperator

**See also:** LongUnaryOperator

**Since:** 1.8

## LongBinaryOperator.applyAsLong(long, long)

```java
long applyAsLong(long left, long right)
```

Applies this operator to the given operands.

Parameters:

- `left`: the first operand
- `right`: the second operand

**Returns:** the operator result
