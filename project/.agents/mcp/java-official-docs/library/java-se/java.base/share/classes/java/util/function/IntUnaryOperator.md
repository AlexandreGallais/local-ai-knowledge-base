---
title: "IntUnaryOperator interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/IntUnaryOperator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IntUnaryOperator interface (java.util.function)

```java
public interface IntUnaryOperator
```

Represents an operation on a single `int`-valued operand that produces
an `int`-valued result.  This is the primitive type specialization of
`UnaryOperator` for `int`.

This is a functional interface
whose functional method is `applyAsInt(int)`.

**See also:** UnaryOperator

**Since:** 1.8

## IntUnaryOperator.applyAsInt(int)

```java
int applyAsInt(int operand)
```

Applies this operator to the given operand.

Parameters:

- `operand`: the operand

**Returns:** the operator result

## IntUnaryOperator.compose(IntUnaryOperator)

```java
default IntUnaryOperator compose(IntUnaryOperator before)
```

Returns a composed operator that first applies the `before`
operator to its input, and then applies this operator to the result.
If evaluation of either operator throws an exception, it is relayed to
the caller of the composed operator.

Parameters:

- `before`: the operator to apply before this operator is applied

**Returns:** a composed operator that first applies the `before`
operator and then applies this operator

**See also:** #andThen(IntUnaryOperator)

Throws:

- `NullPointerException`: if before is null

## IntUnaryOperator.andThen(IntUnaryOperator)

```java
default IntUnaryOperator andThen(IntUnaryOperator after)
```

Returns a composed operator that first applies this operator to
its input, and then applies the `after` operator to the result.
If evaluation of either operator throws an exception, it is relayed to
the caller of the composed operator.

Parameters:

- `after`: the operator to apply after this operator is applied

**Returns:** a composed operator that first applies this operator and then
applies the `after` operator

**See also:** #compose(IntUnaryOperator)

Throws:

- `NullPointerException`: if after is null

## IntUnaryOperator.identity()

```java
static IntUnaryOperator identity()
```

Returns a unary operator that always returns its input argument.

**Returns:** a unary operator that always returns its input argument
