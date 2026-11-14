---
title: "UnaryOperator interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/UnaryOperator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnaryOperator interface (java.util.function)

```java
public interface UnaryOperator<T> extends Function<T, T>
```

Represents an operation on a single operand that produces a result of the
same type as its operand.  This is a specialization of `Function` for
the case where the operand and result are of the same type.

This is a functional interface
whose functional method is `apply(Object)`.

Parameters:

- `<T>`: the type of the operand and result of the operator

**See also:** Function

**Since:** 1.8

## UnaryOperator.identity()

```java
static <T> UnaryOperator<T> identity()
```

Returns a unary operator that always returns its input argument.

Parameters:

- `<T>`: the type of the input and output of the operator

**Returns:** a unary operator that always returns its input argument
