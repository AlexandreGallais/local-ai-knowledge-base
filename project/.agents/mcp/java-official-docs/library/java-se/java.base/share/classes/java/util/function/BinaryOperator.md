---
title: "BinaryOperator interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/BinaryOperator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BinaryOperator interface (java.util.function)

```java
public interface BinaryOperator<T> extends BiFunction<T,T,T>
```

Represents an operation upon two operands of the same type, producing a result
of the same type as the operands.  This is a specialization of
`BiFunction` for the case where the operands and the result are all of
the same type.

This is a functional interface
whose functional method is Object).

Parameters:

- `<T>`: the type of the operands and result of the operator

**See also:** BiFunction

**See also:** UnaryOperator

**Since:** 1.8

## BinaryOperator.minBy(Comparator<? super T>)

```java
public static <T> BinaryOperator<T> minBy(Comparator<? super T> comparator)
```

Returns a `BinaryOperator` which returns the lesser of two elements
according to the specified `Comparator`.

Parameters:

- `<T>`: the type of the input arguments of the comparator
- `comparator`: a `Comparator` for comparing the two values

**Returns:** a `BinaryOperator` which returns the lesser of its operands,
        according to the supplied `Comparator`

Throws:

- `NullPointerException`: if the argument is null

## BinaryOperator.maxBy(Comparator<? super T>)

```java
public static <T> BinaryOperator<T> maxBy(Comparator<? super T> comparator)
```

Returns a `BinaryOperator` which returns the greater of two elements
according to the specified `Comparator`.

Parameters:

- `<T>`: the type of the input arguments of the comparator
- `comparator`: a `Comparator` for comparing the two values

**Returns:** a `BinaryOperator` which returns the greater of its operands,
        according to the supplied `Comparator`

Throws:

- `NullPointerException`: if the argument is null
