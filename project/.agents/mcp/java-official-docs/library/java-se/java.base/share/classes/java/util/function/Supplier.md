---
title: "Supplier interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/Supplier.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Supplier interface (java.util.function)

```java
public interface Supplier<T>
```

Represents a supplier of results.

There is no requirement that a new or distinct result be returned each
time the supplier is invoked.

This is a functional interface
whose functional method is `get()`.

Parameters:

- `<T>`: the type of results supplied by this supplier

**Since:** 1.8

## Supplier.get()

```java
T get()
```

Gets a result.

**Returns:** a result
