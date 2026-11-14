---
title: "BooleanSupplier interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/BooleanSupplier.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BooleanSupplier interface (java.util.function)

```java
public interface BooleanSupplier
```

Represents a supplier of `boolean`-valued results.  This is the
`boolean`-producing primitive specialization of `Supplier`.

There is no requirement that a new or distinct result be returned each
time the supplier is invoked.

This is a functional interface
whose functional method is `getAsBoolean()`.

**See also:** Supplier

**Since:** 1.8

## BooleanSupplier.getAsBoolean()

```java
boolean getAsBoolean()
```

Gets a result.

**Returns:** a result
