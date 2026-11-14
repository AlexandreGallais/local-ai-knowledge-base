---
title: "ModuleRequireInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleRequireInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleRequireInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleRequireInfo permits UnboundAttribute.UnboundModuleRequiresInfo
```

Models a single "requires" declaration in the `ModuleAttribute`.

**See also:** ModuleAttribute#requires()

**See also:** ModuleDescriptor#requires()

**jvms:** 4.7.25 The `Module` Attribute

**Since:** 24

## ModuleRequireInfo.requires()

```java
ModuleEntry requires()
```

## ModuleRequireInfo.requiresFlagsMask()

```java
int requiresFlagsMask()
```

It is in the range of unsigned short, `[0, 0xFFFF]`.

**See also:** ModuleDescriptor.Requires#modifiers()

**See also:** AccessFlag.Location#MODULE_REQUIRES

## ModuleRequireInfo.requiresFlags()

```java
default Set<AccessFlag> requiresFlags()
```

**See also:** ModuleDescriptor.Requires#accessFlags()

**See also:** AccessFlag.Location#MODULE_REQUIRES

Throws:

- `IllegalArgumentException`: if the flags mask has any undefined bit set

## ModuleRequireInfo.requiresVersion()

```java
Optional<Utf8Entry> requiresVersion()
```

**See also:** ModuleDescriptor.Requires#rawCompiledVersion()

## ModuleRequireInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

Parameters:

- `flag`: the access flag

**See also:** AccessFlag.Location#MODULE_REQUIRES

## ModuleRequireInfo.of(ModuleEntry, int, Utf8Entry)

```java
static ModuleRequireInfo of(ModuleEntry requires, int requiresFlags, Utf8Entry requiresVersion)
```

Parameters:

- `requires`: the required module
- `requiresFlags`: the require-specific flags
- `requiresVersion`: the required version, may be `null`

## ModuleRequireInfo.of(ModuleEntry, Collection<AccessFlag>, Utf8Entry)

```java
static ModuleRequireInfo of(ModuleEntry requires, Collection<AccessFlag> requiresFlags, Utf8Entry requiresVersion)
```

Parameters:

- `requires`: the required module
- `requiresFlags`: the require-specific flags
- `requiresVersion`: the required version, may be `null`

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_REQUIRES` location

## ModuleRequireInfo.of(ModuleDesc, int, String)

```java
static ModuleRequireInfo of(ModuleDesc requires, int requiresFlags, String requiresVersion)
```

Parameters:

- `requires`: the required module
- `requiresFlags`: the require-specific flags
- `requiresVersion`: the required version, may be `null`

## ModuleRequireInfo.of(ModuleDesc, Collection<AccessFlag>, String)

```java
static ModuleRequireInfo of(ModuleDesc requires, Collection<AccessFlag> requiresFlags, String requiresVersion)
```

Parameters:

- `requires`: the required module
- `requiresFlags`: the require-specific flags
- `requiresVersion`: the required version, may be `null`

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.MODULE_REQUIRES` location
