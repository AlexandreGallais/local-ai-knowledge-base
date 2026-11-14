---
title: "LongSupplier interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/LongSupplier.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongSupplier interface (java.util.function)

```java
public interface LongSupplier
```

Represents a supplier of `long`-valued results.  This is the
`long`-producing primitive specialization of `Supplier`.

There is no requirement that a distinct result be returned each
time the supplier is invoked.

This is a functional interface
whose functional method is `getAsLong()`.

**See also:** Supplier

**Since:** 1.8

## LongSupplier.getAsLong()

```java
long getAsLong()
```

Gets a result.

**Returns:** a result
