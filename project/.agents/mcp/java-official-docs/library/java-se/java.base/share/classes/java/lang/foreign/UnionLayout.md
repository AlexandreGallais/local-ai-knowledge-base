---
title: "UnionLayout interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/UnionLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnionLayout interface (java.lang.foreign)

```java
public sealed interface UnionLayout extends GroupLayout permits UnionLayoutImpl
```

A group layout whose member layouts are laid out at the same starting offset.

**Implementation requirements:** Implementing classes are immutable, thread-safe and
value-based.

**Since:** 22

## UnionLayout.withName(String)

```java
UnionLayout withName(String name)
```

(inherited documentation)

## UnionLayout.withoutName()

```java
UnionLayout withoutName()
```

(inherited documentation)

## UnionLayout.withByteAlignment(long)

```java
UnionLayout withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)
