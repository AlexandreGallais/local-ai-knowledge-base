---
title: "LongConsumer interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/LongConsumer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongConsumer interface (java.util.function)

```java
public interface LongConsumer
```

Represents an operation that accepts a single `long`-valued argument and
returns no result.  This is the primitive type specialization of
`Consumer` for `long`.  Unlike most other functional interfaces,
`LongConsumer` is expected to operate via side-effects.

This is a functional interface
whose functional method is `accept(long)`.

**See also:** Consumer

**Since:** 1.8

## LongConsumer.accept(long)

```java
void accept(long value)
```

Performs this operation on the given argument.

Parameters:

- `value`: the input argument

## LongConsumer.andThen(LongConsumer)

```java
default LongConsumer andThen(LongConsumer after)
```

Returns a composed `LongConsumer` that performs, in sequence, this
operation followed by the `after` operation. If performing either
operation throws an exception, it is relayed to the caller of the
composed operation.  If performing this operation throws an exception,
the `after` operation will not be performed.

Parameters:

- `after`: the operation to perform after this operation

**Returns:** a composed `LongConsumer` that performs in sequence this
operation followed by the `after` operation

Throws:

- `NullPointerException`: if `after` is null
