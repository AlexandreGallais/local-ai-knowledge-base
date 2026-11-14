---
title: "PaddingLayout interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/PaddingLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PaddingLayout interface (java.lang.foreign)

```java
public sealed interface PaddingLayout extends MemoryLayout permits PaddingLayoutImpl
```

A padding layout. A padding layout specifies the size of extra space which is
typically not accessed by applications, and is typically used for aligning member
layouts around word boundaries.

**Implementation requirements:** Implementing classes are immutable, thread-safe and
value-based.

**Since:** 22

## PaddingLayout.withName(String)

```java
PaddingLayout withName(String name)
```

(inherited documentation)

## PaddingLayout.withoutName()

```java
PaddingLayout withoutName()
```

(inherited documentation)

## PaddingLayout.withByteAlignment(long)

```java
PaddingLayout withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)
