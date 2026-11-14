---
title: "BiFunction interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/BiFunction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BiFunction interface (java.util.function)

```java
public interface BiFunction<T, U, R>
```

Represents a function that accepts two arguments and produces a result.
This is the two-arity specialization of `Function`.

This is a functional interface
whose functional method is Object).

Parameters:

- `<T>`: the type of the first argument to the function
- ``: the type of the second argument to the function
- `<R>`: the type of the result of the function

**See also:** Function

**Since:** 1.8

## BiFunction.apply(T, U)

```java
R apply(T t, U u)
```

Applies this function to the given arguments.

Parameters:

- `t`: the first function argument
- `u`: the second function argument

**Returns:** the function result

## BiFunction.andThen(Function<? super R, ? extends V>)

```java
default <V> BiFunction<T, U, V> andThen(Function<? super R, ? extends V> after)
```

Returns a composed function that first applies this function to
its input, and then applies the `after` function to the result.
If evaluation of either function throws an exception, it is relayed to
the caller of the composed function.

Parameters:

- `<V>`: the type of output of the `after` function, and of the composed function
- `after`: the function to apply after this function is applied

**Returns:** a composed function that first applies this function and then
applies the `after` function

Throws:

- `NullPointerException`: if after is null
