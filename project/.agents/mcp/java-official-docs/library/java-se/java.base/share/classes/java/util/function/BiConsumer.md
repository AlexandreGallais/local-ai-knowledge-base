---
title: "BiConsumer interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/BiConsumer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BiConsumer interface (java.util.function)

```java
public interface BiConsumer<T, U>
```

Represents an operation that accepts two input arguments and returns no
result.  This is the two-arity specialization of `Consumer`.
Unlike most other functional interfaces, `BiConsumer` is expected
to operate via side-effects.

This is a functional interface
whose functional method is Object).

Parameters:

- `<T>`: the type of the first argument to the operation
- ``: the type of the second argument to the operation

**See also:** Consumer

**Since:** 1.8

## BiConsumer.accept(T, U)

```java
void accept(T t, U u)
```

Performs this operation on the given arguments.

Parameters:

- `t`: the first input argument
- `u`: the second input argument

## BiConsumer.andThen(BiConsumer<? super T, ? super U>)

```java
default BiConsumer<T, U> andThen(BiConsumer<? super T, ? super U> after)
```

Returns a composed `BiConsumer` that performs, in sequence, this
operation followed by the `after` operation. If performing either
operation throws an exception, it is relayed to the caller of the
composed operation.  If performing this operation throws an exception,
the `after` operation will not be performed.

Parameters:

- `after`: the operation to perform after this operation

**Returns:** a composed `BiConsumer` that performs in sequence this
operation followed by the `after` operation

Throws:

- `NullPointerException`: if `after` is null
