---
title: "PoolEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/PoolEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PoolEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface PoolEntry permits AnnotationConstantValueEntry, DynamicConstantPoolEntry, LoadableConstantEntry, MemberRefEntry, ModuleEntry, NameAndTypeEntry, PackageEntry
```

Models an entry in the constant pool of a `class` file.  Entries are
read from `class` files, and can be created with a `ConstantPoolBuilder` to write to `class` files.

**Implementation note:** #### Unbound Constant Pool Entries

Implementations may create unbound constant pool entries not belonging to
an actual constant pool.  They conveniently represent constant pool entries
referred by unbound attributes not read from a `class` file.  Their index() return a non-positive invalid
value, and behaviors of their constantPool() are
unspecified.  They are considered alien to any contextual constant pool and will be
converted when they are written to `class` files.

**See also:** ConstantPoolBuilder##alien Alien Constant Pool Entries

**sealedGraph:**

**Since:** 24

## PoolEntry.TAG_CLASS

```java
int TAG_CLASS
```

The tag for CONSTANT_Class constant kind.

## PoolEntry.TAG_DOUBLE

```java
int TAG_DOUBLE
```

The tag for CONSTANT_Double constant kind.

## PoolEntry.TAG_DYNAMIC

```java
int TAG_DYNAMIC
```

The tag for CONSTANT_Dynamic constant kind.

## PoolEntry.TAG_FIELDREF

```java
int TAG_FIELDREF
```

The tag for CONSTANT_Fieldref constant kind.

## PoolEntry.TAG_FLOAT

```java
int TAG_FLOAT
```

The tag for CONSTANT_Float constant kind.

## PoolEntry.TAG_INTEGER

```java
int TAG_INTEGER
```

The tag for CONSTANT_Integer constant kind.

## PoolEntry.TAG_INTERFACE_METHODREF

```java
int TAG_INTERFACE_METHODREF
```

The tag for CONSTANT_InterfaceMethodref constant kind.

## PoolEntry.TAG_INVOKE_DYNAMIC

```java
int TAG_INVOKE_DYNAMIC
```

The tag for CONSTANT_InvokeDynamic constant kind.

## PoolEntry.TAG_LONG

```java
int TAG_LONG
```

The tag for CONSTANT_Long constant kind.

## PoolEntry.TAG_METHOD_HANDLE

```java
int TAG_METHOD_HANDLE
```

The tag for CONSTANT_MethodHandle constant kind.

## PoolEntry.TAG_METHODREF

```java
int TAG_METHODREF
```

The tag for CONSTANT_Methodref constant kind.

## PoolEntry.TAG_METHOD_TYPE

```java
int TAG_METHOD_TYPE
```

The tag for CONSTANT_MethodType constant kind.

## PoolEntry.TAG_MODULE

```java
int TAG_MODULE
```

The tag for CONSTANT_Module constant kind.

## PoolEntry.TAG_NAME_AND_TYPE

```java
int TAG_NAME_AND_TYPE
```

The tag for CONSTANT_NameAndType constant kind.

## PoolEntry.TAG_PACKAGE

```java
int TAG_PACKAGE
```

The tag for CONSTANT_Package constant kind.

## PoolEntry.TAG_STRING

```java
int TAG_STRING
```

The tag for CONSTANT_String constant kind.

## PoolEntry.TAG_UTF8

```java
int TAG_UTF8
```

The tag for CONSTANT_Utf8 constant kind.

## PoolEntry.constantPool()

```java
ConstantPool constantPool()
```

**API note:** Given a `ConstantPoolBuilder` `builder` and a `PoolEntry entry`, use builder.canWriteDirect(entry.constantPool()) instead of object equality
of the constant pool to determine if an entry belongs to the builder.

**See also:** ##unbound Unbound Constant Pool Entries

## PoolEntry.tag()

```java
int tag()
```

**API note:** `TAG_`-prefixed constants in this class, such as `TAG_UTF8`,
describe the possible return values of this method.

## PoolEntry.index()

```java
int index()
```

A valid index is always positive; if the index is non-positive, this
entry is unbound.

**See also:** ##unbound Unbound Constant Pool Entries

## PoolEntry.width()

```java
int width()
```

All pool entries except CONSTANT_Long and CONSTANT_Double have width `1`. These two exceptions
have width `2`, and their subsequent indices at index() + 1 are considered unusable.

**API note:** If this entry is loadable, the width
of this entry does not decide if this entry should be loaded with ldc or ldc2_w.  For example, `ConstantDynamicEntry` always has width `1`, but it must be loaded
with `ldc2_w` if its type is long or double.
Use typeKind().slotSize() to
determine the loading instruction instead.

**See also:** ConstantPool##index Index in the Constant Pool
