---
title: "Consumer interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/Consumer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Consumer interface (java.util.function)

```java
public interface Consumer<T>
```

Represents an operation that accepts a single input argument and returns no
result. Unlike most other functional interfaces, `Consumer` is expected
to operate via side-effects.

This is a functional interface
whose functional method is `accept(Object)`.

Parameters:

- `<T>`: the type of the input to the operation

**Since:** 1.8

## Consumer.accept(T)

```java
void accept(T t)
```

Performs this operation on the given argument.

Parameters:

- `t`: the input argument

## Consumer.andThen(Consumer<? super T>)

```java
default Consumer<T> andThen(Consumer<? super T> after)
```

Returns a composed `Consumer` that performs, in sequence, this
operation followed by the `after` operation. If performing either
operation throws an exception, it is relayed to the caller of the
composed operation.  If performing this operation throws an exception,
the `after` operation will not be performed.

Parameters:

- `after`: the operation to perform after this operation

**Returns:** a composed `Consumer` that performs in sequence this
operation followed by the `after` operation

Throws:

- `NullPointerException`: if `after` is null
