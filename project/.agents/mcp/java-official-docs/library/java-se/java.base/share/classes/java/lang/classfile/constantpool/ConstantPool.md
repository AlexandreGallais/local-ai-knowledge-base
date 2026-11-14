---
title: "ConstantPool interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ConstantPool.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantPool interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantPool extends Iterable<PoolEntry> permits ClassReader, ConstantPoolBuilder
```

Provides read access to the constant pool and the bootstrap method table of a
`class` file.

#### Index in the Constant Pool

The constant pool entries are accessed by index.  A valid index is in the
range of [1, size()).  It is unusable if a `LongEntry` or `DoubleEntry` is at its previous
index.

**See also:** BootstrapMethodsAttribute

**jvms:** 4.4 The Constant Pool

**sealedGraph:**

**Since:** 24

## ConstantPool.entryByIndex(int)

```java
PoolEntry entryByIndex(int index)
```

Parameters:

- `index`: the index within the pool of the desired entry

**API note:** If only a particular type of entry is expected, use int, Class).

Throws:

- `ConstantPoolException`: if the index is out of range of the constant pool, or is considered unusable

## ConstantPool.size()

```java
int size()
```

The actual number of entries is lower because `0`, `size()` are not valid, and a valid index may be unusable.

**See also:** ##index Index in the Constant Pool

## ConstantPool.entryByIndex(int, Class<T>)

```java
<T extends PoolEntry> T entryByIndex(int index, Class<T> cls)
```

Parameters:

- `<T>`: the entry type
- `index`: the index within the pool of the desired entry
- `cls`: the entry type

Throws:

- `ConstantPoolException`: if the index is out of range of the constant pool or considered unusable, or the entry is not of the given type

## ConstantPool.iterator()

```java
default Iterator<PoolEntry> iterator()
```

**API note:** This skips any unusable index and is less error-prone than iterating by
raw index.  See *Index in the Constant Pool*.

## ConstantPool.bootstrapMethodEntry(int)

```java
BootstrapMethodEntry bootstrapMethodEntry(int index)
```

Parameters:

- `index`: the index within the bootstrap method table of the desired entry

Throws:

- `ConstantPoolException`: if the index is out of range of the bootstrap methods

## ConstantPool.bootstrapMethodCount()

```java
int bootstrapMethodCount()
```
