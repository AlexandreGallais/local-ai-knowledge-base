---
title: "GroupLayout interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/GroupLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GroupLayout interface (java.lang.foreign)

```java
public sealed interface GroupLayout extends MemoryLayout permits StructLayout, UnionLayout
```

A compound layout that is an aggregation of multiple, heterogeneous
*member layouts*. There are two ways in which member layouts can be combined:
if member layouts are laid out one after the other, the resulting group layout is a
struct layout; conversely, if all member layouts are laid
out at the same starting offset, the resulting group layout is a
union layout.

**Implementation requirements:** This class is immutable, thread-safe and
value-based.

**sealedGraph:**

**Since:** 22

## GroupLayout.memberLayouts()

```java
List<MemoryLayout> memberLayouts()
```

**API note:** the order in which member layouts are returned is the same order in which
         member layouts have been passed to one of the group layout factory methods
         (see `MemoryLayout.structLayout(MemoryLayout...)` and
         `MemoryLayout.unionLayout(MemoryLayout...)`).

## GroupLayout.withName(String)

```java
GroupLayout withName(String name)
```

(inherited documentation)

## GroupLayout.withoutName()

```java
GroupLayout withoutName()
```

(inherited documentation)

## GroupLayout.withByteAlignment(long)

```java
GroupLayout withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)
- `IllegalArgumentException`: if `byteAlignment` is less than `M`, where `M` is the maximum alignment constraint in any of the member layouts associated with this group layout
