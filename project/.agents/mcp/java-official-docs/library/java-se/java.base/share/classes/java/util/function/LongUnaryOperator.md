---
title: "LongUnaryOperator interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/LongUnaryOperator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongUnaryOperator interface (java.util.function)

```java
public interface LongUnaryOperator
```

Represents an operation on a single `long`-valued operand that produces
a `long`-valued result.  This is the primitive type specialization of
`UnaryOperator` for `long`.

This is a functional interface
whose functional method is `applyAsLong(long)`.

**See also:** UnaryOperator

**Since:** 1.8

## LongUnaryOperator.applyAsLong(long)

```java
long applyAsLong(long operand)
```

Applies this operator to the given operand.

Parameters:

- `operand`: the operand

**Returns:** the operator result

## LongUnaryOperator.compose(LongUnaryOperator)

```java
default LongUnaryOperator compose(LongUnaryOperator before)
```

Returns a composed operator that first applies the `before`
operator to its input, and then applies this operator to the result.
If evaluation of either operator throws an exception, it is relayed to
the caller of the composed operator.

Parameters:

- `before`: the operator to apply before this operator is applied

**Returns:** a composed operator that first applies the `before`
operator and then applies this operator

**See also:** #andThen(LongUnaryOperator)

Throws:

- `NullPointerException`: if before is null

## LongUnaryOperator.andThen(LongUnaryOperator)

```java
default LongUnaryOperator andThen(LongUnaryOperator after)
```

Returns a composed operator that first applies this operator to
its input, and then applies the `after` operator to the result.
If evaluation of either operator throws an exception, it is relayed to
the caller of the composed operator.

Parameters:

- `after`: the operator to apply after this operator is applied

**Returns:** a composed operator that first applies this operator and then
applies the `after` operator

**See also:** #compose(LongUnaryOperator)

Throws:

- `NullPointerException`: if after is null

## LongUnaryOperator.identity()

```java
static LongUnaryOperator identity()
```

Returns a unary operator that always returns its input argument.

**Returns:** a unary operator that always returns its input argument
