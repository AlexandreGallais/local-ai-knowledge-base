---
title: "ModuleHashInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleHashInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleHashInfo interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleHashInfo permits UnboundAttribute.UnboundModuleHashInfo
```

Models hash information for a single module in the `ModuleHashesAttribute`.

**See also:** ModuleHashesAttribute#hashes()

**Since:** 24

## ModuleHashInfo.moduleName()

```java
ModuleEntry moduleName()
```

## ModuleHashInfo.hash()

```java
byte[] hash()
```

## ModuleHashInfo.of(ModuleEntry, byte[])

```java
static ModuleHashInfo of(ModuleEntry moduleName, byte[] hash)
```

Parameters:

- `moduleName`: the module name
- `hash`: the hash value

## ModuleHashInfo.of(ModuleDesc, byte[])

```java
static ModuleHashInfo of(ModuleDesc moduleDesc, byte[] hash)
```

Parameters:

- `moduleDesc`: the module name
- `hash`: the hash value
