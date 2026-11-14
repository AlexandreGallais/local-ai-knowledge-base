---
title: "DoubleBinaryOperator interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/DoubleBinaryOperator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleBinaryOperator interface (java.util.function)

```java
public interface DoubleBinaryOperator
```

Represents an operation upon two `double`-valued operands and producing a
`double`-valued result.   This is the primitive type specialization of
`BinaryOperator` for `double`.

This is a functional interface
whose functional method is double).

**See also:** BinaryOperator

**See also:** DoubleUnaryOperator

**Since:** 1.8

## DoubleBinaryOperator.applyAsDouble(double, double)

```java
double applyAsDouble(double left, double right)
```

Applies this operator to the given operands.

Parameters:

- `left`: the first operand
- `right`: the second operand

**Returns:** the operator result
