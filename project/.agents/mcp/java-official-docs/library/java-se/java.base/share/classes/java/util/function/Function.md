---
title: "Function interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/Function.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Function interface (java.util.function)

```java
public interface Function<T, R>
```

Represents a function that accepts one argument and produces a result.

This is a functional interface
whose functional method is `apply(Object)`.

Parameters:

- `<T>`: the type of the input to the function
- `<R>`: the type of the result of the function

**Since:** 1.8

## Function.apply(T)

```java
R apply(T t)
```

Applies this function to the given argument.

Parameters:

- `t`: the function argument

**Returns:** the function result

## Function.compose(Function<? super V, ? extends T>)

```java
default <V> Function<V, R> compose(Function<? super V, ? extends T> before)
```

Returns a composed function that first applies the `before`
function to its input, and then applies this function to the result.
If evaluation of either function throws an exception, it is relayed to
the caller of the composed function.

Parameters:

- `<V>`: the type of input to the `before` function, and to the composed function
- `before`: the function to apply before this function is applied

**Returns:** a composed function that first applies the `before`
function and then applies this function

**See also:** #andThen(Function)

Throws:

- `NullPointerException`: if before is null

## Function.andThen(Function<? super R, ? extends V>)

```java
default <V> Function<T, V> andThen(Function<? super R, ? extends V> after)
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

**See also:** #compose(Function)

Throws:

- `NullPointerException`: if after is null

## Function.identity()

```java
static <T> Function<T, T> identity()
```

Returns a function that always returns its input argument.

Parameters:

- `<T>`: the type of the input and output objects to the function

**Returns:** a function that always returns its input argument
