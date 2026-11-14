---
title: "AccessFlags interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/AccessFlags.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AccessFlags interface (java.lang.classfile)

```java
public sealed interface AccessFlags extends ClassElement, MethodElement, FieldElement permits AccessFlagsImpl
```

Models the access flags for a class, method, or field.  The access flags
appears exactly once in each class, method, or field; a `ClassBuilder` and a `FieldBuilder` chooses an unspecified default value
if access flags are not provided, and a `MethodBuilder` is always
created with access flags.

`AccessFlags` cannot be created via a factory method directly; it can
be created with `withFlags` methods on the respective builders.

A `MethodBuilder` throws an `IllegalArgumentException` if it is
supplied an `AccessFlags` object that changes the preexisting
ACC_STATIC flag of the builder, because the
access flag change may invalidate previously supplied data to the builder.

**API note:** The access flags of classes, methods, and fields are modeled as a standalone
object to support streaming as elements for `ClassFileTransform`.
Other access flags are not elements of a `CompoundElement` and thus not
modeled by `AccessFlags`; they provide their own `flagsMask`,
`flags`, and `has` methods.

**See also:** ClassModel#flags()

**See also:** FieldModel#flags()

**See also:** MethodModel#flags()

**See also:** ClassBuilder#withFlags

**See also:** FieldBuilder#withFlags

**See also:** MethodBuilder#withFlags

**Since:** 24

## AccessFlags.flagsMask()

```java
int flagsMask()
```

It is in the range of unsigned
short, `[0, 0xFFFF]`.

## AccessFlags.flags()

```java
Set<AccessFlag> flags()
```

**See also:** #location()

Throws:

- `IllegalArgumentException`: if the flags mask has any undefined bit set

## AccessFlags.has(AccessFlag)

```java
boolean has(AccessFlag flag)
```

If the specified flag
is not available to this location, returns
`false`.

Parameters:

- `flag`: the flag to test

**See also:** #location()

## AccessFlags.location()

```java
AccessFlag.Location location()
```

**See also:** AccessFlag.Location#CLASS

**See also:** AccessFlag.Location#FIELD

**See also:** AccessFlag.Location#METHOD
