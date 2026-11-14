---
title: "InnerClassInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/InnerClassInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InnerClassInfo interface (java.lang.classfile.attribute)

```java
public sealed interface InnerClassInfo permits UnboundAttribute.UnboundInnerClassInfo
```

Models a single entry in the `InnerClassesAttribute`.

**See also:** InnerClassesAttribute#classes()

**jvms:** 4.7.6 The `InnerClasses` Attribute

**Since:** 24

## InnerClassInfo.innerClass()

```java
ClassEntry innerClass()
```

## InnerClassInfo.outerClass()

```java
Optional<ClassEntry> outerClass()
```

This may be empty if this class is
local or anonymous.

**See also:** Class#getDeclaringClass()

## InnerClassInfo.innerName()

```java
Optional<Utf8Entry> innerName()
```

**See also:** Class#getSimpleName()

## InnerClassInfo.flagsMask()

```java
int flagsMask()
```

It is in the range of unsigned short, `[0, 0xFFFF]`.

**See also:** Class#getModifiers()

**See also:** AccessFlag.Location#INNER_CLASS

## InnerClassInfo.flags()

```java
default Set<AccessFlag> flags()
```

**See also:** Class#accessFlags()

**See also:** AccessFlag.Location#INNER_CLASS

Throws:

- `IllegalArgumentException`: if the flags mask has any undefined bit set

## InnerClassInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

Parameters:

- `flag`: the access flag

**See also:** AccessFlag.Location#INNER_CLASS

## InnerClassInfo.of(ClassEntry, Optional<ClassEntry>, Optional<Utf8Entry>, int)

```java
static InnerClassInfo of(ClassEntry innerClass, Optional<ClassEntry> outerClass, Optional<Utf8Entry> innerName, int flags)
```

Parameters:

- `innerClass`: the nested class being described
- `outerClass`: the class that has the nested class as a member, if it exists
- `innerName`: the simple name of the nested class, if it is not anonymous
- `flags`: the inner class access flags

## InnerClassInfo.of(ClassDesc, Optional<ClassDesc>, Optional<String>, int)

```java
static InnerClassInfo of(ClassDesc innerClass, Optional<ClassDesc> outerClass, Optional<String> innerName, int flags)
```

Parameters:

- `innerClass`: the nested class being described
- `outerClass`: the class that has the nested class as a member, if it exists
- `innerName`: the simple name of the nested class, if it is not anonymous
- `flags`: the inner class access flags

Throws:

- `IllegalArgumentException`: if `innerClass` or `outerClass` represents a primitive type

## InnerClassInfo.of(ClassDesc, Optional<ClassDesc>, Optional<String>, AccessFlag...)

```java
static InnerClassInfo of(ClassDesc innerClass, Optional<ClassDesc> outerClass, Optional<String> innerName, AccessFlag... flags)
```

Parameters:

- `innerClass`: the nested class being described
- `outerClass`: the class that has the nested class as a member, if it exists
- `innerName`: the name of the nested class, if it is not anonymous
- `flags`: the inner class access flags

Throws:

- `IllegalArgumentException`: if `innerClass` or `outerClass` represents a primitive type, or if any flag cannot be applied to the `AccessFlag.Location.INNER_CLASS` location
